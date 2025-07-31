import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
      alt: 'Community gathering',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      alt: 'Educational program',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      alt: 'Sports facility',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop',
      alt: 'Community members',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
      alt: 'Holiday celebration',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      alt: 'Adult education',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      alt: 'Current campus',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop',
      alt: 'Youth group',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
      alt: 'Community service',
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      alt: 'Summer camp',
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      alt: 'Construction site',
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop',
      alt: 'Family event',
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary-900 mb-6">
          New Sports Complex
        </h1>
        <p className="text-xl md:text-2xl text-secondary-600 max-w-3xl mx-auto">
          Take a look at our exciting new project
        </p>
      </div>

      {/* Slideshow Container */}
      <div className="container-custom flex items-center justify-center flex-1">
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Slideshow */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                                 className="w-full h-[600px] md:h-[700px] object-cover"
              />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} className="text-secondary-700" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} className="text-secondary-700" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
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