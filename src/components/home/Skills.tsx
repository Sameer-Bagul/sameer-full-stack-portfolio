import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Sparkles,
  Code2,
  Globe,
  Server,
  Database,
  Brain,
  Wrench,
  Braces,
  Terminal,
  Layout,
  Cloud,
  Bot,
  Cog,
  Palette,
  Briefcase,
  type LucideIcon
} from 'lucide-react';

interface Skill {
  name: string;
  level: "Basic" | "Intermediate" | "Advanced";
  icon?: LucideIcon;
}

interface SkillCategory {
  name: string;
  icon: LucideIcon;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: Braces,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    skills: [
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "Java", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
      { name: "Rust", level: "Basic" },
      { name: "Go", level: "Basic" },
      { name: "PHP", level: "Intermediate" },
      { name: "SQL", level: "Advanced" },
      { name: "HTML/CSS", level: "Advanced" },
    ]
  },
  {
    name: "Frontend Development",
    icon: Layout,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    skills: [
      { name: "React.js", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Redux", level: "Advanced" },
      { name: "Framer Motion", level: "Intermediate" },
      { name: "Three.js", level: "Intermediate" },
      { name: "Vue.js", level: "Intermediate" },
      { name: "Angular", level: "Basic" },
      { name: "SASS/SCSS", level: "Advanced" },
      { name: "Material UI", level: "Advanced" },
      { name: "Chakra UI", level: "Advanced" },
      { name: "Webpack", level: "Intermediate" },
      { name: "Vite", level: "Advanced" },
    ]
  },
  {
    name: "Backend Development",
    icon: Server,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "NestJS", level: "Intermediate" },
      { name: "Django", level: "Intermediate" },
      { name: "FastAPI", level: "Intermediate" },
      { name: "GraphQL", level: "Intermediate" },
      { name: "RESTful APIs", level: "Advanced" },
      { name: "WebSockets", level: "Intermediate" },
      { name: "Microservices", level: "Intermediate" },
      { name: "Spring Boot", level: "Basic" },
      { name: "Laravel", level: "Basic" },
    ]
  },
  {
    name: "Database & Cloud",
    icon: Cloud,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    skills: [
      { name: "MongoDB", level: "Advanced" },
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "Redis", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
      { name: "GCP", level: "Basic" },
      { name: "Azure", level: "Basic" },
      { name: "Firebase", level: "Advanced" },
      { name: "Supabase", level: "Intermediate" },
      { name: "Docker", level: "Intermediate" },
      { name: "Kubernetes", level: "Basic" },
      { name: "Vercel", level: "Advanced" },
      { name: "Netlify", level: "Advanced" },
    ]
  },
  {
    name: "AI/ML & Data Science",
    icon: Brain,
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    skills: [
      { name: "TensorFlow", level: "Intermediate" },
      { name: "PyTorch", level: "Intermediate" },
      { name: "Scikit-learn", level: "Advanced" },
      { name: "OpenAI API", level: "Advanced" },
      { name: "Langchain", level: "Intermediate" },
      { name: "Pandas", level: "Advanced" },
      { name: "NumPy", level: "Advanced" },
      { name: "Computer Vision", level: "Intermediate" },
      { name: "NLP", level: "Intermediate" },
      { name: "Hugging Face", level: "Intermediate" },
      { name: "Data Visualization", level: "Advanced" },
    ]
  },
  {
    name: "Tools & DevOps",
    icon: Wrench,
    color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub Actions", level: "Advanced" },
      { name: "Jenkins", level: "Intermediate" },
      { name: "CI/CD", level: "Intermediate" },
      { name: "Jest", level: "Advanced" },
      { name: "Cypress", level: "Intermediate" },
      { name: "Playwright", level: "Intermediate" },
      { name: "Linux", level: "Advanced" },
      { name: "Bash", level: "Intermediate" },
      { name: "Nginx", level: "Intermediate" },
    ]
  },
  {
    name: "Design & Creative",
    icon: Palette,
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    skills: [
      { name: "Figma", level: "Advanced" },
      { name: "Adobe XD", level: "Intermediate" },
      { name: "Blender", level: "Intermediate" },
      { name: "UI Design", level: "Advanced" },
      { name: "UX Design", level: "Advanced" },
      { name: "Wireframing", level: "Advanced" },
      { name: "Prototyping", level: "Advanced" },
      { name: "Design Systems", level: "Advanced" },
      { name: "Adobe Photoshop", level: "Intermediate" },
      { name: "Adobe Illustrator", level: "Intermediate" },
      { name: "3D Modeling", level: "Intermediate" },
      { name: "Motion Design", level: "Basic" },
      { name: "User Research", level: "Intermediate" },
      { name: "Visual Design", level: "Advanced" },
    ]
  },
  {
    name: "Professional & Other",
    icon: Briefcase,
    color: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    skills: [
      { name: "Technical Writing", level: "Advanced" },
      { name: "Agile/Scrum", level: "Advanced" },
      { name: "System Design", level: "Intermediate" },
      { name: "Web Security", level: "Intermediate" },
      { name: "Performance Optimization", level: "Advanced" },
      { name: "Responsive Design", level: "Advanced" },
      { name: "SEO", level: "Intermediate" },
      { name: "Project Management", level: "Advanced" },
      { name: "Team Leadership", level: "Advanced" },
      { name: "Problem Solving", level: "Advanced" },
      { name: "Code Review", level: "Advanced" },
      { name: "Mentoring", level: "Intermediate" },
      { name: "Cross-functional Collaboration", level: "Advanced" },
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
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Technical Expertise</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            A comprehensive overview of my technical skills and expertise
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={item}
              className="glass-panel p-6 rounded-xl backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="outline"
                    className={`
                      px-2.5 py-1 text-xs font-medium rounded-full
                      ${category.color} hover:bg-opacity-20 transition-colors
                      ${skill.level === 'Advanced' ? 'border-2' : ''}
                      ${skill.level === 'Basic' ? 'opacity-75' : ''}
                    `}
                  >
                    {skill.name}
                    {skill.level === 'Advanced' && 
                      <span className="ml-1 opacity-60">•</span>
                    }
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
