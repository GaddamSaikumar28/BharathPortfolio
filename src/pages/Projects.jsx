
// // // // // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // // // // import { Search, List, Loader2 } from 'lucide-react';
// // // // // // // // // // // import { fetchProjectCategories, fetchProjects } from '../api/projectspage';
// // // // // // // // // // // import ProjectCard from '../components/projects/ProjectCard';
// // // // // // // // // // // import { useHomepageData ,getStorageUrl } from '../hooks/useHomepageData';

// // // // // // // // // // // // Reusable Search/Filter Bar
// // // // // // // // // // // const FilterBar = ({ categories, onFilterChange, onSearchChange, activeCategory }) => {
// // // // // // // // // // //   const [searchTerm, setSearchTerm] = useState('');

// // // // // // // // // // //   const handleSearch = (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     onSearchChange(searchTerm);
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="mb-16">
// // // // // // // // // // //       <form onSubmit={handleSearch} className="flex mb-8">
// // // // // // // // // // //         <input
// // // // // // // // // // //           type="text"
// // // // // // // // // // //           placeholder="Search projects by name..."
// // // // // // // // // // //           value={searchTerm}
// // // // // // // // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // // // //           className="flex-grow p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // // // // // // // // //         />
// // // // // // // // // // //         <button
// // // // // // // // // // //           type="submit"
// // // // // // // // // // //           className="bg-blue-600 text-white p-4 rounded-r-lg hover:bg-blue-700"
// // // // // // // // // // //         >
// // // // // // // // // // //           <Search />
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </form>
// // // // // // // // // // //       <div className="flex flex-wrap gap-3">
// // // // // // // // // // //         <button
// // // // // // // // // // //           onClick={() => onFilterChange('all')}
// // // // // // // // // // //           className={`px-5 py-2 rounded-full font-medium transition-colors ${
// // // // // // // // // // //             activeCategory === 'all'
// // // // // // // // // // //               ? 'bg-blue-600 text-white'
// // // // // // // // // // //               : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
// // // // // // // // // // //           }`}
// // // // // // // // // // //         >
// // // // // // // // // // //           All
// // // // // // // // // // //         </button>
// // // // // // // // // // //         {categories.map((cat) => (
// // // // // // // // // // //           <button
// // // // // // // // // // //             key={cat.slug}
// // // // // // // // // // //             onClick={() => onFilterChange(cat.slug)}
// // // // // // // // // // //             className={`px-5 py-2 rounded-full font-medium transition-colors ${
// // // // // // // // // // //               activeCategory === cat.slug
// // // // // // // // // // //                 ? 'bg-blue-600 text-white'
// // // // // // // // // // //                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
// // // // // // // // // // //             }`}
// // // // // // // // // // //           >
// // // // // // // // // // //             {cat.name}
// // // // // // // // // // //           </button>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // // Main Projects Page Component
// // // // // // // // // // // const Projects = () => {
// // // // // // // // // // //   const { data: categories, loading: loadingCategories } = useHomepageData(
// // // // // // // // // // //     fetchProjectCategories,
// // // // // // // // // // //     'project_categories'
// // // // // // // // // // //   );

// // // // // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // // // // //   const [page, setPage] = useState(1);
// // // // // // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // // // // // // //   const [totalCount, setTotalCount] = useState(0);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // // // //   const hasLoaded = useRef(false);

// // // // // // // // // // //   // Function to load projects from the server
// // // // // // // // // // //   const loadProjects = useCallback(async (isNewQuery) => {
// // // // // // // // // // //     setLoading(true);
    
// // // // // // // // // // //     // If it's a new search/filter, reset page to 1
// // // // // // // // // // //     const newPage = isNewQuery ? 1 : page;
    
// // // // // // // // // // //     const { data, count } = await fetchProjects({
// // // // // // // // // // //       page: newPage,
// // // // // // // // // // //       categorySlug: activeCategory,
// // // // // // // // // // //       searchQuery: searchQuery,
// // // // // // // // // // //       limit: 9, // 9 items per page
// // // // // // // // // // //     });

// // // // // // // // // // //     if (isNewQuery) {
// // // // // // // // // // //       setProjects(data); // Replace
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setProjects((prev) => [...prev, ...data]); // Append
// // // // // // // // // // //     }
    
// // // // // // // // // // //     setTotalCount(count);
// // // // // // // // // // //     setLoading(false);
// // // // // // // // // // //     hasLoaded.current = true;
// // // // // // // // // // //   }, [page, activeCategory, searchQuery]);
  
// // // // // // // // // // //   // Initial load
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     loadProjects(true);
// // // // // // // // // // //   }, [activeCategory, searchQuery]); // Rerun this effect when filters change
  
// // // // // // // // // // //   // Load more
// // // // // // // // // // //   const handleLoadMore = () => {
// // // // // // // // // // //     // We only increment the page, the effect will handle the fetching
// // // // // // // // // // //     setPage((prev) => prev + 1);
// // // // // // // // // // //   };
  
// // // // // // // // // // //   // Trigger load more when page changes (but not on initial page 1 load)
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (page > 1) {
// // // // // // // // // // //       loadProjects(false); // 'false' means append, not new query
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [page]); // This effect now *only* depends on 'page'

// // // // // // // // // // //   const gridVariants = {
// // // // // // // // // // //     visible: { transition: { staggerChildren: 0.05 } },
// // // // // // // // // // //   };

// // // // // // // // // // //   const hasMore = projects.length < totalCount;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="py-24 sm:py-32 bg-white">
// // // // // // // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // // // // // // // // // //         <motion.div
// // // // // // // // // // //           className="max-w-2xl mx-auto text-center"
// // // // // // // // // // //           initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // //           animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //           transition={{ duration: 0.5 }}
// // // // // // // // // // //         >
// // // // // // // // // // //           <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
// // // // // // // // // // //             My Work
// // // // // // // // // // //           </h1>
// // // // // // // // // // //           <p className="mt-6 text-lg text-gray-600">
// // // // // // // // // // //             A selection of projects that showcase my passion for design and
// // // // // // // // // // //             technology.
// // // // // // // // // // //           </p>
// // // // // // // // // // //         </motion.div>

// // // // // // // // // // //         <div className="mt-20">
// // // // // // // // // // //           <FilterBar
// // // // // // // // // // //             categories={categories || []}
// // // // // // // // // // //             activeCategory={activeCategory}
// // // // // // // // // // //             onFilterChange={(slug) => {
// // // // // // // // // // //               setActiveCategory(slug);
// // // // // // // // // // //               setPage(1); // Reset page on filter change
// // // // // // // // // // //             }}
// // // // // // // // // // //             onSearchChange={(query) => {
// // // // // // // // // // //               setSearchQuery(query);
// // // // // // // // // // //               setPage(1); // Reset page on search
// // // // // // // // // // //             }}
// // // // // // // // // // //           />

// // // // // // // // // // //           <AnimatePresence>
// // // // // // // // // // //             {projects.length > 0 && (
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
// // // // // // // // // // //                 variants={gridVariants}
// // // // // // // // // // //                 initial="hidden"
// // // // // // // // // // //                 animate="visible"
// // // // // // // // // // //                 exit="hidden"
// // // // // // // // // // //               >
// // // // // // // // // // //                 {projects.map((project) => (
// // // // // // // // // // //                   <ProjectCard key={project.id} project={project} />
// // // // // // // // // // //                 ))}
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </AnimatePresence>

// // // // // // // // // // //           {loading && (
// // // // // // // // // // //             <div className="flex justify-center mt-16">
// // // // // // // // // // //               <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}

// // // // // // // // // // //           {!loading && hasLoaded.current && projects.length === 0 && (
// // // // // // // // // // //             <motion.div
// // // // // // // // // // //               className="text-center mt-16"
// // // // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //             >
// // // // // // // // // // //               <h3 className="text-2xl font-bold text-gray-900">No Projects Found</h3>
// // // // // // // // // // //               <p className="text-gray-600 mt-2">
// // // // // // // // // // //                 Try adjusting your search or filter.
// // // // // // // // // // //               </p>
// // // // // // // // // // //             </motion.div>
// // // // // // // // // // //           )}
          
// // // // // // // // // // //           <AnimatePresence>
// // // // // // // // // // //             {!loading && hasMore && (
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 className="flex justify-center mt-16"
// // // // // // // // // // //                 initial={{ opacity: 0, y: 50 }}
// // // // // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //                 exit={{ opacity: 0, y: 50 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <motion.button
// // // // // // // // // // //                   onClick={handleLoadMore}
// // // // // // // // // // //                   className="bg-blue-600 text-white px-8 py-3.5 rounded-lg text-lg font-medium shadow-lg"
// // // // // // // // // // //                   whileHover={{ scale: 1.05, y: -2 }}
// // // // // // // // // // //                   whileTap={{ scale: 0.95 }}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   Load More Projects
// // // // // // // // // // //                 </motion.button>
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </AnimatePresence>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Projects;

// // // // // // // // // // // Projects.jsx (Redesigned)
// // // // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // // // import { Search, List, Loader2, RefreshCw } from 'lucide-react';
// // // // // // // // // // import { fetchProjectCategories, fetchProjects } from '../api/projectspage';
// // // // // // // // // // import ProjectCard from '../components/projects/ProjectCard'; // Use the new component
// // // // // // // // // // import { useHomepageData, getStorageUrl } from '../hooks/useHomepageData';

// // // // // // // // // // // --- FilterBar Component (Modernized) ---
// // // // // // // // // // const FilterBar = ({ categories, onFilterChange, onSearchChange, activeCategory }) => {
// // // // // // // // // //   const [searchTerm, setSearchTerm] = useState('');

// // // // // // // // // //   const handleSearch = (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     onSearchChange(searchTerm);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="mb-20">
// // // // // // // // // //       {/* Search Input with a clean, focused design */}
// // // // // // // // // //       <form onSubmit={handleSearch} className="flex max-w-xl mx-auto mb-10 shadow-lg rounded-xl overflow-hidden">
// // // // // // // // // //         <input
// // // // // // // // // //           type="search"
// // // // // // // // // //           placeholder="Search by project name or keyword..."
// // // // // // // // // //           value={searchTerm}
// // // // // // // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // // //           className="flex-grow p-4 text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-shadow duration-200"
// // // // // // // // // //         />
// // // // // // // // // //         <button
// // // // // // // // // //           type="submit"
// // // // // // // // // //           className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition-colors"
// // // // // // // // // //           aria-label="Search Projects"
// // // // // // // // // //         >
// // // // // // // // // //           <Search className="w-6 h-6" />
// // // // // // // // // //         </button>
// // // // // // // // // //       </form>

// // // // // // // // // //       {/* Category Tabs - Scrollable on mobile, Centered on desktop */}
// // // // // // // // // //       <div className="flex justify-center">
// // // // // // // // // //         <div className="flex flex-nowrap overflow-x-auto py-2 space-x-3 sm:space-x-4 max-w-full">
// // // // // // // // // //           {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // // // // // // //             const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
            
// // // // // // // // // //             return (
// // // // // // // // // //               <button
// // // // // // // // // //                 key={slug}
// // // // // // // // // //                 onClick={() => onFilterChange(slug)}
// // // // // // // // // //                 className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ease-out-quad whitespace-nowrap ${
// // // // // // // // // //                   activeCategory === slug
// // // // // // // // // //                     ? 'bg-blue-600 text-white shadow-md shadow-blue-400/50'
// // // // // // // // // //                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // // // //                 }`}
// // // // // // // // // //               >
// // // // // // // // // //                 {name}
// // // // // // // // // //               </button>
// // // // // // // // // //             );
// // // // // // // // // //           })}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // // --- Main Projects Component ---
// // // // // // // // // // const Projects = () => {
// // // // // // // // // //   const { data: categories, loading: loadingCategories } = useHomepageData(
// // // // // // // // // //     fetchProjectCategories,
// // // // // // // // // //     'project_categories'
// // // // // // // // // //   );

// // // // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // // // //   const [page, setPage] = useState(1);
// // // // // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // // // // // //   const [totalCount, setTotalCount] = useState(0);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // // //   const hasLoaded = useRef(false);

// // // // // // // // // //   // Load Projects Logic (Refined for better state management)
// // // // // // // // // //   const loadProjects = useCallback(async (isNewQuery, nextPage) => {
// // // // // // // // // //     setLoading(true);
    
// // // // // // // // // //     const pageToFetch = nextPage || page;
    
// // // // // // // // // //     const { data, count } = await fetchProjects({
// // // // // // // // // //       page: pageToFetch,
// // // // // // // // // //       categorySlug: activeCategory,
// // // // // // // // // //       searchQuery: searchQuery,
// // // // // // // // // //       limit: 9, 
// // // // // // // // // //     });

// // // // // // // // // //     setProjects(prev => {
// // // // // // // // // //         return isNewQuery ? data : [...prev, ...data];
// // // // // // // // // //     });
    
// // // // // // // // // //     setTotalCount(count);
// // // // // // // // // //     setLoading(false);
// // // // // // // // // //     hasLoaded.current = true;
    
// // // // // // // // // //     // Crucially, update page state only AFTER successful fetch if it's NOT a new query
// // // // // // // // // //     if (!isNewQuery) {
// // // // // // // // // //         setPage(pageToFetch);
// // // // // // // // // //     }
// // // // // // // // // //   }, [activeCategory, searchQuery]);
  
// // // // // // // // // //   // Effect 1: Trigger NEW query on filter/search change
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     // Reset page to 1 for a new query
// // // // // // // // // //     setPage(1); 
// // // // // // // // // //     loadProjects(true, 1);
// // // // // // // // // //   }, [activeCategory, searchQuery]); 
  
// // // // // // // // // //   // Effect 2: Trigger LOAD MORE query when user clicks "Load More"
// // // // // // // // // //   const handleLoadMore = () => {
// // // // // // // // // //     const nextPage = page + 1;
// // // // // // // // // //     loadProjects(false, nextPage); // Pass 'false' to append, and the target page
// // // // // // // // // //   };

// // // // // // // // // //   const hasMore = projects.length < totalCount;

// // // // // // // // // //   // Grid Stagger Animation Variants
// // // // // // // // // //   const gridVariants = {
// // // // // // // // // //     hidden: { opacity: 0 },
// // // // // // // // // //     visible: { 
// // // // // // // // // //       opacity: 1, 
// // // // // // // // // //       transition: { 
// // // // // // // // // //         staggerChildren: 0.08, // Subtle stagger for appearance
// // // // // // // // // //         delayChildren: 0.1 
// // // // // // // // // //       } 
// // // // // // // // // //     },
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="py-24 sm:py-32 bg-gray-50 min-h-screen">
// // // // // // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // // // // // // // // //         {/* Animated Header */}
// // // // // // // // // //         <motion.div
// // // // // // // // // //           className="max-w-3xl mx-auto text-center mb-20"
// // // // // // // // // //           initial={{ opacity: 0, y: 30 }}
// // // // // // // // // //           animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //           transition={{ duration: 0.8, ease: "easeOut" }}
// // // // // // // // // //         >
// // // // // // // // // //           <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">My Creative Journey</p>
// // // // // // // // // //           <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 leading-tight">
// // // // // // // // // //             Selected <span className="text-blue-600">Works</span>
// // // // // // // // // //           </h1>
// // // // // // // // // //           <p className="mt-6 text-xl text-gray-600">
// // // // // // // // // //             A curated showcase of my best projects in design, development, and strategy.
// // // // // // // // // //           </p>
// // // // // // // // // //         </motion.div>

// // // // // // // // // //         {/* Filter and Search */}
// // // // // // // // // //         <FilterBar
// // // // // // // // // //           categories={categories || []}
// // // // // // // // // //           activeCategory={activeCategory}
// // // // // // // // // //           onFilterChange={(slug) => {
// // // // // // // // // //             if (activeCategory !== slug) { // Only update if necessary
// // // // // // // // // //               setActiveCategory(slug);
// // // // // // // // // //             }
// // // // // // // // // //           }}
// // // // // // // // // //           onSearchChange={(query) => {
// // // // // // // // // //             if (searchQuery !== query) {
// // // // // // // // // //               setSearchQuery(query);
// // // // // // // // // //             }
// // // // // // // // // //           }}
// // // // // // // // // //         />

// // // // // // // // // //         {/* Projects Grid */}
// // // // // // // // // //         <AnimatePresence mode="wait">
// // // // // // // // // //           {projects.length > 0 && (
// // // // // // // // // //             <motion.div
// // // // // // // // // //               key={activeCategory + searchQuery} // Key changes on filter/search to trigger exit/enter animation
// // // // // // // // // //               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
// // // // // // // // // //               variants={gridVariants}
// // // // // // // // // //               initial="hidden"
// // // // // // // // // //               animate="visible"
// // // // // // // // // //               exit="hidden"
// // // // // // // // // //             >
// // // // // // // // // //               {projects.map((project) => (
// // // // // // // // // //                 // ProjectCard handles its own entry animation
// // // // // // // // // //                 <ProjectCard key={project.id} project={project} />
// // // // // // // // // //               ))}
// // // // // // // // // //             </motion.div>
// // // // // // // // // //           )}
// // // // // // // // // //         </AnimatePresence>

// // // // // // // // // //         {/* Loading and Empty State */}
// // // // // // // // // //         {loading && (
// // // // // // // // // //           <div className="flex justify-center mt-20">
// // // // // // // // // //             <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
// // // // // // // // // //           </div>
// // // // // // // // // //         )}

// // // // // // // // // //         {!loading && hasLoaded.current && projects.length === 0 && (
// // // // // // // // // //           <motion.div
// // // // // // // // // //             className="text-center mt-20 p-10 border border-gray-200 rounded-xl bg-white"
// // // // // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // // // //             transition={{ duration: 0.5 }}
// // // // // // // // // //           >
// // // // // // // // // //             <RefreshCw className="w-10 h-10 text-gray-400 mx-auto mb-4" />
// // // // // // // // // //             <h3 className="text-2xl font-bold text-gray-900">No Matching Projects</h3>
// // // // // // // // // //             <p className="text-gray-600 mt-2">
// // // // // // // // // //               We couldn't find any work matching your current filter and search criteria.
// // // // // // // // // //             </p>
// // // // // // // // // //             <button
// // // // // // // // // //                 onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
// // // // // // // // // //                 className="mt-6 text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
// // // // // // // // // //             >
// // // // // // // // // //                 <RefreshCw className="w-4 h-4 mr-1" /> Clear Filters
// // // // // // // // // //             </button>
// // // // // // // // // //           </motion.div>
// // // // // // // // // //         )}
        
// // // // // // // // // //         {/* Load More Button */}
// // // // // // // // // //         <AnimatePresence>
// // // // // // // // // //           {!loading && hasMore && (
// // // // // // // // // //             <motion.div
// // // // // // // // // //               className="flex justify-center mt-20"
// // // // // // // // // //               initial={{ opacity: 0, y: 50 }}
// // // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //               exit={{ opacity: 0, y: 50 }}
// // // // // // // // // //               transition={{ type: "spring", stiffness: 100, damping: 10 }}
// // // // // // // // // //             >
// // // // // // // // // //               <motion.button
// // // // // // // // // //                 onClick={handleLoadMore}
// // // // // // // // // //                 className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-xl hover:bg-blue-700 transition-colors"
// // // // // // // // // //                 whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px rgba(59, 130, 246, 0.5)' }}
// // // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // // //                 disabled={loading}
// // // // // // // // // //               >
// // // // // // // // // //                 Show More ({totalCount - projects.length} left)
// // // // // // // // // //               </motion.button>
// // // // // // // // // //             </motion.div>
// // // // // // // // // //           )}
// // // // // // // // // //         </AnimatePresence>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Projects;


// // // // // // // // // // Projects.jsx (Final Advanced Version with Tier Filter)
// // // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // // import { Search, Loader2, List, Layers, ShieldCheck } from 'lucide-react';
// // // // // // // // // // Import the new fetchProjectTiers function
// // // // // // // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // // // // // // import ProjectCard from '../components/projects/ProjectCard'; 
// // // // // // // // // import { useHomepageData } from '../hooks/useHomepageData'; 

// // // // // // // // // // Assuming you have ProjectCard.jsx defined from the previous response

// // // // // // // // // // --- Filter & Search Combined Component ---
// // // // // // // // // const ProjectsFilterSection = ({ 
// // // // // // // // //   categories, 
// // // // // // // // //   tools,
// // // // // // // // //   tiers, // <<< NEW PROP
// // // // // // // // //   activeCategory, 
// // // // // // // // //   activeToolId, 
// // // // // // // // //   activeTierId, // <<< NEW PROP
// // // // // // // // //   onFilterChange, 
// // // // // // // // //   onToolChange, 
// // // // // // // // //   onTierChange, // <<< NEW HANDLER
// // // // // // // // //   onSearchChange 
// // // // // // // // // }) => {
// // // // // // // // //   const [searchTerm, setSearchTerm] = useState('');

