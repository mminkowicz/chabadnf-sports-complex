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
    <main className="min-h-screen bg-secondary-950 pt-16 text-white">
      <div className="container-custom py-7 sm:py-10">
        <h1 className="font-display max-w-3xl text-3xl font-extrabold tracking-normal text-white sm:text-4xl md:text-5xl">
          New Sports Complex
        </h1>
      </div>

      {/* Slideshow Container */}
      <div className="container-custom flex flex-1 items-center justify-center pb-10">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Slideshow */}
          <div className="relative overflow-hidden rounded-md shadow-2xl shadow-black/30 ring-1 ring-white/10">
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
                  className="h-[520px] min-h-[520px] w-full object-cover sm:h-[620px] md:h-[700px] lg:h-[calc(100svh-14rem)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/75 via-transparent to-black/10" />
                {/* Image Label */}
                <div className="absolute bottom-5 left-5 rounded-md bg-black/40 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm ring-1 ring-white/20 sm:text-base">
                  {images[currentImageIndex].label}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous gallery image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/40 shadow-lg ring-1 ring-white/20 backdrop-blur transition-all duration-300 hover:bg-black/60 hover:scale-105 sm:left-4 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next gallery image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/40 shadow-lg ring-1 ring-white/20 backdrop-blur transition-all duration-300 hover:bg-black/60 hover:scale-105 sm:right-4 sm:h-12 sm:w-12"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-5 right-5 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur ring-1 ring-white/20 sm:px-4 sm:py-2 sm:text-sm">
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
                    : 'bg-white/40 hover:bg-white/70'
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
