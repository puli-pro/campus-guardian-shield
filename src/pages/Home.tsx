
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, UserCheck, Bell, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
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
    <Layout>
      <Helmet>
        <title>Campus Guardian Shield - Smart, Secure, and Connected Campus</title>
        <meta 
          name="description" 
          content="Campus Guardian Shield provides advanced security and management solutions for college campuses using AI, IoT, and biometrics." 
        />
      </Helmet>
      
      <div className="space-y-16">
        {/* Hero Section */}
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
                  asChild
                >
                  <Link to="/incident-reporting">
                    <AlertCircle className="h-5 w-5 mr-2" /> Report Incident
                  </Link>
                </Button>
                <Button 
                  onClick={handleCheckInVisitor}
                  className="cta-primary flex-1"
                  size="lg"
                  asChild
                >
                  <Link to="/visitor-management">
                    <UserCheck className="h-5 w-5 mr-2" /> Check-in Visitor
                  </Link>
                </Button>
                <Button 
                  onClick={handleEmergencyAlert}
                  className="cta-accent flex-1"
                  size="lg"
                  asChild
                >
                  <Link to="/emergency-alerts">
                    <Bell className="h-5 w-5 mr-2" /> Emergency Alert
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-8 gap-2 text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse-slow"></span>
                <span>Campus security systems active and monitoring</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">About Campus Guardian</h2>
                <p className="text-muted-foreground">
                  Campus Guardian Shield is a comprehensive security and management platform designed specifically for educational institutions. Our solution integrates cutting-edge technology with user-friendly interfaces to create a safer, more efficient campus environment.
                </p>
                <p className="text-muted-foreground">
                  From visitor management and worker attendance tracking to emergency alerts and incident reporting, our platform provides the tools needed to protect your campus community while streamlining administrative processes.
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/analytics-dashboard">
                    Explore Dashboard <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
                <p className="text-muted-foreground text-center p-8">Campus Security Video Overview</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">What Our Campus Community Says</h2>
              <p className="text-muted-foreground mt-2">Feedback from students, faculty, and security personnel</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="italic">"The Campus Guardian Shield has completely transformed how we approach security. The visitor management system has made check-ins seamless and secure."</p>
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Campus Security Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="italic">"I feel much safer knowing that the campus has implemented this system. The emergency alerts have been particularly helpful during weather emergencies."</p>
                    <div>
                      <p className="font-medium">Michael Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Student, Computer Science</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="italic">"The incident reporting system makes it easy to report concerns and track their resolution. It's greatly improved communication between students and administration."</p>
                    <div>
                      <p className="font-medium">Professor Emma Chen</p>
                      <p className="text-sm text-muted-foreground">Faculty, Engineering Department</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Quick Links */}
        <section className="py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Quick Links</h2>
              <p className="text-muted-foreground mt-2">Access our most popular features</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/visitor-management">
                  <UserCheck className="h-6 w-6" />
                  <span>Visitor Management</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/emergency-alerts">
                  <Bell className="h-6 w-6" />
                  <span>Emergency Alerts</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/incident-reporting">
                  <AlertCircle className="h-6 w-6" />
                  <span>Incident Reporting</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                <Link to="/analytics-dashboard">
                  <ExternalLink className="h-6 w-6" />
                  <span>Analytics Dashboard</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* About College & Contact Information */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* About College */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">About Our College</h2>
                <p className="text-muted-foreground">
                  Founded in 1965, our institution has been at the forefront of education and innovation for over five decades. With a commitment to excellence, we provide a safe and enriching environment for our diverse student body and faculty.
                </p>
                <p className="text-muted-foreground">
                  Campus Guardian Shield is just one example of our dedication to using technology to enhance the campus experience and ensure the wellbeing of our community.
                </p>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <p>Emergency: (555) 123-4567</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p>Main Office: (555) 987-6543</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <p>info@campusguardian.edu</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <p>123 University Avenue, College Town, CT 12345</p>
                  </div>
                </div>
                <Button className="mt-4">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
