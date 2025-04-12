
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertOctagon, 
  SendHorizonal, 
  Camera, 
  MapPin, 
  Upload,
  Calendar,
  X,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

// Location suggestions based on incident type
const locationSuggestions = {
  "suspicious": ["Main Entrance", "Library", "Parking Lot A", "Science Building", "Dormitory Area"],
  "safety": ["Sports Field", "Chemistry Lab", "Main Walkway", "Cafeteria", "Gymnasium"],
  "harassment": ["Student Center", "Library", "Online/Virtual", "Dormitory", "Classroom Building"],
  "theft": ["Library", "Student Center", "Dormitory", "Locker Room", "Parking Lot"],
  "vandalism": ["Bathroom", "Hallway", "Exterior Walls", "Parking Lot", "Classroom"],
  "other": ["Main Campus", "Administration Building", "Student Center", "Library", "Other"]
};

const SubmitReportForm = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    isAnonymous: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === "type" && value in locationSuggestions) {
      setShowLocationSuggestions(true);
    }
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isAnonymous: checked
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
    
    if (value in locationSuggestions) {
      setShowLocationSuggestions(true);
    }
  };
  
  const selectLocationSuggestion = (location: string) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
    setShowLocationSuggestions(false);
  };
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      toast({
        title: "Camera Access Error",
        description: "Could not access your camera. Please check your permissions.",
        variant: "destructive"
      });
      console.error("Error accessing camera:", err);
    }
  };
  
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/png");
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };
  
  const discardPhoto = () => {
    setCapturedImage(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type) {
      toast({
        title: "Missing Information",
        description: "Please select the type of incident.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide a description of the incident.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new report object
    const newReport = {
      id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      timestamp: date || new Date(),
      status: "submitted" as const,
      isAnonymous: formData.isAnonymous,
      lastUpdated: new Date(),
      comments: [] as string[],
      evidence: capturedImage
    };
    
    // Dispatch an event to notify the ReportTracker component
    const reportSubmittedEvent = new CustomEvent('reportSubmitted', { 
      detail: { report: newReport }
    });
    document.dispatchEvent(reportSubmittedEvent);
    
    // Reset form
    setFormData({
      type: "",
      description: "",
      location: "",
      isAnonymous: false
    });
    setCapturedImage(null);
    setDate(new Date());
    
    toast({
      title: "Report Submitted",
      description: "Your incident report has been submitted successfully.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertOctagon className="h-5 w-5" /> Report an Incident
        </CardTitle>
        <CardDescription>
          Submit details about a campus incident or safety concern
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type of Incident</Label>
            <Select
              value={formData.type}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                <SelectItem value="safety">Safety Hazard</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="vandalism">Vandalism</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description"
              placeholder="Provide details about what happened"
              value={formData.description}
              onChange={handleInputChange}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <div className="flex">
                <Input 
                  id="location" 
                  name="location"
                  placeholder="Where did this incident occur?"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => setShowLocationSuggestions(!showLocationSuggestions)}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              
              {showLocationSuggestions && formData.type && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-card shadow-md">
                  <div className="py-1">
                    <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                      Suggested locations:
                    </div>
                    {locationSuggestions[formData.type as keyof typeof locationSuggestions]?.map((location, idx) => (
                      <div 
                        key={idx}
                        className="px-2 py-1.5 text-sm hover:bg-muted cursor-pointer"
                        onClick={() => selectLocationSuggestion(location)}
                      >
                        {location}
                      </div>
                    ))}
                    <div 
                      className="px-2 py-1.5 text-sm hover:bg-muted cursor-pointer flex items-center text-blue-600"
                      onClick={() => {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            setFormData(prev => ({
                              ...prev,
                              location: `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`
                            }));
                            setShowLocationSuggestions(false);
                          },
                          () => {
                            toast({
                              title: "Location Access Denied",
                              description: "Could not access your location. Please enter it manually.",
                              variant: "destructive"
                            });
                          }
                        );
                      }}
                    >
                      <MapPin className="h-3 w-3 mr-1" /> Use my current location
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date of Incident</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <Label className="block mb-2">Evidence (Optional)</Label>
              
              {!isCapturing && !capturedImage && (
                <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center gap-4 py-8">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Add photo evidence of the incident if available</p>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={startCamera}
                      className="gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Take Photo</span>
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload File</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {isCapturing && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-video">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button 
                      type="button" 
                      onClick={capturePhoto}
                      className="gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Capture</span>
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={stopCamera}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {capturedImage && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-video">
                    <img 
                      src={capturedImage} 
                      alt="Evidence" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={startCamera}
                      className="gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Retake</span>
                    </Button>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={discardPhoto}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="anonymous" 
                checked={formData.isAnonymous} 
                onCheckedChange={handleCheckboxChange}
              />
              <Label 
                htmlFor="anonymous" 
                className="text-sm font-normal"
              >
                Submit anonymously (your identity will not be recorded)
              </Label>
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-4 gap-2">
            <SendHorizonal className="h-4 w-4" />
            <span>Submit Report</span>
          </Button>
          
          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="h-3 w-3" />
              All reports are kept confidential and reviewed by campus security
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitReportForm;
