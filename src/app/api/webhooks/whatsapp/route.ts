import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Webhook verification endpoint (GET) for WhatsApp Cloud API
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'placeholder_verify_token'

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

// Inbound WhatsApp message processor (POST)
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    const admin = createAdminClient()

    // Example payload parser for WhatsApp messages
    const entry = payload.entry?.[0]
    const changes = entry?.changes?.[0]
    const message = changes?.value?.messages?.[0]

    if (message) {
      const fromNumber = message.from
      const textBody = message.text?.body || ''

      // Look up existing customer by phone
      const { data: customer } = await admin
        .from('customers')
        .select('id')
        .ilike('phone', `%${fromNumber.slice(-10)}%`)
        .single()

      if (customer) {
        // Record incoming conversation message
        const { data: conv } = await admin
          .from('conversations')
          .select('id')
          .eq('customer_id', customer.id)
          .eq('channel', 'whatsapp')
          .single()

        let convId = conv?.id
        if (!convId) {
          const { data: newConv } = await admin
            .from('conversations')
            .insert({
              customer_id: customer.id,
              channel: 'whatsapp',
              channel_reference: fromNumber
            })
            .select('id')
            .single()
          convId = newConv?.id
        }

        if (convId) {
          await admin.from('conversation_messages').insert({
            conversation_id: convId,
            sender_type: 'customer',
            message_text: textBody,
            delivery_status: 'delivered'
          })
        }
      }
    }

    return NextResponse.json({ status: 'received' }, { status: 200 })
  } catch (err: unknown) {
    console.error('WhatsApp webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
