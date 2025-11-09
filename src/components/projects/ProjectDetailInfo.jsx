import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../common/IconMap';

const InfoRow = ({ title, children }) => (
  <div className="py-4 border-b border-gray-200">
    <h3 className="text-sm font-semibold text-gray-500 uppercase">{title}</h3>
    <div className="text-lg text-gray-800 mt-1">{children}</div>
  </div>
);

const ProjectDetailInfo = ({ title, description, client, role, timeline, tools }) => {
  return (
    <motion.div
      className="sticky top-24" // Make it sticky
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
      <p className="text-lg text-gray-600 mb-8">{description}</p>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <InfoRow title="Client">{client || 'N/A'}</InfoRow>
        <InfoRow title="Role">{role || 'N/A'}</InfoRow>
        <InfoRow title="Timeline">{timeline || 'N/A'}</InfoRow>
        <InfoRow title="Tools">
          <div className="flex flex-wrap gap-4 mt-2">
            {tools && tools.map((tool) => (
              <div key={tool.name} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border">
                <Icon name={tool.icon_name || 'Wrench'} size={16} className="text-blue-600" />
                <span className="text-sm font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </InfoRow>
      </div>
    </motion.div>
  );
};

export default ProjectDetailInfo;