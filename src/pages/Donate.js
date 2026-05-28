import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    <main className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary-900 text-white">
        <div className="absolute inset-0">
          <img
            src={mainDedication}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 via-secondary-900/70 to-secondary-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-transparent to-transparent" />
        </div>
        <div className="container-custom relative z-10 py-14 sm:py-20 md:py-24">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-normal leading-[0.98] mb-5 sm:mb-6">
              Support Our Sports Complex
            </h1>
            <p className="max-w-3xl text-lg sm:text-xl text-white/85 leading-relaxed mb-6">
              <strong>We need $1.8 million to complete the project — and thanks to a generous donor, every dollar you give will be matched!</strong> That means your $1 becomes $2, doubling your impact and bringing us twice as close to our goal.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/bricks"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-base font-extrabold text-white backdrop-blur transition duration-300 hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                To dedicate a brick click here
              </Link>
              <a
                href="#donation-form"
                onClick={handleGeneralDonationsClick}
                className="inline-flex items-center justify-center rounded-md bg-primary-500 px-5 py-3 text-base font-extrabold text-white shadow-xl shadow-primary-950/20 transition duration-300 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300/40"
              >
                General donations click here
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donation-form" className="section-padding bg-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative min-h-[2200px] overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-secondary-200/70">
              <iframe
                id="JotFormIFrame-252994264245970"
                title="Camp Sports Field Complex"
                allowtransparency="true"
                allow="geolocation; microphone; camera; fullscreen; payment"
                src="https://form.jotform.com/252994264245970"
                frameBorder="0"
                loading="lazy"
                style={{ minWidth: '100%', maxWidth: '100%', minHeight: '2200px', border: 'none' }}
                className="w-full"
                scrolling="yes"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Donate; 
