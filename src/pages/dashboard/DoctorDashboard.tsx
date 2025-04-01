
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import MedicalRecordCard from "@/components/dashboard/MedicalRecordCard";
import AIHealthCard from "@/components/dashboard/AIHealthCard";
import ChatbotCard from "@/components/dashboard/ChatbotCard";
import { 
  Calendar, 
  Users, 
  Clock, 
  Stethoscope, 
  Search, 
  Filter, 
  Bell, 
  Video, 
  MessageSquare,
  FileText,
  ArrowUpRight,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Sample data for patients
const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 34,
    condition: "Hypertension",
    status: "Scheduled",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff",
    lastVisit: "10 June 2023"
  },
  {
    id: 2,
    name: "Michael Brown",
    age: 45,
    condition: "Diabetes Type 2",
    status: "Checked-in",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=009688&color=fff",
    lastVisit: "5 June 2023"
  },
  {
    id: 3,
    name: "Emily Davis",
    age: 28,
    condition: "Pregnancy (2nd Trimester)",
    status: "Under Consultation",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=EF4444&color=fff",
    lastVisit: "1 June 2023"
  },
  {
    id: 4,
    name: "Robert Wilson",
    age: 67,
    condition: "Arthritis",
    status: "Waiting",
    avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=FBBF24&color=fff",
    lastVisit: "28 May 2023"
  }
];

const DoctorDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || patient.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300";
      case "checked-in": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300";
      case "under consultation": return "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300";
      case "waiting": return "bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back, Dr. Sarah Miller! Here's an overview of your practice
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Video className="h-4 w-4" />
              Start Video Call
            </Button>
            <Button className="bg-carefusion-primary hover:bg-carefusion-primary/90 gap-2">
              <Calendar className="h-4 w-4" />
              Manage Schedule
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Today's Appointments"
            value="8"
            icon={<Calendar size={20} />}
            description="Next: Sarah Johnson at 10:30 AM"
          />
          <StatCard
            title="Total Patients"
            value="126"
            icon={<Users size={20} />}
            trend={{ value: 5, isPositive: true }}
            description="12 new this month"
          />
          <StatCard
            title="Average Consultation"
            value="22 min"
            icon={<Clock size={20} />}
            description="Down from 25 min last month"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Cases Handled"
            value="48"
            icon={<Stethoscope size={20} />}
            description="This month"
            trend={{ value: 8, isPositive: true }}
          />
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patient Management</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AppointmentCard
                    doctor={{
                      name: "Dr. Sarah Miller",
                      specialty: "Cardiologist",
                      avatar: "https://ui-avatars.com/api/?name=Doctor&background=0070F3&color=fff",
                    }}
                    patient={{
                      name: "Sarah Johnson",
                      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff",
                    }}
                    date="Today"
                    time="10:30 AM - 11:00 AM"
                    status="upcoming"
                    isVideoConsult={true}
                    isDoctor={true}
                  />
                  <AppointmentCard
                    doctor={{
                      name: "Dr. Sarah Miller",
                      specialty: "Cardiologist",
                      avatar: "https://ui-avatars.com/api/?name=Doctor&background=0070F3&color=fff",
                    }}
                    patient={{
                      name: "Michael Brown",
                      avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=009688&color=fff",
                    }}
                    date="Today"
                    time="11:30 AM - 12:00 PM"
                    status="upcoming"
                    isDoctor={true}
                  />
                  <AppointmentCard
                    doctor={{
                      name: "Dr. Sarah Miller",
                      specialty: "Cardiologist",
                      avatar: "https://ui-avatars.com/api/?name=Doctor&background=0070F3&color=fff",
                    }}
                    patient={{
                      name: "Emily Davis",
                      avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=EF4444&color=fff",
                    }}
                    date="Today"
                    time="2:00 PM - 2:30 PM"
                    status="upcoming"
                    isVideoConsult={true}
                    isDoctor={true}
                  />
                  <AppointmentCard
                    doctor={{
                      name: "Dr. Sarah Miller",
                      specialty: "Cardiologist",
                      avatar: "https://ui-avatars.com/api/?name=Doctor&background=0070F3&color=fff",
                    }}
                    patient={{
                      name: "Robert Wilson",
                      avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=FBBF24&color=fff",
                    }}
                    date="Today"
                    time="3:30 PM - 4:00 PM"
                    status="upcoming"
                    isDoctor={true}
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">AI Medical Assistant</h2>
                <ChatbotCard
                  title="Medicine Advisor"
                  type="medicine-advisor"
                  className="h-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Recent Patient Records</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MedicalRecordCard
                    title="Sarah Johnson - Blood Test"
                    type="lab-report"
                    date="June 10, 2023"
                    hospital="Metro General Hospital"
                    fileSize="2.4 MB"
                  />
                  <MedicalRecordCard
                    title="Michael Brown - Hypertension Rx"
                    type="prescription"
                    date="June 9, 2023"
                    hospital="City Medical Center"
                    fileSize="1.2 MB"
                  />
                  <MedicalRecordCard
                    title="Emily Davis - Sick Leave"
                    type="medical-certificate"
                    date="June 7, 2023"
                    hospital="Health First Clinic"
                    fileSize="0.8 MB"
                  />
                  <MedicalRecordCard
                    title="Robert Wilson - Surgery Notes"
                    type="discharge-summary"
                    date="June 5, 2023"
                    hospital="Metro General Hospital"
                    fileSize="3.5 MB"
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Clinical Tools</h2>
                <div className="space-y-4">
                  <AIHealthCard
                    title="Medicine Recommendation"
                    description="Get AI-powered medicine recommendations based on diagnosis and patient history"
                    type="medicine-advisor"
                  />
                  <AIHealthCard
                    title="Medical Research Assistant"
                    description="Find relevant medical research papers and clinical guidelines"
                    type="symptom-checker"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <CardTitle>Patient Management</CardTitle>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input 
                        placeholder="Search patients..." 
                        className="pl-10 w-full md:w-[250px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Filter by status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Patients</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="checked-in">Checked-in</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="under consultation">Under Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800/50 text-left">
                          <th className="p-3 font-medium">Patient</th>
                          <th className="p-3 font-medium">Age</th>
                          <th className="p-3 font-medium">Condition</th>
                          <th className="p-3 font-medium">Status</th>
                          <th className="p-3 font-medium">Last Visit</th>
                          <th className="p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredPatients.length > 0 ? (
                          filteredPatients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={patient.avatar} alt={patient.name} />
                                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{patient.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: {String(patient.id).padStart(6, '0')}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">{patient.age}</td>
                              <td className="p-3">{patient.condition}</td>
                              <td className="p-3">
                                <Badge variant="outline" className={getStatusColor(patient.status)}>
                                  {patient.status}
                                </Badge>
                              </td>
                              <td className="p-3">{patient.lastVisit}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-500">
                              No patients found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Patient Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-lg bg-gray-50 dark:bg-gray-800/30">
                    <p className="text-gray-500">Patient Demographics & Health Trends Charts</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Health Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20 text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-medium">Predictive Analysis</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">25% of your hypertension patients may need medication adjustment based on recent readings.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-900/20 text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h3 className="font-medium">Trend Detection</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Seasonal allergy patterns detected among 18 patients in your practice.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle>Appointment Calendar</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Today
                    </Button>
                    <Button variant="outline" size="sm">
                      Week
                    </Button>
                    <Button variant="outline" size="sm">
                      Month
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center border rounded-lg bg-gray-50 dark:bg-gray-800/30">
                  <p className="text-gray-500">Appointment Calendar View</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={patient.avatar} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-gray-500">{patient.condition}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Today, 2:00 PM</p>
                            <Badge variant="outline" className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <Button size="sm" className="bg-carefusion-primary hover:bg-carefusion-primary/90">
                              Start Session
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Patient Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Michael+Brown&background=009688&color=fff" />
                            <AvatarFallback>MB</AvatarFallback>
                          </Avatar>
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-yellow-500"></span>
                        </div>
                        <span>Michael Brown</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300">
                        Checked-in
                      </Badge>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Robert+Wilson&background=FBBF24&color=fff" />
                            <AvatarFallback>RW</AvatarFallback>
                          </Avatar>
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
                        </div>
                        <span>Robert Wilson</span>
                      </div>
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-300">
                        Waiting
                      </Badge>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900/50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Emily+Davis&background=EF4444&color=fff" />
                            <AvatarFallback>ED</AvatarFallback>
                          </Avatar>
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-purple-500"></span>
                        </div>
                        <span>Emily Davis</span>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300">
                        Under Consultation
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-sm text-gray-500 mb-1">Average Wait</p>
                      <p className="font-medium">15 min</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-sm text-gray-500 mb-1">Next Available</p>
                      <p className="font-medium">4:15 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>AI-Powered Health Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-lg bg-gray-50 dark:bg-gray-800/30">
                    <p className="text-gray-500">Health Trends & Predictive Analytics Charts</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="h-auto">
                <CardHeader>
                  <CardTitle>AI Medical Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChatbotCard
                    title="Gemini Medical Bot"
                    type="medicine-advisor"
                    className="h-[400px] border-0 p-0 shadow-none"
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Treatment Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium mb-1">Hypertension Protocol</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">AI suggests ACE inhibitors for 3 patients showing signs of kidney issues.</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium mb-1">Diabetes Management</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Recent studies show improved outcomes with newer GLP-1 agonists for Type 2 diabetes.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Health Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border bg-amber-50 dark:bg-amber-900/20">
                      <h4 className="font-medium mb-1">Risk Assessment</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">12 patients show early indicators for cardiovascular events within next 5 years.</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-amber-50 dark:bg-amber-900/20">
                      <h4 className="font-medium mb-1">Preventative Care</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">AI recommends lifestyle modifications for 8 pre-diabetic patients in your practice.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Research Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/20">
                      <h4 className="font-medium mb-1">Latest Studies</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">New research shows promising results for early Alzheimer's detection through retinal scans.</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/20">
                      <h4 className="font-medium mb-1">Clinical Trials</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">3 of your patients may qualify for the new rheumatoid arthritis treatment trial.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Communications Tab */}
          <TabsContent value="communications" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Patient Communications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[500px] border rounded-lg">
                    <div className="w-1/3 border-r">
                      <div className="p-3 border-b">
                        <Input placeholder="Search messages..." className="w-full" />
                      </div>
                      <div className="overflow-y-auto h-[calc(500px-48px)]">
                        {patients.map((patient) => (
                          <div key={patient.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer border-b">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={patient.avatar} alt={patient.name} />
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className="font-medium truncate">{patient.name}</p>
                                <p className="text-xs text-gray-500">12:45 PM</p>
                              </div>
                              <p className="text-sm text-gray-500 truncate">Thanks for the prescription, Doctor!</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-2/3 flex flex-col">
                      <div className="p-3 border-b flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff" alt="Sarah Johnson" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-xs text-gray-500">Online</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <Button variant="outline" size="icon">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">Good morning Dr. Miller, I've been experiencing some chest pain when exercising.</p>
                            <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-carefusion-primary text-white p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">Hello Sarah, I'm sorry to hear that. When did this start? Is the pain sharp or dull?</p>
                            <p className="text-xs text-white/70 mt-1">10:35 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">It started about a week ago. The pain is sharp and goes away when I rest.</p>
                            <p className="text-xs text-gray-500 mt-1">10:40 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-carefusion-primary text-white p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">Thank you for the details. I'd like to see you in person to evaluate this further. Are you available this afternoon?</p>
                            <p className="text-xs text-white/70 mt-1">10:45 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">Yes, I can come in. What time works for you?</p>
                            <p className="text-xs text-gray-500 mt-1">10:48 AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-t flex gap-2">
                        <Button variant="outline" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button className="bg-carefusion-primary hover:bg-carefusion-primary/90">
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Video Consultations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://ui-avatars.com/api/?name=Emily+Davis&background=EF4444&color=fff" alt="Emily Davis" />
                            <AvatarFallback>ED</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Emily Davis</p>
                            <p className="text-xs text-gray-500">Scheduled at 2:00 PM</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Video className="h-4 w-4" />
                          Join
                        </Button>
                      </div>
                      
                      <div className="p-3 rounded-lg border flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff" alt="Sarah Johnson" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">Scheduled at 4:30 PM</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Video className="h-4 w-4" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Doctor Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Dr+Johnson&background=6366F1&color=fff" alt="Dr. Johnson" />
                            <AvatarFallback>DJ</AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-sm">Dr. Johnson</p>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm">Could you take a look at this patient's EKG? I'm seeing some abnormalities that might need your cardiology expertise.</p>
                        <div className="mt-2 flex gap-2">
                          <Button variant="outline" size="sm">View Case</Button>
                          <Button size="sm" className="bg-carefusion-primary hover:bg-carefusion-primary/90">Reply</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Dr+Patel&background=10B981&color=fff" alt="Dr. Patel" />
                            <AvatarFallback>DP</AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-sm">Dr. Patel</p>
                          <span className="text-xs text-gray-500">Yesterday</span>
                        </div>
                        <p className="text-sm">Invitation to join the medical conference on Advances in Cardiology next month. Would you be interested?</p>
                        <div className="mt-2 flex gap-2">
                          <Button variant="outline" size="sm">Decline</Button>
                          <Button size="sm" className="bg-carefusion-primary hover:bg-carefusion-primary/90">Accept</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
