
// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { useNavigate } from 'react-router-dom';
// // import { Clock, Layers, Briefcase, Code } from 'lucide-react';

// // // NOTE: CardStyle definitions and external router dependency (useNavigate) 
// // // are retained for compatibility with your existing environment.
// // export const CardStyle = {
// //   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
// //   DECK_STACKED: 'DECK_STACKED' 
// // };
// // // --- Helper for Media Placeholder (Futuristic Image Block) ---
// // const MediaPlaceholder = ({ project, className = 'h-32' }) => {
// //     // Check for a real image URL or file path (based on API structure)
// //     const imageUrl = project.hero_media?.file_path;

// //     if (imageUrl) {
// //         // Fallback placeholder image URL structure (since we don't have a file server)
// //         const placeholderUrl = `https://placehold.co/400x256/374151/E5E7EB?text=IMG+Placeholder`;

// //         return (
// //             <div className={`relative ${className} rounded-lg overflow-hidden shadow-md mb-4 border border-gray-200 bg-gray-100`}>
// //                 {/* Using a placeholder URL since actual file paths are not loadable in this environment */}
// //                 <img 
// //                     src={placeholderUrl} 
// //                     alt={project.hero_media?.alt_text || `Image for ${project.title}`} 
// //                     className="w-full h-full object-cover" 
// //                     onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl; }}
// //                 />
// //                 <div className="absolute inset-0 ring-2 ring-inset ring-gray-100 rounded-lg pointer-events-none opacity-20"></div>
// //             </div>
// //         );
// //     }

// //     // Fallback: Generate a consistent gradient based on the project ID
// //     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// //     const vibrantGradients = [
// //         'from-blue-500 to-purple-600', 'from-red-500 to-orange-500',
// //         'from-green-500 to-teal-600', 'from-yellow-500 to-pink-500',
// //         'from-indigo-500 to-cyan-500', 'from-fuchsia-500 to-rose-500'
// //     ];
// //     const gradient = vibrantGradients[hash];

// //     return (
// //         <div className={`relative ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden shadow-md mb-4 border border-gray-200`}>
// //             <Code className="w-1/4 h-1/4 text-white/90 opacity-80" />
// //             <div className="absolute inset-0 ring-2 ring-inset ring-white/10 rounded-lg pointer-events-none opacity-20"></div>
// //         </div>
// //     );
// // };

// // // --- Full Card Content (Shared UI for both views) ---
// // const FullCardContent = ({ project }) => {
// //     // --- Data Mapping from API Response ---
// //     const primaryCategory = project.project_category_links?.[0]?.project_categories?.name;
// //     const completionPercentage = project.completion_percentage || 0;
// //     const status = project.status || 'Unknown';
    
// //     // Determine status styling
// //     const isOverdue = status === 'Overdue';
// //     const isCompleted = completionPercentage === 100 && status === 'Completed';
// //     const isInProgress = status === 'In Progress' || status === 'Completed'; // Treat incomplete 'Completed' projects as in progress visual

// //     const statusBg = isOverdue ? 'bg-red-500' : isCompleted ? 'bg-green-500' : isInProgress ? 'bg-blue-500' : 'bg-gray-400';
// //     const statusText = isOverdue ? 'text-red-600' : isCompleted ? 'text-green-600' : isInProgress ? 'text-blue-600' : 'text-gray-600';
// //     const statusLabel = isOverdue ? 'URGENT' : isCompleted ? 'COMPLETED' : isInProgress ? 'ACTIVE SPRINT' : 'NOT STARTED';

// //     const tags = [
// //         { label: primaryCategory || 'General', icon: Briefcase, color: 'text-purple-600' },
// //         { label: project.metadata_label, icon: Layers, color: 'text-cyan-600' },
// //     ].filter(tag => tag.label); // Filter out tags with null/empty labels

// //     return (
// //         <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-xl overflow-hidden p-6 relative border border-gray-100 transition-all duration-300">
            
// //             {/* Status Tag */}
// //             <div className={`absolute top-0 right-0 px-3 py-1 ${statusBg} rounded-bl-xl text-white font-bold text-xs uppercase shadow-md shadow-current/30`}>
// //                 {statusLabel}
// //             </div>

// //             {/* IMAGE SPACE: Responsive h-64 on desktop, h-48 on mobile */}
// //             <MediaPlaceholder project={project} className="h-48 sm:h-64" />

