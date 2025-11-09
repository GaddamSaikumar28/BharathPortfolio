import React from 'react';
import { motion } from 'framer-motion';
import { fetchCallToAction } from '../../api/homepage';
import { useHomepageData } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';

const CallToAction = () => {
  const { data: cta, loading } = useHomepageData(fetchCallToAction, 'call_to_action');

  if (loading || !cta) {
    return <section className="py-24 bg-blue-600" />;
  }

  return (
    <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            {cta.title}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            {cta.subtitle}
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Get in Touch <Icon name="ArrowRight" size={20} className="ml-2" />
          </motion.a>
        </AnimateOnScroll>
      </div>
      
      {/* Background Animations */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full"
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full"
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </section>
  );
};

export default CallToAction;