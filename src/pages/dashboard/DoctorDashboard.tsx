
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import MedicalRecordCard from "@/components/dashboard/MedicalRecordCard";
import AIHealthCard from "@/components/dashboard/AIHealthCard";
import ChatbotCard from "@/components/dashboard/ChatbotCard";
import { Calendar, Users, Clock, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const DoctorDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back! Here's an overview of your practice
            </p>
          </div>
          <Button className="bg-carefusion-primary hover:bg-carefusion-primary/90">
            <Calendar className="mr-2 h-4 w-4" />
            Manage Schedule
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppointmentCard
                doctor={{
                  name: "Dr. You",
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
                  name: "Dr. You",
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
                  name: "Dr. You",
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
                  name: "Dr. You",
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
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