// //             <div className="flex-grow text-gray-900 mb-4">
// //                 <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 line-clamp-2 mb-1">{project.title}</h3>
// //                 {/* Use details_1 and details_2 as an alternative subtitle if no description exists */}
// //                 <p className="text-sm text-gray-600 line-clamp-3">
// //                     {project.description || `${project.details_1 || ''} / ${project.details_2 || ''}`}
// //                 </p>
// //             </div>
            
// //             <div className="mt-auto pt-4 border-t border-gray-200 space-y-3">
// //                 {/* Tags Section */}
// //                 <div className="flex flex-wrap gap-2">
// //                     {tags.map((tag, index) => (
// //                         <div key={index} className={`flex items-center text-xs font-medium ${tag.color} bg-gray-100 px-3 py-1 rounded-full border border-current/30`}>
// //                             <tag.icon className="w-3 h-3 mr-1" />
// //                             {tag.label}
// //                         </div>
// //                     ))}
// //                 </div>

// //                 {/* Progress/Publisher */}
// //                 <div className="flex justify-between items-center text-sm font-sans text-gray-600">
// //                     <span className="flex items-center font-bold">
// //                         <Clock className={`w-4 h-4 mr-2 ${statusText}`} />
// //                         {completionPercentage}% Done
// //                     </span>
// //                     <span className="text-xs text-gray-500 truncate max-w-[50%]">
// //                         {project.publisher_name || 'Internal'}
// //                     </span>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // // --- The Core ProjectCard Component ---
// // const ProjectCard = ({ project, index, isDeckView }) => {
// //     // Assuming a parent component provides the useNavigate context
// //     const navigate = typeof useNavigate === 'function' ? useNavigate() : () => console.log('Mock Navigate'); 
// //     const slug = project.slug || project.id;

// //     const handleClick = () => {
// //         if (slug) {
// //             // In a real application, this would use the router: navigate(`/projects/${slug}`);
// //             console.log(`Navigating to /projects/${slug}`);
// //         }
// //     };

// //     // --- Deck View Logic (Fan/Spread Style) ---
// //     if (isDeckView) {
// //         // Reduced max cards for a more stable mobile/small screen fan
// //         const MAX_VISIBLE_CARDS = 8; 
// //         if (index >= MAX_VISIBLE_CARDS) return null;

// //         const TOTAL_CARDS = MAX_VISIBLE_CARDS;
// //         const rotationFactor = 5; // Reduced angle for a tighter, more responsive fan
// //         const rotation = (index - (TOTAL_CARDS - 1) / 2) * rotationFactor; 
// //         const xOffset = rotation * 6; // Reduced offset for less horizontal spread
// //         const zIndex = 100 + index; 

// //         // Generate a base color for the card container
// //         const hash = project.id.charCodeAt(project.id.length - 1) % 6;
// //         const baseColors = [
// //             'bg-blue-100/50', 'bg-red-100/50', 'bg-green-100/50', 
// //             'bg-yellow-100/50', 'bg-indigo-100/50', 'bg-fuchsia-100/50'
// //         ];
// //         const baseBg = baseColors[hash];


// //         return (
// //             <motion.div
// //                 // Fixed dimensions for the visual effect, using relative units for better fit
// //                 className="absolute w-[18rem] h-[28rem] max-w-xs cursor-pointer" 
// //                 key={`${project.id}-${index}`} 
// //                 onClick={handleClick}
                
// //                 style={{ 
// //                     transformOrigin: 'bottom center',
// //                     perspective: 1000, 
// //                 }}
                
// //                 // Optimized Spring Animation for smoothness (increased damping)
// //                 initial={{ 
// //                     opacity: 0, 
// //                     rotate: rotation, 
// //                     x: xOffset, 
// //                     y: 100, // Start far below
// //                     zIndex: zIndex 
// //                 }}
                
// //                 animate={{ 
// //                     opacity: 1, 
// //                     rotate: rotation, 
// //                     x: xOffset, 
// //                     y: 0, 
// //                     zIndex: zIndex,
// //                     transition: { 
// //                         type: 'spring', 
// //                         stiffness: 100, 
// //                         damping: 20, // Higher damping prevents overshooting/jiggle
// //                         delay: index * 0.05 
// //                     }
// //                 }}

// //                 // Smoother and more aggressive Hover Effect
// //                 whileHover={{ 
// //                     rotate: 0, 
// //                     x: 0, 
// //                     y: -60, // Lift higher for focus
// //                     scale: 1.15, // Increased scale
// //                     zIndex: 200, 
// //                     boxShadow: "0 40px 80px -15px rgba(59, 130, 246, 0.6)", 
// //                     transition: { 
// //                         type: 'spring', 
// //                         stiffness: 250, // Fast snap
// //                         damping: 25,
// //                     }
// //                 }}
// //             >
// //                 {/* Full Card Content Container */}
// //                 <div 
// //                     className={`w-full h-full rounded-xl overflow-hidden shadow-2xl relative ${baseBg}`}
// //                 >
// //                     <FullCardContent project={project} />
// //                 </div>
// //             </motion.div>
// //         );
// //     }
    
