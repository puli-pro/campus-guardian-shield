
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, Shield, Ambulance, AlertTriangle } from "lucide-react";

const EmergencyContacts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" /> Emergency Contacts
        </CardTitle>
        <CardDescription>
          Quick access to important emergency numbers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-100 dark:border-red-900">
          <div className="flex items-center gap-3 mb-2">
            <PhoneCall className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h3 className="font-bold text-red-700 dark:text-red-400">Emergency (911)</h3>
          </div>
          <p className="text-sm mb-2 text-red-700 dark:text-red-400">
            For life-threatening emergencies requiring immediate attention
          </p>
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
            <Phone className="h-4 w-4 mr-2" /> Call 911
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Campus Security</h3>
                  <p className="text-xs text-muted-foreground">24/7 Campus Police Department</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-3 w-3 mr-1" /> Call
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Ambulance className="h-5 w-5 text-red-600" />
                <div>
                  <h3 className="font-medium">Health Center</h3>
                  <p className="text-xs text-muted-foreground">Campus Medical Services</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-3 w-3 mr-1" /> Call
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <h3 className="font-medium">Crisis Line</h3>
                  <p className="text-xs text-muted-foreground">Mental Health Support</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-3 w-3 mr-1" /> Call
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            For all campus emergencies, please contact Campus Security for the fastest response.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;
