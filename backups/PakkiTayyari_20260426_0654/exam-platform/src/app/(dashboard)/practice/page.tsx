import { PracticeForm } from '@/components/practice/practice-form'
import { SubjectWithSubtopics } from '@/types'
import { Command, Sparkles } from 'lucide-react'

async function getSubjects(): Promise<SubjectWithSubtopics[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/subjects`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function PracticePage() {
  const subjects = await getSubjects()

  return (
    <div className="space-y-16 animate-in-fade">
      {/* Dynamic Header */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
          <Sparkles className="h-3 w-3 animate-pulse" /> Initialize Mastery Protocol
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          CRAFT YOUR <br />
          <span className="text-primary italic">LEARNING FLOW.</span>
        </h2>
        
        <p className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Select your focus area and cognitive intensity. Our engine will curate a high-precision set of questions tailored to your proficiency mapping.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-[40px] blur-3xl opacity-20 pointer-events-none" />
        
        <div className="relative glass p-10 md:p-16 rounded-[40px] border-white/5 shadow-2xl overflow-hidden group">
           <div className="absolute top-0 left-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <Command className="h-32 w-32" />
           </div>
           
           <div className="relative z-10">
             <PracticeForm subjects={subjects} />
           </div>
        </div>

        {/* Informational Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
           <div className="bento-card bg-emerald-500/5 border-emerald-500/10">
              <h4 className="text-lg font-black text-emerald-500 uppercase tracking-widest mb-2 italic">Standard Mode</h4>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                Untimed session with immediate explanations. Ideal for deep learning and conceptual grounding.
              </p>
           </div>
           <div className="bento-card bg-pink-500/5 border-pink-500/10">
              <h4 className="text-lg font-black text-pink-500 uppercase tracking-widest mb-2 italic">Mock Protocol</h4>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                Strict temporal constraints with results hidden until submission. High-fidelity exam simulation.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
