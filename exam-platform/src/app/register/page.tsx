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
  Zap,
  User
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) throw error
      
      toast.success('Recruitment Initiated', { 
        description: 'Check your secure comms for verification instructions.' 
      })
      router.push('/login')
    } catch (error: any) {
      toast.error('Initialization Failed', { description: error.message })
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
                  <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase">Recruitment Protocol</span>
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
               </div>
            </div>
         </div>

         {/* Recruitment Terminal */}
         <div className="bento-card !p-12 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic mb-10 border-b border-white/5 pb-8">
               Initialize New <span className="text-primary">Profile</span>
            </h2>

            <form onSubmit={handleRegister} className="space-y-8">
               <div className="space-y-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Full Identity Name</label>
                     <div className="relative group/input">
                        <Input
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-16 bg-white/[0.04] border-white/10 rounded-2xl px-6 text-lg font-bold focus:border-primary focus:ring-0 transition-all placeholder:text-zinc-500 text-white"
                        />
                        <User className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within/input:text-primary transition-colors" />
                     </div>
                  </div>

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
                 {loading ? 'Initializing...' : (
                   <span className="flex items-center gap-3">
                     Begin Recruitment
                     <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                   </span>
                 )}
               </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
               <span>Already Recruited?</span>
               <Link href="/login" className="text-white hover:text-primary transition-colors">
                  Return to Gateway
               </Link>
            </div>
         </div>
      </div>
    </div>
  )
}
