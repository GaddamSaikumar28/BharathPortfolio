import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchAboutValues } from '../../api/aboutpage';
import { useHomepageData } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';

const AboutValues = () => {
  const { data: values, loading } = useHomepageData(
    fetchAboutValues,
    'about_values'
  );

  if (loading || !values) {
    return <div className="py-24 bg-white" />;
  }
  
  const gridVariants = {
    visible: { transition: { staggerChildren: 0.15 } },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">
            My Core Values
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            The principles that guide my work and collaboration.
          </p>
        </AnimateOnScroll>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
        >
          {values.map((value) => (
            <motion.div
              key={value.id}
              className="text-center"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                <Icon name={value.icon_name} size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutValues;