
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   motion, 
//   AnimatePresence, 
//   useScroll, 
//   useTransform,
//   useInView,
//   wrap
// } from 'framer-motion';
// import { 
//   Check, 
//   Lightbulb, 
//   Briefcase, 
//   Settings, 
//   Users, 
//   ChevronLeft, 
//   ChevronRight, 
//   Star,
//   Twitter,
//   Linkedin,
//   Instagram,
//   ArrowRight,
//   TrendingUp,
//   PieChart,
//   DownloadCloud,
//   ChevronDown,
//   Zap,
//   Database,
//   BarChart, 
//   UserCheck,
//   Package,
//   Palette,
//   LayoutGrid,
//   DraftingCompass,
//   PenTool,
//   Camera,
//   Clapperboard,
//   Box,
//   View
// } from 'lucide-react';

// const AnimateOnScroll = ({ children, delay = 0, className = "" }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   const variants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { type: 'spring', stiffness: 100, damping: 10, delay }
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       className={className}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={variants}
//     >
//       {children}
//     </motion.div>
//   );
// };


// // --- Header ---

// const Header = () => {
//   const { scrollYProgress } = useScroll();

//   const headerBg = useTransform(
//     scrollYProgress,
//     [0, 0.05],
//     ['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.9)']
//   );
//   const headerShadow = useTransform(
//     scrollYProgress,
//     [0, 0.05],
//     ['0px 0px 0px 0px rgba(0, 0, 0, 0)', '0px 4px 6px -1px rgba(0, 0, 0, 0.1)'],
//   );

//   return (
//     <motion.header
//       style={{
//         backgroundColor: headerBg,
//         boxShadow: headerShadow,
//       }}
//       className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <a href="#" className="text-2xl font-bold text-gray-900">
//               Gaddam B. Kumar
//             </a>
//           </div>
//           <nav className="hidden md:flex md:space-x-8">
//             <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Portfolio</a>
//             <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Projects</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
//           </nav>
//           <div className="flex items-center">
//             <motion.a
//               href="#"
//               className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Contact Me
//             </motion.a>
//           </div>
//         </div>
//       </div>
//     </motion.header>
//   );
// };

// // --- Hero Section (Variant 1) ---

// const HeroVariant1 = () => {
//   const icons = [
//     { icon: Palette, name: 'Branding', pos: { top: '10%', left: '15%' } },
//     { icon: Zap, name: 'Motion', pos: { top: '30%', left: '80%' } },
//     { icon: LayoutGrid, name: 'UI/UX', pos: { top: '70%', left: '10%' } },
//     { icon: Lightbulb, name: 'Strategy', pos: { top: '80%', left: '75%' } },
//   ];

//   const lineVariants = {
//     hidden: { pathLength: 0, opacity: 0 },
//     visible: (i) => ({
//       pathLength: 1,
//       opacity: 1,
//       transition: {
//         pathLength: { delay: i * 0.2 + 0.5, type: 'spring', duration: 1.5, bounce: 0 },
//         opacity: { delay: i * 0.2 + 0.5, duration: 0.01 },
//       },
//     }),
//   };

//   const iconVariants = {
//     hidden: { opacity: 0, scale: 0.5 },
//     visible: (i) => ({
//       opacity: 1,
//       scale: 1,
//       transition: { type: 'spring', delay: i * 0.2 + 0.5 },
//     }),
//   };

//   const textVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { type: 'spring', delay: i * 0.1 },
//     }),
//   };

//   return (
//     <motion.div
//       key="hero1"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center overflow-hidden"
//     >
//       <motion.h1
//         className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900"
//         custom={0}
//         initial="hidden"
//         animate="visible"
//         variants={textVariants}
//       >
//         Gaddam Bharath Kumar
//       </motion.h1>
//       <motion.h2
//         className="text-3xl md:text-5xl font-semibold text-blue-600 mt-2"
//         custom={1}
//         initial="hidden"
//         animate="visible"
//         variants={textVariants}
//       >
//         Creative Graphic Designer
//       </motion.h2>
//       <motion.p
//         className="mt-6 max-w-2xl mx-auto text-lg text-gray-600"
//         custom={2}
//         initial="hidden"
//         animate="visible"
//         variants={textVariants}
//       >
//         Transforming ideas into stunning visuals. Specializing in branding, UI/UX,
//         and motion graphics that captivate and convert.
//       </motion.p>
//       <motion.div
//         className="mt-10"
//         custom={3}
//         initial="hidden"
//         animate="visible"
//         variants={textVariants}
//       >
//         <motion.a
//           href="#"
//           className="bg-blue-600 text-white px-8 py-3.5 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700"
//           whileHover={{ scale: 1.05, y: -2 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           View My Work
//         </motion.a>
//       </motion.div>

//       {/* Animated Icons and Lines */}
//       <div className="absolute inset-0 -z-10">
//         <svg className="absolute inset-0 w-full h-full" stroke="rgb(229 231 235 / 0.5)">
//           <motion.line x1="15%" y1="10%" x2="80%" y2="30%" variants={lineVariants} initial="hidden" animate="visible" custom={1} />
//           <motion.line x1="80%" y1="30%" x2="75%" y2="80%" variants={lineVariants} initial="hidden" animate="visible" custom={2} />
//           <motion.line x1="75%" y1="80%" x2="10%" y2="70%" variants={lineVariants} initial="hidden" animate="visible" custom={3} />
//           <motion.line x1="10%" y1="70%" x2="15%" y2="10%" variants={lineVariants} initial="hidden" animate="visible" custom={4} />
//         </svg>

