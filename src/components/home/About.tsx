import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Lightbulb, GraduationCap, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <section id="about" className={`${isMobile ? 'py-12' : 'py-20'} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[300px] h-[300px]' : 'w-[500px] h-[500px]'} bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-full blur-3xl`}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className={`text-center ${isMobile ? 'mb-10' : 'mb-16'}`}>
          <motion.h2
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.5 : 0.6 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4`}
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.5 : 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`text-muted-foreground max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-lg'}`}
          >
            Passionate developer with a focus on creating elegant and efficient applications
          </motion.p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-12'} items-center max-w-6xl mx-auto`}>
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: isMobile ? 0.6 : 0.8 }}
            viewport={{ once: true }}
            className={isMobile ? 'order-2' : ''}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className={`${isMobile ? 'text-base' : 'text-xl'} leading-relaxed ${isMobile ? 'mb-4' : 'mb-6'}`}>
                I'm a Software Engineer at Bug0 (Hashnode), specializing in full-stack development and AI solutions. 
                Currently pursuing Information Technology at PES Modern College of Engineering, Pune with a CGPA of 8.21/10.
              </p>
              
              <p className={`${isMobile ? 'text-base' : 'text-xl'} leading-relaxed ${isMobile ? 'mb-4' : 'mb-6'}`}>
                As Technical Lead of APP Club at PESMCOE, I've mentored over 200 students and guided multiple
                projects to completion. My experience includes building innovative solutions at Bug0, automating operations 
                for 100,000+ leads using AI agents, and achieving 99% uptime with modern DevOps practices.
              </p>
              
              <p className={`${isMobile ? 'text-base' : 'text-xl'} leading-relaxed`}>
                I'm a national hackathon winner (Smart India Hackathon 2024 & Innovate You Hackathon 2025)
                with expertise in MERN stack, AI/ML technologies, and business process transformation.
                Passionate about solving real engineering challenges and building meaningful products with creativity and innovation.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: isMobile ? 0.6 : 0.8 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'sm:grid-cols-2 gap-6'} ${isMobile ? 'order-1' : ''}`}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.4 : 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full hover:shadow-lg transition-shadow duration-300 ${isMobile ? 'hover:scale-[1.02]' : ''}`}>
                  <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-primary/10 flex items-center justify-center ${isMobile ? 'mb-3' : 'mb-4'} text-primary`}>
                      {item.icon}
                    </div>
                    <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold ${isMobile ? 'mb-1' : 'mb-2'}`}>{item.title}</h3>
                    <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>{item.description}</p>
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
