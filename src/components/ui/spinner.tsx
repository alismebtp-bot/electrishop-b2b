import { cn } from "@/lib/utils"

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("animate-spin rounded-full border-2 border-white/10 border-t-[#D4A853] h-5 w-5", className)} />
  )
}
