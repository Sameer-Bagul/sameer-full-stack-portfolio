
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from 'lucide-react';

const testimonials = [
  {
    content: "Working with this developer was a game-changer for our project. Their attention to detail and technical expertise far exceeded our expectations.",
    author: "Alex Morgan",
    position: "CTO, TechVision",
    image: "/placeholder.svg"
  },
  {
    content: "Exceptional problem-solving skills and a keen eye for design. Delivered our platform on time and with features we hadn't even thought of.",
    author: "Sam Taylor",
    position: "Product Manager, InnovateCo",
    image: "/placeholder.svg"
  },
  {
    content: "Their ability to translate complex requirements into elegant solutions made all the difference. A true professional who goes above and beyond.",
    author: "Jamie Lee",
    position: "Founder, StartupLaunch",
    image: "/placeholder.svg"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <div className="text-center">
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-3">
              What People Say
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto">
              Feedback from clients and colleagues about my work and collaboration style.
            </motion.p>
          </div>
          
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <QuoteIcon className="text-primary/30 w-10 h-10 mb-4" />
                    <p className="italic text-foreground/80 mb-6 flex-grow">"{testimonial.content}"</p>
                    <div className="flex items-center mt-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={testimonial.image} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
