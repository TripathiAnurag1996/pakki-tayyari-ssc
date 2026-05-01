import { PracticeForm } from '@/components/practice/practice-form'
import { SubjectWithSubtopics } from '@/types'
import { BookOpen, Sparkles } from 'lucide-react'

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
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-inner backdrop-blur-xl">
          <Sparkles className="h-3 w-3 animate-pulse" /> Practice Mode Activated
        </div>
        
        <h2 className="text-6xl md:text-[90px] font-black tracking-tighter text-white leading-[0.8] mb-8">
          CRAFT YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 italic">LEARNING FLOW.</span>
        </h2>
        
        <p className="text-2xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
          Select your subject and focus area. Our engine will provide a set of questions tailored to your preparation level.
          {subjects.length > 0 && <span className="ml-2 text-zinc-700 text-[10px] opacity-30">({subjects.length} subjects found)</span>}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-[40px] blur-3xl opacity-20 pointer-events-none" />
        
        <div className="relative bento-card !p-12 md:!p-20 border-white/5 shadow-2xl overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
              <BookOpen className="h-48 w-48" />
           </div>
           
           <div className="relative z-10">
             <PracticeForm subjects={subjects} />
           </div>
        </div>

        {/* Informational Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
           <div className="bento-card bg-emerald-500/[0.03] border-emerald-500/10 hover:border-emerald-500/30">
              <div className="badge-tactical !text-emerald-500 mb-4">Practice Mode</div>
              <h4 className="text-2xl font-black text-white tracking-tighter mb-2 italic">CALIBRATED GROWTH</h4>
              <p className="text-zinc-500 text-lg font-medium leading-tight tracking-tight">
                Untimed session with immediate explanations. Ideal for deep learning and conceptual grounding.
              </p>
           </div>
           <div className="bento-card bg-pink-500/[0.03] border-pink-500/10 hover:border-pink-500/30">
              <div className="badge-tactical !text-pink-500 mb-4">Mock Test</div>
              <h4 className="text-2xl font-black text-white tracking-tighter mb-2 italic">EXAM SIMULATION</h4>
              <p className="text-zinc-500 text-lg font-medium leading-tight tracking-tight">
                Strict temporal constraints with results hidden until submission. High-fidelity exam simulation.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
