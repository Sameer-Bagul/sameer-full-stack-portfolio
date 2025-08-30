import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Lightbulb, GraduationCap, Heart } from 'lucide-react';

const highlights = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Full Stack Developer",
    description: "Experienced in both frontend and backend development with modern technologies."
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Problem Solver",
    description: "Passionate about finding elegant solutions to complex technical challenges."
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Continuous Learner",
    description: "Always staying updated with the latest technologies and best practices."
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Open Source",
    description: "Active contributor to the open-source community and various projects."
  }
];

export const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Passionate developer with a focus on creating elegant and efficient applications
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl leading-relaxed mb-6">
                I'm a full-stack developer with a passion for building beautiful, responsive, and user-friendly 
                applications. With several years of experience in web development, I've developed a strong 
                foundation in both front-end and back-end technologies.
              </p>
              
              <p className="text-xl leading-relaxed mb-6">
                My journey began with a Computer Science degree, where I discovered my love for programming 
                and problem-solving. Since then, I've worked on numerous projects ranging from small business 
                websites to complex enterprise applications.
              </p>
              
              <p className="text-xl leading-relaxed">
                When I'm not coding, I enjoy contributing to open-source projects, writing technical articles, 
                and continuously learning new technologies to stay at the forefront of web development.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
