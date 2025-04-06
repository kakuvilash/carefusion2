import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import MedicalRecordCard from "@/components/dashboard/MedicalRecordCard";
import AIHealthCard from "@/components/dashboard/AIHealthCard";
import ChatbotCard from "@/components/dashboard/ChatbotCard";
import { Activity, Calendar, FileText, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

const PatientDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Patient Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back! Here's an overview of your health
            </p>
          </div>
          <Button className="bg-carefusion-primary hover:bg-carefusion-primary/90">
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Upcoming Appointments"
            value="3"
            icon={<Calendar size={20} />}
            description="Next: Dr. Smith on June 15"
          />
          <StatCard
            title="Medical Records"
            value="12"
            icon={<FileText size={20} />}
            description="Last updated: 2 days ago"
          />
          <StatCard
            title="Daily Steps"
            value="7,842"
            icon={<Activity size={20} />}
            trend={{ value: 12, isPositive: true }}
            description="Goal: 10,000 steps"
          />
          <StatCard
            title="Medications"
            value="2"
            icon={<Pill size={20} />}
            description="Next dose in 4 hours"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppointmentCard
                doctor={{
                  name: "Dr. Jane Smith",
                  specialty: "Cardiologist",
                  avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=00B4D8&color=fff",
                }}
                date="June 15, 2025"
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
                date="June 18, 2025"
                time="2:00 PM - 2:30 PM"
                status="upcoming"
              />
              <AppointmentCard
                doctor={{
                  name: "Dr. Sarah Johnson",
                  specialty: "Neurologist",
                  avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff",
                }}
                date="May 28, 2025"
                time="3:30 PM - 4:00 PM"
                status="completed"
              />
              <AppointmentCard
                doctor={{
                  name: "Dr. Robert Williams",
                  specialty: "Orthopedic Surgeon",
                  avatar: "https://ui-avatars.com/api/?name=Robert+Williams&background=EF4444&color=fff",
                }}
                date="June 5, 2025"
                time="11:00 AM - 11:30 AM"
                status="cancelled"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">AI Health Assistant</h2>
            <ChatbotCard
              title="Symptom Checker"
              type="symptom-checker"
              className="h-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Recent Medical Records</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MedicalRecordCard
                title="Annual Physical Examination"
                type="lab-report"
                date="May 15, 2023"
                doctor="Dr. Jane Smith"
                hospital="Metro General Hospital"
                fileSize="2.4 MB"
              />
              <MedicalRecordCard
                title="Hypertension Medication"
                type="prescription"
                date="April 30, 2023"
                doctor="Dr. Robert Williams"
                hospital="City Medical Center"
                fileSize="1.2 MB"
              />
              <MedicalRecordCard
                title="Sick Leave Certificate"
                type="medical-certificate"
                date="March 22, 2023"
                doctor="Dr. Michael Chen"
                hospital="Health First Clinic"
                fileSize="0.8 MB"
              />
              <MedicalRecordCard
                title="Surgery Follow-up"
                type="discharge-summary"
                date="February 10, 2023"
                doctor="Dr. Sarah Johnson"
                hospital="Metro General Hospital"
                fileSize="3.5 MB"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Health Tools</h2>
            <div className="space-y-4">
              <AIHealthCard
                title="AI Symptom Analysis"
                description="Describe your symptoms to get AI-powered insights and recommendations"
                type="symptom-checker"
              />
              <AIHealthCard
                title="Medication Reminder"
                description="Set up reminders for your medications and track your adherence"
                type="medicine-advisor"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
