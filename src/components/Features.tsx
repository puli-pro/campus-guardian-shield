
import { Shield, Users, Bus, MessageSquare } from "lucide-react";

const features = [
  {
    title: "Advanced Security",
    description: "AI-powered facial recognition and biometric access control to keep unauthorized visitors out.",
    icon: Shield,
  },
  {
    title: "Visitor Management",
    description: "Check-in system with digital logs, ID verification, and automated notifications.",
    icon: Users,
  },
  {
    title: "Bus Tracking",
    description: "Real-time tracking of campus buses with automatic number plate recognition.",
    icon: Bus,
  },
  {
    title: "Incident Reporting",
    description: "Easy-to-use system for reporting security concerns and tracking resolution.",
    icon: MessageSquare,
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-muted/50" aria-labelledby="features-title">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="features-title" className="text-3xl font-bold tracking-tight mb-4">
            Comprehensive Campus Security
          </h2>
          <p className="text-muted-foreground text-lg">
            Protecting your campus with cutting-edge technology and intelligent systems
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <feature.icon className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
