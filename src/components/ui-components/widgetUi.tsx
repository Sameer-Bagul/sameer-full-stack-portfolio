import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Settings,
  X, 
  Mail, 
  Search,
  Battery,
  Wifi,
  Github,
  Linkedin,
  Code,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  MapPin,
  Globe,
  FileText,
  BookOpen,
  Trophy,
  Building,
  Award,
  Star,
  Sparkles,
  Calculator,
  Layers,
  Brain,
  Server,
  Palette,
  Share2,
  Home,
  Briefcase,
  Image
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

// App Icons with links to relevant sections - EXPANDED WITH SOCIAL MEDIA
const appIcons = [
  // Core Portfolio
  { id: 1, name: 'Home', icon: <Home size={20} />, color: 'bg-gradient-to-br from-violet-500 to-purple-600', link: '/' },
  { id: 2, name: 'Projects', icon: <Briefcase size={20} />, color: 'bg-gradient-to-br from-blue-500 to-cyan-600', link: '/projects' },
  { id: 3, name: 'Resume', icon: <FileText size={20} />, color: 'bg-gradient-to-br from-cyan-500 to-teal-600', link: '/resume' },
  { id: 4, name: 'Blog', icon: <BookOpen size={20} />, color: 'bg-gradient-to-br from-orange-500 to-red-500', link: '/blog' },
  
  // Professional Pages
  { id: 5, name: 'Experience', icon: <Building size={20} />, color: 'bg-gradient-to-br from-green-500 to-emerald-600', link: '/experience' },
  { id: 6, name: 'Achievements', icon: <Trophy size={20} />, color: 'bg-gradient-to-br from-amber-500 to-yellow-600', link: '/achievements' },
  { id: 7, name: 'Skills', icon: <Award size={20} />, color: 'bg-gradient-to-br from-purple-500 to-violet-600', link: '/resume' },
  { id: 8, name: 'Certifications', icon: <Star size={20} />, color: 'bg-gradient-to-br from-yellow-500 to-amber-600', link: '/achievements' },
  
  // Social Media - Professional
  { id: 9, name: 'GitHub', icon: <Github size={20} />, color: 'bg-gradient-to-br from-gray-700 to-gray-900', link: 'https://github.com/Sameer-Bagul' },
  { id: 10, name: 'LinkedIn', icon: <Linkedin size={20} />, color: 'bg-gradient-to-br from-blue-600 to-blue-800', link: 'https://linkedin.com/in/sameer-bagul' },
  { id: 11, name: 'LeetCode', icon: <Code size={20} />, color: 'bg-gradient-to-br from-orange-500 to-yellow-500', link: 'https://leetcode.com/sameerbagul' },
  { id: 12, name: 'Portfolio', icon: <Globe size={20} />, color: 'bg-gradient-to-br from-indigo-500 to-violet-600', link: 'https://sameerbagul.vercel.app' },
  
  // Social Media - Creative
  { id: 13, name: 'Twitter', icon: <Twitter size={20} />, color: 'bg-gradient-to-br from-sky-400 to-blue-500', link: 'https://twitter.com/sameerbagul' },
  { id: 14, name: 'Instagram', icon: <Instagram size={20} />, color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500', link: 'https://instagram.com/sameerbagul' },
  { id: 15, name: 'Pinterest', icon: <Image size={20} />, color: 'bg-gradient-to-br from-red-600 to-red-700', link: 'https://pinterest.com/sameerbagul' },
  { id: 16, name: 'YouTube', icon: <Youtube size={20} />, color: 'bg-gradient-to-br from-red-500 to-red-600', link: 'https://youtube.com/@sameerbagul' },
  
  // Social Media - More Platforms
  { id: 17, name: 'Facebook', icon: <Facebook size={20} />, color: 'bg-gradient-to-br from-blue-500 to-blue-700', link: 'https://facebook.com/sameerbagul' },
  { id: 18, name: 'Medium', icon: <BookOpen size={20} />, color: 'bg-gradient-to-br from-gray-800 to-black', link: 'https://medium.com/@sameerbagul' },
  { id: 19, name: 'Dev.to', icon: <Code size={20} />, color: 'bg-gradient-to-br from-gray-900 to-black', link: 'https://dev.to/sameerbagul' },
  { id: 20, name: 'Dribbble', icon: <Palette size={20} />, color: 'bg-gradient-to-br from-pink-500 to-rose-600', link: 'https://dribbble.com/sameerbagul' },
  
  // Contact & More
  { id: 21, name: 'Email', icon: <Mail size={20} />, color: 'bg-gradient-to-br from-red-500 to-rose-600', link: 'mailto:sameerbagul2004@gmail.com' },
  { id: 22, name: 'Phone', icon: <Phone size={20} />, color: 'bg-gradient-to-br from-teal-500 to-cyan-600', link: 'tel:+917841941033' },
  { id: 23, name: 'Location', icon: <MapPin size={20} />, color: 'bg-gradient-to-br from-pink-500 to-rose-600', link: 'https://maps.google.com/?q=Pune,India' },
  { id: 24, name: 'Share', icon: <Share2 size={20} />, color: 'bg-gradient-to-br from-indigo-500 to-purple-600', link: '#' },
];

const WidgetUi: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWidgetUi, setShowWidgetUi] = useState(false); // Default to false (closed)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

  // Helper function to determine if link is internal
  const isInternalLink = (link: string) => {
    return link.startsWith('/') && !link.startsWith('//');
  };

  // Keep widget UI closed on mobile devices by default
  useEffect(() => {
    if (isMobile) {
      setShowWidgetUi(false);
    }
  }, [isMobile]);

  // Position the widget UI in a good spot on desktop
  useEffect(() => {
    if (!isMobile) {
      setPosition({ 
        x: window.innerWidth - 400, 
        y: 100 
      });
    }
  }, [isMobile]);
  
  // Add event listener to toggle widget UI
  useEffect(() => {
    const handleToggleWidgetUI = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.visible !== undefined) {
        setShowWidgetUi(customEvent.detail.visible);
      } else {
        setShowWidgetUi(prev => !prev);
      }
      
      // Dispatch an event to update any other components that need to know about the state change
      document.dispatchEvent(new CustomEvent('widgetUIStateChange', { 
        detail: { visible: customEvent.detail?.visible !== undefined ? customEvent.detail.visible : !showWidgetUi } 
      }));
    };
    
    document.addEventListener('toggleWidgetUI', handleToggleWidgetUI);
    
    return () => {
      document.removeEventListener('toggleWidgetUI', handleToggleWidgetUI);
    };
  }, [showWidgetUi]);

  if (!showWidgetUi) return null;

  const startDrag = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  return (
    <motion.div 
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      initial={{ x: position.x, y: position.y, opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-[380px] h-[680px] overflow-hidden rounded-3xl shadow-2xl border border-white/20 z-50"
      style={{ 
        background: 'rgba(20, 20, 20, 0.85)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* iOS-style Status Bar */}
      <div 
        className="h-7 w-full flex justify-between items-center px-6 text-white/90 text-xs"
        onPointerDown={startDrag}
        style={{ touchAction: 'none' }}
      >
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <Wifi size={12} />
          <Battery size={12} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-2 pb-3">
        <div className="bg-white/10 text-white/70 rounded-xl h-9 flex items-center px-3 gap-2">
          <Search size={14} />
          <span className="text-xs">Search</span>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-80px)] px-4">
        <div className="flex flex-col gap-4">
          {/* App Icons Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-white/70">Apps</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80"
                >
                  {isEditMode ? <X size={12} /> : <Settings size={12} />}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {appIcons.map((app) => {
                const isInternal = isInternalLink(app.link);
                
                return (
                  <motion.div
                    key={app.id}
                    whileHover={{ scale: isEditMode ? 1 : 1.05 }}
                    animate={{ 
                      rotate: isEditMode ? [-1, 1, -1] : 0,
                      transition: { 
                        repeat: isEditMode ? Infinity : 0, 
                        duration: isEditMode ? 0.2 : 0
                      }
                    }}
                    className={`${app.color} rounded-xl p-2 flex flex-col items-center justify-center aspect-square ${isEditMode ? 'relative' : ''} text-white shadow-lg`}
                  >
                    {isEditMode && (
                      <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-black/50 text-white flex items-center justify-center text-[10px]">
                        ✕
                      </div>
                    )}
                    {isInternal ? (
                      <Link to={app.link} className="flex flex-col items-center justify-center w-full h-full">
                        <div className="p-1 rounded-lg mb-0.5 flex items-center justify-center">
                          {app.icon}
                        </div>
                        <span className="text-[9px] text-white font-medium text-center leading-tight">{app.name}</span>
                      </Link>
                    ) : (
                      <a 
                        href={app.link}
                        target={app.link.startsWith('http') ? '_blank' : undefined}
                        rel={app.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex flex-col items-center justify-center w-full h-full"
                      >
                        <div className="p-1 rounded-lg mb-0.5 flex items-center justify-center">
                          {app.icon}
                        </div>
                        <span className="text-[9px] text-white font-medium text-center leading-tight">{app.name}</span>
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Spacer at bottom for scroll area */}
        <div className="h-6"></div>
      </ScrollArea>
      
      {/* iOS-style Home Indicator */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        <div className="w-10 h-1 rounded-full bg-white/30"></div>
      </div>
      
      {/* Close button */}
      <button
        onClick={() => setShowWidgetUi(false)}
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-white/80"
      >
        <X size={10} />
      </button>
    </motion.div>
  );
};

export default WidgetUi;
