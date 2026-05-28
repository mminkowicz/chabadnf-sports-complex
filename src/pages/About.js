import React from 'react';
import { motion } from 'framer-motion';
import mascot from '../assets/mascot.png';
import mainDedication from '../assets/optimized/main dedication.webp';
import playground from '../assets/optimized/playground.webp';

const About = () => {
  return (
    <main className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary-900 text-white">
        <div className="absolute inset-0">
          <img
            src={mainDedication}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 via-secondary-900/70 to-secondary-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-transparent to-transparent" />
        </div>
        <div className="container-custom relative z-10 py-16 sm:py-20 md:py-28">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="font-display max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-normal leading-[0.98] mb-5 sm:mb-6">
              About Our Sports Complex Project
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              We're building a state-of-the-art sports complex to provide Camp Gan Israel campers 
              with the outdoor facilities they need to play, grow, and thrive in a safe and active environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-14 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-md shadow-2xl">
                <img
                  src={playground}
                  alt=""
                  className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[560px]"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/55 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-8 right-5 hidden h-32 w-32 items-center justify-center rounded-full bg-white p-4 shadow-2xl ring-8 ring-white/30 sm:flex lg:h-40 lg:w-40">
                <img
                  src={mascot}
                  alt="Camp Mascot"
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-2"
            >
              <div className="border-l-4 border-primary-500 pl-5 sm:pl-7">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-normal text-secondary-900 mb-5 sm:mb-7">
                  Our Story
                </h2>
                <div className="space-y-5 text-secondary-700">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Camp Gan Israel is the premier Jewish day camp in the North Fulton area. Now in our 27th season, 
                    our camp attracts hundreds of campers from all backgrounds and affiliations.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Since the completion of our new campus in 2019, virtually all our outdoor space was used up by 
                    the new building and parking lot, leaving the camp children without proper areas for sports and play. 
                    Fortunately, a few years ago we were able to purchase the property next door, and we are now launching 
                    an exciting project to develop that land into much-needed outdoor facilities.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Our new sports complex will include a <strong>Baseball field, Soccer field, Basketball court, Pickleball court, 
                    and an amazing new playground</strong>—that will allow our campers to play, grow, and thrive in a safe and active environment.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About; 
