import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
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
    <main className="bg-[#f6f7f3]">
      <PageHero image={mainDedication}>
        <h1 className="hero-title">
          Support Our Sports Complex
        </h1>
        <p className="hero-copy mb-7">
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
      </PageHero>

      {/* Donation Form Section */}
      <section id="donation-form" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="form-frame min-h-[2200px]">
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
