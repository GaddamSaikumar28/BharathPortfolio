import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Reusable component for animating text word-by-word on scroll.
 */
const AnimatedTextWord = ({ text, el: El = 'p', className, ...props }) => {
  const ref = useRef(null);
  // Trigger when 20% of the element is in view, run only once
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const wordVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(2px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.02, // Stagger delay for each word
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  if (!text) return null;

  return (
    <El ref={ref} className={className} {...props}>
      {/* We need a parent motion.span to apply the initial/animate props */}
      <motion.span initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            custom={i}
            className="inline-block" // Ensures words wrap correctly
            style={{ marginRight: '0.25em' }} // Adds space between words
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </El>
  );
};

export default AnimatedTextWord;