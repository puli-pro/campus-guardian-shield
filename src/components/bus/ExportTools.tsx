
import React, { useState } from "react";
import { FileText, Download, Share2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const ExportTools = () => {
  const { toast } = useToast();
  const [exportType, setExportType] = useState("busLogs");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [date, setDate] = useState<Date>(new Date());

  const handleExport = () => {
    const typeLabel = 
      exportType === "busLogs" ? "Bus Entry/Exit Logs" :
      exportType === "schedule" ? "Bus Schedule" : 
      "Departure Sheet";
      
    toast({
      title: "Export Started",
      description: `${typeLabel} will be exported as ${exportFormat.toUpperCase()} shortly.`,
      variant: "default",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Links Generated",
      description: "Secure link has been copied to clipboard and can be shared with authorized personnel.",
      variant: "default",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Export & Reports
        </CardTitle>
        <CardDescription>
          Generate and share bus reports and schedules
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="busLogs">Bus Entry/Exit Logs</SelectItem>
                  <SelectItem value="schedule">Bus Schedule</SelectItem>
                  <SelectItem value="departureSheet">Departure Sheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button onClick={handleExport} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Export {exportFormat.toUpperCase()}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          
          <div className="mt-4 rounded-md bg-muted p-3">
            <h4 className="text-sm font-medium mb-1">Administrative Tools</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Update bus details, schedules, or route information in the system.
            </p>
            <Button variant="outline" size="sm" className="w-full text-sm">
              Edit Bus Data & Schedules
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportTools;
