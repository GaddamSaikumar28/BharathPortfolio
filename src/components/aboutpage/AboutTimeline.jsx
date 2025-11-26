
// // import React, { useRef } from 'react';
// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import { Loader2 } from 'lucide-react';
// // import { fetchAboutTimeline } from '../../api/aboutpage';
// // import { useHomepageData } from '../../hooks/useHomepageData';
// // import AnimateOnScroll from '../common/AnimateOnScroll';

// // // 1. --- Child component for animation ---
// // // This component is *only* rendered when 'timeline' data exists.
// // const AboutTimelineContent = ({ timeline }) => {
// //   const timelineRef = useRef(null);
  
// //   // 2. All refs and hooks are now safe
// //   const { scrollYProgress } = useScroll({
// //     target: timelineRef,
// //     offset: ['start end', 'end start'],
// //   });

// //   const x = useTransform(
// //     scrollYProgress,
// //     [0.1, 0.9],
// //     ['0%', `-${100 - 100 / (timeline.length || 1)}%`]
// //   );

// //   return (
// //     <div className="py-24 bg-gray-50">
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// //         <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
// //           <h2 className="text-4xl font-extrabold text-gray-900">
// //             My Journey
// //           </h2>
// //           <p className="text-lg text-gray-600 mt-4">
// //             A look back at the key milestones in my career.
// //           </p>
// //         </AnimateOnScroll>
// //       </div>

// //       {/* 3. The ref is now attached to this div */}
// //       <div
// //         ref={timelineRef}
// //         className="h-[300vh] md:h-[150vh] w-full"
// //       >
// //         <div className="sticky top-0 h-screen flex items-center overflow-hidden">
// //           <motion.div
// //             className="flex h-96 items-center"
// //             style={{ x, paddingLeft: '5vw', paddingRight: '5vw' }}
// //           >
// //             {timeline.map((item) => (
// //               <TimelineItem key={item.id} item={item} />
// //             ))}
// //           </motion.div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // --- (TimelineItem is unchanged) ---
// // const TimelineItem = ({ item }) => (
// //   <div className="relative w-80 h-full flex-shrink-0 mr-8 p-8 bg-white rounded-2xl shadow-xl">
// //     <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
// //       {item.year}
// //     </div>
// //     <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">{item.title}</h3>
// //     <p className="text-gray-600">{item.description}</p>
// //   </div>
// // );

// // // 4. --- Parent component for data fetching ---
// // const AboutTimeline = () => {
// //   const { data: timeline, loading } = useHomepageData(
// //     fetchAboutTimeline,
// //     'about_timeline'
// //   );

// //   // 5. This is safe. We return a simple div while loading.
// //   if (loading || !timeline) {
// //     return <div className="py-24 bg-gray-50" />;
// //   }

// //   // 6. Once data is loaded, render the child component.
// //   return <AboutTimelineContent timeline={timeline} />;
// // };

// // export default AboutTimeline;
// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { fetchAboutTimeline } from '../../api/aboutpage';
// import { useHomepageData } from '../../hooks/useHomepageData';
// import AnimateOnScroll from '../common/AnimateOnScroll';

// const AboutTimeline = () => {
//   const { data: timeline, loading } = useHomepageData(
//     fetchAboutTimeline,
//     'about_timeline'
//   );

//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start end', 'end center'],
//   });

//   const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

//   if (loading || !timeline) {
//     return <div className="py-24 bg-gray-50" />;
//   }

//   return (
//     <div className="py-24 bg-gray-50 overflow-hidden" ref={containerRef}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
//         {/* Section Header */}
//         <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
//           <h2 className="text-4xl font-extrabold text-gray-900">
//             My Journey
//           </h2>
//           <p className="text-lg text-gray-600 mt-4">
//             The milestones and moments that defined my path.
//           </p>
//         </AnimateOnScroll>

//         <div className="relative">
//           {/* Central Line (Desktop: Center, Mobile: Left) */}
//           <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
          
