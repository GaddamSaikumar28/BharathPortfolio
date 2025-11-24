// DashboardCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Edit3, BookOpen, Layers } from 'lucide-react';

const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return 'bg-green-500';
        case 'Not Started': return 'bg-gray-400';
        case 'Overdue': return 'bg-red-500';
        default: return 'bg-blue-500';
    }
};

const DashboardCard = ({ project, index }) => {
    // Generate placeholder image paths for the mock design
    const heroImage = project.heroImage;
    const isModule = project.metadata_value === null; // Card 1 is different

    const completionStyle = {
        background: `conic-gradient(#10b981 ${project.completion_percentage}%, #d1d5db ${project.completion_percentage}%)`,
    };
    
    // Choose the overlay color based on the first two chars of the ID for variation
    const overlayColor = `#${project.id.substring(4, 10)}`;

    const cardVariants = {
        initial: { opacity: 0, scale: 0.9, rotateY: -10 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            transition: { 
                duration: 0.6, 
                type: 'spring', 
                stiffness: 70,
                delay: index * 0.05 // Staggered entry
            } 
        },
        hover: { scale: 1.03, z: 10, rotateZ: 1, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }
    };

    return (
        <motion.div 
            className="flex-shrink-0 w-80 h-[360px] rounded-xl overflow-hidden shadow-xl bg-white cursor-pointer relative mx-4"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            style={{ 
                // Ensure a minimum z-index for hover lift
                zIndex: 10 + index 
            }} 
        >
            {/* Top Header Section (Colored Overlay) */}
            <div 
                className="h-32 relative" 
                style={{ 
                    background: `linear-gradient(135deg, ${overlayColor} 0%, ${overlayColor}ee 50%, ${overlayColor}dd 100%)` 
                }}
            >
                {/* Completion/Score Indicator */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-0.5">
                    {isModule ? (
                        <div className={`w-10 h-10 ${getStatusColor(project.status)} rounded-full flex items-center justify-center`}>
                            <Check className="w-5 h-5 text-white" />
                        </div>
                    ) : project.metadata_value !== null ? (
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-gray-800 font-extrabold text-xl relative" style={completionStyle}>
                            <div className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                {project.metadata_value}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center text-white font-semibold text-xs rounded-lg px-2 py-1" style={{ backgroundColor: overlayColor }}>
                            {project.completion_percentage}%
                        </div>
                    )}
                </div>

                {/* Status Tag (Left Top) */}
                <div className="absolute top-4 left-4 text-xs font-semibold text-white px-2 py-0.5 rounded-md" style={{ backgroundColor: getStatusColor(project.status) }}>
                    {project.status}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 pt-0 -mt-20">
                
                {/* Image/Thumbnail (Mocked with gradient) */}
                <div className="w-20 h-20 rounded-lg overflow-hidden mb-3 shadow-lg ring-2 ring-white" style={{ backgroundColor: overlayColor }}>
                    <img 
                        src={`https://placehold.co/80x80/${overlayColor.substring(1)}/FFF?text=IMG`} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover" 
                    />
                </div>

                {/* Main Title and Metadata */}
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{project.title}</h3>
                
                {project.publisher_name && (
                    <p className="text-sm text-gray-500 mt-0.5">{project.publisher_name}</p>
                )}

                {/* Details/Actions Section */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                    <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 mr-1" /> {project.details_1 || 'N/A'}
                    </span>
                    <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                        <Edit3 className="w-3 h-3 mr-1" /> {project.details_2 || 'N/A'}
                    </span>
                </div>
                
                {/* Bottom Status Tag */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    {project.metadata_label && (
                         <span className={`px-2 py-1 rounded font-semibold text-white`} style={{backgroundColor: overlayColor}}>
                            {project.metadata_label}
                        </span>
                    )}
                    <span className="text-gray-500">{project.tierName || 'Standard'}</span>
                </div>

            </div>
        </motion.div>
    );
};

export default DashboardCard;