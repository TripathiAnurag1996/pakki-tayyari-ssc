import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { mode, exam, subject, subtopic, chapter, total_questions } = body

  const { data, error } = await supabase
    .from('test_sessions')
    .insert([
      {
        user_id: user.id,
        mode,
        exam,
        subject,
        subtopic,
        chapter,
        total_questions,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
