// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // import {
// // //   ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, UploadCloud, X, Palette, Type, Image, Trash
// // // } from 'lucide-react';
// // // import { motion, AnimatePresence, Reorder } from 'framer-motion';
// // // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // // import {
// // //   getEditorData,
// // //   saveProject,
// // //   getStorageUrl
// // // } from '../../../api/projectsadmin'; 
// // // import toast, { Toaster } from 'react-hot-toast';
// // // import { useAuth } from '../../../context/AuthContext';
// // // import Select from 'react-select'; // npm install react-select

// // // // --- Reusable Form Components ---
// // // const FormInput = ({ label, name, register, errors, ...rest }) => (
// // //   <div className="flex flex-col">
// // //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // //     <input 
// // //       id={name} 
// // //       {...register(name)} 
// // //       {...rest} 
// // //       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// // //     />
// // //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
// // //   </div>
// // // );

// // // const FormTextarea = ({ label, name, register, errors, ...rest }) => (
// // //   <div className="flex flex-col">
// // //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // //     <textarea 
// // //       id={name} 
// // //       {...register(name)} 
// // //       {...rest} 
// // //       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// // //       rows="4"
// // //     />
// // //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
// // //   </div>
// // // );

// // // // --- Reusable ImageUpload Component ---
// // // const ImageUpload = ({ label, fileFieldName, mediaAssetFieldName, originalMediaIdFieldName, setValue, watch, aspect = 'aspect-video', objectFit = 'object-cover' }) => {
// // //   const file = watch(fileFieldName);
// // //   const mediaAsset = watch(mediaAssetFieldName);
// // //   const [preview, setPreview] = useState(null);

// // //   useEffect(() => {
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => setPreview(reader.result);
// // //       reader.readAsDataURL(file);
// // //     } else if (mediaAsset) {
// // //       setPreview(getStorageUrl(mediaAsset));
// // //     } else {
// // //       setPreview(null);
// // //     }
// // //   }, [file, mediaAsset]);

// // //   const handleFileChange = (e) => {
// // //     const newFile = e.target.files[0];
// // //     if (newFile) {
// // //       const currentMedia = watch(mediaAssetFieldName);
// // //       if (currentMedia) {
// // //         setValue(originalMediaIdFieldName, currentMedia.id, { shouldDirty: true });
// // //       }
// // //       setValue(fileFieldName, newFile, { shouldDirty: true });
// // //     }
// // //   };

// // //   const handleRemoveImage = () => {
// // //     const currentMedia = watch(mediaAssetFieldName);
// // //     if (currentMedia) {
// // //       setValue(originalMediaIdFieldName, currentMedia.id, { shouldDirty: true });
// // //     }
// // //     setValue(fileFieldName, null, { shouldDirty: true });
// // //     setValue(mediaAssetFieldName, null, { shouldDirty: true });
// // //     setPreview(null);
// // //   };

// // //   return (
// // //     <div className="flex flex-col">
// // //       <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // //       <div className={`w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden relative ${aspect}`}>
// // //         {preview ? (
// // //           <>
// // //             <img src={preview} alt="Preview" className={`w-full h-full ${objectFit}`} />
// // //             <button
// // //               type="button"
// // //               onClick={handleRemoveImage}
// // //               className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700"
// // //               title="Remove image"
// // //             >
// // //               <X className="w-4 h-4" />
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <ImageIcon className="w-10 h-10 text-gray-400" />
// // //         )}
// // //       </div>
// // //       <div className="mt-2">
// // //         <label htmlFor={fileFieldName} className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
// // //           <UploadCloud className="w-4 h-4" />
// // //           <span>{file ? file.name : 'Upload an image'}</span>
// // //         </label>
// // //         <input
// // //           type="file"
// // //           id={fileFieldName}
// // //           className="hidden"
// // //           accept="image/*"
// // //           onChange={handleFileChange}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // // // --- Main Admin Page Component ---
// // // const AdminProjectEditor = () => {
// // //   const { slug } = useParams();
// // //   const navigate = useNavigate();
// // //   const { user } = useAuth();
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [isNewProject, setIsNewProject] = useState(false);

// // //   // Lookup tables
// // //   const [allTools, setAllTools] = useState([]);
// // //   const [allCategories, setAllCategories] = useState([]);

// // //   const { register, control, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting, isDirty } } = useForm({
// // //     defaultValues: {
// // //       title: '',
// // //       slug: '',
// // //       description: '',
// // //       hero_media_id: null,
// // //       detail_hero_media_id: null,
// // //       video_url: '',
// // //       client: '',
// // //       role: '',
// // //       timeline: '',
// // //       tools: [],
// // //       categories: [],
// // //       content: [],
// // //       gallery: []
// // //     }
// // //   });

// // //   const { fields: contentFields, append: appendContent, remove: removeContent, move: moveContent } = useFieldArray({
// // //     control, name: "content"
// // //   });
  
// // //   const { fields: galleryFields, append: appendGallery, remove: removeGallery, move: moveGallery } = useFieldArray({
// // //     control, name: "gallery"
// // //   });

// // //   // --- Data Loading ---
// // //   useEffect(() => {
// // //     const loadEditor = async () => {
// // //       setIsLoading(true);
// // //       if (!slug || slug === 'new') {
// // //         setIsNewProject(true);
// // //       }
// // //       const { project, allTools, allCategories, error } = await getEditorData(slug);
      
// // //       if (error) {
// // //         toast.error('Failed to load project data.');
// // //         console.error(error);
// // //       } else {
// // //         reset(project);
// // //         setAllTools(allTools);
// // //         setAllCategories(allCategories);
// // //       }
// // //       setIsLoading(false);
// // //     };
// // //     loadEditor();
// // //   }, [slug, reset]);

// // //   // --- Form Submission ---
// // //   const onSubmit = async (data) => {
// // //     if (!user) {
// // //       toast.error('You must be logged in to save.');
// // //       return;
// // //     }
    
// // //     const toastId = toast.loading(isNewProject ? 'Creating project...' : 'Updating project...');
// // //     const { success, error, data: savedProject } = await saveProject(data, user.id);
    
// // //     toast.dismiss(toastId);
// // //     if (success) {
// // //       toast.success('Project saved successfully!');
// // //       // If it was a new project, we redirect to the *new* slug
// // //       if (isNewProject) {
// // //         navigate(`/admin/editor/projects/${savedProject.slug}`);
// // //       } else {
// // //         // Just reset the form to clear dirty state
// // //         reset(data);
// // //       }
// // //     } else {
// // //       toast.error(`Failed to save: ${error.message}`);
// // //     }
// // //   };

// // //   // --- Slug Generation ---
// // //   const generateSlug = () => {
// // //     const title = watch('title');
// // //     const newSlug = title
// // //       .toLowerCase()
// // //       .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
// // //       .replace(/[\s_]+/g, '-')     // Replace spaces with hyphens
// // //       .replace(/--+/g, '-');      // Remove consecutive hyphens
// // //     setValue('slug', newSlug, { shouldDirty: true });
// // //   };
  
// // //   // --- Gallery Multi-Upload ---
// // //   const handleGalleryUpload = (e) => {
// // //     const files = Array.from(e.target.files);
// // //     files.forEach(file => {
// // //       appendGallery({
// // //         file: file,
// // //         media_id: null,
// // //         media_assets: null,
// // //         originalMediaId: null
// // //       });
// // //     });
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
// // //       <Toaster position="top-center" />
      
// // //       <form onSubmit={handleSubmit(onSubmit)}>
// // //         {/* --- Sticky Header --- */}
// // //         <div className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-sm pb-4 mb-6 border-b border-gray-200">
// // //           <header className="flex flex-col md:flex-row items-center justify-between gap-4">
// // //             <div className="flex-1 w-full">
// // //               <Link to="/admin/projects" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-sm mb-1">
// // //                 <ArrowLeft className="w-4 h-4" />
// // //                 Back to All Projects
// // //               </Link>
// // //               <h1 className="text-3xl font-bold text-gray-900 truncate">
// // //                 {isNewProject ? 'Create New Project' : `Edit: ${watch('title') || '...'}`}
// // //               </h1>
// // //             </div>
// // //             <button
// // //               type="submit"
// // //               disabled={isSubmitting || !isDirty}
// // //               className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
// // //             >
// // //               {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
// // //               {isSubmitting ? 'Saving...' : 'Save Project'}
// // //             </button>
// // //           </header>
// // //         </div>

// // //         {/* --- Main Content Grid --- */}
// // //         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
// // //           {/* --- Main Column (Content) --- */}
// // //           <div className="lg:col-span-8 space-y-8">

