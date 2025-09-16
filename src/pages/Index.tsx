import { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Contact } from '@/components/home/Contact';
import { Testimonials } from '@/components/home/Testimonials';
import { Skills } from '@/components/home/Skills';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { isDark } = useTheme();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: isMobile ? 80 : 100,
    damping: isMobile ? 25 : 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Mobile-optimized animations
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.2 : 0.3,
        delayChildren: isMobile ? 0.1 : 0.2
      }
    }
  };

  // Enhanced mobile section animations
  const sectionVariant = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.6 : 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  // Mobile-specific floating animations
  const mobileFloatingVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      {/* Mobile-Optimized Scroll Progress Indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 origin-left z-50 ${
          isMobile ? 'opacity-80' : 'opacity-90'
        }`}
        style={{ scaleX }}
      />

      <AnimatePresence>
        <motion.div
          className="flex flex-col relative z-10 w-full overflow-x-hidden"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {/* Hero Section with Enhanced Mobile Layout */}
          <motion.section
            className="relative z-20 w-full"
            variants={isMobile ? mobileFloatingVariant : sectionVariant}
            viewport={{ once: true }}
          >
            <Hero />
          </motion.section>
          
          {/* Main Content with Mobile-First Design */}
          <div className="relative z-10 w-full">
            <motion.div
              className={`${isMobile ? 'pt-8' : 'pt-20'} w-full ${isDark
                ? "bg-gradient-to-b from-black/0 via-black/40 to-black/70"
                : "bg-gradient-to-b from-transparent via-gray-50/80 to-gray-100/90"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: isMobile ? 0.8 : 1, delay: isMobile ? 0.3 : 0.5 }}
            >
              <div className={`backdrop-blur-sm w-full ${isMobile ? 'space-y-4' : ''}`}>
                {/* About Section */}
                <motion.section
                  className={`${isMobile ? 'py-8 sm:py-12' : 'section-padding'} ${
                    isMobile ? 'px-4 sm:px-6' : ''
                  }`}
                  variants={isMobile ? mobileFloatingVariant : sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                >
                  <div className={`${isMobile ? 'glass-panel-mobile-light dark:glass-panel-mobile-dark rounded-2xl p-4 sm:p-6' : ''}`}>
                    <About />
                  </div>
                </motion.section>
                
                {/* Skills Section */}
                <motion.section
                  className={`${isMobile ? 'py-8 sm:py-12' : 'section-padding'} ${
                    isMobile ? 'px-4 sm:px-6' : ''
                  }`}
                  variants={isMobile ? mobileFloatingVariant : sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                >
                  <div className={`${isMobile ? 'glass-panel-mobile-light dark:glass-panel-mobile-dark rounded-2xl p-4 sm:p-6' : ''}`}>
                    <Skills />
                  </div>
                </motion.section>
                
                {/* Selected Work Section */}
                <motion.section
                  className={`${isMobile ? 'py-8 sm:py-12' : 'section-padding'} ${
                    isMobile ? 'px-4 sm:px-6' : ''
                  }`}
                  variants={isMobile ? mobileFloatingVariant : sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                >
                  <div className={`${isMobile ? 'glass-panel-mobile-light dark:glass-panel-mobile-dark rounded-2xl p-4 sm:p-6' : ''}`}>
                    <SelectedWork />
                  </div>
                </motion.section>
                
                {/* Testimonials Section */}
                <motion.section
                  className={`${isMobile ? 'py-8 sm:py-12' : 'section-padding'} ${
                    isMobile ? 'px-4 sm:px-6' : ''
                  }`}
                  variants={isMobile ? mobileFloatingVariant : sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                >
                  <div className={`${isMobile ? 'glass-panel-mobile-light dark:glass-panel-mobile-dark rounded-2xl p-4 sm:p-6' : ''}`}>
                    <Testimonials />
                  </div>
                </motion.section>
                
                {/* Contact Section */}
                <motion.section
                  className={`${isMobile ? 'py-8 sm:py-12 pb-16' : 'section-padding'} ${
                    isMobile ? 'px-4 sm:px-6' : ''
                  }`}
                  variants={isMobile ? mobileFloatingVariant : sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                >
                  <div className={`${isMobile ? 'glass-panel-mobile-light dark:glass-panel-mobile-dark rounded-2xl p-4 sm:p-6' : ''}`}>
                    <Contact />
                  </div>
                </motion.section>
              </div>
            </motion.div>
          </div>

          {/* Mobile-Specific Floating Action Elements */}
          {isMobile && (
            <motion.div
              className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex justify-center">
                <div className="glass-panel-mobile-light dark:glass-panel-mobile-dark rounded-full px-4 py-2 pointer-events-auto">
                  <p className="text-xs text-center text-muted-foreground">
                    Scroll up to explore more
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Index;
