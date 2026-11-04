import { createClient } from '@supabase/supabase-js';
import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { newReference, type Enquiry } from './enquiry';
import { ventures } from './site';

export class NotConfiguredError extends Error {}

const supabase = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
};

/**
 * Saves an enquiry and returns its reference.
 * Uses Supabase when configured. In development without Supabase, appends to .data/enquiries.jsonl
 * so the form can be tested locally. In production without Supabase, refuses rather than lose data.
 */
export async function saveEnquiry(e: Enquiry, userAgent?: string): Promise<string> {
  const db = supabase();
  const row = (reference: string) => ({
    reference,
    services: e.services,
    package: e.package ?? null,
    stage: e.stage,
    business: e.business,
    goal: e.goal,
    name: e.name,
    email: e.email || null,
    phone: e.phone || null,
    contact_pref: e.contactPref,
    source: e.source ?? null,
    user_agent: userAgent?.slice(0, 300) ?? null,
  });

  if (db) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const reference = newReference();
      const { error } = await db.from('enquiries').insert(row(reference));
      if (!error) return reference;
      if (error.code !== '23505') throw new Error(`Supabase insert failed: ${error.message}`);
      // 23505 = duplicate reference; try another.
    }
    throw new Error('Could not generate a unique reference');
  }

  if (process.env.NODE_ENV === 'production') {
    throw new NotConfiguredError('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set');
  }
  const reference = newReference();
  const dir = join(process.cwd(), '.data');
  await mkdir(dir, { recursive: true });
  await appendFile(
    join(dir, 'enquiries.jsonl'),
    JSON.stringify({ ...row(reference), created_at: new Date().toISOString() }) + '\n',
  );
  console.log(`[enquiry] saved ${reference} to .data/enquiries.jsonl (Supabase not configured)`);
  return reference;
}

/** Emails the team about a new enquiry via Resend, if configured. Never throws. */
export async function notifyTeam(e: Enquiry, reference: string) {
  const { RESEND_API_KEY: key, ENQUIRY_NOTIFY_EMAIL: to, ENQUIRY_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return;
  const services = e.services
    .map((id) => ventures.find((v) => v.id === id)?.category ?? 'Not sure yet')
    .join(', ');
  const text = [
    `New enquiry ${reference}`,
    '',
    `Name: ${e.name}`,
    `Business: ${e.business} (${e.stage})`,
    `Interested in: ${services}${e.package ? ` · package ${e.package}` : ''}`,
    `Contact by: ${e.contactPref}`,
    `Phone: ${e.phone || '-'}`,
    `Email: ${e.email || '-'}`,
    '',
    'Goal:',
    e.goal,
  ].join('\n');
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()),
        subject: `New enquiry ${reference}: ${e.business}`,
        text,
        ...(e.email ? { reply_to: e.email } : {}),
      }),
    });
    if (!res.ok) console.error(`[enquiry] notification failed: ${res.status} ${await res.text()}`);
  } catch (err) {
    console.error('[enquiry] notification failed', err);
  }
}
