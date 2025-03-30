
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  doctor: {
    name: string;
    specialty: string;
    avatar: string;
  };
  patient?: {
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  isVideoConsult?: boolean;
  className?: string;
  isDoctor?: boolean;
}

const statusColorMap = {
  upcoming: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  completed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  cancelled: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const statusTextMap = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctor,
  patient,
  date,
  time,
  status,
  isVideoConsult = false,
  className,
  isDoctor = false,
}) => {
  return (
    <Card className={cn("glass-card overflow-hidden animate-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-medium border",
              statusColorMap[status]
            )}
          >
            {statusTextMap[status]}
          </div>
          {isVideoConsult && (
            <div className="flex items-center text-carefusion-primary text-xs font-medium">
              <Video size={14} className="mr-1" />
              Video Consult
            </div>
          )}
        </div>
        
        <div className="flex items-center mb-4">
          <div className="relative mr-3">
            <img
              src={isDoctor ? patient?.avatar : doctor.avatar}
              alt={isDoctor ? patient?.name : doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {status === "upcoming" && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-medium">
              {isDoctor ? patient?.name : doctor.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isDoctor ? "Patient" : doctor.specialty}
            </p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
            <span>{time}</span>
          </div>
        </div>
        
        {status === "upcoming" && (
          <div className="flex space-x-2 mt-4">
            <Button variant="default" className="flex-1 bg-carefusion-primary hover:bg-carefusion-primary/90">
              {isVideoConsult ? "Join Call" : "View Details"}
            </Button>
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
          </div>
        )}
        
        {status === "completed" && (
          <Button variant="outline" className="w-full mt-4">
            View Summary
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
