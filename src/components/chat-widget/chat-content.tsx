import { 
  Conversation, 
  ConversationContent, 
  ConversationScrollButton 
} from '@/components/ai-elements/conversation';

import { 
  Message, 
  MessageContent, 
} from '@/components/ai-elements/message';

import { useChat } from '@/hooks/use-chat';
import { HeaderContent } from '@/components/chat-widget/chat-header-content';
import { AboutEloquent } from '@/components/about-eloquent';
import { ChatAuth } from '@/components/chat-widget/chat-auth';
import type { ChatWidgetProps } from '@/components/chat-widget';
import { useAuth } from '@/contexts/auth-context';
import { ChatFooter } from '@/components/chat-widget/chat-footer';
import { LogoWithBrand } from '@/components/logo-with-brand';

type ChatContentProps = {
  showHeader?: boolean;
} & Pick<ChatWidgetProps, 'isInMaintenanceMode'>

export function ChatContent({ 
  showHeader,
  isInMaintenanceMode
}: ChatContentProps) {
  const { isAuthenticated } = useAuth();
  const { messages } = useChat();

  return (
    <div className="flex flex-col h-full rounded-md">
      {showHeader && (
        <div className="flex items-center gap-2 px-2 py-3 border-b bg-chat-widget-background border-chat-widget-border-light">
          <HeaderContent isInMaintenanceMode={isInMaintenanceMode} />
        </div>
      )}

      <div className="flex-1 min-h-0 bg-chat-widget-background">
        <Conversation className="h-full">
          <ConversationContent className="space-y-4">
            <AboutEloquent />

            {!isAuthenticated && <ChatAuth />}	

            {isAuthenticated && messages.map((message, index) => (
              <Message 
                key={index} 
                from={message.role === "user" ? "user" : "assistant"}
                className="px-0"
              >
                {message.role === "model" && (
                  <LogoWithBrand size="small" className="p-0.5" />
                )}
                
                <MessageContent>{message.content}</MessageContent>
              </Message>
            ))}
          </ConversationContent>
          
          <ConversationScrollButton />
        </Conversation>
      </div>

      <ChatFooter isInMaintenanceMode={isInMaintenanceMode} />
    </div>
  );
}
