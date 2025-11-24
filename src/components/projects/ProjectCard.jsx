// // // // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // // // // // import { Link } from 'react-router-dom';
// // // // // // // // // // // // // // import { ArrowRight } from 'lucide-react';
// // // // // // // // // // // // // // import { getStorageUrl } from '../../hooks/useHomepageData';

// // // // // // // // // // // // // // const ProjectCard = ({ project }) => {
// // // // // // // // // // // // // //   const cardVariants = {
// // // // // // // // // // // // // //     hidden: { opacity: 0, y: 50 },
// // // // // // // // // // // // // //     visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
// // // // // // // // // // // // // //   };
  
// // // // // // // // // // // // // //   // Use getStorageUrl to handle placeholders vs. real paths
// // // // // // // // // // // // // //   const imageUrl = getStorageUrl(project.heroImage || project.hero_media);

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <motion.div
// // // // // // // // // // // // // //       layout
// // // // // // // // // // // // // //       variants={cardVariants}
// // // // // // // // // // // // // //       className="group"
// // // // // // // // // // // // // //     >
// // // // // // // // // // // // // //       <Link to={`/projects/${project.slug}`}>
// // // // // // // // // // // // // //         <div className="overflow-hidden rounded-2xl shadow-lg">
// // // // // // // // // // // // // //           <motion.img
// // // // // // // // // // // // // //             src={imageUrl || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(' ','+')}`}
// // // // // // // // // // // // // //             alt={project.heroAlt || project.title}
// // // // // // // // // // // // // //             className="w-full h-80 object-cover"
// // // // // // // // // // // // // //             whileHover={{ scale: 1.05 }}
// // // // // // // // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // // // // // // // //           />
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //         <div className="py-6">
// // // // // // // // // // // // // //           <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
// // // // // // // // // // // // // //           <p className="text-gray-600 mt-2">{project.category}</p>
// // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // //             className="inline-flex items-center text-blue-600 font-medium mt-4 group-hover:underline"
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             View Case Study
// // // // // // // // // // // // // //             <motion.span
// // // // // // // // // // // // // //               className="ml-2"
// // // // // // // // // // // // // //               transition={{
// // // // // // // // // // // // // //                 repeat: Infinity,
// // // // // // // // // // // // // //                 repeatType: 'mirror',
// // // // // // // // // // // // // //                 duration: 0.5,
// // // // // // // // // // // // // //               }}
// // // // // // // // // // // // // //               animate={{ x: [0, 5, 0] }} // Add a subtle animation
// // // // // // // // // // // // // //             >
// // // // // // // // // // // // // //               <ArrowRight />
// // // // // // // // // // // // // //             </motion.span>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //       </Link>
// // // // // // // // // // // // // //     </motion.div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default ProjectCard;
// // // // // // // // // // // // // // ProjectCard.jsx
// // // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // // // // import { ChevronRight } from 'lucide-react';

