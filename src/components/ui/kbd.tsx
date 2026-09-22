import { cn } from "@/lib/utils"

interface KbdProps {
  children: React.ReactNode
  className?: string
}

export default function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center rounded border border-white/10 bg-[#1C1C1E] px-1.5 py-0.5 text-xs font-mono text-gray-400",
        className
      )}
    >
      {children}
    </kbd>
  )
}
