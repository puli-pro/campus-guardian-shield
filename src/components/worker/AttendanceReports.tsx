
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import * as XLSX from 'xlsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Download, FileSpreadsheet, FileText, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { API_BASE_URL } from "../Constants";
import axios from "axios";
import { jsPDF } from 'jspdf';

// Mock data for the attendance records
const generateMockAttendanceData = () => {
  const workers = [
    { id: "W001", name: "John Doe", department: "Security" },
    { id: "W002", name: "Jane Smith", department: "Maintenance" },
    { id: "W003", name: "Robert Johnson", department: "Facilities" },
    { id: "W004", name: "Emily Davis", department: "Administration" },
    { id: "W005", name: "Michael Wilson", department: "IT Services" },
    { id: "W006", name: "Sarah Thompson", department: "Security" },
    { id: "W007", name: "David Martinez", department: "Maintenance" },
    { id: "W008", name: "Lisa Garcia", department: "Facilities" },
    { id: "W009", name: "Kevin Chen", department: "Administration" },
    { id: "W010", name: "Amanda Lewis", department: "IT Services" },
  ];

  const today = new Date();
  const records = [];

  // Generate records for the past 30 days
  for (let i = 0; i < 30; i++) {
    const recordDate = new Date();
    recordDate.setDate(today.getDate() - i);

    // For each worker, generate a record for this date
    workers.forEach(worker => {
      // Generate random status with weighted probabilities
      const rand = Math.random();
      let status;
      if (rand > 0.15) status = "present";
      else if (rand > 0.05) status = "late";
      else status = "absent";

      // Generate check-in time between 8:00 AM and 9:30 AM
      const hours = status === "present" ? 8 : 9;
      const minutes = Math.floor(Math.random() * 30);
      const checkInTime = new Date(recordDate);
      checkInTime.setHours(hours, minutes);

      // Generate checkout time between 5:00 PM and 6:00 PM
      const checkOutTime = new Date(recordDate);
      checkOutTime.setHours(17, Math.floor(Math.random() * 60));

      records.push({
        id: `ATT-${recordDate.getTime()}-${worker.id}`,
        date: new Date(recordDate),
        workerId: worker.id,
        workerName: worker.name,
        department: worker.department,
        checkIn: checkInTime,
        checkOut: status !== "absent" ? checkOutTime : null,
        status
      });
    });
  }

  return records;
};

const attendanceData = generateMockAttendanceData();

