import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getStorageUrl } from '../../hooks/useHomepageData';

const ProjectCard = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };
  
  // Use getStorageUrl to handle placeholders vs. real paths
  const imageUrl = getStorageUrl(project.heroImage || project.hero_media);

  return (
    <motion.div
      layout
      variants={cardVariants}
      className="group"
    >
      <Link to={`/projects/${project.slug}`}>
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <motion.img
            src={imageUrl || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(' ','+')}`}
            alt={project.heroAlt || project.title}
            className="w-full h-80 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="py-6">
          <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
          <p className="text-gray-600 mt-2">{project.category}</p>
          <div
            className="inline-flex items-center text-blue-600 font-medium mt-4 group-hover:underline"
          >
            View Case Study
            <motion.span
              className="ml-2"
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 0.5,
              }}
              animate={{ x: [0, 5, 0] }} // Add a subtle animation
            >
              <ArrowRight />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;