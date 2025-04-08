
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Visitor Management", href: "/visitor-management" },
  { name: "Incident Reports", href: "/incident-reports" },
  { name: "Worker Attendance", href: "/worker-attendance" },
  { name: "Alerts", href: "/alerts" },
  { name: "Bus Tracker", href: "/bus-tracker" },
  { name: "Safety Tips", href: "/safety-tips" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleAdminLogin = () => {
    toast({
      title: "Admin Login",
      description: "Redirecting to admin login page...",
    });
  };

  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="font-bold text-xl">Campus Guardian</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`nav-link ${link.name === "Home" ? "active" : ""}`}
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button onClick={handleAdminLogin} variant="outline">
            Admin Login
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className={`nav-link ${link.name === "Home" ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button onClick={handleAdminLogin} className="mt-2">
              Admin Login
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