// // // // // // // // //   const handleSearch = (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     onSearchChange(searchTerm);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <motion.div 
// // // // // // // // //         initial={{ opacity: 0, y: 20 }}
// // // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // // //         transition={{ duration: 0.5, delay: 0.1 }}
// // // // // // // // //         className="mb-20"
// // // // // // // // //     >
// // // // // // // // //       {/* Search Input */}
// // // // // // // // //       <form onSubmit={handleSearch} className="flex max-w-3xl mx-auto mb-16 shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-200">
// // // // // // // // //         <input
// // // // // // // // //           type="search"
// // // // // // // // //           placeholder="Search projects by title or keyword..."
// // // // // // // // //           value={searchTerm}
// // // // // // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // //           className="flex-grow p-5 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-shadow duration-200 text-lg"
// // // // // // // // //         />
// // // // // // // // //         <button
// // // // // // // // //           type="submit"
// // // // // // // // //           className="bg-blue-600 text-white p-5 hover:bg-blue-700 transition-colors"
// // // // // // // // //           aria-label="Search Projects"
// // // // // // // // //         >
// // // // // // // // //           <Search className="w-6 h-6" />
// // // // // // // // //         </button>
// // // // // // // // //       </form>

// // // // // // // // //       {/* --- Filter Tabs Container --- */}
// // // // // // // // //       <div className="flex flex-col lg:flex-row justify-center lg:space-x-12 space-y-12 lg:space-y-0">

// // // // // // // // //           {/* Primary Category Filter */}
// // // // // // // // //           <div className="text-center lg:w-1/3">
// // // // // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
// // // // // // // // //                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by **Category**
// // // // // // // // //             </h3>
// // // // // // // // //             <div className="flex justify-center flex-wrap gap-3 max-h-48 overflow-y-auto p-2">
// // // // // // // // //               {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // // // // // //                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // // // // // // //                 return (
// // // // // // // // //                   <motion.button
// // // // // // // // //                     key={slug}
// // // // // // // // //                     onClick={() => onFilterChange(slug)}
// // // // // // // // //                     className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-out-quad whitespace-nowrap ${
// // // // // // // // //                       activeCategory === slug
// // // // // // // // //                         ? 'bg-blue-600 text-white shadow-md shadow-blue-400/50'
// // // // // // // // //                         : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
// // // // // // // // //                     }`}
// // // // // // // // //                     whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
// // // // // // // // //                   >
// // // // // // // // //                     {name}
// // // // // // // // //                   </motion.button>
// // // // // // // // //                 );
// // // // // // // // //               })}
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           {/* Tier Filter (NEW) */}
// // // // // // // // //           <div className="text-center lg:w-1/3 border-l lg:border-r border-gray-200 lg:px-6">
// // // // // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
// // // // // // // // //                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by **Tier**
// // // // // // // // //             </h3>
// // // // // // // // //             <div className="flex justify-center flex-wrap gap-3">
// // // // // // // // //                 <motion.button
// // // // // // // // //                     onClick={() => onTierChange(null)}
// // // // // // // // //                     className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                       activeTierId === null
// // // // // // // // //                         ? 'bg-red-600 text-white shadow-md'
// // // // // // // // //                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // // //                     }`}
// // // // // // // // //                     whileHover={{ scale: 1.05 }}
// // // // // // // // //                 >
// // // // // // // // //                     All Tiers
// // // // // // // // //                 </motion.button>
// // // // // // // // //                 {tiers.map((tier) => (
// // // // // // // // //                     <motion.button
// // // // // // // // //                         key={tier.id}
// // // // // // // // //                         onClick={() => onTierChange(tier.id)}
// // // // // // // // //                         // Use inline style for color from DB
// // // // // // // // //                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // // // // // // //                         className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                             activeTierId !== tier.id
// // // // // // // // //                               ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // // //                               : 'shadow-md'
// // // // // // // // //                           }`}
// // // // // // // // //                           whileHover={{ scale: 1.05 }}
// // // // // // // // //                     >
// // // // // // // // //                         {tier.name}
// // // // // // // // //                     </motion.button>
// // // // // // // // //                 ))}
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           {/* Tool Filter (Existing) */}
// // // // // // // // //           <div className="text-center lg:w-1/3">
// // // // // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
// // // // // // // // //                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by **Technology**
// // // // // // // // //             </h3>
// // // // // // // // //             <div className="flex justify-center flex-wrap gap-3 max-h-48 overflow-y-auto p-2">
// // // // // // // // //                 <motion.button
// // // // // // // // //                     onClick={() => onToolChange(null)}
// // // // // // // // //                     className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                       activeToolId === null
// // // // // // // // //                         ? 'bg-green-600 text-white'
// // // // // // // // //                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // // //                     }`}
// // // // // // // // //                     whileHover={{ scale: 1.05 }}
// // // // // // // // //                 >
// // // // // // // // //                     Any Tool
// // // // // // // // //                 </motion.button>
// // // // // // // // //                 {tools.map((tool) => (
// // // // // // // // //                     <motion.button
// // // // // // // // //                         key={tool.id}
// // // // // // // // //                         onClick={() => onToolChange(tool.id)}
// // // // // // // // //                         className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                             activeToolId === tool.id
// // // // // // // // //                               ? 'bg-green-600 text-white shadow-sm'
// // // // // // // // //                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // // //                           }`}
// // // // // // // // //                           whileHover={{ scale: 1.05 }}
// // // // // // // // //                     >
// // // // // // // // //                         {tool.name}
// // // // // // // // //                     </motion.button>
// // // // // // // // //                 ))}
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //       </div>
// // // // // // // // //     </motion.div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // // --- Main Projects Component ---
// // // // // // // // // const Projects = () => {
// // // // // // // // //   // Fetch all filter data
// // // // // // // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // // // // // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // // // // // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); // <<< NEW FETCH

// // // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // // //   const [page, setPage] = useState(1);
// // // // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // // // // // // //   const [activeTierId, setActiveTierId] = useState(null); // <<< NEW STATE
// // // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // // // // //   const [totalCount, setTotalCount] = useState(0);
// // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // //   const hasLoaded = useRef(false);

// // // // // // // // //   // Load Projects Logic (Unified with all filters)
// // // // // // // // //   const loadProjects = useCallback(async (isNewQuery, nextPage) => {
// // // // // // // // //     setLoading(true);
    
// // // // // // // // //     const pageToFetch = nextPage || page;
    
// // // // // // // // //     const { data, count } = await fetchProjects({
// // // // // // // // //       page: pageToFetch,
// // // // // // // // //       categorySlug: activeCategory,
// // // // // // // // //       searchQuery: searchQuery,
// // // // // // // // //       toolId: activeToolId,
// // // // // // // // //       tierId: activeTierId, // <<< PASS NEW FILTER
// // // // // // // // //       limit: 9, 
// // // // // // // // //     });

// // // // // // // // //     setProjects(prev => (isNewQuery ? data : [...prev, ...data]));
// // // // // // // // //     setTotalCount(count);
// // // // // // // // //     setLoading(false);
// // // // // // // // //     hasLoaded.current = true;
    
// // // // // // // // //     if (!isNewQuery) {
// // // // // // // // //         setPage(pageToFetch);
// // // // // // // // //     }
// // // // // // // // //   }, [page, activeCategory, searchQuery, activeToolId, activeTierId]); // <<< DEPENDENCY UPDATE
  
// // // // // // // // //   // Effect: Trigger NEW query on ANY filter/search change
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     setPage(1); 
// // // // // // // // //     loadProjects(true, 1);
// // // // // // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]); // <<< DEPENDENCY UPDATE
  
// // // // // // // // //   // Load More Handler
// // // // // // // // //   const handleLoadMore = () => {
// // // // // // // // //     const nextPage = page + 1;
// // // // // // // // //     loadProjects(false, nextPage);
// // // // // // // // //   };

// // // // // // // // //   const hasMore = projects.length < totalCount;

// // // // // // // // //   // Grid Stagger Animation Variants
// // // // // // // // //   const gridVariants = {
// // // // // // // // //     hidden: { opacity: 0 },
// // // // // // // // //     visible: { 
// // // // // // // // //       opacity: 1, 
// // // // // // // // //       transition: { 
// // // // // // // // //         staggerChildren: 0.1, 
// // // // // // // // //         delayChildren: 0.2
// // // // // // // // //       } 
// // // // // // // // //     },
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="py-24 sm:py-32 bg-gray-50 min-h-screen">
// // // // // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // // // // // // // //         {/* Animated Header */}
// // // // // // // // //         <motion.div
// // // // // // // // //           className="max-w-4xl mx-auto text-center mb-24"
// // // // // // // // //           initial={{ opacity: 0, y: 30 }}
// // // // // // // // //           animate={{ opacity: 1, y: 0 }}
// // // // // // // // //           transition={{ duration: 0.8, ease: [0.2, 0.6, 0.3, 1] }}
// // // // // // // // //         >
// // // // // // // // //           <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">Portfolio Showcase</p>
// // // // // // // // //           <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-900 leading-none">
// // // // // // // // //             Advanced <span className="text-blue-600 relative inline-block">
// // // // // // // // //                 Work
// // // // // // // // //                 <motion.span 
// // // // // // // // //                     className="absolute left-0 bottom-0 h-1 bg-blue-600 w-full" 
// // // // // // // // //                     initial={{ scaleX: 0 }} 
// // // // // // // // //                     animate={{ scaleX: 1 }} 
// // // // // // // // //                     transition={{ delay: 0.9, duration: 0.5 }} 
// // // // // // // // //                 />
// // // // // // // // //             </span>
// // // // // // // // //           </h1>
// // // // // // // // //           <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto">
// // // // // // // // //             A dynamic, multi-faceted portfolio that adapts to your filtering needs.
// // // // // // // // //           </p>
// // // // // // // // //         </motion.div>

// // // // // // // // //         {/* Multi-Filter and Search Section */}
// // // // // // // // //         <ProjectsFilterSection
// // // // // // // // //           categories={categories || []}
// // // // // // // // //           tools={tools || []}
// // // // // // // // //           tiers={tiers || []} // <<< PASS TIERS
// // // // // // // // //           activeCategory={activeCategory}
// // // // // // // // //           activeToolId={activeToolId}
// // // // // // // // //           activeTierId={activeTierId} // <<< PASS ACTIVE TIER
// // // // // // // // //           onFilterChange={(slug) => {
// // // // // // // // //             if (activeCategory !== slug) { setActiveCategory(slug); }
// // // // // // // // //           }}
// // // // // // // // //           onToolChange={(id) => {
// // // // // // // // //             if (activeToolId !== id) { setActiveToolId(id); }
// // // // // // // // //           }}
// // // // // // // // //           onTierChange={(id) => { // <<< NEW HANDLER
// // // // // // // // //             if (activeTierId !== id) { setActiveTierId(id); }
// // // // // // // // //           }}
// // // // // // // // //           onSearchChange={(query) => {
// // // // // // // // //             if (searchQuery !== query) { setSearchQuery(query); }
// // // // // // // // //           }}
// // // // // // // // //         />

// // // // // // // // //         {/* Projects Grid with Exit/Enter Transitions */}
// // // // // // // // //         <AnimatePresence mode="wait">
// // // // // // // // //           {projects.length > 0 && (
// // // // // // // // //             <motion.div
// // // // // // // // //               key={activeCategory + searchQuery + activeToolId + activeTierId} // <<< KEY UPDATE
// // // // // // // // //               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14"
// // // // // // // // //               variants={gridVariants}
// // // // // // // // //               initial="hidden"
// // // // // // // // //               animate="visible"
// // // // // // // // //               exit="hidden"
// // // // // // // // //             >
// // // // // // // // //               {projects.map((project) => (
// // // // // // // // //                 <ProjectCard key={project.id} project={project} />
// // // // // // // // //               ))}
// // // // // // // // //             </motion.div>
// // // // // // // // //           )}
// // // // // // // // //         </AnimatePresence>

// // // // // // // // //         {/* Loading and Empty State */}
// // // // // // // // //         {loading && (
// // // // // // // // //           <motion.div 
// // // // // // // // //             className="flex justify-center mt-20"
// // // // // // // // //             initial={{ opacity: 0 }}
// // // // // // // // //             animate={{ opacity: 1 }}
// // // // // // // // //           >
// // // // // // // // //             <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
// // // // // // // // //           </motion.div>
// // // // // // // // //         )}

// // // // // // // // //         {!loading && hasLoaded.current && projects.length === 0 && (
// // // // // // // // //           <motion.div
// // // // // // // // //             className="text-center mt-20 p-12 border border-blue-200 rounded-2xl bg-white shadow-lg"
// // // // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // // //             transition={{ type: "spring", stiffness: 100 }}
// // // // // // // // //           >
// // // // // // // // //             <h3 className="text-3xl font-bold text-gray-900">Zero Matches Found</h3>
// // // // // // // // //             <p className="text-lg text-gray-600 mt-3">
// // // // // // // // //               No projects matched the current combination of category, tool, and tier filters.
// // // // // // // // //             </p>
// // // // // // // // //             <button
// // // // // // // // //                 onClick={() => { setActiveCategory('all'); setSearchQuery(''); setActiveToolId(null); setActiveTierId(null); }}
// // // // // // // // //                 className="mt-6 bg-blue-50 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors inline-flex items-center shadow-md"
// // // // // // // // //             >
// // // // // // // // //                 Clear All Filters
// // // // // // // // //             </button>
// // // // // // // // //           </motion.div>
// // // // // // // // //         )}
        
// // // // // // // // //         {/* Load More Button */}
// // // // // // // // //         <AnimatePresence>
// // // // // // // // //           {!loading && hasMore && (
// // // // // // // // //             <motion.div
// // // // // // // // //               className="flex justify-center mt-24"
// // // // // // // // //               initial={{ opacity: 0, y: 50 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               exit={{ opacity: 0, y: 50 }}
// // // // // // // // //               transition={{ type: "spring", stiffness: 80, damping: 10 }}
// // // // // // // // //             >
// // // // // // // // //               <motion.button
// // // // // // // // //                 onClick={handleLoadMore}
// // // // // // // // //                 className="bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl hover:bg-blue-700 transition-colors disabled:opacity-50"
// // // // // // // // //                 whileHover={{ scale: 1.05, y: -4, boxShadow: '0 15px 30px rgba(59, 130, 246, 0.4)' }}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //                 disabled={loading}
// // // // // // // // //               >
// // // // // // // // //                 Load More Projects
// // // // // // // // //               </motion.button>
// // // // // // // // //             </motion.div>
// // // // // // // // //           )}
// // // // // // // // //         </AnimatePresence>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Projects;
// // // // // // // // // Projects.jsx (Advanced Layout and Filter Integration)
// // // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // // import { Search, Loader2, List, Layers, Filter, ShieldCheck, X } from 'lucide-react';
// // // // // // // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // // // // // // import ProjectCard from '../components/projects/ProjectCard'; 
// // // // // // // // // import { useHomepageData } from '../hooks/useHomepageData'; 

// // // // // // // // // // --- Filter Panel Component ---
// // // // // // // // // const FilterPanel = ({ 
// // // // // // // // //   categories, tools, tiers,
// // // // // // // // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // // // // // // // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // // // // // // // //   onClose,
// // // // // // // // // }) => {
// // // // // // // // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // // // // // // // //   const handleSearch = (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     onSearchChange(localSearch);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <motion.div 
// // // // // // // // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // // // // // // // //       initial={{ x: '100%' }}
// // // // // // // // //       animate={{ x: 0 }}
// // // // // // // // //       exit={{ x: '100%' }}
// // // // // // // // //       transition={{ type: 'tween', duration: 0.4 }}
// // // // // // // // //     >
// // // // // // // // //       <div className="flex justify-between items-center mb-10 border-b pb-4">
// // // // // // // // //         <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // // // // // // // //             <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // // // // // // // //         </h2>
// // // // // // // // //         <motion.button 
// // // // // // // // //             onClick={onClose} 
// // // // // // // // //             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // // // // // // // //             whileHover={{ rotate: 90 }}
// // // // // // // // //         >
// // // // // // // // //             <X className="w-6 h-6" />
// // // // // // // // //         </motion.button>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 1. Search Bar */}
// // // // // // // // //       <form onSubmit={handleSearch} className="mb-10">
// // // // // // // // //         <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // // // // // // // //         <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // // // // // // //           <input
// // // // // // // // //             type="search"
// // // // // // // // //             placeholder="Type and hit Enter..."
// // // // // // // // //             value={localSearch}
// // // // // // // // //             onChange={(e) => setLocalSearch(e.target.value)}
// // // // // // // // //             className="flex-grow p-3 focus:outline-none"
// // // // // // // // //           />
// // // // // // // // //           <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // // // // // // // //             <Search className="w-5 h-5" />
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </form>

// // // // // // // // //       {/* 2. Category Filter */}
// // // // // // // // //       <div className="mb-10">
// // // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // // //             <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // // // // // // // //         </h3>
// // // // // // // // //         <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // // // //           {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // // // // // //             const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // // // // // // //             return (
// // // // // // // // //               <motion.button
// // // // // // // // //                 key={slug}
// // // // // // // // //                 onClick={() => onFilterChange(slug)}
// // // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // // // // // // // //                   activeCategory === slug
// // // // // // // // //                     ? 'bg-blue-600 text-white shadow-md'
// // // // // // // // //                     : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // // // //                 }`}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //               >
// // // // // // // // //                 {name}
// // // // // // // // //               </motion.button>
// // // // // // // // //             );
// // // // // // // // //           })}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 3. Tier Filter */}
// // // // // // // // //       <div className="mb-10">
// // // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // // //             <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // // // // // // // //         </h3>
// // // // // // // // //         <div className="flex flex-wrap gap-2">
// // // // // // // // //             <motion.button
// // // // // // // // //                 onClick={() => onTierChange(null)}
// // // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                   activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // // //                 }`}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //             >
// // // // // // // // //                 All Tiers
// // // // // // // // //             </motion.button>
// // // // // // // // //             {tiers.map((tier) => (
// // // // // // // // //                 <motion.button
// // // // // // // // //                     key={tier.id}
// // // // // // // // //                     onClick={() => onTierChange(tier.id)}
// // // // // // // // //                     style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // // // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // // // //                 >
// // // // // // // // //                     {tier.name}
// // // // // // // // //                 </motion.button>
// // // // // // // // //             ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 4. Tool Filter */}
// // // // // // // // //       <div>
// // // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // // //             <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // // // // // // // //         </h3>
// // // // // // // // //         <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // // // //             <motion.button
// // // // // // // // //                 onClick={() => onToolChange(null)}
// // // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                   activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // // // //                 }`}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //             >
// // // // // // // // //                 Any Tool
// // // // // // // // //             </motion.button>
// // // // // // // // //             {tools.map((tool) => (
// // // // // // // // //                 <motion.button
// // // // // // // // //                     key={tool.id}
// // // // // // // // //                     onClick={() => onToolChange(tool.id)}
// // // // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // // // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // // // //                 >
// // // // // // // // //                     {tool.name}
// // // // // // // // //                 </motion.button>
// // // // // // // // //             ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </motion.div>
// // // // // // // // //   );
// // // // // // // // // };


// // // // // // // // // // --- Main Projects Component ---
// // // // // // // // // const Projects = () => {
// // // // // // // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // // // // // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // // // // // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // // //   const [page, setPage] = useState(1);
// // // // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // // // // // // //   const [activeTierId, setActiveTierId] = useState(null);
// // // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // // // // //   const [totalCount, setTotalCount] = useState(0);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [isFilterOpen, setIsFilterOpen] = useState(false); // New state for panel
  
// // // // // // // // //   const hasLoaded = useRef(false);

// // // // // // // // //   // Load Projects Logic (Unified)
// // // // // // // // //   const loadProjects = useCallback(async (isNewQuery, nextPage) => {
// // // // // // // // //     setLoading(true);
// // // // // // // // //     const pageToFetch = nextPage || page;
    
// // // // // // // // //     const { data, count } = await fetchProjects({
// // // // // // // // //       page: pageToFetch,
// // // // // // // // //       categorySlug: activeCategory,
// // // // // // // // //       searchQuery: searchQuery,
// // // // // // // // //       toolId: activeToolId,
// // // // // // // // //       tierId: activeTierId, 
// // // // // // // // //       limit: 9, 
// // // // // // // // //     });

// // // // // // // // //     setProjects(prev => (isNewQuery ? data : [...prev, ...data]));
// // // // // // // // //     setTotalCount(count);
// // // // // // // // //     setLoading(false);
// // // // // // // // //     hasLoaded.current = true;
    
// // // // // // // // //     if (!isNewQuery) {
// // // // // // // // //         setPage(pageToFetch);
// // // // // // // // //     }
// // // // // // // // //   }, [page, activeCategory, searchQuery, activeToolId, activeTierId]);
  
// // // // // // // // //   // Effect: Trigger NEW query on ANY filter/search change
// // // // // // // // //   // By passing `activeCategory`, etc. to the dependency array, React ensures the logic runs whenever those values change.
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     // Reset page to 1 and fetch new data
// // // // // // // // //     setPage(1); 
// // // // // // // // //     loadProjects(true, 1);
// // // // // // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]); 
  
// // // // // // // // //   const handleLoadMore = () => {
// // // // // // // // //     const nextPage = page + 1;
// // // // // // // // //     loadProjects(false, nextPage);
// // // // // // // // //   };

// // // // // // // // //   const hasMore = projects.length < totalCount;

// // // // // // // // //   return (
// // // // // // // // //     <div className="py-24 sm:py-32 bg-gray-50 min-h-screen relative">
// // // // // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
// // // // // // // // //         {/* Header & Filter Button */}
// // // // // // // // //         <div className="flex justify-between items-center max-w-5xl mx-auto mb-20">
// // // // // // // // //             <motion.div
// // // // // // // // //                 initial={{ opacity: 0, y: 30 }}
// // // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // // //                 transition={{ duration: 0.8 }}
// // // // // // // // //             >
// // // // // // // // //                 <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
// // // // // // // // //                     Dynamic <span className="text-blue-600">Works</span>
// // // // // // // // //                 </h1>
// // // // // // // // //                 <p className="mt-2 text-xl text-gray-600">A dynamic, multi-faceted portfolio.</p>
// // // // // // // // //             </motion.div>

// // // // // // // // //             <motion.button
// // // // // // // // //                 onClick={() => setIsFilterOpen(true)}
// // // // // // // // //                 className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // // // // // // // //                 whileHover={{ scale: 1.05 }}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //             >
// // // // // // // // //                 <Filter className="w-5 h-5 mr-2" /> Filters
// // // // // // // // //             </motion.button>
// // // // // // // // //         </div>

// // // // // // // // //         {/* --- Diagonal Stacked Projects Grid --- */}
// // // // // // // // //         <div className="relative w-full min-h-[600px] mb-24 flex justify-center pt-20">
// // // // // // // // //             <AnimatePresence mode="wait">
// // // // // // // // //                 {loading && (
// // // // // // // // //                     <motion.div 
// // // // // // // // //                         key="loader"
// // // // // // // // //                         className="absolute inset-0 flex justify-center items-center"
// // // // // // // // //                         initial={{ opacity: 0 }}
// // // // // // // // //                         animate={{ opacity: 1 }}
// // // // // // // // //                         exit={{ opacity: 0 }}
// // // // // // // // //                     >
// // // // // // // // //                         <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
// // // // // // // // //                     </motion.div>
// // // // // // // // //                 )}
                
// // // // // // // // //                 {(!loading && projects.length > 0) && (
// // // // // // // // //                     <motion.div
// // // // // // // // //                         key="projects-grid"
// // // // // // // // //                         className="relative w-full max-w-xl" // Container for the stacked effect
// // // // // // // // //                         initial={{ opacity: 0 }}
// // // // // // // // //                         animate={{ opacity: 1 }}
// // // // // // // // //                         exit={{ opacity: 0 }}
// // // // // // // // //                     >
// // // // // // // // //                         {projects.map((project, index) => (
// // // // // // // // //                             <ProjectCard 
// // // // // // // // //                                 key={project.id} 
// // // // // // // // //                                 project={project} 
// // // // // // // // //                                 index={index} 
// // // // // // // // //                             />
// // // // // // // // //                         ))}
// // // // // // // // //                     </motion.div>
// // // // // // // // //                 )}
// // // // // // // // //             </AnimatePresence>

// // // // // // // // //             {/* Empty State */}
// // // // // // // // //             {!loading && hasLoaded.current && projects.length === 0 && (
// // // // // // // // //                 <motion.div
// // // // // // // // //                     key="empty-state"
// // // // // // // // //                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-12 bg-white rounded-2xl shadow-xl"
// // // // // // // // //                     initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // // //                     animate={{ opacity: 1, scale: 1 }}
// // // // // // // // //                     exit={{ opacity: 0 }}
// // // // // // // // //                 >
// // // // // // // // //                     <h3 className="text-2xl font-bold text-gray-900">No Projects Found</h3>
// // // // // // // // //                     <p className="text-gray-600 mt-2">Try adjusting your filter settings.</p>
// // // // // // // // //                 </motion.div>
// // // // // // // // //             )}
// // // // // // // // //         </div>


// // // // // // // // //         {/* Load More Button */}
// // // // // // // // //         <AnimatePresence>
// // // // // // // // //           {!loading && hasMore && (
// // // // // // // // //             <motion.div
// // // // // // // // //               className="flex justify-center mt-32"
// // // // // // // // //               initial={{ opacity: 0, y: 50 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               exit={{ opacity: 0, y: 50 }}
// // // // // // // // //               transition={{ type: "spring", stiffness: 80, damping: 10 }}
// // // // // // // // //             >
// // // // // // // // //               <motion.button
// // // // // // // // //                 onClick={handleLoadMore}
// // // // // // // // //                 className="bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl hover:bg-blue-700 transition-colors disabled:opacity-50"
// // // // // // // // //                 whileHover={{ scale: 1.05, y: -4, boxShadow: '0 15px 30px rgba(59, 130, 246, 0.4)' }}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //                 disabled={loading}
// // // // // // // // //               >
// // // // // // // // //                 Load More Projects
// // // // // // // // //               </motion.button>
// // // // // // // // //             </motion.div>
// // // // // // // // //           )}
// // // // // // // // //         </AnimatePresence>
// // // // // // // // //       </div>
      
// // // // // // // // //       {/* --- Filter Panel Modal --- */}
// // // // // // // // //       <AnimatePresence>
// // // // // // // // //         {isFilterOpen && (
// // // // // // // // //           <FilterPanel
// // // // // // // // //             categories={categories || []}
// // // // // // // // //             tools={tools || []}
// // // // // // // // //             tiers={tiers || []}
// // // // // // // // //             activeCategory={activeCategory}
// // // // // // // // //             activeToolId={activeToolId}
// // // // // // // // //             activeTierId={activeTierId}
// // // // // // // // //             searchQuery={searchQuery}
// // // // // // // // //             onFilterChange={(slug) => {
// // // // // // // // //               setActiveCategory(slug);
// // // // // // // // //               setIsFilterOpen(false); // Close after selection
// // // // // // // // //             }}
// // // // // // // // //             onToolChange={(id) => {
// // // // // // // // //               setActiveToolId(id);
// // // // // // // // //               setIsFilterOpen(false); // Close after selection
// // // // // // // // //             }}
// // // // // // // // //             onTierChange={(id) => {
// // // // // // // // //               setActiveTierId(id);
// // // // // // // // //               setIsFilterOpen(false); // Close after selection
// // // // // // // // //             }}
// // // // // // // // //             onSearchChange={(query) => {
// // // // // // // // //               if (searchQuery !== query) {
// // // // // // // // //                 setSearchQuery(query);
// // // // // // // // //                 setIsFilterOpen(false); // Close after search
// // // // // // // // //               }
// // // // // // // // //             }}
// // // // // // // // //             onClose={() => setIsFilterOpen(false)}
// // // // // // // // //           />
// // // // // // // // //         )}
// // // // // // // // //       </AnimatePresence>
      
// // // // // // // // //       {/* Background overlay when filter is open */}
// // // // // // // // //       <AnimatePresence>
// // // // // // // // //         {isFilterOpen && (
// // // // // // // // //             <motion.div
// // // // // // // // //                 className="fixed inset-0 bg-black/50 z-40"
// // // // // // // // //                 initial={{ opacity: 0 }}
// // // // // // // // //                 animate={{ opacity: 1 }}
// // // // // // // // //                 exit={{ opacity: 0 }}
// // // // // // // // //                 onClick={() => setIsFilterOpen(false)}
// // // // // // // // //             />
// // // // // // // // //         )}
// // // // // // // // //       </AnimatePresence>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Projects;



// // // // // // // // // // Projects.jsx (Dashboard Scroll Layout)
// // // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // // import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
// // // // // // // // // import { Filter, X, Zap } from 'lucide-react';
// // // // // // // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // // // // // // import DashboardCard from '../components/projects/DashboardCard'; 
// // // // // // // // // import { useHomepageData } from '../hooks/useHomepageData'; 

// // // // // // // // // // --- Filter Panel Component (Simplified/Kept off-screen for this unique layout) ---
// // // // // // // // // // (We will omit the full FilterPanel code to keep the file focused on the layout, 
// // // // // // // // // // but ensure the state and handlers are available.)

// // // // // // // // // const FilterPanel = ({ 
// // // // // // // // //   categories, tools, tiers,
// // // // // // // // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // // // // // // // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // // // // // // // //   onClose,
// // // // // // // // // }) => {
// // // // // // // // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // // // // // // // //   const handleSearch = (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     onSearchChange(localSearch);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <motion.div 
// // // // // // // // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // // // // // // // //       initial={{ x: '100%' }}
// // // // // // // // //       animate={{ x: 0 }}
// // // // // // // // //       exit={{ x: '100%' }}
// // // // // // // // //       transition={{ type: 'tween', duration: 0.4 }}
// // // // // // // // //     >
// // // // // // // // //       <div className="flex justify-between items-center mb-10 border-b pb-4">
// // // // // // // // //         <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // // // // // // // //             <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // // // // // // // //         </h2>
// // // // // // // // //         <motion.button 
// // // // // // // // //             onClick={onClose} 
// // // // // // // // //             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // // // // // // // //             whileHover={{ rotate: 90 }}
// // // // // // // // //         >
// // // // // // // // //             <X className="w-6 h-6" />
// // // // // // // // //         </motion.button>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 1. Search Bar */}
// // // // // // // // //       <form onSubmit={handleSearch} className="mb-10">
// // // // // // // // //         <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // // // // // // // //         <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // // // // // // //           <input
// // // // // // // // //             type="search"
// // // // // // // // //             placeholder="Type and hit Enter..."
// // // // // // // // //             value={localSearch}
// // // // // // // // //             onChange={(e) => setLocalSearch(e.target.value)}
// // // // // // // // //             className="flex-grow p-3 focus:outline-none"
// // // // // // // // //           />
// // // // // // // // //           <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // // // // // // // //             <Search className="w-5 h-5" />
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </form>

// // // // // // // // //       {/* 2. Category Filter */}
// // // // // // // // //       <div className="mb-10">
// // // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // // //             <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // // // // // // // //         </h3>
// // // // // // // // //         <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // // // //           {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // // // // // //             const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // // // // // // //             return (
// // // // // // // // //               <motion.button
// // // // // // // // //                 key={slug}
// // // // // // // // //                 onClick={() => onFilterChange(slug)}
// // // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // // // // // // // //                   activeCategory === slug
// // // // // // // // //                     ? 'bg-blue-600 text-white shadow-md'
// // // // // // // // //                     : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // // // //                 }`}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //               >
// // // // // // // // //                 {name}
// // // // // // // // //               </motion.button>
// // // // // // // // //             );
// // // // // // // // //           })}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 3. Tier Filter */}
// // // // // // // // //       <div className="mb-10">
// // // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // // //             <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // // // // // // // //         </h3>
// // // // // // // // //         <div className="flex flex-wrap gap-2">
// // // // // // // // //             <motion.button
// // // // // // // // //                 onClick={() => onTierChange(null)}
// // // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                   activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // // //                 }`}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //             >
// // // // // // // // //                 All Tiers
// // // // // // // // //             </motion.button>
// // // // // // // // //             {tiers.map((tier) => (
// // // // // // // // //                 <motion.button
// // // // // // // // //                     key={tier.id}
// // // // // // // // //                     onClick={() => onTierChange(tier.id)}
// // // // // // // // //                     style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // // // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // // // //                 >
// // // // // // // // //                     {tier.name}
// // // // // // // // //                 </motion.button>
// // // // // // // // //             ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 4. Tool Filter */}
// // // // // // // // //       <div>
// // // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // // //             <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // // // // // // // //         </h3>
// // // // // // // // //         <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // // // //             <motion.button
// // // // // // // // //                 onClick={() => onToolChange(null)}
// // // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // // // //                   activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // // // //                 }`}
// // // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // // //             >
// // // // // // // // //                 Any Tool
// // // // // // // // //             </motion.button>
// // // // // // // // //             {tools.map((tool) => (
// // // // // // // // //                 <motion.button
// // // // // // // // //                     key={tool.id}
// // // // // // // // //                     onClick={() => onToolChange(tool.id)}
// // // // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // // // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // // // //                 >
// // // // // // // // //                     {tool.name}
// // // // // // // // //                 </motion.button>
// // // // // // // // //             ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </motion.div>
// // // // // // // // //   );
// // // // // // // // // };


// // // // // // // // // const Projects = () => {
// // // // // // // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // // // // // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // // // // // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
// // // // // // // // //   // Filtering states (kept for functionality, though not visible in this layout)
// // // // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // // // // // // //   const [activeTierId, setActiveTierId] = useState(null);
// // // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // // // // //   // --- Continuous Scroll Logic ---
// // // // // // // // //   const containerRef = useRef(null);
// // // // // // // // //   const scrollRef = useRef(null);
// // // // // // // // //   const [totalScrollWidth, setTotalScrollWidth] = useState(0);

// // // // // // // // //   // Function to load projects (fetches more data than fits the screen)
// // // // // // // // //   const loadProjects = useCallback(async () => {
// // // // // // // // //     setLoading(true);
// // // // // // // // //     // Fetch a large initial dataset (e.g., 20 items)
// // // // // // // // //     const { data } = await fetchProjects({ limit: 20, categorySlug: activeCategory, searchQuery, toolId: activeToolId, tierId: activeTierId });
// // // // // // // // //     setProjects(data);
// // // // // // // // //     setLoading(false);
// // // // // // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]);
  
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     loadProjects();
// // // // // // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]); 

// // // // // // // // //   // Measure the total width of the content once it loads
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (scrollRef.current && projects.length > 0) {
// // // // // // // // //       // Calculate total width of all cards + margins
// // // // // // // // //       const cardWidth = 320; // w-80
// // // // // // // // //       const margin = 16 * 2; // mx-4 (32px)
// // // // // // // // //       const totalWidth = projects.length * (cardWidth + margin);
// // // // // // // // //       setTotalScrollWidth(totalWidth);
// // // // // // // // //     }
// // // // // // // // //   }, [projects]);


// // // // // // // // //   // --- Framer Motion Horizontal Scroll Animation ---
// // // // // // // // //   const initialOffset = 0; // Start at 0
// // // // // // // // //   const totalDuration = 60; // seconds for a full wrap

// // // // // // // // //   // The keyframes array dictates the motion path: 
// // // // // // // // //   // [0] is the start (e.g., 0px offset), [1] is the end (e.g., -totalWidth)
// // // // // // // // //   const marqueeVariants = {
// // // // // // // // //     animate: {
// // // // // // // // //       x: [initialOffset, -totalScrollWidth], 
// // // // // // // // //       transition: {
// // // // // // // // //         x: {
// // // // // // // // //           repeat: Infinity,
// // // // // // // // //           repeatType: "loop",
// // // // // // // // //           duration: totalDuration,
// // // // // // // // //           ease: "linear",
// // // // // // // // //         },
// // // // // // // // //       },
// // // // // // // // //     },
// // // // // // // // //   };

// // // // // // // // //   if (loading) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // // // // // // // //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// // // // // // // // //           <Zap className="w-12 h-12 text-blue-600" />
// // // // // // // // //         </motion.div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div className="pt-24 pb-48 bg-gray-50 min-h-screen relative overflow-hidden" ref={containerRef}>
// // // // // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// // // // // // // // //         {/* Header and Filter Button (Simplified for space) */}
// // // // // // // // //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-20">
// // // // // // // // //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // // // // // // // //                 <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
// // // // // // // // //                     <span className="text-blue-600">Dashboard</span> View
// // // // // // // // //                 </h1>
// // // // // // // // //                 <p className="mt-2 text-xl text-gray-600">A dynamic scroll of recent projects and courses.</p>
// // // // // // // // //             </motion.div>

// // // // // // // // //             <motion.button
// // // // // // // // //                 onClick={() => setIsFilterOpen(true)}
// // // // // // // // //                 className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // // // // // // // //                 whileHover={{ scale: 1.05 }}
// // // // // // // // //             >
// // // // // // // // //                 <Filter className="w-5 h-5 mr-2" /> Filters
// // // // // // // // //             </motion.button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* --- Continuous Horizontal Scroll Container --- */}
// // // // // // // // //       <div className="overflow-hidden whitespace-nowrap relative py-12">
// // // // // // // // //         {/* This motion.div will contain two copies of the projects list to create a seamless loop */}
// // // // // // // // //         {totalScrollWidth > 0 && (
// // // // // // // // //             <motion.div
// // // // // // // // //                 className="flex"
// // // // // // // // //                 variants={marqueeVariants}
// // // // // // // // //                 animate="animate"
// // // // // // // // //                 style={{ width: totalScrollWidth * 2 }} // Double the width for the loop
// // // // // // // // //             >
// // // // // // // // //                 {/* First set of projects */}
// // // // // // // // //                 <div ref={scrollRef} className="flex flex-row">
// // // // // // // // //                     {projects.map((project, index) => (
// // // // // // // // //                         <DashboardCard key={`A-${project.id}`} project={project} index={index} />
// // // // // // // // //                     ))}
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* Second set of projects (for seamless looping) */}
// // // // // // // // //                 <div className="flex flex-row">
// // // // // // // // //                     {projects.map((project, index) => (
// // // // // // // // //                         <DashboardCard key={`B-${project.id}`} project={project} index={index} />
// // // // // // // // //                     ))}
// // // // // // // // //                 </div>
// // // // // // // // //             </motion.div>
// // // // // // // // //         )}
// // // // // // // // //       </div>

// // // // // // // // //       {/* --- Filter Panel Modal (Using simple overlay since the component isn't fully defined) --- */}
// // // // // // // // //       <AnimatePresence>
// // // // // // // // //         {isFilterOpen && (
// // // // // // // // //           <motion.div
// // // // // // // // //             className="fixed inset-0 bg-white z-50 p-8 flex flex-col items-center justify-center"
// // // // // // // // //             initial={{ opacity: 0 }}
// // // // // // // // //             animate={{ opacity: 1 }}
// // // // // // // // //             exit={{ opacity: 0 }}
// // // // // // // // //           >
// // // // // // // // //             <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Filter Controls</h2>
// // // // // // // // //             <p className="text-lg text-gray-600 mb-8">Filtering is fully functional, but hidden in this complex scroll layout.</p>
// // // // // // // // //             <motion.button
// // // // // // // // //                 onClick={() => setIsFilterOpen(false)}
// // // // // // // // //                 className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
// // // // // // // // //                 whileHover={{ scale: 1.05 }}
// // // // // // // // //             >
// // // // // // // // //                 <X className="w-5 h-5 mr-2" /> Close Filter Panel
// // // // // // // // //             </motion.button>
// // // // // // // // //             {/* You would integrate the full FilterPanel component here and update the states: 
// // // // // // // // //             onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }} etc. */}
// // // // // // // // //           </motion.div>
// // // // // // // // //         )}
// // // // // // // // //       </AnimatePresence>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Projects;


// // // // // // // // // Projects.jsx (FINAL Updated Dashboard Scroll Layout)

// // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // import { Filter, X, Zap, Loader2, Search, Layers, ShieldCheck, List } from 'lucide-react';

// // // // // // // // // NOTE: These paths are assumed to be correct based on your project structure.
// // // // // // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // // // // // import DashboardCard from '../components/projects/DashboardCard'; 
// // // // // // // // import { useHomepageData } from '../hooks/useHomepageData'; 

