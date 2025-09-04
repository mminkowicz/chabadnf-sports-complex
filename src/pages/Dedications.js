import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mainDedication from '../assets/main dedication.jpg';
import baseballField from '../assets/Baseball Field.jpg';
import kidsCarTrack from '../assets/kids car track.jpg';
import basketballCourt from '../assets/basketball court.jpg';
import pickleballCourt from '../assets/pickleball court.jpg';
import soccerField from '../assets/soccer field.jpg';
import playground from '../assets/playground.jpg';
import natureWalk from '../assets/Nature Walk.jpg';
import natureNest from '../assets/nature nest.jpg';
import retreatHouse from '../assets/Retreat house.jpg';
import waterSlides from '../assets/water slides.jpg';
import bleachers from '../assets/bleachers.png';
import gazebos from '../assets/gazeebos.png';
import benches from '../assets/benches.png';
import gym from '../assets/gym.jpg';
import campaignBricks from '../assets/campaignbricks.jpg';

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

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-secondary-900 mb-4 sm:mb-6" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
              Sports Complex Dedications
            </h1>
            <p className="text-base sm:text-lg text-secondary-600 leading-relaxed mb-4 sm:mb-6">
              Leave a lasting legacy by dedicating a facility in our new sports complex. 
              Your dedication will be remembered for generations to come.
            </p>
          </motion.div>

          {/* Main Dedication Hero */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img
              src={mainDedication}
                alt="Main Sports Complex"
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-2 rounded-full text-sm font-bold border-2 shadow-lg bg-green-100 text-green-800 border-green-200">
                  Available
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <div className="text-white">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-1 sm:mb-2">
                    Campus Dedication
                  </h2>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-400 mb-1 sm:mb-2">
                $900,000
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-2 sm:mb-3 max-w-xl">
                    Leave a lasting legacy — name the entire sports complex in honor of your family or a loved one.
                  </p>
                  {/* Main dedication inquire button removed */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter section removed */}

      {/* Dedications Grid */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <motion.div
              variants={containerVariants}
            initial="hidden"
            animate="visible"
              className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
            >
            {(() => {
              const rows = [];
              
                            // Add all dedications in order (sorted by price from highest to lowest), excluding Campus Dedication which is already shown in hero section
              dedications.filter(d => d.title !== 'Campus Dedication').forEach((dedication) => {
                const isBricks = dedication.title === 'Personalized Bricks';
                
                rows.push(
                  <motion.div key={dedication.id} variants={itemVariants} className="lg:col-span-1">
                    {isBricks ? (
                      <Link to="/bricks" className="block h-full">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover h-full cursor-pointer">
                          <div className="relative">
                            <img
                              src={dedication.image}
                              alt={dedication.title}
                              className="w-full h-48 sm:h-56 object-cover"
                            />
                            <div className="absolute top-3 right-3 flex items-center space-x-2">
                              {dedication.phase && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                                  {dedication.phase}
                                </span>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border shadow-sm ${getStatusColor(dedication.status)}`}>
                                {getStatusText(dedication.status)}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-serif font-semibold text-secondary-900 mb-2 sm:mb-3">
                              {dedication.title}
                            </h3>
                            {dedication.amount && (
                              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-3 sm:mb-4">
                                {dedication.amount}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover h-full">
                        <div className="relative">
                          <img
                            src={dedication.image}
                            alt={dedication.title}
                            className="w-full h-48 sm:h-56 object-cover"
                          />
                          <div className="absolute top-3 right-3 flex items-center space-x-2">
                            {dedication.phase && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                                {dedication.phase}
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border shadow-sm ${getStatusColor(dedication.status)}`}>
                              {getStatusText(dedication.status)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-serif font-semibold text-secondary-900 mb-2 sm:mb-3">
                            {dedication.title}
                          </h3>
                          {dedication.amount && (
                            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-3 sm:mb-4">
                              {dedication.amount}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
                            });
              

              

              
              return rows;
            })()}
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
    </div>
  );
};

export default Dedications;