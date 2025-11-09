
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchHeroVariants } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';

// --- HeroVariant1 (Now with original animations) ---
const HeroVariant1 = ({ variant }) => {
  // Animations from your original App.jsx
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2 + 0.5, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.2 + 0.5, duration: 0.01 },
      },
    }),
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', delay: i * 0.2 + 0.7 },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { type: 'spring', delay: i * 0.1 + 0.5 },
    }),
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
      variants={{
        enter: { transition: { staggerChildren: 0.1 } },
        exit: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
      }}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      {/* Decorative SVG Lines (from original App.jsx) */}
      <div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-full h-full" stroke="rgb(229 231 235 / 0.5)">
          <motion.line x1="15%" y1="10%" x2="80%" y2="30%" variants={lineVariants} initial="hidden" animate="visible" custom={1} />
          <motion.line x1="80%" y1="30%" x2="75%" y2="80%" variants={lineVariants} initial="hidden" animate="visible" custom={2} />
          <motion.line x1="75%" y1="80%" x2="10%" y2="70%" variants={lineVariants} initial="hidden" animate="visible" custom={3} />
          <motion.line x1="10%" y1="70%" x2="15%" y2="10%" variants={lineVariants} initial="hidden" animate="visible" custom={4} />
        </svg>
      </div>

      {/* Dynamic Icons */}
      {variant.hero_variant1_icons.map((icon, i) => (
        <motion.div
          key={icon.id}
          className="absolute text-blue-600 p-3 bg-white rounded-full shadow-xl"
          style={{
            top: icon.position?.top,
            left: icon.position?.left,
            right: icon.position?.right,
            bottom: icon.position?.bottom,
          }}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          custom={i}
        >
          <Icon name={icon.icon_name} size={icon.position?.size || 20} />
        </motion.div>
      ))}
      
      {/* Dynamic Text with Stagger Animation */}
      <motion.h2
        className="text-sm font-bold text-blue-600 uppercase"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        {variant.subtitle}
      </motion.h2>
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gray-900 my-4"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        {variant.title}
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 max-w-lg"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        {variant.paragraph}
      </motion.p>
    </motion.div>
  );
};

// --- HeroVariant2 (Unchanged) ---
const HeroVariant2 = ({ variant }) => {
  // ... (this component was fine, code is unchanged) ...
  const textVariants = {
    enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
    exit: { opacity: 0, y: 20 },
  };
  const gridVariants = {
    enter: { transition: { staggerChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
  };
  const photoVariants = (delay = 0, rotation = 0) => ({
    enter: { opacity: 1, scale: 1, rotate: rotation, transition: { type: 'spring', stiffness: 100, delay } },
    exit: { opacity: 0, scale: 0.8, rotate: rotation },
  });

  return (
    <motion.div
      className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8"
      variants={gridVariants}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <div className="max-w-md">
        <motion.h2
          className="text-sm font-bold text-blue-600 uppercase"
          variants={textVariants}
        >
          {variant.subtitle}
        </motion.h2>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 my-4"
          variants={textVariants}
        >
          {variant.title}
        </motion.h1>
        <motion.p className="text-lg text-gray-600" variants={textVariants}>
          {variant.paragraph}
        </motion.p>
      </div>
      <motion.div
        className="grid grid-cols-3 gap-4"
        variants={gridVariants}
      >
        {variant.hero_variant2_photos.map((photo) => {
          const imageUrl = getStorageUrl(photo.media_assets);
          if (!imageUrl) return null;

          return (
            <motion.div
              key={photo.id}
              variants={photoVariants(photo.delay, photo.rotation)}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: photo.delay,
                ease: 'easeInOut',
              }}
            >
              <img
                src={imageUrl}
                alt={photo.media_assets?.alt_text || 'Hero Image'}
                className="rounded-lg shadow-lg object-cover w-full h-auto aspect-[3/4]"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

// --- Main Hero Component (Unchanged) ---
const Hero = () => {
  const { data: variants, loading } = useHomepageData(
    fetchHeroVariants, 
    'hero_variants', 
    { additionalTables: ['hero_variant1_icons', 'hero_variant2_photos', 'media_assets'] }
  );
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (variants && variants.length > 1) {
      const timer = setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % variants.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [heroIndex, variants]);

  if (loading) {
    return (
      <section className="h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </section>
    );
  }

  if (!variants || variants.length === 0) {
    return <section className="h-screen bg-gray-100" />;
  }

  const activeVariant = variants[heroIndex];
  if (!activeVariant) return null;

  const Component = activeVariant.variant_type === 'variant1' ? HeroVariant1 : HeroVariant2;

  return (
    <section className="relative h-screen overflow-hidden bg-gray-50">
      <AnimatePresence mode="wait">
        <Component key={activeVariant.id} variant={activeVariant} />
      </AnimatePresence>
    </section>
  );
};

export default Hero;