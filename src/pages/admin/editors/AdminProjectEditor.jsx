

// // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // // // // // import {
// // // // // // //   ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, UploadCloud, X, Palette, Type, RefreshCw
// // // // // // // } from 'lucide-react';
// // // // // // // import { motion, AnimatePresence, Reorder } from 'framer-motion';
// // // // // // // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // // // // // // import {
// // // // // // //   getEditorData,
// // // // // // //   saveProject,
// // // // // // //   uploadMedia,
// // // // // // //   getStorageUrl,
// // // // // // //   deleteMedia,
// // // // // // // } from '../../../api/projectsadmin'; // Using the full admin API - FIXED PATH
// // // // // // // import toast, { Toaster } from 'react-hot-toast';
// // // // // // // // import Select from 'react-select'; // npm install react-select <-- REMOVED
// // // // // // // import { DndProvider } from 'react-dnd'; // npm install react-dnd react-dnd-html5-backend
// // // // // // // import { HTML5Backend } from 'react-dnd-html5-backend';

// // // // // // // // --- Reusable Form Components ---
// // // // // // // const FormInput = ({ label, name, register, error, ...rest }) => ( // Renamed 'errors' to 'error'
// // // // // // //   <div className="flex flex-col w-full">
// // // // // // //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // // // // // //     <input
// // // // // // //       id={name}
// // // // // // //       {...register(name)}
// // // // // // //       {...rest}
// // // // // // //       className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// // // // // // //     />
// // // // // // //     {error && <span className="text-red-500 text-sm mt-1">{error.message || 'This field is required'}</span>}
// // // // // // //   </div>
// // // // // // // );

// // // // // // // const FormTextarea = ({ label, name, register, error, ...rest }) => ( // Renamed 'errors' to 'error'
// // // // // // //   <div className="flex flex-col w-full">
// // // // // // //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // // // // // //     <textarea
// // // // // // //       id={name}
// // // // // // //       {...register(name)}
// // // // // // //       {...rest}
// // // // // // //       className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// // // // // // //       rows={4}
// // // // // // //     />
// // // // // // //     {error && <span className="text-red-500 text-sm mt-1">{error.message || 'This field is required'}</span>}
// // // // // // //   </div>
// // // // // // // );

// // // // // // // // --- Media Uploader Component ---
// // // // // // // const MediaUploader = ({ label, mediaId, mediaPath, onUpload, onRemove, error }) => {
// // // // // // //   const [isUploading, setIsUploading] = useState(false);
// // // // // // //   const imageUrl = mediaPath ? getStorageUrl(mediaPath) : null;

// // // // // // //   const handleFileChange = async (e) => {
// // // // // // //     const file = e.target.files?.[0];
// // // // // // //     if (!file) return;

// // // // // // //     setIsUploading(true);
// // // // // // //     const toastId = toast.loading('Uploading image...');
// // // // // // //     try {
// // // // // // //       const { media_asset_id, file_path } = await uploadMedia(file);
// // // // // // //       onUpload(media_asset_id, file_path); // Pass both ID and path back
// // // // // // //       toast.success('Image uploaded', { id: toastId });
// // // // // // //     } catch (err) {
// // // // // // //       toast.error('Upload failed', { id: toastId });
// // // // // // //       console.error(err);
// // // // // // //     } finally {
// // // // // // //       setIsUploading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex flex-col w-full">
// // // // // // //       <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // // // // // //       <div className="w-full p-4 border-2 border-dashed rounded-lg border-gray-300">
// // // // // // //         {isUploading ? (
// // // // // // //           <div className="flex flex-col items-center justify-center h-32">
// // // // // // //             <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
// // // // // // //             <span className="mt-2 text-sm text-gray-500">Uploading...</span>
// // // // // // //           </div>
// // // // // // //         ) : imageUrl ? (
// // // // // // //           <div className="relative group">
// // // // // // //             <img src={imageUrl} alt="Uploaded media" className="w-full h-32 object-contain rounded-md" />
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               onClick={onRemove}
// // // // // // //               className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// // // // // // //             >
// // // // // // //               <Trash2 className="w-4 h-4" />
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
// // // // // // //             <UploadCloud className="w-8 h-8 text-gray-400" />
// // // // // // //             <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
// // // // // // //             <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
// // // // // // //           </label>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //       {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // --- Content Block Editor ---
// // // // // // // const ContentBlockEditor = ({ control, register, errors }) => {
// // // // // // //   const { fields, append, remove, move } = useFieldArray({
// // // // // // //     control,
// // // // // // //     name: "content",
// // // // // // //   });

// // // // // // //   const addBlock = (type) => {
// // // // // // //     let content = {};
// // // // // // //     if (type === 'text') content = { title: 'New Section', body: '...' };
// // // // // // //     if (type === 'image') content = { media_id: null, caption: '', media_path: null };
// // // // // // //     if (type === 'palette') content = { colors: ['#FFFFFF', '#000000'] };
// // // // // // //     append({ type, content });
// // // // // // //   };

// // // // // // //   const handleImageUpload = (index, media_id, file_path) => {
// // // // // // //     // This is tricky, we need to update the nested field
// // // // // // //     // We'll update the 'content' field directly in the form
// // // // // // //     const field = fields[index];
// // // // // // //     field.content.media_id = media_id;
// // // // // // //     field.content.media_path = file_path;
// // // // // // //     // This is not standard react-hook-form, but necessary for nested state
// // // // // // //     // A better way would be to use setValue, but this is simpler for now
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // //       <h3 className="text-lg font-medium text-gray-900 mb-4">Content Blocks</h3>
// // // // // // //       <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
// // // // // // //         <AnimatePresence>
// // // // // // //           {fields.map((field, index) => (
// // // // // // //             <Reorder.Item key={field.id} value={field} className="mb-4">
// // // // // // //               <motion.div
// // // // // // //                 initial={{ opacity: 0, y: 10 }}
// // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // //                 exit={{ opacity: 0, x: -50 }}
// // // // // // //                 className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
// // // // // // //               >
// // // // // // //                 <div className="flex items-center justify-between mb-4">
// // // // // // //                   <div className="flex items-center gap-2">
// // // // // // //                     <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
// // // // // // //                     <span className="font-medium capitalize">{field.type} Block</span>
// // // // // // //                   </div>
// // // // // // //                   <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
// // // // // // //                     <Trash2 className="w-4 h-4" />
// // // // // // //                   </button>
// // // // // // //                 </div>

// // // // // // //                 {/* --- Block Specific Fields --- */}
// // // // // // //                 {field.type === 'text' && (
// // // // // // //                   <div className="space-y-4">
// // // // // // //                     <FormInput
// // // // // // //                       label="Title"
// // // // // // //                       name={`content.${index}.content.title`}
// // // // // // //                       register={register}
// // // // // // //                       error={errors.content?.[index]?.content?.title}
// // // // // // //                     />
// // // // // // //                     <FormTextarea
// // // // // // //                       label="Body"
// // // // // // //                       name={`content.${index}.content.body`}
// // // // // // //                       register={register}
// // // // // // //                       error={errors.content?.[index]?.content?.body}
// // // // // // //                     />
// // // // // // //                   </div>
// // // // // // //                 )}

// // // // // // //                 {field.type === 'image' && (
// // // // // // //                   <div className="space-y-4">
// // // // // // //                     <MediaUploader
// // // // // // //                       label="Image"
// // // // // // //                       mediaId={field.content.media_id}
// // // // // // //                       mediaPath={field.content.media_path}
// // // // // // //                       onUpload={(id, path) => {
// // // // // // //                         // Manually update the form state for this nested field
// // // // // // //                         // This is a limitation of RHF with complex nested state
// // // // // // //                         field.content.media_id = id;
// // // // // // //                         field.content.media_path = path;
// // // // // // //                       }}
// // // // // // //                       onRemove={() => {
// // // // // // //                         field.content.media_id = null;
// // // // // // //                         field.content.media_path = null;
// // // // // // //                       }}
// // // // // // //                     />
// // // // // // //                     <FormInput
// // // // // // //                       label="Caption"
// // // // // // //                       name={`content.${index}.content.caption`}
// // // // // // //                       register={register}
// // // // // // //                       error={errors.content?.[index]?.content?.caption}
// // // // // // //                     />
// // // // // // //                   </div>
// // // // // // //                 )}
                
// // // // // // //                 {field.type === 'palette' && (
// // // // // // //                   <FormInput
// // // // // // //                     label="Colors (comma-separated hex codes)"
// // // // // // //                     name={`content.${index}.content.colors`}
// // // // // // //                     register={register}
// // // // // // //                     error={errors.content?.[index]?.content?.colors}
// // // // // // //                     // We need to join/split the array for the input
// // // // // // //                     // This requires a Controller or custom logic, simplifying for now
// // // // // // //                     // Or we just store as string
// // // // // // //                   />
// // // // // // //                   // A real color palette editor would be more complex
// // // // // // //                 )}

// // // // // // //               </motion.div>
// // // // // // //             </Reorder.Item>
// // // // // // //           ))}
// // // // // // //         </AnimatePresence>
// // // // // // //       </Reorder.Group>
      
// // // // // // //       <div className="flex gap-2 mt-4">
// // // // // // //         <button type="button" onClick={() => addBlock('text')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
// // // // // // //           <Type className="w-4 h-4" /> Add Text
// // // // // // //         </button>
// // // // // // //         <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
// // // // // // //           <ImageIcon className="w-4 h-4" /> Add Image
// // // // // // //         </button>
// // // // // // //         <button type="button" onClick={() => addBlock('palette')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
// // // // // // //           <Palette className="w-4 h-4" /> Add Palette
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // --- Gallery Editor Component ---
// // // // // // // const GalleryEditor = ({ control }) => {
// // // // // // //   const { fields, append, remove, move } = useFieldArray({
// // // // // // //     control,
// // // // // // //     name: "gallery",
// // // // // // //   });

// // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // //   const handleFilesChange = async (e) => {
// // // // // // //     const files = Array.from(e.target.files);
// // // // // // //     if (files.length === 0) return;

// // // // // // //     setIsUploading(true);
// // // // // // //     const toastId = toast.loading(`Uploading ${files.length} images...`);

// // // // // // //     try {
// // // // // // //       const uploadPromises = files.map(uploadMedia);
// // // // // // //       const results = await Promise.all(uploadPromises);

// // // // // // //       results.forEach(({ media_asset_id, file_path }) => {
// // // // // // //         append({
// // // // // // //           media: {
// // // // // // //             id: media_asset_id,
// // // // // // //             file_path: file_path,
// // // // // // //           },
// // // // // // //         });
// // // // // // //       });
// // // // // // //       toast.success('Upload complete', { id: toastId });
// // // // // // //     } catch (err) {
// // // // // // //       toast.error('Some uploads failed', { id: toastId });
// // // // // // //     } finally {
// // // // // // //       setIsUploading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // //       <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery</h3>
// // // // // // //       <label className="flex flex-col items-center justify-center w-full p-6 mb-4 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:bg-gray-100">
// // // // // // //         <UploadCloud className="w-8 h-8 text-gray-400" />
// // // // // // //         <span className="mt-2 text-sm text-gray-500">
// // // // // // //           {isUploading ? 'Uploading...' : 'Click or drag to upload multiple images'}
// // // // // // //         </span>
// // // // // // //         <input
// // // // // // //           type="file"
// // // // // // //           className="hidden"
// // // // // // //           multiple
// // // // // // //           accept="image/*"
// // // // // // //           onChange={handleFilesChange}
// // // // // // //           disabled={isUploading}
// // // // // // //         />
// // // // // // //       </label>

// // // // // // //       <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
// // // // // // //         <AnimatePresence>
// // // // // // //           {fields.map((field, index) => (
// // // // // // //             <Reorder.Item key={field.id} value={field} className="mb-2">
// // // // // // //               <motion.div
// // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // //                 exit={{ opacity: 0, x: 50 }}
// // // // // // //                 className="flex items-center gap-3 p-2 bg-white border border-gray-300 rounded-md"
// // // // // // //               >
// // // // // // //                 <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
// // // // // // //                 <img
// // // // // // //                   src={getStorageUrl(field.media.file_path)}
// // // // // // //                   className="w-16 h-10 object-cover rounded-sm"
// // // // // // //                   alt="Gallery thumb"
// // // // // // //                 />
// // // // // // //                 <span className="flex-1 text-sm truncate text-gray-600">{field.media.file_path.split('/').pop()}</span>
// // // // // // //                 <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
// // // // // // //                   <Trash2 className="w-4 h-4" />
// // // // // // //                 </button>
// // // // // // //               </motion.div>
// // // // // // //             </Reorder.Item>
// // // // // // //           ))}
// // // // // // //         </AnimatePresence>
// // // // // // //       </Reorder.Group>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };


// // // // // // // // --- Main Editor Component ---
// // // // // // // const AdminProjectEditor = () => {
// // // // // // //   const { slug } = useParams();
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const isCreating = slug === 'new';
// // // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // // //   const [projectId, setProjectId] = useState(null);
// // // // // // //   const [allCategories, setAllCategories] = useState([]);
// // // // // // //   const [allTools, setAllTools] = useState([]);
// // // // // // //   const [isSaving, setIsSaving] = useState(false);

// // // // // // //   const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
// // // // // // //     defaultValues: {
// // // // // // //       title: '',
// // // // // // //       slug: '',
// // // // // // //       description: '',
// // // // // // //       client: '',
// // // // // // //       role: '',
// // // // // // //       timeline: '',
// // // // // // //       video_url: '',
// // // // // // //       hero_media_id: null,
// // // // // // //       hero_media_path: null,
// // // // // // //       detail_hero_media_id: null,
// // // // // // //       detail_hero_media_path: null,
// // // // // // //       categories: [],
// // // // // // //       tools: [],
// // // // // // //       content: [],
// // // // // // //       gallery: [],
// // // // // // //     },
// // // // // // //   });
// // // // // // //   // const { errors } = {}; // <-- This was the source of the error

// // // // // // //   // Watch for title changes to suggest slug
// // // // // // //   const titleWatch = watch('title');

// // // // // // //   const generateSlug = () => {
// // // // // // //     const slugified = (titleWatch || '')
// // // // // // //       .toString()
// // // // // // //       .toLowerCase()
// // // // // // //       .trim()
// // // // // // //       .replace(/\s+/g, '-')
// // // // // // //       .replace(/[^\w-]+/g, '')
// // // // // // //       .replace(/--+/g, '-');
// // // // // // //     setValue('slug', slugified, { shouldValidate: true });
// // // // // // //   };


// // // // // // //   // Load all data
// // // // // // //   useEffect(() => {
// // // // // // //     const loadData = async () => {
// // // // // // //       try {
// // // // // // //         const { project, allCategories, allTools } = await getEditorData(slug);
// // // // // // //         setAllCategories(allCategories || []);
// // // // // // //         setAllTools(allTools || []);

// // // // // // //         console.log('in the admin project page');
// // // // // // //         console.log(project);
// // // // // // //         if (!isCreating && project) {
// // // // // // //           // Edit mode: set form values
// // // // // // //           setProjectId(project.id);
// // // // // // //           reset({
// // // // // // //             title: project.title || '',
// // // // // // //             slug: project.slug || '',
// // // // // // //             description: project.description || '',
// // // // // // //             client: project.client || '',
// // // // // // //             role: project.role || '',
// // // // // // //             timeline: project.timeline || '',
// // // // // // //             video_url: project.video_url || '',
// // // // // // //             hero_media_id: project.hero_media_id,
// // // // // // //             hero_media_path: project.hero_media_path,
// // // // // // //             detail_hero_media_id: project.detail_hero_media_id,
// // // // // // //             detail_hero_media_path: project.detail_hero_media_path,
// // // // // // //             categories: project.categories || [],
// // // // // // //             tools: project.tools || [],
// // // // // // //             content: project.content.map(c => ({...c, content: (typeof c.content === 'string') ? JSON.parse(c.content) : c.content })) || [], // Safely parse content
// // // // // // //             gallery: project.gallery || [],
// // // // // // //           });
// // // // // // //         }
// // // // // // //       } catch (error) {
// // // // // // //         toast.error(`Error loading data: ${error.message}`);
// // // // // // //         //navigate('/admin/projects');
// // // // // // //       } finally {
// // // // // // //         setIsLoading(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     loadData();
// // // // // // //   }, [slug, isCreating, reset, navigate]);

// // // // // // //   // Main save function
// // // // // // //   const onSubmit = async (formData) => {
// // // // // // //     setIsSaving(true);
// // // // // // //     const toastId = toast.loading(isCreating ? 'Creating project...' : 'Saving changes...');

// // // // // // //     // --- Prepare Data for API ---
// // // // // // //     // 1. Transform palette arrays back into strings if needed, or handle in API
// // // // // // //     //    For now, we'll assume the API can take the JSON
// // // // // // //     // 2. We need to re-serialize the 'content' blocks' content field
// // // // // // //     const preparedData = {
// // // // // // //       ...formData,
// // // // // // //       content: formData.content.map(block => {
// // // // // // //         // Special handling for palette: convert comma-separated string to array
// // // // // // //         if (block.type === 'palette' && typeof block.content.colors === 'string') {
// // // // // // //           block.content.colors = block.content.colors.split(',').map(s => s.trim());
// // // // // // //         }
// // // // // // //         return {
// // // // // // //           ...block,
// // // // // // //           content: block.content // API expects this as a JSON object
// // // // // // //         };
// // // // // // //       }),
// // // // // // //       // Map gallery to match what API expects (if needed)
// // // // // // //       // The API function `saveProject` is built to handle this `formData` shape
// // // // // // //     };
    
// // // // // // //     // Call the API
// // // // // // //     const { success, error, projectSlug } = await saveProject(preparedData, projectId);

// // // // // // //     if (success) {
// // // // // // //       toast.success(isCreating ? 'Project created!' : 'Project saved!', { id: toastId });
// // // // // // //       // Navigate to the *new* slug if creating, or the *updated* slug
// // // // // // //       navigate(`/admin/projects-config/${projectSlug}`);
// // // // // // //       // If we just created, we need to switch from 'new' to the real slug
// // // // // // //       if (isCreating) {
// // // // // // //         navigate(`/admin/projects-config/${projectSlug}`, { replace: true });
// // // // // // //       }
// // // // // // //     } else {
// // // // // // //       toast.error(`Error: ${error}`, { id: toastId });
// // // // // // //     }
// // // // // // //     setIsSaving(false);
// // // // // // //   };

// // // // // // //   if (isLoading) {
// // // // // // //     return (
// // // // // // //       <div className="flex items-center justify-center h-screen">
// // // // // // //         <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   // Get current media paths for the uploaders
// // // // // // //   const heroMediaPath = watch('hero_media_path');
// // // // // // //   const detailHeroMediaPath = watch('detail_hero_media_path');

// // // // // // //   return (
// // // // // // //     <DndProvider backend={HTML5Backend}>
// // // // // // //       <Toaster position="top-right" />
// // // // // // //       <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
// // // // // // //         {/* Sticky Header */}
// // // // // // //         <div className="sticky top-0 z-40 bg-white shadow-sm">
// // // // // // //           <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
// // // // // // //             <div className="flex items-center gap-3">
// // // // // // //               <Link to="/admin/projects-config" className="p-2 rounded-lg hover:bg-gray-100">
// // // // // // //                 <ArrowLeft className="w-6 h-6 text-gray-700" />
// // // // // // //               </Link>
// // // // // // //               <div>
// // // // // // //                 <h1 className="text-xl font-bold text-gray-900">
// // // // // // //                   {isCreating ? 'Create New Project' : 'Edit Project'}
// // // // // // //                 </h1>
// // // // // // //                 {!isCreating && <span className="text-sm text-gray-500">/projects/{watch('slug')}</span>}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //             <button
// // // // // // //               type="submit"
// // // // // // //               disabled={isSaving}
// // // // // // //               className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
// // // // // // //             >
// // // // // // //               {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
// // // // // // //               {isSaving ? (isCreating ? 'Creating...' : 'Saving...') : (isCreating ? 'Create Project' : 'Save Changes')}
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Main Editor Layout */}
// // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 md:p-8">
          
// // // // // // //           {/* --- Main Content Column --- */}
// // // // // // //           <div className="lg:col-span-2 space-y-6">
// // // // // // //             <div className="p-6 bg-white rounded-lg shadow-md">
// // // // // // //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Main Details</h2>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 <FormInput
// // // // // // //                   label="Project Title"
// // // // // // //                   name="title"
// // // // // // //                   register={register}
// // // // // // //                   error={errors.title}
// // // // // // //                   placeholder="e.g. Zenith Motion"
// // // // // // //                 />
                
// // // // // // //                 <div className="flex flex-col">
// // // // // // //                   <label className="mb-2 text-sm font-medium text-gray-700">Project Slug</label>
// // // // // // //                   <div className="flex gap-2">
// // // // // // //                     <input
// // // // // // //                       {...register('slug')}
// // // // // // //                       placeholder="e.g. zenith-motion"
// // // // // // //                       className="flex-1 p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
// // // // // // //                     />
// // // // // // //                     <button
// // // // // // //                       type="button"
// // // // // // //                       onClick={generateSlug}
// // // // // // //                       title="Generate from title"
// // // // // // //                       className="p-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
// // // // // // //                     >
// // // // // // //                       <RefreshCw className="w-5 h-5" />
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 <FormTextarea
// // // // // // //                   label="Short Description"
// // // // // // //                   name="description"
// // // // // // //                   register={register}
// // // // // // //                   error={errors.description}
// // // // // // //                   placeholder="A one-sentence summary for the project grid."
// // // // // // //                 />
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             <div className="p-6 bg-white rounded-lg shadow-md">
// // // // // // //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Info</h2>
// // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // //                 <FormInput label="Client" name="client" register={register} error={errors.client} />
// // // // // // //                 <FormInput label="Role" name="role" register={register} error={errors.role} placeholder="e.g. Lead Designer" />
// // // // // // //                 <FormInput label="Timeline" name="timeline" register={register} error={errors.timeline} placeholder="e.g. 6 Weeks" />
// // // // // // //                 <FormInput label="Video URL" name="video_url" register={register} error={errors.video_url} placeholder="Optional: http://.../video.mp4" />
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* --- Content Blocks --- */}
// // // // // // //             <ContentBlockEditor control={control} register={register} errors={errors} />
            
// // // // // // //             {/* --- Gallery --- */}
// // // // // // //             <GalleryEditor control={control} />

// // // // // // //           </div>
          
// // // // // // //           {/* --- Sidebar Column --- */}
// // // // // // //           <div className="lg:col-span-1 space-y-6">
            
// // // // // // //             <div className="p-6 bg-white rounded-lg shadow-md">
// // // // // // //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 <MediaUploader
// // // // // // //                   label="Hero Image (Grid)"
// // // // // // //                   mediaId={watch('hero_media_id')}
// // // // // // //                   mediaPath={heroMediaPath}
// // // // // // //                   onUpload={(id, path) => {
// // // // // // //                     setValue('hero_media_id', id);
// // // // // // //                     setValue('hero_media_path', path);
// // // // // // //                   }}
// // // // // // //                   onRemove={() => {
// // // // // // //                     setValue('hero_media_id', null);
// // // // // // //                     setValue('hero_media_path', null);
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //                 <MediaUploader
// // // // // // //                   label="Detail Hero (Page Top)"
// // // // // // //                   mediaId={watch('detail_hero_media_id')}
// // // // // // //                   mediaPath={detailHeroMediaPath}
// // // // // // //                   onUpload={(id, path) => {
// // // // // // //                     setValue('detail_hero_media_id', id);
// // // // // // //                     setValue('detail_hero_media_path', path);
// // // // // // //                   }}
// // // // // // //                   onRemove={() => {
// // // // // // //                     setValue('detail_hero_media_id', null);
// // // // // // //                     setValue('detail_hero_media_path', null);
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               </div>
// // // // // // //             </div>
            
// // // // // // //             <div className="p-6 bg-white rounded-lg shadow-md">
// // // // // // //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Taxonomies</h2>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 <div className="flex flex-col">
// // // // // // //                   <label className="mb-2 text-sm font-medium text-gray-700">Categories</label>
// // // // // // //                   <Controller
// // // // // // //                     name="categories"
// // // // // // //                     control={control}
// // // // // // //                     render={({ field }) => {
// // // // // // //                       // We need an array of IDs for the <select> value
// // // // // // //                       const selectedIds = field.value?.map(v => v.id) || [];
// // // // // // //                       return (
// // // // // // //                         <select
// // // // // // //                           {...field}
// // // // // // //                           multiple
// // // // // // //                           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
// // // // // // //                           style={{ minHeight: '120px' }}
// // // // // // //                           value={selectedIds} // Set selected IDs
// // // // // // //                           onChange={(e) => {
// // // // // // //                             // Get all selected options
// // // // // // //                             const selectedOptions = Array.from(e.target.selectedOptions);
// // // // // // //                             // Find the full objects from allCategories
// // // // // // //                             const selectedValues = selectedOptions.map(option => 
// // // // // // //                               allCategories.find(cat => cat.id.toString() === option.value)
// // // // // // //                             ).filter(Boolean); // Filter out any undefined
// // // // // // //                             // Pass this array of objects to react-hook-form
// // // // // // //                             field.onChange(selectedValues);
// // // // // // //                           }}
// // // // // // //                         >
// // // // // // //                           {allCategories.map(cat => (
// // // // // // //                             <option key={cat.id} value={cat.id}>
// // // // // // //                               {cat.name}
// // // // // // //                             </option>
// // // // // // //                           ))}
// // // // // // //                         </select>
// // // // // // //                       );
// // // // // // //                     }}
// // // // // // //                   />
// // // // // // //                 </div>
                
