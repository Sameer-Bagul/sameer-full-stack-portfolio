import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  watermark: string;
  label: string;
  title: React.ReactNode;
  description: string;
}

export default function SectionHeading({ watermark, label, title, description }: SectionHeadingProps) {
  return (
    <div className="relative w-full mb-16 md:mb-32">
      {/* Watermark Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden flex items-center pointer-events-none z-0">
        <span className="text-[8rem] md:text-[14rem] lg:text-[20rem] font-black uppercase text-white/[0.03] whitespace-nowrap select-none font-seona leading-none tracking-tighter mix-blend-screen">
          {watermark}
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        {/* Left Column: Label and Title */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6 md:mb-10"
          >
            <div className="w-12 md:w-16 h-[2px] bg-[#F46C38]" />
            <span className="font-dm-mono text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold text-[#F46C38]">
              {label}
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-seona uppercase tracking-tighter text-white leading-[1.1]">
              {title}
            </h2>
          </motion.div>
        </div>

        {/* Right Column: Description */}
        <div className="lg:col-span-5 lg:pl-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg font-light">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
