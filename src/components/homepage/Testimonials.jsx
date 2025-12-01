

// // // import React, { useState } from 'react';
// // // import { motion, AnimatePresence, wrap } from 'framer-motion';
// // // import { fetchTestimonials } from '../../api/homepage';
// // // import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
// // // import { Icon } from '../common/IconMap';
// // // import { Loader2 } from 'lucide-react';
// // // import AnimateOnScroll from '../common/AnimateOnScroll';

// // // const Testimonials = () => {
// // //   const { data: testimonials, loading } = useHomepageData(
// // //     fetchTestimonials, 
// // //     'testimonials', 
// // //     { additionalTables: ['media_assets'] }
// // //   );
// // //   const [[page, direction], setPage] = useState([0, 0]);
// // //   const [isAnimating, setIsAnimating] = useState(false);

// // //   if (loading || !testimonials) {
// // //     return <section className="py-24 bg-white"><Loader2 className="animate-spin" /></section>;
// // //   }

// // //   const i = wrap(0, testimonials.length, page);
// // //   const testimonial = testimonials[i];
// // //   if (!testimonial) return null;

// // //   const paginate = (newDirection) => {
// // //     if (isAnimating) return; // Prevent spam clicking
// // //     setPage([page + newDirection, newDirection]);
// // //   };

// // //   const cardVariants = {
// // //     enter: (direction) => ({
// // //       y: "100%",
// // //       opacity: 0,
// // //     }),
// // //     center: {
// // //       y: 0,
// // //       opacity: 1,
// // //       transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.3 }
// // //     },
// // //     exit: (direction) => ({
// // //       y: "-50%",
// // //       opacity: 0,
// // //       transition: { duration: 0.2 }
// // //     }),
// // //   };

// // //   const envelopeVariants = {
// // //     rest: { rotateX: 0 },
// // //     hover: { rotateX: -180, transition: { duration: 0.5 } }
// // //   };

// // //   const avatarUrl = getStorageUrl(testimonial.media_assets);

// // //   return (
// // //     <section className="py-24 bg-gray-50 overflow-hidden">
// // //       <div className="container mx-auto px-4 max-w-4xl text-center">
// // //         <AnimateOnScroll>
// // //           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
// // //             Words of Appreciation
// // //           </h2>
// // //           <p className="text-lg text-gray-600 mb-16">
// // //             See what my clients have to say about our collaboration.
// // //           </p>
// // //         </AnimateOnScroll>
        
// // //         <div className="relative h-96 w-full max-w-lg mx-auto flex items-center justify-center">
// // //           {/* Envelope Back */}
// // //           <div className="absolute w-full h-64 bg-blue-500 rounded-lg shadow-2xl" />
// // //           <div 
// // //             className="absolute w-full h-64 rounded-lg overflow-hidden" 
// // //             style={{ perspective: "1000px" }}
// // //           >
// // //             <motion.div 
// // //               className="absolute w-full h-full bg-blue-600 rounded-lg"
// // //               style={{ transformOrigin: "top" }}
// // //               variants={envelopeVariants}
// // //               initial="rest"
// // //               whileInView="hover" // Animate when in view
// // //               viewport={{ once: true, amount: 0.5 }}
// // //             >
// // //               {/* This is the flap */}
// // //               <div 
// // //                 className="absolute w-full h-full"
// // //                 style={{
// // //                   clipPath: "polygon(0 0, 100% 0, 50% 50%)",
// // //                   backgroundColor: "#2563EB", // a slightly darker blue
// // //                 }}
// // //               />
// // //             </motion.div>
// // //           </div>

// // //           {/* Testimonial Card */}
// // //           <AnimatePresence 
// // //             initial={false} 
// // //             custom={direction} 
// // //             mode="wait"
// // //             onExitComplete={() => setIsAnimating(false)}
// // //           >
// // //             <motion.div
// // //               key={page}
// // //               custom={direction}
// // //               variants={cardVariants}
// // //               initial="enter"
// // //               animate="center"
// // //               exit="exit"
// // //               onAnimationStart={() => setIsAnimating(true)}
// // //               className="absolute w-[90%] bg-white rounded-lg shadow-xl p-8 flex flex-col items-center"
// // //             >
// // //               {avatarUrl && (
// // //                 <img
// // //                   src={avatarUrl}
// // //                   alt={testimonial.name}
// // //                   className="w-20 h-20 rounded-full mb-4 -mt-16 border-4 border-white"
// // //                 />
// // //               )}
// // //               <div className="flex mb-3">
// // //                 {[...Array(5)].map((_, i) => (
// // //                   <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
// // //                 ))}
// // //               </div>
// // //               <p className="text-lg font-medium text-gray-800 italic mb-4">
// // //                 "{testimonial.quote}"
// // //               </p>
// // //               <div className="font-bold text-gray-900">
// // //                 {testimonial.name}
// // //                 <span className="font-normal text-gray-500 ml-2">
// // //                   | {testimonial.role}
// // //                 </span>
// // //               </div>
// // //             </motion.div>
// // //           </AnimatePresence>
          
// // //           {/* Envelope Front (covers the bottom of the card) */}
// // //           <div 
// // //             className="absolute w-full h-32 bottom-0"
// // //             style={{
// // //               clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0, 50% 50%)",
// // //               backgroundColor: "#3B82F6", // a lighter blue
// // //             }}
// // //           />
// // //         </div>
        
// // //         {/* Controls */}
// // //         <div className="mt-8 flex justify-center gap-4">
// // //           <motion.button
// // //             className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
// // //             onClick={() => paginate(-1)}
// // //             disabled={isAnimating}
// // //             whileTap={{ scale: 0.9 }}
// // //           >
// // //             <Icon name="ChevronLeft" size={24} />
// // //           </motion.button>
// // //           <motion.button
// // //             className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
// // //             onClick={() => paginate(1)}
// // //             disabled={isAnimating}
// // //             whileTap={{ scale: 0.9 }}
// // //           >
// // //             <Icon name="ChevronRight" size={24} />
// // //           </motion.button>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Testimonials;
// // import React, { useState } from 'react';
// // import { motion, AnimatePresence, wrap } from 'framer-motion';
// // import { fetchTestimonials } from '../../api/homepage';
// // import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
// // import { Icon } from '../common/IconMap';
// // import { Loader2 } from 'lucide-react';
// // import AnimateOnScroll from '../common/AnimateOnScroll';

// // const Testimonials = () => {
// //   const { data: testimonials, loading } = useHomepageData(
// //     fetchTestimonials, 
// //     'testimonials', 
// //     { additionalTables: ['media_assets'] }
// //   );
  
// //   // We track page and direction
// //   const [[page, direction], setPage] = useState([0, 0]);

// //   if (loading || !testimonials) {
// //     return (
// //       <section className="py-24 bg-white flex justify-center">
// //         <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
// //       </section>
// //     );
// //   }

// //   // Safe wrapping for infinite pagination
// //   const imageIndex = wrap(0, testimonials.length, page);
// //   const testimonial = testimonials[imageIndex];

// //   // FIX 1: Use functional state update to prevent stale closures
// //   // Removed isAnimating lock to allow fluid interaction
// //   const paginate = (newDirection) => {
// //     setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
// //   };

// //   const cardVariants = {
// //     enter: (direction) => ({
// //       y: 100, // Starts further down (inside envelope)
// //       opacity: 0,
// //       scale: 0.9,
// //     }),
// //     center: {
// //       y: 0, // Moves up to center
// //       opacity: 1,
// //       scale: 1,
// //       zIndex: 10, // Ensure it sits between back and front layers
// //       transition: { 
// //         type: "spring", 
// //         stiffness: 120, 
// //         damping: 20, 
// //         delay: 0.1 
// //       }
// //     },
// //     exit: (direction) => ({
// //       y: -50, // Floats up and fades out
// //       opacity: 0,
// //       scale: 0.95,
// //       zIndex: 9, 
// //       transition: { duration: 0.2 }
// //     }),
// //   };

