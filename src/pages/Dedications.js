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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'sold':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
              className="surface-card overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative min-h-[320px] lg:min-h-[520px]">
                  <img
                    src={campusDedication.image}
                    alt="Main Sports Complex"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/60 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                  <div className="mb-5">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${getStatusColor(campusDedication.status)}`}>
                      {getStatusText(campusDedication.status)}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-extrabold leading-tight text-secondary-950 sm:text-4xl">
                    Campus Dedication
                  </h2>
                  <div className="font-display mt-3 text-4xl font-extrabold text-primary-600 sm:text-5xl">
                    $900,000
                  </div>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-secondary-700 sm:text-lg">
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
                  <div className="surface-card group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary-900/10">
                    <div className="relative overflow-hidden">
                      <img
                        src={dedication.image}
                        alt={dedication.title}
                        className="h-60 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                      />
                      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                        {dedication.phase && (
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-bold text-blue-800 shadow-sm">
                            {dedication.phase}
                          </span>
                        )}
                        <span className={`rounded-full border px-2 py-1 text-xs font-bold shadow-sm ${getStatusColor(dedication.status)}`}>
                          {getStatusText(dedication.status)}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-display text-xl font-extrabold text-secondary-950 sm:text-2xl">
                        {dedication.title}
                      </h3>
                      {dedication.amount && (
                        <div className="font-display mt-3 text-2xl font-extrabold text-primary-600 sm:text-3xl">
                          {dedication.amount}
                        </div>
                      )}
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
