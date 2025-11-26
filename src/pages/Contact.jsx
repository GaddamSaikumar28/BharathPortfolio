

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Check,
  Loader,
  Mail,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useForm } from 'react-hook-form'; // Using react-hook-form
import {
  fetchContactPageContent,
  submitContactForm,
} from '../api/contactpage';
import { Icon } from '../components/common/IconMap'; // Use our IconMap
import AnimateOnScroll from '../components/common/AnimateOnScroll';

// --- Kinetic Text Header (Now Dynamic) ---
const KineticHeader = ({ staticText, words }) => {
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    if (words.length <= 1) return; // Don't cycle if only one word
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const nextIndex = (words.indexOf(prev) + 1) % words.length;
        return words[nextIndex];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [words]);

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex flex-wrap text-5xl md:text-7xl font-bold tracking-tighter text-gray-900">
      <span className="mr-4">{staticText}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="text-blue-600"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// --- Social Links (Now Dynamic) ---
const SocialLinks = ({ socials, title }) => (
  <AnimateOnScroll className="space-y-4">
    <h3 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h3>
    {socials.map((link, i) => (
      <motion.a
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-lg text-gray-600 hover:text-blue-600 group"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <Icon
          name={link.icon_name}
          className="w-6 h-6 mr-3 text-gray-400 group-hover:text-blue-600"
        />
        {link.platform}
      </motion.a>
    ))}
  </AnimateOnScroll>
);

// --- Floating Shape (Unchanged) ---
const FloatingShape = () => (
  <motion.div
    className="w-64 h-64"
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 15, -10, 0],
      y: [0, -20, 0],
    }}
    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
  >
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-30 blur-2xl" />
    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-30 blur-2xl -mt-10" />
  </motion.div>
);

// --- Form Input Components (for react-hook-form) ---
const FormInput = ({ label, name, register, errors, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      className={`p-3 border rounded-lg ${
        errors[name] ? 'border-red-500' : 'border-gray-300'
      }`}
      {...register(name)}
      {...rest}
    />
    {errors[name] && (
      <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
    )}
  </div>
);

const FormSelect = ({ label, name, register, errors, children, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={name}
      className={`p-3 border rounded-lg bg-white ${
        errors[name] ? 'border-red-500' : 'border-gray-300'
      }`}
      {...register(name)}
      {...rest}
    >
      {children}
    </select>
    {errors[name] && (
      <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
    )}
  </div>
);

const FormTextarea = ({ label, name, register, errors, ...rest }) => (
  <div className="flex flex-col sm:col-span-2">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={name}
      rows="5"
      className={`p-3 border rounded-lg ${
        errors[name] ? 'border-red-500' : 'border-gray-300'
      }`}
      {...register(name)}
      {...rest}
    />
    {errors[name] && (
      <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
    )}
  </div>
);

// --- Main Contact Page Component ---
export default function Contact() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState('idle'); // idle | loading | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      service_id: '',
      budget_id: '',
      timeline: '',
      message: '',
    },
  });

  // Fetch all page content on load
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const data = await fetchContactPageContent();
      setContent(data);
      setLoading(false);
    };
    loadContent();
  }, []);

  const onSubmit = async (formData) => {
    setFormState('loading');
    try {
      const { success } = await submitContactForm(formData);
      if (success) {
        setFormState('success');
        reset(); // Clear the form
        setTimeout(() => setFormState('idle'), 3000); // Reset after 3s
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000); // Reset after 3s
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
      </div>
    );
  }

  const { config, services, budgets, socials } = content;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* --- Left Side: Header & Form --- */}
        <div>
          <KineticHeader
            staticText={config?.title_static || "Let's build something"}
            words={config?.title_animated || ['Awesome']}
          />
          <p className="mt-6 text-lg text-gray-600">
            Have a project in mind? Or just want to say hi?
            Fill out the form, and I'll get back to you.
          </p>

          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="my-10 p-8 bg-green-100 text-green-800 rounded-lg text-center"
              >
                <Check className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Message Sent!</h2>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormInput
                  label="Your Name"
                  name="name"
                  register={register}
                  errors={errors}
                  rules={{ required: 'Name is required' }}
                  placeholder="Jane Doe"
                />
                <FormInput
                  label="Your Email"
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  placeholder="jane.doe@example.com"
                />
                {/* <FormSelect
                  label="Service of Interest"
                  name="service_id"
                  register={register}
                  errors={errors}
                >
                  <option value="">Select a service...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </FormSelect>
                <FormSelect
                  label="Your Budget"
                  name="budget_id"
                  register={register}
                  errors={errors}
                >
                  <option value="">Select your budget...</option>
                  {budgets.map((budget) => (
                    <option key={budget.id} value={budget.id}>
                      {budget.label}
                    </option>
                  ))}
                </FormSelect>
                <FormInput
                  label="Timeline"
                  name="timeline"
                  register={register}
                  errors={errors}
                  placeholder="e.g., 'In 3-6 months'"
                  className="sm:col-span-2"
                />
                <FormTextarea
                  label="Message"
                  name="message"
                  register={register}
                  errors={errors}
                  rules={{ required: 'Message is required' }}
                  placeholder="Tell me about your project..."
                /> */}
                <motion.div
                  className="sm:col-span-2 flex justify-start"
                  layout
                >
                  <motion.button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="inline-flex items-center bg-blue-600 text-white px-8 py-3.5 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transition-all duration-300 w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {formState === 'idle' && (
                        <motion.span
                          key="idle"
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          Send Message <Send className="w-5 h-5 ml-2" />
                        </motion.span>
                      )}
                      {formState === 'loading' && (
                        <motion.span
                          key="loading"
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          Submitting...
                          <Loader className="w-5 h-5 ml-2 animate-spin" />
                        </motion.span>
                      )}
                      {formState === 'error' && (
                        <motion.span
                          key="error"
                          className="flex items-center bg-red-500 text-white px-8 py-3.5 -m-3.5 rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          Error! Try again.
                          <AlertCircle className="w-5 h-5 ml-2" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* --- Right Side: Info & Visual --- */}
        <div className="space-y-12">
          <SocialLinks
            socials={socials}
            title={config?.reach_out_title || 'Or reach out directly'}
          />
          <div className="flex items-center justify-center h-64 md:h-96">
            <FloatingShape />
          </div>
        </div>
      </div>
    </div>
  );
}