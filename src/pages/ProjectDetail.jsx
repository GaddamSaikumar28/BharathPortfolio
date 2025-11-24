
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Loader2, ArrowLeft } from 'lucide-react';
// import { fetchProjectDetail } from '../api/projectspage';

// // Import all the sub-components
// import ProjectDetailHero from '../components/projects/ProjectDetailHero';
// import ProjectDetailInfo from '../components/projects/ProjectDetailInfo';
// import ProjectDetailContent from '../components/projects/ProjectDetailContent';
// import ProjectDetailGallery from '../components/projects/ProjectDetailGallery';
// import ProjectDetailNext from '../components/projects/ProjectDetailNext';

// const ProjectDetail = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const loadProject = async () => {
//       // --- THIS IS THE FIX ---
//       if (!slug) return; 
      
//       try {
//         setLoading(true);
//         const data = await fetchProjectDetail(slug);
//         setProject(data);
//         console.log('in the user project data ');
//         console.log(data);
//       } catch (error) {
//         console.error(error);
//         // Handle not found, e.g., redirect
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProject();
//     window.scrollTo(0, 0); // Scroll to top on new project
//   }, [slug]); 

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center">
//         <h1 className="text-3xl font-bold">Project Not Found</h1>
//         <button
//           onClick={() => navigate('/projects')}
//           className="mt-4 text-blue-600"
//         >
//           &larr; Back to projects
//         </button>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {/* Back to Projects Button */}
//       <motion.button
//         onClick={() => navigate('/projects')}
//         className="fixed top-20 left-4 sm:left-8 z-50 bg-white/80 p-3 rounded-full shadow-lg backdrop-blur-sm"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <ArrowLeft className="w-6 h-6 text-gray-900" />
//       </motion.button>

//       <main className="bg-white">
//         {/* 1. Hero (Video or Image) */}
//         <ProjectDetailHero
//           videoUrl={project.video_url}
//           media={project.detail_hero_media}
//           title={project.title}
//         />

//         {/* 2. Sticky Info & Content */}
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
//             {/* --- Sticky Info Box --- */}
//             <div className="lg:col-span-4">
//               <ProjectDetailInfo
//                 title={project.title}
//                 description={project.description}
//                 client={project.client}
//                 role={project.role}
//                 timeline={project.timeline}
//                 tools={project.tools}
//               />
//             </div>

//             {/* --- Main Content --- */}
//             <div className="lg:col-span-8">
              
//               {/* 3. Flexible Content Blocks */}
//               <ProjectDetailContent blocks={project.content} />

//               {/* 4. Main Gallery */}
//               <ProjectDetailGallery gallery={project.gallery} />
              
//             </div>
//           </div>
//         </div>

//         {/* 5. Next Project Link */}
//         <ProjectDetailNext currentSlug={slug} />
//       </main>
//     </motion.div>
//   );
// };

// export default ProjectDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, Clock, User, Layers, ShieldCheck, Link, Code, ChevronRight,Briefcase } from 'lucide-react';
import { fetchProjectDetail, fetchNextProject } from '../api/projectspage'; 
// import DetailHero from '../components/projects/detail/DetailHero'; // 1. Hero
// import ProjectStats from '../components/projects/detail/ProjectStats'; // 2. Stats (Role, Client, etc.)
// import ContentModuleRenderer from '../components/projects/detail/ContentModuleRenderer'; // 3. Case Study Content
// import MediaGallery from '../components/projects/detail/MediaGallery'; // 4. Gallery
// import RelatedLinks from '../components/projects/detail/RelatedLinks'; // 5. Links
// import ToolScroller from '../components/projects/detail/ToolScroller'; // 6. Tool Scroller
// import CtaBanner from '../components/global/CtaBanner'; // 7. CTA/Banner
import DetailHero from '../components/projects/DetailHero';
import ProjectStats from '../components/projects/ProjectStats';
import ContentModuleRenderer from '../components/projects/ContentModuleRenderer';
import MediaGallery from '../components/projects/MediaGallery';
import RelatedLinks from '../components/projects/RelatedLinks';
import ToolScroller from '../components/projects/ToolScroller';

