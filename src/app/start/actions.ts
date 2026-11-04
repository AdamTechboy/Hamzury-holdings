'use server';

import { headers } from 'next/headers';
import { validateEnquiry, type EnquiryInput } from '@/lib/enquiry';
import { NotConfiguredError, notifyTeam, saveEnquiry } from '@/lib/store';

export type SubmitResult = { ok: true; reference: string } | { ok: false; error: string };

export async function submitEnquiry(input: EnquiryInput): Promise<SubmitResult> {
  // Bots fill the hidden field; pretend success so they don't retry.
  if (input.website) return { ok: true, reference: 'HZ-RECEIVED' };

  const result = validateEnquiry(input);
  if (!result.ok) return result;

  try {
    const reference = await saveEnquiry(
      result.value,
      (await headers()).get('user-agent') ?? undefined,
    );
    await notifyTeam(result.value, reference);
    return { ok: true, reference };
  } catch (err) {
    console.error('[enquiry] save failed', err);
    return {
      ok: false,
      error:
        err instanceof NotConfiguredError
          ? 'Online enquiries are not switched on yet. Please use the contact desk for now.'
          : 'Something went wrong on our side. Please try again in a moment.',
    };
  }
}
