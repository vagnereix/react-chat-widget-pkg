import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight } from "lucide-react";
import type { FormEvent } from "react";

export function ChatAuth() {
  const { login } = useAuth();

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('name') as string;
    
    if (username.trim()) login(username);
  }

  return (
    <div className="max-w-64 mx-auto flex flex-col items-center justify-center h-full py-6 text-center bg-chat-widget-background">
      <p className="text-chat-widget-text/70 text-sm text-center">
        To access the chat, you need to authenticate first.
      </p>

      <form
        className="mt-2 max-w-44 relative"
        onSubmit={handleLogin}
      >
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="text-chat-widget-text/80 pr-10"
          autoFocus
          tabIndex={1}
        />

        <Button
          type="submit"
          variant='link'
          className="absolute top-0 right-0 text-sm inline-flex items-center gap-2 text-chat-widget-brand hover:text-chat-widget-brand/80 font-medium underline underline-offset-4 transition-colors"
          tabIndex={2}
        >
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </div>
  );
}
