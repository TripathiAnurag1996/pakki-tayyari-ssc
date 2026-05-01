'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Command, 
  ArrowRight, 
  Fingerprint, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        toast.success('Access Granted', { description: 'Synchronizing neural profile...' })
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        toast.success('Registration Initiated', { description: 'Check your secure comms for verification.' })
      }
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      toast.error('Access Denied', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 relative overflow-hidden noise">
      {/* Background Ambience */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />
      
      <div className="w-full max-w-xl relative z-10 animate-in-fade">
         {/* Central Hub Logo */}
         <div className="flex flex-col items-center mb-16 space-y-6">
            <Link href="/" className="group">
               <div className="h-20 w-20 rounded-[2rem] bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.5)] group-hover:rotate-[15deg] transition-all duration-700">
                  <Command className="h-10 w-10 text-white" />
               </div>
            </Link>
            <div className="text-center space-y-2">
               <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
                  Pakki<span className="text-primary italic">Tayyari</span>
               </h1>
               <div className="flex items-center gap-3 justify-center">
                  <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase">Neural Gateway Protocol</span>
                  <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
               </div>
            </div>
         </div>

         {/* Access Terminal */}
         <div className="bento-card !p-12 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 mb-10 border-b border-white/5 pb-8">
               <button 
                 onClick={() => setMode('login')}
                 className={cn(
                   "flex-1 py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all",
                   mode === 'login' ? "text-primary border-b-2 border-primary" : "text-zinc-500 hover:text-white"
                 )}
               >
                 Initialize Login
               </button>
               <button 
                 onClick={() => setMode('register')}
                 className={cn(
                   "flex-1 py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all",
                   mode === 'register' ? "text-primary border-b-2 border-primary" : "text-zinc-500 hover:text-white"
                 )}
               >
                 New Recruitment
               </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-8">
               <div className="space-y-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Identifier</label>
                     <div className="relative group/input">
                        <Input
                          type="email"
                          placeholder="anurag@pakkitayyari.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-16 bg-white/[0.04] border-white/10 rounded-2xl px-6 text-lg font-bold focus:border-primary focus:ring-0 transition-all placeholder:text-zinc-500 text-white"
                        />
                        <Fingerprint className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within/input:text-primary transition-colors" />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Secure Password</label>
                     <div className="relative group/input">
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-16 bg-white/[0.04] border-white/10 rounded-2xl px-6 text-lg font-bold focus:border-primary focus:ring-0 transition-all placeholder:text-zinc-500 text-white"
                        />
                        <ShieldCheck className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within/input:text-primary transition-colors" />
                     </div>
                  </div>
               </div>

               <Button 
                 type="submit" 
                 disabled={loading}
                 className="w-full h-18 rounded-2xl text-xl font-black shadow-[0_20px_40px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-95 transition-all group"
               >
                 {loading ? 'Processing...' : (
                   <span className="flex items-center gap-3">
                     {mode === 'login' ? 'Grant Access' : 'Initialize Recruitment'}
                     <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                   </span>
                 )}
               </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <ShieldCheck className="h-3 w-3" /> Encrypted Connection
               </div>
               <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                  Lost Credentials?
               </Link>
            </div>
         </div>

         {/* Secondary Trust Indicators */}
         <div className="mt-12 flex items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="flex items-center gap-3">
               <Sparkles className="h-5 w-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Enhanced</span>
            </div>
            <div className="flex items-center gap-3">
               <Zap className="h-5 w-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ultra Low Latency</span>
            </div>
         </div>
      </div>
    </div>
  )
}
