
import React, { useState } from "react";
import { 
  Calendar, 
  MessageSquare, 
  Bell, 
  FileText, 
  Clock,
  Check,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "appointment" | "message" | "record" | "reminder";
}

const NotificationPanel: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Jane Smith is tomorrow at 10:00 AM.",
      time: "1 hour ago",
      read: false,
      type: "appointment"
    },
    {
      id: "2",
      title: "New Message",
      message: "Dr. Michael Chen sent you a new message regarding your recent visit.",
      time: "3 hours ago",
      read: false,
      type: "message"
    },
    {
      id: "3",
      title: "Medical Record Updated",
      message: "Your lab results have been uploaded to your medical records.",
      time: "Yesterday",
      read: true,
      type: "record"
    },
    {
      id: "4",
      title: "Medication Reminder",
      message: "Don't forget to take your medication today at 8:00 PM.",
      time: "Yesterday",
      read: true,
      type: "reminder"
    },
    {
      id: "5",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Johnson has been confirmed for June 18.",
      time: "2 days ago",
      read: true,
      type: "appointment"
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "record":
        return <FileText className="h-4 w-4" />;
      case "reminder":
        return <Clock className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const getIconColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "text-blue-500";
      case "message":
        return "text-green-500";
      case "record":
        return "text-purple-500";
      case "reminder":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Notifications</h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs h-8"
            >
              Mark all as read
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 mb-0 justify-start">
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="text-xs">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="flex-1 px-0 py-0 m-0">
          <ScrollArea className="h-[400px]">
            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 relative ${!notification.read ? "bg-carefusion-primary/5" : ""}`}
                  >
                    <div className="flex gap-3">
                      <div className={`rounded-full p-2 ${getIconColor(notification.type)} bg-opacity-10`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Bell className="h-8 w-8 text-gray-400 mb-2" />
                <h4 className="font-medium">No notifications</h4>
                <p className="text-sm text-gray-500 mt-1">
                  You don't have any notifications at the moment.
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="unread" className="flex-1 px-0 py-0 m-0">
          <ScrollArea className="h-[400px]">
            {notifications.filter(n => !n.read).length > 0 ? (
              <div className="divide-y">
                {notifications
                  .filter(notification => !notification.read)
                  .map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 relative bg-carefusion-primary/5"
                    >
                      <div className="flex gap-3">
                        <div className={`rounded-full p-2 ${getIconColor(notification.type)} bg-opacity-10`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Check className="h-8 w-8 text-gray-400 mb-2" />
                <h4 className="font-medium">All caught up!</h4>
                <p className="text-sm text-gray-500 mt-1">
                  You don't have any unread notifications.
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="p-3 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
          onClick={() => {
            toast({
              title: "Notification settings",
              description: "This feature will be available soon."
            });
          }}
        >
          Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationPanel;
