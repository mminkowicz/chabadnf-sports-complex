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
        <div className="flex items-center justify-center h-16 sm:h-18 lg:h-20">
          {/* Admin Access - Click logo area 5 times */}
          <div 
            className="absolute left-4 cursor-pointer"
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
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className={`dedications-dropdown relative font-medium transition-colors duration-300 text-lg cursor-pointer ${
                      isDedicationsActive
                        ? isHomePage ? 'text-primary-400' : 'text-primary-600'
                        : isHomePage 
                          ? 'text-white hover:text-primary-400' 
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
                          isHomePage ? 'bg-primary-400' : 'bg-primary-600'
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
                          className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                            isHomePage 
                              ? 'bg-black/90 backdrop-blur-md border-white/20' 
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
                                  ? isHomePage 
                                    ? 'text-primary-400 bg-white/10' 
                                    : 'text-primary-600 bg-primary-50'
                                  : isHomePage
                                    ? 'text-white hover:text-primary-400 hover:bg-white/10'
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
                )}
              </div>
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
            className={`lg:hidden absolute right-2 sm:right-4 p-2 rounded-md transition-colors ${
              isHomePage 
                ? 'text-white hover:text-primary-400 hover:bg-white/10' 
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
              className={`lg:hidden ${
                isHomePage 
                  ? 'bg-black/80 backdrop-blur-md border-t border-white/20' 
                  : 'bg-white border-t border-secondary-200'
              }`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <div
                          onClick={() => setIsDedicationsOpen(!isDedicationsOpen)}
                          className={`flex items-center justify-between px-4 py-3 text-base font-medium transition-colors duration-300 cursor-pointer ${
                            isDedicationsActive
                              ? isHomePage 
                                ? 'text-primary-400 bg-white/10 border-r-4 border-primary-400'
                                : 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                              : isHomePage
                                ? 'text-white hover:text-primary-400 hover:bg-white/10'
                                : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${isDedicationsOpen ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                          {isDedicationsOpen && (
                            <motion.div
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
                                  onClick={() => {
                                    setIsOpen(false);
                                    setIsDedicationsOpen(false);
                                  }}
                                  className={`block px-8 py-2 text-sm font-medium transition-colors duration-300 ${
                                    isActive(dropdownItem.path)
                                      ? isHomePage 
                                        ? 'text-primary-400 bg-white/10 border-r-4 border-primary-400'
                                        : 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                                      : isHomePage
                                        ? 'text-white hover:text-primary-400 hover:bg-white/10'
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
                    )}
                  </div>
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