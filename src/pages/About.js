import React from 'react';
import { motion } from 'framer-motion';
import mascot from '../assets/mascot.png';

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-secondary-900 mb-4 sm:mb-6" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
              About Our Sports Complex Project
            </h1>
            <p className="text-lg sm:text-xl text-secondary-600 leading-relaxed">
              We're building a state-of-the-art sports complex to provide Camp Gan Israel campers 
              with the outdoor facilities they need to play, grow, and thrive in a safe and active environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-secondary-900 mb-4 sm:mb-6" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
                Our Story
              </h2>
              <p className="text-base sm:text-lg text-secondary-600 mb-4 sm:mb-6 leading-relaxed">
                Camp Gan Israel is the premier Jewish day camp in the North Fulton area. Now in our 27th season, 
                our camp attracts hundreds of campers from all backgrounds and affiliations.
              </p>
              <p className="text-base sm:text-lg text-secondary-600 mb-4 sm:mb-6 leading-relaxed">
                Since the completion of our new campus in 2019, virtually all our outdoor space was used up by 
                the new building and parking lot, leaving the camp children without proper areas for sports and play. 
                Fortunately, a few years ago we were able to purchase the property next door, and we are now launching 
                an exciting project to develop that land into much-needed outdoor facilities.
              </p>
              <p className="text-base sm:text-lg text-secondary-600 leading-relaxed">
                Our new sports complex will include a <strong>Baseball field, Soccer field, Basketball court, Pickleball court, 
                and an amazing new playground</strong>—that will allow our campers to play, grow, and thrive in a safe and active environment.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src={mascot}
                alt="Camp Mascot"
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 