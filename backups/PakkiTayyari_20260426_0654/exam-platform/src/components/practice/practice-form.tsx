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
import { Loader2, Sparkles, BrainCircuit, Target, Zap } from 'lucide-react'
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
    <div className="space-y-10">
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold animate-in-fade flex items-center gap-3">
          <Zap className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <BrainCircuit className="h-3 w-3" /> Core Discipline
          </Label>
          <Select 
            onValueChange={(val: string | null) => {
              if (val) setSelectedSubject(val)
              setSelectedSubtopic('')
            }}
            value={selectedSubject}
          >
            <SelectTrigger className="h-14 bg-white/[0.02] border-white/10 rounded-2xl focus:ring-primary/20 text-lg font-bold">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A0A] border-white/10 rounded-2xl">
              {subjects.map((s) => (
                <SelectItem key={s.subject} value={s.subject} className="focus:bg-primary/20 focus:text-white rounded-xl py-3 font-bold">
                  {s.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Target className="h-3 w-3" /> Specialization
          </Label>
          <Select 
            onValueChange={(val: string | null) => setSelectedSubtopic(val || '')}
            value={selectedSubtopic}
            disabled={!selectedSubject}
          >
            <SelectTrigger className="h-14 bg-white/[0.02] border-white/10 rounded-2xl focus:ring-primary/20 text-lg font-bold">
              <SelectValue placeholder="All Subtopics" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A0A] border-white/10 rounded-2xl">
              <SelectItem value="all" className="focus:bg-primary/20 focus:text-white rounded-xl py-3 font-bold">All Subtopics</SelectItem>
              {subtopics.map((st) => (
                <SelectItem key={st} value={st} className="focus:bg-primary/20 focus:text-white rounded-xl py-3 font-bold">
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <Label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Cognitive Intensity
            </Label>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Sets the baseline for AI generation</p>
          </div>
          <span className="text-xl font-black text-white italic tabular-nums bg-primary/10 px-4 py-1 rounded-full border border-primary/20 shadow-lg">
            {questionCount[0]} Qs
          </span>
        </div>
        <Slider
          defaultValue={[10]}
          max={50}
          min={5}
          step={5}
          onValueChange={(vals: number | readonly number[]) => {
            const valArray = Array.isArray(vals) ? Array.from(vals) : [vals];
            setQuestionCount(valArray);
          }}
          className="py-4"
        />
      </div>

      <Button 
        size="lg"
        className="w-full h-16 rounded-2xl text-xl font-black shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group" 
        onClick={handleStart}
        disabled={!selectedSubject || loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-all" />
        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin" />
            SYNCHRONIZING REPOSITORY...
          </div>
        ) : (
          <div className="flex items-center gap-3">
            INITIALIZE MASTERY SESSION <Zap className="h-5 w-5 fill-current" />
          </div>
        )}
      </Button>
    </div>
  )
}
