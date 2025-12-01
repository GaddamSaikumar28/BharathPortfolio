
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Loader2, Clock, User, Briefcase, ChevronRight, ChevronLeft, X, Maximize2, Target, TrendingUp, Search, 
    Lightbulb, PenTool, CheckCircle, Package, Layers, Smartphone, AlertTriangle, ShieldCheck, 
    MessageSquare, Aperture, Figma, GitBranch, Zap, Code, Rss, ArrowLeft, ArrowRight, Layout, 
    Award, Globe, Heart, Maximize
} from 'lucide-react';
import { fetchProjectBySlug } from '../api/projectspage';

// --- Icon Map for Dynamic Database Strings ---
const IconMap = {
    Clock, User, Briefcase, ChevronRight, ChevronLeft, X, Maximize2, Target, TrendingUp, Search, 
    Lightbulb, PenTool, CheckCircle, Package, Layers, Smartphone, AlertTriangle, ShieldCheck, 
    MessageSquare, Aperture, Figma, GitBranch, Zap, Code, Rss, ArrowLeft, ArrowRight, Layout, 
    Award, Globe, Heart, Maximize
};

const DynamicIcon = ({ name, className, style }) => {
    const Icon = IconMap[name] || Zap; // Default to 'Zap' if icon name not found
    return <Icon className={className} style={style} />;
};

// --- Sub-Component: Complex Section Renderer (Handles 1, 2, or Carousel images) ---
// const SectionRenderer = ({ section, openLightbox }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const images = section.images || [];
//     const imageCount = images.length;

//     const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imageCount);
//     const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);

//     // CASE 1: Exactly 2 Images -> Stacked Layout (Text Top, Images Side-by-Side Bottom)
//     if (imageCount === 2) {
//         return (
//             <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
//                 <div className="container mx-auto px-6 max-w-6xl">
//                     {/* Text Area (Full Width Top) */}
//                     <div className="mb-12 max-w-4xl">
//                         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{section.heading}</h2>
//                         <div className="w-20 h-1.5 bg-indigo-600 mb-8 rounded-full"></div>
//                         <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{section.body_text}</p>
//                     </div>

//                     {/* Images Area (Side-by-Side) */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         {images.map((img, idx) => (
//                             <motion.div 
//                                 key={idx}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: idx * 0.1 }}
//                                 className="rounded-2xl overflow-hidden shadow-xl cursor-pointer group relative h-80 md:h-96"
//                                 onClick={() => openLightbox(img.path)}
//                             >
//                                 <img 
//                                     src={img.path} 
//                                     alt={img.alt} 
//                                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                                 />
//                                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
//                                     <Maximize2 className="text-white drop-shadow-md w-8 h-8" />
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     // CASE 2: > 2 Images (Carousel) OR 1 Image -> Split Layout (Text Left/Right)
//     return (
//         <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
//             <div className="container mx-auto px-6 max-w-6xl">
//                 <div className={`flex flex-col lg:flex-row items-center gap-16 ${section.layout_type === 'image_right' ? 'lg:flex-row-reverse' : ''}`}>
                    
//                     {/* Text Side */}
//                     <div className="flex-1">
//                         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{section.heading}</h2>
//                         <div className={`w-20 h-1.5 mb-8 rounded-full ${imageCount > 2 ? 'bg-indigo-600' : 'bg-orange-500'}`}></div>
//                         <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{section.body_text}</p>
//                     </div>

//                     {/* Media Side */}
//                     <div className="flex-1 w-full relative">
//                         {imageCount > 2 ? (
//                             // --- CAROUSEL ---
//                             <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gray-100">
//                                 {/* Controls */}
//                                 <div className="absolute top-4 right-4 z-20 flex space-x-2">
//                                     <button onClick={prevImage} className="p-2 bg-white/90 backdrop-blur text-gray-800 rounded-full hover:bg-white shadow-lg transition-all">
//                                         <ChevronLeft className="w-5 h-5" />
//                                     </button>
//                                     <button onClick={nextImage} className="p-2 bg-white/90 backdrop-blur text-gray-800 rounded-full hover:bg-white shadow-lg transition-all">
//                                         <ChevronRight className="w-5 h-5" />
//                                     </button>
//                                 </div>

