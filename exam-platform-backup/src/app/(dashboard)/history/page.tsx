import { createClient } from '@/lib/supabase/server'
import { formatDuration, formatPercentage, formatDate } from '@/lib/utils/format'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ExternalLink, 
  Filter, 
  History, 
  Search, 
  Award, 
  Clock, 
  Zap, 
  ArrowRight,
  Layers,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function HistoryPage() {
  const supabase = await createClient()

  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .order('started_at', { ascending: false })

  return (
    <div className="space-y-16 animate-in-fade pb-20">
      {/* Tactical Archive Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 shadow-inner">
             <History className="h-3.5 w-3.5" /> Chronological Archives
          </div>
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
              TACTICAL <br />
              <span className="text-primary italic">RECAP.</span>
            </h2>
            <p className="text-zinc-500 text-xl font-medium tracking-tight max-w-xl">Comprehensive ledger of all neural engagements and cognitive extractions.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group/search hidden md:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within/search:text-primary transition-colors" />
              <input 
                placeholder="Search Archives..." 
                className="h-14 w-80 bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-6 text-sm font-bold placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-all text-white"
              />
           </div>
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/5 hover:bg-white/5 font-black uppercase tracking-widest text-[10px]">
              <Filter className="mr-2 h-4 w-4" /> Filter Records
           </Button>
        </div>
      </div>

      {/* Grid of Engagement Cards */}
      <div className="space-y-6">
        {sessions && sessions.length > 0 ? sessions.map((session) => (
          <Link 
            key={session.id} 
            href={session.status === 'completed' ? `/results/${session.id}` : `/test/${session.id}`}
            className="block group"
          >
            <div className="bento-card !p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 border-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
               <div className="flex items-center gap-8">
                  {/* Status Indicator */}
                  <div className={cn(
                    "h-20 w-20 rounded-[2rem] flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-110 relative overflow-hidden",
                    session.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                  )}>
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
                     {session.status === 'completed' ? (
                       <Award className="h-9 w-9 relative z-10" />
                     ) : (
                       <Clock className="h-9 w-9 relative z-10" />
                     )}
                  </div>

                  <div className="space-y-3">
                     <div className="flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-black text-white tracking-tighter group-hover:text-primary transition-colors italic uppercase">
                          {session.subject || 'Mixed Neural Set'}
                        </span>
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                          session.mode === 'mock' ? "bg-pink-500/10 text-pink-500 border-pink-500/20" : "bg-sky-500/10 text-sky-500 border-sky-500/20"
                        )}>
                          {session.mode} Mode
                        </div>
                     </div>
                     <div className="flex items-center gap-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2"><Layers className="h-3.5 w-3.5" /> {session.subtopic || 'Multiple Topics'}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                        <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {formatDate(session.started_at)}</span>
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-12 self-end md:self-center">
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Operational Precision</span>
                     <div className="text-4xl font-black text-white tabular-nums tracking-tighter italic">
                       {session.accuracy ? formatPercentage(session.accuracy) : '---'}
                     </div>
                  </div>

                  <div className="h-12 w-[1px] bg-white/5 hidden md:block" />

                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Success Ratio</span>
                     <div className="text-4xl font-black text-white tabular-nums tracking-tighter italic">
                       {session.status === 'completed' ? `${session.score}/${session.total_questions}` : 'ACTIVE'}
                     </div>
                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                     <ChevronRight className="h-6 w-6 text-zinc-500 group-hover:text-white" />
                  </div>
               </div>
            </div>
          </Link>
        ) ) : (
          <div className="bento-card text-center py-40 border-dashed border-white/5 opacity-30">
            <History className="h-16 w-16 mx-auto mb-6 text-zinc-500" />
            <p className="text-zinc-400 font-black uppercase tracking-[0.5em] text-sm">Temporal Records Empty</p>
          </div>
        )}
      </div>

      {/* Pagination Placeholder */}
      {sessions && sessions.length > 0 && (
         <div className="flex items-center justify-center pt-10">
            <Button variant="ghost" className="text-zinc-500 hover:text-white font-black uppercase tracking-widest text-[10px]">
               Initialize Deeper Archive Fetch <Zap className="ml-2 h-4 w-4 fill-current" />
            </Button>
         </div>
      )}
    </div>
  )
}
