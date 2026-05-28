import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import all images from assets
import baseballField from '../assets/optimized/Baseball Field.webp';
import basketballCourt from '../assets/optimized/basketball court.webp';
import kidsCarTrack from '../assets/optimized/kids car track.webp';
import mainDedication from '../assets/optimized/main dedication.webp';
import natureWalk from '../assets/optimized/Nature Walk.webp';
import natureNest from '../assets/optimized/nature nest.webp';
import pickleballCourt from '../assets/optimized/pickleball court.webp';
import playground from '../assets/optimized/playground.webp';
import soccerField from '../assets/optimized/soccer field.webp';
import waterSlides from '../assets/optimized/water slides.webp';
import gazebos from '../assets/optimized/gazeebos.webp';
import retreatHouse from '../assets/optimized/Retreat house.webp';
import bleachers from '../assets/optimized/bleachers.webp';
import benches from '../assets/optimized/benches.webp';

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

  // Auto-advance slideshow - DISABLED
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextImage();
  //   }, 5000); // Change image every 5 seconds

  //   return () => clearInterval(interval);
  // }, [nextImage]);

  return (
    <main className="min-h-screen pt-16 bg-secondary-900 text-white">
      {/* Header */}
      <div className="relative z-10 text-center py-6 sm:py-8">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-normal text-white">
          New Sports Complex
        </h1>
      </div>

      {/* Slideshow Container */}
      <div className="container-custom flex items-center justify-center flex-1 pb-8">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Slideshow */}
          <div className="relative overflow-hidden rounded-md shadow-2xl ring-1 ring-white/15">
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
                  className="w-full h-[520px] sm:h-[620px] md:h-[700px] lg:h-[calc(100svh-13rem)] min-h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-transparent to-black/10" />
                {/* Image Label */}
                <div className="absolute bottom-5 left-5 bg-black/35 text-white px-4 py-2 rounded-md text-sm sm:text-base font-bold backdrop-blur-sm ring-1 ring-white/15">
                  {images[currentImageIndex].label}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous gallery image"
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/35 hover:bg-black/55 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur ring-1 ring-white/20"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next gallery image"
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/35 hover:bg-black/55 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur ring-1 ring-white/20"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-5 right-5 bg-black/35 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur ring-1 ring-white/15">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to gallery image ${index + 1} of ${images.length}: ${images[index].label}`}
                aria-current={index === currentImageIndex ? 'true' : undefined}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-primary-400 scale-125' 
                    : 'bg-white/35 hover:bg-white/65'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom spacing to prevent footer overlap */}
      <div className="pb-8"></div>
    </main>
  );
};

export default Gallery; 
