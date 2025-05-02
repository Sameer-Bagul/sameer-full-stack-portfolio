import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export const Hero = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const isMobile = useIsMobile();
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

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
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

      {/* Contact Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 right-4 w-64 glass-panel rounded-xl shadow-lg p-4 flex flex-col gap-3 z-30"
      >
        <h3 className="text-sm font-semibold text-foreground">Contact Me</h3>
        <div className="flex gap-3">
          <SocialLink href="mailto:sameerbagul2003@gmail.com" label="Email" icon={<Mail size={20} />} />
          <SocialLink href="tel:+919876543210" label="Phone" icon={<Phone size={20} />} />
          <SocialLink href="https://linkedin.com/in/sameerbagul" label="LinkedIn" icon={<Linkedin size={20} />} />
          <SocialLink href="https://twitter.com/sameerybagul" label="Twitter" icon={<Twitter size={20} />} />
          <SocialLink href="https://github.com/SameerBagul" label="GitHub" icon={<Github size={20} />} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto z-30 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex flex-col space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span>Building the future of learning</span> with code & creativity
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg">
              I'm Sameer Bagul — a Web Developer, Poet, and AI enthusiast. I create powerful digital tools that empower self-learning, from advanced note-taking platforms to AI-driven career guidance like <strong>WCareers.ai</strong>.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="group bg-primary text-background hover:bg-primary/90 shadow-md"
                >
                  Explore Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/10 shadow-sm"
                onClick={toggleWidgetUI}
              >
                {widgetsVisible ? "Close Portfolio Widgets" : "Open Portfolio Widgets"}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-sm text-muted-foreground mb-3">Scroll to discover</p>
        <div className="w-[2px] h-16 bg-border/60 relative overflow-hidden rounded-full">
          <motion.div
            className="w-full bg-primary absolute"
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
    </section>
  );
};

// Social Link Component
const SocialLink = ({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) => {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-colors"
    >
      {icon}
    </motion.a>
  );
};
