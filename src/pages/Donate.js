import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Boxes, Heart } from 'lucide-react';
import mainDedication from '../assets/optimized/main dedication.webp';

const Donate = () => {
  useEffect(() => {
    const resizeForm = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-252994264245970']",
          'https://form.jotform.com/'
        );
      }
    };

    let script = document.getElementById('jotform-embed-handler');
    if (!script) {
      script = document.createElement('script');
      script.id = 'jotform-embed-handler';
      script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
      script.async = true;
      document.head.appendChild(script);
    }

    script.addEventListener('load', resizeForm);
    resizeForm();

    return () => {
      script.removeEventListener('load', resizeForm);
    };
  }, []);

  const handleGeneralDonationsClick = (e) => {
    e.preventDefault();
    const formSection = document.getElementById('donation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="bg-secondary-950 text-white">
      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-secondary-950 pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:min-h-[700px] lg:pb-24 lg:pt-40">
        <div className="absolute inset-0">
          <img
            src={mainDedication}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 44%' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_7%,rgba(249,115,22,0.34)_0%,rgba(249,115,22,0.08)_28%,rgba(2,8,15,0)_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(2,8,15,0.98)_0%,rgba(6,14,25,0.88)_42%,rgba(6,14,25,0.34)_74%,rgba(6,14,25,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,8,15,0.92)_0%,rgba(2,8,15,0.18)_48%,rgba(2,8,15,0.58)_100%)]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="campaign-gold font-display text-5xl font-extrabold leading-[0.9] tracking-normal sm:text-6xl lg:text-7xl xl:text-8xl">
              LAST MILE CAMPAIGN
            </h1>
            <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-white/84 sm:text-xl">
              We are just $300,000 short of completing our sports campus, and The Zalik Foundation is helping us get there with a generous $150,000 matching grant. All we need to do is raise $150,000, and the Zalik Foundation will match it to bring us to the finish line. Please help us hit the home run and bring this dream to completion!
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/bricks"
                className="inline-flex items-center justify-center rounded-md border border-white/50 bg-secondary-950/22 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30 sm:min-w-[250px] lg:text-lg"
              >
                <Boxes className="mr-4 h-6 w-6" />
                To dedicate a brick click here
              </Link>
              <a
                href="#donation-form"
                onClick={handleGeneralDonationsClick}
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-primary-400 to-primary-600 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-primary-950/30 ring-1 ring-white/15 transition duration-300 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 sm:min-w-[250px] lg:text-lg"
              >
                <Heart className="mr-4 h-6 w-6" />
                General donations click here
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donation-form" className="relative overflow-hidden bg-secondary-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_34%),linear-gradient(180deg,#02080f_0%,#08111f_100%)]" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl"
          >
            <div className="mb-8 text-center">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                DONATE
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-normal text-white sm:text-5xl">
                Complete Your Donation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/68 sm:text-lg">
                Choose your dedication or donation amount below to help us cross the finish line.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-md border border-white/14 bg-secondary-950/68 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-3 lg:p-4">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-600" />
              <div className="overflow-hidden rounded-sm bg-white shadow-2xl shadow-primary-950/10">
                <iframe
                  id="JotFormIFrame-252994264245970"
                  title="Camp Sports Field Complex"
                  allowtransparency="true"
                  allow="geolocation; microphone; camera; fullscreen; payment"
                  src="https://form.jotform.com/252994264245970"
                  frameBorder="0"
                  loading="lazy"
                  style={{ minWidth: '100%', maxWidth: '100%', minHeight: '1600px', border: 'none', display: 'block' }}
                  className="w-full"
                  scrolling="yes"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Donate;
