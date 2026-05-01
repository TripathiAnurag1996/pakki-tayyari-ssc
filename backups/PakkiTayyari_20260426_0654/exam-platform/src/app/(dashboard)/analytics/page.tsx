import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatPercentage } from '@/lib/utils/format'
import { TrendingUp, Target, BrainCircuit } from 'lucide-react'
import { cn } from '@/lib/utils'

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

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in-fade">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
          Intelligence
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Cognitive <span className="text-primary text-glow">Metrics</span></h2>
        <p className="text-muted-foreground text-lg">Predictive insights and subject mastery mapping.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass border-0 ring-1 ring-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Proficiency</CardDescription>
            <TrendingUp className="h-4 w-4 text-emerald-500 text-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-white tracking-tighter">
              {sessions && sessions.length > 0 
                ? formatPercentage(sessions.reduce((acc, s) => acc + (s.accuracy || 0), 0) / sessions.length)
                : '0%'
              }
            </div>
            <p className="text-xs text-zinc-500 font-medium pt-2">Synthesized from {sessions?.length || 0} active sessions</p>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 ring-1 ring-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Focus Momentum</CardDescription>
            <Target className="h-4 w-4 text-sky-500 text-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-white tracking-tighter">
              High
            </div>
            <p className="text-xs text-zinc-500 font-medium pt-2">Improving consistency in Quantitative Aptitude</p>
          </CardContent>
        </Card>

        <Card className="glass border-0 ring-1 ring-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Daily Streak</CardDescription>
            <BrainCircuit className="h-4 w-4 text-violet-500 text-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-white tracking-tighter">
              7 Days
            </div>
            <p className="text-xs text-zinc-500 font-medium pt-2">Consistency is the key to mastery</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass border-0 ring-1 ring-white/10 shadow-2xl col-span-1 overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5 p-6">
            <CardTitle className="flex items-center text-xl font-bold text-white">
              <BrainCircuit className="mr-3 h-5 w-5 text-violet-500" />
              Knowledge Mapping
            </CardTitle>
            <CardDescription className="text-zinc-500 font-medium">Subject-specific proficiency indicators</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
             <div className="space-y-8">
                {analyzedSubjects.length > 0 ? analyzedSubjects.map(sub => (
                  <div key={sub.name} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-white tracking-tight">{sub.name}</span>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{sub.count} Sessions</p>
                      </div>
                      <span className="text-lg font-black text-white tabular-nums">{formatPercentage(sub.avgAccuracy)}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary),0.3)]",
                          sub.avgAccuracy > 70 ? "bg-emerald-500" : sub.avgAccuracy > 40 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${sub.avgAccuracy}%` }}
                      />
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-zinc-500 font-medium mb-4">Insufficient data to map proficiency.</p>
                    <div className="h-1 w-24 bg-white/5 mx-auto rounded-full" />
                  </div>
                )}
             </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 ring-1 ring-white/10 shadow-2xl col-span-1 overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5 p-6">
             <CardTitle className="flex items-center text-xl font-bold text-white">
              <Target className="mr-3 h-5 w-5 text-sky-500" />
              Strategic Initiatives
            </CardTitle>
            <CardDescription className="text-zinc-500 font-medium">AI-driven focus areas for maximal impact</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
             <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors">
                   <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
                   <h5 className="font-bold text-white text-base mb-2">Subject Concentration</h5>
                   <p className="text-sm text-zinc-400 leading-relaxed">Your accuracy in History has dropped by 12% recently. We recommend a concentrated 20-question practice set to stabilize your retention.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors">
                   <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
                   <h5 className="font-bold text-white text-base mb-2">Temporal Efficiency</h5>
                   <p className="text-sm text-zinc-400 leading-relaxed">Latency analysis shows high deliberation on &quot;Hard&quot; difficulty questions. Consider taking 3-4 speed-drills to improve your response time.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors opacity-50 grayscale pointer-events-none">
                   <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                   <h5 className="font-bold text-white text-base mb-2">Adaptive Benchmark</h5>
                   <p className="text-sm text-zinc-400 leading-relaxed">Maintain current momentum for 3 more days to unlock advanced mock simulators.</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
