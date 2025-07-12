import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, MapPin, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import villaImage from "@/assets/project-villa.jpg";
import apartmentImage from "@/assets/project-apartment.jpg";
import commercialImage from "@/assets/project-commercial.jpg";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  budget: number;
  image_url: string;
  completion_date?: string;
  created_at: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback images
  const fallbackImages = {
    villa: villaImage,
    apartment: apartmentImage,
    commercial: commercialImage,
    residential: villaImage,
    renovation: apartmentImage
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectImage = (project: Project) => {
    if (project.image_url) {
      return project.image_url;
    }
    
    // Use fallback based on category
    const categoryKey = project.category.toLowerCase() as keyof typeof fallbackImages;
    return fallbackImages[categoryKey] || villaImage;
  };

  const formatBudget = (budget: number) => {
    if (budget >= 1000000) {
      return `$${(budget / 1000000).toFixed(1)}M`;
    } else if (budget >= 1000) {
      return `$${(budget / 1000).toFixed(0)}K`;
    }
    return `$${budget.toLocaleString()}`;
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of successful construction projects that showcase 
            our commitment to excellence, innovation, and quality craftsmanship.
          </p>
        </div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
              {projects.map((project) => (
                <Card key={project.id} className="group overflow-hidden border-border/50 hover:shadow-elegant transition-smooth hover:border-primary/20">
                  <div className="relative overflow-hidden">
                    <img 
                      src={getProjectImage(project)} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="default" className="bg-background/90 capitalize">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/90 border-primary/50 capitalize">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-smooth">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.completion_date || new Date(project.created_at).getFullYear()}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <DollarSign className="w-4 h-4" />
                        {project.budget ? formatBudget(project.budget) : 'Contact for pricing'}
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        View Details
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg">
                View All Projects
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">No completed projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;