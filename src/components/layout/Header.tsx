
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui-components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  // { name: 'Achievements', path: '/achievements' },
  { name: 'Blog', path: '/blog' },
  { name: 'Study', path: '/study' },
  { name: 'Resume', path: '/resume' },
];

export const Header = () => {
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

  return (
    // Header Component with enhanced shadow
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none"
    >
      {/* Enhanced navbar with shadow */}
      <motion.div
        className={`mx-auto rounded-xl pointer-events-auto transition-all duration-300 
        ${isScrolled
          ? 'glass-panel backdrop-blur-md shadow-xl border border-violet-500/20 violet-glow'
          : 'bg-background/60 backdrop-blur-sm border border-border/20 shadow-lg'
        } max-w-6xl px-6 py-3`}
      >
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <motion.span 
              whileHover={{ rotate: [0, -15, 10, -15, 0] }}
              transition={{ duration: 0.5 }}
              //animate={{ rotate: [0, -10, 10, -10, 0] }}
              // transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md shadow-md border border-primary-foreground"
            >
              S
            </motion.span>
          </Link>

          {/* Desktop Navigation with improved active state and box indicator */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary font-semibold'
                    : 'text-foreground/80'
                }`}
              >
                {location.pathname === link.path ? (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 -mx-3 -my-2 px-3 py-2 bg-primary/10 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-background/70 hover:bg-background/90 text-foreground shadow-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu with improved active state */}
      {isMobileMenuOpen && (
        <div className="md:hidden pointer-events-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 mx-4 py-4 glass-panel bg-background/95 backdrop-blur-lg flex flex-col gap-2 rounded-xl shadow-lg border border-border/30"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative"
              >
                <div className={`p-3 mx-2 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary font-semibold scale-105 shadow-sm'
                    : 'text-foreground hover:bg-background/60 hover:text-foreground'
                }`}>
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-400 to-violet-600 rounded-r-full"
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </motion.nav>
        </div>
      )}
    </motion.header>
  );
};