// // // // // // // // // --- Filter Panel Component (Fully Integrated) ---
// // // // // // // // const FilterPanel = ({ 
// // // // // // // //   categories, tools, tiers,
// // // // // // // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // // // // // // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // // // // // // //   onClose,
// // // // // // // // }) => {
// // // // // // // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // // // // // // //   const handleSearch = (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     onSearchChange(localSearch);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <motion.div 
// // // // // // // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // // // // // // //       initial={{ x: '100%' }}
// // // // // // // //       animate={{ x: 0 }}
// // // // // // // //       exit={{ x: '100%' }}
// // // // // // // //       transition={{ type: 'tween', duration: 0.4 }}
// // // // // // // //     >
// // // // // // // //       <div className="flex justify-between items-center mb-10 border-b pb-4">
// // // // // // // //         <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // // // // // // //             <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // // // // // // //         </h2>
// // // // // // // //         <motion.button 
// // // // // // // //             onClick={onClose} 
// // // // // // // //             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // // // // // // //             whileHover={{ rotate: 90 }}
// // // // // // // //         >
// // // // // // // //             <X className="w-6 h-6" />
// // // // // // // //         </motion.button>
// // // // // // // //       </div>

// // // // // // // //       {/* 1. Search Bar */}
// // // // // // // //       <form onSubmit={handleSearch} className="mb-10">
// // // // // // // //         <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // // // // // // //         <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // // // // // //           <input
// // // // // // // //             type="search"
// // // // // // // //             placeholder="Type and hit Enter..."
// // // // // // // //             value={localSearch}
// // // // // // // //             onChange={(e) => setLocalSearch(e.target.value)}
// // // // // // // //             className="flex-grow p-3 focus:outline-none"
// // // // // // // //           />
// // // // // // // //           <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // // // // // // //             <Search className="w-5 h-5" />
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       </form>

// // // // // // // //       {/* 2. Category Filter */}
// // // // // // // //       <div className="mb-10">
// // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // //             <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // // // // // // //         </h3>
// // // // // // // //         <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // // //           {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // // // // //             const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // // // // // //             return (
// // // // // // // //               <motion.button
// // // // // // // //                 key={slug}
// // // // // // // //                 onClick={() => onFilterChange(slug)}
// // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // // // // // // //                   activeCategory === slug
// // // // // // // //                     ? 'bg-blue-600 text-white shadow-md'
// // // // // // // //                     : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // // //                 }`}
// // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // //               >
// // // // // // // //                 {name}
// // // // // // // //               </motion.button>
// // // // // // // //             );
// // // // // // // //           })}
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* 3. Tier Filter */}
// // // // // // // //       <div className="mb-10">
// // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // //             <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // // // // // // //         </h3>
// // // // // // // //         <div className="flex flex-wrap gap-2">
// // // // // // // //             <motion.button
// // // // // // // //                 onClick={() => onTierChange(null)}
// // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // // //                   activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // // //                 }`}
// // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // //             >
// // // // // // // //                 All Tiers
// // // // // // // //             </motion.button>
// // // // // // // //             {tiers.map((tier) => (
// // // // // // // //                 <motion.button
// // // // // // // //                     key={tier.id}
// // // // // // // //                     onClick={() => onTierChange(tier.id)}
// // // // // // // //                     style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // // //                 >
// // // // // // // //                     {tier.name}
// // // // // // // //                 </motion.button>
// // // // // // // //             ))}
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* 4. Tool Filter */}
// // // // // // // //       <div>
// // // // // // // //         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // // //             <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // // // // // // //         </h3>
// // // // // // // //         <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // // //             <motion.button
// // // // // // // //                 onClick={() => onToolChange(null)}
// // // // // // // //                 className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // // //                   activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // // //                 }`}
// // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // //             >
// // // // // // // //                 Any Tool
// // // // // // // //             </motion.button>
// // // // // // // //             {tools.map((tool) => (
// // // // // // // //                 <motion.button
// // // // // // // //                     key={tool.id}
// // // // // // // //                     onClick={() => onToolChange(tool.id)}
// // // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // // //                 >
// // // // // // // //                     {tool.name}
// // // // // // // //                 </motion.button>
// // // // // // // //             ))}
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </motion.div>
// // // // // // // //   );
// // // // // // // // };


// // // // // // // // // --- Main Projects Component ---
// // // // // // // // const Projects = () => {
// // // // // // // //   // Data fetching hook usage remains the same
// // // // // // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // // // // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // // // // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
// // // // // // // //   // Filtering states
// // // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // // // // // //   const [activeTierId, setActiveTierId] = useState(null);
// // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // // // //   // --- Continuous Scroll Logic States ---
// // // // // // // //   const scrollRef = useRef(null);
// // // // // // // //   const [totalScrollWidth, setTotalScrollWidth] = useState(0);

// // // // // // // //   // Function to load projects (Corrected logic for error handling)
// // // // // // // //   const loadProjects = useCallback(async () => {
// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //         const { data } = await fetchProjects({ 
// // // // // // // //             limit: 20, 
// // // // // // // //             categorySlug: activeCategory, 
// // // // // // // //             searchQuery, 
// // // // // // // //             toolId: activeToolId, 
// // // // // // // //             tierId: activeTierId 
// // // // // // // //         });
// // // // // // // //         // Important: Ensure data is an array before setting state
// // // // // // // //         setProjects(Array.isArray(data) ? data : []); 
// // // // // // // //     } catch (error) {
// // // // // // // //         console.error("Failed to load projects:", error);
// // // // // // // //         setProjects([]);
// // // // // // // //     } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //     }
// // // // // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]);
  
// // // // // // // //   // Effect 1: Trigger load when filters change (Correct dependency usage)
// // // // // // // //   useEffect(() => {
// // // // // // // //     loadProjects();
// // // // // // // //   }, [loadProjects]); 

