import * as React from "react"
import { cn } from "@/lib/utils"

interface ItemProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export default function Item({ title, description, icon, action, className }: ItemProps) {
  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors", className)}>
      {icon && (
        <div className="flex-shrink-0 w-10 h-10 bg-[#1C1C1E] rounded-lg flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        {description && <p className="text-xs text-gray-500 truncate">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

export function ItemGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border border-white/10 rounded-xl bg-[#141415] divide-y divide-white/5", className)}>
      {children}
    </div>
  )
}

export function ItemDivider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-white/5 my-1", className)} />
}

export function ItemBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-[#D4A853]/10 text-[#D4A853] px-2 py-0.5 text-xs font-medium", className)}>
      {children}
    </span>
  )
}
