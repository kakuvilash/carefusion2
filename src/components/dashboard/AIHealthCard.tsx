
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIHealthCardProps {
  title: string;
  description: string;
  type: "symptom-checker" | "medicine-advisor";
  className?: string;
}

const AIHealthCard: React.FC<AIHealthCardProps> = ({
  title,
  description,
  type,
  className,
}) => {
  const isSymptomChecker = type === "symptom-checker";
  
  return (
    <Card className={cn("glass-card-lg overflow-hidden animate-hover", className)}>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="p-2 rounded-full bg-carefusion-primary/10 text-carefusion-primary dark:bg-carefusion-primary/20">
            {isSymptomChecker ? <Brain size={20} /> : <MessageCircle size={20} />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-carefusion-primary hover:bg-carefusion-primary/90 group">
          <span>{isSymptomChecker ? "Check Symptoms" : "Get Medicine Advice"}</span>
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIHealthCard;
