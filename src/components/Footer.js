import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white py-8">
      <div className="container-custom">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="text-sm text-secondary-400">
              © 2024 Chabad of North Fulton. All rights reserved.
            </div>
            <div className="text-xs text-secondary-500">
              Site designed by{' '}
              <a 
                href="https://optamyze.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
              >
                Optamyze
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 