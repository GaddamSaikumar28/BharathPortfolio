
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Filter, X, Loader2, Search, Layers, ShieldCheck, List, ChevronLeft, ChevronRight, LayoutGrid, Copy, ArrowRight } from 'lucide-react';
// import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
// import { useHomepageData } from '../hooks/useHomepageData'; 
// import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// // --- FilterPanel Component (Unchanged logic, styled for modal) ---
// const FilterPanel = ({ 
//   categories, tools, tiers,
//   activeCategory, activeToolId, activeTierId, searchQuery,
//   onFilterChange, onToolChange, onTierChange, onSearchChange,
//   onClose,
// }) => {
//   // ... local state for search inside panel if needed, 
//   // but we will sync it with parent for the main search bar
  
//   return (
//     <motion.div 
//       className="fixed inset-y-0 right-0 z-[60] bg-white/95 backdrop-blur-md shadow-2xl overflow-y-auto p-6 md:p-10 w-full sm:w-[400px] border-l border-gray-200"
//       initial={{ x: '100%' }}
//       animate={{ x: 0 }}
//       exit={{ x: '100%' }}
//       transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//     >
//         <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                 <Filter className="w-6 h-6 text-indigo-600" /> Filters
//             </h2>
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                 <X className="w-6 h-6 text-gray-500" />
//             </button>
//         </div>

//         {/* Categories */}
//         <div className="mb-8">
//             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <Layers className="w-4 h-4" /> Categories
//             </h3>
//             <div className="flex flex-wrap gap-2">
//                 <button
//                     onClick={() => onFilterChange('all')}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                         activeCategory === 'all' 
//                         ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                 >
//                     All
//                 </button>
//                 {categories.map(cat => (
//                     <button
//                         key={cat.slug}
//                         onClick={() => onFilterChange(cat.slug)}
//                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                             activeCategory === cat.slug 
//                             ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                         }`}
//                     >
//                         {cat.name}
//                     </button>
//                 ))}
//             </div>
//         </div>

//         {/* Tiers */}
//         <div className="mb-8">
//             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <ShieldCheck className="w-4 h-4" /> Complexity
//             </h3>
//             <div className="space-y-2">
//                 <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
//                     <input 
//                         type="radio" 
//                         name="tier" 
//                         checked={activeTierId === null}
//                         onChange={() => onTierChange(null)}
//                         className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
//                     />
//                     <span className="text-gray-700 font-medium">Any Complexity</span>
//                 </label>
//                 {tiers.map(tier => (
//                     <label key={tier.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
//                         <input 
//                             type="radio" 
//                             name="tier" 
//                             checked={activeTierId === tier.id}
//                             onChange={() => onTierChange(tier.id)}
//                             className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
//                         />
//                         <span className="text-gray-700 font-medium flex items-center gap-2">
//                             {tier.name}
//                             <span className="w-2 h-2 rounded-full" style={{ background: tier.color_hex }} />
//                         </span>
//                     </label>
//                 ))}
//             </div>
//         </div>

//         {/* Tools */}
//         <div>
//             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <List className="w-4 h-4" /> Tools
//             </h3>
//             <div className="flex flex-wrap gap-2">
//                 {tools.map(tool => (
//                     <button
//                         key={tool.id}
//                         onClick={() => onToolChange(activeToolId === tool.id ? null : tool.id)}
//                         className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
//                             activeToolId === tool.id 
//                             ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
//                             : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
//                         }`}
//                     >
//                         {tool.name}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     </motion.div>
//   );
// };

// const Projects = () => {
//   // --- Data Hooks ---
//   const { categories, tools, tiers, loading: metaLoading } = useHomepageData();
  
//   // --- Local State ---
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalCount, setTotalCount] = useState(0);
//   const [page, setPage] = useState(1);
  
//   // --- Filters ---
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [activeToolId, setActiveToolId] = useState(null);
//   const [activeTierId, setActiveTierId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // --- UI State ---
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [viewMode, setViewMode] = useState(CardStyle.DECK_STACKED); 
  
//   // --- Deck Index State ---
//   const [deckIndex, setDeckIndex] = useState(0);

