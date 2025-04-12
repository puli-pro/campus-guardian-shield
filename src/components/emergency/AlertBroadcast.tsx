
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Megaphone,
  AlertTriangle,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Users,
  MapPin,
  Send,
  Eye
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { API_BASE_URL } from "../Constants";

type AlertType = "emergency" | "weather" | "security" | "announcement" | "sos" | "safe" | "help";
type AlertStatus = "active" | "resolved" | "scheduled" | "pending";

interface CampusAlert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: Date;
  status: AlertStatus;
  senderId?: string;
  location?: string;
  affectedAreas?: string[];
  expiresAt?: Date;
}

const AlertBroadcast = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("broadcast");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAlerts, setExpandedAlerts] = useState<string[]>([]);

  const [alertForm, setAlertForm] = useState({
    type: "emergency",
    title: "",
    message: "",
    affectedAreas: [] as string[],
    sendToAll: true
  });
  const [alerts, setAlerts] = useState<any>([])

  const [alertHistory, setAlertHistory] = useState<CampusAlert[]>([
    {
      id: "A-1001",
      type: "emergency",
      title: "Fire Drill",
      message: "Fire drill scheduled today at 2:00 PM. All students and faculty must evacuate to designated assembly points.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "active",
      affectedAreas: ["Main Campus", "Science Building", "Library"],
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours from now
    },
    {
      id: "A-1000",
      type: "weather",
      title: "Severe Weather Warning",
      message: "Heavy rain and potential flooding expected. All outdoor activities are canceled until further notice.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "active",
      affectedAreas: ["Entire Campus"],
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000) // 2 days from now
    },
    {
      id: "A-999",
      type: "security",
      title: "Suspicious Activity",
      message: "Security personnel investigating suspicious activity near the north parking lot. Please avoid the area.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: "resolved",
      affectedAreas: ["North Parking Lot"]
    },
    {
      id: "A-998",
      type: "announcement",
      title: "Library Hours Extended",
      message: "The main library will extend its opening hours to 10PM during finals week starting Monday.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "active",
      affectedAreas: ["Library"]
    }
  ]);

  async function getAlerts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/alerts/`);
      setAlerts(response.data)
    } catch (error) {
      console.error('Error fetching alerts:', error.response?.data || error.message);
    }
  }

  useEffect(() => {
    (async () => {
      await getAlerts()
    })();
  }, [])

  // Listen for SOS alerts from QuickActionPanel
  useEffect(() => {
    const handleSosAlert = (event: CustomEvent) => {
      const { type, timestamp, location, status, message } = event.detail;

      const newAlertId = `A-${Math.floor(1000 + Math.random() * 9000)}`;

      let title = "Emergency SOS Alert";
      let alertMessage = "User has triggered an emergency SOS alert. Security personnel dispatched.";
      let alertType: AlertType = "sos";
      let alertStatus: AlertStatus = "active";

      if (type === "safe") {
        title = "User Marked as Safe";
        alertMessage = message || "User has marked themselves as safe after an emergency alert.";
        alertType = "safe";
        alertStatus = "resolved";
      } else if (type === "help") {
        title = "Assistance Requested";
        alertMessage = message || "User has requested assistance. Security personnel responding.";
        alertType = "help";
        alertStatus = "pending";
      }

      const newAlert: CampusAlert = {
        id: newAlertId,
        type: alertType,
        title,
        message: alertMessage,
        timestamp: timestamp || new Date(),
        status: alertStatus,
        location
      };

      setAlertHistory(prev => [newAlert, ...prev]);

      // Switch to history tab to show the new alert
      setActiveTab("history");

      // Expand the new alert
      setExpandedAlerts(prev => [...prev, newAlertId]);
    };

    document.addEventListener('sosAlert', handleSosAlert as EventListener);

    return () => {
      document.removeEventListener('sosAlert', handleSosAlert as EventListener);
    };
  }, []);

  const toggleAlertExpand = (id: string) => {
    setExpandedAlerts(prev =>
      prev.includes(id)
        ? prev.filter(alertId => alertId !== id)
        : [...prev, id]
    );
  };

  const handleAlertInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAlertForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value: string) => {
    setAlertForm(prev => ({
      ...prev,
      type: value as AlertType
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setAlertForm(prev => ({
      ...prev,
      sendToAll: checked
    }));
  };

  const handleAffectedAreaChange = (area: string) => {
    setAlertForm(prev => {
      if (prev.affectedAreas.includes(area)) {
        return {
          ...prev,
          affectedAreas: prev.affectedAreas.filter(a => a !== area)
        };
      } else {
        return {
          ...prev,
          affectedAreas: [...prev.affectedAreas, area]
        };
      }
    });
  };

  const broadcastAlert = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!alertForm.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide an alert title.",
        variant: "destructive"
      });
      return;
    }

    if (!alertForm.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide an alert message.",
        variant: "destructive"
      });
      return;
    }

    if (!alertForm.sendToAll && alertForm.affectedAreas.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one affected area or check 'Send to All'.",
        variant: "destructive"
      });
      return;
    }

    const payload = {
      message: alertForm.message,
      title: alertForm.title,
      type: alertForm.type,
      // expiry: expiryHours ? new Date(Date.now() + parseInt(expiryHours) * 60 * 60000).toISOString() : null,
      sender: "Admin User"
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/alerts/`, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const savedAlert = response.data;
      await getAlerts()
      setActiveTab("history");

      toast({
        title: "Alert sent successfully",
        description: `The ${alertForm.type} alert has been broadcast to all platforms.`,
      });
    } catch (err) {
      toast({
        title: "Failed to send alert",
        description: (err as Error).message,
        variant: "destructive"
      });
    }

    toast({
      title: "Alert Broadcasted",
      description: "Your alert has been sent to all affected areas.",
    });

    // Reset form
    setAlertForm({
      type: "emergency",
      title: "",
      message: "",
      affectedAreas: [],
      sendToAll: true
    });

    // Switch to history tab to show the new alert
  };

  const filteredAlerts = alertHistory.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (alert.affectedAreas && alert.affectedAreas.some(area =>
      area.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "weather":
        return <AlertOctagon className="h-5 w-5 text-amber-500" />;
      case "security":
        return <AlertOctagon className="h-5 w-5 text-blue-500" />;
      case "announcement":
        return <Megaphone className="h-5 w-5 text-indigo-500" />;
      case "sos":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "safe":
        return <Users className="h-5 w-5 text-green-500" />;
      case "help":
        return <AlertOctagon className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-500">Active</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const previewAlert = () => {
    toast({
      title: alertForm.title || "Alert Preview",
      description: alertForm.message || "Your alert message will appear here.",
      variant: alertForm.type === "emergency" ? "destructive" : "default",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" /> Emergency Alerts & Notifications
        </CardTitle>
        <CardDescription>
          Broadcast emergency alerts and view alert history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="broadcast" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span>Broadcast Alert</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Alert History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="broadcast" className="space-y-4">
            <form onSubmit={broadcastAlert} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alert-type">Alert Type</Label>
                <Select
                  value={alertForm.type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger id="alert-type">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency Alert</SelectItem>
                    <SelectItem value="weather">Weather Alert</SelectItem>
                    <SelectItem value="security">Security Alert</SelectItem>
                    <SelectItem value="announcement">General Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-title">Alert Title</Label>
                <Input
                  id="alert-title"
                  name="title"
                  placeholder="Enter alert title"
                  value={alertForm.title}
                  onChange={handleAlertInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-message">Alert Message</Label>
                <Textarea
                  id="alert-message"
                  name="message"
                  placeholder="Enter detailed alert message"
                  value={alertForm.message}
                  onChange={handleAlertInputChange}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="send-to-all"
                    checked={alertForm.sendToAll}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="send-to-all">Send to All Campus Areas</Label>
                </div>
              </div>

              {!alertForm.sendToAll && (
                <div className="space-y-2">
                  <Label>Affected Areas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Main Campus", "Science Building", "Library", "Dormitories", "Sports Complex", "Parking Lots"].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={`area-${area}`}
                          checked={alertForm.affectedAreas.includes(area)}
                          onCheckedChange={() => handleAffectedAreaChange(area)}
                        />
                        <Label htmlFor={`area-${area}`}>{area}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={previewAlert}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </Button>
                <Button
                  type="submit"
                  className={`gap-2 ${alertForm.type === "emergency" ? "bg-red-600 hover:bg-red-700" : ""}`}
                >
                  <Send className="h-4 w-4" />
                  <span>Broadcast Alert</span>
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-3 pt-2">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border rounded-lg overflow-hidden ${alert.status === "active" ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20" : ""
                      }`}
                  >
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer"
                      onClick={() => toggleAlertExpand(alert.id)}
                    >
                      <div className="flex items-center gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h3 className="font-medium">{alert.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {alert.timestamp.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getAlertStatusBadge(alert.status)}
                        {expandedAlerts.includes(alert.id) ?
                          <ChevronUp className="h-4 w-4" /> :
                          <ChevronDown className="h-4 w-4" />
                        }
                      </div>
                    </div>

                    {expandedAlerts.includes(alert.id) && (
                      <div className="p-4 border-t border-border">
                        <p className="mb-3">{alert.message}</p>

                        {alert.affectedAreas && alert.affectedAreas.length > 0 && (
                          <div className="flex items-start gap-2 mt-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Affected Areas: </span>
                              <span>{alert.affectedAreas.join(", ")}</span>
                            </div>
                          </div>
                        )}

                        {alert.location && (
                          <div className="flex items-start gap-2 mt-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Location: </span>
                              <span>{alert.location}</span>
                            </div>
                          </div>
                        )}

                        {alert.status === "active" && (
                          <div className="mt-3 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:border-green-300 hover:bg-green-50"
                              onClick={() => {
                                setAlertHistory(prev =>
                                  prev.map(a =>
                                    a.id === alert.id ? { ...a, status: "resolved" } : a
                                  )
                                );
                                toast({
                                  title: "Alert Resolved",
                                  description: "The alert has been marked as resolved.",
                                });
                              }}
                            >
                              Mark as Resolved
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No alerts match your search" : "No alerts in history"}
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
