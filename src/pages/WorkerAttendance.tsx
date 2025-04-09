
import { Helmet } from "react-helmet";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, ClipboardList, Fingerprint, Users } from "lucide-react";
import BiometricCheckIn from "@/components/worker/BiometricCheckIn";
import AttendanceCalendar from "@/components/worker/AttendanceCalendar";
import AttendanceReports from "@/components/worker/AttendanceReports";

export default function WorkerAttendance() {
  return (
    <>
      <Helmet>
        <title>Worker Attendance - Campus Guardian Shield</title>
        <meta name="description" content="Track and manage worker attendance with biometric verification and comprehensive attendance reports." />
      </Helmet>
      
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Worker Attendance System</h1>
            <p className="text-muted-foreground">
              Monitor and track workforce attendance using biometric verification and get detailed reports.
            </p>
          </div>

          <Tabs defaultValue="check-in" className="space-y-4">
            <TabsList>
              <TabsTrigger value="check-in" className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4" />
                <span>Biometric Check-In</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Attendance Calendar</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="check-in" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Biometric Check-In System</CardTitle>
                  <CardDescription>
                    Fingerprint-based worker verification and time tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BiometricCheckIn />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Calendar</CardTitle>
                  <CardDescription>
                    Monthly overview of worker attendance patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceCalendar />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Reports</CardTitle>
                  <CardDescription>
                    Generate and export detailed attendance reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceReports />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
}
