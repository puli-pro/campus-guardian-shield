
import { Helmet } from "react-helmet";
import Layout from "./Layout";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <>
      <Helmet>
        <title>{title} - Campus Guardian Shield</title>
      </Helmet>
      
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {icon && <div className="mb-4 text-primary">{icon}</div>}
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-muted-foreground max-w-lg">
            {description || "This page is under construction and will be available soon. Stay tuned for updates!"}
          </p>
        </div>
      </Layout>
    </>
  );
}
