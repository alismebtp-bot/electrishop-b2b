import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-[#141415] group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-500",
          actionButton: "group-[.toast]:bg-[#D4A853] group-[.toast]:text-[#0A0A0B]",
          cancelButton: "group-[.toast]:bg-[#1C1C1E] group-[.toast]:text-gray-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
