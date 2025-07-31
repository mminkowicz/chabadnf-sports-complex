import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Star, Heart, Trophy, Users, Target, CheckCircle, ArrowRight } from 'lucide-react';
import mainDedication from '../assets/main dedication.jpg';
import baseballField from '../assets/Baseball Field.jpg';
import kidsCarTrack from '../assets/kids car track.jpg';
import basketballCourt from '../assets/basketball court.jpg';
import pickleballCourt from '../assets/pickleball court.jpg';
import soccerField from '../assets/soccer field.jpg';

const Dedications = () => {
  // Removed filter functionality

  const dedications = [
    {
      id: 1,
      title: 'Main Sports Complex',
      category: 'facilities',
      amount: '$900,000',
      image: mainDedication,
      status: 'available'
    },
    {
      id: 2,
      title: 'Baseball Field',
      category: 'facilities',
      amount: '$250,000',
      image: baseballField,
      status: 'available'
    },
    {
      id: 3,
      title: 'Basketball Court',
      category: 'facilities',
      amount: '$200,000',
      image: basketballCourt,
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
      amount: '$100,000',
      image: kidsCarTrack,
      status: 'available'
    },
    {
      id: 6,
      title: 'Soccer Field',
      category: 'facilities',
      amount: '$150,000',
      image: soccerField,
      status: 'available'
    },
    {
      id: 7,
      title: 'Playground',
      category: 'facilities',
      amount: '$300,000',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop',
      status: 'available'
    },
    {
      id: 8,
      title: 'Swimming Pool',
      category: 'facilities',
      amount: '$200,000',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
      status: 'reserved'
    },
    {
      id: 9,
      title: 'Fitness Center',
      category: 'facilities',
      amount: '$90,000',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      status: 'available'
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
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary-900 mb-6">
              Sports Complex Dedications
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed mb-8">
              Leave a lasting legacy by dedicating a facility in our new sports complex. 
              Your dedication will be remembered for generations to come.
            </p>
            <div className="flex items-center justify-center space-x-2 text-primary-600">
              <Building className="w-6 h-6" />
              <span className="text-lg font-semibold">Building the future together</span>
            </div>
          </motion.div>
          
          {/* Main Dedication Hero */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={mainDedication}
                alt="Main Sports Complex"
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="text-white">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                    Main Sports Complex
                  </h2>
                  <div className="text-4xl md:text-6xl font-bold text-primary-400 mb-4">
                    $900,000
                  </div>
                  <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
                    Name the entire sports complex in honor of your family or organization. 
                    The premier dedication opportunity for our new facility.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {dedications.map((dedication) => (
              <motion.div
                key={dedication.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative">
                  <img
                    src={dedication.image}
                    alt={dedication.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(dedication.status)}`}>
                      {getStatusText(dedication.status)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-3">
                    {dedication.title}
                  </h3>
                  
                  <div className="text-3xl font-bold text-primary-600 mb-4">
                    {dedication.amount}
                  </div>
                  
                  {/* Inquire button removed */}
                </div>
              </motion.div>
            ))}
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