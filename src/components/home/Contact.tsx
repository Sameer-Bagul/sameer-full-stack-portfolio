
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
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
    <section id="contact" className="py-20">
      <div className="container">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-sm font-medium text-primary mb-2">GET IN TOUCH</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Contact Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="Subject"
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
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-6 flex-grow">
                  <ContactItem 
                    icon={<Mail className="h-5 w-5" />}
                    title="Email"
                    value="email@example.com"
                    href="mailto:email@example.com"
                  />
                  
                  <ContactItem 
                    icon={<Phone className="h-5 w-5" />}
                    title="Phone"
                    value="+1 (234) 567-8901"
                    href="tel:+12345678901"
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
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        {isLink ? (
          <a href={href} className="text-muted-foreground hover:text-primary transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-muted-foreground">{value}</p>
        )}
      </div>
    </div>
  );
};
