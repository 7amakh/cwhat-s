import { useState } from "react";
import { Contact } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { CheckCheck } from "lucide-react";
import { useChat } from "@/hooks/useChat";

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export default function ContactList({ contacts, onSelectContact }: ContactListProps) {
  const { getLastMessageByContactId } = useChat();
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  const handleContactClick = (contact: Contact) => {
    setActiveContactId(contact.id);
    onSelectContact(contact);
  };

  return (
    <div className="overflow-y-auto h-full">
      {contacts.length > 0 ? (
        <ul className="divide-y">
          {contacts.map((contact) => {
            const lastMessage = getLastMessageByContactId(contact.id);
            
            return (
              <li 
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className={`p-3 hover:bg-gray-100 cursor-pointer ${
                  activeContactId === contact.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>
                      {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium truncate">{contact.name}</h4>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {lastMessage?.senderId === "me" && (
                        <CheckCheck size={16} className={`${
                          lastMessage?.read ? "text-blue-500" : "text-gray-400"
                        }`} />
                      )}
                      
                      <p className="text-sm text-gray-500 truncate">
                        {lastMessage ? lastMessage.content : "No messages yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>No contacts found</p>
        </div>
      )}
    </div>
  );
}