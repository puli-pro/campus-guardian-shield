
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to the Home dashboard after landing page loads
    const timer = setTimeout(() => {
      navigate('/home');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <>
      <Helmet>
        <title>Campus Guardian Shield - Smart, Secure, and Connected Campus</title>
        <meta name="description" content="Campus Guardian Shield provides advanced security and management solutions for college campuses using AI, IoT, and biometrics." />
      </Helmet>
      
      <Layout>
        <main className="flex-grow">
          <Hero />
          <Features />
          <Testimonials />
          <Footer />
        </main>
      </Layout>
    </>
  );
};

export default Index;
