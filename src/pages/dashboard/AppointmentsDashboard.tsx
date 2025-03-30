
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AppointmentsDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Appointments</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your upcoming and past appointments
            </p>
          </div>
          <Button className="bg-carefusion-primary hover:bg-carefusion-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </div>
        
        <Card className="glass-card-lg">
          <CardHeader>
            <CardTitle>Quick Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialization</label>
                <select className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <option value="">Select a specialization</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <input
                    type="date"
                    className="flex-1 bg-transparent outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-carefusion-primary hover:bg-carefusion-primary/90">
                  Check Availability
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="upcoming" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AppointmentCard
                doctor={{
                  name: "Dr. Jane Smith",
                  specialty: "Cardiologist",
                  avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=00B4D8&color=fff",
                }}
                date="June 15, 2023"
                time="10:00 AM - 10:30 AM"
                status="upcoming"
                isVideoConsult={true}
              />
              <AppointmentCard
                doctor={{
                  name: "Dr. Michael Chen",
                  specialty: "Dermatologist",
                  avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=009688&color=fff",
                }}
                date="June 18, 2023"
                time="2:00 PM - 2:30 PM"
                status="upcoming"
              />
              <Card className="glass-card overflow-hidden h-[240px] flex flex-col justify-center items-center border-dashed border-2 animate-hover">
                <Button variant="ghost" className="flex flex-col h-full w-full">
                  <Plus size={24} className="mb-2" />
                  <span>Book New Appointment</span>
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AppointmentCard
                doctor={{
                  name: "Dr. Sarah Johnson",
                  specialty: "Neurologist",
                  avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff",
                }}
                date="May 28, 2023"
                time="3:30 PM - 4:00 PM"
                status="completed"
              />
              <AppointmentCard
                doctor={{
                  name: "Dr. Jane Smith",
                  specialty: "Cardiologist",
                  avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=00B4D8&color=fff",
                }}
                date="May 15, 2023"
                time="10:00 AM - 10:30 AM"
                status="completed"
                isVideoConsult={true}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AppointmentCard
                doctor={{
                  name: "Dr. Robert Williams",
                  specialty: "Orthopedic Surgeon",
                  avatar: "https://ui-avatars.com/api/?name=Robert+Williams&background=EF4444&color=fff",
                }}
                date="June 5, 2023"
                time="11:00 AM - 11:30 AM"
                status="cancelled"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Available Clinics Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card overflow-hidden animate-hover">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Metro General Hospital</h3>
                <div className="flex items-center text-sm mb-2">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span>123 Main Street, Downtown</span>
                </div>
                <div className="flex items-center text-sm mb-4">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  <span>Open: 8:00 AM - 8:00 PM</span>
                </div>
                <Button variant="outline" className="w-full">View Doctors</Button>
              </CardContent>
            </Card>
            <Card className="glass-card overflow-hidden animate-hover">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">City Medical Center</h3>
                <div className="flex items-center text-sm mb-2">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span>456 Park Avenue, Midtown</span>
                </div>
                <div className="flex items-center text-sm mb-4">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  <span>Open: 9:00 AM - 7:00 PM</span>
                </div>
                <Button variant="outline" className="w-full">View Doctors</Button>
              </CardContent>
            </Card>
            <Card className="glass-card overflow-hidden animate-hover">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Health First Clinic</h3>
                <div className="flex items-center text-sm mb-2">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span>789 West Street, Uptown</span>
                </div>
                <div className="flex items-center text-sm mb-4">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  <span>Open: 7:00 AM - 9:00 PM</span>
                </div>
                <Button variant="outline" className="w-full">View Doctors</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsDashboard;
