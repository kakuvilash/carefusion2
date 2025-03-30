
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Search,
  Bell
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import NotificationPanel from "@/components/dashboard/NotificationPanel";

const BookAppointmentDashboard: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTab, setSelectedTab] = useState("doctors");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { toast } = useToast();

  const handleBookAppointment = () => {
    if (!date || !selectedDoctor || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a doctor, date, and time to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${selectedDoctor} on ${format(date, "MMMM dd, yyyy")} at ${selectedTime} has been scheduled.`,
    });
  };

  const availableTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Book Appointment</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Schedule your next visit with our healthcare providers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell size={18} />
                  <span className="absolute top-0 right-0 block w-2 h-2 bg-carefusion-primary rounded-full"></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[380px] p-0" align="end">
                <NotificationPanel />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="glass-card-lg">
              <CardHeader>
                <CardTitle>Find Healthcare Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search doctors, specialties..."
                      className="pl-10"
                    />
                  </div>

                  <Tabs defaultValue="doctors" value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="doctors">Doctors</TabsTrigger>
                      <TabsTrigger value="specialties">Specialties</TabsTrigger>
                      <TabsTrigger value="clinics">Clinics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="doctors" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Dr. Jane Smith", "Dr. Michael Chen", "Dr. Sarah Johnson", "Dr. Robert Williams"].map((doctor) => (
                          <Card 
                            key={doctor} 
                            className={cn(
                              "cursor-pointer hover:shadow-md transition-all", 
                              selectedDoctor === doctor ? "border-carefusion-primary" : ""
                            )}
                            onClick={() => setSelectedDoctor(doctor)}
                          >
                            <CardContent className="p-4 flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                {doctor.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-medium">{doctor}</h3>
                                <p className="text-sm text-gray-500">
                                  {doctor === "Dr. Jane Smith" && "Cardiologist"}
                                  {doctor === "Dr. Michael Chen" && "Dermatologist"}
                                  {doctor === "Dr. Sarah Johnson" && "Neurologist"}
                                  {doctor === "Dr. Robert Williams" && "Orthopedic Surgeon"}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="specialties" className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {["Cardiology", "Dermatology", "Neurology", "Orthopedics", "Pediatrics", "Ophthalmology"].map((specialty) => (
                          <Card key={specialty} className="cursor-pointer hover:shadow-md transition-all">
                            <CardContent className="p-4 text-center">
                              <h3 className="font-medium">{specialty}</h3>
                              <p className="text-sm text-gray-500">
                                {Math.floor(Math.random() * 10) + 1} doctors available
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="clinics" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Metro General Hospital", "City Medical Center", "Health First Clinic"].map((clinic) => (
                          <Card key={clinic} className="cursor-pointer hover:shadow-md transition-all">
                            <CardContent className="p-4">
                              <h3 className="font-medium">{clinic}</h3>
                              <div className="flex items-center text-sm mt-2">
                                <MapPin size={16} className="mr-2 text-gray-500" />
                                <span>{Math.floor(Math.random() * 10) + 1} km away</span>
                              </div>
                              <div className="flex items-center text-sm mt-1">
                                <Clock size={16} className="mr-2 text-gray-500" />
                                <span>Open: 8:00 AM - 8:00 PM</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass-card-lg">
              <CardHeader>
                <CardTitle>Schedule Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDoctor ? (
                  <div className="p-3 bg-carefusion-primary/10 rounded-md">
                    <p className="font-medium">{selectedDoctor}</p>
                    <p className="text-sm text-gray-500">
                      {selectedDoctor === "Dr. Jane Smith" && "Cardiologist"}
                      {selectedDoctor === "Dr. Michael Chen" && "Dermatologist"}
                      {selectedDoctor === "Dr. Sarah Johnson" && "Neurologist"}
                      {selectedDoctor === "Dr. Robert Williams" && "Orthopedic Surgeon"}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Please select a doctor first</p>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Time</label>
                  <Select
                    disabled={!date}
                    value={selectedTime}
                    onValueChange={setSelectedTime}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full mt-4 bg-carefusion-primary hover:bg-carefusion-primary/90"
                  disabled={!date || !selectedDoctor || !selectedTime}
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card-lg mt-6">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Unsure about which specialist to choose? Use our AI symptom checker to get recommendations.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "/symptom-checker"}
                >
                  Go to Symptom Checker
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookAppointmentDashboard;
