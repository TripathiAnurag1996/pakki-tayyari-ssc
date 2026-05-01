'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { SubjectWithSubtopics } from '@/types'
import { Loader2, Sparkles, BrainCircuit, Target, Zap, ChevronDown, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PracticeFormProps {
  subjects: SubjectWithSubtopics[]
}

export function PracticeForm({ subjects }: PracticeFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('')
  const [difficulty, setDifficulty] = useState<string>('medium')
  const [questionCount, setQuestionCount] = useState<number[]>([10])
  const [error, setError] = useState<string | null>(null)

  const subtopics = subjects.find(s => s.subject === selectedSubject)?.subtopics || []

  const handleStart = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'practice',
          exam: 'SSC CGL', 
          subject: selectedSubject,
          subtopic: selectedSubtopic,
          total_questions: questionCount[0],
        }),
      })

      if (!response.ok) throw new Error('Failed to start session')

      const session = await response.json()
      router.push(`/test/${session.id}`)
    } catch (error: any) {
      setError(error.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      {error && (
        <div className="p-6 rounded-3xl bg-red-500/[0.03] border border-red-500/10 text-red-400 text-sm font-black uppercase tracking-widest animate-in-fade flex items-center gap-4">
          <Zap className="h-5 w-5 animate-pulse" />
          {error}
        </div>
      )}

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3 ml-1">
            <BrainCircuit className="h-3 w-3 text-primary" /> Core Discipline
          </Label>
          <Select 
            onValueChange={(val: string | null) => {
              if (val) setSelectedSubject(val)
              setSelectedSubtopic('')
            }}
            value={selectedSubject}
          >
            <SelectTrigger className="h-18 bg-white/[0.04] border-white/10 rounded-3xl focus:ring-primary/20 text-white text-xl font-black tracking-tight px-8 group hover:bg-white/[0.06] hover:border-white/20 transition-all">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2">
              {subjects.map((s) => (
                <SelectItem key={s.subject} value={s.subject} className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-black uppercase tracking-widest text-[10px] transition-all cursor-pointer">
                  {s.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-5">
          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3 ml-1">
            <Target className="h-3 w-3 text-primary" /> Specialization
          </Label>
          <Select 
            onValueChange={(val: string | null) => setSelectedSubtopic(val || '')}
            value={selectedSubtopic}
            disabled={!selectedSubject}
          >
            <SelectTrigger className="h-18 bg-white/[0.04] border-white/10 rounded-3xl focus:ring-primary/20 text-white text-xl font-black tracking-tight px-8 group hover:bg-white/[0.06] hover:border-white/20 transition-all disabled:opacity-30 disabled:grayscale">
              <SelectValue placeholder="All Subtopics" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2">
              <SelectItem value="all" className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-black uppercase tracking-widest text-[10px] transition-all cursor-pointer">All Subtopics</SelectItem>
              {subtopics.map((st) => (
                <SelectItem key={st} value={st} className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-black uppercase tracking-widest text-[10px] transition-all cursor-pointer">
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cognitive Intensity disabled for now */}

      <Button 
        size="lg"
        className="w-full h-20 rounded-[2rem] text-2xl font-black shadow-[0_25px_50px_rgba(99,102,241,0.4)] hover:scale-[1.01] active:scale-[0.98] transition-all relative overflow-hidden group uppercase tracking-widest" 
        onClick={handleStart}
        disabled={!selectedSubject || loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-all" />
        {loading ? (
          <div className="flex items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            SYNCHRONIZING REPOSITORY...
          </div>
        ) : (
          <div className="flex items-center gap-4">
            INITIALIZE MASTERY <Zap className="h-6 w-6 fill-current transition-transform group-hover:rotate-12" />
          </div>
        )}
      </Button>
    </div>
  )
}
