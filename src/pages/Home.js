import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, Heart, HeartHandshake, Trophy, Users } from "lucide-react";
import mainDedication from "../assets/optimized/main dedication.webp";
import { CAMPAIGN_DEFAULTS, formatCurrency, readCampaignData } from "../lib/campaignApi";

const Home = () => {
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
      <section className="home-hero relative min-h-[100svh] overflow-hidden bg-secondary-950 text-white">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={mainDedication}
            className="h-full w-full object-cover"
            style={{ filter: "brightness(1.12) saturate(1.06)" }}
          >
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
            <source src="/camp-video-desktop.mp4" type="video/mp4" />
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
              <span>Every gift brings us closer to the finish line.</span>
            </div>
          </motion.div>

          <div className="home-bottom-bar hidden items-center gap-6 rounded-md border border-white/14 bg-secondary-950/42 px-6 py-4 shadow-2xl shadow-black/25 backdrop-blur-md lg:grid lg:grid-cols-[1fr_1.08fr_0.72fr_0.72fr] xl:px-9">
            <div className="flex items-center gap-5">
              <div className="home-bottom-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-xl shadow-primary-950/25 xl:h-20 xl:w-20">
                <HeartHandshake className="h-9 w-9 text-white" />
              </div>
              <div>
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                  Running Total
                </p>
                <p className="home-bottom-amount mt-2 text-2xl font-extrabold leading-none text-white xl:text-3xl">
                  {formatCurrency(campaignStats.raised)}
                  <span className="ml-2 text-xl font-bold text-white/70">raised</span>
                </p>
              </div>
            </div>
            <div className="border-l border-white/18 pl-7">
              <div className="mb-3 flex items-center gap-3 text-sm font-extrabold text-white">
                <span className="h-3 w-3 rounded-full bg-primary-400 shadow-lg shadow-primary-400/40" />
                <span>{Math.round(campaignStats.percentage)}% of {formatCurrency(campaignStats.goal)} goal</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full border border-white/22 bg-white/16 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-700"
                  style={{ width: `${campaignStats.percentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-white/18 pl-7">
              <span className="font-display text-4xl font-black leading-none text-primary-300 xl:text-5xl">+</span>
              <div>
                <p className="home-bottom-amount font-display text-2xl font-extrabold text-white">
                  {formatCurrency(campaignStats.match)}
                </p>
                <p className="text-sm font-extrabold text-primary-300">Zalik match</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-white/18 pl-7">
              <span className="font-display text-4xl font-black leading-none text-primary-300 xl:text-5xl">=</span>
              <Trophy className="h-9 w-9 shrink-0 text-primary-300" />
              <div>
                <p className="home-bottom-amount font-display text-2xl font-extrabold text-white">
                  {formatCurrency(campaignStats.finishLine)}
                </p>
                <p className="text-sm font-extrabold text-primary-300">finish line</p>
              </div>
            </div>
          </div>

          <div className="home-bottom-bar-mobile grid gap-3 rounded-md border border-white/14 bg-secondary-950/42 p-3 shadow-2xl shadow-black/20 backdrop-blur-md sm:gap-4 sm:p-4 lg:hidden">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-xl shadow-primary-950/25 sm:h-14 sm:w-14">
                  <HeartHandshake className="h-7 w-7 text-white sm:h-9 sm:w-9" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-primary-300 sm:text-xs sm:tracking-[0.28em]">
                    Running Total
                  </p>
                  <p className="mt-1 text-xl font-extrabold leading-none text-white sm:mt-2 sm:text-2xl">
                    {formatCurrency(campaignStats.raised)}
                    <span className="ml-2 text-base font-bold text-white/70 sm:text-lg">raised</span>
                  </p>
                </div>
                <div className="hidden min-w-[7.5rem] sm:block">
                  <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-white">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary-400" />
                    <span>{Math.round(campaignStats.percentage)}% of goal</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full border border-white/22 bg-white/16">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-700"
                      style={{ width: `${campaignStats.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            <div className="sm:hidden">
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-400" />
                <span>{Math.round(campaignStats.percentage)}% of {formatCurrency(campaignStats.goal)} goal</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full border border-white/22 bg-white/16">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-700"
                  style={{ width: `${campaignStats.percentage}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-white/12 pt-3 sm:gap-3 sm:pt-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-display text-2xl font-black leading-none text-primary-300 sm:text-3xl">+</span>
                <div>
                  <p className="font-display text-base font-extrabold text-white sm:text-xl">
                    {formatCurrency(campaignStats.match)}
                  </p>
                  <p className="text-xs font-extrabold text-primary-300 sm:text-sm">Zalik match</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-display text-2xl font-black leading-none text-primary-300 sm:text-3xl">=</span>
                <Trophy className="h-6 w-6 shrink-0 text-primary-300 sm:h-8 sm:w-8" />
                <div>
                  <p className="font-display text-base font-extrabold text-white sm:text-xl">
                    {formatCurrency(campaignStats.finishLine)}
                  </p>
                  <p className="text-xs font-extrabold text-primary-300 sm:text-sm">finish line</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
