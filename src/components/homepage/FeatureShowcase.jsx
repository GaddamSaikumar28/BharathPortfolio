// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { fetchFeatureShowcase } from '../../api/homepage';
// import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
// import AnimateOnScroll from '../common/AnimateOnScroll';

// const FeatureShowcase = () => {
//   const { data: features, loading } = useHomepageData(fetchFeatureShowcase, 'feature_showcase_items', { additionalTables: ['media_assets'] });
//   const [activeFeature, setActiveFeature] = useState(0);
//   const refs = useRef([]);

//   useEffect(() => {
//     if (!features || loading) return;

//     refs.current = refs.current.slice(0, features.length);
//     const observers = [];

//     refs.current.forEach((ref, index) => {
//       const observer = new IntersectionObserver(
//         ([entry]) => {
//           if (entry.isIntersecting) {
//             setActiveFeature(index);
//           }
//         },
//         { threshold: 0.5, rootMargin: '-50% 0px -50% 0px' }
//       );

//       if (ref) {
//         observer.observe(ref);
//         observers.push(observer);
//       }
//     });

//     return () => {
//       observers.forEach(observer => observer.disconnect());
//     };
//   }, [features, loading]);

//   if (loading || !features) {
//     return <section className="py-24 bg-white" />;
//   }

//   const activeImage = getStorageUrl(features[activeFeature]?.media_assets);

//   return (
//     <section className="py-24 bg-white">
//       <div className="container mx-auto px-4">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
//             A process built for you
//           </h2>
//         </AnimateOnScroll>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
//           {/* Sticky Image */}
//           <div className="sticky top-24">
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={activeFeature}
//                 src={activeImage || 'https://placehold.co/600x400'}
//                 alt={features[activeFeature]?.media_assets?.alt_text || 'Feature'}
//                 className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]"
//                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: -20 }}
//                 transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//               />
//             </AnimatePresence>
//           </div>
          
//           {/* Text Content */}
//           <div className="flex flex-col space-y-16">
//             {features.map((feature, index) => (
//               <div
//                 key={feature.id}
//                 ref={(el) => (refs.current[index] = el)}
//                 className={`py-8 ${index === activeFeature ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}
//               >
//                 <h3 className="text-3xl font-bold text-gray-900 mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-lg text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeatureShowcase;


import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fetchFeatureShowcase } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';

// Child component to detect when it's in view
const FeatureItem = ({ feature, index, setActiveFeature }) => {
  const ref = React.useRef(null);
  // This hook detects when the item is in the center 50% of the viewport
  const isInView = useInView(ref, {
    rootMargin: "-50% 0px -50% 0px", // Triggers when in the vertical center
    amount: "all",
  });

  React.useEffect(() => {
    if (isInView) {
      setActiveFeature(index);
    }
  }, [isInView, index, setActiveFeature]);

  return (
    <div
      ref={ref}
      className={`py-16 transition-opacity duration-300 ${
        isInView ? "opacity-100" : "opacity-30"
      }`}
    >
      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        {feature.title}
      </h3>
      <p className="text-lg text-gray-600">
        {feature.description}
      </p>
    </div>
  );
};

const FeatureShowcase = () => {
  const { data: features, loading } = useHomepageData(
    fetchFeatureShowcase, 
    'feature_showcase_items', 
    { additionalTables: ['media_assets'] }
  );
  const [activeFeature, setActiveFeature] = useState(0);

  if (loading || !features) {
    return <section className="py-24 bg-white" />;
  }

  const activeImage = getStorageUrl(features[activeFeature]?.media_assets);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            A process built for you
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Sticky Image */}
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFeature}
                src={activeImage || 'https://placehold.co/600x400'}
                alt={features[activeFeature]?.media_assets?.alt_text || 'Feature'}
                className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
            </AnimatePresence>
          </div>
          
          {/* Text Content */}
          <div className="flex flex-col">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.id}
                feature={feature}
                index={index}
                setActiveFeature={setActiveFeature}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;