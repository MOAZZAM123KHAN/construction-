import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards of quality in every project we undertake."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with clients to bring their vision to life through teamwork."
    },
    {
      icon: Target,
      title: "Precision",
      description: "Attention to detail and accuracy in every aspect of construction and design."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Embracing cutting-edge technology and sustainable building practices."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Building Excellence Since 2009
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              ConstructPro has been at the forefront of construction and development, 
              delivering exceptional results that stand the test of time. Our commitment 
              to quality, innovation, and client satisfaction has made us a trusted 
              partner for residential and commercial projects.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-hero rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Experienced Leadership</h4>
                  <p className="text-muted-foreground">Our leadership team brings decades of combined experience in construction, architecture, and project management.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-accent rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Sustainable Practices</h4>
                  <p className="text-muted-foreground">We prioritize environmentally responsible construction methods and materials for a sustainable future.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-hero rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Advanced Technology</h4>
                  <p className="text-muted-foreground">Utilizing the latest construction technology and digital tools to ensure precision and efficiency.</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg">
              Learn More About Us
            </Button>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50 hover:shadow-elegant transition-smooth hover:border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">250+</div>
              <div className="text-muted-foreground">Completed Projects</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Team Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;