// // //             {/* --- Main Details Card --- */}
// // //             <div className="bg-white rounded-lg shadow-md border border-gray-200">
// // //               <header className="p-4 border-b border-gray-200">
// // //                 <h2 className="text-xl font-semibold text-gray-900">Main Details</h2>
// // //               </header>
// // //               <div className="p-6 space-y-6">
// // //                 <FormInput 
// // //                   label="Project Title" 
// // //                   name="title" 
// // //                   register={register} 
// // //                   errors={errors} 
// // //                   rules={{ required: "Title is required" }}
// // //                 />
// // //                 <div className="flex flex-col">
// // //                   <label htmlFor="slug" className="mb-2 text-sm font-medium text-gray-700">Project Slug</label>
// // //                   <div className="flex gap-2">
// // //                     <input 
// // //                       id="slug" 
// // //                       {...register("slug", { required: "Slug is required" })} 
// // //                       className={`flex-1 p-2 border rounded-md ${errors.slug ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// // //                     />
// // //                     <button type="button" onClick={generateSlug} className="px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
// // //                       Generate
// // //                     </button>
// // //                   </div>
// // //                   {errors.slug && <span className="text-red-500 text-sm mt-1">{errors.slug.message}</span>}
// // //                 </div>
// // //                 <FormTextarea 
// // //                   label="Short Description" 
// // //                   name="description" 
// // //                   register={register} 
// // //                   errors={errors} 
// // //                 />
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <ImageUpload
// // //                     label="List Hero Image (For /projects page)"
// // //                     fileFieldName="file_hero"
// // //                     mediaAssetFieldName="hero_media"
// // //                     originalMediaIdFieldName="original_hero_media_id"
// // //                     setValue={setValue}
// // //                     watch={watch}
// // //                     aspect="aspect-[4/3]"
// // //                   />
// // //                   <ImageUpload
// // //                     label="Detail Hero Image (For /projects/[slug] page)"
// // //                     fileFieldName="file_detail_hero"
// // //                     mediaAssetFieldName="detail_hero_media"
// // //                     originalMediaIdFieldName="original_detail_hero_media_id"
// // //                     setValue={setValue}
// // //                     watch={watch}
// // //                     aspect="aspect-[16/9]"
// // //                   />
// // //                 </div>
// // //                 <FormInput 
// // //                   label="Video URL (Overrides Detail Hero Image)" 
// // //                   name="video_url" 
// // //                   register={register} 
// // //                   errors={errors} 
// // //                   placeholder="Optional: https://..."
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* --- Dynamic Content Blocks Card --- */}
// // //             <div className="bg-white rounded-lg shadow-md border border-gray-200">
// // //               <header className="p-4 border-b border-gray-200">
// // //                 <h2 className="text-xl font-semibold text-gray-900">Project Content Blocks</h2>
// // //                 <p className="text-sm text-gray-500">Drag and drop blocks to re-order the project page content.</p>
// // //               </header>
// // //               <div className="p-6 space-y-4">
// // //                 <Reorder.Group axis="y" values={contentFields} onReorder={moveContent}>
// // //                   {contentFields.map((field, index) => (
// // //                     <Reorder.Item key={field.id} value={field} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
// // //                       <div className="flex justify-between items-center mb-4">
// // //                         <div className="flex items-center gap-2">
// // //                           <button type="button" className="cursor-grab text-gray-400 hover:text-gray-600">
// // //                             <GripVertical className="w-5 h-5" />
// // //                           </button>
// // //                           <span className="text-sm font-medium text-gray-700 capitalize flex items-center gap-2">
// // //                             {field.type === 'text' && <Type className="w-4 h-4" />}
// // //                             {field.type === 'image' && <Image className="w-4 h-4" />}
// // //                             {field.type === 'palette' && <Palette className="w-4 h-4" />}
// // //                             {field.type} Block
// // //                           </span>
// // //                         </div>
// // //                         <button type="button" onClick={() => removeContent(index)} className="text-red-500 hover:text-red-700">
// // //                           <Trash2 className="w-4 h-4" />
// // //                         </button>
// // //                       </div>
                      
// // //                       {/* --- Dynamic Form Inputs --- */}
// // //                       <div className="space-y-4">
// // //                         {field.type === 'text' && (
// // //                           <>
// // //                             <FormInput 
// // //                               label="Title" 
// // //                               name={`content.${index}.content.title`} 
// // //                               register={register} 
// // //                               errors={errors} 
// // //                             />
// // //                             <FormTextarea
// // //                               label="Body" 
// // //                               name={`content.${index}.content.body`} 
// // //                               register={register} 
// // //                               errors={errors} 
// // //                               rows={6}
// // //                             />
// // //                           </>
// // //                         )}
// // //                         {field.type === 'image' && (
// // //                           <>
// // //                             <ImageUpload
// // //                               label="Image"
// // //                               fileFieldName={`content.${index}.file`}
// // //                               mediaAssetFieldName={`content.${index}.content.media_assets`}
// // //                               originalMediaIdFieldName={`content.${index}.originalMediaId`}
// // //                               setValue={setValue}
// // //                               watch={watch}
// // //                             />
// // //                             <FormInput 
// // //                               label="Caption (Optional)" 
// // //                               name={`content.${index}.content.caption`} 
// // //                               register={register} 
// // //                               errors={errors} 
// // //                             />
// // //                           </>
// // //                         )}
// // //                         {field.type === 'palette' && (
// // //                           <FormInput 
// // //                             label="Colors (Comma-separated hex values)" 
// // //                             name={`content.${index}.content.colors`} 
// // //                             register={register} 
// // //                             errors={errors}
// // //                             placeholder="#FFFFFF, #000000, #2563EB"
// // //                           />
// // //                         )}
// // //                       </div>
// // //                     </Reorder.Item>
// // //                   ))}
// // //                 </Reorder.Group>

// // //                 {/* --- Add Block Buttons --- */}
// // //                 <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
// // //                   <button type="button" onClick={() => appendContent({ type: 'text', content: { title: '', body: '' } })} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md flex items-center gap-1">
// // //                     <Type className="w-4 h-4" /> Add Text Block
// // //                   </button>
// // //                   <button type="button" onClick={() => appendContent({ type: 'image', content: { media_id: null, caption: '' } })} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md flex items-center gap-1">
// // //                     <Image className="w-4 h-4" /> Add Image Block
// // //                   </button>
// // //                   <button type="button" onClick={() => appendContent({ type: 'palette', content: { colors: [] } })} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md flex items-center gap-1">
// // //                     <Palette className="w-4 h-4" /> Add Palette Block
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* --- Gallery Card --- */}
// // //             <div className="bg-white rounded-lg shadow-md border border-gray-200">
// // //               <header className="p-4 border-b border-gray-200">
// // //                 <h2 className="text-xl font-semibold text-gray-900">Project Gallery</h2>
// // //                 <p className="text-sm text-gray-500">Add and reorder gallery images.</p>
// // //               </header>
// // //               <div className="p-6 space-y-4">
// // //                 <Reorder.Group axis="y" values={galleryFields} onReorder={moveGallery}>
// // //                   {galleryFields.map((field, index) => (
// // //                     <Reorder.Item key={field.id} value={field} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
// // //                       <div className="flex items-start gap-4">
// // //                         <button type="button" className="cursor-grab text-gray-400 hover:text-gray-600 mt-2">
// // //                           <GripVertical className="w-5 h-5" />
// // //                         </button>
// // //                         <div className="flex-1">
// // //                           <ImageUpload
// // //                             label={null}
// // //                             fileFieldName={`gallery.${index}.file`}
// // //                             mediaAssetFieldName={`gallery.${index}.media_assets`}
// // //                             originalMediaIdFieldName={`gallery.${index}.originalMediaId`}
// // //                             setValue={setValue}
// // //                             watch={watch}
// // //                             aspect="aspect-video"
// // //                           />
// // //                         </div>
// // //                         <button type="button" onClick={() => removeGallery(index)} className="text-red-500 hover:text-red-700 mt-2">
// // //                           <Trash className="w-5 h-5" />
// // //                         </button>
// // //                       </div>
// // //                     </Reorder.Item>
// // //                   ))}
// // //                 </Reorder.Group>
                
// // //                 <div className="pt-4 border-t border-gray-200">
// // //                   <label htmlFor="gallery-multi-upload" className="w-full text-center cursor-pointer text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md py-2 px-4 flex items-center justify-center gap-2">
// // //                     <UploadCloud className="w-4 h-4" />
// // //                     Add Image(s) to Gallery
// // //                   </label>
// // //                   <input
// // //                     type="file"
// // //                     id="gallery-multi-upload"
// // //                     className="hidden"
// // //                     accept="image/*"
// // //                     multiple
// // //                     onChange={handleGalleryUpload}
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </div>

// // //           </div>

// // //           {/* --- Sidebar Column (Meta) --- */}
// // //           <div className="lg:col-span-4 space-y-8">
// // //             <div className="bg-white rounded-lg shadow-md border border-gray-200 sticky top-32">
// // //               <header className="p-4 border-b border-gray-200">
// // //                 <h2 className="text-xl font-semibold text-gray-900">Project Info</h2>
// // //               </header>
// // //               <div className="p-6 space-y-6">
// // //                 <FormInput 
// // //                   label="Client" 
// // //                   name="client" 
// // //                   register={register} 
// // //                   errors={errors} 
// // //                 />
// // //                 <FormInput 
// // //                   label="Role" 
// // //                   name="role" 
// // //                   register={register} 
// // //                   errors={errors} 
// // //                   placeholder="e.g., UI/UX Design, Development"
// // //                 />
// // //                 <FormInput 
// // //                   label="Timeline" 
// // //                   name="timeline" 
// // //                   register={register} 
// // //                   errors={errors} 
// // //                   placeholder="e.g., 2 Weeks"
// // //                 />
                
