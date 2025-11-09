import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchNextProject } from '../../api/projectspage';
import { getStorageUrl } from '../../hooks/useHomepageData';

const ProjectDetailNext = ({ currentSlug }) => {
  const [nextProject, setNextProject] = useState(null);

  useEffect(() => {
    const loadNext = async () => {
      const project = await fetchNextProject(currentSlug);
      setNextProject(project);
    };
    loadNext();
  }, [currentSlug]);

  if (!nextProject) return null;
  
  const imageUrl = getStorageUrl(nextProject.hero_media);

  return (
    <div className="bg-gray-900 text-white">
      <Link to={`/projects/${nextProject.slug}`} className="group">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-lg font-medium text-blue-300">Next Project</p>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white my-4">
                {nextProject.title}
              </h3>
              <div
                className="inline-flex items-center text-xl font-medium text-white"
              >
                View Case Study
                <motion.span 
                //   className="ml-2"
                  transition={{ type: 'spring' }}
                  // Animate the arrow on group-hover
                  className="ml-2 transition-transform group-hover:translate-x-2"
                >
                  <ArrowRight />
                </motion.span>
              </div>
            </motion.div>
          </div>
          
          {/* Background Image */}
          {imageUrl && (
            <motion.div 
              className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
            >
              <motion.img
                src={imageUrl.replace('800x800', '1200x600')} // Use a wider image
                alt={nextProject.title}
                className="w-full h-full object-cover"
                style={{ scale: 1.05 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.7 }}
              />
            </motion.div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProjectDetailNext;