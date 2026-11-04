import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const json = await req.json()
  const { status, priority, next_action, follow_up_at, assigned_to } = json

  const updateData: Record<string, unknown> = {}
  if (status) updateData.status = status
  if (priority) updateData.priority = priority
  if (next_action) updateData.next_action = next_action
  if (follow_up_at) updateData.follow_up_at = follow_up_at
  if (assigned_to !== undefined) updateData.assigned_to = assigned_to

  const { data: lead, error } = await supabase
    .from('leads')
    .update(updateData)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, lead })
}