//   // --- Debounced Search Handler ---
//   // We simply use the state directly in the fetch, relying on the user to type or hit enter if we wanted strict debouncing.
//   // For now, let's just pass the query.

//   const loadProjects = useCallback(async () => {
//     setLoading(true);
//     try {
//         // Load more projects for deck view to allow smooth scrolling
//         const limit = viewMode === CardStyle.DECK_STACKED ? 50 : 12; 
        
//         const { data, count } = await fetchProjects({
//             page,
//             limit,
//             categorySlug: activeCategory,
//             searchQuery,
//             toolId: activeToolId,
//             tierId: activeTierId
//         });
        
//         setProjects(data || []);
//         setTotalCount(count || 0);
//         setDeckIndex(0); // Reset deck on new fetch

//     } catch (err) {
//         console.error("Failed to load projects", err);
//     } finally {
//         setLoading(false);
//     }
//   }, [page, activeCategory, searchQuery, activeToolId, activeTierId, viewMode]);

//   useEffect(() => {
//     loadProjects();
//   }, [loadProjects]);

//   // --- Deck Navigation ---
//   const nextCard = () => {
//       if (deckIndex < projects.length - 1) setDeckIndex(prev => prev + 1);
//   };

//   const prevCard = () => {
//       if (deckIndex > 0) setDeckIndex(prev => prev - 1);
//   };

//   const getDeckPosition = (index) => {
//       if (index === deckIndex) return 'center';
//       if (index === deckIndex - 1) return 'left';
//       if (index === deckIndex + 1) return 'right';
//       if (index < deckIndex - 1) return 'hiddenLeft';
//       return 'hiddenRight';
//   };

//   // To optimize rendering, we only need to render visible cards + buffer
//   const visibleDeckProjects = useMemo(() => {
//       if (viewMode !== CardStyle.DECK_STACKED) return projects;
//       // Render a window around the active card
//       const start = Math.max(0, deckIndex - 2);
//       const end = Math.min(projects.length, deckIndex + 3);
//       // Map over original indices to keep key/index consistent
//       return projects.slice(start, end).map(p => ({
//           ...p,
//           originalIndex: projects.indexOf(p)
//       }));
//   }, [projects, deckIndex, viewMode]);

//   return (
//     <div className="max-h-screen bg-gray-50 font-sans text-gray-900 relative overflow-x-hidden selection:bg-indigo-100">
      
//       {/* --- Decorative Background --- */}
//       <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-white to-transparent z-0 pointer-events-none" />
//       <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute top-40 -left-20 w-[300px] h-[300px] bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

//       {/* --- Header & Controls --- */}
 

//       {/* --- Main Content --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 min-h-[80vh]">
        
//         {/* --- Hero Heading & Quick Filters --- */}
//         <div className="mb-12 text-center max-w-3xl mx-auto">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100">
//                     Portfolio Gallery
//                 </span>
//                 <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
//                     Crafting Digital <br className="hidden md:block" />
//                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Experiences that Matter</span>
//                 </h2>
//                 <p className="text-lg text-gray-500 leading-relaxed mb-8">
//                     Explore a curated collection of web applications, design systems, and creative experiments built with modern technologies.
//                 </p>

//      <div className=" bg-white/80 border-b border-gray-200 sticky top-0 z-40 shadow-sm backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
//             <div className="flex flex-col shrink-0">
//                 <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
//                     Showcase
//                 </h1>
//                 <p className="text-xs text-gray-500 font-medium hidden sm:block">
//                     {totalCount} Projects Found
//                 </p>
//             </div>

//             {/* --- Search Bar (Visible in Header) --- */}
//             <div className="flex-1 max-w-md mx-auto hidden md:block">
//                 <div className="relative group">
//                     <input 
//                         type="text" 
//                         placeholder="Search projects..." 
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full py-2.5 pl-10 pr-4 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
//                     />
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
//                     {searchQuery && (
//                         <button 
//                             onClick={() => setSearchQuery('')}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                             <X className="w-3 h-3" />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             <div className="flex items-center gap-3 shrink-0">
//                 {/* Mobile Search Icon */}
//                 <button 
//                     className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full"
//                     onClick={() => setIsFilterOpen(true)} // Open filter to search on mobile
//                 >
//                     <Search className="w-5 h-5" />
//                 </button>