//         {icons.map((icon, i) => (
//           <motion.div
//             key={i}
//             className="absolute p-3 bg-white rounded-full shadow-xl"
//             style={{ top: icon.pos.top, left: icon.pos.left }}
//             variants={iconVariants}
//             initial="hidden"
//             animate="visible"
//             custom={i}
//           >
//             <icon.icon className="w-6 h-6 text-blue-600" />
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // --- Hero Section (Variant 2) ---

// const HeroVariant2 = () => {
//   const photos = [
//     { src: 'https://placehold.co/400x400/93C5FD/1E3A8A?text=Design+1', alt: 'Design 1', rotation: -3, delay: 0 },
//     { src: 'https://placehold.co/400x400/A5B4FC/312E81?text=Design+2', alt: 'Design 2', rotation: 2, delay: 0.5 },
//     { src: 'https://placehold.co/400x400/FDBA74/7C2D12?text=Design+3', alt: 'Design 3', rotation: -1, delay: 0.2 },
//     { src: 'https://placehold.co/400x400/BEF264/365314?text=Design+4', alt: 'Design 4', rotation: 4, delay: 0.7 },
//     { src: 'https://placehold.co/400x400/F9A8D4/831843?text=Design+5', alt: 'Design 5', rotation: -2, delay: 0.3 },
//     { src: 'https://placehold.co/400x400/6EE7B7/064E3B?text=Design+6', alt: 'Design 6', rotation: 1, delay: 0.6 },
//   ];

//   const gridVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const photoVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { type: 'spring', stiffness: 100 },
//     },
//   };
  
//   const textVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { type: 'spring', delay: i * 0.1 },
//     }),
//   };

//   return (
//     <motion.div
//       key="hero2"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//         <div className="text-center md:text-left">
//           <motion.h1
//             className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900"
//             custom={0} initial="hidden" animate="visible" variants={textVariants}
//           >
//             Design That
//             <br />
//             <span className="text-blue-600">Speaks Volumes</span>
//           </motion.h1>
//           <motion.p
//             className="mt-6 max-w-xl mx-auto md:mx-0 text-lg text-gray-600"
//             custom={1} initial="hidden" animate="visible" variants={textVariants}
//           >
//             Explore a collection of projects that showcase passion, creativity,
//             and a keen eye for detail.
//           </motion.p>
//           <motion.div
//             className="mt-10"
//             custom={2} initial="hidden" animate="visible" variants={textVariants}
//           >
//             <motion.a
//               href="#"
//               className="bg-gray-900 text-white px-8 py-3.5 rounded-lg text-lg font-medium shadow-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               See Full Portfolio
//             </motion.a>
//           </motion.div>
//         </div>
//         <motion.div
//           className="grid grid-cols-2 sm:grid-cols-3 gap-4"
//           variants={gridVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {photos.map((photo, i) => (
//             <motion.div
//               key={i}
//               className="relative"
//               variants={photoVariants}
//               style={{ rotate: photo.rotation }}
//               // Infinite floating animation
//               animate={{ y: [0, -10, 0] }}
//               transition={{
//                 duration: 2 + photo.delay * 2,
//                 repeat: Infinity,
//                 ease: 'easeInOut',
//                 delay: photo.delay,
//               }}
//             >
//               <img
//                 src={photo.src}
//                 alt={photo.alt}
//                 className="rounded-xl shadow-2xl w-full h-full object-cover"
//               />
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// // --- Hero Container (Cycles) ---

// const Hero = () => {
//   const [heroIndex, setHeroIndex] = useState(0);
//   const heroes = [HeroVariant1, HeroVariant2];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setHeroIndex((prev) => (prev + 1) % heroes.length);
//     }, 5000); // Switch every 5 seconds
//     return () => clearTimeout(timer);
//   }, [heroIndex, heroes.length]);

//   const CurrentHero = heroes[heroIndex];

//   return (
//     <section className="relative pt-16 bg-gray-50 overflow-hidden">
//       <AnimatePresence mode="wait">
//         <CurrentHero key={heroIndex} />
//       </AnimatePresence>
//     </section>
//   );
// };

// // --- Logo Cloud ---

// const LogoCloud = () => {
//   const logos = [
//     "Google", "Slack", "Jira", "Trello", "Asana", "Figma", "Microsoft"
//   ];
  
//   // Duplicate logos for seamless looping
//   const allLogos = [...logos, ...logos];

//   return (
//     <div className="py-16 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-center text-sm font-semibold text-gray-600 tracking-wider uppercase">
//           Brands I've Collaborated With
//         </h2>
//         <div className="mt-8 relative w-full overflow-hidden">
//           <motion.div
//             className="flex"
//             animate={{ x: '-100%' }}
//             transition={{
//               ease: 'linear',
//               duration: 25,
//               repeat: Infinity,
//               repeatType: 'loop',
//             }}
//           >
//             {allLogos.map((logo, i) => (
//               <div key={i} className="flex-shrink-0 w-64 h-12 flex items-center justify-center text-gray-500">
//                 <span className="text-xl font-bold text-gray-500">{logo}</span>
//               </div>
//             ))}
//           </motion.div>
//           <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
//           <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Built For Everyone (Services) ---

