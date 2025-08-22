import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import type { ComponentProps } from "react";

export function TriggerButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <Button 
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 size-14 rounded-full shadow-lg bg-chat-widget-brand hover:bg-chat-widget-brand/90 text-white z-50",
        className
      )}
      tabIndex={0}
      {...props}
    >
      <MessageCircle className="size-6" />
    </Button>
  )
}
