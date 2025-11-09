
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, List, Loader2 } from 'lucide-react';
import { fetchProjectCategories, fetchProjects } from '../api/projectspage';
import ProjectCard from '../components/projects/ProjectCard';
import { useHomepageData ,getStorageUrl } from '../hooks/useHomepageData';

// Reusable Search/Filter Bar
const FilterBar = ({ categories, onFilterChange, onSearchChange, activeCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(searchTerm);
  };

  return (
    <div className="mb-16">
      <form onSubmit={handleSearch} className="flex mb-8">
        <input
          type="text"
          placeholder="Search projects by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-4 rounded-r-lg hover:bg-blue-700"
        >
          <Search />
        </button>
      </form>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-5 py-2 rounded-full font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onFilterChange(cat.slug)}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              activeCategory === cat.slug
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Projects Page Component
const Projects = () => {
  const { data: categories, loading: loadingCategories } = useHomepageData(
    fetchProjectCategories,
    'project_categories'
  );

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const hasLoaded = useRef(false);

  // Function to load projects from the server
  const loadProjects = useCallback(async (isNewQuery) => {
    setLoading(true);
    
    // If it's a new search/filter, reset page to 1
    const newPage = isNewQuery ? 1 : page;
    
    const { data, count } = await fetchProjects({
      page: newPage,
      categorySlug: activeCategory,
      searchQuery: searchQuery,
      limit: 9, // 9 items per page
    });

    if (isNewQuery) {
      setProjects(data); // Replace
    } else {
      setProjects((prev) => [...prev, ...data]); // Append
    }
    
    setTotalCount(count);
    setLoading(false);
    hasLoaded.current = true;
  }, [page, activeCategory, searchQuery]);
  
  // Initial load
  useEffect(() => {
    loadProjects(true);
  }, [activeCategory, searchQuery]); // Rerun this effect when filters change
  
  // Load more
  const handleLoadMore = () => {
    // We only increment the page, the effect will handle the fetching
    setPage((prev) => prev + 1);
  };
  
  // Trigger load more when page changes (but not on initial page 1 load)
  useEffect(() => {
    if (page > 1) {
      loadProjects(false); // 'false' means append, not new query
    }
  }, [page]); // This effect now *only* depends on 'page'

  const gridVariants = {
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const hasMore = projects.length < totalCount;

  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
            My Work
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            A selection of projects that showcase my passion for design and
            technology.
          </p>
        </motion.div>

        <div className="mt-20">
          <FilterBar
            categories={categories || []}
            activeCategory={activeCategory}
            onFilterChange={(slug) => {
              setActiveCategory(slug);
              setPage(1); // Reset page on filter change
            }}
            onSearchChange={(query) => {
              setSearchQuery(query);
              setPage(1); // Reset page on search
            }}
          />

          <AnimatePresence>
            {projects.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <div className="flex justify-center mt-16">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
          )}

          {!loading && hasLoaded.current && projects.length === 0 && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold text-gray-900">No Projects Found</h3>
              <p className="text-gray-600 mt-2">
                Try adjusting your search or filter.
              </p>
            </motion.div>
          )}
          
          <AnimatePresence>
            {!loading && hasMore && (
              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <motion.button
                  onClick={handleLoadMore}
                  className="bg-blue-600 text-white px-8 py-3.5 rounded-lg text-lg font-medium shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Projects
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Projects;