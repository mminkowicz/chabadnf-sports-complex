import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import mainDedication from '../assets/main dedication.jpg';
import mascot from '../assets/mascot.png';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={mainDedication}
            alt="Camp Sports Complex"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 sm:mb-6">
                Build It For
                <span className="block text-primary-400">They Have Come</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-6 sm:mb-8">
                Camp Sports Complex
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12"
            >
              <Link to="/donate" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg flex items-center justify-center">
                Donate Now
                <ArrowRight className="ml-2 inline group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/dedications" className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30 text-center">
                View Dedications
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <img
                src={mascot}
                alt="Camp Mascot"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 