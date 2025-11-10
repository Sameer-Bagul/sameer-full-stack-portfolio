import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Phone, MapPin, Sparkles, Layers, Download, FileText, Briefcase, Youtube } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { GlassButton } from '@/components/ui/glass-button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { experiences } from '@/data/experiences';

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
  const roles = ["Full-Stack Developer", "AI Developer", "DevOps Engineer", "Tech Lead", "Problem Solver"];

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
    { icon: <Github size={18} />, href: "https://github.com/Sameer-Bagul", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/sameer-bagul", label: "LinkedIn" },
    { icon: <Youtube size={18} />, href: "https://www.youtube.com/@Byte_with_sam", label: "YouTube" },
    { icon: <Mail size={18} />, href: "mailto:sameerbagul2004@gmail.com", label: "Email" },
    { icon: <Phone size={18} />, href: "tel:+917841941033", label: "Phone" },
    { icon: <MapPin size={18} />, href: "https://maps.google.com/?q=Pune,India", label: "Location: Pune, India" }
  ];

  // find the current (present) experience from experiences data
  const currentExp = experiences.find(exp => /present/i.test(exp.period));
  // compute a sensible link for the current company: direct site for Bug0, otherwise a search
  const currentCompanyUrl = currentExp
    ? (currentExp.company.toLowerCase().includes('bug0')
        ? 'https://bug0.com/'
        : `https://www.google.com/search?q=${encodeURIComponent(currentExp.company)}`)
    : undefined;

  return (
    <section className="relative w-screen overflow-hidden" style={{ height: '100vh', width: '100vw' }}>

      <div className={`container mx-auto relative px-4 md:px-8 ${isMobile ? 'flex items-center justify-center' : 'flex items-center'}`} style={{ height: '100vh' }}>
        {/* Content Container - Centered on Mobile */}
        <div className={`relative z-20 ${isMobile ? 'max-w-sm w-full text-center' : 'max-w-2xl'}`}>
          {/* Enhanced Welcome Badge with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className={`${isMobile ? 'mb-4 flex justify-center' : 'mb-6'}`}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-button glass-button-accent text-foreground font-medium shadow-lg backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             
                <Sparkles className="w-4 h-4" />

              <span className="text-sm">Welcome to my digital space</span>
            </motion.div>
          </motion.div>

          {/* Current Workplace Badge (driven from src/data/experiences.ts) */}
          {currentExp && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className={`mb-4 flex ${isMobile ? 'justify-center' : ''}`}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a
                    href={currentCompanyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 glass-button glass-button-accent px-4 py-2 rounded-lg shadow-md"
                    aria-label={`Currently working at ${currentExp.company}`}
                  >
                    <Briefcase className="w-4 h-4 text-foreground" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">Currently at <span className="text-violet-400">{currentExp.company}</span></div>
                      <div className="text-xs text-foreground/70">{currentExp.title} • {currentExp.period}</div>
                    </div>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" className="w-auto">
                  <p className="text-sm">{currentExp.description?.[0] ?? currentExp.details ?? 'Working on product development and automation.'}</p>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          )}



          {/* Main Content - Centered on Mobile */}
          <div className={`relative ${isMobile ? 'text-center' : ''}`}>
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg blur-2xl ${isMobile ? 'opacity-15' : 'opacity-20'}`}></div>

            {/* Enhanced Heading with Glow Effects */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${isMobile ? 'mb-4' : 'mb-6'} relative`}
            >
              {/* Background glow for heading */}
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl blur-xl opacity-30"></div>

              <motion.h1
                className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold tracking-tight mb-2 relative`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  className="text-foreground block mb-2 drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Hi, I'm Sameer
                </motion.span>
                <motion.span
                  className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text drop-shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <TypingTextEffect textArray={roles} />
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Description - Centered on Mobile */}
            <motion.p
              initial={{ opacity: 0, y: isMobile ? 0 : -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} text-foreground/70 ${isMobile ? 'max-w-xs mx-auto' : 'max-w-xl'} ${isMobile ? 'mb-6' : 'mb-8'} leading-relaxed relative backdrop-blur-sm`}
            >
              {isMobile ?
                'Scaling business processes with AI automation. DevOps expert achieving 99% uptime.' :
                'Designing scalable full-stack systems and automating business processes with AI. DevOps engineer with expertise in Docker, CI/CD pipelines, and achieving 99% uptime.'
              }
            </motion.p>

            {/* Enhanced CTA Buttons - Centered on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`flex ${isMobile ? 'flex-col gap-3 items-center' : 'flex-wrap items-center gap-4'} ${isMobile ? 'mb-6' : 'mb-8'} relative`}
            >
              {/* Primary Action - View Projects */}
              <Link to="/projects" className={isMobile ? 'w-full max-w-xs' : ''}>
                <GlassButton
                  variant="primary"
                  className={`${isMobile ? 'w-full px-8 py-3 text-sm' : 'px-6 py-2.5'}`}
                >
                  View Projects
                  <ArrowRight className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} group-hover:translate-x-1 transition-transform`} />
                </GlassButton>
              </Link>

              {/* Secondary Actions Row - Centered on Mobile */}
              <div className={`flex ${isMobile ? 'gap-2 w-full max-w-xs justify-center' : 'gap-4'}`}>
                {/* Resume Download - Glass Morphism Style */}
                <GlassButton
                  variant="secondary"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/sameerbagul-resume.pdf';
                    link.download = 'Sameer_Bagul_Resume.pdf';
                    link.click();
                  }}
                  className={`${isMobile ? 'flex-1 px-3 py-2 text-xs' : 'px-6 py-2.5'}`}
                >
                  <FileText className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <span className={`${isMobile ? 'text-xs' : 'text-base'}`}>Resume</span>
                  <Download className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} opacity-70 group-hover:translate-y-0.5 transition-transform`} />
                </GlassButton>

                {/* Widget Toggle - Hidden on Mobile */}
                {!isMobile && (
                  <GlassButton
                    variant="accent"
                    onClick={toggleWidgetUI}
                    className="px-6 py-2.5"
                  >
                    <Layers className="w-4 h-4" />
                    <span className="text-base">
                      {(widgetsVisible ? "Close" : "Open") + " Widgets"}
                    </span>
                  </GlassButton>
                )}


              </div>
            </motion.div>

            {/* Enhanced Social Links - Centered on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <div className={`flex ${isMobile ? 'gap-2 justify-center flex-wrap' : 'gap-3'}`}>
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} {...link} isMobile={isMobile} />
                ))}
              </div>

              {/* Mobile Location Info - Centered */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mt-4 text-center"
                >
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Pune, India • Available for work
                  </p>
                </motion.div>
              )}
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
    </section>
  );
};

// Enhanced Social Link Component with Glass Button Style
const SocialLink = ({
  icon,
  href,
  label,
  isMobile = false
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
  isMobile?: boolean;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`glass-button glass-button-social ${isMobile ? 'p-3' : 'p-3'} transition-all duration-300 hover:scale-105 ${isMobile ? 'active:scale-95' : ''}`}
          whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center justify-center">
            {icon}
          </span>
        </motion.a>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" className="w-auto">
        <p className="text-sm font-medium">{label}</p>
      </HoverCardContent>
    </HoverCard>
  );
};
