import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Command, Sparkles, Zap } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams.error

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-[#020202]">
      {/* Background Intelligence */}
      <div className="fixed inset-0 mesh-gradient opacity-20 pointer-events-none" />
      <div className="fixed inset-0 noise pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-in-fade space-y-10">
        <div className="text-center space-y-4">
           <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-[24px] bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] rotate-3">
                 <Command className="h-8 w-8 text-white" />
              </div>
           </div>
           <h1 className="text-5xl font-black tracking-tighter text-white">
            Pakki<span className="text-primary italic">Tayyari</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">The Scholarly Sanctum for Exam Mastery</p>
        </div>

        <div className="glass p-10 md:p-12 rounded-[40px] border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
             <Sparkles className="h-24 w-24" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-2">
               <h2 className="text-3xl font-black text-white tracking-tight">INITIALIZE SESSION</h2>
               <p className="text-zinc-500 font-medium">Re-sync with your mastery repository.</p>
            </div>

            <form action={login} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl p-4 text-xs text-center font-black uppercase tracking-widest animate-bounce flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4" /> {error}
                </div>
              )}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Cognitive Identity (Email)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="aspirant@sanctum.com"
                  required
                  className="h-14 bg-white/[0.02] border-white/10 rounded-2xl focus:ring-primary/20 text-lg font-bold placeholder:text-zinc-700"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" title="Password" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Access Key (Password)</Label>
                  <Link href="#" className="text-[10px] font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
                    Recovery
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-14 bg-white/[0.02] border-white/10 rounded-2xl focus:ring-primary/20 text-lg font-bold"
                />
              </div>

              <Button type="submit" className="w-full h-16 text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-[1.02] transition-all active:scale-[0.98] group">
                ENTER THE SANCTUM <Zap className="ml-3 h-5 w-5 fill-current" />
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-zinc-500 font-medium">
                New aspirant?{' '}
                <Link href="/register" className="font-black text-white hover:text-primary transition-colors border-b border-white/10 hover:border-primary">
                  JOIN THE ELITE
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
           <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">&copy; 2026 PAKKI TAYYARI SYSTEMS</p>
        </div>
      </div>
    </div>
  )
}
