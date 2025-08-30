import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
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
  Wifi
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Widget definitions with colorful backgrounds
const widgets = [
  { 
    id: 1, 
    title: 'Projects', 
    size: 'large', 
    content: '🚀 Latest: Portfolio Redesign', 
    color: 'bg-gradient-to-br from-[#FF719A] to-[#FFA99F]',
    link: '/projects'
  },
  { 
    id: 2, 
    title: 'Skills', 
    size: 'small', 
    content: '💻 React, TypeScript, Node.js', 
    color: 'bg-gradient-to-br from-[#0EA5E9] to-[#D3E4FD]',
    link: '/resume'
  },
  { 
    id: 3, 
    title: 'Blog', 
    size: 'small', 
    content: '✍️ Latest: UI Design Trends', 
    color: 'bg-gradient-to-br from-[#FEC6A1] to-[#FEF7CD]',
    link: '/blog'
  },
  { 
    id: 4, 
    title: 'Achievements', 
    size: 'medium', 
    content: '🏆 Best Design Award 2023', 
    color: 'bg-gradient-to-br from-[#8B5CF6] to-[#E5DEFF]',
    link: '/achievements'
  }
];

// App Icons with links to relevant sections
const appIcons = [
  { id: 1, name: 'Projects', icon: <Image size={24} />, color: 'bg-[#FF719A]', link: '/projects' },
  { id: 2, name: 'Resume', icon: <Info size={24} />, color: 'bg-[#0EA5E9]', link: '/resume' },
  { id: 3, name: 'Blog', icon: <Mail size={24} />, color: 'bg-[#FEC6A1]', link: '/blog' },
  { id: 4, name: 'Calendar', icon: <Calendar size={24} />, color: 'bg-[#8B5CF6]', link: '#' },
  { id: 5, name: 'Clock', icon: <Clock size={24} />, color: 'bg-[#F97316]', link: '#' },
  { id: 6, name: 'Music', icon: <Music size={24} />, color: 'bg-[#D946EF]', link: '#' },
  { id: 7, name: 'Photos', icon: <Image size={24} />, color: 'bg-[#F2FCE2]', link: '#' },
  { id: 8, name: 'Settings', icon: <Settings size={24} />, color: 'bg-[#222222]', link: '#' },
];

const WidgetUi: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWidgetUi, setShowWidgetUi] = useState(false); // Default to false (closed)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

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
      className="fixed w-[340px] h-[560px] overflow-hidden rounded-3xl shadow-2xl border border-white/20 z-50"
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
            
            <div className="grid grid-cols-4 gap-3">
              {appIcons.map((app) => (
                <motion.a
                  key={app.id}
                  href={app.link}
                  whileHover={{ scale: isEditMode ? 1 : 1.05 }}
                  animate={{ 
                    rotate: isEditMode ? [-1, 1, -1] : 0,
                    transition: { 
                      repeat: isEditMode ? Infinity : 0, 
                      duration: isEditMode ? 0.2 : 0
                    }
                  }}
                  className={`${app.color} rounded-2xl p-2 flex flex-col items-center justify-center aspect-square ${isEditMode ? 'relative' : ''}`}
                >
                  {isEditMode && (
                    <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-black/50 text-white flex items-center justify-center text-[10px]">
                      ✕
                    </div>
                  )}
                  <div className="p-1.5 rounded-xl mb-1 flex items-center justify-center">
                    {app.icon}
                  </div>
                  <span className="text-[10px] text-white font-medium">{app.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Widgets Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-white/70">Widgets</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                    <Plus size={12} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2 bg-black/90 border border-white/20">
                  <div className="text-xs text-white/70 p-2">Add Widgets</div>
                  <div className="grid grid-cols-2 gap-2">
                    {widgets.map((widget) => (
                      <div key={widget.id} className={`p-2 rounded-lg ${widget.color} bg-opacity-20`}>
                        <div className="text-xs font-medium">{widget.title}</div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 auto-rows-auto gap-3">
              {widgets.map((widget) => (
                <motion.a
                  key={widget.id}
                  href={widget.link}
                  whileHover={{ scale: isEditMode ? 1 : 1.02 }}
                  animate={{ 
                    rotate: isEditMode ? [-0.5, 0.5, -0.5] : 0,
                    transition: { 
                      repeat: isEditMode ? Infinity : 0, 
                      duration: isEditMode ? 0.3 : 0
                    }
                  }}
                  className={`${widget.color} rounded-2xl p-3.5 text-white shadow-md backdrop-blur-sm ${isEditMode ? 'relative' : 'cursor-pointer'} ${
                    widget.size === 'large' ? 'col-span-2 aspect-[2/1]' : 
                    widget.size === 'medium' ? 'col-span-2 aspect-[2/0.8]' : 
                    'col-span-1 aspect-square'
                  }`}
                >
                  {isEditMode && (
                    <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-black/50 text-white flex items-center justify-center text-[10px]">
                      ✕
                    </div>
                  )}
                  <h3 className="text-sm font-bold mb-1">{widget.title}</h3>
                  <div className="text-xs">
                    {widget.content}
                  </div>
                  
                  {widget.id === 1 && (
                    <div className="mt-2 flex gap-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>PF</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>PF</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </motion.a>
              ))}

              {/* Current Time Widget */}
              <motion.div
                whileHover={{ scale: isEditMode ? 1 : 1.02 }}
                className="bg-gradient-to-br from-[#222222] to-[#333333] col-span-2 rounded-2xl p-3.5 text-white shadow-md aspect-[2/0.7]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold mb-1">Today</h3>
                    <div className="text-2xl font-light">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </div>
                  <Clock size={32} className="text-white/70" />
                </div>
              </motion.div>
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
