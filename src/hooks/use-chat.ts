import { useCallback, useEffect, useRef } from 'react';
import { useChatStore } from '@/store/chat-store';
import { useChatState } from '@/hooks/use-chat-state';
import type { StreamChunk } from '@/types/chat';
import {
  createChatInstance,
  createUserMessage,
  handleStreamingError,
  processStreamChunk,
  displayChatHistory,
  canSendMessage,
  createModelMessage,
} from '../utils/chat-utils';
import { useAuth } from '@/contexts/auth-context';

export function useChat() {
  const { isAuthenticated, username } = useAuth();

  const {
    messages,
    addMessage,
    updateLastMessage,
    clearMessages,
  } = useChatStore();

  const {
    input,
    isStreaming,
    setInput,
    startSending,
    stopSending,
  } = useChatState();

  const abortControllerRef = useRef<AbortController | null>(null);
  const chatRef = useRef<ReturnType<typeof createChatInstance> | null>(null);
  
  const chat = chatRef.current;

  async function handleSend() {
    if (!canSendMessage(input, isStreaming)) return;

    const userMessage = createUserMessage(input);
    const trimmedInput = input.trim();

    addMessage(userMessage);
    startSending();

    abortControllerRef.current = new AbortController();

    try {
      if (!chat) return;
      
      const response = await chat.sendMessageStream({
        message: trimmedInput,
        config: {
          abortSignal: abortControllerRef.current.signal
        }
      });

      let currentReply = '';
      const modelMessage = createModelMessage('');
      addMessage(modelMessage);

      for await (const chunk of response) {
        currentReply = processStreamChunk(
          chunk as StreamChunk,
          currentReply,
          updateLastMessage,
          abortControllerRef.current?.signal
        );

        if (abortControllerRef.current?.signal.aborted) {
          break;
        }
      }
    } catch (error: unknown) {
      handleStreamingError(error as Error, addMessage);
    } finally {
      stopSending();
      abortControllerRef.current = null;
    }
  };

  function handleStop() {
    if (abortControllerRef.current && isStreaming) {
      abortControllerRef.current.abort();
    }
  };

  function showHistory() {
    if (chat) displayChatHistory(chat);
  };

  const clearChat = useCallback(() => {
    clearMessages();
    chatRef.current = null;
  }, [clearMessages, chatRef]);

  useEffect(() => {
    if (!chatRef.current && username) {
      const msgsWithName = messages.length === 0
        ? [createUserMessage(`Hey, my name is ${username}.`)]
        : messages;

      chatRef.current = createChatInstance(msgsWithName);
    }
  }, [messages, username])

  useEffect(() => {
    if (!isAuthenticated) clearChat();
  }, [isAuthenticated, clearChat])

  return {
    messages,
    input,
    isStreaming,
    setInput,
    handleSend,
    handleStop,
    showHistory,
    clearChat,
  };
}
