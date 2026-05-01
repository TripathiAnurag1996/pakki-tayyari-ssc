import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Target,
  Clock,
  Award,
  Zap,
  ArrowRight,
  BrainCircuit,
  TrendingUp,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { formatDuration, formatPercentage, formatDate } from '@/lib/utils/format'
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
    <div className="space-y-10 animate-in-fade">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
             Live Overview
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Welcome, <span className="text-primary italic">Aspirant.</span>
          </h2>
          <p className="text-zinc-500 text-lg font-medium">Your cognitive performance is trending <span className="text-emerald-500 font-bold">upward</span> this week.</p>
        </div>
        <Link href="/practice">
          <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-black shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95 transition-all">
            Initialize Practice <Zap className="ml-2 h-5 w-5 fill-current" />
          </Button>
        </Link>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <BentoStat 
          label="Total Mastery" 
          value={totalQuestions.toString()} 
          sub="Questions analyzed"
          icon={<BrainCircuit className="h-5 w-5 text-primary" />}
        />
        <BentoStat 
          label="Surgical Accuracy" 
          value={formatPercentage(avgAccuracy)} 
          sub="Across all subjects"
          icon={<Target className="h-5 w-5 text-emerald-500" />}
        />
        <BentoStat 
          label="Focus Sessions" 
          value={stats?.length.toString() || '0'} 
          sub="Completed attempts"
          icon={<Activity className="h-5 w-5 text-sky-500" />}
        />
        <BentoStat 
          label="Rank Velocity" 
          value="+12%" 
          sub="Top 5% percentile"
          icon={<TrendingUp className="h-5 w-5 text-violet-500" />}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-7">
        {/* Recent Activity */}
        <div className="md:col-span-4 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-black tracking-tighter text-white">Recent Engagement</h3>
              <Link href="/history">
                 <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white font-bold">
                    View Archive <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
              </Link>
           </div>
           
           <div className="space-y-4">
              {sessions && sessions.length > 0 ? sessions.map((session) => (
                <Link key={session.id} href={session.status === 'completed' ? `/results/${session.id}` : `/test/${session.id}`}>
                  <div className="group bento-card !p-6 flex items-center justify-between hover:bg-white/[0.05] border-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                        session.status === 'completed' ? "bg-emerald-500/10" : "bg-primary/10"
                      )}>
                        {session.status === 'completed' ? (
                          <Award className="h-6 w-6 text-emerald-500" />
                        ) : (
                          <Clock className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-black text-white tracking-tight group-hover:text-primary transition-colors">
                          {session.subject || 'Mixed Practice Set'}
                        </p>
                        <div className="flex items-center gap-3 text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                          <span>{formatDate(session.started_at)}</span>
                          <span className="h-1 w-1 rounded-full bg-zinc-700" />
                          <span className={session.mode === 'mock' ? "text-pink-500" : "text-sky-500"}>{session.mode}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-black text-white tabular-nums">
                         {session.status === 'completed' ? `${session.score}/${session.total_questions}` : 'IN PROGRESS'}
                       </div>
                       <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Performance</div>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="bento-card text-center py-12 border-dashed border-white/10">
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No recent activity detected.</p>
                </div>
              )}
           </div>
        </div>

        {/* Intelligence Insights */}
        <div className="md:col-span-3 space-y-6">
           <h3 className="text-2xl font-black tracking-tighter text-white px-2">AI Insights</h3>
           <div className="bento-card bg-gradient-to-br from-primary/5 to-transparent border-primary/10 space-y-6">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary fill-current" />
                    <span className="text-sm font-black uppercase tracking-widest text-white">Critical Focus Areas</span>
                 </div>
                 <div className="space-y-3">
                    <InsightItem label="Indian Polity" value="82%" color="bg-emerald-500" />
                    <InsightItem label="Quantitative" value="45%" color="bg-red-500" />
                    <InsightItem label="History" value="68%" color="bg-amber-500" />
                 </div>
              </div>
              
              <div className="pt-6 border-t border-white/5">
                 <p className="text-sm text-zinc-400 font-medium leading-relaxed italic">
                   &quot;Your deliberation speed on &apos;Hard&apos; difficulty questions has improved by 4 seconds. Maintain this momentum to reach the top 2% percentile.&quot;
                 </p>
              </div>

              <Button className="w-full h-12 rounded-xl font-black group">
                Full Intelligence Report <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}

function BentoStat({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="bento-card group">
      <div className="flex items-center justify-between mb-4">
         <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
           {icon}
         </div>
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-black text-white tracking-tighter italic">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</div>
        <p className="text-[10px] font-bold text-zinc-600 mt-1">{sub}</p>
      </div>
    </div>
  )
}

function InsightItem({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
          <span className="text-zinc-400">{label}</span>
          <span className="text-white">{value}</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: value }} />
       </div>
    </div>
  )
}
