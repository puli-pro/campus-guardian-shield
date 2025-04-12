import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "../Constants";
import axios from "axios";
import { setYear } from "date-fns";

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
const DailyAttendance = ({ date, attendance }: { date: Date, attendance: any }) => {
  if (!attendance) {
    return (
      <Card className="p-6">
        <p>Loading attendance data...</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">
        Attendance for{" "}
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Badge className="bg-green-500 mb-2 px-3">Present</Badge>
          <span className="text-3xl font-bold text-green-700 dark:text-green-400">
            {attendance.presentCount}
          </span>
          <span className="text-sm text-green-600 dark:text-green-300">
            {attendance.presentPercentage.toFixed(1)}%
          </span>
        </div>

        <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <Badge variant="secondary" className="bg-yellow-500 text-black mb-2 px-3">
            Late
          </Badge>
          <span className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
            {attendance.lateCount}
          </span>
          <span className="text-sm text-yellow-600 dark:text-yellow-300">
            {attendance.latePercentage.toFixed(1)}%
          </span>
        </div>

        <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <Badge variant="destructive" className="mb-2 px-3">
            Absent
          </Badge>
          <span className="text-3xl font-bold text-red-700 dark:text-red-400">
            {attendance.absentCount}
          </span>
          <span className="text-sm text-red-600 dark:text-red-300">
            {attendance.absentPercentage.toFixed(1)}%
          </span>
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

const modifyDayContent = (day: Date, attendanceData: any, selectedDate) => {
  if (!day) return null;

  // Find attendance data for this day
  const attendance = attendanceData;
  const presentPercentage = attendance ? attendance.presentPercentage : 0;

  // Determine color based on attendance percentage
  let colorClass = "";
  if (presentPercentage >= 90) colorClass = "bg-green-100 dark:bg-green-900/30";
  else if (presentPercentage >= 75) colorClass = "bg-yellow-100 dark:bg-yellow-900/30";
  else colorClass = "bg-red-100 dark:bg-red-900/30";

  console.log(attendanceData, presentPercentage, day.toDateString())
  // if (selectedDate === day) "bg-blue-100 dark:bg-blue-900/30"

  return (
    <div className={`h-9 w-9 p-0 font-normal flex items-center justify-center ${colorClass}`}>
      {day.getDate()}
    </div>
  );
};

export default function AttendanceCalendar() {
  const [selectedDate, setDate] = useState<Date | undefined>(new Date());
  const [department, setDepartment] = useState("All Departments");
  const [worker, setWorker] = useState("All Workers");
  const [attendanceData, setAttendanceData] = useState<any>({});
  const [departments, setDepartments] = useState([])
  const [workers, setWorkers] = useState([])

  // Fetch attendance data from the API
  const fetchAttendanceData = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (department !== 'All Departments') queryParams.append('department', department);

      if (worker !== 'All Workers') queryParams.append('lecturer_id', worker);
      if (selectedDate) {
        queryParams.append('year', selectedDate.getFullYear().toString()); // Get the year
        queryParams.append('month', (selectedDate.getMonth() + 1).toString()); // Get the month (adding 1 to make it human-readable)
      }
      // if (selectedDate) queryParams.append('month', '4');

      const response = await axios.get(`${API_BASE_URL}/attendance/daily-summary/`, {
        params: queryParams,
      });

      const data = response.data;
      const formattedData = {};

      // Format the data as a map with date strings as keys
      data.forEach((attendance: any) => {
        const dayString = new Date(attendance.date).toDateString();
        formattedData[dayString] = attendance;
      });

      setAttendanceData(formattedData);

      const lecturersResponseObject = await axios.get(`${API_BASE_URL}/management/`);
      let departmentsData = []
      lecturersResponseObject.data.map((lecturer) => {
        if (!departmentsData.includes(lecturer.department_name))
          departmentsData.push(lecturer.department_name)
      });
      setWorkers(lecturersResponseObject.data)
      setDepartments(departmentsData)
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDate, department, worker]);

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
                      {["All Departments", ...departments].map((dept) => (
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
                      {/* {workerNames.map((name) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))} */}
                      <SelectItem key={"All Workers"} value={"All Workers"}>{"All Workers"}</SelectItem>
                      {workers.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.display_name}</SelectItem>
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
              selected={selectedDate}
              // onSelect={(newDate) => {
              //   console.log(newDate)
              //   newDate && setDate(newDate)
              // }}
              // onSelect={setDate}
              className="rounded-md border"
              // modifiers={Object.keys(attendanceData).map(date => new Date(date))}
              // modifiersStyles={Object.keys(attendanceData).reduce((styles, date) => {
              //   const attendance = attendanceData[date];
              //   const presentPercentage = attendance.presentPercentage;
              //   let colorClass = "";
              //   if (presentPercentage >= 90) colorClass = "bg-green-100 dark:bg-green-900/30";
              //   else if (presentPercentage >= 75) colorClass = "bg-yellow-100 dark:bg-yellow-900/30";
              //   else colorClass = "bg-red-100 dark:bg-red-900/30";

              //   // styles[new Date(date)] = { backgroundColor: colorClass };
              //   return styles;
              // }, {})}
              components={{
                Day: ({ date, ...props }) => {
                  return (
                    <div {...props} onClick={() => setDate(date)}>
                      {modifyDayContent(date, attendanceData[date.toDateString()], selectedDate)}
                    </div>
                  );
                },
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
          {selectedDate && <DailyAttendance date={selectedDate} attendance={attendanceData[selectedDate.toDateString()] || null} />}
        </div>
      </div>
    </div>
  );
}
