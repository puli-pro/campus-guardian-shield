
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  BarChart,
  Users,
  Calendar,
  Bus,
  Megaphone,
  Shield,
  AlertTriangle,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type SidebarLink = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
};

const sidebarLinks: SidebarLink[] = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BarChart, label: "Analytics Dashboard", path: "/analytics-dashboard" },
  { icon: Users, label: "Visitor Management", path: "/visitor-management" },
  { icon: Calendar, label: "Worker Attendance", path: "/worker-attendance" },
  { icon: Bus, label: "Bus Tracker", path: "/bus-tracker" },
  { icon: Megaphone, label: "Communication Hub", path: "/communication-hub" },
  { icon: Shield, label: "Safety Tips", path: "/safety-tips" },
  { icon: AlertTriangle, label: "Emergency Alerts", path: "/emergency-alerts" },
  { icon: FileText, label: "Incident Reporting", path: "/incident-reporting" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Close mobile sidebar when navigating to a new page
  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
        aria-label="Toggle Menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Backdrop for Mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar border-r border-border transition-all duration-300 z-40",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={cn(
            "flex items-center h-16 px-4 border-b border-border",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Campus Guardian</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden md:flex"
              aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* User Profile Card */}
          {!collapsed && (
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>CG</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Admin User</span>
                  <span className="text-xs text-muted-foreground">admin@campusguardian.edu</span>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {sidebarLinks.map((link) => {
                const isActive = location.pathname === link.path;
                
                return (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground",
                        collapsed && "justify-center px-0"
                      )}
                    >
                      <link.icon className={cn("h-5 w-5 shrink-0")} />
                      {!collapsed && <span>{link.label}</span>}
                      {!collapsed && link.badge && (
                        <span className="ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950",
                collapsed && "justify-center"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>

          {/* Sidebar Footer */}
          <div className={cn(
            "border-t border-border p-4",
            collapsed ? "text-center" : ""
          )}>
            {!collapsed && (
              <p className="text-xs text-sidebar-foreground/70">
                © {new Date().getFullYear()} Campus Guardian
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
