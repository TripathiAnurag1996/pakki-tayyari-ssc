export type Difficulty = 'easy' | 'medium' | 'hard'
export type SessionMode = 'practice' | 'mock'
export type SessionStatus = 'in_progress' | 'completed'

export interface Question {
  id: string
  exam: string
  subject: string
  subtopic: string
  difficulty: Difficulty
  question_text: string
  options: string[]
  correct_option: number
  solution_text: string | null
  created_at: string
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface TestSession {
  id: string
  user_id: string
  mode: SessionMode
  exam: string
  subject: string | null
  subtopic: string | null
  total_questions: number
  score: number | null
  accuracy: number | null
  time_taken_seconds: number | null
  status: SessionStatus
  started_at: string
  completed_at: string | null
}

export interface Response {
  id: string
  session_id: string
  question_id: string
  selected_option: number | null
  is_correct: boolean | null
  time_spent_seconds: number | null
  created_at: string
}

export interface SubjectWithSubtopics {
  subject: string
  subtopics: string[]
}
