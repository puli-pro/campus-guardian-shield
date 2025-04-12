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
  CheckCircle,
  Navigation
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const campusLocations = {
  theft: ["Library", "Student Center", "Dormitory", "Parking Lot A", "Parking Lot B", "Cafeteria", "Gym"],
  suspicious: ["Campus Perimeter", "Main Gate", "Library", "Admin Building", "Science Building", "Dormitory Area", "Parking Lot"],
  harassment: ["Classroom Building", "Student Center", "Library", "Online/Virtual", "Sports Field", "Dormitory", "Cafeteria"],
  vandalism: ["Bathroom", "Hallway", "Common Room", "Classroom", "Parking Lot", "Dormitory", "Library"],
  safety: ["Laboratory", "Construction Site", "Stairwell", "Walkway", "Elevator", "Parking Garage", "Pool Area"],
  lost: ["Library", "Cafeteria", "Classroom", "Gym", "Student Center", "Parking Lot", "Dormitory"],
  other: ["Main Building", "Admin Office", "Outdoor Space", "Athletic Field", "Conference Room", "Event Hall"]
};

const SubmitReportForm = () => {
  const { toast } = useToast();
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  
  const handleIncidentTypeChange = (value: string) => {
    setIncidentType(value);
    setLocationOptions(campusLocations[value as keyof typeof campusLocations] || []);
  };
  
  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true);
    setLocation("Current Location (GPS coordinates will be used)");
    toast({
      title: "Location access requested",
      description: "Your current location will be used for this report."
    });
  };
  
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
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setIncidentType("");
        setDescription("");
        setLocation("");
        setDate(undefined);
        setTime("");
        setIsAnonymous(false);
        setShowSuccess(false);
        setUseCurrentLocation(false);
      }, 3000);
      
      toast({
        title: "Report submitted successfully",
        description: "Your incident report has been received and will be reviewed by our security team.",
      });
    }, 1500);
  };
  
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  
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
              <Select value={incidentType} onValueChange={handleIncidentTypeChange} required>
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
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    {incidentType && locationOptions.length > 0 ? (
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select or specify location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locationOptions.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other (specify below)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input 
                        id="location"
                        placeholder="Building, room number, or area"
                        className="pl-9"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    )}
                  </div>
                  
                  {location === "other" && (
                    <Input 
                      placeholder="Please specify location"
                      value={useCurrentLocation ? "Current Location" : ""}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-2"
                    />
                  )}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-1 flex items-center gap-1"
                    onClick={handleUseCurrentLocation}
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    <span>Use my current location</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal flex justify-between items-center",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {date ? format(date, "PP") : "Select date"}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
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
