
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import EmergencyAlertsHeader from "@/components/emergency/EmergencyAlertsHeader";
import AlertBroadcast from "@/components/emergency/AlertBroadcast";
import QuickActionPanel from "@/components/emergency/QuickActionPanel";

const EmergencyAlerts = () => {
  return (
    <Layout>
      <Helmet>
        <title>Emergency Alerts & Notifications - Campus Guardian</title>
        <meta 
          name="description" 
          content="Receive critical campus alerts and emergency notifications in real-time." 
        />
      </Helmet>
      
      <div className="space-y-8">
        <EmergencyAlertsHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AlertBroadcast />
          </div>
          <div>
            <QuickActionPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyAlerts;