//                 {/* View Toggle */}
//                 <div className="bg-gray-100 p-1 rounded-xl flex items-center ring-1 ring-gray-200">
//                     <button 
//                         onClick={() => setViewMode(CardStyle.DECK_STACKED)}
//                         className={`p-2 rounded-lg transition-all ${viewMode === CardStyle.DECK_STACKED ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
//                         title="Carousel View"
//                     >
//                         <Copy className="w-4 h-4 rotate-90" />
//                     </button>
//                     <button 
//                         onClick={() => setViewMode(CardStyle.UNIFIED_DESIGN)}
//                         className={`p-2 rounded-lg transition-all ${viewMode === CardStyle.UNIFIED_DESIGN ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
//                         title="Grid View"
//                     >
//                         <LayoutGrid className="w-4 h-4" />
//                     </button>
//                 </div>

//                 {/* Filter Button */}
//                 <button 
//                     onClick={() => setIsFilterOpen(true)}
//                     className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-900/10 text-sm font-medium ${
//                         activeCategory !== 'all' || activeToolId || activeTierId 
//                         ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
//                         : 'bg-gray-900 text-white hover:bg-gray-800'
//                     }`}
//                 >
//                     <Filter className="w-4 h-4 transition-transform group-hover:rotate-180" /> 
//                     <span className="hidden sm:inline">Filters</span>
//                     {(activeCategory !== 'all' || activeToolId || activeTierId) && (
//                         <span className="flex h-2 w-2 rounded-full bg-red-400 ml-1" />
//                     )}
//                 </button>
//             </div>
//         </div>
//     </div>

//                 {/* Quick Category Pills */}
//                 <div className="flex flex-wrap justify-center gap-2">
//                     <button
//                         onClick={() => setActiveCategory('all')}
//                         className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
//                             activeCategory === 'all'
//                             ? 'bg-gray-900 text-white border-gray-900'
//                             : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
//                         }`}
//                     >
//                         All
//                     </button>
//                     {categories?.slice(0, 5).map(cat => (
//                         <button
//                             key={cat.slug}
//                             onClick={() => setActiveCategory(cat.slug)}
//                             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
//                                 activeCategory === cat.slug
//                                 ? 'bg-gray-900 text-white border-gray-900'
//                                 : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
//                             }`}
//                         >
//                             {cat.name}
//                         </button>
//                     ))}
//                 </div>
//             </motion.div>
//         </div>

//         {loading ? (
//             <div className="flex flex-col items-center justify-center py-32">
//                 <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
//                 <p className="text-gray-500 font-medium animate-pulse">Curating projects...</p>
//             </div>
//         ) : (
//             <AnimatePresence mode='wait'>
//                 {viewMode === CardStyle.DECK_STACKED ? (
//                     <motion.div 
//                         key="deck"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="relative flex flex-col items-center w-full"
//                     >
//                         {/* Carousel Container */}
//                         <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center perspective-1000">
                            
//                             {/* Left Button */}
//                             <button 
//                                 onClick={prevCard}
//                                 disabled={deckIndex === 0}
//                                 className="absolute left-4 md:left-10 z-50 p-4 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-xl text-gray-700 hover:text-indigo-600 hover:scale-110 disabled:opacity-0 disabled:scale-90 transition-all duration-300 group"
//                             >
//                                 <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
//                             </button>

//                             {/* Right Button */}
//                             <button 
//                                 onClick={nextCard}
//                                 disabled={deckIndex === projects.length - 1}
//                                 className="absolute right-4 md:right-10 z-50 p-4 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-xl text-gray-700 hover:text-indigo-600 hover:scale-110 disabled:opacity-0 disabled:scale-90 transition-all duration-300 group"
//                             >
//                                 <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
//                             </button>

