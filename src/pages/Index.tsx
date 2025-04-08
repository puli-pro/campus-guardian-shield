
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Campus Guardian Shield - Smart, Secure, and Connected Campus</title>
        <meta name="description" content="Campus Guardian Shield provides advanced security and management solutions for college campuses using AI, IoT, and biometrics." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Features />
          <Testimonials />
        </main>
        <Footer />
        <AccessibilityPanel />
      </div>
    </>
  );
};

export default Index;
