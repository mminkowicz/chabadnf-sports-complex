import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Boxes, Heart } from 'lucide-react';
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
import { readDedicationStatuses } from '../lib/dedicationApi';

const Dedications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [dedicationStatuses, setDedicationStatuses] = useState({});

  useEffect(() => {
    let isMounted = true;

    readDedicationStatuses().then((statuses) => {
      if (isMounted) {
        setDedicationStatuses(statuses);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

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
      status: 'sold'
  },
  {
    id: 9,
    title: 'Nature Nest',
    category: 'facilities',
      amount: '$75,000',
      image: natureNest,
      status: 'sold'
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

  const liveDedications = dedications.map((dedication) => ({
    ...dedication,
    status: dedicationStatuses[dedication.id] || dedication.status,
  }));

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
        return 'border-primary-300/50 bg-primary-300/18 text-primary-100';
      case 'reserved':
        return 'border-primary-300/50 bg-primary-300/18 text-primary-100';
      case 'sold':
        return 'border-white/16 bg-white/18 text-white/70';
      default:
        return 'border-white/16 bg-white/12 text-white/70';
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

  const campusDedication = liveDedications.find((dedication) => dedication.title === 'Campus Dedication');
  const dedicationCards = liveDedications.filter((dedication) => dedication.title !== 'Campus Dedication');
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Available', value: 'available' },
    { label: 'Sold', value: 'sold' },
    { label: 'Phase 2', value: 'phase2' },
  ];

  const filteredDedicationCards = useMemo(() => {
    switch (activeFilter) {
      case 'available':
        return dedicationCards.filter((dedication) => dedication.status === 'available' && !dedication.phase);
      case 'sold':
        return dedicationCards.filter((dedication) => dedication.status === 'sold');
      case 'phase2':
        return dedicationCards.filter((dedication) => dedication.phase === 'Phase 2');
      default:
        return dedicationCards;
    }
  }, [activeFilter, dedicationCards]);

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_8%,rgba(249,115,22,0.35)_0%,rgba(249,115,22,0.08)_28%,rgba(2,8,15,0)_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(2,8,15,0.98)_0%,rgba(6,14,25,0.84)_44%,rgba(6,14,25,0.34)_76%,rgba(6,14,25,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,8,15,0.92)_0%,rgba(2,8,15,0.2)_48%,rgba(2,8,15,0.58)_100%)]" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.32em] text-primary-300">
              DEDICATION OPPORTUNITIES
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Sports Complex Dedications
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/76 sm:text-xl">
              Leave a lasting legacy by dedicating a facility in our new sports complex.
              Your dedication will be remembered for generations to come.
            </p>
          </motion.div>
        </div>
      </section>

      {campusDedication && (
        <section className="relative overflow-hidden bg-secondary-950 px-4 pb-0 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#02080f_0%,#08111f_100%)]" />
          <div className="container-custom">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-md border border-white/14 bg-secondary-950/64 shadow-2xl shadow-black/40 backdrop-blur-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-600" />
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]">
                  <img
                    src={campusDedication.image}
                    alt="Main Sports Complex"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/78 via-secondary-950/12 to-transparent" />
                </div>
                <div className="flex flex-col justify-center border-t border-white/12 bg-white/[0.03] p-6 text-white sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
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
                  <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-white/72 sm:text-lg">
                    Leave a lasting legacy — name the entire sports complex in honor of your family or a loved one.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Dedications Grid */}
      <section className="relative overflow-hidden bg-secondary-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(249,115,22,0.16)_0%,rgba(249,115,22,0)_34%),linear-gradient(180deg,#08111f_0%,#02080f_100%)]" />
        <div className="container-custom relative z-10">
          <div className="mb-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                CHOOSE A DEDICATION
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-normal text-white sm:text-5xl">
                Dedicate a Space That Will Inspire Generations
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-white/68 sm:text-lg">
                Select a meaningful dedication opportunity and help bring the sports complex to completion.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-extrabold transition duration-300 ${
                    activeFilter === filter.value
                      ? 'border-primary-300/70 bg-primary-500/24 text-primary-100 shadow-lg shadow-primary-950/20'
                      : 'border-white/14 bg-white/[0.045] text-white/70 hover:border-primary-300/40 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {filteredDedicationCards.map((dedication) => {
                const isBricks = dedication.title === 'Personalized Bricks';

                const card = (
                  <div className="group relative h-full min-h-[360px] overflow-hidden rounded-md border border-white/12 bg-secondary-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-primary-300/45 hover:shadow-2xl hover:shadow-primary-950/20">
                    <div className="absolute inset-0">
                      <img
                        src={dedication.image}
                        alt={dedication.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/36 to-transparent" />
                    </div>
                    <div className="relative flex min-h-[360px] flex-col justify-between p-5 sm:p-6">
                      <div className="flex flex-wrap gap-2">
                        {dedication.phase && (
                          <span className="rounded-full border border-slate-300/22 bg-slate-900/54 px-2 py-1 text-xs font-bold text-slate-200 shadow-sm backdrop-blur">
                            {dedication.phase}
                          </span>
                        )}
                        <span className={`rounded-full border px-2 py-1 text-xs font-bold shadow-sm backdrop-blur ${getStatusColor(dedication.status)}`}>
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

          {filteredDedicationCards.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-white/60">No dedications found in this category.</p>
          </motion.div>
        )}

          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-10 rounded-md border border-white/14 bg-secondary-950/62 p-6 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8"
          >
            <div className="max-w-2xl">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                LAST MILE CAMPAIGN
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Leave Your Mark?
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-white/68 sm:text-lg">
                Your dedication helps complete the final spaces where campers will play, grow, and thrive.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-0">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-primary-400 to-primary-600 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-primary-950/30 ring-1 ring-white/15 transition duration-300 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40"
              >
                <Heart className="mr-4 h-6 w-6" />
                Donate Now
              </Link>
              <Link
                to="/donate#donation-form"
                className="inline-flex items-center justify-center rounded-md border border-white/50 bg-secondary-950/22 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <Boxes className="mr-4 h-6 w-6" />
                General Donations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits and Contact sections removed */}
    </main>
  );
};

export default Dedications;