//                             {/* Render Visible Carousel Cards */}
//                             {projects.length > 0 ? (
//                                 <div className="relative w-full h-full flex items-center justify-center">
//                                     {visibleDeckProjects.map((project) => (
//                                         <ProjectCard
//                                             key={project.id}
//                                             project={project}
//                                             index={project.originalIndex}
//                                             style={CardStyle.DECK_STACKED}
//                                             deckPosition={getDeckPosition(project.originalIndex)}
//                                             onClick={() => {
//                                                 if (project.originalIndex === deckIndex) {
//                                                     // If center card clicked -> Go to page
//                                                     window.location.href = `/projects/${project.slug}`;
//                                                 } else {
//                                                     // If side card clicked -> Scroll to it
//                                                     setDeckIndex(project.originalIndex);
//                                                 }
//                                             }}
//                                         />
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col items-center text-gray-400 mt-10">
//                                     <Search className="w-12 h-12 mb-4 opacity-20" />
//                                     <p>No projects found.</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Dots Indicator */}
//                         {projects.length > 1 && (
//                             <div className="flex justify-center gap-2 mt-10">
//                                 {projects.map((_, idx) => (
//                                     <button 
//                                         key={idx}
//                                         onClick={() => setDeckIndex(idx)}
//                                         className={`h-2 rounded-full transition-all duration-300 ${
//                                             idx === deckIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
//                                         }`}
//                                     />
//                                 ))}
//                             </div>
//                         )}

