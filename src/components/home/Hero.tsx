
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Phone, Twitter, Facebook, Instagram, Youtube, MapPin, Globe } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import WidgetUI from '../ui-components/widgetUi';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Typing text effect component
const TypingTextEffect = ({
  textArray
}: {
  textArray: string[];
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const text = textArray[currentTextIndex % textArray.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText.length === text.length) {
          setTypingSpeed(1500);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex(prevIndex => prevIndex + 1);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(50);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, textArray, typingSpeed]);

  return (
    <motion.span
      className="inline-block whitespace-nowrap overflow-visible w-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {currentText}
      <span className="animate-pulse text-violet-500 font-bold">|</span>
    </motion.span>
  );
};

export const Hero = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const isMobile = useIsMobile();
  const { isDark } = useTheme();
  const [widgetsVisible, setWidgetsVisible] = useState(false);
  const roles = ["Software Developer", "AIML Enthusiast", "Content Creator", "Poet", "Youtuber"];

  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };

  const toggleWidgetUI = () => {
    setWidgetsVisible(prev => !prev);
    document.dispatchEvent(new CustomEvent('toggleWidgetUI', {
      detail: {
        visible: !widgetsVisible
      }
    }));
  };

  useEffect(() => {
    const handleWidgetToggleEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.visible !== undefined) {
        setWidgetsVisible(customEvent.detail.visible);
      }
    };
    document.addEventListener('widgetUIStateChange', handleWidgetToggleEvent);
    return () => {
      document.removeEventListener('widgetUIStateChange', handleWidgetToggleEvent);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-10">
        {!splineLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: splineLoaded ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 flex items-center justify-center bg-background`}
          >
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
        <Spline scene="https://prod.spline.design/kskmZQ9fjllluKJ8/scene.splinecode" onLoad={handleSplineLoad} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto z-30 relative px-4 md:px-6 flex flex-col justify-center min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between h-full">
          {/* Left side - Hero text section */}
          <motion.div
            className="md:w-5/12 mb-10 md:mb-0 h-full flex items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Glass Backdrop - Only add blur class in mobile view */}
            <motion.div
              style={{ clipPath: isMobile ? 'inset(0% round 1.5rem)' : 'inset(0% round 2.5rem)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`w-full ${isMobile ? 'backdrop-blur-xl bg-black/40 border border-white/10 p-5' : 'bg-white/10 dark:bg-black/30 border border-white/10 p-8 shadow-2xl'}`}
            >
              <div className={`relative z-10 ${isMobile ? 'py-3 text-center' : ''}`}>
                <motion.h1
                  className={`text-4xl md:text-5xl xl:text-6xl font-bold mb-4 font-playfair tracking-tight ${isMobile ? 'text-center' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="text-foreground">Hi, I'm</span>
                  <br />
                  <div className="flex flex-nowrap overflow-hidden">
                    <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg inline-block">
                     <TypingTextEffect textArray={roles} />
                    </span>
                  </div>
                </motion.h1>

                <motion.p
                  className={`text-xl md:text-2xl mb-3 text-foreground/90 font-medium ${isMobile ? 'text-center' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Welcome to my portfolio!
                </motion.p>

                <motion.p
                  className={`text-lg md:text-xl italic mb-6 text-foreground/70 font-playfair ${isMobile ? 'text-center' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <span className="inline-block px-3 py-1 rounded bg-gradient-to-r from-violet-100/60 to-purple-100/60 dark:from-violet-900/40 dark:to-purple-900/40 text-violet-700 dark:text-violet-200 shadow">
                    "Code is poetry in motion, bringing ideas to life one line at a time."
                  </span>
                </motion.p>

                <motion.div
                  className={`flex items-center gap-2 mb-8 ${isMobile ? 'justify-center' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-500/20 shadow">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Available for work
                    </span>
                  </span>
                </motion.div>

                <motion.div
                  className={`flex flex-wrap gap-4 ${isMobile ? 'justify-center' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Link to="/projects">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 rounded-full px-7"
                    >
                      View Projects
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="lg"
                    className={`rounded-full px-7 ${isDark ? 'border-violet-500/30 hover:bg-violet-500/10 text-violet-300' : 'border-violet-500/30 hover:bg-violet-500/10 text-violet-700'} shadow-md transition-all duration-300`}
                    onClick={toggleWidgetUI}
                  >
                    {widgetsVisible ? "Close Widgets" : "Open Widgets"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Empty space for 3D background to be visible */}
          <div className="md:w-6/12 hidden md:block"></div>
        </div>

        {/* Connect With Me Section - Modified for 2x5 layout */}
        <motion.div
          className={`order-2 ${isMobile ? 'mt-4 mb-16' : 'md:absolute md:bottom-16 md:right-8 md:max-w-md'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            whileHover={{
              scale: isMobile ? 1.0 : 1.03,
              transition: { duration: 0.2 }
            }}
            className={`mx-auto ${isMobile ? 'max-w-[92%] backdrop-blur-xl bg-black/40 border border-white/10' : 'md:ml-auto md:mr-0 max-w-md backdrop-blur-xl bg-black/40 border border-white/10 shadow-xl shadow-violet-500/10'} rounded-3xl p-3 md:p-6`}
          >
            {!isMobile && (
              <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text mb-2 tracking-wide">
                Connect With Me
              </h3>
            )}
            <div className={`grid ${isMobile ? 'grid-cols-5 gap-2 grid-rows-2' : 'grid-cols-5 gap-3 grid-rows-2'}`}>
              <SocialLink href="mailto:sameerbagul2003@gmail.com" label="Email" icon={<Mail size={isMobile ? 16 : 20} />} />
              <SocialLink href="tel:+919876543210" label="Phone" icon={<Phone size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://linkedin.com/in/sameerbagul" label="LinkedIn" icon={<Linkedin size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://twitter.com/sameerybagul" label="Twitter" icon={<Twitter size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://github.com/SameerBagul" label="GitHub" icon={<Github size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://facebook.com/sameerbagul" label="Facebook" icon={<Facebook size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://instagram.com/sameer.bagul" label="Instagram" icon={<Instagram size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://youtube.com/@sameerbagul" label="YouTube" icon={<Youtube size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://maps.google.com/?q=Mumbai,India" label="Location" icon={<MapPin size={isMobile ? 16 : 20} />} />
              <SocialLink href="https://sameerbagul.com" label="Website" icon={<Globe size={isMobile ? 16 : 20} />} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Positioned better for mobile */}
      <motion.div
        className={`absolute ${isMobile ? 'bottom-5' : 'bottom-10'} left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30`}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.p
          className="text-sm bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text mb-3 font-medium"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          {isMobile ? "Swipe down" : "Scroll down"}
        </motion.p>
        <div className={`w-[2.5px] h-${isMobile ? '6' : '20'} bg-border/60 relative overflow-hidden rounded-full`}>
          <motion.div
            className="w-full bg-gradient-to-b from-violet-400 to-purple-600 absolute"
            initial={{ height: '30%', top: '-30%' }}
            animate={{ top: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ height: '30%' }}
          />
        </div>
      </motion.div>

      {/* WidgetUI */}
      <WidgetUI />
    </section>
  );
};

// Social Link Component with hover card details
const SocialLink = ({
  icon,
  href,
  label
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) => {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.a
          href={href}
          aria-label={label}
          whileHover={{
            scale: 1.13,
            rotate: 6
          }}
          whileTap={{
            scale: 0.95
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} flex items-center justify-center rounded-full ${isDark ? 'bg-white/10 border border-violet-500/30 hover:bg-violet-500/30 hover:border-violet-500/60 text-white' : 'bg-black/5 border border-violet-500/30 hover:bg-violet-500/20 hover:border-violet-500/50 text-black'} transition-colors shadow-md hover:shadow-lg`}
        >
          {icon}
        </motion.a>
      </HoverCardTrigger>
      {!isMobile && (
        <HoverCardContent
          className={`${isDark ? 'bg-black/80 border-violet-500/20' : 'bg-white/95 border-violet-500/20'} backdrop-blur-md shadow-xl`}
          side="top"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{href.replace(/(mailto:|tel:|https?:\/\/)/, '')}</p>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};
