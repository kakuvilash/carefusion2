
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Pill, BookOpen, PlusCircle, Bookmark, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatbotCard from "@/components/dashboard/ChatbotCard";

interface DrugInfo {
  id: string;
  name: string;
  category: string;
  usedFor: string[];
  sideEffects: string[];
  dosage: string;
  interactions?: string[];
  isSaved?: boolean;
}

const MedicineAdvisorDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const commonDrugs: DrugInfo[] = [
    {
      id: "d1",
      name: "Amoxicillin",
      category: "Antibiotic",
      usedFor: ["Bacterial infections", "Pneumonia", "Bronchitis", "Ear infections"],
      sideEffects: ["Diarrhea", "Rash", "Nausea", "Vomiting"],
      dosage: "250-500mg three times daily",
      interactions: ["Probenecid", "Allopurinol", "Oral contraceptives"]
    },
    {
      id: "d2",
      name: "Lisinopril",
      category: "ACE Inhibitor",
      usedFor: ["Hypertension", "Heart failure", "Post-myocardial infarction"],
      sideEffects: ["Cough", "Dizziness", "Headache", "Fatigue"],
      dosage: "10-40mg once daily",
      interactions: ["NSAIDs", "Potassium supplements", "Lithium"],
      isSaved: true
    },
    {
      id: "d3",
      name: "Metformin",
      category: "Antidiabetic",
      usedFor: ["Type 2 diabetes", "Insulin resistance", "Polycystic ovary syndrome"],
      sideEffects: ["Nausea", "Diarrhea", "Abdominal pain", "Lactic acidosis (rare)"],
      dosage: "500-1000mg twice daily",
      interactions: ["Certain contrast agents", "Alcohol", "Other diabetes medications"]
    },
    {
      id: "d4",
      name: "Atorvastatin",
      category: "Statin",
      usedFor: ["Hypercholesterolemia", "Cardiovascular disease prevention"],
      sideEffects: ["Muscle pain", "Liver damage (rare)", "Headache", "Insomnia"],
      dosage: "10-80mg once daily",
      interactions: ["Grapefruit juice", "Certain antibiotics", "Cyclosporine"],
      isSaved: true
    },
    {
      id: "d5",
      name: "Levothyroxine",
      category: "Thyroid Hormone",
      usedFor: ["Hypothyroidism", "Thyroid hormone replacement"],
      sideEffects: ["Weight loss", "Insomnia", "Anxiety", "Heart palpitations"],
      dosage: "25-200mcg once daily",
      interactions: ["Antacids", "Iron supplements", "Calcium supplements"]
    }
  ];
  
  const filteredDrugs = commonDrugs.filter(
    drug =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.usedFor.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const savedDrugs = commonDrugs.filter(drug => drug.isSaved);
  
  const recentCases = [
    {
      id: "c1",
      patient: "Emily Johnson",
      diagnosis: "Hypertension Stage 1",
      medication: "Lisinopril 10mg",
      date: "2023-06-15"
    },
    {
      id: "c2",
      patient: "David Chen",
      diagnosis: "Type 2 Diabetes",
      medication: "Metformin 1000mg",
      date: "2023-06-10"
    },
    {
      id: "c3",
      patient: "Sarah Williams",
      diagnosis: "Acute Bronchitis",
      medication: "Amoxicillin 500mg",
      date: "2023-06-05"
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Medicine Advisor</h2>
            <p className="text-muted-foreground">AI-powered medication suggestions and drug information.</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <BookOpen className="h-4 w-4 mr-2" />
            View Pharmacopeia
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Drug Database */}
          <div className="md:col-span-2">
            <Tabs defaultValue="all-drugs">
              <TabsList className="mb-4">
                <TabsTrigger value="all-drugs">Drug Database</TabsTrigger>
                <TabsTrigger value="saved">Saved Medications</TabsTrigger>
                <TabsTrigger value="recent-cases">Recent Cases</TabsTrigger>
              </TabsList>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Medication Information</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        placeholder="Search medications..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Browse medications, view detailed information, and save frequently prescribed drugs.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <TabsContent value="all-drugs">
                    <ScrollArea className="h-[560px] pr-4">
                      <div className="space-y-4">
                        {filteredDrugs.length > 0 ? (
                          filteredDrugs.map(drug => (
                            <Card key={drug.id} className="glass-card overflow-hidden animate-hover">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <div>
                                    <CardTitle className="text-lg">{drug.name}</CardTitle>
                                    <CardDescription>{drug.category}</CardDescription>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    {drug.isSaved ? (
                                      <Bookmark className="h-5 w-5 text-carefusion-primary fill-carefusion-primary" />
                                    ) : (
                                      <Bookmark className="h-5 w-5" />
                                    )}
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="space-y-2">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Used For</h4>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {drug.usedFor.map((use, index) => (
                                        <span 
                                          key={index}
                                          className="bg-carefusion-primary/10 text-carefusion-primary text-xs rounded-full px-2 py-1"
                                        >
                                          {use}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dosage</h4>
                                    <p className="text-sm">{drug.dosage}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Side Effects</h4>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {drug.sideEffects.map((effect, index) => (
                                        <span 
                                          key={index}
                                          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full px-2 py-1"
                                        >
                                          {effect}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  View Detailed Information
                                  <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                              </CardFooter>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <Pill className="h-12 w-12 mx-auto text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium">No medications found</h3>
                            <p className="mt-1 text-gray-500">Try adjusting your search terms.</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="saved">
                    <ScrollArea className="h-[560px] pr-4">
                      <div className="space-y-4">
                        {savedDrugs.length > 0 ? (
                          savedDrugs.map(drug => (
                            <Card key={drug.id} className="glass-card overflow-hidden animate-hover">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <div>
                                    <CardTitle className="text-lg">{drug.name}</CardTitle>
                                    <CardDescription>{drug.category}</CardDescription>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <Bookmark className="h-5 w-5 text-carefusion-primary fill-carefusion-primary" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="space-y-2">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Used For</h4>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {drug.usedFor.map((use, index) => (
                                        <span 
                                          key={index}
                                          className="bg-carefusion-primary/10 text-carefusion-primary text-xs rounded-full px-2 py-1"
                                        >
                                          {use}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dosage</h4>
                                    <p className="text-sm">{drug.dosage}</p>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  View Detailed Information
                                  <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                              </CardFooter>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <Bookmark className="h-12 w-12 mx-auto text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium">No saved medications</h3>
                            <p className="mt-1 text-gray-500">Bookmark medications to access them quickly.</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="recent-cases">
                    <ScrollArea className="h-[560px] pr-4">
                      <div className="space-y-4">
                        {recentCases.map(caseItem => (
                          <Card key={caseItem.id} className="glass-card overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-semibold">{caseItem.patient}</h3>
                                  <p className="text-sm text-gray-500">{new Date(caseItem.date).toLocaleDateString()}</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  <PlusCircle className="h-4 w-4 mr-2" />
                                  Use Again
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm text-gray-500">Diagnosis:</span>
                                  <span className="text-sm ml-2">{caseItem.diagnosis}</span>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Prescribed:</span>
                                  <span className="text-sm ml-2 font-medium">{caseItem.medication}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
          
          {/* Right column - Chatbot */}
          <div>
            <ChatbotCard 
              title="Medicine Advisor AI" 
              type="medicine-advisor"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicineAdvisorDashboard;