// // //                 <div className="flex flex-col">
// // //                   <label className="mb-2 text-sm font-medium text-gray-700">Categories</label>
// // //                   <Controller
// // //                     name="categories"
// // //                     control={control}
// // //                     render={({ field }) => (
// // //                       <Select
// // //                         {...field}
// // //                         isMulti
// // //                         options={allCategories}
// // //                         getOptionLabel={(opt) => opt.name}
// // //                         getOptionValue={(opt) => opt.id}
// // //                         value={allCategories.filter(cat => field.value?.some(v => v.id === cat.id))}
// // //                         onChange={(selected) => field.onChange(selected)}
// // //                         className="react-select-container"
// // //                         classNamePrefix="react-select"
// // //                       />
// // //                     )}
// // //                   />
// // //                 </div>
                
// // //                 <div className="flex flex-col">
// // //                   <label className="mb-2 text-sm font-medium text-gray-700">Tools</label>
// // //                   <Controller
// // //                     name="tools"
// // //                     control={control}
// // //                     render={({ field }) => (
// // //                       <Select
// // //                         {...field}
// // //                         isMulti
// // //                         options={allTools}
// // //                         getOptionLabel={(opt) => opt.name}
// // //                         getOptionValue={(opt) => opt.id}
// // //                         value={allTools.filter(tool => field.value?.some(v => v.id === tool.id))}
// // //                         onChange={(selected) => field.onChange(selected)}
// // //                         className="react-select-container"
// // //                         classNamePrefix="react-select"
// // //                       />
// // //                     )}
// // //                   />
// // //                 </div>

// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default AdminProjectEditor;




// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Link, useParams, useNavigate } from 'react-router-dom';
// // import {
// //   ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, UploadCloud, X, Palette, Type, RefreshCw
// // } from 'lucide-react';
// // import { motion, AnimatePresence, Reorder } from 'framer-motion';
// // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // import {
// //   getEditorData,
// //   saveProject,
// //   uploadMedia,
// //   getStorageUrl,
// //   deleteMedia,
// // } from '../../../api/projectsadmin'; // Using the full admin API
// // import toast, { Toaster } from 'react-hot-toast';
// // import Select from 'react-select'; // npm install react-select
// // import { DndProvider } from 'react-dnd'; // npm install react-dnd react-dnd-html5-backend
// // import { HTML5Backend } from 'react-dnd-html5-backend';

// // // --- Reusable Form Components ---
// // // const FormInput = ({ label, name, register, errors, ...rest }) => (
// // //   <div className="flex flex-col w-full">
// // //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // //     <input
// // //       id={name}
// // //       {...register(name)}
// // //       {...rest}
// // //       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// // //     />
// // //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
// // //   </div>
// // // );

// // const FormInput = ({ label, name, register, error, ...rest }) => ( // Renamed 'errors' to 'error'
// //   <div className="flex flex-col w-full">
// //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// //     <input
// //       id={name}
// //       {...register(name)}
// //       {...rest}
// //       className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// //     />
// //     {error && <span className="text-red-500 text-sm mt-1">{error.message || 'This field is required'}</span>}
// //   </div>
// // );

// // const FormTextarea = ({ label, name, register, errors, ...rest }) => (
// //   <div className="flex flex-col w-full">
// //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// //     <textarea
// //       id={name}
// //       {...register(name)}
// //       {...rest}
// //       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// //       rows={4}
// //     />
// //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
// //   </div>
// // );

// // // --- Media Uploader Component ---
// // const MediaUploader = ({ label, mediaId, mediaPath, onUpload, onRemove, error }) => {
// //   const [isUploading, setIsUploading] = useState(false);
// //   const imageUrl = mediaPath ? getStorageUrl(mediaPath) : null;

// //   const handleFileChange = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     setIsUploading(true);
// //     const toastId = toast.loading('Uploading image...');
// //     try {
// //       const { media_asset_id, file_path } = await uploadMedia(file);
// //       onUpload(media_asset_id, file_path); // Pass both ID and path back
// //       toast.success('Image uploaded', { id: toastId });
// //     } catch (err) {
// //       toast.error('Upload failed', { id: toastId });
// //       console.error(err);
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col w-full">
// //       <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// //       <div className="w-full p-4 border-2 border-dashed rounded-lg border-gray-300">
// //         {isUploading ? (
// //           <div className="flex flex-col items-center justify-center h-32">
// //             <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
// //             <span className="mt-2 text-sm text-gray-500">Uploading...</span>
// //           </div>
// //         ) : imageUrl ? (
// //           <div className="relative group">
// //             <img src={imageUrl} alt="Uploaded media" className="w-full h-32 object-contain rounded-md" />
// //             <button
// //               type="button"
// //               onClick={onRemove}
// //               className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// //             >
// //               <Trash2 className="w-4 h-4" />
// //             </button>
// //           </div>
// //         ) : (
// //           <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
// //             <UploadCloud className="w-8 h-8 text-gray-400" />
// //             <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
// //             <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
// //           </label>
// //         )}
// //       </div>
// //       {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
// //     </div>
// //   );
// // };

// // // --- Content Block Editor ---
// // const ContentBlockEditor = ({ control, register, errors }) => {
// //   const { fields, append, remove, move } = useFieldArray({
// //     control,
// //     name: "content",
// //   });

// //   const addBlock = (type) => {
// //     let content = {};
// //     if (type === 'text') content = { title: 'New Section', body: '...' };
// //     if (type === 'image') content = { media_id: null, caption: '', media_path: null };
// //     if (type === 'palette') content = { colors: ['#FFFFFF', '#000000'] };
// //     append({ type, content });
// //   };

// //   const handleImageUpload = (index, media_id, file_path) => {
// //     // This is tricky, we need to update the nested field
// //     // We'll update the 'content' field directly in the form
// //     const field = fields[index];
// //     field.content.media_id = media_id;
// //     field.content.media_path = file_path;
// //     // This is not standard react-hook-form, but necessary for nested state
// //     // A better way would be to use setValue, but this is simpler for now
// //   };

// //   return (
// //     <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
// //       <h3 className="text-lg font-medium text-gray-900 mb-4">Content Blocks</h3>
// //       <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
// //         <AnimatePresence>
// //           {fields.map((field, index) => (
// //             <Reorder.Item key={field.id} value={field} className="mb-4">
// //               <motion.div
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, x: -50 }}
// //                 className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
// //               >
// //                 <div className="flex items-center justify-between mb-4">
// //                   <div className="flex items-center gap-2">
// //                     <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
// //                     <span className="font-medium capitalize">{field.type} Block</span>
// //                   </div>
// //                   <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
// //                     <Trash2 className="w-4 h-4" />
// //                   </button>
// //                 </div>

// //                 {/* --- Block Specific Fields --- */}
// //                 {field.type === 'text' && (
// //                   <div className="space-y-4">
// //                     <FormInput
// //                       label="Title"
// //                       name={`content.${index}.content.title`}
// //                       register={register}
// //                       errors={errors?.content?.[index]?.content || {}}
// //                     />
// //                     <FormTextarea
// //                       label="Body"
// //                       name={`content.${index}.content.body`}
// //                       register={register}
// //                       errors={errors?.content?.[index]?.content || {}}
// //                     />
// //                   </div>
// //                 )}

// //                 {field.type === 'image' && (
// //                   <div className="space-y-4">
// //                     <MediaUploader
// //                       label="Image"
// //                       mediaId={field.content.media_id}
// //                       mediaPath={field.content.media_path}
// //                       onUpload={(id, path) => {
// //                         // Manually update the form state for this nested field
// //                         // This is a limitation of RHF with complex nested state
// //                         field.content.media_id = id;
// //                         field.content.media_path = path;
// //                       }}
// //                       onRemove={() => {
// //                         field.content.media_id = null;
// //                         field.content.media_path = null;
// //                       }}
// //                     />
// //                     <FormInput
// //                       label="Caption"
// //                       name={`content.${index}.content.caption`}
// //                       register={register}
// //                       errors={errors?.content?.[index]?.content || {}}
// //                     />
// //                   </div>
// //                 )}
                
// //                 {field.type === 'palette' && (
// //                   <FormInput
// //                     label="Colors (comma-separated hex codes)"
// //                     name={`content.${index}.content.colors`}
// //                     register={register}
// //                     errors={errors?.content?.[index]?.content || {}}
// //                     // We need to join/split the array for the input
// //                     // This requires a Controller or custom logic, simplifying for now
// //                     // Or we just store as string
// //                   />
// //                   // A real color palette editor would be more complex
// //                 )}

// //               </motion.div>
// //             </Reorder.Item>
// //           ))}
// //         </AnimatePresence>
// //       </Reorder.Group>
      
// //       <div className="flex gap-2 mt-4">
// //         <button type="button" onClick={() => addBlock('text')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
// //           <Type className="w-4 h-4" /> Add Text
// //         </button>
// //         <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
// //           <ImageIcon className="w-4 h-4" /> Add Image
// //         </button>
// //         <button type="button" onClick={() => addBlock('palette')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
// //           <Palette className="w-4 h-4" /> Add Palette
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Gallery Editor Component ---
// // const GalleryEditor = ({ control }) => {
// //   const { fields, append, remove, move } = useFieldArray({
// //     control,
// //     name: "gallery",
// //   });