// // // // // // //                 <div className="flex flex-col">
// // // // // // //                   <label className="mb-2 text-sm font-medium text-gray-700">Tools</label>
// // // // // // //                   <Controller
// // // // // // //                     name="tools"
// // // // // // //                     control={control}
// // // // // // //                     render={({ field }) => {
// // // // // // //                       // We need an array of IDs for the <select> value
// // // // // // //                       const selectedIds = field.value?.map(v => v.id) || [];
// // // // // // //                       return (
// // // // // // //                         <select
// // // // // // //                           {...field}
// // // // // // //                           multiple
// // // // // // //                           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
// // // // // // //                           style={{ minHeight: '120px' }}
// // // // // // //                           value={selectedIds} // Set selected IDs
// // // // // // //                           onChange={(e) => {
// // // // // // //                             // Get all selected options
// // // // // // //                             const selectedOptions = Array.from(e.target.selectedOptions);
// // // // // // //                             // Find the full objects from allTools
// // // // // // //                             const selectedValues = selectedOptions.map(option => 
// // // // // // //                               allTools.find(tool => tool.id.toString() === option.value)
// // // // // // //                             ).filter(Boolean); // Filter out any undefined
// // // // // // //                             // Pass this array of objects to react-hook-form
// // // // // // //                             field.onChange(selectedValues);
// // // // // // //                           }}
// // // // // // //                         >
// // // // // // //                           {allTools.map(tool => (
// // // // // // //                             <option key={tool.id} value={tool.id}>
// // // // // // //                               {tool.name}
// // // // // // //                             </option>
// // // // // // //                           ))}
// // // // // // //                         </select>
// // // // // // //                       );
// // // // // // //                     }}
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </form>
// // // // // // //     </DndProvider>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default AdminProjectEditor;
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // // // // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // // // // // import { DndProvider, useDrag, useDrop } from 'react-dnd';
// // // // // // import { HTML5Backend } from 'react-dnd-html5-backend';
// // // // // // import toast, { Toaster } from 'react-hot-toast';
// // // // // // import {
// // // // // //   ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon,
// // // // // //   X, Layers, Layout, PieChart, FileText, CheckCircle, Upload
// // // // // // } from 'lucide-react';
// // // // // // import { 
// // // // // //   getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl 
// // // // // // } from '../../../api/projectsadmin';

// // // // // // // --- UI Components ---

// // // // // // const TabButton = ({ active, onClick, icon: Icon, label }) => (
// // // // // //   <button
// // // // // //     type="button"
// // // // // //     onClick={onClick}
// // // // // //     className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
// // // // // //       active 
// // // // // //         ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
// // // // // //         : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
// // // // // //     }`}
// // // // // //   >
// // // // // //     <Icon className="w-4 h-4" /> {label}
// // // // // //   </button>
// // // // // // );

// // // // // // const FormSection = ({ title, children }) => (
// // // // // //   <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
// // // // // //     {title && <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">{title}</h3>}
// // // // // //     <div className="space-y-4">{children}</div>
// // // // // //   </div>
// // // // // // );

// // // // // // const Input = ({ label, register, name, error, type = "text", ...rest }) => (
// // // // // //   <div className="w-full">
// // // // // //     <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// // // // // //     <input
// // // // // //       type={type}
// // // // // //       {...register(name)}
// // // // // //       {...rest}
// // // // // //       className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${
// // // // // //         error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
// // // // // //       }`}
// // // // // //     />
// // // // // //     {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
// // // // // //   </div>
// // // // // // );

// // // // // // const Textarea = ({ label, register, name, rows = 3 }) => (
// // // // // //   <div className="w-full">
// // // // // //     <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// // // // // //     <textarea
// // // // // //       {...register(name)}
// // // // // //       rows={rows}
// // // // // //       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
// // // // // //     />
// // // // // //   </div>
// // // // // // );

// // // // // // // --- Media Uploader Component ---
// // // // // // const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
// // // // // //   const [uploading, setUploading] = useState(false);

// // // // // //   const handleFile = async (e) => {
// // // // // //     const files = Array.from(e.target.files);
// // // // // //     if (files.length === 0) return;

// // // // // //     setUploading(true);
// // // // // //     try {
// // // // // //       for (const file of files) {
// // // // // //         const asset = await uploadMedia(file);
// // // // // //         onUpload(asset); // Returns full asset object
// // // // // //       }
// // // // // //       toast.success('Uploaded successfully');
// // // // // //     } catch (err) {
// // // // // //       toast.error('Upload failed');
// // // // // //       console.error(err);
// // // // // //     } finally {
// // // // // //       setUploading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="space-y-2">
// // // // // //       <label className="block text-sm font-medium text-gray-700">{label}</label>
      
// // // // // //       <div className="flex flex-wrap gap-3">
// // // // // //         {/* Existing Media Previews */}
// // // // // //         {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
// // // // // //           media?.file_path && (
// // // // // //             <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
// // // // // //               <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 onClick={() => onRemove(media.id)}
// // // // // //                 className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// // // // // //               >
// // // // // //                 <X className="w-3 h-3" />
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           )
// // // // // //         ))}

// // // // // //         {/* Upload Button */}
// // // // // //         {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
// // // // // //           <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
// // // // // //             {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
// // // // // //             <span className="text-xs text-gray-500 mt-1">Upload</span>
// // // // // //             <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
// // // // // //           </label>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // --- Main Editor Component ---

// // // // // // const AdminProjectEditor = () => {
// // // // // //   const { slug } = useParams();
// // // // // //   const navigate = useNavigate();
// // // // // //   const isNew = !slug || slug === 'new';
// // // // // //   const [activeTab, setActiveTab] = useState('general');
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [saving, setSaving] = useState(false);
  
// // // // // //   // Reference Data
// // // // // //   const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

// // // // // //   const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
// // // // // //     defaultValues: {
// // // // // //       status: 'Completed',
// // // // // //       completion_percentage: 100,
// // // // // //       metadata_value: 0,
// // // // // //       banner_media_ids: [],
// // // // // //       slider_media_ids: [],
// // // // // //       project_sections: [],
// // // // // //       project_stats: [],
// // // // // //       flip_cards: [],
// // // // // //       process_steps: [],
// // // // // //       challenges_solutions: [],
// // // // // //       accessibility_data: [],
// // // // // //       // UI State for previews
// // // // // //       banner_previews: [],
// // // // // //       slider_previews: []
// // // // // //     }
// // // // // //   });

// // // // // //   // Watch fields for conditional rendering or previews
// // // // // //   const watchBannerPreviews = watch('banner_previews');
// // // // // //   const watchSliderPreviews = watch('slider_previews');
// // // // // //   const watchHero = watch('hero_media');
// // // // // //   const watchDetailHero = watch('detail_hero_media');

// // // // // //   // --- Dynamic Field Arrays ---
// // // // // //   const { fields: sectionFields, append: addSection, remove: removeSection, move: moveSection } = useFieldArray({ control, name: "project_sections" });
// // // // // //   const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
// // // // // //   const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
// // // // // //   const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });

// // // // // //   useEffect(() => {
// // // // // //     const init = async () => {
// // // // // //       setLoading(true);
// // // // // //       try {
// // // // // //         const refData = await getReferenceData();
// // // // // //         setRefs(refData);

// // // // // //         if (!isNew) {
// // // // // //           const projectData = await getEditorData(slug);
// // // // // //           // Reset form with formatted data
// // // // // //           reset(projectData);
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         toast.error('Error loading data');
// // // // // //         console.error(error);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     init();
// // // // // //   }, [slug, isNew, reset]);

// // // // // //   const onSubmit = async (data) => {
// // // // // //     setSaving(true);
// // // // // //     try {
// // // // // //       const result = await saveProject(data, isNew, slug);
// // // // // //       toast.success('Project saved successfully!');
// // // // // //       if (isNew) {
// // // // // //         navigate(`/admin/projects-config/${result.slug}`);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       toast.error('Failed to save project');
// // // // // //       console.error(error);
// // // // // //     } finally {
// // // // // //       setSaving(false);
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

// // // // // //   return (
// // // // // //     <DndProvider backend={HTML5Backend}>
// // // // // //       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans pb-24">
// // // // // //         <Toaster position="top-right" />

// // // // // //         {/* Top Bar */}
// // // // // //         <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 sticky top-0 z-20 bg-gray-50/95 backdrop-blur py-4 border-b border-gray-200">
// // // // // //           <div className="flex items-center gap-4">
// // // // // //             <Link to="/admin/projects-config" className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
// // // // // //             <div>
// // // // // //               <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Project' : 'Edit Project'}</h1>
// // // // // //               <p className="text-xs text-gray-500">{watch('slug')}</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <button 
// // // // // //             type="submit" 
// // // // // //             disabled={saving}
// // // // // //             className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
// // // // // //           >
// // // // // //             {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
// // // // // //             Save Changes
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         <div className="max-w-6xl mx-auto">
// // // // // //           {/* Tabs */}
// // // // // //           <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
// // // // // //             <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
// // // // // //             <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media" />
// // // // // //             <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
// // // // // //             <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
// // // // // //             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Stats" />
// // // // // //           </div>

// // // // // //           {/* --- TAB: GENERAL --- */}
// // // // // //           {activeTab === 'general' && (
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // //               <div className="md:col-span-2 space-y-6">
// // // // // //                 <FormSection title="Basic Info">
// // // // // //                   <div className="grid grid-cols-2 gap-4">
// // // // // //                     <Input label="Project Title" name="title" register={register} error={errors.title} />
// // // // // //                     <Input label="Slug (Auto-generated)" name="slug" register={register} />
// // // // // //                   </div>
// // // // // //                   <div className="grid grid-cols-2 gap-4">
// // // // // //                     <Input label="Client" name="client" register={register} />
// // // // // //                     <Input label="Role" name="role" register={register} />
// // // // // //                   </div>
// // // // // //                   <Textarea label="Short Description" name="description" register={register} />
// // // // // //                 </FormSection>

// // // // // //                 <FormSection title="Details">
// // // // // //                   <div className="grid grid-cols-3 gap-4">
// // // // // //                     <Input label="Timeline" name="timeline" register={register} />
// // // // // //                     <Input label="Publisher" name="publisher_name" register={register} />
// // // // // //                     <Input label="Metadata Label" name="metadata_label" register={register} placeholder="e.g. Views" />
// // // // // //                   </div>
// // // // // //                   <div className="grid grid-cols-3 gap-4">
// // // // // //                     <Input label="Meta Value" name="metadata_value" type="number" register={register} />
// // // // // //                     <Input label="Primary Color" name="primary_color" type="color" register={register} className="h-10 cursor-pointer" />
// // // // // //                     <Input label="Secondary Color" name="secondary_color" type="color" register={register} className="h-10 cursor-pointer" />
// // // // // //                   </div>
// // // // // //                   <Input label="Tagline" name="tagline" register={register} />
// // // // // //                 </FormSection>
// // // // // //               </div>

// // // // // //               <div className="space-y-6">
// // // // // //                 <FormSection title="Status & Classification">
// // // // // //                   <div className="mb-4">
// // // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
// // // // // //                     <select {...register('status')} className="w-full p-2 border rounded-lg bg-white">
// // // // // //                       <option value="Completed">Completed</option>
// // // // // //                       <option value="In Progress">In Progress</option>
// // // // // //                       <option value="Concept">Concept</option>
// // // // // //                     </select>
// // // // // //                   </div>
// // // // // //                   <div className="mb-4">
// // // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Complexity Tier</label>
// // // // // //                     <select {...register('tier_id')} className="w-full p-2 border rounded-lg bg-white">
// // // // // //                       <option value="">Select Tier...</option>
// // // // // //                       {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
// // // // // //                     </select>
// // // // // //                   </div>
// // // // // //                   <Input label="Completion %" name="completion_percentage" type="number" register={register} />
// // // // // //                 </FormSection>

// // // // // //                 <FormSection title="Relations">
// // // // // //                   <div className="mb-4">
// // // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
// // // // // //                     <select {...register('category_ids')} multiple className="w-full p-2 border rounded-lg bg-white h-32">
// // // // // //                       {refs.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
// // // // // //                     </select>
// // // // // //                   </div>
// // // // // //                   <div className="mb-4">
// // // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Tools</label>
// // // // // //                     <select {...register('tool_ids')} multiple className="w-full p-2 border rounded-lg bg-white h-40">
// // // // // //                       {refs.tools.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
// // // // // //                     </select>
// // // // // //                   </div>
// // // // // //                 </FormSection>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* --- TAB: MEDIA --- */}
// // // // // //           {activeTab === 'media' && (
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // //               <FormSection title="Main Assets">
// // // // // //                 <MediaUploader 
// // // // // //                   label="Card/Hero Thumbnail"
// // // // // //                   currentMedia={watchHero}
// // // // // //                   onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)}
// // // // // //                   onUpload={(asset) => {
// // // // // //                     setValue('hero_media_id', asset.id);
// // // // // //                     setValue('hero_media', asset);
// // // // // //                   }}
// // // // // //                 />
// // // // // //                 <div className="mt-6">
// // // // // //                   <MediaUploader 
// // // // // //                     label="Detail Page Header (Large)"
// // // // // //                     currentMedia={watchDetailHero}
// // // // // //                     onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)}
// // // // // //                     onUpload={(asset) => {
// // // // // //                       setValue('detail_hero_media_id', asset.id);
// // // // // //                       setValue('detail_hero_media', asset);
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //                 <div className="mt-6">
// // // // // //                    <Input label="Video URL (Optional)" name="video_url" register={register} placeholder="https://..." />
// // // // // //                 </div>
// // // // // //               </FormSection>

// // // // // //               <FormSection title="Galleries">
// // // // // //                 <div className="mb-6">
// // // // // //                   <MediaUploader 
// // // // // //                     label="Banner Images (Grid)"
// // // // // //                     multiple
// // // // // //                     currentMedia={watchBannerPreviews}
// // // // // //                     onRemove={(id) => {
// // // // // //                       const newIds = (watch('banner_media_ids') || []).filter(existingId => existingId !== id);
// // // // // //                       const newPreviews = (watch('banner_previews') || []).filter(p => p.id !== id);
// // // // // //                       setValue('banner_media_ids', newIds);
// // // // // //                       setValue('banner_previews', newPreviews);
// // // // // //                     }}
// // // // // //                     onUpload={(asset) => {
// // // // // //                       const currentIds = watch('banner_media_ids') || [];
// // // // // //                       const currentPreviews = watch('banner_previews') || [];
// // // // // //                       setValue('banner_media_ids', [...currentIds, asset.id]);
// // // // // //                       setValue('banner_previews', [...currentPreviews, asset]);
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //                 <div className="mb-6">
// // // // // //                   <MediaUploader 
// // // // // //                     label="Slider Images (Carousel)"
// // // // // //                     multiple
// // // // // //                     currentMedia={watchSliderPreviews}
// // // // // //                     onRemove={(id) => {
// // // // // //                       const newIds = (watch('slider_media_ids') || []).filter(existingId => existingId !== id);
// // // // // //                       const newPreviews = (watch('slider_previews') || []).filter(p => p.id !== id);
// // // // // //                       setValue('slider_media_ids', newIds);
// // // // // //                       setValue('slider_previews', newPreviews);
// // // // // //                     }}
// // // // // //                     onUpload={(asset) => {
// // // // // //                       const currentIds = watch('slider_media_ids') || [];
// // // // // //                       const currentPreviews = watch('slider_previews') || [];
// // // // // //                       setValue('slider_media_ids', [...currentIds, asset.id]);
// // // // // //                       setValue('slider_previews', [...currentPreviews, asset]);
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </FormSection>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* --- TAB: SECTIONS (Complex) --- */}
// // // // // //           {activeTab === 'sections' && (
// // // // // //             <div className="space-y-4">
// // // // // //                <div className="flex justify-between items-center">
// // // // // //                   <h3 className="text-lg font-bold">Image & Text Sections</h3>
// // // // // //                   <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="text-blue-600 flex items-center gap-1 font-medium"><Plus className="w-4 h-4" /> Add Section</button>
// // // // // //                </div>
// // // // // //                {sectionFields.map((field, index) => (
// // // // // //                  <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group">
// // // // // //                     <button type="button" onClick={() => removeSection(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
// // // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // //                       <div className="space-y-4">
// // // // // //                         <Input label="Heading" name={`project_sections.${index}.heading`} register={register} />
// // // // // //                         <Textarea label="Body Text" name={`project_sections.${index}.body_text`} register={register} />
// // // // // //                         <div className="grid grid-cols-2 gap-4">
// // // // // //                           <div>
// // // // // //                              <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
// // // // // //                              <select {...register(`project_sections.${index}.layout_type`)} className="w-full p-2 border rounded-lg">
// // // // // //                                <option value="image_left">Image Left</option>
// // // // // //                                <option value="image_right">Image Right</option>
// // // // // //                                <option value="full_width">Full Width</option>
// // // // // //                                <option value="split_side_by_side">Split (2 Images)</option>
// // // // // //                              </select>
// // // // // //                           </div>
// // // // // //                           <Input label="Bg Color (Tailwind)" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div className="bg-gray-50 p-4 rounded-lg">
// // // // // //                         <Controller
// // // // // //                           control={control}
// // // // // //                           name={`project_sections.${index}.resolved_media`}
// // // // // //                           render={({ field: { value, onChange } }) => (
// // // // // //                             <MediaUploader 
// // // // // //                               label="Section Images"
// // // // // //                               multiple
// // // // // //                               currentMedia={value}
// // // // // //                               onRemove={(id) => {
// // // // // //                                 const newMedia = (value || []).filter(m => m.id !== id);
// // // // // //                                 onChange(newMedia);
// // // // // //                                 // Update actual ID array
// // // // // //                                 const currentIds = watch(`project_sections.${index}.media_asset_ids`) || [];
// // // // // //                                 setValue(`project_sections.${index}.media_asset_ids`, currentIds.filter(x => x !== id));
// // // // // //                               }}
// // // // // //                               onUpload={(asset) => {
// // // // // //                                 const newMedia = [...(value || []), asset];
// // // // // //                                 onChange(newMedia);
// // // // // //                                 // Update actual ID array
// // // // // //                                 const currentIds = watch(`project_sections.${index}.media_asset_ids`) || [];
// // // // // //                                 setValue(`project_sections.${index}.media_asset_ids`, [...currentIds, asset.id]);
// // // // // //                               }}
// // // // // //                             />
// // // // // //                           )}
// // // // // //                         />
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                  </div>
// // // // // //                ))}
// // // // // //                {sectionFields.length === 0 && <div className="text-center text-gray-400 py-10 border-2 border-dashed rounded-xl">No sections added yet.</div>}
// // // // // //             </div>
// // // // // //           )}

// // // // // //            {/* --- TAB: STATS --- */}
// // // // // //            {activeTab === 'stats' && (
// // // // // //              <div className="space-y-4">
// // // // // //                 <div className="flex justify-between items-center">
// // // // // //                    <h3 className="text-lg font-bold">Project Statistics</h3>
// // // // // //                    <button type="button" onClick={() => addStat({ title: '', value: '' })} className="text-blue-600 flex items-center gap-1 font-medium"><Plus className="w-4 h-4" /> Add Stat</button>
// // // // // //                 </div>
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // //                    {statFields.map((field, index) => (
// // // // // //                      <div key={field.id} className="bg-white p-4 rounded-xl border border-gray-200 relative">
// // // // // //                         <button type="button" onClick={() => removeStat(index)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// // // // // //                         <div className="space-y-3">
// // // // // //                            <Input label="Title" name={`project_stats.${index}.title`} register={register} placeholder="e.g. Users" />
// // // // // //                            <Input label="Value" name={`project_stats.${index}.value`} register={register} placeholder="e.g. 50k+" />
// // // // // //                            <Input label="Trend/Sub" name={`project_stats.${index}.trend`} register={register} placeholder="e.g. +20%" />
// // // // // //                            <Input label="Icon Name" name={`project_stats.${index}.icon_name`} register={register} placeholder="e.g. Users" />
// // // // // //                         </div>
// // // // // //                      </div>
// // // // // //                    ))}
// // // // // //                 </div>
// // // // // //              </div>
// // // // // //            )}

// // // // // //            {/* --- TAB: CONTENT BLOCKS (JSONB) --- */}
// // // // // //            {activeTab === 'content' && (
// // // // // //              <div className="space-y-8">
               
// // // // // //                {/* Process Steps */}
// // // // // //                <div className="bg-white p-6 rounded-xl border border-gray-200">
// // // // // //                   <div className="flex justify-between items-center mb-4">
// // // // // //                     <h3 className="text-lg font-bold flex items-center gap-2"><Layers className="w-5 h-5 text-purple-600" /> Process Steps</h3>
// // // // // //                     <button type="button" onClick={() => addProcess({ title: '', description: '', step_number: processFields.length + 1 })} className="text-sm text-blue-600">+ Add Step</button>
// // // // // //                   </div>
// // // // // //                   <div className="space-y-3">
// // // // // //                     {processFields.map((field, index) => (
// // // // // //                       <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-3 rounded-lg">
// // // // // //                         <span className="font-bold text-gray-400 mt-2">#{index + 1}</span>
// // // // // //                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
// // // // // //                            <Input label="Title" name={`process_steps.${index}.title`} register={register} />
// // // // // //                            <Input label="Description" name={`process_steps.${index}.description`} register={register} />
// // // // // //                         </div>
// // // // // //                         <button type="button" onClick={() => removeProcess(index)} className="text-red-400 hover:text-red-600 mt-2"><Trash2 className="w-4 h-4" /></button>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                </div>

// // // // // //                {/* Flip Cards */}
// // // // // //                <div className="bg-white p-6 rounded-xl border border-gray-200">
// // // // // //                   <div className="flex justify-between items-center mb-4">
// // // // // //                     <h3 className="text-lg font-bold flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Design Principles (Cards)</h3>
// // // // // //                     <button type="button" onClick={() => addCard({ title: '', front_text: '', back_text: '' })} className="text-sm text-blue-600">+ Add Card</button>
// // // // // //                   </div>
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //                     {cardFields.map((field, index) => (
// // // // // //                       <div key={field.id} className="bg-gray-50 p-3 rounded-lg relative">
// // // // // //                         <button type="button" onClick={() => removeCard(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><X className="w-3 h-3" /></button>
// // // // // //                         <div className="space-y-2">
// // // // // //                            <Input label="Card Title" name={`flip_cards.${index}.title`} register={register} />
// // // // // //                            <Textarea label="Front Text" name={`flip_cards.${index}.front_text`} register={register} rows={2} />
// // // // // //                            <Textarea label="Back Text (Hover)" name={`flip_cards.${index}.back_text`} register={register} rows={2} />
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                </div>

// // // // // //              </div>
// // // // // //            )}

// // // // // //         </div>
// // // // // //       </form>
// // // // // //     </DndProvider>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminProjectEditor;

// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // // // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // // // // import { DndProvider } from 'react-dnd';
// // // // // import { HTML5Backend } from 'react-dnd-html5-backend';
// // // // // import toast, { Toaster } from 'react-hot-toast';
// // // // // import {
// // // // //   ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon,
// // // // //   X, Layers, Layout, PieChart, FileText, CheckCircle, Upload, Palette, Target, Hammer, Search
// // // // // } from 'lucide-react';
// // // // // import { 
// // // // //   getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl, createTool, createCategory 
// // // // // } from '../../../api/projectsadmin';

// // // // // // --- Helper Components ---

// // // // // const TabButton = ({ active, onClick, icon: Icon, label }) => (
// // // // //   <button
// // // // //     type="button"
// // // // //     onClick={onClick}
// // // // //     className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
// // // // //       active 
// // // // //         ? 'border-blue-600 text-blue-600 bg-white' 
// // // // //         : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
// // // // //     }`}
// // // // //   >
// // // // //     <Icon className="w-4 h-4" /> {label}
// // // // //   </button>
// // // // // );

// // // // // const FormSection = ({ title, children, className = "" }) => (
// // // // //   <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
// // // // //     {title && <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">{title}</h3>}
// // // // //     <div className="space-y-5">{children}</div>
// // // // //   </div>
// // // // // );

// // // // // const Input = ({ label, register, name, error, type = "text", placeholder, className = "", ...rest }) => (
// // // // //   <div className="w-full">
// // // // //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// // // // //     <input
// // // // //       type={type}
// // // // //       {...register(name)}
// // // // //       placeholder={placeholder}
// // // // //       {...rest}
// // // // //       className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${
// // // // //         error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
// // // // //       } ${className}`}
// // // // //     />
// // // // //     {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
// // // // //   </div>
// // // // // );

// // // // // const Textarea = ({ label, register, name, rows = 3, placeholder }) => (
// // // // //   <div className="w-full">
// // // // //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// // // // //     <textarea
// // // // //       {...register(name)}
// // // // //       rows={rows}
// // // // //       placeholder={placeholder}
// // // // //       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-y min-h-[80px]"
// // // // //     />
// // // // //   </div>
// // // // // );

// // // // // // --- Custom Components ---

// // // // // // Better Color Picker with Preview
// // // // // const ColorPicker = ({ label, register, name, watch }) => {
// // // // //   const color = watch(name);
// // // // //   return (
// // // // //     <div className="w-full">
// // // // //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// // // // //       <div className="flex items-center gap-3">
// // // // //         <div 
// // // // //           className="w-10 h-10 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
// // // // //           style={{ backgroundColor: color || '#ffffff' }}
// // // // //         />
// // // // //         <div className="relative flex-1">
// // // // //           <input
// // // // //             type="text"
// // // // //             {...register(name)}
// // // // //             placeholder="#000000"
// // // // //             className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none uppercase font-mono"
// // // // //           />
// // // // //           <input
// // // // //             type="color"
// // // // //             {...register(name)}
// // // // //             className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
// // // // //           />
// // // // //           <Palette className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // MultiSelect with "Create New" Option
// // // // // const MultiSelectWithCreate = ({ label, options, value = [], onChange, onCreate, placeholder = "Select..." }) => {
// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const [search, setSearch] = useState("");
// // // // //   const containerRef = useRef(null);

// // // // //   // Close when clicking outside
// // // // //   useEffect(() => {
// // // // //     const handleClickOutside = (event) => {
// // // // //       if (containerRef.current && !containerRef.current.contains(event.target)) {
// // // // //         setIsOpen(false);
// // // // //       }
// // // // //     };
// // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // //   }, []);

// // // // //   const filteredOptions = options.filter(opt => 
// // // // //     opt.name.toLowerCase().includes(search.toLowerCase()) && 
// // // // //     !value.includes(opt.id.toString())
// // // // //   );

// // // // //   const selectedItems = options.filter(opt => value.includes(opt.id.toString()));

// // // // //   return (
// // // // //     <div className="w-full" ref={containerRef}>
// // // // //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      
// // // // //       <div className="border border-gray-300 rounded-lg bg-white p-2 min-h-[46px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
// // // // //         {selectedItems.map(item => (
// // // // //           <span key={item.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
// // // // //             {item.name}
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => onChange(value.filter(id => id !== item.id.toString()))}
// // // // //               className="ml-1.5 hover:text-blue-900 focus:outline-none"
// // // // //             >
// // // // //               <X className="w-3 h-3" />
// // // // //             </button>
// // // // //           </span>
// // // // //         ))}
        
