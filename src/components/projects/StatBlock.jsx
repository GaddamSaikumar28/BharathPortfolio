import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import AnimateOnScroll from '../common/AnimateOnScroll';
// NOTE: AnimateOnScroll is assumed to be a wrapper component using whileInView
// to trigger child animations.

/**
 * Animates a number from 0 up to the target value.
 */
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  // Extract the numeric part and the suffix (e.g., '45%' -> 45 and '%')
  const finalNumber = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(String(finalNumber), '').trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => {
        animate(count, finalNumber, { duration, ease: 'easeOut' });
      }}
    >
      <div className="flex items-baseline justify-center text-7xl font-extrabold text-blue-600 tracking-tighter">
        <motion.span>{rounded}</motion.span>
        {suffix && <span className="ml-2 text-5xl font-light text-blue-400">{suffix}</span>}
      </div>
    </motion.div>
  );
};


const StatBlock = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <AnimateOnScroll className="my-24 p-12 bg-blue-50/50 border border-blue-100 rounded-3xl shadow-xl">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-4 rounded-lg"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 10, stiffness: 100 } },
            }}
          >
            <AnimatedCounter value={stat.value} />
            <p className="mt-4 text-xl font-semibold text-gray-800 uppercase tracking-wide">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </AnimateOnScroll>
  );
};

export default StatBlock;