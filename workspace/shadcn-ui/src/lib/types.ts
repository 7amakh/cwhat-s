// Define types for the messaging application

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  senderId: string;
  receiverId: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  status: string;
}

export interface ChatState {
  contacts: Contact[];
  messages: Message[];
  selectedContact: Contact | null;
  user: User;
}