//                     </motion.div>
//                 ) : (
//                     <motion.div 
//                         key="grid"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                     >
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {projects.map((project, index) => (
//                                 <div key={project.id} className="h-[450px]">
//                                     <ProjectCard 
//                                         project={project} 
//                                         index={index}
//                                         style={CardStyle.UNIFIED_DESIGN}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* Pagination for Grid */}
//                         {totalCount > 0 && (
//                             <div className="flex justify-center mt-16 gap-4">
//                                 <button
//                                     onClick={() => setPage(p => Math.max(1, p - 1))}
//                                     disabled={page === 1}
//                                     className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-all font-medium text-gray-600 hover:text-gray-900 shadow-sm"
//                                 >
//                                     Previous
//                                 </button>
//                                 <span className="px-6 py-2.5 bg-gray-100 rounded-xl font-bold text-gray-700 border border-gray-200/50">
//                                     {page}
//                                 </span>
//                                 <button
//                                     onClick={() => setPage(p => p + 1)} 
//                                     disabled={projects.length < 12} 
//                                     className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-all font-medium text-gray-600 hover:text-gray-900 shadow-sm"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         )}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         )}
//       </div>

//       {/* --- Active Filters Bar --- */}
//       <AnimatePresence>
//         {(activeCategory !== 'all' || activeToolId || activeTierId || searchQuery) && (
//             <motion.div 
//                 initial={{ y: 100, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: 100, opacity: 0 }}
//                 className="fixed bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-none"
//             >
//                 <div className="bg-white/90 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 pointer-events-auto">
//                     <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                         <Filter className="w-4 h-4 text-indigo-600" /> Filters Active
//                     </span>
//                     <div className="h-4 w-px bg-gray-300" />
//                     <button 
//                         onClick={() => {
//                             setActiveCategory('all');
//                             setActiveToolId(null);
//                             setActiveTierId(null);
//                             setSearchQuery('');
//                         }}
//                         className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
//                     >
//                         Clear All
//                     </button>
//                 </div>
//             </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- Filter Overlay --- */}
//       <AnimatePresence>
//         {isFilterOpen && (
//           <motion.div
//             className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsFilterOpen(false)}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {isFilterOpen && (
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
//                 onSearchChange={(query) => { setSearchQuery(query); }}
//                 onClose={() => setIsFilterOpen(false)}
//             />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Projects;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Loader2, Search, ChevronLeft, ChevronRight, LayoutGrid, Copy, Command } from 'lucide-react';
import { fetchProjects } from '../api/projectspage'; 
import { useHomepageData } from '../hooks/useHomepageData'; 
import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// --- FilterPanel (kept concise for brevity, assumes logic exists from your snippet) ---
// *Note: Ensure your FilterPanel component is defined or imported here as per your original file*
const FilterPanel = ({ onClose, ...props }) => {
    // ... use your existing FilterPanel code structure here ...
    // For visual consistency, ensure the panel has z-index 60+
    return (
        <motion.div 
            className="fixed inset-y-0 right-0 z-[100] bg-white/95 backdrop-blur-xl shadow-2xl overflow-y-auto p-6 md:p-10 w-full sm:w-[400px] border-l border-gray-200"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
           {/* Your existing FilterPanel Content */}
           <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Filter className="w-6 h-6 text-indigo-600"/> Filters</h2>
                <button onClick={onClose}><X className="w-6 h-6 text-gray-500"/></button>
           </div>
           {/* Render props.categories, etc. here as per previous code */}
        </motion.div>
    );
};

const Projects = () => {
  // --- Data Hooks & State ---
  const { categories, tools, tiers } = useHomepageData();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  
  // --- Filters ---
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeToolId, setActiveToolId] = useState(null);
  const [activeTierId, setActiveTierId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- UI State ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState(CardStyle.DECK_STACKED); 
  const [deckIndex, setDeckIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // --- Responsive Check ---
  useEffect(() => {
    const checkMobile = () => {
        const isSmall = window.innerWidth < 768;
        setIsMobile(isSmall);
        // Force grid view on mobile for better UX
        if (isSmall) setViewMode(CardStyle.UNIFIED_DESIGN);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Data Fetching ---
  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
        const limit = viewMode === CardStyle.DECK_STACKED ? 50 : 12; 
        const { data, count } = await fetchProjects({
            page,
            limit,
            categorySlug: activeCategory,
            searchQuery,
            toolId: activeToolId,
            tierId: activeTierId
        });
        setProjects(data || []);
        setTotalCount(count || 0);
        setDeckIndex(0); 
    } catch (err) {
        console.error("Failed to load projects", err);
    } finally {
        setLoading(false);
    }
  }, [page, activeCategory, searchQuery, activeToolId, activeTierId, viewMode]);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  // --- Keyboard Navigation for Deck ---
  useEffect(() => {
      if (viewMode !== CardStyle.DECK_STACKED) return;
      
      const handleKeyDown = (e) => {
          if (e.key === 'ArrowRight') {
              if (deckIndex < projects.length - 1) setDeckIndex(prev => prev + 1);
          } else if (e.key === 'ArrowLeft') {
              if (deckIndex > 0) setDeckIndex(prev => prev - 1);
          }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, deckIndex, projects.length]);

  // --- Helpers ---
  const nextCard = () => { if (deckIndex < projects.length - 1) setDeckIndex(prev => prev + 1); };
  const prevCard = () => { if (deckIndex > 0) setDeckIndex(prev => prev - 1); };

  const getDeckPosition = (index) => {
      if (index === deckIndex) return 'center';
      if (index === deckIndex - 1) return 'left';
      if (index === deckIndex + 1) return 'right';
      if (index < deckIndex - 1) return 'hiddenLeft';
      return 'hiddenRight';
  };

  // Optimization: Only render window around active card
  const visibleDeckProjects = useMemo(() => {
      if (viewMode !== CardStyle.DECK_STACKED) return projects;
      const start = Math.max(0, deckIndex - 2);
      const end = Math.min(projects.length, deckIndex + 3);
      return projects.slice(start, end).map(p => ({ ...p, originalIndex: projects.indexOf(p) }));
  }, [projects, deckIndex, viewMode]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
      </div>

      {/* --- Hero Section --- */}
      <div className="relative z-10 pt-20 pb-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white border border-gray-200 shadow-sm text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
                <Command className="w-3 h-3" /> Portfolio V2.0
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
                Digital Experiences <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                    Engineered for Impact
                </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                Explore a collection of highly technical applications, design systems, and creative experiments built with modern architectures.
            </p>

            {/* Quick Category Tabs (Above Toolbar) */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>All</button>
                {categories?.slice(0, 4).map(cat => (
                    <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.slug ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>{cat.name}</button>
                ))}
            </div>
        </motion.div>
      </div>

      {/* --- Sticky Smart Toolbar --- */}
      <div className="sticky top-4 z-40 px-4 md:px-6 mb-12">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white/40 ring-1 ring-gray-200/50 shadow-2xl shadow-indigo-500/10 rounded-2xl p-2 flex items-center gap-2 md:gap-4 transition-all hover:shadow-indigo-500/20">
            {/* Search Input */}
            <div className="flex-1 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search stack, projects..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-xl hover:bg-gray-50/50 focus:bg-white transition-all"
                />
            </div>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

            {/* View Toggle (Hidden on mobile) */}
            {!isMobile && (
                <div className="flex bg-gray-100/50 p-1 rounded-lg">
                    <button 
                        onClick={() => setViewMode(CardStyle.DECK_STACKED)}
                        className={`p-2 rounded-md transition-all ${viewMode === CardStyle.DECK_STACKED ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                        title="Carousel View"
                    >
                        <Copy className="w-4 h-4 rotate-90" />
                    </button>
                    <button 
                        onClick={() => setViewMode(CardStyle.UNIFIED_DESIGN)}
                        className={`p-2 rounded-md transition-all ${viewMode === CardStyle.UNIFIED_DESIGN ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                        title="Grid View"
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Filter Button */}
            <button 
                onClick={() => setIsFilterOpen(true)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    (activeCategory !== 'all' || activeToolId || activeTierId) 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
            >
                <Filter className="w-4 h-4" /> 
                <span className="hidden sm:inline">Filters</span>
            </button>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10 min-h-[60vh]">
        {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                <p className="text-gray-400 font-medium">Loading Portfolio...</p>
            </div>
        ) : (
            <AnimatePresence mode='wait'>
                {viewMode === CardStyle.DECK_STACKED && !isMobile ? (
                    <motion.div 
                        key="deck"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="relative flex flex-col items-center w-full h-[600px]" // Fixed height container
                    >
                        {/* 3D Carousel Stage */}
                        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                             {/* Navigation Buttons */}
                            <button onClick={prevCard} disabled={deckIndex === 0} className="absolute left-4 md:left-20 z-50 p-4 rounded-full bg-white border border-gray-100 shadow-xl text-gray-700 hover:text-indigo-600 disabled:opacity-30 transition-all hover:scale-110">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={nextCard} disabled={deckIndex === projects.length - 1} className="absolute right-4 md:right-20 z-50 p-4 rounded-full bg-white border border-gray-100 shadow-xl text-gray-700 hover:text-indigo-600 disabled:opacity-30 transition-all hover:scale-110">
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Cards */}
                            {projects.length > 0 ? (
                                visibleDeckProjects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        style={CardStyle.DECK_STACKED}
                                        deckPosition={getDeckPosition(project.originalIndex)}
                                        onClick={() => {
                                            if (project.originalIndex === deckIndex) {
                                                window.location.href = `/projects/${project.slug}`;
                                            } else {
                                                setDeckIndex(project.originalIndex);
                                            }
                                        }}
                                    />
                                ))
                            ) : (
                                <EmptyState />
                            )}
                        </div>
                        
                        {/* Progress Dots */}
                        <div className="flex justify-center gap-2 mt-4">
                            {projects.map((_, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setDeckIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === deckIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="grid"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    >
                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project, index) => (
                                    <div key={project.id} className="h-full">
                                        <ProjectCard project={project} style={CardStyle.UNIFIED_DESIGN} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                           <EmptyState />
                        )}

                        {/* Pagination for Grid */}
                        {totalCount > 0 && (
                            <div className="flex justify-center mt-20 gap-4">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-6 py-3 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50 hover:shadow-md transition-all font-medium text-gray-600">Previous</button>
                                <span className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold">{page}</span>
                                <button onClick={() => setPage(p => p + 1)} disabled={projects.length < 12} className="px-6 py-3 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50 hover:shadow-md transition-all font-medium text-gray-600">Next</button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        )}
      </div>

      {/* --- Filter Modal --- */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} />
            <FilterPanel 
                categories={categories || []} tools={tools || []} tiers={tiers || []}
                activeCategory={activeCategory} activeToolId={activeToolId} activeTierId={activeTierId} searchQuery={searchQuery}
                onFilterChange={(slug) => { setActiveCategory(slug); setIsFilterOpen(false); }}
                onToolChange={(id) => { setActiveToolId(id); setIsFilterOpen(false); }}
                onTierChange={(id) => { setActiveTierId(id); setIsFilterOpen(false); }}
                onClose={() => setIsFilterOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center text-center py-20 w-full">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
        <p className="text-gray-500 max-w-md">Try adjusting your filters or search query to find what you're looking for.</p>
    </div>
);

export default Projects;