import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import { fetchAboutCTA } from '../../api/aboutpage';
import { useHomepageData } from '../../hooks/useHomepageData';

const AboutCTA = () => {
  const { data: cta, loading } = useHomepageData(fetchAboutCTA, 'about_cta');

  if (loading) return <div className="py-24 bg-white" />;
  if (!cta) return null;

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: 'spring' },
            },
          }}
        >
          <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
            {cta.title}
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
            {cta.description}
          </p>
          <motion.div
            className="mt-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3.5 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700"
            >
              {cta.button_text} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutCTA;