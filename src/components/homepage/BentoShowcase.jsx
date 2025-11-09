import React from 'react';
import { motion } from 'framer-motion';
import { fetchBentoItems } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

const BentoShowcase = () => {
  const { data: items, loading } = useHomepageData(
    fetchBentoItems, 
    'bento_items', 
    { additionalTables: ['media_assets'] }
  );

  if (loading || !items) {
    return <section className="py-24 bg-gray-50"><Loader2 className="animate-spin" /></section>;
  }

  const gridVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Latest Work
          </h2>
        </AnimateOnScroll>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
        >
          {items.map((item) => {
            const imageUrl = getStorageUrl(item.media_assets);
            return (
              <motion.div
                key={item.id}
                className={`relative p-6 rounded-2xl shadow-lg overflow-hidden ${item.grid_span || 'col-span-1 row-span-1'} ${imageUrl ? '' : 'bg-blue-100'}`}
                variants={itemVariants}
                whileHover={{ scale: 1.03, zIndex: 10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={item.media_assets?.alt_text || item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="relative z-10 flex flex-col h-full justify-end">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BentoShowcase;