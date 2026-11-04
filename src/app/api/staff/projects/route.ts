import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateReference } from '@/lib/utilities/reference-generator'

export async function POST(req: NextRequest) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { customerId, leadId, quotationId, projectName, departmentId, expectedCompletion } = await req.json()

  if (!customerId || !projectName || !departmentId) {
    return NextResponse.json({ error: 'Missing required project attributes' }, { status: 400 })
  }

  const projectReference = generateReference('PRJ')

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      project_reference: projectReference,
      project_name: projectName,
      customer_id: customerId,
      lead_id: leadId || null,
      quotation_id: quotationId || null,
      department_id: departmentId,
      status: 'AWAITING ACTIVATION',
      project_manager: user.id,
      expected_completion: expectedCompletion || null
    })
    .select('id, project_reference')
    .single()

  if (error || !project) {
    return NextResponse.json({ error: error?.message || 'Failed to create project' }, { status: 500 })
  }

  return NextResponse.json({ success: true, project })
}