// // // // // // // // // // // // // const cardVariants = {
// // // // // // // // // // // // //   hidden: { opacity: 0, y: 50, scale: 0.8 },
// // // // // // // // // // // // //   visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
// // // // // // // // // // // // //   exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const imageVariants = {
// // // // // // // // // // // // //   initial: { scale: 1, filter: 'grayscale(0%)' },
// // // // // // // // // // // // //   hover: { scale: 1.03, filter: 'grayscale(0%)', transition: { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] } },
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const overlayVariants = {
// // // // // // // // // // // // //   initial: { opacity: 0 },
// // // // // // // // // // // // //   hover: { opacity: 1, transition: { duration: 0.4 } },
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // Assuming getStorageUrl is passed or imported
// // // // // // // // // // // // // const getStorageUrl = (path) => `https://your-storage-url.com/${path}`; // Replace with your actual implementation

// // // // // // // // // // // // // const ProjectCard = ({ project }) => {
// // // // // // // // // // // // //   const imageUrl = getStorageUrl(project.heroImage);

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <motion.div 
// // // // // // // // // // // // //       className="group relative cursor-pointer overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-50"
// // // // // // // // // // // // //       variants={cardVariants}
// // // // // // // // // // // // //       whileHover="hover"
// // // // // // // // // // // // //       initial="initial"
// // // // // // // // // // // // //       exit="exit"
// // // // // // // // // // // // //     >
// // // // // // // // // // // // //       <a href={`/projects/${project.slug}`}>
// // // // // // // // // // // // //         {/* Image Container: FIXES SCALING ISSUE */}
// // // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // // //           className="aspect-square w-full overflow-hidden" 
// // // // // // // // // // // // //           variants={imageVariants} 
// // // // // // // // // // // // //           // Set to 1.0 to prevent unintended initial scale
// // // // // // // // // // // // //           initial={{ scale: 1 }} 
// // // // // // // // // // // // //         >
// // // // // // // // // // // // //           <img
// // // // // // // // // // // // //             src={imageUrl}
// // // // // // // // // // // // //             alt={project.heroAlt}
// // // // // // // // // // // // //             className="w-full h-full object-cover transition-transform duration-500 ease-out-quint"
// // // // // // // // // // // // //             style={{ objectFit: 'cover' }} // Ensures the image covers the container without scaling the image itself on hover
// // // // // // // // // // // // //           />
// // // // // // // // // // // // //         </motion.div>

// // // // // // // // // // // // //         {/* Title and Category Section */}
// // // // // // // // // // // // //         <div className="p-6">
// // // // // // // // // // // // //           <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 line-clamp-2">
// // // // // // // // // // // // //             {project.title}
// // // // // // // // // // // // //           </h3>
// // // // // // // // // // // // //           <p className="mt-1 text-sm font-medium text-blue-600 uppercase tracking-widest">
// // // // // // // // // // // // //             {project.category}
// // // // // // // // // // // // //           </p>
// // // // // // // // // // // // //         </div>

// // // // // // // // // // // // //         {/* Hover Overlay - Sophisticated CTA */}
// // // // // // // // // // // // //         <motion.div
// // // // // // // // // // // // //           className="absolute inset-0 bg-blue-600/90 flex items-center justify-center p-4"
// // // // // // // // // // // // //           variants={overlayVariants}
// // // // // // // // // // // // //         >
// // // // // // // // // // // // //           <div className="text-center text-white">
// // // // // // // // // // // // //             <p className="text-xl font-semibold mb-2">{project.title}</p>
// // // // // // // // // // // // //             <span className="inline-flex items-center text-sm font-medium border-b-2 border-white/50 pb-0.5 transition-all group-hover:border-white">
// // // // // // // // // // // // //               View Case Study <ChevronRight className="w-5 h-5 ml-1" />
// // // // // // // // // // // // //             </span>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // // //       </a>
// // // // // // // // // // // // //     </motion.div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default ProjectCard;

// // // // // // // // // // // // // ProjectCard.jsx (Advanced 3D Pop Animation)
// // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // // // import { ChevronRight, Zap, ShieldCheck } from 'lucide-react';

// // // // // // // // // // // // // Utility to generate a stable background color for the card based on the project's ID
// // // // // // // // // // // // const generateColor = (id) => {
// // // // // // // // // // // //     let hash = 0;
// // // // // // // // // // // //     if (id.length === 0) return '#000000';
// // // // // // // // // // // //     for (let i = 0; i < id.length; i++) {
// // // // // // // // // // // //         hash = id.charCodeAt(i) + ((hash << 5) - hash);
// // // // // // // // // // // //     }
// // // // // // // // // // // //     let color = '#';
// // // // // // // // // // // //     for (let i = 0; i < 3; i++) {
// // // // // // // // // // // //         const value = (hash >> (i * 8)) & 0xFF;
// // // // // // // // // // // //         color += ('00' + value.toString(16)).substr(-2);
// // // // // // // // // // // //     }
// // // // // // // // // // // //     return color;
// // // // // // // // // // // // };

// // // // // // // // // // // // // Assuming getStorageUrl is available
// // // // // // // // // // // // const getStorageUrl = (path) => path.startsWith('http') ? path : `/api/media/${path}`;

// // // // // // // // // // // // const cardVariants = {
// // // // // // // // // // // //   hidden: { opacity: 0, y: 50, rotateZ: 5, transition: { duration: 0.5 } },
// // // // // // // // // // // //   visible: { opacity: 1, y: 0, rotateZ: 0, transition: { type: "spring", stiffness: 100, damping: 12, mass: 0.5 } },
// // // // // // // // // // // // };

// // // // // // // // // // // // const ProjectCard = ({ project, index }) => {
// // // // // // // // // // // //   const imageUrl = getStorageUrl(project.heroImage);
// // // // // // // // // // // //   // Calculate unique rotation and Z-index for stacking effect
// // // // // // // // // // // //   const initialRotate = index % 2 === 0 ? 1 : -1;
// // // // // // // // // // // //   const initialZ = 50 - index; // Ensure cards closer to the start are visually on top
// // // // // // // // // // // //   const accentColor = generateColor(project.id);
  
// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <motion.div 
// // // // // // // // // // // //       className="group absolute w-[90%] md:w-[80%] max-w-lg cursor-pointer rounded-xl transition-shadow duration-300 bg-white shadow-2xl ring-2 ring-gray-100"
// // // // // // // // // // // //       variants={cardVariants}
// // // // // // // // // // // //       style={{
// // // // // // // // // // // //         zIndex: initialZ,
// // // // // // // // // // // //         // Diagonal stacking offsets
// // // // // // // // // // // //         top: index * 40,
// // // // // // // // // // // //         left: index * 10,
// // // // // // // // // // // //         transformOrigin: '50% 50%',
// // // // // // // // // // // //       }}
// // // // // // // // // // // //       initial="hidden"
// // // // // // // // // // // //       animate="visible"
// // // // // // // // // // // //       exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
// // // // // // // // // // // //       whileHover={{
// // // // // // // // // // // //         // Book Pop Animation: pops forward, straightens, and scales up slightly
// // // // // // // // // // // //         scale: 1.05,
// // // // // // // // // // // //         y: -30, // Move up
// // // // // // // // // // // //         rotateZ: 0, // Straighten
// // // // // // // // // // // //         zIndex: 100, // Bring to front
// // // // // // // // // // // //         boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
// // // // // // // // // // // //         transition: { type: "spring", stiffness: 150, damping: 10, mass: 0.8 }
// // // // // // // // // // // //       }}
// // // // // // // // // // // //     >
// // // // // // // // // // // //       <a href={`/projects/${project.slug}`}>
// // // // // // // // // // // //         {/* Header/Image Section */}
// // // // // // // // // // // //         <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl" style={{ borderBottom: `4px solid ${accentColor}` }}>
// // // // // // // // // // // //           <img
// // // // // // // // // // // //             src={imageUrl}
// // // // // // // // // // // //             alt={project.heroAlt}
// // // // // // // // // // // //             className="w-full h-full object-cover transition-transform duration-500 ease-out-quint group-hover:scale-105"
// // // // // // // // // // // //           />
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         {/* Content Section */}
// // // // // // // // // // // //         <div className="p-6 md:p-8">
// // // // // // // // // // // //           {/* Metadata Tiers */}
// // // // // // // // // // // //           <div className="flex justify-between items-center mb-3 text-sm font-bold">
// // // // // // // // // // // //             <span className="inline-flex items-center text-gray-500">
// // // // // // // // // // // //                 <ShieldCheck className="w-4 h-4 mr-1 text-gray-400" /> {project.tierName || 'Standard'}
// // // // // // // // // // // //             </span>
// // // // // // // // // // // //             <span className="text-sm font-medium uppercase tracking-wider" style={{ color: accentColor }}>
// // // // // // // // // // // //                 {project.category || 'Uncategorized'}
// // // // // // // // // // // //             </span>
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 transition-colors group-hover:text-blue-600 line-clamp-2">
// // // // // // // // // // // //             {project.title}
// // // // // // // // // // // //           </h3>
// // // // // // // // // // // //           <p className="mt-2 text-gray-600 line-clamp-3">{project.description}</p>
          
// // // // // // // // // // // //           {/* CTA Link */}
// // // // // // // // // // // //           <div className="mt-4 flex justify-end">
// // // // // // // // // // // //             <span className="inline-flex items-center text-blue-600 font-semibold transition-transform group-hover:translate-x-1">
// // // // // // // // // // // //               Explore Case Study <ChevronRight className="w-5 h-5 ml-1" />
// // // // // // // // // // // //             </span>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </a>
// // // // // // // // // // // //     </motion.div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default ProjectCard;

// // // // // // // // // // // // src/components/projects/ProjectCard.jsx (NEW FILE)

// // // // // // // // // // // import React from 'react';
// // // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // // import { CheckCircle, Clock, BookOpen, Layers, Zap, List, AlertTriangle } from 'lucide-react';

// // // // // // // // // // // // Card Style definitions from above (re-include or import)
// // // // // // // // // // // export const CardStyle = {
// // // // // // // // // // //   COMPLETION_TALL: 'COMPLETION_TALL',
// // // // // // // // // // //   COURSE_WIDE: 'COURSE_WIDE',
// // // // // // // // // // //   BOOK_COMPACT: 'BOOK_COMPACT',
// // // // // // // // // // //   STATUS_COMPACT: 'STATUS_COMPACT',
// // // // // // // // // // // };

// // // // // // // // // // // const getGridSpan = (style) => {
// // // // // // // // // // //     switch (style) {
// // // // // // // // // // //         case CardStyle.COMPLETION_TALL:
// // // // // // // // // // //             return 'col-span-1 row-span-2';
// // // // // // // // // // //         case CardStyle.COURSE_WIDE:
// // // // // // // // // // //             return 'col-span-3 lg:col-span-2 row-span-1'; // Span 2 on large screens
// // // // // // // // // // //         default:
// // // // // // // // // // //             return 'col-span-1 row-span-1';
// // // // // // // // // // //     }
// // // // // // // // // // // };

// // // // // // // // // // // // --- Sub-Components for Different Card Types ---

// // // // // // // // // // // const CompletionTallCard = ({ project }) => (
// // // // // // // // // // //     <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 relative">
// // // // // // // // // // //         <div className="absolute top-0 right-0 p-3 bg-green-500 rounded-bl-xl text-white font-bold text-xs">
// // // // // // // // // // //             Completed
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="flex items-center justify-center p-8">
// // // // // // // // // // //             <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center relative">
// // // // // // // // // // //                 <span className="text-3xl font-bold text-green-600">{project.completion_percentage}%</span>
// // // // // // // // // // //                 <CheckCircle className="w-8 h-8 text-green-500 absolute -top-2 -right-2 bg-white rounded-full" />
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="mt-4 flex-grow">
// // // // // // // // // // //             <h3 className="text-xl font-bold text-gray-800">{project.metadata_label}</h3>
// // // // // // // // // // //             <p className="text-sm text-gray-500 mb-4">{project.publisher_name}</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="mt-auto border-t pt-4">
// // // // // // // // // // //             <div className="flex items-center text-gray-600 text-sm mb-2">
// // // // // // // // // // //                 <Clock className="w-4 h-4 mr-2" /> {project.details_1}
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="flex items-center text-gray-600 text-sm">
// // // // // // // // // // //                 <Layers className="w-4 h-4 mr-2" /> {project.details_2}
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // // );

// // // // // // // // // // // const CourseWideCard = ({ project }) => (
// // // // // // // // // // //     <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden p-6">
// // // // // // // // // // //         <div className="flex justify-between items-center mb-4 border-b pb-2">
// // // // // // // // // // //             {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
// // // // // // // // // // //                 <div key={tab} className={`px-4 py-2 text-sm font-semibold cursor-pointer ${index === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
// // // // // // // // // // //                     {tab} {index === 1 && <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1"></span>}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="grid grid-cols-3 gap-6">
// // // // // // // // // // //             <div className="col-span-1 h-32 bg-gray-400 rounded-lg">
// // // // // // // // // // //                 {/* Placeholder for media/image */}
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="col-span-2">
// // // // // // // // // // //                 <h3 className="text-2xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // // // // //                 <div className="mt-4 flex space-x-4">
// // // // // // // // // // //                     <button className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-200">Secondary Action</button>
// // // // // // // // // // //                     <button className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-200">Secondary Action</button>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="mt-4 pt-4 border-t">
// // // // // // // // // // //             <button className="w-full py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400">
// // // // // // // // // // //                 Primary Purchase Action
// // // // // // // // // // //             </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // // );

// // // // // // // // // // // const BookCompactCard = ({ project, color = 'bg-yellow-500', imagePlaceholder = 'BookOpen' }) => {
// // // // // // // // // // //     const primaryColor = color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-blue-600';
// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden p-5 flex flex-col border border-gray-100">
// // // // // // // // // // //             <div className={`relative ${color} h-20 rounded-lg flex items-center justify-center mb-4`}>
// // // // // // // // // // //                 <div className="text-white text-4xl">
// // // // // // // // // // //                     {imagePlaceholder === 'BookOpen' ? <BookOpen className="w-10 h-10" /> : <List className="w-10 h-10" />}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <div className="absolute top-2 right-2 flex space-x-1">
// // // // // // // // // // //                     <span className="bg-white/30 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{project.details_1}</span>
// // // // // // // // // // //                     <span className="bg-white/30 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{project.details_2}</span>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 {project.metadata_value && (
// // // // // // // // // // //                     <div className="absolute -bottom-4 right-4 w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex flex-col items-center justify-center shadow-lg">
// // // // // // // // // // //                         <span className={`text-xl font-extrabold ${primaryColor}`}>{project.metadata_value}</span>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-1">{project.title}</h3>
// // // // // // // // // // //             <p className="text-sm text-gray-500 mt-1">{project.publisher_name}</p>
// // // // // // // // // // //             <p className={`text-xs font-semibold mt-1 ${primaryColor}`}>{project.metadata_label}</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // };

// // // // // // // // // // // const StatusCompactCard = ({ project }) => {
// // // // // // // // // // //     const isOverdue = project.status === 'Overdue';
// // // // // // // // // // //     const isCompleted = project.status === 'Completed';
// // // // // // // // // // //     const statusColor = isOverdue ? 'bg-red-500' : isCompleted ? 'bg-green-500' : 'bg-blue-500';

// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100">
// // // // // // // // // // //             <div className={`p-4 text-white font-semibold flex justify-between items-center ${statusColor}`}>
// // // // // // // // // // //                 <span className="text-sm">{isCompleted ? 'Completed' : 'Not Started'}</span>
// // // // // // // // // // //                 {isOverdue && <AlertTriangle className="w-4 h-4" />}
// // // // // // // // // // //                 {isCompleted && <CheckCircle className="w-4 h-4" />}
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="p-4 flex-grow">
// // // // // // // // // // //                 <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="mt-auto p-4 border-t">
// // // // // // // // // // //                  <div className={`text-xs font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
// // // // // // // // // // //                     {isOverdue ? 'Overdue by 2 days' : project.details_1}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // };


// // // // // // // // // // // const ProjectCard = ({ project, assignedStyle }) => {
// // // // // // // // // // //     const style = assignedStyle || CardStyle.STATUS_COMPACT;
// // // // // // // // // // //     const spanClass = getGridSpan(style);
    
// // // // // // // // // // //     // Choose which sub-component to render based on the assigned style
// // // // // // // // // // //     const renderCard = () => {
// // // // // // // // // // //         switch (style) {
// // // // // // // // // // //             case CardStyle.COMPLETION_TALL:
// // // // // // // // // // //                 return <CompletionTallCard project={project} />;
// // // // // // // // // // //             case CardStyle.COURSE_WIDE:
// // // // // // // // // // //                 return <CourseWideCard project={project} />;
// // // // // // // // // // //             case CardStyle.BOOK_COMPACT:
// // // // // // // // // // //                 // Alternate colors or themes for visual variety
// // // // // // // // // // //                 const isBook1 = project.id.endsWith('03'); // Example based on provided API data
// // // // // // // // // // //                 return <BookCompactCard 
// // // // // // // // // // //                     project={project} 
// // // // // // // // // // //                     color={isBook1 ? 'bg-yellow-500' : 'bg-blue-600'}
// // // // // // // // // // //                     imagePlaceholder={isBook1 ? 'BookOpen' : 'List'}
// // // // // // // // // // //                 />;
// // // // // // // // // // //             case CardStyle.STATUS_COMPACT:
// // // // // // // // // // //             default:
// // // // // // // // // // //                 return <StatusCompactCard project={project} />;
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     return (
// // // // // // // // // // //         <motion.div
// // // // // // // // // // //             className={`w-full h-full ${spanClass}`}
// // // // // // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // // // // //         >
// // // // // // // // // // //             {renderCard()}
// // // // // // // // // // //         </motion.div>
// // // // // // // // // // //     );
// // // // // // // // // // // };

// // // // // // // // // // // export default ProjectCard;

// // // // // // // // // // import React from 'react';
// // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // import { CheckCircle, Clock, BookOpen, Layers, Zap, List, AlertTriangle } from 'lucide-react';

// // // // // // // // // // // Card Style definitions from above (re-include or import)
// // // // // // // // // // export const CardStyle = {
// // // // // // // // // //   COMPLETION_TALL: 'COMPLETION_TALL',
// // // // // // // // // //   COURSE_WIDE: 'COURSE_WIDE',
// // // // // // // // // //   BOOK_COMPACT: 'BOOK_COMPACT',
// // // // // // // // // //   STATUS_COMPACT: 'STATUS_COMPACT',
// // // // // // // // // // };

// // // // // // // // // // // --- Sub-Components for Different Card Types ---

// // // // // // // // // // const CompletionTallCard = ({ project }) => (
// // // // // // // // // //     <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 relative">
// // // // // // // // // //         <div className="absolute top-0 right-0 p-3 bg-green-500 rounded-bl-xl text-white font-bold text-xs">
// // // // // // // // // //             Completed
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="flex items-center justify-center p-8">
// // // // // // // // // //             <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center relative">
// // // // // // // // // //                 <span className="text-3xl font-bold text-green-600">{project.completion_percentage}%</span>
// // // // // // // // // //                 <CheckCircle className="w-8 h-8 text-green-500 absolute -top-2 -right-2 bg-white rounded-full" />
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="mt-4 flex-grow">
// // // // // // // // // //             <h3 className="text-xl font-bold text-gray-800">{project.metadata_label}</h3>
// // // // // // // // // //             <p className="text-sm text-gray-500 mb-4">{project.publisher_name}</p>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="mt-auto border-t pt-4">
// // // // // // // // // //             <div className="flex items-center text-gray-600 text-sm mb-2">
// // // // // // // // // //                 <Clock className="w-4 h-4 mr-2" /> {project.details_1}
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="flex items-center text-gray-600 text-sm">
// // // // // // // // // //                 <Layers className="w-4 h-4 mr-2" /> {project.details_2}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     </div>
// // // // // // // // // // );

// // // // // // // // // // const CourseWideCard = ({ project }) => (
// // // // // // // // // //     // Note: The wide card will still only occupy one column width in the masonry layout,
// // // // // // // // // //     // but its internal structure remains wide.
// // // // // // // // // //     <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden p-6">
// // // // // // // // // //         <div className="flex justify-between items-center mb-4 border-b pb-2">
// // // // // // // // // //             {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
// // // // // // // // // //                 <div key={tab} className={`px-4 py-2 text-sm font-semibold cursor-pointer ${index === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
// // // // // // // // // //                     {tab} {index === 1 && <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1"></span>}
// // // // // // // // // //                 </div>
// // // // // // // // // //             ))}
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="grid grid-cols-3 gap-6">
// // // // // // // // // //             <div className="col-span-1 h-32 bg-gray-400 rounded-lg">
// // // // // // // // // //                 {/* Placeholder for media/image */}
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="col-span-2">
// // // // // // // // // //                 <h3 className="text-2xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // // // //                 <div className="mt-4 flex space-x-4">
// // // // // // // // // //                     <button className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-200">Secondary Action</button>
// // // // // // // // // //                     <button className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-200">Secondary Action</button>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="mt-4 pt-4 border-t">
// // // // // // // // // //             <button className="w-full py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400">
// // // // // // // // // //                 Primary Purchase Action
// // // // // // // // // //             </button>
// // // // // // // // // //         </div>
// // // // // // // // // //     </div>
// // // // // // // // // // );

// // // // // // // // // // const BookCompactCard = ({ project, color = 'bg-yellow-500', imagePlaceholder = 'BookOpen' }) => {
// // // // // // // // // //     const primaryColor = color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-blue-600';
// // // // // // // // // //     return (
// // // // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden p-5 flex flex-col border border-gray-100">
// // // // // // // // // //             <div className={`relative ${color} h-20 rounded-lg flex items-center justify-center mb-4`}>
// // // // // // // // // //                 <div className="text-white text-4xl">
// // // // // // // // // //                     {imagePlaceholder === 'BookOpen' ? <BookOpen className="w-10 h-10" /> : <List className="w-10 h-10" />}
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <div className="absolute top-2 right-2 flex space-x-1">
// // // // // // // // // //                     <span className="bg-white/30 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{project.details_1}</span>
// // // // // // // // // //                     <span className="bg-white/30 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{project.details_2}</span>
// // // // // // // // // //                 </div>
// // // // // // // // // //                 {project.metadata_value && (
// // // // // // // // // //                     <div className="absolute -bottom-4 right-4 w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex flex-col items-center justify-center shadow-lg">
// // // // // // // // // //                         <span className={`text-xl font-extrabold ${primaryColor}`}>{project.metadata_value}</span>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>
            
// // // // // // // // // //             <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-1">{project.title}</h3>
// // // // // // // // // //             <p className="text-sm text-gray-500 mt-1">{project.publisher_name}</p>
// // // // // // // // // //             <p className={`text-xs font-semibold mt-1 ${primaryColor}`}>{project.metadata_label}</p>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // };

// // // // // // // // // // const StatusCompactCard = ({ project }) => {
// // // // // // // // // //     const isOverdue = project.status === 'Overdue';
// // // // // // // // // //     const isCompleted = project.status === 'Completed';
// // // // // // // // // //     const statusColor = isOverdue ? 'bg-red-500' : isCompleted ? 'bg-green-500' : 'bg-blue-500';

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100">
// // // // // // // // // //             <div className={`p-4 text-white font-semibold flex justify-between items-center ${statusColor}`}>
// // // // // // // // // //                 <span className="text-sm">{isCompleted ? 'Completed' : 'Not Started'}</span>
// // // // // // // // // //                 {isOverdue && <AlertTriangle className="w-4 h-4" />}
// // // // // // // // // //                 {isCompleted && <CheckCircle className="w-4 h-4" />}
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="p-4 flex-grow">
// // // // // // // // // //                 <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="mt-auto p-4 border-t">
// // // // // // // // // //                  <div className={`text-xs font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
// // // // // // // // // //                     {isOverdue ? 'Overdue by 2 days' : project.details_1}
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // };


// // // // // // // // // // const ProjectCard = ({ project, assignedStyle }) => {
// // // // // // // // // //     const style = assignedStyle || CardStyle.STATUS_COMPACT;
    
// // // // // // // // // //     // Choose which sub-component to render based on the assigned style
// // // // // // // // // //     const renderCard = () => {
// // // // // // // // // //         switch (style) {
// // // // // // // // // //             case CardStyle.COMPLETION_TALL:
// // // // // // // // // //                 return <CompletionTallCard project={project} />;
// // // // // // // // // //             case CardStyle.COURSE_WIDE:
// // // // // // // // // //                 return <CourseWideCard project={project} />;
// // // // // // // // // //             case CardStyle.BOOK_COMPACT:
// // // // // // // // // //                 // Alternate colors or themes for visual variety
// // // // // // // // // //                 const isBook1 = project.id.endsWith('03'); // Example based on provided API data
// // // // // // // // // //                 return <BookCompactCard 
// // // // // // // // // //                     project={project} 
// // // // // // // // // //                     color={isBook1 ? 'bg-yellow-500' : 'bg-blue-600'}
// // // // // // // // // //                     imagePlaceholder={isBook1 ? 'BookOpen' : 'List'}
// // // // // // // // // //                 />;
// // // // // // // // // //             case CardStyle.STATUS_COMPACT:
// // // // // // // // // //             default:
// // // // // // // // // //                 return <StatusCompactCard project={project} />;
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     return (
// // // // // // // // // //         <motion.div
// // // // // // // // // //             // FIX: Added break-inside-avoid-column and margin-bottom for masonry layout
// // // // // // // // // //             className="w-full h-full mb-8 break-inside-avoid-column" 
// // // // // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // // // //         >
// // // // // // // // // //             {renderCard()}
// // // // // // // // // //         </motion.div>
// // // // // // // // // //     );
// // // // // // // // // // };

// // // // // // // // // // export default ProjectCard;

// // // // // // // // // import React from 'react';
// // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // Import the useNavigate hook
// // // // // // // // // import { useNavigate } from 'react-router-dom'; 
// // // // // // // // // import { CheckCircle, Clock, BookOpen, Layers, Zap, List, AlertTriangle } from 'lucide-react';

// // // // // // // // // // Card Style definitions from above (re-include or import)
// // // // // // // // // export const CardStyle = {
// // // // // // // // //   COMPLETION_TALL: 'COMPLETION_TALL',
// // // // // // // // //   COURSE_WIDE: 'COURSE_WIDE',
// // // // // // // // //   BOOK_COMPACT: 'BOOK_COMPACT',
// // // // // // // // //   STATUS_COMPACT: 'STATUS_COMPACT',
// // // // // // // // // };

// // // // // // // // // // --- Sub-Components for Different Card Types ---

// // // // // // // // // const CompletionTallCard = ({ project }) => (
// // // // // // // // //     <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 relative">
// // // // // // // // //         <div className="absolute top-0 right-0 p-3 bg-green-500 rounded-bl-xl text-white font-bold text-xs">
// // // // // // // // //             Completed
// // // // // // // // //         </div>
// // // // // // // // //         <div className="flex items-center justify-center p-8">
// // // // // // // // //             <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center relative">
// // // // // // // // //                 <span className="text-3xl font-bold text-green-600">{project.completion_percentage}%</span>
// // // // // // // // //                 <CheckCircle className="w-8 h-8 text-green-500 absolute -top-2 -right-2 bg-white rounded-full" />
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="mt-4 flex-grow">
// // // // // // // // //             <h3 className="text-xl font-bold text-gray-800">{project.metadata_label}</h3>
// // // // // // // // //             <p className="text-sm text-gray-500 mb-4">{project.publisher_name}</p>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="mt-auto border-t pt-4">
// // // // // // // // //             <div className="flex items-center text-gray-600 text-sm mb-2">
// // // // // // // // //                 <Clock className="w-4 h-4 mr-2" /> {project.details_1}
// // // // // // // // //             </div>
// // // // // // // // //             <div className="flex items-center text-gray-600 text-sm">
// // // // // // // // //                 <Layers className="w-4 h-4 mr-2" /> {project.details_2}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     </div>
// // // // // // // // // );

// // // // // // // // // const CourseWideCard = ({ project }) => (
// // // // // // // // //     <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden p-6">
// // // // // // // // //         <div className="flex justify-between items-center mb-4 border-b pb-2">
// // // // // // // // //             {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
// // // // // // // // //                 <div key={tab} className={`px-4 py-2 text-sm font-semibold cursor-pointer ${index === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
// // // // // // // // //                     {tab} {index === 1 && <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1"></span>}
// // // // // // // // //                 </div>
// // // // // // // // //             ))}
// // // // // // // // //         </div>
// // // // // // // // //         <div className="grid grid-cols-3 gap-6">
// // // // // // // // //             <div className="col-span-1 h-32 bg-gray-400 rounded-lg">
// // // // // // // // //                 {/* Placeholder for media/image */}
// // // // // // // // //             </div>
// // // // // // // // //             <div className="col-span-2">
// // // // // // // // //                 <h3 className="text-2xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // // //                 <div className="mt-4 flex space-x-4">
// // // // // // // // //                     <button className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-200">Secondary Action</button>
// // // // // // // // //                     <button className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-200">Secondary Action</button>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="mt-4 pt-4 border-t">
// // // // // // // // //             <button className="w-full py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400">
// // // // // // // // //                 Primary Purchase Action
// // // // // // // // //             </button>
// // // // // // // // //         </div>
// // // // // // // // //     </div>
// // // // // // // // // );

// // // // // // // // // const BookCompactCard = ({ project, color = 'bg-yellow-500', imagePlaceholder = 'BookOpen' }) => {
// // // // // // // // //     const primaryColor = color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-blue-600';
// // // // // // // // //     return (
// // // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden p-5 flex flex-col border border-gray-100">
// // // // // // // // //             <div className={`relative ${color} h-20 rounded-lg flex items-center justify-center mb-4`}>
// // // // // // // // //                 <div className="text-white text-4xl">
// // // // // // // // //                     {imagePlaceholder === 'BookOpen' ? <BookOpen className="w-10 h-10" /> : <List className="w-10 h-10" />}
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="absolute top-2 right-2 flex space-x-1">
// // // // // // // // //                     <span className="bg-white/30 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{project.details_1}</span>
// // // // // // // // //                     <span className="bg-white/30 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{project.details_2}</span>
// // // // // // // // //                 </div>
// // // // // // // // //                 {project.metadata_value && (
// // // // // // // // //                     <div className="absolute -bottom-4 right-4 w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex flex-col items-center justify-center shadow-lg">
// // // // // // // // //                         <span className={`text-xl font-extrabold ${primaryColor}`}>{project.metadata_value}</span>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
            
// // // // // // // // //             <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-1">{project.title}</h3>
// // // // // // // // //             <p className="text-sm text-gray-500 mt-1">{project.publisher_name}</p>
// // // // // // // // //             <p className={`text-xs font-semibold mt-1 ${primaryColor}`}>{project.metadata_label}</p>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };

// // // // // // // // // const StatusCompactCard = ({ project }) => {
// // // // // // // // //     const isOverdue = project.status === 'Overdue';
// // // // // // // // //     const isCompleted = project.status === 'Completed';
// // // // // // // // //     const statusColor = isOverdue ? 'bg-red-500' : isCompleted ? 'bg-green-500' : 'bg-blue-500';

// // // // // // // // //     return (
// // // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100">
// // // // // // // // //             <div className={`p-4 text-white font-semibold flex justify-between items-center ${statusColor}`}>
// // // // // // // // //                 <span className="text-sm">{isCompleted ? 'Completed' : 'Not Started'}</span>
// // // // // // // // //                 {isOverdue && <AlertTriangle className="w-4 h-4" />}
// // // // // // // // //                 {isCompleted && <CheckCircle className="w-4 h-4" />}
// // // // // // // // //             </div>
// // // // // // // // //             <div className="p-4 flex-grow">
// // // // // // // // //                 <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="mt-auto p-4 border-t">
// // // // // // // // //                  <div className={`text-xs font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
// // // // // // // // //                     {isOverdue ? 'Overdue by 2 days' : project.details_1}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };


// // // // // // // // // const ProjectCard = ({ project, assignedStyle }) => {
// // // // // // // // //     const navigate = useNavigate(); // Initialize navigation hook
// // // // // // // // //     const style = assignedStyle || CardStyle.STATUS_COMPACT;
    
// // // // // // // // //     // Fallback to title if slug is missing, though slug is preferred for URLs
// // // // // // // // //     const slug = project.slug || project.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// // // // // // // // //     const handleClick = () => {
// // // // // // // // //         if (slug) {
// // // // // // // // //             navigate(`/projects/${slug}`);
// // // // // // // // //         } else {
// // // // // // // // //             console.warn(`Cannot navigate: Project ${project.id} is missing a slug.`);
// // // // // // // // //         }
// // // // // // // // //     };
    
// // // // // // // // //     // Choose which sub-component to render based on the assigned style
// // // // // // // // //     const renderCard = () => {
// // // // // // // // //         switch (style) {
// // // // // // // // //             case CardStyle.COMPLETION_TALL:
// // // // // // // // //                 return <CompletionTallCard project={project} />;
// // // // // // // // //             case CardStyle.COURSE_WIDE:
// // // // // // // // //                 return <CourseWideCard project={project} />;
// // // // // // // // //             case CardStyle.BOOK_COMPACT:
// // // // // // // // //                 // Alternate colors or themes for visual variety
// // // // // // // // //                 const isBook1 = project.id.endsWith('03'); // Example based on provided API data
// // // // // // // // //                 return <BookCompactCard 
// // // // // // // // //                     project={project} 
// // // // // // // // //                     color={isBook1 ? 'bg-yellow-500' : 'bg-blue-600'}
// // // // // // // // //                     imagePlaceholder={isBook1 ? 'BookOpen' : 'List'}
// // // // // // // // //                 />;
// // // // // // // // //             case CardStyle.STATUS_COMPACT:
// // // // // // // // //             default:
// // // // // // // // //                 return <StatusCompactCard project={project} />;
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     return (
// // // // // // // // //         <motion.div
// // // // // // // // //             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
// // // // // // // // //             onClick={handleClick} // Handle click event
// // // // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // // //             // Hover effect using Framer Motion
// // // // // // // // //             whileHover={{ 
// // // // // // // // //                 scale: 1.02,        // Slightly enlarge the card
// // // // // // // // //                 y: -5,              // Lift the card up
// // // // // // // // //                 boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" // Enhanced shadow
// // // // // // // // //             }}
// // // // // // // // //         >
// // // // // // // // //             {renderCard()}
// // // // // // // // //         </motion.div>
// // // // // // // // //     );
// // // // // // // // // };

// // // // // // // // // export default ProjectCard;

// // // // // // // // import React from 'react';
// // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // import { useNavigate } from 'react-router-dom'; 
// // // // // // // // import { CheckCircle, Clock, BookOpen, Layers, Zap, List, AlertTriangle, Briefcase, TrendingUp, PlayCircle } from 'lucide-react';

// // // // // // // // // Card Style definitions from above
// // // // // // // // export const CardStyle = {
// // // // // // // //   COMPLETION_TALL: 'COMPLETION_TALL',
// // // // // // // //   COURSE_WIDE: 'COURSE_WIDE', // Renamed to better represent a detailed project view
// // // // // // // //   BOOK_COMPACT: 'BOOK_COMPACT', // Used for projects focused on quick metrics
// // // // // // // //   STATUS_COMPACT: 'STATUS_COMPACT',
// // // // // // // // };

// // // // // // // // // --- Helper for Media Placeholder ---
// // // // // // // // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// // // // // // // //     const hasVideo = !!project.video_url;
// // // // // // // //     const hasImage = !!project.hero_media_id;
    
// // // // // // // //     // Determine the color based on the first character of the title
// // // // // // // //     const colorSeed = project.title.charCodeAt(0) % 5;
// // // // // // // //     const colors = ['bg-blue-200', 'bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-purple-200'];
// // // // // // // //     const baseColor = colors[colorSeed];

// // // // // // // //     return (
// // // // // // // //         <div className={`relative ${className} ${baseColor} rounded-lg flex items-center justify-center overflow-hidden`}>
// // // // // // // //             {/* If you had a real image/video service, you'd use a <img> or <video> tag here */}
// // // // // // // //             {hasVideo && <PlayCircle className="w-8 h-8 text-gray-700 opacity-70 absolute z-10" />}
// // // // // // // //             <span className="text-sm font-semibold text-gray-800 opacity-80 p-2 text-center line-clamp-2">
// // // // // // // //                 {hasImage || hasVideo ? project.title : 'Placeholder Media'}
// // // // // // // //             </span>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // // --- Sub-Components for Different Card Types ---

// // // // // // // // // 1. Completion/Tall Card (Focus: Project Summary & Completion)
// // // // // // // // const CompletionTallCard = ({ project }) => (
// // // // // // // //     <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 relative">
// // // // // // // //         <div className="absolute top-0 right-0 p-3 bg-green-500 rounded-bl-xl text-white font-bold text-xs">
// // // // // // // //             {project.status === 'Completed' ? '100% DONE' : `${project.completion_percentage}% PROGRESS`}
// // // // // // // //         </div>
        
// // // // // // // //         <MediaPlaceholder project={project} className="h-40 mb-4" />

// // // // // // // //         <div className="mt-4 flex-grow">
// // // // // // // //             <h3 className="text-2xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // //             <p className="text-sm text-gray-500 mt-1 line-clamp-3">{project.description}</p>
// // // // // // // //         </div>
        
// // // // // // // //         <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
// // // // // // // //             <div className="flex items-center text-gray-600 text-sm">
// // // // // // // //                 <Briefcase className="w-4 h-4 mr-2 text-blue-500" /> 
// // // // // // // //                 <span className="font-medium text-gray-800">{project.client || 'Personal Project'}</span>
// // // // // // // //             </div>
// // // // // // // //             <div className="flex items-center text-gray-600 text-sm">
// // // // // // // //                 <Clock className="w-4 h-4 mr-2 text-red-500" /> 
// // // // // // // //                 <span className="font-medium">{project.timeline || 'N/A'}</span>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     </div>
// // // // // // // // );

// // // // // // // // // 2. Course/Wide Card (Focus: Detailed Project Snapshot)
// // // // // // // // const CourseWideCard = ({ project }) => (
// // // // // // // //     <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 border border-gray-100">
        
// // // // // // // //         {/* Tabbed Navigation (Represents different views: Overview, Assets, Metrics) */}
// // // // // // // //         <div className="flex justify-between items-center mb-4 border-b pb-2">
// // // // // // // //             {['Overview', 'Assets', 'Metrics'].map((tab, index) => (
// // // // // // // //                 <div key={tab} className={`px-4 py-2 text-sm font-semibold cursor-pointer ${index === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
// // // // // // // //                     {tab} {index === 1 && <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1"></span>}
// // // // // // // //                 </div>
// // // // // // // //             ))}
// // // // // // // //         </div>
        
// // // // // // // //         {/* Main Content Area */}
// // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // //             <div className="col-span-1">
// // // // // // // //                 <MediaPlaceholder project={project} className="h-32" />
// // // // // // // //             </div>
// // // // // // // //             <div className="col-span-2">
// // // // // // // //                 <h3 className="text-2xl font-extrabold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // //                 <div className="mt-3 flex space-x-4 text-sm text-gray-600">
// // // // // // // //                     <span className="flex items-center"><Layers className="w-4 h-4 mr-1" /> {project.role || 'Design'}</span>
// // // // // // // //                     <span className="flex items-center"><Zap className="w-4 h-4 mr-1" /> Tier {project.tier_id}</span>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
        
// // // // // // // //         {/* Action Buttons */}
// // // // // // // //         <div className="mt-6 pt-4 border-t border-gray-100 flex space-x-3">
// // // // // // // //             <button className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
// // // // // // // //                 View Live Site
// // // // // // // //             </button>
// // // // // // // //             <button className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
// // // // // // // //                 Read Case Study
// // // // // // // //             </button>
// // // // // // // //             <button className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
// // // // // // // //                 Contact for Inquiry
// // // // // // // //             </button>
// // // // // // // //         </div>
// // // // // // // //     </div>
// // // // // // // // );

// // // // // // // // // 3. Book Compact Card (Focus: Metadata/Ratings)
// // // // // // // // const BookCompactCard = ({ project, color = 'bg-yellow-500' }) => {
// // // // // // // //     const primaryColor = color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-blue-600';
// // // // // // // //     return (
// // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden p-5 flex flex-col border border-gray-100">
// // // // // // // //             <div className="flex justify-between items-start mb-4">
// // // // // // // //                 <div className="flex-1">
// // // // // // // //                     <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // //                     <p className="text-sm text-gray-500 mt-1">{project.publisher_name}</p>
// // // // // // // //                 </div>
// // // // // // // //                 {/* Completion/Rating Badge */}
// // // // // // // //                 {project.metadata_value && (
// // // // // // // //                     <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-gray-200 flex flex-col items-center justify-center shadow-inner ml-4 flex-shrink-0">
// // // // // // // //                         <span className={`text-xl font-extrabold ${primaryColor}`}>{project.metadata_value}</span>
// // // // // // // //                     </div>
// // // // // // // //                 )}
// // // // // // // //             </div>
            
// // // // // // // //             <MediaPlaceholder project={project} className="h-20 mb-4" />

// // // // // // // //             <div className="mt-auto pt-3 border-t">
// // // // // // // //                 <p className={`text-xs font-semibold ${primaryColor} mb-1`}>{project.metadata_label}</p>
// // // // // // // //                 <div className="flex justify-between text-xs text-gray-600">
// // // // // // // //                     <span>{project.details_1}</span>
// // // // // // // //                     <span>{project.details_2}</span>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // // 4. Status Compact Card (Focus: Status and Timeline)
// // // // // // // // const StatusCompactCard = ({ project }) => {
// // // // // // // //     const isOverdue = project.status === 'Overdue';
// // // // // // // //     const isCompleted = project.status === 'Completed' || project.completion_percentage === 100;
// // // // // // // //     const statusColor = isOverdue ? 'bg-red-500' : isCompleted ? 'bg-green-500' : 'bg-blue-500';

// // // // // // // //     return (
// // // // // // // //         <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100">
// // // // // // // //             <div className={`p-4 text-white font-semibold flex justify-between items-center ${statusColor}`}>
// // // // // // // //                 <span className="text-sm">{isOverdue ? 'CRITICAL' : isCompleted ? 'FINISHED' : 'IN PROGRESS'}</span>
// // // // // // // //                 {isOverdue && <AlertTriangle className="w-4 h-4" />}
// // // // // // // //                 {isCompleted && <CheckCircle className="w-4 h-4" />}
// // // // // // // //             </div>
// // // // // // // //             <div className="p-4 flex-grow">
// // // // // // // //                 <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{project.title}</h3>
// // // // // // // //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
// // // // // // // //             </div>
// // // // // // // //             <div className="mt-auto p-4 border-t">
// // // // // // // //                 <div className={`text-xs font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
// // // // // // // //                     {isOverdue ? 'Overdue - Priority Fix' : `Timeline: ${project.details_1}`}
// // // // // // // //                 </div>
// // // // // // // //                 <div className="text-xs text-gray-400 mt-1">
// // // // // // // //                     {project.role || 'Contributor'}
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };


// // // // // // // // const ProjectCard = ({ project, assignedStyle }) => {
// // // // // // // //     const navigate = useNavigate(); 
// // // // // // // //     const style = assignedStyle || CardStyle.STATUS_COMPACT;
    
// // // // // // // //     // Ensure slug exists for navigation
// // // // // // // //     const slug = project.slug || project.id;

// // // // // // // //     const handleClick = () => {
// // // // // // // //         if (slug) {
// // // // // // // //             navigate(`/projects/${slug}`);
// // // // // // // //         } else {
// // // // // // // //             console.warn(`Cannot navigate: Project ${project.id} is missing a slug.`);
// // // // // // // //         }
// // // // // // // //     };
    
// // // // // // // //     // Choose which sub-component to render based on the assigned style
// // // // // // // //     const renderCard = () => {
// // // // // // // //         switch (style) {
// // // // // // // //             case CardStyle.COMPLETION_TALL:
// // // // // // // //                 return <CompletionTallCard project={project} />;
// // // // // // // //             case CardStyle.COURSE_WIDE:
// // // // // // // //                 return <CourseWideCard project={project} />;
// // // // // // // //             case CardStyle.BOOK_COMPACT:
// // // // // // // //                 // Alternate colors for visual variety
// // // // // // // //                 const isBlue = project.id.endsWith('3') || project.id.endsWith('8');
// // // // // // // //                 return <BookCompactCard 
// // // // // // // //                     project={project} 
// // // // // // // //                     color={isBlue ? 'bg-blue-600' : 'bg-yellow-500'}
// // // // // // // //                 />;
// // // // // // // //             case CardStyle.STATUS_COMPACT:
// // // // // // // //             default:
// // // // // // // //                 return <StatusCompactCard project={project} />;
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <motion.div
// // // // // // // //             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
// // // // // // // //             onClick={handleClick}
// // // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // //             whileHover={{ 
// // // // // // // //                 scale: 1.02,
// // // // // // // //                 y: -5,
// // // // // // // //                 boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)"
// // // // // // // //             }}
// // // // // // // //             // Ensure the hover state works correctly even if the card is a wide element
// // // // // // // //         >
// // // // // // // //             {renderCard()}
// // // // // // // //         </motion.div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // export default ProjectCard;

// // // // // // // import React from 'react';
// // // // // // // import { motion } from 'framer-motion';
// // // // // // // import { useNavigate } from 'react-router-dom'; 
// // // // // // // import { CheckCircle, Clock, BookOpen, Layers, Zap, List, AlertTriangle, Briefcase, TrendingUp, PlayCircle, Code, Shield } from 'lucide-react';

// // // // // // // // Card Style definitions 
// // // // // // // export const CardStyle = {
// // // // // // //   COMPLETION_TALL: 'COMPLETION_TALL', // Renamed visually to Faceted Glass
// // // // // // //   COURSE_WIDE: 'COURSE_WIDE',       // Dark, Detailed Project Snapshot
// // // // // // //   BOOK_COMPACT: 'BOOK_COMPACT',     // Neon Metric Card
// // // // // // //   STATUS_COMPACT: 'STATUS_COMPACT', // High-Contrast Status Card
// // // // // // // };

// // // // // // // // --- Helper for Media Placeholder (Updated with dark/glassy theme) ---
// // // // // // // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// // // // // // //     const hasVideo = !!project.video_url;
// // // // // // //     const hasImage = !!project.hero_media_id;
    
// // // // // // //     // Determine the color based on the slug/ID for consistent, vibrant hashing
// // // // // // //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// // // // // // //     const vibrantColors = ['from-blue-600/50 to-purple-600/50', 'from-red-500/50 to-orange-500/50', 'from-green-500/50 to-teal-500/50', 'from-yellow-500/50 to-pink-500/50', 'from-indigo-600/50 to-cyan-500/50', 'from-fuchsia-600/50 to-rose-500/50'];
// // // // // // //     const gradient = vibrantColors[hash];

// // // // // // //     return (
// // // // // // //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden border border-white/10 backdrop-blur-sm`}>
// // // // // // //             {/* Inner glow effect for text */}
// // // // // // //             <span className="text-sm font-semibold text-white p-2 text-center line-clamp-2 text-shadow-neon">
// // // // // // //                 {project.title.toUpperCase()}
// // // // // // //             </span>
// // // // // // //             {hasVideo && <PlayCircle className="w-8 h-8 text-white/90 absolute z-10" />}
            
// // // // // // //             {/* Neon border/highlight */}
// // // // // // //             <div className="absolute inset-0 ring-2 ring-inset ring-white/20 rounded-lg pointer-events-none"></div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // // --- Sub-Components for Different Card Types ---

// // // // // // // // 1. Faceted Glass Card (High decorative TALL card)
// // // // // // // const CompletionTallCard = ({ project }) => (
// // // // // // //     <div className="flex flex-col h-full bg-black/40 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-blue-400/20 p-6 relative">
// // // // // // //         {/* Status Chip (Neon Green/Red) */}
// // // // // // //         <div className={`absolute top-0 right-0 p-3 ${project.status === 'Completed' ? 'bg-green-500/80' : 'bg-yellow-500/80'} rounded-bl-xl text-white font-bold text-xs shadow-lg shadow-current/30`}>
// // // // // // //             {project.status.toUpperCase()}
// // // // // // //         </div>
        
// // // // // // //         {/* Decorative background lines */}
// // // // // // //         <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,...')]"></div>

// // // // // // //         <MediaPlaceholder project={project} className="h-48 mb-4 shadow-xl" />

// // // // // // //         <div className="mt-4 flex-grow text-white">
// // // // // // //             <h3 className="text-2xl font-extrabold text-blue-300 line-clamp-2">{project.title}</h3>
// // // // // // //             <p className="text-sm text-gray-300 mt-1 line-clamp-3">{project.description}</p>
// // // // // // //         </div>
        
// // // // // // //         {/* Metadata section with subtle glow */}
// // // // // // //         <div className="mt-auto pt-4 border-t border-blue-400/30 space-y-2">
// // // // // // //             <div className="flex items-center text-gray-200 text-sm">
// // // // // // //                 <Briefcase className="w-4 h-4 mr-2 text-cyan-400" /> 
// // // // // // //                 <span className="font-medium text-white">{project.client || 'Internal Research'}</span>
// // // // // // //             </div>
// // // // // // //             <div className="flex items-center text-gray-200 text-sm">
// // // // // // //                 <Clock className="w-4 h-4 mr-2 text-red-400" /> 
// // // // // // //                 <span className="font-medium">{project.timeline || 'Phase 1 Complete'}</span>
// // // // // // //             </div>
// // // // // // //             <div className="text-xs font-mono text-gray-400 mt-2">
// // // // // // //                  Progress: {project.completion_percentage}%
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     </div>
// // // // // // // );

// // // // // // // // 2. Dark, Detailed Project Snapshot (Course Wide Card)
// // // // // // // const CourseWideCard = ({ project }) => (
// // // // // // //     <div className="bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden p-6 border border-gray-700">
        
// // // // // // //         {/* Tabbed Navigation (Dark Contrast) */}
// // // // // // //         <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
// // // // // // //             {['Overview', 'Assets', 'Metrics'].map((tab, index) => (
// // // // // // //                 <div key={tab} className={`px-4 py-2 text-sm font-semibold cursor-pointer transition-colors ${index === 0 ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
// // // // // // //                     {tab} {index === 1 && <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1 shadow-md shadow-red-500/50"></span>}
// // // // // // //                 </div>
// // // // // // //             ))}
// // // // // // //         </div>
        
// // // // // // //         {/* Main Content Area */}
// // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // //             <div className="md:col-span-1">
// // // // // // //                 <MediaPlaceholder project={project} className="h-32" />
// // // // // // //             </div>
// // // // // // //             <div className="md:col-span-2">
// // // // // // //                 <h3 className="text-2xl font-extrabold text-white line-clamp-2">{project.title}</h3>
// // // // // // //                 <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
// // // // // // //                 <div className="mt-3 flex space-x-4 text-sm text-gray-300">
// // // // // // //                     <span className="flex items-center"><Layers className="w-4 h-4 mr-1 text-purple-400" /> {project.role || 'Developer'}</span>
// // // // // // //                     <span className="flex items-center"><Shield className="w-4 h-4 mr-1 text-green-400" /> Tier {project.tier_id}</span>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
        
// // // // // // //         {/* Action Buttons (High contrast) */}
// // // // // // //         <div className="mt-6 pt-4 border-t border-gray-700 flex space-x-3">
// // // // // // //             <button className="flex-1 py-2 text-sm bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-colors">
// // // // // // //                 View Live Site
// // // // // // //             </button>
// // // // // // //             <button className="flex-1 py-2 text-sm bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-colors">
// // // // // // //                 Read Case Study
// // // // // // //             </button>
// // // // // // //             <button className="flex-1 py-2 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/30">
// // // // // // //                 Initiate Contact
// // // // // // //             </button>
// // // // // // //         </div>
// // // // // // //     </div>
// // // // // // // );

// // // // // // // // 3. Neon Metric Card (Book Compact Card)
// // // // // // // const BookCompactCard = ({ project }) => {
// // // // // // //     // Dynamic color based on metadata value or tier
// // // // // // //     const isHighValue = project.metadata_value > 70;
// // // // // // //     const primaryColor = isHighValue ? 'text-lime-400' : 'text-fuchsia-400';
// // // // // // //     const bgColor = isHighValue ? 'bg-lime-900/40' : 'bg-fuchsia-900/40';
    
// // // // // // //     return (
// // // // // // //         <div className={`bg-gray-900 rounded-xl shadow-xl overflow-hidden p-5 flex flex-col border border-gray-800 ring-2 ring-inset ${isHighValue ? 'ring-lime-600/30' : 'ring-fuchsia-600/30'}`}>
// // // // // // //             <div className="flex justify-between items-start mb-4">
// // // // // // //                 <div className="flex-1">
// // // // // // //                     <h3 className="text-lg font-bold text-white line-clamp-2">{project.title}</h3>
// // // // // // //                     <p className="text-sm text-gray-400 mt-1">{project.publisher_name}</p>
// // // // // // //                 </div>
// // // // // // //                 {/* Metric Badge with Neon Effect */}
// // // // // // //                 {project.metadata_value && (
// // // // // // //                     <div className={`w-14 h-14 rounded-full ${bgColor} flex flex-col items-center justify-center shadow-inner ml-4 flex-shrink-0 border border-current/50 ${primaryColor}`}>
// // // // // // //                         <span className={`text-xl font-extrabold ${primaryColor}`}>{project.metadata_value}</span>
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div>
            
// // // // // // //             <MediaPlaceholder project={project} className="h-20 mb-4" />

// // // // // // //             <div className="mt-auto pt-3 border-t border-gray-700">
// // // // // // //                 <p className={`text-xs font-mono font-semibold ${primaryColor} mb-1`}>{project.metadata_label.toUpperCase()}</p>
// // // // // // //                 <div className="flex justify-between text-xs text-gray-500">
// // // // // // //                     <span>{project.details_1}</span>
// // // // // // //                     <span>{project.details_2}</span>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // // 4. High-Contrast Status Card (Status Compact Card)
// // // // // // // const StatusCompactCard = ({ project }) => {
// // // // // // //     const isOverdue = project.status === 'Overdue';
// // // // // // //     const isCompleted = project.status === 'Completed' || project.completion_percentage === 100;
// // // // // // //     const statusColor = isOverdue ? 'bg-red-600 shadow-red-500/50' : isCompleted ? 'bg-green-600 shadow-green-500/50' : 'bg-blue-600 shadow-blue-500/50';

// // // // // // //     return (
// // // // // // //         <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col border border-gray-700">
// // // // // // //             <div className={`p-4 text-white font-semibold flex justify-between items-center text-sm uppercase ${statusColor} shadow-md`}>
// // // // // // //                 <span>{isOverdue ? 'URGENT OVERDUE' : isCompleted ? 'ARCHIVED' : 'ACTIVE SPRINT'}</span>
// // // // // // //                 {isOverdue && <AlertTriangle className="w-4 h-4" />}
// // // // // // //                 {isCompleted && <CheckCircle className="w-4 h-4" />}
// // // // // // //             </div>
            
// // // // // // //             <div className="p-4 flex-grow text-white">
// // // // // // //                 <h3 className="text-xl font-extrabold text-white line-clamp-2">{project.title}</h3>
// // // // // // //                 <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
// // // // // // //             </div>

// // // // // // //             <div className="mt-auto p-4 border-t border-gray-700">
// // // // // // //                 <div className={`text-xs font-semibold ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
// // // // // // //                     {isOverdue ? 'Action Required Immediately' : `Role: ${project.role || 'Support'}`}
// // // // // // //                 </div>
// // // // // // //                 <div className="text-xs text-gray-500 mt-1">
// // // // // // //                     Completion: {project.completion_percentage}%
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };


// // // // // // // const ProjectCard = ({ project, assignedStyle }) => {
// // // // // // //     const navigate = useNavigate(); 
// // // // // // //     const style = assignedStyle || CardStyle.STATUS_COMPACT;
    
// // // // // // //     const slug = project.slug || project.id;

// // // // // // //     const handleClick = () => {
// // // // // // //         if (slug) {
// // // // // // //             navigate(`/projects/${slug}`);
// // // // // // //         } else {
// // // // // // //             console.warn(`Cannot navigate: Project ${project.id} is missing a slug.`);
// // // // // // //         }
// // // // // // //     };
    
// // // // // // //     // Choose which sub-component to render based on the assigned style
// // // // // // //     const renderCard = () => {
// // // // // // //         switch (style) {
// // // // // // //             case CardStyle.COMPLETION_TALL:
// // // // // // //                 return <CompletionTallCard project={project} />;
// // // // // // //             case CardStyle.COURSE_WIDE:
// // // // // // //                 return <CourseWideCard project={project} />;
// // // // // // //             case CardStyle.BOOK_COMPACT:
// // // // // // //                 return <BookCompactCard project={project} />;
// // // // // // //             case CardStyle.STATUS_COMPACT:
// // // // // // //             default:
// // // // // // //                 return <StatusCompactCard project={project} />;
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <motion.div
// // // // // // //             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
// // // // // // //             onClick={handleClick}
// // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // // // //             transition={{ duration: 0.3 }}
// // // // // // //             // Enhanced futuristic hover effect
// // // // // // //             whileHover={{ 
// // // // // // //                 scale: 1.03, // Increased scale
// // // // // // //                 y: -8,       // Increased lift
// // // // // // //                 boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", // Darker, larger shadow
// // // // // // //                 transition: { duration: 0.2 }
// // // // // // //             }}
// // // // // // //         >
// // // // // // //             {renderCard()}
// // // // // // //         </motion.div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default ProjectCard;

// // // // // // import React from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import { useNavigate } from 'react-router-dom'; 
// // // // // // import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield, AlertTriangle } from 'lucide-react';

// // // // // // // Card Style definitions are no longer needed as the design is unified.
// // // // // // // We keep the export for external compatibility but the logic is merged.
// // // // // // export const CardStyle = {
// // // // // //   UNIFIED_DESIGN: 'UNIFIED_DESIGN' 
// // // // // // };

// // // // // // // --- Helper for Media Placeholder (Essential for image requirement) ---
// // // // // // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// // // // // //     // Generate a consistent gradient based on the project ID
// // // // // //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// // // // // //     const vibrantGradients = [
// // // // // //         'from-blue-600 to-purple-600', 'from-red-500 to-orange-500', 
// // // // // //         'from-green-500 to-teal-500', 'from-yellow-500 to-pink-500', 
// // // // // //         'from-indigo-600 to-cyan-500', 'from-fuchsia-600 to-rose-500'
// // // // // //     ];
// // // // // //     const gradient = vibrantGradients[hash];

// // // // // //     return (
// // // // // //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-xl mb-4 border border-white/10`}>
// // // // // //             {/* Placeholder Icon */}
// // // // // //             <Code className="w-1/4 h-1/4 text-white/70" />
            
// // // // // //             {/* Image identification - in a real app, this would be an <img> tag */}
// // // // // //             <div className="absolute top-2 right-2 text-xs font-mono text-white/80 bg-black/30 px-2 py-1 rounded-full">
// // // // // //                 {project.hero_media_id ? 'Image ID' : 'No Media'}
// // // // // //             </div>
            
// // // // // //             {/* Neon border/highlight for decorative effect */}
// // // // // //             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none"></div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // // --- Unified Project Card Component ---
// // // // // // const UnifiedProjectCard = ({ project }) => {
// // // // // //     // Determine status colors
// // // // // //     const isOverdue = project.status === 'Overdue';
// // // // // //     const isCompleted = project.status === 'Completed' || project.completion_percentage === 100;

// // // // // //     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
// // // // // //     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
// // // // // //     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'IN PROGRESS';

// // // // // //     // Helper for the dynamic tags
// // // // // //     const tags = [
// // // // // //         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
// // // // // //         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
// // // // // //         { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
// // // // // //     ].filter(tag => tag.label);


// // // // // //     return (
// // // // // //         <div className="flex flex-col h-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 p-6 relative">
            
// // // // // //             {/* Top Status Banner */}
// // // // // //             <div className={`absolute top-0 right-0 p-3 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
// // // // // //                 {statusLabel}
// // // // // //             </div>

// // // // // //             {/* 1. Image/Media Placeholder */}
// // // // // //             <MediaPlaceholder project={project} className="h-40" />

// // // // // //             {/* 2. Title and Description */}
// // // // // //             <div className="flex-grow text-white mb-4">
// // // // // //                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
// // // // // //                 <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
// // // // // //             </div>
            
// // // // // //             {/* 3. Decorative Tags/Metadata */}
// // // // // //             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
// // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // //                     {tags.map((tag, index) => (
// // // // // //                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
// // // // // //                             <tag.icon className="w-3 h-3 mr-1" />
// // // // // //                             {tag.label}
// // // // // //                         </div>
// // // // // //                     ))}
// // // // // //                 </div>

// // // // // //                 {/* Completion/Metric Line */}
// // // // // //                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
// // // // // //                     <span className="flex items-center">
// // // // // //                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
// // // // // //                         {project.completion_percentage}% Done
// // // // // //                     </span>
// // // // // //                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };


// // // // // // const ProjectCard = ({ project, assignedStyle }) => {
// // // // // //     const navigate = useNavigate(); 
    
// // // // // //     // Ensure slug exists for navigation
// // // // // //     const slug = project.slug || project.id;

// // // // // //     const handleClick = () => {
// // // // // //         if (slug) {
// // // // // //             navigate(`/projects/${slug}`);
// // // // // //         } else {
// // // // // //             console.warn(`Cannot navigate: Project ${project.id} is missing a slug.`);
// // // // // //         }
// // // // // //     };

// // // // // //     return (
// // // // // //         <motion.div
// // // // // //             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
// // // // // //             onClick={handleClick}
// // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // // //             transition={{ duration: 0.3 }}
// // // // // //             // FIX FOR DISAPPEARING: Use only Box Shadow for visual lift, no scale/y transform
// // // // // //             whileHover={{ 
// // // // // //                 // Increased shadow to give the illusion of lift without using 'y' translation
// // // // // //                 boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.4)", 
// // // // // //                 transition: { duration: 0.2 }
// // // // // //             }}
// // // // // //         >
// // // // // //             <UnifiedProjectCard project={project} />
// // // // // //         </motion.div>
// // // // // //     );
// // // // // // };

// // // // // // export default ProjectCard;
// // // // // // import React from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import { useNavigate } from 'react-router-dom'; 
// // // // // // import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield, AlertTriangle } from 'lucide-react';

// // // // // // // --- Helper for Media Placeholder ---
// // // // // // // (Simplified for the "popped" view, but remains the same for consistency)
// // // // // // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// // // // // //     // Generate a consistent gradient based on the project ID
// // // // // //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// // // // // //     const vibrantGradients = [
// // // // // //         'from-blue-600 to-purple-600', 'from-red-500 to-orange-500', 
// // // // // //         'from-green-500 to-teal-500', 'from-yellow-500 to-pink-500', 
// // // // // //         'from-indigo-600 to-cyan-500', 'from-fuchsia-600 to-rose-500'
// // // // // //     ];
// // // // // //     const gradient = vibrantGradients[hash];

// // // // // //     return (
// // // // // //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-xl mb-4 border border-white/10`}>
// // // // // //             <Code className="w-1/4 h-1/4 text-white/70" />
// // // // // //             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none"></div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // // --- Full Card Content (Only visible when Popped) ---
// // // // // // const FullCardContent = ({ project }) => {
// // // // // //     const isOverdue = project.status === 'Overdue';
// // // // // //     const isCompleted = project.status === 'Completed' || project.completion_percentage === 100;
// // // // // //     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
// // // // // //     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
// // // // // //     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

// // // // // //     const tags = [
// // // // // //         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
// // // // // //         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
// // // // // //         { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
// // // // // //     ].filter(tag => tag.label);

// // // // // //     return (
// // // // // //         <div className="flex flex-col h-full w-full bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 p-6 relative">
            
// // // // // //             <div className={`absolute top-0 right-0 p-3 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
// // // // // //                 {statusLabel}
// // // // // //             </div>

// // // // // //             <MediaPlaceholder project={project} className="h-40" />

// // // // // //             <div className="flex-grow text-white mb-4">
// // // // // //                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
// // // // // //                 <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
// // // // // //             </div>
            
// // // // // //             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
// // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // //                     {tags.map((tag, index) => (
// // // // // //                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
// // // // // //                             <tag.icon className="w-3 h-3 mr-1" />
// // // // // //                             {tag.label}
// // // // // //                         </div>
// // // // // //                     ))}
// // // // // //                 </div>

// // // // // //                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
// // // // // //                     <span className="flex items-center">
// // // // // //                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
// // // // // //                         {project.completion_percentage}% Done
// // // // // //                     </span>
// // // // // //                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // // --- Stacked/Deck Card Component ---
// // // // // // const ProjectCard = ({ project, index }) => {
// // // // // //     const navigate = useNavigate(); 
// // // // // //     const slug = project.slug || project.id;

// // // // // //     const handleClick = () => {
// // // // // //         if (slug) {
// // // // // //             navigate(`/projects/${slug}`);
// // // // // //         }
// // // // // //     };

// // // // // //     // Calculate rotation and translation for the initial stacked deck appearance
// // // // // //     // Rotate and translate slightly less for cards further down the stack (higher index)
// // // // // //     const rotation = (index % 5) * 0.8 - 2; // Range from -2deg to 1.2deg
// // // // // //     const xOffset = index * 10;
// // // // // //     const yOffset = index * 5; 
    
// // // // // //     // Use a high Z-index to ensure the hovered card is always on top
// // // // // //     const zIndex = 100 - index; 

// // // // // //     // Determine a tag color for the visible tab
// // // // // //     const tagColor = ['bg-blue-600', 'bg-green-600', 'bg-red-600', 'bg-purple-600', 'bg-yellow-600'][index % 5];
// // // // // //     const tagText = ['Project', 'Design', 'Code', 'UX', 'Strategy'][index % 5];

// // // // // //     return (
// // // // // //         <motion.div
// // // // // //             className="absolute w-64 h-80 cursor-pointer origin-top-left"
// // // // // //             onClick={handleClick}
            
// // // // // //             // Initial state in the stack
// // // // // //             initial={{ 
// // // // // //                 opacity: 0, 
// // // // // //                 rotate: rotation, 
// // // // // //                 x: xOffset + 50, // Initial position, shifted right for entry animation
// // // // // //                 y: yOffset + 50, 
// // // // // //                 zIndex: zIndex 
// // // // // //             }}
            
// // // // // //             // Stacked animation (entry)
// // // // // //             animate={{ 
// // // // // //                 opacity: 1, 
// // // // // //                 rotate: rotation, 
// // // // // //                 x: xOffset, 
// // // // // //                 y: yOffset, 
// // // // // //                 zIndex: zIndex,
// // // // // //                 transition: { type: 'spring', stiffness: 50, damping: 10, delay: index * 0.05 }
// // // // // //             }}

// // // // // //             // Hover: Pop up, center, lift, and reset rotation
// // // // // //             whileHover={{ 
// // // // // //                 rotate: 0, // Straighten the card
// // // // // //                 x: -100,  // Move left to center it relative to the stack container
// // // // // //                 y: -100,  // Move up
// // // // // //                 scale: 1.5, // Enlarge significantly
// // // // // //                 zIndex: 200, // Highest Z-index
// // // // // //                 boxShadow: "0 40px 80px -20px rgba(100, 100, 255, 0.8)", // Intense glow
// // // // // //                 transition: { type: 'spring', stiffness: 200, damping: 20 }
// // // // // //             }}
// // // // // //         >
// // // // // //             {/* The visible part when stacked: only a narrow tag and title */}
// // // // // //             <motion.div
// // // // // //                 className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative"
// // // // // //                 initial={false}
// // // // // //                 animate={isHovering => ({
// // // // // //                     // When not hovering, show only a narrow edge
// // // // // //                     clipPath: isHovering ? 'inset(0%)' : 'inset(0% 90% 0% 0%)',
// // // // // //                     backgroundColor: isHovering ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 1)',
// // // // // //                     transition: { duration: 0.3 }
// // // // // //                 })}
// // // // // //             >
// // // // // //                  {/* Stacked Tag Content (Always visible) */}
// // // // // //                 <div className={`absolute top-0 left-0 w-full h-full p-3 flex flex-col justify-start text-white ${tagColor}`} 
// // // // // //                      style={{ clipPath: 'inset(0% 90% 0% 0%)' }}>
// // // // // //                     <p className="text-sm font-bold tracking-widest uppercase rotate-90 origin-top-left whitespace-nowrap absolute top-10 left-3">
// // // // // //                          {tagText}
// // // // // //                     </p>
// // // // // //                 </div>

// // // // // //                 {/* Full Popped Content */}
// // // // // //                 <div style={{ clipPath: 'inset(0% 0% 0% 10%)' }}>
// // // // // //                      {/* The FullCardContent is rendered inside the motion.div to manage its visibility/clipPath */}
// // // // // //                     <FullCardContent project={project} />
// // // // // //                 </div>
// // // // // //             </motion.div>
// // // // // //         </motion.div>
// // // // // //     );
// // // // // // };

// // // // // // export default ProjectCard;

// // // // // import React from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import { useNavigate } from 'react-router-dom'; 
// // // // // import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield, AlertTriangle } from 'lucide-react';

// // // // // // --- Helper for Media Placeholder (Futuristic Image Block) ---
// // // // // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// // // // //     // Generate a consistent gradient based on the project ID
// // // // //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// // // // //     const vibrantGradients = [
// // // // //         'from-blue-600 to-purple-600', 'from-red-500 to-orange-500', 
// // // // //         'from-green-500 to-teal-500', 'from-yellow-500 to-pink-500', 
// // // // //         'from-indigo-600 to-cyan-500', 'from-fuchsia-600 to-rose-500'
// // // // //     ];
// // // // //     const gradient = vibrantGradients[hash];

// // // // //     return (
// // // // //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-xl mb-4 border border-white/10`}>
// // // // //             <Code className="w-1/4 h-1/4 text-white/70" />
// // // // //             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none"></div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // // --- Full Card Content (Visible only when Popped) ---
// // // // // const FullCardContent = ({ project }) => {
// // // // //     const isOverdue = project.status === 'Overdue';
// // // // //     const isCompleted = project.status === 'Completed' || project.completion_percentage === 100;
// // // // //     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
// // // // //     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
// // // // //     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

// // // // //     const tags = [
// // // // //         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
// // // // //         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
// // // // //         { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
// // // // //     ].filter(tag => tag.label);

// // // // //     return (
// // // // //         <div className="flex flex-col h-full w-full bg-gray-900/95 rounded-xl shadow-2xl overflow-hidden p-6 relative">
            
// // // // //             <div className={`absolute top-0 right-0 p-3 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
// // // // //                 {statusLabel}
// // // // //             </div>

// // // // //             <MediaPlaceholder project={project} className="h-40" />

// // // // //             <div className="flex-grow text-white mb-4">
// // // // //                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
// // // // //                 <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
// // // // //             </div>
            
// // // // //             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
// // // // //                 <div className="flex flex-wrap gap-2">
// // // // //                     {tags.map((tag, index) => (
// // // // //                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
// // // // //                             <tag.icon className="w-3 h-3 mr-1" />
// // // // //                             {tag.label}
// // // // //                         </div>
// // // // //                     ))}
// // // // //                 </div>

// // // // //                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
// // // // //                     <span className="flex items-center">
// // // // //                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
// // // // //                         {project.completion_percentage}% Done
// // // // //                     </span>
// // // // //                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // // --- Stacked/Deck Card Component ---
// // // // // const ProjectCard = ({ project, index }) => {
// // // // //     const navigate = useNavigate(); 
// // // // //     const slug = project.slug || project.id;

// // // // //     const handleClick = () => {
// // // // //         if (slug) {
// // // // //             // Navigate on click to the detail page
// // // // //             navigate(`/projects/${slug}`);
// // // // //         }
// // // // //     };

// // // // //     // Calculate initial position based on index for diagonal stack
// // // // //     const rotation = (index % 5) * 0.8 - 2; 
// // // // //     const xOffset = index * 12;
// // // // //     const yOffset = index * 6; 
// // // // //     const zIndex = 100 - index; 

// // // // //     // Determine a unique tag for the stacked view
// // // // //     const tagColor = ['bg-blue-600', 'bg-green-600', 'bg-red-600', 'bg-purple-600', 'bg-yellow-600'][index % 5];
// // // // //     const tagText = project.title.split(' ')[0].toUpperCase(); // Use the first word as the tag

// // // // //     return (
// // // // //         <motion.div
// // // // //             className="absolute w-64 h-80 cursor-pointer origin-top-left"
// // // // //             onClick={handleClick}
            
// // // // //             // Initial positioning (Stacked state)
// // // // //             initial={{ 
// // // // //                 opacity: 0, 
// // // // //                 rotate: rotation, 
// // // // //                 x: xOffset + 50, 
// // // // //                 y: yOffset + 50, 
// // // // //                 zIndex: zIndex 
// // // // //             }}
            
// // // // //             // Stacked animation (Entry transition)
// // // // //             animate={{ 
// // // // //                 opacity: 1, 
// // // // //                 rotate: rotation, 
// // // // //                 x: xOffset, 
// // // // //                 y: yOffset, 
// // // // //                 zIndex: zIndex,
// // // // //                 transition: { type: 'spring', stiffness: 50, damping: 10, delay: index * 0.05 }
// // // // //             }}

// // // // //             // Hover: Pop up, center, lift, and reset rotation
// // // // //             whileHover={{ 
// // // // //                 rotate: 0, 
// // // // //                 x: -120, // Adjust position to center the enlarged card
// // // // //                 y: -150, // Lift significantly
// // // // //                 scale: 1.6, // Enlarge dramatically
// // // // //                 zIndex: 200, 
// // // // //                 boxShadow: "0 40px 80px -20px rgba(100, 100, 255, 0.8)", 
// // // // //                 transition: { type: 'spring', stiffness: 200, damping: 20 }
// // // // //             }}
// // // // //         >
// // // // //             {/* The Outer Wrapper that handles the visible slice/clip path */}
// // // // //             <motion.div
// // // // //                 className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative"
// // // // //                 initial={false}
// // // // //                 // Animates the clipPath property to reveal the full card content
// // // // //                 animate={isHovering => ({
// // // // //                     clipPath: isHovering ? 'inset(0%)' : 'inset(0% 90% 0% 0%)',
// // // // //                     backgroundColor: isHovering ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 1)',
// // // // //                     transition: { duration: 0.3 }
// // // // //                 })}
// // // // //             >
// // // // //                  {/* Stacked Tag Content (Always visible in the narrow slice) */}
// // // // //                 <div className={`absolute top-0 left-0 w-full h-full p-3 flex flex-col justify-start text-white ${tagColor}`} 
// // // // //                      // Clip path isolates the narrow tag strip
// // // // //                      style={{ clipPath: 'inset(0% 90% 0% 0%)' }}>
// // // // //                     <p className="text-sm font-bold tracking-widest uppercase rotate-90 origin-top-left whitespace-nowrap absolute top-10 left-3">
// // // // //                          {tagText}
// // // // //                     </p>
// // // // //                 </div>

// // // // //                 {/* Full Popped Content (Hidden until expanded) */}
// // // // //                 <div style={{ clipPath: 'inset(0% 0% 0% 10%)' }}>
// // // // //                     <FullCardContent project={project} />
// // // // //                 </div>
// // // // //             </motion.div>
// // // // //         </motion.div>
// // // // //     );
// // // // // };

// // // // // export default ProjectCard;
// // // // import React from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { useNavigate } from 'react-router-dom'; 
// // // // import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield } from 'lucide-react';

// // // // // Card Style definitions are unified (kept for external compatibility)
// // // // export const CardStyle = {
// // // //   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
// // // //   DECK_STACKED: 'DECK_STACKED' 
// // // // };

// // // // // --- Helper for Media Placeholder (Futuristic Image Block) ---
// // // // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// // // //     // Generate a consistent gradient based on the project ID
// // // //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// // // //     const vibrantGradients = [
// // // //         'from-blue-600 to-purple-600', 'from-red-500 to-orange-500', 
// // // //         'from-green-500 to-teal-500', 'from-yellow-500 to-pink-500', 
// // // //         'from-indigo-600 to-cyan-500', 'from-fuchsia-600 to-rose-500'
// // // //     ];
// // // //     const gradient = vibrantGradients[hash];

// // // //     return (
// // // //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-xl mb-4 border border-white/10`}>
// // // //             <Code className="w-1/4 h-1/4 text-white/70" />
// // // //             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none"></div>
// // // //         </div>
// // // //     );
// // // // };

// // // // // --- Full Card Content (Visible only when Popped) ---
// // // // const FullCardContent = ({ project }) => {
// // // //     const isOverdue = project.status === 'Overdue';
// // // //     const isCompleted = project.status === 'Completed' || project.completion_percentage === 100;
// // // //     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
// // // //     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
// // // //     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

// // // //     const tags = [
// // // //         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
// // // //         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
// // // //         { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
// // // //     ].filter(tag => tag.label);

// // // //     return (
// // // //         <div className="flex flex-col h-full w-full bg-gray-900/95 rounded-xl shadow-2xl overflow-hidden p-6 relative">
            
// // // //             <div className={`absolute top-0 right-0 p-3 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
// // // //                 {statusLabel}
// // // //             </div>

// // // //             <MediaPlaceholder project={project} className="h-40" />

// // // //             <div className="flex-grow text-white mb-4">
// // // //                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
// // // //                 <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
// // // //             </div>
            
// // // //             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
// // // //                 <div className="flex flex-wrap gap-2">
// // // //                     {tags.map((tag, index) => (
// // // //                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
// // // //                             <tag.icon className="w-3 h-3 mr-1" />
// // // //                             {tag.label}
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>

// // // //                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
// // // //                     <span className="flex items-center">
// // // //                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
// // // //                         {project.completion_percentage}% Done
// // // //                     </span>
// // // //                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // // --- The Core ProjectCard Component ---
// // // // const ProjectCard = ({ project, index, isDeckView }) => {
// // // //     const navigate = useNavigate(); 
// // // //     const slug = project.slug || project.id;

// // // //     const handleClick = () => {
// // // //         if (slug) {
// // // //             navigate(`/projects/${slug}`);
// // // //         }
// // // //     };

// // // //     // --- Deck View Logic ---
// // // //     if (isDeckView) {
// // // //         // Calculate initial position based on index for diagonal stack
// // // //         const rotation = (index % 5) * 0.8 - 2; 
// // // //         const xOffset = index * 12;
// // // //         const yOffset = index * 6; 
// // // //         const zIndex = 100 - index; 

// // // //         // Determine a unique tag for the stacked view
// // // //         const tagColor = ['bg-blue-600', 'bg-green-600', 'bg-red-600', 'bg-purple-600', 'bg-yellow-600'][index % 5];
// // // //         const tagText = project.title.split(' ')[0].toUpperCase(); 

// // // //         return (
// // // //             <motion.div
// // // //                 className="absolute w-64 h-80 cursor-pointer origin-top-left"
// // // //                 onClick={handleClick}
                
// // // //                 // Initial positioning (Stacked state)
// // // //                 initial={{ 
// // // //                     opacity: 0, 
// // // //                     rotate: rotation, 
// // // //                     x: xOffset + 50, 
// // // //                     y: yOffset + 50, 
// // // //                     zIndex: zIndex 
// // // //                 }}
                
// // // //                 // Stacked animation (Entry transition)
// // // //                 animate={{ 
// // // //                     opacity: 1, 
// // // //                     rotate: rotation, 
// // // //                     x: xOffset, 
// // // //                     y: yOffset, 
// // // //                     zIndex: zIndex,
// // // //                     transition: { type: 'spring', stiffness: 50, damping: 10, delay: index * 0.05 }
// // // //                 }}

// // // //                 // Hover: Pop up, center, lift, and reset rotation
// // // //                 whileHover={{ 
// // // //                     rotate: 0, 
// // // //                     x: -120, 
// // // //                     y: -150, 
// // // //                     scale: 1.6, 
// // // //                     zIndex: 200, 
// // // //                     boxShadow: "0 40px 80px -20px rgba(100, 100, 255, 0.8)", 
// // // //                     transition: { type: 'spring', stiffness: 200, damping: 20 }
// // // //                 }}
// // // //             >
// // // //                 {/* The Outer Wrapper that handles the visible slice/clip path */}
// // // //                 <motion.div
// // // //                     className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative"
// // // //                     initial={false}
// // // //                     // Animates the clipPath property to reveal the full card content
// // // //                     animate={isHovering => ({
// // // //                         clipPath: isHovering ? 'inset(0%)' : 'inset(0% 90% 0% 0%)',
// // // //                         backgroundColor: isHovering ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 1)',
// // // //                         transition: { duration: 0.3 }
// // // //                     })}
// // // //                 >
// // // //                     {/* Stacked Tag Content (Always visible in the narrow slice) */}
// // // //                     <div className={`absolute top-0 left-0 w-full h-full p-3 flex flex-col justify-start text-white ${tagColor}`} 
// // // //                         style={{ clipPath: 'inset(0% 90% 0% 0%)' }}>
// // // //                         <p className="text-sm font-bold tracking-widest uppercase rotate-90 origin-top-left whitespace-nowrap absolute top-10 left-3">
// // // //                             {tagText}
// // // //                         </p>
// // // //                     </div>

// // // //                     {/* Full Popped Content (Hidden until expanded) */}
// // // //                     <div style={{ clipPath: 'inset(0% 0% 0% 10%)' }}>
// // // //                         <FullCardContent project={project} />
// // // //                     </div>
// // // //                 </motion.div>
// // // //             </motion.div>
// // // //         );
// // // //     }
    
// // // //     // --- Grid View Logic (Kept from previous iteration for Masonry compatibility) ---
// // // //     return (
// // // //         <motion.div
// // // //             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
// // // //             onClick={handleClick}
// // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // //             transition={{ duration: 0.3 }}
// // // //             whileHover={{ 
// // // //                 boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.4)", 
// // // //                 transition: { duration: 0.2 }
// // // //             }}
// // // //         >
// // // //             {/* Reusing FullCardContent for the default grid display, simplifying the logic */}
// // // //             <FullCardContent project={project} /> 
// // // //         </motion.div>
// // // //     );
// // // // };

// // // // export default ProjectCard;

// // // import React from 'react';
// // // import { motion } from 'framer-motion';
// // // import { useNavigate } from 'react-router-dom'; 
// // // import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield } from 'lucide-react';

// // // // Card Style definitions are unified (kept for external compatibility)
// // // export const CardStyle = {
// // //   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
// // //   DECK_STACKED: 'DECK_STACKED' 
// // // };

// // // // --- Helper for Media Placeholder (Futuristic Image Block) ---
// // // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// // //     // Generate a consistent gradient based on the project ID
// // //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// // //     const vibrantGradients = [
// // //         'from-blue-600 to-purple-600', 'from-red-500 to-orange-500', 
// // //         'from-green-500 to-teal-500', 'from-yellow-500 to-pink-500', 
// // //         'from-indigo-600 to-cyan-500', 'from-fuchsia-600 to-rose-500'
// // //     ];
// // //     const gradient = vibrantGradients[hash];

// // //     return (
// // //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-xl mb-4 border border-white/10`}>
// // //             <Code className="w-1/4 h-1/4 text-white/70" />
// // //             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none"></div>
// // //         </div>
// // //     );
// // // };

// // // // --- Full Card Content (Visible only when Popped) ---
// // // const FullCardContent = ({ project }) => {
// // //     const isOverdue = project.status === 'Overdue';
// // //     const isCompleted = project.completion_percentage === 100;
// // //     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
// // //     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
// // //     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

// // //     const tags = [
// // //         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
// // //         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
// // //         { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
// // //     ].filter(tag => tag.label);

// // //     return (
// // //         <div className="flex flex-col h-full w-full bg-gray-900/95 rounded-xl shadow-2xl overflow-hidden p-6 relative">
            
// // //             <div className={`absolute top-0 right-0 p-3 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
// // //                 {statusLabel}
// // //             </div>

// // //             <MediaPlaceholder project={project} className="h-40" />

// // //             <div className="flex-grow text-white mb-4">
// // //                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
// // //                 <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
// // //             </div>
            
// // //             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
// // //                 <div className="flex flex-wrap gap-2">
// // //                     {tags.map((tag, index) => (
// // //                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
// // //                             <tag.icon className="w-3 h-3 mr-1" />
// // //                             {tag.label}
// // //                         </div>
// // //                     ))}
// // //                 </div>

// // //                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
// // //                     <span className="flex items-center">
// // //                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
// // //                         {project.completion_percentage}% Done
// // //                     </span>
// // //                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // // --- The Core ProjectCard Component ---
// // // const ProjectCard = ({ project, index, isDeckView }) => {
// // //     const navigate = useNavigate(); 
// // //     const slug = project.slug || project.id;

// // //     const handleClick = () => {
// // //         if (slug) {
// // //             navigate(`/projects/${slug}`);
// // //         }
// // //     };

// // //     // --- Deck View Logic ---
// // //     if (isDeckView) {
// // //         // --- Adjusted Values for better spread and visibility ---
// // //         const rotation = (index * 2) - 6; // Spread the rotation out more (e.g., -6 deg to 6 deg)
// // //         const xOffset = index * 20;      // Increase horizontal offset
// // //         const yOffset = index * 10;      // Increase vertical offset
// // //         const zIndex = 100 - index; 

// // //         // Determine a unique tag for the stacked view
// // //         const tagColor = ['bg-blue-600', 'bg-green-600', 'bg-red-600', 'bg-purple-600', 'bg-yellow-600'][index % 5];
// // //         const tagText = project.title.split(' ')[0].toUpperCase(); 

// // //         return (
// // //             <motion.div
// // //                 className="absolute w-64 h-80 cursor-pointer origin-top-left"
// // //                 // Key needs to be project.id + index to force re-render on deck change
// // //                 key={`${project.id}-${index}`} 
// // //                 onClick={handleClick}
                
// // //                 // Initial positioning (Stacked state)
// // //                 initial={{ 
// // //                     opacity: 0, 
// // //                     rotate: rotation, 
// // //                     x: xOffset, 
// // //                     y: yOffset, 
// // //                     zIndex: zIndex 
// // //                 }}
                
// // //                 // Stacked animation (Entry transition)
// // //                 animate={{ 
// // //                     opacity: 1, 
// // //                     rotate: rotation, 
// // //                     x: xOffset, 
// // //                     y: yOffset, 
// // //                     zIndex: zIndex,
// // //                     transition: { type: 'spring', stiffness: 50, damping: 10, delay: index * 0.05 }
// // //                 }}

// // //                 // Hover: Pop up, center, lift, and reset rotation
// // //                 whileHover={{ 
// // //                     rotate: 0, 
// // //                     x: -160, // Adjust position to center the enlarged card relative to the stack
// // //                     y: -180, // Lift significantly
// // //                     scale: 1.8, // Enlarge dramatically
// // //                     zIndex: 200, 
// // //                     boxShadow: "0 40px 80px -20px rgba(100, 100, 255, 0.8)", 
// // //                     transition: { type: 'spring', stiffness: 200, damping: 20 }
// // //                 }}
// // //             >
// // //                 {/* The Outer Wrapper that handles the visible slice/clip path */}
// // //                 <motion.div
// // //                     className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative"
// // //                     initial={false}
// // //                     // Animates the clipPath property to reveal the full card content
// // //                     // Adjusted clipPath values to ensure the full card is visible on hover
// // //                     animate={isHovering => ({
// // //                         clipPath: isHovering ? 'inset(0%)' : 'inset(0% 90% 0% 0%)',
// // //                         backgroundColor: isHovering ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 1)',
// // //                         transition: { duration: 0.3 }
// // //                     })}
// // //                 >
// // //                     {/* Stacked Tag Content (Always visible in the narrow slice) */}
// // //                     <div className={`absolute top-0 left-0 w-full h-full p-3 flex flex-col justify-start text-white ${tagColor}`} 
// // //                         // The clip path isolates the narrow tag strip (10% wide)
// // //                         style={{ clipPath: 'inset(0% 90% 0% 0%)' }}>
// // //                         <p className="text-sm font-bold tracking-widest uppercase rotate-90 origin-top-left whitespace-nowrap absolute top-10 left-3">
// // //                             {tagText}
// // //                         </p>
// // //                     </div>

// // //                     {/* Full Popped Content (Hidden until expanded) */}
// // //                     {/* The full content should be visible on hover, which is controlled by the parent clipPath */}
// // //                     <div style={{ paddingLeft: '10%' }}> 
// // //                         <FullCardContent project={project} />
// // //                     </div>
// // //                 </motion.div>
// // //             </motion.div>
// // //         );
// // //     }
    
// // //     // --- Grid View Logic (Unchanged but cleaned up) ---
// // //     return (
// // //         <motion.div
// // //             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
// // //             onClick={handleClick}
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             exit={{ opacity: 0, scale: 0.8 }}
// // //             transition={{ duration: 0.3 }}
// // //             whileHover={{ 
// // //                 scale: 1.02,
// // //                 boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.4)", 
// // //                 transition: { duration: 0.2 }
// // //             }}
// // //         >
// // //             <FullCardContent project={project} /> 
// // //         </motion.div>
// // //     );
// // // };

// // // export default ProjectCard;
// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { useNavigate } from 'react-router-dom'; 
// // import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield } from 'lucide-react';

// // // Card Style definitions are unified (kept for external compatibility)
// // export const CardStyle = {
// //   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
// //   DECK_STACKED: 'DECK_STACKED' 
// // };

// // // --- Helper for Media Placeholder (Futuristic Image Block) ---
// // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// //     // Generate a consistent gradient based on the project ID
// //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// //     const vibrantGradients = [
// //         'from-blue-700 to-purple-700', 'from-red-700 to-orange-700', 
// //         'from-green-700 to-teal-700', 'from-yellow-700 to-pink-700', 
// //         'from-indigo-700 to-cyan-700', 'from-fuchsia-700 to-rose-700'
// //     ];
// //     const gradient = vibrantGradients[hash];

// //     return (
// //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-lg mb-4 border border-white/10`}>
// //             {/* Using Code icon as a placeholder for the "project image" area */}
// //             <Code className="w-1/4 h-1/4 text-white/80 opacity-70" /> 
// //             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none opacity-20"></div>
// //         </div>
// //     );
// // };

// // // --- Full Card Content (Now the primary content for both views) ---
// // const FullCardContent = ({ project }) => {
// //     const isOverdue = project.status === 'Overdue';
// //     const isCompleted = project.completion_percentage === 100;
// //     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
// //     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
// //     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

// //     const tags = [
// //         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
// //         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
// //         { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
// //     ].filter(tag => tag.label);

// //     return (
// //         <div className="flex flex-col h-full w-full bg-gray-900/95 rounded-xl shadow-2xl overflow-hidden p-6 relative">
            
// //             {/* Status Tag */}
// //             <div className={`absolute top-0 right-0 p-2 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
// //                 {statusLabel}
// //             </div>

// //             <MediaPlaceholder project={project} className="h-40" />

// //             <div className="flex-grow text-white mb-4">
// //                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
// //                 <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
// //             </div>
            
// //             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
// //                 {/* Tags Section */}
// //                 <div className="flex flex-wrap gap-2">
// //                     {tags.map((tag, index) => (
// //                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
// //                             <tag.icon className="w-3 h-3 mr-1" />
// //                             {tag.label}
// //                         </div>
// //                     ))}
// //                 </div>

// //                 {/* Progress/Publisher */}
// //                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
// //                     <span className="flex items-center">
// //                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
// //                         {project.completion_percentage}% Done
// //                     </span>
// //                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // // --- The Core ProjectCard Component ---
// // const ProjectCard = ({ project, index, isDeckView }) => {
// //     const navigate = useNavigate(); 
// //     const slug = project.slug || project.id;

// //     const handleClick = () => {
// //         if (slug) {
// //             navigate(`/projects/${slug}`);
// //         }
// //     };

// //     // --- Deck View Logic (New Fan/Spread Style) ---
// //     if (isDeckView) {
// //         // Calculate dynamic properties for the fan spread
// //         const TOTAL_CARDS = 7;
// //         // Rotation range: -25 deg (index 0) to +25 deg (index 6)
// //         const rotation = (index - (TOTAL_CARDS - 1) / 2) * 8.3; 
// //         // Horizontal spread (fanning effect from the center)
// //         const xOffset = rotation * 2; 
// //         const zIndex = 100 + index; 

// //         // Generate a base color for the card background (from MediaPlaceholder logic)
// //         const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// //         const baseColors = [
// //             'bg-blue-600', 'bg-red-600', 'bg-green-600', 
// //             'bg-yellow-600', 'bg-indigo-600', 'bg-fuchsia-600'
// //         ];
// //         const baseBg = baseColors[hash];


// //         return (
// //             <motion.div
// //                 className="absolute w-64 h-80 cursor-pointer"
// //                 key={`${project.id}-${index}`} 
// //                 onClick={handleClick}
                
// //                 // Set the rotation origin to the bottom center for the fan effect
// //                 style={{ transformOrigin: 'bottom center' }}
                
// //                 // Initial positioning (Fan state)
// //                 initial={{ 
// //                     opacity: 0, 
// //                     rotate: rotation, 
// //                     x: xOffset, 
// //                     y: 0, // Start centered vertically
// //                     zIndex: zIndex 
// //                 }}
                
// //                 // Fan animation (Entry transition)
// //                 animate={{ 
// //                     opacity: 1, 
// //                     rotate: rotation, 
// //                     x: xOffset, 
// //                     y: 0, 
// //                     zIndex: zIndex,
// //                     transition: { 
// //                         type: 'spring', 
// //                         stiffness: 50, 
// //                         damping: 10, 
// //                         delay: index * 0.05 
// //                     }
// //                 }}

// //                 // Hover: The "Perfect Card" pops out, straightens, and lifts
// //                 whileHover={{ 
// //                     rotate: 0, 
// //                     x: 0, // Center horizontally
// //                     y: -150, // Lift significantly above the deck
// //                     scale: 1.4, // Enlarge (less dramatic than before, easier to fit on screen)
// //                     zIndex: 200, 
// //                     boxShadow: "0 40px 80px -20px rgba(100, 100, 255, 0.8)", 
// //                     transition: { type: 'spring', stiffness: 200, damping: 20 }
// //                 }}
// //             >
// //                 {/* Full Card Content Container */}
// //                 <div 
// //                     className={`w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative ${baseBg}`}
// //                 >
// //                     <FullCardContent project={project} />
// //                 </div>
// //             </motion.div>
// //         );
// //     }
    
// //     // --- Grid View Logic (Unchanged) ---
// //     return (
// //         <motion.div
// //             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
// //             onClick={handleClick}
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             exit={{ opacity: 0, scale: 0.8 }}
// //             transition={{ duration: 0.3 }}
// //             whileHover={{ 
// //                 scale: 1.02,
// //                 boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.4)", 
// //                 transition: { duration: 0.2 }
// //             }}
// //         >
// //             <FullCardContent project={project} /> 
// //         </motion.div>
// //     );
// // };

// // export default ProjectCard;

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom'; 
// import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield } from 'lucide-react';

// // Card Style definitions are unified (kept for external compatibility)
// export const CardStyle = {
//   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
//   DECK_STACKED: 'DECK_STACKED' 
// };

// // --- Helper for Media Placeholder (Futuristic Image Block) ---
// const MediaPlaceholder = ({ project, className = 'h-32' }) => {
//     // Generate a consistent gradient based on the project ID
//     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
//     const vibrantGradients = [
//         'from-blue-700 to-purple-700', 'from-red-700 to-orange-700', 
//         'from-green-700 to-teal-700', 'from-yellow-700 to-pink-700', 
//         'from-indigo-700 to-cyan-700', 'from-fuchsia-700 to-rose-700'
//     ];
//     const gradient = vibrantGradients[hash];

//     return (
//         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-lg mb-4 border border-white/10`}>
//             {/* Using Code icon as a placeholder for the "project image" area */}
//             <Code className="w-1/4 h-1/4 text-white/80 opacity-70" /> 
//             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none opacity-20"></div>
//         </div>
//     );
// };

// // --- Full Card Content (Now the primary content for both views) ---
// const FullCardContent = ({ project }) => {
//     const isOverdue = project.status === 'Overdue';
//     const isCompleted = project.completion_percentage === 100;
//     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
//     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
//     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

//     const tags = [
//         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
//         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
//         { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
//     ].filter(tag => tag.label);

//     return (
//         <div className="flex flex-col h-full w-full bg-gray-900/95 rounded-xl shadow-2xl overflow-hidden p-6 relative">
            
//             {/* Status Tag */}
//             <div className={`absolute top-0 right-0 p-2 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
//                 {statusLabel}
//             </div>

//             {/* INCREASED Media Placeholder height to h-48 */}
//             <MediaPlaceholder project={project} className="h-48" />

//             <div className="flex-grow text-white mb-4">
//                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
//                 <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
//             </div>
            
//             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
//                 {/* Tags Section */}
//                 <div className="flex flex-wrap gap-2">
//                     {tags.map((tag, index) => (
//                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
//                             <tag.icon className="w-3 h-3 mr-1" />
//                             {tag.label}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Progress/Publisher */}
//                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
//                     <span className="flex items-center">
//                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
//                         {project.completion_percentage}% Done
//                     </span>
//                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- The Core ProjectCard Component ---
// const ProjectCard = ({ project, index, isDeckView }) => {
//     const navigate = useNavigate(); 
//     const slug = project.slug || project.id;

//     const handleClick = () => {
//         if (slug) {
//             navigate(`/projects/${slug}`);
//         }
//     };

//     // --- Deck View Logic (New Fan/Spread Style) ---
//     if (isDeckView) {
//         // Calculate dynamic properties for the fan spread
//         const TOTAL_CARDS = 7;
//         // Rotation range: -25 deg (index 0) to +25 deg (index 6)
//         const rotation = (index - (TOTAL_CARDS - 1) / 2) * 8.3; 
//         // Horizontal spread (fanning effect from the center) - INCREASED spread
//         const xOffset = rotation * 3; // Changed from 2 to 3 for wider space/spread
//         const zIndex = 100 + index; 

//         // Generate a base color for the card background (from MediaPlaceholder logic)
//         const hash = project.id.charCodeAt(project.id.length - 1) % 6;
//         const baseColors = [
//             'bg-blue-600', 'bg-red-600', 'bg-green-600', 
//             'bg-yellow-600', 'bg-indigo-600', 'bg-fuchsia-600'
//         ];
//         const baseBg = baseColors[hash];


//         return (
//             <motion.div
//                 // INCREASED CARD SIZE: from w-64 h-80 to w-72 h-96
//                 className="absolute w-72 h-96 cursor-pointer"
//                 key={`${project.id}-${index}`} 
//                 onClick={handleClick}
                
//                 // Set the rotation origin to the bottom center for the fan effect
//                 style={{ transformOrigin: 'bottom center' }}
                
//                 // Initial positioning (Fan state)
//                 initial={{ 
//                     opacity: 0, 
//                     rotate: rotation, 
//                     x: xOffset, 
//                     y: 0, 
//                     zIndex: zIndex 
//                 }}
                
//                 // Fan animation (Entry transition)
//                 animate={{ 
//                     opacity: 1, 
//                     rotate: rotation, 
//                     x: xOffset, 
//                     y: 0, 
//                     zIndex: zIndex,
//                     transition: { 
//                         type: 'spring', 
//                         stiffness: 50, 
//                         damping: 10, 
//                         delay: index * 0.05 
//                     }
//                 }}

//                 // Hover: Pops out, straightens, and lifts - less congested, higher lift
//                 whileHover={{ 
//                     rotate: 0, 
//                     x: 0, // Center horizontally
//                     y: -180, // INCREASED LIFT: from -150 to -180
//                     scale: 1.25, // DECREASED SCALE: from 1.4 to 1.25 (less congested)
//                     zIndex: 200, 
//                     boxShadow: "0 40px 80px -20px rgba(100, 100, 255, 0.8)", 
//                     transition: { type: 'spring', stiffness: 200, damping: 20 }
//                 }}
//             >
//                 {/* Full Card Content Container */}
//                 <div 
//                     className={`w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative ${baseBg}`}
//                 >
//                     <FullCardContent project={project} />
//                 </div>
//             </motion.div>
//         );
//     }
    
//     // --- Grid View Logic (Unchanged) ---
//     return (
//         <motion.div
//             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
//             onClick={handleClick}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             whileHover={{ 
//                 scale: 1.02,
//                 boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.4)", 
//                 transition: { duration: 0.2 }
//             }}
//         >
//             <FullCardContent project={project} /> 
//         </motion.div>
//     );
// };

// export default ProjectCard;

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom'; 
// import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield } from 'lucide-react';

// // Card Style definitions are unified (kept for external compatibility)
// export const CardStyle = {
//   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
//   DECK_STACKED: 'DECK_STACKED' 
// };

// // --- Helper for Media Placeholder (Futuristic Image Block) ---
// const MediaPlaceholder = ({ project, className = 'h-32' }) => {
//     // Check for a real image URL
//     if (project.image_url) {
//         return (
//             <div className={`relative ${className} rounded-lg overflow-hidden shadow-xl mb-4 border border-white/10 bg-gray-800`}>
//                 {/* Real Image Display */}
//                 <img 
//                     src={project.image_url} 
//                     alt={`Image for ${project.title}`} 
//                     className="w-full h-full object-cover" 
//                 />
//                 <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none opacity-20"></div>
//             </div>
//         );
//     }

//     // Fallback: Generate a consistent gradient based on the project ID
//     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
//     const vibrantGradients = [
//         'from-blue-700 to-purple-700', 'from-red-700 to-orange-700', 
//         'from-green-700 to-teal-700', 'from-yellow-700 to-pink-700', 
//         'from-indigo-700 to-cyan-700', 'from-fuchsia-700 to-rose-700'
//     ];
//     const gradient = vibrantGradients[hash];

//     return (
//         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-lg mb-4 border border-white/10`}>
//             {/* Using Code icon as a placeholder for the "project image" area */}
//             <Code className="w-1/4 h-1/4 text-white/80 opacity-70" /> 
//             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none opacity-20"></div>
//         </div>
//     );
// };

// // --- Full Card Content (Now the primary content for both views) ---
// const FullCardContent = ({ project }) => {
//     const isOverdue = project.status === 'Overdue';
//     const isCompleted = project.completion_percentage === 100;
//     const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
//     const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
//     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

//     const tags = [
//         { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
//         { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
//         // Tier tag removed to reduce clutter and keep tags less comparatively
//         // { label: `Tier ${project.tier_id}`, icon: Shield, color: 'text-lime-400' },
//     ].filter(tag => tag.label);

//     return (
//         <div className="flex flex-col h-full w-full bg-gray-900/95 rounded-xl shadow-2xl overflow-hidden p-6 relative">
            
//             {/* Status Tag */}
//             <div className={`absolute top-0 right-0 p-2 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
//                 {statusLabel}
//             </div>

//             {/* Increased Media Placeholder height to h-56 for more image space */}
//             <MediaPlaceholder project={project} className="h-56" />

//             <div className="flex-grow text-white mb-4">
//                 <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
//                 <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
//             </div>
            
//             <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
//                 {/* Tags Section (Now only two tags max) */}
//                 <div className="flex flex-wrap gap-2">
//                     {tags.map((tag, index) => (
//                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
//                             <tag.icon className="w-3 h-3 mr-1" />
//                             {tag.label}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Progress/Publisher */}
//                 <div className="flex justify-between items-center text-sm font-mono text-gray-300">
//                     <span className="flex items-center">
//                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
//                         {project.completion_percentage}% Done
//                     </span>
//                     <span className="text-xs text-gray-500">{project.publisher_name}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- The Core ProjectCard Component ---
// const ProjectCard = ({ project, index, isDeckView }) => {
//     const navigate = useNavigate(); 
//     const slug = project.slug || project.id;

//     const handleClick = () => {
//         if (slug) {
//             navigate(`/projects/${slug}`);
//         }
//     };

//     // --- Deck View Logic (New Fan/Spread Style) ---
//     if (isDeckView) {
//         // Calculate dynamic properties for the fan spread
//         const TOTAL_CARDS = 7;
//         // Rotation range: -25 deg (index 0) to +25 deg (index 6)
//         const rotation = (index - (TOTAL_CARDS - 1) / 2) * 8.3; 
//         // Horizontal spread - INCREASED spread again for more gap
//         const xOffset = rotation * 10; // Changed from 3 to 4
//         const zIndex = 100 + index; 

//         // Generate a base color for the card background (from MediaPlaceholder logic)
//         const hash = project.id.charCodeAt(project.id.length - 1) % 6;
//         const baseColors = [
//             'bg-blue-600', 'bg-red-600', 'bg-green-600', 
//             'bg-yellow-600', 'bg-indigo-600', 'bg-fuchsia-600'
//         ];
//         const baseBg = baseColors[hash];


//         return (
//             <motion.div
//                 // INCREASED CARD SIZE: w-72 h-96
//                 className="absolute w-90 h-100 cursor-pointer"
//                 key={`${project.id}-${index}`} 
//                 onClick={handleClick}
                
//                 // Set the rotation origin to the bottom center for the fan effect
//                 style={{ 
//                     transformOrigin: 'bottom center',
//                     // Set perspective for a better 3D tilt effect on hover
//                     perspective: 1000, 
//                 }}
                
//                 // Initial positioning (Fan state)
//                 initial={{ 
//                     opacity: 0, 
//                     rotate: rotation, 
//                     x: xOffset, 
//                     y: 0, 
//                     zIndex: zIndex 
//                 }}
                
//                 // Fan animation (Entry transition)
//                 animate={{ 
//                     opacity: 1, 
//                     rotate: rotation, 
//                     x: xOffset, 
//                     y: 0, 
//                     zIndex: zIndex,
//                     transition: { 
//                         type: 'spring', 
//                         stiffness: 50, 
//                         damping: 10, 
//                         delay: index * 0.05 
//                     }
//                 }}

//                 // NEW: Smoother Hover Effect - Subtle lift and 3D rotation (no aggressive scale/center)
//                 whileHover={{ 
//                     // Maintain existing rotation for the fanned card
//                     rotate: rotation, 
//                     // Slight lift from the deck
//                     y: -20, 
//                     // Slight tilt based on the card's original angle (e.g., if rotated left, tilt further left)
//                     rotateY: rotation > 0 ? -5 : 5, 
//                     scale: 1.05, // Very slight scale
//                     zIndex: 200, 
//                     boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.6)", 
//                     transition: { type: 'spring', stiffness: 200, damping: 20 }
//                 }}
//             >
//                 {/* Full Card Content Container */}
//                 <div 
//                     className={`w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative ${baseBg}`}
//                 >
//                     <FullCardContent project={project} />
//                 </div>
//             </motion.div>
//         );
//     }
    
//     // --- Grid View Logic (Unchanged) ---
//     return (
//         <motion.div
//             className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
//             onClick={handleClick}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             whileHover={{ 
//                 scale: 1.02,
//                 boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.4)", 
//                 transition: { duration: 0.2 }
//             }}
//         >
//             <FullCardContent project={project} /> 
//         </motion.div>
//     );
// };

// export default ProjectCard;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import { CheckCircle, Clock, Layers, Zap, Briefcase, Code, Shield } from 'lucide-react';

// Card Style definitions are unified (kept for external compatibility)
export const CardStyle = {
  UNIFIED_DESIGN: 'UNIFIED_DESIGN',
  DECK_STACKED: 'DECK_STACKED' 
};

// --- Helper for Media Placeholder (Futuristic Image Block) ---
const MediaPlaceholder = ({ project, className = 'h-32' }) => {
    // Check for a real image URL
    if (project.image_url) {
        return (
            // Height is derived from the className prop passed by FullCardContent (h-64)
            <div className={`relative ${className} rounded-lg overflow-hidden shadow-xl mb-4 border border-white/10 bg-gray-800`}>
                {/* Real Image Display */}
                <img 
                    src={project.image_url} 
                    alt={`Image for ${project.title}`} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none opacity-20"></div>
            </div>
        );
    }

    // Fallback: Generate a consistent gradient based on the project ID
    const hash = project.id.charCodeAt(project.id.length - 1) % 6;
    const vibrantGradients = [
        'from-blue-700 to-purple-700', 'from-red-700 to-orange-700', 
        'from-green-700 to-teal-700', 'from-yellow-700 to-pink-700', 
        'from-indigo-700 to-cyan-700', 'from-fuchsia-700 to-rose-700'
    ];
    const gradient = vibrantGradients[hash];

    return (
        // Height is derived from the className prop passed by FullCardContent (h-64)
        <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-lg mb-4 border border-white/10`}>
            {/* Using Code icon as a placeholder for the "project image" area */}
            <Code className="w-1/4 h-1/4 text-white/80 opacity-70" /> 
            <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none opacity-20"></div>
        </div>
    );
};

// --- Full Card Content (Now the primary content for both views) ---
const FullCardContent = ({ project }) => {
    const isOverdue = project.status === 'Overdue';
    const isCompleted = project.completion_percentage === 100;
    const statusBg = isOverdue ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-blue-600';
    const statusText = isOverdue ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-blue-400';
    const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : 'ACTIVE SPRINT';

    const tags = [
        { label: project.role || 'Contributor', icon: Briefcase, color: 'text-purple-400' },
        { label: project.metadata_label || 'Project Scope', icon: Layers, color: 'text-cyan-400' },
    ].filter(tag => tag.label);

    return (
        <div className="flex flex-col h-full w-full bg-gray-900/95 rounded-xl shadow-2xl overflow-hidden p-6 relative">
            
            {/* Status Tag */}
            <div className={`absolute top-0 right-0 p-2 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-lg shadow-current/30`}>
                {statusLabel}
            </div>

            {/* NEW IMAGE SPACE: Increased to h-64 (256px) to match the larger card height */}
            <MediaPlaceholder project={project} className="h-64" />

            <div className="flex-grow text-white mb-4">
                <h3 className="text-2xl font-extrabold text-white line-clamp-2 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-700/50 space-y-3">
                {/* Tags Section (Minimal tags) */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-800/80 px-3 py-1 rounded-full border border-current/30`}>
                            <tag.icon className="w-3 h-3 mr-1" />
                            {tag.label}
                        </div>
                    ))}
                </div>

                {/* Progress/Publisher */}
                <div className="flex justify-between items-center text-sm font-mono text-gray-300">
                    <span className="flex items-center">
                        <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
                        {project.completion_percentage}% Done
                    </span>
                    <span className="text-xs text-gray-500">{project.publisher_name}</span>
                </div>
            </div>
        </div>
    );
};

// --- The Core ProjectCard Component ---
const ProjectCard = ({ project, index, isDeckView }) => {
    const navigate = useNavigate(); 
    const slug = project.slug || project.id;

    const handleClick = () => {
        if (slug) {
            navigate(`/projects/${slug}`);
        }
    };

    // --- Deck View Logic (New Fan/Spread Style) ---
    if (isDeckView) {
        // Calculate dynamic properties for the fan spread
        const TOTAL_CARDS = 7;
        // Rotation range: -25 deg (index 0) to +25 deg (index 6)
        const rotation = (index - (TOTAL_CARDS - 1) / 2) * 8.3; 
        
        // Horizontal spread - Using the requested multiplier (10) for maximum gap
        const xOffset = rotation * 10; 
        
        const zIndex = 100 + index; 

        // Generate a base color for the card background
        const hash = project.id.charCodeAt(project.id.length - 1) % 6;
        const baseColors = [
            'bg-blue-600', 'bg-red-600', 'bg-green-600', 
            'bg-yellow-600', 'bg-indigo-600', 'bg-fuchsia-600'
        ];
        const baseBg = baseColors[hash];


        return (
            <motion.div
                // FIXED & INCREASED CARD SIZE: w-80 h-[30rem] (480px)
                className="absolute w-80 h-[30rem] cursor-pointer" 
                key={`${project.id}-${index}`} 
                onClick={handleClick}
                
                // Set the rotation origin to the bottom center for the fan effect
                style={{ 
                    transformOrigin: 'bottom center',
                    perspective: 1000, 
                }}
                
                // Initial positioning (Fan state)
                initial={{ 
                    opacity: 0, 
                    rotate: rotation, 
                    x: xOffset, 
                    y: 0, 
                    zIndex: zIndex 
                }}
                
                // Fan animation (Entry transition)
                animate={{ 
                    opacity: 1, 
                    rotate: rotation, 
                    x: xOffset, 
                    y: 0, 
                    zIndex: zIndex,
                    transition: { 
                        type: 'spring', 
                        stiffness: 50, 
                        damping: 10, 
                        delay: index * 0.05 
                    }
                }}

                // Smoother Hover Effect - Subtle lift and 3D rotation
                whileHover={{ 
                    rotate: rotation, 
                    y: -20, // Subtle lift
                    rotateY: rotation > 0 ? -5 : 5, // Subtle 3D tilt
                    scale: 1.05, 
                    zIndex: 200, 
                    boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.6)", 
                    transition: { type: 'spring', stiffness: 200, damping: 20 }
                }}
            >
                {/* Full Card Content Container */}
                <div 
                    className={`w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative ${baseBg}`}
                >
                    <FullCardContent project={project} />
                </div>
            </motion.div>
        );
    }
    
    // --- Grid View Logic (Updated dimensions for consistency) ---
    return (
        <motion.div
            className="w-full h-full mb-8 break-inside-avoid-column cursor-pointer"
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(100, 100, 255, 0.4)", 
                transition: { duration: 0.2 }
            }}
        >
            {/* The FullCardContent will automatically adjust to the size of its parent grid element */}
            <FullCardContent project={project} /> 
        </motion.div>
    );
};

export default ProjectCard;