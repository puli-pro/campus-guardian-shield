
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import VoiceMessaging from "@/components/communication/VoiceMessaging";
import CampusAnnouncements from "@/components/communication/CampusAnnouncements";
import CommunicationHeader from "@/components/communication/CommunicationHeader";

const CommunicationHub = () => {
  return (
    <Layout>
      <Helmet>
        <title>Security Communication Hub - Campus Guardian</title>
        <meta 
          name="description" 
          content="Campus-wide communication system for announcements, voice messages, and feedback." 
        />
      </Helmet>
      
      <div className="space-y-8">
        <CommunicationHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VoiceMessaging />
          <CampusAnnouncements />
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationHub;