// //   const [isUploading, setIsUploading] = useState(false);

// //   const handleFilesChange = async (e) => {
// //     const files = Array.from(e.target.files);
// //     if (files.length === 0) return;

// //     setIsUploading(true);
// //     const toastId = toast.loading(`Uploading ${files.length} images...`);

// //     try {
// //       const uploadPromises = files.map(uploadMedia);
// //       const results = await Promise.all(uploadPromises);

// //       results.forEach(({ media_asset_id, file_path }) => {
// //         append({
// //           media: {
// //             id: media_asset_id,
// //             file_path: file_path,
// //           },
// //         });
// //       });
// //       toast.success('Upload complete', { id: toastId });
// //     } catch (err) {
// //       toast.error('Some uploads failed', { id: toastId });
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
// //       <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery</h3>
// //       <label className="flex flex-col items-center justify-center w-full p-6 mb-4 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:bg-gray-100">
// //         <UploadCloud className="w-8 h-8 text-gray-400" />
// //         <span className="mt-2 text-sm text-gray-500">
// //           {isUploading ? 'Uploading...' : 'Click or drag to upload multiple images'}
// //         </span>
// //         <input
// //           type="file"
// //           className="hidden"
// //           multiple
// //           accept="image/*"
// //           onChange={handleFilesChange}
// //           disabled={isUploading}
// //         />
// //       </label>

// //       <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
// //         <AnimatePresence>
// //           {fields.map((field, index) => (
// //             <Reorder.Item key={field.id} value={field} className="mb-2">
// //               <motion.div
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: 50 }}
// //                 className="flex items-center gap-3 p-2 bg-white border border-gray-300 rounded-md"
// //               >
// //                 <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
// //                 <img
// //                   src={getStorageUrl(field.media.file_path)}
// //                   className="w-16 h-10 object-cover rounded-sm"
// //                   alt="Gallery thumb"
// //                 />
// //                 <span className="flex-1 text-sm truncate text-gray-600">{field.media.file_path.split('/').pop()}</span>
// //                 <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
// //                   <Trash2 className="w-4 h-4" />
// //                 </button>
// //               </motion.div>
// //             </Reorder.Item>
// //           ))}
// //         </AnimatePresence>
// //       </Reorder.Group>
// //     </div>
// //   );
// // };


// // // --- Main Editor Component ---
// // const AdminProjectEditor = () => {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();
// //   const isCreating = slug === 'new';
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [projectId, setProjectId] = useState(null);
// //   const [allCategories, setAllCategories] = useState([]);
// //   const [allTools, setAllTools] = useState([]);
// //   const [isSaving, setIsSaving] = useState(false);

// //   const { register, handleSubmit, control, reset, setValue, watch } = useForm({
// //     defaultValues: {
// //       title: '',
// //       slug: '',
// //       description: '',
// //       client: '',
// //       role: '',
// //       timeline: '',
// //       video_url: '',
// //       hero_media_id: null,
// //       hero_media_path: null,
// //       detail_hero_media_id: null,
// //       detail_hero_media_path: null,
// //       categories: [],
// //       tools: [],
// //       content: [],
// //       gallery: [],
// //     },
// //   });
// //   const { errors } = {}; // Add proper error handling with react-hook-form resolvers if needed

// //   // Watch for title changes to suggest slug
// //   const titleWatch = watch('title');

// //   const generateSlug = () => {
// //     const slugified = (titleWatch || '')
// //       .toString()
// //       .toLowerCase()
// //       .trim()
// //       .replace(/\s+/g, '-')
// //       .replace(/[^\w-]+/g, '')
// //       .replace(/--+/g, '-');
// //     setValue('slug', slugified, { shouldValidate: true });
// //   };


// //   // Load all data
// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const { project, allCategories, allTools } = await getEditorData(slug);
// //         setAllCategories(allCategories || []);
// //         setAllTools(allTools || []);

// //         if (!isCreating && project) {
// //           // Edit mode: set form values
// //           setProjectId(project.id);
// //           reset({
// //             title: project.title || '',
// //             slug: project.slug || '',
// //             description: project.description || '',
// //             client: project.client || '',
// //             role: project.role || '',
// //             timeline: project.timeline || '',
// //             video_url: project.video_url || '',
// //             hero_media_id: project.hero_media_id,
// //             hero_media_path: project.hero_media_path,
// //             detail_hero_media_id: project.detail_hero_media_id,
// //             detail_hero_media_path: project.detail_hero_media_path,
// //             categories: project.categories || [],
// //             tools: project.tools || [],
// //             content: project.content.map(c => ({...c, content: JSON.parse(c.content)})) || [], // Parse content JSON
// //             gallery: project.gallery || [],
// //           });
// //         }
// //       } catch (error) {
// //         toast.error(`Error loading data: ${error.message}`);
// //         navigate('/admin/projects');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     loadData();
// //   }, [slug, isCreating, reset, navigate]);

// //   // Main save function
// //   const onSubmit = async (formData) => {
// //     setIsSaving(true);
// //     const toastId = toast.loading(isCreating ? 'Creating project...' : 'Saving changes...');

// //     // --- Prepare Data for API ---
// //     // 1. Transform palette arrays back into strings if needed, or handle in API
// //     //    For now, we'll assume the API can take the JSON
// //     // 2. We need to re-serialize the 'content' blocks' content field
// //     const preparedData = {
// //       ...formData,
// //       content: formData.content.map(block => {
// //         // Special handling for palette: convert comma-separated string to array
// //         if (block.type === 'palette' && typeof block.content.colors === 'string') {
// //           block.content.colors = block.content.colors.split(',').map(s => s.trim());
// //         }
// //         return {
// //           ...block,
// //           content: block.content // API expects this as a JSON object
// //         };
// //       }),
// //       // Map gallery to match what API expects (if needed)
// //       // The API function `saveProject` is built to handle this `formData` shape
// //     };
    
// //     // Call the API
// //     const { success, error, projectSlug } = await saveProject(preparedData, projectId);

// //     if (success) {
// //       toast.success(isCreating ? 'Project created!' : 'Project saved!', { id: toastId });
// //       // Navigate to the *new* slug if creating, or the *updated* slug
// //       navigate(`/admin/editor/projects/${projectSlug}`);
// //       // If we just created, we need to switch from 'new' to the real slug
// //       if (isCreating) {
// //         navigate(`/admin/editor/projects/${projectSlug}`, { replace: true });
// //       }
// //     } else {
// //       toast.error(`Error: ${error}`, { id: toastId });
// //     }
// //     setIsSaving(false);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
// //       </div>
// //     );
// //   }

// //   // Get current media paths for the uploaders
// //   const heroMediaPath = watch('hero_media_path');
// //   const detailHeroMediaPath = watch('detail_hero_media_path');

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <Toaster position="top-right" />
// //       <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
// //         {/* Sticky Header */}
// //         <div className="sticky top-0 z-40 bg-white shadow-sm">
// //           <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
// //             <div className="flex items-center gap-3">
// //               <Link to="/admin/projects" className="p-2 rounded-lg hover:bg-gray-100">
// //                 <ArrowLeft className="w-6 h-6 text-gray-700" />
// //               </Link>
// //               <div>
// //                 <h1 className="text-xl font-bold text-gray-900">
// //                   {isCreating ? 'Create New Project' : 'Edit Project'}
// //                 </h1>
// //                 {!isCreating && <span className="text-sm text-gray-500">/projects/{watch('slug')}</span>}
// //               </div>
// //             </div>
// //             <button
// //               type="submit"
// //               disabled={isSaving}
// //               className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
// //             >
// //               {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
// //               {isSaving ? (isCreating ? 'Creating...' : 'Saving...') : (isCreating ? 'Create Project' : 'Save Changes')}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Main Editor Layout */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 md:p-8">
          
// //           {/* --- Main Content Column --- */}
// //           <div className="lg:col-span-2 space-y-6">
// //             <div className="p-6 bg-white rounded-lg shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Main Details</h2>
// //               <div className="space-y-4">
// //                 <FormInput
// //                   label="Project Title"
// //                   name="title"
// //                   register={register}
// //                   errors={errors}
// //                   placeholder="e.g. Zenith Motion"
// //                 />
                
// //                 <div className="flex flex-col">
// //                   <label className="mb-2 text-sm font-medium text-gray-700">Project Slug</label>
// //                   <div className="flex gap-2">
// //                     <input
// //                       {...register('slug')}
// //                       placeholder="e.g. zenith-motion"
// //                       className="flex-1 p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={generateSlug}
// //                       title="Generate from title"
// //                       className="p-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
// //                     >
// //                       <RefreshCw className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <FormTextarea
// //                   label="Short Description"
// //                   name="description"
// //                   register={register}
// //                   errors={errors}
// //                   placeholder="A one-sentence summary for the project grid."
// //                 />
// //               </div>
// //             </div>

// //             <div className="p-6 bg-white rounded-lg shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Info</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <FormInput label="Client" name="client" register={register} errors={errors} />
// //                 <FormInput label="Role" name="role" register={register} errors={errors} placeholder="e.g. Lead Designer" />
// //                 <FormInput label="Timeline" name="timeline" register={register} errors={errors} placeholder="e.g. 6 Weeks" />
// //                 <FormInput label="Video URL" name="video_url" register={register} errors={errors} placeholder="Optional: http://.../video.mp4" />
// //               </div>
// //             </div>

// //             {/* --- Content Blocks --- */}
// //             <ContentBlockEditor control={control} register={register} errors={errors} />
            
// //             {/* --- Gallery --- */}
// //             <GalleryEditor control={control} />

// //           </div>
          
// //           {/* --- Sidebar Column --- */}
// //           <div className="lg:col-span-1 space-y-6">
            
// //             <div className="p-6 bg-white rounded-lg shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
// //               <div className="space-y-4">
// //                 <MediaUploader
// //                   label="Hero Image (Grid)"
// //                   mediaId={watch('hero_media_id')}
// //                   mediaPath={heroMediaPath}
// //                   onUpload={(id, path) => {
// //                     setValue('hero_media_id', id);
// //                     setValue('hero_media_path', path);
// //                   }}
// //                   onRemove={() => {
// //                     setValue('hero_media_id', null);
// //                     setValue('hero_media_path', null);
// //                   }}
// //                 />
// //                 <MediaUploader
// //                   label="Detail Hero (Page Top)"
// //                   mediaId={watch('detail_hero_media_id')}
// //                   mediaPath={detailHeroMediaPath}
// //                   onUpload={(id, path) => {
// //                     setValue('detail_hero_media_id', id);
// //                     setValue('detail_hero_media_path', path);
// //                   }}
// //                   onRemove={() => {
// //                     setValue('detail_hero_media_id', null);
// //                     setValue('detail_hero_media_path', null);
// //                   }}
// //                 />
// //               </div>
// //             </div>
            
// //             <div className="p-6 bg-white rounded-lg shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-4">Taxonomies</h2>
// //               <div className="space-y-4">
// //                 <div className="flex flex-col">
// //                   <label className="mb-2 text-sm font-medium text-gray-700">Categories</label>
// //                   <Controller
// //                     name="categories"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <Select
// //                         {...field}
// //                         isMulti
// //                         options={allCategories}
// //                         getOptionLabel={(opt) => opt.name}
// //                         getOptionValue={(opt) => opt.id}
// //                         value={allCategories.filter(cat => field.value?.some(v => v.id === cat.id))}
// //                         onChange={(selected) => field.onChange(selected)}
// //                         className="react-select-container"
// //                         classNamePrefix="react-select"
// //                       />
// //                     )}
// //                   />
// //                 </div>
                
// //                 <div className="flex flex-col">
// //                   <label className="mb-2 text-sm font-medium text-gray-700">Tools</label>
// //                   <Controller
// //                     name="tools"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <Select
// //                         {...field}
// //                         isMulti
// //                         options={allTools}
// //                         getOptionLabel={(opt) => opt.name}
// //                         getOptionValue={(opt) => opt.id}
// //                         value={allTools.filter(tool => field.value?.some(v => v.id === tool.id))}
// //                         onChange={(selected) => field.onChange(selected)}
// //                         className="react-select-container"
// //                         classNamePrefix="react-select"
// //                       />
// //                     )}
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </form>
// //     </DndProvider>
// //   );
// // };

// // export default AdminProjectEditor;




// import React, { useState, useEffect, useCallback } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, UploadCloud, X, Palette, Type, RefreshCw
// } from 'lucide-react';
// import { motion, AnimatePresence, Reorder } from 'framer-motion';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import {
//   getEditorData,
//   saveProject,
//   uploadMedia,
//   getStorageUrl,
//   deleteMedia,
// } from '../../../api/projectsadmin'; // Using the full admin API - FIXED PATH
// import toast, { Toaster } from 'react-hot-toast';
// // import Select from 'react-select'; // npm install react-select <-- REMOVED
// import { DndProvider } from 'react-dnd'; // npm install react-dnd react-dnd-html5-backend
// import { HTML5Backend } from 'react-dnd-html5-backend';

// // --- Reusable Form Components ---
// const FormInput = ({ label, name, register, error, ...rest }) => ( // Renamed 'errors' to 'error'
//   <div className="flex flex-col w-full">
//     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
//     <input
//       id={name}
//       {...register(name)}
//       {...rest}
//       className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
//     />
//     {error && <span className="text-red-500 text-sm mt-1">{error.message || 'This field is required'}</span>}
//   </div>
// );

// const FormTextarea = ({ label, name, register, error, ...rest }) => ( // Renamed 'errors' to 'error'
//   <div className="flex flex-col w-full">
//     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
//     <textarea
//       id={name}
//       {...register(name)}
//       {...rest}
//       className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
//       rows={4}
//     />
//     {error && <span className="text-red-500 text-sm mt-1">{error.message || 'This field is required'}</span>}
//   </div>
// );

// // --- Media Uploader Component ---
// const MediaUploader = ({ label, mediaId, mediaPath, onUpload, onRemove, error }) => {
//   const [isUploading, setIsUploading] = useState(false);
//   const imageUrl = mediaPath ? getStorageUrl(mediaPath) : null;

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);
//     const toastId = toast.loading('Uploading image...');
//     try {
//       const { media_asset_id, file_path } = await uploadMedia(file);
//       onUpload(media_asset_id, file_path); // Pass both ID and path back
//       toast.success('Image uploaded', { id: toastId });
//     } catch (err) {
//       toast.error('Upload failed', { id: toastId });
//       console.error(err);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full">
//       <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
//       <div className="w-full p-4 border-2 border-dashed rounded-lg border-gray-300">
//         {isUploading ? (
//           <div className="flex flex-col items-center justify-center h-32">
//             <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//             <span className="mt-2 text-sm text-gray-500">Uploading...</span>
//           </div>
//         ) : imageUrl ? (
//           <div className="relative group">
//             <img src={imageUrl} alt="Uploaded media" className="w-full h-32 object-contain rounded-md" />
//             <button
//               type="button"
//               onClick={onRemove}
//               className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         ) : (
//           <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
//             <UploadCloud className="w-8 h-8 text-gray-400" />
//             <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
//             <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
//           </label>
//         )}
//       </div>
//       {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
//     </div>
//   );
// };

// // --- Content Block Editor ---
// const ContentBlockEditor = ({ control, register, errors }) => {
//   const { fields, append, remove, move } = useFieldArray({
//     control,
//     name: "content",
//   });

//   const addBlock = (type) => {
//     let content = {};
//     if (type === 'text') content = { title: 'New Section', body: '...' };
//     if (type === 'image') content = { media_id: null, caption: '', media_path: null };
//     if (type === 'palette') content = { colors: ['#FFFFFF', '#000000'] };
//     append({ type, content });
//   };

//   const handleImageUpload = (index, media_id, file_path) => {
//     // This is tricky, we need to update the nested field
//     // We'll update the 'content' field directly in the form
//     const field = fields[index];
//     field.content.media_id = media_id;
//     field.content.media_path = file_path;
//     // This is not standard react-hook-form, but necessary for nested state
//     // A better way would be to use setValue, but this is simpler for now
//   };

//   return (
//     <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
//       <h3 className="text-lg font-medium text-gray-900 mb-4">Content Blocks</h3>
//       <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
//         <AnimatePresence>
//           {fields.map((field, index) => (
//             <Reorder.Item key={field.id} value={field} className="mb-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-2">
//                     <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
//                     <span className="font-medium capitalize">{field.type} Block</span>
//                   </div>
//                   <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* --- Block Specific Fields --- */}
//                 {field.type === 'text' && (
//                   <div className="space-y-4">
//                     <FormInput
//                       label="Title"
//                       name={`content.${index}.content.title`}
//                       register={register}
//                       error={errors.content?.[index]?.content?.title}
//                     />
//                     <FormTextarea
//                       label="Body"
//                       name={`content.${index}.content.body`}
//                       register={register}
//                       error={errors.content?.[index]?.content?.body}
//                     />
//                   </div>
//                 )}

//                 {field.type === 'image' && (
//                   <div className="space-y-4">
//                     <MediaUploader
//                       label="Image"
//                       mediaId={field.content.media_id}
//                       mediaPath={field.content.media_path}
//                       onUpload={(id, path) => {
//                         // Manually update the form state for this nested field
//                         // This is a limitation of RHF with complex nested state
//                         field.content.media_id = id;
//                         field.content.media_path = path;
//                       }}
//                       onRemove={() => {
//                         field.content.media_id = null;
//                         field.content.media_path = null;
//                       }}
//                     />
//                     <FormInput
//                       label="Caption"
//                       name={`content.${index}.content.caption`}
//                       register={register}
//                       error={errors.content?.[index]?.content?.caption}
//                     />
//                   </div>
//                 )}
                
