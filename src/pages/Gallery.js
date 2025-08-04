import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import all images from assets
import baseballField from '../assets/Baseball Field.jpg';
import basketballCourt from '../assets/basketball court.jpg';
import kidsCarTrack from '../assets/kids car track.jpg';
import mainDedication from '../assets/main dedication.jpg';
import natureWalk from '../assets/Nature Walk.jpg';
import natureNest from '../assets/nature nest.jpg';
import pickleballCourt from '../assets/pickleball court.jpg';
import playground from '../assets/playground.jpg';
import soccerField from '../assets/soccer field.jpg';
import waterSlides from '../assets/water slides.jpg';
import gazebos from '../assets/gazeebos.png';
import retreatHouse from '../assets/retreat house.png';
import bleachers from '../assets/bleachers.png';
import benches from '../assets/benches.png';

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      id: 1,
      src: mainDedication,
      alt: 'Main Sports Complex Dedication',
      label: 'Aerial View',
    },
    {
      id: 2,
      src: baseballField,
      alt: 'Baseball Field',
      label: 'Baseball Field',
    },
    {
      id: 3,
      src: basketballCourt,
      alt: 'Basketball Court',
      label: 'Basketball Court',
    },
    {
      id: 4,
      src: pickleballCourt,
      alt: 'Pickleball Court',
      label: 'Pickle Ball Court',
    },
    {
      id: 5,
      src: soccerField,
      alt: 'Soccer Field',
      label: 'Soccer Field',
    },
    {
      id: 6,
      src: playground,
      alt: 'Playground',
      label: 'Playground',
    },
    {
      id: 7,
      src: kidsCarTrack,
      alt: 'Kids Car Track',
      label: 'Kids Car Track',
    },
    {
      id: 8,
      src: natureWalk,
      alt: 'Nature Walk Trail',
      label: 'Nature Trail',
    },
    {
      id: 9,
      src: waterSlides,
      alt: 'Water Slides',
      label: 'Water Slides',
    },
    {
      id: 10,
      src: gazebos,
      alt: 'Gazebos',
      label: 'Gazebos',
    },
    {
      id: 11,
      src: natureNest,
      alt: 'Nature Nest',
      label: 'Nature Nest',
    },
    {
      id: 12,
      src: retreatHouse,
      alt: 'Retreat House',
      label: 'Retreat House',
    },
    {
      id: 13,
      src: bleachers,
      alt: 'Bleachers',
      label: 'Bleachers',
    },
    {
      id: 14,
      src: benches,
      alt: 'Benches',
      label: 'Benches',
    },
  ];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="text-center py-8 sm:py-12">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-secondary-900 mb-4 sm:mb-6" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
          New Sports Complex
        </h1>
      </div>

      {/* Slideshow Container */}
      <div className="container-custom flex items-center justify-center flex-1">
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Slideshow */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover"
                />
                {/* Image Label */}
                <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm sm:text-base font-semibold backdrop-blur-sm">
                  {images[currentImageIndex].label}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-secondary-700" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6 text-secondary-700" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-primary-600 scale-125' 
                    : 'bg-secondary-300 hover:bg-secondary-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 