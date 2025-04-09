
import React, { useState, useEffect } from "react";
import { Fingerprint, CheckCircle, Clock, XCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Mock data for workers
const workers = [
  { id: "W001", name: "John Doe", department: "Security" },
  { id: "W002", name: "Jane Smith", department: "Maintenance" },
  { id: "W003", name: "Robert Johnson", department: "Facilities" },
  { id: "W004", name: "Emily Davis", department: "Administration" },
  { id: "W005", name: "Michael Wilson", department: "IT Services" },
];

// Define attendance status types
type AttendanceStatus = "present" | "late" | "absent";

// Define attendance record structure
interface AttendanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  department: string;
  timeIn: Date;
  status: AttendanceStatus;
}

export default function BiometricCheckIn() {
  const [isScanning, setIsScanning] = useState(false);
  const [currentWorker, setCurrentWorker] = useState<typeof workers[0] | null>(null);
  const [searchId, setSearchId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const { toast } = useToast();

  // Function to simulate fingerprint scan
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      // Randomly select a worker or use the searched one
      let selectedWorker;
      
      if (searchId) {
        selectedWorker = workers.find(w => w.id.toLowerCase() === searchId.toLowerCase());
      } else {
        selectedWorker = workers[Math.floor(Math.random() * workers.length)];
      }
      
      setCurrentWorker(selectedWorker || null);
      setIsScanning(false);
      
      if (selectedWorker) {
        // Determine status based on current time
        const now = new Date();
        const hour = now.getHours();
        
        let status: AttendanceStatus = "present";
        if (hour >= 9 && hour < 10) status = "late";
        
        // Create new attendance record
        const newRecord: AttendanceRecord = {
          id: `ATT-${Date.now()}`,
          workerId: selectedWorker.id,
          workerName: selectedWorker.name,
          department: selectedWorker.department,
          timeIn: now,
          status: status
        };
        
        // Add to records
        setAttendanceRecords(prev => [newRecord, ...prev].slice(0, 10));
        
        // Show toast notification
        toast({
          title: status === "present" ? "Check-in Successful" : "Late Check-in",
          description: `${selectedWorker.name} (${selectedWorker.id}) checked in at ${now.toLocaleTimeString()}`,
          variant: status === "present" ? "default" : "warning"
        });
      } else if (searchId) {
        toast({
          title: "Worker Not Found",
          description: `No worker found with ID: ${searchId}`,
          variant: "destructive"
        });
      }
      
      // Clear search field
      setSearchId("");
    }, 2000);
  };
  
  // Status badge renderer
  const renderStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>;
      case "late":
        return <Badge variant="secondary" className="bg-yellow-500 text-black">Late</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Fingerprint Scanner Simulation */}
        <Card className="p-6 flex flex-col items-center justify-center space-y-6 border-2 border-dashed">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Fingerprint Scanner</h3>
            <p className="text-sm text-muted-foreground mb-4">Place finger on scanner to check in</p>
            
            <div className="mb-6 relative">
              <div className={`h-48 w-48 rounded-full border-4 flex items-center justify-center mx-auto ${isScanning ? 'border-blue-500 animate-pulse' : 'border-gray-300'}`}>
                <Fingerprint 
                  className={`h-24 w-24 ${isScanning ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} 
                />
              </div>
              {isScanning && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="gap-2"
              >
                {isScanning ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Fingerprint className="h-4 w-4" />}
                {isScanning ? "Scanning..." : "Simulate Scan"}
              </Button>
              
              <div className="flex gap-2">
                <Input 
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter worker ID"
                  className="max-w-[160px]"
                  disabled={isScanning}
                />
                <Button 
                  variant="outline"
                  onClick={handleScan}
                  disabled={isScanning || !searchId}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Current Check-in Result */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Check-in Result</h3>
          
          {currentWorker ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gray-200 h-24 w-24 rounded-full flex items-center justify-center mr-4 text-3xl text-gray-600 font-bold">
                  {currentWorker.name.charAt(0)}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{currentWorker.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-medium">{currentWorker.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{currentWorker.department}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>
                    {renderStatusBadge(new Date().getHours() >= 9 ? "late" : "present")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-muted-foreground">
              <Clock className="h-12 w-12 mb-4 opacity-30" />
              <p>No recent check-in</p>
              <p className="text-sm mt-2">Scan fingerprint to check in</p>
            </div>
          )}
        </Card>
      </div>
      
      {/* Recent Check-ins */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Check-ins</h3>
        
        <Table>
          <TableCaption>Live attendance feed showing most recent check-ins</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Worker ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.workerId}</TableCell>
                  <TableCell>{record.workerName}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.timeIn.toLocaleTimeString()}</TableCell>
                  <TableCell>{renderStatusBadge(record.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No check-in records to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
