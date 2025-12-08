// // // import React from 'react';
// // // import { motion } from 'framer-motion';
// // // import { fetchLogoCloud } from '../../api/homepage';
// // // import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';

// // // const LogoCloud = () => {
// // //   const { data: logos, loading } = useHomepageData(fetchLogoCloud, 'logo_cloud', { additionalTables: ['media_assets'] });

// // //   if (loading || !logos || logos.length === 0) {
// // //     return <div className="py-12 bg-white" />; // Render empty space
// // //   }

// // //   // Duplicate logos for seamless scroll
// // //   const allLogos = [...logos, ...logos];

// // //   return (
// // //     <div className="py-12 bg-white">
// // //       <div className="container mx-auto px-4">
// // //         <p className="text-center text-sm font-semibold text-gray-500 mb-6">
// // //           Collaborated with brands
// // //         </p>
// // //         <div className="relative w-full overflow-hidden mask-gradient">
// // //           <motion.div
// // //             className="flex"
// // //             animate={{ x: '-100%' }}
// // //             transition={{
// // //               duration: 20,
// // //               repeat: Infinity,
// // //               ease: 'linear',
// // //             }}
// // //           >
// // //             {allLogos.map((logo, index) => {
// // //               const logoUrl = getStorageUrl(logo.media_assets);
// // //               return (
// // //                 <div
// // //                   key={index}
// // //                   className="flex-shrink-0 w-48 mx-6 flex items-center justify-center"
// // //                 >
// // //                   {logoUrl ? (
// // //                     <img
// // //                       src={logoUrl}
// // //                       alt={logo.name}
// // //                       className="h-10 object-contain"
// // //                     />
// // //                   ) : (
// // //                     <span className="text-xl font-bold text-gray-500">
// // //                       {logo.name}
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //               );
// // //             })}
// // //           </motion.div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LogoCloud;
// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { fetchLogoCloud } from '../../api/homepage';
// // import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';

// // const LogoCloud = () => {
// //   const { data: logos, loading } = useHomepageData(fetchLogoCloud, 'logo_cloud', { additionalTables: ['media_assets'] });

// //   if (loading || !logos || logos.length === 0) {
// //     return <div className="py-12 bg-white" />;
// //   }

// //   // Duplicate logos for seamless scroll
// //   const allLogos = [...logos, ...logos];

// //   return (
// //     <div className="py-12 bg-white">
// //       <div className="container mx-auto px-4">
// //         <p className="text-center text-sm font-semibold text-gray-500 mb-8">
// //           Collaborated with brands
// //         </p>
// //         <div className="relative w-full overflow-hidden mask-gradient">
// //           <motion.div
// //             className="flex items-center" // added items-center for vertical alignment
// //             animate={{ x: '-50%' }} // Changed to -50% for smoother loop with duplicated list
// //             transition={{
// //               duration: 30, // Slower duration for better readability
// //               repeat: Infinity,
// //               ease: 'linear',
// //             }}
// //             style={{ width: "fit-content" }} // Ensures container fits all logos
// //           >
// //             {allLogos.map((logo, index) => {
// //               const logoUrl = getStorageUrl(logo.media_assets);
// //               return (
// //                 <div
// //                   key={index}
// //                   // REMOVED: w-48 (fixed width)
// //                   // ADDED: mx-8 (more spacing), w-auto (dynamic width)
// //                   className="flex-shrink-0 mx-8 flex items-center justify-center"
// //                 >
// //                   {logoUrl ? (
// //                     <img
// //                       src={logoUrl}
// //                       alt={logo.name}
// //                       // CHANGED: h-10 -> h-16 (or h-20 for bigger), w-auto (preserves aspect ratio)
// //                       className="h-10 w-auto object-contain max-w-none grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
// //                     />
// //                   ) : (
// //                     <span className="text-xl font-bold text-gray-500 whitespace-nowrap">
// //                       {logo.name}
// //                     </span>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </motion.div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LogoCloud;
// import React from 'react';
// import { motion } from 'framer-motion';
// import { fetchLogoCloud } from '../../api/homepage';
// import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';

// const LogoCloud = () => {
//   const { data: logos, loading } = useHomepageData(fetchLogoCloud, 'logo_cloud', {
//     additionalTables: ['media_assets'],
//   });

