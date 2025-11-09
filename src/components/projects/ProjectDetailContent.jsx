import React from 'react';
import { motion } from 'framer-motion';
import { getStorageUrl } from '../../hooks/useHomepageData';
import ProjectDetailPalette from './ProjectDetailPalette'; // Import palette component
import AnimateOnScroll from '../common/AnimateOnScroll';

// Separate component for 'text' blocks
const TextBlock = ({ title, body }) => (
  <AnimateOnScroll className="mb-16">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
    <p className="text-lg text-gray-600 leading-relaxed">{body}</p>
  </AnimateOnScroll>
);

// Separate component for 'image' blocks
const ImageBlock = ({ media_id, caption }) => {
  const imageUrl = getStorageUrl(media_id);
  if (!imageUrl) return null;

  return (
    <AnimateOnScroll className="mb-16">
      <img
        src={imageUrl}
        alt={caption || 'Project image'}
        className="w-full rounded-lg shadow-lg"
      />
      {caption && (
        <p className="text-center text-sm text-gray-500 mt-4 italic">
          {caption}
        </p>
      )}
    </AnimateOnScroll>
  );
};

// Main Content Renderer
const ProjectDetailContent = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return (
      <AnimateOnScroll>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Challenge</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          This project's details are still being written. Check back soon!
        </p>
      </AnimateOnScroll>
    );
  }

  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block) => {
        const { id, type, content } = block;

        switch (type) {
          case 'text':
            return (
              <TextBlock
                key={id}
                title={content.title}
                body={content.body}
              />
            );
          case 'image':
            return (
              <ImageBlock
                key={id}
                media_id={content.media_path}
                caption={content.caption}
              />
            );
          case 'palette':
            return (
              <ProjectDetailPalette
                key={id}
                colors={content.colors}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ProjectDetailContent;