// // // // //         <input 
// // // // //           type="text"
// // // // //           className="flex-1 min-w-[120px] outline-none text-sm py-1"
// // // // //           placeholder={selectedItems.length === 0 ? placeholder : ""}
// // // // //           value={search}
// // // // //           onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
// // // // //           onFocus={() => setIsOpen(true)}
// // // // //         />
// // // // //       </div>

// // // // //       {isOpen && (
// // // // //         <div className="relative">
// // // // //           <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
// // // // //             {filteredOptions.length > 0 ? (
// // // // //               filteredOptions.map(opt => (
// // // // //                 <button
// // // // //                   key={opt.id}
// // // // //                   type="button"
// // // // //                   onClick={() => {
// // // // //                     onChange([...value, opt.id.toString()]);
// // // // //                     setSearch("");
// // // // //                     setIsOpen(false);
// // // // //                   }}
// // // // //                   className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between group"
// // // // //                 >
// // // // //                   <span>{opt.name}</span>
// // // // //                   {opt.icon_name && <span className="text-xs text-gray-400 font-mono group-hover:text-gray-500">{opt.icon_name}</span>}
// // // // //                 </button>
// // // // //               ))
// // // // //             ) : (
// // // // //               <div className="p-2">
// // // // //                 {search.length > 0 && (
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => { onCreate(search); setSearch(""); setIsOpen(false); }}
// // // // //                     className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2"
// // // // //                   >
// // // // //                     <Plus className="w-4 h-4" /> Create "{search}"
// // // // //                   </button>
// // // // //                 )}
// // // // //                 {search.length === 0 && <p className="text-gray-400 text-sm text-center py-2">Start typing to search...</p>}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // --- Modal for Creating Tools/Categories ---
// // // // // const CreateModal = ({ isOpen, onClose, onSave, title, fields }) => {
// // // // //   if (!isOpen) return null;
  
// // // // //   const handleSave = (e) => {
// // // // //     e.preventDefault();
// // // // //     const formData = new FormData(e.target);
// // // // //     const data = Object.fromEntries(formData.entries());
// // // // //     onSave(data);
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
// // // // //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
// // // // //         <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
// // // // //         <form onSubmit={handleSave} className="space-y-4">
// // // // //           {fields.map(f => (
// // // // //             <div key={f.name}>
// // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
// // // // //               <input 
// // // // //                 name={f.name} 
// // // // //                 type="text" 
// // // // //                 required 
// // // // //                 placeholder={f.placeholder}
// // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" 
// // // // //               />
// // // // //               {f.hint && <p className="text-xs text-gray-500 mt-1">{f.hint}</p>}
// // // // //             </div>
// // // // //           ))}
// // // // //           <div className="flex justify-end gap-2 mt-6">
// // // // //             <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
// // // // //             <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black font-medium">Create</button>
// // // // //           </div>
// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // --- Media Uploader Component ---
// // // // // const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
// // // // //   const [uploading, setUploading] = useState(false);

// // // // //   const handleFile = async (e) => {
// // // // //     const files = Array.from(e.target.files);
// // // // //     if (files.length === 0) return;

// // // // //     setUploading(true);
// // // // //     try {
// // // // //       for (const file of files) {
// // // // //         const asset = await uploadMedia(file);
// // // // //         onUpload(asset); 
// // // // //       }
// // // // //       toast.success('Uploaded successfully');
// // // // //     } catch (err) {
// // // // //       toast.error('Upload failed');
// // // // //       console.error(err);
// // // // //     } finally {
// // // // //       setUploading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-2">
// // // // //       <label className="block text-sm font-medium text-gray-700">{label}</label>
      
// // // // //       <div className="flex flex-wrap gap-3">
// // // // //         {/* Existing Media Previews */}
// // // // //         {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
// // // // //           media?.file_path && (
// // // // //             <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
// // // // //               <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() => onRemove(media.id)}
// // // // //                 className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
// // // // //               >
// // // // //                 <X className="w-3 h-3" />
// // // // //               </button>
// // // // //             </div>
// // // // //           )
// // // // //         ))}

// // // // //         {/* Upload Button */}
// // // // //         {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
// // // // //           <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50/50">
// // // // //             {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
// // // // //             <span className="text-xs text-gray-500 mt-1 font-medium">Upload</span>
// // // // //             <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
// // // // //           </label>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // --- Main Editor Component ---

// // // // // const AdminProjectEditor = () => {
// // // // //   const { slug } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const isNew = !slug || slug === 'new';
// // // // //   const [activeTab, setActiveTab] = useState('general');
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [saving, setSaving] = useState(false);
  
// // // // //   // Modals State
// // // // //   const [modalType, setModalType] = useState(null); // 'tool' or 'category'
// // // // //   const [pendingCreateValue, setPendingCreateValue] = useState("");

// // // // //   // Reference Data
// // // // //   const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

// // // // //   const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
// // // // //     defaultValues: {
// // // // //       status: 'Completed',
// // // // //       completion_percentage: 100,
// // // // //       metadata_value: 0,
// // // // //       banner_media_ids: [],
// // // // //       slider_media_ids: [],
// // // // //       project_sections: [],
// // // // //       project_stats: [],
// // // // //       flip_cards: [],
// // // // //       process_steps: [],
// // // // //       challenges_solutions: [],
// // // // //       accessibility_data: [],
// // // // //       category_ids: [],
// // // // //       tool_ids: [],
// // // // //       primary_color: '#000000',
// // // // //       secondary_color: '#ffffff',
// // // // //       banner_previews: [],
// // // // //       slider_previews: []
// // // // //     }
// // // // //   });

// // // // //   const watchBannerPreviews = watch('banner_previews');
// // // // //   const watchSliderPreviews = watch('slider_previews');
// // // // //   const watchHero = watch('hero_media');
// // // // //   const watchDetailHero = watch('detail_hero_media');

// // // // //   // --- Dynamic Field Arrays ---
// // // // //   const { fields: sectionFields, append: addSection, remove: removeSection } = useFieldArray({ control, name: "project_sections" });
// // // // //   const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
// // // // //   const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
// // // // //   const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });
// // // // //   const { fields: challengeFields, append: addChallenge, remove: removeChallenge } = useFieldArray({ control, name: "challenges_solutions" });

// // // // //   useEffect(() => {
// // // // //     const init = async () => {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         const refData = await getReferenceData();
// // // // //         setRefs(refData);

// // // // //         if (!isNew) {
// // // // //           const projectData = await getEditorData(slug);
// // // // //           reset(projectData);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         toast.error('Error loading data');
// // // // //         console.error(error);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     init();
// // // // //   }, [slug, isNew, reset]);

// // // // //   // --- Handlers for Creation ---

// // // // //   const handleCreateTool = async (data) => {
// // // // //     try {
// // // // //       const newTool = await createTool(data.name, data.icon_name);
// // // // //       setRefs(prev => ({ ...prev, tools: [...prev.tools, newTool].sort((a,b) => a.name.localeCompare(b.name)) }));
      
// // // // //       // Automatically select the new tool
// // // // //       const currentTools = watch('tool_ids') || [];
// // // // //       setValue('tool_ids', [...currentTools, newTool.id.toString()]);
      
// // // // //       toast.success(`Tool "${newTool.name}" created!`);
// // // // //       setModalType(null);
// // // // //     } catch (err) {
// // // // //       toast.error('Failed to create tool');
// // // // //     }
// // // // //   };

// // // // //   const handleCreateCategory = async (data) => {
// // // // //     try {
// // // // //       const newCat = await createCategory(data.name);
// // // // //       setRefs(prev => ({ ...prev, categories: [...prev.categories, newCat].sort((a,b) => a.name.localeCompare(b.name)) }));
      
// // // // //       // Automatically select the new category
// // // // //       const currentCats = watch('category_ids') || [];
// // // // //       setValue('category_ids', [...currentCats, newCat.id.toString()]);
      
// // // // //       toast.success(`Category "${newCat.name}" created!`);
// // // // //       setModalType(null);
// // // // //     } catch (err) {
// // // // //       toast.error('Failed to create category');
// // // // //     }
// // // // //   };

// // // // //   const onSubmit = async (data) => {
// // // // //     setSaving(true);
// // // // //     try {
// // // // //       const result = await saveProject(data, isNew, slug);
// // // // //       toast.success('Project saved successfully!');
// // // // //       if (isNew) {
// // // // //         navigate(`/admin/projects-config/${result.slug}`);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error('Failed to save project');
// // // // //       console.error(error);
// // // // //     } finally {
// // // // //       setSaving(false);
// // // // //     }
// // // // //   };

// // // // //   if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

// // // // //   return (
// // // // //     <DndProvider backend={HTML5Backend}>
// // // // //       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
// // // // //         <Toaster position="top-right" />

// // // // //         {/* --- Modals --- */}
// // // // //         <CreateModal 
// // // // //           isOpen={modalType === 'tool'} 
// // // // //           onClose={() => setModalType(null)} 
// // // // //           onSave={handleCreateTool}
// // // // //           title="Create New Tool"
// // // // //           fields={[
// // // // //             { name: 'name', label: 'Tool Name', placeholder: 'e.g. React Native' },
// // // // //             { name: 'icon_name', label: 'Icon Name (Lucide/Standard)', placeholder: 'e.g. Smartphone', hint: 'Use PascalCase icon names like "Zap", "Code", "Figma"' }
// // // // //           ]}
// // // // //         />
// // // // //         <CreateModal 
// // // // //           isOpen={modalType === 'category'} 
// // // // //           onClose={() => setModalType(null)} 
// // // // //           onSave={handleCreateCategory}
// // // // //           title="Create New Category"
// // // // //           fields={[
// // // // //             { name: 'name', label: 'Category Name', placeholder: 'e.g. Mobile Development' }
// // // // //           ]}
// // // // //         />

// // // // //         {/* Top Bar */}
// // // // //         <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
// // // // //           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// // // // //             <div className="flex items-center gap-4">
// // // // //               <Link to="/admin/projects-config" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
// // // // //               <div>
// // // // //                 <h1 className="text-2xl font-bold text-gray-900 leading-tight">{isNew ? 'New Project' : 'Edit Project'}</h1>
// // // // //                 <p className="text-xs text-gray-500 font-mono">{watch('slug') || 'untitled-project'}</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button 
// // // // //               type="submit" 
// // // // //               disabled={saving}
// // // // //               className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all transform active:scale-95 font-medium"
// // // // //             >
// // // // //               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
// // // // //               Save Changes
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="max-w-7xl mx-auto px-6 py-8">
// // // // //           {/* Tabs */}
// // // // //           <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-1">
// // // // //             <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
// // // // //             <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media Assets" />
// // // // //             <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
// // // // //             <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
// // // // //             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Statistics" />
// // // // //           </div>

// // // // //           {/* --- TAB: GENERAL --- */}
// // // // //           {activeTab === 'general' && (
// // // // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // //               <div className="lg:col-span-2 space-y-8">
// // // // //                 <FormSection title="Core Information">
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // // //                     <Input label="Project Title" name="title" register={register} error={errors.title} placeholder="e.g. E-Commerce Platform" />
// // // // //                     <Input label="Slug (Auto-generated)" name="slug" register={register} placeholder="e.g. e-commerce-platform" />
// // // // //                   </div>
// // // // //                   <Textarea label="Short Description" name="description" register={register} placeholder="Brief overview for search and cards..." />
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // // //                     <Input label="Client" name="client" register={register} placeholder="e.g. Acme Corp" />
// // // // //                     <Input label="Role" name="role" register={register} placeholder="e.g. Lead Designer" />
// // // // //                   </div>
// // // // //                 </FormSection>

// // // // //                 <FormSection title="Extended Details">
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// // // // //                     <Input label="Timeline" name="timeline" register={register} placeholder="e.g. 3 Months" />
// // // // //                     <Input label="Publisher" name="publisher_name" register={register} placeholder="e.g. Behance" />
// // // // //                     <Input label="Metadata Label" name="metadata_label" register={register} placeholder="e.g. Views" />
// // // // //                   </div>
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// // // // //                     <Input label="Meta Value" name="metadata_value" type="number" register={register} />
// // // // //                     <ColorPicker label="Primary Color" name="primary_color" register={register} watch={watch} />
// // // // //                     <ColorPicker label="Secondary Color" name="secondary_color" register={register} watch={watch} />
// // // // //                   </div>
// // // // //                   <Input label="Tagline" name="tagline" register={register} placeholder="A catchy phrase for the header..." />
// // // // //                 </FormSection>
// // // // //               </div>

// // // // //               <div className="space-y-8">
// // // // //                 <FormSection title="Status & Taxonomy">
// // // // //                   <div className="mb-5">
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Status</label>
// // // // //                     <div className="relative">
// // // // //                       <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500/20 outline-none">
// // // // //                         <option value="Completed">Completed</option>
// // // // //                         <option value="In Progress">In Progress</option>
// // // // //                         <option value="Concept">Concept</option>
// // // // //                       </select>
// // // // //                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
// // // // //                     </div>
// // // // //                   </div>
                  
// // // // //                   <div className="mb-5">
// // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Complexity Tier</label>
// // // // //                     <select {...register('tier_id')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/20 outline-none">
// // // // //                       <option value="">Select Tier...</option>
// // // // //                       {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
// // // // //                     </select>
// // // // //                   </div>
                  
// // // // //                   <Input label="Completion %" name="completion_percentage" type="number" register={register} />
// // // // //                 </FormSection>

// // // // //                 <FormSection title="Relations & Tags">
// // // // //                   <div className="space-y-6">
// // // // //                     <Controller
// // // // //                       control={control}
// // // // //                       name="category_ids"
// // // // //                       render={({ field: { value, onChange } }) => (
// // // // //                         <MultiSelectWithCreate
// // // // //                           label="Categories"
// // // // //                           options={refs.categories}
// // // // //                           value={value}
// // // // //                           onChange={onChange}
// // // // //                           onCreate={(name) => { setPendingCreateValue(name); setModalType('category'); }}
// // // // //                           placeholder="Search categories..."
// // // // //                         />
// // // // //                       )}
// // // // //                     />
                    
// // // // //                     <Controller
// // // // //                       control={control}
// // // // //                       name="tool_ids"
// // // // //                       render={({ field: { value, onChange } }) => (
// // // // //                         <MultiSelectWithCreate
// // // // //                           label="Tools Used"
// // // // //                           options={refs.tools}
// // // // //                           value={value}
// // // // //                           onChange={onChange}
// // // // //                           onCreate={(name) => { setPendingCreateValue(name); setModalType('tool'); }}
// // // // //                           placeholder="Search tools..."
// // // // //                         />
// // // // //                       )}
// // // // //                     />
// // // // //                   </div>
// // // // //                 </FormSection>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* --- TAB: MEDIA --- */}
// // // // //           {activeTab === 'media' && (
// // // // //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // // //               <FormSection title="Hero Assets">
// // // // //                 <MediaUploader 
// // // // //                   label="Card Thumbnail (Main Image)"
// // // // //                   currentMedia={watchHero}
// // // // //                   onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)}
// // // // //                   onUpload={(asset) => {
// // // // //                     setValue('hero_media_id', asset.id);
// // // // //                     setValue('hero_media', asset);
// // // // //                   }}
// // // // //                 />
// // // // //                 <div className="mt-8 border-t pt-6">
// // // // //                   <MediaUploader 
// // // // //                     label="Detail Page Header (Large Banner)"
// // // // //                     currentMedia={watchDetailHero}
// // // // //                     onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)}
// // // // //                     onUpload={(asset) => {
// // // // //                       setValue('detail_hero_media_id', asset.id);
// // // // //                       setValue('detail_hero_media', asset);
// // // // //                     }}
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div className="mt-8">
// // // // //                    <Input label="Video URL (YouTube/Vimeo)" name="video_url" register={register} placeholder="https://..." />
// // // // //                 </div>
// // // // //               </FormSection>

// // // // //               <FormSection title="Galleries">
// // // // //                 <div className="mb-8">
// // // // //                   <MediaUploader 
// // // // //                     label="Grid Gallery Images"
// // // // //                     multiple
// // // // //                     currentMedia={watchBannerPreviews}
// // // // //                     onRemove={(id) => {
// // // // //                       const newIds = (watch('banner_media_ids') || []).filter(existingId => existingId !== id);
// // // // //                       const newPreviews = (watch('banner_previews') || []).filter(p => p.id !== id);
// // // // //                       setValue('banner_media_ids', newIds);
// // // // //                       setValue('banner_previews', newPreviews);
// // // // //                     }}
// // // // //                     onUpload={(asset) => {
// // // // //                       const currentIds = watch('banner_media_ids') || [];
// // // // //                       const currentPreviews = watch('banner_previews') || [];
// // // // //                       setValue('banner_media_ids', [...currentIds, asset.id]);
// // // // //                       setValue('banner_previews', [...currentPreviews, asset]);
// // // // //                     }}
// // // // //                   />
// // // // //                   <p className="text-xs text-gray-500 mt-2">Used for the static grid display.</p>
// // // // //                 </div>
// // // // //                 <div className="border-t pt-6">
// // // // //                   <MediaUploader 
// // // // //                     label="Carousel Slider Images"
// // // // //                     multiple
// // // // //                     currentMedia={watchSliderPreviews}
// // // // //                     onRemove={(id) => {
// // // // //                       const newIds = (watch('slider_media_ids') || []).filter(existingId => existingId !== id);
// // // // //                       const newPreviews = (watch('slider_previews') || []).filter(p => p.id !== id);
// // // // //                       setValue('slider_media_ids', newIds);
// // // // //                       setValue('slider_previews', newPreviews);
// // // // //                     }}
// // // // //                     onUpload={(asset) => {
// // // // //                       const currentIds = watch('slider_media_ids') || [];
// // // // //                       const currentPreviews = watch('slider_previews') || [];
// // // // //                       setValue('slider_media_ids', [...currentIds, asset.id]);
// // // // //                       setValue('slider_previews', [...currentPreviews, asset]);
// // // // //                     }}
// // // // //                   />
// // // // //                    <p className="text-xs text-gray-500 mt-2">Used for the interactive slider component.</p>
// // // // //                 </div>
// // // // //               </FormSection>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* --- TAB: CONTENT BLOCKS --- */}
// // // // //           {activeTab === 'content' && (
// // // // //              <div className="space-y-8 max-w-5xl mx-auto">
               
// // // // //                {/* Process Steps */}
// // // // //                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
// // // // //                     <div>
// // // // //                       <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900"><Layers className="w-5 h-5 text-purple-600" /> Process Steps</h3>
// // // // //                       <p className="text-sm text-gray-500 mt-1">Describe the workflow or phases of the project.</p>
// // // // //                     </div>
// // // // //                     <button type="button" onClick={() => addProcess({ title: '', description: '', step_number: processFields.length + 1 })} className="text-sm px-3 py-1.5 bg-purple-50 text-purple-700 font-medium rounded-lg hover:bg-purple-100">+ Add Step</button>
// // // // //                   </div>
// // // // //                   <div className="space-y-4">
// // // // //                     {processFields.map((field, index) => (
// // // // //                       <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
// // // // //                         <span className="font-bold text-gray-300 text-xl mt-1">#{index + 1}</span>
// // // // //                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                            <Input label="Step Title" name={`process_steps.${index}.title`} register={register} placeholder="e.g. Discovery" />
// // // // //                            <Input label="Description" name={`process_steps.${index}.description`} register={register} placeholder="Description of this phase..." />
// // // // //                         </div>
// // // // //                         <button type="button" onClick={() => removeProcess(index)} className="text-gray-400 hover:text-red-600 mt-2 p-1"><Trash2 className="w-4 h-4" /></button>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                     {processFields.length === 0 && <div className="text-center py-8 text-gray-400 italic">No process steps added.</div>}
// // // // //                   </div>
// // // // //                </div>

// // // // //                {/* Challenges & Solutions */}
// // // // //                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
// // // // //                     <div>
// // // // //                       <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900"><Target className="w-5 h-5 text-orange-600" /> Challenges & Solutions</h3>
// // // // //                       <p className="text-sm text-gray-500 mt-1">Key problems faced and how they were solved.</p>
// // // // //                     </div>
// // // // //                     <button type="button" onClick={() => addChallenge({ title: '', description: '' })} className="text-sm px-3 py-1.5 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100">+ Add Challenge</button>
// // // // //                   </div>
// // // // //                   <div className="space-y-4">
// // // // //                     {challengeFields.map((field, index) => (
// // // // //                       <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
// // // // //                         <div className="mt-2"><Hammer className="w-5 h-5 text-gray-400" /></div>
// // // // //                         <div className="flex-1 space-y-3">
// // // // //                            <Input label="Challenge/Problem" name={`challenges_solutions.${index}.title`} register={register} placeholder="e.g. Legacy Codebase" />
// // // // //                            <Textarea label="Solution/Outcome" name={`challenges_solutions.${index}.description`} register={register} placeholder="How we solved it..." />
// // // // //                         </div>
// // // // //                         <button type="button" onClick={() => removeChallenge(index)} className="text-gray-400 hover:text-red-600 mt-2 p-1"><Trash2 className="w-4 h-4" /></button>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                     {challengeFields.length === 0 && <div className="text-center py-8 text-gray-400 italic">No challenges added.</div>}
// // // // //                   </div>
// // // // //                </div>

// // // // //                {/* Flip Cards */}
// // // // //                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
// // // // //                     <div>
// // // // //                       <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900"><CheckCircle className="w-5 h-5 text-green-600" /> Design Principles (Flip Cards)</h3>
// // // // //                       <p className="text-sm text-gray-500 mt-1">Interactive cards for core values or principles.</p>
// // // // //                     </div>
// // // // //                     <button type="button" onClick={() => addCard({ title: '', front_text: '', back_text: '' })} className="text-sm px-3 py-1.5 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100">+ Add Card</button>
// // // // //                   </div>
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // // //                     {cardFields.map((field, index) => (
// // // // //                       <div key={field.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative group">
// // // // //                         <button type="button" onClick={() => removeCard(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// // // // //                         <div className="space-y-3">
// // // // //                            <Input label="Card Title" name={`flip_cards.${index}.title`} register={register} placeholder="e.g. Simplicity" />
// // // // //                            <Textarea label="Front Text" name={`flip_cards.${index}.front_text`} register={register} rows={2} placeholder="Visible initially..." />
// // // // //                            <Textarea label="Back Text (Hover)" name={`flip_cards.${index}.back_text`} register={register} rows={2} placeholder="Visible on hover..." />
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                   {cardFields.length === 0 && <div className="text-center py-8 text-gray-400 italic">No cards added.</div>}
// // // // //                </div>

// // // // //              </div>
// // // // //            )}

// // // // //           {/* --- TAB: SECTIONS --- */}
// // // // //           {activeTab === 'sections' && (
// // // // //             <div className="space-y-6 max-w-5xl mx-auto">
// // // // //                <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
// // // // //                   <div>
// // // // //                     <h3 className="text-lg font-bold text-blue-900">Dynamic Page Sections</h3>
// // // // //                     <p className="text-sm text-blue-700 mt-1">Add rich text and image sections that stack vertically.</p>
// // // // //                   </div>
// // // // //                   <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Section</button>
// // // // //                </div>
               
// // // // //                <div className="space-y-6">
// // // // //                 {sectionFields.map((field, index) => (
// // // // //                   <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
// // // // //                       <div className="flex justify-between items-start mb-4">
// // // // //                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Section {index + 1}</span>
// // // // //                         <button type="button" onClick={() => removeSection(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
// // // // //                       </div>
                      
// // // // //                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // // //                         <div className="space-y-4">
// // // // //                           <Input label="Section Heading" name={`project_sections.${index}.heading`} register={register} placeholder="Section title..." />
// // // // //                           <Textarea label="Body Content" name={`project_sections.${index}.body_text`} register={register} rows={5} placeholder="Main text content..." />
// // // // //                           <div className="grid grid-cols-2 gap-4">
// // // // //                             <div>
// // // // //                               <label className="block text-sm font-medium text-gray-700 mb-1.5">Layout Style</label>
// // // // //                               <select {...register(`project_sections.${index}.layout_type`)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// // // // //                                 <option value="image_left">Image Left</option>
// // // // //                                 <option value="image_right">Image Right</option>
// // // // //                                 <option value="full_width">Full Width</option>
// // // // //                                 <option value="split_side_by_side">Split (2 Images)</option>
// // // // //                               </select>
// // // // //                             </div>
// // // // //                             <Input label="Background (Tailwind)" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
// // // // //                           <Controller
// // // // //                             control={control}
// // // // //                             name={`project_sections.${index}.resolved_media`}
// // // // //                             render={({ field: { value, onChange } }) => (
// // // // //                               <MediaUploader 
// // // // //                                 label="Section Images"
// // // // //                                 multiple
// // // // //                                 currentMedia={value}
// // // // //                                 onRemove={(id) => {
// // // // //                                   const newMedia = (value || []).filter(m => m.id !== id);
// // // // //                                   onChange(newMedia);
// // // // //                                   const currentIds = watch(`project_sections.${index}.media_asset_ids`) || [];
// // // // //                                   setValue(`project_sections.${index}.media_asset_ids`, currentIds.filter(x => x !== id));
// // // // //                                 }}
// // // // //                                 onUpload={(asset) => {
// // // // //                                   const newMedia = [...(value || []), asset];
// // // // //                                   onChange(newMedia);
// // // // //                                   const currentIds = watch(`project_sections.${index}.media_asset_ids`) || [];
// // // // //                                   setValue(`project_sections.${index}.media_asset_ids`, [...currentIds, asset.id]);
// // // // //                                 }}
// // // // //                               />
// // // // //                             )}
// // // // //                           />
// // // // //                         </div>
// // // // //                       </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //                 {sectionFields.length === 0 && (
// // // // //                   <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
// // // // //                     <Layers className="w-10 h-10 text-gray-300 mx-auto mb-3" />
// // // // //                     <p className="text-gray-500">No sections added yet. Click the button above to start.</p>
// // // // //                   </div>
// // // // //                 )}
// // // // //                </div>
// // // // //             </div>
// // // // //           )}

