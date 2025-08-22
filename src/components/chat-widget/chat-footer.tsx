import { 
  PromptInput, 
  PromptInputTextarea, 
  PromptInputToolbar, 
  PromptInputSubmit 
} from '@/components/ai-elements/prompt-input';

import { ChatInfoBanner } from '@/components/chat-widget/chat-info-banner';
import { useAuth } from '@/contexts/auth-context';
import { useChat } from '@/hooks/use-chat';
import { canSendMessage, canType } from '@/utils/chat-utils';
import type { FormEvent } from 'react';

type ChatFooterProps = {
  isInMaintenanceMode?: boolean;
}

export function ChatFooter({ isInMaintenanceMode }: ChatFooterProps) {
  const { isAuthenticated } = useAuth();
  
  const {
    input,
    isStreaming,
    setInput,
    handleSend,
    handleStop
  } = useChat();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (canSendMessage(input, isStreaming)) {
      handleSend();
    }
  };

  return (
    <div className="p-2 pt-0 bg-chat-widget-background">
        {isInMaintenanceMode && <ChatInfoBanner message='⚠️ The chat service is undergoing maintenance. Some features may be temporarily unavailable.' />}
        {!isAuthenticated && !isInMaintenanceMode && <ChatInfoBanner message='Please authenticate to access the chat.' />}

        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={!canType(isStreaming, !!isInMaintenanceMode, isAuthenticated)}
            className="bg-transparent text-chat-widget-text placeholder:text-chat-widget-text/50 pr-11"
            autoFocus
          />

          <PromptInputToolbar>
            {isStreaming ? (
              <PromptInputSubmit
                status="streaming"
                onClick={handleStop}
                className='opacity-75'
              />
            ) : (
              <PromptInputSubmit
                status="ready"
                disabled={!canSendMessage(input, isStreaming)}
                onClick={handleSend}
              />
            )}
          </PromptInputToolbar>
        </PromptInput>
      </div>
  )
}