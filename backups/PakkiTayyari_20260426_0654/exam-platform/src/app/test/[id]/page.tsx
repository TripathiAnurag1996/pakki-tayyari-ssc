import { createClient } from '@/lib/supabase/server'
import { TestInterface } from '@/components/test/test-interface'
import { notFound, redirect } from 'next/navigation'
import { Question } from '@/types'

export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Fetch the session
  const { data: session, error: sessionError } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('id', id)
    .single()

  if (sessionError || !session) {
    notFound()
  }

  // 2. Security: Ensure user owns this session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || session.user_id !== user.id) {
    redirect('/dashboard')
  }

  // 3. Fetch questions based on session filters
  let query = supabase.from('questions').select('*')
  
  if (session.subject) query = query.eq('subject', session.subject)
  if (session.subtopic && session.subtopic !== 'all') query = query.eq('subtopic', session.subtopic)
  
  const { data: questions, error: questionsError } = await query.limit(session.total_questions)

  if (questionsError || !questions || questions.length === 0) {
    // If no specific questions found, fetch random ones
    const { data: randomQs } = await supabase.from('questions').select('*').limit(session.total_questions)
    return <TestInterface session={session} questions={(randomQs || []) as Question[]} />
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <TestInterface session={session} questions={questions as Question[]} />
    </div>
  )
}
