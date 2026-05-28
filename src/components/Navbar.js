import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [isDedicationsOpen, setIsDedicationsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.dedications-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        setIsDedicationsOpen(false);
      }
    };

    if (isDedicationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDedicationsOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donate', path: '/donate' },
    { 
      name: 'Dedications', 
      path: '/dedications',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Dedications', path: '/dedications' },
        { name: 'Bricks', path: '/bricks' }
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;
  const isDedicationsActive = location.pathname === '/dedications' || location.pathname === '/bricks';
  const isHomePage = location.pathname === '/';
  const navIsTransparent = isHomePage && !isScrolled;
  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsDedicationsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navIsTransparent
          ? 'bg-transparent'
          : 'bg-white/95 shadow-sm backdrop-blur-xl ring-1 ring-secondary-900/5'
      }`}
    >
      <div className="container-custom">
        <div className={`flex h-16 items-center sm:h-20 ${
          navIsTransparent ? 'justify-between lg:h-24 lg:justify-center' : 'justify-between lg:h-20'
        }`}>
          {/* Admin Access - Click logo area 5 times */}
          <div
            className="absolute left-4 top-4 cursor-pointer"
            onClick={() => {
              setAdminClickCount(prev => {
                const newCount = prev + 1;
                if (newCount >= 5) {
                  window.location.href = '/admin';
                  return 0;
                }
                return newCount;
              });
            }}
          >
            <div className="text-xs text-gray-400 opacity-0 hover:opacity-100 transition-opacity">
              {adminClickCount}/5
            </div>
          </div>

          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`group flex items-center gap-3 transition duration-300 ${
              navIsTransparent ? 'text-white lg:hidden' : 'text-secondary-950'
            }`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-extrabold shadow-lg transition ${
              navIsTransparent
                ? 'bg-white/10 text-white ring-1 ring-white/20 backdrop-blur'
                : 'bg-secondary-950 text-white'
            }`}>
              CGI
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-extrabold">Camp Gan Israel</span>
              <span className={`block text-xs font-semibold ${
                navIsTransparent ? 'text-white/70' : 'text-secondary-500'
              }`}>Sports Complex</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className={`hidden items-center lg:flex ${
            navIsTransparent ? 'space-x-14 xl:space-x-16' : 'space-x-8'
          }`}>
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className={`dedications-dropdown relative cursor-pointer transition-colors duration-300 ${
                      navIsTransparent ? 'text-xl font-medium' : 'text-sm font-bold'
                    } ${
                      isDedicationsActive
                        ? navIsTransparent ? 'text-primary-400' : 'text-primary-600'
                        : navIsTransparent
                          ? 'text-white/90 hover:text-white' 
                          : 'text-secondary-700 hover:text-primary-600'
                    }`}
                    onMouseEnter={() => setIsDedicationsOpen(true)}
                    onMouseLeave={() => setIsDedicationsOpen(false)}
                  >
                    <div className="flex items-center space-x-1">
                      <Link to={item.path}>{item.name}</Link>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${isDedicationsOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isDedicationsActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          navIsTransparent ? 'bg-primary-400' : 'bg-primary-600'
                        }`}
                      />
                    )}
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDedicationsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute left-0 top-full z-50 mt-3 w-48 overflow-hidden rounded-md border shadow-xl ${
                            navIsTransparent
                              ? 'border-white/20 bg-secondary-950/95 backdrop-blur-md' 
                              : 'bg-white border-secondary-200'
                          }`}
                          onMouseEnter={() => setIsDedicationsOpen(true)}
                          onMouseLeave={() => setIsDedicationsOpen(false)}
                        >
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                                isActive(dropdownItem.path)
                                  ? navIsTransparent
                                    ? 'text-primary-300 bg-white/10' 
                                    : 'text-primary-600 bg-primary-50'
                                  : navIsTransparent
                                    ? 'text-white hover:text-primary-300 hover:bg-white/10'
                                    : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`relative transition-colors duration-300 ${
                      navIsTransparent ? 'text-xl font-medium' : 'text-sm font-bold'
                    } ${
                      isActive(item.path)
                        ? navIsTransparent ? 'text-primary-400' : 'text-primary-600'
                        : navIsTransparent
                          ? 'text-white/90 hover:text-white' 
                          : 'text-secondary-700 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          navIsTransparent ? 'bg-primary-400' : 'bg-primary-600'
                        }`}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/donate"
              className={`rounded-md bg-primary-600 font-extrabold text-white transition duration-300 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 ${
                navIsTransparent
                  ? 'px-10 py-5 text-xl shadow-2xl shadow-primary-950/25'
                  : 'px-5 py-3 text-sm shadow-lg shadow-primary-950/10'
              }`}
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button - Absolute positioned */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className={`lg:hidden absolute right-2 sm:right-4 p-2 rounded-md transition-colors ${
              navIsTransparent
                ? 'text-white hover:bg-white/10' 
                : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
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
              id="mobile-navigation"
              className={`lg:hidden fixed left-0 right-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl sm:top-20 ${
                navIsTransparent 
                  ? 'bg-secondary-950/95 backdrop-blur-md border-t border-white/20' 
                  : 'bg-white border-t border-secondary-200'
              }`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setIsDedicationsOpen(!isDedicationsOpen)}
                          aria-expanded={isDedicationsOpen}
                          aria-controls="mobile-dedications-menu"
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium transition-colors duration-300 ${
                            isDedicationsActive
                              ? navIsTransparent 
                                ? 'text-primary-200 bg-white/10 border-r-4 border-primary-200'
                                : 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                              : navIsTransparent
                                ? 'text-white hover:text-primary-200 hover:bg-white/10'
                                : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${isDedicationsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isDedicationsOpen && (
                            <motion.div
                              id="mobile-dedications-menu"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {item.dropdownItems.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  to={dropdownItem.path}
                                  onClick={closeMobileMenu}
                                  className={`block px-8 py-2 text-sm font-medium transition-colors duration-300 ${
                                    isActive(dropdownItem.path)
                                      ? navIsTransparent 
                                        ? 'text-primary-200 bg-white/10 border-r-4 border-primary-200'
                                        : 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                                      : navIsTransparent
                                        ? 'text-white hover:text-primary-200 hover:bg-white/10'
                                        : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                                  }`}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-3 text-base font-medium transition-colors duration-300 ${
                          isActive(item.path)
                            ? navIsTransparent 
                              ? 'text-primary-200 bg-white/10 border-r-4 border-primary-200'
                              : 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                            : navIsTransparent
                              ? 'text-white hover:text-primary-200 hover:bg-white/10'
                              : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-2">
                  <Link
                    to="/donate"
                    onClick={closeMobileMenu}
                    className={`block w-full rounded-md px-6 py-3 text-center font-extrabold shadow-lg transition duration-300 ${
                      navIsTransparent 
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
