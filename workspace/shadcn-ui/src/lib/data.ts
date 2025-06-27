import { Contact, Message, User } from "./types";

// Mock user data
export const user: User = {
  id: "me",
  name: "John Doe",
  avatar: "/assets/avatar.png",
  phone: "+1234567890",
  status: "Available"
};

// Mock contacts data
export const contacts: Contact[] = [
  {
    id: "1",
    name: "Alice Smith",
    avatar: "",
    phone: "+1987654321",
    isOnline: true,
  },
  {
    id: "2",
    name: "Bob Johnson",
    avatar: "",
    phone: "+1122334455",
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    name: "Carol Williams",
    avatar: "",
    phone: "+1234567891",
    isOnline: true,
  },
  {
    id: "4",
    name: "David Brown",
    avatar: "",
    phone: "+1987654322",
    isOnline: false,
    lastSeen: new Date(Date.now() - 86400000),
  },
  {
    id: "5",
    name: "Eve Davis",
    avatar: "",
    phone: "+1122334466",
    isOnline: true,
  },
  {
    id: "6",
    name: "Frank Miller",
    avatar: "",
    phone: "+1234567892",
    isOnline: false,
    lastSeen: new Date(Date.now() - 43200000),
  },
  {
    id: "7",
    name: "Grace Wilson",
    avatar: "",
    phone: "+1987654323",
    isOnline: true,
  },
  {
    id: "8",
    name: "Family Group",
    avatar: "",
    phone: "Group",
    isOnline: false,
  },
  {
    id: "9",
    name: "Work Team",
    avatar: "",
    phone: "Group",
    isOnline: false,
  }
];

// Mock messages data
export const initialMessages: Message[] = [
  {
    id: "msg1",
    content: "Hey! How are you doing?",
    timestamp: Date.now() - 3600000 * 24,
    senderId: "1",
    receiverId: "me",
    read: true,
  },
  {
    id: "msg2",
    content: "I'm good, thanks! What about you?",
    timestamp: Date.now() - 3600000 * 23.5,
    senderId: "me",
    receiverId: "1",
    read: true,
  },
  {
    id: "msg3",
    content: "Great! Just finished work and heading home.",
    timestamp: Date.now() - 3600000 * 23,
    senderId: "1",
    receiverId: "me",
    read: true,
  },
  {
    id: "msg4",
    content: "Nice! We should catch up sometime this week.",
    timestamp: Date.now() - 3600000 * 22,
    senderId: "me",
    receiverId: "1",
    read: true,
  },
  {
    id: "msg5",
    content: "Absolutely! How about Friday?",
    timestamp: Date.now() - 3600000 * 2,
    senderId: "1",
    receiverId: "me",
    read: true,
  },
  {
    id: "msg6",
    content: "Hi Bob, do you have the project files?",
    timestamp: Date.now() - 3600000 * 5,
    senderId: "me",
    receiverId: "2",
    read: true,
  },
  {
    id: "msg7",
    content: "Yes, I'll send them over shortly.",
    timestamp: Date.now() - 3600000 * 4,
    senderId: "2",
    receiverId: "me",
    read: false,
  },
  {
    id: "msg8",
    content: "Hello David! Are we still on for dinner tonight?",
    timestamp: Date.now() - 86400000,
    senderId: "me",
    receiverId: "4",
    read: false,
  },
];

// Helper function to store and retrieve data from localStorage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  }
  return defaultValue;
};