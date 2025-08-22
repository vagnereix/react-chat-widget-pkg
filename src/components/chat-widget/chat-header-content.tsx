import { Logo } from "@/assets/logo";
import { ChatLogoutButton } from "@/components/chat-widget/chat-logout-button";
import { ChatStatusIndicator } from "@/components/chat-widget/chat-status-indicator";
import type { ChatWidgetProps } from "@/components/chat-widget";

export function HeaderContent({ isInMaintenanceMode }: Pick<ChatWidgetProps, 'isInMaintenanceMode'>) {
  return (
    <>
      <div className="bg-chat-widget-brand rounded-full p-1">
        <Logo className="text-white size-5" />
      </div>

      <h3 className='text-sm font-semibold text-chat-widget-text flex items-center gap-2'>
        <span>Eloquent AI</span>
        <ChatStatusIndicator online={!isInMaintenanceMode} />
      </h3>

      <ChatLogoutButton />
    </>
  )
}
