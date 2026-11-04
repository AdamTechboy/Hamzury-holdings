import { NextRequest, NextResponse } from 'next/server'
import { publicEnquirySchema } from '@/lib/validation/schemas'
import { generateReference } from '@/lib/utilities/reference-generator'
import { generateWhatsAppLink } from '@/lib/utilities/whatsapp'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = publicEnquirySchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input submission', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { fullName, email, phone, organisationName, departmentSlug, serviceCode, description, sourceUrl, botTrap } = parsed.data

    // 1. Bot Trap / Honeypot verification
    if (botTrap) {
      return NextResponse.json({ error: 'Request rejected' }, { status: 400 })
    }

    const admin = createAdminClient()

    // 2. Lookup Department
    const { data: dept, error: deptErr } = await admin
      .from('departments')
      .select('id, name')
      .eq('slug', departmentSlug)
      .single()

    if (deptErr || !dept) {
      return NextResponse.json({ error: 'Invalid department selected' }, { status: 400 })
    }

    // 3. Lookup Service
    const { data: srv } = await admin
      .from('services')
      .select('id, title')
      .eq('code', serviceCode)
      .single()

    // 4. Upsert Customer by email
    let customerId: string | null = null
    const { data: existingCustomer } = await admin
      .from('customers')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      const { data: newCustomer } = await admin
        .from('customers')
        .insert({
          full_name: fullName,
          email: email.toLowerCase(),
          phone: phone,
          organisation_name: organisationName || null,
          customer_type: organisationName ? 'business' : 'individual'
        })
        .select('id')
        .single()
      
      if (newCustomer) customerId = newCustomer.id
    }

    // 5. Generate Reference and Create Lead
    const leadReference = generateReference('ENQ')

    const { data: lead, error: leadErr } = await admin
      .from('leads')
      .insert({
        lead_reference: leadReference,
        customer_id: customerId,
        department_id: dept.id,
        service_id: srv?.id || null,
        source: 'website_form',
        source_url: sourceUrl || null,
        status: 'NEW ENQUIRY',
        priority: 'medium',
        description: description,
        next_action: 'Initial discovery and contact qualification'
      })
      .select('id')
      .single()

    if (leadErr || !lead) {
      console.error('Lead creation error:', leadErr)
      return NextResponse.json({ error: 'Failed to record enquiry' }, { status: 500 })
    }

    // 6. Record Initial Activity
    await admin.from('lead_activities').insert({
      lead_id: lead.id,
      activity_type: 'enquiry_received',
      description: `Public enquiry received for ${dept.name}: ${srv?.title || serviceCode}`
    })

    // 7. Generate Stage 1 WhatsApp Contact Link
    const waLink = generateWhatsAppLink({
      enquiryReference: leadReference,
      ventureName: dept.name,
      serviceTitle: srv?.title || 'Service Assessment'
    })

    return NextResponse.json({
      success: true,
      leadReference,
      venture: dept.name,
      serviceTitle: srv?.title,
      whatsappLink: waLink,
      message: 'Your enquiry has been received and routed to the department team.'
    })
  } catch (err: unknown) {
    console.error('Enquiry submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
