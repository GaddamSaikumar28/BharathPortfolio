// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowLeft, Plus, Search, Loader2, Image as ImageIcon, Trash2, Edit
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   getProjectAdminDashboard,
//   deleteProject,
//   getStorageUrl
// } from '../../api/projectsadmin';
// import toast, { Toaster } from 'react-hot-toast';
// // import { useDebounce } from '../../hooks/useDebounce'; // Assuming you have this hook

// // A simple debounce hook (if you don't have one)
// import { useDebounce } from 'use-debounce'; 

// const AdminProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const debouncedSearch = useDebounce(searchQuery, 300);

//   const loadData = useCallback(async () => {
//     setIsLoading(true);
//     const data = await getProjectAdminDashboard(debouncedSearch);
//     setProjects(data);
//     setIsLoading(false);
//   }, [debouncedSearch]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleDelete = async (project) => {
//     if (window.confirm(`Are you sure you want to delete "${project.title}"? This will delete all associated content and images and cannot be undone.`)) {
//       const toastId = toast.loading('Deleting project...');
//       const { success, error } = await deleteProject(project.id);
//       toast.dismiss(toastId);
//       if (success) {
//         toast.success('Project deleted!');
//         loadData(); // Refresh the list
//       } else {
//         toast.error(`Failed to delete: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
//       <Toaster position="top-center" />
//       <header className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
//         <div className="flex-1 w-full">
//           <Link to="/admin" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-sm mb-1">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Admin Home
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
//         </div>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full p-2 pl-10 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//           </div>
//           <Link
//             to="/admin/editor/projects/new"
//             className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
//           >
//             <Plus className="w-4 h-4" /> Create New Project
//           </Link>
//         </div>
//       </header>

//       {/* --- Main Content Area --- */}
//       <div className="max-w-7xl mx-auto">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
//                   <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {projects.map(project => {
//                     const imageUrl = getStorageUrl(project.media_assets);
//                     return (
//                       <motion.tr
//                         key={project.id}
//                         layout
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex-shrink-0 h-10 w-16 bg-gray-100 rounded-md flex items-center justify-center">
//                             {imageUrl ? (
//                               <img className="h-10 w-16 object-cover rounded-md" src={imageUrl} alt={project.title} />
//                             ) : (
//                               <ImageIcon className="w-5 h-5 text-gray-400" />
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">{project.title}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">/projects/{project.slug}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
//                           <Link to={`/admin/editor/projects/${project.slug}`} className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1">
//                             <Edit className="w-4 h-4" /> Edit
//                           </Link>
//                           <button onClick={() => handleDelete(project)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
//                             <Trash2 className="w-4 h-4" /> Delete
//                           </button>
//                         </td>
//                       </motion.tr>
//                     );
//                   })}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//             {!projects.length && (
//               <div className="text-center p-8 text-gray-500">
//                 No projects found. {debouncedSearch ? 'Try a different search term.' : 'Click "Create New Project" to get started.'}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProjects;


import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Plus, Search, Loader2, Image as ImageIcon, Trash2, Edit, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getProjectAdminDashboard,
  deleteProject,
} from '../../api/projectsadmin'; // Use the new API
// import { getStorageUrl } from '../../api/projectspage'; // Use the public API for URL
import toast, { Toaster } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { getStorageUrl } from '../../hooks/useHomepageData';
// --- Reusable Modal Component ---
const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Delete Project?</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete <strong>"{title}"</strong>?
              This will permanently delete all of its content, media links, and associated data. This action cannot be undone.
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main Admin Projects Component ---
const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 300);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    // Use the debounced search term for the API call
    const data = await getProjectAdminDashboard(debouncedSearch);
    setProjects(data);
    setIsLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]); // debouncedSearch is the dependency via loadData

  const openDeleteModal = (project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProjectToDelete(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    const toastId = toast.loading('Deleting project...');
    const { success, error } = await deleteProject(projectToDelete.id);

    if (success) {
      toast.success('Project deleted.', { id: toastId });
      // Optimistic UI update: remove from state
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
    } else {
      toast.error(`Error: ${error}`, { id: toastId });
    }
    closeDeleteModal();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title={projectToDelete?.title || ''}
      />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-200">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        </div>
        <Link
          to="/admin/editor/projects/new"
          className="w-full sm:w-auto mt-4 sm:mt-0 flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          <Plus className="w-5 h-5" />
          Create New Project
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {!isLoading && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {projects.map((project, i) => {
                    const imageUrl = getStorageUrl(project.hero_media_path);
                    return (
                      <motion.tr
                        key={project.id}
                        variants={cardVariants}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {imageUrl ? (
                            <img src={imageUrl} alt={project.title} className="w-16 h-10 object-cover rounded-md shadow" />
                          ) : (
                            <div className="w-16 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">/projects/{project.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                          <Link to={`/admin/projects-config/${project.slug}`} className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1">
                            <Edit className="w-4 h-4" /> Edit
                          </Link>
                          <button onClick={() => openDeleteModal(project)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
            {!projects.length && (
              <div className="text-center p-8 text-gray-500">
                No projects found. {debouncedSearch ? 'Try a different search term.' : 'Click "Create New Project" to get started.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;