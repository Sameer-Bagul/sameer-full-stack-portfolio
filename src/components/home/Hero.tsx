import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Twitter, Sparkles, Layers } from 'lucide-react';
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
    const newState = !widgetsVisible;
    setWidgetsVisible(newState);
    document.dispatchEvent(new CustomEvent('toggleWidgetUI', {
      detail: { visible: newState }
    }));
  };

  useEffect(() => {
    const handleWidgetToggle = (event: CustomEvent) => {
      if (event.detail?.visible !== undefined) {
        setWidgetsVisible(event.detail.visible);
      }
    };

    document.addEventListener('toggleWidgetUI', handleWidgetToggle as EventListener);
    return () => {
      document.removeEventListener('toggleWidgetUI', handleWidgetToggle as EventListener);
    };
  }, []);

  const socialLinks = [
    { icon: <Github size={18} />, href: "https://github.com/SameerBagul", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/sameerbagul", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "https://twitter.com/sameerybagul", label: "Twitter" },
    { icon: <Mail size={18} />, href: "mailto:sameerbagul2003@gmail.com", label: "Email" }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="container mx-auto relative px-4 md:px-8 min-h-screen flex items-center">
        {/* Content Container */}
        <div className="relative z-20 max-w-2xl">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-sm text-violet-500 font-medium">Welcome to my digital space</span>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg blur-2xl opacity-20"></div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 relative"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                <span className="text-foreground block mb-2">Hi, I'm Sameer</span>
                <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text">
                  <TypingTextEffect textArray={roles} />
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-foreground/70 max-w-xl mb-8 leading-relaxed relative backdrop-blur-sm"
            >
              Passionate about creating innovative solutions and bringing ideas to life through code.
              Specialized in full-stack development and AI/ML technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-8 relative"
            >
              <Link to="/projects">
                <Button
                  size="default"
                  className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="default"
                onClick={toggleWidgetUI}
                className={`rounded-full px-6 py-2.5 flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'border-violet-500/30 hover:bg-violet-500/10 text-violet-300' 
                    : 'border-violet-500/30 hover:bg-violet-500/10 text-violet-700'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="text-base">{widgetsVisible ? "Close" : "Open"} Widgets</span>
              </Button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="w-full md:w-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Available for work</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} {...link} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3D Model */}
        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full">
          {!splineLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: splineLoaded ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-background"
            >
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}
          <div className="absolute inset-0">
            <Spline 
              scene="https://prod.spline.design/x42iT3yfv4uLjFiP/scene.splinecode" 
              onLoad={handleSplineLoad} 
            />
          </div>
        </div>
      </div>

      {/* WidgetUI Layer */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 100 }}>
        <div className="pointer-events-auto">
          <WidgetUI />
        </div>
      </div>
    </section>
  );
};

// Social Link Component
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
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2.5 rounded-full transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-white/5 hover:bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
              : 'bg-black/5 hover:bg-black/10 text-black shadow-[0_0_15px_rgba(0,0,0,0.1)]'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.a>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" className="w-auto">
        <p className="text-sm font-medium">{label}</p>
      </HoverCardContent>
    </HoverCard>
  );
};
