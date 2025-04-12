
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Users, 
  Calendar, 
  Bus, 
  Shield, 
  FileText, 
  BarChart,
  ArrowRight,
  Bell,
  Megaphone,
  Settings as SettingsIcon,
  Clock
} from "lucide-react";

const AnalyticsDashboard = () => {
  return (
    <Layout>
      <Helmet>
        <title>Analytics Dashboard - Campus Guardian Shield</title>
        <meta 
          name="description" 
          content="Campus Guardian Shield analytics dashboard - Smart, Secure, and Connected Campus" 
        />
      </Helmet>
      
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Smart, Secure, and Connected Campus Management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-md flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-600 dark:text-blue-400">{new Date().toLocaleString()}</span>
            </div>
            <Bell className="h-6 w-6 text-orange-500 cursor-pointer hover:text-orange-600 transition-colors" />
          </div>
        </div>
        
        {/* Emergency Alert Banner */}
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
        
        {/* Quick Insights Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-green-50 dark:bg-green-950">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-xs text-green-600 dark:text-green-400">Verified Entries Today</span>
                <span className="text-2xl font-bold">124</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 dark:bg-red-950">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-xs text-red-600 dark:text-red-400">Unauthorized Attempts</span>
                <span className="text-2xl font-bold">7</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 dark:bg-amber-950">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-xs text-amber-600 dark:text-amber-400">Resolved Incidents</span>
                <span className="text-2xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 dark:bg-blue-950">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-xs text-blue-600 dark:text-blue-400">Active Bus Routes</span>
                <span className="text-2xl font-bold">8</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Security Statistics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-500" />
                Security Overview
              </CardTitle>
              <CardDescription>
                Campus security at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 dark:text-blue-400">Active Incidents</p>
                    <h3 className="text-xl font-bold">3</h3>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <p className="text-xs text-green-600 dark:text-green-400">Resolved Today</p>
                    <h3 className="text-xl font-bold">12</h3>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin-dashboard" className="flex items-center justify-between">
                    <span>View Security Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Visitor Management */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" />
                Visitor Management
              </CardTitle>
              <CardDescription>
                Recent campus visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-950 p-3 rounded-lg">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">Today's Visitors</p>
                    <h3 className="text-xl font-bold">24</h3>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                    <p className="text-xs text-orange-600 dark:text-orange-400">Pending Approvals</p>
                    <h3 className="text-xl font-bold">5</h3>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/visitor-management" className="flex items-center justify-between">
                    <span>Manage Visitors</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Worker Attendance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-violet-500" />
                Worker Attendance
              </CardTitle>
              <CardDescription>
                Staff presence today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-violet-50 dark:bg-violet-950 p-3 rounded-lg">
                    <p className="text-xs text-violet-600 dark:text-violet-400">Present Today</p>
                    <h3 className="text-xl font-bold">42</h3>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                    <p className="text-xs text-red-600 dark:text-red-400">Absent</p>
                    <h3 className="text-xl font-bold">7</h3>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/worker-attendance" className="flex items-center justify-between">
                    <span>View Attendance Records</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Bus Tracker */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bus className="h-5 w-5 text-amber-500" />
                Transport Status
              </CardTitle>
              <CardDescription>
                Campus transportation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-lg">
                    <p className="text-xs text-amber-600 dark:text-amber-400">Active Buses</p>
                    <h3 className="text-xl font-bold">8</h3>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-950 p-3 rounded-lg">
                    <p className="text-xs text-teal-600 dark:text-teal-400">Next Departure</p>
                    <h3 className="text-sm font-bold">5 min</h3>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/bus-tracker" className="flex items-center justify-between">
                    <span>View Bus Tracker</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Communications Hub */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-purple-500" />
                Communication Hub
              </CardTitle>
              <CardDescription>
                Latest announcements and messaging
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                  <p className="text-xs text-purple-600 dark:text-purple-400">Latest Announcement</p>
                  <p className="text-sm mt-1">Library hours extended to 10PM for final exam week</p>
                  <Badge className="mt-2 bg-purple-200 text-purple-800">2 hours ago</Badge>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/communication-hub" className="flex items-center justify-between">
                    <span>View Communication Hub</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Safety Tips */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Safety Resources
              </CardTitle>
              <CardDescription>
                Campus safety information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <p className="text-xs text-green-600 dark:text-green-400">Safety Tip of the Day</p>
                  <p className="text-sm mt-1">Always be aware of your surroundings and report suspicious activities immediately.</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/safety-tips" className="flex items-center justify-between">
                    <span>Explore Safety Tips</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest reports and incident updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Suspicious activity reported near Science Building</p>
                  <p className="text-xs text-muted-foreground mt-1">Submitted 35 minutes ago • <span className="text-amber-500">Under Review</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <Shield className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Lost ID card reported - ID #STU20241234</p>
                  <p className="text-xs text-muted-foreground mt-1">Submitted 1 hour ago • <span className="text-green-500">Resolved</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                  <Megaphone className="h-4 w-4 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Voice message broadcast: Faculty meeting reminder</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago • Sent to 45 recipients</p>
                </div>
              </div>
            </div>
            
            <Button asChild variant="outline" className="w-full mt-4">
              <Link to="/incident-reporting" className="flex items-center justify-between">
                <span>View All Reports</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Quick Access Navigation Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2">
            <Link to="/emergency-alerts" className="text-red-600 hover:text-red-700">
              <AlertTriangle className="h-6 w-6 mb-1" />
              <span>Emergency Alerts</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2">
            <Link to="/communication-hub" className="text-blue-600 hover:text-blue-700">
              <Megaphone className="h-6 w-6 mb-1" />
              <span>Communication Hub</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2">
            <Link to="/incident-reporting" className="text-amber-600 hover:text-amber-700">
              <FileText className="h-6 w-6 mb-1" />
              <span>Report Incident</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2">
            <Link to="/settings" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <SettingsIcon className="h-6 w-6 mb-1" />
              <span>Settings</span>
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
