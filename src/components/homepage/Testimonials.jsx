

import React, { useState } from 'react';
import { motion, AnimatePresence, wrap } from 'framer-motion';
import { fetchTestimonials } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import { Loader2 } from 'lucide-react';
import AnimateOnScroll from '../common/AnimateOnScroll';

const Testimonials = () => {
  const { data: testimonials, loading } = useHomepageData(
    fetchTestimonials, 
    'testimonials', 
    { additionalTables: ['media_assets'] }
  );
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);

  if (loading || !testimonials) {
    return <section className="py-24 bg-white"><Loader2 className="animate-spin" /></section>;
  }

  const i = wrap(0, testimonials.length, page);
  const testimonial = testimonials[i];
  if (!testimonial) return null;

  const paginate = (newDirection) => {
    if (isAnimating) return; // Prevent spam clicking
    setPage([page + newDirection, newDirection]);
  };

  const cardVariants = {
    enter: (direction) => ({
      y: "100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.3 }
    },
    exit: (direction) => ({
      y: "-50%",
      opacity: 0,
      transition: { duration: 0.2 }
    }),
  };

  const envelopeVariants = {
    rest: { rotateX: 0 },
    hover: { rotateX: -180, transition: { duration: 0.5 } }
  };

  const avatarUrl = getStorageUrl(testimonial.media_assets);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Words of Appreciation
          </h2>
          <p className="text-lg text-gray-600 mb-16">
            See what my clients have to say about our collaboration.
          </p>
        </AnimateOnScroll>
        
        <div className="relative h-96 w-full max-w-lg mx-auto flex items-center justify-center">
          {/* Envelope Back */}
          <div className="absolute w-full h-64 bg-blue-500 rounded-lg shadow-2xl" />
          <div 
            className="absolute w-full h-64 rounded-lg overflow-hidden" 
            style={{ perspective: "1000px" }}
          >
            <motion.div 
              className="absolute w-full h-full bg-blue-600 rounded-lg"
              style={{ transformOrigin: "top" }}
              variants={envelopeVariants}
              initial="rest"
              whileInView="hover" // Animate when in view
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* This is the flap */}
              <div 
                className="absolute w-full h-full"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 50%)",
                  backgroundColor: "#2563EB", // a slightly darker blue
                }}
              />
            </motion.div>
          </div>

          {/* Testimonial Card */}
          <AnimatePresence 
            initial={false} 
            custom={direction} 
            mode="wait"
            onExitComplete={() => setIsAnimating(false)}
          >
            <motion.div
              key={page}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationStart={() => setIsAnimating(true)}
              className="absolute w-[90%] bg-white rounded-lg shadow-xl p-8 flex flex-col items-center"
            >
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 -mt-16 border-4 border-white"
                />
              )}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg font-medium text-gray-800 italic mb-4">
                "{testimonial.quote}"
              </p>
              <div className="font-bold text-gray-900">
                {testimonial.name}
                <span className="font-normal text-gray-500 ml-2">
                  | {testimonial.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Envelope Front (covers the bottom of the card) */}
          <div 
            className="absolute w-full h-32 bottom-0"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0, 50% 50%)",
              backgroundColor: "#3B82F6", // a lighter blue
            }}
          />
        </div>
        
        {/* Controls */}
        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => paginate(-1)}
            disabled={isAnimating}
            whileTap={{ scale: 0.9 }}
          >
            <Icon name="ChevronLeft" size={24} />
          </motion.button>
          <motion.button
            className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => paginate(1)}
            disabled={isAnimating}
            whileTap={{ scale: 0.9 }}
          >
            <Icon name="ChevronRight" size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;