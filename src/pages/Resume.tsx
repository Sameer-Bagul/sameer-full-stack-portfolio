import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award, Code, Languages, User, Mail, Phone, MapPin, Calendar, Github, Linkedin, Globe, Heart, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="container max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Professional Resume</h1>
            <p className="text-muted-foreground">Full Stack Developer & UI/UX Enthusiast</p>
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
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary" />
                    <span>+1 (234) 567-8901</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-primary" />
                    <span>linkedin.com/in/johndoe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-primary" />
                    <span>github.com/johndoe</span>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    navigator.clipboard.writeText("john.doe@example.com");
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
                        <h2 className="text-xl font-bold">John Doe</h2>
                        <p className="text-muted-foreground">Full Stack Developer</p>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail size={16} className="text-primary" />
                          <span className="text-sm">john.doe@example.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone size={16} className="text-primary" />
                          <span className="text-sm">+1 (234) 567-8901</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-primary" />
                          <span className="text-sm">San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Linkedin size={16} className="text-primary" />
                          <span className="text-sm">linkedin.com/in/johndoe</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Github size={16} className="text-primary" />
                          <span className="text-sm">github.com/johndoe</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe size={16} className="text-primary" />
                          <span className="text-sm">johndoe.com</span>
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
                          title="Senior Full Stack Developer"
                          company="Tech Innovations Inc."
                          period="2021 - Present"
                          description={[
                            "Lead the development of the company's flagship SaaS product, improving performance by 40%",
                            "Manage a team of 5 developers, implementing Agile methodologies for efficient project delivery",
                            "Architect and implement RESTful APIs and microservices using Node.js and Express",
                            "Develop and maintain the front-end using React, Redux, and TypeScript"
                          ]}
                        />
                        
                        <Separator />
                        
                        <ExperienceItem 
                          title="Web Developer"
                          company="Digital Solutions Agency"
                          period="2018 - 2021"
                          description={[
                            "Built responsive websites and web applications for clients across various industries",
                            "Implemented modern front-end frameworks (React, Vue.js) to create interactive UIs",
                            "Collaborated with designers to transform mockups into functioning websites",
                            "Optimized database queries and API endpoints to improve application performance"
                          ]}
                        />
                        
                        <Separator />
                        
                        <ExperienceItem 
                          title="Junior Web Developer"
                          company="WebCraft Studio"
                          period="2016 - 2018"
                          description={[
                            "Developed and maintained websites for small to medium-sized businesses",
                            "Created custom WordPress themes and plugins",
                            "Implemented responsive designs using HTML, CSS, and JavaScript",
                            "Assisted senior developers with larger projects and client meetings"
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
                        Passionate and dedicated Full Stack Developer with 5+ years of experience in designing and developing modern web applications. 
                        Specialized in JavaScript frameworks, responsive design, and building scalable back-end solutions. Strong problem-solving skills 
                        and a collaborative team player with excellent communication abilities. Committed to writing clean, efficient code and staying 
                        current with emerging technologies and industry best practices. Proven track record of delivering high-quality projects on time 
                        and exceeding client expectations.
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
                          title="Master of Science in Computer Science"
                          company="Stanford University"
                          period="2014 - 2016"
                          description={[
                            "Specialized in Software Engineering and Human-Computer Interaction",
                            "Thesis: 'Optimizing User Experience in Progressive Web Applications'",
                            "GPA: 3.8/4.0",
                            "Participated in research projects focused on web accessibility and performance optimization"
                          ]}
                        />
                        
                        <Separator />
                        
                        <ExperienceItem 
                          title="Bachelor of Science in Computer Science"
                          company="University of California, Berkeley"
                          period="2010 - 2014"
                          description={[
                            "Minor in Business Administration",
                            "Participated in ACM Programming Competitions",
                            "GPA: 3.7/4.0",
                            "Senior project: 'Real-time Collaborative Web Editor' - built using WebSockets and React"
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar size={16} />
                        Professional Development
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          {
                            title: "Advanced React Patterns Workshop",
                            provider: "Frontend Masters",
                            year: "2023"
                          },
                          {
                            title: "System Design and Architecture",
                            provider: "Tech Conference",
                            year: "2022"
                          },
                          {
                            title: "Algorithms & Data Structures Masterclass",
                            provider: "Udemy",
                            year: "2021"
                          },
                          {
                            title: "Agile Project Management",
                            provider: "Scrum Alliance",
                            year: "2020"
                          }
                        ].map((course, i) => (
                          <div key={i} className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                            <h4 className="font-medium">{course.title}</h4>
                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                              <span>{course.provider}</span>
                              <span>{course.year}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award size={16} />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        {[
                          {
                            name: "AWS Certified Solutions Architect",
                            year: "2023"
                          },
                          {
                            name: "Google Cloud Professional Developer",
                            year: "2022"
                          },
                          {
                            name: "MongoDB Certified Developer",
                            year: "2021"
                          },
                          {
                            name: "Microsoft Certified: Azure Developer Associate",
                            year: "2020"
                          },
                          {
                            name: "Certified Scrum Master",
                            year: "2019"
                          }
                        ].map((cert, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <div>
                              <span className="font-medium">{cert.name}</span>
                              <span className="text-muted-foreground text-sm ml-2">{cert.year}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                    <CardHeader className="bg-muted/50 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Languages size={16} />
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <SkillBar name="English" value={100} label="Native" />
                        <SkillBar name="Spanish" value={75} label="Professional" />
                        <SkillBar name="French" value={40} label="Basic" />
                        <SkillBar name="German" value={25} label="Elementary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="animate-fade-in mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code size={16} />
                      Frontend Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <SkillBar name="React" value={90} />
                      <SkillBar name="TypeScript" value={85} />
                      <SkillBar name="HTML/CSS" value={95} />
                      <SkillBar name="Vue.js" value={70} />
                      <SkillBar name="Next.js" value={80} />
                      <SkillBar name="Responsive Design" value={90} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code size={16} />
                      Backend Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <SkillBar name="Node.js" value={85} />
                      <SkillBar name="Express" value={80} />
                      <SkillBar name="Python" value={70} />
                      <SkillBar name="GraphQL" value={75} />
                      <SkillBar name="RESTful APIs" value={90} />
                      <SkillBar name="Java" value={65} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code size={16} />
                      Database & DevOps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <SkillBar name="MongoDB" value={85} />
                      <SkillBar name="PostgreSQL" value={75} />
                      <SkillBar name="Docker" value={80} />
                      <SkillBar name="AWS" value={75} />
                      <SkillBar name="CI/CD" value={70} />
                      <SkillBar name="Git" value={95} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code size={16} />
                      UI/UX & Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <SkillBar name="Figma" value={85} />
                      <SkillBar name="Adobe XD" value={75} />
                      <SkillBar name="Wireframing" value={90} />
                      <SkillBar name="Prototyping" value={80} />
                      <SkillBar name="UI Design" value={75} />
                      <SkillBar name="User Research" value={65} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code size={16} />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <SkillBar name="Communication" value={90} />
                      <SkillBar name="Team Leadership" value={85} />
                      <SkillBar name="Problem Solving" value={95} />
                      <SkillBar name="Time Management" value={80} />
                      <SkillBar name="Adaptability" value={85} />
                      <SkillBar name="Critical Thinking" value={90} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code size={16} />
                      Project Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <SkillBar name="Agile/Scrum" value={90} />
                      <SkillBar name="Jira" value={85} />
                      <SkillBar name="Trello" value={80} />
                      <SkillBar name="Risk Management" value={75} />
                      <SkillBar name="Resource Allocation" value={70} />
                      <SkillBar name="Sprint Planning" value={85} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="animate-fade-in mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award size={16} />
                      Professional Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {[
                        "Led team that increased application performance by 40%, resulting in 25% increase in user retention",
                        "Implemented CI/CD pipeline that reduced deployment time by 60%",
                        "Received 'Developer of the Year' award at Tech Innovations Inc. in 2022",
                        "Mentored 12 junior developers who have progressed to mid-level and senior roles",
                        "Delivered presentations at three industry conferences on modern web development practices"
                      ].map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award size={16} />
                      Academic & Personal Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {[
                        "Graduated with Honors from Stanford University Master's program",
                        "Received full scholarship for academic excellence during undergraduate studies",
                        "Published research paper on 'Progressive Web App Performance Optimization' in Tech Journal",
                        "Contributed to three major open-source projects with over 1000+ stars on GitHub",
                        "Won first place in University Hackathon for developing an accessible learning platform"
                      ].map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md md:col-span-2">
                  <CardHeader className="bg-muted/50 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code size={16} />
                      Notable Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "E-commerce Platform Redesign",
                          description: "Led complete redesign and development of a major retail e-commerce platform, increasing conversion rates by 35% and improving mobile engagement",
                          technologies: ["React", "Node.js", "MongoDB", "AWS"]
                        },
                        {
                          title: "Health Tracking Mobile App",
                          description: "Developed a cross-platform health tracking application with real-time data synchronization and personalized analytics dashboard",
                          technologies: ["React Native", "Firebase", "TypeScript", "Redux"]
                        },
                        {
                          title: "Enterprise Resource Planning System",
                          description: "Architected and implemented a modular ERP system for manufacturing businesses, integrating with legacy systems and enhancing operational efficiency",
                          technologies: ["Vue.js", "Spring Boot", "PostgreSQL", "Docker"]
                        },
                        {
                          title: "Educational Content Platform",
                          description: "Created an accessible educational platform with interactive content for students with diverse learning needs, featuring real-time collaboration",
                          technologies: ["Next.js", "GraphQL", "MongoDB", "WebRTC"]
                        }
                      ].map((project, i) => (
                        <Card key={i} className="border border-border/40 bg-card/50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-primary">{project.title}</h4>
                            <p className="text-sm text-muted-foreground mt-2 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, j) => (
                                <span key={j} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
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
