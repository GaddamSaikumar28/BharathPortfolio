

import React from 'react';

// Import all the new 'About' page components
import AboutHero from '../components/aboutpage/AboutHero';
import AboutMission from '../components/aboutpage/AboutMission';
import AboutServices from '../components/aboutpage/AboutServices';
import AboutValues from '../components/aboutpage/AboutValues';
import AboutTimeline from '../components/aboutpage/AboutTimeline';
import AboutCTA from '../components/aboutpage/AboutCTA';

const About = () => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <AboutHero />
      <AboutMission />
      <AboutServices />
      <AboutValues />
      <AboutTimeline />
      <AboutCTA />
    </div>
  );
};

export default About;