//                                 {/* Image Display */}
//                                 <div className="relative h-80 md:h-[500px] cursor-pointer" onClick={() => openLightbox(images[currentImageIndex].path)}>
//                                     <AnimatePresence mode='wait'>
//                                         <motion.img 
//                                             key={currentImageIndex}
//                                             src={images[currentImageIndex].path}
//                                             alt={images[currentImageIndex].alt}
//                                             initial={{ opacity: 0, x: 20 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             exit={{ opacity: 0, x: -20 }}
//                                             transition={{ duration: 0.3 }}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </AnimatePresence>
//                                 </div>
                                
//                                 {/* Dots */}
//                                 <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
//                                     {images.map((_, idx) => (
//                                         <div 
//                                             key={idx} 
//                                             className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             // --- SINGLE IMAGE ---
//                             images[0] && (
//                                 <motion.div 
//                                     className="rounded-2xl shadow-2xl overflow-hidden cursor-pointer group"
//                                     onClick={() => openLightbox(images[0].path)}
//                                     whileHover={{ y: -5 }}
//                                 >
//                                     <img 
//                                         src={images[0].path} 
//                                         alt={images[0].alt} 
//                                         className="w-full h-auto object-cover" 
//                                     />
//                                 </motion.div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'; // Assuming you use lucide-react

// const SectionRenderer = ({ section, openLightbox }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const images = section.images || [];
//     const imageCount = images.length;
    
//     // 1. Check if this is an "Image Only" section
//     const hasText = section.heading || section.body_text;

//     const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imageCount);
//     const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);

//     // Common styling for image containers (The "Frame")
//     const frameStyle = "bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center relative group shadow-lg";

//     // =========================================================
//     // SCENARIO A: IMAGE ONLY (No Text)
//     // =========================================================
//     if (!hasText && imageCount > 0) {
//         return (
//             <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
//                 <div className="container mx-auto px-6">
                    
//                     {/* CASE A1: SINGLE HERO IMAGE */}
//                     {imageCount === 1 && (
//                         <div className="flex justify-center">
//                             <motion.div 
//                                 className={`${frameStyle} w-full max-w-5xl cursor-pointer`}
//                                 onClick={() => openLightbox(images[0].path)}
//                                 whileHover={{ scale: 1.01 }}
//                             >
//                                 <img 
//                                     src={images[0].path} 
//                                     alt={images[0].alt} 
//                                     // Limit height to 80% of screen height so it doesn't scroll forever
//                                     className="w-auto h-auto max-h-[80vh] object-contain"
//                                 />
//                                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
//                                     <Maximize2 className="text-gray-800 drop-shadow-md w-10 h-10" />
//                                 </div>
//                             </motion.div>
//                         </div>
//                     )}

//                     {/* CASE A2: TWO IMAGES (50/50 Split) */}
//                     {imageCount === 2 && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//                             {images.map((img, idx) => (
//                                 <motion.div 
//                                     key={idx}
//                                     className={`${frameStyle} h-[400px] md:h-[600px] cursor-pointer`}
//                                     onClick={() => openLightbox(img.path)}
//                                     whileHover={{ y: -5 }}
//                                 >
//                                     <img 
//                                         src={img.path} 
//                                         alt={img.alt} 
//                                         className="w-full h-full object-contain p-2"
//                                     />
//                                 </motion.div>
//                             ))}
//                         </div>
//                     )}

//                     {/* CASE A3: 3 OR MORE IMAGES (Masonry/Grid Style) */}
//                     {imageCount >= 3 && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//                             {images.map((img, idx) => (
//                                 <motion.div 
//                                     key={idx}
//                                     // Make the first item span 2 cols if we have an odd number (optional visual flair)
//                                     // or just keep it simple. Here is a standard grid.
//                                     className={`${frameStyle} h-[350px] cursor-pointer`}
//                                     onClick={() => openLightbox(img.path)}
//                                     whileHover={{ scale: 1.02 }}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: idx * 0.1 }}
//                                 >
//                                     <img 
//                                         src={img.path} 
//                                         alt={img.alt} 
//                                         className="w-full h-full object-contain p-2"
//                                     />
//                                 </motion.div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </section>
//         );
//     }

//     // =========================================================
//     // SCENARIO B: TEXT + IMAGES (Original Logic Improved)
//     // =========================================================
    
