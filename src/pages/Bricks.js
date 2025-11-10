import React from 'react';
import { motion } from 'framer-motion';

const Bricks = () => {

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-secondary-900 mb-4 sm:mb-6" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
              Personalized Bricks
            </h1>
            <p className="text-base sm:text-lg text-secondary-600 leading-relaxed mb-4 sm:mb-6">
              Honor a loved one with a personalized engraved brick—a lasting and meaningful tribute that will be a permanent part of the new Camp Sports Center for generations to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <iframe
              src="https://form.jotform.com/252453697623970"
              title="Bricks Dedication Form"
              frameBorder="0"
              style={{minWidth:'100%',maxWidth:'100%',height:'1000px',border:'none'}}
              className="w-full"
              scrolling="yes"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Bricks;
