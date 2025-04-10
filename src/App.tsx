
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import VisitorManagement from "./pages/VisitorManagement";
import WorkerAttendance from "./pages/WorkerAttendance";
import BusTracker from "./pages/BusTracker";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./components/PlaceholderPage";
import { 
  Users, Calendar, Bus, Megaphone, Shield, 
  AlertTriangle, FileText, Settings 
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/visitor-management" element={<VisitorManagement />} />
          <Route path="/worker-attendance" element={<WorkerAttendance />} />
          <Route path="/bus-tracker" element={<BusTracker />} />
          <Route 
            path="/communication-hub" 
            element={<PlaceholderPage 
              title="Security Communication Hub" 
              icon={<Megaphone className="h-16 w-16" />} 
              description="Enable multilingual communication between administrators and security personnel across campus."
            />} 
          />
          <Route 
            path="/safety-tips" 
            element={<PlaceholderPage 
              title="Campus Safety Tips" 
              icon={<Shield className="h-16 w-16" />} 
              description="Access resources for personal safety, security awareness, and campus preparedness."
            />} 
          />
          <Route 
            path="/emergency-alerts" 
            element={<PlaceholderPage 
              title="Emergency Alerts & Notifications" 
              icon={<AlertTriangle className="h-16 w-16" />} 
              description="Receive critical campus alerts and emergency notifications in real-time."
            />} 
          />
          <Route 
            path="/incident-reporting" 
            element={<PlaceholderPage 
              title="Incident Reporting System" 
              icon={<FileText className="h-16 w-16" />} 
              description="Report campus incidents securely, with options for anonymous submissions and status tracking."
            />} 
          />
          <Route 
            path="/settings" 
            element={<PlaceholderPage 
              title="Settings / Accessibility Options" 
              icon={<Settings className="h-16 w-16" />} 
              description="Customize your experience with theme preferences, language options, and accessibility features."
            />} 
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
