
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import IncidentReportingHeader from "@/components/incident/IncidentReportingHeader";
import SubmitReportForm from "@/components/incident/SubmitReportForm";
import ReportTracker from "@/components/incident/ReportTracker";

const IncidentReporting = () => {
  return (
    <Layout>
      <Helmet>
        <title>Incident Reporting System - Campus Guardian</title>
        <meta 
          name="description" 
          content="Report campus incidents securely, with options for anonymous submissions and status tracking." 
        />
      </Helmet>
      
      <div className="space-y-8">
        <IncidentReportingHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SubmitReportForm />
          <ReportTracker />
        </div>
      </div>
    </Layout>
  );
};

export default IncidentReporting;
