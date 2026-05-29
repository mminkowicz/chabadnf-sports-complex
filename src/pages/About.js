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
        <div className="hero-copy space-y-5">
          <p>
            We're building a state-of-the-art sports complex to provide Camp Gan Israel campers with the outdoor facilities they need to play, grow, and thrive in a safe and active environment.
          </p>
          <p>
            Now, with the project nearly complete, we've launched our Last Mile Campaign to raise the final $300,000 needed to cross the finish line. Thanks to a generous $150,000 challenge grant from the Zalik Foundation, every dollar donated, up to $150,000, will be matched dollar-for-dollar, helping us complete the project and bring this dream to life.
          </p>
        </div>
      </PageHero>

      {/* Our Story Section */}
      <section className="relative section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="media-frame relative aspect-[4/3] min-h-[320px] lg:aspect-[5/4]"
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
              className="relative"
            >
              <div className="max-w-2xl border-l-4 border-primary-500 pl-6 sm:pl-8">
                <h2 className="font-display mb-5 text-3xl font-extrabold tracking-normal text-secondary-950 sm:mb-7 sm:text-4xl lg:text-5xl">
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
