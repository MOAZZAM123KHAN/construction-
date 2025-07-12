import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-accent rounded-md"></div>
              <span className="text-xl font-bold">ConstructPro</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Building dreams into reality with exceptional construction and development 
              services for over 15 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-smooth">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-smooth">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-smooth">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Commercial Construction</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Residential Development</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Renovation & Remodeling</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Architectural Design</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Project Management</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Maintenance & Support</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/80 hover:text-white transition-smooth">Home</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-smooth">About Us</a></li>
              <li><a href="#services" className="text-white/80 hover:text-white transition-smooth">Services</a></li>
              <li><a href="#projects" className="text-white/80 hover:text-white transition-smooth">Projects</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-smooth">Contact</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-smooth">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/80">
                    123 Construction Avenue<br />
                    Building District, City 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/80" />
                <p className="text-white/80">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/80" />
                <p className="text-white/80">info@constructpro.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/80">
            © 2024 ConstructPro. All rights reserved. Built with excellence and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;