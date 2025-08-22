import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from '@/types/chat';

export type ChatState = {
  messages: Message[];
  
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  clearMessages: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      
      setMessages(messages) {
        set({ messages });
      },
      
      addMessage(message) {
        set((state) => ({
          messages: [...state.messages, message]
        }));
      },
      
      updateLastMessage(content) {
        set((state) => {
          const newMessages = [...state.messages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
            lastMessage.content = content;
          }
          return { messages: newMessages };
        });
      },
      
      clearMessages() {
        set({ messages: [] });
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ 
        messages: state.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        }))
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.messages) {
          state.messages = state.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        }
      },
    }
  )
);
