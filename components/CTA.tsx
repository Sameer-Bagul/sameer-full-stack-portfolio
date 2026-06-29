'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function CTA() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        template: 'Project Collaboration',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', template: 'Project Collaboration', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="py-24 sm:py-32 w-full">
            <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12"
                >
                    {/* Background noise/texture */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`
                    }}></div>

                    {/* Ambient Glow */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4F00]/10 rounded-full blur-[120px] pointer-events-none"></div>

                    {/* Text Section */}
                    <div className="flex-1 relative z-10 text-center lg:text-left w-full lg:w-auto">
                        <h2 className="font-seona uppercase tracking-tighter text-[3.5rem] sm:text-[5rem] lg:text-[7rem] text-white leading-[0.9] mb-6">
                            Let's Build <br className="hidden lg:block" /> 
                            <span className="text-[#FF4F00] italic">Together</span>
                        </h2>
                        <p className="text-zinc-400 font-light text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                            Looking for a frontend engineer who can design, architect, and ship? Let's talk about your next project.
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="w-full lg:w-[450px] shrink-0 relative z-10 bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Sameer Bagul"
                                        className="w-full bg-[#0A0A0A] border border-white/5 text-white placeholder:text-white/20 h-12 rounded-xl px-4 outline-none text-sm font-medium focus:border-[#FF4F00]/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="hello@example.com"
                                        className="w-full bg-[#0A0A0A] border border-white/5 text-white placeholder:text-white/20 h-12 rounded-xl px-4 outline-none text-sm font-medium focus:border-[#FF4F00]/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Inquiry Type</label>
                                <select
                                    className="w-full bg-[#0A0A0A] border border-white/5 text-white h-12 rounded-xl px-4 outline-none text-sm font-medium focus:border-[#FF4F00]/50 transition-colors appearance-none cursor-pointer"
                                    value={formData.template}
                                    onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                                >
                                    <option className="bg-[#111111] text-white" value="Project Collaboration">Project Collaboration</option>
                                    <option className="bg-[#111111] text-white" value="Career Guidance">Career Guidance</option>
                                    <option className="bg-[#111111] text-white" value="Consulting Inquiries">Consulting Inquiries</option>
                                    <option className="bg-[#111111] text-white" value="Just saying Hi!">Just saying Hi!</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="What's on your mind?"
                                    className="w-full bg-[#0A0A0A] border border-white/5 text-white placeholder:text-white/20 rounded-xl p-4 outline-none text-sm font-medium focus:border-[#FF4F00]/50 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full h-14 rounded-xl bg-[#FF4F00] text-white text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FF4F00]/90 transition-all font-dm-mono disabled:opacity-50 shadow-[0_0_20px_rgba(255,79,0,0.2)] hover:shadow-[0_0_30px_rgba(255,79,0,0.4)]"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Sent Successfully
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Message
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-[#FF4F00] text-[10px] font-black uppercase tracking-widest text-center"
                                    >
                                        Something went wrong. Please try again.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
