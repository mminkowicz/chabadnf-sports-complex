import React from 'react';
import { motion } from 'framer-motion';

const PageHero = ({ image, children, className = '' }) => {
  return (
    <section className={`page-hero ${className}`}>
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,17,31,0.88)_0%,rgba(8,17,31,0.62)_42%,rgba(8,17,31,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,17,31,0.52)_0%,rgba(8,17,31,0.03)_48%,rgba(8,17,31,0.16)_100%)]" />
      </div>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
