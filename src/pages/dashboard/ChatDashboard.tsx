
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Video, Phone, Info, Paperclip, Send, User, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "doctor";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastMessage?: string;
  lastMessageTime?: Date;
  unread: number;
}

const ChatDashboard: React.FC = () => {
  const [message, setMessage] = useState("");
  const [activeContactId, setActiveContactId] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Dr. Jane Smith",
      role: "Cardiologist",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=00B4D8&color=fff",
      status: "online",
      lastMessage: "How are you feeling today?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unread: 1
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      role: "Dermatologist",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=009688&color=fff",
      status: "offline",
      lastMessage: "Let me know if you have any questions about your prescription.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: 0
    },
    {
      id: "3",
      name: "Dr. Sarah Johnson",
      role: "Neurologist",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff",
      status: "away",
      lastMessage: "Your lab results look good.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unread: 0
    },
    {
      id: "4",
      name: "Dr. Robert Williams",
      role: "Orthopedic Surgeon",
      avatar: "https://ui-avatars.com/api/?name=Robert+Williams&background=EF4444&color=fff",
      status: "online",
      lastMessage: "How is your knee feeling after the physical therapy?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      unread: 0
    },
  ];
  
  const messages: Message[] = [
    {
      id: "1",
      content: "Hello, how can I help you today?",
      sender: "doctor",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      status: "read"
    },
    {
      id: "2",
      content: "I've been experiencing some chest pain and shortness of breath.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
      status: "read"
    },
    {
      id: "3",
      content: "I'm sorry to hear that. Can you describe the pain? Is it sharp, dull, or pressure-like?",
      sender: "doctor",
      timestamp: new Date(Date.now() - 1000 * 60 * 6), // 6 minutes ago
      status: "read"
    },
    {
      id: "4",
      content: "It's more like a pressure, especially when I climb stairs or walk quickly.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: "read"
    },
    {
      id: "5",
      content: "How are you feeling today?",
      sender: "doctor",
      timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
      status: "delivered"
    },
  ];
  
  const activeContact = contacts.find(contact => contact.id === activeContactId);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    // In a real app, you would send the message to the backend
    setMessage("");
  };
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow">
          {/* Contacts sidebar */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder="Search contacts..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`p-4 flex items-start space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    activeContactId === contact.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                  }`}
                  onClick={() => setActiveContactId(contact.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                        contact.status === 'online' ? 'bg-green-500' : 
                        contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      {contact.lastMessageTime && (
                        <span className="text-xs text-gray-500">
                          {contact.lastMessageTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.role}</p>
                    {contact.lastMessage && (
                      <p className="text-xs truncate mt-1">
                        {contact.lastMessage}
                      </p>
                    )}
                  </div>
                  {contact.unread > 0 && (
                    <div className="min-w-[20px] h-5 rounded-full bg-carefusion-primary text-white flex items-center justify-center text-xs">
                      {contact.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {activeContact ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                      <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeContact.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span 
                          className={`w-2 h-2 rounded-full mr-2 ${
                            activeContact.status === 'online' ? 'bg-green-500' : 
                            activeContact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}
                        />
                        <span className="capitalize">{activeContact.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'doctor' && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={activeContact.avatar} />
                            <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.sender === 'user' 
                              ? 'bg-carefusion-primary text-white' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <div 
                            className={`text-xs mt-1 flex justify-end ${
                              msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        {msg.sender === 'user' && (
                          <Avatar className="h-8 w-8 ml-2">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Me&background=3B82F6&color=fff" />
                            <AvatarFallback>Me</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input 
                      placeholder="Type a message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      size="icon" 
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-carefusion-primary hover:bg-carefusion-primary/90"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No chat selected</h3>
                  <p className="text-gray-500 max-w-md">
                    Select a doctor from the list to start a conversation.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Doctor info sidebar */}
          {activeContact && (
            <div className="w-64 border-l border-gray-200 dark:border-gray-800 hidden lg:block">
              <div className="p-4 text-center border-b border-gray-200 dark:border-gray-800">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                  <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{activeContact.name}</h3>
                <p className="text-sm text-gray-500">{activeContact.role}</p>
              </div>
              
              <div className="p-4">
                <h4 className="text-sm font-medium mb-3">Upcoming Appointment</h4>
                <Card className="glass-card">
                  <CardContent className="p-3">
                    <div className="flex items-center text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>June 15, 2023</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>10:00 AM - 10:30 AM</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Reschedule
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Call
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-3">Doctor Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Specialty:</span> {activeContact.role}</p>
                  <p><span className="text-gray-500">Hospital:</span> Metro General Hospital</p>
                  <p><span className="text-gray-500">Experience:</span> 15 years</p>
                  <p><span className="text-gray-500">Languages:</span> English, Spanish</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatDashboard;
