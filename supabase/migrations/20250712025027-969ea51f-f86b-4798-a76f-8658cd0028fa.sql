-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('residential', 'commercial', 'renovation', 'villa', 'apartment')),
  location TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed')),
  start_date DATE,
  completion_date DATE,
  budget DECIMAL(12,2),
  image_url TEXT,
  gallery JSONB DEFAULT '[]',
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  features TEXT[],
  price_range TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  service_type TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  project_title TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create projects policies
CREATE POLICY "Anyone can view completed projects" ON public.projects
  FOR SELECT USING (status = 'completed');

CREATE POLICY "Admins can manage all projects" ON public.projects
  FOR ALL USING (public.is_admin());

-- Create services policies
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (public.is_admin());

-- Create contact inquiries policies
CREATE POLICY "Anyone can create contact inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries" ON public.contact_inquiries
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update inquiries" ON public.contact_inquiries
  FOR UPDATE USING (public.is_admin());

-- Create testimonials policies
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (public.is_admin());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON public.contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email,
    CASE WHEN NEW.email = 'admin@constructionco.com' THEN 'admin' ELSE 'client' END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO public.services (title, description, icon, features, price_range) VALUES
('Residential Construction', 'Complete home building services from foundation to finish', 'home', ARRAY['Custom Design', 'Quality Materials', 'Timely Completion'], '$200K - $800K'),
('Commercial Development', 'Office buildings, retail spaces, and commercial complexes', 'building', ARRAY['Zoning Compliance', 'Commercial Grade Materials', 'Project Management'], '$500K - $5M'),
('Villa Construction', 'Luxury villa design and construction services', 'castle', ARRAY['Luxury Finishes', 'Custom Architecture', 'Premium Materials'], '$600K - $2M'),
('Apartment Buildings', 'Multi-unit residential building construction', 'buildings', ARRAY['Multi-Unit Design', 'Efficient Layouts', 'Modern Amenities'], '$800K - $3M'),
('Renovation & Remodeling', 'Transform existing spaces with modern updates', 'wrench', ARRAY['Space Optimization', 'Modern Updates', 'Minimal Disruption'], '$50K - $300K'),
('Interior Design', 'Complete interior design and finishing services', 'palette', ARRAY['Custom Design', 'Material Selection', 'Furniture Coordination'], '$30K - $150K');

INSERT INTO public.projects (title, description, category, location, status, budget, image_url) VALUES
('Modern Villa Estate', 'Luxury 4-bedroom villa with contemporary design and premium finishes', 'villa', 'Beverly Hills, CA', 'completed', 1250000.00, '/src/assets/project-villa.jpg'),
('Downtown Apartment Complex', '120-unit modern apartment building with amenities', 'apartment', 'Downtown LA', 'completed', 2800000.00, '/src/assets/project-apartment.jpg'),
('Corporate Office Tower', '25-story commercial office building with retail ground floor', 'commercial', 'Century City, CA', 'completed', 4500000.00, '/src/assets/project-commercial.jpg');

INSERT INTO public.testimonials (client_name, project_title, rating, testimonial) VALUES
('Sarah Johnson', 'Modern Family Home', 5, 'Exceptional quality and attention to detail. Our dream home exceeded all expectations!'),
('Michael Chen', 'Commercial Office Building', 5, 'Professional team, on-time delivery, and outstanding results. Highly recommended!'),
('Emma Rodriguez', 'Luxury Villa', 5, 'From design to completion, every aspect was handled with care and expertise.');

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Create storage policies
CREATE POLICY "Anyone can view project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-images' AND public.is_admin());

CREATE POLICY "Admins can update project images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'project-images' AND public.is_admin());

CREATE POLICY "Admins can delete project images" ON storage.objects
  FOR DELETE USING (bucket_id = 'project-images' AND public.is_admin());