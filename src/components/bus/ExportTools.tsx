
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, FileText, Download, Send } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ExportTools = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [reportType, setReportType] = useState<string>("daily");
  const [notes, setNotes] = useState<string>("");

  const handleExport = (format: string) => {
    toast({
      title: `Report exported as ${format.toUpperCase()}`,
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report for ${date.toLocaleDateString()} has been generated.`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Report shared",
      description: "Bus schedule and logs have been shared with the transport team.",
    });
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Export & Report Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="report-type" className="text-sm font-medium">Report Type</label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={reportType === "daily" ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => setReportType("daily")}
            >
              Daily
            </Button>
            <Button
              variant={reportType === "weekly" ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => setReportType("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={reportType === "monthly" ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => setReportType("monthly")}
            >
              Monthly
            </Button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
          <Textarea 
            id="notes" 
            placeholder="Add any additional information for the report..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Export Format</label>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleExport("pdf")}
            >
              <FileText className="mr-2 h-4 w-4" /> PDF
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleExport("excel")}
            >
              <FileText className="mr-2 h-4 w-4" /> Excel
            </Button>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handleShare}
        >
          <Send className="mr-2 h-4 w-4" /> Share with Transport Team
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExportTools;
