
import React from 'react';
import { motion } from 'framer-motion';
import { fetchToolkitTools } from '../../api/homepage';
import { useHomepageData } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

const Toolkit = () => {
  const { data: tools, loading } = useHomepageData(fetchToolkitTools, 'toolkit_tools');

  if (loading || !tools) {
    return <section className="py-24 bg-gray-50"><Loader2 className="animate-spin" /></section>;
  }

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <AnimateOnScroll className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Integrate with your existing tools
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            Connect your favorite tools in seconds.
          </p>
        </AnimateOnScroll>

        <div className="relative w-full max-w-3xl">
          <motion.div 
            className="flex flex-wrap justify-center gap-10 md:gap-20"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                animate={{ y: [0, -10, 0] }} // Infinite float
                transition={{
                  duration: 2.5 + (index * 0.3), // Vary speeds
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div 
                  className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                  style={{ rotate: index % 2 === 0 ? -5 : 5 }} // Tilt
                >
                  <Icon name={tool.icon_name} size={40} style={{ color: tool.color || '#111827' }} />
                </div>
                <span className="mt-4 font-semibold text-gray-700">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;