//     // CASE B1: Text + 2 Images (Stacked Layout)
//     if (imageCount === 2) {
//         return (
//             <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
//                 <div className="container mx-auto px-6 max-w-6xl">
//                     <div className="mb-12 max-w-4xl">
//                         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{section.heading}</h2>
//                         <div className="w-20 h-1.5 bg-indigo-600 mb-8 rounded-full"></div>
//                         <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{section.body_text}</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         {images.map((img, idx) => (
//                             <motion.div 
//                                 key={idx}
//                                 className={`${frameStyle} h-80 md:h-96 cursor-pointer`}
//                                 onClick={() => openLightbox(img.path)}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: idx * 0.1 }}
//                             >
//                                 <img 
//                                     src={img.path} 
//                                     alt={img.alt} 
//                                     className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
//                                 />
//                                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
//                                     <Maximize2 className="text-gray-800 drop-shadow-md w-8 h-8" />
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     // CASE B2: Text + (1 Image OR Carousel)
//     return (
//         <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
//             <div className="container mx-auto px-6 max-w-6xl">
//                 <div className={`flex flex-col lg:flex-row items-center gap-16 ${section.layout_type === 'image_right' ? 'lg:flex-row-reverse' : ''}`}>
                    
//                     {/* Text Side */}
//                     <div className="flex-1 w-full">
//                         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{section.heading}</h2>
//                         <div className={`w-20 h-1.5 mb-8 rounded-full ${imageCount > 2 ? 'bg-indigo-600' : 'bg-orange-500'}`}></div>
//                         <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{section.body_text}</p>
//                     </div>

//                     {/* Media Side */}
//                     <div className="flex-1 w-full relative flex justify-center">
//                         {imageCount > 2 ? (
//                             // CAROUSEL
//                             <div className={`${frameStyle} w-full shadow-2xl relative`}>
//                                 <div className="absolute top-4 right-4 z-20 flex space-x-2">
//                                     <button onClick={prevImage} className="p-2 bg-white/90 backdrop-blur text-gray-800 rounded-full hover:bg-white shadow-lg transition-all">
//                                         <ChevronLeft className="w-5 h-5" />
//                                     </button>
//                                     <button onClick={nextImage} className="p-2 bg-white/90 backdrop-blur text-gray-800 rounded-full hover:bg-white shadow-lg transition-all">
//                                         <ChevronRight className="w-5 h-5" />
//                                     </button>
//                                 </div>

//                                 <div className="relative w-full h-80 md:h-[500px] cursor-pointer" onClick={() => openLightbox(images[currentImageIndex].path)}>
//                                     <AnimatePresence mode='wait'>
//                                         <motion.img 
//                                             key={currentImageIndex}
//                                             src={images[currentImageIndex].path}
//                                             alt={images[currentImageIndex].alt}
//                                             initial={{ opacity: 0, x: 20 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             exit={{ opacity: 0, x: -20 }}
//                                             transition={{ duration: 0.3 }}
//                                             className="w-full h-full object-contain p-1"
//                                         />
//                                     </AnimatePresence>
//                                 </div>
                                
//                                 <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
//                                     {images.map((_, idx) => (
//                                         <div 
//                                             key={idx} 
//                                             className={`w-2 h-2 rounded-full transition-colors shadow-sm ${idx === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             // SINGLE IMAGE (Text Mode)
//                             images[0] && (
//                                 <motion.div 
//                                     className={`${frameStyle} inline-block relative shadow-2xl`}
//                                     onClick={() => openLightbox(images[0].path)}
//                                     whileHover={{ y: -5 }}
//                                 >
//                                     <img 
//                                         src={images[0].path} 
//                                         alt={images[0].alt} 
//                                         // Constrain height and allow width to auto-adjust
//                                         className="w-auto h-auto max-h-[500px] md:max-h-[600px] max-w-full object-contain mx-auto" 
//                                     />
//                                 </motion.div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

