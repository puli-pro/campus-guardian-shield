
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
import CommunicationHub from "./pages/CommunicationHub";
import SafetyTips from "./pages/SafetyTips";
import EmergencyAlerts from "./pages/EmergencyAlerts";
import IncidentReporting from "./pages/IncidentReporting";
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
          <Route path="/communication-hub" element={<CommunicationHub />} />
          <Route path="/safety-tips" element={<SafetyTips />} />
          <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
          <Route path="/incident-reporting" element={<IncidentReporting />} />
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
