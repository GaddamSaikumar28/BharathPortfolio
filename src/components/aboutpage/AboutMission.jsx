import React from 'react';
import { Loader2 } from 'lucide-react';
import { fetchAboutMission } from '../../api/aboutpage';
import { useHomepageData } from '../../hooks/useHomepageData';
import AnimatedTextWord from '../common/AnimatedTextWord';

const AboutMission = () => {
  const { data: mission, loading } = useHomepageData(
    fetchAboutMission,
    'about_mission'
  );

  if (loading) return <div className="py-24 bg-white" />;
  if (!mission) return null;

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          {mission.title}
        </h2>
        <AnimatedTextWord
          text={mission.description}
          className="text-xl text-gray-600 leading-relaxed"
        />
      </div>
    </div>
  );
};

export default AboutMission;