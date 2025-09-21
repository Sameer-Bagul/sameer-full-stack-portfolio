import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui-components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const navLinks = [
  // { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Blog', path: '/blog' },
  { name: 'Study', path: '/study' },
  { name: 'Resume', path: '/resume' },
  { name: 'Experience', path: '/experience' },
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

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none"
    >
      {/* Enhanced Glassmorphic Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`mx-auto rounded-2xl pointer-events-auto transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-2xl border border-violet-500/40 shadow-2xl shadow-violet-500/15'
            : 'bg-gradient-to-r from-background/80 via-background/60 to-background/80 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/10'
          } max-w-7xl px-6 py-4 relative overflow-hidden`}
      >
        {/* Subtle animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-violet-500/5"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Logo and Desktop Navigation */}
        <div className="flex items-center relative z-10">
          {/* Enhanced Logo */}
          <motion.div
            variants={itemVariants}
            className="flex items-center"
          >
            <Link
              to="/"
              className="group relative flex items-center gap-3 transition-all duration-300 hover:scale-105"
            >
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, -5, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 text-white px-4 py-2 rounded-xl shadow-xl border border-violet-400/40 font-bold text-lg relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 drop-shadow-sm">S</span>
                </div>
                {/* Enhanced glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-violet-600/40 to-violet-500/30 rounded-xl blur-xl"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <motion.span
                className="text-xl font-bold text-violet-600 hidden sm:block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
              </motion.span>
            </Link>
          </motion.div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Desktop Navigation with Equal Spacing */}
          <motion.nav
            variants={itemVariants}
            className="hidden lg:flex items-center"
          >
            <motion.div
              className="flex items-center gap-8 px-8 py-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 font-medium transition-all duration-300 group rounded-lg ${
                      location.pathname === link.path
                        ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                        : 'text-foreground/90 hover:text-violet-600 dark:hover:text-violet-400'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>

          {/* Theme Toggle and Mobile Menu */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <ThemeToggle />
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-background/85 to-background/80 hover:from-background/90 hover:to-background/85 text-foreground shadow-lg border border-white/30 transition-all duration-300 backdrop-blur-xl"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>

            {/* Mobile Theme Toggle */}
            <motion.div
              variants={itemVariants}
              className="lg:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden pointer-events-auto mt-4 mx-4"
          >
            <motion.nav
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
            >
              <motion.div
                className="p-6 space-y-2"
                variants={containerVariants}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={mobileItemVariants}
                    custom={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={link.path}
                      className={`relative block p-4 rounded-xl transition-all duration-300 group ${
                        location.pathname === link.path
                          ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                          : 'text-foreground/90 hover:text-violet-600 dark:hover:text-violet-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{link.name}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
