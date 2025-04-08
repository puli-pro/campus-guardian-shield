
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
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
