import { Contact } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Phone, VideoIcon } from "lucide-react";

interface ChatHeaderProps {
  contact: Contact;
  onBack?: () => void;
}

export default function ChatHeader({ contact, onBack }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="text-gray-500 hover:bg-gray-200 md:hidden"
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>
            {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-xs text-gray-500">
            {contact.isOnline ? "online" : "last seen recently"}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <VideoIcon size={20} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <Phone size={20} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <MoreVertical size={20} />
        </Button>
      </div>
    </div>
  );
}