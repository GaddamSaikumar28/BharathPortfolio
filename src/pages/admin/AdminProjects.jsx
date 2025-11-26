
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Link } from 'react-router-dom';
// // import {
// //   ArrowLeft, Plus, Search, Loader2, Image as ImageIcon, Trash2, Edit, X
// // } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   getProjectAdminDashboard,
// //   deleteProject,
// // } from '../../api/projectsadmin'; // Use the new API
// // // import { getStorageUrl } from '../../api/projectspage'; // Use the public API for URL
// // import toast, { Toaster } from 'react-hot-toast';
// // import { useDebounce } from 'use-debounce';
// // import { getStorageUrl } from '../../hooks/useHomepageData';
// // // --- Reusable Modal Component ---
// // const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => (
// //   <AnimatePresence>
// //     {isOpen && (
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         exit={{ opacity: 0 }}
// //         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
// //         onClick={onClose}
// //       >
// //         <motion.div
// //           initial={{ scale: 0.9, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //           exit={{ scale: 0.9, opacity: 0 }}
// //           className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
// //           onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
// //         >
// //           <button
// //             onClick={onClose}
// //             className="absolute top-2 right-2 p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //           <div className="text-center">
// //             <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
// //               <Trash2 className="w-6 h-6 text-red-600" />
// //             </div>
// //             <h3 className="mt-4 text-lg font-medium text-gray-900">Delete Project?</h3>
// //             <p className="mt-2 text-sm text-gray-500">
// //               Are you sure you want to delete <strong>"{title}"</strong>?
// //               This will permanently delete all of its content, media links, and associated data. This action cannot be undone.
// //             </p>
// //             <div className="flex justify-center mt-6 space-x-4">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={onConfirm}
// //                 className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </motion.div>
// //     )}
// //   </AnimatePresence>
// // );

// // // --- Main Admin Projects Component ---
// // const AdminProjects = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [debouncedSearch] = useDebounce(searchQuery, 300);

// //   // --- Modal State ---
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [projectToDelete, setProjectToDelete] = useState(null);

// //   const loadData = useCallback(async () => {
// //     setIsLoading(true);
// //     // Use the debounced search term for the API call
// //     const data = await getProjectAdminDashboard(debouncedSearch);
// //     setProjects(data);
// //     setIsLoading(false);
// //   }, [debouncedSearch]);

// //   useEffect(() => {
// //     loadData();
// //   }, [loadData]); // debouncedSearch is the dependency via loadData

// //   const openDeleteModal = (project) => {
// //     setProjectToDelete(project);
// //     setIsModalOpen(true);
// //   };

// //   const closeDeleteModal = () => {
// //     setProjectToDelete(null);
// //     setIsModalOpen(false);
// //   };

// //   const handleDelete = async () => {
// //     if (!projectToDelete) return;

// //     const toastId = toast.loading('Deleting project...');
// //     const { success, error } = await deleteProject(projectToDelete.id);

// //     if (success) {
// //       toast.success('Project deleted.', { id: toastId });
// //       // Optimistic UI update: remove from state
// //       setProjects(projects.filter(p => p.id !== projectToDelete.id));
// //     } else {
// //       toast.error(`Error: ${error}`, { id: toastId });
// //     }
// //     closeDeleteModal();
// //   };

// //   const cardVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: (i) => ({
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         delay: i * 0.05,
// //       },
// //     }),
// //     exit: { opacity: 0, x: -50 },
// //   };

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen bg-gray-50">
// //       <Toaster position="top-right" />
// //       <DeleteModal
// //         isOpen={isModalOpen}
// //         onClose={closeDeleteModal}
// //         onConfirm={handleDelete}
// //         title={projectToDelete?.title || ''}
// //       />
      
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
// //         <div className="flex items-center gap-3">
// //           <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-200">
// //             <ArrowLeft className="w-6 h-6 text-gray-700" />
// //           </Link>
// //           <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
// //         </div>
// //         <Link
// //           to="/admin/editor/projects/new"
// //           className="w-full sm:w-auto mt-4 sm:mt-0 flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
// //         >
// //           <Plus className="w-5 h-5" />
// //           Create New Project
// //         </Link>
// //       </div>

