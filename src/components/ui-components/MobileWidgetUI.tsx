import React, { useState, useEffect } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X,
  Battery,
  Wifi,
  Phone,
  MessageCircle,
  Camera,
  MapPin,
  Star,
  Activity,
  Zap,
  Home,
  Briefcase,
  Code,
  Coffee,
  Sun,
  FileText,
  BookOpen,
  Trophy,
  Building,
  Globe,
  Brain,
  Sparkles,
  Calculator,
  Layers,
  Server,
  Palette,
  Download,
  Github,
  Linkedin,
  Mail,
  Calendar,
  Clock,
  Music,
  Search,
  Settings,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Share2,
  Image,
  TrendingUp,
  Award
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// iOS-style App Icons - Comprehensive Portfolio Apps
const iosApps = [
  // Row 1: Core Portfolio Pages
  { id: 1, name: 'Home', icon: <Home size={28} />, color: 'bg-gradient-to-br from-violet-500 to-purple-600', link: '/' },
  { id: 2, name: 'Projects', icon: <Briefcase size={28} />, color: 'bg-gradient-to-br from-blue-500 to-cyan-600', link: '/projects' },
  { id: 3, name: 'Resume', icon: <FileText size={28} />, color: 'bg-gradient-to-br from-cyan-500 to-teal-600', link: '/resume' },
  { id: 4, name: 'Blog', icon: <BookOpen size={28} />, color: 'bg-gradient-to-br from-orange-500 to-red-500', link: '/blog' },
  
  // Row 2: Professional Pages
  { id: 5, name: 'Experience', icon: <Building size={28} />, color: 'bg-gradient-to-br from-green-500 to-emerald-600', link: '/experience' },
  { id: 6, name: 'Achievements', icon: <Trophy size={28} />, color: 'bg-gradient-to-br from-amber-500 to-yellow-600', link: '/achievements' },
  { id: 7, name: 'Skills', icon: <Award size={28} />, color: 'bg-gradient-to-br from-purple-500 to-violet-600', link: '/resume' },
  { id: 8, name: 'Certifications', icon: <Star size={28} />, color: 'bg-gradient-to-br from-yellow-500 to-amber-600', link: '/achievements' },
  
  // Row 3: Social Media - Professional
  { id: 9, name: 'GitHub', icon: <Github size={28} />, color: 'bg-gradient-to-br from-gray-700 to-gray-900', link: 'https://github.com/Sameer-Bagul' },
  { id: 10, name: 'LinkedIn', icon: <Linkedin size={28} />, color: 'bg-gradient-to-br from-blue-600 to-blue-800', link: 'https://linkedin.com/in/sameer-bagul' },
  { id: 11, name: 'LeetCode', icon: <Code size={28} />, color: 'bg-gradient-to-br from-orange-500 to-yellow-500', link: 'https://leetcode.com/sameerbagul' },
  { id: 12, name: 'Portfolio', icon: <Globe size={28} />, color: 'bg-gradient-to-br from-indigo-500 to-violet-600', link: 'https://sameerbagul.vercel.app' },
  
  // Row 4: Social Media - Creative
  { id: 13, name: 'Twitter', icon: <Twitter size={28} />, color: 'bg-gradient-to-br from-sky-400 to-blue-500', link: 'https://twitter.com/sameerbagul' },
  { id: 14, name: 'Instagram', icon: <Instagram size={28} />, color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500', link: 'https://instagram.com/sameerbagul' },
  { id: 15, name: 'Pinterest', icon: <Image size={28} />, color: 'bg-gradient-to-br from-red-600 to-red-700', link: 'https://pinterest.com/sameerbagul' },
  { id: 16, name: 'YouTube', icon: <Youtube size={28} />, color: 'bg-gradient-to-br from-red-500 to-red-600', link: 'https://youtube.com/@sameerbagul' },
  
  // Row 5: Social Media - More
  { id: 17, name: 'Facebook', icon: <Facebook size={28} />, color: 'bg-gradient-to-br from-blue-500 to-blue-700', link: 'https://facebook.com/sameerbagul' },
  { id: 18, name: 'Medium', icon: <BookOpen size={28} />, color: 'bg-gradient-to-br from-gray-800 to-black', link: 'https://medium.com/@sameerbagul' },
  { id: 19, name: 'Dev.to', icon: <Code size={28} />, color: 'bg-gradient-to-br from-gray-900 to-black', link: 'https://dev.to/sameerbagul' },
  { id: 20, name: 'Dribbble', icon: <Palette size={28} />, color: 'bg-gradient-to-br from-pink-500 to-rose-600', link: 'https://dribbble.com/sameerbagul' },
  
  // Row 6: Contact & Location
  { id: 21, name: 'Email', icon: <Mail size={28} />, color: 'bg-gradient-to-br from-red-500 to-rose-600', link: 'mailto:sameerbagul2004@gmail.com' },
  { id: 22, name: 'Phone', icon: <Phone size={28} />, color: 'bg-gradient-to-br from-teal-500 to-cyan-600', link: 'tel:+917841941033' },
  { id: 23, name: 'Location', icon: <MapPin size={28} />, color: 'bg-gradient-to-br from-pink-500 to-rose-600', link: 'https://maps.google.com/?q=Pune,India' },
  { id: 24, name: 'Share', icon: <Share2 size={28} />, color: 'bg-gradient-to-br from-indigo-500 to-purple-600', link: '#' },
  
  // Row 7: Featured Projects
  { id: 25, name: 'Bug0', icon: <Zap size={28} />, color: 'bg-gradient-to-br from-yellow-500 to-orange-600', link: '/experience' },
  { id: 26, name: 'Skillify', icon: <Sparkles size={28} />, color: 'bg-gradient-to-br from-purple-600 to-violet-700', link: '/projects' },
  { id: 27, name: 'Dev Library', icon: <BookOpen size={28} />, color: 'bg-gradient-to-br from-emerald-500 to-green-600', link: 'https://developers-library.vercel.app/' },
  { id: 28, name: 'Billing App', icon: <Calculator size={28} />, color: 'bg-gradient-to-br from-slate-600 to-gray-700', link: '/projects' },
  
  // Row 8: Tech Stack
  { id: 29, name: 'MERN Stack', icon: <Layers size={28} />, color: 'bg-gradient-to-br from-green-600 to-teal-700', link: '/resume' },
  { id: 30, name: 'AI/ML', icon: <Brain size={28} />, color: 'bg-gradient-to-br from-pink-600 to-purple-700', link: '/resume' },
  { id: 31, name: 'DevOps', icon: <Server size={28} />, color: 'bg-gradient-to-br from-sky-500 to-blue-600', link: '/resume' },
  { id: 32, name: 'Design', icon: <Palette size={28} />, color: 'bg-gradient-to-br from-rose-500 to-pink-600', link: '/resume' },
  
  // Row 9: Utilities (Page 2)
  { id: 33, name: 'Calendar', icon: <Calendar size={28} />, color: 'bg-gradient-to-br from-red-500 to-rose-600', link: '#' },
  { id: 34, name: 'Clock', icon: <Clock size={28} />, color: 'bg-gradient-to-br from-black to-gray-800', link: '#' },
  { id: 35, name: 'Weather', icon: <Sun size={28} />, color: 'bg-gradient-to-br from-blue-400 to-cyan-500', link: '#' },
  { id: 36, name: 'Music', icon: <Music size={28} />, color: 'bg-gradient-to-br from-purple-600 to-violet-600', link: '#' },
  
  // Row 10: More Utilities
  { id: 37, name: 'Photos', icon: <Camera size={28} />, color: 'bg-gradient-to-br from-teal-500 to-cyan-600', link: '#' },
  { id: 38, name: 'Messages', icon: <MessageCircle size={28} />, color: 'bg-gradient-to-br from-green-500 to-emerald-600', link: '#' },
  { id: 39, name: 'Search', icon: <Search size={28} />, color: 'bg-gradient-to-br from-gray-500 to-slate-600', link: '#' },
  { id: 40, name: 'Settings', icon: <Settings size={28} />, color: 'bg-gradient-to-br from-gray-600 to-gray-800', link: '#' },
  
  // Row 11: Quick Actions
  { id: 41, name: 'Download CV', icon: <Download size={28} />, color: 'bg-gradient-to-br from-indigo-500 to-blue-600', link: '/resume' },
  { id: 42, name: 'Coffee Chat', icon: <Coffee size={28} />, color: 'bg-gradient-to-br from-amber-600 to-orange-700', link: '#' },
  { id: 43, name: 'Analytics', icon: <TrendingUp size={28} />, color: 'bg-gradient-to-br from-green-500 to-emerald-600', link: '#' },
  { id: 44, name: 'Activity', icon: <Activity size={28} />, color: 'bg-gradient-to-br from-blue-500 to-cyan-600', link: '#' },
];

const MobileWidgetUI: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showWidgetUi, setShowWidgetUi] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

  // Helper function to determine if link is internal
  const isInternalLink = (link: string) => {
    return link.startsWith('/') && !link.startsWith('//');
  };

  // Only show on mobile devices
  useEffect(() => {
    if (!isMobile) {
      setShowWidgetUi(false);
      return;
    }
  }, [isMobile]);

  // Add event listener to toggle widget UI
  useEffect(() => {
    const handleToggleWidgetUI = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (isMobile) {
        if (customEvent.detail && customEvent.detail.visible !== undefined) {
          setShowWidgetUi(customEvent.detail.visible);
        } else {
          setShowWidgetUi(prev => !prev);
        }
      }
    };

    document.addEventListener('toggleWidgetUI', handleToggleWidgetUI);

    return () => {
      document.removeEventListener('toggleWidgetUI', handleToggleWidgetUI);
    };
  }, [isMobile]);

  if (!showWidgetUi || !isMobile) return null;

  const handleDragEnd = (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swipe right - previous page
      setCurrentPage(prev => Math.max(0, prev - 1));
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left - next page
      setCurrentPage(prev => Math.min(2, prev + 1)); // 3 pages total (0, 1, 2)
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(event, info) => {
        if (info.offset.y > 100) {
          setShowWidgetUi(false);
        }
      }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
    >
      {/* iOS-style Status Bar */}
      <div className="h-11 w-full flex justify-between items-center px-6 text-white/90 text-sm font-medium bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-1">
          <Wifi size={14} />
          <span className="text-xs">LTE</span>
        </div>
        <div className="flex items-center gap-1">
          <Battery size={14} className="text-green-400" />
          <span className="text-xs">100%</span>
        </div>
        <div>9:41</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="h-full flex"
          style={{ width: '300%' }} // 3 pages
        >
          {/* Page 1: Home Screen */}
          <div className="w-full h-full p-4 pt-8">
            {/* App Grid */}
            <div className="flex-1 pb-4">
              <div className="grid grid-cols-4 gap-6">
                {iosApps.slice(0, 24).map((app) => {
                  const isInternal = isInternalLink(app.link);
                  
                  return (
                    <motion.div
                      key={app.id}
                      whileTap={{ scale: 0.85 }}
                      className="flex flex-col items-center gap-2 group relative"
                    >
                      {isInternal ? (
                        <Link
                          to={app.link}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className={`w-16 h-16 rounded-[22%] ${app.color} flex items-center justify-center shadow-xl group-active:scale-90 transition-transform relative overflow-hidden`}>
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                            <div className="text-white relative z-10">
                              {app.icon}
                            </div>
                          </div>
                          <span className="text-[11px] text-white/95 font-medium text-center leading-tight max-w-[70px] truncate">
                            {app.name}
                          </span>
                        </Link>
                      ) : (
                        <a
                          href={app.link}
                          target={app.link.startsWith('http') ? '_blank' : undefined}
                          rel={app.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className={`w-16 h-16 rounded-[22%] ${app.color} flex items-center justify-center shadow-xl group-active:scale-90 transition-transform relative overflow-hidden`}>
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                            <div className="text-white relative z-10">
                              {app.icon}
                            </div>
                          </div>
                          <span className="text-[11px] text-white/95 font-medium text-center leading-tight max-w-[70px] truncate">
                            {app.name}
                          </span>
                        </a>
                      )}
                      {isEditMode && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X size={12} className="text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Page 2: More Apps */}
          <div className="w-full h-full p-4 pt-8">
            {/* More Apps Grid */}
            <div className="grid grid-cols-4 gap-6 pb-4">
              {iosApps.slice(24, 48).map((app) => {
                const isInternal = isInternalLink(app.link);
                
                return (
                  <motion.div
                    key={app.id}
                    whileTap={{ scale: 0.85 }}
                    className="flex flex-col items-center gap-2 group relative"
                  >
                    {isInternal ? (
                      <Link
                        to={app.link}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`w-16 h-16 rounded-[22%] ${app.color} flex items-center justify-center shadow-xl group-active:scale-90 transition-transform relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                          <div className="text-white relative z-10">
                            {app.icon}
                          </div>
                        </div>
                        <span className="text-[11px] text-white/95 font-medium text-center leading-tight max-w-[70px] truncate">
                          {app.name}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={app.link}
                        target={app.link.startsWith('http') ? '_blank' : undefined}
                        rel={app.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`w-16 h-16 rounded-[22%] ${app.color} flex items-center justify-center shadow-xl group-active:scale-90 transition-transform relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                          <div className="text-white relative z-10">
                            {app.icon}
                          </div>
                        </div>
                        <span className="text-[11px] text-white/95 font-medium text-center leading-tight max-w-[70px] truncate">
                          {app.name}
                        </span>
                      </a>
                    )}
                    {isEditMode && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <X size={12} className="text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Page 3: Even More Apps */}
          <div className="w-full h-full p-4 pt-8">
            <div className="grid grid-cols-4 gap-6 pb-4">
              {iosApps.slice(48).map((app) => {
                const isInternal = isInternalLink(app.link);
                
                return (
                  <motion.div
                    key={app.id}
                    whileTap={{ scale: 0.85 }}
                    className="flex flex-col items-center gap-2 group relative"
                  >
                    {isInternal ? (
                      <Link
                        to={app.link}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`w-16 h-16 rounded-[22%] ${app.color} flex items-center justify-center shadow-xl group-active:scale-90 transition-transform relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                          <div className="text-white relative z-10">
                            {app.icon}
                          </div>
                        </div>
                        <span className="text-[11px] text-white/95 font-medium text-center leading-tight max-w-[70px] truncate">
                          {app.name}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={app.link}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`w-16 h-16 rounded-[22%] ${app.color} flex items-center justify-center shadow-xl group-active:scale-90 transition-transform relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                          <div className="text-white relative z-10">
                            {app.icon}
                          </div>
                        </div>
                        <span className="text-[11px] text-white/95 font-medium text-center leading-tight max-w-[70px] truncate">
                          {app.name}
                        </span>
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Page Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((page) => (
          <div
            key={page}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentPage === page ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* iOS-style Dock */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/10">
        <div className="flex justify-center items-end py-2">
          <div className="flex gap-4 px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-xl">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link
                to="/"
                className="flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Home size={28} className="text-white" />
                </div>
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Link
                to="/projects"
                className="flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Briefcase size={28} className="text-white" />
                </div>
              </Link>
            </motion.div>

            <motion.a
              href="mailto:sameerbagul2004@gmail.com"
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                <Mail size={28} className="text-white" />
              </div>
            </motion.a>

            <motion.button
              onClick={() => setShowWidgetUi(false)}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
                <X size={28} className="text-white" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center py-1.5">
          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileWidgetUI;