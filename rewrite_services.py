import os

components = '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/components'
path = os.path.join(components, 'Services.tsx')

content = """'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    name: 'AI & Intelligence Systems',
    pitch: 'Stop losing hours to repetitive decisions. I build AI systems that learn your business logic and handle the cognitive load.',
    tags: ['LLMs', 'RAG', 'LangChain'],
  },
  {
    num: '02',
    name: 'SaaS Tools Development',
    pitch: 'Turn your product idea into a revenue-generating platform. I handle the full stack so you scale without rewrites.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    num: '03',
    name: 'Web Development',
    pitch: 'Your website is your best salesperson. I build fast, beautiful, and search-optimised web experiences.',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    num: '04',
    name: 'App Development',
    pitch: 'Your customers are already on their phones. I build cross-platform mobile apps that feel native and load instantly.',
    tags: ['React Native', 'Expo', 'iOS/Android'],
  },
  {
    num: '05',
    name: 'QA & Automation',
    pitch: 'Every bug costs you trust. I set up automated test suites and workflow automations so releases are events to celebrate.',
    tags: ['Playwright', 'Vitest', 'CI/CD'],
  },
  {
    num: '06',
    name: 'UI/UX & Design',
    pitch: 'Design is the first argument you make to your customer. I create interfaces that are genuinely enjoyable.',
    tags: ['Figma', 'Design Systems', 'WCAG'],
  }
];

export default function Services() {
  return (
    <section className="py-24 sm:py-32 w-full bg-[#151312] overflow-hidden">
      <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
            <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-seona uppercase tracking-tighter text-white leading-none mb-6">
                Services
            </h2>
            <p className="text-zinc-400 max-w-xl text-lg md:text-xl font-light">
                What I bring to the table. Precision engineering meets premium design.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 hover:bg-white/10 transition-colors duration-500 flex flex-col"
            >
                <div className="flex justify-between items-start mb-12">
                    <span className="font-dm-mono text-[#C5FF41] text-sm tracking-[0.2em]">{service.num}</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#C5FF41] group-hover:text-black transition-colors duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
                
                <h3 className="font-seona uppercase tracking-tighter text-3xl md:text-4xl text-white mb-4 leading-tight">
                    {service.name}
                </h3>
                
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 flex-grow">
                    {service.pitch}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {service.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 rounded-full bg-black/30 border border-white/5 text-[10px] md:text-xs font-dm-mono tracking-wider text-zinc-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"""

with open(path, 'w') as f:
    f.write(content)

print("Services rewritten")