// const BuiltForEveryone = () => {
//   const features = [
//     {
//       icon: Palette,
//       title: "Brand Identity",
//       description: "From logos to complete brand guidelines, I craft visual identities that resonate with your audience.",
//     },
//     {
//       icon: LayoutGrid,
//       title: "UI/UX Design",
//       description: "Crafting intuitive and beautiful user interfaces for web and mobile applications.",
//     },
//     {
//       icon: Zap,
//       title: "Motion Graphics",
//       description: "Engaging 2D and 3D animations for ads, explainers, and social media content.",
//     },
//     {
//       icon: Package,
//       title: "Packaging Design",
//       description: "Creating memorable and effective packaging that stands out on the shelf.",
//     },
//   ];

//   const gridVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };
  
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50, scale: 0.9 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: 'spring', stiffness: 100, damping: 12, delay: i * 0.1 },
//     }),
//   };

//   return (
//     <section className="py-24 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center">
//           <h2 className="text-base font-semibold leading-7 text-blue-600">My Design Services</h2>
//           <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             A Versatile Skill Set
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             I offer a comprehensive suite of design services to cover all your creative needs, ensuring consistency and quality across every touchpoint.
//           </p>
//         </AnimateOnScroll>

//         <motion.div
//           className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={gridVariants}
//         >
//           {features.map((feature, i) => (
//             <motion.div
//               key={feature.title}
//               custom={i}
//               variants={cardVariants}
//               whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
//               className="bg-white p-8 rounded-2xl shadow-lg"
//             >
//               <feature.icon className="h-10 w-10 text-blue-600" />
//               <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
//               <p className="mt-4 text-gray-600">{feature.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };


// // --- Feature Showcase (Sticky Project) ---

// const FeatureShowcase = () => {
//   const [activeFeature, setActiveFeature] = useState(0);
//   const featureRefs = useRef([]);

//   const features = [
//     {
//       title: "1. The Challenge",
//       description: "Aura, a wellness startup, had a brand identity that felt dated and failed to connect with its target Millennial and Gen-Z audience. They needed a complete refresh.",
//       image: "https://placehold.co/600x600/E0F2FE/0C4A6E?text=Challenge",
//     },
//     {
//       title: "2. The Strategy",
//       description: "We focused on a clean, organic, and uplifting visual language. The strategy involved market research, mood boarding, and developing a unique brand voice.",
//       image: "https://placehold.co/600x600/D1FAE5/064E3B?text=Strategy",
//     },
//     {
//       title: "3. The Visuals",
//       description: "A new logo, custom typography, and a nature-inspired color palette were developed. This extended to app UI, marketing materials, and social media templates.",
//       image: "https://placehold.co/600x600/FEF3C7/78350F?text=Visuals",
//     },
//     {
//       title: "4. The Result",
//       description: "The rebrand led to a 40% increase in user engagement and was featured in several design publications, establishing Aura as a modern, trustworthy brand.",
//       image: "https://placehold.co/600x600/E5E0FF/312E81?text=Result",
//     },
//   ];
  
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = featureRefs.current.indexOf(entry.target);
//             // Check if element is in the top 50% of the viewport
//             if (entry.boundingClientRect.top < window.innerHeight / 2) {
//               setActiveFeature(index);
//             }
//           }
//         });
//       },
//       {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.3, // Trigger when 30% visible
//       }
//     );

//     featureRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => {
//       featureRefs.current.forEach((ref) => {
//         if (ref) observer.unobserve(ref);
//       });
//     };
//   }, []);

//   return (
//     <section className="py-24 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-16">
//           <h2 className="text-base font-semibold leading-7 text-blue-600">Featured Project</h2>
//           <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             Rebrand for 'Aura' Wellness
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             A deep dive into the process of rebranding a modern wellness app, from initial concept to final launch.
//           </p>
//         </AnimateOnScroll>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//           <div className="sticky top-24 h-[600px] self-start">
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={activeFeature}
//                 src={features[activeFeature].image}
//                 alt={features[activeFeature].title}
//                 initial={{ opacity: 0, scale: 1.05 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className="w-full h-full object-cover rounded-2xl shadow-xl"
//               />
//             </AnimatePresence>
//           </div>

//           <div className="space-y-16">
//             {features.map((feature, index) => (
//               <AnimateOnScroll 
//                 key={index} 
//                 delay={index * 0.1}
//                 className="min-h-[300px]" // Ensure items are tall enough to trigger scroll
//               >
//                 <div 
//                   ref={(el) => (featureRefs.current[index] = el)}
//                   className={`p-8 rounded-2xl transition-all duration-300 ${activeFeature === index ? 'bg-gray-50 shadow-lg' : ''}`}
//                 >
//                   <h3 className="text-2xl font-semibold text-blue-600">{feature.title}</h3>
//                   <p className="mt-4 text-lg text-gray-600">{feature.description}</p>
//                 </div>
//               </AnimateOnScroll>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// // --- Team Showcase (My Process) ---

// const TeamShowcase = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   const photos = [
//     { src: 'https://placehold.co/400x400/FEF9C3/713F12?text=Sketch', alt: 'Sketching', rotation: -2, delay: 0 },
//     { src: 'https://placehold.co/400x400/F3E8FF/581C87?text=Moodboard', alt: 'Moodboard', rotation: 3, delay: 0.5 },
//     { src: 'https://placehold.co/400x400/E0F2FE/0C4A6E?text=Wireframe', alt: 'Wireframe', rotation: -1, delay: 0.2 },
//     { src: 'https://placehold.co/400x400/FFE4E6/881337?text=Feedback', alt: 'Feedback', rotation: 4, delay: 0.7 },
//     { src: 'https://placehold.co/400x400/F0FDF4/14532D?text=Prototype', alt: 'Prototyping', rotation: -3, delay: 0.3 },
//     { src: 'https://placehold.co/400x400/E5E7EB/1F2937?text=Presentation', alt: 'Presentation', rotation: 2, delay: 0.6 },
//   ];
  
