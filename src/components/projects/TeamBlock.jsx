import React from 'react';
import { motion } from 'framer-motion';
import { Users, User } from 'lucide-react';
import AnimateOnScroll from '../common/AnimateOnScroll';

const TeamBlock = ({ members }) => {
  if (!members || members.length === 0) return null;

  return (
    <AnimateOnScroll className="my-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <h2 className="flex items-center text-4xl font-bold text-gray-900 mb-10">
          <Users className="w-8 h-8 mr-3 text-blue-600" />
          The Project Team
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 200 } },
              }}
            >
              <User className="w-10 h-10 text-blue-500 mb-3" />
              <p className="text-lg font-semibold text-gray-900">{member.name || 'Team Member'}</p>
              <p className="text-sm text-gray-500 mt-1 italic">{member.role || 'Contributor'}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimateOnScroll>
  );
};

export default TeamBlock;