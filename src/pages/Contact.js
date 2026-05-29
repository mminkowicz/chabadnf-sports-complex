import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Boxes, Heart, Mail, Phone, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import mainDedication from '../assets/optimized/main dedication.webp';

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

  const inputClassName = 'w-full rounded-md border border-white/12 bg-white/[0.055] px-4 py-3 text-white shadow-sm transition-colors placeholder:text-white/32 focus:border-primary-300/70 focus:outline-none focus:ring-4 focus:ring-primary-400/15';
  const labelClassName = 'mb-2 block text-sm font-bold text-white/78';

  return (
    <main className="bg-secondary-950 text-white">
      <section className="relative flex min-h-[390px] items-center overflow-hidden bg-secondary-950 pb-14 pt-28 text-white sm:min-h-[430px] sm:pb-16 sm:pt-32 lg:min-h-[450px] lg:pt-36">
        <div className="absolute inset-0">
          <img
            src={mainDedication}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 42%' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_10%,rgba(249,115,22,0.32)_0%,rgba(249,115,22,0.08)_28%,rgba(2,8,15,0)_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(2,8,15,0.98)_0%,rgba(6,14,25,0.84)_44%,rgba(6,14,25,0.34)_76%,rgba(6,14,25,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,8,15,0.9)_0%,rgba(2,8,15,0.2)_48%,rgba(2,8,15,0.58)_100%)]" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="campaign-gold font-display text-5xl font-extrabold leading-[0.98] tracking-normal sm:text-6xl lg:text-7xl">
              Contact Us
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/76 sm:text-xl">
              For more information about the project or to discuss legacy giving please contact:
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="relative overflow-hidden bg-secondary-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(249,115,22,0.16)_0%,rgba(249,115,22,0)_34%),linear-gradient(180deg,#02080f_0%,#08111f_100%)]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ x: -42, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-md border border-white/14 bg-secondary-950/62 p-5 text-white shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-7 lg:p-8"
            >
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                Get In Touch
              </h2>

              <div className="mt-7 space-y-3">
                <div className="flex items-start space-x-3 rounded-md border border-white/10 bg-white/[0.055] p-4 shadow-lg shadow-black/10 sm:space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary-500/15 sm:h-12 sm:w-12">
                    <Mail className="h-5 w-5 text-primary-300 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-white sm:text-base">Email</h3>
                    <p className="text-sm text-white/68 sm:text-base">
                      <a
                        href="mailto:rabbi@chabadnf.org"
                        className="transition-colors duration-200 hover:text-primary-300 hover:underline"
                      >
                        rabbi@chabadnf.org
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rounded-md border border-white/10 bg-white/[0.055] p-4 shadow-lg shadow-black/10 sm:space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary-500/15 sm:h-12 sm:w-12">
                    <Phone className="h-5 w-5 text-primary-300 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-white sm:text-base">Phone</h3>
                    <p className="text-sm text-white/68 sm:text-base">
                      <a
                        href="tel:770-410-9000"
                        className="transition-colors duration-200 hover:text-primary-300 hover:underline"
                      >
                        770-410-9000
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rounded-md border border-white/10 bg-white/[0.055] p-4 shadow-lg shadow-black/10 sm:space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary-500/15 sm:h-12 sm:w-12">
                    <MapPin className="h-5 w-5 text-primary-300 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-white sm:text-base">Address</h3>
                    <p className="text-sm text-white/68 sm:text-base">
                      <a
                        href="https://maps.google.com/?q=10180+Jones+Bridge+Road+Alpharetta+Georgia+30022"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-primary-300 hover:underline"
                      >
                        10180 Jones Bridge Road<br />
                        Alpharetta, Georgia 30022
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rounded-md border border-white/10 bg-white/[0.055] p-4 shadow-lg shadow-black/10 sm:space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary-500/15 sm:h-12 sm:w-12">
                    <Clock className="h-5 w-5 text-primary-300 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-white sm:text-base">Contact Person</h3>
                    <p className="text-sm text-white/68 sm:text-base">
                      Rabbi Hirshy Minkowicz
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 42, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative overflow-hidden rounded-md border border-white/14 bg-secondary-950/62 p-5 pt-8 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-7 sm:pt-10 lg:p-8 lg:pt-10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-600" />
              <h2 className="font-display mb-6 text-3xl font-extrabold text-white sm:text-4xl">
                Send Us a Message
              </h2>

              <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className={labelClassName}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={inputClassName}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClassName}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={inputClassName}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={labelClassName}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={inputClassName}
                    placeholder="What is this about?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClassName}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${inputClassName} resize-none`}
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-md px-6 py-3 font-extrabold shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300/40 ${
                    isSubmitting
                      ? 'cursor-not-allowed bg-white/20 text-white/55'
                      : 'bg-primary-600 text-white shadow-primary-950/15 hover:bg-primary-700'
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
                  className="mt-4 rounded-md border border-green-300/40 bg-green-400/12 p-4 text-green-100"
                >
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-md border border-red-300/40 bg-red-400/12 p-4 text-red-100"
                >
                  Sorry, there was an error sending your message. Please try again or contact us directly.
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-10 rounded-md border border-white/14 bg-secondary-950/62 p-6 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8"
          >
            <div className="max-w-2xl">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-primary-300">
                LAST MILE CAMPAIGN
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Have a Question About the Campaign?
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-white/68 sm:text-lg">
                Reach out and we'll help you choose the right donation or dedication opportunity.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-0">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-primary-400 to-primary-600 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-primary-950/30 ring-1 ring-white/15 transition duration-300 hover:from-primary-500 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40"
              >
                <Heart className="mr-4 h-6 w-6" />
                Donate Now
              </Link>
              <Link
                to="/dedications"
                className="inline-flex items-center justify-center rounded-md border border-white/50 bg-secondary-950/22 px-7 py-3.5 text-base font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <Boxes className="mr-4 h-6 w-6" />
                View Dedications
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
