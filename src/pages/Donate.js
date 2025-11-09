import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Donate = () => {
  const iframeRef = useRef(null);



  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script1.async = true;
    document.head.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.textContent = 'window.jotformEmbedHandler("iframe[id=\'JotFormIFrame-252994264245970\']", "https://form.jotform.com/")';
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-secondary-900 mb-4 sm:mb-6" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
              Support Our Sports Complex
            </h1>
            <p className="text-lg sm:text-xl text-secondary-600 leading-relaxed mb-6 sm:mb-8">
              <strong>We need $1.8 million to complete the project — and thanks to a generous donor, every dollar you give will be matched!</strong> That means your $1 becomes $2, doubling your impact and bringing us twice as close to our goal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bricks Link Section */}
      <section className="py-6 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link
              to="/bricks"
              className="text-primary-600 hover:text-primary-700 font-medium text-lg underline transition-colors duration-300"
            >
              To dedicate a brick click here
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donation-form" className="section-padding bg-white">
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
              id="JotFormIFrame-252994264245970"
              title="Camp Sports Field Complex"
              onLoad={handleIframeLoad}
              allowTransparency="true"
              allow="geolocation; microphone; camera; fullscreen; payment"
              src="https://form.jotform.com/252994264245970"
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