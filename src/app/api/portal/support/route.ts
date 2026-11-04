import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateReference } from '@/lib/utilities/reference-generator'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { customerId, subject, description, priority, projectId, departmentId } = await req.json()

  if (!customerId || !subject || !description) {
    return NextResponse.json({ error: 'Missing required support ticket fields' }, { status: 400 })
  }

  const ticketReference = generateReference('TCK')

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .insert({
      ticket_reference: ticketReference,
      customer_id: customerId,
      project_id: projectId || null,
      department_id: departmentId || null,
      subject,
      description,
      priority: priority || 'medium',
      status: 'open'
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, ticket })
}

