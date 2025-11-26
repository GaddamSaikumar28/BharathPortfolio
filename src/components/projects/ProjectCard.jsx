
// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';

// export const CardStyle = {
//   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
//   DECK_STACKED: 'DECK_STACKED' 
// };

// // --- Helper for Media Placeholder ---
// const MediaPlaceholder = ({ project, className = 'h-56' }) => {
//     const imageUrl = project.hero_image;

//     if (imageUrl) {
//         const placeholderUrl = `https://placehold.co/800x600/f3f4f6/9ca3af?text=${encodeURIComponent(project.title)}`;

//         return (
//             <div className={`relative ${className} overflow-hidden bg-gray-100 group w-full`}>
//                 <img 
//                     src={imageUrl} 
//                     alt={project.hero_alt || `Image for ${project.title}`} 
//                     className="w-full h-full object-fit object-center transition-transform duration-700 group-hover:scale-105" 
//                     onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl; }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-20 transition-opacity duration-500" />
//             </div>
//         );
//     }

//     return (
//         <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400`}>
//             <span className="text-xs font-medium uppercase tracking-wider">No Preview</span>
//         </div>
//     );
// };


// const FullCardContent = ({ project, isDeck }) => {
//     const navigate = useNavigate();

//     const handleNavigate = (e) => {
//         e.stopPropagation();
//         navigate(`/projects/${project.slug}`);
//     };

//     return (
//         <div className={`h-full flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-500 group relative ${isDeck ? 'shadow-2xl border border-gray-100' : 'border border-gray-100/80 hover:shadow-xl hover:shadow-indigo-100/40'}`}>
//             {/* Image Section */}
//             <div className="relative shrink-0">
//                 {/* Use a good height to show the image well */}
//                 <MediaPlaceholder project={project} className={isDeck ? "h-64 md:h-72" : "h-56"} />
                
//                 {/* Floating Category Badge */}
//                 <div className="absolute top-4 left-4">
//                     <span className="px-3 py-1 text-[11px] font-semibold bg-white/95 backdrop-blur-md text-indigo-600 rounded-full shadow-sm border border-indigo-50/50">
//                         {project.category || "Project"}
//                     </span>
//                 </div>

//                 {/* Status Badge */}
//                 {project.status && (
//                     <div className="absolute top-4 right-4">
//                         <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm backdrop-blur-md ${
//                             project.status === 'Completed' ? 'bg-emerald-500/90 text-white' : 
//                             project.status === 'In Progress' ? 'bg-amber-500/90 text-white' : 
//                             'bg-gray-500/90 text-white'
//                         }`}>
//                             {project.status}
//                         </span>
//                     </div>
//                 )}
//             </div>

//             {/* Content Section */}
//             <div className="flex-1 p-6 flex flex-col">
//                 <div className="flex justify-between items-start mb-2 gap-4">
//                     <h3 className={`font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors ${isDeck ? 'text-xl md:text-2xl' : 'text-lg'}`}>
//                         {project.title}
//                     </h3>
//                     {project.tier && (
//                          <div className="w-2.5 h-2.5 rounded-full mt-2 shrink-0 ring-2 ring-white" title={project.tier.name} style={{ backgroundColor: project.tier.color_hex }}></div>
//                     )}
//                 </div>
                
//                 <p className="text-sm text-gray-500 line-clamp-3 mb-5 flex-1 leading-relaxed">
//                     {project.description || "No description available."}
//                 </p>

//                 {/* Metadata Footer */}
//                 <div className="pt-4 border-t border-gray-50 mt-auto space-y-3">
//                     {/* Tools Row */}
//                     {project.tools && project.tools.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mb-1">
//                             {project.tools.slice(0, 3).map((tool, i) => (
//                                 <span key={i} className="text-[10px] px-2 py-1 bg-gray-50 text-gray-600 rounded-md border border-gray-100 font-medium">
//                                     {tool.name}
//                                 </span>
//                             ))}
//                             {project.tools.length > 3 && (
//                                 <span className="text-[10px] px-2 py-1 bg-gray-50 text-gray-400 rounded-md border border-gray-100">
//                                     +{project.tools.length - 3}
//                                 </span>
//                             )}
//                         </div>
//                     )}

//                     <div className="flex items-center justify-between mt-2">
//                         <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
//                             <div className="flex items-center gap-2" title="Completion">
//                                 <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                                     <div 
//                                         className="h-full bg-indigo-500 rounded-full" 
//                                         style={{ width: `${project.completion_percentage || 0}%` }}
//                                     />
//                                 </div>
//                                 <span>{project.completion_percentage}%</span>
//                             </div>
//                         </div>

//                         <button 
//                             onClick={handleNavigate}
//                             className={`flex items-center justify-center rounded-full transition-all duration-300 z-10 ${isDeck ? 'w-10 h-10 bg-indigo-600 text-white shadow-lg hover:bg-indigo-700' : 'p-2 bg-gray-50 text-gray-400 hover:bg-indigo-600 hover:text-white'}`}
//                         >
//                             <ChevronRight className={isDeck ? "w-5 h-5" : "w-4 h-4"} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ProjectCard = ({ 
//     project, 
//     index, 
//     style = CardStyle.UNIFIED_DESIGN, 
//     // New prop for 3-card carousel position
//     deckPosition, // 'center', 'left', 'right', 'hiddenLeft', 'hiddenRight'
//     onClick
// }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         if (onClick) {
//             onClick();
//         } else {
//             navigate(`/projects/${project.slug}`);
//         }
//     };

//     // --- Carousel Deck Logic ---
//     if (style === CardStyle.DECK_STACKED) {
        
//         const variants = {
//             center: {
//                 x: '0%',
//                 scale: 1,
//                 zIndex: 30,
//                 opacity: 1,
//                 filter: 'blur(0px)',
//                 rotateY: 0,
//             },
//             left: {
//                 x: '-55%', // Push to left
//                 scale: 0.85, // Smaller
//                 zIndex: 20,
//                 opacity: 0.6, // Faded
//                 filter: 'blur(1px)', // Slight blur
//                 rotateY: 10, // Slight turn inward
//             },
//             right: {
//                 x: '55%', // Push to right
//                 scale: 0.85, // Smaller
//                 zIndex: 20,
//                 opacity: 0.6, // Faded
//                 filter: 'blur(1px)', // Slight blur
//                 rotateY: -10, // Slight turn inward
//             },
//             hiddenLeft: {
//                 x: '-100%',
//                 scale: 0.5,
//                 zIndex: 10,
//                 opacity: 0,
//                 filter: 'blur(5px)',
//             },
//             hiddenRight: {
//                 x: '100%',
//                 scale: 0.5,
//                 zIndex: 10,
//                 opacity: 0,
//                 filter: 'blur(5px)',
//             }
//         };

//         // Determine variant string safely
//         const animateState = deckPosition || 'center';

//         return (
//             <motion.div
//                 className="absolute top-0 left-0 right-0 mx-auto w-full max-w-md cursor-pointer perspective-1000"
//                 initial={false}
//                 animate={animateState}
//                 variants={variants}
//                 transition={{
//                     type: "spring",
//                     stiffness: 120,
//                     damping: 20,
//                     mass: 1
//                 }}
//                 onClick={handleClick}
//                 style={{
//                     transformOrigin: 'center center',
//                     height: 'auto',
//                     perspective: 1000
//                 }}
//             >
//                 <FullCardContent project={project} isDeck={true} />
//                 {/* Overlay to dim non-center cards */}
//                 <div className={`absolute inset-0 bg-white/50 transition-opacity duration-300 rounded-2xl pointer-events-none ${deckPosition === 'center' ? 'opacity-0' : 'opacity-100'}`} />
//             </motion.div>
//         );
//     }
    
//     // --- Grid View Logic ---
//     return (
//         <motion.div
//             layout
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             onClick={handleClick}
//             className="cursor-pointer h-full"
//         >
//             <FullCardContent project={project} isDeck={false} /> 
//         </motion.div>
//     );
// };

// export default ProjectCard;
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink, Layers } from 'lucide-react';

export const CardStyle = {
  UNIFIED_DESIGN: 'UNIFIED_DESIGN',
  DECK_STACKED: 'DECK_STACKED' 
};

// --- Helper: Parallax Tilt Card Container ---
const TiltContainer = ({ children, className, disabled }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        if (disabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        if (disabled) return;
        x.set(0);
        y.set(0);
    };

    if (disabled) return <div className={className}>{children}</div>;

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- Helper: Media Placeholder ---
const MediaPlaceholder = ({ project, className = 'h-56' }) => {
    const imageUrl = project.hero_image;
    
    // Fallback logic
    const placeholderUrl = `https://placehold.co/800x600/f3f4f6/9ca3af?text=${encodeURIComponent(project.title || 'Project')}`;

    return (
        <div className={`relative ${className} overflow-hidden bg-gray-100 group w-full`}>
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    alt={project.hero_alt || `Preview of ${project.title}`} 
                    className="w-full h-full object-fit object-center transition-transform duration-700 group-hover:scale-105" 
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl; }}
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                    <Layers className="w-10 h-10 opacity-20" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-500" />
        </div>
    );
};

