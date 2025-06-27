import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Message, Contact } from "@/lib/types";
import { contacts as mockContacts, initialMessages as mockMessages, saveToLocalStorage, getFromLocalStorage } from "@/lib/data";

export const useChat = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize data from localStorage or mock data
  useEffect(() => {
    const storedContacts = getFromLocalStorage('whatsapp_contacts', mockContacts);
    const storedMessages = getFromLocalStorage('whatsapp_messages', mockMessages);
    
    setContacts(storedContacts);
    setMessages(storedMessages);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (contacts.length > 0) {
      saveToLocalStorage('whatsapp_contacts', contacts);
    }
    
    if (messages.length > 0) {
      saveToLocalStorage('whatsapp_messages', messages);
    }
  }, [contacts, messages]);

  // Get messages for a specific contact
  const getMessagesByContactId = useCallback((contactId: string) => {
    return messages.filter(
      msg => (msg.senderId === contactId && msg.receiverId === "me") || 
             (msg.senderId === "me" && msg.receiverId === contactId)
    ).sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  // Get the last message for a specific contact
  const getLastMessageByContactId = useCallback((contactId: string) => {
    const contactMessages = getMessagesByContactId(contactId);
    return contactMessages.length > 0 ? contactMessages[contactMessages.length - 1] : null;
  }, [getMessagesByContactId]);

  // Send a new message
  const sendMessage = useCallback((receiverId: string, content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      timestamp: Date.now(),
      senderId: "me",
      receiverId,
      read: false
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  }, []);

  // Mark messages as read
  const markMessagesAsRead = useCallback((contactId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.senderId === contactId && msg.receiverId === "me" && !msg.read
          ? { ...msg, read: true }
          : msg
      )
    );
  }, []);

  // Add a new contact
  const addContact = useCallback((contact: Omit<Contact, "id">) => {
    const newContact: Contact = {
      ...contact,
      id: uuidv4()
    };
    
    setContacts(prevContacts => [...prevContacts, newContact]);
    return newContact;
  }, []);

  return {
    contacts,
    messages,
    getMessagesByContactId,
    getLastMessageByContactId,
    sendMessage,
    markMessagesAsRead,
    addContact
  };
};