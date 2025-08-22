import { GoogleGenAI, type Content } from "@google/genai";
import type { Message, StreamChunk } from '@/types/chat';

/**
 * The API key is hardcoded here for demonstration and testing purposes only.
 * In a production environment, the API key should be stored securely (e.g., in a backend service or environment variable)
 * and never exposed in client-side code. This is a known security risk.
 * The key will be deleted after the presentation.
 */
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
});

export function messagesToGeminiHistory(messages: Message[]) {
  return messages.map(message => ({
    role: message.role,
    parts: [{ text: message.content }]
  }));
}

export function createChatInstance(history: Message[] = []) {
  const geminiHistory = messagesToGeminiHistory(history);
  
  return ai.chats.create({ 
    model: 'gemini-2.0-flash',
    history: geminiHistory 
  });
}

export function createUserMessage(content: string): Message {
  return {
    role: 'user',
    content: content.trim(),
    timestamp: new Date()
  };
}

export function createModelMessage(content: string): Message {
  return {
    role: 'model',
    content,
    timestamp: new Date()
  };
}

export function handleStreamingError(
  error: Error,
  addMessage: (message: Message) => void
) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled by user');
  } else {
    console.error('Error sending message:', error);
    addMessage(createModelMessage('Error processing your message. Please try again.'));
  }
}

export function processStreamChunk(
  chunk: StreamChunk,
  currentReply: string,
  updateLastMessage: (content: string) => void,
  abortSignal?: AbortSignal
) {
  if (abortSignal?.aborted) {
    return currentReply;
  }

  if (chunk.text) {
    currentReply += chunk.text;
    updateLastMessage(currentReply);
  }

  if (chunk.candidates?.[0]?.finishReason) {
    console.log('Finish reason:', chunk.candidates[0].finishReason);
  }

  return currentReply;
}

export function displayChatHistory(chat: ReturnType<typeof ai.chats.create>) {
  const history = chat.getHistory();

  console.log('📜 Conversation history:');
  history.forEach((content: Content, index: number) => {
    console.log(`${index + 1}. ${content.role} — ${content.parts?.[0]?.text || 'N/A'}`);
  });
}

export function canSendMessage(input: string, isStreaming: boolean) {
  return input.trim().length > 0 && !isStreaming;
}

export function canType(isStreaming: boolean, isInMaintenanceMode: boolean, isAuthenticated: boolean) {
  return !isStreaming && !isInMaintenanceMode && isAuthenticated;
}
