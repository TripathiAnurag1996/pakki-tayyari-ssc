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
import { Loader2, Sparkles, Book, Target, Zap, ChevronDown, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PracticeFormProps {
  subjects: SubjectWithSubtopics[]
}

export function PracticeForm({ subjects }: PracticeFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [selectedChapter, setSelectedChapter] = useState<string>('')
  const [difficulty, setDifficulty] = useState<string>('medium')
  const [questionCount, setQuestionCount] = useState<number[]>([25])
  const [error, setError] = useState<string | null>(null)

  const subtopicsData = subjects.find(s => s.subject === selectedSubject)?.subtopics || []
  const topics = subtopicsData.map(st => st.subtopic)
  const chapters = subtopicsData.find(st => st.subtopic === selectedTopic)?.chapters || []

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
          subtopic: selectedTopic,
          chapter: selectedChapter,
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

      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-5">
          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3 ml-1">
            <Book className="h-3 w-3 text-primary" /> Subject
          </Label>
          <Select 
            onValueChange={(val: string | null) => {
              if (val) setSelectedSubject(val)
              setSelectedTopic('')
              setSelectedChapter('')
            }}
            value={selectedSubject}
          >
            <SelectTrigger className="h-18 bg-white/[0.04] border-white/10 rounded-3xl focus:ring-primary/20 text-white text-base font-black tracking-tight px-6 group hover:bg-white/[0.06] hover:border-white/20 transition-all">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 min-w-fit w-[calc(var(--anchor-width)+2rem)]">
              {subjects.map((s) => (
                <SelectItem key={s.subject} value={s.subject} className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer">
                  {s.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-5">
          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3 ml-1">
            <Target className="h-3 w-3 text-primary" /> Topic
          </Label>
          <Select 
            onValueChange={(val: string | null) => {
              setSelectedTopic(val || '')
              setSelectedChapter('')
            }}
            value={selectedTopic}
            disabled={!selectedSubject}
          >
            <SelectTrigger className="h-18 bg-white/[0.04] border-white/10 rounded-3xl focus:ring-primary/20 text-white text-base font-black tracking-tight px-6 group hover:bg-white/[0.06] hover:border-white/20 transition-all disabled:opacity-30 disabled:grayscale">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 min-w-fit w-[calc(var(--anchor-width)+4rem)]">
              <SelectItem value="all" className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer">All Topics</SelectItem>
              {topics.map((st) => (
                <SelectItem key={st} value={st} className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer">
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-5">
          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3 ml-1">
            <ChevronDown className="h-3 w-3 text-primary" /> Chapter
          </Label>
          <Select 
            onValueChange={(val: string | null) => setSelectedChapter(val || '')}
            value={selectedChapter}
            disabled={!selectedTopic || selectedTopic === 'all'}
          >
            <SelectTrigger className="h-18 bg-white/[0.04] border-white/10 rounded-3xl focus:ring-primary/20 text-white text-base font-black tracking-tight px-6 group hover:bg-white/[0.06] hover:border-white/20 transition-all disabled:opacity-30 disabled:grayscale">
              <SelectValue placeholder="All Chapters" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 min-w-fit w-[calc(var(--anchor-width)+4rem)]">
              <SelectItem value="all" className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer">All Chapters</SelectItem>
              {chapters.map((ch) => (
                <SelectItem key={ch} value={ch} className="text-white focus:bg-primary focus:text-white rounded-2xl py-4 px-6 font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer">
                  {ch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Question Count Selector */}
      <div className="bento-card !p-8 space-y-8 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
            <Sparkles className="h-3 w-3 text-primary" /> Question Count
          </Label>
          <span className="text-2xl font-black text-white italic">{questionCount[0]} QUESTIONS</span>
        </div>
        
        <div className="px-2">
          <Slider
            value={questionCount}
            onValueChange={(val) => setQuestionCount(typeof val === 'number' ? [val] : [...val])}
            max={100}
            min={5}
            step={5}
            className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-4 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-white"
          />
          <div className="flex justify-between mt-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <span>Minimum (5)</span>
            <span>Maximum (100)</span>
          </div>
        </div>
      </div>

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
            LOADING QUESTIONS...
          </div>
        ) : (
          <div className="flex items-center gap-4">
            START PRACTICE <Zap className="h-6 w-6 fill-current transition-transform group-hover:rotate-12" />
          </div>
        )}
      </Button>
    </div>
  )
}