//                 {field.type === 'palette' && (
//                   <FormInput
//                     label="Colors (comma-separated hex codes)"
//                     name={`content.${index}.content.colors`}
//                     register={register}
//                     error={errors.content?.[index]?.content?.colors}
//                     // We need to join/split the array for the input
//                     // This requires a Controller or custom logic, simplifying for now
//                     // Or we just store as string
//                   />
//                   // A real color palette editor would be more complex
//                 )}

//               </motion.div>
//             </Reorder.Item>
//           ))}
//         </AnimatePresence>
//       </Reorder.Group>
      
//       <div className="flex gap-2 mt-4">
//         <button type="button" onClick={() => addBlock('text')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
//           <Type className="w-4 h-4" /> Add Text
//         </button>
//         <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
//           <ImageIcon className="w-4 h-4" /> Add Image
//         </button>
//         <button type="button" onClick={() => addBlock('palette')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
//           <Palette className="w-4 h-4" /> Add Palette
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- Gallery Editor Component ---
// const GalleryEditor = ({ control }) => {
//   const { fields, append, remove, move } = useFieldArray({
//     control,
//     name: "gallery",
//   });

//   const [isUploading, setIsUploading] = useState(false);

//   const handleFilesChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setIsUploading(true);
//     const toastId = toast.loading(`Uploading ${files.length} images...`);

//     try {
//       const uploadPromises = files.map(uploadMedia);
//       const results = await Promise.all(uploadPromises);

//       results.forEach(({ media_asset_id, file_path }) => {
//         append({
//           media: {
//             id: media_asset_id,
//             file_path: file_path,
//           },
//         });
//       });
//       toast.success('Upload complete', { id: toastId });
//     } catch (err) {
//       toast.error('Some uploads failed', { id: toastId });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
//       <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery</h3>
//       <label className="flex flex-col items-center justify-center w-full p-6 mb-4 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:bg-gray-100">
//         <UploadCloud className="w-8 h-8 text-gray-400" />
//         <span className="mt-2 text-sm text-gray-500">
//           {isUploading ? 'Uploading...' : 'Click or drag to upload multiple images'}
//         </span>
//         <input
//           type="file"
//           className="hidden"
//           multiple
//           accept="image/*"
//           onChange={handleFilesChange}
//           disabled={isUploading}
//         />
//       </label>

//       <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
//         <AnimatePresence>
//           {fields.map((field, index) => (
//             <Reorder.Item key={field.id} value={field} className="mb-2">
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 50 }}
//                 className="flex items-center gap-3 p-2 bg-white border border-gray-300 rounded-md"
//               >
//                 <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
//                 <img
//                   src={getStorageUrl(field.media.file_path)}
//                   className="w-16 h-10 object-cover rounded-sm"
//                   alt="Gallery thumb"
//                 />
//                 <span className="flex-1 text-sm truncate text-gray-600">{field.media.file_path.split('/').pop()}</span>
//                 <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </motion.div>
//             </Reorder.Item>
//           ))}
//         </AnimatePresence>
//       </Reorder.Group>
//     </div>
//   );
// };


// // --- Main Editor Component ---
// const AdminProjectEditor = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const isCreating = slug === 'new';
//   const [isLoading, setIsLoading] = useState(true);
//   const [projectId, setProjectId] = useState(null);
//   const [allCategories, setAllCategories] = useState([]);
//   const [allTools, setAllTools] = useState([]);
//   const [isSaving, setIsSaving] = useState(false);

//   const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       title: '',
//       slug: '',
//       description: '',
//       client: '',
//       role: '',
//       timeline: '',
//       video_url: '',
//       hero_media_id: null,
//       hero_media_path: null,
//       detail_hero_media_id: null,
//       detail_hero_media_path: null,
//       categories: [],
//       tools: [],
//       content: [],
//       gallery: [],
//     },
//   });
//   // const { errors } = {}; // <-- This was the source of the error

//   // Watch for title changes to suggest slug
//   const titleWatch = watch('title');

//   const generateSlug = () => {
//     const slugified = (titleWatch || '')
//       .toString()
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, '-')
//       .replace(/[^\w-]+/g, '')
//       .replace(/--+/g, '-');
//     setValue('slug', slugified, { shouldValidate: true });
//   };


//   // Load all data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const { project, allCategories, allTools } = await getEditorData(slug);
//         setAllCategories(allCategories || []);
//         setAllTools(allTools || []);

//         if (!isCreating && project) {
//           // Edit mode: set form values
//           setProjectId(project.id);
//           reset({
//             title: project.title || '',
//             slug: project.slug || '',
//             description: project.description || '',
//             client: project.client || '',
//             role: project.role || '',
//             timeline: project.timeline || '',
//             video_url: project.video_url || '',
//             hero_media_id: project.hero_media_id,
//             hero_media_path: project.hero_media_path,
//             detail_hero_media_id: project.detail_hero_media_id,
//             detail_hero_media_path: project.detail_hero_media_path,
//             categories: project.categories || [],
//             tools: project.tools || [],
//             content: project.content.map(c => ({...c, content: JSON.parse(c.content)})) || [], // Parse content JSON
//             gallery: project.gallery || [],
//           });
//         }
//       } catch (error) {
//         toast.error(`Error loading data: ${error.message}`);
//         //navigate('/admin/projects');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadData();
//   }, [slug, isCreating, reset, navigate]);

//   // Main save function
//   const onSubmit = async (formData) => {
//     setIsSaving(true);
//     const toastId = toast.loading(isCreating ? 'Creating project...' : 'Saving changes...');

//     // --- Prepare Data for API ---
//     // 1. Transform palette arrays back into strings if needed, or handle in API
//     //    For now, we'll assume the API can take the JSON
//     // 2. We need to re-serialize the 'content' blocks' content field
//     const preparedData = {
//       ...formData,
//       content: formData.content.map(block => {
//         // Special handling for palette: convert comma-separated string to array
//         if (block.type === 'palette' && typeof block.content.colors === 'string') {
//           block.content.colors = block.content.colors.split(',').map(s => s.trim());
//         }
//         return {
//           ...block,
//           content: block.content // API expects this as a JSON object
//         };
//       }),
//       // Map gallery to match what API expects (if needed)
//       // The API function `saveProject` is built to handle this `formData` shape
//     };
    
//     // Call the API
//     const { success, error, projectSlug } = await saveProject(preparedData, projectId);

//     if (success) {
//       toast.success(isCreating ? 'Project created!' : 'Project saved!', { id: toastId });
//       // Navigate to the *new* slug if creating, or the *updated* slug
//       navigate(`/admin/editor/projects/${projectSlug}`);
//       // If we just created, we need to switch from 'new' to the real slug
//       if (isCreating) {
//         navigate(`/admin/editor/projects/${projectSlug}`, { replace: true });
//       }
//     } else {
//       toast.error(`Error: ${error}`, { id: toastId });
//     }
//     setIsSaving(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
//       </div>
//     );
//   }

//   // Get current media paths for the uploaders
//   const heroMediaPath = watch('hero_media_path');
//   const detailHeroMediaPath = watch('detail_hero_media_path');

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Toaster position="top-right" />
//       <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
//         {/* Sticky Header */}
//         <div className="sticky top-0 z-40 bg-white shadow-sm">
//           <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
//             <div className="flex items-center gap-3">
//               <Link to="/admin/projects" className="p-2 rounded-lg hover:bg-gray-100">
//                 <ArrowLeft className="w-6 h-6 text-gray-700" />
//               </Link>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">
//                   {isCreating ? 'Create New Project' : 'Edit Project'}
//                 </h1>
//                 {!isCreating && <span className="text-sm text-gray-500">/projects/{watch('slug')}</span>}
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={isSaving}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
//             >
//               {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
//               {isSaving ? (isCreating ? 'Creating...' : 'Saving...') : (isCreating ? 'Create Project' : 'Save Changes')}
//             </button>
//           </div>
//         </div>

//         {/* Main Editor Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 md:p-8">
          
//           {/* --- Main Content Column --- */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Main Details</h2>
//               <div className="space-y-4">
//                 <FormInput
//                   label="Project Title"
//                   name="title"
//                   register={register}
//                   error={errors.title}
//                   placeholder="e.g. Zenith Motion"
//                 />
                
//                 <div className="flex flex-col">
//                   <label className="mb-2 text-sm font-medium text-gray-700">Project Slug</label>
//                   <div className="flex gap-2">
//                     <input
//                       {...register('slug')}
//                       placeholder="e.g. zenith-motion"
//                       className="flex-1 p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     />
//                     <button
//                       type="button"
//                       onClick={generateSlug}
//                       title="Generate from title"
//                       className="p-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
//                     >
//                       <RefreshCw className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <FormTextarea
//                   label="Short Description"
//                   name="description"
//                   register={register}
//                   error={errors.description}
//                   placeholder="A one-sentence summary for the project grid."
//                 />
//               </div>
//             </div>

//             <div className="p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Info</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormInput label="Client" name="client" register={register} error={errors.client} />
//                 <FormInput label="Role" name="role" register={register} error={errors.role} placeholder="e.g. Lead Designer" />
//                 <FormInput label="Timeline" name="timeline" register={register} error={errors.timeline} placeholder="e.g. 6 Weeks" />
//                 <FormInput label="Video URL" name="video_url" register={register} error={errors.video_url} placeholder="Optional: http://.../video.mp4" />
//               </div>
//             </div>

