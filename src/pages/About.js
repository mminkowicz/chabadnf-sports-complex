import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import mainDedication from '../assets/optimized/main dedication.webp';
import playground from '../assets/optimized/playground.webp';

const About = () => {
  return (
    <main className="bg-secondary-950 text-white">
      <section className="relative overflow-hidden bg-secondary-950 pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="absolute inset-0">
          <img
            src={mainDedication}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 42%' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_8%,rgba(249,115,22,0.34)_0%,rgba(249,115,22,0.08)_28%,rgba(2,8,15,0)_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(2,8,15,0.98)_0%,rgba(6,14,25,0.86)_42%,rgba(6,14,25,0.46)_72%,rgba(6,14,25,0.38)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,8,15,0.92)_0%,rgba(2,8,15,0.24)_48%,rgba(2,8,15,0.64)_100%)]" />
        </div>

        <div className="container-custom relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.42fr)] lg:items-center lg:gap-14 xl:gap-20">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="campaign-gold font-display text-5xl font-extrabold leading-[0.98] tracking-normal sm:text-6xl lg:text-7xl">
              About Our Sports Complex Project
            </h1>
            <div className="mt-8 max-w-3xl space-y-6 text-lg font-medium leading-relaxed text-white/82 sm:text-xl">
              <p>
                We're building a state-of-the-art sports complex to provide Camp Gan Israel campers with the outdoor facilities they need to play, grow, and thrive in a safe and active environment.
              </p>
              <p>
                Now, with the project nearly complete, we've launched our Last Mile Campaign to raise the final $300,000 needed to cross the finish line. Thanks to a generous $150,000 challenge grant from the Zalik Foundation, every dollar donated, up to $150,000, will be matched dollar-for-dollar, helping us complete the project and bring this dream to life.
              </p>
            </div>
          </motion.div>

          <motion.aside
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="rounded-md border border-white/18 bg-secondary-950/50 p-6 shadow-2xl shadow-black/35 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 border-b border-white/14 pb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/18 bg-secondary-950/46 shadow-xl shadow-black/25">
                <HeartHandshake className="h-6 w-6 text-primary-300" />
              </div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                LAST MILE CAMPAIGN
              </p>
            </div>

            <div className="grid gap-4 py-6">
              <div className="rounded-md border border-white/12 bg-white/[0.04] p-4">
                <p className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  $300,000 left to the finish line
                </p>
              </div>
              <div className="rounded-md border border-white/12 bg-white/[0.04] p-4">
                <p className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  $150,000 campaign goal
                </p>
              </div>
              <div className="rounded-md border border-primary-300/30 bg-primary-500/10 p-4">
                <p className="font-display text-2xl font-extrabold leading-tight text-primary-300 sm:text-3xl">
                  $150,000 matching grant
                </p>
              </div>
            </div>

            <div className="rounded-md border border-white/12 bg-white/[0.04] p-4">
              <p className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                FINISH LINE
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative overflow-hidden bg-secondary-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(249,115,22,0.16)_0%,rgba(249,115,22,0)_34%),linear-gradient(180deg,#02080f_0%,#08111f_100%)]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16">
            <motion.div
              initial={{ x: -42, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] min-h-[320px] overflow-hidden rounded-md border border-white/14 shadow-2xl shadow-black/35 lg:aspect-[5/4]"
            >
              <img
                src={playground}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/50 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ x: 42, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="max-w-2xl border-l-2 border-primary-400/90 pl-6 sm:pl-8">
                <h2 className="font-display mb-6 text-4xl font-extrabold tracking-normal text-white sm:text-5xl lg:text-6xl">
                  Our Story
                </h2>
                <div className="space-y-6 text-white/74">
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
                    Our new sports complex will include a <strong className="font-extrabold text-white">Baseball field, Soccer field, Basketball court, Pickleball court,
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
