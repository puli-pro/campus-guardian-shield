
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Dean of Student Affairs",
    content: "The new campus security system has transformed how we manage safety. The real-time alerts and visitor management have made our campus significantly more secure."
  },
  {
    name: "Mark Williams",
    role: "Head of Security",
    content: "As someone responsible for campus security, this system has been invaluable. The biometric verification and incident reporting features have streamlined our operations."
  },
  {
    name: "Jessica Chen",
    role: "Student Body President",
    content: "Students feel much safer with the new security measures in place. The emergency alert system and bus tracking app are especially popular among the student body."
  }
];

export default function Testimonials() {
  return (
    <section className="py-16" aria-labelledby="testimonials-title">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="testimonials-title" className="text-3xl font-bold tracking-tight mb-4">
            What Our Campus Community Says
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from faculty, staff, and students about our security platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
