
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import { fetchProjectDetail } from '../api/projectspage';

// Import all the sub-components
import ProjectDetailHero from '../components/projects/ProjectDetailHero';
import ProjectDetailInfo from '../components/projects/ProjectDetailInfo';
import ProjectDetailContent from '../components/projects/ProjectDetailContent';
import ProjectDetailGallery from '../components/projects/ProjectDetailGallery';
import ProjectDetailNext from '../components/projects/ProjectDetailNext';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadProject = async () => {
      // --- THIS IS THE FIX ---
      if (!slug) return; 
      
      try {
        setLoading(true);
        const data = await fetchProjectDetail(slug);
        setProject(data);
        console.log('in the user project data ');
        console.log(data);
      } catch (error) {
        console.error(error);
        // Handle not found, e.g., redirect
      } finally {
        setLoading(false);
      }
    };
    loadProject();
    window.scrollTo(0, 0); // Scroll to top on new project
  }, [slug]); 

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <button
          onClick={() => navigate('/projects')}
          className="mt-4 text-blue-600"
        >
          &larr; Back to projects
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Back to Projects Button */}
      <motion.button
        onClick={() => navigate('/projects')}
        className="fixed top-20 left-4 sm:left-8 z-50 bg-white/80 p-3 rounded-full shadow-lg backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-6 h-6 text-gray-900" />
      </motion.button>

      <main className="bg-white">
        {/* 1. Hero (Video or Image) */}
        <ProjectDetailHero
          videoUrl={project.video_url}
          media={project.detail_hero_media}
          title={project.title}
        />

        {/* 2. Sticky Info & Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* --- Sticky Info Box --- */}
            <div className="lg:col-span-4">
              <ProjectDetailInfo
                title={project.title}
                description={project.description}
                client={project.client}
                role={project.role}
                timeline={project.timeline}
                tools={project.tools}
              />
            </div>

            {/* --- Main Content --- */}
            <div className="lg:col-span-8">
              
              {/* 3. Flexible Content Blocks */}
              <ProjectDetailContent blocks={project.content} />

              {/* 4. Main Gallery */}
              <ProjectDetailGallery gallery={project.gallery} />
              
            </div>
          </div>
        </div>

        {/* 5. Next Project Link */}
        <ProjectDetailNext currentSlug={slug} />
      </main>
    </motion.div>
  );
};

export default ProjectDetail;