import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import { HeaderContent } from '@/components/chat-widget/chat-header-content';
import { ChatContent } from '@/components/chat-widget/chat-content';
import { TriggerButton } from '@/components/chat-widget/chat-trigger';
import { AuthProvider } from '@/contexts/auth-context';
import { useState } from 'react';

export type ChatWidgetProps = {
  className?: string;
  isInMaintenanceMode?: boolean;
}

export function ChatWidget({ className, isInMaintenanceMode }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <AuthProvider>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <TriggerButton className={className} />
          </PopoverTrigger>

          <PopoverContent 
            className={cn("w-96 h-[600px] p-0 bg-chat-widget-background rounded-md overflow-hidden", className)}
            side="top"
            align="end"
            sideOffset={8}
          >
            <ChatContent showHeader isInMaintenanceMode={isInMaintenanceMode} />
          </PopoverContent>
        </Popover>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <TriggerButton className={className} />
        </DrawerTrigger>

        <DrawerContent className={cn("h-[85vh] bg-chat-widget-background", className)}>
          <DrawerHeader className="border-b border-chat-widget-border-light"> 
            <DrawerTitle className="flex items-center gap-2 text-chat-widget-text">
              <HeaderContent />
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 min-h-0">
            <ChatContent isInMaintenanceMode={isInMaintenanceMode} />
          </div>
        </DrawerContent>
      </Drawer>
    </AuthProvider>
  );
}

