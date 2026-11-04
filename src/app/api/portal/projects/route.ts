import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Under RLS, this automatically scopes to projects belonging to customer accounts the user owns
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      id,
      project_reference,
      project_name,
      status,
      start_date,
      expected_completion,
      department:departments(name, slug)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ projects })
}