//   const gridVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const photoVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { type: 'spring', stiffness: 100 },
//     },
//   };
  
//   const textVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { type: 'spring', delay: i * 0.1 },
//     }),
//   };

//   return (
//     <section ref={ref} className="py-24 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//           <motion.div
//             className="grid grid-cols-2 sm:grid-cols-3 gap-4"
//             variants={gridVariants}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//           >
//             {photos.map((photo, i) => (
//               <motion.div
//                 key={i}
//                 className="relative"
//                 variants={photoVariants}
//                 style={{ rotate: photo.rotation }}
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{
//                   duration: 2 + photo.delay * 2,
//                   repeat: Infinity,
//                   ease: 'easeInOut',
//                   delay: photo.delay,
//                 }}
//               >
//                 <img
//                   src={photo.src}
//                   alt={photo.alt}
//                   className="rounded-xl shadow-2xl w-full h-full object-cover"
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//           <div className="text-center md:text-left">
//             <motion.h2
//               className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
//               custom={0} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={textVariants}
//             >
//               Explore My <span className="text-blue-600">Process</span>
//             </motion.h2>
//             <motion.p
//               className="mt-6 text-lg text-gray-600"
//               custom={1} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={textVariants}
//             >
//               I believe in a collaborative and transparent workflow. I'll partner with you from the initial sketch to the final pixel, ensuring your vision is brought to life.
//             </motion.p>
//             <motion.div
//               className="mt-10"
//               custom={2} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={textVariants}
//             >
//               <motion.a
//                 href="#"
//                 className="text-blue-600 font-medium inline-flex items-center group"
//                 whileHover="hover"
//               >
//                 Learn More About Me
//                 <motion.span
//                   className="ml-2"
//                   variants={{ hover: { x: 5 } }}
//                   transition={{ type: 'spring', stiffness: 300 }}
//                 >
//                   <ArrowRight className="w-5 h-5" />
//                 </motion.span>
//               </motion.a>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// // --- All Employee Data (Parallax Project Card) ---

// const AllEmployeeData = () => {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"], // Track from start-of-section at end-of-viewport
//   });

//   // Animate card as it passes through the middle of the viewport
//   const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);
//   const y = useTransform(scrollYProgress, [0.1, 0.5], [100, 0]);
//   const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  
//   return (
//     <section ref={sectionRef} className="py-24 bg-white relative h-[120vh]">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center sticky top-24">
//         <AnimateOnScroll className="max-w-3xl mx-auto">
//           <h2 className="text-base font-semibold leading-7 text-blue-600">Project Showcase</h2>
//           <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             'Nexa' UI/UX Redesign
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             A complete overhaul of a B2B SaaS dashboard, focusing on usability, clarity, and a modern aesthetic.
//           </p>
//         </AnimateOnScroll>

//         <motion.div
//           style={{ scale, y, opacity }}
//           className="mt-16 max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             <div className="md:col-span-1 p-8 bg-gray-50 flex flex-col items-center justify-center">
//               <img
//                 className="w-32 h-32 rounded-full shadow-lg object-cover"
//                 src="https://placehold.co/300x300/DBEAFE/1E40AF?text=Nexa"
//                 alt="Nexa Project"
//               />
//               <h3 className="mt-4 text-xl font-semibold text-gray-900">Nexa SaaS Dashboard</h3>
//               <p className="mt-1 text-sm text-gray-500">UI/UX & Prototyping</p>
//               <motion.a
//                 href="#"
//                 className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 View Case Study
//               </motion.a>
//             </div>
//             <div className="md:col-span-2 p-8">
//               <h4 className="text-lg font-semibold text-gray-900 text-left">Project Highlights</h4>
//               <div className="mt-6 grid grid-cols-2 gap-8">
//                 <div className="text-left">
//                   <PieChart className="w-8 h-8 text-blue-600" />
//                   <h5 className="mt-2 text-sm text-gray-500">Project Duration</h5>
//                   <p className="text-2xl font-bold text-gray-900">8 Weeks</p>
//                 </div>
//                 <div className="text-left">
//                   <UserCheck className="w-8 h-8 text-blue-600" />
//                   <h5 className="mt-2 text-sm text-gray-500">My Role</h5>
//                   <p className="text-2xl font-bold text-gray-900">Lead Designer</p>
//                 </div>
//                 <div className="text-left">
//                   <TrendingUp className="w-8 h-8 text-blue-600" />
//                   <h5 className="mt-2 text-sm text-gray-500">User Satisfaction</h5>
//                   <p className="text-2xl font-bold text-gray-900">+25%</p>
//                 </div>
//                 <div className="text-left">
//                   <DownloadCloud className="w-8 h-8 text-blue-600" />
//                   <h5 className="mt-2 text-sm text-gray-500">Deliverables</h5>
//                   <p className="text-2xl font-bold text-gray-900">Figma, Prototype</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // --- *** TOOLKIT SECTION (Restored & Upgraded) *** ---

// const RotatingIntegrations = () => {
//   const [hovered, setHovered] = useState(null);

//   // Scalable tools list
//   const tools = [
//     { name: "Figma", Icon: DraftingCompass, color: "text-pink-500" },
//     { name: "Adobe Illustrator", Icon: PenTool, color: "text-orange-500" },
//     { name: "Adobe Photoshop", Icon: Camera, color: "text-blue-500" },
//     { name: "Adobe After Effects", Icon: Clapperboard, color: "text-purple-500" },
//     { name: "Cinema 4D", Icon: Box, color: "text-gray-500" },
//     { name: "Spline", Icon: View, color: "text-blue-300" },
//     // Add more tools here...
//     // { name: "Webflow", Icon: Globe, color: "text-blue-600" },
//     // { name: "Procreate", Icon: Paintbrush, color: "text-green-400" },
//   ];

//   const radius = 200; // Radius of the semi-circle
//   const numIcons = tools.length;
//   const arcAngle = 180; // 180 degrees for a semi-circle
//   const startAngle = -90 - (arcAngle / 2); // Start from the top and go down

//   return (
//     <section className="py-24 bg-gray-900 text-white overflow-hidden">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center">
//           <h2 className="text-base font-semibold leading-7 text-blue-400">My Creative Toolkit</h2>
//           <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
//             Proficient in Industry-Standard Software
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-300">
//             I use the best tools for the job, ensuring high-quality results and an efficient workflow from concept to final delivery.
//           </p>
//         </AnimateOnScroll>
        
//         <div className="mt-20 h-96 flex items-center justify-center relative">
//           <motion.div
//             className="absolute w-1 h-1"
//             animate={{ rotate: 360 }} // Infinitely rotate the wheel
//             transition={{ ease: 'linear', duration: 40, repeat: Infinity, repeatType: 'loop' }}
//           >
//             {tools.map((tool, i) => {
//               // Calculate position on the semi-circle
//               // We distribute icons along the 180-degree arc
//               const angleDeg = (i / (numIcons - 1)) * arcAngle + startAngle;
//               const angleRad = (angleDeg * Math.PI) / 180;
//               const x = radius * Math.cos(angleRad);
//               const y = radius * Math.sin(angleRad);
              
//               return (
//                 <motion.div
//                   key={tool.name}
//                   className="absolute"
//                   style={{ 
//                     transform: `translate(${x}px, ${y}px)`,
//                   }}
//                   onHoverStart={() => setHovered(i)}
//                   onHoverEnd={() => setHovered(null)}
//                 >
//                   <motion.div
//                     className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
//                     animate={{ rotate: -360 }} // Counter-rotate to keep icons upright
//                     transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
//                     whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
//                   >
//                     <tool.Icon className={`w-10 h-10 ${tool.color}`} />
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
          
//           <motion.div
//             className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl"
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', delay: 0.5 }}
//           >
//             <Lightbulb className="w-12 h-12 text-white" />
//           </motion.div>

//           <AnimatePresence>
//             {hovered !== null && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="absolute bg-gray-800 text-white px-3 py-1 rounded-md text-sm shadow-lg pointer-events-none"
//                 style={{
//                   // Position tooltip near the center
//                   y: 150
//                 }}
//               >
//                 {tools[hovered].name}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// };


// // --- Testimonials ---
// // --- *** ANIMATION ADJUSTED (Horizontal Slide) *** ---

// const Testimonials = () => {
//   const testimonials = [
//     {
//       quote: "Bharath's creativity and attention to detail are unmatched. He took our rough concept and turned it into a brand identity that truly represents our values.",
//       name: "Alice Chen",
//       role: "Marketing Director, Aura",
//       avatar: "https://placehold.co/100x100/E0F2FE/0C4A6E?text=AC",
//     },
//     {
//       quote: "Working with Bharath was a dream. He's a great communicator, incredibly talented, and delivered the project ahead of schedule. We couldn't be happier.",
//       name: "David Lee",
//       role: "Founder, Nexa",
//       avatar: "https://placehold.co/100x100/E5E7EB/1F2937?text=DL",
//     },
//     {
//       quote: "The new UI/UX design has significantly improved our user engagement. Bharath has a deep understanding of user-centric design principles.",
//       name: "Sophia Rodriguez",
//       role: "Product Manager, TechCo",
//       avatar: "https://placehold.co/100x100/F3E8FF/581C87?text=SR",
//     },
//     {
//       quote: "The motion graphics for our ad campaign were stunning. They captured the energy of our brand perfectly and performed incredibly well.",
//       name: "Mike Johnson",
//       role: "CEO, Sparkly",
//       avatar: "https://placehold.co/100x100/FEF9C3/713F12?text=MJ",
//     },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [direction, setDirection] = useState(1);

//   const nextTestimonial = () => {
//     setDirection(1);
//     setActiveIndex((prev) => wrap(0, testimonials.length, prev + 1));
//   };
  
//   const prevTestimonial = () => {
//     setDirection(-1);
//     setActiveIndex((prev) => wrap(0, testimonials.length, prev - 1));
//   };

//   // Horizontal slide variants
//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? '100%' : '-100%',
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 100, damping: 20 }
//     },
//     exit: (direction) => ({
//       x: direction < 0 ? '100%' : '-100%',
//       opacity: 0,
//       transition: { duration: 0.2 }
//     }),
//   };