// // // // // // // //   // Effect 2: Measure the total width after projects load
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (scrollRef.current && projects.length > 0) {
// // // // // // // //       // Card width (w-80 in Tailwind is 320px) + margin (mx-4 is 16px left + 16px right = 32px)
// // // // // // // //       const CARD_AND_MARGIN_WIDTH = 320 + 32; 
// // // // // // // //       const totalWidth = projects.length * CARD_AND_MARGIN_WIDTH;
// // // // // // // //       setTotalScrollWidth(totalWidth);
// // // // // // // //       console.log(`Measured total scroll width: ${totalWidth}px`);
// // // // // // // //     } else {
// // // // // // // //         setTotalScrollWidth(0);
// // // // // // // //     }
// // // // // // // //   }, [projects]);


// // // // // // // //   // --- Framer Motion Horizontal Scroll Animation ---
// // // // // // // //   const totalDuration = 60; // seconds for a full wrap (medium pace)

// // // // // // // //   const marqueeVariants = {
// // // // // // // //     animate: {
// // // // // // // //       // Scrolls from 0 (start) to negative the total width (end)
// // // // // // // //       x: [0, -totalScrollWidth], 
// // // // // // // //       transition: {
// // // // // // // //         x: {
// // // // // // // //           repeat: Infinity,
// // // // // // // //           repeatType: "loop",
// // // // // // // //           duration: totalDuration,
// // // // // // // //           ease: "linear",
// // // // // // // //         },
// // // // // // // //       },
// // // // // // // //     },
// // // // // // // //   };

// // // // // // // //   // --- Render Logic ---

// // // // // // // //   if (loading && projects.length === 0) {
// // // // // // // //     return (
// // // // // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // // // // // // //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// // // // // // // //           <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // // // // // //         </motion.div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   const showScroll = totalScrollWidth > 0 && projects.length > 0;

// // // // // // // //   return (
// // // // // // // //     <div className="pt-24 pb-48 bg-gray-50 min-h-screen relative overflow-hidden">
      
// // // // // // // //       {/* Container for the Header and Filter Button */}
// // // // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// // // // // // // //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-20">
// // // // // // // //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // // // // // // //                 <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
// // // // // // // //                     <span className="text-blue-600">Dashboard</span> View
// // // // // // // //                 </h1>
// // // // // // // //                 <p className="mt-2 text-xl text-gray-600">A dynamic scroll of recent projects and courses.</p>
// // // // // // // //             </motion.div>

// // // // // // // //             <motion.button
// // // // // // // //                 onClick={() => setIsFilterOpen(true)}
// // // // // // // //                 className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // // // // // // //                 whileHover={{ scale: 1.05 }}
// // // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // // //             >
// // // // // // // //                 <Filter className="w-5 h-5 mr-2" /> Filters
// // // // // // // //             </motion.button>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* --- Continuous Horizontal Scroll Container --- */}
// // // // // // // //       <div className="overflow-hidden whitespace-nowrap relative py-12">
// // // // // // // //         <AnimatePresence>
// // // // // // // //             {showScroll && (
// // // // // // // //                 <motion.div
// // // // // // // //                     key="scroll-loop"
// // // // // // // //                     className="flex"
// // // // // // // //                     variants={marqueeVariants}
// // // // // // // //                     animate="animate"
// // // // // // // //                     // Double the width for a seamless loop
// // // // // // // //                     style={{ width: totalScrollWidth * 2 }} 
// // // // // // // //                 >
// // // // // // // //                     {/* First set of projects (Ref used here for width measurement) */}
// // // // // // // //                     <div ref={scrollRef} className="flex flex-row">
// // // // // // // //                         {projects.map((project, index) => (
// // // // // // // //                             // Ensure DashboardCard is imported and working
// // // // // // // //                             <DashboardCard key={`A-${project.id}`} project={project} index={index} />
// // // // // // // //                         ))}
// // // // // // // //                     </div>

// // // // // // // //                     {/* Second set of projects (for seamless looping) */}
// // // // // // // //                     <div className="flex flex-row">
// // // // // // // //                         {projects.map((project, index) => (
// // // // // // // //                             <DashboardCard key={`B-${project.id}`} project={project} index={index} />
// // // // // // // //                         ))}
// // // // // // // //                     </div>
// // // // // // // //                 </motion.div>
// // // // // // // //             )}
// // // // // // // //         </AnimatePresence>
// // // // // // // //       </div>

// // // // // // // //       {/* Empty State */}
// // // // // // // //       {!showScroll && !loading && (
// // // // // // // //            <motion.div 
// // // // // // // //                initial={{ opacity: 0, y: 20 }}
// // // // // // // //                animate={{ opacity: 1, y: 0 }}
// // // // // // // //                className="text-center mt-20 p-12 bg-white rounded-2xl shadow-xl max-w-lg mx-auto"
// // // // // // // //            >
// // // // // // // //                <h3 className="text-2xl font-bold text-gray-900">No Projects Found 😞</h3>
// // // // // // // //                <p className="text-gray-600 mt-2">Try clearing your current filter selection in the panel.</p>
// // // // // // // //            </motion.div>
// // // // // // // //       )}
      
// // // // // // // //       {/* --- Filter Panel Modal --- */}
// // // // // // // //       <AnimatePresence>
// // // // // // // //         {isFilterOpen && (
// // // // // // // //           <>
// // // // // // // //             <FilterPanel
// // // // // // // //                 categories={categories || []}
// // // // // // // //                 tools={tools || []}
// // // // // // // //                 tiers={tiers || []}
// // // // // // // //                 activeCategory={activeCategory}
// // // // // // // //                 activeToolId={activeToolId}
// // // // // // // //                 activeTierId={activeTierId}
// // // // // // // //                 searchQuery={searchQuery}
// // // // // // // //                 // Update state and close panel upon filtering
// // // // // // // //                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
// // // // // // // //                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
// // // // // // // //                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
// // // // // // // //                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
// // // // // // // //                 onClose={() => setIsFilterOpen(false)}
// // // // // // // //             />
// // // // // // // //             {/* Background overlay */}
// // // // // // // //             <motion.div
// // // // // // // //                 className="fixed inset-0 bg-black/50 z-40"
// // // // // // // //                 initial={{ opacity: 0 }}
// // // // // // // //                 animate={{ opacity: 1 }}
// // // // // // // //                 exit={{ opacity: 0 }}
// // // // // // // //                 onClick={() => setIsFilterOpen(false)}
// // // // // // // //             />
// // // // // // // //           </>
// // // // // // // //         )}
// // // // // // // //       </AnimatePresence>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Projects;


// // // // // // // // Projects.jsx (FINAL)

// // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // import { Filter, X, Zap, Loader2, Search, Layers, ShieldCheck, List } from 'lucide-react';
// // // // // // // // Import the fixed API function
// // // // // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // // // // import DashboardCard from '../components/projects/DashboardCard'; 
// // // // // // // import { useHomepageData } from '../hooks/useHomepageData'; 

// // // // // // // // --- FilterPanel Component (You must include this definition above the Projects component) ---
// // // // // // // const FilterPanel = ({ 
// // // // // // //   categories, tools, tiers,
// // // // // // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // // // // // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // // // // // //   onClose,
// // // // // // // }) => {
// // // // // // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // // // // // //   const handleSearch = (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     onSearchChange(localSearch);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <motion.div 
// // // // // // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // // // // // //       initial={{ x: '100%' }}
// // // // // // //       animate={{ x: 0 }}
// // // // // // //       exit={{ x: '100%' }}
// // // // // // //       transition={{ type: 'tween', duration: 0.4 }}
// // // // // // //     >
// // // // // // //         <div className="flex justify-between items-center mb-10 border-b pb-4">
// // // // // // //             <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // // // // // //                 <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // // // // // //             </h2>
// // // // // // //             <motion.button 
// // // // // // //                 onClick={onClose} 
// // // // // // //                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // // // // // //                 whileHover={{ rotate: 90 }}
// // // // // // //             >
// // // // // // //                 <X className="w-6 h-6" />
// // // // // // //             </motion.button>
// // // // // // //         </div>

// // // // // // //         {/* 1. Search Bar */}
// // // // // // //         <form onSubmit={handleSearch} className="mb-10">
// // // // // // //             <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // // // // // //             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // // // // //             <input
// // // // // // //                 type="search"
// // // // // // //                 placeholder="Type and hit Enter..."
// // // // // // //                 value={localSearch}
// // // // // // //                 onChange={(e) => setLocalSearch(e.target.value)}
// // // // // // //                 className="flex-grow p-3 focus:outline-none"
// // // // // // //             />
// // // // // // //             <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // // // // // //                 <Search className="w-5 h-5" />
// // // // // // //             </button>
// // // // // // //             </div>
// // // // // // //         </form>

// // // // // // //         {/* 2. Category Filter */}
// // // // // // //         <div className="mb-10">
// // // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // //                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // // // // // //             </h3>
// // // // // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // //             {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // // // //                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // // // // //                 return (
// // // // // // //                 <motion.button
// // // // // // //                     key={slug}
// // // // // // //                     onClick={() => onFilterChange(slug)}
// // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // // // // // //                     activeCategory === slug
// // // // // // //                         ? 'bg-blue-600 text-white shadow-md'
// // // // // // //                         : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // //                     }`}
// // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // //                 >
// // // // // // //                     {name}
// // // // // // //                 </motion.button>
// // // // // // //                 );
// // // // // // //             })}
// // // // // // //             </div>
// // // // // // //         </div>

// // // // // // //         {/* 3. Tier Filter */}
// // // // // // //         <div className="mb-10">
// // // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // //                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // // // // // //             </h3>
// // // // // // //             <div className="flex flex-wrap gap-2">
// // // // // // //                 <motion.button
// // // // // // //                     onClick={() => onTierChange(null)}
// // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // //                     activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // // //                     }`}
// // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // //                 >
// // // // // // //                     All Tiers
// // // // // // //                 </motion.button>
// // // // // // //                 {tiers.map((tier) => (
// // // // // // //                     <motion.button
// // // // // // //                         key={tier.id}
// // // // // // //                         onClick={() => onTierChange(tier.id)}
// // // // // // //                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // // // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // // // // // //                         whileTap={{ scale: 0.95 }}
// // // // // // //                     >
// // // // // // //                         {tier.name}
// // // // // // //                     </motion.button>
// // // // // // //                 ))}
// // // // // // //             </div>
// // // // // // //         </div>

// // // // // // //         {/* 4. Tool Filter */}
// // // // // // //         <div>
// // // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // // //                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // // // // // //             </h3>
// // // // // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // // //                 <motion.button
// // // // // // //                     onClick={() => onToolChange(null)}
// // // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // // //                     activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // // //                     }`}
// // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // //                 >
// // // // // // //                     Any Tool
// // // // // // //                 </motion.button>
// // // // // // //                 {tools.map((tool) => (
// // // // // // //                     <motion.button
// // // // // // //                         key={tool.id}
// // // // // // //                         onClick={() => onToolChange(tool.id)}
// // // // // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // // // // // //                         whileTap={{ scale: 0.95 }}
// // // // // // //                     >
// // // // // // //                         {tool.name}
// // // // // // //                     </motion.button>
// // // // // // //                 ))}
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     </motion.div>
// // // // // // //   );
// // // // // // // };
// // // // // // // // --- End FilterPanel ---


// // // // // // // const Projects = () => {
// // // // // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // // // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // // // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
// // // // // // //   // Filtering states
// // // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // // // // //   const [activeTierId, setActiveTierId] = useState(null);
// // // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // // //   // --- Continuous Scroll Logic States ---
// // // // // // //   const scrollRef = useRef(null);
// // // // // // //   const [totalScrollWidth, setTotalScrollWidth] = useState(0);

// // // // // // //   // Function to load projects (FIXED: Depends on all filter states)
// // // // // // //   const loadProjects = useCallback(async () => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //         const { data } = await fetchProjects({ 
// // // // // // //             limit: 20, 
// // // // // // //             categorySlug: activeCategory, 
// // // // // // //             searchQuery, 
// // // // // // //             toolId: activeToolId, 
// // // // // // //             tierId: activeTierId 
// // // // // // //         });
// // // // // // //         setProjects(Array.isArray(data) ? data : []); 
// // // // // // //     } catch (error) {
// // // // // // //         console.error("Failed to load projects:", error);
// // // // // // //         setProjects([]);
// // // // // // //     } finally {
// // // // // // //         setLoading(false);
// // // // // // //     }
// // // // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]);
  
// // // // // // //   // Effect 1: Trigger load when filters change
// // // // // // //   useEffect(() => {
// // // // // // //     loadProjects();
// // // // // // //   }, [loadProjects]); 

// // // // // // //   // Effect 2: Measure the total width after projects load
// // // // // // //   useEffect(() => {
// // // // // // //     if (scrollRef.current && projects.length > 0) {
// // // // // // //       // Card width (320px) + margin (32px)
// // // // // // //       const CARD_AND_MARGIN_WIDTH = 320 + 32; 
// // // // // // //       const totalWidth = projects.length * CARD_AND_MARGIN_WIDTH;
// // // // // // //       setTotalScrollWidth(totalWidth);
// // // // // // //     } else {
// // // // // // //         setTotalScrollWidth(0);
// // // // // // //     }
// // // // // // //   }, [projects]);


// // // // // // //   // --- Framer Motion Horizontal Scroll Animation ---
// // // // // // //   const totalDuration = 60; // seconds for a full wrap (medium pace)

// // // // // // //   const marqueeVariants = {
// // // // // // //     animate: {
// // // // // // //       x: [0, -totalScrollWidth], 
// // // // // // //       transition: {
// // // // // // //         x: {
// // // // // // //           repeat: Infinity,
// // // // // // //           repeatType: "loop",
// // // // // // //           duration: totalDuration,
// // // // // // //           ease: "linear",
// // // // // // //         },
// // // // // // //       },
// // // // // // //     },
// // // // // // //   };

// // // // // // //   // --- Render Logic ---

// // // // // // //   if (loading && projects.length === 0) {
// // // // // // //     return (
// // // // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // // // // // //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// // // // // // //           <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // // // // //         </motion.div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   const showScroll = totalScrollWidth > 0 && projects.length > 0;

// // // // // // //   return (
// // // // // // //     <div className="pt-24 pb-48 bg-gray-50 min-h-screen relative overflow-hidden">
      
// // // // // // //       {/* Header and Filter Button */}
// // // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// // // // // // //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-20">
// // // // // // //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // // // // // //                 <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
// // // // // // //                     <span className="text-blue-600">Dashboard</span> View
// // // // // // //                 </h1>
// // // // // // //                 <p className="mt-2 text-xl text-gray-600">A dynamic scroll of recent projects and courses.</p>
// // // // // // //             </motion.div>

// // // // // // //             <motion.button
// // // // // // //                 onClick={() => setIsFilterOpen(true)}
// // // // // // //                 className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // // // // // //                 whileHover={{ scale: 1.05 }}
// // // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // // //             >
// // // // // // //                 <Filter className="w-5 h-5 mr-2" /> Filters
// // // // // // //             </motion.button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* --- Continuous Horizontal Scroll Container --- */}
// // // // // // //       <div className="overflow-hidden whitespace-nowrap relative py-12">
// // // // // // //         <AnimatePresence>
// // // // // // //             {showScroll && (
// // // // // // //                 <motion.div
// // // // // // //                     key="scroll-loop"
// // // // // // //                     className="flex"
// // // // // // //                     variants={marqueeVariants}
// // // // // // //                     animate="animate"
// // // // // // //                     style={{ width: totalScrollWidth * 2 }} 
// // // // // // //                 >
// // // // // // //                     {/* First set of projects (Ref used here for width measurement) */}
// // // // // // //                     <div ref={scrollRef} className="flex flex-row">
// // // // // // //                         {projects.map((project, index) => (
// // // // // // //                             <DashboardCard key={`A-${project.id}`} project={project} index={index} />
// // // // // // //                         ))}
// // // // // // //                     </div>

// // // // // // //                     {/* Second set of projects (for seamless looping) */}
// // // // // // //                     <div className="flex flex-row">
// // // // // // //                         {projects.map((project, index) => (
// // // // // // //                             <DashboardCard key={`B-${project.id}`} project={project} index={index} />
// // // // // // //                         ))}
// // // // // // //                     </div>
// // // // // // //                 </motion.div>
// // // // // // //             )}
// // // // // // //         </AnimatePresence>
// // // // // // //       </div>

// // // // // // //       {/* Empty State */}
// // // // // // //       {!showScroll && !loading && (
// // // // // // //            <motion.div 
// // // // // // //                initial={{ opacity: 0, y: 20 }}
// // // // // // //                animate={{ opacity: 1, y: 0 }}
// // // // // // //                className="text-center mt-20 p-12 bg-white rounded-2xl shadow-xl max-w-lg mx-auto"
// // // // // // //            >
// // // // // // //                <h3 className="text-2xl font-bold text-gray-900">No Projects Found 😞</h3>
// // // // // // //                <p className="text-gray-600 mt-2">
// // // // // // //                  The current filters produced no results. Try clearing your search or categories.
// // // // // // //                </p>
// // // // // // //            </motion.div>
// // // // // // //       )}
      
// // // // // // //       {/* --- Filter Panel Modal --- */}
// // // // // // //       <AnimatePresence>
// // // // // // //         {isFilterOpen && (
// // // // // // //           <>
// // // // // // //             <FilterPanel
// // // // // // //                 categories={categories || []}
// // // // // // //                 tools={tools || []}
// // // // // // //                 tiers={tiers || []}
// // // // // // //                 activeCategory={activeCategory}
// // // // // // //                 activeToolId={activeToolId}
// // // // // // //                 activeTierId={activeTierId}
// // // // // // //                 searchQuery={searchQuery}
// // // // // // //                 // Update state and close panel upon filtering
// // // // // // //                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
// // // // // // //                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
// // // // // // //                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
// // // // // // //                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
// // // // // // //                 onClose={() => setIsFilterOpen(false)}
// // // // // // //             />
// // // // // // //             {/* Background overlay */}
// // // // // // //             <motion.div
// // // // // // //                 className="fixed inset-0 bg-black/50 z-40"
// // // // // // //                 initial={{ opacity: 0 }}
// // // // // // //                 animate={{ opacity: 1 }}
// // // // // // //                 exit={{ opacity: 0 }}
// // // // // // //                 onClick={() => setIsFilterOpen(false)}
// // // // // // //             />
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </AnimatePresence>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Projects;


// // // // // // // Projects.jsx (FINAL & CORRECTED)

// // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // import { Filter, X, Zap, Loader2, Search, Layers, ShieldCheck, List } from 'lucide-react';
// // // // // // // Import the fixed API function
// // // // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // // // import DashboardCard from '../components/projects/DashboardCard'; 
// // // // // // import { useHomepageData } from '../hooks/useHomepageData'; 

// // // // // // // --- FilterPanel Component (Included for completeness) ---
// // // // // // const FilterPanel = ({ 
// // // // // //   categories, tools, tiers,
// // // // // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // // // // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // // // // //   onClose,
// // // // // // }) => {
// // // // // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // // // // //   const handleSearch = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     onSearchChange(localSearch);
// // // // // //   };

// // // // // //   return (
// // // // // //     <motion.div 
// // // // // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // // // // //       initial={{ x: '100%' }}
// // // // // //       animate={{ x: 0 }}
// // // // // //       exit={{ x: '100%' }}
// // // // // //       transition={{ type: 'tween', duration: 0.4 }}
// // // // // //     >
// // // // // //         <div className="flex justify-between items-center mb-10 border-b pb-4">
// // // // // //             <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // // // // //                 <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // // // // //             </h2>
// // // // // //             <motion.button 
// // // // // //                 onClick={onClose} 
// // // // // //                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // // // // //                 whileHover={{ rotate: 90 }}
// // // // // //             >
// // // // // //                 <X className="w-6 h-6" />
// // // // // //             </motion.button>
// // // // // //         </div>

// // // // // //         {/* 1. Search Bar */}
// // // // // //         <form onSubmit={handleSearch} className="mb-10">
// // // // // //             <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // // // // //             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // // // //             <input
// // // // // //                 type="search"
// // // // // //                 placeholder="Type and hit Enter..."
// // // // // //                 value={localSearch}
// // // // // //                 onChange={(e) => setLocalSearch(e.target.value)}
// // // // // //                 className="flex-grow p-3 focus:outline-none"
// // // // // //             />
// // // // // //             <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // // // // //                 <Search className="w-5 h-5" />
// // // // // //             </button>
// // // // // //             </div>
// // // // // //         </form>

// // // // // //         {/* 2. Category Filter */}
// // // // // //         <div className="mb-10">
// // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // //                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // // // // //             </h3>
// // // // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // //             {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // // //                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // // // //                 return (
// // // // // //                 <motion.button
// // // // // //                     key={slug}
// // // // // //                     onClick={() => onFilterChange(slug)}
// // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // // // // //                     activeCategory === slug
// // // // // //                         ? 'bg-blue-600 text-white shadow-md'
// // // // // //                         : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // //                     }`}
// // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // //                 >
// // // // // //                     {name}
// // // // // //                 </motion.button>
// // // // // //                 );
// // // // // //             })}
// // // // // //             </div>
// // // // // //         </div>

// // // // // //         {/* 3. Tier Filter */}
// // // // // //         <div className="mb-10">
// // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // //                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // // // // //             </h3>
// // // // // //             <div className="flex flex-wrap gap-2">
// // // // // //                 <motion.button
// // // // // //                     onClick={() => onTierChange(null)}
// // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // //                     activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // // //                     }`}
// // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // //                 >
// // // // // //                     All Tiers
// // // // // //                 </motion.button>
// // // // // //                 {tiers.map((tier) => (
// // // // // //                     <motion.button
// // // // // //                         key={tier.id}
// // // // // //                         onClick={() => onTierChange(tier.id)}
// // // // // //                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // // // // //                         whileTap={{ scale: 0.95 }}
// // // // // //                     >
// // // // // //                         {tier.name}
// // // // // //                     </motion.button>
// // // // // //                 ))}
// // // // // //             </div>
// // // // // //         </div>

// // // // // //         {/* 4. Tool Filter */}
// // // // // //         <div>
// // // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // // //                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // // // // //             </h3>
// // // // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // // //                 <motion.button
// // // // // //                     onClick={() => onToolChange(null)}
// // // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // // //                     activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // // //                     }`}
// // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // //                 >
// // // // // //                     Any Tool
// // // // // //                 </motion.button>
// // // // // //                 {tools.map((tool) => (
// // // // // //                     <motion.button
// // // // // //                         key={tool.id}
// // // // // //                         onClick={() => onToolChange(tool.id)}
// // // // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // // // // //                         whileTap={{ scale: 0.95 }}
// // // // // //                     >
// // // // // //                         {tool.name}
// // // // // //                     </motion.button>
// // // // // //                 ))}
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     </motion.div>
// // // // // //   );
// // // // // // };
// // // // // // // --- End FilterPanel ---


// // // // // // const Projects = () => {
// // // // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // // // // //   const [projects, setProjects] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
// // // // // //   // Filtering states
// // // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // // // //   const [activeTierId, setActiveTierId] = useState(null);
// // // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // // //   // --- Continuous Scroll Logic States ---
// // // // // //   const scrollRef = useRef(null);
// // // // // //   const [totalScrollWidth, setTotalScrollWidth] = useState(0);

// // // // // //   // Function to load projects
// // // // // //   const loadProjects = useCallback(async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //         const { data } = await fetchProjects({ 
// // // // // //             limit: 20, 
// // // // // //             categorySlug: activeCategory, 
// // // // // //             searchQuery, 
// // // // // //             toolId: activeToolId, 
// // // // // //             tierId: activeTierId 
// // // // // //         });
// // // // // //         setProjects(Array.isArray(data) ? data : []); 
// // // // // //     } catch (error) {
// // // // // //         console.error("Failed to load projects:", error);
// // // // // //         setProjects([]);
// // // // // //     } finally {
// // // // // //         setLoading(false);
// // // // // //     }
// // // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]);
  
// // // // // //   // Effect 1: Trigger load when filters change
// // // // // //   useEffect(() => {
// // // // // //     loadProjects();
// // // // // //   }, [loadProjects]); 

// // // // // //   // Effect 2: Measure the total width after projects load
// // // // // //   useEffect(() => {
// // // // // //     if (scrollRef.current && projects.length > 0) {
// // // // // //       // Card width (320px) + margin (32px)
// // // // // //       const CARD_AND_MARGIN_WIDTH = 320 + 32; 
// // // // // //       const totalWidth = projects.length * CARD_AND_MARGIN_WIDTH;
// // // // // //       setTotalScrollWidth(totalWidth);
// // // // // //     } else {
// // // // // //         setTotalScrollWidth(0);
// // // // // //     }
// // // // // //   }, [projects]);


// // // // // //   // --- Framer Motion Horizontal Scroll Animation ---
// // // // // //   const totalDuration = 60; 

// // // // // //   const marqueeVariants = {
// // // // // //     animate: {
// // // // // //       // Use a dynamic array based on calculated width
// // // // // //       x: [0, -(totalScrollWidth)], 
// // // // // //       transition: {
// // // // // //         x: {
// // // // // //           repeat: Infinity,
// // // // // //           repeatType: "loop",
// // // // // //           duration: totalDuration,
// // // // // //           ease: "linear",
// // // // // //         },
// // // // // //       },
// // // // // //     },
// // // // // //   };

// // // // // //   // --- Render Logic (CRITICAL FIX APPLIED HERE) ---
  
// // // // // //   // NEW: Robust check for rendering projects
// // // // // //   const hasProjects = projects.length > 0;

// // // // // //   if (loading && projects.length === 0) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // // // // //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// // // // // //           <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // // // //         </motion.div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="pt-24 pb-48 bg-gray-50 min-h-screen relative overflow-hidden">
      
// // // // // //       {/* Header and Filter Button */}
// // // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// // // // // //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-20">
// // // // // //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // // // // //                 <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
// // // // // //                     <span className="text-blue-600">Dashboard</span> View
// // // // // //                 </h1>
// // // // // //                 <p className="mt-2 text-xl text-gray-600">A dynamic scroll of recent projects and courses.</p>
// // // // // //             </motion.div>

// // // // // //             <motion.button
// // // // // //                 onClick={() => setIsFilterOpen(true)}
// // // // // //                 className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // // // // //                 whileHover={{ scale: 1.05 }}
// // // // // //                 whileTap={{ scale: 0.95 }}
// // // // // //             >
// // // // // //                 <Filter className="w-5 h-5 mr-2" /> Filters
// // // // // //             </motion.button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* --- Continuous Horizontal Scroll Container --- */}
// // // // // //       <div className="overflow-hidden whitespace-nowrap relative py-12">
// // // // // //         <AnimatePresence>
// // // // // //             {hasProjects && ( // <-- CHECK DATA STATUS
// // // // // //                 <motion.div
// // // // // //                     key="scroll-loop"
// // // // // //                     className="flex"
// // // // // //                     variants={marqueeVariants}
// // // // // //                     animate="animate"
// // // // // //                     // Ensures there's enough space for seamless loop if width > 0
// // // // // //                     style={{ width: totalScrollWidth > 0 ? totalScrollWidth * 2 : 'auto' }} 
// // // // // //                 >
// // // // // //                     {/* First set of projects (Ref used here for width measurement) */}
// // // // // //                     <div ref={scrollRef} className="flex flex-row">
// // // // // //                         {projects.map((project, index) => (
// // // // // //                             <DashboardCard key={`A-${project.id}`} project={project} index={index} />
// // // // // //                         ))}
// // // // // //                     </div>

// // // // // //                     {/* Second set of projects (for seamless looping) */}
// // // // // //                     <div className="flex flex-row">
// // // // // //                         {projects.map((project, index) => (
// // // // // //                             <DashboardCard key={`B-${project.id}`} project={project} index={index} />
// // // // // //                         ))}
// // // // // //                     </div>
// // // // // //                 </motion.div>
// // // // // //             )}
// // // // // //         </AnimatePresence>
// // // // // //       </div>

// // // // // //       {/* Empty State */}
// // // // // //       {!hasProjects && !loading && ( // <-- CHECK DATA STATUS
// // // // // //            <motion.div 
// // // // // //                initial={{ opacity: 0, y: 20 }}
// // // // // //                animate={{ opacity: 1, y: 0 }}
// // // // // //                className="text-center mt-20 p-12 bg-white rounded-2xl shadow-xl max-w-lg mx-auto"
// // // // // //            >
// // // // // //                <h3 className="text-2xl font-bold text-gray-900">No Projects Found 😞</h3>
// // // // // //                <p className="text-gray-600 mt-2">
// // // // // //                  The current filters produced no results. Try clearing your search or categories.
// // // // // //                </p>
// // // // // //            </motion.div>
// // // // // //       )}
      
// // // // // //       {/* --- Filter Panel Modal --- */}
// // // // // //       <AnimatePresence>
// // // // // //         {isFilterOpen && (
// // // // // //           <>
// // // // // //             <FilterPanel
// // // // // //                 categories={categories || []}
// // // // // //                 tools={tools || []}
// // // // // //                 tiers={tiers || []}
// // // // // //                 activeCategory={activeCategory}
// // // // // //                 activeToolId={activeToolId}
// // // // // //                 activeTierId={activeTierId}
// // // // // //                 searchQuery={searchQuery}
// // // // // //                 // Update state and close panel upon filtering
// // // // // //                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
// // // // // //                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
// // // // // //                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
// // // // // //                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
// // // // // //                 onClose={() => setIsFilterOpen(false)}
// // // // // //             />
// // // // // //             {/* Background overlay */}
// // // // // //             <motion.div
// // // // // //                 className="fixed inset-0 bg-black/50 z-40"
// // // // // //                 initial={{ opacity: 0 }}
// // // // // //                 animate={{ opacity: 1 }}
// // // // // //                 exit={{ opacity: 0 }}
// // // // // //                 onClick={() => setIsFilterOpen(false)}
// // // // // //             />
// // // // // //           </>
// // // // // //         )}
// // // // // //       </AnimatePresence>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Projects;
// // // // // import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { Filter, X, Zap, Loader2, Search, Layers, ShieldCheck, List, CheckCircle, Clock } from 'lucide-react';
// // // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // // import { useHomepageData } from '../hooks/useHomepageData'; 
// // // // // // Import the new card component and styles
// // // // // import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// // // // // // --- FilterPanel Component (No changes needed, kept for context) ---
// // // // // // ... (Your FilterPanel code goes here) ...
// // // // // const FilterPanel = ({ 
// // // // //   categories, tools, tiers,
// // // // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // // // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // // // //   onClose,
// // // // // }) => {
// // // // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // // // //   const handleSearch = (e) => {
// // // // //     e.preventDefault();
// // // // //     onSearchChange(localSearch);
// // // // //   };

// // // // //   return (
// // // // //     <motion.div 
// // // // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // // // //       initial={{ x: '100%' }}
// // // // //       animate={{ x: 0 }}
// // // // //       exit={{ x: '100%' }}
// // // // //       transition={{ type: 'tween', duration: 0.4 }}
// // // // //     >
// // // // //         <div className="flex justify-between items-center mb-10 border-b pb-4">
// // // // //             <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // // // //                 <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // // // //             </h2>
// // // // //             <motion.button 
// // // // //                 onClick={onClose} 
// // // // //                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // // // //                 whileHover={{ rotate: 90 }}
// // // // //             >
// // // // //                 <X className="w-6 h-6" />
// // // // //             </motion.button>
// // // // //         </div>

// // // // //         {/* 1. Search Bar */}
// // // // //         <form onSubmit={handleSearch} className="mb-10">
// // // // //             <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // // // //             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // // //             <input
// // // // //                 type="search"
// // // // //                 placeholder="Type and hit Enter..."
// // // // //                 value={localSearch}
// // // // //                 onChange={(e) => setLocalSearch(e.target.value)}
// // // // //                 className="flex-grow p-3 focus:outline-none"
// // // // //             />
// // // // //             <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // // // //                 <Search className="w-5 h-5" />
// // // // //             </button>
// // // // //             </div>
// // // // //         </form>

// // // // //         {/* 2. Category Filter */}
// // // // //         <div className="mb-10">
// // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // //                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // // // //             </h3>
// // // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // //             {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // // //                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // // //                 return (
// // // // //                 <motion.button
// // // // //                     key={slug}
// // // // //                     onClick={() => onFilterChange(slug)}
// // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // // // //                     activeCategory === slug
// // // // //                         ? 'bg-blue-600 text-white shadow-md'
// // // // //                         : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // //                     }`}
// // // // //                     whileTap={{ scale: 0.95 }}
// // // // //                 >
// // // // //                     {name}
// // // // //                 </motion.button>
// // // // //                 );
// // // // //             })}
// // // // //             </div>
// // // // //         </div>

// // // // //         {/* 3. Tier Filter */}
// // // // //         <div className="mb-10">
// // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // //                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // // // //             </h3>
// // // // //             <div className="flex flex-wrap gap-2">
// // // // //                 <motion.button
// // // // //                     onClick={() => onTierChange(null)}
// // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // //                     activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // // //                     }`}
// // // // //                     whileTap={{ scale: 0.95 }}
// // // // //                 >
// // // // //                     All Tiers
// // // // //                 </motion.button>
// // // // //                 {tiers.map((tier) => (
// // // // //                     <motion.button
// // // // //                         key={tier.id}
// // // // //                         onClick={() => onTierChange(tier.id)}
// // // // //                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // // // //                         whileTap={{ scale: 0.95 }}
// // // // //                     >
// // // // //                         {tier.name}
// // // // //                     </motion.button>
// // // // //                 ))}
// // // // //             </div>
// // // // //         </div>

// // // // //         {/* 4. Tool Filter */}
// // // // //         <div>
// // // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // // //                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // // // //             </h3>
// // // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // // //                 <motion.button
// // // // //                     onClick={() => onToolChange(null)}
// // // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // // //                     activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // // //                     }`}
// // // // //                     whileTap={{ scale: 0.95 }}
// // // // //                 >
// // // // //                     Any Tool
// // // // //                 </motion.button>
// // // // //                 {tools.map((tool) => (
// // // // //                     <motion.button
// // // // //                         key={tool.id}
// // // // //                         onClick={() => onToolChange(tool.id)}
// // // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // // // //                         whileTap={{ scale: 0.95 }}
// // // // //                     >
// // // // //                         {tool.name}
// // // // //                     </motion.button>
// // // // //                 ))}
// // // // //             </div>
// // // // //         </div>
// // // // //     </motion.div>
// // // // //   );
// // // // // };
// // // // // // --- End FilterPanel ---


// // // // // // Function to randomly assign a style (Moved outside of component to avoid re-creation)
// // // // // const getRandomCardStyle = (project, index) => {
// // // // //     // Determine a few key cards manually for a balanced look, then random for the rest
// // // // //     if (index === 0) return CardStyle.COMPLETION_TALL; // Ensure the first card is tall
// // // // //     if (index === 1) return CardStyle.BOOK_COMPACT;
// // // // //     if (index === 4) return CardStyle.COURSE_WIDE; // Ensure the wide card appears
    
// // // // //     const styles = Object.values(CardStyle);
// // // // //     return styles[Math.floor(Math.random() * styles.length)];
// // // // // };


// // // // // const Projects = () => {
// // // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // // // //   const [projects, setProjects] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
// // // // //   // Filtering states
// // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // // //   const [activeTierId, setActiveTierId] = useState(null);
// // // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // // //   // --- New: Memoized list of projects with assigned styles ---
// // // // //   // This will assign a size/style to each project based on its index
// // // // //   const styledProjects = useMemo(() => {
// // // // //     return projects.map((project, index) => ({
// // // // //       ...project,
// // // // //       assignedStyle: getRandomCardStyle(project, index)
// // // // //     }));
// // // // //   }, [projects]);


// // // // //   // Function to load projects
// // // // //   const loadProjects = useCallback(async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //         const { data } = await fetchProjects({ 
// // // // //             limit: 20, 
// // // // //             categorySlug: activeCategory, 
// // // // //             searchQuery, 
// // // // //             toolId: activeToolId, 
// // // // //             tierId: activeTierId 
// // // // //         });
// // // // //         setProjects(Array.isArray(data) ? data : []); 
// // // // //     } catch (error) {
// // // // //         console.error("Failed to load projects:", error);
// // // // //         setProjects([]);
// // // // //     } finally {
// // // // //         setLoading(false);
// // // // //     }
// // // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]);
  
// // // // //   // Effect: Trigger load when filters change
// // // // //   useEffect(() => {
// // // // //     loadProjects();
// // // // //   }, [loadProjects]); 


// // // // //   const hasProjects = styledProjects.length > 0;

// // // // //   if (loading && projects.length === 0) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // // // //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// // // // //           <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // // //         </motion.div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="pt-24 pb-48 bg-gray-50 min-h-screen relative overflow-x-hidden">
      
// // // // //       {/* Header and Filter Button */}
// // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// // // // //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-16">
// // // // //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // // // //                 <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
// // // // //                     <span className="text-blue-600">Dynamic</span> Dashboard
// // // // //                 </h1>
// // // // //                 <p className="mt-2 text-xl text-gray-600">A visually rich, responsive overview of all projects.</p>
// // // // //             </motion.div>

// // // // //             <motion.button
// // // // //                 onClick={() => setIsFilterOpen(true)}
// // // // //                 className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // // // //                 whileHover={{ scale: 1.05 }}
// // // // //                 whileTap={{ scale: 0.95 }}
// // // // //             >
// // // // //                 <Filter className="w-5 h-5 mr-2" /> Filters
// // // // //             </motion.button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* --- New: Responsive Grid/Masonry Container --- */}
// // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // // // //         <div className="max-w-7xl mx-auto">
// // // // //           <AnimatePresence>
// // // // //               {hasProjects ? (
// // // // //                 // Tailwind CSS Grid for a near-Masonry effect using row-span
// // // // //                 <motion.div
// // // // //                     key="project-grid"
// // // // //                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[10rem]"
// // // // //                 >
// // // // //                     {styledProjects.map((project) => (
// // // // //                         <ProjectCard 
// // // // //                             key={project.id} 
// // // // //                             project={project} 
// // // // //                             assignedStyle={project.assignedStyle}
// // // // //                         />
// // // // //                     ))}
// // // // //                 </motion.div>
// // // // //               ) : (
// // // // //                 // Empty State
// // // // //                 !loading && (
// // // // //                     <motion.div 
// // // // //                         initial={{ opacity: 0, y: 20 }}
// // // // //                         animate={{ opacity: 1, y: 0 }}
// // // // //                         className="text-center mt-20 p-12 bg-white rounded-2xl shadow-xl max-w-lg mx-auto"
// // // // //                     >
// // // // //                         <h3 className="text-2xl font-bold text-gray-900">No Projects Found 😞</h3>
// // // // //                         <p className="text-gray-600 mt-2">
// // // // //                           The current filters produced no results. Try clearing your search or categories.
// // // // //                         </p>
// // // // //                     </motion.div>
// // // // //                 )
// // // // //               )}
// // // // //           </AnimatePresence>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* --- Filter Panel Modal --- */}
// // // // //       <AnimatePresence>
// // // // //         {isFilterOpen && (
// // // // //           <>
// // // // //             <FilterPanel
// // // // //                 categories={categories || []}
// // // // //                 tools={tools || []}
// // // // //                 tiers={tiers || []}
// // // // //                 activeCategory={activeCategory}
// // // // //                 activeToolId={activeToolId}
// // // // //                 activeTierId={activeTierId}
// // // // //                 searchQuery={searchQuery}
// // // // //                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
// // // // //                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
// // // // //                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
// // // // //                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
// // // // //                 onClose={() => setIsFilterOpen(false)}
// // // // //             />
// // // // //             {/* Background overlay */}
// // // // //             <motion.div
// // // // //                 className="fixed inset-0 bg-black/50 z-40"
// // // // //                 initial={{ opacity: 0 }}
// // // // //                 animate={{ opacity: 1 }}
// // // // //                 exit={{ opacity: 0 }}
// // // // //                 onClick={() => setIsFilterOpen(false)}
// // // // //             />
// // // // //           </>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Projects;
// // // // import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { Filter, X, Zap, Loader2, Search, Layers, ShieldCheck, List, CheckCircle, Clock } from 'lucide-react';
// // // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // // import { useHomepageData } from '../hooks/useHomepageData'; 
// // // // // Import the new card component and styles
// // // // import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// // // // // --- FilterPanel Component (No changes needed, kept for context) ---
// // // // const FilterPanel = ({ 
// // // //   categories, tools, tiers,
// // // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // // //   onClose,
// // // // }) => {
// // // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // // //   const handleSearch = (e) => {
// // // //     e.preventDefault();
// // // //     onSearchChange(localSearch);
// // // //   };

// // // //   return (
// // // //     <motion.div 
// // // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // // //       initial={{ x: '100%' }}
// // // //       animate={{ x: 0 }}
// // // //       exit={{ x: '100%' }}
// // // //       transition={{ type: 'tween', duration: 0.4 }}
// // // //     >
// // // //         <div className="flex justify-between items-center mb-10 border-b pb-4">
// // // //             <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // // //                 <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // // //             </h2>
// // // //             <motion.button 
// // // //                 onClick={onClose} 
// // // //                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // // //                 whileHover={{ rotate: 90 }}
// // // //             >
// // // //                 <X className="w-6 h-6" />
// // // //             </motion.button>
// // // //         </div>

// // // //         {/* 1. Search Bar */}
// // // //         <form onSubmit={handleSearch} className="mb-10">
// // // //             <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // // //             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // //             <input
// // // //                 type="search"
// // // //                 placeholder="Type and hit Enter..."
// // // //                 value={localSearch}
// // // //                 onChange={(e) => setLocalSearch(e.target.value)}
// // // //                 className="flex-grow p-3 focus:outline-none"
// // // //             />
// // // //             <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // // //                 <Search className="w-5 h-5" />
// // // //             </button>
// // // //             </div>
// // // //         </form>

// // // //         {/* 2. Category Filter */}
// // // //         <div className="mb-10">
// // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // //                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // // //             </h3>
// // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // //             {['all', ...categories.map(c => c.slug)].map((slug) => {
// // // //                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // // //                 return (
// // // //                 <motion.button
// // // //                     key={slug}
// // // //                     onClick={() => onFilterChange(slug)}
// // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // // //                     activeCategory === slug
// // // //                         ? 'bg-blue-600 text-white shadow-md'
// // // //                         : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // //                     }`}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                 >
// // // //                     {name}
// // // //                 </motion.button>
// // // //                 );
// // // //             })}
// // // //             </div>
// // // //         </div>

// // // //         {/* 3. Tier Filter */}
// // // //         <div className="mb-10">
// // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // //                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // // //             </h3>
// // // //             <div className="flex flex-wrap gap-2">
// // // //                 <motion.button
// // // //                     onClick={() => onTierChange(null)}
// // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // //                     activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // // //                     }`}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                 >
// // // //                     All Tiers
// // // //                 </motion.button>
// // // //                 {tiers.map((tier) => (
// // // //                     <motion.button
// // // //                         key={tier.id}
// // // //                         onClick={() => onTierChange(tier.id)}
// // // //                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // // //                         whileTap={{ scale: 0.95 }}
// // // //                     >
// // // //                         {tier.name}
// // // //                     </motion.button>
// // // //                 ))}
// // // //             </div>
// // // //         </div>

// // // //         {/* 4. Tool Filter */}
// // // //         <div>
// // // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // // //                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // // //             </h3>
// // // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // // //                 <motion.button
// // // //                     onClick={() => onToolChange(null)}
// // // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // // //                     activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // // //                     }`}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                 >
// // // //                     Any Tool
// // // //                 </motion.button>
// // // //                 {tools.map((tool) => (
// // // //                     <motion.button
// // // //                         key={tool.id}
// // // //                         onClick={() => onToolChange(tool.id)}
// // // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // // //                         whileTap={{ scale: 0.95 }}
// // // //                     >
// // // //                         {tool.name}
// // // //                     </motion.button>
// // // //                 ))}
// // // //             </div>
// // // //         </div>
// // // //     </motion.div>
// // // //   );
// // // // };
// // // // // --- End FilterPanel ---


// // // // // Function to randomly assign a style (Moved outside of component to avoid re-creation)
// // // // const getRandomCardStyle = (project, index) => {
// // // //     // Determine a few key cards manually for a balanced look, then random for the rest
// // // //     if (index === 0) return CardStyle.COMPLETION_TALL; // Ensure the first card is tall
// // // //     if (index === 1) return CardStyle.BOOK_COMPACT;
// // // //     if (index === 4) return CardStyle.COURSE_WIDE; // Ensure the wide card appears
    
// // // //     const styles = Object.values(CardStyle);
// // // //     // Use a subset for compact layouts to increase the chance of tall/wide cards standing out
// // // //     return styles[Math.floor(Math.random() * styles.length)];
// // // // };


// // // // const Projects = () => {
// // // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // // //   const [projects, setProjects] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
// // // //   // Filtering states
// // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // //   const [activeToolId, setActiveToolId] = useState(null);
// // // //   const [activeTierId, setActiveTierId] = useState(null);
// // // //   const [searchQuery, setSearchQuery] = useState('');
  
// // // //   // --- New: Memoized list of projects with assigned styles ---
// // // //   // This will assign a size/style to each project based on its index
// // // //   const styledProjects = useMemo(() => {
// // // //     return projects.map((project, index) => ({
// // // //       ...project,
// // // //       assignedStyle: getRandomCardStyle(project, index)
// // // //     }));
// // // //   }, [projects]);


// // // //   // Function to load projects
// // // //   const loadProjects = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //         const { data } = await fetchProjects({ 
// // // //             limit: 20, 
// // // //             categorySlug: activeCategory, 
// // // //             searchQuery, 
// // // //             toolId: activeToolId, 
// // // //             tierId: activeTierId 
// // // //         });
// // // //         setProjects(Array.isArray(data) ? data : []); 
// // // //     } catch (error) {
// // // //         console.error("Failed to load projects:", error);
// // // //         setProjects([]);
// // // //     } finally {
// // // //         setLoading(false);
// // // //     }
// // // //   }, [activeCategory, searchQuery, activeToolId, activeTierId]);
  
// // // //   // Effect: Trigger load when filters change
// // // //   useEffect(() => {
// // // //     loadProjects();
// // // //   }, [loadProjects]); 


// // // //   const hasProjects = styledProjects.length > 0;

// // // //   if (loading && projects.length === 0) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // // //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// // // //           <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // // //         </motion.div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="pt-24 pb-48 bg-gray-50 min-h-screen relative overflow-x-hidden">
      
// // // //       {/* Header and Filter Button */}
// // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// // // //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-16">
// // // //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // // //                 <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
// // // //                     <span className="text-blue-600">Dynamic</span> Dashboard
// // // //                 </h1>
// // // //                 <p className="mt-2 text-xl text-gray-600">A visually rich, responsive overview of all projects.</p>
// // // //             </motion.div>

// // // //             <motion.button
// // // //                 onClick={() => setIsFilterOpen(true)}
// // // //                 className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // // //                 whileHover={{ scale: 1.05 }}
// // // //                 whileTap={{ scale: 0.95 }}
// // // //             >
// // // //                 <Filter className="w-5 h-5 mr-2" /> Filters
// // // //             </motion.button>
// // // //         </div>
// // // //       </div>

// // // //       {/* --- FIX: Responsive Masonry Container --- */}
// // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // // //         <div className="max-w-7xl mx-auto">
// // // //           <AnimatePresence>
// // // //               {hasProjects ? (
// // // //                 // FIX: Used CSS Columns for true masonry effect on varying card heights
// // // //                 <motion.div
// // // //                     key="project-grid"
// // // //                     // Tailwind CSS Columns: 1 column by default, 2 on small screens, 3 on large screens
// // // //                     className="columns-1 sm:columns-2 lg:columns-3 gap-8"
// // // //                 >
// // // //                     {styledProjects.map((project) => (
// // // //                         <ProjectCard 
// // // //                             key={project.id} 
// // // //                             project={project} 
// // // //                             assignedStyle={project.assignedStyle}
// // // //                         />
// // // //                     ))}
// // // //                 </motion.div>
// // // //               ) : (
// // // //                 // Empty State
// // // //                 !loading && (
// // // //                     <motion.div 
// // // //                         initial={{ opacity: 0, y: 20 }}
// // // //                         animate={{ opacity: 1, y: 0 }}
// // // //                         className="text-center mt-20 p-12 bg-white rounded-2xl shadow-xl max-w-lg mx-auto"
// // // //                     >
// // // //                         <h3 className="text-2xl font-bold text-gray-900">No Projects Found 😞</h3>
// // // //                         <p className="text-gray-600 mt-2">
// // // //                           The current filters produced no results. Try clearing your search or categories.
// // // //                         </p>
// // // //                     </motion.div>
// // // //                 )
// // // //               )}
// // // //           </AnimatePresence>
// // // //         </div>
// // // //       </div>

// // // //       {/* --- Filter Panel Modal --- */}
// // // //       <AnimatePresence>
// // // //         {isFilterOpen && (
// // // //           <>
// // // //             <FilterPanel
// // // //                 categories={categories || []}
// // // //                 tools={tools || []}
// // // //                 tiers={tiers || []}
// // // //                 activeCategory={activeCategory}
// // // //                 activeToolId={activeToolId}
// // // //                 activeTierId={activeTierId}
// // // //                 searchQuery={searchQuery}
// // // //                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
// // // //                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
// // // //                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
// // // //                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
// // // //                 onClose={() => setIsFilterOpen(false)}
// // // //             />
// // // //             {/* Background overlay */}
// // // //             <motion.div
// // // //                 className="fixed inset-0 bg-black/50 z-40"
// // // //                 initial={{ opacity: 0 }}
// // // //                 animate={{ opacity: 1 }}
// // // //                 exit={{ opacity: 0 }}
// // // //                 onClick={() => setIsFilterOpen(false)}
// // // //             />
// // // //           </>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Projects;

// // // import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Filter, X, Zap, Loader2, Search, Layers, ShieldCheck, List, CheckCircle, Clock } from 'lucide-react';
// // // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // // import { useHomepageData } from '../hooks/useHomepageData'; 
// // // // Import the new card component and styles
// // // import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// // // // --- FilterPanel Component (No changes needed, kept for context) ---
// // // const FilterPanel = ({ 
// // //   categories, tools, tiers,
// // //   activeCategory, activeToolId, activeTierId, searchQuery,
// // //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// // //   onClose,
// // // }) => {
// // //   const [localSearch, setLocalSearch] = useState(searchQuery);

// // //   const handleSearch = (e) => {
// // //     e.preventDefault();
// // //     onSearchChange(localSearch);
// // //   };

// // //   return (
// // //     <motion.div 
// // //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// // //       initial={{ x: '100%' }}
// // //       animate={{ x: 0 }}
// // //       exit={{ x: '100%' }}
// // //       transition={{ type: 'tween', duration: 0.4 }}
// // //     >
// // //         <div className="flex justify-between items-center mb-10 border-b pb-4">
// // //             <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// // //                 <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// // //             </h2>
// // //             <motion.button 
// // //                 onClick={onClose} 
// // //                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// // //                 whileHover={{ rotate: 90 }}
// // //             >
// // //                 <X className="w-6 h-6" />
// // //             </motion.button>
// // //         </div>

// // //         {/* 1. Search Bar */}
// // //         <form onSubmit={handleSearch} className="mb-10">
// // //             <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// // //             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // //             <input
// // //                 type="search"
// // //                 placeholder="Type and hit Enter..."
// // //                 value={localSearch}
// // //                 onChange={(e) => setLocalSearch(e.target.value)}
// // //                 className="flex-grow p-3 focus:outline-none"
// // //             />
// // //             <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// // //                 <Search className="w-5 h-5" />
// // //             </button>
// // //             </div>
// // //         </form>

// // //         {/* 2. Category Filter */}
// // //         <div className="mb-10">
// // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // //                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// // //             </h3>
// // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // //             {['all', ...categories.map(c => c.slug)].map((slug) => {
// // //                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// // //                 return (
// // //                 <motion.button
// // //                     key={slug}
// // //                     onClick={() => onFilterChange(slug)}
// // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// // //                     activeCategory === slug
// // //                         ? 'bg-blue-600 text-white shadow-md'
// // //                         : 'bg-white text-gray-700 border hover:bg-gray-100'
// // //                     }`}
// // //                     whileTap={{ scale: 0.95 }}
// // //                 >
// // //                     {name}
// // //                 </motion.button>
// // //                 );
// // //             })}
// // //             </div>
// // //         </div>

// // //         {/* 3. Tier Filter */}
// // //         <div className="mb-10">
// // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // //                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// // //             </h3>
// // //             <div className="flex flex-wrap gap-2">
// // //                 <motion.button
// // //                     onClick={() => onTierChange(null)}
// // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // //                     activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // //                     }`}
// // //                     whileTap={{ scale: 0.95 }}
// // //                 >
// // //                     All Tiers
// // //                 </motion.button>
// // //                 {tiers.map((tier) => (
// // //                     <motion.button
// // //                         key={tier.id}
// // //                         onClick={() => onTierChange(tier.id)}
// // //                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// // //                         whileTap={{ scale: 0.95 }}
// // //                     >
// // //                         {tier.name}
// // //                     </motion.button>
// // //                 ))}
// // //             </div>
// // //         </div>

// // //         {/* 4. Tool Filter */}
// // //         <div>
// // //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// // //                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// // //             </h3>
// // //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// // //                 <motion.button
// // //                     onClick={() => onToolChange(null)}
// // //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// // //                     activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// // //                     }`}
// // //                     whileTap={{ scale: 0.95 }}
// // //                 >
// // //                     Any Tool
// // //                 </motion.button>
// // //                 {tools.map((tool) => (
// // //                     <motion.button
// // //                         key={tool.id}
// // //                         onClick={() => onToolChange(tool.id)}
// // //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// // //                         whileTap={{ scale: 0.95 }}
// // //                     >
// // //                         {tool.name}
// // //                     </motion.button>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     </motion.div>
// // //   );
// // // };
// // // // --- End FilterPanel ---


// // // // Function to randomly assign a style (only used for the Grid view now)
// // // const getRandomCardStyle = (project, index) => {
// // //     // Only return the simplified UNIFIED_DESIGN for the Grid view
// // //     return CardStyle.UNIFIED_DESIGN;
// // // };


// // // const Projects = () => {
// // //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// // //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// // //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// // //   const [projects, setProjects] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// // //   // --- NEW STATE for toggling the view mode ---
// // //   const [isDeckViewActive, setIsDeckViewActive] = useState(true); 
  
// // //   // Filtering states
// // //   const [activeCategory, setActiveCategory] = useState('all');
// // //   const [activeToolId, setActiveToolId] = useState(null);
// // //   const [activeTierId, setActiveTierId] = useState(null);
// // //   const [searchQuery, setSearchQuery] = useState('');
  
// // //   // --- Memoized list of projects with assigned styles (used only for the Grid view) ---
// // //   const styledProjects = useMemo(() => {
// // //     return projects.map((project, index) => ({
// // //       ...project,
// // //       assignedStyle: getRandomCardStyle(project, index)
// // //     }));
// // //   }, [projects]);


// // //   // Function to load projects
// // //   const loadProjects = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //         const { data } = await fetchProjects({ 
// // //             limit: isDeckViewActive ? 10 : 20, // Load fewer for the deck view
// // //             categorySlug: activeCategory, 
// // //             searchQuery, 
// // //             toolId: activeToolId, 
// // //             tierId: activeTierId 
// // //         });
// // //         setProjects(Array.isArray(data) ? data : []); 
// // //     } catch (error) {
// // //         console.error("Failed to load projects:", error);
// // //         setProjects([]);
// // //     } finally {
// // //         setLoading(false);
// // //     }
// // //   }, [activeCategory, searchQuery, activeToolId, activeTierId, isDeckViewActive]);
  
// // //   // Effect: Trigger load when filters change
// // //   useEffect(() => {
// // //     loadProjects();
// // //   }, [loadProjects]); 


// // //   const hasProjects = styledProjects.length > 0;
// // //   // Limit projects for the deck view to ensure proper overlap/display
// // //   const deckProjects = styledProjects.slice(0, 10);

// // //   if (loading && projects.length === 0) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// // //           <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
// // //         </motion.div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="pt-24 pb-48 bg-gray-900 min-h-screen relative overflow-x-hidden">
      
// // //       {/* Header and Filter Button */}
// // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// // //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-16">
// // //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // //                 <h1 className="text-6xl font-extrabold text-white leading-tight">
// // //                     <span className="text-blue-400">Project </span> 
// // //                     {isDeckViewActive ? 'Deck View' : 'Dashboard'}
// // //                 </h1>
// // //                 <p className="mt-2 text-xl text-gray-400">
// // //                     {isDeckViewActive ? 'Hover and click a card to select it.' : 'A visually rich, responsive overview of all projects.'}
// // //                 </p>
// // //             </motion.div>

// // //             <div className="flex space-x-4">
// // //                 <motion.button
// // //                     onClick={() => setIsDeckViewActive(!isDeckViewActive)}
// // //                     className="bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// // //                     whileHover={{ scale: 1.05 }}
// // //                     whileTap={{ scale: 0.95 }}
// // //                 >
// // //                     <Layers className="w-5 h-5 mr-2" /> 
// // //                     {isDeckViewActive ? 'Switch to Grid' : 'Switch to Deck'}
// // //                 </motion.button>
// // //                 <motion.button
// // //                     onClick={() => setIsFilterOpen(true)}
// // //                     className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors inline-flex items-center"
// // //                     whileHover={{ scale: 1.05 }}
// // //                     whileTap={{ scale: 0.95 }}
// // //                 >
// // //                     <Filter className="w-5 h-5 mr-2" /> Filters
// // //                 </motion.button>
// // //             </div>
// // //         </div>
// // //       </div>

// // //       <AnimatePresence mode="wait">
// // //         {hasProjects ? (
            
// // //             isDeckViewActive ? (
// // //                 // --- Deck Container: Diagonal Stack ---
// // //                 <motion.div
// // //                     key="project-deck"
// // //                     initial={{ opacity: 0, scale: 0.9 }}
// // //                     animate={{ opacity: 1, scale: 1 }}
// // //                     exit={{ opacity: 0, scale: 0.9 }}
// // //                     transition={{ duration: 0.5 }}
// // //                     className="flex justify-center items-start min-h-[600px] mt-20 relative z-0"
// // //                 >
// // //                     <div className="relative w-[500px] h-[500px]"> 
// // //                         {deckProjects.map((project, index) => (
// // //                             <ProjectCard 
// // //                                 key={project.id} 
// // //                                 project={project} 
// // //                                 index={index}
// // //                                 isDeckView={true} // Explicitly set mode
// // //                             />
// // //                         ))}
// // //                     </div>
// // //                 </motion.div>
                
// // //             ) : (
// // //                 // --- Masonry Grid Container: Standard View ---
// // //                 <motion.div
// // //                     key="project-grid"
// // //                     initial={{ opacity: 0, scale: 0.9 }}
// // //                     animate={{ opacity: 1, scale: 1 }}
// // //                     exit={{ opacity: 0, scale: 0.9 }}
// // //                     transition={{ duration: 0.5 }}
// // //                     className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
// // //                 >
// // //                     {/* CSS Columns for true masonry effect on varying card heights */}
// // //                     <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
// // //                         {styledProjects.map((project) => (
// // //                             <ProjectCard 
// // //                                 key={project.id} 
// // //                                 project={project} 
// // //                                 isDeckView={false} // Explicitly set mode
// // //                             />
// // //                         ))}
// // //                     </div>
// // //                 </motion.div>
// // //             )
// // //         ) : (
// // //             // Empty State
// // //             !loading && (
// // //                 <motion.div 
// // //                     key="empty-state"
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     exit={{ opacity: 0, y: -20 }}
// // //                     className="text-center mt-20 p-12 bg-gray-800 rounded-2xl shadow-xl max-w-lg mx-auto text-white"
// // //                 >
// // //                     <h3 className="text-2xl font-bold text-blue-400">No Projects Found 😞</h3>
// // //                     <p className="text-gray-400 mt-2">
// // //                       The current filters produced no results. Try clearing your search or categories.
// // //                     </p>
// // //                 </motion.div>
// // //             )
// // //         )}
// // //       </AnimatePresence>

// // //       {/* --- Filter Panel Modal --- */}
// // //       <AnimatePresence>
// // //         {isFilterOpen && (
// // //           <>
// // //             <FilterPanel
// // //                 categories={categories || []}
// // //                 tools={tools || []}
// // //                 tiers={tiers || []}
// // //                 activeCategory={activeCategory}
// // //                 activeToolId={activeToolId}
// // //                 activeTierId={activeTierId}
// // //                 searchQuery={searchQuery}
// // //                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
// // //                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
// // //                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
// // //                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
// // //                 onClose={() => setIsFilterOpen(false)}
// // //             />
// // //             {/* Background overlay */}
// // //             <motion.div
// // //                 className="fixed inset-0 bg-black/50 z-40"
// // //                 initial={{ opacity: 0 }}
// // //                 animate={{ opacity: 1 }}
// // //                 exit={{ opacity: 0 }}
// // //                 onClick={() => setIsFilterOpen(false)}
// // //             />
// // //           </>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // };

// // // export default Projects;

// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Filter, X, Loader2, Search, Layers, ShieldCheck, List, ChevronLeft, ChevronRight } from 'lucide-react';
// // import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// // import { useHomepageData } from '../hooks/useHomepageData'; 
// // // Import the card component and styles
// // import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// // // --- FilterPanel Component (Kept for context, no changes) ---
// // const FilterPanel = ({ 
// //   categories, tools, tiers,
// //   activeCategory, activeToolId, activeTierId, searchQuery,
// //   onFilterChange, onToolChange, onTierChange, onSearchChange,
// //   onClose,
// // }) => {
// //   const [localSearch, setLocalSearch] = useState(searchQuery);

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     onSearchChange(localSearch);
// //   };

// //   return (
// //     <motion.div 
// //       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
// //       initial={{ x: '100%' }}
// //       animate={{ x: 0 }}
// //       exit={{ x: '100%' }}
// //       transition={{ type: 'tween', duration: 0.4 }}
// //     >
// //         <div className="flex justify-between items-center mb-10 border-b pb-4">
// //             <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
// //                 <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
// //             </h2>
// //             <motion.button 
// //                 onClick={onClose} 
// //                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
// //                 whileHover={{ rotate: 90 }}
// //             >
// //                 <X className="w-6 h-6" />
// //             </motion.button>
// //         </div>

// //         {/* 1. Search Bar */}
// //         <form onSubmit={handleSearch} className="mb-10">
// //             <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
// //             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// //             <input
// //                 type="search"
// //                 placeholder="Type and hit Enter..."
// //                 value={localSearch}
// //                 onChange={(e) => setLocalSearch(e.target.value)}
// //                 className="flex-grow p-3 focus:outline-none"
// //             />
// //             <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
// //                 <Search className="w-5 h-5" />
// //             </button>
// //             </div>
// //         </form>

// //         {/* 2. Category Filter */}
// //         <div className="mb-10">
// //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// //                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
// //             </h3>
// //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// //             {['all', ...categories.map(c => c.slug)].map((slug) => {
// //                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
// //                 return (
// //                 <motion.button
// //                     key={slug}
// //                     onClick={() => onFilterChange(slug)}
// //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
// //                     activeCategory === slug
// //                         ? 'bg-blue-600 text-white shadow-md'
// //                         : 'bg-white text-gray-700 border hover:bg-gray-100'
// //                     }`}
// //                     whileTap={{ scale: 0.95 }}
// //                 >
// //                     {name}
// //                 </motion.button>
// //                 );
// //             })}
// //             </div>
// //         </div>

// //         {/* 3. Tier Filter */}
// //         <div className="mb-10">
// //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// //                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
// //             </h3>
// //             <div className="flex flex-wrap gap-2">
// //                 <motion.button
// //                     onClick={() => onTierChange(null)}
// //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// //                     activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //                     }`}
// //                     whileTap={{ scale: 0.95 }}
// //                 >
// //                     All Tiers
// //                 </motion.button>
// //                 {tiers.map((tier) => (
// //                     <motion.button
// //                         key={tier.id}
// //                         onClick={() => onTierChange(tier.id)}
// //                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
// //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
// //                         whileTap={{ scale: 0.95 }}
// //                     >
// //                         {tier.name}
// //                     </motion.button>
// //                 ))}
// //             </div>
// //         </div>

// //         {/* 4. Tool Filter */}
// //         <div>
// //             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
// //                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
// //             </h3>
// //             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
// //                 <motion.button
// //                     onClick={() => onToolChange(null)}
// //                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
// //                     activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
// //                     }`}
// //                     whileTap={{ scale: 0.95 }}
// //                 >
// //                     Any Tool
// //                 </motion.button>
// //                 {tools.map((tool) => (
// //                     <motion.button
// //                         key={tool.id}
// //                         onClick={() => onToolChange(tool.id)}
// //                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
// //                         whileTap={{ scale: 0.95 }}
// //                     >
// //                         {tool.name}
// //                     </motion.button>
// //                 ))}
// //             </div>
// //         </div>
// //     </motion.div>
// //   );
// // };
// // // --- End FilterPanel ---

// // const Projects = () => {
// //   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
// //   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
// //   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

// //   const [projects, setProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [isDeckViewActive, setIsDeckViewActive] = useState(true); 
  
// //   // --- NEW: Deck Pagination State ---
// //   const [deckIndex, setDeckIndex] = useState(0); 
// //   const CARDS_PER_DECK = 7; // Display limit for the deck view

// //   // Filtering states
// //   const [activeCategory, setActiveCategory] = useState('all');
// //   const [activeToolId, setActiveToolId] = useState(null);
// //   const [activeTierId, setActiveTierId] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState('');
  
// //   // Memoized list of projects (used only for the Grid view)
// //   const styledProjects = useMemo(() => {
// //     return projects.map((project) => ({
// //       ...project,
// //       assignedStyle: CardStyle.UNIFIED_DESIGN // Only one style used for simplicity in the grid
// //     }));
// //   }, [projects]);


// //   // Function to load projects
// //   const loadProjects = useCallback(async () => {
// //     setLoading(true);
// //     // Load enough projects to fill at least a few decks (e.g., 21 cards)
// //     const limit = isDeckViewActive ? 21 : 30; 
// //     try {
// //         const { data } = await fetchProjects({ 
// //             limit: limit, 
// //             categorySlug: activeCategory, 
// //             searchQuery, 
// //             toolId: activeToolId, 
// //             tierId: activeTierId 
// //         });
// //         setProjects(Array.isArray(data) ? data : []); 
// //         setDeckIndex(0); // Reset deck index on new filter/load
// //     } catch (error) {
// //         console.error("Failed to load projects:", error);
// //         setProjects([]);
// //     } finally {
// //         setLoading(false);
// //     }
// //   }, [activeCategory, searchQuery, activeToolId, activeTierId, isDeckViewActive]);
  
// //   // Effect: Trigger load when filters change
// //   useEffect(() => {
// //     loadProjects();
// //   }, [loadProjects]); 

// //   // --- Deck Pagination Logic ---
// //   const totalDecks = Math.ceil(projects.length / CARDS_PER_DECK);
// //   const startCardIndex = deckIndex * CARDS_PER_DECK;
// //   const endCardIndex = startCardIndex + CARDS_PER_DECK;
  
// //   const visibleDeckProjects = styledProjects.slice(startCardIndex, endCardIndex);
  
// //   const goToNextDeck = () => {
// //     if (deckIndex < totalDecks - 1) {
// //         setDeckIndex(deckIndex + 1);
// //     }
// //   };

// //   const goToPrevDeck = () => {
// //     if (deckIndex > 0) {
// //         setDeckIndex(deckIndex - 1);
// //     }
// //   };

// //   const hasProjects = styledProjects.length > 0;
// //   const canGoNext = deckIndex < totalDecks - 1;
// //   const canGoPrev = deckIndex > 0;


// //   if (loading && projects.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-900">
// //         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
// //           <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
// //         </motion.div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="pt-24 pb-48 bg-gray-900 min-h-screen relative overflow-x-hidden">
      
// //       {/* Header and Filter Button */}
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// //         <div className="flex justify-between items-center max-w-7xl mx-auto mb-16">
// //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// //                 <h1 className="text-6xl font-extrabold text-white leading-tight">
// //                     <span className="text-blue-400">Project </span> 
// //                     {isDeckViewActive ? 'Deck View' : 'Dashboard'}
// //                 </h1>
// //                 <p className="mt-2 text-xl text-gray-400">
// //                     {isDeckViewActive ? 'Hover a card to view details, or use the arrows to browse decks.' : 'A visually rich, responsive overview of all projects.'}
// //                 </p>
// //             </motion.div>

// //             <div className="flex space-x-4">
// //                 <motion.button
// //                     onClick={() => setIsDeckViewActive(!isDeckViewActive)}
// //                     className="bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                 >
// //                     <Layers className="w-5 h-5 mr-2" /> 
// //                     {isDeckViewActive ? 'Switch to Grid' : 'Switch to Deck'}
// //                 </motion.button>
// //                 <motion.button
// //                     onClick={() => setIsFilterOpen(true)}
// //                     className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors inline-flex items-center"
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                 >
// //                     <Filter className="w-5 h-5 mr-2" /> Filters
// //                 </motion.button>
// //             </div>
// //         </div>
// //       </div>

// //       <AnimatePresence mode="wait">
// //         {hasProjects ? (
            
// //             isDeckViewActive ? (
// //                 // --- Deck Container: Diagonal Stack with Pagination ---
// //                 <motion.div
// //                     key="project-deck-container"
// //                     className="flex flex-col items-center justify-center w-full min-h-[700px] relative z-0 overflow-hidden"
// //                 >
// //                     {/* Pagination Info */}
// //                     <motion.p 
// //                         key={`info-${deckIndex}`}
// //                         initial={{ opacity: 0, y: -10 }} 
// //                         animate={{ opacity: 1, y: 0 }} 
// //                         exit={{ opacity: 0, y: 10 }} 
// //                         className="text-gray-400 text-sm mb-4">
// //                         Showing deck {deckIndex + 1} of {totalDecks} (Projects {startCardIndex + 1} - {Math.min(endCardIndex, projects.length)})
// //                     </motion.p>
                    
// //                     <div className="flex items-center justify-center w-full max-w-7xl">
// //                         {/* Left Button */}
// //                         <motion.button
// //                             onClick={goToPrevDeck}
// //                             disabled={!canGoPrev}
// //                             className={`p-4 rounded-full transition-all duration-300 ${
// //                                 canGoPrev ? 'bg-gray-700 text-white hover:bg-blue-500 shadow-xl' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
// //                             }`}
// //                             whileHover={canGoPrev ? { scale: 1.1 } : {}}
// //                             whileTap={canGoPrev ? { scale: 0.9 } : {}}
// //                         >
// //                             <ChevronLeft className="w-6 h-6" />
// //                         </motion.button>

// //                         {/* Deck Area */}
// //                         <motion.div 
// //                             key={`deck-${deckIndex}`} // Key change forces re-animation on pagination
// //                             initial={{ opacity: 0, x: 50 }}
// //                             animate={{ opacity: 1, x: 0 }}
// //                             exit={{ opacity: 0, x: -50 }}
// //                             transition={{ type: "spring", stiffness: 100, damping: 15 }}
// //                             className="relative w-[500px] h-[500px] mx-10 flex justify-center items-center" 
// //                         >
// //                             {visibleDeckProjects.map((project, index) => (
// //                                 <ProjectCard 
// //                                     key={project.id} // Use project ID as key for stability within the deck
// //                                     project={project} 
// //                                     index={index}
// //                                     isDeckView={true} 
// //                                 />
// //                             ))}
// //                             {!visibleDeckProjects.length && (
// //                                 <p className="text-gray-500 absolute">No more projects in this filter.</p>
// //                             )}
// //                         </motion.div>

// //                         {/* Right Button */}
// //                         <motion.button
// //                             onClick={goToNextDeck}
// //                             disabled={!canGoNext}
// //                             className={`p-4 rounded-full transition-all duration-300 ${
// //                                 canGoNext ? 'bg-gray-700 text-white hover:bg-blue-500 shadow-xl' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
// //                             }`}
// //                             whileHover={canGoNext ? { scale: 1.1 } : {}}
// //                             whileTap={canGoNext ? { scale: 0.9 } : {}}
// //                         >
// //                             <ChevronRight className="w-6 h-6" />
// //                         </motion.button>
// //                     </div>
// //                 </motion.div>
                
// //             ) : (
// //                 // --- Masonry Grid Container: Standard View ---
// //                 <motion.div
// //                     key="project-grid"
// //                     initial={{ opacity: 0, y: 30 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: -30 }}
// //                     transition={{ duration: 0.5 }}
// //                     className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
// //                 >
// //                     <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
// //                         {styledProjects.map((project) => (
// //                             <ProjectCard 
// //                                 key={project.id} 
// //                                 project={project} 
// //                                 isDeckView={false} 
// //                             />
// //                         ))}
// //                     </div>
// //                 </motion.div>
// //             )
// //         ) : (
// //             // Empty State
// //             !loading && (
// //                 <motion.div 
// //                     key="empty-state"
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: -20 }}
// //                     className="text-center mt-20 p-12 bg-gray-800 rounded-2xl shadow-xl max-w-lg mx-auto text-white"
// //                 >
// //                     <h3 className="text-2xl font-bold text-blue-400">No Projects Found 😞</h3>
// //                     <p className="text-gray-400 mt-2">
// //                       The current filters produced no results. Try clearing your search or categories.
// //                     </p>
// //                 </motion.div>
// //             )
// //         )}
// //       </AnimatePresence>