// //   const envelopeVariants = {
// //     rest: { rotateX: 0 },
// //     hover: { 
// //       rotateX: -180, 
// //       transition: { duration: 0.8, ease: "easeInOut" } 
// //     }
// //   };

// //   const avatarUrl = getStorageUrl(testimonial?.media_assets);

// //   if (!testimonial) return null;

// //   return (
// //     <section className="py-24 bg-gray-50 overflow-hidden">
// //       <div className="container mx-auto px-4 max-w-4xl text-center">
// //         <AnimateOnScroll>
// //           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
// //             Words of Appreciation
// //           </h2>
// //           <p className="text-lg text-gray-600 mb-16">
// //             See what my clients have to say about our collaboration.
// //           </p>
// //         </AnimateOnScroll>
        
// //         {/* ENVELOPE CONTAINER */}
// //         <div className="relative h-96 w-full max-w-lg mx-auto flex items-center justify-center">
          
// //           {/* 1. Envelope Back (Lowest Layer) */}
// //           <div className="absolute w-full h-64 bg-blue-500 rounded-lg shadow-2xl z-0" />
          
// //           {/* 2. Envelope Flap (Animated) */}
// //           <div 
// //             className="absolute w-full h-64 rounded-lg z-0" 
// //             style={{ perspective: "1000px", top: '64px' }} // Adjusted top to align with envelope body
// //           >
// //             <motion.div 
// //               className="absolute w-full h-full bg-blue-600 rounded-lg origin-top"
// //               variants={envelopeVariants}
// //               initial="rest"
// //               whileInView="hover"
// //               viewport={{ once: true, amount: 0.5 }}
// //             >
// //               {/* Triangle Clip Path for Flap */}
// //               <div 
// //                 className="absolute w-full h-full bg-blue-700"
// //                 style={{ clipPath: "polygon(0 0, 100% 0, 50% 55%)" }} 
// //               />
// //             </motion.div>
// //           </div>

// //           {/* 3. The Testimonial Card (Middle Layer) */}
// //           <AnimatePresence 
// //             initial={false} 
// //             custom={direction} 
// //             mode="wait"
// //           >
// //             <motion.div
// //               key={page} // Using page as key ensures React remounts this on change
// //               custom={direction}
// //               variants={cardVariants}
// //               initial="enter"
// //               animate="center"
// //               exit="exit"
// //               className="absolute w-[90%] bg-white rounded-lg shadow-xl p-8 flex flex-col items-center border border-gray-100"
// //               style={{ zIndex: 10 }} // Critical: Higher than Back, Lower than Front
// //             >
// //               {avatarUrl && (
// //                 <img
// //                   src={avatarUrl}
// //                   alt={testimonial.name}
// //                   className="w-20 h-20 rounded-full mb-4 -mt-16 border-4 border-white shadow-md bg-white object-cover"
// //                 />
// //               )}
// //               <div className="flex mb-3">
// //                 {[...Array(5)].map((_, i) => (
// //                   <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
// //                 ))}
// //               </div>
// //               <p className="text-lg font-medium text-gray-800 italic mb-4">
// //                 "{testimonial.quote}"
// //               </p>
// //               <div className="font-bold text-gray-900">
// //                 {testimonial.name}
// //                 <span className="font-normal text-gray-500 ml-2">
// //                   | {testimonial.role}
// //                 </span>
// //               </div>
// //             </motion.div>
// //           </AnimatePresence>
          
