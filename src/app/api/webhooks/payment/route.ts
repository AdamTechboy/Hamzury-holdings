import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-webhook-signature')

    // Verification check against configured webhook secret
    const secret = process.env.PAYMENT_WEBHOOK_SECRET
    if (secret && signature !== secret) {
      console.warn('Unauthorized payment webhook attempt blocked')
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)
    const { reference, amount, currency, status: paymentStatus } = payload

    if (paymentStatus === 'success' || paymentStatus === 'verified') {
      const admin = createAdminClient()

      // 1. Reconcile payment record
      const { data: payment, error } = await admin
        .from('payments')
        .update({
          status: 'verified',
          verified_at: new Date().toISOString()
        })
        .eq('payment_reference', reference)
        .select('id, quotation_id, customer_id')
        .single()

      if (error) {
        console.error('Payment record not found for reference:', reference)
      } else if (payment?.quotation_id) {
        // 2. Mark associated quotation accepted
        await admin
          .from('quotations')
          .update({ status: 'accepted' })
          .eq('id', payment.quotation_id)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: unknown) {
    console.error('Payment webhook error:', err)
    return NextResponse.json({ error: 'Internal processing error' }, { status: 500 })
  }
}
