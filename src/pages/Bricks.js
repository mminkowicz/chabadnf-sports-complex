import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
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
    <main className="bg-[#f6f7f3]">
      <PageHero image={campaignBricks}>
        <h1 className="hero-title">
          Personalized Bricks
        </h1>
        <p className="hero-copy">
          Honor a loved one with a personalized engraved brick—a lasting and meaningful tribute that will be a permanent part of the new Camp Sports Center for generations to come.
        </p>
      </PageHero>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="form-frame min-h-[3600px]">
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
