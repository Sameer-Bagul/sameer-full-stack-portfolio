import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award, Code, Languages, User, Mail, Phone, MapPin, Calendar, Github, Linkedin, Globe, Heart, Coffee, 
  Braces, Layout, Server, Cloud, Brain, Wrench, Palette, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface SkillCategory {
  name: string;
  icon: React.ComponentType<{className?: string}>;
  color: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: Braces,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    skills: [
      "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "SQL", "HTML/CSS"
    ]
  },
  {
    name: "Frameworks & Libraries",
    icon: Layout,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    skills: [
      "MERN Stack", "React.js", "Next.js", "Three.js", "R3F", "Express.js", "Node.js"
    ]
  },
  {
    name: "Databases",
    icon: Server,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    skills: [
      "MongoDB", "SQL", "Firebase", "PostgreSQL", "MySQL"
    ]
  },
  {
    name: "DevOps & Tools",
    icon: Cloud,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    skills: [
      "Git", "Docker", "Nginx", "Portainer", "Postman", "VS Code", "CI/CD"
    ]
  },
  {
    name: "AI/ML & Data Science",
    icon: Brain,
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    skills: [
      "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex", "OpenAI API", "Pinecone", "FAISS", "Streamlit", "Gradio", "Prompt Engineering", "NLP"
    ]
  },
  {
    name: "Additional Technologies",
    icon: Wrench,
    color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    skills: [
      "REST APIs", "Electron.js", "MongoDB Atlas", "Render", "Flask", "LLMs"
    ]
  }
];

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="container max-w-5xl mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Professional Resume</h1>
            <p className="text-muted-foreground">Full Stack Developer & AI/ML Enthusiast</p>
          </div>
          <div className="flex gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Get in touch</AlertDialogTitle>
                  <AlertDialogDescription>
                    Feel free to reach out for opportunities or collaborations.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-3 py-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-primary" />
                    <span>sameerbagul2004@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary" />
                    <span>+91 7841941033</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-primary" />
                    <span>linkedin.com/in/sameer-bagul</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-primary" />
                    <span>github.com/Sameer-Bagul</span>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    navigator.clipboard.writeText("sameerbagul2004@gmail.com");
                    toast.success("Email copied to clipboard");
                  }}>
                    Copy Email
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            {/* <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button> */}
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="professional" className="mb-8">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:gap-2">
              <TabsTrigger value="professional" className="flex gap-2 items-center">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Professional</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex gap-2 items-center">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Education</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex gap-2 items-center">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex gap-2 items-center">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="professional" className="space-y-6 mt-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                  <Card className="overflow-hidden border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User size={16} />
                        Personal Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <User size={32} className="text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Sameer Bagul</h2>
                        <p className="text-muted-foreground">Full Stack Developer</p>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail size={16} className="text-primary" />
                          <span className="text-sm">sameerbagul2004@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone size={16} className="text-primary" />
                          <span className="text-sm">+91 7841941033</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-primary" />
                          <span className="text-sm">Pune, India</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Linkedin size={16} className="text-primary" />
                          <a href="https://www.linkedin.com/in/sameer-bagul/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">linkedin.com/in/sameer-bagul</a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Github size={16} className="text-primary" />
                          <a href="https://github.com/Sameer-Bagul" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">github.com/Sameer-Bagul</a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe size={16} className="text-primary" />
                          <a href="https://sameerbagul.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">sameerbagul.vercel.app</a>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <Coffee size={12} />
                          <span>Coffee lover</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <Heart size={12} />
                          <span>Open source</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase size={16} />
                        Work Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <ExperienceItem
                          title="Software Engineer"
                          company="Bug0 (Hashnode)"
                          period="Nov 2025 - Present"
                          description={[
                            "Joined Bug0 full-time as a Software Engineer, working on solving real engineering challenges with innovative solutions",
                            "Building meaningful products with focus on creativity and innovation",
                            "Collaborating with passionate team members including Fazle Rahman and Sandeep Panda",
                            "Contributing to cutting-edge technology solutions and pushing boundaries in software development"
                          ]}
                        />
                        
                        <Separator />
                        
                        <ExperienceItem
                          title="Full Stack Software Developer & DevOps Engineer"
                          company="WyseTree – Business Process Transformation Services, Pune"
                          period="Aug 2025 - Oct 2025"
                          description={[
                            "Designed and implemented scalable full-stack systems to optimize business processes across departments",
                            "Automated Marketing and Lead operations using an AI agent, handling over 100,000 leads for outreach and follow-ups",
                            "Developed an end-to-end medical lab platform, providing price-sorted recommendations and seamless user experience",
                            "Deployed applications using Nginx, Docker, Portainer, and CI/CD pipelines, achieving 99% uptime"
                          ]}
                        />
                        
                        <Separator />
                        
                        <ExperienceItem
                          title="Web Developer Intern"
                          company="Walnut Solutions, Dhule"
                          period="Jan 2025 - June 2025"
                          description={[
                            "Developed and deployed responsive web applications using Next.js, improving SEO and user engagement by 30%",
                            "Integrated RESTful APIs and interactive UI components to reduce page load times by 30%",
                            "Optimized websites for SEO and accessibility, boosting organic traffic and search rankings",
                            "Delivered high-quality web solutions while collaborating with remote teams; recognized for initiative and efficiency"
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User size={16} />
                        Professional Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="leading-relaxed">
                        Software Engineer at Bug0 (Hashnode) with expertise in full-stack development, AI/ML, and creative UI/UX design. 
                        Passionate about building meaningful products and solving real engineering challenges with innovative solutions. 
                        Proven track record as Technical Lead, national hackathon winner, and delivering impactful projects that enhance user engagement and drive business growth.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="animate-fade-in mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap size={16} />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <ExperienceItem
                          title="Bachelor of Technology - Information Technology"
                          company="PES Modern College of Engineering, Pune"
                          period="Nov 2022 - June 2026"
                          description={[
                            "CGPA: 8.21 / 10",
                            "Relevant Coursework: Data Structures, Algorithms, Machine Learning, Full Stack Development, and Software Engineering",
                            "Technical Lead of APP Club, mentoring over 200 students and guiding multiple projects to completion",
                            "Active participant in hackathons and technical competitions"
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award size={16} />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div>
                            <span className="font-medium">Smart India Hackathon 2024</span>
                            <span className="text-muted-foreground text-sm block">Grand Finalist and Runner-up - Rs. 30,000 cash prize</span>
                          </div>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div>
                            <span className="font-medium">Innovate You Hackathon 2025</span>
                            <span className="text-muted-foreground text-sm block">National Winner - Rs. 10,000 award</span>
                          </div>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div>
                            <span className="font-medium">APP Club Technical Lead</span>
                            <span className="text-muted-foreground text-sm block">PESMCOE - Mentored 200+ students</span>
                          </div>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div>
                            <span className="font-medium">Academic Excellence</span>
                            <span className="text-muted-foreground text-sm block">CGPA: 8.21/10 in Information Technology</span>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="animate-fade-in mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category) => (
                  <Card key={category.name} className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                          <category.icon className="w-4 h-4" />
                        </div>
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className={`
                              px-2.5 py-1 text-xs font-medium rounded-full
                              ${category.color} hover:bg-opacity-20 transition-colors
                            `}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="animate-fade-in mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award size={16} />
                      Notable Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <span className="font-medium">Skillify</span>
                          <p className="text-sm text-muted-foreground">National Award winning GEN AI Project for Skill Development [SIH, Techathon]</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <span className="font-medium">WCareers</span>
                          <p className="text-sm text-muted-foreground">AI-powered career guidance platform using Agentic AI and Adaptive Assessment Engine</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <span className="font-medium">AIPaths</span>
                          <p className="text-sm text-muted-foreground">EdTech Gen AI SAAS Tool for creating dynamic roadmaps [LLMs and MERN]</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award size={16} />
                      Other Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <span className="font-medium">DevCollab & DevLibrary</span>
                          <p className="text-sm text-muted-foreground">Global platforms for students to share projects and educational resources [MERN Stack]</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <span className="font-medium">Evento</span>
                          <p className="text-sm text-muted-foreground">Event Management Application with Payment Gateway for college [Next.js]</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <span className="font-medium">WebMineCraft</span>
                          <p className="text-sm text-muted-foreground">Web version of MineCraft with Node.js backend</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
};

const SkillBar = ({ name, value, label }: { name: string; value: number; label?: string }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">
          {label ? label : `${value}%`}
        </span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

const ExperienceItem = ({ 
  title, 
  company, 
  period, 
  description 
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: string[]; 
}) => {
  return (
    <div>
      <h4 className="text-lg font-medium">{title}</h4>
      <div className="flex items-center justify-between mb-2">
        <p className="text-primary font-medium">{company}</p>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>
      <ul className="list-disc list-inside text-muted-foreground space-y-1">
        {description.map((item, i) => (
          <li key={i} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resume;
