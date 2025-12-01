// import React from 'react';
// import { motion } from 'framer-motion';
// import { fetchBentoItems } from '../../api/homepage';
// import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
// import { Icon } from '../common/IconMap';
// import AnimateOnScroll from '../common/AnimateOnScroll';
// import { Loader2 } from 'lucide-react';

// const BentoShowcase = () => {
//   const { data: items, loading } = useHomepageData(
//     fetchBentoItems, 
//     'bento_items', 
//     { additionalTables: ['media_assets'] }
//   );

//   if (loading || !items) {
//     return <section className="py-24 bg-gray-50"><Loader2 className="animate-spin" /></section>;
//   }

//   const gridVariants = {
//     visible: { transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20, scale: 0.95 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       scale: 1,
//       transition: { type: 'spring', stiffness: 100 }
//     },
//   };

//   return (
//     <section className="py-24 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
//             Latest Work
//           </h2>
//         </AnimateOnScroll>
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//           variants={gridVariants}
//         >
//           {items.map((item) => {
//             const imageUrl = getStorageUrl(item.media_assets);
//             return (
//               <motion.div
//                 key={item.id}
//                 className={`relative p-6 rounded-2xl shadow-lg overflow-hidden ${item.grid_span || 'col-span-1 row-span-1'} ${imageUrl ? '' : 'bg-blue-100'}`}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.03, zIndex: 10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
//               >
//                 {imageUrl && (
//                   <img
//                     src={imageUrl}
//                     alt={item.media_assets?.alt_text || item.title}
//                     className="absolute inset-0 w-full h-full object-cover"
//                   />
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                 <div className="relative z-10 flex flex-col h-full justify-end">
//                   <h3 className="text-xl font-bold text-white">{item.title}</h3>
//                   <p className="text-gray-200 text-sm">{item.description}</p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default BentoShowcase;
import React from 'react';
import { motion } from 'framer-motion';
import { fetchBentoItems } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

const BentoShowcase = () => {
  const { data: items, loading } = useHomepageData(
    fetchBentoItems, 
    'bento_items', 
    { additionalTables: ['media_assets'] }
  );

  if (loading || !items) {
    return (
      <section className="py-24 bg-gray-50 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-gray-900 w-8 h-8" />
      </section>
    );
  }

  // Helper to make database classes responsive
  // If DB says "col-span-2", we convert it to "col-span-1 md:col-span-2"
  // This prevents items from being wider than the screen on mobile
  const getResponsiveClass = (spanClass) => {
    if (!spanClass) return 'col-span-1 row-span-1';
    
    // Split the string (e.g., "col-span-2 row-span-2")
    const classes = spanClass.split(' ');
    
    // Prefix each class with 'md:' and add default mobile classes
    const responsiveClasses = classes.map(c => `md:${c}`).join(' ');
    
    return `col-span-1 row-span-1 ${responsiveClasses}`;
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    },
  };

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <AnimateOnScroll className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Curated Work
          </h2>
          <p className="text-lg text-gray-500">
             A collection of designs, experiments, and featured projects.
          </p>
        </AnimateOnScroll>

        <motion.div
          // grid-flow-dense fills empty gaps automatically
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-6 grid-flow-dense"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
        >
          {items.map((item) => {
            const imageUrl = getStorageUrl(item.media_assets);
            const responsiveSpan = getResponsiveClass(item.grid_span);

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`
                  group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500
                  ${responsiveSpan} 
                  ${imageUrl ? 'bg-gray-900' : 'bg-gray-200'}
                `}
              >
                {/* Background Image / Placeholder */}
                {imageUrl ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item.media_assets?.alt_text || item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <ImageIcon className="w-12 h-12 text-gray-300" />
                  </div>
                )}

                {/* Dark Gradient Overlay (Only visible on images) */}
                {imageUrl && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                )}

                {/* Content Container */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-start z-10">
                  
                  {/* Floating Action Icon (Appears on Hover) */}
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>

                  {/* Text Content */}
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className={`text-xl font-bold mb-1 ${imageUrl ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className={`text-sm line-clamp-2 ${imageUrl ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Glass Border Effect */}
                <div className="absolute inset-0 border-2 border-white/5 rounded-3xl pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BentoShowcase;