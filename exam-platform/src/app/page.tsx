import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Target,
  BarChart4,
  Clock,
  Sparkles,
  GraduationCap,
  ChevronRight,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-x-hidden selection:bg-primary/30 selection:text-primary relative font-sans noise">
      {/* Dynamic Layered Mesh Background */}
      <div className="fixed inset-0 mesh-gradient opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />

      {/* Floating Tactical Header */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 glass rounded-3xl py-4 px-8 flex items-center justify-between border-white/5 shadow-2xl backdrop-blur-3xl">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] group-hover:rotate-[15deg] transition-all duration-700">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter text-white">
              Pakki<span className="text-primary italic">Tayyari</span>
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">SSC Practice Portal</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-zinc-500">
          <Link href="#features" className="hover:text-white transition-colors relative group">
            Features
          </Link>
          <Link href="#methodology" className="hover:text-white transition-colors relative group">
            Methodology
          </Link>
          <Link href="#analytics" className="hover:text-white transition-colors relative group">
            Analytics
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-500 hover:text-white hover:bg-white/5 font-black uppercase tracking-widest text-[11px] px-6">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button className="rounded-2xl px-8 h-12 font-black uppercase tracking-widest text-[11px] shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95 transition-all">
              Join Now
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative pt-48 pb-20">
        {/* Hero Section: The Master's Entry */}
        <section className="relative px-6 mb-32">
          <div className="max-w-7xl mx-auto text-center space-y-12 animate-in-fade">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-inner backdrop-blur-xl">
              <Sparkles className="h-3 w-3 text-violet-400" /> System Status: <span className="text-emerald-400">Optimal Performance</span>
            </div>
            
            <h1 className="text-8xl md:text-[140px] font-black tracking-tighter leading-[0.8] text-white">
              Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">Preparation.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed tracking-tight">
              A comprehensive practice platform for SSC aspirants. Master every subject with accuracy and confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
              <Link href="/login">
                <Button size="lg" className="h-20 px-16 rounded-[2rem] text-2xl font-black shadow-[0_20px_50px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 transition-all group">
                  Start Practicing <ChevronRight className="ml-2 h-8 w-8 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <div className="flex flex-col items-start gap-1">
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-10 w-10 rounded-full border-2 border-[#020202] bg-zinc-800" />
                   ))}
                   <div className="h-10 w-10 rounded-full border-2 border-[#020202] bg-primary flex items-center justify-center text-[10px] font-black">+10k</div>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Trusted by Successful Candidates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Architecture: The Bento Ledger */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <div className="space-y-4">
                   <div className="badge-tactical">Smart Learning</div>
                   <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">The Student <span className="text-primary italic">Dashboard.</span></h2>
                </div>
                <p className="text-zinc-500 font-medium max-w-sm text-right">
                  Designed to provide a focused and distraction-free environment for your preparation.
                </p>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[340px]">
              <div className="md:col-span-8 bento-card group flex flex-col justify-end">
                <div className="absolute top-10 left-10 h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-4 relative z-10">
                   <h3 className="text-4xl font-black text-white tracking-tighter">Adaptive Question Selection</h3>
                   <p className="text-zinc-400 text-xl font-medium leading-relaxed max-w-xl">
                    Dynamic difficulty adjustments based on your performance. Learn at your own pace.
                   </p>
                </div>
                <div className="absolute bottom-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                  <BookOpen className="h-64 w-64" />
                </div>
              </div>
              
              <div className="md:col-span-4 bento-card group">
                <div className="h-14 w-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-10">
                  <Clock className="h-7 w-7 text-sky-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Temporal Hardening</h3>
                <p className="text-zinc-500 text-lg font-medium leading-tight">
                  High-pressure drills designed to stabilize your performance under strict time constraints.
                </p>
              </div>

              <div className="md:col-span-4 bento-card group bg-gradient-to-br from-emerald-500/[0.02] to-transparent">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-10">
                  <BarChart4 className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Detailed Analytics</h3>
                <p className="text-zinc-500 text-lg font-medium leading-tight">
                  Track your progress across subjects, topics, and specific chapters.
                </p>
              </div>

              <div className="md:col-span-8 bento-card group flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="relative z-10 space-y-6">
                   <div className="text-8xl font-black text-white tracking-tighter italic">98.4%</div>
                   <div className="text-sm font-black uppercase tracking-[0.5em] text-primary">Success Conversion Rate</div>
                   <p className="text-zinc-500 text-lg font-medium max-w-md mx-auto">
                     Measured across 1.2M individual practice sessions over the last 12 months.
                   </p>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Methodology: The Blackbox Philosophy */}
        <section id="methodology" className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <div className="badge-tactical">Our Approach</div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
                THE SCIENCE <br />
                <span className="text-primary italic">OF RECALL.</span>
              </h2>
              <p className="text-2xl text-zinc-400 font-medium leading-relaxed tracking-tight">
                Pakki Tayyari is built on active recall and spaced repetition. We focus on what matters: your results.
              </p>
              <div className="space-y-6 pt-4">
                <TacticalFeature icon={<Lock />} title="Secure Progress Tracking" desc="Your progress is saved securely and accessible across devices." />
                <TacticalFeature icon={<Target />} title="Targeted Practice" desc="Automatically identifies and suggests practice on your weak areas." />
                <TacticalFeature icon={<Mail />} title="Expert Guidance" desc="Get insights and tips to improve your exam performance." />
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 flex items-center justify-center p-20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative z-10 w-full h-full glass rounded-[3rem] shadow-[0_0_80px_rgba(99,102,241,0.15)] flex items-center justify-center border-white/10 group-hover:border-primary/40 transition-all duration-700">
                     <Target className="h-48 w-48 text-primary text-glow transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  {/* Digital Orbitals */}
                  <div className="absolute inset-0 pointer-events-none">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-primary/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Final CTA: The Call to Arms */}
        <section className="py-40 px-6">
           <div className="max-w-6xl mx-auto glass p-32 rounded-[5rem] text-center space-y-12 border-white/5 shadow-[0_0_120px_rgba(99,102,241,0.1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)] group-hover:opacity-100 transition-opacity" />
              <h2 className="text-7xl md:text-[140px] font-black tracking-tighter text-white leading-[0.8] relative z-10">
                RANK #1 <br />
                <span className="text-primary italic">AWAITS.</span>
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-400 font-medium max-w-2xl mx-auto relative z-10 tracking-tight">
                The most effective exam preparation environment. Are you ready to start?
              </p>
              <div className="relative z-10 pt-10">
                <Link href="/login">
                  <Button size="lg" className="h-24 px-20 rounded-[2.5rem] text-3xl font-black shadow-[0_30px_60px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                    Start Now
                  </Button>
                </Link>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-24 px-8 border-t border-white/5 relative z-10 bg-[#020202]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white italic">
                PakkiTayyari
              </span>
            </div>
            <p className="text-zinc-500 font-medium max-w-sm text-lg leading-relaxed">
              Empowering students with smart practice tools and data-driven insights.
            </p>
          </div>
          <div className="space-y-6">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Features</h4>
             <ul className="space-y-4 text-zinc-500 font-bold text-sm uppercase tracking-widest">
                <li><Link href="#" className="hover:text-primary transition-colors">Practice Mode</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Mock Tests</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Performance Analytics</Link></li>
             </ul>
          </div>
          <div className="space-y-6">
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Company</h4>
             <ul className="space-y-4 text-zinc-500 font-bold text-sm uppercase tracking-widest">
                <li><Link href="#" className="hover:text-primary transition-colors">About System</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Protocal</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Support</Link></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">
           <span>&copy; 2026 Pakki Tayyari</span>
           <span>Status: Production-Grade Alpha</span>
        </div>
      </footer>
    </div>
  );
}

function TacticalFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="mt-1 h-10 w-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-xl font-black text-white tracking-tight">{title}</h4>
        <p className="text-zinc-500 font-medium leading-tight">{desc}</p>
      </div>
    </div>
  )
}
