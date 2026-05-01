'use client'

import { Menu, Search, Bell, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import { Sidebar } from './sidebar'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center p-6 bg-transparent justify-between sticky top-0 z-40 backdrop-blur-sm border-b border-white/[0.02]">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-all border border-white/5">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-white/5 bg-[#050505]">
            <Sidebar />
          </SheetContent>
        </Sheet>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer group">
          <Search className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Search Command...</span>
          <span className="ml-8 text-[10px] font-bold bg-white/5 px-1.5 py-0.5 rounded border border-white/10 group-hover:bg-white/10 transition-colors">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all relative">
          <Bell className="h-5 w-5 text-zinc-400" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-[#050505]" />
        </Button>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg group">
          <User className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  )
}
