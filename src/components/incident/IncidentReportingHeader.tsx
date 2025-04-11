
import React from "react";
import { FileText } from "lucide-react";

const IncidentReportingHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
          <FileText className="h-7 w-7 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Incident Reporting System</h1>
          <p className="text-muted-foreground">
            Report campus incidents securely, with options for anonymous submissions and status tracking
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default IncidentReportingHeader;
