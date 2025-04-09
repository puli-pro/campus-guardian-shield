import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

// Mock worker departments
const departments = ["All Departments", "Security", "Maintenance", "Facilities", "Administration", "IT Services"];

// Mock worker names
const workerNames = [
  "All Workers",
  "John Doe",
  "Jane Smith",
  "Robert Johnson",
  "Emily Davis",
  "Michael Wilson",
  "Sarah Thompson",
  "David Martinez",
  "Lisa Garcia",
  "Kevin Chen"
];

// Mock attendance data function
const getAttendanceForDate = (date: Date) => {
  // Generate deterministic but pseudo-random data for the demo
  const day = date.getDate();
  const month = date.getMonth();
  const totalWorkers = 25;
  
  // Use day + month as a seed for "randomness" but keep it consistent
  const seed = day + (month * 30);
  const presentCount = Math.max(15, Math.min(totalWorkers, totalWorkers - (seed % 7)));
  const lateCount = Math.min(5, Math.max(0, (seed % 9)));
  const absentCount = totalWorkers - presentCount - lateCount;
  
  return {
    date,
    totalWorkers,
    presentCount,
    lateCount,
    absentCount,
    presentPercentage: (presentCount / totalWorkers) * 100,
    latePercentage: (lateCount / totalWorkers) * 100,
    absentPercentage: (absentCount / totalWorkers) * 100,
  };
};

// Component to display daily attendance details
const DailyAttendance = ({ date }: { date: Date }) => {
  const attendance = getAttendanceForDate(date);
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">
        Attendance for {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </h3>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Badge className="bg-green-500 mb-2 px-3">Present</Badge>
          <span className="text-3xl font-bold text-green-700 dark:text-green-400">{attendance.presentCount}</span>
          <span className="text-sm text-green-600 dark:text-green-300">{attendance.presentPercentage.toFixed(1)}%</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <Badge variant="secondary" className="bg-yellow-500 text-black mb-2 px-3">Late</Badge>
          <span className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">{attendance.lateCount}</span>
          <span className="text-sm text-yellow-600 dark:text-yellow-300">{attendance.latePercentage.toFixed(1)}%</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <Badge variant="destructive" className="mb-2 px-3">Absent</Badge>
          <span className="text-3xl font-bold text-red-700 dark:text-red-400">{attendance.absentCount}</span>
          <span className="text-sm text-red-600 dark:text-red-300">{attendance.absentPercentage.toFixed(1)}%</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-2">Notes</h4>
        <p className="text-muted-foreground text-sm">
          {attendance.lateCount > 3 
            ? "High number of late arrivals on this day. Consider reviewing punctuality policies."
            : attendance.absentCount > 5
            ? "Significant absence rate detected. May require follow-up with department heads."
            : "Regular attendance pattern observed. No significant anomalies."}
        </p>
      </div>
    </Card>
  );
};

export default function AttendanceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [department, setDepartment] = useState("All Departments");
  const [worker, setWorker] = useState("All Workers");
  
  // Helper function to modify the calendar day rendering to show attendance indicators
  const modifyDayContent = (day: Date) => {
    if (!day) return null;
    
    // Get mock attendance data for this day
    const attendance = getAttendanceForDate(day);
    const presentPercentage = attendance.presentPercentage;
    
    // Determine color based on attendance percentage
    let colorClass = "";
    if (presentPercentage >= 90) colorClass = "bg-green-100 dark:bg-green-900/30";
    else if (presentPercentage >= 75) colorClass = "bg-yellow-100 dark:bg-yellow-900/30";
    else colorClass = "bg-red-100 dark:bg-red-900/30";
    
    return (
      <div className={`h-9 w-9 p-0 font-normal flex items-center justify-center ${colorClass}`}>
        {day.getDate()}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department-select">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="department-select">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departments</SelectLabel>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="worker-select">Worker</Label>
                <Select value={worker} onValueChange={setWorker}>
                  <SelectTrigger id="worker-select">
                    <SelectValue placeholder="Select worker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Workers</SelectLabel>
                      {workerNames.map((name) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                custom: [new Date()],
              }}
              modifiersStyles={{
                custom: { fontWeight: 'bold', border: '2px solid currentColor' }
              }}
              components={{
                Day: ({ date, ...props }) => {
                  return (
                    <div {...props}>
                      {modifyDayContent(date)}
                    </div>
                  )
                }
              }}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">90%+ Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">75-90% Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">&lt;75% Present</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2">
          {date && <DailyAttendance date={date} />}
        </div>
      </div>
    </div>
  );
}
