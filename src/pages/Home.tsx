
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Users, 
  Calendar, 
  Bus, 
  Shield, 
  FileText, 
  BarChart,
  ArrowRight
} from "lucide-react";

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>Dashboard - Campus Guardian Shield</title>
        <meta 
          name="description" 
          content="Campus Guardian Shield main dashboard - Smart, Secure, and Connected Campus" 
        />
      </Helmet>
      
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome to Campus Guardian</h1>
            <p className="text-muted-foreground mt-1">
              Smart, Secure, and Connected Campus Management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
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
          
          {/* Incident Reporting */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-rose-500" />
                Incident Reporting
              </CardTitle>
              <CardDescription>
                Report and track incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rose-50 dark:bg-rose-950 p-3 rounded-lg">
                    <p className="text-xs text-rose-600 dark:text-rose-400">New Reports</p>
                    <h3 className="text-xl font-bold">6</h3>
                  </div>
                  <div className="bg-sky-50 dark:bg-sky-950 p-3 rounded-lg">
                    <p className="text-xs text-sky-600 dark:text-sky-400">In Progress</p>
                    <h3 className="text-xl font-bold">9</h3>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/incident-reporting" className="flex items-center justify-between">
                    <span>Submit or Track Reports</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Access Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild variant="outline" className="h-auto py-4">
            <Link to="/emergency-alerts" className="flex flex-col items-center text-red-600 hover:text-red-700">
              <AlertTriangle className="h-6 w-6 mb-1" />
              <span>Emergency Alerts</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4">
            <Link to="/communication-hub" className="flex flex-col items-center text-blue-600 hover:text-blue-700">
              <Shield className="h-6 w-6 mb-1" />
              <span>Communication Hub</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4">
            <Link to="/settings" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <FileText className="h-6 w-6 mb-1" />
              <span>Settings</span>
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
