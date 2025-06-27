import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "./SearchBar";
import ContactList from "./ContactList";
import { Contact } from "@/lib/types";
import { MessageCircle, Users, Phone, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onSelectContact: (contact: Contact) => void;
}

export default function Sidebar({ onSelectContact }: SidebarProps) {
  const { contacts } = useChat();
  const [activeTab, setActiveTab] = useState<string>("chats");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const filteredContacts = contacts.filter((contact) => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-emerald-500 text-white">
        <h1 className="text-xl font-semibold">WhatsApp Web</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleSettings}
          className="text-white hover:bg-emerald-600"
        >
          <Settings size={20} />
        </Button>
      </div>
      
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      <Tabs defaultValue="chats" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white border-b h-14 rounded-none">
          <TabsTrigger value="chats" className="flex-1 data-[state=active]:bg-white">
            <MessageCircle size={20} className="mr-2" />
            <span className="hidden sm:inline">Chats</span>
          </TabsTrigger>
          <TabsTrigger value="status" className="flex-1 data-[state=active]:bg-white">
            <Users size={20} className="mr-2" />
            <span className="hidden sm:inline">Status</span>
          </TabsTrigger>
          <TabsTrigger value="calls" className="flex-1 data-[state=active]:bg-white">
            <Phone size={20} className="mr-2" />
            <span className="hidden sm:inline">Calls</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chats" className="flex-1 overflow-hidden">
          <ContactList 
            contacts={filteredContacts}
            onSelectContact={onSelectContact}
          />
        </TabsContent>
        
        <TabsContent value="status" className="p-4 flex-1">
          <div className="text-center p-8 text-gray-500">
            <p>Status updates feature not implemented yet.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="calls" className="p-4 flex-1">
          <div className="text-center p-8 text-gray-500">
            <p>Call history feature not implemented yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}