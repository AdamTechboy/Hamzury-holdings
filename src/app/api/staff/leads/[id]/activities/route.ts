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

  const { activityType, description, metadata } = await req.json()

  if (!activityType || !description) {
    return NextResponse.json({ error: 'Missing activity type or description' }, { status: 400 })
  }

  const { data: activity, error } = await supabase
    .from('lead_activities')
    .insert({
      lead_id: params.id,
      user_id: user.id,
      activity_type: activityType,
      description: description,
      metadata: metadata || {}
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, activity })
}

