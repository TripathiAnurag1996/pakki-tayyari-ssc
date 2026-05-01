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
  Command,
  Sparkles
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
    label: 'Mock Tests',
    icon: Target,
    href: '/test',
  },
  {
    label: 'History',
    icon: History,
    href: '/history',
  },
  {
    label: 'Intelligence',
    icon: BarChart3,
    href: '/analytics',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-[#050505] border-r border-white/[0.02] relative overflow-hidden">
      <div className="px-6 py-10 flex-1 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-3 mb-12 px-2 group">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:rotate-6 transition-all duration-500">
            <Command className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Pakki<span className="text-primary italic">Tayyari</span>
          </span>
        </Link>

        <div className="space-y-2">
          <div className="px-3 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Main Navigation</span>
          </div>
          
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden',
                pathname === route.href 
                  ? 'text-white bg-white/[0.03] border border-white/[0.05] shadow-lg' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/[0.02]'
              )}
            >
              {pathname === route.href && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-full" />
              )}
              <route.icon className={cn(
                'h-5 w-5 transition-transform duration-300 group-hover:scale-110',
                pathname === route.href ? 'text-primary' : 'text-zinc-500'
              )} />
              <span className="text-sm font-bold tracking-tight">{route.label}</span>
            </Link>
          ))}
        </div>

        {/* Pro / Stats Card */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 relative overflow-hidden group">
           <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                 <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-widest text-primary">Mastery Level</span>
              </div>
              <div className="text-2xl font-black text-white italic">LEVEL 12</div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                 <div className="h-full w-2/3 bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              </div>
              <p className="text-[10px] font-bold text-zinc-500 leading-tight">Crush 24 more questions to reach Level 13.</p>
           </div>
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target className="h-16 w-16" />
           </div>
        </div>
      </div>

      <div className="p-6 border-t border-white/[0.02] space-y-4 relative z-10">
        <Link
          href="/settings"
          className={cn(
            'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
            pathname === '/settings' ? 'text-white bg-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/2'
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm font-bold tracking-tight">System Preferences</span>
        </Link>
        
        <form action={signout}>
          <button
            type="submit"
            className="group flex items-center gap-3 px-4 py-3 w-full rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-bold tracking-tight">Terminate Session</span>
          </button>
        </form>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
