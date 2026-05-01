import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // Fetch unique subjects, subtopics, and chapters
  const { data, error } = await supabase
    .from('questions')
    .select('subject, subtopic, chapter')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Organize data into a hierarchy: subject -> subtopic -> chapters[]
  const organizedData: any[] = []
  
  data.forEach((item) => {
    let subjectObj = organizedData.find(s => s.subject === item.subject)
    if (!subjectObj) {
      subjectObj = { subject: item.subject, subtopics: [] }
      organizedData.push(subjectObj)
    }
    
    let subtopicObj = subjectObj.subtopics.find((st: any) => st.subtopic === item.subtopic)
    if (!subtopicObj) {
      subtopicObj = { subtopic: item.subtopic, chapters: [] }
      subjectObj.subtopics.push(subtopicObj)
    }
    
    if (item.chapter && !subtopicObj.chapters.includes(item.chapter)) {
      subtopicObj.chapters.push(item.chapter)
    }
  })

  return NextResponse.json(organizedData)
}
