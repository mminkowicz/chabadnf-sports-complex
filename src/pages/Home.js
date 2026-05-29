import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, Flag, Heart, HeartHandshake, Trophy, Users } from "lucide-react";
import mainDedication from "../assets/optimized/main dedication.webp";
import { CAMPAIGN_DEFAULTS, formatCurrency, readCampaignData } from "../lib/campaignApi";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [campaignData, setCampaignData] = useState(CAMPAIGN_DEFAULTS);

  useEffect(() => {
    readCampaignData().then(setCampaignData);
  }, []);

  const campaignStats = useMemo(() => {
    const raised = Math.max(0, campaignData.raised);
    const goal = Math.max(1, campaignData.goal);
    const match = Math.max(0, campaignData.match);

    return {
      raised,
      goal,
      match,
      finishLine: goal + match,
      percentage: Math.min((raised / goal) * 100, 100),
    };
  }, [campaignData]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] overflow-hidden bg-secondary-950 text-white">
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_4%,rgba(250,184,78,0.48)_0%,rgba(237,122,26,0.18)_25%,rgba(8,17,31,0)_48%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,10,18,0.94)_0%,rgba(8,17,31,0.76)_35%,rgba(8,17,31,0.26)_72%,rgba(237,122,26,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,10,18,0.88)_0%,rgba(3,10,18,0.20)_42%,rgba(3,10,18,0.34)_100%)]" />
        </div>

        <div className="container-custom relative z-10 grid min-h-[100svh] items-center gap-8 pb-56 pt-32 sm:pt-36 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.72fr)] lg:gap-16 lg:pb-44 lg:pt-28 xl:gap-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.32em] text-primary-400 drop-shadow-lg sm:text-base lg:text-lg">
              LAST MILE CAMPAIGN
            </p>
            <h1 className="font-display mt-7 max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-normal text-white drop-shadow-2xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              They Have Come.
              <span className="block">Now Let's Build It.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-semibold leading-relaxed text-white/78 drop-shadow-lg sm:text-xl lg:text-2xl">
              Help us complete the Camp Sports Field Complex and create a lasting space for play, growth, and connection.
            </p>
            <p className="mt-6 font-display text-xl font-extrabold leading-tight tracking-normal text-primary-300 drop-shadow-xl sm:text-2xl">
              Camp Sports Field Complex
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-primary-400 to-primary-600 px-8 py-4 text-lg font-extrabold text-white shadow-2xl shadow-primary-950/30 ring-1 ring-white/15 transition duration-300 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 sm:min-w-[220px]"
              >
                <Heart className="mr-4 h-6 w-6" />
                Donate Now
              </Link>
              <Link
                to="/bricks"
                className="inline-flex items-center justify-center rounded-md border border-white/55 bg-secondary-950/24 px-8 py-4 text-lg font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30 sm:min-w-[250px]"
              >
                <Boxes className="mr-4 h-6 w-6" />
                Dedicate a Brick
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-md border border-white/30 bg-white/10 p-6 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-8 lg:justify-self-end xl:p-10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-secondary-950/25 shadow-xl shadow-black/25">
              <Heart className="h-8 w-8 text-primary-300" />
            </div>
            <div className="mt-8">
              <p className="font-display text-5xl font-extrabold leading-none text-white sm:text-6xl">
                {formatCurrency(campaignStats.raised)}
                <span className="ml-3 align-middle text-xl font-extrabold text-primary-300 sm:text-2xl">
                  Raised
                </span>
              </p>
              <p className="mt-5 text-xl font-semibold text-white/68 sm:text-2xl">
                of {formatCurrency(campaignStats.goal)} match goal
              </p>
              <div className="mt-6 h-4 overflow-hidden rounded-full border border-white/18 bg-white/12 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-700"
                  style={{ width: `${campaignStats.percentage}%` }}
                />
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4 text-lg font-bold text-white/82">
              <Flag className="h-7 w-7 shrink-0 text-white" />
              <span>
                Finish line: <span className="text-primary-300">{formatCurrency(campaignStats.finishLine)}</span>
              </span>
            </div>
            <div className="my-8 h-px bg-white/14" />
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 shrink-0 text-primary-300" />
              <p className="max-w-xs text-base font-semibold leading-relaxed text-white/72">
                Every gift brings us closer to the finish line.
              </p>
            </div>
          </motion.aside>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-10 hidden lg:block">
          <div className="container-custom">
            <div className="grid items-center gap-8 rounded-md border border-white/16 bg-secondary-950/55 px-10 py-7 shadow-2xl shadow-black/35 backdrop-blur-xl lg:grid-cols-[1.05fr_1.1fr_0.74fr_0.74fr]">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-xl shadow-primary-950/25">
                  <HeartHandshake className="h-9 w-9 text-white" />
                </div>
                <div>
                  <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                    Running Total
                  </p>
                  <p className="mt-2 text-2xl font-extrabold leading-none text-white xl:text-3xl">
                    {formatCurrency(campaignStats.raised)}
                    <span className="ml-2 text-xl font-bold text-white/70">raised</span>
                  </p>
                </div>
              </div>
              <div className="border-l border-white/18 pl-8">
                <div className="h-4 overflow-hidden rounded-full bg-white/16 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-700"
                    style={{ width: `${campaignStats.percentage}%` }}
                  />
                </div>
                <p className="mt-3 text-base font-bold text-white/72">
                  {Math.round(campaignStats.percentage)}% of finish line
                </p>
              </div>
              <div className="flex items-center gap-4 border-l border-white/18 pl-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary-950/50">
                  <HeartHandshake className="h-8 w-8 text-primary-300" />
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-white">
                    {formatCurrency(campaignStats.match)}
                  </p>
                  <p className="text-sm font-extrabold text-primary-300">Zalik match</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-white/18 pl-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary-950/50">
                  <Trophy className="h-8 w-8 text-primary-300" />
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-white">
                    {formatCurrency(campaignStats.finishLine)}
                  </p>
                  <p className="text-sm font-extrabold text-primary-300">finish line</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-secondary-950/64 shadow-2xl shadow-black/20 backdrop-blur-md lg:hidden">
          <div className="container-custom py-4">
            <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary-300">
                  Running Total
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-primary-400 transition-all duration-700"
                    style={{ width: `${campaignStats.percentage}%` }}
                  />
                </div>
              </div>
              <p className="font-display text-2xl font-extrabold leading-none text-white sm:text-3xl">
                {formatCurrency(campaignStats.raised)}
              </p>
              <p className="text-sm font-bold text-primary-300 sm:text-right">
                {formatCurrency(campaignStats.finishLine)} finish line
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
