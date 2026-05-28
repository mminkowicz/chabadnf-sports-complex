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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.74)_42%,rgba(15,23,42,0.20)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,23,42,0.72)_0%,rgba(15,23,42,0.06)_46%,rgba(15,23,42,0.18)_100%)]" />
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