// //       {/* Search Bar */}
// //       <div className="mb-6">
// //         <div className="relative">
// //           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
// //             <Search className="w-5 h-5 text-gray-400" />
// //           </div>
// //           <input
// //             type="text"
// //             placeholder="Search projects by title..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
// //           />
// //         </div>
// //       </div>

// //       {/* Content Area */}
// //       <div className="bg-white rounded-lg shadow-md overflow-hidden">
// //         {isLoading && (
// //           <div className="flex items-center justify-center h-64">
// //             <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
// //           </div>
// //         )}

// //         {!isLoading && (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
// //                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
// //                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
// //                   <th scope="col" className="relative px-6 py-3">
// //                     <span className="sr-only">Actions</span>
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 <AnimatePresence>
// //                   {projects.map((project, i) => {
// //                     const imageUrl = getStorageUrl(project.hero_media_path);
// //                     return (
// //                       <motion.tr
// //                         key={project.id}
// //                         variants={cardVariants}
// //                         custom={i}
// //                         initial="hidden"
// //                         animate="visible"
// //                         exit="exit"
// //                         layout
// //                       >
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           {imageUrl ? (
// //                             <img src={imageUrl} alt={project.title} className="w-16 h-10 object-cover rounded-md shadow" />
// //                           ) : (
// //                             <div className="w-16 h-10 bg-gray-100 rounded-md flex items-center justify-center">
// //                               <ImageIcon className="w-5 h-5 text-gray-400" />
// //                             </div>
// //                           )}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm font-medium text-gray-900">{project.title}</div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-gray-500">/projects/{project.slug}</div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
// //                           <Link to={`/admin/projects-config/${project.slug}`} className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1">
// //                             <Edit className="w-4 h-4" /> Edit
// //                           </Link>
// //                           <button onClick={() => openDeleteModal(project)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
// //                             <Trash2 className="w-4 h-4" /> Delete
// //                           </button>
// //                         </td>
// //                       </motion.tr>
// //                     );
// //                   })}
// //                 </AnimatePresence>
// //               </tbody>
// //             </table>
// //             {!projects.length && (
// //               <div className="text-center p-8 text-gray-500">
// //                 No projects found. {debouncedSearch ? 'Try a different search term.' : 'Click "Create New Project" to get started.'}
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminProjects;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowLeft, Plus, Search, Loader2, Trash2, Edit, AlertTriangle
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getProjectAdminDashboard, deleteProject, getStorageUrl } from '../../api/projectsadmin';
// import toast, { Toaster } from 'react-hot-toast';
// import { useDebounce } from 'use-debounce';

// const DeleteModal = ({ isOpen, onClose, onConfirm, projectTitle }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
//           className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
//           onClick={e => e.stopPropagation()}
//         >
//           <div className="flex items-center gap-3 text-red-600 mb-4">
//             <AlertTriangle className="w-8 h-8" />
//             <h3 className="text-xl font-bold">Delete Project?</h3>
//           </div>
//           <p className="text-gray-600 mb-6">
//             Are you sure you want to delete <span className="font-semibold text-gray-900">{projectTitle}</span>? This action cannot be undone.
//           </p>
//           <div className="flex justify-end gap-3">
//             <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
//             <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Project</button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const AdminProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearch] = useDebounce(searchQuery, 500);
//   const [projectToDelete, setProjectToDelete] = useState(null);

//   const loadProjects = async () => {
//     setLoading(true);
//     try {
//       const data = await getProjectAdminDashboard(debouncedSearch);
//       setProjects(data);
//     } catch (error) {
//       toast.error('Failed to load projects');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProjects();
//   }, [debouncedSearch]);

//   const handleDelete = async () => {
//     if (!projectToDelete) return;
//     try {
//       await deleteProject(projectToDelete.id, projectToDelete.slug);
//       toast.success('Project deleted successfully');
//       setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
//       setProjectToDelete(null);
//     } catch (error) {
//       toast.error('Failed to delete project');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 font-sans">
//       <Toaster position="top-right" />
//       <DeleteModal 
//         isOpen={!!projectToDelete} 
//         onClose={() => setProjectToDelete(null)} 
//         onConfirm={handleDelete}
//         projectTitle={projectToDelete?.title}
//       />

//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <Link to="/admin" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-2 transition-colors">
//               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
//             </Link>
//             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Management</h1>
//             <p className="text-gray-500 mt-1">Manage your portfolio showcase and case studies.</p>
//           </div>
//           <Link
//             to="/admin/projects-config/new"
//             className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 font-medium"
//           >
//             <Plus className="w-5 h-5 mr-2" /> Create New Project
//           </Link>
//         </div>

//         {/* Filters */}
//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/60 sticky top-4 z-10">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search projects by title..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all outline-none"
//             />
//           </div>
//         </div>

//         {/* List */}
//         {loading ? (
//           <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             <AnimatePresence>
//               {projects.map((project) => (
//                 <motion.div
//                   key={project.id}
//                   layout
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 flex items-center gap-6"
//                 >
//                   {/* Thumbnail */}
//                   <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 relative">
//                     {project.hero_media?.file_path ? (
//                       <img 
//                         src={getStorageUrl(project.hero_media.file_path)} 
//                         alt={project.title} 
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-300">No Img</div>
//                     )}
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
//                   </div>

//                   {/* Info */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="text-lg font-bold text-gray-900 truncate">{project.title}</h3>
//                       <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                         project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                       }`}>
//                         {project.status || 'Draft'}
//                       </span>
//                     </div>
//                     <div className="text-sm text-gray-500 flex items-center gap-3">
//                       <span className="truncate text-gray-400">/{project.slug}</span>
//                       {project.project_tiers && (
//                         <span className="flex items-center gap-1">
//                            • <span className="w-2 h-2 rounded-full" style={{ background: project.project_tiers.color_hex }}></span>
//                            {project.project_tiers.name}
//                         </span>
//                       )}
//                     </div>
//                     <div className="mt-2 w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-blue-500 rounded-full" 
//                         style={{ width: `${project.completion_percentage}%` }}
//                       />
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2">
//                     <Link
//                       to={`/admin/projects-config/${project.slug}`}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="w-5 h-5" />
//                     </Link>
//                     <button
//                       onClick={() => setProjectToDelete(project)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {!loading && projects.length === 0 && (
//               <div className="text-center py-20 text-gray-500">
//                 No projects found. Create one to get started.
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProjects;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Plus, Search, Loader2, Trash2, Edit, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectAdminDashboard, deleteProject, getStorageUrl } from '../../api/projectsadmin';
import toast, { Toaster } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

