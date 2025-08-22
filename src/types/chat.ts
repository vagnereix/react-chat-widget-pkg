export type Message = {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
};

export type StreamChunk = { 
  text?: string; 
  candidates?: { finishReason: string }[] 
};
