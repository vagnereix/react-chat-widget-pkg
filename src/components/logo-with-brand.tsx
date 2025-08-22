import { Logo } from "@/assets/logo"
import { cn } from "@/lib/utils"

const sizeMap = {
  small: "size-4",
  medium: "size-5",
  large: "size-10",
} as const

export function LogoWithBrand({ size, className }: { size: keyof typeof sizeMap, className: string }) {
  return (
    <div className={cn("bg-chat-widget-brand rounded-full", className)}>
      <Logo className={cn("text-white", sizeMap[size])} />
    </div>
  )
}
