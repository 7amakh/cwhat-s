import { format } from "date-fns";
import { Message } from "@/lib/types";
import { CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[80%] rounded-lg p-3 ${
          isOwn 
            ? "bg-[#d9fdd3] text-gray-800" 
            : "bg-white text-gray-800"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[10px] text-gray-500">
            {format(new Date(message.timestamp), "HH:mm")}
          </span>
          
          {isOwn && (
            <CheckCheck size={14} className={`${
              message.read ? "text-blue-500" : "text-gray-400"
            }`} />
          )}
        </div>
      </div>
    </div>
  );
}