// //           {/* 4. Envelope Front (Top Layer) */}
// //           <div 
// //             className="absolute w-full h-64 top-[64px] pointer-events-none" 
// //             style={{ zIndex: 20 }}
// //           >
// //              {/* This creates the "pocket" shape at the bottom */}
// //             <div 
// //               className="w-full h-full bg-blue-500 rounded-b-lg"
// //               style={{
// //                 clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 50%, 0 0)",
// //                 background: "linear-gradient(to bottom right, #3B82F6, #2563EB)" 
// //               }}
// //             />
// //           </div>
// //         </div>
        
// //         {/* Controls */}
// //         <div className="mt-8 flex justify-center gap-4 z-30 relative">
// //           <motion.button
// //             className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 active:scale-95 transition-all"
// //             onClick={() => paginate(-1)}
// //             whileTap={{ scale: 0.9 }}
// //           >
// //             <Icon name="ChevronLeft" size={24} className="text-gray-700" />
// //           </motion.button>
// //           <motion.button
// //             className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 active:scale-95 transition-all"
// //             onClick={() => paginate(1)}
// //             whileTap={{ scale: 0.9 }}
// //           >
// //             <Icon name="ChevronRight" size={24} className="text-gray-700" />
// //           </motion.button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Testimonials;
// import React, { useState } from 'react';
// import { motion, AnimatePresence, wrap } from 'framer-motion';
// import { fetchTestimonials } from '../../api/homepage';
// import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
// import { Icon } from '../common/IconMap';
// import { Loader2 } from 'lucide-react';
// import AnimateOnScroll from '../common/AnimateOnScroll';

// const Testimonials = () => {
//   const { data: testimonials, loading } = useHomepageData(
//     fetchTestimonials, 
//     'testimonials', 
//     { additionalTables: ['media_assets'] }
//   );
//   const [[page, direction], setPage] = useState([0, 0]);
//   const [isAnimating, setIsAnimating] = useState(false);

//   if (loading || !testimonials) {
//     return <section className="py-24 bg-white"><Loader2 className="animate-spin" /></section>;
//   }

//   const i = wrap(0, testimonials.length, page);
//   const testimonial = testimonials[i];
//   if (!testimonial) return null;

//   const paginate = (newDirection) => {
//     if (isAnimating) return; // Prevent spam clicking
//     setPage([page + newDirection, newDirection]);
//   };

//   // --- FIX START ---
//   const cardVariants = {
//     enter: (direction) => ({
//       y: "50%", // Start lower down, inside the envelope
//       opacity: 0,
//       scale: 0.8, // Start smaller
//       zIndex: 0, // Start behind the front of the envelope
//     }),
//     center: {
//       y: -180, // Move UP significantly to clear the envelope and move towards the top of the screen
//       opacity: 1,
//       scale: 1.2, // Scale UP to be larger and more readable
//       zIndex: 20, // Ensure it's on top of everything else
//       transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.3 }
//     },
//     exit: (direction) => ({
//       y: -300, // Move even further up and away
//       opacity: 0,
//       scale: 0.8, // Scale back down
//       zIndex: 0, // Move back behind
//       transition: { duration: 0.2 }
//     }),
//   };
//   // --- FIX END ---

//   const envelopeVariants = {
//     rest: { rotateX: 0 },
//     hover: { rotateX: -180, transition: { duration: 0.5 } }
//   };

//   const avatarUrl = getStorageUrl(testimonial.media_assets);

//   return (
//     // Added z-0 to the section to create a stacking context
//     <section className="py-24 bg-gray-50 overflow-hidden relative z-0">
//       <div className="container mx-auto px-4 max-w-4xl text-center">
//         <AnimateOnScroll>
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
//             Words of Appreciation
//           </h2>
//           <p className="text-lg text-gray-600 mb-16">
//             See what my clients have to say about our collaboration.
//           </p>
//         </AnimateOnScroll>
        
