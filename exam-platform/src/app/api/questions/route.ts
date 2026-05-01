import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const exam = searchParams.get('exam')
  const subject = searchParams.get('subject')
  const subtopic = searchParams.get('subtopic')
  const difficulty = searchParams.get('difficulty')
  const limit = parseInt(searchParams.get('limit') || '10')

  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_random_questions', {
    p_exam: exam || null,
    p_subject: subject || null,
    p_subtopic: subtopic || null,
    p_difficulty: difficulty || null,
    p_limit: limit,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
