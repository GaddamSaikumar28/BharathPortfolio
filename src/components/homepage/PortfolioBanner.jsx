import React, { useState } from 'react';
import { motion, AnimatePresence, wrap } from 'framer-motion';
// import { fetchPortfolioBanners } from 'api/homepage';
// import { useHomepageData, getStorageUrl } from 'hooks/useHomepageData';
// import { Icon } from 'components/common/IconMap';
import { Loader2 } from 'lucide-react';
import { fetchPortfolioBanners } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
const textContainerVariants = {
  enter: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const textItemVariants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
};

const PortfolioBanner = () => {
  const { data: banners, loading } = useHomepageData(
    fetchPortfolioBanners,
    'portfolio_banner',
    { additionalTables: ['media_assets'] }
  );
  
  // We store both the page index and the direction of navigation
  const [[page, direction], setPage] = useState([0, 0]);

  if (loading) {
    return (
      <section className="h-[70vh] bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </section>
    );
  }

  if (!banners || banners.length === 0) {
    return null; // Don't render if no banners
  }

  // `wrap` from framer-motion loops the index
  const bannerIndex = wrap(0, banners.length, page);
  const activeBanner = banners[bannerIndex];
  const imageUrl = getStorageUrl(activeBanner.media_assets);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="h-[70vh] min-h-[600px] relative text-white overflow-hidden">
      {/* Background Image Transition */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page} // The key is crucial for AnimatePresence
          src={imageUrl || 'https://placehold.co/1920x1080/333/555?text=Project'}
          alt={activeBanner.media_assets?.alt_text || activeBanner.title}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, ease: 'easeIn' } }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Content Transition */}
      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={page} // Also key the text container
            className="max-w-xl"
            variants={textContainerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold mb-4"
              variants={textItemVariants}
            >
              {activeBanner.title}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-200 mb-8"
              variants={textItemVariants}
            >
              {activeBanner.description}
            </motion.p>
            {/* <motion.a
              href={activeBanner.link_href}
              className="inline-flex items-center bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
              variants={textItemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
            > */}
              {/* {activeBanner.button_text}
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </motion.a> */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute z-20 top-1/2 -translate-y-1/2 w-full flex justify-between container mx-auto px-4 pointer-events-none">
        <motion.button
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white pointer-events-auto"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon name="ChevronLeft" size={24} />
        </motion.button>
        <motion.button
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white pointer-events-auto"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon name="ChevronRight" size={24} />
        </motion.button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full cursor-pointer"
            animate={{ backgroundColor: i === bannerIndex ? '#ffffff' : '#ffffff80' }}
            onClick={() => setPage([i, i > bannerIndex ? 1 : -1])}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioBanner;