import { useEffect, useRef, useState } from "react";
import { Contact, Message } from "@/lib/types";
import { useChat } from "@/hooks/useChat";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWindowProps {
  contact: Contact;
  onBack?: () => void;
}

export default function ChatWindow({ contact, onBack }: ChatWindowProps) {
  const { getMessagesByContactId, sendMessage } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getMessagesByContactId(contact.id));
  }, [contact.id, getMessagesByContactId]);

  const handleSendMessage = (content: string) => {
    sendMessage(contact.id, content);
    setMessages(getMessagesByContactId(contact.id));
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#e4ddd4]">
      <ChatHeader contact={contact} onBack={onBack} />
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === "me"}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              <p>No messages yet. Start a conversation!</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}