import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const departmentId = searchParams.get('departmentId')

  let query = supabase
    .from('leads')
    .select(`
      id,
      lead_reference,
      status,
      priority,
      source,
      description,
      next_action,
      follow_up_at,
      created_at,
      department:departments(name, slug),
      service:services(title, code),
      customer:customers(full_name, email, phone, organisation_name)
    `)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }
  if (departmentId) {
    query = query.eq('department_id', departmentId)
  }

  const { data: leads, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ leads })
}