// //       {/* --- Filter Panel Modal --- */}
// //       <AnimatePresence>
// //         {isFilterOpen && (
// //           <>
// //             <FilterPanel
// //                 categories={categories || []}
// //                 tools={tools || []}
// //                 tiers={tiers || []}
// //                 activeCategory={activeCategory}
// //                 activeToolId={activeToolId}
// //                 activeTierId={activeTierId}
// //                 searchQuery={searchQuery}
// //                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
// //                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
// //                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
// //                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
// //                 onClose={() => setIsFilterOpen(false)}
// //             />
// //             {/* Background overlay */}
// //             <motion.div
// //                 className="fixed inset-0 bg-black/50 z-40"
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 exit={{ opacity: 0 }}
// //                 onClick={() => setIsFilterOpen(false)}
// //             />
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default Projects;
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Filter, X, Loader2, Search, Layers, ShieldCheck, List, ChevronLeft, ChevronRight } from 'lucide-react';
// import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// import { useHomepageData } from '../hooks/useHomepageData'; 
// // Import the card component and styles
// import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// // --- FilterPanel Component (Kept for context, no changes) ---
// const FilterPanel = ({ 
//   categories, tools, tiers,
//   activeCategory, activeToolId, activeTierId, searchQuery,
//   onFilterChange, onToolChange, onTierChange, onSearchChange,
//   onClose,
// }) => {
//   const [localSearch, setLocalSearch] = useState(searchQuery);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearchChange(localSearch);
//   };

