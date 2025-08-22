import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/auth-context";
import { LogOut } from "lucide-react";

export function ChatLogoutButton() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;
  
  return (
    <div className="flex items-center ml-auto">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className="text-chat-widget-text"
            onClick={logout}
          >
            <LogOut className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="top" align="end">
          Log out
        </TooltipContent>
      </Tooltip>
    </div>
  )
}