//         {/* Increased height of the container to accommodate the card moving up */}
//         <div className="relative h-[500px] w-full max-w-lg mx-auto flex items-center justify-center mt-32">
//           {/* Envelope Back */}
//           <div className="absolute w-full h-64 bg-blue-500 rounded-lg shadow-2xl" />
//           <div 
//             className="absolute w-full h-64 rounded-lg overflow-hidden" 
//             style={{ perspective: "1000px" }}
//           >
//             <motion.div 
//               className="absolute w-full h-full bg-blue-600 rounded-lg"
//               style={{ transformOrigin: "top" }}
//               variants={envelopeVariants}
//               initial="rest"
//               whileInView="hover" // Animate when in view
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               {/* This is the flap */}
//               <div 
//                 className="absolute w-full h-full"
//                 style={{
//                   clipPath: "polygon(0 0, 100% 0, 50% 50%)",
//                   backgroundColor: "#2563EB", // a slightly darker blue
//                 }}
//               />
//             </motion.div>
//           </div>

//           {/* Testimonial Card */}
//           <AnimatePresence 
//             initial={false} 
//             custom={direction} 
//             mode="wait"
//             onExitComplete={() => setIsAnimating(false)}
//           >
//             <motion.div
//               key={page}
//               custom={direction}
//               variants={cardVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               onAnimationStart={() => setIsAnimating(true)}
//               // Added z-10 to the container so it can be manipulated by variants
//               className="absolute w-[90%] bg-white rounded-lg shadow-xl p-8 flex flex-col items-center relative z-10"
//             >
//               {avatarUrl && (
//                 <img
//                   src={avatarUrl}
//                   alt={testimonial.name}
//                   className="w-20 h-20 rounded-full mb-4 -mt-16 border-4 border-white"
//                 />
//               )}
//               <div className="flex mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-lg font-medium text-gray-800 italic mb-4">
//                 "{testimonial.quote}"
//               </p>
//               <div className="font-bold text-gray-900">
//                 {testimonial.name}
//                 <span className="font-normal text-gray-500 ml-2">
//                   | {testimonial.role}
//                 </span>
//               </div>
//             </motion.div>
//           </AnimatePresence>
          
//           {/* Envelope Front (covers the bottom of the card) */}
//           {/* Added z-10 to keep it above the card when the card is entering/exiting */}
//           <div 
//             className="absolute w-full h-32 bottom-0 z-10 pointer-events-none"
//             style={{
//               clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0, 50% 50%)",
//               backgroundColor: "#3B82F6", // a lighter blue
//             }}
//           />
//         </div>
        
//         {/* Controls - Added z-30 to keep them clickable on top */}
//         <div className="mt-8 flex justify-center gap-4 relative z-30">
//           <motion.button
//             className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
//             onClick={() => paginate(-1)}
//             disabled={isAnimating}
//             whileTap={{ scale: 0.9 }}
//           >
//             <Icon name="ChevronLeft" size={24} />
//           </motion.button>
//           <motion.button
//             className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
//             onClick={() => paginate(1)}
//             disabled={isAnimating}
//             whileTap={{ scale: 0.9 }}
//           >
//             <Icon name="ChevronRight" size={24} />
//           </motion.button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
import React, { useState } from 'react';
import { motion, AnimatePresence, wrap } from 'framer-motion';
import { fetchTestimonials } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import { Loader2 } from 'lucide-react';
import AnimateOnScroll from '../common/AnimateOnScroll';

