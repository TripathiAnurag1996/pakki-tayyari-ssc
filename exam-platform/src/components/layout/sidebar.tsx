'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  BookOpen,
  History,
  BarChart3,
  Settings,
  LogOut,
  Target,
  GraduationCap,
  Sparkles,
  Zap
} from 'lucide-react'
import { signout } from '@/app/login/actions'

const routes = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Practice',
    icon: BookOpen,
    href: '/practice',
  },
  {
    label: 'History',
    icon: History,
    href: '/history',
  },
  {
    label: 'Performance',
    icon: BarChart3,
    href: '/analytics',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-[#050505] border-r border-white/[0.04] relative overflow-hidden noise">
      <div className="px-8 py-12 flex-1 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-4 mb-16 px-2 group">
          <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:rotate-[15deg] transition-all duration-700">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter text-white">
              Pakki<span className="text-primary italic">Tayyari</span>
            </span>
            <span className="text-[9px] font-black tracking-[0.4em] text-zinc-600 uppercase">SSC Practice Portal</span>
          </div>
        </Link>

        <div className="space-y-3">
          <div className="px-4 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Practice Menu</span>
          </div>
          
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden',
                pathname === route.href 
                  ? 'text-white bg-white/[0.04] border border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                  : 'text-zinc-600 hover:text-white hover:bg-white/[0.02]'
              )}
            >
              {pathname === route.href && (
                <>
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
                </>
              )}
              <route.icon className={cn(
                'h-5 w-5 transition-all duration-500 group-hover:scale-110',
                pathname === route.href ? 'text-primary text-glow' : 'text-zinc-600 group-hover:text-primary/70'
              )} />
              <span className="text-xs font-black uppercase tracking-widest">{route.label}</span>
            </Link>
          ))}
        </div>

        {/* Tactical Status Card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/[0.05] to-transparent border border-white/[0.05] relative overflow-hidden group shadow-2xl">
           <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Aspirant Rank 12</span>
               </div>
              <div className="text-3xl font-black text-white italic tracking-tighter">ELITE SCHOLAR</div>
              <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                 <div className="h-full w-2/3 bg-primary shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-1000" />
              </div>
               <div className="space-y-1">
                 <p className="text-[9px] font-black text-zinc-500 leading-tight uppercase tracking-widest">Target: Rank 13 (+24 XP required)</p>
                 <p className="text-[8px] text-zinc-600 font-medium leading-tight">Complete more practice sessions to increase your rank and unlock new performance insights.</p>
               </div>
           </div>
           <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
              <GraduationCap className="h-32 w-32" />
           </div>
        </div>
      </div>

      <div className="p-8 border-t border-white/[0.04] space-y-4 relative z-10">
        <Link
          href="/settings"
          className={cn(
            'group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500',
            pathname === '/settings' ? 'text-white bg-white/5' : 'text-zinc-600 hover:text-white hover:bg-white/[0.02]'
          )}
        >
          <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-700" />
          <span className="text-xs font-black uppercase tracking-widest">Settings</span>
        </Link>
        
        <form action={signout}>
          <button
            type="submit"
            className="group flex items-center gap-4 px-5 py-4 w-full rounded-2xl text-zinc-600 hover:text-red-400 hover:bg-red-500/5 transition-all duration-500"
          >
            <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  )
}
