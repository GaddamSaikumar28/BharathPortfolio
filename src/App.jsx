
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
  getDynamicHomepageLayout,
  subscribeToHomepageLayout,
} from './api/homepage';

// Import all your individual homepage components
import Hero from './components/homepage/Hero';
import LogoCloud from './components/homepage/LogoCloud';
import Services from './components/homepage/Services';
import FeatureShowcase from './components/homepage/FeatureShowcase';
// --- This is the fix ---
// We import ParallaxProject, not EmployeeDataSection
import ParallaxProject from './components/homepage/ParallaxProject'; 
import Toolkit from './components/homepage/Toolkit';
import Testimonials from './components/homepage/Testimonials';
import BentoShowcase from './components/homepage/BentoShowcase';
import Blog from './components/homepage/Blog';
import FAQ from './components/homepage/FAQ';
import CallToAction from './components/homepage/CallToAction';
import PhotoMarquee from './components/homepage/PhotoMarquee';
import PortfolioBanner from './components/homepage/PortfolioBanner.jsx';
// 1. Create a map that links the 'section_key' from your database
//    to the actual React component.
const componentMap = {
  hero: Hero,
  logo_cloud: LogoCloud,
  services: Services,
  photo_marquee: PhotoMarquee,
  feature_showcase: FeatureShowcase,
  portfolio_banner: PortfolioBanner,
  parallax_project: ParallaxProject, 
  toolkit: Toolkit,
  testimonials: Testimonials,
  bento_showcase: BentoShowcase,
  blog: Blog,
  faq: FAQ,
  call_to_action: CallToAction,
};

/**
 * This is your new dynamic Homepage (App.jsx).
 * It fetches the layout (order & visibility) from the database
 * and then renders the correct components in that order.
 */
export default function App() {
  const [layout, setLayout] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLayout = async () => {
    const sectionKeys = await getDynamicHomepageLayout();
    setLayout(sectionKeys);
    setIsLoading(false);
  };

  useEffect(() => {
    // 1. Fetch layout on initial load
    loadLayout();

 
    // const subscription = subscribeToHomepageLayout(() => {
    //   loadLayout();
    // });

    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      {/* 3. Map over the dynamic layout array from the database.
           For each 'section_key', find the matching component
           in componentMap and render it.
      */}
      {layout.map((sectionKey) => {
        const Component = componentMap[sectionKey];
        return Component ? <Component key={sectionKey} /> : null;
      })}
    </div>
  );
}