//   return (
//     <motion.div 
//       className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
//       initial={{ x: '100%' }}
//       animate={{ x: 0 }}
//       exit={{ x: '100%' }}
//       transition={{ type: 'tween', duration: 0.4 }}
//     >
//         <div className="flex justify-between items-center mb-10 border-b pb-4">
//             <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
//                 <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
//             </h2>
//             <motion.button 
//                 onClick={onClose} 
//                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
//                 whileHover={{ rotate: 90 }}
//             >
//                 <X className="w-6 h-6" />
//             </motion.button>
//         </div>

//         {/* 1. Search Bar */}
//         <form onSubmit={handleSearch} className="mb-10">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//             <input
//                 type="search"
//                 placeholder="Type and hit Enter..."
//                 value={localSearch}
//                 onChange={(e) => setLocalSearch(e.target.value)}
//                 className="flex-grow p-3 focus:outline-none"
//             />
//             <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
//                 <Search className="w-5 h-5" />
//             </button>
//             </div>
//         </form>

//         {/* 2. Category Filter */}
//         <div className="mb-10">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                 <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
//             </h3>
//             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
//             {['all', ...categories.map(c => c.slug)].map((slug) => {
//                 const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
//                 return (
//                 <motion.button
//                     key={slug}
//                     onClick={() => onFilterChange(slug)}
//                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
//                     activeCategory === slug
//                         ? 'bg-blue-600 text-white shadow-md'
//                         : 'bg-white text-gray-700 border hover:bg-gray-100'
//                     }`}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     {name}
//                 </motion.button>
//                 );
//             })}
//             </div>
//         </div>

