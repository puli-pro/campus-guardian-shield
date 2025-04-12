
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertOctagon, Phone, MapPin, UserCheck, AlertTriangle, HelpCircle, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const QuickActionPanel = () => {
  const { toast } = useToast();
  const [showSafetyConfirmation, setShowSafetyConfirmation] = useState(false);
  
  const triggerSOS = () => {
    // Record the SOS in alert history by dispatching a custom event
    const sosAlertEvent = new CustomEvent('sosAlert', { 
      detail: { 
        type: 'sos',
        timestamp: new Date(),
        location: 'Current Location',
        status: 'active'
      } 
    });
    document.dispatchEvent(sosAlertEvent);
    
    toast({
      title: "SOS Signal Sent",
      description: "Campus security has been alerted. Stay where you are if safe to do so.",
      variant: "destructive"
    });
    
    // Open safety confirmation dialog
    setShowSafetyConfirmation(true);
  };
  
  const markSafe = () => {
    // Record the "mark safe" in alert history
    const safeAlertEvent = new CustomEvent('sosAlert', { 
      detail: { 
        type: 'safe',
        timestamp: new Date(),
        location: 'Current Location',
        status: 'resolved',
        message: 'User marked as safe'
      } 
    });
    document.dispatchEvent(safeAlertEvent);
    
    toast({
      title: "Marked as Safe",
      description: "You have been marked as safe. Your status has been updated in the system.",
    });
    
    setShowSafetyConfirmation(false);
  };
  
  const requestHelp = () => {
    // Record the "help request" in alert history
    const helpAlertEvent = new CustomEvent('sosAlert', { 
      detail: { 
        type: 'help',
        timestamp: new Date(),
        location: 'Current Location',
        status: 'pending',
        message: 'User requested assistance'
      } 
    });
    document.dispatchEvent(helpAlertEvent);
    
    toast({
      title: "Help Request Sent",
      description: "Your request for help has been received. Security personnel will contact you shortly.",
      variant: "destructive"
    });
    
    setShowSafetyConfirmation(false);
  };
  
  return (
    <>
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white h-14 gap-3" 
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-bold">SOS EMERGENCY</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Emergency Alert Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to send an SOS emergency alert to campus security. This should only be used in genuine emergency situations.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-600 hover:bg-red-700" 
                    onClick={triggerSOS}
                  >
                    Send SOS Alert
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
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
      
      {/* Safety Confirmation Dialog */}
      <Dialog open={showSafetyConfirmation} onOpenChange={setShowSafetyConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Status</DialogTitle>
            <DialogDescription>
              Emergency services have been notified. Please update your current status for responders.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button 
              onClick={markSafe} 
              className="bg-green-600 hover:bg-green-700 gap-2 h-12"
            >
              <Check className="h-5 w-5" />
              <span>I'm Safe Now</span>
            </Button>
            
            <Button 
              onClick={requestHelp} 
              className="bg-amber-600 hover:bg-amber-700 gap-2 h-12"
            >
              <HelpCircle className="h-5 w-5" />
              <span>I Still Need Assistance</span>
            </Button>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <DialogDescription className="text-xs flex items-center gap-1">
              <AlertOctagon className="h-3 w-3" />
              <span>Your location is being shared with responders</span>
            </DialogDescription>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickActionPanel;
