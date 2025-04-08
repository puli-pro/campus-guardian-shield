
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, User } from "lucide-react";

export default function Header() {
  const { toast } = useToast();
  
  const handleAdminLogin = () => {
    toast({
      title: "Admin Login",
      description: "Redirecting to admin login page...",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-20">
      <div className="container flex justify-end items-center py-4 gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleNotifications}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleAdminLogin}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </div>
    </header>
  );
}
