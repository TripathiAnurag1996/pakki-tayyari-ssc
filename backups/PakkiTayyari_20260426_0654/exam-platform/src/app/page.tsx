import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Target,
  BarChart4,
  Clock,
  Sparkles,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-x-hidden selection:bg-primary/30 selection:text-primary relative font-sans">
      {/* Dynamic Mesh Background */}
      <div className="fixed inset-0 mesh-gradient opacity-40 pointer-events-none" />
      <div className="fixed inset-0 noise pointer-events-none" />

      {/* Floating Header */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 glass rounded-2xl py-3 px-6 flex items-center justify-between border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:rotate-12 transition-all duration-500">
            <Command className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Pakki<span className="text-primary">Tayyari</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-400">
          <Link href="#features" className="hover:text-white transition-colors relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="#methodology" className="hover:text-white transition-colors relative group">
            Methodology
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="#analytics" className="hover:text-white transition-colors relative group">
            Analytics
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 font-bold px-5">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button className="rounded-xl px-6 font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95 transition-all">
              Join Now
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative pt-32">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-10 animate-in-fade">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <Sparkles className="h-3 w-3 animate-pulse" /> The Gold Standard of Exam Mastery
            </div>
            
            <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.85] text-white">
              MASTER PYQs <br />
              <span className="text-primary text-glow italic">WITH PRECISION.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-zinc-400 font-medium leading-relaxed">
              Crush UPSC and SSC exams with our adaptive AI engine. Surgical analytics, structured methodology, and high-retention flow.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link href="/login">
                <Button size="lg" className="h-16 px-12 rounded-2xl text-xl font-black shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 transition-all">
                  Enter The Sanctum <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-xl font-bold border-white/10 hover:bg-white/5 hover:border-white/20 transition-all">
                Explore Methodology
              </Button>
            </div>

            {/* Hero Visualization */}
            <div className="pt-24 max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-violet-500/50 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative glass rounded-3xl border-white/5 overflow-hidden aspect-[21/9] flex items-center justify-center">
                 <div className="flex gap-12 items-end">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-12 bg-gradient-to-t from-primary/80 to-violet-500 rounded-t-xl animate-in-fade" 
                        style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
              <div className="md:col-span-8 bento-card group">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">Adaptive Cognitive Engine</h3>
                <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md">
                  Our neural engine recalibrates difficulty in real-time, ensuring you stay in the high-retention flow state for maximal subject mastery.
                </p>
                <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <BrainCircuit className="h-40 w-40" />
                </div>
              </div>
              
              <div className="md:col-span-4 bento-card group">
                <div className="h-12 w-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-sky-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tighter">Temporal Drills</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">
                  High-fidelity mock simulations with strict temporal constraints.
                </p>
              </div>

              <div className="md:col-span-4 bento-card group">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <BarChart4 className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tighter">Surgical Analytics</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">
                  Identify cognitive blind spots with sub-topic precision.
                </p>
              </div>

              <div className="md:col-span-8 bento-card group flex flex-col justify-center text-center">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white tracking-tighter">98% Accuracy Uplift</h3>
                  <p className="text-zinc-400 text-lg font-medium">Join 10,000+ aspirants crushing their goals.</p>
                </div>
                <div className="absolute inset-0 mesh-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="py-32 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest">
                Our Philosophy
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                STRATEGIC <br />
                <span className="text-primary italic">HARDENING.</span>
              </h2>
              <p className="text-xl text-zinc-400 font-medium leading-relaxed">
                We believe that every session should be a step toward perfection. Our platform organizes thousands of PYQs into a structured knowledge graph.
              </p>
              <div className="grid gap-4 pt-4">
                <CheckItem text="Comprehensive UPSC & SSC Repository" />
                <CheckItem text="Immediate Expert Elucidations" />
                <CheckItem text="Real-time Rank Prediction" />
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-[40px] bg-white/[0.02] border border-white/10 flex items-center justify-center p-12 overflow-hidden transition-all duration-700 hover:border-primary/40 shadow-2xl">
                <div className="relative z-10 glass p-12 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.2)] group-hover:scale-110 transition-transform duration-700">
                  <Target className="h-32 w-32 text-primary text-glow animate-pulse" />
                </div>
                {/* Orbital Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
                  <div className="w-1/2 h-1/2 rounded-full border border-primary/10 animate-[spin_15s_linear_infinite_reverse]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-6">
           <div className="max-w-5xl mx-auto glass p-20 rounded-[48px] text-center space-y-10 border-white/5 shadow-[0_0_100px_rgba(99,102,241,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 mesh-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none relative z-10">
                CLAIM YOUR <br />
                <span className="text-primary italic">TOP RANK.</span>
              </h2>
              <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-xl mx-auto relative z-10">
                Join the elite league of aspirants who never settle for &quot;good enough&quot;.
              </p>
              <div className="relative z-10">
                <Link href="/login">
                  <Button size="lg" className="h-20 px-16 rounded-2xl text-2xl font-black shadow-[0_0_50px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 transition-all">
                    INITIALIZE NOW
                  </Button>
                </Link>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Command className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              Pakki<span className="text-zinc-500">Tayyari</span>
            </span>
          </div>
          <div className="flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-zinc-500">
             <span className="text-zinc-600 font-medium capitalize tracking-normal">&copy; 2026 Pakki Tayyari</span>
             <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms</Link>
             <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <ShieldCheck className="h-4 w-4 text-primary" />
      </div>
      <span className="text-zinc-300 text-lg font-semibold tracking-tight">{text}</span>
    </div>
  )
}
