import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Paperclip, Send, Smile } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-3 bg-gray-100 border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button 
          type="button"
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <Smile size={20} />
        </Button>
        
        <Button 
          type="button"
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <Paperclip size={20} />
        </Button>
        
        <Input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-full bg-white"
        />
        
        <Button 
          type={message.trim() ? "submit" : "button"}
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          {message.trim() ? <Send size={20} /> : <Mic size={20} />}
        </Button>
      </form>
    </div>
  );
}