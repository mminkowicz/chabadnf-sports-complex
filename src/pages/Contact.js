import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS credentials
    emailjs.sendForm(
      'service_smaohpj', // You'll get this from EmailJS
      'template_ng8uukt', // You'll get this from EmailJS
      form.current,
      '60kqcjnCBzs9V_yyL' // You'll get this from EmailJS
    )
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setSubmitStatus('success');
        form.current.reset();
      }, (error) => {
        console.log('FAILED...', error.text);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-secondary-900 mb-4 sm:mb-6" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-secondary-600 leading-relaxed mb-4 sm:mb-6">
              For more information about the project or to discuss legacy giving please contact:
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary-900 mb-6">
                Get In Touch
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1 text-sm sm:text-base">Email</h3>
                    <p className="text-secondary-600 text-sm sm:text-base">
                      <a 
                        href="mailto:rabbi@chabadnf.org" 
                        className="hover:text-primary-600 hover:underline transition-colors duration-200"
                      >
                        rabbi@chabadnf.org
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1 text-sm sm:text-base">Phone</h3>
                    <p className="text-secondary-600 text-sm sm:text-base">
                      <a 
                        href="tel:770-410-9000" 
                        className="hover:text-primary-600 hover:underline transition-colors duration-200"
                      >
                        770-410-9000
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1 text-sm sm:text-base">Address</h3>
                    <p className="text-secondary-600 text-sm sm:text-base">
                      <a 
                        href="https://maps.google.com/?q=10180+Jones+Bridge+Road+Alpharetta+Georgia+30022" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary-600 hover:underline transition-colors duration-200"
                      >
                        10180 Jones Bridge Road<br />
                        Alpharetta, Georgia 30022
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1 text-sm sm:text-base">Contact Person</h3>
                    <p className="text-secondary-600 text-sm sm:text-base">
                      Rabbi Hirshy Minkowicz
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-secondary-50 rounded-xl p-4 sm:p-6 lg:p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary-900 mb-6">
                Send Us a Message
              </h2>
              
              <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="What is this about?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                >
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                >
                  ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 