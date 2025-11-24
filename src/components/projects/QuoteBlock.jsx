import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import AnimateOnScroll from '../common/AnimateOnScroll';

const QuoteBlock = ({ quote, source }) => {
  if (!quote) return null;

  return (
    <AnimateOnScroll className="my-20">
      <motion.div
        className="relative p-8 md:p-12 bg-white border-l-8 border-blue-500 shadow-2xl rounded-r-xl"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <Quote className="absolute top-4 left-4 w-12 h-12 text-blue-200 opacity-70" />
        <p className="text-3xl md:text-4xl italic text-gray-800 leading-snug pt-6 pb-4">
          {quote}
        </p>
        <motion.footer
          className="text-right mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-lg font-semibold text-blue-600">
            — {source || 'Client Testimonial'}
          </p>
        </motion.footer>
      </motion.div>
    </AnimateOnScroll>
  );
};

export default QuoteBlock;