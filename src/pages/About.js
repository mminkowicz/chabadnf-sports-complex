import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import mainDedication from '../assets/optimized/main dedication.webp';
import playground from '../assets/optimized/playground.webp';

const About = () => {
  return (
    <main className="bg-[#f6f7f3]">
      <PageHero image={mainDedication}>
        <h1 className="hero-title">
          About Our Sports Complex Project
        </h1>
        <p className="hero-copy">
          We're building a state-of-the-art sports complex to provide Camp Gan Israel campers 
          with the outdoor facilities they need to play, grow, and thrive in a safe and active environment.
        </p>
      </PageHero>

      {/* Our Story Section */}
      <section className="relative section-padding">
        <div className="container-custom">
          <div className="surface-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[340px] lg:min-h-[620px]"
            >
              <img
                src={playground}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/60 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 sm:p-9 lg:p-12"
            >
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-normal text-secondary-950 mb-5 sm:mb-7">
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
        </div>
      </section>
    </main>
  );
};

export default About; 
