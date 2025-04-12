
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, User, MapPin, Clock, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VisitorFormPanel = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [visitorData, setVisitorData] = useState({
    name: "",
    email: "",
    purpose: "",
    hostName: "",
    duration: "",
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to capture visitor photos.",
        variant: "destructive",
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
        ctx.drawImage(videoRef.current, 0, 0);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVisitorData({
      ...visitorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setVisitorData({
      ...visitorData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!capturedImage) {
      toast({
        title: "Photo Required",
        description: "Please capture a visitor photo before submitting",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Visitor Registration Submitted",
      description: "Visitor details have been submitted for approval",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" /> Visitor Registration
        </CardTitle>
        <CardDescription>
          Enter visitor details and capture their photo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Visitor Name</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="Enter visitor's full name" 
                value={visitorData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="visitor@example.com"
                value={visitorData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Select
              onValueChange={(value) => handleSelectChange('purpose', value)}
              defaultValue={visitorData.purpose}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purpose of visit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="event">Event Attendance</SelectItem>
                <SelectItem value="tour">Campus Tour</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hostName">Host/Faculty Member</Label>
              <Input 
                id="hostName" 
                name="hostName"
                placeholder="Name of person being visited" 
                value={visitorData.hostName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Expected Duration</Label>
              <Select
                onValueChange={(value) => handleSelectChange('duration', value)}
                defaultValue={visitorData.duration}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expected duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">1 Hour</SelectItem>
                  <SelectItem value="2hours">2 Hours</SelectItem>
                  <SelectItem value="halfday">Half Day</SelectItem>
                  <SelectItem value="fullday">Full Day</SelectItem>
                  <SelectItem value="multiday">Multiple Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <Label>Visitor Photo</Label>
            <div className="bg-muted rounded-lg p-4">
              {!isCapturing && !capturedImage && (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Capture visitor's photo for identification</p>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      onClick={startCamera} 
                      className="gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Start Camera</span>
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {isCapturing && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-video max-w-lg mx-auto">
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
                      <span>Capture Photo</span>
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
                  <div className="relative rounded-lg overflow-hidden aspect-video max-w-lg mx-auto">
                    <img 
                      src={capturedImage} 
                      alt="Captured visitor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button 
                      type="button" 
                      onClick={startCamera} 
                      variant="outline"
                      className="gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Retake Photo</span>
                    </Button>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={discardPhoto}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Discard</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" className="gap-2">
              <User className="h-4 w-4" />
              <span>Register Visitor</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VisitorFormPanel;
