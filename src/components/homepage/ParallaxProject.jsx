// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { fetchParallaxProject } from '../../api/homepage';
// import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
// import { Loader2 } from 'lucide-react';

// const ParallaxProject = () => {
//   const { data: project, loading } = useHomepageData(
//     fetchParallaxProject, 
//     'parallax_project', 
//     { additionalTables: ['media_assets'] }
//   );
  
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start end', 'end start'],
//   });

//   // Parallax transform for the card
//   const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.85, 1, 1, 0.85]);
//   const y = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [100, 0, 0, -100]);
//   const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

//   if (loading || !project) {
//     return <section className="h-[120vh] bg-white" />;
//   }

//   const imageUrl = getStorageUrl(project.media_id);
//   const logoUrl = getStorageUrl(project.logo_media_id);

//   return (
//     <section ref={sectionRef} className="h-[120vh] bg-white py-24">
//       <div className="sticky top-24 h-screen flex items-center justify-center overflow-hidden">
//         <motion.div
//           className="w-[90%] max-w-5xl bg-white p-8 rounded-3xl shadow-2xl"
//           style={{ scale, y, opacity }}
//         >
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="md:w-3/5">
//               <img
//                 src={imageUrl || 'https://placehold.co/1000x600'}
//                 alt={project.media_id?.alt_text || 'Project Showcase'}
//                 className="w-full rounded-2xl object-cover aspect-video"
//               />
//             </div>
//             <div className="md:w-2/5 flex flex-col justify-center">
//               {logoUrl && (
//                 <img
//                   src={logoUrl}
//                   alt={project.logo_media_id?.alt_text || 'Project Logo'}
//                   className="w-12 h-12 mb-4 rounded-lg"
//                 />
//               )}
//               <h3 className="text-3xl font-bold text-gray-900 mb-3">
//                 {project.title}
//               </h3>
//               <p className="text-gray-600">
//                 {project.description}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ParallaxProject;


import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fetchParallaxProject } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Loader2 } from 'lucide-react';

// 1. Create a new child component for the motion logic
const ParallaxContent = ({ project }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transform for the card
  const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.85, 1, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [100, 0, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  const imageUrl = getStorageUrl(project.media_id);
  const logoUrl = getStorageUrl(project.logo_media_id);

  return (
    <section ref={sectionRef} className="h-[120vh] bg-white py-24">
      <div className="sticky top-24 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="w-[90%] max-w-5xl bg-white p-8 rounded-3xl shadow-2xl"
          style={{ scale, y, opacity }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/5">
              <img
                src={imageUrl || 'https://placehold.co/1000x600'}
                alt={project.media_id?.alt_text || 'Project Showcase'}
                className="w-full rounded-2xl object-cover aspect-video"
              />
            </div>
            <div className="md:w-2/5 flex flex-col justify-center">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={project.logo_media_id?.alt_text || 'Project Logo'}
                  className="w-12 h-12 mb-4 rounded-lg"
                />
              )}
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600">
                {project.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const ParallaxProject = () => {
  const { data: project, loading } = useHomepageData(
    fetchParallaxProject, 
    'parallax_project', 
    { additionalTables: ['media_assets'] }
  );
  
  // 2. The parent component now *only* handles data fetching
  if (loading || !project) {
    // It returns a simple, non-ref'd section while loading
    return <section className="h-[120vh] bg-white" />;
  }

  // 3. Once data is ready, render the child component
  return <ParallaxContent project={project} />;
};

export default ParallaxProject;