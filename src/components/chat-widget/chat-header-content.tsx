import { ChatLogoutButton } from "@/components/chat-widget/chat-logout-button";
import { ChatStatusIndicator } from "@/components/chat-widget/chat-status-indicator";
import type { ChatWidgetProps } from "@/components/chat-widget";
import { LogoWithBrand } from "@/components/logo-with-brand";

export function HeaderContent({ isInMaintenanceMode }: Pick<ChatWidgetProps, 'isInMaintenanceMode'>) {
  return (
    <>
      <LogoWithBrand size="medium" className="p-1" />

      <h3 className='text-sm font-semibold text-chat-widget-text flex items-center gap-2'>
        <span>Eloquent AI</span>
        <ChatStatusIndicator online={!isInMaintenanceMode} />
      </h3>

      <ChatLogoutButton />
    </>
  )
}
