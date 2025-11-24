// --- In components/projects/detail/ToolScroller.jsx ---
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brush, Layout, Zap, Database } from 'lucide-react';

const iconMap = {
    Code: Code,
    Figma: Brush,
    React: Layout,
    AWS: Zap,
    PostgreSQL: Database,
    // Add more mappings based on your DB tool names
};

const ToolScroller = ({ tools }) => {
    if (!tools || tools.length === 0) return null;
    
    // Duplicate the list for seamless looping effect
    const loopedTools = [...tools, ...tools];

    const marqueeVariants = {
        animate: {
            x: ['0%', '-100%'],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 40, // Slower duration for smoother loop
                    ease: 'linear',
                },
            },
        },
    };

    return (
        <div className="relative overflow-hidden w-full h-24 bg-gray-800/70 border border-gray-700 rounded-xl shadow-inner">
            <motion.div 
                className="flex items-center absolute left-0 h-full"
                variants={marqueeVariants}
                animate="animate"
            >
                {loopedTools.map((link, index) => {
                    // Assuming tool name is used as the icon key for simplicity
                    const Icon = iconMap[link.tools.icon_name] || Code; 
                    
                    return (
                        <div key={index} className="flex items-center mx-8 p-3 bg-gray-900/50 rounded-full border border-blue-400/50">
                            <Icon className="w-6 h-6 text-blue-400 mr-3" />
                            <span className="text-lg font-mono text-white whitespace-nowrap">{link.tools.name}</span>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default ToolScroller;