//             {/* --- Content Blocks --- */}
//             <ContentBlockEditor control={control} register={register} errors={errors} />
            
//             {/* --- Gallery --- */}
//             <GalleryEditor control={control} />

//           </div>
          
//           {/* --- Sidebar Column --- */}
//           <div className="lg:col-span-1 space-y-6">
            
//             <div className="p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
//               <div className="space-y-4">
//                 <MediaUploader
//                   label="Hero Image (Grid)"
//                   mediaId={watch('hero_media_id')}
//                   mediaPath={heroMediaPath}
//                   onUpload={(id, path) => {
//                     setValue('hero_media_id', id);
//                     setValue('hero_media_path', path);
//                   }}
//                   onRemove={() => {
//                     setValue('hero_media_id', null);
//                     setValue('hero_media_path', null);
//                   }}
//                 />
//                 <MediaUploader
//                   label="Detail Hero (Page Top)"
//                   mediaId={watch('detail_hero_media_id')}
//                   mediaPath={detailHeroMediaPath}
//                   onUpload={(id, path) => {
//                     setValue('detail_hero_media_id', id);
//                     setValue('detail_hero_media_path', path);
//                   }}
//                   onRemove={() => {
//                     setValue('detail_hero_media_id', null);
//                     setValue('detail_hero_media_path', null);
//                   }}
//                 />
//               </div>
//             </div>
            
//             <div className="p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Taxonomies</h2>
//               <div className="space-y-4">
//                 <div className="flex flex-col">
//                   <label className="mb-2 text-sm font-medium text-gray-700">Categories</label>
//                   <Controller
//                     name="categories"
//                     control={control}
//                     render={({ field }) => {
//                       // We need an array of IDs for the <select> value
//                       const selectedIds = field.value?.map(v => v.id) || [];
//                       return (
//                         <select
//                           {...field}
//                           multiple
//                           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
//                           style={{ minHeight: '120px' }}
//                           value={selectedIds} // Set selected IDs
//                           onChange={(e) => {
//                             // Get all selected options
//                             const selectedOptions = Array.from(e.target.selectedOptions);
//                             // Find the full objects from allCategories
//                             const selectedValues = selectedOptions.map(option => 
//                               allCategories.find(cat => cat.id.toString() === option.value)
//                             ).filter(Boolean); // Filter out any undefined
//                             // Pass this array of objects to react-hook-form
//                             field.onChange(selectedValues);
//                           }}
//                         >
//                           {allCategories.map(cat => (
//                             <option key={cat.id} value={cat.id}>
//                               {cat.name}
//                             </option>
//                           ))}
//                         </select>
//                       );
//                     }}
//                   />
//                 </div>
                
//                 <div className="flex flex-col">
//                   <label className="mb-2 text-sm font-medium text-gray-700">Tools</label>
//                   <Controller
//                     name="tools"
//                     control={control}
//                     render={({ field }) => {
//                       // We need an array of IDs for the <select> value
//                       const selectedIds = field.value?.map(v => v.id) || [];
//                       return (
//                         <select
//                           {...field}
//                           multiple
//                           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
//                           style={{ minHeight: '120px' }}
//                           value={selectedIds} // Set selected IDs
//                           onChange={(e) => {
//                             // Get all selected options
//                             const selectedOptions = Array.from(e.target.selectedOptions);
//                             // Find the full objects from allTools
//                             const selectedValues = selectedOptions.map(option => 
//                               allTools.find(tool => tool.id.toString() === option.value)
//                             ).filter(Boolean); // Filter out any undefined
//                             // Pass this array of objects to react-hook-form
//                             field.onChange(selectedValues);
//                           }}
//                         >
//                           {allTools.map(tool => (
//                             <option key={tool.id} value={tool.id}>
//                               {tool.name}
//                             </option>
//                           ))}
//                         </select>
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </form>
//     </DndProvider>
//   );
// };

// export default AdminProjectEditor;



import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, UploadCloud, X, Palette, Type, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  getEditorData,
  saveProject,
  uploadMedia,
  getStorageUrl,
  deleteMedia,
} from '../../../api/projectsadmin'; // Using the full admin API - FIXED PATH
import toast, { Toaster } from 'react-hot-toast';
// import Select from 'react-select'; // npm install react-select <-- REMOVED
import { DndProvider } from 'react-dnd'; // npm install react-dnd react-dnd-html5-backend
import { HTML5Backend } from 'react-dnd-html5-backend';

// --- Reusable Form Components ---
const FormInput = ({ label, name, register, error, ...rest }) => ( // Renamed 'errors' to 'error'
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      {...register(name)}
      {...rest}
      className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error.message || 'This field is required'}</span>}
  </div>
);

const FormTextarea = ({ label, name, register, error, ...rest }) => ( // Renamed 'errors' to 'error'
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <textarea
      id={name}
      {...register(name)}
      {...rest}
      className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
      rows={4}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error.message || 'This field is required'}</span>}
  </div>
);

// --- Media Uploader Component ---
const MediaUploader = ({ label, mediaId, mediaPath, onUpload, onRemove, error }) => {
  const [isUploading, setIsUploading] = useState(false);
  const imageUrl = mediaPath ? getStorageUrl(mediaPath) : null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading('Uploading image...');
    try {
      const { media_asset_id, file_path } = await uploadMedia(file);
      onUpload(media_asset_id, file_path); // Pass both ID and path back
      toast.success('Image uploaded', { id: toastId });
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className="w-full p-4 border-2 border-dashed rounded-lg border-gray-300">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center h-32">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="mt-2 text-sm text-gray-500">Uploading...</span>
          </div>
        ) : imageUrl ? (
          <div className="relative group">
            <img src={imageUrl} alt="Uploaded media" className="w-full h-32 object-contain rounded-md" />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
            <UploadCloud className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
            <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
          </label>
        )}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
    </div>
  );
};

