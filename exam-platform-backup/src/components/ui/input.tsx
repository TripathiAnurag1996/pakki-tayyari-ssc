import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2 text-white transition-all outline-none placeholder:text-zinc-700 focus:border-primary/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-primary/10 disabled:opacity-50 disabled:grayscale md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
