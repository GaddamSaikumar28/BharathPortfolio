// import React from 'react';
// import { motion } from 'framer-motion';
// import { getStorageUrl } from '../../hooks/useHomepageData';
// import AnimateOnScroll from '../common/AnimateOnScroll';

// const ProjectDetailGallery = ({ gallery }) => {
//   if (!gallery || gallery.length === 0) return null;

//   return (
//     <AnimateOnScroll className="mt-16">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">Gallery</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {gallery.map((image, index) => {
//           const imageUrl = getStorageUrl(image.url); // Use helper
//           if (!imageUrl) return null;
          
//           return (
//             <motion.div
//               key={index}
//               className="overflow-hidden rounded-lg shadow-lg"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <img
//                 src={imageUrl}
//                 alt={image.alt || `Gallery image ${index + 1}`}
//                 className="w-full h-auto object-cover"
//               />
//             </motion.div>
//           );
//         })}
//       </div>
//     </AnimateOnScroll>
//   );
// };

// export default ProjectDetailGallery;



import React from 'react';
import { motion } from 'framer-motion';
import { getStorageUrl } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';

const ProjectDetailGallery = ({ gallery }) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <AnimateOnScroll className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gallery.map((item, index) => { // Renamed 'image' to 'item' for clarity
          // --- FIX 1: Access the nested media object and file_path ---
          const imageUrl = getStorageUrl(item.media?.file_path); // Use helper
          if (!imageUrl) return null;
          
          return (
            <motion.div
              // --- FIX 2: Use a more stable key if available, like file_path ---
              key={item.media?.file_path || index}
              className="overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={imageUrl}
                // --- FIX 3: Access the nested alt_text from the media object ---
                alt={item.media?.alt_text || `Gallery image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </AnimateOnScroll>
  );
};

export default ProjectDetailGallery;