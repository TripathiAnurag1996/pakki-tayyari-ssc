import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { formatDuration, formatPercentage, formatDate } from '@/lib/utils/format'
import { CheckCircle2, XCircle, AlertCircle, ArrowLeft, Clock, Zap, Target, BrainCircuit, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: session, error: sessionError } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('id', id)
    .single()

  if (sessionError || !session) notFound()

  const { data: responses, error: responseError } = await supabase
    .from('responses')
    .select('*, questions(*)')
    .eq('session_id', id)

  if (responseError) return <div className="p-12 text-center font-black text-red-500 uppercase tracking-widest">Cognitive Link Failure.</div>

  const correctCount = responses.filter(r => r.is_correct).length
  const totalCount = session.total_questions

  return (
    <div className="space-y-12 animate-in-fade">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
             <Zap className="h-3 w-3" /> Cognitive Post-Mortem
           </div>
           <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
             STRATEGIC <br />
             <span className="text-primary italic">DEBRIEF.</span>
           </h2>
           <p className="text-zinc-500 text-lg font-medium max-w-xl">
             Comprehensive surgical analysis of your knowledge gaps and temporal efficiency mapping.
           </p>
        </div>
        <Link href="/dashboard">
          <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-lg font-black border-white/5 hover:bg-white/5 hover:border-white/10 transition-all">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Sanctum
          </Button>
        </Link>
      </div>

      {/* Summary Bento Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <BentoResultStat 
          label="Surgical Accuracy" 
          value={formatPercentage(session.accuracy || 0)} 
          sub={`${correctCount} perfect hits out of ${totalCount}`}
          icon={<Target className="h-6 w-6 text-emerald-500" />}
          color="emerald"
        />
        <BentoResultStat 
          label="Temporal Intensity" 
          value={formatDuration(session.time_taken_seconds || 0)} 
          sub={`Avg. ${Math.round(session.time_taken_seconds / totalCount)}s / question`}
          icon={<Clock className="h-6 w-6 text-sky-500" />}
          color="sky"
        />
        <BentoResultStat 
          label="Cognitive Percentile" 
          value="TOP 2%" 
          sub="Elite performance bracket"
          icon={<BrainCircuit className="h-6 w-6 text-violet-500" />}
          color="violet"
        />
      </div>

      {/* Question breakdown */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-2">
           <h3 className="text-3xl font-black tracking-tighter text-white italic">The Knowledge Repository</h3>
           <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        
        <div className="grid gap-10">
          {responses.map((resp, idx) => {
            const q = resp.questions
            return (
              <div key={resp.id} className={cn(
                "group relative grid md:grid-cols-12 gap-0 overflow-hidden rounded-[40px] border transition-all duration-700",
                resp.is_correct 
                  ? "bg-emerald-500/[0.02] border-emerald-500/10 hover:border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.05)]" 
                  : "bg-red-500/[0.02] border-red-500/10 hover:border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.05)]"
              )}>
                {/* Index Col */}
                <div className={cn(
                  "md:col-span-1 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/[0.05] relative",
                  resp.is_correct ? "bg-emerald-500/5" : "bg-red-500/5"
                )}>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2">Item</span>
                   <span className="text-5xl font-black text-white italic">{idx + 1}</span>
                </div>

                {/* Content Col */}
                <div className="md:col-span-11 p-10 md:p-16 space-y-10 relative">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                         <div className={cn(
                           "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                           resp.is_correct ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                         )}>
                            {resp.is_correct ? "Validated Hit" : "Cognitive Leakage"}
                         </div>
                         <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{q.subject || 'General Intelligence'}</span>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-white leading-[1.1] tracking-tight">{q.question_text}</p>
                   </div>

                   <div className="grid gap-4 md:grid-cols-2">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isCorrect = optIdx === q.correct_option
                        const isSelected = optIdx === resp.selected_option
                        
                        return (
                          <div 
                            key={optIdx}
                            className={cn(
                              "p-6 rounded-2xl text-lg font-bold border-2 transition-all flex items-center gap-5 relative overflow-hidden",
                              isCorrect 
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                                : isSelected
                                  ? "bg-red-500/10 border-red-500/40 text-red-100"
                                  : "bg-white/[0.02] border-white/[0.05] text-zinc-500"
                            )}
                          >
                            <div className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center font-black shrink-0 transition-all",
                              isCorrect ? "bg-emerald-500 text-white" : isSelected ? "bg-red-500 text-white" : "bg-white/10"
                            )}>
                              {String.fromCharCode(65 + optIdx)}
                            </div>
                            <span className="flex-1">{opt}</span>
                            {isCorrect && <CheckCircle2 className="h-6 w-6 text-emerald-400 animate-pulse" />}
                            {!isCorrect && isSelected && <XCircle className="h-6 w-6 text-red-400" />}
                          </div>
                        )
                      })}
                   </div>

                   {q.solution_text && (
                     <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group/eluc hover:border-primary/30 transition-colors">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                        <div className="flex items-center text-primary font-black mb-4 uppercase tracking-[0.2em] text-xs">
                          <Sparkles className="h-4 w-4 mr-3" />
                          Expert Elucidation
                        </div>
                        <p className="text-zinc-400 text-lg font-medium leading-relaxed italic">
                          &quot;{q.solution_text}&quot;
                        </p>
                     </div>
                   )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function BentoResultStat({ label, value, sub, icon, color }: { label: string, value: string, sub: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bento-card group">
      <div className="flex items-center justify-between mb-6">
         <div className={cn(
           "h-12 w-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform",
           `bg-${color}-500/10`
         )}>
           {icon}
         </div>
         <div className="h-1 w-12 bg-white/5 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-black text-white tracking-tighter italic">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</div>
        <p className="text-xs font-bold text-zinc-600 mt-2">{sub}</p>
      </div>
    </div>
  )
}
