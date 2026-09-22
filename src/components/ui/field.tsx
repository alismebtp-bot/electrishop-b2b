import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FieldProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export default function Field({ label, error, hint, required, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn(error && "text-red-400")}>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </Label>
      )}
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

export function FieldGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>{children}</div>
}
