import React from 'react';
import { motion } from 'framer-motion';
import FundraisingWidget from '../components/FundraisingWidget';

const Test = () => {
  const handleDonateClick = () => {
    // Scroll to the donation form
    const formSection = document.getElementById('donation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
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
              Test Page
            </h1>
            <p className="text-lg sm:text-xl text-secondary-600 leading-relaxed mb-6 sm:mb-8">
              This is a test page for the fundraising widget. Use the admin dashboard to update campaign totals and see the changes here.
            </p>
            
            {/* Fundraising Widget */}
            <div className="mt-8 mb-4">
              <FundraisingWidget
                goal={1800000}
                raised={400000}
                onDonateClick={handleDonateClick}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Test Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-6">
              Testing the Fundraising Widget
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              The widget above shows the current campaign progress. You can test it by:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">1. Update Campaign</h3>
                <p className="text-secondary-600">Go to the admin dashboard and update the campaign totals</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">2. Refresh Page</h3>
                <p className="text-secondary-600">Refresh this page to see the updated widget</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">3. Test Functionality</h3>
                <p className="text-secondary-600">Click the "Donate Now" button to test the scroll functionality</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Admin Access</h3>
              <p className="text-yellow-700">
                Go to <strong>/admin</strong> to update campaign totals and test the widget functionality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section (for testing scroll) */}
      <section id="donation-form" className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-6">
              Donation Form (Test)
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              This section is here to test the scroll functionality when clicking "Donate Now" in the widget.
            </p>
            
            <div className="bg-white rounded-xl shadow-xl p-8">
              <p className="text-secondary-600">
                This would be where the actual donation form would go. The widget's "Donate Now" button should scroll to this section.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Test;
