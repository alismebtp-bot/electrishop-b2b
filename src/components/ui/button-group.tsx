import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, variant = "default" }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-lg overflow-hidden",
          variant === "outline" && "border border-white/10",
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child
          return React.cloneElement(child as React.ReactElement, {
            className: cn(
              (child as React.ReactElement).props.className,
              "rounded-none border-0",
              index !== 0 && "border-l border-white/10",
              index === 0 && "rounded-l-lg",
              index === React.Children.count(children) - 1 && "rounded-r-lg"
            ),
          })
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
