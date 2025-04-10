
import React from "react";
import Layout from "@/components/Layout";
import BusTrackerHeader from "@/components/bus/BusTrackerHeader";
import BusEntryLogging from "@/components/bus/BusEntryLogging";
import BusDetailsDashboard from "@/components/bus/BusDetailsDashboard";
import UpcomingDepartures from "@/components/bus/UpcomingDepartures";
import ExportTools from "@/components/bus/ExportTools";
import { Helmet } from "react-helmet";

const BusTracker = () => {
  return (
    <Layout>
      <Helmet>
        <title>Bus Entry/Exit Tracker - Campus Guardian</title>
        <meta 
          name="description" 
          content="Track campus transportation in real-time with GPS and automated license plate recognition." 
        />
      </Helmet>
      
      <div className="space-y-8">
        <BusTrackerHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BusEntryLogging />
            <BusDetailsDashboard />
          </div>
          <div className="space-y-6">
            <UpcomingDepartures />
            <ExportTools />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusTracker;