//   const activeTestimonial = testimonials[activeIndex];

//   return (
//     <section className="py-24 bg-white overflow-hidden">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center">
//           <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             What My Clients Say
//           </h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             Building strong, lasting partnerships is at the heart of my work.
//           </p>
//         </AnimateOnScroll>

//         <div className="mt-16 relative h-80 flex justify-center items-center max-w-2xl mx-auto">
//           <AnimatePresence initial={false} custom={direction} mode="wait">
//             <motion.div
//               key={activeIndex}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               className="absolute w-full p-8 bg-gray-50 rounded-2xl shadow-xl"
//             >
//               <div className="flex items-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
//                 ))}
//               </div>
//               <p className="text-lg text-gray-700 italic">"{activeTestimonial.quote}"</p>
//               <div className="mt-6 flex items-center">
//                 <img
//                   src={activeTestimonial.avatar}
//                   alt={activeTestimonial.name}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div className="ml-4">
//                   <p className="font-semibold text-gray-900">{activeTestimonial.name}</p>
//                   <p className="text-gray-500">{activeTestimonial.role}</p>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="flex justify-center items-center mt-8 space-x-4">
//           <motion.button
//             onClick={prevTestimonial}
//             className="p-3 bg-white rounded-full shadow-md"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-600" />
//           </motion.button>
//           <motion.button
//             onClick={nextTestimonial}
//             className="p-3 bg-white rounded-full shadow-md"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <ChevronRight className="w-6 h-6 text-gray-600" />
//           </motion.button>
//         </div>
//       </div>
//     </section>
//   );
// };


