
import React from "react";
import { Megaphone } from "lucide-react";

const CommunicationHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <Megaphone className="h-7 w-7 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Security Communication Hub</h1>
          <p className="text-muted-foreground">
            Connect and communicate with campus security personnel
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CommunicationHeader;
