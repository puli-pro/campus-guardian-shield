
import React, { useState } from "react";
import { Camera, Check, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BusEntryLogging = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [lastDetection, setLastDetection] = useState<{
    plateNumber: string;
    timestamp: Date;
    type: "entry" | "exit";
  } | null>(null);

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scan delay
    setTimeout(() => {
      const plateNumbers = ["KA-01-MX-1234", "AP-05-JK-7890", "TS-09-AB-4567", "TN-07-CD-8912", "MH-02-EF-3456"];
      const randomPlate = plateNumbers[Math.floor(Math.random() * plateNumbers.length)];
      const entryOrExit = Math.random() > 0.5 ? "entry" : "exit";
      
      setLastDetection({
        plateNumber: randomPlate,
        timestamp: new Date(),
        type: entryOrExit,
      });
      
      setIsScanning(false);
      
      toast({
        title: "Number Plate Detected",
        description: `${randomPlate} - ${entryOrExit === "entry" ? "Entering" : "Exiting"} campus`,
        variant: "default",
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Automatic Number Plate Recognition
        </CardTitle>
        <CardDescription>
          CCTV cameras automatically detect and log bus entry and exit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-muted/30">
            <div className="h-36 w-48 relative flex items-center justify-center">
              {isScanning ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="h-12 w-12 text-primary animate-spin" />
                  <p className="text-sm font-medium">Scanning number plate...</p>
                </div>
              ) : lastDetection ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-card p-3 border rounded-md shadow-sm">
                    <p className="text-lg font-bold">{lastDetection.plateNumber}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className={lastDetection.type === "entry" ? "text-green-600" : "text-orange-600"}>
                      {lastDetection.type === "entry" ? "Entry" : "Exit"}
                    </span>
                    <span>at {lastDetection.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Successfully logged</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-16 w-32 border-2 border-dashed rounded flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">No plate detected</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Position camera to view plate</p>
                </div>
              )}
            </div>
            <Button 
              onClick={simulateScan}
              disabled={isScanning}
              className="mt-4"
            >
              {isScanning ? "Scanning..." : "Simulate Scan"}
            </Button>
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2">How It Works</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-medium">1</span>
                </div>
                <p>CCTV cameras detect vehicles at campus entry/exit points</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-medium">2</span>
                </div>
                <p>ANPR technology extracts license plate numbers</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-medium">3</span>
                </div>
                <p>System logs entry/exit time and updates bus status</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-medium">4</span>
                </div>
                <p>Real-time updates to dashboard and notification systems</p>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusEntryLogging;
