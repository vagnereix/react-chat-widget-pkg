type ChatInfoBannerProps = {
  message: string;
}

export function ChatInfoBanner({ message }: ChatInfoBannerProps) {
  return (
    <div className="relative bg-chat-widget-brand-light rounded-t-md py-1 px-2 after:absolute after:inset-0 after:bg-chat-widget-brand-light after:top-3 after:-bottom-3 after:z-0">
      <p className="relative z-10 text-chat-widget-text text-xs text-center">
        {message}
      </p>
    </div>
  )
}
