
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            About Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Passionate developer with a focus on creating elegant and efficient applications
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-panel p-8 rounded-2xl"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              I'm a full-stack developer with a passion for building beautiful, responsive, and user-friendly 
              applications. With several years of experience in web development, I've developed a strong 
              foundation in both front-end and back-end technologies.
            </p>
            
            <p>
              My journey began with a Computer Science degree, where I discovered my love for programming 
              and problem-solving. Since then, I've worked on numerous projects ranging from small business 
              websites to complex enterprise applications.
            </p>
            
            <p>
              When I'm not coding, I enjoy contributing to open-source projects, writing technical articles, 
              and continuously learning new technologies to stay at the forefront of web development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
