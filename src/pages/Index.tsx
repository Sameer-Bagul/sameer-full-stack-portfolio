
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Contact } from '@/components/home/Contact';
import { Testimonials } from '@/components/home/Testimonials';
import { Skills } from '@/components/home/Skills';
import { useTheme } from '@/contexts/ThemeContext';
import StarBackground from '@/components/ui-components/StarBackground';

const Index = () => {
  const { isDark } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
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
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  };

  return (
    <AnimatePresence>
      {/* Star Background */}
      <StarBackground />
      
      <motion.div 
        className="flex flex-col relative z-10"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      >
        <motion.div className="relative z-20" variants={sectionVariant}>
          <Hero />
        </motion.div>
        
        <div className="relative z-10 mt-[-4rem]">
          <motion.div 
            className={`pt-20 ${isDark 
              ? "bg-gradient-to-b from-black/0 via-black/50 to-black/80" 
              : "bg-gradient-to-b from-transparent via-gray-100/70 to-gray-100/95"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="backdrop-blur-sm">
              <motion.div variants={sectionVariant}>
                <About />
              </motion.div>
              
              <motion.div variants={sectionVariant}>
                <Skills />
              </motion.div>
              
              <motion.div variants={sectionVariant}>
                <SelectedWork />
              </motion.div>
              
              <motion.div variants={sectionVariant}>
                <Testimonials />
              </motion.div>
              
              <motion.div variants={sectionVariant}>
                <Contact />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
