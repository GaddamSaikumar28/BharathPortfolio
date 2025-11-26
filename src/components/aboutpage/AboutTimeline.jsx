
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchAboutTimeline } from '../../api/aboutpage';
import { useHomepageData } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';

// 1. --- Child component for animation ---
// This component is *only* rendered when 'timeline' data exists.
const AboutTimelineContent = ({ timeline }) => {
  const timelineRef = useRef(null);
  
  // 2. All refs and hooks are now safe
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ['0%', `-${100 - 100 / (timeline.length || 1)}%`]
  );

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            A look back at the key milestones in my career.
          </p>
        </AnimateOnScroll>
      </div>

      {/* 3. The ref is now attached to this div */}
      <div
        ref={timelineRef}
        className="h-[300vh] md:h-[150vh] w-full"
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            className="flex h-96 items-center"
            style={{ x, paddingLeft: '5vw', paddingRight: '5vw' }}
          >
            {timeline.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- (TimelineItem is unchanged) ---
const TimelineItem = ({ item }) => (
  <div className="relative w-80 h-full flex-shrink-0 mr-8 p-8 bg-white rounded-2xl shadow-xl">
    <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
      {item.year}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">{item.title}</h3>
    <p className="text-gray-600">{item.description}</p>
  </div>
);

// 4. --- Parent component for data fetching ---
const AboutTimeline = () => {
  const { data: timeline, loading } = useHomepageData(
    fetchAboutTimeline,
    'about_timeline'
  );

  // 5. This is safe. We return a simple div while loading.
  if (loading || !timeline) {
    return <div className="py-24 bg-gray-50" />;
  }

  // 6. Once data is loaded, render the child component.
  return <AboutTimelineContent timeline={timeline} />;
};

export default AboutTimeline;