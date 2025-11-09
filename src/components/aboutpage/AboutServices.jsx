import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchAboutServices } from '../../api/aboutpage';
import { useHomepageData } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';

const AboutServices = () => {
  const { data: services, loading } = useHomepageData(
    fetchAboutServices,
    'about_services'
  );

  if (loading || !services) {
    return <div className="py-24 bg-gray-50" />;
  }
  
  const gridVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">
            What I Do
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            I offer a complete suite of design services to bring your
            vision from concept to completion.
          </p>
        </AnimateOnScroll>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white p-8 rounded-2xl shadow-lg"
              variants={cardVariants}
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Icon name={service.icon_name} size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutServices;