
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MedicalRecordCard from "@/components/dashboard/MedicalRecordCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MedicalRecordsDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Medical Records</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Access and manage your medical history
            </p>
          </div>
          <Button className="bg-carefusion-primary hover:bg-carefusion-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Record
          </Button>
        </div>
        
        <Card className="glass-card-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder="Search records by name, doctor, or hospital..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="summaries">Discharge Summaries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <MedicalRecordCard
                title="Blood Work Analysis"
                type="lab-report"
                date="January 25, 2023"
                doctor="Dr. Jane Smith"
                hospital="City Medical Center"
                fileSize="1.8 MB"
              />
              <Card className="glass-card overflow-hidden h-[240px] flex flex-col justify-center items-center border-dashed border-2 animate-hover">
                <Button variant="ghost" className="flex flex-col h-full w-full">
                  <Plus size={24} className="mb-2" />
                  <span>Upload New Record</span>
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MedicalRecordCard
                title="Annual Physical Examination"
                type="lab-report"
                date="May 15, 2023"
                doctor="Dr. Jane Smith"
                hospital="Metro General Hospital"
                fileSize="2.4 MB"
              />
              <MedicalRecordCard
                title="Blood Work Analysis"
                type="lab-report"
                date="January 25, 2023"
                doctor="Dr. Jane Smith"
                hospital="City Medical Center"
                fileSize="1.8 MB"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="prescriptions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MedicalRecordCard
                title="Hypertension Medication"
                type="prescription"
                date="April 30, 2023"
                doctor="Dr. Robert Williams"
                hospital="City Medical Center"
                fileSize="1.2 MB"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="certificates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MedicalRecordCard
                title="Sick Leave Certificate"
                type="medical-certificate"
                date="March 22, 2023"
                doctor="Dr. Michael Chen"
                hospital="Health First Clinic"
                fileSize="0.8 MB"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="summaries" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MedicalRecordCard
                title="Surgery Follow-up"
                type="discharge-summary"
                date="February 10, 2023"
                doctor="Dr. Sarah Johnson"
                hospital="Metro General Hospital"
                fileSize="3.5 MB"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Health Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card-lg">
              <CardHeader>
                <CardTitle>Blood Pressure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">Blood pressure chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card-lg">
              <CardHeader>
                <CardTitle>Cholesterol Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">Cholesterol levels chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecordsDashboard;
