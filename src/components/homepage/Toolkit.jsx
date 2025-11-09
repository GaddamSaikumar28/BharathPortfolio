// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { fetchToolkitTools } from '../../api/homepage';
// import { useHomepageData } from '../../hooks/useHomepageData';
// import { Icon } from '../common/IconMap';
// import AnimateOnScroll from '../common/AnimateOnScroll';

// const Toolkit = () => {
//   const { data: tools, loading } = useHomepageData(fetchToolkitTools, 'toolkit_tools');
//   const [hovered, setHovered] = useState(null);

//   if (loading || !tools) {
//     return <section className="py-24 bg-gray-900" />;
//   }

//   const radius = 200; // Radius of the circle
//   const numTools = tools.length;
//   const angleStep = Math.PI / (numTools - 1); // 180 degrees

//   return (
//     <section className="py-24 bg-gray-900 text-white overflow-hidden">
//       <div className="container mx-auto px-4 flex flex-col items-center">
//         <AnimateOnScroll className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
//             My Toolkit
//           </h2>
//           <p className="text-lg text-gray-400 max-w-xl">
//             The creative software I use to bring ideas to life.
//           </p>
//         </AnimateOnScroll>

//         <div className="relative w-full h-[300px] flex items-center justify-center">
//           {/* Rotating wheel */}
//           <motion.div
//             className="absolute"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
//           >
//             {tools.map((tool, index) => {
//               const angle = -Math.PI / 2 + (index * angleStep); // Start from top
//               const x = radius * Math.cos(angle);
//               const y = radius * Math.sin(angle);

//               return (
//                 <motion.div
//                   key={tool.id}
//                   className="absolute w-16 h-16"
//                   style={{
//                     transform: `translate(${x}px, ${y}px)`,
//                   }}
//                   onHoverStart={() => setHovered(tool)}
//                   onHoverEnd={() => setHovered(null)}
//                 >
//                   <motion.div
//                     className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
//                     style={{ borderColor: tool.color, borderWidth: 2 }}
//                     animate={{ rotate: -360 }} // Counter-rotate
//                     transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
//                     whileHover={{ scale: 1.2, backgroundColor: tool.color }}
//                   >
//                     <Icon name={tool.icon_name} size={32} style={{ color: tool.color }} />
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           {/* Center Tooltip */}
//           <div className="relative w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center text-center shadow-inner">
//             <AnimatePresence>
//               {hovered ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="font-bold text-lg"
//                   style={{ color: hovered.color }}
//                 >
//                   {hovered.name}
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="text-gray-500 text-sm"
//                 >
//                   Hover an icon
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Toolkit;

import React from 'react';
import { motion } from 'framer-motion';
import { fetchToolkitTools } from '../../api/homepage';
import { useHomepageData } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

const Toolkit = () => {
  const { data: tools, loading } = useHomepageData(fetchToolkitTools, 'toolkit_tools');

  if (loading || !tools) {
    return <section className="py-24 bg-gray-50"><Loader2 className="animate-spin" /></section>;
  }

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <AnimateOnScroll className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Integrate with your existing tools
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            Connect your favorite tools in seconds.
          </p>
        </AnimateOnScroll>

        <div className="relative w-full max-w-3xl">
          <motion.div 
            className="flex flex-wrap justify-center gap-10 md:gap-20"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                animate={{ y: [0, -10, 0] }} // Infinite float
                transition={{
                  duration: 2.5 + (index * 0.3), // Vary speeds
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div 
                  className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                  style={{ rotate: index % 2 === 0 ? -5 : 5 }} // Tilt
                >
                  <Icon name={tool.icon_name} size={40} style={{ color: tool.color || '#111827' }} />
                </div>
                <span className="mt-4 font-semibold text-gray-700">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;