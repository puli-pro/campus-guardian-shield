
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Upload, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  EyeOff,
  Send,
  CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const SubmitReportForm = () => {
  const { toast } = useToast();
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!incidentType || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in the required fields (Incident Type and Description).",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIncidentType("");
        setDescription("");
        setLocation("");
        setDate("");
        setTime("");
        setIsAnonymous(false);
        setShowSuccess(false);
      }, 3000);
      
      toast({
        title: "Report submitted successfully",
        description: "Your incident report has been received and will be reviewed by our security team.",
      });
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" /> Submit Incident Report
        </CardTitle>
        <CardDescription>
          Report suspicious activities, safety concerns, or security incidents
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium">Report Submitted</h3>
            <p className="text-muted-foreground max-w-md">
              Thank you for helping keep our campus safe. Your report has been received and will be addressed promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="incident-type" className="required">Incident Type</Label>
              <Select value={incidentType} onValueChange={setIncidentType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theft">Theft or Burglary</SelectItem>
                  <SelectItem value="suspicious">Suspicious Activity/Person</SelectItem>
                  <SelectItem value="harassment">Harassment or Bullying</SelectItem>
                  <SelectItem value="vandalism">Vandalism or Property Damage</SelectItem>
                  <SelectItem value="safety">Safety Hazard</SelectItem>
                  <SelectItem value="lost">Lost Item</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description" className="required">Description</Label>
              <Textarea 
                id="description"
                placeholder="Provide details about what happened..."
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="location"
                    placeholder="Building, room number, or area"
                    className="pl-9"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="date"
                      type="date"
                      className="pl-9"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="time"
                      type="time"
                      className="pl-9"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Label>Upload Evidence (Optional)</Label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag photos, videos or documents here, or click to browse
                  </p>
                  <Input 
                    id="evidence"
                    type="file"
                    className="hidden"
                    multiple
                  />
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('evidence')?.click()}>
                    Select Files
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="anonymous" 
                checked={isAnonymous} 
                onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="anonymous" className="flex items-center gap-2">
                  Submit anonymously
                  <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                </Label>
                <p className="text-sm text-muted-foreground">
                  Your identity will be hidden from the report.
                </p>
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmitReportForm;
