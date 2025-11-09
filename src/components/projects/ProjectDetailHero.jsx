import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getStorageUrl } from '../../hooks/useHomepageData';

const ProjectDetailHero = ({ videoUrl, media, title }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax on the hero
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroMediaUrl = getStorageUrl(media);
  
  // Decide whether to show video or image
  const hasVideo = !!videoUrl;

  return (
    <div
      ref={heroRef}
      className="h-[80vh] w-full relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        {hasVideo ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={heroMediaUrl || 'https://placehold.co/1200x800'}
            alt={media?.alt_text || title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-9xl font-extrabold text-white text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h1>
      </div>
    </div>
  );
};

export default ProjectDetailHero;