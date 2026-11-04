import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { assignedTo, reason } = await req.json()

  if (!assignedTo) {
    return NextResponse.json({ error: 'Missing assignedTo user ID' }, { status: 400 })
  }

  // 1. Update Lead assigned_to
  const { error: updateErr } = await supabase
    .from('leads')
    .update({ assigned_to: assignedTo })
    .eq('id', params.id)

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 })
  }

  // 2. Record Assignment Audit
  await supabase.from('lead_assignments').insert({
    lead_id: params.id,
    assigned_by: user.id,
    assigned_to: assignedTo,
    reason: reason || 'Lead routing assignment'
  })

  // 3. Record Activity
  await supabase.from('lead_activities').insert({
    lead_id: params.id,
    user_id: user.id,
    activity_type: 'assignment_changed',
    description: `Lead reassigned to user ${assignedTo}`
  })

  return NextResponse.json({ success: true, message: 'Lead assigned successfully' })
}

