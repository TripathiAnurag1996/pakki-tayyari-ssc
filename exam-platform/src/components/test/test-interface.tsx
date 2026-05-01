'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Clock, 
  Target, 
  ShieldCheck,
  AlertCircle,
  GraduationCap,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { Question } from '@/types'

interface TestInterfaceProps {
  sessionId: string
  initialQuestions: Question[]
  timeLimit?: number // in minutes
}

export default function TestInterface({ sessionId, initialQuestions, timeLimit = 60 }: TestInterfaceProps) {
  const router = useRouter()
  const supabase = createClient()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [flagged, setFlagged] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const currentQuestion = initialQuestions[currentIndex]
  const progress = ((Object.keys(answers).length) / initialQuestions.length) * 100

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }))
  }

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(currentIndex)) next.delete(currentIndex)
      else next.add(currentIndex)
      return next
    })
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const timeTaken = (timeLimit * 60) - timeLeft
      
      const responses = Object.entries(answers).map(([question_id, selected_option]) => ({
        question_id,
        selected_option,
        time_spent_seconds: 0 // We can implement more granular tracking later
      }))

      const response = await fetch(`/api/sessions/${sessionId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          responses,
          time_taken_seconds: timeTaken
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
      }

      toast.success('Practice Session Completed', {
        description: 'Analyzing your performance...'
      })
      
      router.push(`/results/${sessionId}`)
    } catch (err: any) {
      toast.error('Sync Error', {
        description: err.message || 'Failed to synchronize mastery data. Retrying...'
      })
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/30 font-sans noise">
      {/* Tactical Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-darker border-b border-white/5 backdrop-blur-3xl px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
               <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
               <span className="text-xl font-black tracking-tighter uppercase italic">Platform: <span className="text-primary tracking-normal">Pakki Tayyari</span></span>
               <span className="text-[9px] font-black tracking-[0.4em] text-zinc-400 uppercase">SSC CGL Practice Portal</span>
            </div>
          </div>

         <div className="flex items-center gap-12">
            <div className="flex flex-col items-center gap-1">
               <div className={cn(
                 "flex items-center gap-3 px-4 py-1.5 rounded-full border bg-white/[0.02] tabular-nums transition-all duration-500",
                 timeLeft < 300 ? "border-red-500/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "border-white/5 text-zinc-400"
               )}>
                 <Clock className={cn("h-4 w-4", timeLeft < 300 && "animate-pulse")} />
                  <span className="text-sm font-black tracking-widest">{formatTime(timeLeft)}</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Time Remaining</span>
             </div>

            <div className="h-10 w-[1px] bg-white/5" />

            <div className="flex flex-col items-end gap-1">
               <div className="flex items-center gap-3">
                 <div className="h-1.5 w-48 bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                   <div 
                     className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-700"                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                  <span className="text-sm font-black text-white italic tabular-nums">{Math.round(progress)}%</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Attempt Progress</span>
             </div>
         </div>

          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            variant="outline"
            className="h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[11px] border-white/10 hover:bg-white/5 transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Finish Test'}
          </Button>
      </header>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto grid grid-cols-12 gap-12">
        {/* Primary Neural Interface */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between px-2">
              <div className="badge-tactical !py-1 !px-4 !text-zinc-400">Question {currentIndex + 1} of {initialQuestions.length}</div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                 <span className="flex items-center gap-2 text-primary/80"><Target className="h-3 w-3" /> {currentQuestion.subject}</span>
                 <span className="h-1 w-1 rounded-full bg-zinc-500" />
                 <span className="flex items-center gap-2 text-amber-500/80"><Zap className="h-3 w-3" /> {currentQuestion.difficulty}</span>
              </div>
           </div>

            <div className="bento-card bg-gradient-to-br from-white/[0.02] to-transparent !p-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <GraduationCap className="h-32 w-32" />
               </div>
              <p className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter mb-12 relative z-10">
                {currentQuestion.question_text}
              </p>

              <div className="grid gap-4 relative z-10">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={cn(
                      "group/btn w-full p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex items-center justify-between",
                      answers[currentQuestion.id] === idx
                        ? "bg-primary/10 border-primary shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "h-10 w-10 rounded-xl border flex items-center justify-center font-black transition-all duration-300",
                        answers[currentQuestion.id] === idx
                          ? "bg-primary border-primary text-white scale-110"
                          : "bg-white/5 border-white/10 text-zinc-400 group-hover/btn:border-white/20 group-hover/btn:text-white"
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={cn(
                        "text-xl font-bold transition-all duration-300",
                        answers[currentQuestion.id] === idx ? "text-white" : "text-zinc-400 group-hover/btn:text-white"
                      )}>
                        {option}
                      </span>
                    </div>
                    {answers[currentQuestion.id] === idx && (
                      <ShieldCheck className="h-6 w-6 text-primary animate-in zoom-in duration-300" />
                    )}
                  </button>
                ))}
              </div>
           </div>

           {/* Navigation Controls */}
           <div className="flex items-center justify-between px-2">
               <Button
                variant="ghost"
                size="lg"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(i => i - 1)}
                className="h-14 px-8 rounded-xl font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5"
              >
                <ChevronLeft className="mr-2 h-5 w-5" /> Previous
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={toggleFlag}
                className={cn(
                  "h-14 px-8 rounded-xl font-black uppercase tracking-widest transition-all",
                  flagged.has(currentIndex) 
                    ? "text-amber-500 bg-amber-500/10 border-amber-500/20" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Flag className={cn("mr-2 h-5 w-5", flagged.has(currentIndex) && "fill-current")} /> 
                {flagged.has(currentIndex) ? 'Flagged for Review' : 'Mark for Review'}
              </Button>

              {currentIndex === initialQuestions.length - 1 ? (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                   className="h-14 px-10 rounded-xl font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 shadow-[0_15px_30px_rgba(16,185,129,0.3)]"
                >
                  Submit Exam <ShieldCheck className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setCurrentIndex(i => i + 1)}
                  className="h-14 px-10 rounded-xl font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(99,102,241,0.3)] hover:scale-105 transition-all"
                >
                  Next Question <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              )}
           </div>
        </div>

        {/* Command Sidebar: The Grid Map */}
         <div className="hidden lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4 px-2">
               <GraduationCap className="h-6 w-6 text-zinc-500" />
               <h3 className="text-3xl font-black tracking-tighter text-white uppercase italic">Question Navigator</h3>
            </div>
           
           <div className="bento-card !p-10 space-y-10 border-white/5 bg-white/[0.01]">
              <div className="grid grid-cols-5 gap-4">
                {initialQuestions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                     className={cn(
                      "aspect-square rounded-xl flex items-center justify-center font-black text-sm transition-all duration-300 relative group/dot",
                      currentIndex === idx 
                        ? "bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110" 
                        : flagged.has(idx)
                          ? "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                          : answers[initialQuestions[idx].id] !== undefined
                            ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20"
                            : "bg-white/[0.04] text-zinc-500 border border-white/10 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {idx + 1}
                    {flagged.has(idx) && (
                      <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-amber-500 rounded-full border-2 border-[#020202]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Status Indicators</div>
                  <div className="grid grid-cols-2 gap-4">
                     <LegendItem label="Current" color="bg-primary" />
                     <LegendItem label="Attempted" color="bg-emerald-500/40" />
                     <LegendItem label="Review" color="bg-amber-500" />
                     <LegendItem label="Unvisited" color="bg-white/5" />
                  </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                     <AlertCircle className="h-6 w-6 text-primary" />
                     <div className="space-y-0.5">
                        <p className="text-xs font-black text-white uppercase tracking-widest">Exam Tip</p>
                        <p className="text-[10px] text-zinc-500 font-bold leading-tight">Don&apos;t spend too much time on a single question. Mark for review and proceed.</p>
                     </div>
                  </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}

function LegendItem({ label, color }: { label: string, color: string }) {
  return (
    <div className="flex items-center gap-3">
       <div className={cn("h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]", color)} />
       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
  )
}
