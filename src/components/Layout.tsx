
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AccessibilityPanel from "./AccessibilityPanel";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 md:ml-64">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
      <AccessibilityPanel />
    </div>
  );
}
