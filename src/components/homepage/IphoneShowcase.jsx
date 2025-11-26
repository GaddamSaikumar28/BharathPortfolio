// // components/homepage/IphoneShowcase.jsx
// import React from 'react';

// const IphoneShowcase = () => {
//   // Dummy images - replace these src URLs with your actual screenshots later
//   const screens = [
//     { id: 1, src: "https://placehold.co/1179x2556/1a1a1a/white?text=Screen+1", alt: "App Screen 1" },
//     { id: 2, src: "https://placehold.co/1179x2556/1a1a1a/white?text=Screen+2", alt: "App Screen 2" },
//     { id: 3, src: "https://placehold.co/1179x2556/1a1a1a/white?text=Screen+3", alt: "App Screen 3" },
//     { id: 4, src: "https://placehold.co/1179x2556/1a1a1a/white?text=Screen+4", alt: "App Screen 4" },
//   ];

//   return (
//     <section className="py-20 bg-gray-50 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-12 text-center">
//           <h2 className="text-3xl font-bold text-gray-900">Mobile Experience</h2>
//           {/* <p className="mt-4 text-gray-600">Optimized for iPhone 16 Pro Max</p> */}
//         </div>

//         {/* Grid Container: 1 col on mobile, 2 on tablet, 4 on desktop */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
//           {screens.map((screen) => (
//             <div key={screen.id} className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[3rem] h-[600px] w-[300px] shadow-xl flex flex-col justify-center items-center overflow-hidden">
//               {/* Dynamic Island Placeholder (Optional Detail) */}
//               <div className="absolute top-0 w-32 h-7 bg-black rounded-b-2xl z-20"></div>
              
//               {/* Screen Image */}
//               <div className="h-[572px] w-[272px] bg-white rounded-[2rem] overflow-hidden relative">
//                  <img 
//                    src={screen.src} 
//                    alt={screen.alt} 
//                    className="w-full h-full object-cover"
//                  />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default IphoneShowcase;
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchIphoneShowcaseItems } from '../../api/iphoneShowcaseapi'; // Adjust path if needed
import { getStorageUrl } from '../../hooks/useHomepageData'; // Adjust path if needed

// --- SUB-COMPONENT: PURE CSS IPHONE 16 PRO MAX ---
// This creates a realistic device frame without needing heavy image assets
const Iphone16ProMax = ({ src, alt, title }) => (
  <div className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] rounded-[3rem] h-[600px] w-[290px] shadow-2xl flex flex-col justify-center items-center select-none overflow-hidden z-10 transition-shadow duration-300 hover:shadow-blue-900/20 group">
    
    {/* Titanium Frame Effect (Outer Glow) */}
    <div className="absolute inset-0 rounded-[2.5rem] border-[1px] border-gray-700/50 pointer-events-none z-20"></div>
    
    {/* Dynamic Island */}
    <div className="absolute top-3 w-[90px] h-[28px] bg-black rounded-full z-30 transition-all duration-300 group-hover:w-[100px] group-hover:h-[30px]"></div>

    {/* Side Buttons (CSS only) */}
    <div className="absolute top-24 -left-[10px] w-[3px] h-8 bg-gray-700 rounded-l-md"></div>
    <div className="absolute top-36 -left-[10px] w-[3px] h-14 bg-gray-700 rounded-l-md"></div>
    <div className="absolute top-24 -right-[10px] w-[3px] h-20 bg-gray-700 rounded-r-md"></div>

    {/* Screen Content */}
    <div className="h-full w-full bg-black rounded-[2.5rem] overflow-hidden relative border-[4px] border-black">
      {src ? (
        <img
          src={src}
          alt={alt || 'App Screen'}
          className="w-full h-full object-cover"
          draggable="false" 
        />
      ) : (
        // Elegant Fallback for Dummy Data
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-gray-500 font-medium tracking-widest text-xs uppercase mb-2">
            No Image
          </span>
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <p className="text-gray-400 text-sm mt-2">Upload via Admin</p>
        </div>
      )}
      
      {/* Screen Glare/Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const IphoneShowcase = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  // Framer Motion constraints
  const [constraintLeft, setConstraintLeft] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchIphoneShowcaseItems();
      setItems(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Update drag constraints based on window width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Calculate how far we can drag left (total width - viewport width)
        const scrollWidth = containerRef.current.scrollWidth;
        const offsetWidth = containerRef.current.offsetWidth;
        setConstraintLeft(-(scrollWidth - offsetWidth + 100)); // +100 for padding
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    // Slight delay to ensure DOM is painted
    setTimeout(handleResize, 500); 
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Calculate generic URL for fallback if no media_assets link
  const getImageUrl = (item) => {
    if (item.media_assets) {
      return getStorageUrl(item.media_assets);
    }
    // Fallback logic handled inside Iphone16ProMax component
    return null; 
  };

  return (
    <section className="py-24 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Mobile Experience
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Optimized for the latest devices. Swipe to explore our interface designs.
          </p>
        </div>
        
        {/* Desktop Visual Hints */}
        <div className="hidden md:flex gap-2 items-center text-sm font-medium text-gray-400">
          <ChevronLeft className="w-4 h-4" />
          <span>Drag to explore</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* CAROUSEL TRACK 
        We use motion.div with drag="x" to create the slider.
      */}
      <div 
        ref={containerRef} 
        className="w-full cursor-grab active:cursor-grabbing pl-4 sm:pl-8 lg:pl-16 pb-20 pt-10"
      >
        <motion.div
          className="flex gap-8 sm:gap-12"
          drag="x"
          dragConstraints={{ right: 0, left: constraintLeft }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative shrink-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Iphone16ProMax 
                src={getImageUrl(item)} 
                title={item.title}
                alt={item.title} 
              />
              
              {/* Optional Caption below phone */}
              <div className="mt-8 text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IphoneShowcase;