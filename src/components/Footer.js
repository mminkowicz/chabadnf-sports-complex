import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#02080f] py-10 text-white">
      <div className="container-custom">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="text-sm text-white/48">
              © 2025 Chabad of North Fulton. All rights reserved.
            </div>
            <div className="text-xs text-white/38 sm:text-sm">
              Created by{' '}
              <a 
                href="https://minkowa.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-primary-400 transition-colors duration-300 hover:text-primary-300 hover:underline"
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
