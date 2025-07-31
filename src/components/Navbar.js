import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donate', path: '/donate' },
    { name: 'Dedications', path: '/dedications' },
  ];

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-sm shadow-md'
          : isHomePage 
            ? 'bg-transparent' 
            : 'bg-white/95 backdrop-blur-md shadow-lg'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-center h-16 lg:h-20">
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-colors duration-300 text-lg ${
                  isActive(item.path)
                    ? isHomePage ? 'text-primary-400' : 'text-primary-600'
                    : isHomePage 
                      ? 'text-white hover:text-primary-400' 
                      : 'text-secondary-700 hover:text-primary-600'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      isHomePage ? 'bg-primary-400' : 'bg-primary-600'
                    }`}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/donate"
              className={`${
                isHomePage 
                  ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                  : 'btn-primary'
              } font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg`}
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button - Absolute positioned */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden absolute right-4 p-2 rounded-md transition-colors ${
              isHomePage 
                ? 'text-white hover:text-primary-400 hover:bg-white/10' 
                : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden ${
                isHomePage 
                  ? 'bg-black/80 backdrop-blur-md border-t border-white/20' 
                  : 'bg-white border-t border-secondary-200'
              }`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-colors duration-300 ${
                      isActive(item.path)
                        ? isHomePage 
                          ? 'text-primary-400 bg-white/10 border-r-4 border-primary-400'
                          : 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                        : isHomePage
                          ? 'text-white hover:text-primary-400 hover:bg-white/10'
                          : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 pt-2">
                  <Link
                    to="/donate"
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      isHomePage 
                        ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                        : 'btn-primary'
                    }`}
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 