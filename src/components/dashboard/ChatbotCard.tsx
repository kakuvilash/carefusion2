
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotCardProps {
  title: string;
  type: "symptom-checker" | "medicine-advisor";
  className?: string;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({
  title,
  type,
  className,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: type === "symptom-checker" 
        ? "Hello! I'm your virtual health assistant. Describe your symptoms and I'll help you understand what might be causing them." 
        : "Hello! I'm your medicine advisor. Describe the condition or provide the diagnosis, and I'll suggest possible medications.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input, type),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string, type: string): string => {
    if (type === "symptom-checker") {
      // Simple mock responses for symptom checker
      if (userInput.toLowerCase().includes("headache")) {
        return "Headaches can be caused by various factors including stress, dehydration, eye strain, or more serious conditions. If you're experiencing severe or persistent headaches, consider consulting a doctor. In the meantime, try to rest, stay hydrated, and take over-the-counter pain relievers if appropriate.";
      } else if (userInput.toLowerCase().includes("fever")) {
        return "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take fever-reducing medication if necessary. If your fever is high (above 103°F/39.4°C), persists for more than 3 days, or is accompanied by severe symptoms, please seek medical attention.";
      } else {
        return "Based on the symptoms you've described, I recommend consulting with a healthcare professional for an accurate diagnosis. Would you like me to help you schedule an appointment with a doctor?";
      }
    } else {
      // Simple mock responses for medicine advisor
      if (userInput.toLowerCase().includes("headache")) {
        return "For headaches, common over-the-counter medications include acetaminophen (Tylenol) or NSAIDs like ibuprofen (Advil, Motrin) or naproxen (Aleve). Always follow dosage instructions and consult with a healthcare provider if headaches persist.";
      } else if (userInput.toLowerCase().includes("hypertension")) {
        return "Hypertension (high blood pressure) is typically treated with medications such as ACE inhibitors, ARBs, calcium channel blockers, or diuretics. The specific medication depends on the patient's overall health and other conditions. This would require a doctor's prescription and regular monitoring.";
      } else {
        return "For this condition, I would need more specific information to provide appropriate medication suggestions. Please consult with a healthcare provider for personalized medical advice and appropriate prescriptions.";
      }
    }
  };

  return (
    <Card className={cn("glass-card-lg overflow-hidden h-full flex flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="p-2 rounded-full bg-carefusion-primary/10 text-carefusion-primary dark:bg-carefusion-primary/20">
            <Bot size={20} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pt-0">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-2 flex gap-3 items-start",
                  message.role === "user"
                    ? "bg-carefusion-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                )}
              >
                <div className="mt-1 rounded-full p-1 flex justify-center items-center bg-white/20 dark:bg-black/20">
                  {message.role === "user" ? (
                    <User size={12} />
                  ) : (
                    <Bot size={12} />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-50">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-xl px-4 py-3 bg-gray-100 dark:bg-gray-800 flex items-center">
                <Loader2 size={16} className="animate-spin mr-2" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder={type === "symptom-checker" ? "Describe your symptoms..." : "Describe the condition..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-white/50 dark:bg-black/30"
          />
          <Button 
            type="submit" 
            size="icon" 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()} 
            className="bg-carefusion-primary hover:bg-carefusion-primary/90"
          >
            <Send size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatbotCard;
