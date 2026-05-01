import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: sessionId } = await params
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 0. Verify session ownership and status
  const { data: existingSession, error: checkError } = await supabase
    .from('test_sessions')
    .select('status, user_id')
    .eq('id', sessionId)
    .single()

  if (checkError || !existingSession) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (existingSession.user_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized session' }, { status: 403 })
  }

  if (existingSession.status === 'completed') {
    return NextResponse.json({ error: 'Session already submitted' }, { status: 400 })
  }

  const body = await request.json()
  const { responses, time_taken_seconds } = body // responses: [{ question_id, selected_option, time_spent_seconds }]

  if (!responses || !Array.isArray(responses)) {
    return NextResponse.json({ error: 'Invalid responses' }, { status: 400 })
  }

  // 1. Fetch correct answers for the submitted questions
  const questionIds = responses.map((r) => r.question_id)
  const { data: questions, error: qError } = await supabase
    .from('questions')
    .select('id, correct_option')
    .in('id', questionIds)

  if (qError || !questions) {
    return NextResponse.json({ error: 'Error fetching questions' }, { status: 500 })
  }

  // 2. Calculate score and accuracy
  let correctCount = 0
  const processedResponses = responses.map((resp) => {
    const question = questions.find((q) => q.id === resp.question_id)
    const isCorrect = question ? question.correct_option === resp.selected_option : false
    if (isCorrect) correctCount++
    return {
      session_id: sessionId,
      question_id: resp.question_id,
      selected_option: resp.selected_option,
      is_correct: isCorrect,
      time_spent_seconds: resp.time_spent_seconds,
    }
  })

  const totalQuestions = responses.length
  const score = correctCount // Basic score, can be customized (e.g. +2 for correct, -0.5 for wrong)
  const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0

  // 3. Insert all responses
  const { error: rError } = await supabase
    .from('responses')
    .insert(processedResponses)

  if (rError) {
    return NextResponse.json({ error: rError.message }, { status: 500 })
  }

  // 4. Update the test session
  const { data: session, error: sError } = await supabase
    .from('test_sessions')
    .update({
      score,
      accuracy,
      time_taken_seconds,
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .select()
    .single()

  if (sError) {
    return NextResponse.json({ error: sError.message }, { status: 500 })
  }

  return NextResponse.json(session)
}
