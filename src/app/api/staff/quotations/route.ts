import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { quotationCreateSchema } from '@/lib/validation/schemas'
import { generateReference } from '@/lib/utilities/reference-generator'

export async function POST(req: NextRequest) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const json = await req.json()
  const parsed = quotationCreateSchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid quotation payload', details: parsed.error.format() }, { status: 400 })
  }

  const { leadId, customerId, validUntil, currency, discount, terms, items } = parsed.data

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const total = Math.max(0, subtotal - discount)
  const quoteReference = generateReference('QTE')

  const { data: quotation, error: quoteErr } = await supabase
    .from('quotations')
    .insert({
      quote_reference: quoteReference,
      lead_id: leadId || null,
      customer_id: customerId,
      subtotal,
      discount,
      total,
      currency,
      status: 'draft',
      terms: terms || 'Standard 30-day payment terms.',
      valid_until: validUntil,
      created_by: user.id
    })
    .select('id, quote_reference')
    .single()

  if (quoteErr || !quotation) {
    return NextResponse.json({ error: quoteErr?.message || 'Failed to create quotation' }, { status: 500 })
  }

  // Insert quotation items
  const itemsToInsert = items.map(item => ({
    quotation_id: quotation.id,
    service_id: item.serviceId || null,
    description: item.description,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    total_price: item.quantity * item.unitPrice
  }))

  const { error: itemsErr } = await supabase.from('quotation_items').insert(itemsToInsert)

  if (itemsErr) {
    console.error('Quotation items insertion failed:', itemsErr)
  }

  return NextResponse.json({
    success: true,
    quotationId: quotation.id,
    quoteReference: quotation.quote_reference,
    total,
    currency
  })
}
