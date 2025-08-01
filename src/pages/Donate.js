import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Donate = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script1.async = true;
    document.head.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.textContent = 'window.jotformEmbedHandler("iframe[id=\'JotFormIFrame-252106096190048\']", "https://form.jotform.com/")';
      document.head.appendChild(script2);
    };

    return () => {
      document.head.removeChild(script1);
    };
  }, []);

  const handleIframeLoad = () => {
    window.parent.scrollTo(0, 0);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-secondary-900 mb-4 sm:mb-6">
              Support Our Sports Complex
            </h1>
            <p className="text-lg sm:text-xl text-secondary-600 leading-relaxed mb-6 sm:mb-8">
              Your generous donation helps us build the new sports complex for Camp Gan Israel.
              Every contribution makes a meaningful difference in creating a safe and active environment for our campers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <iframe
              ref={iframeRef}
              id="JotFormIFrame-252106096190048"
              title="Camp Sports Field Complex"
              onLoad={handleIframeLoad}
              allowTransparency="true"
              allow="geolocation; microphone; camera; fullscreen; payment"
              src="https://form.jotform.com/252106096190048"
              frameBorder="0"
              style={{minWidth:'100%',maxWidth:'100%',height:'600px',border:'none'}}
              className="w-full"
              scrolling="no"
            >
            </iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donate; 