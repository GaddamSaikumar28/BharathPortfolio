// import React from 'react';
// import { motion } from 'framer-motion';
// import { Loader2 } from 'lucide-react';
// import {
//   fetchAboutHero,
//   fetchAboutHeroStats,
// } from '../../api/aboutpage';
// import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
// import AnimatedTextWord from '../common/AnimatedTextWord';

// const AboutHero = () => {
//   const { data: hero, loading: loadingHero } = useHomepageData(
//     fetchAboutHero,
//     'about_hero',
//     { additionalTables: ['media_assets'] }
//   );
//   const { data: stats, loading: loadingStats } = useHomepageData(
//     fetchAboutHeroStats,
//     'about_hero_stats'
//   );

//   if (loadingHero || loadingStats) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   if (!hero) return null;

//   const imageUrl = getStorageUrl(hero.media_id);

//   const containerVariants = {
//     visible: { transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: 'spring', stiffness: 100 },
//     },
//   };

//   return (
//     <div className="relative bg-gray-50 pt-32 pb-24">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Text Content */}
//           <div className="text-left">
//             <motion.p
//               className="text-sm font-bold text-blue-600 uppercase"
//               variants={itemVariants}
//             >
//               {hero.subtitle}
//             </motion.p>
            
//             {/* Use the AnimatedTextWord component here */}
//             <AnimatedTextWord
//               text={hero.title}
//               el="h1"
//               className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-6"
//             />
            
//             <motion.p
//               className="text-lg text-gray-600 max-w-xl"
//               variants={itemVariants}
//             >
//               {hero.description}
//             </motion.p>

//             {/* Stats */}
//             {stats && stats.length > 0 && (
//               <motion.div
//                 className="flex space-x-8 mt-10"
//                 variants={containerVariants}
//               >
//                 {stats.map((stat) => (
//                   <motion.div key={stat.id} variants={itemVariants}>
//                     <p className="text-4xl font-bold text-blue-600">
//                       {stat.value}
//                     </p>
//                     <p className="text-sm text-gray-500">{stat.label}</p>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}
//           </div>

//           {/* Image */}
//           {imageUrl && (
//             <motion.div
//               className="flex justify-center"
//               variants={itemVariants}
//             >
//               <img
//                 src={imageUrl}
//                 alt={hero.media_id?.alt_text || 'About Me'}
//                 className="rounded-3xl shadow-2xl w-full max-w-md object-cover aspect-[4/5]"
//               />
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AboutHero;



import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  fetchAboutHero,
  fetchAboutHeroStats,
} from '../../api/aboutpage';
import { useHomepageData} from '../../hooks/useHomepageData';
import { getStorageUrl } from '../../hooks/useHomepageData';
import AnimatedTextWord from '../common/AnimatedTextWord';

const AboutHero = () => {
  const { data: hero, loading: loadingHero } = useHomepageData(
    fetchAboutHero,
    'about_hero',
    { additionalTables: ['media_assets'] }
  );
  const { data: stats, loading: loadingStats } = useHomepageData(
    fetchAboutHeroStats,
    'about_hero_stats'
  );

  if (loadingHero || loadingStats) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }


  if (!hero) return null;
  console.log('in the about hero page');
  console.log(hero.media_assets.file_path);
  // this is the id of the media_assets table we need to retive the file path from that table where id is hero.media_id and then we need to form the string in such a way that https://qxjzhtugsgpyvwhcomhi.supabase.co/storage/v1/object/public/media/public/1762666820194-Screenshot-2025-11-01-at-9.34.19-AM.png. 1762666820194-Screenshot-2025-11-01-at-9.34.19-AM.png is the file path. correct this, write a new getstorage url function here itself
  const imageUrl = getStorageUrl('public/'+hero.media_assets.file_path);
  const containerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    // Added overflow-hidden to contain the animations
    <div className="relative bg-gray-50 pt-32 pb-24 overflow-hidden"> 
      
      {/* --- RE-ADDED ANIMATIONS --- */}
      {/* These are the "round" floating animations you requested */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-50 blur-lg"
        animate={{ scale: [1, 1.1, 1], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-lg"
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* --- END OF RE-ADDED ANIMATIONS --- */}
      
      {/* Added relative z-10 to ensure content is above animations */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="text-left">
            <motion.p
              className="text-sm font-bold text-blue-600 uppercase"
              variants={itemVariants}
            >
              {hero.subtitle}
            </motion.p>
            
            {/* The word-by-word animation */}
            <AnimatedTextWord
              text={hero.title}
              el="h1"
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-6"
            />
            
            <motion.p
              className="text-lg text-gray-600 max-w-xl"
              variants={itemVariants}
            >
              {hero.description}
            </motion.p>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                className="flex space-x-8 mt-10"
                variants={containerVariants}
              >
                {stats.map((stat) => (
                  <motion.div key={stat.id} variants={itemVariants}>
                    <p className="text-4xl font-bold text-blue-600">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Image */}
          {imageUrl && (
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <img
                src={imageUrl}
                alt={hero.media_id?.alt_text || 'About Me'}
                className="rounded-3xl shadow-2xl w-full max-w-md object-cover aspect-[4/5]"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutHero;