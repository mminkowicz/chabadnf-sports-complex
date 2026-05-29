import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import mainDedication from '../assets/optimized/main dedication.webp';
import baseballField from '../assets/optimized/Baseball Field.webp';
import kidsCarTrack from '../assets/optimized/kids car track.webp';
import basketballCourt from '../assets/optimized/basketball court.webp';
import pickleballCourt from '../assets/optimized/pickleball court.webp';
import soccerField from '../assets/optimized/soccer field.webp';
import playground from '../assets/optimized/playground.webp';
import natureWalk from '../assets/optimized/Nature Walk.webp';
import natureNest from '../assets/optimized/nature nest.webp';
import retreatHouse from '../assets/optimized/Retreat house.webp';
import waterSlides from '../assets/optimized/water slides.webp';
import bleachers from '../assets/optimized/bleachers.webp';
import gazebos from '../assets/optimized/gazeebos.webp';
import benches from '../assets/optimized/benches.webp';
import gym from '../assets/optimized/gym.webp';
import campaignBricks from '../assets/optimized/campaignbricks.webp';

const Dedications = () => {
  // Removed filter functionality

  const dedications = [
  {
    id: 1,
    title: 'Campus Dedication',
    category: 'facilities',
      amount: '$900,000',
    image: mainDedication,
      status: 'available'
  },
  {
    id: 16,
    title: 'Personalized Bricks',
    category: 'facilities',
      amount: '$1000 or 2/$1800',
    image: campaignBricks,
      status: 'available'
  },
  {
    id: 7,
    title: 'Playground',
    category: 'facilities',
      amount: '$300,000',
    image: playground,
      status: 'available'
  },
  {
    id: 6,
    title: 'Soccer Field',
    category: 'facilities',
    image: soccerField,
      status: 'sold'
  },
  {
    id: 3,
    title: 'Basketball Court',
    category: 'facilities',
      amount: '$250,000',
    image: basketballCourt,
      status: 'available'
  },
  {
    id: 2,
    title: 'Baseball Field',
    category: 'facilities',
      amount: '$200,000',
    image: baseballField,
      status: 'available'
  },
  {
    id: 4,
    title: 'Pickleball Court',
    category: 'facilities',
      amount: '$180,000',
    image: pickleballCourt,
      status: 'available'
  },
  {
    id: 5,
    title: 'Kids Car Track',
    category: 'facilities',
    image: kidsCarTrack,
      status: 'sold'
  },
  {
    id: 8,
    title: 'Nature Trail',
    category: 'facilities',
      amount: '$100,000',
    image: natureWalk,
      status: 'available'
  },
  {
    id: 9,
    title: 'Nature Nest',
    category: 'facilities',
      amount: '$75,000',
      image: natureNest,
      status: 'available'
  },
  {
    id: 10,
    title: 'Water Slides',
    category: 'facilities',
      amount: '$25,000',
      image: waterSlides,
      status: 'available'
  },
  {
    id: 11,
    title: 'Gazebos',
    category: 'facilities',
      amount: '$25,000',
      image: gazebos,
      status: 'available'
  },
  {
    id: 12,
    title: 'Bleachers',
    category: 'facilities',
      amount: '$5,000',
      image: bleachers,
      status: 'available'
  },
  {
    id: 13,
    title: 'Benches',
    category: 'facilities',
      amount: '$3,600',
      image: benches,
      status: 'available'
  },
  {
    id: 14,
    title: 'Retreat House',
    category: 'facilities',
      amount: '$850,000',
      image: retreatHouse,
    status: 'available',
      phase: 'Phase 2'
    },
  {
    id: 15,
    title: 'Gym',
    category: 'facilities',
      amount: '$4,000,000',
      image: gym,
      status: 'available',
      phase: 'Phase 2'
    }
  ];

  // Show all dedications without filtering

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'border-primary-200 bg-primary-50 text-primary-800';
      case 'reserved':
        return 'border-primary-200 bg-primary-50 text-primary-800';
      case 'sold':
        return 'border-secondary-200 bg-white/90 text-secondary-600';
      default:
        return 'border-secondary-200 bg-white text-secondary-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'reserved':
        return 'Reserved';
      case 'sold':
        return 'Sold';
      default:
        return 'Unknown';
    }
  };

  const campusDedication = dedications.find((dedication) => dedication.title === 'Campus Dedication');
  const dedicationCards = dedications.filter((dedication) => dedication.title !== 'Campus Dedication');

  return (
    <main className="bg-[#f6f7f3]">
      <PageHero image={mainDedication}>
        <h1 className="hero-title">
          Sports Complex Dedications
        </h1>
        <p className="hero-copy">
          Leave a lasting legacy by dedicating a facility in our new sports complex. 
          Your dedication will be remembered for generations to come.
        </p>
      </PageHero>

      {campusDedication && (
        <section className="section-padding pb-0">
          <div className="container-custom">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-md bg-secondary-950 shadow-2xl shadow-secondary-900/15 ring-1 ring-secondary-900/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[320px] lg:min-h-[520px]">
                  <img
                    src={campusDedication.image}
                    alt="Main Sports Complex"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/70 via-secondary-950/5 to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-6 text-white sm:p-9 lg:p-12">
                  <div className="mb-5">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${getStatusColor(campusDedication.status)}`}>
                      {getStatusText(campusDedication.status)}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    Campus Dedication
                  </h2>
                  <div className="font-display mt-3 text-4xl font-extrabold text-primary-400 sm:text-5xl">
                    $900,000
                  </div>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                    Leave a lasting legacy — name the entire sports complex in honor of your family or a loved one.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Dedications Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {dedicationCards.map((dedication) => {
                const isBricks = dedication.title === 'Personalized Bricks';

                const card = (
                  <div className="group relative h-full min-h-[340px] overflow-hidden rounded-md bg-secondary-950 shadow-xl shadow-secondary-900/10 ring-1 ring-secondary-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary-900/15">
                    <div className="absolute inset-0">
                      <img
                        src={dedication.image}
                        alt={dedication.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/25 to-transparent" />
                    </div>
                    <div className="relative flex min-h-[340px] flex-col justify-between p-5 sm:p-6">
                      <div className="flex flex-wrap gap-2">
                        {dedication.phase && (
                          <span className="rounded-full border border-white/20 bg-white/90 px-2 py-1 text-xs font-bold text-secondary-800 shadow-sm">
                            {dedication.phase}
                          </span>
                        )}
                        <span className={`rounded-full border px-2 py-1 text-xs font-bold shadow-sm ${getStatusColor(dedication.status)}`}>
                          {getStatusText(dedication.status)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-extrabold text-white">
                          {dedication.title}
                        </h3>
                        {dedication.amount && (
                          <div className="font-display mt-2 text-2xl font-extrabold text-primary-300 sm:text-3xl">
                            {dedication.amount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );

                return (
                  <motion.div key={dedication.id} variants={itemVariants}>
                    {isBricks ? (
                      <Link to="/bricks" className="block h-full">
                        {card}
                      </Link>
                    ) : card}
                  </motion.div>
                );
              })}
          </motion.div>

          {dedications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-secondary-600">No dedications found in this category.</p>
          </motion.div>
        )}
        </div>
      </section>

      {/* Benefits and Contact sections removed */}
    </main>
  );
};

export default Dedications;
