import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchFAQs } from '../../api/homepage';
import { useHomepageData } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout className="border-b border-gray-200">
      <motion.button
        className="flex justify-between items-center w-full py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
        layout
      >
        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="ChevronDown" size={24} className="text-blue-600" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { data: faqs, loading } = useHomepageData(fetchFAQs, 'faqs');

  if (loading || !faqs) {
    return <section className="py-24 bg-gray-50"><Loader2 className="animate-spin" /></section>;
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
        </AnimateOnScroll>
        <motion.div layout className="bg-white p-8 rounded-2xl shadow-lg">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;