import React from 'react';
import { motion } from 'framer-motion';
import { fetchServices } from '../../api/homepage';
import { useHomepageData } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Icon } from '../common/IconMap';

const Services = () => {
  const { data: features, loading } = useHomepageData(fetchServices, 'services');

  if (loading || !features) {
    return <section className="py-24 bg-gray-50" />;
  }

  const gridVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
          <h2 className="text-sm font-bold text-blue-600 uppercase mb-2">
            My Design Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Building for everyone
          </h3>
        </AnimateOnScroll>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              className="bg-white p-8 rounded-2xl shadow-lg"
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Icon name={feature.icon_name} size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;