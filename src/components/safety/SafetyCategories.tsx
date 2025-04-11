import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Smartphone, Users, AlertTriangle, Play, Volume2, FileText, ArrowUpRight, School, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SafetyTip {
  id: string;
  title: string;
  description: string;
  type: "text" | "video" | "audio" | "pdf";
  source?: string;
  content?: string;
}

const SafetyCategories = () => {
  const [activeCategory, setActiveCategory] = useState("campus");
  
  const campusTips: SafetyTip[] = [
    {
      id: "c1",
      title: "Walking Safely at Night",
      description: "Guidelines for staying safe while walking around campus after dark.",
      type: "text",
      content: "• Always walk in well-lit areas\n• Use the buddy system when possible\n• Stay aware of your surroundings\n• Keep your phone charged but avoid staring at it while walking\n• Use campus safety escort services when available\n• Let someone know your route and expected arrival time"
    },
    {
      id: "c2",
      title: "Emergency Evacuation Routes",
      description: "Learn the quickest and safest evacuation routes from all campus buildings.",
      type: "pdf",
      source: "/campus-evacuation-map.pdf"
    },
    {
      id: "c3",
      title: "Using Emergency Call Boxes",
      description: "Video demonstration on how to use the emergency call boxes located around campus.",
      type: "video",
      source: "https://example.com/emergency-call-box-demo.mp4"
    }
  ];
  
  const digitalTips: SafetyTip[] = [
    {
      id: "d1",
      title: "Creating Strong Passwords",
      description: "Guidelines for creating secure passwords for all your accounts.",
      type: "text",
      content: "• Use a minimum of 12 characters\n• Include uppercase and lowercase letters\n• Add numbers and special characters\n• Don't use personal information\n• Use different passwords for different accounts\n• Consider using a password manager"
    },
    {
      id: "d2",
      title: "Recognizing Phishing Attempts",
      description: "Learn how to identify and avoid phishing emails and messages.",
      type: "audio",
      source: "https://example.com/phishing-awareness.mp3"
    },
    {
      id: "d3",
      title: "Secure Wi-Fi Usage",
      description: "Best practices for using public Wi-Fi networks on campus.",
      type: "text",
      content: "• Verify network names before connecting\n• Use the official campus Wi-Fi when possible\n• Enable VPN for additional security\n• Avoid accessing sensitive information on public networks\n• Ensure websites use HTTPS encryption\n• Log out of accounts when finished"
    }
  ];
  
  const visitorTips: SafetyTip[] = [
    {
      id: "v1",
      title: "Visitor Check-In Procedures",
      description: "Information on the visitor management system and check-in requirements.",
      type: "text",
      content: "• All visitors must report to designated check-in points\n• Valid photo ID is required for all visitors\n• Visitors must wear visible badges at all times\n• Students and staff are responsible for their guests\n• Unauthorized visitors should be reported to security"
    },
    {
      id: "v2",
      title: "Reporting Suspicious Visitors",
      description: "How to identify and report suspicious individuals on campus.",
      type: "video",
      source: "https://example.com/suspicious-visitor-reporting.mp4"
    }
  ];
  
  const emergencyTips: SafetyTip[] = [
    {
      id: "e1",
      title: "Active Threat Response",
      description: "Critical information on how to respond during an active threat situation.",
      type: "text",
      content: "• RUN: Evacuate if possible\n• HIDE: If evacuation isn't possible, find a secure hiding place\n• FIGHT: As a last resort, be prepared to defend yourself\n• When safe, call campus security or 911\n• Follow all instructions from security personnel\n• Help others if safe to do so"
    },
    {
      id: "e2",
      title: "Medical Emergency Response",
      description: "Basic first aid and how to get medical help on campus.",
      type: "audio",
      source: "https://example.com/medical-emergency.mp3"
    },
    {
      id: "e3",
      title: "Severe Weather Procedures",
      description: "What to do during severe weather events affecting campus.",
      type: "pdf",
      source: "/weather-emergency-procedures.pdf"
    }
  ];
  
  const collegeRules: SafetyTip[] = [
    {
      id: "r1",
      title: "Campus Curfew Hours",
      description: "Information about campus and dormitory curfew rules.",
      type: "text",
      content: "• Main campus gates close at 10:00 PM\n• Dormitory access restricted after 11:00 PM\n• Late entry requires security authorization\n• Weekend curfew extensions available with prior approval\n• Emergency exits remain accessible 24/7\n• Violation of curfew may result in disciplinary action"
    },
    {
      id: "r2",
      title: "Laboratory Safety Protocol",
      description: "Required safety procedures for all science and engineering labs.",
      type: "pdf",
      source: "/lab-safety-protocol.pdf"
    },
    {
      id: "r3",
      title: "Event Registration Guidelines",
      description: "Rules for organizing and conducting events on campus.",
      type: "text",
      content: "• All events require minimum 7-day advance registration\n• Events expecting 50+ attendees need security clearance\n• Outdoor events must end by 9:00 PM on weekdays\n• External speakers must be approved by administration\n• Fire safety protocols must be reviewed before decorating\n• Cleanup is the responsibility of the organizing group"
    }
  ];
  
  const dailyTip = {
    title: "Today's Safety Tip",
    content: "Always lock your dormitory room, even when stepping out for just a few minutes. Most thefts occur during brief absences."
  };
  
  const safetyFact = {
    title: "Did You Know?",
    content: "Campus security can provide safety escorts 24/7 for students walking to parking lots or dormitories after dark. Call ext. 5555 to request this free service."
  };
  
  const renderTipContent = (tip: SafetyTip) => {
    switch (tip.type) {
      case "text":
        return (
          <div className="whitespace-pre-line text-sm">
            {tip.content}
          </div>
        );
      case "video":
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <Play className="h-12 w-12 text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Play className="h-4 w-4 mr-2" /> Play Video
            </Button>
          </div>
        );
      case "audio":
        return (
          <div className="flex flex-col gap-2">
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center px-4 gap-4">
              <Button variant="ghost" size="icon">
                <Play className="h-6 w-6" />
              </Button>
              <div className="h-2 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <Volume2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">Audio: {tip.description}</span>
          </div>
        );
      case "pdf":
        return (
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-red-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">{tip.title}</p>
              <p className="text-xs text-muted-foreground">{tip.description}</p>
            </div>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="h-4 w-4 mr-2" /> Open
            </Button>
          </div>
        );
      default:
        return null;
    }
  };
  
  const getTipsByCategory = () => {
    switch (activeCategory) {
      case "campus":
        return campusTips;
      case "digital":
        return digitalTips;
      case "visitor":
        return visitorTips;
      case "emergency":
        return emergencyTips;
      case "college":
        return collegeRules;
      default:
        return campusTips;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Safety Resources</CardTitle>
        <CardDescription>
          Important tips and guidelines for different safety scenarios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <AlertTitle className="flex items-center text-blue-700 dark:text-blue-400">
              <Info className="h-4 w-4 mr-2" /> {dailyTip.title}
            </AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              {dailyTip.content}
            </AlertDescription>
          </Alert>
          
          <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <AlertTitle className="flex items-center text-amber-700 dark:text-amber-400">
              <Info className="h-4 w-4 mr-2" /> {safetyFact.title}
            </AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              {safetyFact.content}
            </AlertDescription>
          </Alert>
        </div>
        
        <Tabs defaultValue="campus" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="campus">
              <Shield className="h-4 w-4 mr-2" /> Campus
            </TabsTrigger>
            <TabsTrigger value="digital">
              <Smartphone className="h-4 w-4 mr-2" /> Digital
            </TabsTrigger>
            <TabsTrigger value="visitor">
              <Users className="h-4 w-4 mr-2" /> Visitors
            </TabsTrigger>
            <TabsTrigger value="emergency">
              <AlertTriangle className="h-4 w-4 mr-2" /> Emergency
            </TabsTrigger>
            <TabsTrigger value="college">
              <School className="h-4 w-4 mr-2" /> College Rules
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="campus">
            <Alert className="mb-4">
              <AlertTitle className="flex items-center">
                <Shield className="h-4 w-4 mr-2" /> Campus Safety Tips
              </AlertTitle>
              <AlertDescription>
                Essential guidelines for staying safe while navigating campus buildings and grounds.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="digital">
            <Alert className="mb-4">
              <AlertTitle className="flex items-center">
                <Smartphone className="h-4 w-4 mr-2" /> Digital Security Tips
              </AlertTitle>
              <AlertDescription>
                Best practices for protecting your digital identity and data while on campus.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="visitor">
            <Alert className="mb-4">
              <AlertTitle className="flex items-center">
                <Users className="h-4 w-4 mr-2" /> Visitor Awareness
              </AlertTitle>
              <AlertDescription>
                Guidelines for managing and identifying visitors on campus safely.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="emergency">
            <Alert className="mb-4" variant="destructive">
              <AlertTitle className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" /> Emergency Actions
              </AlertTitle>
              <AlertDescription>
                Critical information for responding to various emergency situations on campus.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="college">
            <Alert className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-900">
              <AlertTitle className="flex items-center text-purple-700 dark:text-purple-400">
                <School className="h-4 w-4 mr-2" /> College-Specific Rules
              </AlertTitle>
              <AlertDescription className="text-purple-700 dark:text-purple-400">
                Important rules and guidelines specific to our college campus.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <Accordion type="single" collapsible className="w-full">
            {getTipsByCategory().map((tip) => (
              <AccordionItem key={tip.id} value={tip.id}>
                <AccordionTrigger>
                  <div className="text-left">
                    <div className="font-medium">{tip.title}</div>
                    <div className="text-xs text-muted-foreground">{tip.description}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  {renderTipContent(tip)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SafetyCategories;
