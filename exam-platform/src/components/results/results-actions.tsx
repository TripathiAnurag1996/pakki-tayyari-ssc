'use client'

import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { toast } from 'sonner'

export function ResultsActions() {
  const handleExport = () => {
    toast.success('Dossier Preparation Initialized', {
      description: 'Generating strategic performance report...'
    })
    
    // Simple print functionality which serves as an "export to PDF"
    window.print()
  }

  return (
    <Button 
      onClick={handleExport}
      size="lg" 
      className="h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95 transition-all group"
    >
      Export Dossier <FileText className="ml-2 h-5 w-5 transition-transform group-hover:rotate-6" />
    </Button>
  )
}
