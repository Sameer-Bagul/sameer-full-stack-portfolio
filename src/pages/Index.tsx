import { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Contact } from '@/components/home/Contact';
import { Testimonials } from '@/components/home/Testimonials';
import { Skills } from '@/components/home/Skills';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0],
      } 
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/50 origin-left z-50"
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
          <motion.div 
            className="relative z-20 w-full" 
            variants={sectionVariant}
            viewport={{ once: true }}
          >
            <Hero />
          </motion.div>
          
          <div className="relative z-10 w-full">
            <motion.div 
              className={`pt-20 w-full ${isDark 
                ? "bg-gradient-to-b from-black/0 via-black/50 to-black/80" 
                : "bg-gradient-to-b from-transparent via-gray-100/70 to-gray-100/95"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="backdrop-blur-sm w-full">
                <motion.div 
                  className="section-padding"
                  variants={sectionVariant}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <About />
                </motion.div>
                
                <motion.div 
                  className="section-padding"
                  variants={sectionVariant}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Skills />
                </motion.div>
                
                <motion.div 
                  className="section-padding"
                  variants={sectionVariant}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <SelectedWork />
                </motion.div>
                
                <motion.div 
                  className="section-padding"
                  variants={sectionVariant}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Testimonials />
                </motion.div>
                
                <motion.div 
                  className="section-padding"
                  variants={sectionVariant}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Contact />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Index;
