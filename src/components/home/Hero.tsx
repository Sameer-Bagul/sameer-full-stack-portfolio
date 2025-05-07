
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Phone, Twitter, Facebook, Instagram, Youtube, MapPin, Globe } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import WidgetUI from '../ui-components/widgetUi';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Hero = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const isMobile = useIsMobile();
  const { isDark } = useTheme();
  const [widgetsVisible, setWidgetsVisible] = useState(false);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };
  
  const toggleWidgetUI = () => {
    setWidgetsVisible(prev => !prev);
    // Dispatch custom event for the WidgetUI component
    document.dispatchEvent(new CustomEvent('toggleWidgetUI', { 
      detail: { visible: !widgetsVisible } 
    }));
  };

  // Effect to initialize widget visibility state on component mount
  useEffect(() => {
    const handleWidgetToggleEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.visible !== undefined) {
        setWidgetsVisible(customEvent.detail.visible);
      }
    };
    
    // Listen for widget visibility changes from other components
    document.addEventListener('widgetUIStateChange', handleWidgetToggleEvent);
    
    return () => {
      document.removeEventListener('widgetUIStateChange', handleWidgetToggleEvent);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-10">
        {!splineLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: splineLoaded ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-background"
          >
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
        <Spline
          scene="https://prod.spline.design/kskmZQ9fjllluKJ8/scene.splinecode"
          onLoad={handleSplineLoad}
        />
      </div>

      {/* Enhanced Connect With Me Box - Moved to bottom right corner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        className={`fixed bottom-8 right-8 z-50 max-w-sm backdrop-blur-lg ${
          isDark 
            ? 'bg-white/10 border border-white/20 shadow-lg shadow-violet-500/10' 
            : 'bg-black/5 border border-black/10 shadow-lg shadow-violet-500/10'
        } rounded-2xl p-5 flex flex-col gap-3`}
      >
        <h3 className="text-base font-semibold gradient-heading">Connect With Me</h3>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <SocialLink href="mailto:sameerbagul2003@gmail.com" label="Email" icon={<Mail size={18} />} />
          <SocialLink href="tel:+919876543210" label="Phone" icon={<Phone size={18} />} />
          <SocialLink href="https://linkedin.com/in/sameerbagul" label="LinkedIn" icon={<Linkedin size={18} />} />
          <SocialLink href="https://twitter.com/sameerybagul" label="Twitter" icon={<Twitter size={18} />} />
          <SocialLink href="https://github.com/SameerBagul" label="GitHub" icon={<Github size={18} />} />
          <SocialLink href="https://facebook.com/sameerbagul" label="Facebook" icon={<Facebook size={18} />} />
          <SocialLink href="https://instagram.com/sameer.bagul" label="Instagram" icon={<Instagram size={18} />} />
          <SocialLink href="https://youtube.com/@sameerbagul" label="YouTube" icon={<Youtube size={18} />} />
          <SocialLink href="https://maps.google.com/?q=Mumbai,India" label="Location" icon={<MapPin size={18} />} />
          <SocialLink href="https://sameerbagul.com" label="Website" icon={<Globe size={18} />} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto z-30 relative px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div
            className="md:col-span-8 lg:col-span-7 xl:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Glass Backdrop for Text with curved inner corners - VISIBLE ON MOBILE, TEXT-ONLY ON DESKTOP */}
            <motion.div 
              className={`${
                isDark 
                  ? 'backdrop-blur-xl bg-black/30 border border-white/10' 
                  : 'backdrop-blur-xl bg-white/40 border border-black/5'
              } p-6 md:p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden md:bg-transparent md:backdrop-blur-none md:border-0 md:shadow-none`}
              style={{
                clipPath: 'inset(0% round 2.5rem)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Inner content with curved corners */}
              <div className="relative z-10">
                <motion.h1 
                  className="text-3xl md:text-5xl xl:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className={`${isDark ? 'text-violet-300' : 'text-violet-600'}`}>Crafting</span>{' '}
                  <span className="text-shimmer">Digital Experiences</span>{' '}
                  <span>With Passion</span>
                </motion.h1>

                <motion.p 
                  className="text-muted-foreground text-lg max-w-lg pt-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  I'm <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>Sameer Bagul</span>, a 
                  full-stack developer specializing in creating beautiful, functional, and user-focused digital experiences.
                  With expertise in modern web technologies, I blend creativity and technical precision to build solutions that 
                  drive real business impact and exceptional user experiences.
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-4 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Link to="/projects">
                    <Button
                      size="lg"
                      className={`group ${isDark ? 'bg-violet-600 hover:bg-violet-700' : 'bg-violet-500 hover:bg-violet-600'} text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20`}
                    >
                      View My Projects
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="lg"
                    className={`${isDark 
                      ? 'border-violet-500/30 hover:bg-violet-500/10 text-violet-300' 
                      : 'border-violet-500/30 hover:bg-violet-500/10 text-violet-700'
                    } shadow-sm transition-all duration-300`}
                    onClick={toggleWidgetUI}
                  >
                    {widgetsVisible ? "Close Portfolio Widgets" : "Open Portfolio Widgets"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Enhanced animation with better mobile support */}
      <motion.div
        className={`absolute ${isMobile ? 'bottom-28' : 'bottom-10'} left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30`}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.p 
          className={`text-sm ${isDark ? 'text-violet-300/80' : 'text-violet-600/80'} mb-3 font-medium`}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          {isMobile ? "Swipe down" : "Scroll down"}
        </motion.p>
        <div className={`w-[2px] h-${isMobile ? '8' : '16'} bg-border/60 relative overflow-hidden rounded-full`}>
          <motion.div
            className={`w-full ${isDark ? 'bg-violet-400' : 'bg-violet-500'} absolute`}
            initial={{ height: '30%', top: '-30%' }}
            animate={{ top: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
            style={{ height: '30%' }}
          />
        </div>
      </motion.div>

      {/* Include WidgetUI component directly */}
      <WidgetUI />
    </section>
  );
};

// Enhanced Social Link Component with hover card details
const SocialLink = ({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) => {
  const { isDark } = useTheme();
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.a
          href={href}
          aria-label={label}
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 flex items-center justify-center rounded-full ${
            isDark 
              ? 'bg-white/10 border border-white/20 hover:bg-violet-500/20 hover:border-violet-500/30 text-white' 
              : 'bg-black/5 border border-black/10 hover:bg-violet-500/20 hover:border-violet-500/30 text-black'
          } transition-colors`}
        >
          {icon}
        </motion.a>
      </HoverCardTrigger>
      <HoverCardContent 
        className={`${isDark ? 'bg-black/60 border-white/10' : 'bg-white/90 border-black/5'} backdrop-blur-md`}
        side="top"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{href.replace(/(mailto:|tel:|https?:\/\/)/, '')}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
