'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import {
  GraduationCap,
  ArrowRight,
  Mail,
  Lock,
  Sparkles,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// ─── Debug Logger ────────────────────────────────────────────────────────────
type LogEntry = { time: string; level: 'info' | 'success' | 'error' | 'warn'; msg: string }

function useDebugLog() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const log = (msg: string, level: LogEntry['level'] = 'info') => {
    const entry: LogEntry = { time: new Date().toISOString().slice(11, 23), level, msg }
    console.log(`[AUTH ${level.toUpperCase()}]`, msg)
    setLogs(prev => [...prev.slice(-20), entry])
  }
  return { logs, log }
}

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading]   = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [mode, setMode]         = useState<'login' | 'register'>('login')
  const [showDebug, setShowDebug] = useState(true)
  const [mounted, setMounted]   = useState(false)

  const router    = useRouter()
  const supabase  = createClient()
  const { theme, setTheme } = useTheme()
  const { logs, log } = useDebugLog()

  useEffect(() => {
    setMounted(true)
    log('✅ LoginPage mounted & hydrated')
    log(`Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30)}...`)
  }, [])

  const isDark = theme === 'dark'

  const handleAuth = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    log('🖱️ Button clicked — handleAuth fired')
    setErrorMsg('')

    if (!email || !password) {
      log('⚠️ Validation failed: empty email or password', 'warn')
      setErrorMsg('Please enter both email and password.')
      return
    }

    log(`📧 Email: ${email}`)
    log(`🔑 Password length: ${password.length} chars`)
    log(`🔄 Mode: ${mode}`)
    setLoading(true)

    try {
      if (mode === 'login') {
        log('🔐 Calling supabase.auth.signInWithPassword...')
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        log(`📡 Supabase responded — error: ${error ? error.message : 'none'}`, error ? 'error' : 'success')
        if (error) throw error
        log(`✅ Login success! User ID: ${data.user?.id}`, 'success')
        toast.success('Access Granted', { description: 'Opening your student profile...' })
      } else {
        log('📝 Calling supabase.auth.signUp...')
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        log(`📡 Supabase signup responded — error: ${error ? error.message : 'none'}`, error ? 'error' : 'success')
        if (error) throw error
        log(`✅ Signup success! User ID: ${data.user?.id}`, 'success')
        toast.success('Registration Success', { description: 'Welcome to PakkiTayyari! Please login.' })
      }
      log('🚀 Navigating to /dashboard...')
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      log(`❌ Auth error: ${error.message}`, 'error')
      log(`   Code: ${error.code} | Status: ${error.status}`, 'error')
      setErrorMsg(error.message)
      toast.error('Access Denied', { description: error.message })
    } finally {
      setLoading(false)
      log('🏁 handleAuth complete')
    }
  }

  const levelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'success': return '#22c55e'
      case 'error':   return '#ef4444'
      case 'warn':    return '#f59e0b'
      default:        return '#a1a1aa'
    }
  }

  return (
    <div className="login-page min-h-screen flex items-center justify-center p-6 relative overflow-hidden noise">
      {/* Background Ambience */}
      <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none transition-opacity duration-500" />
      <div className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05), transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08), transparent 70%)',
        }}
      />

      {/* ── Day / Night Toggle ──────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle theme"
        className={cn(
          'fixed top-5 right-5 z-50 h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-300',
          'shadow-lg border',
          isDark
            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-yellow-300'
            : 'bg-black/5 border-black/10 hover:bg-black/10 text-indigo-600',
        )}
      >
        {mounted && (isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
      </button>

      <div className="w-full max-w-xl relative z-10 animate-in-fade">
        {/* Logo */}
        <div className="flex flex-col items-center mb-16 space-y-6">
          <Link href="/" className="group">
            <div className="h-20 w-20 rounded-[2rem] bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.4)] group-hover:rotate-[15deg] transition-all duration-700">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </Link>
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic" style={{ color: 'var(--login-text)' }}>
              Pakki<span className="text-primary italic">Tayyari</span>
            </h1>
            <div className="flex items-center gap-3 justify-center">
              <span className="login-muted text-[10px] font-black tracking-[0.4em] uppercase">SSC Practice Portal</span>
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Access Terminal Card */}
        <div
          className="login-card bento-card !p-12 shadow-[0_0_80px_rgba(0,0,0,0.15)]"
          style={{ border: '1px solid var(--login-card-border)' }}
        >
          {/* Tab Bar */}
          <div className="login-divider flex items-center gap-2 mb-10 border-b pb-8">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={cn(
                'flex-1 py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all',
                mode === 'login' ? 'text-primary border-b-2 border-primary' : 'login-muted hover:text-primary',
              )}
            >
              Candidate Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={cn(
                'flex-1 py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all',
                mode === 'register' ? 'text-primary border-b-2 border-primary' : 'login-muted hover:text-primary',
              )}
            >
              New Registration
            </button>
          </div>

          <div className="space-y-8">
            {mode === 'register' && (
              <div className="space-y-3">
                <label className="login-label text-[10px] font-black uppercase tracking-widest ml-1">Full Name</label>
                <Input
                  type="text"
                  placeholder="Anurag Tripathi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="login-input h-16 rounded-2xl px-6 text-lg font-bold focus:ring-0 transition-all placeholder:opacity-40"
                />
              </div>
            )}

            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-3">
                <label className="login-label text-[10px] font-black uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group/input">
                  <Input
                    type="email"
                    placeholder="anurag@pakkitayyari.com"
                    value={email}
                    onChange={(e) => { log(`📝 Email changed: ${e.target.value}`); setEmail(e.target.value) }}
                    className="login-input h-16 rounded-2xl px-6 pr-14 text-lg font-bold focus:ring-0 transition-all placeholder:opacity-40"
                  />
                  <Mail className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 login-muted group-focus-within/input:text-primary transition-colors" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <label className="login-label text-[10px] font-black uppercase tracking-widest ml-1">Password</label>
                <div className="relative group/input">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { log(`🔑 Password changed (${e.target.value.length} chars)`); setPassword(e.target.value) }}
                    className="login-input h-16 rounded-2xl px-6 pr-14 text-lg font-bold focus:ring-0 transition-all placeholder:opacity-40"
                  />
                  <Lock className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 login-muted group-focus-within/input:text-primary transition-colors" />
                </div>
              </div>
            </div>

            {/* Inline error */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                ❌ {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handleAuth}
              disabled={loading}
              className="w-full py-5 bg-primary rounded-2xl text-xl font-black text-white shadow-[0_16px_40px_rgba(99,102,241,0.3)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.45)] hover:scale-[1.02] active:scale-95 transition-all duration-200 group flex items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                </span>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="login-divider mt-10 pt-8 border-t flex items-center justify-between">
            <div className="login-muted flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Lock className="h-3 w-3" /> Secure SSL Connection
            </div>
            <Link href="#" className="login-muted text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Personalized Learning</span>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Complete SSC Syllabus</span>
          </div>
        </div>
      </div>

      {/* ── DEBUG PANEL ──────────────────────────────────────────────────── */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:9999, background:'rgba(0,0,0,0.95)', borderTop:'1px solid #27272a', fontFamily:'monospace', fontSize:'11px' }}>
        <div
          style={{ padding:'4px 12px', background:'#18181b', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}
          onClick={() => setShowDebug(v => !v)}
        >
          <span style={{ color:'#6366f1', fontWeight:'bold' }}>🔍 AUTH DEBUG LOG</span>
          <span style={{ color:'#71717a' }}>{showDebug ? '▼ collapse' : '▲ expand'} — {logs.length} events</span>
        </div>
        {showDebug && (
          <div style={{ maxHeight:'160px', overflowY:'auto', padding:'8px 12px' }}>
            {logs.length === 0 && <div style={{ color:'#52525b' }}>No events yet. Try clicking Sign In.</div>}
            {logs.map((l, i) => (
              <div key={i} style={{ color: levelColor(l.level), lineHeight:'1.6' }}>
                <span style={{ color:'#52525b', marginRight:'8px' }}>{l.time}</span>
                {l.msg}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
