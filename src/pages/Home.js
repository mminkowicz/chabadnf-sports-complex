import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, Heart, Users } from "lucide-react";
import mainDedication from "../assets/optimized/main dedication.webp";

const getHeroVideoSrc = (width) => {
  if (width >= 1024) return "/camp-video-desktop.mp4";
  if (width >= 768) return "/camp-video-tablet.mp4";
  return "/camp-video-mobile.mp4";
};

const Home = () => {
  const [heroVideoSrc, setHeroVideoSrc] = useState(() =>
    typeof window === "undefined" ? "/camp-video-desktop.mp4" : getHeroVideoSrc(window.innerWidth)
  );
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const updateVideoSrc = () => {
      setHeroVideoSrc(getHeroVideoSrc(window.innerWidth));
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);

    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      heroVideoRef.current?.play().catch(() => {});
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [heroVideoSrc]);

  return (
    <main>
      <section className="home-hero relative min-h-[100svh] overflow-hidden bg-secondary-950 text-white">
        <div className="absolute inset-0">
          <video
            key={heroVideoSrc}
            ref={heroVideoRef}
            loop
            muted
            playsInline
            preload="auto"
            poster={mainDedication}
            className="h-full w-full object-cover"
          >
            <source src={heroVideoSrc} type="video/mp4" />
            <img
              src={mainDedication}
              alt="Camp Sports Complex"
              className="h-full w-full object-cover"
            />
          </video>
          <div className="home-hero-scrim pointer-events-none absolute inset-0" />
        </div>

        <div className="container-custom home-hero-content relative z-10 flex min-h-[100svh] flex-col justify-end gap-4 pb-5 pt-24 sm:gap-5 sm:pb-6 lg:gap-6 lg:pb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="home-hero-copy max-w-4xl"
          >
            <h1 className="campaign-gold home-campaign-title font-display text-[2.35rem] font-extrabold uppercase leading-[0.92] tracking-normal sm:text-[3.4rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.5rem]">
              <span className="block">LAST MILE</span>
              <span className="block">CAMPAIGN</span>
            </h1>
            <p className="home-serif-title mt-3 max-w-3xl text-[1.65rem] font-extrabold leading-[1.06] text-white drop-shadow-2xl sm:mt-4 sm:text-[2.35rem] md:text-[2.75rem] lg:text-[2.5rem] xl:text-[3rem]">
              Build It For They Have Come
            </p>
            <p className="home-hero-description mt-3 hidden max-w-2xl text-base font-semibold leading-relaxed text-white/88 drop-shadow-lg sm:mt-4 sm:block sm:text-lg lg:text-lg xl:text-xl">
              Help us complete the Camp Sports Field Complex that will serve thousands of children for decades to come.
            </p>

            <div className="home-action-row mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-primary-400 to-primary-600 px-6 py-3 text-sm font-extrabold text-white shadow-2xl shadow-primary-950/30 ring-1 ring-white/15 transition duration-300 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 sm:min-w-[185px] sm:px-7 sm:py-3.5 sm:text-base lg:text-lg"
              >
                <Heart className="mr-3 h-5 w-5 sm:mr-4 sm:h-6 sm:w-6" />
                Donate Now
              </Link>
              <Link
                to="/bricks"
                className="inline-flex items-center justify-center rounded-md border border-white/50 bg-secondary-950/22 px-6 py-3 text-sm font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30 sm:min-w-[220px] sm:px-7 sm:py-3.5 sm:text-base lg:text-lg"
              >
                <Boxes className="mr-3 h-5 w-5 sm:mr-4 sm:h-6 sm:w-6" />
                Dedicate a Brick
              </Link>
            </div>

            <div className="home-gift-note mt-4 hidden items-center gap-3 text-sm font-semibold text-white/90 sm:mt-5 sm:flex sm:text-base">
              <Users className="h-5 w-5 shrink-0 text-primary-300 sm:h-6 sm:w-6" />
              <span>Every gift helps complete the Camp Sports Field Complex.</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
