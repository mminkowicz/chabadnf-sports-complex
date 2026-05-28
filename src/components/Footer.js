import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-secondary-950 py-8 text-white">
      <div className="container-custom">
        <div className="border-t border-white/10 pt-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="text-sm text-white/50">
              © 2025 Chabad of North Fulton. All rights reserved.
            </div>
            <div className="text-xs text-white/40 sm:text-sm">
              Created by{' '}
              <a 
                href="https://minkowa.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-300 font-semibold hover:underline"
              >
                Minkowa
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