const DeleteModal = ({ isOpen, onClose, onConfirm, projectTitle }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <AlertTriangle className="w-8 h-8" />
            <h3 className="text-xl font-bold">Delete Project?</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{projectTitle}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Project</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjectAdminDashboard(debouncedSearch);
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [debouncedSearch]);

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete.id, projectToDelete.slug);
      toast.success('Project deleted successfully');
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 font-sans">
      <Toaster position="top-right" />
      <DeleteModal 
        isOpen={!!projectToDelete} 
        onClose={() => setProjectToDelete(null)} 
        onConfirm={handleDelete}
        projectTitle={projectToDelete?.title}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to="/admin" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Management</h1>
            <p className="text-gray-500 mt-1">Manage your portfolio showcase and case studies.</p>
          </div>
          <Link
            to="/admin/projects-config/new"
            className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/20 transition-all hover:scale-105 font-medium"
          >
            <Plus className="w-5 h-5 mr-2" /> Create New Project
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/60 sticky top-4 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all outline-none"
            />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 flex items-center gap-6"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 relative">
                    {project.hero_media?.file_path ? (
                      <img 
                        src={getStorageUrl(project.hero_media.file_path)} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">No Img</div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{project.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status || 'Draft'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-3">
                      <span className="truncate text-gray-400">/{project.slug}</span>
                      {project.project_tiers && (
                        <span className="flex items-center gap-1">
                           • <span className="w-2 h-2 rounded-full" style={{ background: project.project_tiers.color_hex }}></span>
                           {project.project_tiers.name}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${project.completion_percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/projects-config/${project.slug}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => setProjectToDelete(project)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!loading && projects.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No projects found. Create one to get started.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;