// // // // //            {/* --- TAB: STATS --- */}
// // // // //            {activeTab === 'stats' && (
// // // // //              <div className="max-w-5xl mx-auto">
// // // // //                 <div className="flex justify-between items-center mb-6">
// // // // //                    <div>
// // // // //                      <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
// // // // //                      <p className="text-sm text-gray-500">Highlight numbers like "20% Growth" or "50k Users".</p>
// // // // //                    </div>
// // // // //                    <button type="button" onClick={() => addStat({ title: '', value: '' })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Stat</button>
// // // // //                 </div>
                
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
// // // // //                    {statFields.map((field, index) => (
// // // // //                      <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
// // // // //                         <button type="button" onClick={() => removeStat(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// // // // //                         <div className="space-y-3">
// // // // //                            <Input label="Title" name={`project_stats.${index}.title`} register={register} placeholder="e.g. Users" />
// // // // //                            <Input label="Value" name={`project_stats.${index}.value`} register={register} placeholder="e.g. 50k+" />
// // // // //                            <Input label="Trend/Sub" name={`project_stats.${index}.trend`} register={register} placeholder="e.g. +20%" />
// // // // //                            <Input label="Icon Name" name={`project_stats.${index}.icon_name`} register={register} placeholder="e.g. Users" />
// // // // //                         </div>
// // // // //                      </div>
// // // // //                    ))}
// // // // //                 </div>
// // // // //                 {statFields.length === 0 && <div className="text-center py-12 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">No statistics added.</div>}
// // // // //              </div>
// // // // //            )}

// // // // //         </div>
// // // // //       </form>
// // // // //     </DndProvider>
// // // // //   );
// // // // // };

// // // // // export default AdminProjectEditor;

// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // // // import { DndProvider } from 'react-dnd';
// // // // import { HTML5Backend } from 'react-dnd-html5-backend';
// // // // import toast, { Toaster } from 'react-hot-toast';
// // // // import {
// // // //   ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon,
// // // //   X, Layers, Layout, PieChart, FileText, CheckCircle, Upload, Palette, Target, Hammer, Search, Zap
// // // // } from 'lucide-react';
// // // // import { 
// // // //   getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl, createTool, createCategory 
// // // // } from '../../../api/projectsadmin';

// // // // // --- Helper Components ---

// // // // const TabButton = ({ active, onClick, icon: Icon, label }) => (
// // // //   <button
// // // //     type="button"
// // // //     onClick={onClick}
// // // //     className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
// // // //       active 
// // // //         ? 'border-blue-600 text-blue-600 bg-white' 
// // // //         : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
// // // //     }`}
// // // //   >
// // // //     <Icon className="w-4 h-4" /> {label}
// // // //   </button>
// // // // );

// // // // const FormSection = ({ title, children, className = "" }) => (
// // // //   <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
// // // //     {title && <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">{title}</h3>}
// // // //     <div className="space-y-5">{children}</div>
// // // //   </div>
// // // // );

// // // // const Input = ({ label, register, name, error, type = "text", placeholder, className = "", ...rest }) => (
// // // //   <div className="w-full">
// // // //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// // // //     <input
// // // //       type={type}
// // // //       {...register(name)}
// // // //       placeholder={placeholder}
// // // //       {...rest}
// // // //       className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${
// // // //         error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
// // // //       } ${className}`}
// // // //     />
// // // //     {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
// // // //   </div>
// // // // );

// // // // const Textarea = ({ label, register, name, rows = 3, placeholder }) => (
// // // //   <div className="w-full">
// // // //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// // // //     <textarea
// // // //       {...register(name)}
// // // //       rows={rows}
// // // //       placeholder={placeholder}
// // // //       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-y min-h-[80px]"
// // // //     />
// // // //   </div>
// // // // );

// // // // // --- Custom Components ---

// // // // // Better Color Picker with Preview
// // // // const ColorPicker = ({ label, register, name, watch }) => {
// // // //   const color = watch(name);
// // // //   return (
// // // //     <div className="w-full">
// // // //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// // // //       <div className="flex items-center gap-3">
// // // //         <div 
// // // //           className="w-10 h-10 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
// // // //           style={{ backgroundColor: color || '#ffffff' }}
// // // //         />
// // // //         <div className="relative flex-1">
// // // //           <input
// // // //             type="text"
// // // //             {...register(name)}
// // // //             placeholder="#000000"
// // // //             className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none uppercase font-mono"
// // // //           />
// // // //           <input
// // // //             type="color"
// // // //             {...register(name)}
// // // //             className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
// // // //           />
// // // //           <Palette className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // MultiSelect with "Create New" Option
// // // // const MultiSelectWithCreate = ({ label, options, value = [], onChange, onCreate, placeholder = "Select..." }) => {
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [search, setSearch] = useState("");
// // // //   const containerRef = useRef(null);

// // // //   // Close when clicking outside
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (containerRef.current && !containerRef.current.contains(event.target)) {
// // // //         setIsOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   const filteredOptions = options.filter(opt => 
// // // //     opt.name.toLowerCase().includes(search.toLowerCase()) && 
// // // //     !value.includes(opt.id.toString())
// // // //   );

// // // //   const selectedItems = options.filter(opt => value.includes(opt.id.toString()));

// // // //   return (
// // // //     <div className="w-full" ref={containerRef}>
// // // //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      
// // // //       <div className="border border-gray-300 rounded-lg bg-white p-2 min-h-[46px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
// // // //         {selectedItems.map(item => (
// // // //           <span key={item.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
// // // //             {item.name}
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => onChange(value.filter(id => id !== item.id.toString()))}
// // // //               className="ml-1.5 hover:text-blue-900 focus:outline-none"
// // // //             >
// // // //               <X className="w-3 h-3" />
// // // //             </button>
// // // //           </span>
// // // //         ))}
        
// // // //         <input 
// // // //           type="text"
// // // //           className="flex-1 min-w-[120px] outline-none text-sm py-1"
// // // //           placeholder={selectedItems.length === 0 ? placeholder : ""}
// // // //           value={search}
// // // //           onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
// // // //           onFocus={() => setIsOpen(true)}
// // // //         />
// // // //       </div>

// // // //       {isOpen && (
// // // //         <div className="relative">
// // // //           <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
// // // //             {filteredOptions.length > 0 ? (
// // // //               filteredOptions.map(opt => (
// // // //                 <button
// // // //                   key={opt.id}
// // // //                   type="button"
// // // //                   onClick={() => {
// // // //                     onChange([...value, opt.id.toString()]);
// // // //                     setSearch("");
// // // //                     setIsOpen(false);
// // // //                   }}
// // // //                   className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between group"
// // // //                 >
// // // //                   <span>{opt.name}</span>
// // // //                   {opt.icon_name && <span className="text-xs text-gray-400 font-mono group-hover:text-gray-500">{opt.icon_name}</span>}
// // // //                 </button>
// // // //               ))
// // // //             ) : (
// // // //               <div className="p-2">
// // // //                 {search.length > 0 && (
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => { onCreate(search); setSearch(""); setIsOpen(false); }}
// // // //                     className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2"
// // // //                   >
// // // //                     <Plus className="w-4 h-4" /> Create "{search}"
// // // //                   </button>
// // // //                 )}
// // // //                 {search.length === 0 && <p className="text-gray-400 text-sm text-center py-2">Start typing to search...</p>}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Modal for Creating Tools/Categories ---
// // // // const CreateModal = ({ isOpen, onClose, onSave, title, fields }) => {
// // // //   if (!isOpen) return null;
  
// // // //   const handleSave = (e) => {
// // // //     e.preventDefault();
// // // //     const formData = new FormData(e.target);
// // // //     const data = Object.fromEntries(formData.entries());
// // // //     onSave(data);
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
// // // //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
// // // //         <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
// // // //         <form onSubmit={handleSave} className="space-y-4">
// // // //           {fields.map(f => (
// // // //             <div key={f.name}>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
// // // //               <input 
// // // //                 name={f.name} 
// // // //                 type="text" 
// // // //                 required 
// // // //                 placeholder={f.placeholder}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" 
// // // //               />
// // // //               {f.hint && <p className="text-xs text-gray-500 mt-1">{f.hint}</p>}
// // // //             </div>
// // // //           ))}
// // // //           <div className="flex justify-end gap-2 mt-6">
// // // //             <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
// // // //             <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black font-medium">Create</button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Media Uploader Component ---
// // // // const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
// // // //   const [uploading, setUploading] = useState(false);

// // // //   const handleFile = async (e) => {
// // // //     const files = Array.from(e.target.files);
// // // //     if (files.length === 0) return;

// // // //     setUploading(true);
// // // //     try {
// // // //       for (const file of files) {
// // // //         const asset = await uploadMedia(file);
// // // //         onUpload(asset); 
// // // //       }
// // // //       toast.success('Uploaded successfully');
// // // //     } catch (err) {
// // // //       toast.error('Upload failed');
// // // //       console.error(err);
// // // //     } finally {
// // // //       setUploading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="space-y-2">
// // // //       <label className="block text-sm font-medium text-gray-700">{label}</label>
      
// // // //       <div className="flex flex-wrap gap-3">
// // // //         {/* Existing Media Previews */}
// // // //         {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
// // // //           media?.file_path && (
// // // //             <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
// // // //               <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() => onRemove(media.id)}
// // // //                 className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
// // // //               >
// // // //                 <X className="w-3 h-3" />
// // // //               </button>
// // // //             </div>
// // // //           )
// // // //         ))}

// // // //         {/* Upload Button */}
// // // //         {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
// // // //           <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50/50">
// // // //             {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
// // // //             <span className="text-xs text-gray-500 mt-1 font-medium">Upload</span>
// // // //             <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
// // // //           </label>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Main Editor Component ---

// // // // const AdminProjectEditor = () => {
// // // //   const { slug } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const isNew = !slug || slug === 'new';
// // // //   const [activeTab, setActiveTab] = useState('general');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [saving, setSaving] = useState(false);
  
// // // //   // Modals State
// // // //   const [modalType, setModalType] = useState(null); // 'tool' or 'category'
// // // //   const [pendingCreateValue, setPendingCreateValue] = useState("");

// // // //   // Reference Data
// // // //   const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

// // // //   const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
// // // //     defaultValues: {
// // // //       status: 'Completed',
// // // //       completion_percentage: 100,
// // // //       metadata_value: 0,
// // // //       banner_media_ids: [],
// // // //       slider_media_ids: [],
// // // //       project_sections: [],
// // // //       project_stats: [],
// // // //       flip_cards: [],
// // // //       process_steps: [],
// // // //       challenges_solutions: [],
// // // //       accessibility_data: [],
// // // //       category_ids: [],
// // // //       tool_ids: [],
// // // //       primary_color: '#000000',
// // // //       secondary_color: '#ffffff',
// // // //       banner_previews: [],
// // // //       slider_previews: []
// // // //     }
// // // //   });

// // // //   const watchBannerPreviews = watch('banner_previews');
// // // //   const watchSliderPreviews = watch('slider_previews');
// // // //   const watchHero = watch('hero_media');
// // // //   const watchDetailHero = watch('detail_hero_media');

// // // //   // --- Dynamic Field Arrays ---
// // // //   const { fields: sectionFields, append: addSection, remove: removeSection } = useFieldArray({ control, name: "project_sections" });
// // // //   const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
// // // //   const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
// // // //   const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });
// // // //   const { fields: challengeFields, append: addChallenge, remove: removeChallenge } = useFieldArray({ control, name: "challenges_solutions" });

// // // //   useEffect(() => {
// // // //     const init = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const refData = await getReferenceData();
// // // //         setRefs(refData);

// // // //         if (!isNew) {
// // // //           const projectData = await getEditorData(slug);
// // // //           reset(projectData);
// // // //         }
// // // //       } catch (error) {
// // // //         toast.error('Error loading data');
// // // //         console.error(error);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     init();
// // // //   }, [slug, isNew, reset]);

// // // //   // --- Handlers for Creation ---

// // // //   const handleCreateTool = async (data) => {
// // // //     try {
// // // //       const newTool = await createTool(data.name, data.icon_name);
// // // //       setRefs(prev => ({ ...prev, tools: [...prev.tools, newTool].sort((a,b) => a.name.localeCompare(b.name)) }));
      
// // // //       // Automatically select the new tool
// // // //       const currentTools = watch('tool_ids') || [];
// // // //       setValue('tool_ids', [...currentTools, newTool.id.toString()]);
      
// // // //       toast.success(`Tool "${newTool.name}" created!`);
// // // //       setModalType(null);
// // // //     } catch (err) {
// // // //       toast.error('Failed to create tool');
// // // //     }
// // // //   };

// // // //   const handleCreateCategory = async (data) => {
// // // //     try {
// // // //       const newCat = await createCategory(data.name);
// // // //       setRefs(prev => ({ ...prev, categories: [...prev.categories, newCat].sort((a,b) => a.name.localeCompare(b.name)) }));
      
// // // //       // Automatically select the new category
// // // //       const currentCats = watch('category_ids') || [];
// // // //       setValue('category_ids', [...currentCats, newCat.id.toString()]);
      
// // // //       toast.success(`Category "${newCat.name}" created!`);
// // // //       setModalType(null);
// // // //     } catch (err) {
// // // //       toast.error('Failed to create category');
// // // //     }
// // // //   };

// // // //   const onSubmit = async (data) => {
// // // //     setSaving(true);
// // // //     try {
// // // //       const result = await saveProject(data, isNew, slug);
// // // //       toast.success('Project saved successfully!');
// // // //       if (isNew) {
// // // //         navigate(`/admin/projects-config/${result.slug}`);
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error('Failed to save project');
// // // //       console.error(error);
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

// // // //   return (
// // // //     <DndProvider backend={HTML5Backend}>
// // // //       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
// // // //         <Toaster position="top-right" />

// // // //         {/* --- Modals --- */}
// // // //         <CreateModal 
// // // //           isOpen={modalType === 'tool'} 
// // // //           onClose={() => setModalType(null)} 
// // // //           onSave={handleCreateTool}
// // // //           title="Create New Tool"
// // // //           fields={[
// // // //             { name: 'name', label: 'Tool Name', placeholder: 'e.g. React Native' },
// // // //             { name: 'icon_name', label: 'Icon Name (Lucide/Standard)', placeholder: 'e.g. Smartphone', hint: 'Use PascalCase icon names like "Zap", "Code", "Figma"' }
// // // //           ]}
// // // //         />
// // // //         <CreateModal 
// // // //           isOpen={modalType === 'category'} 
// // // //           onClose={() => setModalType(null)} 
// // // //           onSave={handleCreateCategory}
// // // //           title="Create New Category"
// // // //           fields={[
// // // //             { name: 'name', label: 'Category Name', placeholder: 'e.g. Mobile Development' }
// // // //           ]}
// // // //         />

// // // //         {/* Top Bar */}
// // // //         <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
// // // //           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// // // //             <div className="flex items-center gap-4">
// // // //               <Link to="/admin/projects-config" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
// // // //               <div>
// // // //                 <h1 className="text-2xl font-bold text-gray-900 leading-tight">{isNew ? 'New Project' : 'Edit Project'}</h1>
// // // //                 <p className="text-xs text-gray-500 font-mono">{watch('slug') || 'untitled-project'}</p>
// // // //               </div>
// // // //             </div>
// // // //             <button 
// // // //               type="submit" 
// // // //               disabled={saving}
// // // //               className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all transform active:scale-95 font-medium"
// // // //             >
// // // //               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
// // // //               Save Changes
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         <div className="max-w-7xl mx-auto px-6 py-8">
// // // //           {/* Tabs */}
// // // //           <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-1">
// // // //             <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
// // // //             <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media Assets" />
// // // //             <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
// // // //             <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
// // // //             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Statistics" />
// // // //           </div>

// // // //           {/* --- TAB: GENERAL --- */}
// // // //           {activeTab === 'general' && (
// // // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //               <div className="lg:col-span-2 space-y-8">
// // // //                 <FormSection title="Core Information">
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // //                     <Input label="Project Title" name="title" register={register} error={errors.title} placeholder="e.g. E-Commerce Platform" />
// // // //                     <Input label="Slug (Auto-generated)" name="slug" register={register} placeholder="e.g. e-commerce-platform" />
// // // //                   </div>
// // // //                   <Textarea label="Short Description" name="description" register={register} placeholder="Brief overview for search and cards..." />
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // //                     <Input label="Client" name="client" register={register} placeholder="e.g. Acme Corp" />
// // // //                     <Input label="Role" name="role" register={register} placeholder="e.g. Lead Designer" />
// // // //                   </div>
// // // //                 </FormSection>

// // // //                 <FormSection title="Extended Details">
// // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// // // //                     <Input label="Timeline" name="timeline" register={register} placeholder="e.g. 3 Months" />
// // // //                     <Input label="Publisher" name="publisher_name" register={register} placeholder="e.g. Behance" />
// // // //                     <Input label="Metadata Label" name="metadata_label" register={register} placeholder="e.g. Views" />
// // // //                   </div>
// // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// // // //                     <Input label="Meta Value" name="metadata_value" type="number" register={register} />
// // // //                     <ColorPicker label="Primary Color" name="primary_color" register={register} watch={watch} />
// // // //                     <ColorPicker label="Secondary Color" name="secondary_color" register={register} watch={watch} />
// // // //                   </div>
// // // //                   <Input label="Tagline" name="tagline" register={register} placeholder="A catchy phrase for the header..." />
// // // //                 </FormSection>
// // // //               </div>

// // // //               <div className="space-y-8">
// // // //                 <FormSection title="Status & Taxonomy">
// // // //                   <div className="mb-5">
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Status</label>
// // // //                     <div className="relative">
// // // //                       <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500/20 outline-none">
// // // //                         <option value="Completed">Completed</option>
// // // //                         <option value="In Progress">In Progress</option>
// // // //                         <option value="Concept">Concept</option>
// // // //                       </select>
// // // //                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
// // // //                     </div>
// // // //                   </div>
                  
// // // //                   <div className="mb-5">
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Complexity Tier</label>
// // // //                     <select {...register('tier_id')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/20 outline-none">
// // // //                       <option value="">Select Tier...</option>
// // // //                       {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
// // // //                     </select>
// // // //                   </div>
                  
// // // //                   <Input label="Completion %" name="completion_percentage" type="number" register={register} />
// // // //                 </FormSection>

// // // //                 <FormSection title="Relations & Tags">
// // // //                   <div className="space-y-6">
// // // //                     <Controller
// // // //                       control={control}
// // // //                       name="category_ids"
// // // //                       render={({ field: { value, onChange } }) => (
// // // //                         <MultiSelectWithCreate
// // // //                           label="Categories"
// // // //                           options={refs.categories}
// // // //                           value={value}
// // // //                           onChange={onChange}
// // // //                           onCreate={(name) => { setPendingCreateValue(name); setModalType('category'); }}
// // // //                           placeholder="Search categories..."
// // // //                         />
// // // //                       )}
// // // //                     />
                    
// // // //                     <Controller
// // // //                       control={control}
// // // //                       name="tool_ids"
// // // //                       render={({ field: { value, onChange } }) => (
// // // //                         <MultiSelectWithCreate
// // // //                           label="Tools Used"
// // // //                           options={refs.tools}
// // // //                           value={value}
// // // //                           onChange={onChange}
// // // //                           onCreate={(name) => { setPendingCreateValue(name); setModalType('tool'); }}
// // // //                           placeholder="Search tools..."
// // // //                         />
// // // //                       )}
// // // //                     />
// // // //                   </div>
// // // //                 </FormSection>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* --- TAB: MEDIA --- */}
// // // //           {activeTab === 'media' && (
// // // //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //               <FormSection title="Hero Assets">
// // // //                 <MediaUploader 
// // // //                   label="Card Thumbnail (Main Image)"
// // // //                   currentMedia={watchHero}
// // // //                   onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)}
// // // //                   onUpload={(asset) => {
// // // //                     setValue('hero_media_id', asset.id);
// // // //                     setValue('hero_media', asset);
// // // //                   }}
// // // //                 />
// // // //                 <div className="mt-8 border-t pt-6">
// // // //                   <MediaUploader 
// // // //                     label="Detail Page Header (Large Banner)"
// // // //                     currentMedia={watchDetailHero}
// // // //                     onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)}
// // // //                     onUpload={(asset) => {
// // // //                       setValue('detail_hero_media_id', asset.id);
// // // //                       setValue('detail_hero_media', asset);
// // // //                     }}
// // // //                   />
// // // //                 </div>
// // // //                 <div className="mt-8">
// // // //                    <Input label="Video URL (YouTube/Vimeo)" name="video_url" register={register} placeholder="https://..." />
// // // //                 </div>
// // // //               </FormSection>

// // // //               <FormSection title="Galleries">
// // // //                 <div className="mb-8">
// // // //                   <MediaUploader 
// // // //                     label="Grid Gallery Images"
// // // //                     multiple
// // // //                     currentMedia={watchBannerPreviews}
// // // //                     onRemove={(id) => {
// // // //                       const newIds = (watch('banner_media_ids') || []).filter(existingId => existingId !== id);
// // // //                       const newPreviews = (watch('banner_previews') || []).filter(p => p.id !== id);
// // // //                       setValue('banner_media_ids', newIds);
// // // //                       setValue('banner_previews', newPreviews);
// // // //                     }}
// // // //                     onUpload={(asset) => {
// // // //                       const currentIds = watch('banner_media_ids') || [];
// // // //                       const currentPreviews = watch('banner_previews') || [];
// // // //                       setValue('banner_media_ids', [...currentIds, asset.id]);
// // // //                       setValue('banner_previews', [...currentPreviews, asset]);
// // // //                     }}
// // // //                   />
// // // //                   <p className="text-xs text-gray-500 mt-2">Used for the static grid display.</p>
// // // //                 </div>
// // // //                 <div className="border-t pt-6">
// // // //                   <MediaUploader 
// // // //                     label="Carousel Slider Images"
// // // //                     multiple
// // // //                     currentMedia={watchSliderPreviews}
// // // //                     onRemove={(id) => {
// // // //                       const newIds = (watch('slider_media_ids') || []).filter(existingId => existingId !== id);
// // // //                       const newPreviews = (watch('slider_previews') || []).filter(p => p.id !== id);
// // // //                       setValue('slider_media_ids', newIds);
// // // //                       setValue('slider_previews', newPreviews);
// // // //                     }}
// // // //                     onUpload={(asset) => {
// // // //                       const currentIds = watch('slider_media_ids') || [];
// // // //                       const currentPreviews = watch('slider_previews') || [];
// // // //                       setValue('slider_media_ids', [...currentIds, asset.id]);
// // // //                       setValue('slider_previews', [...currentPreviews, asset]);
// // // //                     }}
// // // //                   />
// // // //                    <p className="text-xs text-gray-500 mt-2">Used for the interactive slider component.</p>
// // // //                 </div>
// // // //               </FormSection>
// // // //             </div>
// // // //           )}

// // // //           {/* --- TAB: CONTENT BLOCKS --- */}
// // // //           {activeTab === 'content' && (
// // // //              <div className="space-y-8 max-w-5xl mx-auto">
               
// // // //                {/* Process Steps */}
// // // //                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
// // // //                     <div>
// // // //                       <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900"><Layers className="w-5 h-5 text-purple-600" /> Process Steps</h3>
// // // //                       <p className="text-sm text-gray-500 mt-1">Describe the workflow or phases of the project.</p>
// // // //                     </div>
// // // //                     <button type="button" onClick={() => addProcess({ title: '', description: '', step_number: processFields.length + 1 })} className="text-sm px-3 py-1.5 bg-purple-50 text-purple-700 font-medium rounded-lg hover:bg-purple-100">+ Add Step</button>
// // // //                   </div>
// // // //                   <div className="space-y-4">
// // // //                     {processFields.map((field, index) => (
// // // //                       <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
// // // //                         <span className="font-bold text-gray-300 text-xl mt-1">#{index + 1}</span>
// // // //                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                            <Input label="Step Title" name={`process_steps.${index}.title`} register={register} placeholder="e.g. Discovery" />
// // // //                            <Input label="Description" name={`process_steps.${index}.description`} register={register} placeholder="Description of this phase..." />
// // // //                         </div>
// // // //                         <button type="button" onClick={() => removeProcess(index)} className="text-gray-400 hover:text-red-600 mt-2 p-1"><Trash2 className="w-4 h-4" /></button>
// // // //                       </div>
// // // //                     ))}
// // // //                     {processFields.length === 0 && <div className="text-center py-8 text-gray-400 italic">No process steps added.</div>}
// // // //                   </div>
// // // //                </div>

// // // //                {/* Challenges & Solutions */}
// // // //                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
// // // //                     <div>
// // // //                       <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900"><Target className="w-5 h-5 text-orange-600" /> Challenges & Solutions</h3>
// // // //                       <p className="text-sm text-gray-500 mt-1">Key problems faced and how they were solved.</p>
// // // //                     </div>
// // // //                     <button type="button" onClick={() => addChallenge({ challenge: '', solution: '', icon: 'Zap', challengeColor: 'border-gray-200' })} className="text-sm px-3 py-1.5 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100">+ Add Challenge</button>
// // // //                   </div>
// // // //                   <div className="space-y-4">
// // // //                     {challengeFields.map((field, index) => (
// // // //                       <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
// // // //                         <div className="mt-2"><Hammer className="w-5 h-5 text-gray-400" /></div>
// // // //                         <div className="flex-1 space-y-4">
// // // //                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                                <Input label="Challenge" name={`challenges_solutions.${index}.challenge`} register={register} placeholder="e.g. Legacy Codebase" />
// // // //                                <div className="grid grid-cols-2 gap-4">
// // // //                                    <Input label="Icon Name" name={`challenges_solutions.${index}.icon`} register={register} placeholder="e.g. Zap, Code" />
// // // //                                    <Input label="Border Color" name={`challenges_solutions.${index}.challengeColor`} register={register} placeholder="e.g. border-red-500" />
// // // //                                </div>
// // // //                            </div>
// // // //                            <Textarea label="Solution" name={`challenges_solutions.${index}.solution`} register={register} placeholder="How we solved it..." rows={3} />
// // // //                         </div>
// // // //                         <button type="button" onClick={() => removeChallenge(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
// // // //                       </div>
// // // //                     ))}
// // // //                     {challengeFields.length === 0 && <div className="text-center py-8 text-gray-400 italic">No challenges added.</div>}
// // // //                   </div>
// // // //                </div>

// // // //                {/* Flip Cards (Design Principles) */}
// // // //                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
// // // //                     <div>
// // // //                       <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900"><CheckCircle className="w-5 h-5 text-green-600" /> Design Principles (Flip Cards)</h3>
// // // //                       <p className="text-sm text-gray-500 mt-1">Interactive cards for core values or principles.</p>
// // // //                     </div>
// // // //                     <button type="button" onClick={() => addCard({ front_title: '', back_info: '', icon: 'Zap', bgColor: 'bg-white', iconColor: '#000000' })} className="text-sm px-3 py-1.5 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100">+ Add Card</button>
// // // //                   </div>
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // // //                     {cardFields.map((field, index) => (
// // // //                       <div key={field.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative group">
// // // //                         <button type="button" onClick={() => removeCard(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// // // //                         <div className="space-y-4">
// // // //                            <div className="grid grid-cols-2 gap-4">
// // // //                               <Input label="Front Title" name={`flip_cards.${index}.front_title`} register={register} placeholder="e.g. Simplicity" />
// // // //                               <Input label="Icon Name" name={`flip_cards.${index}.icon`} register={register} placeholder="e.g. Layout" />
// // // //                            </div>
// // // //                            <div className="grid grid-cols-2 gap-4">
// // // //                                <Input label="Background Class" name={`flip_cards.${index}.bgColor`} register={register} placeholder="e.g. bg-blue-50" />
// // // //                                <ColorPicker label="Icon Color" name={`flip_cards.${index}.iconColor`} register={register} watch={watch} />
// // // //                            </div>
// // // //                            <Textarea label="Back Info (Hover Text)" name={`flip_cards.${index}.back_info`} register={register} rows={2} placeholder="Description visible on hover..." />
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                   {cardFields.length === 0 && <div className="text-center py-8 text-gray-400 italic">No cards added.</div>}
// // // //                </div>

// // // //              </div>
// // // //            )}

// // // //           {/* --- TAB: SECTIONS --- */}
// // // //           {activeTab === 'sections' && (
// // // //             <div className="space-y-6 max-w-5xl mx-auto">
// // // //                <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
// // // //                   <div>
// // // //                     <h3 className="text-lg font-bold text-blue-900">Dynamic Page Sections</h3>
// // // //                     <p className="text-sm text-blue-700 mt-1">Add rich text and image sections that stack vertically.</p>
// // // //                   </div>
// // // //                   <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Section</button>
// // // //                </div>
               
// // // //                <div className="space-y-6">
// // // //                 {sectionFields.map((field, index) => (
// // // //                   <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
// // // //                       <div className="flex justify-between items-start mb-4">
// // // //                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Section {index + 1}</span>
// // // //                         <button type="button" onClick={() => removeSection(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
// // // //                       </div>
                      
// // // //                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //                         <div className="space-y-4">
// // // //                           <Input label="Section Heading" name={`project_sections.${index}.heading`} register={register} placeholder="Section title..." />
// // // //                           <Textarea label="Body Content" name={`project_sections.${index}.body_text`} register={register} rows={5} placeholder="Main text content..." />
// // // //                           <div className="grid grid-cols-2 gap-4">
// // // //                             <div>
// // // //                               <label className="block text-sm font-medium text-gray-700 mb-1.5">Layout Style</label>
// // // //                               <select {...register(`project_sections.${index}.layout_type`)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// // // //                                 <option value="image_left">Image Left</option>
// // // //                                 <option value="image_right">Image Right</option>
// // // //                                 <option value="full_width">Full Width</option>
// // // //                                 <option value="split_side_by_side">Split (2 Images)</option>
// // // //                               </select>
// // // //                             </div>
// // // //                             <Input label="Background (Tailwind)" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
// // // //                           <Controller
// // // //                             control={control}
// // // //                             name={`project_sections.${index}.resolved_media`}
// // // //                             render={({ field: { value, onChange } }) => (
// // // //                               <MediaUploader 
// // // //                                 label="Section Images"
// // // //                                 multiple
// // // //                                 currentMedia={value}
// // // //                                 onRemove={(id) => {
// // // //                                   const newMedia = (value || []).filter(m => m.id !== id);
// // // //                                   onChange(newMedia);
// // // //                                   const currentIds = watch(`project_sections.${index}.media_asset_ids`) || [];
// // // //                                   setValue(`project_sections.${index}.media_asset_ids`, currentIds.filter(x => x !== id));
// // // //                                 }}
// // // //                                 onUpload={(asset) => {
// // // //                                   const newMedia = [...(value || []), asset];
// // // //                                   onChange(newMedia);
// // // //                                   const currentIds = watch(`project_sections.${index}.media_asset_ids`) || [];
// // // //                                   setValue(`project_sections.${index}.media_asset_ids`, [...currentIds, asset.id]);
// // // //                                 }}
// // // //                               />
// // // //                             )}
// // // //                           />
// // // //                         </div>
// // // //                       </div>
// // // //                   </div>
// // // //                 ))}
// // // //                 {sectionFields.length === 0 && (
// // // //                   <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
// // // //                     <Layers className="w-10 h-10 text-gray-300 mx-auto mb-3" />
// // // //                     <p className="text-gray-500">No sections added yet. Click the button above to start.</p>
// // // //                   </div>
// // // //                 )}
// // // //                </div>
// // // //             </div>
// // // //           )}

// // // //            {/* --- TAB: STATS --- */}
// // // //            {activeTab === 'stats' && (
// // // //              <div className="max-w-5xl mx-auto">
// // // //                 <div className="flex justify-between items-center mb-6">
// // // //                    <div>
// // // //                      <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
// // // //                      <p className="text-sm text-gray-500">Highlight numbers like "20% Growth" or "50k Users".</p>
// // // //                    </div>
// // // //                    <button type="button" onClick={() => addStat({ title: '', value: '' })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Stat</button>
// // // //                 </div>
                
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
// // // //                    {statFields.map((field, index) => (
// // // //                      <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
// // // //                         <button type="button" onClick={() => removeStat(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// // // //                         <div className="space-y-3">
// // // //                            <Input label="Title" name={`project_stats.${index}.title`} register={register} placeholder="e.g. Users" />
// // // //                            <Input label="Value" name={`project_stats.${index}.value`} register={register} placeholder="e.g. 50k+" />
// // // //                            <Input label="Trend/Sub" name={`project_stats.${index}.trend`} register={register} placeholder="e.g. +20%" />
// // // //                            <Input label="Icon Name" name={`project_stats.${index}.icon_name`} register={register} placeholder="e.g. Users" />
// // // //                         </div>
// // // //                      </div>
// // // //                    ))}
// // // //                 </div>
// // // //                 {statFields.length === 0 && <div className="text-center py-12 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">No statistics added.</div>}
// // // //              </div>
// // // //            )}

// // // //         </div>
// // // //       </form>
// // // //     </DndProvider>
// // // //   );
// // // // };

// // // // export default AdminProjectEditor;

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // // import { DndProvider } from 'react-dnd';
// // // import { HTML5Backend } from 'react-dnd-html5-backend';
// // // import toast, { Toaster } from 'react-hot-toast';
// // // import {
// // //   ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon,
// // //   X, Layers, Layout, PieChart, FileText, CheckCircle, Upload, Palette, Target, Hammer, Search, Zap,
// // //   Quote, MessageSquare, Accessibility
// // // } from 'lucide-react';
// // // import { 
// // //   getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl, createTool, createCategory 
// // // } from '../../../api/projectsadmin';

// // // // --- UI Components ---

// // // const TabButton = ({ active, onClick, icon: Icon, label }) => (
// // //   <button
// // //     type="button"
// // //     onClick={onClick}
// // //     className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
// // //       active 
// // //         ? 'border-gray-900 text-gray-900 bg-white shadow-sm ring-1 ring-gray-200 border-b-transparent' 
// // //         : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
// // //     }`}
// // //   >
// // //     <Icon className="w-4 h-4" /> {label}
// // //   </button>
// // // );

// // // const FormSection = ({ title, children, className = "", icon: Icon }) => (
// // //   <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
// // //     {title && (
// // //       <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
// // //         {Icon && <Icon className="w-5 h-5 text-gray-400" />}
// // //         <h3 className="text-lg font-bold text-gray-900">{title}</h3>
// // //       </div>
// // //     )}
// // //     <div className="space-y-6">{children}</div>
// // //   </div>
// // // );

// // // const Input = ({ label, register, name, error, type = "text", placeholder, className = "", ...rest }) => (
// // //   <div className="w-full">
// // //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// // //     <input
// // //       type={type}
// // //       {...register(name)}
// // //       placeholder={placeholder}
// // //       {...rest}
// // //       className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all ${
// // //         error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
// // //       } ${className}`}
// // //     />
// // //     {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
// // //   </div>
// // // );

// // // const Textarea = ({ label, register, name, rows = 3, placeholder }) => (
// // //   <div className="w-full">
// // //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// // //     <textarea
// // //       {...register(name)}
// // //       rows={rows}
// // //       placeholder={placeholder}
// // //       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none resize-y min-h-[80px]"
// // //     />
// // //   </div>
// // // );

// // // // --- Custom Components ---

// // // const ColorPicker = ({ label, register, name, watch }) => {
// // //   const color = watch(name);
// // //   return (
// // //     <div className="w-full">
// // //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// // //       <div className="flex items-center gap-3">
// // //         <div 
// // //           className="w-10 h-10 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
// // //           style={{ backgroundColor: color || '#ffffff' }}
// // //         />
// // //         <div className="relative flex-1">
// // //           <input
// // //             type="text"
// // //             {...register(name)}
// // //             placeholder="#000000"
// // //             className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 outline-none uppercase font-mono text-sm"
// // //           />
// // //           <input
// // //             type="color"
// // //             {...register(name)}
// // //             className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const MultiSelectWithCreate = ({ label, options, value = [], onChange, onCreate, placeholder = "Select..." }) => {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [search, setSearch] = useState("");
// // //   const containerRef = useRef(null);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const filteredOptions = options.filter(opt => 
// // //     opt.name.toLowerCase().includes(search.toLowerCase()) && 
// // //     !value.includes(opt.id.toString())
// // //   );
// // //   const selectedItems = options.filter(opt => value.includes(opt.id.toString()));

// // //   return (
// // //     <div className="w-full" ref={containerRef}>
// // //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// // //       <div className="border border-gray-300 rounded-lg bg-white p-2 min-h-[46px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-gray-900 transition-all">
// // //         {selectedItems.map(item => (
// // //           <span key={item.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
// // //             {item.name}
// // //             <button type="button" onClick={() => onChange(value.filter(id => id !== item.id.toString()))} className="ml-1.5 hover:text-red-500 focus:outline-none"><X className="w-3 h-3" /></button>
// // //           </span>
// // //         ))}
// // //         <input 
// // //           type="text"
// // //           className="flex-1 min-w-[120px] outline-none text-sm py-1 bg-transparent"
// // //           placeholder={selectedItems.length === 0 ? placeholder : ""}
// // //           value={search}
// // //           onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
// // //           onFocus={() => setIsOpen(true)}
// // //         />
// // //       </div>
// // //       {isOpen && (
// // //         <div className="relative">
// // //           <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
// // //             {filteredOptions.length > 0 ? (
// // //               filteredOptions.map(opt => (
// // //                 <button
// // //                   key={opt.id}
// // //                   type="button"
// // //                   onClick={() => { onChange([...value, opt.id.toString()]); setSearch(""); setIsOpen(false); }}
// // //                   className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between group"
// // //                 >
// // //                   <span>{opt.name}</span>
// // //                   {opt.icon_name && <span className="text-xs text-gray-400 font-mono group-hover:text-gray-500">{opt.icon_name}</span>}
// // //                 </button>
// // //               ))
// // //             ) : (
// // //               <div className="p-2">
// // //                 {search.length > 0 && (
// // //                   <button type="button" onClick={() => { onCreate(search); setSearch(""); setIsOpen(false); }} className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
// // //                     <Plus className="w-4 h-4" /> Create "{search}"
// // //                   </button>
// // //                 )}
// // //                 {search.length === 0 && <p className="text-gray-400 text-sm text-center py-2">Start typing to search...</p>}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const CreateModal = ({ isOpen, onClose, onSave, title, fields }) => {
// // //   if (!isOpen) return null;
// // //   const handleSave = (e) => {
// // //     e.preventDefault();
// // //     const formData = new FormData(e.target);
// // //     onSave(Object.fromEntries(formData.entries()));
// // //   };
// // //   return (
// // //     <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
// // //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
// // //         <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
// // //         <form onSubmit={handleSave} className="space-y-4">
// // //           {fields.map(f => (
// // //             <div key={f.name}>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
// // //               <input name={f.name} type="text" required placeholder={f.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none" />
// // //               {f.hint && <p className="text-xs text-gray-500 mt-1">{f.hint}</p>}
// // //             </div>
// // //           ))}
// // //           <div className="flex justify-end gap-2 mt-6">
// // //             <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
// // //             <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black font-medium">Create</button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
// // //   const [uploading, setUploading] = useState(false);

// // //   const handleFile = async (e) => {
// // //     const files = Array.from(e.target.files);
// // //     if (files.length === 0) return;
// // //     setUploading(true);
// // //     try {
// // //       for (const file of files) {
// // //         const asset = await uploadMedia(file);
// // //         onUpload(asset); 
// // //       }
// // //       toast.success('Uploaded successfully');
// // //     } catch (err) {
// // //       toast.error('Upload failed');
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="space-y-3">
// // //       <label className="block text-sm font-medium text-gray-700">{label}</label>
// // //       <div className="flex flex-wrap gap-4">
// // //         {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
// // //           media?.file_path && (
// // //             <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all">
// // //               <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
// // //               <button type="button" onClick={() => onRemove(media.id)} className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
// // //                 <X className="w-3 h-3" />
// // //               </button>
// // //             </div>
// // //           )
// // //         ))}
// // //         {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
// // //           <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50/50">
// // //             {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
// // //             <span className="text-xs text-gray-500 mt-2 font-medium">Upload</span>
// // //             <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
// // //           </label>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // --- Main Editor Component ---

// // // const AdminProjectEditor = () => {
// // //   const { slug } = useParams();
// // //   const navigate = useNavigate();
// // //   const isNew = !slug || slug === 'new';
// // //   const [activeTab, setActiveTab] = useState('general');
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);
  
// // //   const [modalType, setModalType] = useState(null); 
// // //   const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

// // //   const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
// // //     defaultValues: {
// // //       status: 'Completed',
// // //       completion_percentage: 100,
// // //       metadata_value: 0,
// // //       banner_media_ids: [],
// // //       slider_media_ids: [],
// // //       project_sections: [],
// // //       project_stats: [],
// // //       flip_cards: [],
// // //       process_steps: [],
// // //       challenges_solutions: [],
// // //       accessibility_data: [],
// // //       category_ids: [],
// // //       tool_ids: [],
// // //       primary_color: '#000000',
// // //       secondary_color: '#ffffff',
// // //       banner_previews: [],
// // //       slider_previews: [],
// // //       visual_gallery_previews: [],
// // //       project_gallery: [], // Note: API handles converting this to `project_gallery` table inserts
// // //       quote_data: { quote: '', author: '', role: '' },
// // //       call_to_action_data: { button_text: 'View Live', link: '' }
// // //     }
// // //   });

// // //   const watchBannerPreviews = watch('banner_previews');
// // //   const watchSliderPreviews = watch('slider_previews');
// // //   const watchGalleryPreviews = watch('visual_gallery_previews');
// // //   const watchHero = watch('hero_media');
// // //   const watchDetailHero = watch('detail_hero_media');

// // //   // --- Dynamic Field Arrays ---
// // //   const { fields: sectionFields, append: addSection, remove: removeSection, move: moveSection } = useFieldArray({ control, name: "project_sections" });
// // //   const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
// // //   const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
// // //   const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });
// // //   const { fields: challengeFields, append: addChallenge, remove: removeChallenge } = useFieldArray({ control, name: "challenges_solutions" });
// // //   const { fields: accessFields, append: addAccess, remove: removeAccess } = useFieldArray({ control, name: "accessibility_data" });

// // //   useEffect(() => {
// // //     const init = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const refData = await getReferenceData();
// // //         setRefs(refData);
// // //         if (!isNew) {
// // //           const projectData = await getEditorData(slug);
// // //           // Map gallery relation to previews if needed
// // //           const galleryPreviews = projectData.project_gallery?.map(g => g.media_assets) || [];
          
// // //           reset({
// // //             ...projectData,
// // //             visual_gallery_previews: galleryPreviews,
// // //             // Ensure Quote/CTA objects exist
// // //             quote_data: projectData.quote_data || { quote: '', author: '', role: '' },
// // //             call_to_action_data: projectData.call_to_action_data || { button_text: '', link: '' }
// // //           });
// // //         }
// // //       } catch (error) {
// // //         toast.error('Error loading data');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     init();
// // //   }, [slug, isNew, reset]);

// // //   // --- Creation Handlers ---
// // //   const handleCreateTool = async (data) => {
// // //     try {
// // //       const newTool = await createTool(data.name, data.icon_name);
// // //       setRefs(prev => ({ ...prev, tools: [...prev.tools, newTool].sort((a,b) => a.name.localeCompare(b.name)) }));
// // //       const currentTools = watch('tool_ids') || [];
// // //       setValue('tool_ids', [...currentTools, newTool.id.toString()]);
// // //       toast.success(`Tool created!`);
// // //       setModalType(null);
// // //     } catch (err) { toast.error('Failed to create tool'); }
// // //   };

// // //   const handleCreateCategory = async (data) => {
// // //     try {
// // //       const newCat = await createCategory(data.name);
// // //       setRefs(prev => ({ ...prev, categories: [...prev.categories, newCat].sort((a,b) => a.name.localeCompare(b.name)) }));
// // //       const currentCats = watch('category_ids') || [];
// // //       setValue('category_ids', [...currentCats, newCat.id.toString()]);
// // //       toast.success(`Category created!`);
// // //       setModalType(null);
// // //     } catch (err) { toast.error('Failed to create category'); }
// // //   };

// // //   const onSubmit = async (data) => {
// // //     setSaving(true);
// // //     try {
// // //       // Map visual_gallery_previews back to structure needed for saving
// // //       const galleryPayload = (data.visual_gallery_previews || []).map(media => ({ media: media }));
      
// // //       const payload = {
// // //         ...data,
// // //         project_gallery: galleryPayload 
// // //       };

// // //       const result = await saveProject(payload, isNew, slug);
// // //       toast.success('Project saved successfully!');
// // //       if (isNew) navigate(`/admin/projects-config/${result.slug}`);
// // //     } catch (error) {
// // //       toast.error('Failed to save project');
// // //       console.error(error);
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

// // //   return (
// // //     <DndProvider backend={HTML5Backend}>
// // //       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
// // //         <Toaster position="top-right" />
// // //         <CreateModal isOpen={modalType === 'tool'} onClose={() => setModalType(null)} onSave={handleCreateTool} title="Create New Tool" fields={[{ name: 'name', label: 'Tool Name', placeholder: 'e.g. React Native' }, { name: 'icon_name', label: 'Icon Name', placeholder: 'e.g. Zap' }]} />
// // //         <CreateModal isOpen={modalType === 'category'} onClose={() => setModalType(null)} onSave={handleCreateCategory} title="Create New Category" fields={[{ name: 'name', label: 'Category Name', placeholder: 'e.g. Mobile' }]} />

// // //         {/* Header */}
// // //         <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
// // //           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// // //             <div className="flex items-center gap-4">
// // //               <Link to="/admin/projects-config" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
// // //               <div>
// // //                 <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Project' : 'Edit Project'}</h1>
// // //                 <p className="text-xs text-gray-500 font-mono">{watch('slug') || 'untitled'}</p>
// // //               </div>
// // //             </div>
// // //             <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all transform active:scale-95 font-medium">
// // //               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="max-w-7xl mx-auto px-6 py-8">
// // //           {/* Tabs */}
// // //           <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2 scrollbar-hide">
// // //             <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
// // //             <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media" />
// // //             <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
// // //             <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
// // //             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Statistics" />
// // //           </div>

// // //           {/* --- TAB: GENERAL --- */}
// // //           {activeTab === 'general' && (
// // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //               <div className="lg:col-span-2 space-y-8">
// // //                 <FormSection title="Core Information">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // //                     <Input label="Project Title" name="title" register={register} error={errors.title} placeholder="e.g. E-Commerce Platform" />
// // //                     <Input label="Slug" name="slug" register={register} placeholder="Auto-generated" />
// // //                   </div>
// // //                   <Textarea label="Short Description" name="description" register={register} placeholder="Brief overview..." />
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // //                     <Input label="Client" name="client" register={register} placeholder="e.g. Acme Corp" />
// // //                     <Input label="Role" name="role" register={register} placeholder="e.g. Lead Designer" />
// // //                   </div>
// // //                 </FormSection>

// // //                 <FormSection title="Extended Details">
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// // //                     <Input label="Timeline" name="timeline" register={register} placeholder="e.g. 3 Months" />
// // //                     <Input label="Publisher" name="publisher_name" register={register} placeholder="e.g. Behance" />
// // //                     <Input label="Meta Label" name="metadata_label" register={register} placeholder="e.g. Views" />
// // //                   </div>
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// // //                     <Input label="Meta Value" name="metadata_value" type="number" register={register} />
// // //                     <ColorPicker label="Primary Color" name="primary_color" register={register} watch={watch} />
// // //                     <ColorPicker label="Secondary Color" name="secondary_color" register={register} watch={watch} />
// // //                   </div>
// // //                   <Input label="Tagline" name="tagline" register={register} placeholder="A catchy phrase for the header..." />
// // //                 </FormSection>
// // //               </div>

// // //               <div className="space-y-8">
// // //                 <FormSection title="Classification">
// // //                   <div className="mb-5">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Status</label>
// // //                     <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// // //                       <option value="Completed">Completed</option>
// // //                       <option value="In Progress">In Progress</option>
// // //                       <option value="Concept">Concept</option>
// // //                     </select>
// // //                   </div>
// // //                   <div className="mb-5">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Tier</label>
// // //                     <select {...register('tier_id')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// // //                       <option value="">Select Tier...</option>
// // //                       {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
// // //                     </select>
// // //                   </div>
// // //                   <Input label="Completion %" name="completion_percentage" type="number" register={register} />
// // //                 </FormSection>
// // //                 <FormSection title="Relations">
// // //                   <div className="space-y-6">
// // //                     <Controller control={control} name="category_ids" render={({ field: { value, onChange } }) => (
// // //                       <MultiSelectWithCreate label="Categories" options={refs.categories} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('category'); }} />
// // //                     )} />
// // //                     <Controller control={control} name="tool_ids" render={({ field: { value, onChange } }) => (
// // //                       <MultiSelectWithCreate label="Tools Used" options={refs.tools} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('tool'); }} />
// // //                     )} />
// // //                   </div>
// // //                 </FormSection>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* --- TAB: MEDIA --- */}
// // //           {activeTab === 'media' && (
// // //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //               <FormSection title="Hero Assets" icon={ImageIcon}>
// // //                 <MediaUploader label="Card Thumbnail (Main Image)" currentMedia={watchHero} onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)} onUpload={(asset) => { setValue('hero_media_id', asset.id); setValue('hero_media', asset); }} />
// // //                 <div className="border-t pt-6">
// // //                   <MediaUploader label="Detail Page Header (Large)" currentMedia={watchDetailHero} onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)} onUpload={(asset) => { setValue('detail_hero_media_id', asset.id); setValue('detail_hero_media', asset); }} />
// // //                 </div>
// // //                 <Input label="Video URL" name="video_url" register={register} placeholder="https://youtube..." />
// // //               </FormSection>

// // //               <FormSection title="Galleries" icon={Layout}>
// // //                 <MediaUploader 
// // //                   label="Grid Images (Banner IDs)" multiple currentMedia={watchBannerPreviews} 
// // //                   onRemove={(id) => {
// // //                     setValue('banner_media_ids', (watch('banner_media_ids') || []).filter(x => x !== id));
// // //                     setValue('banner_previews', (watch('banner_previews') || []).filter(x => x.id !== id));
// // //                   }} 
// // //                   onUpload={(asset) => {
// // //                     setValue('banner_media_ids', [...(watch('banner_media_ids') || []), asset.id]);
// // //                     setValue('banner_previews', [...(watch('banner_previews') || []), asset]);
// // //                   }} 
// // //                 />
// // //                 <div className="border-t pt-6">
// // //                   <MediaUploader 
// // //                     label="Carousel Slider (Slider IDs)" multiple currentMedia={watchSliderPreviews} 
// // //                     onRemove={(id) => {
// // //                       setValue('slider_media_ids', (watch('slider_media_ids') || []).filter(x => x !== id));
// // //                       setValue('slider_previews', (watch('slider_previews') || []).filter(x => x.id !== id));
// // //                     }} 
// // //                     onUpload={(asset) => {
// // //                       setValue('slider_media_ids', [...(watch('slider_media_ids') || []), asset.id]);
// // //                       setValue('slider_previews', [...(watch('slider_previews') || []), asset]);
// // //                     }} 
// // //                   />
// // //                 </div>
// // //                 <div className="border-t pt-6">
// // //                    <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Gallery (Project Gallery Relation)</h4>
// // //                    <MediaUploader 
// // //                      label="" multiple currentMedia={watchGalleryPreviews}
// // //                      onRemove={(id) => {
// // //                        setValue('visual_gallery_previews', (watch('visual_gallery_previews') || []).filter(x => x.id !== id));
// // //                      }}
// // //                      onUpload={(asset) => {
// // //                        setValue('visual_gallery_previews', [...(watch('visual_gallery_previews') || []), asset]);
// // //                      }}
// // //                    />
// // //                 </div>
// // //               </FormSection>
// // //             </div>
// // //           )}

// // //           {/* --- TAB: CONTENT BLOCKS --- */}
// // //           {activeTab === 'content' && (
// // //              <div className="space-y-8 max-w-5xl mx-auto">
               
// // //                {/* 1. Process Steps */}
// // //                <FormSection title="Process Steps" icon={Layers}>
// // //                  {processFields.map((field, index) => (
// // //                    <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
// // //                      <span className="font-bold text-gray-300 text-xl mt-1">#{index + 1}</span>
// // //                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                         <Input label="Title" name={`process_steps.${index}.title`} register={register} placeholder="e.g. Discovery" />
// // //                         <Input label="Description" name={`process_steps.${index}.description`} register={register} placeholder="Description..." />
// // //                      </div>
// // //                      <button type="button" onClick={() => removeProcess(index)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
// // //                    </div>
// // //                  ))}
// // //                  <button type="button" onClick={() => addProcess({ title: '', description: '', step_number: processFields.length + 1 })} className="text-sm text-blue-600 font-medium">+ Add Step</button>
// // //                </FormSection>

