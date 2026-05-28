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
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,17,31,0.38)_0%,rgba(8,17,31,0.16)_46%,rgba(8,17,31,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,17,31,0.24)_0%,rgba(8,17,31,0.02)_48%,rgba(8,17,31,0.18)_100%)]" />
        </div>

        <div className="container-custom relative z-10 flex min-h-[100svh] items-start pb-12 pt-[42svh] sm:pt-[43svh]">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-7 inline-flex rounded-full border border-white/20 bg-secondary-950/45 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.35em] text-[#f5dcc0] shadow-xl shadow-black/20 backdrop-blur-sm">
              Last Mile Campaign
            </div>
            <h1 className="font-display max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-normal text-white drop-shadow-2xl sm:text-6xl lg:text-7xl xl:text-8xl">
              Build It For They Have Come
            </h1>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-md bg-primary-500 px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-primary-950/25 transition duration-300 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300/40"
              >
                Donate Now
                <ArrowRight className="ml-3" size={24} />
              </Link>
              <Link
                to="/bricks"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-secondary-950/30 px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
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
