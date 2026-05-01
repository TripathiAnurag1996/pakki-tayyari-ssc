import { createClient } from '@/lib/supabase/server'
import { formatPercentage } from '@/lib/utils/format'
import { 
  TrendingUp, 
  Target, 
  BrainCircuit, 
  Activity, 
  Zap, 
  Layers,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch all completed sessions with subject data
  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('status', 'completed')

  // Group by subject for analytics
  const subjectStats: Record<string, { total: number, accuracy: number }> = {}
  
  sessions?.forEach(s => {
    const sub = s.subject || 'General'
    if (!subjectStats[sub]) {
      subjectStats[sub] = { total: 0, accuracy: 0 }
    }
    subjectStats[sub].total += 1
    subjectStats[sub].accuracy += (s.accuracy || 0)
  })

  const analyzedSubjects = Object.keys(subjectStats).map(name => ({
    name,
    count: subjectStats[name].total,
    avgAccuracy: subjectStats[name].accuracy / subjectStats[name].total
  })).sort((a, b) => b.avgAccuracy - a.avgAccuracy)

  const globalAccuracy = sessions && sessions.length > 0 
    ? sessions.reduce((acc, s) => acc + (s.accuracy || 0), 0) / sessions.length
    : 0

  return (
    <div className="space-y-16 animate-in-fade pb-20">
      {/* Intelligence Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-inner backdrop-blur-xl">
             <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live Neural Intelligence
          </div>
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
              COGNITIVE <br />
              <span className="text-primary italic">MAPPING.</span>
            </h2>
            <p className="text-zinc-500 text-xl font-medium tracking-tight max-w-xl">Predictive insights and cross-domain mastery vectorization.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <Button className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_15px_30px_rgba(99,102,241,0.3)] group transition-all">
              Full Diagnostics Report <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
           </Button>
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <IntelligenceCard 
          label="Global Proficiency" 
          value={formatPercentage(globalAccuracy)} 
          sub={`Synthesized from ${sessions?.length || 0} sessions`}
          icon={<TrendingUp className="h-6 w-6 text-emerald-400" />}
          trend="Top 4% Overall"
          color="text-emerald-400"
        />
        <IntelligenceCard 
          label="Neural Consistency" 
          value="84.2%" 
          sub="Session Latency Deviation"
          icon={<Activity className="h-6 w-6 text-sky-400" />}
          trend="Optimal Stability"
          color="text-sky-400"
        />
        <IntelligenceCard 
          label="Mastery Streak" 
          value="12 Days" 
          sub="Session Continuity"
          icon={<BrainCircuit className="h-6 w-6 text-violet-400" />}
          trend="Next Milestone: 14D"
          color="text-violet-400"
        />
      </div>

      {/* Detailed Diagnostics Breakdown */}
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Knowledge Mapping: Subject Progress */}
        <div className="lg:col-span-7 space-y-8">
           <div className="flex items-center gap-4 px-2">
              <Layers className="h-6 w-6 text-zinc-500" />
              <h3 className="text-3xl font-black tracking-tighter text-white uppercase italic">Knowledge Domain Vectoring</h3>
           </div>
           
           <div className="bento-card !p-10 space-y-10 border-white/5 bg-white/[0.01]">
              <div className="space-y-10">
                 {analyzedSubjects.length > 0 ? analyzedSubjects.map(sub => (
                   <div key={sub.name} className="space-y-4 group">
                     <div className="flex justify-between items-end">
                       <div className="space-y-1">
                         <span className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-primary transition-colors">{sub.name}</span>
                         <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                            <span>{sub.count} Engagements</span>
                            <span className="h-1 w-1 bg-zinc-500 rounded-full" />
                            <span>Subject ID: {sub.name.slice(0,3).toUpperCase()}</span>
                         </div>
                       </div>
                       <div className="text-3xl font-black text-white tabular-nums tracking-tighter italic">{formatPercentage(sub.avgAccuracy)}</div>
                     </div>
                     <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                       <div 
                         className={cn(
                           "h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                           sub.avgAccuracy > 70 ? "bg-emerald-500" : sub.avgAccuracy > 40 ? "bg-amber-500" : "bg-red-500"
                         )}
                         style={{ width: `${sub.avgAccuracy}%` }}
                       />
                     </div>
                   </div>
                 )) : (
                   <div className="text-center py-20 opacity-30">
                     <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-sm">Insufficient Data for Vectoring</p>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Strategic Initiatives: AI Advice */}
        <div className="lg:col-span-5 space-y-8">
           <div className="flex items-center gap-4 px-2">
              <Sparkles className="h-6 w-6 text-zinc-500" />
              <h3 className="text-3xl font-black tracking-tighter text-white uppercase italic">Strategic Initiatives</h3>
           </div>

           <div className="space-y-6">
              <StrategyItem 
                title="Cognitive Concentration" 
                desc="Your accuracy in History has dropped by 12% recently. Recommend a concentrated 20-vector set to stabilize retention."
                color="bg-sky-500"
                icon={<Target className="h-5 w-5 text-sky-500" />}
              />
              <StrategyItem 
                title="Temporal Efficiency" 
                desc="Latency analysis shows high deliberation on 'Hard' vectors. Consider speed-drills to improve response time."
                color="bg-violet-500"
                icon={<Zap className="h-5 w-5 text-violet-500" />}
              />
              <StrategyItem 
                title="Mastery Benchmark" 
                desc="Maintain current momentum for 3 more cycles to unlock advanced tactical simulators."
                color="bg-emerald-500"
                icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />}
                locked
              />
           </div>
        </div>
      </div>
    </div>
  )
}

function IntelligenceCard({ label, value, sub, icon, trend, color }: { label: string, value: string, sub: string, icon: React.ReactNode, trend: string, color: string }) {
  return (
    <div className="bento-card group hover:scale-[1.02] transition-all duration-500">
      <div className="flex items-start justify-between mb-10">
         <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:bg-primary/10">
           {icon}
         </div>
         <div className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.02] border border-white/5", color)}>{trend}</div>
      </div>
      <div className="space-y-1">
        <div className={cn("text-5xl font-black tracking-tighter italic leading-none mb-2", color)}>{value}</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">{label}</div>
        <div className="h-0.5 w-12 bg-white/5 rounded-full overflow-hidden">
           <div className={cn("h-full bg-current transition-all duration-1000", color)} style={{ width: '75%' }} />
        </div>
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pt-4">{sub}</p>
      </div>
    </div>
  )
}

function StrategyItem({ title, desc, color, icon, locked }: { title: string, desc: string, color: string, icon: React.ReactNode, locked?: boolean }) {
  return (
    <div className={cn(
      "bento-card !p-8 border-white/5 group hover:border-primary/20 transition-all duration-500",
      locked && "opacity-40 grayscale pointer-events-none"
    )}>
       <div className="flex items-start gap-6">
          <div className="mt-1 h-10 w-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
             {icon}
          </div>
          <div className="space-y-2">
             <h4 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-primary transition-colors">{title}</h4>
             <p className="text-zinc-500 text-lg font-medium leading-tight tracking-tight">{desc}</p>
          </div>
       </div>
       <div className={cn("absolute top-0 left-0 w-1 h-full", color)} />
    </div>
  )
}
