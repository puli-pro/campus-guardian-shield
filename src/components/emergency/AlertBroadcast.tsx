
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Bell, 
  Clock, 
  Send, 
  Shield, 
  Info, 
  CheckCircle, 
  Calendar, 
  X,
  SlidersHorizontal,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type AlertType = "critical" | "security" | "warning" | "clear";

interface EmergencyAlert {
  id: string;
  message: string;
  type: AlertType;
  timestamp: Date;
  expiry: Date | null;
  sender: string;
  sos?: boolean;
}

const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case "critical":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "security":
      return <Shield className="h-5 w-5 text-orange-500" />;
    case "warning":
      return <Info className="h-5 w-5 text-yellow-500" />;
    case "clear":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
};

const getAlertClass = (type: AlertType) => {
  switch (type) {
    case "critical":
      return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900";
    case "security":
      return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900";
    case "warning":
      return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900";
    case "clear":
      return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900";
  }
};

const AlertBroadcast = () => {
  const { toast } = useToast();
  const [alertType, setAlertType] = useState<AlertType>("warning");
  const [message, setMessage] = useState("");
  const [expiryHours, setExpiryHours] = useState("1");
  const [filterType, setFilterType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("compose");
  const [previewAlert, setPreviewAlert] = useState<EmergencyAlert | null>(null);
  
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "1",
      message: "Fire drill scheduled today at 2:00 PM. All students and faculty must evacuate to designated assembly points.",
      type: "warning",
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      expiry: new Date(Date.now() + 2 * 60 * 60000), // expires in 2 hours
      sender: "Campus Safety Director"
    },
    {
      id: "2",
      message: "Suspicious individual reported near the east campus gate. Security personnel have been dispatched. Avoid this area until further notice.",
      type: "security",
      timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
      expiry: new Date(Date.now() + 60 * 60000), // expires in 1 hour
      sender: "Security Office"
    },
    {
      id: "3",
      message: "SEVERE WEATHER ALERT: Thunderstorm warning in effect. Seek shelter indoors away from windows immediately.",
      type: "critical",
      timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      expiry: null, // no expiry
      sender: "Emergency Response Team"
    },
    {
      id: "4",
      message: "All clear for the previously reported suspicious individual. Normal activities may resume.",
      type: "clear",
      timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
      expiry: null,
      sender: "Security Office"
    },
    {
      id: "5",
      message: "SOS EMERGENCY: Student reported being trapped in elevator in Science Building. Emergency services have been dispatched.",
      type: "critical",
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      expiry: null,
      sender: "Emergency Response Team",
      sos: true
    }
  ]);
  
  const sendAlert = () => {
    if (!message.trim()) {
      toast({
        title: "Alert message is required",
        description: "Please enter a message for the alert.",
        variant: "destructive"
      });
      return;
    }
    
    const newAlert: EmergencyAlert = {
      id: Date.now().toString(),
      message,
      type: alertType,
      timestamp: new Date(),
      expiry: expiryHours ? new Date(Date.now() + parseInt(expiryHours) * 60 * 60000) : null,
      sender: "Admin User"
    };
    
    setAlerts([newAlert, ...alerts]);
    setMessage("");
    setActiveTab("history");
    
    toast({
      title: "Alert sent successfully",
      description: `The ${alertType} alert has been broadcast to all platforms.`,
    });
  };
  
  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert deleted",
      description: "The alert has been removed from all platforms.",
    });
  };
  
  const handleSOSAlert = (status: "safe" | "need-help") => {
    const sosMessage = status === "safe" 
      ? "I am SAFE and not in danger. My current location is secure."
      : "I NEED HELP. Please send assistance to my current location immediately.";
      
    const newAlert: EmergencyAlert = {
      id: Date.now().toString(),
      message: sosMessage,
      type: status === "safe" ? "clear" : "critical",
      timestamp: new Date(),
      expiry: null,
      sender: "Mobile User",
      sos: true
    };
    
    setAlerts([newAlert, ...alerts]);
    setActiveTab("history");
    
    toast({
      title: status === "safe" ? "Safe Status Reported" : "Help Request Sent",
      description: status === "safe" 
        ? "Your status has been updated to SAFE in the system."
        : "Emergency services have been notified and assistance is on the way.",
      variant: status === "safe" ? "default" : "destructive"
    });
  };
  
  const filteredAlerts = alerts.filter(alert => {
    if (filterType === "all") return true;
    if (filterType === "sos") return alert.sos === true;
    return alert.type === filterType;
  });
  
  const isExpired = (alert: EmergencyAlert) => {
    if (!alert.expiry) return false;
    return new Date() > alert.expiry;
  };

  const handlePreview = () => {
    if (!message.trim()) {
      toast({
        title: "No message to preview",
        description: "Please enter an alert message first.",
        variant: "destructive"
      });
      return;
    }

    const previewData: EmergencyAlert = {
      id: "preview",
      message,
      type: alertType,
      timestamp: new Date(),
      expiry: expiryHours ? new Date(Date.now() + parseInt(expiryHours) * 60 * 60000) : null,
      sender: "Admin User (Preview)"
    };

    setPreviewAlert(previewData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" /> Alert Broadcast System
        </CardTitle>
        <CardDescription>
          Send campus-wide emergency alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="compose" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose Alert</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="alert-type">Alert Type</Label>
                <Select value={alertType} onValueChange={(value: AlertType) => setAlertType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical" className="flex items-center text-red-600">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Critical Emergency</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="security" className="text-orange-600">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Security Alert</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="warning" className="text-yellow-600">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        <span>General Warning</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="clear" className="text-green-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>All Clear</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Alert Message</Label>
                <Textarea 
                  id="message"
                  placeholder="Enter emergency alert message here..." 
                  className="min-h-[100px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="expiry">Expiry Time (hours)</Label>
                <Select value={expiryHours} onValueChange={setExpiryHours}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Set expiry time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Expiry</SelectItem>
                    <SelectItem value="1">1 Hour</SelectItem>
                    <SelectItem value="2">2 Hours</SelectItem>
                    <SelectItem value="4">4 Hours</SelectItem>
                    <SelectItem value="8">8 Hours</SelectItem>
                    <SelectItem value="24">24 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <Button onClick={sendAlert} className="gap-2">
                  <Send className="h-4 w-4" /> Broadcast Alert
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button" onClick={handlePreview}>
                      <Eye className="h-4 w-4 mr-2" /> Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Alert Preview</DialogTitle>
                      <DialogDescription>
                        Preview how your alert will appear to recipients
                      </DialogDescription>
                    </DialogHeader>
                    {previewAlert && (
                      <div className={`p-4 border rounded-lg ${getAlertClass(previewAlert.type)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {getAlertIcon(previewAlert.type)}
                          <span className="font-medium capitalize">{previewAlert.type} Alert</span>
                        </div>
                        <p className="text-sm mb-3">{previewAlert.message}</p>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" /> 
                          Just now
                        </div>
                        {previewAlert.expiry && (
                          <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3" /> 
                            Expires in {expiryHours} hour(s)
                          </div>
                        )}
                      </div>
                    )}
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                      <Button type="button" onClick={sendAlert}>
                        Confirm & Send
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* SOS Options */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Emergency Status Update
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="border-green-400 hover:bg-green-50 text-green-700 h-12 gap-2" 
                    onClick={() => handleSOSAlert("safe")}
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>I am Safe</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-400 hover:bg-red-50 text-red-700 h-12 gap-2" 
                    onClick={() => handleSOSAlert("need-help")}
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <span>I Need Help</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Update your status during an emergency. This will immediately alert campus security.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Alert History</h3>
              
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <SlidersHorizontal className="h-3.5 w-3.5 mr-2" />
                      <span>Filter</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-4" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by Type</h4>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filter alerts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Alerts</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="clear">All Clear</SelectItem>
                          <SelectItem value="sos">SOS Alerts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-3 border rounded-lg ${getAlertClass(alert.type)} ${isExpired(alert) ? 'opacity-60' : ''} ${alert.sos ? 'border-l-4 border-l-red-500' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getAlertIcon(alert.type)}
                        <span className="font-medium capitalize">
                          {alert.sos ? "SOS " : ""}{alert.type} Alert
                        </span>
                        {isExpired(alert) && (
                          <span className="bg-slate-200 dark:bg-slate-700 text-xs px-2 py-0.5 rounded-full">
                            Expired
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-7 w-7" 
                          onClick={() => deleteAlert(alert.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-2">{alert.message}</p>
                    
                    <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 
                        {alert.timestamp.toLocaleString()}
                      </span>
                      
                      {alert.expiry && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 
                          Expires: {alert.expiry.toLocaleString()}
                        </span>
                      )}
                      
                      <span>Sent by: {alert.sender}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No alerts match your current filters
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AlertBroadcast;
