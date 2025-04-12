import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import { 
  User, 
  Shield, 
  Lock, 
  Database, 
  FileText, 
  HelpCircle, 
  Moon, 
  Sun,
  Bell,
  LogOut,
  Upload,
  Download,
  Trash2,
  Key,
  Mail,
  Phone,
  Image,
  Globe,
  Settings as SettingsIcon,
  Bus as BusIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [language, setLanguage] = useState("english");
  const [twoFactor, setTwoFactor] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  const handleResetSettings = () => {
    setTheme("system");
    setNotifications(true);
    setSoundAlerts(true);
    setLanguage("english");
    setTwoFactor(true);
    
    toast({
      title: "Settings Reset",
      description: "Your preferences have been reset to default values.",
    });
  };

  const handleExportData = (dataType) => {
    toast({
      title: `${dataType} Data Exported`,
      description: `Your ${dataType.toLowerCase()} data has been exported successfully.`,
    });
  };

  const handleBugReport = () => {
    toast({
      title: "Bug Report Submitted",
      description: "Thank you for your feedback. Our team will review it shortly.",
    });
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Settings - Campus Guardian</title>
        <meta 
          name="description" 
          content="Configure your Campus Guardian settings and preferences." 
        />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <SettingsIcon className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your preferences and account settings
              </p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-1 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security & Access</TabsTrigger>
            <TabsTrigger value="system">System Config</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
            <TabsTrigger value="support">Feedback & Support</TabsTrigger>
          </TabsList>
          
          {/* Profile Settings Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Profile Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mb-4">
                      <Camera className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <Button size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </Button>
                  </div>
                  
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="John Doe" defaultValue="John Doe" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="security">
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="security">Security Officer</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 234 567 8900" defaultValue="+1 234 567 8900" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language Preference</Label>
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-blue-500" />
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme Preference</Label>
                  <div className="flex items-center gap-2">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-indigo-500" />
                    ) : (
                      <Sun className="h-5 w-5 text-amber-500" />
                    )}
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light Mode</SelectItem>
                        <SelectItem value="dark">Dark Mode</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleSaveSettings} className="gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Profile</span>
                </Button>
                <Button variant="outline" onClick={handleResetSettings} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security & Access Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <span>Security & Access Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security and access permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  <Button size="sm" className="gap-2">
                    <Key className="h-4 w-4" />
                    <span>Update Password</span>
                  </Button>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="two-factor" checked={twoFactor} onCheckedChange={setTwoFactor} />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts via email
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts via SMS
                        </p>
                      </div>
                      <Switch id="sms-notifications" defaultChecked={false} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts on device
                        </p>
                      </div>
                      <Switch id="push-notifications" checked={notifications} onCheckedChange={setNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="voice-notifications">Voice Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive voice alerts for critical events
                        </p>
                      </div>
                      <Switch id="voice-notifications" defaultChecked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleSaveSettings} className="gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Security Settings</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* System Configuration Tab */}
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  <span>System Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure system-wide settings and integrations (Admin Only)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">User Roles & Permissions</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      This feature allows administrators to manage user roles and permissions. Access the user management dashboard to make changes.
                    </p>
                    <Button className="mt-4 gap-2">
                      <UserCog className="h-4 w-4" />
                      <span>User Management Dashboard</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Biometric Database</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Upload and manage student & faculty photo database for facial recognition and biometric verification.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload Photo Database</span>
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Biometric Device Setup</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">External System Connections</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">CCTV System</p>
                          <p className="text-sm text-muted-foreground">Link campus security cameras</p>
                        </div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center gap-3">
                        <BusIcon className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Bus Tracking</p>
                          <p className="text-sm text-muted-foreground">Connect GPS tracking for campus buses</p>
                        </div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Emergency Systems</p>
                          <p className="text-sm text-muted-foreground">Connect fire alarms and emergency systems</p>
                        </div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleSaveSettings} className="gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save System Configuration</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Data Management Tab */}
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <span>Data Management</span>
                </CardTitle>
                <CardDescription>
                  Export, backup, and manage your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Export</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <UsersIcon className="h-8 w-8 text-blue-500 mb-2" />
                        <h4 className="font-medium">Visitor Logs</h4>
                        <p className="text-sm text-muted-foreground my-2">Export campus visitor data</p>
                        <Button onClick={() => handleExportData('Visitor')} size="sm" className="mt-2 w-full gap-2">
                          <Download className="h-4 w-4" />
                          <span>Export</span>
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <CalendarIcon className="h-8 w-8 text-green-500 mb-2" />
                        <h4 className="font-medium">Attendance Records</h4>
                        <p className="text-sm text-muted-foreground my-2">Export worker attendance data</p>
                        <Button onClick={() => handleExportData('Attendance')} size="sm" className="mt-2 w-full gap-2">
                          <Download className="h-4 w-4" />
                          <span>Export</span>
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <FileText className="h-8 w-8 text-red-500 mb-2" />
                        <h4 className="font-medium">Incident Reports</h4>
                        <p className="text-sm text-muted-foreground my-2">Export security incident data</p>
                        <Button onClick={() => handleExportData('Incident')} size="sm" className="mt-2 w-full gap-2">
                          <Download className="h-4 w-4" />
                          <span>Export</span>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Backup & Storage</h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
                    <div className="flex items-center gap-3">
                      <HardDrive className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="font-medium">System Backup</p>
                        <p className="text-sm text-muted-foreground">Last backup: Today, 4:30 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="gap-2">
                        <HardDrive className="h-4 w-4" />
                        <span>Backup Now</span>
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        <span>Restore Backup</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Data Cleanup</h3>
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-md border border-red-200 dark:border-red-900">
                    <div className="flex items-center gap-3">
                      <Trash2 className="h-6 w-6 text-red-500" />
                      <div>
                        <p className="font-medium">Clear Temporary Data</p>
                        <p className="text-sm text-muted-foreground">Remove cached files and temporary data to free up space</p>
                      </div>
                    </div>
                    <Button variant="destructive" className="gap-2 mt-4">
                      <Trash2 className="h-4 w-4" />
                      <span>Clear Cache</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Feedback & Support Tab */}
          <TabsContent value="support" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Feedback & Support</span>
                </CardTitle>
                <CardDescription>
                  Get help, report issues, and suggest improvements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Bug Reports</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bug-title">Issue Title</Label>
                      <Input id="bug-title" placeholder="Describe the issue briefly" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bug-description">Detailed Description</Label>
                      <Textarea 
                        id="bug-description" 
                        placeholder="Please provide details about what happened, what you expected to happen, and steps to reproduce the issue"
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bug-severity">Severity</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="bug-severity">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical - System unusable</SelectItem>
                          <SelectItem value="high">High - Major feature broken</SelectItem>
                          <SelectItem value="medium">Medium - Feature partially working</SelectItem>
                          <SelectItem value="low">Low - Minor issue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleBugReport} className="gap-2">
                      <Bug className="h-4 w-4" />
                      <span>Submit Bug Report</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Feature Requests</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="feature-title">Feature Title</Label>
                      <Input id="feature-title" placeholder="Name your feature idea" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feature-description">Description</Label>
                      <Textarea 
                        id="feature-description" 
                        placeholder="Describe your feature idea in detail, including how it would benefit users"
                        rows={4}
                      />
                    </div>
                    
                    <Button className="gap-2">
                      <Lightbulb className="h-4 w-4" />
                      <span>Submit Feature Request</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Contact Support</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Need immediate assistance? Our support team is available 24/7 to help with any issues or questions.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Live Chat</span>
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Support</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
