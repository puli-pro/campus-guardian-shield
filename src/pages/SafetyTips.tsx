
import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import SafetyHeader from "@/components/safety/SafetyHeader";
import SafetyCategories from "@/components/safety/SafetyCategories";
import EmergencyContacts from "@/components/safety/EmergencyContacts";
import SafetyQuiz from "@/components/safety/SafetyQuiz";
import SubmitTipForm from "@/components/safety/SubmitTipForm";

const SafetyTips = () => {
  return (
    <Layout>
      <Helmet>
        <title>Campus Safety Tips - Campus Guardian</title>
        <meta 
          name="description" 
          content="Essential safety guidelines, emergency contacts, and resources for campus security." 
        />
      </Helmet>
      
      <div className="space-y-8">
        <SafetyHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SafetyCategories />
            <SafetyQuiz />
          </div>
          <div className="space-y-6">
            <EmergencyContacts />
            <SubmitTipForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyTips;
