// --- In components/projects/detail/DetailHero.jsx ---
import React from 'react';
import { motion } from 'framer-motion';

const DetailHero = ({ title, description, media, tier }) => {
  const mediaUrl = media?.file_path || 'https://placehold.co/1920x800/222/FFF?text=Hero+Image';
  const tierColor = tier?.color_hex || '#3b82f6';
  
  const headerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.6, 0.05, -0.01, 0.9] } }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Media (Parallax effect) */}
        <motion.div 
            className="absolute inset-0 z-0"
            style={{ 
                backgroundImage: `url(${mediaUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center'
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm z-10" />

        {/* Content */}
        <div className="relative z-20 text-center max-w-4xl px-4">
            {tier && (
                <motion.span 
                    className="inline-block text-sm font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4 shadow-xl"
                    style={{ backgroundColor: tierColor, color: '#FFFFFF' }}
                    variants={headerVariants}
                >
                    {tier.name}
                </motion.span>
            )}
            <motion.h1 
                className="text-7xl font-extrabold text-white leading-tight mb-4"
                variants={headerVariants}
            >
                {title}
            </motion.h1>
            <motion.p 
                className="text-xl text-gray-300 font-light max-w-2xl mx-auto"
                variants={headerVariants}
            >
                {description}
            </motion.p>
            <motion.div variants={headerVariants} className="mt-8">
                <a href="#case-study" className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-500 transition-colors inline-flex items-center">
                    Read Case Study
                </a>
            </motion.div>
        </div>
    </div>
  );
};

export default DetailHero;