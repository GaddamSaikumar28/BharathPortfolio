
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Loader2, Search, Layers, ShieldCheck, List, ChevronLeft, ChevronRight, LayoutGrid, Copy } from 'lucide-react';
import { fetchProjectCategories, fetchProjects, fetchProjectTools, fetchProjectTiers } from '../api/projectspage'; 
import { useHomepageData } from '../hooks/useHomepageData'; 
import ProjectCard, { CardStyle } from '../components/projects/ProjectCard'; 

// --- FilterPanel Component ---
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
      className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md shadow-2xl overflow-y-auto p-6 md:p-10 lg:w-[400px] lg:right-0 lg:left-auto border-l border-gray-200"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-indigo-600" /> Filters
            </h2>
            <motion.button 
                onClick={onClose} 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
            >
                <X className="w-5 h-5" />
            </motion.button>
        </div>

        {/* 1. Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Search</label>
            <div className="flex shadow-sm rounded-lg overflow-hidden group focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <input
                    type="search"
                    placeholder="Search projects..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="flex-grow p-3 bg-gray-50 border-y border-l border-gray-200 focus:outline-none text-gray-800 placeholder-gray-400"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 hover:bg-indigo-700 transition-colors">
                    <Search className="w-4 h-4" />
                </button>
            </div>
        </form>

        {/* 2. Category Filter */}
        <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-indigo-500" /> Categories
            </h3>
            <div className="flex flex-wrap gap-2">
            {['all', ...categories.map(c => c.slug)].map((slug) => {
                const name = slug === 'all' ? 'All' : categories.find(c => c.slug === slug)?.name;
                return (
                <motion.button
                    key={slug}
                    onClick={() => onFilterChange(slug)}
                    className={`px-3 py-1.5 rounded-md font-medium text-xs transition-all border ${
                    activeCategory === slug
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
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
        <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-rose-500" /> Complexity
            </h3>
            <div className="flex flex-wrap gap-2">
                <motion.button
                    onClick={() => onTierChange(null)}
                    className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors border ${
                    activeTierId === null ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    whileTap={{ scale: 0.95 }}
                >
                    All
                </motion.button>
                {tiers.map((tier) => (
                    <motion.button
                        key={tier.id}
                        onClick={() => onTierChange(tier.id)}
                        style={{ 
                            backgroundColor: activeTierId === tier.id ? tier.color_hex : 'white', 
                            borderColor: activeTierId === tier.id ? tier.color_hex : '#e5e7eb',
                            color: activeTierId === tier.id ? '#ffffff' : '#4b5563' 
                        }} 
                        className={`px-3 py-1.5 rounded-md font-medium text-xs border transition-all hover:shadow-sm`}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tier.name}
                    </motion.button>
                ))}
            </div>
        </div>

        {/* 4. Tool Filter */}
        <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                <List className="w-4 h-4 mr-2 text-emerald-500" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
                <motion.button
                    onClick={() => onToolChange(null)}
                    className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors border ${
                    activeToolId === null ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    whileTap={{ scale: 0.95 }}
                >
                    Any
                </motion.button>
                {tools.map((tool) => (
                    <motion.button
                        key={tool.id}
                        onClick={() => onToolChange(tool.id)}
                        className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors border ${activeToolId === tool.id ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'}`}
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

// --- Main Projects Component ---
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
  const CARDS_PER_DECK = 7; 

  // Filtering states
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeToolId, setActiveToolId] = useState(null);
  const [activeTierId, setActiveTierId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const styledProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      assignedStyle: CardStyle.UNIFIED_DESIGN 
    }));
  }, [projects]);

  const loadProjects = useCallback(async () => {
    setLoading(true);
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
        setDeckIndex(0); 
    } catch (error) {
        console.error("Failed to load projects:", error);
        setProjects([]);
    } finally {
        setLoading(false);
    }
  }, [activeCategory, searchQuery, activeToolId, activeTierId]); 
  
  useEffect(() => {
    loadProjects();
  }, [loadProjects]); 

  const totalDecks = Math.ceil(projects.length / CARDS_PER_DECK);
  const startCardIndex = deckIndex * CARDS_PER_DECK;
  const endCardIndex = startCardIndex + CARDS_PER_DECK;
  
  const visibleDeckProjects = styledProjects.slice(startCardIndex, endCardIndex);
  
  const goToNextDeck = () => deckIndex < totalDecks - 1 && setDeckIndex(deckIndex + 1);
  const goToPrevDeck = () => deckIndex > 0 && setDeckIndex(deckIndex - 1);

  const hasProjects = styledProjects.length > 0;
  const canGoNext = deckIndex < totalDecks - 1;
  const canGoPrev = deckIndex > 0;

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-48 bg-gray-50 min-h-screen relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Header Section --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end max-w-7xl mx-auto mb-12 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Gallery</span>
                </h1>
                <p className="mt-3 text-lg text-gray-500 max-w-2xl">
                    {isDeckViewActive 
                        ? 'Explore our work in an interactive deck. Swipe or use arrows to navigate.' 
                        : 'Browse our complete portfolio in a comprehensive grid layout.'}
                </p>
            </motion.div>

            <div className="flex space-x-3">
                <motion.button
                    onClick={() => setIsDeckViewActive(!isDeckViewActive)}
                    className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md transition-all inline-flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isDeckViewActive ? <LayoutGrid className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {isDeckViewActive ? 'Grid View' : 'Deck View'}
                </motion.button>
                <motion.button
                    onClick={() => setIsFilterOpen(true)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors inline-flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Filter className="w-4 h-4 mr-2" /> Filters
                </motion.button>
            </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {hasProjects ? (
            isDeckViewActive ? (
                // --- Deck Container (Responsive) ---
                <motion.div
                    key="project-deck-container"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-start w-full min-h-[600px] relative z-0"
                >
                    {/* Pagination Indicators */}
                    <div className="flex items-center space-x-2 mb-6">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Deck {deckIndex + 1} / {totalDecks}</span>
                    </div>
                    
                    <div className="flex items-center justify-between w-full max-w-[90vw] lg:max-w-6xl px-2">
                        {/* Prev Button */}
                        <motion.button
                            onClick={goToPrevDeck}
                            disabled={!canGoPrev}
                            className={`p-3 rounded-full transition-all duration-300 z-20 ${
                                canGoPrev ? 'bg-white text-gray-800 hover:text-indigo-600 shadow-lg border border-gray-100' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                            whileHover={canGoPrev ? { scale: 1.1 } : {}}
                            whileTap={canGoPrev ? { scale: 0.9 } : {}}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        {/* Deck Render Area - Responsive Size */}
                        <div className="relative w-full max-w-4xl h-[500px] sm:h-[600px] flex justify-center items-center perspective-1000">
                            <AnimatePresence mode='popLayout'>
                                <motion.div 
                                    key={`deck-${deckIndex}`} 
                                    className="relative w-full h-full flex justify-center items-center"
                                >
                                    {visibleDeckProjects.map((project, index) => (
                                        <ProjectCard 
                                            key={project.id} 
                                            project={project} 
                                            index={index}
                                            isDeckView={true} 
                                        />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Next Button */}
                        <motion.button
                            onClick={goToNextDeck}
                            disabled={!canGoNext}
                            className={`p-3 rounded-full transition-all duration-300 z-20 ${
                                canGoNext ? 'bg-white text-gray-800 hover:text-indigo-600 shadow-lg border border-gray-100' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                            whileHover={canGoNext ? { scale: 1.1 } : {}}
                            whileTap={canGoNext ? { scale: 0.9 } : {}}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </motion.div>
                
            ) : (
                // --- Grid Container ---
                <motion.div
                    key="project-grid"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {styledProjects.map((project, index) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                index={index}
                                isDeckView={false} 
                            />
                        ))}
                    </div>
                </motion.div>
            )
        ) : (
            !loading && (
                <motion.div 
                    key="empty-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center mt-20 p-12 text-center"
                >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">No projects found</h3>
                    <p className="text-gray-500 mt-2 max-w-md">
                      We couldn't find any projects matching your current filters. Try adjusting your search or categories.
                    </p>
                    <button 
                        onClick={() => { setActiveCategory('all'); setSearchQuery(''); setActiveToolId(null); setActiveTierId(null); }}
                        className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800 underline"
                    >
                        Clear all filters
                    </button>
                </motion.div>
            )
        )}
      </AnimatePresence>

      {/* --- Filter Overlay --- */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFilterOpen && (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;