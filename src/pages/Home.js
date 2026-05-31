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
            style={{ objectPosition: "center 44%", filter: "brightness(1.24) saturate(1.14) contrast(1.04)" }}
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
              src="/camp-video-desktop.mp4"
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
          <div className="home-hero-glow absolute inset-0" />
          <div className="home-hero-shade absolute inset-0" />
          <div className="home-hero-depth absolute inset-0" />
        </div>

        <div className="container-custom home-hero-content relative z-10 flex min-h-[100svh] flex-col justify-between gap-5 pb-5 pt-40 sm:pt-32 lg:gap-6 lg:pb-6 lg:pt-24 xl:pt-28">
          <div className="grid items-start gap-6 lg:gap-10 xl:gap-14">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="campaign-gold home-campaign-title font-display text-[3rem] font-extrabold uppercase leading-[0.9] tracking-normal sm:text-[4.1rem] md:text-[4.8rem] lg:text-[4.05rem] xl:text-[4.6rem] 2xl:text-[5.1rem]">
                <span className="block">LAST MILE</span>
                <span className="block">CAMPAIGN</span>
              </h1>
              <p className="home-serif-title mt-5 max-w-3xl font-['Georgia'] text-[2.55rem] leading-[1.04] text-white drop-shadow-2xl sm:text-5xl md:text-[3.25rem] lg:text-[3.05rem] xl:text-[3.6rem] 2xl:text-[4rem]">
                Build It For They Have Come
              </p>
              <p className="home-hero-description mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/88 drop-shadow-lg sm:text-lg lg:text-lg xl:text-xl">
                Help us complete the Camp Sports Field Complex that will serve thousands of children for decades to come.
              </p>

              <div className="home-action-row mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-primary-400 to-primary-600 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-primary-950/30 ring-1 ring-white/15 transition duration-300 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 sm:min-w-[185px] lg:text-lg"
                >
                  <Heart className="mr-4 h-6 w-6" />
                  Donate Now
                </Link>
                <Link
                  to="/bricks"
                  className="inline-flex items-center justify-center rounded-md border border-white/50 bg-secondary-950/22 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30 sm:min-w-[220px] lg:text-lg"
                >
                  <Boxes className="mr-4 h-6 w-6" />
                  Dedicate a Brick
                </Link>
              </div>

              <div className="home-gift-note mt-6 flex items-center gap-3 text-sm font-semibold text-white/90 sm:text-base">
                <Users className="h-6 w-6 shrink-0 text-primary-300" />
                <span>Every gift brings us closer to the finish line.</span>
              </div>
            </motion.div>

          </div>

          <div className="home-bottom-bar hidden items-center gap-6 rounded-md border border-white/18 bg-secondary-950/56 px-6 py-5 shadow-2xl shadow-black/35 backdrop-blur-xl lg:grid lg:grid-cols-[1fr_1.08fr_0.72fr_0.72fr] xl:px-9">
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
                <span>{Math.round(campaignStats.percentage)}% of campaign goal</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full border border-white/22 bg-white/16 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-700"
                  style={{ width: `${campaignStats.percentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-white/18 pl-7">
              <HeartHandshake className="h-9 w-9 shrink-0 text-primary-300" />
              <div>
                <p className="home-bottom-amount font-display text-2xl font-extrabold text-white">
                  {formatCurrency(campaignStats.match)}
                </p>
                <p className="text-sm font-extrabold text-primary-300">Zalik match</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-white/18 pl-7">
              <Trophy className="h-9 w-9 shrink-0 text-primary-300" />
              <div>
                <p className="home-bottom-amount font-display text-2xl font-extrabold text-white">
                  {formatCurrency(campaignStats.finishLine)}
                </p>
                <p className="text-sm font-extrabold text-primary-300">finish line</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-md border border-white/18 bg-secondary-950/62 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl lg:hidden">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-xl shadow-primary-950/25">
                  <HeartHandshake className="h-9 w-9 text-white" />
                </div>
                <div>
                  <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                    Running Total
                  </p>
                  <p className="mt-2 text-2xl font-extrabold leading-none text-white">
                    {formatCurrency(campaignStats.raised)}
                    <span className="ml-2 text-lg font-bold text-white/70">raised</span>
                  </p>
                </div>
              </div>
            <div>
              <div className="mb-3 flex items-center gap-3 text-sm font-extrabold text-white">
                <span className="h-3 w-3 rounded-full bg-primary-400 shadow-lg shadow-primary-400/40" />
                <span>{Math.round(campaignStats.percentage)}% of campaign goal</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full border border-white/22 bg-white/16 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-700"
                  style={{ width: `${campaignStats.percentage}%` }}
                />
              </div>
            </div>
            <div className="grid gap-3 border-t border-white/15 pt-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-8 w-8 shrink-0 text-primary-300" />
                <div>
                  <p className="font-display text-xl font-extrabold text-white">
                    {formatCurrency(campaignStats.match)}
                  </p>
                  <p className="text-sm font-extrabold text-primary-300">Zalik match</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 shrink-0 text-primary-300" />
                <div>
                  <p className="font-display text-xl font-extrabold text-white">
                    {formatCurrency(campaignStats.finishLine)}
                  </p>
                  <p className="text-sm font-extrabold text-primary-300">finish line</p>
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