// // //                {/* 2. Challenges & Solutions */}
// // //                <FormSection title="Challenges & Solutions" icon={Target}>
// // //                  {challengeFields.map((field, index) => (
// // //                    <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
// // //                      <div className="mt-2"><Hammer className="w-5 h-5 text-gray-400" /></div>
// // //                      <div className="flex-1 space-y-4">
// // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                             <Input label="Challenge" name={`challenges_solutions.${index}.challenge`} register={register} placeholder="Problem..." />
// // //                             <div className="grid grid-cols-2 gap-4">
// // //                                 <Input label="Icon" name={`challenges_solutions.${index}.icon`} register={register} placeholder="e.g. Zap" />
// // //                                 <Input label="Border Class" name={`challenges_solutions.${index}.challengeColor`} register={register} placeholder="e.g. border-red-500" />
// // //                             </div>
// // //                         </div>
// // //                         <Textarea label="Solution" name={`challenges_solutions.${index}.solution`} register={register} placeholder="How we solved it..." rows={3} />
// // //                      </div>
// // //                      <button type="button" onClick={() => removeChallenge(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
// // //                    </div>
// // //                  ))}
// // //                  <button type="button" onClick={() => addChallenge({ challenge: '', solution: '', icon: 'Zap', challengeColor: 'border-gray-200' })} className="text-sm text-blue-600 font-medium">+ Add Challenge</button>
// // //                </FormSection>

// // //                {/* 3. Flip Cards */}
// // //                <FormSection title="Design Principles (Flip Cards)" icon={CheckCircle}>
// // //                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // //                    {cardFields.map((field, index) => (
// // //                      <div key={field.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative group">
// // //                        <button type="button" onClick={() => removeCard(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// // //                        <div className="space-y-4">
// // //                           <div className="grid grid-cols-2 gap-4">
// // //                              <Input label="Front Title" name={`flip_cards.${index}.front_title`} register={register} />
// // //                              <Input label="Icon Name" name={`flip_cards.${index}.icon`} register={register} />
// // //                           </div>
// // //                           <div className="grid grid-cols-2 gap-4">
// // //                               <Input label="Bg Class" name={`flip_cards.${index}.bgColor`} register={register} placeholder="bg-white" />
// // //                               <ColorPicker label="Icon Color" name={`flip_cards.${index}.iconColor`} register={register} watch={watch} />
// // //                           </div>
// // //                           <Textarea label="Back Info" name={`flip_cards.${index}.back_info`} register={register} rows={2} />
// // //                        </div>
// // //                      </div>
// // //                    ))}
// // //                  </div>
// // //                  <button type="button" onClick={() => addCard({ front_title: '', back_info: '', icon: 'Zap', bgColor: 'bg-white', iconColor: '#000000' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Card</button>
// // //                </FormSection>

// // //                {/* 4. Accessibility Data */}
// // //                <FormSection title="Accessibility Insights" icon={Accessibility}>
// // //                  <div className="space-y-3">
// // //                    {accessFields.map((field, index) => (
// // //                      <div key={field.id} className="flex gap-3">
// // //                        <div className="flex-1">
// // //                           <Input name={`accessibility_data.${index}.text`} register={register} placeholder="e.g. High contrast ratios used..." />
// // //                        </div>
// // //                        <button type="button" onClick={() => removeAccess(index)} className="text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
// // //                      </div>
// // //                    ))}
// // //                  </div>
// // //                  <button type="button" onClick={() => addAccess({ text: '' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Insight</button>
// // //                </FormSection>

// // //                {/* 5. Quote & CTA */}
// // //                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //                  <FormSection title="Testimonial Quote" icon={Quote}>
// // //                     <Textarea label="Quote" name="quote_data.quote" register={register} placeholder="The best team ever..." />
// // //                     <Input label="Author" name="quote_data.author" register={register} />
// // //                     <Input label="Role" name="quote_data.role" register={register} />
// // //                  </FormSection>

// // //                  <FormSection title="Call To Action" icon={MessageSquare}>
// // //                     <Input label="Button Text" name="call_to_action_data.button_text" register={register} placeholder="View Live" />
// // //                     <Input label="Link URL" name="call_to_action_data.link" register={register} />
// // //                  </FormSection>
// // //                </div>
// // //              </div>
// // //            )}

// // //           {/* --- TAB: SECTIONS --- */}
// // //           {activeTab === 'sections' && (
// // //             <div className="space-y-6 max-w-5xl mx-auto">
// // //                <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
// // //                   <div>
// // //                     <h3 className="text-lg font-bold text-blue-900">Dynamic Page Sections</h3>
// // //                     <p className="text-sm text-blue-700 mt-1">Rich text and image sections stacking vertically.</p>
// // //                   </div>
// // //                   <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Section</button>
// // //                </div>
               
// // //                <div className="space-y-6">
// // //                 {sectionFields.map((field, index) => (
// // //                   <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
// // //                       <div className="flex justify-between items-start mb-4">
// // //                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Section {index + 1}</span>
// // //                         <button type="button" onClick={() => removeSection(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
// // //                       </div>
                      
// // //                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //                         <div className="space-y-4">
// // //                           <Input label="Heading" name={`project_sections.${index}.heading`} register={register} placeholder="Section title..." />
// // //                           <Textarea label="Body" name={`project_sections.${index}.body_text`} register={register} rows={5} placeholder="Content..." />
// // //                           <div className="grid grid-cols-2 gap-4">
// // //                             <div>
// // //                               <label className="block text-sm font-medium text-gray-700 mb-1.5">Layout</label>
// // //                               <select {...register(`project_sections.${index}.layout_type`)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// // //                                 <option value="image_left">Image Left</option>
// // //                                 <option value="image_right">Image Right</option>
// // //                                 <option value="full_width">Full Width</option>
// // //                                 <option value="split_side_by_side">Split</option>
// // //                               </select>
// // //                             </div>
// // //                             <Input label="Bg Color" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
// // //                           </div>
// // //                         </div>
// // //                         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
// // //                           <Controller
// // //                             control={control}
// // //                             name={`project_sections.${index}.resolved_media`}
// // //                             render={({ field: { value, onChange } }) => (
// // //                               <MediaUploader label="Images" multiple currentMedia={value} onRemove={(id) => {
// // //                                   const newMedia = (value || []).filter(m => m.id !== id);
// // //                                   onChange(newMedia);
// // //                                   setValue(`project_sections.${index}.media_asset_ids`, (watch(`project_sections.${index}.media_asset_ids`) || []).filter(x => x !== id));
// // //                                 }}
// // //                                 onUpload={(asset) => {
// // //                                   onChange([...(value || []), asset]);
// // //                                   setValue(`project_sections.${index}.media_asset_ids`, [...(watch(`project_sections.${index}.media_asset_ids`) || []), asset.id]);
// // //                                 }}
// // //                               />
// // //                             )}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                   </div>
// // //                 ))}
// // //                </div>
// // //             </div>
// // //           )}

// // //            {/* --- TAB: STATS --- */}
// // //            {activeTab === 'stats' && (
// // //              <div className="max-w-5xl mx-auto">
// // //                 <div className="flex justify-between items-center mb-6">
// // //                    <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
// // //                    <button type="button" onClick={() => addStat({ title: '', value: '' })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Stat</button>
// // //                 </div>
                
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
// // //                    {statFields.map((field, index) => (
// // //                      <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
// // //                         <button type="button" onClick={() => removeStat(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// // //                         <div className="space-y-3">
// // //                            <Input label="Title" name={`project_stats.${index}.title`} register={register} />
// // //                            <Input label="Value" name={`project_stats.${index}.value`} register={register} />
// // //                            <Input label="Trend" name={`project_stats.${index}.trend`} register={register} />
// // //                            <Input label="Icon" name={`project_stats.${index}.icon_name`} register={register} />
// // //                         </div>
// // //                      </div>
// // //                    ))}
// // //                 </div>
// // //              </div>
// // //            )}

// // //         </div>
// // //       </form>
// // //     </DndProvider>
// // //   );
// // // };

// // // export default AdminProjectEditor;
// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link, useParams, useNavigate } from 'react-router-dom';
// // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // import { DndProvider } from 'react-dnd';
// // import { HTML5Backend } from 'react-dnd-html5-backend';
// // import toast, { Toaster } from 'react-hot-toast';
// // import {
// //   ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon,
// //   X, Layers, Layout, PieChart, FileText, CheckCircle, Upload, Palette, Target, Hammer, Search, Zap,
// //   Quote, MessageSquare, Accessibility
// // } from 'lucide-react';
// // import { 
// //   getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl, createTool, createCategory 
// // } from '../../../api/projectsadmin';

// // // --- UI Components ---

// // const TabButton = ({ active, onClick, icon: Icon, label }) => (
// //   <button
// //     type="button"
// //     onClick={onClick}
// //     className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
// //       active 
// //         ? 'border-gray-900 text-gray-900 bg-white shadow-sm ring-1 ring-gray-200 border-b-transparent' 
// //         : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
// //     }`}
// //   >
// //     <Icon className="w-4 h-4" /> {label}
// //   </button>
// // );

// // const FormSection = ({ title, children, className = "", icon: Icon }) => (
// //   <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
// //     {title && (
// //       <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
// //         {Icon && <Icon className="w-5 h-5 text-gray-400" />}
// //         <h3 className="text-lg font-bold text-gray-900">{title}</h3>
// //       </div>
// //     )}
// //     <div className="space-y-6">{children}</div>
// //   </div>
// // );

// // const Input = ({ label, register, name, error, type = "text", placeholder, className = "", ...rest }) => (
// //   <div className="w-full">
// //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// //     <input
// //       type={type}
// //       {...register(name)}
// //       placeholder={placeholder}
// //       {...rest}
// //       className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all ${
// //         error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
// //       } ${className}`}
// //     />
// //     {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
// //   </div>
// // );

// // const Textarea = ({ label, register, name, rows = 3, placeholder }) => (
// //   <div className="w-full">
// //     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
// //     <textarea
// //       {...register(name)}
// //       rows={rows}
// //       placeholder={placeholder}
// //       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none resize-y min-h-[80px]"
// //     />
// //   </div>
// // );

// // // --- Custom Components ---

// // const ColorPicker = ({ label, register, name, watch }) => {
// //   const color = watch(name);
// //   return (
// //     <div className="w-full">
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// //       <div className="flex items-center gap-3">
// //         <div 
// //           className="w-10 h-10 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
// //           style={{ backgroundColor: color || '#ffffff' }}
// //         />
// //         <div className="relative flex-1">
// //           <input
// //             type="text"
// //             {...register(name)}
// //             placeholder="#000000"
// //             className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 outline-none uppercase font-mono text-sm"
// //           />
// //           <input
// //             type="color"
// //             {...register(name)}
// //             className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const MultiSelectWithCreate = ({ label, options, value = [], onChange, onCreate, placeholder = "Select..." }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const containerRef = useRef(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const filteredOptions = options.filter(opt => 
// //     opt.name.toLowerCase().includes(search.toLowerCase()) && 
// //     !value.includes(opt.id.toString())
// //   );
// //   const selectedItems = options.filter(opt => value.includes(opt.id.toString()));

// //   return (
// //     <div className="w-full" ref={containerRef}>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
// //       <div className="border border-gray-300 rounded-lg bg-white p-2 min-h-[46px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-gray-900 transition-all">
// //         {selectedItems.map(item => (
// //           <span key={item.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
// //             {item.name}
// //             <button type="button" onClick={() => onChange(value.filter(id => id !== item.id.toString()))} className="ml-1.5 hover:text-red-500 focus:outline-none"><X className="w-3 h-3" /></button>
// //           </span>
// //         ))}
// //         <input 
// //           type="text"
// //           className="flex-1 min-w-[120px] outline-none text-sm py-1 bg-transparent"
// //           placeholder={selectedItems.length === 0 ? placeholder : ""}
// //           value={search}
// //           onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
// //           onFocus={() => setIsOpen(true)}
// //         />
// //       </div>
// //       {isOpen && (
// //         <div className="relative">
// //           <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
// //             {filteredOptions.length > 0 ? (
// //               filteredOptions.map(opt => (
// //                 <button
// //                   key={opt.id}
// //                   type="button"
// //                   onClick={() => { onChange([...value, opt.id.toString()]); setSearch(""); setIsOpen(false); }}
// //                   className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between group"
// //                 >
// //                   <span>{opt.name}</span>
// //                   {opt.icon_name && <span className="text-xs text-gray-400 font-mono group-hover:text-gray-500">{opt.icon_name}</span>}
// //                 </button>
// //               ))
// //             ) : (
// //               <div className="p-2">
// //                 {search.length > 0 && (
// //                   <button type="button" onClick={() => { onCreate(search); setSearch(""); setIsOpen(false); }} className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
// //                     <Plus className="w-4 h-4" /> Create "{search}"
// //                   </button>
// //                 )}
// //                 {search.length === 0 && <p className="text-gray-400 text-sm text-center py-2">Start typing to search...</p>}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const CreateModal = ({ isOpen, onClose, onSave, title, fields }) => {
// //   if (!isOpen) return null;
// //   const handleSave = (e) => {
// //     e.preventDefault();
// //     const formData = new FormData(e.target);
// //     onSave(Object.fromEntries(formData.entries()));
// //   };
// //   return (
// //     <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
// //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
// //         <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
// //         <form onSubmit={handleSave} className="space-y-4">
// //           {fields.map(f => (
// //             <div key={f.name}>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
// //               <input name={f.name} type="text" required placeholder={f.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none" />
// //               {f.hint && <p className="text-xs text-gray-500 mt-1">{f.hint}</p>}
// //             </div>
// //           ))}
// //           <div className="flex justify-end gap-2 mt-6">
// //             <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
// //             <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black font-medium">Create</button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
// //   const [uploading, setUploading] = useState(false);

// //   const handleFile = async (e) => {
// //     const files = Array.from(e.target.files);
// //     if (files.length === 0) return;
// //     setUploading(true);
// //     try {
// //       for (const file of files) {
// //         const asset = await uploadMedia(file);
// //         onUpload(asset); 
// //       }
// //       toast.success('Uploaded successfully');
// //     } catch (err) {
// //       toast.error('Upload failed');
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-3">
// //       <label className="block text-sm font-medium text-gray-700">{label}</label>
// //       <div className="flex flex-wrap gap-4">
// //         {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
// //           media?.file_path && (
// //             <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all">
// //               <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
// //               <button type="button" onClick={() => onRemove(media.id)} className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
// //                 <X className="w-3 h-3" />
// //               </button>
// //             </div>
// //           )
// //         ))}
// //         {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
// //           <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50/50">
// //             {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
// //             <span className="text-xs text-gray-500 mt-2 font-medium">Upload</span>
// //             <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
// //           </label>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Main Editor Component ---

// // const AdminProjectEditor = () => {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();
// //   const isNew = !slug || slug === 'new';
// //   const [activeTab, setActiveTab] = useState('general');
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
  
// //   const [modalType, setModalType] = useState(null); 
// //   const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

// //   const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
// //     defaultValues: {
// //       status: 'Completed',
// //       completion_percentage: 100,
// //       metadata_value: 0,
// //       banner_media_ids: [],
// //       slider_media_ids: [],
// //       project_sections: [],
// //       project_stats: [],
// //       flip_cards: [],
// //       process_steps: [],
// //       challenges_solutions: [],
// //       accessibility_data: [],
// //       category_ids: [],
// //       tool_ids: [],
// //       primary_color: '#000000',
// //       secondary_color: '#ffffff',
// //       banner_previews: [],
// //       slider_previews: [],
// //       visual_gallery_previews: [],
// //       project_gallery: [], // Note: API handles converting this to `project_gallery` table inserts
// //       quote_data: { quote: '', author: '', role: '' },
// //       call_to_action_data: { button_text: 'View Live', link: '' }
// //     }
// //   });

// //   const watchBannerPreviews = watch('banner_previews');
// //   const watchSliderPreviews = watch('slider_previews');
// //   const watchGalleryPreviews = watch('visual_gallery_previews');
// //   const watchHero = watch('hero_media');
// //   const watchDetailHero = watch('detail_hero_media');

// //   // --- Dynamic Field Arrays ---
// //   const { fields: sectionFields, append: addSection, remove: removeSection, move: moveSection } = useFieldArray({ control, name: "project_sections" });
// //   const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
// //   const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
// //   const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });
// //   const { fields: challengeFields, append: addChallenge, remove: removeChallenge } = useFieldArray({ control, name: "challenges_solutions" });
// //   const { fields: accessFields, append: addAccess, remove: removeAccess } = useFieldArray({ control, name: "accessibility_data" });

// //   useEffect(() => {
// //     const init = async () => {
// //       setLoading(true);
// //       try {
// //         const refData = await getReferenceData();
// //         setRefs(refData);
// //         if (!isNew) {
// //           const projectData = await getEditorData(slug);
// //           // Map gallery relation to previews if needed
// //           const galleryPreviews = projectData.project_gallery?.map(g => g.media_assets) || [];
          
// //           reset({
// //             ...projectData,
// //             visual_gallery_previews: galleryPreviews,
// //             // Ensure Quote/CTA objects exist
// //             quote_data: projectData.quote_data || { quote: '', author: '', role: '' },
// //             call_to_action_data: projectData.call_to_action_data || { button_text: '', link: '' }
// //           });
// //         }
// //       } catch (error) {
// //         toast.error('Error loading data');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     init();
// //   }, [slug, isNew, reset]);

// //   // --- Creation Handlers ---
// //   const handleCreateTool = async (data) => {
// //     try {
// //       const newTool = await createTool(data.name, data.icon_name);
// //       setRefs(prev => ({ ...prev, tools: [...prev.tools, newTool].sort((a,b) => a.name.localeCompare(b.name)) }));
// //       const currentTools = watch('tool_ids') || [];
// //       setValue('tool_ids', [...currentTools, newTool.id.toString()]);
// //       toast.success(`Tool created!`);
// //       setModalType(null);
// //     } catch (err) { toast.error('Failed to create tool'); }
// //   };

// //   const handleCreateCategory = async (data) => {
// //     try {
// //       const newCat = await createCategory(data.name);
// //       setRefs(prev => ({ ...prev, categories: [...prev.categories, newCat].sort((a,b) => a.name.localeCompare(b.name)) }));
// //       const currentCats = watch('category_ids') || [];
// //       setValue('category_ids', [...currentCats, newCat.id.toString()]);
// //       toast.success(`Category created!`);
// //       setModalType(null);
// //     } catch (err) { toast.error('Failed to create category'); }
// //   };

// //   const onSubmit = async (data) => {
// //     setSaving(true);
// //     try {
// //       // Map visual_gallery_previews back to structure needed for saving
// //       const galleryPayload = (data.visual_gallery_previews || []).map(media => ({ media: media }));
      
// //       const payload = {
// //         ...data,
// //         project_gallery: galleryPayload 
// //       };

// //       const result = await saveProject(payload, isNew, slug);
// //       toast.success('Project saved successfully!');
// //       if (isNew) navigate(`/admin/projects-config/${result.slug}`);
// //     } catch (error) {
// //       toast.error('Failed to save project');
// //       console.error(error);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
// //         <Toaster position="top-right" />
// //         <CreateModal isOpen={modalType === 'tool'} onClose={() => setModalType(null)} onSave={handleCreateTool} title="Create New Tool" fields={[{ name: 'name', label: 'Tool Name', placeholder: 'e.g. React Native' }, { name: 'icon_name', label: 'Icon Name', placeholder: 'e.g. Zap' }]} />
// //         <CreateModal isOpen={modalType === 'category'} onClose={() => setModalType(null)} onSave={handleCreateCategory} title="Create New Category" fields={[{ name: 'name', label: 'Category Name', placeholder: 'e.g. Mobile' }]} />

// //         {/* Header */}
// //         <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
// //           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// //             <div className="flex items-center gap-4">
// //               <Link to="/admin/projects-config" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Project' : 'Edit Project'}</h1>
// //                 <p className="text-xs text-gray-500 font-mono">{watch('slug') || 'untitled'}</p>
// //               </div>
// //             </div>
// //             <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all transform active:scale-95 font-medium">
// //               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
// //             </button>
// //           </div>
// //         </div>

// //         <div className="max-w-7xl mx-auto px-6 py-8">
// //           {/* Tabs */}
// //           <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2 scrollbar-hide">
// //             <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
// //             <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media" />
// //             <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
// //             <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
// //             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Statistics" />
// //           </div>

// //           {/* --- TAB: GENERAL --- */}
// //           {activeTab === 'general' && (
// //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //               <div className="lg:col-span-2 space-y-8">
// //                 <FormSection title="Core Information">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //                     <Input label="Project Title" name="title" register={register} error={errors.title} placeholder="e.g. E-Commerce Platform" />
// //                     <Input label="Slug" name="slug" register={register} placeholder="Auto-generated" />
// //                   </div>
// //                   <Textarea label="Short Description" name="description" register={register} placeholder="Brief overview..." />
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //                     <Input label="Client" name="client" register={register} placeholder="e.g. Acme Corp" />
// //                     <Input label="Role" name="role" register={register} placeholder="e.g. Lead Designer" />
// //                   </div>
// //                 </FormSection>

// //                 <FormSection title="Extended Details">
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// //                     <Input label="Timeline" name="timeline" register={register} placeholder="e.g. 3 Months" />
// //                     <Input label="Publisher" name="publisher_name" register={register} placeholder="e.g. Behance" />
// //                     <Input label="Meta Label" name="metadata_label" register={register} placeholder="e.g. Views" />
// //                   </div>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// //                     <Input label="Meta Value" name="metadata_value" type="number" register={register} />
// //                     <ColorPicker label="Primary Color" name="primary_color" register={register} watch={watch} />
// //                     <ColorPicker label="Secondary Color" name="secondary_color" register={register} watch={watch} />
// //                   </div>
// //                   <Input label="Tagline" name="tagline" register={register} placeholder="A catchy phrase for the header..." />
// //                 </FormSection>
// //               </div>

// //               <div className="space-y-8">
// //                 <FormSection title="Classification">
// //                   <div className="mb-5">
// //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Status</label>
// //                     <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// //                       <option value="Completed">Completed</option>
// //                       <option value="In Progress">In Progress</option>
// //                       <option value="Concept">Concept</option>
// //                     </select>
// //                   </div>
// //                   <div className="mb-5">
// //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Tier</label>
// //                     <select {...register('tier_id')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// //                       <option value="">Select Tier...</option>
// //                       {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
// //                     </select>
// //                   </div>
// //                   <Input label="Completion %" name="completion_percentage" type="number" register={register} />
// //                 </FormSection>
// //                 <FormSection title="Relations">
// //                   <div className="space-y-6">
// //                     <Controller control={control} name="category_ids" render={({ field: { value, onChange } }) => (
// //                       <MultiSelectWithCreate label="Categories" options={refs.categories} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('category'); }} />
// //                     )} />
// //                     <Controller control={control} name="tool_ids" render={({ field: { value, onChange } }) => (
// //                       <MultiSelectWithCreate label="Tools Used" options={refs.tools} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('tool'); }} />
// //                     )} />
// //                   </div>
// //                 </FormSection>
// //               </div>
// //             </div>
// //           )}

// //           {/* --- TAB: MEDIA --- */}
// //           {activeTab === 'media' && (
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //               <FormSection title="Hero Assets" icon={ImageIcon}>
// //                 <MediaUploader label="Card Thumbnail (Main Image)" currentMedia={watchHero} onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)} onUpload={(asset) => { setValue('hero_media_id', asset.id); setValue('hero_media', asset); }} />
// //                 <div className="border-t pt-6">
// //                   <MediaUploader label="Detail Page Header (Large)" currentMedia={watchDetailHero} onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)} onUpload={(asset) => { setValue('detail_hero_media_id', asset.id); setValue('detail_hero_media', asset); }} />
// //                 </div>
// //                 <Input label="Video URL" name="video_url" register={register} placeholder="https://youtube..." />
// //               </FormSection>

// //               <FormSection title="Galleries" icon={Layout}>
// //                 <MediaUploader 
// //                   label="Grid Images (Banner IDs)" multiple currentMedia={watchBannerPreviews} 
// //                   onRemove={(id) => {
// //                     setValue('banner_media_ids', (watch('banner_media_ids') || []).filter(x => x !== id));
// //                     setValue('banner_previews', (watch('banner_previews') || []).filter(x => x.id !== id));
// //                   }} 
// //                   onUpload={(asset) => {
// //                     setValue('banner_media_ids', [...(watch('banner_media_ids') || []), asset.id]);
// //                     setValue('banner_previews', [...(watch('banner_previews') || []), asset]);
// //                   }} 
// //                 />
// //                 <div className="border-t pt-6">
// //                   <MediaUploader 
// //                     label="Carousel Slider (Slider IDs)" multiple currentMedia={watchSliderPreviews} 
// //                     onRemove={(id) => {
// //                       setValue('slider_media_ids', (watch('slider_media_ids') || []).filter(x => x !== id));
// //                       setValue('slider_previews', (watch('slider_previews') || []).filter(x => x.id !== id));
// //                     }} 
// //                     onUpload={(asset) => {
// //                       setValue('slider_media_ids', [...(watch('slider_media_ids') || []), asset.id]);
// //                       setValue('slider_previews', [...(watch('slider_previews') || []), asset]);
// //                     }} 
// //                   />
// //                 </div>
// //                 <div className="border-t pt-6">
// //                    <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Gallery (Project Gallery Relation)</h4>
// //                    <MediaUploader 
// //                      label="" multiple currentMedia={watchGalleryPreviews}
// //                      onRemove={(id) => {
// //                        setValue('visual_gallery_previews', (watch('visual_gallery_previews') || []).filter(x => x.id !== id));
// //                      }}
// //                      onUpload={(asset) => {
// //                        setValue('visual_gallery_previews', [...(watch('visual_gallery_previews') || []), asset]);
// //                      }}
// //                    />
// //                 </div>
// //               </FormSection>
// //             </div>
// //           )}

// //           {/* --- TAB: CONTENT BLOCKS --- */}
// //           {activeTab === 'content' && (
// //              <div className="space-y-8 max-w-5xl mx-auto">
               
