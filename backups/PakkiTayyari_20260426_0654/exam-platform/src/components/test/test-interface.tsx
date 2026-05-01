'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Question, TestSession } from '@/types'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Clock, 
  CheckCircle2,
  Command,
  Zap,
  LayoutDashboard,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestInterfaceProps {
  session: TestSession
  questions: Question[]
}

export function TestInterface({ session, questions }: TestInterfaceProps) {
  const router = useRouter()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(session.mode === 'mock' ? 3600 : 0) 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime] = useState(() => Date.now())

  const currentQuestion = questions[currentIdx]
  const progress = ((currentIdx + 1) / questions.length) * 100

  const formatTime = (seconds: number) => {
    const m = Math.floor(Math.abs(seconds) / 60)
    const s = Math.abs(seconds) % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleSelect = (optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx,
    }))
  }

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    const formattedResponses = questions.map((q) => ({
      question_id: q.id,
      selected_option: answers[q.id] ?? null,
      time_spent_seconds: 0, 
    }))

    try {
      const res = await fetch(`/api/sessions/${session.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responses: formattedResponses,
          time_taken_seconds: timeTaken,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit')

      router.push(`/results/${session.id}`)
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
    }
  }, [answers, isSubmitting, questions, router, session.id, startTime])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (session.mode === 'mock') {
          return prev > 0 ? prev - 1 : 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [session.mode])

  useEffect(() => {
    if (session.mode === 'mock' && timeLeft === 0 && !isSubmitting) {
      handleSubmit()
    }
  }, [timeLeft, session.mode, isSubmitting, handleSubmit])

  if (!currentQuestion) return <div className="p-12 text-center font-black text-red-500 uppercase tracking-[0.3em]">Synapse Link Missing.</div>

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in-fade relative">
      {/* Floating Tactical Header */}
      <div className="sticky top-6 z-40 glass rounded-[32px] p-6 border-white/5 shadow-2xl flex items-center justify-between gap-12">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                 <Clock className={cn("h-5 w-5 text-primary", session.mode === 'mock' && timeLeft < 300 && "text-red-500 animate-pulse")} />
              </div>
              <div>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Chronometer</span>
                 <p className={cn(
                   "text-2xl font-black tabular-nums tracking-tighter leading-none italic",
                   session.mode === 'mock' && timeLeft < 300 ? "text-red-500" : "text-white"
                 )}>
                   {formatTime(timeLeft)}
                 </p>
              </div>
           </div>

           <div className="hidden lg:block h-10 w-px bg-white/[0.05]" />

           <div className="hidden lg:block space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                 <span>Protocol Completion</span>
                 <span className="text-primary italic">{currentIdx + 1} / {questions.length}</span>
              </div>
              <div className="h-1.5 w-64 bg-white/5 rounded-full overflow-hidden border border-white/5">
                 <div className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <Button variant="ghost" className="rounded-2xl px-6 text-zinc-500 font-bold hover:bg-white/5 transition-all">
              Pause Logic
           </Button>
           <Button 
             className="rounded-2xl px-8 h-12 font-black shadow-[0_0_30px_rgba(239,68,68,0.2)] bg-red-500 hover:bg-red-600 transition-all active:scale-95"
             onClick={handleSubmit}
             disabled={isSubmitting}
           >
             TERMINATE SESSION
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Neural Grid */}
        <div className="lg:col-span-8 space-y-8">
           <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-[48px] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000" />
              
              <div className="relative glass rounded-[48px] border-white/5 overflow-hidden shadow-2xl">
                 <div className="bg-white/[0.03] p-10 md:p-16 border-b border-white/[0.05]">
                    <div className="flex items-center justify-between mb-8">
                       <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                          <Sparkles className="h-3.5 w-3.5" /> Neural Input {currentIdx + 1}
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Intensity</span>
                          <div className={cn(
                            "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                            currentQuestion.difficulty === 'hard' ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-sky-500/10 border-sky-500/20 text-sky-500"
                          )}>
                             {currentQuestion.difficulty}
                          </div>
                       </div>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tight">
                       {currentQuestion.question_text}
                    </h3>
                 </div>

                 <div className="p-10 md:p-16 space-y-5">
                    {currentQuestion.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={cn(
                          "w-full flex items-center p-6 rounded-3xl border-2 transition-all group relative overflow-hidden",
                          answers[currentQuestion.id] === idx
                            ? "bg-primary/10 border-primary ring-1 ring-primary shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                            : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                        )}
                      >
                        <div className={cn(
                          "h-12 w-12 rounded-2xl border-2 flex items-center justify-center font-black text-xl shrink-0 transition-all duration-500 mr-6",
                          answers[currentQuestion.id] === idx
                            ? "bg-primary border-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] rotate-0"
                            : "border-white/10 group-hover:border-white/30 text-zinc-500 -rotate-6"
                        )}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        
                        <span className={cn(
                          "text-xl font-bold transition-colors text-left leading-snug",
                          answers[currentQuestion.id] === idx ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                        )}>
                          {option}
                        </span>

                        {answers[currentQuestion.id] === idx && (
                          <div className="absolute right-10 flex items-center gap-2">
                             <CheckCircle2 className="h-6 w-6 text-primary" />
                          </div>
                        )}
                      </button>
                    ))}
                 </div>

                 <div className="bg-white/[0.03] p-8 md:p-10 border-t border-white/[0.05] flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                      disabled={currentIdx === 0}
                      className="h-14 rounded-2xl px-8 text-zinc-500 font-bold hover:bg-white/5 hover:text-white"
                    >
                      <ChevronLeft className="mr-3 h-5 w-5" />
                      PREVIOUS SYNAPSE
                    </Button>
                    
                    <div className="flex items-center gap-4">
                       <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
                          <Flag className="h-6 w-6" />
                       </Button>
                       
                       {currentIdx === questions.length - 1 ? (
                         <Button 
                           onClick={handleSubmit} 
                           className="h-14 px-12 rounded-2xl font-black text-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                           disabled={isSubmitting}
                         >
                           SYNCHRONIZE & EXIT
                         </Button>
                       ) : (
                         <Button
                           onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                           className="h-14 px-12 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(99,102,241,0.3)] group"
                         >
                           NEXT SYNAPSE
                           <ChevronRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                         </Button>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Tactical Overview */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass p-8 rounded-[40px] border-white/5 sticky top-32 space-y-8">
              <div className="flex items-center justify-between">
                 <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-2">
                    <LayoutDashboard className="h-3 w-3" /> Command Center
                 </h4>
                 <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(99,102,241,1)]" />
              </div>

              <div className="grid grid-cols-5 gap-3">
                 {questions.map((q, idx) => (
                   <button
                     key={q.id}
                     onClick={() => setCurrentIdx(idx)}
                     className={cn(
                       "aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all duration-500 border relative",
                       currentIdx === idx 
                         ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110 z-10 italic" 
                         : answers[q.id] !== undefined
                           ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                           : "bg-white/[0.03] text-zinc-600 border-white/[0.05] hover:border-white/20"
                     )}
                   >
                     {idx + 1}
                     {answers[q.id] !== undefined && currentIdx !== idx && (
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full" />
                     )}
                   </button>
                 ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                 <LegendItem color="bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" label="Active Interface" />
                 <LegendItem color="bg-emerald-500/20 border border-emerald-500/40" label="Logic Registered" />
                 <LegendItem color="bg-white/5 border border-white/10" label="Untouched Synapse" />
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                   &quot;Cognitive fatigue detected. Remember to recalibrate your breathing every 10 questions.&quot;
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-4 group">
       <div className={cn("h-4 w-4 rounded-md transition-transform group-hover:scale-125", color)} />
       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400 transition-colors">{label}</span>
    </div>
  )
}
