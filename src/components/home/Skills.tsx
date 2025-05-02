
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Server, 
  Paintbrush, 
  Database, 
  Globe, 
  GitBranch 
} from 'lucide-react';

// Technology categories with their icons
const techCategories = [
  {
    name: "Frontend",
    icon: <Code2 className="h-6 w-6" />,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    technologies: [
      "React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Framer Motion"
    ]
  },
  {
    name: "Backend",
    icon: <Server className="h-6 w-6" />,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    technologies: [
      "Node.js", "Express", "GraphQL", "NestJS", "Django", "REST API"
    ]
  },
  {
    name: "Database",
    icon: <Database className="h-6 w-6" />,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    technologies: [
      "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "SQLite"
    ]
  },
  {
    name: "UI/UX Design",
    icon: <Paintbrush className="h-6 w-6" />,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    technologies: [
      "Figma", "Adobe XD", "Sketch", "Design Systems", "Accessibility", "Usability Testing"
    ]
  },
  {
    name: "DevOps & Tools",
    icon: <GitBranch className="h-6 w-6" />,
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    technologies: [
      "Git", "Docker", "CI/CD", "AWS", "GitHub Actions", "Webpack"
    ]
  },
  {
    name: "Others",
    icon: <Globe className="h-6 w-6" />,
    color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    technologies: [
      "Agile", "Testing", "SEO", "PWA", "Internationalization", "Accessibility"
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Technical Skills
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Technologies and tools I work with
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techCategories.map((category, index) => (
            <motion.div 
              key={category.name}
              variants={item}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className={`${category.color} py-1.5 px-3`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
