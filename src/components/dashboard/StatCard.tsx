
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}) => {
  return (
    <Card className={cn("glass-card-lg overflow-hidden animate-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="mt-2 text-2xl font-bold">{value}</h3>
            {description && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
            )}
            {trend && (
              <div className="mt-2 flex items-center">
                <span
                  className={`text-xs font-medium ${
                    trend.isPositive ? "text-carefusion-success" : "text-carefusion-error"
                  }`}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}%
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">vs. last month</span>
              </div>
            )}
          </div>
          <div className="rounded-full p-2 bg-carefusion-primary/10 text-carefusion-primary dark:bg-carefusion-primary/20">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
