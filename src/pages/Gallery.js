import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Boxes, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

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

  const currentImage = images[currentImageIndex];

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(249,115,22,0.36)_0%,rgba(249,115,22,0.08)_28%,rgba(2,8,15,0)_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(2,8,15,0.98)_0%,rgba(6,14,25,0.82)_44%,rgba(6,14,25,0.34)_76%,rgba(6,14,25,0.28)_100%)]" />
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
              PROJECT GALLERY
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
              New Sports Complex
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/76 sm:text-xl">
              Explore the future sports complex, fields, courts, play areas, and outdoor spaces being built for Camp Gan Israel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Slideshow Container */}
      <section className="relative overflow-hidden bg-secondary-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(249,115,22,0.17)_0%,rgba(249,115,22,0)_34%),linear-gradient(180deg,#02080f_0%,#08111f_100%)]" />
        <div className="container-custom relative z-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_340px] lg:items-start xl:grid-cols-[1fr_380px]">
            {/* Slideshow */}
            <div className="relative overflow-hidden rounded-md border border-white/14 bg-secondary-950 shadow-2xl shadow-black/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="h-[420px] min-h-[420px] w-full object-cover sm:h-[620px] lg:h-[720px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/86 via-secondary-950/10 to-black/10" />
                  {/* Image Label */}
                  <div className="absolute bottom-5 left-5 rounded-md border border-white/14 bg-secondary-950/58 px-4 py-2 text-sm font-extrabold text-white shadow-xl shadow-black/25 backdrop-blur-md sm:text-base">
                    {currentImage.label}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous gallery image"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 transform items-center justify-center rounded-full border border-white/18 bg-secondary-950/46 text-white shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-300 hover:border-primary-300/70 hover:bg-primary-500 sm:left-5 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={22} className="text-white" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next gallery image"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 transform items-center justify-center rounded-full border border-white/18 bg-secondary-950/46 text-white shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-300 hover:border-primary-300/70 hover:bg-primary-500 sm:right-5 sm:h-12 sm:w-12"
              >
                <ChevronRight size={22} className="text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-5 right-5 rounded-full border border-white/14 bg-secondary-950/58 px-4 py-2 text-xs font-extrabold text-white shadow-xl shadow-black/25 backdrop-blur-md sm:text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            <div className="rounded-md border border-white/14 bg-secondary-950/62 p-4 shadow-2xl shadow-black/35 backdrop-blur-xl">
              <div className="mb-4 px-1">
                <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                  EXPLORE
                </p>
                <h2 className="font-display text-3xl font-extrabold text-white">
                  Complex Views
                </h2>
              </div>
              <div className="grid max-h-[720px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-1">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to gallery image ${index + 1} of ${images.length}: ${image.label}`}
                    aria-current={index === currentImageIndex ? 'true' : undefined}
                    className={`group grid grid-cols-[74px_1fr] items-center gap-3 rounded-md border p-2 text-left shadow-lg transition duration-300 ${
                      index === currentImageIndex
                        ? 'border-primary-300/70 bg-primary-500/14 shadow-primary-950/30'
                        : 'border-white/10 bg-white/[0.045] shadow-black/10 hover:border-primary-300/40 hover:bg-white/[0.08]'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt=""
                      className="h-14 w-full rounded-sm object-cover ring-1 ring-white/10"
                      aria-hidden="true"
                    />
                    <span className={`text-sm font-extrabold ${
                      index === currentImageIndex ? 'text-primary-200' : 'text-white/82 group-hover:text-white'
                    }`}>
                      {image.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

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
                Help Bring This Vision to Life
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-white/68 sm:text-lg">
                Every gift helps complete the final outdoor spaces where campers will play, grow, and thrive.
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
                to="/bricks"
                className="inline-flex items-center justify-center rounded-md border border-white/50 bg-secondary-950/22 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <Boxes className="mr-4 h-6 w-6" />
                Dedicate a Brick
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
