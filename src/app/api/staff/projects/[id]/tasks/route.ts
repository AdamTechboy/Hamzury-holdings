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

  const { title, description, assignedTo, priority, dueDate } = await req.json()

  if (!title) {
    return NextResponse.json({ error: 'Task title is required' }, { status: 400 })
  }

  const { data: task, error } = await supabase
    .from('project_tasks')
    .insert({
      project_id: params.id,
      title,
      description: description || null,
      assigned_to: assignedTo || null,
      priority: priority || 'medium',
      due_date: dueDate || null,
      status: 'pending'
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, task })
}

