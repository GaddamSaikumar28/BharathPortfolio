// --- In components/projects/detail/ContentModuleRenderer.jsx ---
import React from 'react';
import { motion } from 'framer-motion';
// import ImageBlock from './modules/ImageBlock';
// import RichTextBlock from './modules/RichTextBlock'; 
// import QuoteBlock from './modules/QuoteBlock'; 
// import SplitContent from './modules/SplitContent'; 

// Fallback for missing content/component
const FallbackBlock = ({ type }) => (
    <motion.div 
        className="p-8 bg-red-900/30 border border-red-700 rounded-xl my-8 text-red-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
    >
        <p className="font-mono text-sm">Error: Unknown module type: **{type}**. Check module_type in DB.</p>
    </motion.div>
);

const ContentModuleRenderer = ({ modules, highlights }) => {
    if (!modules || modules.length === 0) {
        return <p className="text-gray-500 text-center my-16">No case study content found.</p>;
    }

    return (
        <div id="case-study" className="space-y-24">
            {modules.map((module) => {
                // Ensure correct structure for content
                const content = module.content || {}; 
                const key = module.id || `${module.module_type}-${module.order}`;

                switch (module.module_type) {
                    case 'rich_text':
                    case 'introduction': // often the first rich text block
                        return (
                            <RichTextBlock 
                                key={key} 
                                title={module.title} 
                                content={content.text || module.content} // handle both jsonb or text in DB
                            />
                        );
                    case 'image_full':
                        // Look for a highlight if content is empty (flexible integration)
                        const media = content.media || highlights?.find(h => h.context === 'inline_image')?.media; 
                        return <ImageBlock key={key} media={media} caption={content.caption} />;
                    case 'quote':
                        return <QuoteBlock key={key} quote={content.quote} source={content.source} />;
                    case 'split_content':
                        return <SplitContent key={key} title={module.title} leftContent={content.left} rightContent={content.right} />;
                    case 'media_highlight_scroller':
                        // Custom handler for a specific highlight type (e.g., parallax scroller)
                        const scrollerHighlight = highlights?.find(h => h.context === 'scroller');
                        if (!scrollerHighlight) return null;
                        return (
                            // Placeholder for a complex scroller component
                            <div key={key} className="h-[500px] w-full bg-gray-800 flex items-center justify-center text-gray-400">
                                [Animated Media Scroller Module - Content from highlights table]
                            </div>
                        );
                    default:
                        return <FallbackBlock key={key} type={module.module_type} />;
                }
            })}
        </div>
    );
};

export default ContentModuleRenderer;

// Example Module Components (Simplified for brevity)
// --- In components/projects/detail/modules/RichTextBlock.jsx ---
const RichTextBlock = ({ title, content }) => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        {title && <h3 className="text-4xl font-extrabold text-white mb-6 border-l-4 border-blue-400 pl-4">{title}</h3>}
        <p className="text-lg text-gray-400 leading-relaxed whitespace-pre-wrap">{content}</p>
    </motion.div>
);

// --- In components/projects/detail/modules/ImageBlock.jsx ---
const ImageBlock = ({ media, caption }) => (
    <motion.div 
        className="my-16"
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true, amount: 0.4 }} 
        transition={{ duration: 0.8 }}
    >
        <img 
            src={media?.file_path || 'https://placehold.co/1200x600/333/FFF?text=Image'} 
            alt={media?.alt_text || 'Project Visual'} 
            className="w-full h-auto rounded-xl shadow-2xl border border-gray-700/50"
        />
        {caption && <p className="text-center text-sm text-gray-500 mt-3 font-mono">{caption}</p>}
    </motion.div>
);