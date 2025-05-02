
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui-components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Blog', path: '/blog' },
  { name: 'Study', path: '/study' },
  { name: 'Resume', path: '/resume' },
];

export const EnhancedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const currentScrollY = latest;
    if (currentScrollY <= 20) {
      setIsVisible(true);
    } else {
      setIsVisible(currentScrollY < lastScrollY);
    }
    setLastScrollY(currentScrollY);
    setIsScrolled(currentScrollY > 20);
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const NavLink = ({ name, path, isMobile = false }) => {
    const isActive = location.pathname === path;
    
    return (
      <Link 
        to={path}
        className={`
          relative text-sm font-medium transition-all duration-300
          ${isMobile 
            ? `p-3 mx-2 rounded-lg ${
                isActive 
                  ? 'bg-primary/10 text-primary font-semibold' 
                  : 'text-foreground hover:bg-background/60'
              }`
            : `hover:text-primary ${
                isActive 
                  ? 'text-primary font-semibold' 
                  : 'text-foreground/80'
              }`
          }
        `}
      >
        {name}
        {isActive && !isMobile && (
          <motion.div
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-violet-400 to-violet-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    );
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none"
    >
      <motion.div
        className={`
          mx-auto rounded-xl pointer-events-auto transition-all duration-300
          ${isScrolled
            ? 'glass-panel backdrop-blur-md shadow-2xl border-violet-500/20 violet-glow'
            : 'bg-background/60 backdrop-blur-sm border border-violet-500/10'
          }
          max-w-6xl px-6 py-3
        `}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <motion.span 
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-violet-500 to-violet-400 text-white px-3 py-1 rounded-md shadow-md"
            >
              S
            </motion.span>
            <span className="hidden sm:inline gradient-heading">AMEER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} name={link.name} path={link.path} />
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-background/70 hover:bg-background/90 text-foreground shadow-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-2 mx-4 py-4 glass-panel bg-background/95 backdrop-blur-lg flex flex-col gap-2 rounded-xl shadow-lg border-violet-500/20 violet-glow"
          >
            {navLinks.map((link) => (
              <NavLink key={link.path} name={link.name} path={link.path} isMobile={true} />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