// // --- Bento Showcase (Latest Work) ---

// const BentoShowcase = () => {
//   const gridVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: 'spring', stiffness: 100 }
//     }
//   };

//   const items = [
//     {
//       title: "Zenith Motion Logo",
//       category: "Motion Graphics",
//       className: "col-span-2 row-span-2",
//       image: "https://placehold.co/800x800/1F2937/9CA3AF?text=Zenith+Motion",
//     },
//     {
//       title: "Oasis Skincare",
//       category: "Packaging",
//       className: "col-span-1 row-span-1",
//       image: "https://placehold.co/400x400/F0FDF4/166534?text=Oasis",
//     },
//     {
//       title: "Quantum Poster",
//       category: "Print Design",
//       className: "col-span-1 row-span-1",
//       image: "https://placehold.co/400x400/F3E8FF/581C87?text=Quantum",
//     },
//     {
//       title: "Nova App UI",
//       category: "UI/UX",
//       className: "col-span-1 row-span-1",
//       image: "https://placehold.co/400x400/DBEAFE/1E40AF?text=Nova+UI",
//     },
//     {
//       title: "Apex Branding",
//       category: "Brand Identity",
//       className: "col-span-1 row-span-1",
//       image: "https://placehold.co/400x400/FEF2F2/991B1B?text=Apex",
//     },
//     {
//       title: "Helios Website",
//       category: "Web Design",
//       className: "col-span-2 row-span-1",
//       image: "https://placehold.co/800x400/FEF9C3/713F12?text=Helios+Web",
//     },
//   ];

//   return (
//     <section className="py-24 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center">
//           <h2 className="text-base font-semibold leading-7 text-blue-600">Latest Work</h2>
//           <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             A Glimpse of My Portfolio
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             A curated selection of recent projects showcasing my range and expertise across different design disciplines.
//           </p>
//         </AnimateOnScroll>

//         <motion.div
//           className="mt-16 grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-6 h-[700px]"
//           variants={gridVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {items.map((item) => (
//             <motion.div
//               key={item.title}
//               variants={itemVariants}
//               whileHover={{ scale: 1.02, zIndex: 10, boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
//               className={`relative rounded-2xl shadow-lg overflow-hidden ${item.className}`}
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-6">
//                 <p className="text-sm font-medium text-blue-300">{item.category}</p>
//                 <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };


// const ResourcesSection = () => {
//   const posts = [
//     {
//       title: 'The Power of a Strong Brand Identity',
//       category: 'Branding',
//       description: 'Why investing in a solid brand strategy is the first step to success.',
//       image: 'https://placehold.co/400x300/FEF2F2/991B1B?text=Branding',
//     },
//     {
//       title: '10 UI/UX Tips for Better User Engagement',
//       category: 'UI/UX',
//       description: 'Small changes you can make to your interface to keep users hooked.',
//       image: 'https://placehold.co/400x300/DBEAFE/1E40AF?text=UI/UX',
//     },
//     {
//       title: 'My Process: From Sketch to Final Animation',
//       category: 'Motion Graphics',
//       description: 'A behind-the-scenes look at how I create a 30-second motion graphic.',
//       image: 'https://placehold.co/400x300/1F2937/9CA3AF?text=Motion',
//     },
//   ];
  
//   const cardVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } }
//   };

//   return (
//     <section className="py-24 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center">
//           <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             From My Blog: Design Insights
//           </h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             Sharing my thoughts on design, creativity, and industry trends.
//           </p>
//         </AnimateOnScroll>
        
