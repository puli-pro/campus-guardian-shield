
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StepStatus = "pending" | "current" | "complete" | "error";

interface StepProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  status?: StepStatus;
  children: ReactNode;
}

interface StepsProps {
  activeStep: number;
  children: ReactNode;
}

export function Step({ icon, title, description, status = "pending", children }: StepProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            status === "complete" && "bg-primary text-primary-foreground",
            status === "current" && "border-2 border-primary bg-background text-primary",
            status === "pending" && "bg-muted text-muted-foreground",
            status === "error" && "bg-destructive text-destructive-foreground",
          )}>
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-medium leading-none">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="ml-5 border-l border-muted pl-5 pt-2">
        {children}
      </div>
    </div>
  );
}

export function Steps({ activeStep, children }: StepsProps) {
  // Ensure children is an array even if only one child is provided
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className="space-y-0">
      {childrenArray.map((child, index) => {
        // Safely type-cast the React element
        const stepChild = child as React.ReactElement<StepProps>;
        
        let status: StepStatus = "pending";
        if (index === activeStep) status = "current";
        else if (index < activeStep) status = "complete";
        
        // If the step has a specific status prop, use that instead
        if (stepChild.props.status) {
          status = stepChild.props.status;
        }
        
        // Clone the element with the new status prop
        return React.cloneElement(stepChild, {
          key: index,
          status,
        });
      })}
    </div>
  );
}
