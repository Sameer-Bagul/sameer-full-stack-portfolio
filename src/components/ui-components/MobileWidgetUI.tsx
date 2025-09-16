import React, { useState, useEffect } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import {
  ArrowDownUp,
  Plus,
  Settings,
  X,
  Clock,
  Calendar,
  Music,
  Image,
  Mail,
  Search,
  Info,
  Battery,
  Wifi,
  Phone,
  MessageCircle,
  Camera,
  MapPin,
  Heart,
  Star,
  TrendingUp,
  Activity,
  Zap,
  Home,
  User,
  Briefcase,
  Code,
  Coffee,
  Sun
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// iOS-style Widgets
const iosWidgets = [
  {
    id: 1,
    title: 'Weather',
    size: 'small',
    content: 'Sunny, 28°C',
    subtitle: 'Pune, India',
    icon: <Sun size={20} className="text-yellow-400" />,
    color: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-400/30'
  },
  {
    id: 2,
    title: 'Calendar',
    size: 'medium',
    content: 'Next: Team Meeting',
    subtitle: '2:00 PM - 3:00 PM',
    icon: <Calendar size={20} className="text-red-400" />,
    color: 'bg-gradient-to-br from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-400/30'
  },
  {
    id: 3,
    title: 'Fitness',
    size: 'small',
    content: '1,247 steps',
    subtitle: 'Goal: 10,000',
    icon: <Activity size={20} className="text-green-400" />,
    color: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-400/30'
  },
  {
    id: 4,
    title: 'Music',
    size: 'large',
    content: 'Now Playing',
    subtitle: 'Blinding Lights - The Weeknd',
    icon: <Music size={24} className="text-purple-400" />,
    color: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-400/30'
  }
];

// iOS-style App Icons
const iosApps = [
  { id: 1, name: 'Portfolio', icon: <Briefcase size={28} />, color: 'bg-gradient-to-br from-violet-500 to-purple-600', link: '/projects' },
  { id: 2, name: 'Resume', icon: <User size={28} />, color: 'bg-gradient-to-br from-blue-500 to-cyan-600', link: '/resume' },
  { id: 3, name: 'Blog', icon: <Mail size={28} />, color: 'bg-gradient-to-br from-orange-500 to-red-500', link: '/blog' },
  { id: 4, name: 'Skills', icon: <Code size={28} />, color: 'bg-gradient-to-br from-green-500 to-emerald-600', link: '/resume' },
  { id: 5, name: 'Projects', icon: <Star size={28} />, color: 'bg-gradient-to-br from-pink-500 to-rose-600', link: '/projects' },
  { id: 6, name: 'Contact', icon: <Phone size={28} />, color: 'bg-gradient-to-br from-indigo-500 to-blue-600', link: 'mailto:sameerbagul2004@gmail.com' },
  { id: 7, name: 'GitHub', icon: <Code size={28} />, color: 'bg-gradient-to-br from-gray-700 to-gray-900', link: 'https://github.com/Sameer-Bagul' },
  { id: 8, name: 'LinkedIn', icon: <User size={28} />, color: 'bg-gradient-to-br from-blue-600 to-blue-800', link: 'https://linkedin.com/in/sameer-bagul' },
  { id: 9, name: 'Coffee', icon: <Coffee size={28} />, color: 'bg-gradient-to-br from-amber-600 to-orange-600', link: '#' },
  { id: 10, name: 'Music', icon: <Music size={28} />, color: 'bg-gradient-to-br from-purple-600 to-violet-600', link: '#' },
  { id: 11, name: 'Photos', icon: <Camera size={28} />, color: 'bg-gradient-to-br from-teal-500 to-cyan-600', link: '#' },
  { id: 12, name: 'Maps', icon: <MapPin size={28} />, color: 'bg-gradient-to-br from-red-500 to-pink-600', link: '#' },
  { id: 13, name: 'Messages', icon: <MessageCircle size={28} />, color: 'bg-gradient-to-br from-green-500 to-emerald-600', link: '#' },
  { id: 14, name: 'Settings', icon: <Settings size={28} />, color: 'bg-gradient-to-br from-gray-500 to-gray-700', link: '#' },
  { id: 15, name: 'Calendar', icon: <Calendar size={28} />, color: 'bg-gradient-to-br from-red-500 to-rose-600', link: '#' },
  { id: 16, name: 'Clock', icon: <Clock size={28} />, color: 'bg-gradient-to-br from-black to-gray-800', link: '#' },
];

const MobileWidgetUI: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showWidgetUi, setShowWidgetUi] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

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
      setCurrentPage(prev => Math.min(1, prev + 1));
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
          style={{ width: '200%' }}
        >
          {/* Page 1: Home Screen */}
          <div className="w-full h-full p-4">
            {/* Widgets Section */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {iosWidgets.map((widget) => (
                  <motion.div
                    key={widget.id}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-2xl p-4 text-white backdrop-blur-xl border ${widget.color} ${widget.borderColor} ${
                      widget.size === 'large' ? 'col-span-2 row-span-2' :
                      widget.size === 'medium' ? 'col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {widget.icon}
                        <h3 className="text-sm font-semibold">{widget.title}</h3>
                      </div>
                      {isEditMode && (
                        <button className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center">
                          <X size={10} />
                        </button>
                      )}
                    </div>
                    <div className="text-lg font-medium mb-1">{widget.content}</div>
                    <div className="text-xs text-white/70">{widget.subtitle}</div>

                    {widget.id === 4 && (
                      <div className="mt-3 flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-xs">⏮</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-xs">⏸</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-xs">⏭</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* App Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-4 gap-4">
                {iosApps.slice(0, 16).map((app) => (
                  <motion.a
                    key={app.id}
                    href={app.link}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center shadow-lg group-active:scale-95 transition-transform`}>
                      <div className="text-white">
                        {app.icon}
                      </div>
                    </div>
                    <span className="text-xs text-white/90 font-medium text-center leading-tight">
                      {app.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Page 2: Today View */}
          <div className="w-full h-full p-4 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
            <div className="text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">Today</h2>
              <p className="text-white/70">{new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>

            {/* Today Widgets */}
            <div className="space-y-4">
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Calendar size={20} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Team Standup</h3>
                    <p className="text-white/70 text-sm">10:00 AM - 10:30 AM</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Activity size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Fitness Goal</h3>
                    <p className="text-white/70 text-sm">8,432 / 10,000 steps</p>
                    <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                      <div className="bg-blue-400 h-1 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp size={20} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Portfolio Views</h3>
                    <p className="text-white/70 text-sm">+12% this week</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Page Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1].map((page) => (
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
          <div className="flex gap-6 px-6 py-2 bg-white/10 rounded-2xl backdrop-blur-xl">
            <motion.a
              href="/"
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Home size={24} className="text-white" />
              </div>
              <span className="text-xs text-white/80">Home</span>
            </motion.a>

            <motion.a
              href="/projects"
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-500/30 flex items-center justify-center">
                <Briefcase size={24} className="text-violet-300" />
              </div>
              <span className="text-xs text-white/80">Work</span>
            </motion.a>

            <motion.button
              onClick={() => setIsEditMode(!isEditMode)}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Settings size={24} className="text-white" />
              </div>
              <span className="text-xs text-white/80">Edit</span>
            </motion.button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center py-1">
          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileWidgetUI;