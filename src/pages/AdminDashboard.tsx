
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import { BarChart } from "lucide-react";

export default function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Campus Guardian Shield</title>
      </Helmet>
      
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <BarChart className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground max-w-lg">
            The comprehensive admin dashboard for managing all aspects of campus security will be available soon. 
            Check back for real-time monitoring, incident management, and security analytics.
          </p>
        </div>
      </Layout>
    </>
  );
}