// Framer Motion variants for common scroll effect
const fadeInView = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerChildren = {
  animate: { transition: { staggerChildren: 0.15 } }
};


const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
    
    const loadData = async () => {
      setLoading(true);
      try {
        const detailData = await fetchProjectDetail(slug);
        if (detailData) {
          setProject(detailData);
          const nextData = await fetchNextProject(slug);
          setNextProject(nextData);
        } else {
          // Handle 404 case
          navigate('/404'); 
        }
      } catch (error) {
        console.error("Failed to load project details:", error);
        navigate('/error'); 
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug, navigate]);

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
      </div>
    );
  }

  // --- Destructure key data ---
  const { title, description, detail_hero_media, client, role, timeline, tools, gallery, project_case_study_modules, project_related_links } = project;
  
  // Example for a specific module type (e.g., text block)
  const introBlock = project_case_study_modules.find(m => m.module_type === 'introduction');


  return (
    <motion.div 
      className="bg-gray-950 text-white min-h-screen"
      initial="initial" 
      animate="animate"
      variants={staggerChildren}
    >
      
      {/* 1. Detail Hero Section - High Impact Entrance */}
      <DetailHero 
        title={title}
        description={description}
        media={detail_hero_media}
        tier={project.tiers} // Assume tier data is available here
      />
      
      {/* Container for scroll-animated sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16">

        {/* 2. Project Metadata/Stats (Client, Role, Timeline) */}
        <motion.section 
          variants={fadeInView} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true, amount: 0.5 }}
          className="grid md:grid-cols-4 gap-8 mb-24 py-8 border-t border-b border-gray-700/50"
        >
            <ProjectStats icon={User} label="Client" value={client || 'Internal Project'} />
            <ProjectStats icon={Briefcase} label="Role" value={role || 'Lead Designer'} />
            <ProjectStats icon={Clock} label="Timeline" value={timeline || '4 Weeks'} />
            <ProjectStats icon={ShieldCheck} label="Status" value={project.status || 'Completed'} />
        </motion.section>

        {/* 3. Case Study Content Renderer (Modules/Paragraphs) */}
        <ContentModuleRenderer modules={project_case_study_modules} />
        
        {/* 4. Tools Used Scroller - (Appears as a fixed banner during scroll) */}
        <motion.section 
          variants={fadeInView} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true, amount: 0.2 }}
          className="my-32"
        >
          <h2 className="text-4xl font-extrabold mb-8 text-blue-400">Toolkit Used</h2>
          {/* Note: ToolScroller should fetch data from project_tool_links */}
          <ToolScroller tools={tools} />
        </motion.section>
        
        {/* 5. Project Gallery (Highly Animated) */}
        <motion.section 
          variants={staggerChildren} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true, amount: 0.1 }}
          className="my-32"
        >
            <h2 className="text-4xl font-extrabold mb-12 text-white">Visual Breakdown</h2>
            <MediaGallery images={gallery} />
        </motion.section>

        {/* 6. Related Links and External Resources */}
        {project_related_links && project_related_links.length > 0 && (
          <motion.section 
            variants={fadeInView} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true, amount: 0.5 }}
            className="my-32"
          >
            <RelatedLinks links={project_related_links} />
          </motion.section>
        )}
        
      </div> 

      {/* 7. Footer CTA/Next Project Navigation */}
      {/* <CtaBanner 
        title="Ready to Start Your Next Project?"
        subtitle="Let's build something extraordinary together."
      /> */}
      
      {nextProject && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="py-16 bg-gray-900 border-t border-gray-800"
        >
            <div className="container mx-auto max-w-7xl px-4 text-right">
                <button 
                  onClick={() => navigate(`/projects/${nextProject.slug}`)}
                  className="inline-flex items-center text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
                >
                    Next Project: {nextProject.title}
                    <ChevronRight className="w-6 h-6 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default ProjectDetail;