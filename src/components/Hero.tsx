
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, UserCheck, Bell } from "lucide-react";

export default function Hero() {
  const { toast } = useToast();
  
  const handleReportIncident = () => {
    toast({
      title: "Report Incident",
      description: "Redirecting to incident reporting page...",
    });
  };
  
  const handleCheckInVisitor = () => {
    toast({
      title: "Check-in Visitor",
      description: "Redirecting to visitor check-in page...",
    });
  };
  
  const handleEmergencyAlert = () => {
    toast({
      title: "Emergency Alert",
      description: "Please confirm emergency alert activation",
      variant: "destructive",
    });
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-labelledby="hero-title">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
      
      {/* Hero Content */}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <h1 
              id="hero-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
            >
              Smart, Secure, and Connected Campus
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Powered by AI, IoT, and Biometrics for a Safer College Life
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <Button 
              onClick={handleReportIncident}
              className="cta-secondary flex-1"
              size="lg"
            >
              <AlertCircle className="h-5 w-5" /> Report Incident
            </Button>
            <Button 
              onClick={handleCheckInVisitor}
              className="cta-primary flex-1"
              size="lg"
            >
              <UserCheck className="h-5 w-5" /> Check-in Visitor
            </Button>
            <Button 
              onClick={handleEmergencyAlert}
              className="cta-accent flex-1"
              size="lg"
            >
              <Bell className="h-5 w-5" /> Emergency Alert
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-8 gap-2 text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse-slow"></span>
            <span>Campus security systems active and monitoring</span>
          </div>
        </div>
      </div>
    </section>
  );
}