//           {/* Animated Filling Line */}
//           <motion.div 
//             style={{ height: lineHeight }}
//             className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 w-1 bg-blue-600 rounded-full origin-top z-10"
//           />

//           <div className="space-y-12">
//             {timeline.map((item, index) => (
//               <TimelineItem 
//                 key={item.id} 
//                 item={item} 
//                 index={index} 
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TimelineItem = ({ item, index }) => {
//   const isEven = index % 2 === 0;

//   return (
//     <div className={`relative flex flex-col md:flex-row items-center ${
//       isEven ? 'md:flex-row-reverse' : ''
//     }`}>
      
//       {/* 1. Spacer for the other side (Desktop only) */}
//       <div className="hidden md:block w-1/2" />

//       {/* 2. Central Dot & Year */}
//       <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
//         <motion.div
//           initial={{ scale: 0 }}
//           whileInView={{ scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//           className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
//         >
//           <div className="w-3 h-3 bg-white rounded-full" />
//         </motion.div>
//       </div>

//       {/* 3. Content Card */}
//       <motion.div
//         initial={{ opacity: 0, x: isEven ? -50 : 50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className={`w-full md:w-1/2 pl-20 md:pl-0 ${
//           isEven ? 'md:pr-16' : 'md:pl-16'
//         }`}
//       >
//         <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative group">
          
//           {/* Year Badge (Visible inside card for better context) */}
//           <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
//             {item.year}
//           </div>

//           <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
//             {item.title}
//           </h3>
//           <p className="text-gray-600 leading-relaxed">
//             {item.description}
//           </p>

//           {/* Decorative Arrow pointing to center */}
//           <div className={`hidden md:block absolute top-8 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45 ${
//             isEven 
//               ? '-right-2.5 border-r-0 border-b-0' 
//               : '-left-2.5 border-t-0 border-l-0 border-r border-b' // Adjust border sides based on flip
//           }`} />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AboutTimeline;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchAboutTimeline } from '../../api/aboutpage';
import { useHomepageData } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';

const AboutTimeline = () => {
  const { data: timeline, loading } = useHomepageData(
    fetchAboutTimeline,
    'about_timeline'
  );

  const containerRef = useRef(null);
  
  // Hook runs unconditionally (Safe now because the ref is always attached below)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    // FIX: Ref is attached to this outer div which ALWAYS renders
    <div className="py-24 bg-gray-50 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            The milestones and moments that defined my path.
          </p>
        </AnimateOnScroll>

        {/* LOADING STATE: Rendered inside the container */}
        {(loading || !timeline) ? (
          <div className="flex justify-center items-center h-64">
             <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : (
          /* ACTUAL CONTENT */
          <div className="relative">
            {/* Central Line (Desktop: Center, Mobile: Left) */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
            
            {/* Animated Filling Line */}
            <motion.div 
              style={{ height: lineHeight }}
              className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 w-1 bg-blue-600 rounded-full origin-top z-10"
            />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <TimelineItem 
                  key={item.id} 
                  item={item} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center ${
      isEven ? 'md:flex-row-reverse' : ''
    }`}>
      
      {/* 1. Spacer for the other side (Desktop only) */}
      <div className="hidden md:block w-1/2" />

      {/* 2. Central Dot */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </motion.div>
      </div>

      {/* 3. Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`w-full md:w-1/2 pl-20 md:pl-0 ${
          isEven ? 'md:pr-16' : 'md:pl-16'
        }`}
      >
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative group">
          
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            {item.year}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>

          {/* Decorative Arrow */}
          <div className={`hidden md:block absolute top-8 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45 ${
            isEven 
              ? '-right-2.5 border-r-0 border-b-0' 
              : '-left-2.5 border-t-0 border-l-0 border-r border-b'
          }`} />
        </div>
      </motion.div>
    </div>
  );
};

export default AboutTimeline;