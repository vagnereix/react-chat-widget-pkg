import { cn } from '@/lib/utils';
import type { UIMessage } from 'ai';
import type { HTMLAttributes } from 'react';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role'];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      'group flex w-full items-end justify-start gap-2',
      from === 'user' ? 'is-user justify-end rounded-br-xs' : 'is-assistant flex-row rounded-bl-xs',
      '[&>div]:max-w-[80%]',
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      'flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-foreground text-sm',
      'group-[.is-user]:bg-chat-widget-brand group-[.is-user]:text-primary-foreground group-[.is-user]:rounded-br-xs',
      'group-[.is-assistant]:bg-chat-widget-model-message group-[.is-assistant]:text-chat-widget-text group-[.is-assistant]:rounded-bl-xs',
      className
    )}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);
