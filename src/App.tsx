import { ChatWidget } from "@/components/chat-widget";

function App() {
  return (
    <main className="bg-chat-widget-background">
      oi
      <ChatWidget className="chat-color-palette" isInMaintenanceMode={false} />
    </main>
  );
}

export default App;
