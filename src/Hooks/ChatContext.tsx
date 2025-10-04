import { createContext, useState } from "react";

export const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [connectedChat, setConnectedChat] = useState<{ id: number; name: string } | null>(null);

  return (
    <ChatContext.Provider
      value={{
        connectedChat,
        setConnectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
