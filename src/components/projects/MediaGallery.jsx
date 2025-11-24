// --- In components/projects/detail/MediaGallery.jsx ---
import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  initial: { opacity: 0, scale: 0.8, rotateX: 90, transformPerspective: 1000 },
  animate: { opacity: 1, scale: 1, rotateX: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

const MediaGallery = ({ images }) => {
    if (!images || images.length === 0) {
        return <p className="text-gray-500 text-center">No high-quality gallery images provided.</p>;
    }
    
    // Simple logic for a grid layout: first image large, rest in a grid
    const featuredImage = images[0];
    const gridImages = images.slice(1);

    return (
        <motion.div className="space-y-8" initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
            
            {/* Featured Image (Large and Prominent) */}
            {featuredImage && (
                <motion.div variants={itemVariants} className="relative aspect-video">
                    <img 
                        src={featuredImage.media?.file_path || 'https://placehold.co/1200x675/111/FFF?text=Featured+Visual'} 
                        alt={featuredImage.media?.alt_text || 'Featured Project Screenshot'} 
                        className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-blue-400/50"
                    />
                    <div className="absolute inset-0 bg-black/10 rounded-3xl pointer-events-none" />
                </motion.div>
            )}

            {/* Grid of Smaller Images (Staggered Animation) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gridImages.map((item, index) => (
                    <motion.div 
                        key={item.order || index} 
                        variants={itemVariants} 
                        className="relative aspect-square overflow-hidden"
                    >
                        <img 
                            src={item.media?.file_path || 'https://placehold.co/400x400/333/FFF?text=Gallery+Visual'} 
                            alt={item.media?.alt_text || `Gallery item ${index + 1}`} 
                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 ring-2 ring-inset ring-gray-700/50 rounded-xl pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default MediaGallery;