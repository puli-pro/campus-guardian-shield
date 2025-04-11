
import React from "react";
import { Shield } from "lucide-react";

const SafetyHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
          <Shield className="h-7 w-7 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Campus Safety Tips</h1>
          <p className="text-muted-foreground">
            Essential guidelines and resources for personal safety on campus
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SafetyHeader;
