import { useEffect, useState } from "react";
import Sidebar from "@/components/chat/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Contact } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

export default function Index() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    if (isMobileView) {
      setShowChat(true);
    }
  };

  const handleBackToContacts = () => {
    setShowChat(false);
  };

  return (
    <MainLayout>
      <div className="flex h-screen bg-gray-100">
        <div 
          className={`${isMobileView && showChat ? 'hidden' : 'flex'} 
            md:flex md:w-1/3 lg:w-1/4 flex-col bg-white border-r border-gray-300 h-full`}
        >
          <Sidebar onSelectContact={handleContactSelect} />
        </div>
        
        <div 
          className={`${isMobileView && !showChat ? 'hidden' : 'flex'}
            md:flex flex-1 flex-col h-full`}
        >
          {selectedContact ? (
            <ChatWindow 
              contact={selectedContact} 
              onBack={isMobileView ? handleBackToContacts : undefined} 
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center p-8">
                <h3 className="text-lg text-gray-500 mb-3">WhatsApp Web Clone</h3>
                <p className="text-gray-400">
                  Select a chat to start messaging or click on settings to update your profile.
                </p>
                <button 
                  onClick={() => navigate("/settings")}
                  className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md"
                >
                  Go to Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}