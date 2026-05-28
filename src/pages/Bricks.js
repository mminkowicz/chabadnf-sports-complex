import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import campaignBricks from '../assets/optimized/campaignbricks.webp';

const Bricks = () => {
  useEffect(() => {
    const resizeForm = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-252453697623970']",
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

  return (
    <main className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary-900 text-white">
        <div className="absolute inset-0">
          <img
            src={campaignBricks}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 via-secondary-900/72 to-secondary-900/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-transparent to-transparent" />
        </div>
        <div className="container-custom relative z-10 py-14 sm:py-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-normal leading-[0.98] mb-4 sm:mb-6">
              Personalized Bricks
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed mb-4 sm:mb-6">
              Honor a loved one with a personalized engraved brick—a lasting and meaningful tribute that will be a permanent part of the new Camp Sports Center for generations to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative min-h-[3600px] overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-secondary-200/70">
              <iframe
                id="JotFormIFrame-252453697623970"
                src="https://form.jotform.com/252453697623970"
                title="Bricks Dedication Form"
                frameBorder="0"
                loading="lazy"
                style={{ minWidth: '100%', maxWidth: '100%', minHeight: '3600px', border: 'none' }}
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

export default Bricks;
