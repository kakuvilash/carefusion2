
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicalRecordCard from "@/components/dashboard/MedicalRecordCard";
import { Search, Filter, FileText, BarChart, PlusCircle, Calendar, Download, FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
}

const PatientRecordsDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-patients");
  const { toast } = useToast();
  
  const patients: Patient[] = [
    { id: "P001", name: "Emily Johnson", age: 42, gender: "Female", condition: "Hypertension", lastVisit: "2023-06-15" },
    { id: "P002", name: "David Chen", age: 35, gender: "Male", condition: "Type 2 Diabetes", lastVisit: "2023-06-10" },
    { id: "P003", name: "Sarah Williams", age: 28, gender: "Female", condition: "Asthma", lastVisit: "2023-06-05" },
    { id: "P004", name: "Michael Brown", age: 55, gender: "Male", condition: "Arthritis", lastVisit: "2023-05-28" },
    { id: "P005", name: "Jessica Taylor", age: 31, gender: "Female", condition: "Anxiety", lastVisit: "2023-05-20" },
    { id: "P006", name: "Robert Martinez", age: 67, gender: "Male", condition: "COPD", lastVisit: "2023-05-15" },
    { id: "P007", name: "Linda Anderson", age: 49, gender: "Female", condition: "Migraine", lastVisit: "2023-05-10" },
  ];
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(
    patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddRecord = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new patient records will be available soon.",
    });
  };
  
  const handleViewDetails = (patientId: string) => {
    toast({
      title: "Viewing Patient Records",
      description: `Loading detailed records for patient ${patientId}`,
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Patient Records</h2>
            <p className="text-muted-foreground">Manage and access your patients' medical records.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button onClick={handleAddRecord}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Patient
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all-patients" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all-patients">All Patients</TabsTrigger>
            <TabsTrigger value="recent">Recent Visits</TabsTrigger>
            <TabsTrigger value="critical">Critical Cases</TabsTrigger>
            <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                <div className="w-full md:w-1/3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      placeholder="Search patients by name, ID, or condition..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileUp className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="all-patients" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map(patient => (
                          <TableRow key={patient.id}>
                            <TableCell>{patient.id}</TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.condition}</TableCell>
                            <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewDetails(patient.id)}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No patients found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patients
                    .filter(patient => new Date(patient.lastVisit) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000))
                    .map(patient => (
                      <Card key={patient.id} className="glass-card overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{patient.name}</h3>
                              <p className="text-sm text-gray-500">{patient.id}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500">Last Visit:</span>
                              <span className="text-xs font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Age:</span>
                                <span className="ml-1">{patient.age}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Gender:</span>
                                <span className="ml-1">{patient.gender}</span>
                              </div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Condition:</span>
                              <span className="ml-1">{patient.condition}</span>
                            </div>
                          </div>
                          <div className="flex justify-between mt-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(patient.id)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Records
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="critical" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>P006</TableCell>
                        <TableCell>Robert Martinez</TableCell>
                        <TableCell>67</TableCell>
                        <TableCell>COPD</TableCell>
                        <TableCell>
                          <span className="text-red-500 font-medium">Critical</span>
                        </TableCell>
                        <TableCell>May 15, 2023</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>P002</TableCell>
                        <TableCell>David Chen</TableCell>
                        <TableCell>35</TableCell>
                        <TableCell>Type 2 Diabetes</TableCell>
                        <TableCell>
                          <span className="text-orange-500 font-medium">Needs Attention</span>
                        </TableCell>
                        <TableCell>June 10, 2023</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="lab-reports" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MedicalRecordCard
                    title="Blood Test Results"
                    type="lab-report"
                    date="June 12, 2023"
                    doctor="Dr. Jane Smith"
                    hospital="Metro General Hospital"
                    fileSize="2.4 MB"
                  />
                  <MedicalRecordCard
                    title="X-Ray Report"
                    type="lab-report"
                    date="May 28, 2023"
                    doctor="Dr. Robert Williams"
                    hospital="City Medical Center"
                    fileSize="8.7 MB"
                  />
                  <MedicalRecordCard
                    title="MRI Scan Results"
                    type="lab-report"
                    date="May 15, 2023"
                    doctor="Dr. Sarah Johnson"
                    hospital="University Hospital"
                    fileSize="12.3 MB"
                  />
                  <MedicalRecordCard
                    title="Cholesterol Panel"
                    type="lab-report"
                    date="April 30, 2023"
                    doctor="Dr. Jane Smith"
                    hospital="Metro General Hospital"
                    fileSize="1.8 MB"
                  />
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientRecordsDashboard;
