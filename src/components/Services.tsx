import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, Wrench, Ruler, Hammer, Shield } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Commercial Construction",
      description: "Office buildings, retail spaces, and commercial complexes built to the highest standards with modern design and functionality.",
      features: ["Office Buildings", "Retail Spaces", "Industrial Facilities"]
    },
    {
      icon: Home,
      title: "Residential Development",
      description: "Beautiful homes, villas, and apartment complexes designed for modern living with attention to every detail.",
      features: ["Luxury Villas", "Apartments", "Custom Homes"]
    },
    {
      icon: Wrench,
      title: "Renovation & Remodeling",
      description: "Transform existing spaces with our expert renovation services, bringing new life to old structures.",
      features: ["Home Renovations", "Office Upgrades", "Restoration"]
    },
    {
      icon: Ruler,
      title: "Architectural Design",
      description: "Innovative architectural solutions that blend functionality with aesthetic appeal for exceptional results.",
      features: ["3D Modeling", "Interior Design", "Landscape Planning"]
    },
    {
      icon: Hammer,
      title: "Project Management",
      description: "End-to-end project management ensuring timely delivery, budget adherence, and quality assurance.",
      features: ["Timeline Management", "Quality Control", "Budget Planning"]
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description: "Comprehensive maintenance and support services to ensure your property remains in perfect condition.",
      features: ["Regular Maintenance", "Emergency Repairs", "Warranty Support"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our Construction Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to completion, we provide comprehensive construction and development 
            services tailored to meet your specific needs and exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-smooth border-border/50 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-smooth">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Request Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;