//   if (loading || !logos || logos.length === 0) {
//     return <div className="py-24 bg-gray-50" />;
//   }

//   // Duplicate logos 3 times to ensure the loop is always full even on wide screens
//   const allLogos = [...logos, ...logos, ...logos];

//   return (
//     <section className="py-20 bg-gray-50 overflow-hidden">
//       <div className="container mx-auto px-4 mb-10">
//         <h3 className="text-center text-sm font-bold tracking-widest text-gray-400 uppercase">
//           Trusted by Innovative Brands
//         </h3>
//       </div>

//       {/* Gradient Mask Container:
//         The [mask-image] arbitrary tailwind class creates the fade effect on left/right 
//       */}
//       <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
//         <motion.div
//           className="flex flex-nowrap items-center gap-12" // gap-12 handles spacing better than margins
//           animate={{ x: '-33.33%' }} // Move 1/3rd (since we tripled the list)
//           transition={{
//             duration: 40, // Smooth, slow speed
//             repeat: Infinity,
//             ease: 'linear',
//           }}
//           style={{ width: "fit-content" }}
//         >
//           {allLogos.map((logo, index) => {
//             const logoUrl = getStorageUrl(logo.media_assets);
//             return (
//               <div
//                 key={`${logo.id}-${index}`}
//                 className="group flex flex-shrink-0 items-center justify-center cursor-pointer"
//               >
//                 {logoUrl ? (
//                   <img
//                     src={logoUrl}
//                     alt={logo.name}
//                     // DESIGN MAGIC HAPPENS HERE:
//                     // 1. h-10 md:h-14: Responsive height (larger on desktop)
//                     // 2. w-auto: Maintains aspect ratio perfectly
//                     // 3. grayscale & opacity-60: Subtle default state
//                     // 4. group-hover: Full color and opacity
//                     className="h-10 md:h-14 w-auto object-contain transition-all duration-300 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
//                   />
//                 ) : (
//                   <span className="text-xl font-bold text-gray-400 group-hover:text-gray-800 transition-colors duration-300">
//                     {logo.name}
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default LogoCloud;
import React from 'react';
import { motion } from 'framer-motion';
import { fetchLogoCloud } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';

const LogoCloud = () => {
  const { data: logos, loading } = useHomepageData(fetchLogoCloud, 'logo_cloud', {
    additionalTables: ['media_assets'],
  });

  if (loading || !logos || logos.length === 0) {
    return <div className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50" />;
  }

  // Duplicate logos 3 times to ensure the loop is always full even on wide screens
  const allLogos = [...logos, ...logos, ...logos];

  const marqueeVariants = {
    animate: {
      x: ['0%', '-33.33%'], // Moves 1/3rd of the total width for 3 duplicates
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 10, // Slightly longer duration for smoother continuous motion
          ease: 'linear',
        },
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12 relative z-10">
        <h3 className="text-center text-lg font-extrabold tracking-tight text-gray-800 sm:text-2xl mb-2">
          Reimagining UI UX for Global Leaders 
        </h3>
        <p className="text-center text-md text-gray-600 max-w-2xl mx-auto">
          Concept driven UI / UX redesigns inspired by Amazon, Google, Walmart and more.
        </p>
      </div>

      {/* Background Blobs for Visual Interest */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob delay-2000"></div>
      <div className="absolute bottom-1/4 -right-24 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob delay-4000"></div>


      {/* Gradient Mask Container */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] py-8">
        <motion.div
          className="flex flex-nowrap items-center gap-16" // Increased gap for more breathing room
          variants={marqueeVariants}
          animate="animate"
          style={{ width: "fit-content" }}
        >
          {allLogos.map((logo, index) => {
            const logoUrl = getStorageUrl(logo.media_assets);
            return (
              <div
                key={`${logo.id}-${index}`}
                className="group flex flex-shrink-0 items-center justify-center cursor-pointer p-4 rounded-lg
                           hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                // Adding a subtle border for depth
                style={{ border: '1px solid rgba(0,0,0,0.05)' }}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={logo.name}
                    className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    // No grayscale, logos are vibrant by default!
                    // Added a slight initial opacity for a softer look
                    style={{ opacity: 0.9 }}
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                    {logo.name}
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoCloud;