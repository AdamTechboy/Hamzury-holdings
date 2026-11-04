// Enquiry shape and validation, shared by the /start form and the server action.

import { ventures } from './site';

export const stages = [
  { id: 'idea', label: 'Just an idea', hint: 'Not started yet' },
  { id: 'new', label: 'New business', hint: 'Under 2 years' },
  { id: 'growing', label: 'Growing business', hint: 'Customers and sales' },
  { id: 'established', label: 'Established business', hint: 'Ready to scale' },
  { id: 'organisation', label: 'Organisation or NGO', hint: 'Non-profit or public' },
] as const;

export const contactPrefs = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'call', label: 'Phone call' },
  { id: 'email', label: 'Email' },
] as const;

export const UNSURE = 'unsure';

export type EnquiryInput = {
  services: string[];
  package?: string;
  stage: string;
  business: string;
  goal: string;
  name: string;
  email: string;
  phone: string;
  contactPref: string;
  consent: boolean;
  source?: string;
  /** Honeypot: real visitors never see or fill this. */
  website?: string;
};

export type Enquiry = Omit<EnquiryInput, 'consent' | 'website'>;

const serviceIds = new Set([...ventures.map((v) => v.id), UNSURE]);
const clean = (s: unknown, max: number) => (typeof s === 'string' ? s.trim().slice(0, max) : '');
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isPhone = (s: string) => /^\+?[\d\s().-]{7,20}$/.test(s);

/** Returns a cleaned enquiry, or a message describing the first problem found. */
export function validateEnquiry(
  raw: EnquiryInput,
): { ok: true; value: Enquiry } | { ok: false; error: string } {
  const services = Array.isArray(raw.services)
    ? [...new Set(raw.services.filter((s) => serviceIds.has(s)))]
    : [];
  const value: Enquiry = {
    services,
    package: clean(raw.package, 20) || undefined,
    stage: clean(raw.stage, 20),
    business: clean(raw.business, 120),
    goal: clean(raw.goal, 2000),
    name: clean(raw.name, 120),
    email: clean(raw.email, 200).toLowerCase(),
    phone: clean(raw.phone, 30),
    contactPref: clean(raw.contactPref, 20),
    source: clean(raw.source, 200) || undefined,
  };

  if (!services.length) return { ok: false, error: 'Choose at least one area, or “Not sure yet”.' };
  if (!stages.some((s) => s.id === value.stage))
    return { ok: false, error: 'Tell us where your business is today.' };
  if (!value.business) return { ok: false, error: 'Add your business or organisation name.' };
  if (value.goal.length < 10)
    return { ok: false, error: 'Tell us a little more about what you want to achieve.' };
  if (!value.name) return { ok: false, error: 'Add your name.' };
  if (!contactPrefs.some((c) => c.id === value.contactPref))
    return { ok: false, error: 'Choose how we should contact you.' };
  if (value.email && !isEmail(value.email))
    return { ok: false, error: 'That email address doesn’t look right.' };
  if (value.phone && !isPhone(value.phone))
    return { ok: false, error: 'That phone number doesn’t look right.' };
  if (value.contactPref === 'email' && !value.email)
    return { ok: false, error: 'Add your email so we can reply.' };
  if (value.contactPref !== 'email' && !value.phone)
    return { ok: false, error: 'Add your phone number so we can reach you.' };
  if (!raw.consent) return { ok: false, error: 'Please agree to be contacted about your enquiry.' };
  return { ok: true, value };
}

/** Short reference clients can quote, e.g. HZ-7K3M9Q. Avoids look-alike characters. */
export function newReference() {
  const alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return 'HZ-' + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}
