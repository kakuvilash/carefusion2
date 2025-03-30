
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Brain, HeartPulse, Stethoscope, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChatbotCard from "@/components/dashboard/ChatbotCard";
import AIHealthCard from "@/components/dashboard/AIHealthCard";

const SymptomCheckerDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">AI Health Assistant</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Get AI-powered insights about your health
            </p>
          </div>
          <Button className="bg-carefusion-primary hover:bg-carefusion-primary/90">
            <Brain className="mr-2 h-4 w-4" />
            Start New Analysis
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card-lg col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>AI Symptom Checker</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <ChatbotCard
                title="Symptom Checker"
                type="symptom-checker"
                className="shadow-none border-0"
              />
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="glass-card-lg">
              <CardHeader>
                <CardTitle>Health Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
            
            <Card className="glass-card-lg">
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Headache Analysis</h3>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Possible causes: stress, dehydration, or eye strain</p>
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Stomach Pain Analysis</h3>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Possible causes: indigestion, food poisoning</p>
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="glass-card-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <HeartPulse className="w-5 h-5 mr-2 text-carefusion-primary" />
                <CardTitle>Heart Health</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Check your heart health with our AI-powered assessment tool.
              </p>
              <div className="h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-gray-500">Heartbeat visualization</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Start Assessment</Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Stethoscope className="w-5 h-5 mr-2 text-carefusion-primary" />
                <CardTitle>Respiratory Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Analyze your respiratory health with our advanced AI tools.
              </p>
              <div className="h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-gray-500">Breathing pattern visualization</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Start Assessment</Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <History className="w-5 h-5 mr-2 text-carefusion-primary" />
                <CardTitle>Health History</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                View your past health analyses and track your progress over time.
              </p>
              <div className="h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-gray-500">Health history timeline</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View History</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SymptomCheckerDashboard;
