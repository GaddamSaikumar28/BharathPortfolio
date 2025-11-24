// --- In components/projects/detail/RelatedLinks.jsx ---
import React from 'react';
import { motion } from 'framer-motion';
import { Link, Github, ExternalLink, Dribbble, Figma } from 'lucide-react';

const iconMap = {
    website: ExternalLink,
    github: Github,
    dribbble: Dribbble,
    figma: Figma,
    default: Link,
    // Add mappings for your DB icon_name values
};

const RelatedLinks = ({ links }) => {
    const linkVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 }
    };

    return (
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="py-8">
            <h3 className="text-3xl font-bold mb-8 text-white">External Links & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {links.map((link, index) => {
                    // Simple check based on label or icon_name for icon selection
                    const Icon = iconMap[link.icon_name?.toLowerCase()] || iconMap['default']; 

                    return (
                        <motion.a
                            key={link.id || index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-6 bg-gray-800 rounded-xl border border-gray-700 transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:scale-[1.02]"
                            variants={linkVariants}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Icon className="w-6 h-6 mr-4 text-blue-400 group-hover:text-white" />
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold text-white">{link.label}</span>
                                <span className="text-sm text-gray-400 truncate">{link.url.replace(/^https?:\/\//, '')}</span>
                            </div>
                            <ExternalLink className="w-5 h-5 ml-auto text-gray-500 transition-colors" />
                        </motion.a>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default RelatedLinks;