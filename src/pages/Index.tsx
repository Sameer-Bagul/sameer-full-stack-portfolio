
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Contact } from '@/components/home/Contact';
import { Testimonials } from '@/components/home/Testimonials';
import { Skills } from '@/components/home/Skills';
import { useTheme } from '@/contexts/ThemeContext';

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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col relative z-10"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <div className="relative z-20">
        <Hero />
      </div>
      
      <div className="relative z-10 mt-[-4rem]">
        <div className={`pt-20 ${isDark 
          ? "bg-gradient-to-b from-black/0 via-black/50 to-black/80" 
          : "bg-gradient-to-b from-transparent via-gray-100/70 to-gray-100/95"
        }`}>
          <div className="backdrop-blur-sm">
            <About />
            <Skills />
            <SelectedWork />
            <Testimonials />
            <Contact />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
