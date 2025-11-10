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
              <p className={`${isMobile ? 'text-base' : 'text-lg'} leading-relaxed ${isMobile ? 'mb-3' : 'mb-4'}`}>
                I'm Sameer Bagul — a Full‑Stack & AI Developer currently at Bug0 (Hashnode). I design and ship developer
                tools, scalable backend services and AI-powered features. On the infra side I focus on containerized
                deployments and CI/CD that make delivery predictable and reliable.
              </p>

              <p className={`${isMobile ? 'text-base' : 'text-lg'} leading-relaxed ${isMobile ? 'mb-3' : 'mb-4'}`}>
                Previously I built full‑stack and DevOps solutions at LabsCheck and Walnut Solutions — from a medical-lab
                platform to an AI automation pipeline that processed 100,000+ leads. I deploy production systems with Docker,
                Nginx and repeatable CI/CD (99% uptime) and maintain developer tooling such as <span className="font-medium">create-mern-auth</span>.
              </p>

              <p className={`${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`}>
                I'm pursuing B.Tech (IT) at PES Modern College of Engineering (CGPA 8.21). I mentor student teams and have
                been recognized in Smart India Hackathon 2024 (finalist) and Innovate You Hackathon 2025 (winner). Core
                skills: JavaScript/TypeScript, MERN, Python, AI/ML, MongoDB, Docker and CI/CD.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">JavaScript</Badge>
                <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                <Badge variant="secondary" className="text-xs">React / Next.js</Badge>
                <Badge variant="secondary" className="text-xs">Node / Express</Badge>
                <Badge variant="secondary" className="text-xs">MongoDB</Badge>
                <Badge variant="secondary" className="text-xs">Docker</Badge>
                <Badge variant="secondary" className="text-xs">CI/CD</Badge>
                <Badge variant="secondary" className="text-xs">AI / ML</Badge>
              </div>
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
