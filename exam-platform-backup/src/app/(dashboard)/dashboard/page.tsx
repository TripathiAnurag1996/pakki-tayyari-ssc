import { createClient } from '@/lib/supabase/server'
import {
  Target,
  Clock,
  Award,
  Zap,
  ArrowRight,
  BrainCircuit,
  TrendingUp,
  Activity,
  History,
  Layers
} from 'lucide-react'
import Link from 'next/link'
import { formatPercentage, formatDate } from '@/lib/utils/format'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(5)

  const { data: stats } = await supabase
    .from('test_sessions')
    .select('score, total_questions, accuracy')
    .eq('status', 'completed')

  const totalQuestions = stats?.reduce((acc, s) => acc + (s.total_questions || 0), 0) || 0
  const avgAccuracy = stats && stats.length > 0 
    ? stats.reduce((acc, s) => acc + (s.accuracy || 0), 0) / stats.length 
    : 0

  return (
    <div className="space-y-12 animate-in-fade pb-20">
      {/* Tactical Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary shadow-inner">
             <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live Operational Status
          </div>
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
              Welcome, <br />
              <span className="text-primary italic">Command.</span>
            </h2>
            <p className="text-zinc-500 text-xl font-medium tracking-tight">Your neural synchronization is at <span className="text-emerald-400 font-black">94% efficiency</span> today.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Link href="/practice">
            <Button size="xl" variant="shimmer" className="shadow-[0_20px_40px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95 transition-all group font-black uppercase tracking-widest italic">
              Initialize Mastery <Zap className="ml-2 h-6 w-6 fill-current transition-transform group-hover:rotate-12" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mastery Bento Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MasteryStat 
          label="Total Questions Analyzed" 
          value={totalQuestions.toString()} 
          sub="Neural Data Points"
          icon={<BrainCircuit className="h-6 w-6 text-primary" />}
          trend="+1.2k this week"
        />
        <MasteryStat 
          label="Operational Accuracy" 
          value={formatPercentage(avgAccuracy)} 
          sub="Surgical Precision"
          icon={<Target className="h-6 w-6 text-emerald-400" />}
          trend="Top 4% of Cohort"
        />
        <MasteryStat 
          label="Completed Missions" 
          value={stats?.length.toString() || '0'} 
          sub="Successful Extractions"
          icon={<Activity className="h-6 w-6 text-sky-400" />}
          trend="82% Success Rate"
        />
        <MasteryStat 
          label="Rank Velocity" 
          value="+14.2%" 
          sub="Vectoring Upward"
          icon={<TrendingUp className="h-6 w-6 text-violet-400" />}
          trend="Predicted Rank: #42"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Engagement Logs */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                 <History className="h-6 w-6 text-zinc-500" />
                 <h3 className="text-3xl font-black tracking-tighter text-white">Operational Logs</h3>
              </div>
              <Link href="/history">
                 <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white -mr-2 font-black uppercase tracking-widest text-[10px]">
                    Archive <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
              </Link>
           </div>
           
           <div className="space-y-4">
              {sessions && sessions.length > 0 ? sessions.map((session) => (
                <Link key={session.id} href={session.status === 'completed' ? `/results/${session.id}` : `/test/${session.id}`}>
                  <div className="group bento-card !p-8 flex items-center justify-between hover:bg-white/[0.04] border-white/[0.02] transition-all duration-500">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                        session.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                      )}>
                        {session.status === 'completed' ? (
                          <Award className="h-7 w-7" />
                        ) : (
                          <Clock className="h-7 w-7" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">
                          {session.subject || 'Mixed Neural Set'}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                          <span className="flex items-center gap-1.5"><Layers className="h-3 w-3" /> {session.mode}</span>
                          <span className="h-1 w-1 rounded-full bg-zinc-500" />
                          <span>{formatDate(session.started_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                       <div className="text-3xl font-black text-white tabular-nums tracking-tighter italic">
                         {session.status === 'completed' ? `${session.score}/${session.total_questions}` : 'ACTIVE'}
                       </div>
                       <div className="badge-tactical !py-0.5 !px-2 !text-[9px]">{session.status === 'completed' ? 'Extraction Complete' : 'In Progress'}</div>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="bento-card text-center py-24 border-dashed border-white/5 opacity-50">
                  <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-xs">No Data Logs Found</p>
                </div>
              )}
           </div>
        </div>

        {/* Neural Insights */}
        <div className="lg:col-span-4 space-y-8">
           <div className="flex items-center gap-4 px-2">
              <Zap className="h-6 w-6 text-zinc-500" />
              <h3 className="text-3xl font-black tracking-tighter text-white">Cognit-AI</h3>
           </div>
           <div className="bento-card bg-gradient-to-br from-primary/[0.03] to-transparent border-primary/10 p-10 space-y-10">
              <div className="space-y-6">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Subject Vectoring</div>
                 <div className="space-y-6">
                    <InsightMetric label="Indian Polity" value="82%" color="bg-emerald-400" />
                    <InsightMetric label="Quantitative" value="45%" color="bg-red-400" />
                    <InsightMetric label="History" value="68%" color="bg-amber-400" />
                 </div>
              </div>
              
              <div className="pt-8 border-t border-white/5 relative">
                 <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#0a0a0a] border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-primary">Neural Advice</div>
                 <p className="text-lg text-zinc-400 font-medium leading-relaxed italic tracking-tight">
                   &quot;Your response latency on &apos;Hard&apos; vectors is decreasing. Recommend focused drills on Quantitative Logic to break the next mastery threshold.&quot;
                 </p>
              </div>

              <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] group">
                Full Extraction Report <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}

function MasteryStat({ label, value, sub, icon, trend }: { label: string, value: string, sub: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bento-card group hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-8">
         <div className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:bg-primary/10 group-hover:border-primary/20">
           {icon}
         </div>
         <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{trend}</div>
      </div>
      <div className="space-y-1">
        <div className="text-4xl font-black text-white tracking-tighter italic leading-none mb-1">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">{label}</div>
        <div className="h-0.5 w-8 bg-primary rounded-full group-hover:w-full transition-all duration-700" />
        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest pt-2">{sub}</p>
      </div>
    </div>
  )
}

function InsightMetric({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="space-y-2.5">
       <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-zinc-400">{label}</span>
          <span className="text-white">{value}</span>
       </div>
       <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
          <div className={cn("h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.2)]", color)} style={{ width: value }} />
       </div>
    </div>
  )
}