//         <motion.div 
//           className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ staggerChildren: 0.1 }}
//         >
//           {posts.map((post) => (
//             <motion.div
//               key={post.title}
//               variants={cardVariants}
//               whileHover={{ scale: 1.03, y: -5 }}
//               className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden flex flex-col"
//             >
//               <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
//               <div className="p-6 flex-grow flex flex-col">
//                 <p className="text-sm font-semibold text-blue-600">{post.category}</p>
//                 <h3 className="mt-2 text-xl font-semibold text-gray-900">{post.title}</h3>
//                 <p className="mt-3 text-gray-600 flex-grow">{post.description}</p>
//                 <motion.a
//                   href="#"
//                   className="mt-6 text-blue-600 font-medium inline-flex items-center group"
//                   whileHover="hover"
//                 >
//                   Read more
//                   <motion.span
//                     className="ml-1"
//                     variants={{ hover: { x: 4 } }}
//                     transition={{ type: 'spring', stiffness: 300 }}
//                   >
//                     <ArrowRight className="w-5 h-5" />
//                   </motion.span>
//                 </motion.a>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // --- FAQ ---

// const FAQItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const variants = {
//     open: {
//       opacity: 1,
//       height: 'auto',
//       marginTop: '16px',
//       transition: { type: 'spring', stiffness: 300, damping: 30 }
//     },
//     collapsed: {
//       opacity: 0,
//       height: 0,
//       marginTop: '0px',
//       transition: { type: 'spring', stiffness: 300, damping: 30 }
//     }
//   };

//   return (
//     <motion.div 
//       layout // This animates the layout changes when other items open/close
//       className="border-b border-gray-200 py-6"
//     >
//       <motion.header
//         layout
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex justify-between items-center cursor-pointer"
//       >
//         <h3 className="text-lg font-medium text-gray-900">{question}</h3>
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <ChevronDown className="w-6 h-6 text-gray-400" />
//         </motion.div>
//       </motion.header>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.section
//             key="content"
//             initial="collapsed"
//             animate="open"
//             exit="collapsed"
//             variants={variants}
//             style={{ overflow: 'hidden' }}
//           >
//             <p className="text-base text-gray-600">
//               {answer}
//             </p>
//           </motion.section>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// const FAQ = () => {
//   const faqs = [
//     {
//       question: 'What is your design process like?',
//       answer: "My process is collaborative and structured. It starts with a discovery phase to understand your goals, followed by research, mood boarding, concept sketching, design refinement, and final delivery. I keep you involved at every stage.",
//     },
//     {
//       question: 'How long does a project usually take?',
//       answer: "Project timelines vary depending on the scope. A simple logo might take 1-2 weeks, while a full brand identity or UI/UX project can take 4-8 weeks or more. I'll provide a detailed timeline after our initial consultation.",
//     },
//     {
//       question: 'What file formats will I receive?',
//       answer: 'You will receive all necessary files for web and print. This typically includes vector files (AI, EPS, SVG), raster files (PNG, JPG), and a PDF of any brand guidelines. For UI/UX, I provide Figma or Sketch files.',
//     },
//     {
//       question: 'Do you offer revisions?',
//       answer: "Yes, all my packages include a set number of revision rounds (as specified in the package). This ensures we can iterate and perfect the design until you are 100% satisfied.",
//     },
//   ];

//   return (
//     <section className="py-24 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center">
//           <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             Frequently Asked Questions
//           </h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             Answering common questions about my process, services, and how we can work together.
//           </p>
//         </AnimateOnScroll>
        
//         <div className="mt-16 max-w-3xl mx-auto">
//           {faqs.map((faq, i) => (
//             <FAQItem key={i} question={faq.question} answer={faq.answer} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


// // --- Call To Action ---

// const CallToAction = () => {
//   return (
//     <section className="bg-gray-900 relative overflow-hidden">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
//         <AnimateOnScroll className="max-w-3xl mx-auto text-center">
//           <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
//             Ready to Start Your Project?
//           </h2>
//           <p className="mt-6 text-lg leading-8 text-gray-300">
//             Let's collaborate and create something
//             amazing. Get in touch for a free consultation.
//           </p>
//           <motion.div
//             className="mt-10"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <a
//               href="#"
//               className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700"
//             >
//               Let's Talk
//             </a>
//           </motion.div>
//         </AnimateOnScroll>
//       </div>
      
//       {/* Animated background shapes */}
//       <motion.div
//         className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-10"
//         animate={{
//           scale: [1, 1.2, 1],
//           y: [0, -10, 0]
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: 'easeInOut'
//         }}
//       />
//       <motion.div
//         className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-lg opacity-5"
//         animate={{
//           scale: [1, 1.1, 1],
//           rotate: [0, 15, 0]
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: 'easeInOut',
//           delay: 1
//         }}
//       />
//     </section>
//   );
// };

// // --- Footer ---

// const Footer = () => {
//   const links = [
//     { 
//       title: 'Navigation',
//     //   list: ['Home', 'About', 'Portfolio', 'Contact']
//     list: ['Home', 'About', 'Portfolio', 'Projects', 'Contact']
//     },
//     { 
//       title: 'Company',
//       list: ['Blog', 'Testimonials', 'About Me']
//     },
//     { 
//       title: 'Resources',
//       list: ['Style Guide', 'Case Studies', 'My Process']
//     },
//     { 
//       title: 'Legal',
//       list: ['Privacy Policy', 'Terms of Service']
//     },
//   ];

//   return (
//     <footer className="bg-gray-900 text-gray-400">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
//           <div className="col-span-2 md:col-span-4 lg:col-span-1">
//             <h2 className="text-2xl font-bold text-white">Gaddam B. Kumar</h2>
//             <p className="mt-2 text-sm">Creative Graphic Designer & Brand Strategist</p>
//           </div>
          
