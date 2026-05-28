import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import mainDedication from "../assets/optimized/main dedication.webp";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
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
            <source
              src="/camp-video-desktop.mp4"
              type="video/mp4"
            />
            <img
              src={mainDedication}
              alt="Camp Sports Complex"
              className="h-full w-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/62 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/36 via-transparent to-black/18" />
        </div>

        <div className="container-custom relative z-10 flex min-h-[100svh] items-center pb-10 pt-28 sm:pt-32">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.26em] text-primary-200 shadow-xl backdrop-blur-md">
              Last Mile Campaign
            </div>
            <h1 className="font-display max-w-xl text-4xl font-extrabold leading-[0.96] tracking-normal text-white drop-shadow-2xl sm:text-5xl md:text-6xl">
              Build It For They Have Come
            </h1>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-md bg-primary-500 px-5 py-3 text-sm font-extrabold text-white shadow-xl shadow-primary-950/30 transition duration-300 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300/40 sm:px-6 sm:text-base"
              >
                Donate Now
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                to="/bricks"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-black/20 px-5 py-3 text-sm font-extrabold text-white shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/14 focus:outline-none focus:ring-4 focus:ring-white/30 sm:px-6 sm:text-base"
              >
                Dedicate a Brick
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
