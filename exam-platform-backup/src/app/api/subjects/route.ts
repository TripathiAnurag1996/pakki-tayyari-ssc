import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // Fetch unique subjects and subtopics
  const { data, error } = await supabase
    .from('questions')
    .select('subject, subtopic')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Organize data into a map of subject -> Set of subtopics
  const subjectMap: Record<string, Set<string>> = {}
  data.forEach((item) => {
    if (!subjectMap[item.subject]) {
      subjectMap[item.subject] = new Set()
    }
    subjectMap[item.subject].add(item.subtopic)
  })

  // Convert Sets to Arrays for JSON response
  const organizedData = Object.keys(subjectMap).map((subject) => ({
    subject,
    subtopics: Array.from(subjectMap[subject]),
  }))

  return NextResponse.json(organizedData)
}
