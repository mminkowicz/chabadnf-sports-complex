import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import mainDedication from "../assets/main dedication.jpg";
import mascot from "../assets/mascot.png";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
            style={{
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {/* Multiple sources for different screen sizes */}
            <source
              src="/camp-video-desktop.mp4"
              type="video/mp4"
              media="(min-width: 1024px)"
            />
            <source
              src="/camp-video-tablet.mp4"
              type="video/mp4"
              media="(min-width: 768px)"
            />
            <source
              src="/camp-video-mobile.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
            {/* Fallback to original video */}
            <source
              src="/Camp Expansion Rendering video.mp4"
              type="video/mp4"
            />
            {/* Final fallback image */}
            <img
              src={mainDedication}
              alt="Camp Sports Complex"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wide mb-4 sm:mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Build It For
                <span className="block text-primary-400">
                  They Have Come
                </span>
              </h1>
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wide mb-6 sm:mb-8"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Camp Sports Complex
              </h2>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12"
            >
              <Link
                to="/donate"
                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg flex items-center justify-center"
              >
                Donate Now
                <ArrowRight
                  className="ml-2 inline group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30 text-center"
              >
                View Gallery
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