const SectionRenderer = ({ section, openLightbox }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = section.images || [];
    const imageCount = images.length;
    
    const hasText = section.heading || section.body_text;

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);

    // FIXED: Removed 'w-full', 'h-full', and fixed dimensions. 
    // Added 'fit-content' logic so the border hugs the image exactly.
    const frameStyle = "bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg relative group inline-block";

    // =========================================================
    // SCENARIO A: IMAGE ONLY (No Text)
    // =========================================================
    if (!hasText && imageCount > 0) {
        return (
            <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
                <div className="container mx-auto px-6">
                    
                    {/* CASE A1: SINGLE IMAGE */}
                    {imageCount === 1 && (
                        <div className="flex justify-center">
                            <motion.div 
                                className={`${frameStyle} cursor-pointer`}
                                onClick={() => openLightbox(images[0].path)}
                                whileHover={{ scale: 1.01 }}
                            >
                                <img 
                                    src={images[0].path} 
                                    alt={images[0].alt} 
                                    // Logic: Maximize size but keep within screen bounds
                                    className="w-auto h-auto max-h-[85vh] max-w-full object-contain block"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Maximize2 className="text-gray-800 drop-shadow-md w-10 h-10" />
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* CASE A2: TWO+ IMAGES (Flex Layout) */}
                    {imageCount >= 2 && (
                        // FIXED: Changed from Grid to Flex to handle mixed Aspect Ratios
                        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                            {images.map((img, idx) => (
                                <motion.div 
                                    key={idx}
                                    className={`${frameStyle} cursor-pointer`}
                                    onClick={() => openLightbox(img.path)}
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <img 
                                        src={img.path} 
                                        alt={img.alt} 
                                        // FIXED: Set a fixed height (e.g. 500px) and let width Auto-adjust.
                                        // This ensures Portrait and Landscape images line up perfectly in height
                                        // but don't have ugly gray bars on the sides.
                                        className="h-[400px] md:h-[550px] w-auto object-contain block"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }

    // =========================================================
    // SCENARIO B: TEXT + IMAGES
    // =========================================================
    
    // CASE B1: Text + 2 Images (Stacked Layout)
    if (imageCount === 2) {
        return (
            <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-12 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{section.heading}</h2>
                        <div className="w-20 h-1.5 bg-indigo-600 mb-8 rounded-full"></div>
                        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{section.body_text}</p>
                    </div>

                    {/* FIXED: Changed Grid to Flex-Row */}
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-center md:justify-start">
                        {images.map((img, idx) => (
                            <motion.div 
                                key={idx}
                                // Remove fixed w/h classes from container
                                className={`${frameStyle} cursor-pointer`}
                                onClick={() => openLightbox(img.path)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <img 
                                    src={img.path} 
                                    alt={img.alt} 
                                    // FIXED: Constrain Height, Auto Width
                                    // This makes Portrait images narrow and Landscape images wide
                                    className="h-auto max-h-[500px] w-auto max-w-full md:max-w-[45vw] object-contain block"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Maximize2 className="text-gray-800 drop-shadow-md w-8 h-8" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // CASE B2: Text + (1 Image OR Carousel)
    return (
        <section className={`py-24 ${section.bg_color || 'bg-white'}`}>
            <div className="container mx-auto px-6 max-w-6xl">
                <div className={`flex flex-col lg:flex-row items-start gap-16 ${section.layout_type === 'image_right' ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Text Side */}
                    <div className="flex-1 w-full lg:sticky lg:top-32">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{section.heading}</h2>
                        <div className={`w-20 h-1.5 mb-8 rounded-full ${imageCount > 2 ? 'bg-indigo-600' : 'bg-orange-500'}`}></div>
                        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{section.body_text}</p>
                    </div>

                    {/* Media Side */}
                    <div className="flex-1 w-full relative flex justify-center lg:justify-end">
                        {imageCount > 2 ? (
                            // CAROUSEL (Keep fixed container for stability during sliding)
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-2xl relative w-full max-w-xl mx-auto">
                                <div className="absolute top-4 right-4 z-20 flex space-x-2">
                                    <button onClick={prevImage} className="p-2 bg-white/90 backdrop-blur text-gray-800 rounded-full hover:bg-white shadow-lg transition-all">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={nextImage} className="p-2 bg-white/90 backdrop-blur text-gray-800 rounded-full hover:bg-white shadow-lg transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="relative w-full h-[400px] md:h-[500px] cursor-pointer" onClick={() => openLightbox(images[currentImageIndex].path)}>
                                    <AnimatePresence mode='wait'>
                                        <motion.img 
                                            key={currentImageIndex}
                                            src={images[currentImageIndex].path}
                                            alt={images[currentImageIndex].alt}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            // Object-contain ensures full image visibility
                                            className="w-full h-full object-contain bg-gray-50"
                                        />
                                    </AnimatePresence>
                                </div>
                                
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                                    {images.map((_, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`w-2 h-2 rounded-full transition-colors shadow-sm ${idx === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // SINGLE IMAGE (Text Mode)
                            images[0] && (
                                <motion.div 
                                    className={`${frameStyle}`}
                                    onClick={() => openLightbox(images[0].path)}
                                    whileHover={{ y: -5 }}
                                >
                                    <img 
                                        src={images[0].path} 
                                        alt={images[0].alt} 
                                        // Allow width to auto-shrink for portrait images
                                        className="w-auto h-auto max-h-[500px] md:max-h-[600px] max-w-full object-contain block" 
                                    />
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};



// =====================================================================
// MAIN COMPONENT
// =====================================================================

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lightboxImage, setLightboxImage] = useState(null);

    // Scroll Progress Bar
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        const loadData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const data = await fetchProjectBySlug(slug);
                setProject(data);
            } catch (error) {
                console.error("Failed to load project", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">Project Not Found</h2>
                <Link to="/projects" className="text-indigo-600 mt-4 underline">Back to Projects</Link>
            </div>
        );
    }

    const primaryColor = project.primary_color || '#06b6d4';
    const secondaryColor = project.secondary_color || '#f97316';

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
            
            {/* 1. Top Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
                style={{ scaleX, background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
            />

            {/* 2. Navigation */}
            <nav className="fixed top-0 w-full p-6 z-40 mix-blend-difference text-white flex justify-between items-center">
                <Link to="/projects" className="flex items-center group opacity-80 hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-colors mr-3">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium tracking-wide">Back to Projects</span>
                </Link>
            </nav>

            {/* 3. HERO SECTION */}
            <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
                {/* Hero Image Background */}
                <div className="absolute inset-0 z-0 opacity-70">
                    <img 
                        src={project.hero_image?.path || "https://placehold.co/1920x1080"} 
                        alt={project.hero_image?.alt || "Hero"} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center text-white max-w-5xl mt-20">
                     <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight leading-tight mb-8 drop-shadow-2xl"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-2xl text-gray-100 font-light max-w-4xl mx-auto leading-relaxed mb-12 drop-shadow-md"
                    >
                        {project.tagline}
                    </motion.p>
                </div>
            </header>

            {/* 4. META BAR */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm backdrop-blur-lg bg-white/90">
                <div className="container mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
                    <div>
                        <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><User className="w-3 h-3 mr-1"/> Role</span>
                        <span className="font-semibold text-gray-900">{project.role}</span>
                    </div>
                    <div>
                        <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><Clock className="w-3 h-3 mr-1"/> Timeline</span>
                        <span className="font-semibold text-gray-900">{project.timeline}</span>
                    </div>
                     <div>
                        <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><Briefcase className="w-3 h-3 mr-1"/> Client</span>
                        <span className="font-semibold text-gray-900">{project.client}</span>
                    </div>
                     <div>
                        <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> Status</span>
                        <span className="font-semibold text-gray-900">{project.status}</span>
                    </div>
                </div>
            </div>

            {/* 5. OVERVIEW / GOAL SECTION */}
            <section className="py-20 container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Project Overview</h2>
                <p className="text-xl text-gray-600 leading-relaxed">{project.description}</p>
            </section>

            {/* 6. BANNER IMAGES */}
            {project.banner_images?.length > 0 && (
                <section className="py-10 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.banner_images.map((img, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all cursor-pointer group relative h-64 md:h-96"
                                onClick={() => setLightboxImage(img.path)}
                            >
                                <img src={img.path} alt={img.alt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Maximize2 className="text-white drop-shadow-lg w-12 h-12" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* 7. KEY METRICS */}
            {project.key_metrics?.length > 0 && (
                <section className="py-24 bg-gray-900 text-white mt-12">
                    <div className="container mx-auto px-6">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {project.key_metrics.map((metric, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors">
                                    <div className="flex justify-center mb-6">
                                        <div className="p-4 rounded-full bg-white/10 inline-flex relative">
                                            <DynamicIcon name={metric.icon} className={`w-8 h-8 ${metric.color || 'text-white'}`} />
                                            {metric.trend === 'Up' && <div className="absolute -top-1 -right-1 bg-green-500 p-1 rounded-full"><TrendingUp className="w-3 h-3 text-white" /></div>}
                                        </div>
                                    </div>
                                    <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{metric.value}</div>
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">{metric.title}</div>
                                    {metric.description && <p className="text-xs text-gray-500 leading-relaxed border-t border-white/10 pt-4 mx-4">{metric.description}</p>}
                                </div>
                            ))}
                         </div>
                    </div>
                </section>
            )}

            {/* 8. FLIP CARDS (Principles) */}
            {project.flip_card_principles?.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Design Principles</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">The foundational pillars that guided every design decision.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {project.flip_card_principles.map((card, i) => (
                                <div key={i} className="h-96 perspective-1000 group cursor-pointer">
                                    <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 shadow-lg group-hover:shadow-2xl rounded-3xl">
                                        {/* Front */}
                                        <div className={`absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-gray-100 ${card.bgColor || 'bg-white'}`}>
                                            <div className="p-5 rounded-2xl bg-white shadow-sm mb-8">
                                                <DynamicIcon name={card.icon} className="w-10 h-10" style={{ color: card.iconColor || primaryColor }} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">{card.front_title}</h3>
                                        </div>
                                        {/* Back */}
                                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gray-900 p-8 flex flex-col items-center justify-center text-center text-gray-300 border border-gray-800">
                                            <h4 className="text-white font-bold mb-4 text-lg">{card.front_title}</h4>
                                            <p className="leading-relaxed text-sm opacity-90">{card.back_info}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 9. FEATURED SLIDER (Visual Gallery) */}
            {/* {project.slider_images?.length > 0 && (
                <section className="py-24 overflow-hidden bg-white">
                     <div className="container mx-auto px-6 mb-10 flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Visual Gallery</h2>
                            <p className="text-gray-500 mt-2">Swipe to explore key screens</p>
                        </div>
                        <div className="hidden md:flex gap-2">
                            <ArrowLeft className="w-6 h-6 text-gray-300" />
                            <ArrowRight className="w-6 h-6 text-gray-800" />
                        </div>
                     </div>
                     <div className="flex space-x-8 overflow-x-auto pb-16 px-6 container mx-auto scrollbar-hide snap-x">
                        {project.slider_images.map((img, i) => (
                            <motion.div 
                                key={i} 
                                className="min-w-[85vw] md:min-w-[900px] snap-center shrink-0 relative group"
                                whileHover={{ scale: 1.005 }}
                                onClick={() => setLightboxImage(img.path)}
                            >
                                <img 
                                    src={img.path} 
                                    alt={img.alt} 
                                    className="w-full h-auto rounded-2xl shadow-2xl border border-gray-100 cursor-pointer" 
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl">
                                    <p className="text-white font-medium">{img.alt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )} */}


            {project.slider_images?.length > 0 && (
    <section className="py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-6 mb-10 flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Visual Gallery</h2>
                <p className="text-gray-500 mt-2">Swipe to explore key screens</p>
            </div>
            <div className="hidden md:flex gap-2">
                <ArrowLeft className="w-6 h-6 text-gray-300" />
                <ArrowRight className="w-6 h-6 text-gray-800" />
            </div>
        </div>

        {/* 1. Added a fixed height to the scroll container (h-[500px] or h-[60vh]) */}
        <div className="flex space-x-6 overflow-x-auto pb-12 px-6 container mx-auto scrollbar-hide snap-x items-center">
            {project.slider_images.map((img, i) => (
                <motion.div 
                    key={i} 
                    // 2. Changed Layout Logic:
                    // - Removed min-w-[900px]
                    // - Added h-[400px] md:h-[600px] (Sets a consistent height for the strip)
                    // - Added w-auto (Allows width to shrink/grow based on image ratio)
                    className="relative shrink-0 h-[400px] md:h-[600px] w-auto snap-center group rounded-2xl overflow-hidden shadow-xl border border-gray-100 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setLightboxImage(img.path)}
                >
                    <img 
                        src={img.path} 
                        alt={img.alt} 
                        // 3. Image Sizing:
                        // - h-full (Fills the container height)
                        // - w-auto (Adjusts width naturally to keep aspect ratio)
                        // - object-cover (Ensures it fills the area nicely without distortion)
                        className="h-full w-auto object-cover" 
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-medium truncate">{img.alt}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
)}

            {/* 10. IMAGE TEXT SECTIONS (Dynamic Layouts: 1, 2, Carousel) */}
            {project.image_text_sections?.map((section, idx) => (
                <SectionRenderer 
                    key={section.id || idx} 
                    section={section} 
                    index={idx} 
                    openLightbox={setLightboxImage} 
                />
            ))}

            {/* 11. PROCESS TIMELINE */}
            {project.process_steps?.length > 0 && (
                <section className="py-24 bg-gray-50">
                     <div className="container mx-auto px-6 max-w-5xl">
                        <div className="text-center mb-16">
                            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Methodology</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">The Process</h2>
                        </div>
                        <div className="space-y-6">
                            {project.process_steps.map((step, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow"
                                >
                                     <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 shrink-0">
                                         <DynamicIcon name={step.icon} className="w-8 h-8" />
                                     </div>
                                     <div>
                                         <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                                         <p className="text-gray-600 leading-relaxed text-lg">{step.detail}</p>
                                     </div>
                                </motion.div>
                            ))}
                        </div>
                     </div>
                </section>
            )}

            {/* 12. CHALLENGES & SOLUTIONS */}
             {project.challenges_solutions?.length > 0 && (
                <section className="py-24 container mx-auto px-6 max-w-7xl">
                    <h2 className="text-3xl font-bold mb-16 text-center">Challenges & Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {project.challenges_solutions.map((item, i) => (
                            <div key={i} className={`relative bg-white p-8 pt-12 shadow-xl rounded-2xl border-t-4 ${item.challengeColor?.replace('border', 'border') || 'border-gray-200'}`}>
                                <div className="absolute -top-8 left-8 p-4 bg-gray-900 rounded-2xl shadow-lg">
                                    <DynamicIcon name={item.icon} className="w-8 h-8 text-white" />
                                </div>
                                
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">The Challenge</h4>
                                    <p className="text-gray-900 font-medium leading-relaxed">{item.challenge}</p>
                                </div>
                                <div className="pt-6 border-t border-gray-100">
                                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">The Solution</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.solution}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 13. QUOTE */}
            {project.quote_data && (
                <section className="py-24 bg-indigo-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <div className="mb-8 opacity-50"><MessageSquare className="w-12 h-12 mx-auto"/></div>
                        <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-10 text-indigo-100">
                            "{project.quote_data.text}"
                        </blockquote>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="text-right">
                                <div className="font-bold text-white text-lg">{project.quote_data.author}</div>
                                <div className="text-sm text-indigo-300 uppercase tracking-widest">{project.quote_data.role}</div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 14. ACCESSIBILITY */}
            {project.accessibility_insights?.length > 0 && (
                <section className="py-24 container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">Accessibility Focus</h2>
                            <p className="text-gray-600">Ensuring the product is usable by everyone, regardless of ability.</p>
                        </div>
                        <div className="flex-1 w-full h-px bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.accessibility_insights.map((insight, i) => (
                            <div key={i} className="flex items-start gap-6 p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-gray-700">
                                    <DynamicIcon name={insight.icon} className={`w-6 h-6 ${insight.color || 'text-gray-500'}`} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{insight.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{insight.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 15. TOOLS USED */}
            {project.tools_used?.length > 0 && (
                <section className="py-24 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h3 className="text-xl font-bold mb-10 text-gray-400 uppercase tracking-widest">Tools & Technologies</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {project.tools_used.map((tool) => (
                                <div key={tool.id} className="flex items-center px-5 py-2.5 bg-white rounded-full border border-gray-200 text-gray-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md transition-all">
                                    <DynamicIcon name={tool.icon_name} className="w-4 h-4 mr-2.5 opacity-70" />
                                    <span className="font-medium">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            {/* 16. CTA / FOOTER */}
            {project.call_to_action && (
                <section className="py-20 container mx-auto px-6 mb-12">
                    <div 
                        className="rounded-[2.5rem] p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                    >
                         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                         
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-6">{project.call_to_action.heading}</h2>
                            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto font-medium">{project.call_to_action.subheading}</p>
                            <a 
                                href={project.call_to_action.button_link}
                                className="inline-flex items-center px-10 py-5 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg"
                            >
                                {project.call_to_action.button_text} <ChevronRight className="ml-2 w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* 17. LIGHTBOX */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-10 h-10" />
                        </button>
                        <img 
                            src={lightboxImage} 
                            alt="Fullscreen" 
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain" 
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ProjectDetail;