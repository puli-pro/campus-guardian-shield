
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertOctagon, Phone, MapPin, UserCheck, SOS, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickActionPanel = () => {
  const { toast } = useToast();
  
  const triggerSOS = () => {
    toast({
      title: "SOS Signal Sent",
      description: "Campus security has been alerted. Stay where you are if safe to do so.",
      variant: "destructive"
    });
  };
  
  const markSafe = () => {
    toast({
      title: "Marked as Safe",
      description: "You have been marked as safe. Your status has been updated in the system.",
    });
  };
  
  const requestHelp = () => {
    toast({
      title: "Help Request Sent",
      description: "Your request for help has been received. Security personnel will contact you shortly.",
      variant: "destructive"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertOctagon className="h-5 w-5" /> Emergency Quick Actions
        </CardTitle>
        <CardDescription>
          Fast access to emergency services and status updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white h-14 gap-3" 
            onClick={triggerSOS}
          >
            <SOS className="h-5 w-5" />
            <span className="font-bold">SOS EMERGENCY</span>
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="border-green-400 hover:bg-green-50 text-green-700 h-14 gap-2" 
              onClick={markSafe}
            >
              <UserCheck className="h-5 w-5" />
              <span>Mark Yourself Safe</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-orange-400 hover:bg-orange-50 text-orange-700 h-14 gap-2" 
              onClick={requestHelp}
            >
              <HelpCircle className="h-5 w-5" />
              <span>I Need Help</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-medium">Direct Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              <span>Campus Security</span>
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Phone className="h-4 w-4 text-red-600" />
              <span>Emergency Services</span>
            </Button>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground pt-2">
          <div className="flex items-center justify-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>Your location will be shared with emergency responders</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionPanel;