// //     // --- Grid View Logic (Responsive Masonry item) ---
// //     return (
// //         <motion.div
// //             className="w-full mb-8 break-inside-avoid-column cursor-pointer"
// //             onClick={handleClick}
// //             // Use simple duration transitions for smooth Grid entry/exit
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -30 }}
// //             transition={{ duration: 0.4 }}
// //             whileHover={{ 
// //                 scale: 1.02,
// //                 boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)", 
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
// import { Clock, Layers, Briefcase, Code, ChevronRight } from 'lucide-react';

// export const CardStyle = {
//   UNIFIED_DESIGN: 'UNIFIED_DESIGN',
//   DECK_STACKED: 'DECK_STACKED' 
// };

// // --- Helper for Media Placeholder ---
// const MediaPlaceholder = ({ project, className = 'h-32' }) => {
//     const imageUrl = project.hero_media?.file_path;

//     if (imageUrl) {
//         // Fallback for demo purposes
//         const placeholderUrl = `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(project.title)}`;

//         return (
//             <div className={`relative ${className} overflow-hidden bg-gray-50 group`}>
//                 <img 
//                     src={imageUrl} // Assuming this is a full URL or you have a base URL handler
//                     alt={project.hero_media?.alt_text || `Image for ${project.title}`} 
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
//                     onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl; }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </div>
//         );
//     }

//     // Fallback Gradient
//     const hash = project.id.charCodeAt(project.id.length - 1) % 6;
//     const gradients = [
//         'from-blue-500 to-indigo-600', 'from-rose-500 to-orange-500',
//         'from-emerald-500 to-teal-600', 'from-amber-500 to-pink-600',
//         'from-violet-500 to-fuchsia-600', 'from-cyan-500 to-blue-500'
//     ];
//     const gradient = gradients[hash];

//     return (
//         <div className={`relative ${className} bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
//             <Code className="w-12 h-12 text-white/50" />
//             <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
//         </div>
//     );
// };

// // --- Full Card Content ---
// const FullCardContent = ({ project, isDeck }) => {
//     const primaryCategory = project.project_category_links?.[0]?.project_categories?.name;
//     const completionPercentage = project.completion_percentage || 0;
//     const status = project.status || 'Unknown';
    
//     // Status Logic
//     const isOverdue = status === 'Overdue';
//     const isCompleted = completionPercentage === 100 && status === 'Completed';
//     const isInProgress = status === 'In Progress' || status === 'Completed'; 

//     // Updated colors for Light Theme
//     const statusBg = isOverdue ? 'bg-red-100 text-red-700 border-red-200' 
//                    : isCompleted ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
//                    : isInProgress ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
//                    : 'bg-gray-100 text-gray-700 border-gray-200';
    
//     const statusLabel = isOverdue ? 'Urgent' : isCompleted ? 'Done' : isInProgress ? 'Active' : 'Planned';

//     const tags = [
//         { label: primaryCategory || 'General', icon: Briefcase, color: 'text-violet-600 bg-violet-50 border-violet-100' },
//         { label: project.metadata_label, icon: Layers, color: 'text-cyan-600 bg-cyan-50 border-cyan-100' },
//     ].filter(tag => tag.label);

//     return (
//         <div className={`flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 ${isDeck ? '' : 'shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1'}`}>
            
//             {/* Image Area */}
//             <div className="relative">
//                 <MediaPlaceholder project={project} className="h-48" />
//                 <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${statusBg} shadow-sm`}>
//                     {statusLabel}
//                 </div>
//             </div>

//             <div className="flex-grow p-5 flex flex-col">
//                 <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
//                     {project.title}
//                 </h3>
//                 <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
//                     {project.description || `${project.details_1 || ''} ${project.details_2 || ''}` || 'No description available.'}
//                 </p>
                
//                 <div className="mt-auto space-y-4">
//                     {/* Tags */}
//                     <div className="flex flex-wrap gap-2">
//                         {tags.map((tag, index) => (
//                             <div key={index} className={`flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${tag.color}`}>
//                                 {tag.label}
//                             </div>
//                         ))}
//                     </div>

//                     <div className="h-px bg-gray-100 w-full"></div>

