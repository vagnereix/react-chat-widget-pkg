import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ChatStatusIndicator({ online }: { online: boolean }) {
  const label = online ? 'Online' : 'Offline';
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          aria-label={label}
          className={cn(
            "inline-block rounded-full size-2",
            online ? 'bg-green-400' : 'bg-red-400'
          )}
        />
      </TooltipTrigger>
      <TooltipContent side="top">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
