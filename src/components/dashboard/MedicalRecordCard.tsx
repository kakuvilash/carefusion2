
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MedicalRecordCardProps {
  title: string;
  type: "prescription" | "lab-report" | "medical-certificate" | "discharge-summary";
  date: string;
  doctor?: string;
  hospital?: string;
  fileSize?: string;
  fileUrl?: string;
  className?: string;
}

const typeIconMap = {
  "prescription": <FileText size={18} />,
  "lab-report": <FileText size={18} />,
  "medical-certificate": <FileText size={18} />,
  "discharge-summary": <FileText size={18} />,
};

const typeColorMap = {
  "prescription": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  "lab-report": "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  "medical-certificate": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  "discharge-summary": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
};

const typeLabelMap = {
  "prescription": "Prescription",
  "lab-report": "Lab Report",
  "medical-certificate": "Medical Certificate",
  "discharge-summary": "Discharge Summary",
};

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({
  title,
  type,
  date,
  doctor,
  hospital,
  fileSize,
  fileUrl,
  className,
}) => {
  return (
    <Card className={cn("glass-card overflow-hidden animate-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center",
              typeColorMap[type]
            )}
          >
            <span className="mr-1">{typeIconMap[type]}</span>
            <span>{typeLabelMap[type]}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
        </div>
        
        <h3 className="font-medium mb-2">{title}</h3>
        
        <div className="space-y-1 mb-4">
          {doctor && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Doctor: <span className="text-gray-700 dark:text-gray-300">{doctor}</span>
            </p>
          )}
          {hospital && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hospital: <span className="text-gray-700 dark:text-gray-300">{hospital}</span>
            </p>
          )}
          {fileSize && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              File size: {fileSize}
            </p>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye size={14} className="mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Download size={14} className="mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordCard;
