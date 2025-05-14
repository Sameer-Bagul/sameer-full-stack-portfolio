import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
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
            <span className="text-sm text-primary font-medium">Get in Touch</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Contact Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Have a question or want to work together? Let's connect!
          </motion.p>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-border/40">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="h-12"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      className="min-h-[150px] resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-border/40">
              <CardContent className="p-6 md:p-8 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-8">Contact Information</h3>
                
                <div className="space-y-8 flex-grow">
                  <ContactItem 
                    icon={<Mail className="h-5 w-5" />}
                    title="Email"
                    value="sameerbagul2003@gmail.com"
                    href="mailto:sameerbagul2003@gmail.com"
                  />
                  
                  <ContactItem 
                    icon={<Phone className="h-5 w-5" />}
                    title="Phone"
                    value="+91 9834583904"
                    href="tel:+919834583904"
                  />
                  
                  <ContactItem 
                    icon={<MessageSquare className="h-5 w-5" />}
                    title="Social Media"
                    value="Connect with me"
                    href="#social"
                    isLink={false}
                  />
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-medium mb-3">Working Hours</h4>
                  <p className="text-muted-foreground text-sm">
                    Monday to Friday: 9AM - 5PM<br />
                    Weekend: Available for urgent matters
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ 
  icon, 
  title, 
  value, 
  href, 
  isLink = true 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  href: string; 
  isLink?: boolean;
}) => {
  return (
    <div className="group flex items-start transition-colors">
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        {isLink ? (
          <a 
            href={href} 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-muted-foreground">{value}</p>
        )}
      </div>
    </div>
  );
};
