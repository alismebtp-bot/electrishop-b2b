import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-stretch w-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export const InputLeftAddon = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-3 bg-[#1C1C1E] border border-r-0 border-white/10 rounded-l-lg text-gray-400 text-sm",
        className
      )}
      {...props}
    />
  )
})
InputLeftAddon.displayName = "InputLeftAddon"

export const InputRightAddon = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-3 bg-[#1C1C1E] border border-l-0 border-white/10 rounded-r-lg text-gray-400 text-sm",
        className
      )}
      {...props}
    />
  )
})
InputRightAddon.displayName = "InputRightAddon"

export const InputLeftElement = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 top-0 h-full flex items-center justify-center pl-3 text-gray-500 pointer-events-none",
        className
      )}
      {...props}
    />
  )
})
InputLeftElement.displayName = "InputLeftElement"

export const InputRightElement = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 top-0 h-full flex items-center justify-center pr-3 text-gray-500",
        className
      )}
      {...props}
    />
  )
})
InputRightElement.displayName = "InputRightElement"
