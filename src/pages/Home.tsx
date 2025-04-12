
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Bus, 
  Shield, 
  FileText, 
  Bell, 
  Megaphone, 
  Clock, 
  Home as HomeIcon,
  ArrowRight,
  ChevronRight,
  UserCheck,
  CheckCircle,
  MessageSquare,
  MapPin,
  Search
} from "lucide-react";

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home - Campus Guardian Shield</title>
        <meta 
          name="description" 
          content="Campus Guardian Shield main dashboard - Smart, Secure, and Connected Campus" 
        />
      </Helmet>
      
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome to Campus Guardian Shield</h1>
            <p className="text-muted-foreground mt-1">
              Your centralized platform for campus security and management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-md flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-600 dark:text-blue-400">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Active Alert Banner */}
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 p-4 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="font-medium text-red-700 dark:text-red-400">Active Alert: Fire Drill</h3>
            <p className="text-sm text-red-600 dark:text-red-300">Fire drill scheduled today at 2:00 PM. All students and faculty must evacuate to designated assembly points.</p>
          </div>
          <Button asChild variant="destructive" size="sm" className="flex-shrink-0">
            <Link to="/emergency-alerts">View Details</Link>
          </Button>
        </div>
        
        {/* Main Dashboard Overview Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Campus Overview
            </CardTitle>
            <CardDescription>
              Check key metrics across all campus systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">124</p>
                <p className="text-xs text-muted-foreground">Verified Entries</p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-muted-foreground">Unauthorized Attempts</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Resolved Incidents</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">New Messages</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full justify-between">
                <Link to="/analytics-dashboard">
                  <span className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    View Full Analytics Dashboard
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Access Navigation Grid */}
        <h2 className="text-xl font-semibold mt-8">Campus Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="overflow-hidden border-l-4 border-l-indigo-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">Visitor Management</h3>
                  <p className="text-sm text-muted-foreground">Register and track campus visitors</p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 h-10 w-10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Today's visitors: <span className="font-bold">24</span></p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950 gap-1">
                  <Link to="/visitor-management">
                    <span>Visit</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-l-4 border-l-violet-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">Worker Attendance</h3>
                  <p className="text-sm text-muted-foreground">Track staff attendance and shifts</p>
                </div>
                <div className="bg-violet-100 dark:bg-violet-900 h-10 w-10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-violet-600 dark:text-violet-400">Staff present: <span className="font-bold">42</span></p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950 gap-1">
                  <Link to="/worker-attendance">
                    <span>Visit</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">Bus Tracker</h3>
                  <p className="text-sm text-muted-foreground">Monitor campus transportation</p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900 h-10 w-10 rounded-full flex items-center justify-center">
                  <Bus className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-amber-600 dark:text-amber-400">Active routes: <span className="font-bold">8</span></p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950 gap-1">
                  <Link to="/bus-tracker">
                    <span>Visit</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mt-8">Safety & Communication</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="overflow-hidden border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">Emergency Alerts</h3>
                  <p className="text-sm text-muted-foreground">Critical notifications and alerts</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900 h-10 w-10 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400">Active alerts: <span className="font-bold">1</span></p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 gap-1">
                  <Link to="/emergency-alerts">
                    <span>Visit</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">Communication Hub</h3>
                  <p className="text-sm text-muted-foreground">Announcements and messaging</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 h-10 w-10 rounded-full flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">New messages: <span className="font-bold">3</span></p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950 gap-1">
                  <Link to="/communication-hub">
                    <span>Visit</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">Safety Tips</h3>
                  <p className="text-sm text-muted-foreground">Guidelines and safety resources</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 h-10 w-10 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Safety resources: <span className="font-bold">24</span></p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950 gap-1">
                  <Link to="/safety-tips">
                    <span>Visit</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Latest events across all campus systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Suspicious activity reported near Science Building</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">Incident Report • 35 minutes ago</p>
                        <Badge variant="outline" className="text-xs">Under Review</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <Megaphone className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New announcement: Library hours extended to 10PM</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">Communication Hub • 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <UserCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New visitor approved: Dr. Sarah Johnson (Guest Speaker)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">Visitor Management • 3 hours ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Route change: Bus #4 rerouted due to construction work</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">Bus Tracker • 5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button asChild variant="outline" className="w-full mt-4 justify-between">
                  <Link to="/analytics-dashboard">
                    <span>View All Activity</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HomeIcon className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Frequently used operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                    <Link to="/incident-reporting">
                      <FileText className="h-4 w-4 text-amber-600" />
                      <span>Submit Incident Report</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                    <Link to="/visitor-management">
                      <Users className="h-4 w-4 text-indigo-600" />
                      <span>Register New Visitor</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                    <Link to="/emergency-alerts">
                      <Bell className="h-4 w-4 text-red-600" />
                      <span>Send Emergency Alert</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                    <Link to="/communication-hub">
                      <Megaphone className="h-4 w-4 text-purple-600" />
                      <span>Broadcast Announcement</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                    <Link to="/worker-attendance">
                      <UserCheck className="h-4 w-4 text-violet-600" />
                      <span>Check-in Worker</span>
                    </Link>
                  </Button>
                  
                  <div className="pt-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search across all systems..." className="pl-9" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
