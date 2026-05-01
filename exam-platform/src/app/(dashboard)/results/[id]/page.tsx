import { createClient } from '@/lib/supabase/server'
import { 
  CheckCircle2, 
  XCircle, 
  Target, 
  Clock, 
  Zap, 
  ArrowLeft, 
  BarChart4,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatDuration, formatPercentage } from '@/lib/utils/format'
import { cn } from '@/lib/utils'
import { ResultsActions } from '@/components/results/results-actions'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: session } = await supabase
    .from('test_sessions')
    .select(`
      *,
      responses(
        *,
        question:questions(*)
      )
    `)
    .eq('id', id)
    .single()

  if (!session) return <div className="p-20 text-center font-black uppercase tracking-[0.5em] text-zinc-800">Result Data Not Found</div>

  return (
    <div className="space-y-16 animate-in-fade pb-32 relative">
      {/* Print-Only Header */}
      <div className="print-header">
         <div className="flex justify-between items-end mb-8">
            <div>
               <h1 className="text-3xl font-black text-primary">PAKKI TAYYARI</h1>
               <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Examination Performance Report</p>
            </div>
            <div className="text-right">
               <p className="text-sm font-bold text-black">Date: {new Date().toLocaleDateString()}</p>
               <p className="text-xs text-zinc-500 font-medium">Session ID: {session.id.slice(0, 8)}</p>
            </div>
         </div>
      </div>
      {/* Debrief Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pt-10">
        <div className="space-y-6">
          <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white -ml-4 font-black uppercase tracking-widest text-[10px]">
                 <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
              </Button>
          </Link>
          <div className="space-y-3">
             <div className="badge-tactical !py-1.5 !px-5 !bg-emerald-500/5 !text-emerald-500 !border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                Practice Completed Successfully
             </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
                Exam <br />
                <span className="text-primary italic">Results.</span>
              </h2>
              <p className="text-zinc-500 text-xl font-medium max-w-xl tracking-tight">A detailed breakdown of your performance in the <span className="text-white font-black">{session.subject || 'Practice Set'}</span> section.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 no-print">
           <Link href="/practice">
               <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/5 hover:bg-white/5 font-black uppercase tracking-widest text-[11px]">
                 Start Next Practice
               </Button>
           </Link>
           <ResultsActions />
        </div>
      </div>

      {/* Primary Intelligence Metrics */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <ResultMetric 
          label="Overall Accuracy" 
          value={formatPercentage(session.accuracy)} 
          sub="Precision Score"
          icon={<Target className="h-6 w-6 text-emerald-400" />}
          color="text-emerald-400"
        />
        <ResultMetric 
          label="Marks Obtained" 
          value={`${session.score}/${session.total_questions}`} 
          sub="Final Score"
          icon={<ShieldCheck className="h-6 w-6 text-primary" />}
          color="text-primary"
        />
        <ResultMetric 
          label="Total Time" 
          value={formatDuration(session.time_taken_seconds || 0)} 
          sub="Time Spent"
          icon={<Clock className="h-6 w-6 text-sky-400" />}
          color="text-sky-400"
        />
        <ResultMetric 
          label="Performance" 
          value="+8.2%" 
          sub="Against Average"
          icon={<TrendingUp className="h-6 w-6 text-violet-400" />}
          color="text-violet-400"
        />
      </div>

      {/* Surgical Breakdown: Question Dossier */}
      <div className="space-y-12">
        <div className="flex items-center gap-6">
           <div className="h-1 w-20 bg-primary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
           <h3 className="text-4xl font-black tracking-tighter text-white">Answer Review</h3>
        </div>
        
        <div className="space-y-8">
          {session.responses?.map((result: any, idx: number) => (
            <div key={result.id} className="bento-card group hover:bg-white/[0.03] border-white/[0.02] !p-0 overflow-hidden">
               <div className="flex flex-col lg:flex-row">
                  {/* Question Sidebar Status */}
                  <div className={cn(
                    "w-full lg:w-24 flex lg:flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/10",
                    result.is_correct ? "bg-emerald-500/5" : "bg-red-500/5"
                  )}>
                     <span className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Question</span>
                     <span className="text-3xl font-black text-white tabular-nums italic">#{idx + 1}</span>
                     <div className="mt-4">
                       {result.is_correct ? (
                         <CheckCircle2 className="h-8 w-8 text-emerald-500 text-glow" />
                       ) : (
                         <XCircle className="h-8 w-8 text-red-500 text-glow" />
                       )}
                     </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-10 space-y-10">
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <div className="badge-tactical !px-3 !py-1 !text-zinc-400">Subject: {result.question.subject}</div>
                           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                              <span>Difficulty: {result.question.difficulty}</span>
                              <span className="h-1 w-1 bg-zinc-500 rounded-full" />
                              <span>Time: {formatDuration(result.time_spent_seconds || 0)}</span>
                           </div>
                        </div>
                        <p className="text-2xl font-black text-white leading-tight tracking-tight">{result.question.question_text}</p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3 p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Your Answer</span>
                           <p className={cn("text-lg font-bold", result.is_correct ? "text-emerald-400" : "text-red-400")}>
                             {result.question.options[result.selected_option]}
                           </p>
                        </div>
                        <div className="space-y-3 p-6 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Correct Answer</span>
                           <p className="text-lg font-bold text-emerald-400">
                             {result.question.options[result.question.correct_option]}
                           </p>
                        </div>
                     </div>

                      {/* Explanation */}
                     <div className="pt-10 border-t border-white/5 relative">
                        <div className="absolute -top-3.5 left-8 px-4 py-1 bg-[#050505] border border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                           <BrainCircuit className="h-3 w-3" /> Expert Explanation
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
                           <p className="text-lg text-white font-medium leading-relaxed tracking-tight italic">
                             {result.question.solution_text || "No explanation available for this question."}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResultMetric({ label, value, sub, icon, color }: { label: string, value: string, sub: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bento-card group hover:scale-[1.02] transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
         <div className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:bg-primary/10">
           {icon}
         </div>
      </div>
      <div className="space-y-1">
        <div className={cn("text-4xl font-black tracking-tighter italic leading-none mb-1", color)}>{value}</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">{label}</div>
        <div className="h-0.5 w-12 bg-white/5 rounded-full overflow-hidden">
           <div className={cn("h-full bg-current transition-all duration-1000", color)} style={{ width: '60%' }} />
        </div>
        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest pt-3">{sub}</p>
      </div>
    </div>
  )
}
