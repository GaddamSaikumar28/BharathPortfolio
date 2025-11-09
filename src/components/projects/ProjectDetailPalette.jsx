import React from 'react';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { motion } from 'framer-motion';

const ProjectDetailPalette = ({ colors }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <AnimateOnScroll className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Color Palette</h2>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="w-24 h-24 rounded-lg shadow-md border"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-end h-full p-2">
              <span className="text-xs font-mono mix-blend-difference text-white">
                {color}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimateOnScroll>
  );
};

export default ProjectDetailPalette;