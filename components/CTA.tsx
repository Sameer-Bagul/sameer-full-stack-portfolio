'use client';

import React, { useState, memo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import {
    Send,
    Linkedin,
    Github,
    Twitter,
    Mail,
    ExternalLink,
    CheckCircle2,
    Loader2,
    Calendar,
    Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage } from '@/lib/api';
import { PERSONAL_INFO } from '@/lib/constants/personalInfo';

const SocialLink = memo(({ href, icon: Icon, label, color }: { href: string, icon: any, label: string, color: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
            "flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group",
            color
        )}
    >
        <div className="flex items-center gap-3">
            <Icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">{label}</span>
        </div>
        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
));

export default function CTA() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        template: 'Project Collaboration',
        message: ''
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await sendMessage({
                name: formData.name,
                email: formData.email,
                subject: formData.template,
                message: formData.message
            });

            setStatus('success');
            setFormData({ name: '', email: '', template: 'Project Collaboration', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error('Error sending message:', err);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className={cn(STYLES.section, "relative overflow-hidden w-full")}>
            <div className={cn(STYLES.container, "px-4 sm:px-6")}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">

                    {/* Left Side: Info & Socials */}
                    <div className="lg:col-span-5 space-y-8 sm:space-y-12">
                        <div className="space-y-4 sm:space-y-6 font-seona not-italic">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black lowercase tracking-tighter leading-none">
                                let's <span className="text-primary">connect</span>
                            </h2>
                            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-sm">
                                Have a legendary idea or just want to chat? My inbox is always open.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                    <Globe className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-none mb-1 font-seona not-italic">Based in</p>
                                    <p className="text-sm font-bold uppercase tracking-tight font-seona not-italic">{PERSONAL_INFO.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-none mb-1 font-seona not-italic">Status</p>
                                    <p className="text-sm font-bold uppercase tracking-tight font-seona not-italic">Available for hire</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 mb-6">Find me on</p>
                            <div className="flex flex-wrap gap-6">
                                {[
                                    { icon: Github, href: PERSONAL_INFO.socials.github, label: "Github" },
                                    { icon: Linkedin, href: PERSONAL_INFO.socials.linkedin, label: "LinkedIn" },
                                    { icon: Twitter, href: PERSONAL_INFO.socials.x, label: "X / Twitter" }
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground/60 hover:text-primary transition-colors duration-300"
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7 bg-zinc-50/50 dark:bg-zinc-900/30 p-6 sm:p-8 md:p-12 rounded-2xl border border-zinc-100 dark:border-zinc-900">
                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Name</label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Sameer Bagul"
                                        className="bg-transparent border-zinc-200 dark:border-zinc-800 h-12 rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Email</label>
                                    <Input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="hello@example.com"
                                        className="bg-transparent border-zinc-200 dark:border-zinc-800 h-12 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Inquiry Type</label>
                                <select
                                    className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 h-12 rounded-lg px-4 outline-none text-sm font-medium focus:border-primary transition-colors appearance-none cursor-pointer"
                                    value={formData.template}
                                    onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                                >
                                    <option className="bg-background" value="Project Collaboration">Project Collaboration</option>
                                    <option className="bg-background" value="Career Guidance">Career Guidance</option>
                                    <option className="bg-background" value="Consulting Inquiries">Consulting Inquiries</option>
                                    <option className="bg-background" value="Just saying Hi!">Just saying Hi!</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="what's on your mind?"
                                    className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 outline-none text-sm font-medium focus:border-primary transition-colors resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full h-14 rounded-lg text-sm font-black uppercase tracking-widest gap-2 transition-all"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        sending...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        sent successfully
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        send message
                                    </>
                                )}
                            </Button>

                            <AnimatePresence>
                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
                                    >
                                        Something went wrong. Please try again.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