const FullCardContent = ({ project, isDeck }) => {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.stopPropagation();
        navigate(`/projects/${project.slug}`);
    };

    return (
        <div className={`h-full flex flex-col bg-white rounded-3xl overflow-hidden backface-hidden ${isDeck ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl border border-gray-100'}`}>
            {/* Image Section */}
            <div className="relative shrink-0">
                <MediaPlaceholder project={project} className={isDeck ? "h-64 md:h-80" : "h-56"} />
                
                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[11px] font-bold bg-white/90 backdrop-blur-md text-gray-900 rounded-full shadow-sm border border-white/50">
                        {project.category || "Development"}
                    </span>
                </div>

                {/* Status Badge */}
                {project.status && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm backdrop-blur-md border border-white/20 ${
                            project.status === 'Completed' ? 'bg-emerald-500/90 text-white' : 
                            project.status === 'In Progress' ? 'bg-amber-500/90 text-white' : 
                            'bg-gray-800/90 text-white'
                        }`}>
                            {project.status}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col relative bg-white">
                <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className={`font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors ${isDeck ? 'text-2xl' : 'text-lg'}`}>
                        {project.title}
                    </h3>
                    {project.tier && (
                        <div className="w-3 h-3 rounded-full mt-2 shrink-0 ring-2 ring-gray-100" title={project.tier.name} style={{ backgroundColor: project.tier.color_hex }}></div>
                    )}
                </div>
                
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {project.description || "A showcase of technical expertise and creative problem solving."}
                </p>

                {/* Metadata Footer */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                    {/* Tools Row */}
                    <div className="flex flex-wrap gap-2 mb-4 h-6 overflow-hidden">
                        {project.tools?.slice(0, 3).map((tool, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-600 rounded border border-gray-200 font-medium">
                                {tool.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                             <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-indigo-500 rounded-full" 
                                    style={{ width: `${project.completion_percentage || 0}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-semibold text-gray-400">{project.completion_percentage}%</span>
                        </div>

                        <button 
                            onClick={handleNavigate}
                            className={`flex items-center gap-2 text-xs font-bold transition-colors ${isDeck ? 'text-indigo-600 hover:text-indigo-800' : 'text-gray-400 hover:text-indigo-600'}`}
                        >
                            View Details <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectCard = ({ 
    project, 
    style = CardStyle.UNIFIED_DESIGN, 
    deckPosition, 
    onClick
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(`/projects/${project.slug}`);
        }
    };

    // --- Carousel Deck Logic ---
    if (style === CardStyle.DECK_STACKED) {
        const variants = {
            center: {
                x: 0,
                scale: 1,
                zIndex: 50,
                opacity: 1,
                rotateY: 0,
                filter: 'brightness(1)',
                transition: { type: "spring", stiffness: 300, damping: 30 }
            },
            left: {
                x: -280, // Absolute pixel value ensures consistent overlap
                scale: 0.85,
                zIndex: 40,
                opacity: 0.7,
                rotateY: 15,
                filter: 'brightness(0.9)',
                transition: { type: "spring", stiffness: 300, damping: 30 }
            },
            right: {
                x: 280,
                scale: 0.85,
                zIndex: 40,
                opacity: 0.7,
                rotateY: -15,
                filter: 'brightness(0.9)',
                transition: { type: "spring", stiffness: 300, damping: 30 }
            },
            hiddenLeft: {
                x: -500,
                scale: 0.6,
                zIndex: 10,
                opacity: 0,
                transition: { duration: 0.4 }
            },
            hiddenRight: {
                x: 500,
                scale: 0.6,
                zIndex: 10,
                opacity: 0,
                transition: { duration: 0.4 }
            }
        };

        const animateState = deckPosition || 'center';

        return (
            <motion.div
                className="absolute top-0 left-0 right-0 mx-auto w-[350px] md:w-[400px] cursor-pointer"
                animate={animateState}
                variants={variants}
                onClick={handleClick}
                style={{
                    transformOrigin: 'center bottom',
                    perspective: 1000
                }}
            >
                <TiltContainer disabled={deckPosition !== 'center'} className="w-full h-full">
                    <FullCardContent project={project} isDeck={true} />
                </TiltContainer>
            </motion.div>
        );
    }
    
    // --- Grid View Logic ---
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            className="cursor-pointer h-full"
        >
            <FullCardContent project={project} isDeck={false} /> 
        </motion.div>
    );
};

export default ProjectCard;