//                     {/* Footer Info */}
//                     <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
//                         <span className="flex items-center">
//                             <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
//                             {completionPercentage}% Complete
//                         </span>
//                         <span className="flex items-center hover:text-indigo-600 transition-colors">
//                             Details <ChevronRight className="w-3 h-3 ml-1" />
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- The Core ProjectCard Component ---
// const ProjectCard = ({ project, index, isDeckView }) => {
//     const navigate = typeof useNavigate === 'function' ? useNavigate() : () => {}; 
//     const slug = project.slug || project.id;

//     const handleClick = () => {
//         if (slug) {
//             console.log(`Navigating to /projects/${slug}`);
//             // navigate(`/projects/${slug}`);
//         }
//     };

//     // --- Deck View Logic ---
//     if (isDeckView) {
//         const MAX_VISIBLE_CARDS = 8; 
//         if (index >= MAX_VISIBLE_CARDS) return null;

//         const TOTAL_CARDS = MAX_VISIBLE_CARDS;
//         const rotationFactor = 4; 
//         // Center the rotation calculation around the middle of the stack
//         const rotation = (index - (TOTAL_CARDS - 1) / 2) * rotationFactor; 
//         const xOffset = rotation * 8; 
//         const zIndex = 50 - Math.abs(index - 3); // Stack z-index to prioritize middle cards visually if needed, or simple layering

//         return (
//             <motion.div
//                 // RESPONSIVE WIDTH: w-[85vw] for mobile, w-[20rem] for desktop
//                 className="absolute w-[85vw] sm:w-[20rem] h-[28rem] cursor-pointer touch-none" 
//                 key={`${project.id}-${index}`} 
//                 onClick={handleClick}
//                 style={{ 
//                     transformOrigin: 'bottom center',
//                     perspective: 1000, 
//                 }}
//                 initial={{ 
//                     opacity: 0, 
//                     rotate: rotation, 
//                     x: xOffset, 
//                     y: 200, 
//                     scale: 0.9
//                 }}
//                 animate={{ 
//                     opacity: 1, 
//                     rotate: rotation, 
//                     x: xOffset, 
//                     y: 0, 
//                     scale: 1,
//                     zIndex: index, // Ensure order is preserved for the fan look
//                     transition: { 
//                         type: 'spring', 
//                         stiffness: 120, 
//                         damping: 15, 
//                         delay: index * 0.05 
//                     }
//                 }}
//                 whileHover={{ 
//                     y: -40, 
//                     scale: 1.05,
//                     rotate: 0, // Straighten up on hover
//                     zIndex: 100, 
//                     transition: { type: 'spring', stiffness: 300, damping: 20 }
//                 }}
//             >
//                 <div className="w-full h-full rounded-2xl shadow-2xl shadow-indigo-900/10 bg-white ring-1 ring-gray-900/5">
//                     <FullCardContent project={project} isDeck={true} />
//                 </div>
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
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Layers, Briefcase, Code, ChevronRight } from 'lucide-react';
import { Navigate } from 'react-router-dom';
export const CardStyle = {
  UNIFIED_DESIGN: 'UNIFIED_DESIGN',
  DECK_STACKED: 'DECK_STACKED' 
};

