import React from 'react';
import { motion, useInView } from 'framer-motion';
import { fetchTeamShowcase } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Loader2 } from 'lucide-react';
import AnimateOnScroll from '../common/AnimateOnScroll';

const TeamShowcase = () => {
  const { data, loading } = useHomepageData(
    fetchTeamShowcase, 
    'team_showcase', 
    { additionalTables: ['team_showcase_photos', 'media_assets'] }
  );
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (loading || !data) {
    return <section className="py-24 bg-gray-50"><Loader2 className="animate-spin" /></section>;
  }

  const { text, photos } = data;

  const gridVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const photoVariants = (delay = 0, rotation = 0) => ({
    hidden: { opacity: 0, scale: 0.8, rotate: rotation },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: rotation,
      transition: { type: 'spring', stiffness: 100, delay } 
    },
  });

  return (
    <section className="py-24 bg-gray-50 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo Grid */}
          <motion.div
            className="grid grid-cols-2 grid-rows-2 gap-6"
            variants={gridVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {photos.map((photo, i) => {
              const imageUrl = getStorageUrl(photo.media_assets);
              if (!imageUrl) return null;
              
              const isTall = i === 0 || i === 3; // Example logic for varied heights
              return (
                <motion.div
                  key={photo.id}
                  className={`
                    ${isTall ? 'row-span-2' : 'row-span-1'}
                    ${i === 1 ? 'mt-8' : ''}
                    ${i === 3 ? '-mt-8' : ''}
                  `}
                  variants={photoVariants(photo.delay, photo.rotation)}
                >
                  <img
                    src={imageUrl}
                    alt={photo.media_assets?.alt_text || 'Team photo'}
                    className="rounded-2xl shadow-xl object-cover w-full h-full"
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Text Content */}
          <AnimateOnScroll>
            <h2 className="text-sm font-bold text-blue-600 uppercase mb-2">
              {text.subtitle}
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {text.title}
            </h3>
            <p className="text-lg text-gray-600">
              {text.description}
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default TeamShowcase;