//           {links.map((section) => (
//             <div key={section.title}>
//               <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
//               <ul className="space-y-3 mt-4">
//                 {section.list.map((link) => (
//                   <li key={link}>
//                     <a href="#" className="hover:text-white transition-colors">{link}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
        
//         {/* Bottom Bar */}
//         <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} Gaddam Bharath Kumar. All rights reserved.
//           </p>
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <a href="#" className="text-gray-500 hover:text-white"><Twitter /></a>
//             <a href="#" className="text-gray-500 hover:text-white"><Instagram /></a>
//             <a href="#" className="text-gray-500 hover:text-white"><Linkedin /></a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };


// // --- Main App Component ---

// export default function App() {
//   return (
//     <div className="font-sans antialiased text-gray-900 bg-white">
//       <>
//         <Hero />
//         <LogoCloud />
//         <BuiltForEveryone />
//         <FeatureShowcase />
//         <TeamShowcase />
//         <AllEmployeeData />
//         <RotatingIntegrations /> 
//         <Testimonials />
//         <BentoShowcase />
//         <ResourcesSection />
//         <FAQ />
//         <CallToAction />
//       </>
//     </div>
//   );
// }


// import React from 'react';

// // Import all the new homepage components
// import Hero from './components/homepage/Hero';
// import LogoCloud from './components/homepage/LogoCloud';
// import Services from './components/homepage/Services';
// import FeatureShowcase from './components/homepage/FeatureShowcase';
// import TeamShowcase from './components/homepage/TeamShowcase';
// import ParallaxProject from './components/homepage/ParallaxProject';
// import Toolkit from './components/homepage/Toolkit';
// import Testimonials from './components/homepage/Testimonials';
// import BentoShowcase from './components/homepage/BentoShowcase';
// import Blog from './components/homepage/Blog';
// import FAQ from './components/homepage/FAQ';
// import CallToAction from './components/homepage/CallToAction';
// import {
//   getDynamicHomepageLayout,
//   subscribeToHomepageLayout,
// } from './api/homepage';
// import { useState, useEffect } from 'react';
// import { Loader2 } from 'lucide-react';
// /**
//  * This is the new App.jsx, which now acts as your "Homepage".
//  * It just imports and renders all the dynamic sections.
//  * The Header and Footer are provided by RootLayout.jsx.
//  */
// const App = () => {

//     const [layout, setLayout] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const loadLayout = async () => {
//     const sectionKeys = await getDynamicHomepageLayout();
//     setLayout(sectionKeys);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     // 1. Fetch layout on initial load
//     loadLayout();

//     // 2. Subscribe to real-time changes
//     // If the admin re-orders or hides a section, the
//     // public site will update *live* without a refresh.
//     const subscription = subscribeToHomepageLayout(() => {
//       // Re-fetch the layout when a change is detected
//       loadLayout();
//     });

//     // 3. Unsubscribe on cleanup
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="font-sans antialiased text-gray-900 bg-white">
//       {/* These are all the separate, dynamic components
//         that make up your homepage, in order.
//       */}
//       <Hero />
//       <LogoCloud />
//       <Services />
//       <FeatureShowcase />
//       <TeamShowcase />
//       <ParallaxProject />
//       <Toolkit />
//       <Testimonials />
//       <BentoShowcase />
//       <Blog />
//       <FAQ />
//       <CallToAction />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
  getDynamicHomepageLayout,
  subscribeToHomepageLayout,
} from './api/homepage';

// Import all your individual homepage components
import Hero from './components/homepage/Hero';
import LogoCloud from './components/homepage/LogoCloud';
import Services from './components/homepage/Services';
import FeatureShowcase from './components/homepage/FeatureShowcase';
// --- This is the fix ---
// We import ParallaxProject, not EmployeeDataSection
import ParallaxProject from './components/homepage/ParallaxProject'; 
import Toolkit from './components/homepage/Toolkit';
import Testimonials from './components/homepage/Testimonials';
import BentoShowcase from './components/homepage/BentoShowcase';
import Blog from './components/homepage/Blog';
import FAQ from './components/homepage/FAQ';
import CallToAction from './components/homepage/CallToAction';

// 1. Create a map that links the 'section_key' from your database
//    to the actual React component.
const componentMap = {
  hero: Hero,
  logo_cloud: LogoCloud,
  services: Services,
  feature_showcase: FeatureShowcase,
  parallax_project: ParallaxProject, 
  toolkit: Toolkit,
  testimonials: Testimonials,
  bento_showcase: BentoShowcase,
  blog: Blog,
  faq: FAQ,
  call_to_action: CallToAction,
};

/**
 * This is your new dynamic Homepage (App.jsx).
 * It fetches the layout (order & visibility) from the database
 * and then renders the correct components in that order.
 */
export default function App() {
  const [layout, setLayout] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLayout = async () => {
    const sectionKeys = await getDynamicHomepageLayout();
    setLayout(sectionKeys);
    setIsLoading(false);
  };

  useEffect(() => {
    // 1. Fetch layout on initial load
    loadLayout();

 
    // const subscription = subscribeToHomepageLayout(() => {
    //   loadLayout();
    // });

    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      {/* 3. Map over the dynamic layout array from the database.
           For each 'section_key', find the matching component
           in componentMap and render it.
      */}
      {layout.map((sectionKey) => {
        const Component = componentMap[sectionKey];
        return Component ? <Component key={sectionKey} /> : null;
      })}
    </div>
  );
}