// --- Helper for Media Placeholder ---
const MediaPlaceholder = ({ project, className = 'h-32' }) => {
    const imageUrl = project.hero_media?.file_path;

    if (imageUrl) {
        // Fallback for demo purposes
        const placeholderUrl = `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(project.title)}`;

        return (
            <div className={`relative ${className} overflow-hidden bg-gray-50 group`}>
                <img 
                    src={imageUrl} // Assuming this is a full URL or you have a base URL handler
                    alt={project.hero_media?.alt_text || `Image for ${project.title}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        );
    }

    // Fallback Gradient
    const hash = project.id.charCodeAt(project.id.length - 1) % 6;
    const gradients = [
        'from-blue-500 to-indigo-600', 'from-rose-500 to-orange-500',
        'from-emerald-500 to-teal-600', 'from-amber-500 to-pink-600',
        'from-violet-500 to-fuchsia-600', 'from-cyan-500 to-blue-500'
    ];
    const gradient = gradients[hash];

    return (
        <div className={`relative ${className} bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
            <Code className="w-12 h-12 text-white/50" />
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
        </div>
    );
};

// --- Full Card Content ---
const FullCardContent = ({ project, isDeck }) => {
    const primaryCategory = project.project_category_links?.[0]?.project_categories?.name;
    const completionPercentage = project.completion_percentage || 0;
    const status = project.status || 'Unknown';
    const navigate = useNavigate();
    // Status Logic
    const isOverdue = status === 'Overdue';
    const isCompleted = completionPercentage === 100 && status === 'Completed';
    const isInProgress = status === 'In Progress' || status === 'Completed'; 

    // Updated colors for Light Theme
    const statusBg = isOverdue ? 'bg-red-100 text-red-700 border-red-200' 
                   : isCompleted ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                   : isInProgress ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
                   : 'bg-gray-100 text-gray-700 border-gray-200';
    
    const statusLabel = isOverdue ? 'Urgent' : isCompleted ? 'Done' : isInProgress ? 'Active' : 'Planned';

    const tags = [
        { label: primaryCategory || 'General', icon: Briefcase, color: 'text-violet-600 bg-violet-50 border-violet-100' },
        { label: project.metadata_label, icon: Layers, color: 'text-cyan-600 bg-cyan-50 border-cyan-100' },
    ].filter(tag => tag.label);

    const handleDetailsClick = (e) => {
        e.stopPropagation(); // Prevent triggering parent onClick if needed
        if (project.slug) {
            navigate(`/projects/${project.slug}`);
        }
    };

    return (
        <div className={`flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 ${isDeck ? '' : 'shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1'}`}>
            
            {/* Image Area */}
            <div className="relative">
                <MediaPlaceholder project={project} className="h-48" />
                <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${statusBg} shadow-sm`}>
                    {statusLabel}
                </div>
            </div>

            <div className="flex-grow p-5 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
                    {project.description || `${project.details_1 || ''} ${project.details_2 || ''}` || 'No description available.'}
                </p>
                
                <div className="mt-auto space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <div key={index} className={`flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${tag.color}`}>
                                {tag.label}
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-gray-100 w-full"></div>

                    {/* Footer Info */}
                  <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                        <span className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                            {completionPercentage}% Complete
                        </span>
                        
                        {/* Navigation Trigger */}
                        <span 
                            onClick={handleDetailsClick}
                            className="flex items-center hover:text-indigo-600 transition-colors cursor-pointer"
                        >
                            Details <ChevronRight className="w-3 h-3 ml-1" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- The Core ProjectCard Component ---
const ProjectCard = ({ project, index, isDeckView }) => {
    const navigate = typeof useNavigate === 'function' ? useNavigate() : () => {}; 
    const slug = project.slug || project.id;

    const handleClick = () => {
        if (slug) {
            console.log(`Navigating to /projects/${slug}`);
            // navigate(`/projects/${slug}`);
        }
    };

    // --- Deck View Logic ---
    if (isDeckView) {
        const MAX_VISIBLE_CARDS = 8; 
        if (index >= MAX_VISIBLE_CARDS) return null;

        const TOTAL_CARDS = MAX_VISIBLE_CARDS;
        const rotationFactor = 4; 
        // Center the rotation calculation around the middle of the stack
        const rotation = (index - (TOTAL_CARDS - 1) / 2) * rotationFactor; 
        const xOffset = rotation * 8; 
        const zIndex = 50 - Math.abs(index - 3); // Stack z-index to prioritize middle cards visually if needed, or simple layering

        return (
            <motion.div
                // RESPONSIVE WIDTH: w-[85vw] for mobile, w-[20rem] for desktop
                className="absolute w-[85vw] sm:w-[20rem] h-[28rem] cursor-pointer touch-none" 
                key={`${project.id}-${index}`} 
                onClick={handleClick}
                style={{ 
                    transformOrigin: 'bottom center',
                    perspective: 1000, 
                }}
                initial={{ 
                    opacity: 0, 
                    rotate: rotation, 
                    x: xOffset, 
                    y: 200, 
                    scale: 0.9
                }}
                animate={{ 
                    opacity: 1, 
                    rotate: rotation, 
                    x: xOffset, 
                    y: 0, 
                    scale: 1,
                    zIndex: index, // Ensure order is preserved for the fan look
                    transition: { 
                        type: 'spring', 
                        stiffness: 120, 
                        damping: 15, 
                        delay: index * 0.05 
                    }
                }}
                whileHover={{ 
                    y: -40, 
                    scale: 1.05,
                    rotate: 0, // Straighten up on hover
                    zIndex: 100, 
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
            >
                <div className="w-full h-full rounded-2xl shadow-2xl shadow-indigo-900/10 bg-white ring-1 ring-gray-900/5">
                    <FullCardContent project={project} isDeck={true} />
                </div>
            </motion.div>
        );
    }
    
    // --- Grid View Logic ---
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            className="cursor-pointer h-full"
        >
            <FullCardContent project={project} isDeck={false} /> 
        </motion.div>
    );
};

export default ProjectCard;