//         {/* 3. Tier Filter */}
//         <div className="mb-10">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                 <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
//             </h3>
//             <div className="flex flex-wrap gap-2">
//                 <motion.button
//                     onClick={() => onTierChange(null)}
//                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
//                     activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     All Tiers
//                 </motion.button>
//                 {tiers.map((tier) => (
//                     <motion.button
//                         key={tier.id}
//                         onClick={() => onTierChange(tier.id)}
//                         style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
//                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         {tier.name}
//                     </motion.button>
//                 ))}
//             </div>
//         </div>

//         {/* 4. Tool Filter */}
//         <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                 <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
//             </h3>
//             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
//                 <motion.button
//                     onClick={() => onToolChange(null)}
//                     className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
//                     activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
//                     }`}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     Any Tool
//                 </motion.button>
//                 {tools.map((tool) => (
//                     <motion.button
//                         key={tool.id}
//                         onClick={() => onToolChange(tool.id)}
//                         className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         {tool.name}
//                     </motion.button>
//                 ))}
//             </div>
//         </div>
//     </motion.div>
//   );
// };
// // --- End FilterPanel ---

// const Projects = () => {
//   const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
//   const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
//   const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isDeckViewActive, setIsDeckViewActive] = useState(true); 
  
//   // --- NEW: Deck Pagination State ---
//   const [deckIndex, setDeckIndex] = useState(0); 
//   const CARDS_PER_DECK = 7; // Display limit for the deck view

//   // Filtering states
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [activeToolId, setActiveToolId] = useState(null);
//   const [activeTierId, setActiveTierId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Memoized list of projects (used only for the Grid view)
//   const styledProjects = useMemo(() => {
//     return projects.map((project) => ({
//       ...project,
//       assignedStyle: CardStyle.UNIFIED_DESIGN // Only one style used for simplicity in the grid
//     }));
//   }, [projects]);


//   // Function to load projects
//   const loadProjects = useCallback(async () => {
//     setLoading(true);
//     // Load enough projects to fill at least a few decks (e.g., 21 cards)
//     // Removed the limit check based on view type, let's load a standard amount
//     const limit = 30; 
//     try {
//         const { data } = await fetchProjects({ 
//             limit: limit, 
//             categorySlug: activeCategory, 
//             searchQuery, 
//             toolId: activeToolId, 
//             tierId: activeTierId 
//         });
//         setProjects(Array.isArray(data) ? data : []); 
//         setDeckIndex(0); // Reset deck index on new filter/load
//     } catch (error) {
//         console.error("Failed to load projects:", error);
//         setProjects([]);
//     } finally {
//         setLoading(false);
//     }
//   }, [activeCategory, searchQuery, activeToolId, activeTierId]); // Removed isDeckViewActive from dependency array
  
//   // Effect: Trigger load when filters change
//   useEffect(() => {
//     loadProjects();
//   }, [loadProjects]); 

//   // --- Deck Pagination Logic ---
//   const totalDecks = Math.ceil(projects.length / CARDS_PER_DECK);
//   const startCardIndex = deckIndex * CARDS_PER_DECK;
//   const endCardIndex = startCardIndex + CARDS_PER_DECK;
  
//   const visibleDeckProjects = styledProjects.slice(startCardIndex, endCardIndex);
  
//   const goToNextDeck = () => {
//     if (deckIndex < totalDecks - 1) {
//         setDeckIndex(deckIndex + 1);
//     }
//   };

//   const goToPrevDeck = () => {
//     if (deckIndex > 0) {
//         setDeckIndex(deckIndex - 1);
//     }
//   };

//   const hasProjects = styledProjects.length > 0;
//   const canGoNext = deckIndex < totalDecks - 1;
//   const canGoPrev = deckIndex > 0;


//   if (loading && projects.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
//           <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-24 pb-48 bg-gray-900 min-h-screen relative overflow-x-hidden">
      
//       {/* Header and Filter Button */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="flex justify-between items-center max-w-7xl mx-auto mb-16">
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//                 <h1 className="text-6xl font-extrabold text-white leading-tight">
//                     <span className="text-blue-400">Project </span> 
//                     {isDeckViewActive ? 'Fan Deck' : 'Dashboard'}
//                 </h1>
//                 <p className="mt-2 text-xl text-gray-400">
//                     {isDeckViewActive ? 'Hover a card to view details, or use the arrows to browse decks.' : 'A visually rich, responsive overview of all projects.'}
//                 </p>
//             </motion.div>

//             <div className="flex space-x-4">
//                 <motion.button
//                     onClick={() => setIsDeckViewActive(!isDeckViewActive)}
//                     className="bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     <Layers className="w-5 h-5 mr-2" /> 
//                     {isDeckViewActive ? 'Switch to Grid' : 'Switch to Fan Deck'}
//                 </motion.button>
//                 <motion.button
//                     onClick={() => setIsFilterOpen(true)}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors inline-flex items-center"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     <Filter className="w-5 h-5 mr-2" /> Filters
//                 </motion.button>
//             </div>
//         </div>
//       </div>

//       <AnimatePresence mode="wait">
//         {hasProjects ? (
            
//             isDeckViewActive ? (
//                 // --- Deck Container: Fan Spread with Pagination ---
//                 <motion.div
//                     key="project-deck-container"
//                     className="flex flex-col items-center justify-center w-full min-h-[700px] relative z-0 overflow-hidden"
//                 >
//                     {/* Pagination Info */}
//                     <motion.p 
//                         key={`info-${deckIndex}`}
//                         initial={{ opacity: 0, y: -10 }} 
//                         animate={{ opacity: 1, y: 0 }} 
//                         exit={{ opacity: 0, y: 10 }} 
//                         className="text-gray-400 text-sm mb-4">
//                         Showing deck {deckIndex + 1} of {totalDecks} (Projects {startCardIndex + 1} - {Math.min(endCardIndex, projects.length)})
//                     </motion.p>
                    
//                     <div className="flex items-center justify-center w-full max-w-7xl">
//                         {/* Left Button */}
//                         <motion.button
//                             onClick={goToPrevDeck}
//                             disabled={!canGoPrev}
//                             className={`p-4 rounded-full transition-all duration-300 ${
//                                 canGoPrev ? 'bg-gray-700 text-white hover:bg-blue-500 shadow-xl' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
//                             }`}
//                             whileHover={canGoPrev ? { scale: 1.1 } : {}}
//                             whileTap={canGoPrev ? { scale: 0.9 } : {}}
//                         >
//                             <ChevronLeft className="w-6 h-6" />
//                         </motion.button>

//                         {/* Deck Area (Increased width to accommodate the spread) */}
//                         <motion.div 
//                             key={`deck-${deckIndex}`} // Key change forces re-animation on pagination
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.8 }}
//                             transition={{ type: "spring", stiffness: 100, damping: 15 }}
//                             className="relative w-[700px] h-[500px] mx-10 flex justify-center items-center" // Increased width to 700px
//                         >
//                             {visibleDeckProjects.map((project, index) => (
//                                 <ProjectCard 
//                                     key={project.id} // Use project ID as key for stability within the deck
//                                     project={project} 
//                                     index={index}
//                                     isDeckView={true} 
//                                 />
//                             ))}
//                             {!visibleDeckProjects.length && (
//                                 <p className="text-gray-500 absolute">No more projects in this filter.</p>
//                             )}
//                         </motion.div>

//                         {/* Right Button */}
//                         <motion.button
//                             onClick={goToNextDeck}
//                             disabled={!canGoNext}
//                             className={`p-4 rounded-full transition-all duration-300 ${
//                                 canGoNext ? 'bg-gray-700 text-white hover:bg-blue-500 shadow-xl' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
//                             }`}
//                             whileHover={canGoNext ? { scale: 1.1 } : {}}
//                             whileTap={canGoNext ? { scale: 0.9 } : {}}
//                         >
//                             <ChevronRight className="w-6 h-6" />
//                         </motion.button>
//                     </div>
//                 </motion.div>
                
//             ) : (
//                 // --- Masonry Grid Container: Standard View ---
//                 <motion.div
//                     key="project-grid"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -30 }}
//                     transition={{ duration: 0.5 }}
//                     className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
//                 >
//                     <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
//                         {styledProjects.map((project) => (
//                             <ProjectCard 
//                                 key={project.id} 
//                                 project={project} 
//                                 isDeckView={false} 
//                             />
//                         ))}
//                     </div>
//                 </motion.div>
//             )
//         ) : (
//             // Empty State
//             !loading && (
//                 <motion.div 
//                     key="empty-state"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className="text-center mt-20 p-12 bg-gray-800 rounded-2xl shadow-xl max-w-lg mx-auto text-white"
//                 >
//                     <h3 className="text-2xl font-bold text-blue-400">No Projects Found 😞</h3>
//                     <p className="text-gray-400 mt-2">
//                       The current filters produced no results. Try clearing your search or categories.
//                     </p>
//                 </motion.div>
//             )
//         )}
//       </AnimatePresence>

//       {/* --- Filter Panel Modal --- */}
//       <AnimatePresence>
//         {isFilterOpen && (
//           <>
//             <FilterPanel
//                 categories={categories || []}
//                 tools={tools || []}
//                 tiers={tiers || []}
//                 activeCategory={activeCategory}
//                 activeToolId={activeToolId}
//                 activeTierId={activeTierId}
//                 searchQuery={searchQuery}
//                 onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
//                 onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
//                 onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
//                 onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
//                 onClose={() => setIsFilterOpen(false)}
//             />
//             {/* Background overlay */}
//             <motion.div
//                 className="fixed inset-0 bg-black/50 z-40"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setIsFilterOpen(false)}
//             />
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Projects;

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Loader2, Search, Layers, ShieldCheck, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
import { useHomepageData } from '../hooks/useHomepageData'; 
// Import the card component and styles
import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// --- FilterPanel Component (Kept for context, no changes) ---
const FilterPanel = ({ 
  categories, tools, tiers,
  activeCategory, activeToolId, activeTierId, searchQuery,
  onFilterChange, onToolChange, onTierChange, onSearchChange,
  onClose,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto p-8 md:p-12 lg:w-1/3 lg:right-0 lg:left-auto"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.4 }}
    >
        <div className="flex justify-between items-center mb-10 border-b pb-4">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                <Filter className="w-6 h-6 mr-2 text-blue-600" /> Advanced Filtering
            </h2>
            <motion.button 
                onClick={onClose} 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                whileHover={{ rotate: 90 }}
            >
                <X className="w-6 h-6" />
            </motion.button>
        </div>

        {/* 1. Search Bar */}
        <form onSubmit={handleSearch} className="mb-10">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Projects</label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input
                type="search"
                placeholder="Type and hit Enter..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="flex-grow p-3 focus:outline-none"
            />
            <button type="submit" className="bg-blue-600 text-white p-3 hover:bg-blue-700">
                <Search className="w-5 h-5" />
            </button>
            </div>
        </form>

        {/* 2. Category Filter */}
        <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-blue-500" /> Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
            {['all', ...categories.map(c => c.slug)].map((slug) => {
                const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
                return (
                <motion.button
                    key={slug}
                    onClick={() => onFilterChange(slug)}
                    className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all ${
                    activeCategory === slug
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border hover:bg-gray-100'
                    }`}
                    whileTap={{ scale: 0.95 }}
                >
                    {name}
                </motion.button>
                );
            })}
            </div>
        </div>

        {/* 3. Tier Filter */}
        <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-red-500" /> Filter by Complexity Tier
            </h3>
            <div className="flex flex-wrap gap-2">
                <motion.button
                    onClick={() => onTierChange(null)}
                    className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
                    activeTierId === null ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileTap={{ scale: 0.95 }}
                >
                    All Tiers
                </motion.button>
                {tiers.map((tier) => (
                    <motion.button
                        key={tier.id}
                        onClick={() => onTierChange(tier.id)}
                        style={{ backgroundColor: activeTierId === tier.id ? tier.color_hex : '', color: activeTierId === tier.id ? '#ffffff' : '' }} 
                        className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeTierId !== tier.id ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'shadow-md'}`}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tier.name}
                    </motion.button>
                ))}
            </div>
        </div>

        {/* 4. Tool Filter */}
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <List className="w-5 h-5 mr-2 text-green-500" /> Filter by Technology
            </h3>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
                <motion.button
                    onClick={() => onToolChange(null)}
                    className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
                    activeToolId === null ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
                    }`}
                    whileTap={{ scale: 0.95 }}
                >
                    Any Tool
                </motion.button>
                {tools.map((tool) => (
                    <motion.button
                        key={tool.id}
                        onClick={() => onToolChange(tool.id)}
                        className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${activeToolId === tool.id ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tool.name}
                    </motion.button>
                ))}
            </div>
        </div>
    </motion.div>
  );
};
// --- End FilterPanel ---

const Projects = () => {
  const { data: categories } = useHomepageData(fetchProjectCategories, 'project_categories');
  const { data: tools } = useHomepageData(fetchProjectTools, 'project_tools'); 
  const { data: tiers } = useHomepageData(fetchProjectTiers, 'project_tiers'); 

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeckViewActive, setIsDeckViewActive] = useState(true); 
  
  // --- Deck Pagination State ---
  const [deckIndex, setDeckIndex] = useState(0); 
  const CARDS_PER_DECK = 7; // Display limit for the deck view

  // Filtering states
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeToolId, setActiveToolId] = useState(null);
  const [activeTierId, setActiveTierId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Memoized list of projects (used only for the Grid view)
  const styledProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      assignedStyle: CardStyle.UNIFIED_DESIGN // Only one style used for simplicity in the grid
    }));
  }, [projects]);


  // Function to load projects
  const loadProjects = useCallback(async () => {
    setLoading(true);
    // Load enough projects to fill at least a few decks (e.g., 21 cards)
    // Removed the limit check based on view type, let's load a standard amount
    const limit = 30; 
    try {
        const { data } = await fetchProjects({ 
            limit: limit, 
            categorySlug: activeCategory, 
            searchQuery, 
            toolId: activeToolId, 
            tierId: activeTierId 
        });
        setProjects(Array.isArray(data) ? data : []); 
        setDeckIndex(0); // Reset deck index on new filter/load
    } catch (error) {
        console.error("Failed to load projects:", error);
        setProjects([]);
    } finally {
        setLoading(false);
    }
  }, [activeCategory, searchQuery, activeToolId, activeTierId]); // Removed isDeckViewActive from dependency array
  
  // Effect: Trigger load when filters change
  useEffect(() => {
    loadProjects();
  }, [loadProjects]); 

  // --- Deck Pagination Logic ---
  const totalDecks = Math.ceil(projects.length / CARDS_PER_DECK);
  const startCardIndex = deckIndex * CARDS_PER_DECK;
  const endCardIndex = startCardIndex + CARDS_PER_DECK;
  
  const visibleDeckProjects = styledProjects.slice(startCardIndex, endCardIndex);
  
  const goToNextDeck = () => {
    if (deckIndex < totalDecks - 1) {
        setDeckIndex(deckIndex + 1);
    }
  };

  const goToPrevDeck = () => {
    if (deckIndex > 0) {
        setDeckIndex(deckIndex - 1);
    }
  };

  const hasProjects = styledProjects.length > 0;
  const canGoNext = deckIndex < totalDecks - 1;
  const canGoPrev = deckIndex > 0;


  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-48 bg-gray-900 min-h-screen relative overflow-x-hidden">
      
      {/* Header and Filter Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-6xl font-extrabold text-white leading-tight">
                    <span className="text-blue-400">Project </span> 
                    {isDeckViewActive ? 'Fan Deck' : 'Dashboard'}
                </h1>
                <p className="mt-2 text-xl text-gray-400">
                    {isDeckViewActive ? 'Hover a card to view details, or use the arrows to browse decks.' : 'A visually rich, responsive overview of all projects.'}
                </p>
            </motion.div>

            <div className="flex space-x-4">
                <motion.button
                    onClick={() => setIsDeckViewActive(!isDeckViewActive)}
                    className="bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Layers className="w-5 h-5 mr-2" /> 
                    {isDeckViewActive ? 'Switch to Grid' : 'Switch to Fan Deck'}
                </motion.button>
                <motion.button
                    onClick={() => setIsFilterOpen(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Filter className="w-5 h-5 mr-2" /> Filters
                </motion.button>
            </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {hasProjects ? (
            
            isDeckViewActive ? (
                // --- Deck Container: Fan Spread with Pagination ---
                <motion.div
                    key="project-deck-container"
                    className="flex flex-col items-center justify-center w-full min-h-[700px] relative z-0 overflow-hidden"
                >
                    {/* Pagination Info */}
                    <motion.p 
                        key={`info-${deckIndex}`}
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 10 }} 
                        className="text-gray-400 text-sm mb-4">
                        Showing deck {deckIndex + 1} of {totalDecks} (Projects {startCardIndex + 1} - {Math.min(endCardIndex, projects.length)})
                    </motion.p>
                    
                    <div className="flex items-center justify-center w-full max-w-7xl">
                        {/* Left Button */}
                        <motion.button
                            onClick={goToPrevDeck}
                            disabled={!canGoPrev}
                            className={`p-4 rounded-full transition-all duration-300 ${
                                canGoPrev ? 'bg-gray-700 text-white hover:bg-blue-500 shadow-xl' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                            }`}
                            whileHover={canGoPrev ? { scale: 1.1 } : {}}
                            whileTap={canGoPrev ? { scale: 0.9 } : {}}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        {/* Deck Area (Increased width to accommodate the wider spread and cards) */}
                        <motion.div 
                            key={`deck-${deckIndex}`} // Key change forces re-animation on pagination
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            // INCREASED DIMENSIONS: from w-[700px] h-[500px] to w-[1100px] h-[600px]
                            className="relative w-[1500px] h-[700px] mx-10 flex justify-center items-center" 
                        >
                            {visibleDeckProjects.map((project, index) => (
                                <ProjectCard 
                                    key={project.id} // Use project ID as key for stability within the deck
                                    project={project} 
                                    index={index}
                                    isDeckView={true} 
                                />
                            ))}
                            {!visibleDeckProjects.length && (
                                <p className="text-gray-500 absolute">No more projects in this filter.</p>
                            )}
                        </motion.div>

                        {/* Right Button */}
                        <motion.button
                            onClick={goToNextDeck}
                            disabled={!canGoNext}
                            className={`p-4 rounded-full transition-all duration-300 ${
                                canGoNext ? 'bg-gray-700 text-white hover:bg-blue-500 shadow-xl' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                            }`}
                            whileHover={canGoNext ? { scale: 1.1 } : {}}
                            whileTap={canGoNext ? { scale: 0.9 } : {}}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </motion.div>
                
            ) : (
                // --- Masonry Grid Container: Standard View ---
                <motion.div
                    key="project-grid"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
                >
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
                        {styledProjects.map((project) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                isDeckView={false} 
                            />
                        ))}
                    </div>
                </motion.div>
            )
        ) : (
            // Empty State
            !loading && (
                <motion.div 
                    key="empty-state"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center mt-20 p-12 bg-gray-800 rounded-2xl shadow-xl max-w-lg mx-auto text-white"
                >
                    <h3 className="text-2xl font-bold text-blue-400">No Projects Found 😞</h3>
                    <p className="text-gray-400 mt-2">
                      The current filters produced no results. Try clearing your search or categories.
                    </p>
                </motion.div>
            )
        )}
      </AnimatePresence>

      {/* --- Filter Panel Modal --- */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <FilterPanel
                categories={categories || []}
                tools={tools || []}
                tiers={tiers || []}
                activeCategory={activeCategory}
                activeToolId={activeToolId}
                activeTierId={activeTierId}
                searchQuery={searchQuery}
                onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
                onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
                onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
                onSearchChange={(query) => { setSearchQuery(query); setIsFilterOpen(false); }}
                onClose={() => setIsFilterOpen(false)}
            />
            {/* Background overlay */}
            <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;