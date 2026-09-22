import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export default function Empty({
  title = "Aucun résultat",
  description = "Il n'y a pas encore de données à afficher.",
  icon,
  action,
  className,
}: EmptyProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="w-16 h-16 bg-[#1C1C1E] rounded-full flex items-center justify-center mb-4">
        {icon || <Package size={28} className="text-gray-600" />}
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  )
}
