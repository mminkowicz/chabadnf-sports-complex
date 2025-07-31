import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donate', path: '/donate' },
    { name: 'Dedications', path: '/dedications' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h3 className="text-xl font-serif font-semibold">Chabad of North Fulton</h3>
            </Link>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              Building community through faith, education, and service. Join us in creating a vibrant 
              Jewish community in North Fulton County.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center text-secondary-300 hover:text-primary-400 hover:bg-secondary-700 transition-colors"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary-400" size={20} />
                <span className="text-secondary-300">North Fulton County, GA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary-400" size={20} />
                <span className="text-secondary-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-400" size={20} />
                <span className="text-secondary-300">info@chabadnf.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Chabad of North Fulton. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-secondary-400 text-sm">
              <span>Made with</span>
              <Heart className="text-red-500" size={16} />
              <span>for our community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 