// //                {/* 1. Process Steps */}
// //                <FormSection title="Process Steps" icon={Layers}>
// //                  {processFields.map((field, index) => (
// //                    <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
// //                      <span className="font-bold text-gray-300 text-xl mt-1">#{index + 1}</span>
// //                      <div className="flex-1 grid grid-cols-1 gap-4">
// //                         <Input label="Title" name={`process_steps.${index}.title`} register={register} placeholder="e.g. Discovery" />
// //                         <Textarea label="Description" name={`process_steps.${index}.description`} register={register} placeholder="Description..." rows={3} />
// //                      </div>
// //                      <button type="button" onClick={() => removeProcess(index)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
// //                    </div>
// //                  ))}
// //                  <button type="button" onClick={() => addProcess({ title: '', description: '', step_number: processFields.length + 1 })} className="text-sm text-blue-600 font-medium">+ Add Step</button>
// //                </FormSection>

// //                {/* 2. Challenges & Solutions */}
// //                <FormSection title="Challenges & Solutions" icon={Target}>
// //                  {challengeFields.map((field, index) => (
// //                    <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
// //                      <div className="mt-2"><Hammer className="w-5 h-5 text-gray-400" /></div>
// //                      <div className="flex-1 space-y-4">
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                             <Input label="Challenge" name={`challenges_solutions.${index}.challenge`} register={register} placeholder="Problem..." />
// //                             <div className="grid grid-cols-2 gap-4">
// //                                 <Input label="Icon" name={`challenges_solutions.${index}.icon`} register={register} placeholder="e.g. Zap" />
// //                                 <Input label="Border Class" name={`challenges_solutions.${index}.challengeColor`} register={register} placeholder="e.g. border-red-500" />
// //                             </div>
// //                         </div>
// //                         <Textarea label="Solution" name={`challenges_solutions.${index}.solution`} register={register} placeholder="How we solved it..." rows={3} />
// //                      </div>
// //                      <button type="button" onClick={() => removeChallenge(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
// //                    </div>
// //                  ))}
// //                  <button type="button" onClick={() => addChallenge({ challenge: '', solution: '', icon: 'Zap', challengeColor: 'border-gray-200' })} className="text-sm text-blue-600 font-medium">+ Add Challenge</button>
// //                </FormSection>

// //                {/* 3. Flip Cards */}
// //                <FormSection title="Design Principles (Flip Cards)" icon={CheckCircle}>
// //                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //                    {cardFields.map((field, index) => (
// //                      <div key={field.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative group">
// //                        <button type="button" onClick={() => removeCard(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// //                        <div className="space-y-4">
// //                           <div className="grid grid-cols-2 gap-4">
// //                              <Input label="Front Title" name={`flip_cards.${index}.front_title`} register={register} />
// //                              <Input label="Icon Name" name={`flip_cards.${index}.icon`} register={register} />
// //                           </div>
// //                           <div className="grid grid-cols-2 gap-4">
// //                               <Input label="Bg Class" name={`flip_cards.${index}.bgColor`} register={register} placeholder="bg-white" />
// //                               <ColorPicker label="Icon Color" name={`flip_cards.${index}.iconColor`} register={register} watch={watch} />
// //                           </div>
// //                           <Textarea label="Back Info" name={`flip_cards.${index}.back_info`} register={register} rows={2} />
// //                        </div>
// //                      </div>
// //                    ))}
// //                  </div>
// //                  <button type="button" onClick={() => addCard({ front_title: '', back_info: '', icon: 'Zap', bgColor: 'bg-white', iconColor: '#000000' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Card</button>
// //                </FormSection>

// //                {/* 4. Accessibility Data */}
// //                <FormSection title="Accessibility Insights" icon={Accessibility}>
// //                  <div className="space-y-3">
// //                    {accessFields.map((field, index) => (
// //                      <div key={field.id} className="flex gap-3">
// //                        <div className="flex-1">
// //                           <Input name={`accessibility_data.${index}.text`} register={register} placeholder="e.g. High contrast ratios used..." />
// //                        </div>
// //                        <button type="button" onClick={() => removeAccess(index)} className="text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
// //                      </div>
// //                    ))}
// //                  </div>
// //                  <button type="button" onClick={() => addAccess({ text: '' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Insight</button>
// //                </FormSection>

// //                {/* 5. Quote & CTA */}
// //                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //                  <FormSection title="Testimonial Quote" icon={Quote}>
// //                     <Textarea label="Quote" name="quote_data.quote" register={register} placeholder="The best team ever..." />
// //                     <Input label="Author" name="quote_data.author" register={register} />
// //                     <Input label="Role" name="quote_data.role" register={register} />
// //                  </FormSection>

// //                  <FormSection title="Call To Action" icon={MessageSquare}>
// //                     <Input label="Button Text" name="call_to_action_data.button_text" register={register} placeholder="View Live" />
// //                     <Input label="Link URL" name="call_to_action_data.link" register={register} />
// //                  </FormSection>
// //                </div>
// //              </div>
// //            )}

// //           {/* --- TAB: SECTIONS --- */}
// //           {activeTab === 'sections' && (
// //             <div className="space-y-6 max-w-5xl mx-auto">
// //                <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
// //                   <div>
// //                     <h3 className="text-lg font-bold text-blue-900">Dynamic Page Sections</h3>
// //                     <p className="text-sm text-blue-700 mt-1">Rich text and image sections stacking vertically.</p>
// //                   </div>
// //                   <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Section</button>
// //                </div>
               
// //                <div className="space-y-6">
// //                 {sectionFields.map((field, index) => (
// //                   <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
// //                       <div className="flex justify-between items-start mb-4">
// //                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Section {index + 1}</span>
// //                         <button type="button" onClick={() => removeSection(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
// //                       </div>
                      
// //                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //                         <div className="space-y-4">
// //                           <Input label="Heading" name={`project_sections.${index}.heading`} register={register} placeholder="Section title..." />
// //                           <Textarea label="Body" name={`project_sections.${index}.body_text`} register={register} rows={5} placeholder="Content..." />
// //                           <div className="grid grid-cols-2 gap-4">
// //                             <div>
// //                               <label className="block text-sm font-medium text-gray-700 mb-1.5">Layout</label>
// //                               <select {...register(`project_sections.${index}.layout_type`)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
// //                                 <option value="image_left">Image Left</option>
// //                                 <option value="image_right">Image Right</option>
// //                                 <option value="full_width">Full Width</option>
// //                                 <option value="split_side_by_side">Split</option>
// //                               </select>
// //                             </div>
// //                             <Input label="Bg Color" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
// //                           </div>
// //                         </div>
// //                         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
// //                           <Controller
// //                             control={control}
// //                             name={`project_sections.${index}.resolved_media`}
// //                             render={({ field: { value, onChange } }) => (
// //                               <MediaUploader label="Images" multiple currentMedia={value} onRemove={(id) => {
// //                                   const newMedia = (value || []).filter(m => m.id !== id);
// //                                   onChange(newMedia);
// //                                   setValue(`project_sections.${index}.media_asset_ids`, (watch(`project_sections.${index}.media_asset_ids`) || []).filter(x => x !== id));
// //                                 }}
// //                                 onUpload={(asset) => {
// //                                   onChange([...(value || []), asset]);
// //                                   setValue(`project_sections.${index}.media_asset_ids`, [...(watch(`project_sections.${index}.media_asset_ids`) || []), asset.id]);
// //                                 }}
// //                               />
// //                             )}
// //                           />
// //                         </div>
// //                       </div>
// //                   </div>
// //                 ))}
// //                </div>
// //             </div>
// //           )}

// //            {/* --- TAB: STATS --- */}
// //            {activeTab === 'stats' && (
// //              <div className="max-w-5xl mx-auto">
// //                 <div className="flex justify-between items-center mb-6">
// //                    <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
// //                    <button type="button" onClick={() => addStat({ title: '', value: '' })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Stat</button>
// //                 </div>
                
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
// //                    {statFields.map((field, index) => (
// //                      <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
// //                         <button type="button" onClick={() => removeStat(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
// //                         <div className="space-y-3">
// //                            <Input label="Title" name={`project_stats.${index}.title`} register={register} />
// //                            <Input label="Value" name={`project_stats.${index}.value`} register={register} />
// //                            <Input label="Trend" name={`project_stats.${index}.trend`} register={register} />
// //                            <Input label="Icon" name={`project_stats.${index}.icon_name`} register={register} />
// //                         </div>
// //                      </div>
// //                    ))}
// //                 </div>
// //              </div>
// //            )}

// //         </div>
// //       </form>
// //     </DndProvider>
// //   );
// // };

// // export default AdminProjectEditor;

// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import toast, { Toaster } from 'react-hot-toast';
// import {
//   ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon,
//   X, Layers, Layout, PieChart, FileText, CheckCircle, Upload, Palette, Target, Hammer, Search, Zap,
//   Quote, MessageSquare, Accessibility
// } from 'lucide-react';
// import { 
//   getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl, createTool, createCategory 
// } from '../../../api/projectsadmin';

// // --- UI Components ---

// const TabButton = ({ active, onClick, icon: Icon, label }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
//       active 
//         ? 'border-gray-900 text-gray-900 bg-white shadow-sm ring-1 ring-gray-200 border-b-transparent' 
//         : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//     }`}
//   >
//     <Icon className="w-4 h-4" /> {label}
//   </button>
// );

// const FormSection = ({ title, children, className = "", icon: Icon }) => (
//   <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
//     {title && (
//       <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
//         {Icon && <Icon className="w-5 h-5 text-gray-400" />}
//         <h3 className="text-lg font-bold text-gray-900">{title}</h3>
//       </div>
//     )}
//     <div className="space-y-6">{children}</div>
//   </div>
// );

// const Input = ({ label, register, name, error, type = "text", placeholder, className = "", ...rest }) => (
//   <div className="w-full">
//     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
//     <input
//       type={type}
//       {...register(name)}
//       placeholder={placeholder}
//       {...rest}
//       className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all ${
//         error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
//       } ${className}`}
//     />
//     {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
//   </div>
// );

// const Textarea = ({ label, register, name, rows = 3, placeholder }) => (
//   <div className="w-full">
//     {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
//     <textarea
//       {...register(name)}
//       rows={rows}
//       placeholder={placeholder}
//       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none resize-y min-h-[80px]"
//     />
//   </div>
// );

// // --- Custom Components ---

// const ColorPicker = ({ label, register, name, watch }) => {
//   const color = watch(name);
//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
//       <div className="flex items-center gap-3">
//         <div 
//           className="w-10 h-10 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
//           style={{ backgroundColor: color || '#ffffff' }}
//         />
//         <div className="relative flex-1">
//           <input
//             type="text"
//             {...register(name)}
//             placeholder="#000000"
//             className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 outline-none uppercase font-mono text-sm"
//           />
//           <input
//             type="color"
//             {...register(name)}
//             className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const MultiSelectWithCreate = ({ label, options, value = [], onChange, onCreate, placeholder = "Select..." }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredOptions = options.filter(opt => 
//     opt.name.toLowerCase().includes(search.toLowerCase()) && 
//     !value.includes(opt.id.toString())
//   );
//   const selectedItems = options.filter(opt => value.includes(opt.id.toString()));

//   return (
//     <div className="w-full" ref={containerRef}>
//       <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
//       <div className="border border-gray-300 rounded-lg bg-white p-2 min-h-[46px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-gray-900 transition-all">
//         {selectedItems.map(item => (
//           <span key={item.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
//             {item.name}
//             <button type="button" onClick={() => onChange(value.filter(id => id !== item.id.toString()))} className="ml-1.5 hover:text-red-500 focus:outline-none"><X className="w-3 h-3" /></button>
//           </span>
//         ))}
//         <input 
//           type="text"
//           className="flex-1 min-w-[120px] outline-none text-sm py-1 bg-transparent"
//           placeholder={selectedItems.length === 0 ? placeholder : ""}
//           value={search}
//           onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
//           onFocus={() => setIsOpen(true)}
//         />
//       </div>
//       {isOpen && (
//         <div className="relative">
//           <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map(opt => (
//                 <button
//                   key={opt.id}
//                   type="button"
//                   onClick={() => { onChange([...value, opt.id.toString()]); setSearch(""); setIsOpen(false); }}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between group"
//                 >
//                   <span>{opt.name}</span>
//                   {opt.icon_name && <span className="text-xs text-gray-400 font-mono group-hover:text-gray-500">{opt.icon_name}</span>}
//                 </button>
//               ))
//             ) : (
//               <div className="p-2">
//                 {search.length > 0 && (
//                   <button type="button" onClick={() => { onCreate(search); setSearch(""); setIsOpen(false); }} className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
//                     <Plus className="w-4 h-4" /> Create "{search}"
//                   </button>
//                 )}
//                 {search.length === 0 && <p className="text-gray-400 text-sm text-center py-2">Start typing to search...</p>}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const CreateModal = ({ isOpen, onClose, onSave, title, fields }) => {
//   if (!isOpen) return null;
//   const handleSave = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     onSave(Object.fromEntries(formData.entries()));
//   };
//   return (
//     <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
//         <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
//         <form onSubmit={handleSave} className="space-y-4">
//           {fields.map(f => (
//             <div key={f.name}>
//               <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
//               <input name={f.name} type="text" required placeholder={f.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none" />
//               {f.hint && <p className="text-xs text-gray-500 mt-1">{f.hint}</p>}
//             </div>
//           ))}
//           <div className="flex justify-end gap-2 mt-6">
//             <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black font-medium">Create</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
//   const [uploading, setUploading] = useState(false);

//   const handleFile = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
//     setUploading(true);
//     try {
//       for (const file of files) {
//         const asset = await uploadMedia(file);
//         onUpload(asset); 
//       }
//       toast.success('Uploaded successfully');
//     } catch (err) {
//       toast.error('Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <div className="flex flex-wrap gap-4">
//         {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
//           media?.file_path && (
//             <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all">
//               <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
//               <button type="button" onClick={() => onRemove(media.id)} className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
//                 <X className="w-3 h-3" />
//               </button>
//             </div>
//           )
//         ))}
//         {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
//           <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50/50">
//             {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
//             <span className="text-xs text-gray-500 mt-2 font-medium">Upload</span>
//             <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
//           </label>
//         )}
//       </div>
//     </div>
//   );
// };

// // --- Main Editor Component ---

// const AdminProjectEditor = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const isNew = !slug || slug === 'new';
//   const [activeTab, setActiveTab] = useState('general');
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
  
//   const [modalType, setModalType] = useState(null); 
//   const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

//   const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
//     defaultValues: {
//       status: 'Completed',
//       completion_percentage: 100,
//       metadata_value: 0,
//       banner_media_ids: [],
//       slider_media_ids: [],
//       project_sections: [],
//       project_stats: [],
//       flip_cards: [],
//       process_steps: [],
//       challenges_solutions: [],
//       accessibility_data: [],
//       category_ids: [],
//       tool_ids: [],
//       primary_color: '#000000',
//       secondary_color: '#ffffff',
//       banner_previews: [],
//       slider_previews: [],
//       visual_gallery_previews: [],
//       project_gallery: [], // Note: API handles converting this to `project_gallery` table inserts
//       quote_data: { quote: '', author: '', role: '' },
//       call_to_action_data: { button_text: 'View Live', link: '' }
//     }
//   });

//   const watchBannerPreviews = watch('banner_previews');
//   const watchSliderPreviews = watch('slider_previews');
//   const watchGalleryPreviews = watch('visual_gallery_previews');
//   const watchHero = watch('hero_media');
//   const watchDetailHero = watch('detail_hero_media');

//   // --- Dynamic Field Arrays ---
//   const { fields: sectionFields, append: addSection, remove: removeSection, move: moveSection } = useFieldArray({ control, name: "project_sections" });
//   const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
//   const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
//   const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });
//   const { fields: challengeFields, append: addChallenge, remove: removeChallenge } = useFieldArray({ control, name: "challenges_solutions" });
//   const { fields: accessFields, append: addAccess, remove: removeAccess } = useFieldArray({ control, name: "accessibility_data" });

//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       try {
//         const refData = await getReferenceData();
//         setRefs(refData);
//         if (!isNew) {
//           const projectData = await getEditorData(slug);
//           // Map gallery relation to previews if needed
//           const galleryPreviews = projectData.project_gallery?.map(g => g.media_assets) || [];
          
//           reset({
//             ...projectData,
//             visual_gallery_previews: galleryPreviews,
//             // Ensure Quote/CTA objects exist
//             quote_data: projectData.quote_data || { quote: '', author: '', role: '' },
//             call_to_action_data: projectData.call_to_action_data || { button_text: '', link: '' }
//           });
//         }
//       } catch (error) {
//         toast.error('Error loading data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     init();
//   }, [slug, isNew, reset]);

//   // --- Creation Handlers ---
//   const handleCreateTool = async (data) => {
//     try {
//       const newTool = await createTool(data.name, data.icon_name);
//       setRefs(prev => ({ ...prev, tools: [...prev.tools, newTool].sort((a,b) => a.name.localeCompare(b.name)) }));
//       const currentTools = watch('tool_ids') || [];
//       setValue('tool_ids', [...currentTools, newTool.id.toString()]);
//       toast.success(`Tool created!`);
//       setModalType(null);
//     } catch (err) { toast.error('Failed to create tool'); }
//   };

//   const handleCreateCategory = async (data) => {
//     try {
//       const newCat = await createCategory(data.name);
//       setRefs(prev => ({ ...prev, categories: [...prev.categories, newCat].sort((a,b) => a.name.localeCompare(b.name)) }));
//       const currentCats = watch('category_ids') || [];
//       setValue('category_ids', [...currentCats, newCat.id.toString()]);
//       toast.success(`Category created!`);
//       setModalType(null);
//     } catch (err) { toast.error('Failed to create category'); }
//   };

//   const onSubmit = async (data) => {
//     setSaving(true);
//     try {
//       // Map visual_gallery_previews back to structure needed for saving
//       const galleryPayload = (data.visual_gallery_previews || []).map(media => ({ media: media }));
      
//       const payload = {
//         ...data,
//         project_gallery: galleryPayload 
//       };

//       const result = await saveProject(payload, isNew, slug);
//       toast.success('Project saved successfully!');
//       if (isNew) navigate(`/admin/projects-config/${result.slug}`);
//     } catch (error) {
//       toast.error('Failed to save project');
//       console.error(error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
//         <Toaster position="top-right" />
//         <CreateModal isOpen={modalType === 'tool'} onClose={() => setModalType(null)} onSave={handleCreateTool} title="Create New Tool" fields={[{ name: 'name', label: 'Tool Name', placeholder: 'e.g. React Native' }, { name: 'icon_name', label: 'Icon Name', placeholder: 'e.g. Zap' }]} />
//         <CreateModal isOpen={modalType === 'category'} onClose={() => setModalType(null)} onSave={handleCreateCategory} title="Create New Category" fields={[{ name: 'name', label: 'Category Name', placeholder: 'e.g. Mobile' }]} />

//         {/* Header */}
//         <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <Link to="/admin/projects-config" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Project' : 'Edit Project'}</h1>
//                 <p className="text-xs text-gray-500 font-mono">{watch('slug') || 'untitled'}</p>
//               </div>
//             </div>
//             <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all transform active:scale-95 font-medium">
//               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
//             </button>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 py-8">
//           {/* Tabs */}
//           <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2 scrollbar-hide">
//             <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
//             <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media" />
//             <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
//             <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
//             <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Statistics" />
//           </div>

//           {/* --- TAB: GENERAL --- */}
//           {activeTab === 'general' && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-8">
//                 <FormSection title="Core Information">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <Input label="Project Title" name="title" register={register} error={errors.title} placeholder="e.g. E-Commerce Platform" />
//                     <Input label="Slug" name="slug" register={register} placeholder="Auto-generated" />
//                   </div>
//                   <Textarea label="Short Description" name="description" register={register} placeholder="Brief overview..." />
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <Input label="Client" name="client" register={register} placeholder="e.g. Acme Corp" />
//                     <Input label="Role" name="role" register={register} placeholder="e.g. Lead Designer" />
//                   </div>
//                 </FormSection>

//                 <FormSection title="Extended Details">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                     <Input label="Timeline" name="timeline" register={register} placeholder="e.g. 3 Months" />
//                     <Input label="Publisher" name="publisher_name" register={register} placeholder="e.g. Behance" />
//                     <Input label="Meta Label" name="metadata_label" register={register} placeholder="e.g. Views" />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                     <Input label="Meta Value" name="metadata_value" type="number" register={register} />
//                     <ColorPicker label="Primary Color" name="primary_color" register={register} watch={watch} />
//                     <ColorPicker label="Secondary Color" name="secondary_color" register={register} watch={watch} />
//                   </div>
//                   <Input label="Tagline" name="tagline" register={register} placeholder="A catchy phrase for the header..." />
//                 </FormSection>
//               </div>

//               <div className="space-y-8">
//                 <FormSection title="Classification">
//                   <div className="mb-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Status</label>
//                     <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
//                       <option value="Completed">Completed</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Concept">Concept</option>
//                     </select>
//                   </div>
//                   <div className="mb-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Tier</label>
//                     <select {...register('tier_id')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
//                       <option value="">Select Tier...</option>
//                       {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
//                     </select>
//                   </div>
//                   <Input label="Completion %" name="completion_percentage" type="number" register={register} />
//                 </FormSection>
//                 <FormSection title="Relations">
//                   <div className="space-y-6">
//                     <Controller control={control} name="category_ids" render={({ field: { value, onChange } }) => (
//                       <MultiSelectWithCreate label="Categories" options={refs.categories} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('category'); }} />
//                     )} />
//                     <Controller control={control} name="tool_ids" render={({ field: { value, onChange } }) => (
//                       <MultiSelectWithCreate label="Tools Used" options={refs.tools} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('tool'); }} />
//                     )} />
//                   </div>
//                 </FormSection>
//               </div>
//             </div>
//           )}

//           {/* --- TAB: MEDIA --- */}
//           {activeTab === 'media' && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <FormSection title="Hero Assets" icon={ImageIcon}>
//                 <MediaUploader label="Card Thumbnail (Main Image)" currentMedia={watchHero} onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)} onUpload={(asset) => { setValue('hero_media_id', asset.id); setValue('hero_media', asset); }} />
//                 <div className="border-t pt-6">
//                   <MediaUploader label="Detail Page Header (Large)" currentMedia={watchDetailHero} onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)} onUpload={(asset) => { setValue('detail_hero_media_id', asset.id); setValue('detail_hero_media', asset); }} />
//                 </div>
//                 <Input label="Video URL" name="video_url" register={register} placeholder="https://youtube..." />
//               </FormSection>

//               <FormSection title="Galleries" icon={Layout}>
//                 <MediaUploader 
//                   label="Grid Images (Banner IDs)" multiple currentMedia={watchBannerPreviews} 
//                   onRemove={(id) => {
//                     setValue('banner_media_ids', (watch('banner_media_ids') || []).filter(x => x !== id));
//                     setValue('banner_previews', (watch('banner_previews') || []).filter(x => x.id !== id));
//                   }} 
//                   onUpload={(asset) => {
//                     setValue('banner_media_ids', [...(watch('banner_media_ids') || []), asset.id]);
//                     setValue('banner_previews', [...(watch('banner_previews') || []), asset]);
//                   }} 
//                 />
//                 <div className="border-t pt-6">
//                   <MediaUploader 
//                     label="Carousel Slider (Slider IDs)" multiple currentMedia={watchSliderPreviews} 
//                     onRemove={(id) => {
//                       setValue('slider_media_ids', (watch('slider_media_ids') || []).filter(x => x !== id));
//                       setValue('slider_previews', (watch('slider_previews') || []).filter(x => x.id !== id));
//                     }} 
//                     onUpload={(asset) => {
//                       setValue('slider_media_ids', [...(watch('slider_media_ids') || []), asset.id]);
//                       setValue('slider_previews', [...(watch('slider_previews') || []), asset]);
//                     }} 
//                   />
//                 </div>
//                 <div className="border-t pt-6">
//                    <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Gallery (Project Gallery Relation)</h4>
//                    <MediaUploader 
//                      label="" multiple currentMedia={watchGalleryPreviews}
//                      onRemove={(id) => {
//                        setValue('visual_gallery_previews', (watch('visual_gallery_previews') || []).filter(x => x.id !== id));
//                      }}
//                      onUpload={(asset) => {
//                        setValue('visual_gallery_previews', [...(watch('visual_gallery_previews') || []), asset]);
//                      }}
//                    />
//                 </div>
//               </FormSection>
//             </div>
//           )}

//           {/* --- TAB: CONTENT BLOCKS --- */}
//           {activeTab === 'content' && (
//              <div className="space-y-8 max-w-5xl mx-auto">
               
//                {/* 1. Process Steps */}
//                <FormSection title="Process Steps" icon={Layers}>
//                  {processFields.map((field, index) => (
//                    <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
//                      <span className="font-bold text-gray-300 text-xl mt-1">#{index + 1}</span>
//                      <div className="flex-1 space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <Input label="Title" name={`process_steps.${index}.title`} register={register} placeholder="e.g. Discovery" />
//                            <Input label="Icon" name={`process_steps.${index}.icon`} register={register} placeholder="e.g. Search" />
//                         </div>
//                         <Textarea label="Detail" name={`process_steps.${index}.detail`} register={register} placeholder="Description of this phase..." rows={3} />
//                      </div>
//                      <button type="button" onClick={() => removeProcess(index)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
//                    </div>
//                  ))}
//                  <button type="button" onClick={() => addProcess({ title: '', detail: '', icon: 'Zap', step_number: processFields.length + 1 })} className="text-sm text-blue-600 font-medium">+ Add Step</button>
//                </FormSection>

//                {/* 2. Challenges & Solutions */}
//                <FormSection title="Challenges & Solutions" icon={Target}>
//                  {challengeFields.map((field, index) => (
//                    <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
//                      <div className="mt-2"><Hammer className="w-5 h-5 text-gray-400" /></div>
//                      <div className="flex-1 space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <Input label="Challenge" name={`challenges_solutions.${index}.challenge`} register={register} placeholder="Problem..." />
//                             <div className="grid grid-cols-2 gap-4">
//                                 <Input label="Icon" name={`challenges_solutions.${index}.icon`} register={register} placeholder="e.g. Zap" />
//                                 <Input label="Border Class" name={`challenges_solutions.${index}.challengeColor`} register={register} placeholder="e.g. border-red-500" />
//                             </div>
//                         </div>
//                         <Textarea label="Solution" name={`challenges_solutions.${index}.solution`} register={register} placeholder="How we solved it..." rows={3} />
//                      </div>
//                      <button type="button" onClick={() => removeChallenge(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
//                    </div>
//                  ))}
//                  <button type="button" onClick={() => addChallenge({ challenge: '', solution: '', icon: 'Zap', challengeColor: 'border-gray-200' })} className="text-sm text-blue-600 font-medium">+ Add Challenge</button>
//                </FormSection>

