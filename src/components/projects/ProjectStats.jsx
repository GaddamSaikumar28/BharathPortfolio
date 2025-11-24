// --- In components/projects/detail/ProjectStats.jsx ---
import React from 'react';
import { motion } from 'framer-motion';

const statVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const ProjectStats = ({ icon: Icon, label, value }) => (
    <motion.div 
        className="flex flex-col p-4 bg-gray-900/50 rounded-lg border border-gray-700/50"
        variants={statVariants}
    >
        <div className="flex items-center text-blue-400 mb-2">
            <Icon className="w-5 h-5 mr-2" />
            <span className="text-sm uppercase font-semibold tracking-wider text-gray-400">{label}</span>
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
);

export default ProjectStats;