export default function AttendanceReports() {
  const [department, setDepartment] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf'>('excel');
  const [attendanceData, setAttendanceData] = useState<any[]>([]); // Store fetched data
  const [filteredData, setFilteredData] = useState<any[]>([]); // Store filtered data based on filters
  const { toast } = useToast();

  // Function to fetch attendance data from the API
  const fetchAttendanceData = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (date) {
        queryParams.append('year', date.getFullYear().toString());
        queryParams.append('month', (date.getMonth() + 1).toString());
        queryParams.append('day', (date.getDate()).toString());
      }
      if (department !== 'all') {
        queryParams.append('department', department);
      }

      // Assuming you are passing the lecturer_id as a parameter
      // You can fetch it dynamically or statically
      const lecturerId = 1; // Replace with dynamic value if needed
      queryParams.append('lecturer_id', lecturerId.toString());

      const response = await axios.get(`${API_BASE_URL}/attendance/`, {
        params: queryParams,
      });

      setAttendanceData(response.data); // Save the fetched data
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch attendance data.',
      });
    }
  };

  // Filter attendance data based on selected filters
  useEffect(() => {
    const filtered = attendanceData.filter((record: any) => {
      // Filter by department
      if (department !== 'all' && record.department !== department) return false;

      return true;
    });

    setFilteredData(filtered);
  }, [attendanceData, department, date]);

  // Get summary stats for filtered data
  const summarizeAttendance = (data: typeof filteredData) => {
    const total = data.length;
    const present = data.filter((r) => r.status === 'PR').length;
    const late = data.filter((r) => r.status === 'late').length;
    const absent = data.filter((r) => r.status === 'AB').length;

    return {
      total,
      present,
      late,
      absent,
      presentPercentage: total ? (present / total) * 100 : 0,
      latePercentage: total ? (late / total) * 100 : 0,
      absentPercentage: total ? (absent / total) * 100 : 0,
    };
  };

  const summary = summarizeAttendance(filteredData);

  // Handler for export button
  const handleExport = () => {
    toast({
      title: `Exporting ${exportFormat.toUpperCase()} Report`,
      description: `Attendance report for ${date ? format(date, 'PP') : 'all dates'} is being prepared for download.`,
    });

    if (exportFormat === 'excel') {
      // Generate Excel File
      const ws = XLSX.utils.json_to_sheet(filteredData.map((record) => ({
        'Worker ID': record.id,
        'Name': record?.lecturer?.display_name,
        'Department': record?.lecturer?.department_name,
        'Date': format(record.date, 'MMM dd, yyyy'),
        'Check In': record.recorded_at ? format(record.recorded_at, 'hh:mm a') : '-',
        // 'Check Out': record.checkOut ? format(record.checkOut, 'hh:mm a') : '-',
        'Status': record.status === 'PR' ? 'PRESENT' : "ABSENT",
      })));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');

      // Save the Excel file
      XLSX.writeFile(wb, `Attendance_Report_${format(date, 'yyyyMMdd')}.xlsx`);
    }
    else if (exportFormat === 'pdf') {
      // Generate PDF
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Attendance Report', 14, 22);

      doc.setFontSize(12);
      let y = 30;

      // Adding table headers
      doc.text('Worker ID', 14, y);
      doc.text('Name', 40, y);
      doc.text('Department', 80, y);
      doc.text('Date', 120, y);
      doc.text('Check In', 160, y);
      // doc.text('Check Out', 200, y);
      doc.text('Status', 240, y);

      y += 10;

      // Adding table rows
      filteredData.forEach((record) => {
        doc.text(record.id.toString(), 14, y);
        doc.text(record?.lecturer?.display_name, 40, y);
        doc.text(record?.lecturer?.department_name, 80, y);
        doc.text(format(record.date, 'MMM dd, yyyy'), 120, y);
        doc.text(record.recorded_at ? format(record.recorded_at, 'hh:mm a') : '-', 160, y);
        // doc.text(record.checkOut ? format(record.checkOut, 'hh:mm a') : '-', 200, y);
        doc.text(record.status === 'PR' ? 'PRESENT' : "ABSENT", 240, y);

        y += 10;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      // Save the PDF
      doc.save(`Attendance_Report_${format(date, 'yyyyMMdd')}.pdf`);
    }
  };

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      // case 'present':
      case 'PR':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'late':
        return <Badge variant="secondary" className="bg-yellow-500 text-black">Late</Badge>;
      case 'AB':
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return null;
    }
  };

  // Fetch data when component mounts or filters change
  useEffect(() => {
    fetchAttendanceData();
  }, [department, date]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="space-y-2 w-full sm:w-1/3">
          <Label htmlFor="department-filter">Department</Label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger id="department-filter">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Facilities">Facilities</SelectItem>
              <SelectItem value="Administration">Administration</SelectItem>
              <SelectItem value="IT Services">IT Services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full sm:w-1/3">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 w-full sm:w-1/3">
          <Label htmlFor="export-format">Export Format</Label>
          <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as 'excel' | 'pdf')}>
            <SelectTrigger id="export-format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excel">Excel (.xlsx)</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
          {exportFormat === 'excel' ? (
            <FileSpreadsheet className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border">
          <div className="text-sm text-muted-foreground">Total Records</div>
          <div className="text-2xl font-bold">{summary.total}</div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-900">
          <div className="text-sm text-green-600 dark:text-green-400">Present</div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">
            {summary.present}
            <span className="text-sm font-normal ml-2">
              ({summary.presentPercentage.toFixed(1)}%)
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900">
          <div className="text-sm text-yellow-600 dark:text-yellow-400">Late</div>
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
            {summary.late}
            <span className="text-sm font-normal ml-2">
              ({summary.latePercentage.toFixed(1)}%)
            </span>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-900">
          <div className="text-sm text-red-600 dark:text-red-400">Absent</div>
          <div className="text-2xl font-bold text-red-700 dark:text-red-400">
            {summary.absent}
            <span className="text-sm font-normal ml-2">
              ({summary.absentPercentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="rounded-lg border">
        <Table>
          <TableCaption>
            Attendance report for {date ? format(date, 'PPPP') : 'selected date'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Worker ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              {/* <TableHead>Check Out</TableHead> */}
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record?.lecturer?.display_name}</TableCell>
                  <TableCell>{record?.lecturer?.department_name}</TableCell>
                  <TableCell>{format(record.date, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    {record.recorded_at ? format(record.recorded_at, 'hh:mm a') : '-'}
                  </TableCell>
                  {/* <TableCell>
                    {record.checkOut ? format(record.checkOut, 'hh:mm a') : '-'}
                  </TableCell> */}
                  <TableCell>{renderStatusBadge(record.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No attendance records found for the selected filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