// --- Content Block Editor ---
const ContentBlockEditor = ({ control, register, errors }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "content",
  });

  const addBlock = (type) => {
    let content = {};
    if (type === 'text') content = { title: 'New Section', body: '...' };
    if (type === 'image') content = { media_id: null, caption: '', media_path: null };
    if (type === 'palette') content = { colors: ['#FFFFFF', '#000000'] };
    append({ type, content });
  };

  const handleImageUpload = (index, media_id, file_path) => {
    // This is tricky, we need to update the nested field
    // We'll update the 'content' field directly in the form
    const field = fields[index];
    field.content.media_id = media_id;
    field.content.media_path = file_path;
    // This is not standard react-hook-form, but necessary for nested state
    // A better way would be to use setValue, but this is simpler for now
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Content Blocks</h3>
      <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
        <AnimatePresence>
          {fields.map((field, index) => (
            <Reorder.Item key={field.id} value={field} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <span className="font-medium capitalize">{field.type} Block</span>
                  </div>
                  <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* --- Block Specific Fields --- */}
                {field.type === 'text' && (
                  <div className="space-y-4">
                    <FormInput
                      label="Title"
                      name={`content.${index}.content.title`}
                      register={register}
                      error={errors.content?.[index]?.content?.title}
                    />
                    <FormTextarea
                      label="Body"
                      name={`content.${index}.content.body`}
                      register={register}
                      error={errors.content?.[index]?.content?.body}
                    />
                  </div>
                )}

                {field.type === 'image' && (
                  <div className="space-y-4">
                    <MediaUploader
                      label="Image"
                      mediaId={field.content.media_id}
                      mediaPath={field.content.media_path}
                      onUpload={(id, path) => {
                        // Manually update the form state for this nested field
                        // This is a limitation of RHF with complex nested state
                        field.content.media_id = id;
                        field.content.media_path = path;
                      }}
                      onRemove={() => {
                        field.content.media_id = null;
                        field.content.media_path = null;
                      }}
                    />
                    <FormInput
                      label="Caption"
                      name={`content.${index}.content.caption`}
                      register={register}
                      error={errors.content?.[index]?.content?.caption}
                    />
                  </div>
                )}
                
                {field.type === 'palette' && (
                  <FormInput
                    label="Colors (comma-separated hex codes)"
                    name={`content.${index}.content.colors`}
                    register={register}
                    error={errors.content?.[index]?.content?.colors}
                    // We need to join/split the array for the input
                    // This requires a Controller or custom logic, simplifying for now
                    // Or we just store as string
                  />
                  // A real color palette editor would be more complex
                )}

              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      
      <div className="flex gap-2 mt-4">
        <button type="button" onClick={() => addBlock('text')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <Type className="w-4 h-4" /> Add Text
        </button>
        <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <ImageIcon className="w-4 h-4" /> Add Image
        </button>
        <button type="button" onClick={() => addBlock('palette')} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <Palette className="w-4 h-4" /> Add Palette
        </button>
      </div>
    </div>
  );
};

// --- Gallery Editor Component ---
const GalleryEditor = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "gallery",
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${files.length} images...`);

    try {
      const uploadPromises = files.map(uploadMedia);
      const results = await Promise.all(uploadPromises);

      results.forEach(({ media_asset_id, file_path }) => {
        append({
          media: {
            id: media_asset_id,
            file_path: file_path,
          },
        });
      });
      toast.success('Upload complete', { id: toastId });
    } catch (err) {
      toast.error('Some uploads failed', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery</h3>
      <label className="flex flex-col items-center justify-center w-full p-6 mb-4 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:bg-gray-100">
        <UploadCloud className="w-8 h-8 text-gray-400" />
        <span className="mt-2 text-sm text-gray-500">
          {isUploading ? 'Uploading...' : 'Click or drag to upload multiple images'}
        </span>
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFilesChange}
          disabled={isUploading}
        />
      </label>

      <Reorder.Group axis="y" values={fields} onReorder={(from, to) => move(from, to)}>
        <AnimatePresence>
          {fields.map((field, index) => (
            <Reorder.Item key={field.id} value={field} className="mb-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="flex items-center gap-3 p-2 bg-white border border-gray-300 rounded-md"
              >
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                <img
                  src={getStorageUrl(field.media.file_path)}
                  className="w-16 h-10 object-cover rounded-sm"
                  alt="Gallery thumb"
                />
                <span className="flex-1 text-sm truncate text-gray-600">{field.media.file_path.split('/').pop()}</span>
                <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
};


// --- Main Editor Component ---
const AdminProjectEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isCreating = slug === 'new';
  const [isLoading, setIsLoading] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allTools, setAllTools] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      client: '',
      role: '',
      timeline: '',
      video_url: '',
      hero_media_id: null,
      hero_media_path: null,
      detail_hero_media_id: null,
      detail_hero_media_path: null,
      categories: [],
      tools: [],
      content: [],
      gallery: [],
    },
  });
  // const { errors } = {}; // <-- This was the source of the error

  // Watch for title changes to suggest slug
  const titleWatch = watch('title');

  const generateSlug = () => {
    const slugified = (titleWatch || '')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
    setValue('slug', slugified, { shouldValidate: true });
  };


  // Load all data
  useEffect(() => {
    const loadData = async () => {
      try {
        const { project, allCategories, allTools } = await getEditorData(slug);
        setAllCategories(allCategories || []);
        setAllTools(allTools || []);

        console.log('in the admin project page');
        console.log(project);
        if (!isCreating && project) {
          // Edit mode: set form values
          setProjectId(project.id);
          reset({
            title: project.title || '',
            slug: project.slug || '',
            description: project.description || '',
            client: project.client || '',
            role: project.role || '',
            timeline: project.timeline || '',
            video_url: project.video_url || '',
            hero_media_id: project.hero_media_id,
            hero_media_path: project.hero_media_path,
            detail_hero_media_id: project.detail_hero_media_id,
            detail_hero_media_path: project.detail_hero_media_path,
            categories: project.categories || [],
            tools: project.tools || [],
            content: project.content.map(c => ({...c, content: (typeof c.content === 'string') ? JSON.parse(c.content) : c.content })) || [], // Safely parse content
            gallery: project.gallery || [],
          });
        }
      } catch (error) {
        toast.error(`Error loading data: ${error.message}`);
        //navigate('/admin/projects');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [slug, isCreating, reset, navigate]);

  // Main save function
  const onSubmit = async (formData) => {
    setIsSaving(true);
    const toastId = toast.loading(isCreating ? 'Creating project...' : 'Saving changes...');

    // --- Prepare Data for API ---
    // 1. Transform palette arrays back into strings if needed, or handle in API
    //    For now, we'll assume the API can take the JSON
    // 2. We need to re-serialize the 'content' blocks' content field
    const preparedData = {
      ...formData,
      content: formData.content.map(block => {
        // Special handling for palette: convert comma-separated string to array
        if (block.type === 'palette' && typeof block.content.colors === 'string') {
          block.content.colors = block.content.colors.split(',').map(s => s.trim());
        }
        return {
          ...block,
          content: block.content // API expects this as a JSON object
        };
      }),
      // Map gallery to match what API expects (if needed)
      // The API function `saveProject` is built to handle this `formData` shape
    };
    
    // Call the API
    const { success, error, projectSlug } = await saveProject(preparedData, projectId);

    if (success) {
      toast.success(isCreating ? 'Project created!' : 'Project saved!', { id: toastId });
      // Navigate to the *new* slug if creating, or the *updated* slug
      navigate(`/admin/projects-config/${projectSlug}`);
      // If we just created, we need to switch from 'new' to the real slug
      if (isCreating) {
        navigate(`/admin/projects-config/${projectSlug}`, { replace: true });
      }
    } else {
      toast.error(`Error: ${error}`, { id: toastId });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Get current media paths for the uploaders
  const heroMediaPath = watch('hero_media_path');
  const detailHeroMediaPath = watch('detail_hero_media_path');

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Link to="/admin/projects-config" className="p-2 rounded-lg hover:bg-gray-100">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isCreating ? 'Create New Project' : 'Edit Project'}
                </h1>
                {!isCreating && <span className="text-sm text-gray-500">/projects/{watch('slug')}</span>}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? (isCreating ? 'Creating...' : 'Saving...') : (isCreating ? 'Create Project' : 'Save Changes')}
            </button>
          </div>
        </div>

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 md:p-8">
          
          {/* --- Main Content Column --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Main Details</h2>
              <div className="space-y-4">
                <FormInput
                  label="Project Title"
                  name="title"
                  register={register}
                  error={errors.title}
                  placeholder="e.g. Zenith Motion"
                />
                
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">Project Slug</label>
                  <div className="flex gap-2">
                    <input
                      {...register('slug')}
                      placeholder="e.g. zenith-motion"
                      className="flex-1 p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      title="Generate from title"
                      className="p-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <FormTextarea
                  label="Short Description"
                  name="description"
                  register={register}
                  error={errors.description}
                  placeholder="A one-sentence summary for the project grid."
                />
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Client" name="client" register={register} error={errors.client} />
                <FormInput label="Role" name="role" register={register} error={errors.role} placeholder="e.g. Lead Designer" />
                <FormInput label="Timeline" name="timeline" register={register} error={errors.timeline} placeholder="e.g. 6 Weeks" />
                <FormInput label="Video URL" name="video_url" register={register} error={errors.video_url} placeholder="Optional: http://.../video.mp4" />
              </div>
            </div>

            {/* --- Content Blocks --- */}
            <ContentBlockEditor control={control} register={register} errors={errors} />
            
            {/* --- Gallery --- */}
            <GalleryEditor control={control} />

          </div>
          
          {/* --- Sidebar Column --- */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
              <div className="space-y-4">
                <MediaUploader
                  label="Hero Image (Grid)"
                  mediaId={watch('hero_media_id')}
                  mediaPath={heroMediaPath}
                  onUpload={(id, path) => {
                    setValue('hero_media_id', id);
                    setValue('hero_media_path', path);
                  }}
                  onRemove={() => {
                    setValue('hero_media_id', null);
                    setValue('hero_media_path', null);
                  }}
                />
                <MediaUploader
                  label="Detail Hero (Page Top)"
                  mediaId={watch('detail_hero_media_id')}
                  mediaPath={detailHeroMediaPath}
                  onUpload={(id, path) => {
                    setValue('detail_hero_media_id', id);
                    setValue('detail_hero_media_path', path);
                  }}
                  onRemove={() => {
                    setValue('detail_hero_media_id', null);
                    setValue('detail_hero_media_path', null);
                  }}
                />
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Taxonomies</h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">Categories</label>
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => {
                      // We need an array of IDs for the <select> value
                      const selectedIds = field.value?.map(v => v.id) || [];
                      return (
                        <select
                          {...field}
                          multiple
                          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                          style={{ minHeight: '120px' }}
                          value={selectedIds} // Set selected IDs
                          onChange={(e) => {
                            // Get all selected options
                            const selectedOptions = Array.from(e.target.selectedOptions);
                            // Find the full objects from allCategories
                            const selectedValues = selectedOptions.map(option => 
                              allCategories.find(cat => cat.id.toString() === option.value)
                            ).filter(Boolean); // Filter out any undefined
                            // Pass this array of objects to react-hook-form
                            field.onChange(selectedValues);
                          }}
                        >
                          {allCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      );
                    }}
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">Tools</label>
                  <Controller
                    name="tools"
                    control={control}
                    render={({ field }) => {
                      // We need an array of IDs for the <select> value
                      const selectedIds = field.value?.map(v => v.id) || [];
                      return (
                        <select
                          {...field}
                          multiple
                          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                          style={{ minHeight: '120px' }}
                          value={selectedIds} // Set selected IDs
                          onChange={(e) => {
                            // Get all selected options
                            const selectedOptions = Array.from(e.target.selectedOptions);
                            // Find the full objects from allTools
                            const selectedValues = selectedOptions.map(option => 
                              allTools.find(tool => tool.id.toString() === option.value)
                            ).filter(Boolean); // Filter out any undefined
                            // Pass this array of objects to react-hook-form
                            field.onChange(selectedValues);
                          }}
                        >
                          {allTools.map(tool => (
                            <option key={tool.id} value={tool.id}>
                              {tool.name}
                            </option>
                          ))}
                        </select>
                      );
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </DndProvider>
  );
};

export default AdminProjectEditor;