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
  const { status, project_manager, expected_completion, completed_at } = json

  const updateData: Record<string, unknown> = {}
  if (status) updateData.status = status
  if (project_manager) updateData.project_manager = project_manager
  if (expected_completion) updateData.expected_completion = expected_completion
  if (completed_at) updateData.completed_at = completed_at

  const { data: project, error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, project })
}

