
import React from "react";
import { AlertTriangle } from "lucide-react";

const EmergencyAlertsHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
          <AlertTriangle className="h-7 w-7 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Emergency Alerts & Notifications</h1>
          <p className="text-muted-foreground">
            Receive critical campus alerts and emergency notifications in real-time
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default EmergencyAlertsHeader;