//                {/* 3. Flip Cards */}
//                <FormSection title="Design Principles (Flip Cards)" icon={CheckCircle}>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                    {cardFields.map((field, index) => (
//                      <div key={field.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative group">
//                        <button type="button" onClick={() => removeCard(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
//                        <div className="space-y-4">
//                           <div className="grid grid-cols-2 gap-4">
//                              <Input label="Front Title" name={`flip_cards.${index}.front_title`} register={register} />
//                              <Input label="Icon Name" name={`flip_cards.${index}.icon`} register={register} />
//                           </div>
//                           <div className="grid grid-cols-2 gap-4">
//                               <Input label="Bg Class" name={`flip_cards.${index}.bgColor`} register={register} placeholder="bg-white" />
//                               <ColorPicker label="Icon Color" name={`flip_cards.${index}.iconColor`} register={register} watch={watch} />
//                           </div>
//                           <Textarea label="Back Info" name={`flip_cards.${index}.back_info`} register={register} rows={2} />
//                        </div>
//                      </div>
//                    ))}
//                  </div>
//                  <button type="button" onClick={() => addCard({ front_title: '', back_info: '', icon: 'Zap', bgColor: 'bg-white', iconColor: '#000000' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Card</button>
//                </FormSection>

//                {/* 4. Accessibility Data */}
//                <FormSection title="Accessibility Insights" icon={Accessibility}>
//                  <div className="space-y-3">
//                    {accessFields.map((field, index) => (
//                      <div key={field.id} className="flex gap-3">
//                        <div className="flex-1">
//                           <Input name={`accessibility_data.${index}.text`} register={register} placeholder="e.g. High contrast ratios used..." />
//                        </div>
//                        <button type="button" onClick={() => removeAccess(index)} className="text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
//                      </div>
//                    ))}
//                  </div>
//                  <button type="button" onClick={() => addAccess({ text: '' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Insight</button>
//                </FormSection>

//                {/* 5. Quote & CTA */}
//                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                  <FormSection title="Testimonial Quote" icon={Quote}>
//                     <Textarea label="Quote" name="quote_data.quote" register={register} placeholder="The best team ever..." />
//                     <Input label="Author" name="quote_data.author" register={register} />
//                     <Input label="Role" name="quote_data.role" register={register} />
//                  </FormSection>

//                  <FormSection title="Call To Action" icon={MessageSquare}>
//                     <Input label="Button Text" name="call_to_action_data.button_text" register={register} placeholder="View Live" />
//                     <Input label="Link URL" name="call_to_action_data.link" register={register} />
//                  </FormSection>
//                </div>
//              </div>
//            )}

//           {/* --- TAB: SECTIONS --- */}
//           {activeTab === 'sections' && (
//             <div className="space-y-6 max-w-5xl mx-auto">
//                <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
//                   <div>
//                     <h3 className="text-lg font-bold text-blue-900">Dynamic Page Sections</h3>
//                     <p className="text-sm text-blue-700 mt-1">Rich text and image sections stacking vertically.</p>
//                   </div>
//                   <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Section</button>
//                </div>
               
//                <div className="space-y-6">
//                 {sectionFields.map((field, index) => (
//                   <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
//                       <div className="flex justify-between items-start mb-4">
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Section {index + 1}</span>
//                         <button type="button" onClick={() => removeSection(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
//                       </div>
                      
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         <div className="space-y-4">
//                           <Input label="Heading" name={`project_sections.${index}.heading`} register={register} placeholder="Section title..." />
//                           <Textarea label="Body" name={`project_sections.${index}.body_text`} register={register} rows={5} placeholder="Content..." />
//                           <div className="grid grid-cols-2 gap-4">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1.5">Layout</label>
//                               <select {...register(`project_sections.${index}.layout_type`)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
//                                 <option value="image_left">Image Left</option>
//                                 <option value="image_right">Image Right</option>
//                                 <option value="full_width">Full Width</option>
//                                 <option value="split_side_by_side">Split</option>
//                               </select>
//                             </div>
//                             <Input label="Bg Color" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
//                           </div>
//                         </div>
//                         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
//                           <Controller
//                             control={control}
//                             name={`project_sections.${index}.resolved_media`}
//                             render={({ field: { value, onChange } }) => (
//                               <MediaUploader label="Images" multiple currentMedia={value} onRemove={(id) => {
//                                   const newMedia = (value || []).filter(m => m.id !== id);
//                                   onChange(newMedia);
//                                   setValue(`project_sections.${index}.media_asset_ids`, (watch(`project_sections.${index}.media_asset_ids`) || []).filter(x => x !== id));
//                                 }}
//                                 onUpload={(asset) => {
//                                   onChange([...(value || []), asset]);
//                                   setValue(`project_sections.${index}.media_asset_ids`, [...(watch(`project_sections.${index}.media_asset_ids`) || []), asset.id]);
//                                 }}
//                               />
//                             )}
//                           />
//                         </div>
//                       </div>
//                   </div>
//                 ))}
//                </div>
//             </div>
//           )}

//            {/* --- TAB: STATS --- */}
//            {activeTab === 'stats' && (
//              <div className="max-w-5xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                    <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
//                    <button type="button" onClick={() => addStat({ title: '', value: '' })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Stat</button>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                    {statFields.map((field, index) => (
//                      <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
//                         <button type="button" onClick={() => removeStat(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
//                         <div className="space-y-3">
//                            <Input label="Title" name={`project_stats.${index}.title`} register={register} />
//                            <Input label="Value" name={`project_stats.${index}.value`} register={register} />
//                            <Input label="Trend" name={`project_stats.${index}.trend`} register={register} />
//                            <Input label="Icon" name={`project_stats.${index}.icon_name`} register={register} />
//                         </div>
//                      </div>
//                    ))}
//                 </div>
//              </div>
//            )}

//         </div>
//       </form>
//     </DndProvider>
//   );
// };

// export default AdminProjectEditor;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast, { Toaster } from 'react-hot-toast';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon,
  X, Layers, Layout, PieChart, FileText, CheckCircle, Upload, Palette, Target, Hammer, Search, Zap,
  Quote, MessageSquare, Accessibility
} from 'lucide-react';
import { 
  getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl, createTool, createCategory 
} from '../../../api/projectsadmin';

// --- UI Components ---

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
      active 
        ? 'border-gray-900 text-gray-900 bg-white shadow-sm ring-1 ring-gray-200 border-b-transparent' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`}
  >
    <Icon className="w-4 h-4" /> {label}
  </button>
);

const FormSection = ({ title, children, className = "", icon: Icon }) => (
  <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
    {title && (
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
    )}
    <div className="space-y-6">{children}</div>
  </div>
);

const Input = ({ label, register, name, error, type = "text", placeholder, className = "", ...rest }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
    <input
      type={type}
      {...register(name)}
      placeholder={placeholder}
      {...rest}
      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all ${
        error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
      } ${className}`}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
  </div>
);

const Textarea = ({ label, register, name, rows = 3, placeholder }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
    <textarea
      {...register(name)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none resize-y min-h-[80px]"
    />
  </div>
);

// --- Custom Components ---

const ColorPicker = ({ label, register, name, watch }) => {
  const color = watch(name);
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
          style={{ backgroundColor: color || '#ffffff' }}
        />
        <div className="relative flex-1">
          <input
            type="text"
            {...register(name)}
            placeholder="#000000"
            className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 outline-none uppercase font-mono text-sm"
          />
          <input
            type="color"
            {...register(name)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const MultiSelectWithCreate = ({ label, options, value = [], onChange, onCreate, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(search.toLowerCase()) && 
    !value.includes(opt.id.toString())
  );
  const selectedItems = options.filter(opt => value.includes(opt.id.toString()));

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="border border-gray-300 rounded-lg bg-white p-2 min-h-[46px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-gray-900 transition-all">
        {selectedItems.map(item => (
          <span key={item.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
            {item.name}
            <button type="button" onClick={() => onChange(value.filter(id => id !== item.id.toString()))} className="ml-1.5 hover:text-red-500 focus:outline-none"><X className="w-3 h-3" /></button>
          </span>
        ))}
        <input 
          type="text"
          className="flex-1 min-w-[120px] outline-none text-sm py-1 bg-transparent"
          placeholder={selectedItems.length === 0 ? placeholder : ""}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <div className="relative">
          <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => { onChange([...value, opt.id.toString()]); setSearch(""); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between group"
                >
                  <span>{opt.name}</span>
                  {opt.icon_name && <span className="text-xs text-gray-400 font-mono group-hover:text-gray-500">{opt.icon_name}</span>}
                </button>
              ))
            ) : (
              <div className="p-2">
                {search.length > 0 && (
                  <button type="button" onClick={() => { onCreate(search); setSearch(""); setIsOpen(false); }} className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create "{search}"
                  </button>
                )}
                {search.length === 0 && <p className="text-gray-400 text-sm text-center py-2">Start typing to search...</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CreateModal = ({ isOpen, onClose, onSave, title, fields }) => {
  if (!isOpen) return null;
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave(Object.fromEntries(formData.entries()));
  };
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          {fields.map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input name={f.name} type="text" required placeholder={f.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none" />
              {f.hint && <p className="text-xs text-gray-500 mt-1">{f.hint}</p>}
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black font-medium">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        const asset = await uploadMedia(file);
        onUpload(asset); 
      }
      toast.success('Uploaded successfully');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-4">
        {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
          media?.file_path && (
            <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all">
              <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
              <button type="button" onClick={() => onRemove(media.id)} className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <X className="w-3 h-3" />
              </button>
            </div>
          )
        ))}
        {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
          <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50/50">
            {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
            <span className="text-xs text-gray-500 mt-2 font-medium">Upload</span>
            <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
          </label>
        )}
      </div>
    </div>
  );
};

// --- Main Editor Component ---

const AdminProjectEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = !slug || slug === 'new';
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [modalType, setModalType] = useState(null); 
  const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      status: 'Completed',
      completion_percentage: 100,
      metadata_value: 0,
      banner_media_ids: [],
      slider_media_ids: [],
      project_sections: [],
      project_stats: [],
      flip_cards: [],
      process_steps: [],
      challenges_solutions: [],
      accessibility_data: [],
      category_ids: [],
      tool_ids: [],
      primary_color: '#000000',
      secondary_color: '#ffffff',
      banner_previews: [],
      slider_previews: [],
      visual_gallery_previews: [],
      project_gallery: [], // Note: API handles converting this to `project_gallery` table inserts
      quote_data: { quote: '', author: '', role: '' },
      call_to_action_data: { button_text: 'View Live', link: '' }
    }
  });

  const watchBannerPreviews = watch('banner_previews');
  const watchSliderPreviews = watch('slider_previews');
  const watchGalleryPreviews = watch('visual_gallery_previews');
  const watchHero = watch('hero_media');
  const watchDetailHero = watch('detail_hero_media');

  // --- Dynamic Field Arrays ---
  const { fields: sectionFields, append: addSection, remove: removeSection, move: moveSection } = useFieldArray({ control, name: "project_sections" });
  const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
  const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
  const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });
  const { fields: challengeFields, append: addChallenge, remove: removeChallenge } = useFieldArray({ control, name: "challenges_solutions" });
  const { fields: accessFields, append: addAccess, remove: removeAccess } = useFieldArray({ control, name: "accessibility_data" });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const refData = await getReferenceData();
        setRefs(refData);
        if (!isNew) {
          const projectData = await getEditorData(slug);
          // Map gallery relation to previews if needed
          const galleryPreviews = projectData.project_gallery?.map(g => g.media_assets) || [];
          
          reset({
            ...projectData,
            visual_gallery_previews: galleryPreviews,
            // Ensure Quote/CTA objects exist
            quote_data: projectData.quote_data || { quote: '', author: '', role: '' },
            call_to_action_data: projectData.call_to_action_data || { button_text: '', link: '' }
          });
        }
      } catch (error) {
        toast.error('Error loading data');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [slug, isNew, reset]);

  // --- Creation Handlers ---
  const handleCreateTool = async (data) => {
    try {
      const newTool = await createTool(data.name, data.icon_name);
      setRefs(prev => ({ ...prev, tools: [...prev.tools, newTool].sort((a,b) => a.name.localeCompare(b.name)) }));
      const currentTools = watch('tool_ids') || [];
      setValue('tool_ids', [...currentTools, newTool.id.toString()]);
      toast.success(`Tool created!`);
      setModalType(null);
    } catch (err) { toast.error('Failed to create tool'); }
  };

  const handleCreateCategory = async (data) => {
    try {
      const newCat = await createCategory(data.name);
      setRefs(prev => ({ ...prev, categories: [...prev.categories, newCat].sort((a,b) => a.name.localeCompare(b.name)) }));
      const currentCats = watch('category_ids') || [];
      setValue('category_ids', [...currentCats, newCat.id.toString()]);
      toast.success(`Category created!`);
      setModalType(null);
    } catch (err) { toast.error('Failed to create category'); }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Destructure visual_gallery_previews so it doesn't get passed to the API
      const { visual_gallery_previews, ...restData } = data;

      // Map visual_gallery_previews back to structure needed for saving
      const galleryPayload = (visual_gallery_previews || []).map(media => ({ media: media }));
      
      const payload = {
        ...restData,
        project_gallery: galleryPayload 
      };

      const result = await saveProject(payload, isNew, slug);
      toast.success('Project saved successfully!');
      if (isNew) navigate(`/admin/projects-config/${result.slug}`);
    } catch (error) {
      toast.error('Failed to save project');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
        <Toaster position="top-right" />
        <CreateModal isOpen={modalType === 'tool'} onClose={() => setModalType(null)} onSave={handleCreateTool} title="Create New Tool" fields={[{ name: 'name', label: 'Tool Name', placeholder: 'e.g. React Native' }, { name: 'icon_name', label: 'Icon Name', placeholder: 'e.g. Zap' }]} />
        <CreateModal isOpen={modalType === 'category'} onClose={() => setModalType(null)} onSave={handleCreateCategory} title="Create New Category" fields={[{ name: 'name', label: 'Category Name', placeholder: 'e.g. Mobile' }]} />

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/projects-config" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Project' : 'Edit Project'}</h1>
                <p className="text-xs text-gray-500 font-mono">{watch('slug') || 'untitled'}</p>
              </div>
            </div>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all transform active:scale-95 font-medium">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2 scrollbar-hide">
            <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
            <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media" />
            <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
            <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
            <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Statistics" />
          </div>

          {/* --- TAB: GENERAL --- */}
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <FormSection title="Core Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Project Title" name="title" register={register} error={errors.title} placeholder="e.g. E-Commerce Platform" />
                    <Input label="Slug" name="slug" register={register} placeholder="Auto-generated" />
                  </div>
                  <Textarea label="Short Description" name="description" register={register} placeholder="Brief overview..." />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Client" name="client" register={register} placeholder="e.g. Acme Corp" />
                    <Input label="Role" name="role" register={register} placeholder="e.g. Lead Designer" />
                  </div>
                </FormSection>

                <FormSection title="Extended Details">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Input label="Timeline" name="timeline" register={register} placeholder="e.g. 3 Months" />
                    <Input label="Publisher" name="publisher_name" register={register} placeholder="e.g. Behance" />
                    <Input label="Meta Label" name="metadata_label" register={register} placeholder="e.g. Views" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Input label="Meta Value" name="metadata_value" type="number" register={register} />
                    <ColorPicker label="Primary Color" name="primary_color" register={register} watch={watch} />
                    <ColorPicker label="Secondary Color" name="secondary_color" register={register} watch={watch} />
                  </div>
                  <Input label="Tagline" name="tagline" register={register} placeholder="A catchy phrase for the header..." />
                </FormSection>
              </div>

              <div className="space-y-8">
                <FormSection title="Classification">
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Status</label>
                    <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Concept">Concept</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tier</label>
                    <select {...register('tier_id')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
                      <option value="">Select Tier...</option>
                      {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <Input label="Completion %" name="completion_percentage" type="number" register={register} />
                </FormSection>
                <FormSection title="Relations">
                  <div className="space-y-6">
                    <Controller control={control} name="category_ids" render={({ field: { value, onChange } }) => (
                      <MultiSelectWithCreate label="Categories" options={refs.categories} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('category'); }} />
                    )} />
                    <Controller control={control} name="tool_ids" render={({ field: { value, onChange } }) => (
                      <MultiSelectWithCreate label="Tools Used" options={refs.tools} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('tool'); }} />
                    )} />
                  </div>
                </FormSection>
              </div>
            </div>
          )}

          {/* --- TAB: MEDIA --- */}
          {activeTab === 'media' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FormSection title="Hero Assets" icon={ImageIcon}>
                <MediaUploader label="Card Thumbnail (Main Image)" currentMedia={watchHero} onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)} onUpload={(asset) => { setValue('hero_media_id', asset.id); setValue('hero_media', asset); }} />
                <div className="border-t pt-6">
                  <MediaUploader label="Detail Page Header (Large)" currentMedia={watchDetailHero} onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)} onUpload={(asset) => { setValue('detail_hero_media_id', asset.id); setValue('detail_hero_media', asset); }} />
                </div>
                <Input label="Video URL" name="video_url" register={register} placeholder="https://youtube..." />
              </FormSection>

              <FormSection title="Galleries" icon={Layout}>
                <MediaUploader 
                  label="Grid Images (Banner IDs)" multiple currentMedia={watchBannerPreviews} 
                  onRemove={(id) => {
                    setValue('banner_media_ids', (watch('banner_media_ids') || []).filter(x => x !== id));
                    setValue('banner_previews', (watch('banner_previews') || []).filter(x => x.id !== id));
                  }} 
                  onUpload={(asset) => {
                    setValue('banner_media_ids', [...(watch('banner_media_ids') || []), asset.id]);
                    setValue('banner_previews', [...(watch('banner_previews') || []), asset]);
                  }} 
                />
                <div className="border-t pt-6">
                  <MediaUploader 
                    label="Carousel Slider (Slider IDs)" multiple currentMedia={watchSliderPreviews} 
                    onRemove={(id) => {
                      setValue('slider_media_ids', (watch('slider_media_ids') || []).filter(x => x !== id));
                      setValue('slider_previews', (watch('slider_previews') || []).filter(x => x.id !== id));
                    }} 
                    onUpload={(asset) => {
                      setValue('slider_media_ids', [...(watch('slider_media_ids') || []), asset.id]);
                      setValue('slider_previews', [...(watch('slider_previews') || []), asset]);
                    }} 
                  />
                </div>
                <div className="border-t pt-6">
                   <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Gallery (Project Gallery Relation)</h4>
                   <MediaUploader 
                     label="" multiple currentMedia={watchGalleryPreviews}
                     onRemove={(id) => {
                       setValue('visual_gallery_previews', (watch('visual_gallery_previews') || []).filter(x => x.id !== id));
                     }}
                     onUpload={(asset) => {
                       setValue('visual_gallery_previews', [...(watch('visual_gallery_previews') || []), asset]);
                     }}
                   />
                </div>
              </FormSection>
            </div>
          )}

          {/* --- TAB: CONTENT BLOCKS --- */}
          {activeTab === 'content' && (
             <div className="space-y-8 max-w-5xl mx-auto">
               
               {/* 1. Process Steps */}
               <FormSection title="Process Steps" icon={Layers}>
                 {processFields.map((field, index) => (
                   <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <span className="font-bold text-gray-300 text-xl mt-1">#{index + 1}</span>
                     <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <Input label="Title" name={`process_steps.${index}.title`} register={register} placeholder="e.g. Discovery" />
                           <Input label="Icon" name={`process_steps.${index}.icon`} register={register} placeholder="e.g. Search" />
                        </div>
                        <Textarea label="Detail" name={`process_steps.${index}.detail`} register={register} placeholder="Description of this phase..." rows={3} />
                     </div>
                     <button type="button" onClick={() => removeProcess(index)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
                 <button type="button" onClick={() => addProcess({ title: '', detail: '', icon: 'Zap', step_number: processFields.length + 1 })} className="text-sm text-blue-600 font-medium">+ Add Step</button>
               </FormSection>

               {/* 2. Challenges & Solutions */}
               <FormSection title="Challenges & Solutions" icon={Target}>
                 {challengeFields.map((field, index) => (
                   <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
                     <div className="mt-2"><Hammer className="w-5 h-5 text-gray-400" /></div>
                     <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Challenge" name={`challenges_solutions.${index}.challenge`} register={register} placeholder="Problem..." />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Icon" name={`challenges_solutions.${index}.icon`} register={register} placeholder="e.g. Zap" />
                                <Input label="Border Class" name={`challenges_solutions.${index}.challengeColor`} register={register} placeholder="e.g. border-red-500" />
                            </div>
                        </div>
                        <Textarea label="Solution" name={`challenges_solutions.${index}.solution`} register={register} placeholder="How we solved it..." rows={3} />
                     </div>
                     <button type="button" onClick={() => removeChallenge(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
                 <button type="button" onClick={() => addChallenge({ challenge: '', solution: '', icon: 'Zap', challengeColor: 'border-gray-200' })} className="text-sm text-blue-600 font-medium">+ Add Challenge</button>
               </FormSection>

               {/* 3. Flip Cards */}
               <FormSection title="Design Principles (Flip Cards)" icon={CheckCircle}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   {cardFields.map((field, index) => (
                     <div key={field.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative group">
                       <button type="button" onClick={() => removeCard(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                       <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                             <Input label="Front Title" name={`flip_cards.${index}.front_title`} register={register} />
                             <Input label="Icon Name" name={`flip_cards.${index}.icon`} register={register} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <Input label="Bg Class" name={`flip_cards.${index}.bgColor`} register={register} placeholder="bg-white" />
                              <ColorPicker label="Icon Color" name={`flip_cards.${index}.iconColor`} register={register} watch={watch} />
                          </div>
                          <Textarea label="Back Info" name={`flip_cards.${index}.back_info`} register={register} rows={2} />
                       </div>
                     </div>
                   ))}
                 </div>
                 <button type="button" onClick={() => addCard({ front_title: '', back_info: '', icon: 'Zap', bgColor: 'bg-white', iconColor: '#000000' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Card</button>
               </FormSection>

               {/* 4. Accessibility Data */}
               <FormSection title="Accessibility Insights" icon={Accessibility}>
                 <div className="space-y-3">
                   {accessFields.map((field, index) => (
                     <div key={field.id} className="flex gap-3">
                       <div className="flex-1">
                          <Input name={`accessibility_data.${index}.text`} register={register} placeholder="e.g. High contrast ratios used..." />
                       </div>
                       <button type="button" onClick={() => removeAccess(index)} className="text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                     </div>
                   ))}
                 </div>
                 <button type="button" onClick={() => addAccess({ text: '' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Insight</button>
               </FormSection>

               {/* 5. Quote & CTA */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <FormSection title="Testimonial Quote" icon={Quote}>
                    <Textarea label="Quote" name="quote_data.quote" register={register} placeholder="The best team ever..." />
                    <Input label="Author" name="quote_data.author" register={register} />
                    <Input label="Role" name="quote_data.role" register={register} />
                 </FormSection>

                 <FormSection title="Call To Action" icon={MessageSquare}>
                    <Input label="Button Text" name="call_to_action_data.button_text" register={register} placeholder="View Live" />
                    <Input label="Link URL" name="call_to_action_data.link" register={register} />
                 </FormSection>
               </div>
             </div>
           )}

          {/* --- TAB: SECTIONS --- */}
          {activeTab === 'sections' && (
            <div className="space-y-6 max-w-5xl mx-auto">
               <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="text-lg font-bold text-blue-900">Dynamic Page Sections</h3>
                    <p className="text-sm text-blue-700 mt-1">Rich text and image sections stacking vertically.</p>
                  </div>
                  <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Section</button>
               </div>
               
               <div className="space-y-6">
                {sectionFields.map((field, index) => (
                  <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Section {index + 1}</span>
                        <button type="button" onClick={() => removeSection(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Input label="Heading" name={`project_sections.${index}.heading`} register={register} placeholder="Section title..." />
                          <Textarea label="Body" name={`project_sections.${index}.body_text`} register={register} rows={5} placeholder="Content..." />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Layout</label>
                              <select {...register(`project_sections.${index}.layout_type`)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
                                <option value="image_left">Image Left</option>
                                <option value="image_right">Image Right</option>
                                <option value="full_width">Full Width</option>
                                <option value="split_side_by_side">Split</option>
                              </select>
                            </div>
                            <Input label="Bg Color" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
                          </div>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                          <Controller
                            control={control}
                            name={`project_sections.${index}.resolved_media`}
                            render={({ field: { value, onChange } }) => (
                              <MediaUploader label="Images" multiple currentMedia={value} onRemove={(id) => {
                                  const newMedia = (value || []).filter(m => m.id !== id);
                                  onChange(newMedia);
                                  setValue(`project_sections.${index}.media_asset_ids`, (watch(`project_sections.${index}.media_asset_ids`) || []).filter(x => x !== id));
                                }}
                                onUpload={(asset) => {
                                  onChange([...(value || []), asset]);
                                  setValue(`project_sections.${index}.media_asset_ids`, [...(watch(`project_sections.${index}.media_asset_ids`) || []), asset.id]);
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                  </div>
                ))}
               </div>
            </div>
          )}

           {/* --- TAB: STATS --- */}
           {activeTab === 'stats' && (
             <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
                   <button type="button" onClick={() => addStat({ title: '', value: '' })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Stat</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                   {statFields.map((field, index) => (
                     <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
                        <button type="button" onClick={() => removeStat(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                        <div className="space-y-3">
                           <Input label="Title" name={`project_stats.${index}.title`} register={register} />
                           <Input label="Value" name={`project_stats.${index}.value`} register={register} />
                           <Input label="Trend" name={`project_stats.${index}.trend`} register={register} />
                           <Input label="Icon" name={`project_stats.${index}.icon_name`} register={register} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

        </div>
      </form>
    </DndProvider>
  );
};

export default AdminProjectEditor;