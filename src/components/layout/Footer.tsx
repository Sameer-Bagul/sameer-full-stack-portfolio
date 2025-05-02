
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Youtube, 
  Github, 
  Twitter
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 mt-20 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-medium">Portfolio</h3>
            <p className="text-muted-foreground">
              Crafting digital experiences with passion and precision.
            </p>
            <div className="flex gap-4 mt-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" label="Facebook" />
              <SocialIcon icon={<Instagram size={18} />} href="#" label="Instagram" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" label="LinkedIn" />
              <SocialIcon icon={<Youtube size={18} />} href="#" label="YouTube" />
              <SocialIcon icon={<Github size={18} />} href="#" label="GitHub" />
              <SocialIcon icon={<Twitter size={18} />} href="#" label="Twitter" />
            </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-3">Pages</h4>
              <ul className="space-y-2">
                <li><FooterLink to="/">Home</FooterLink></li>
                <li><FooterLink to="/projects">Projects</FooterLink></li>
                <li><FooterLink to="/achievements">Achievements</FooterLink></li>
                <li><FooterLink to="/blog">Blog</FooterLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">More</h4>
              <ul className="space-y-2">
                <li><FooterLink to="/study">Study</FooterLink></li>
                <li><FooterLink to="/resume">Resume</FooterLink></li>
                <li><FooterLink to="/#contact">Contact</FooterLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Contact</h4>
              <div className="text-muted-foreground space-y-2">
                <p className="flex items-center gap-2">
                  <Mail size={16} /> 
                  <a href="mailto:email@example.com" className="hover:text-primary transition-colors">
                    email@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed with ♥ and precision</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ 
  icon, 
  href, 
  label 
}: { 
  icon: React.ReactNode; 
  href: string; 
  label: string;
}) => {
  return (
    <a 
      href={href}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ 
  to, 
  children 
}: { 
  to: string; 
  children: React.ReactNode;
}) => {
  return (
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};