const Testimonials = () => {
  const { data: testimonials, loading } = useHomepageData(
    fetchTestimonials, 
    'testimonials', 
    { additionalTables: ['media_assets'] }
  );
  
  // State: [currentPage, direction]
  const [[page, direction], setPage] = useState([0, 0]);

  if (loading || !testimonials) {
    return (
      <section className="py-24 bg-white flex justify-center">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </section>
    );
  }

  // Infinite pagination logic
  const imageIndex = wrap(0, testimonials.length, page);
  const testimonial = testimonials[imageIndex];

  const paginate = (newDirection) => {
    // Functional update fixes the "stuck" button issue
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  // --- ANIMATION VARIANTS ---
  const cardVariants = {
    enter: (direction) => ({
      y: 120, // Start deep inside the envelope
      opacity: 0,
      scale: 0.8,
      zIndex: 10, // Behind the front pocket
    }),
    center: {
      y: -120, // Move UP significantly to float above the envelope
      opacity: 1,
      scale: 1,
      zIndex: 10, // Still logically 'between' back and front, but visually moved above
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 15,
        mass: 1
      }
    },
    exit: (direction) => ({
      y: 120, // Drop back down into envelope to disappear
      opacity: 0,
      scale: 0.8,
      zIndex: 10,
      transition: { duration: 0.3 }
    }),
  };

  const avatarUrl = getStorageUrl(testimonial?.media_assets);

  if (!testimonial) return null;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden min-h-[800px]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Words of Appreciation
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            See what my clients have to say about our collaboration.
          </p>
        </AnimateOnScroll>
        
        {/* CONTAINER AREA 
           Added 'mt-32' and fixed height to allow space for the card to pop UP 
        */}
        <div className="relative w-full max-w-lg mx-auto h-[400px] mt-32 flex justify-center items-end">
          
          {/* LAYER 1: Envelope Back (The blue background) */}
          <div className="absolute bottom-0 w-full h-48 bg-blue-600 rounded-lg shadow-2xl z-0" />
          
          {/* LAYER 1.5: Envelope Flap (Triangle at top) */}
          {/* This sits behind the card visually when the card pops up */}
          <div 
            className="absolute bottom-[190px] w-full h-32 z-0 flex justify-center items-end"
            style={{ perspective: "1000px" }}
          >
             <div 
               className="w-[95%] h-full bg-blue-700 rounded-t-lg"
               style={{ 
                 clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                 opacity: 0.8
               }}
             />
          </div>

          {/* LAYER 2: The Card (Animated) */}
          <div className="absolute w-full h-full top-0 left-0 pointer-events-none flex justify-center items-end pb-12">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                // Added pointer-events-auto so you can select text on the card
                className="absolute w-[90%] md:w-[85%] bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center border border-gray-100 pointer-events-auto"
                style={{ 
                  height: 'auto', 
                  minHeight: '250px',
                  bottom: '50px' // Anchor position
                }} 
              >
                {/* Avatar */}
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mb-4 -mt-16 border-4 border-white shadow-md bg-white object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full mb-4 -mt-16 border-4 border-white shadow-md bg-indigo-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">{testimonial.name.charAt(0)}</span>
                  </div>
                )}

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg font-medium text-gray-800 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="mt-auto">
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm font-medium">{testimonial.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* LAYER 3: Envelope Front (The Pocket) */}
          {/* High Z-index ensures it COVERS the bottom of the card if the card dips down */}
          <div 
            className="absolute bottom-0 w-full h-48 z-20 pointer-events-none" 
            style={{ 
               filter: 'drop-shadow(0px -5px 10px rgba(0,0,0,0.1))'
            }}
          >
             {/* The visual pocket shape */}
            <div 
              className="w-full h-full bg-blue-500 rounded-lg"
              style={{
                clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)",
                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)"
              }}
            />
          </div>

          {/* LAYER 4: Controls */}
          {/* Placed at the very bottom, z-30 to be clickable */}
          <div className="absolute -bottom-20 flex gap-6 z-30">
            <motion.button
              className="bg-white p-4 rounded-full shadow-lg text-gray-700 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-100"
              onClick={() => paginate(-1)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon name="ChevronLeft" size={24} />
            </motion.button>
            <motion.button
              className="bg-white p-4 rounded-full shadow-lg text-gray-700 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-100"
              onClick={() => paginate(1)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon name="ChevronRight" size={24} />
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;