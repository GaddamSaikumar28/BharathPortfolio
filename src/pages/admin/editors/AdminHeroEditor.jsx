

// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import {
// // //   ArrowLeft, Save, Loader2, Plus, Trash2, Eye, EyeOff, GripVertical, Image as ImageIcon, UploadCloud
// // // } from 'lucide-react';
// // // import { motion, AnimatePresence, Reorder } from 'framer-motion';
// // // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // // import {
// // //   getHeroVariantsAdmin,
// // //   subscribeToHeroChanges,
// // //   updateHeroVariantsOrder,
// // //   deleteHeroVariant,
// // //   saveHeroVariant,
// // // } from '../../../api/heroadmin';
// // // import { getStorageUrl } from '../../../hooks/useHomepageData';
// // // // --- FIX: Import the icon *map* (iconMap), not the component (Icon) ---
// // // import { Icon as iconMap } from '../../../components/common/IconMap'; // FIX: Ensure IconMap is imported
// // // import toast, { Toaster } from 'react-hot-toast';
// // // import { useAuth } from '../../../context/AuthContext'; // We need the user ID for uploads

// // // // --- Reusable Form Components ---
// // // const FormInput = ({ label, name, register, errors, ...rest }) => (
// // //   <div className="flex flex-col">
// // //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // //     <input id={name} {...register(name)} {...rest} className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`} />
// // //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
// // //   </div>
// // // );

// // // // --- *** NEW JSON Form Input *** ---
// // // // This component handles the [object Object] error
// // // const FormJsonInput = ({ label, name, control, errors, placeholder }) => (
// // //   <Controller
// // //     name={name}
// // //     control={control}
// // //     render={({ field }) => (
// // //       <div className="flex flex-col">
// // //         <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // //         <input
// // //           id={name}
// // //           // --- FIX: Convert object to string for display ---
// // //           value={
// // //             typeof field.value === 'object' && field.value !== null
// // //               ? JSON.stringify(field.value)
// // //               : field.value || ''
// // //           }
// // //           onChange={(e) => {
// // //             // Pass the string value directly to react-hook-form
// // //             field.onChange(e.target.value);
// // //           }}
// // //           placeholder={placeholder}
// // //           className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 font-mono text-sm`}
// // //         />
// // //         {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
// // //       </div>
// // //     )}
// // //     // Add a rule to ensure it's valid JSON before submitting
// // //     rules={{
// // //       validate: value => {
// // //         if (!value) return true; // Allow empty
// // //         try {
// // //           // Check if it's already an object (from defaultValues)
// // //           if (typeof value === 'object' && value !== null) return true;
// // //           // Check if it's a string that can be parsed
// // //           JSON.parse(value);
// // //           return true;
// // //         } catch (e) {
// // //           return 'Must be valid JSON';
// // //         }
// // //       }
// // //     }}
// // //   />
// // // );


// // // const FormTextarea = ({ label, name, register, errors, ...rest }) => (
// // //   <div className="flex flex-col">
// // //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// // //     <textarea id={name} {...register(name)} {...rest} className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`} rows="3" />
// // //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
// // //   </div>
// // // );

// // // const FormToggle = ({ label, name, control }) => (
// // //   <Controller
// // //     name={name}
// // //     control={control}
// // //     render={({ field: { value, onChange } }) => (
// // //       <label className="flex items-center justify-between cursor-pointer p-2 bg-gray-50 rounded-md border">
// // //         <span className="text-sm font-medium text-gray-700">{label}</span>
// // //         <button
// // //           type="button"
// // //           onClick={() => onChange(!value)}
// // //           className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${value ? 'bg-blue-600' : 'bg-gray-200'}`}
// // //         >
// // //           <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${value ? 'translate-x-5' : 'translate-x-0'}`} />
// // //         </button>
// // //       </label>
// // //     )}
// // //   />
// // // );

// // // // --- Advanced Image Uploader Component ---
// // // const ImageUpload = ({ control, name, defaultValue }) => {
// // //   // defaultValue is the media_assets object
// // //   const [preview, setPreview] = useState(getStorageUrl(defaultValue));

// // //   return (
// // //     <Controller
// // //       name={name}
// // //       control={control}
// // //       // Store the essential info in the form state
// // //       defaultValue={{ 
// // //         media_id: defaultValue?.id || null,
// // //         file: null,
// // //         originalMediaId: defaultValue?.id || null, 
// // //       }}
// // //       render={({ field: { onChange, value } }) => {
// // //         const handleFileChange = (e) => {
// // //           const file = e.target.files[0];
// // //           if (file) {
// // //             setPreview(URL.createObjectURL(file));
// // //             // 'file' will be caught by our API to trigger an upload
// // //             // 'originalMediaId' is crucial for deleting the old file
// // //             onChange({ 
// // //               media_id: null, // This is now a new file
// // //               file: file, 
// // //               originalMediaId: value?.originalMediaId || defaultValue?.id || null 
// // //             });
// // //           }
// // //         };

// // //         return (
// // //           <div className="flex flex-col items-center gap-2 p-2 border border-dashed rounded-md">
// // //             {preview ? (
// // //               <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
// // //             ) : (
// // //               <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
// // //                 <ImageIcon className="w-8 h-8 text-gray-400" />
// // //               </div>
// // //             )}
// // //             <input
// // //               type="file"
// // //               id={`file-upload-${name}`}
// // //               className="hidden"
// // //               accept="image/png, image/jpeg, image/webp"
// // //               onChange={handleFileChange}
// // //             />
// // //             <label
// // //               htmlFor={`file-upload-${name}`}
// // //               className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800 p-2 rounded-md bg-blue-50 hover:bg-blue-100 w-full text-center"
// // //             >
// // //               {value?.file ? 'File Selected' : 'Change Image'}
// // //             </label>
// // //           </div>
// // //         )
// // //       }}
// // //     />
// // //   );
// // // };


// // // // --- Hero Variant Editor Modal ---
// // // const VariantEditorModal = ({ variant, onClose, onSave, allIcons }) => {
// // //   const { user } = useAuth();
// // //   const { register, handleSubmit, control, watch, reset, formState: { errors, isSubmitting } } = useForm();

// // //   // This effect correctly sets the form's default values when the modal opens or variant changes
// // //   useEffect(() => {
// // //      reset(variant ? {
// // //       ...variant,
// // //       // Ensure nested fields are populated correctly
// // //       hero_variant1_icons: (variant.hero_variant1_icons || []).map(icon => ({
// // //         ...icon,
// // //         // --- FIX: Stringify JSON for the input ---
// // //         position: JSON.stringify(icon.position) 
// // //       })),
// // //       hero_variant2_photos: (variant.hero_variant2_photos || []).map(p => ({
// // //         ...p,
// // //         file: null,
// // //         originalMediaId: p.media_assets?.id || null,
// // //         media_id: p.media_assets?.id || null // Pass the media_id
// // //       })),
// // //     } : {
// // //       // Defaults for a new variant
// // //       title: '',
// // //       subtitle: '',
// // //       paragraph: '',
// // //       variant_type: 'variant1',
// // //       is_active: true,
// // //       hero_variant1_icons: [],
// // //       hero_variant2_photos: [],
// // //     });
// // //   }, [variant, reset]);

// // //   const selectedVariantType = watch('variant_type');

// // //   const { fields: iconFields, append: appendIcon, remove: removeIcon } = useFieldArray({
// // //     control,
// // //     name: 'hero_variant1_icons',
// // //   });

// // //   const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
// // //     control,
// // //     name: 'hero_variant2_photos',
// // //   });

// // //   const onSubmit = async (data) => {
// // //     const toastId = toast.loading(variant?.id ? 'Updating variant...' : 'Creating variant...');
    
// // //     // We pass the *entire* form data and user ID to the API function
// // //     const { success, error } = await saveHeroVariant(data, '01e31b35-ed86-423b-abd5-01e97bbba857');
    
// // //     toast.dismiss(toastId);
// // //     if (success) {
// // //       toast.success('Variant saved successfully!');
// // //       onSave(); // This will trigger a refetch in the parent
// // //       onClose(); // Close the modal
// // //     } else {
// // //       toast.error(`Error: ${error.message}`);
// // //     }
// // //   };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       exit={{ opacity: 0 }}
// // //       className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
// // //       onClick={onClose}
// // //     >
// // //       <motion.div
// // //         initial={{ y: 50, scale: 0.95 }}
// // //         animate={{ y: 0, scale: 1 }}
// // //         exit={{ y: 50, scale: 0.95 }}
// // //         className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
// // //         onClick={e => e.stopPropagation()}
// // //       >
// // //         <div className="flex justify-between items-center p-6 border-b">
// // //           <h2 className="text-2xl font-bold text-gray-900">
// // //             {variant?.id ? 'Edit Hero Variant' : 'Create New Hero Variant'}
// // //           </h2>
// // //           <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-2">&times;</button>
// // //         </div>

// // //         <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             <FormInput label="Title" name="title" register={register} errors={errors} />
// // //             <FormInput label="Subtitle" name="subtitle" register={register} errors={errors} />
// // //           </div>
// // //           <FormTextarea label="Paragraph" name="paragraph" register={register} errors={errors} />
          
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
// // //             <Controller
// // //               name="variant_type"
// // //               control={control}
// // //               render={({ field }) => (
// // //                 <div className="flex flex-col">
// // //                   <label className="mb-2 text-sm font-medium text-gray-700">Variant Type</label>
// // //                   <select {...field} className="p-2 border rounded-md bg-white focus:ring-blue-500 focus:border-blue-500">
// // //                     <option value="variant1">Variant 1 (Icons)</option>
// // //                     <option value="variant2">Variant 2 (Photos)</option>
// // //                   </select>
// // //                 </div>
// // //               )}
// // //             />
// // //             <FormToggle label="Is Active?" name="is_active" control={control} />
// // //           </div>

// // //           {/* --- Conditional Fields --- */}
// // //           <AnimatePresence mode="wait">
// // //             {selectedVariantType === 'variant1' ? (
// // //               <motion.div
// // //                 key="variant1"
// // //                 initial={{ opacity: 0, y: 10 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 exit={{ opacity: 0, y: -10 }}
// // //                 className="p-4 border border-gray-200 rounded-lg space-y-4"
// // //               >
// // //                 <h3 className="font-semibold text-gray-800">Variant 1: Icons</h3>
// // //                 {iconFields.map((field, index) => (
// // //                   <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 border-b items-end">
// // //                     <Controller
// // //                       name={`hero_variant1_icons.${index}.icon_name`}
// // //                       control={control}
// // //                       render={({ field }) => (
// // //                         <div className="flex flex-col">
// // //                            <label className="mb-2 text-sm font-medium text-gray-700">Icon</label>
// // //                           <select {...field} className="p-2 border rounded-md bg-white focus:ring-blue-500 focus:border-blue-500">
// // //                             <option value="">Select Icon</option>
// // //                             {/* This should now work correctly */}
// // //                             {allIcons.map(iconName => <option key={iconName} value={iconName}>{iconName}</option>)}
// // //                           </select>
// // //                         </div>
// // //                       )}
// // //                     />
                    
// // //                     {/* --- FIX for [object Object] --- */}
// // //                     <FormJsonInput
// // //                       label="Position (JSON)"
// // //                       name={`hero_variant1_icons.${index}.position`}
// // //                       control={control}
// // //                       errors={errors}
// // //                       placeholder='{"top": "10%"}'
// // //                     />

// // //                     <button type="button" onClick={() => removeIcon(index)} className="text-red-500 hover:text-red-700 p-2">
// // //                       <Trash2 className="w-5 h-5" />
// // //                     </button>
// // //                   </div>
// // //                 ))}
// // //                 <button type="button" onClick={() => appendIcon({ icon_name: '', position: '{"top": "0", "left": "0"}' })} className="text-sm font-medium text-blue-600 hover:text-blue-800">
// // //                   <Plus className="w-4 h-4 inline mr-1" /> Add Icon
// // //                 </button>
// // //               </motion.div>
// // //             ) : (
// // //               <motion.div
// // //                 key="variant2"
// // //                 initial={{ opacity: 0, y: 10 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 exit={{ opacity: 0, y: -10 }}
// // //                 className="p-4 border border-gray-200 rounded-lg space-y-4"
// // //               >
// // //                 <h3 className="font-semibold text-gray-800">Variant 2: Photos</h3>
// // //                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
// // //                   {photoFields.map((field, index) => (
// // //                     <div key={field.id} className="space-y-2 p-2 border rounded-md relative">
// // //                       <ImageUpload
// // //                         name={`hero_variant2_photos.${index}`}
// // //                         control={control}
// // //                         defaultValue={field.media_assets} // Pass the full media_assets object
// // //                       />
// // //                       <FormInput
// // //                         label="Rotation"
// // //                         name={`hero_variant2_photos.${index}.rotation`}
// // //                         register={register}
// // //                         errors={errors}
// // //                         type="number"
// // //                       />
// // //                       <FormInput
// // //                         label="Delay (s)"
// // //                         name={`hero_variant2_photos.${index}.delay`}
// // //                         register={register}
// // //                         errors={errors}
// // //                         type="number"
// // //                         step="0.1"
// // //                       />
// // //                       <button
// // //                         type="button"
// // //                         onClick={() => removePhoto(index)}
// // //                         className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow"
// // //                       >
// // //                         <Trash2 className="w-4 h-4" />
// // //                       </button>
// // //                     </div>
// // //                   ))}
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => appendPhoto({ media_id: null, rotation: 0, delay: 0, file: null, originalMediaId: null })}
// // //                     className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 h-full"
// // //                   >
// // //                     <UploadCloud className="w-8 h-8" />
// // //                     <span className="text-sm mt-2">Add Photo</span>
// // //                   </button>
// // //                 </div>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         </form>

// // //         <div className="flex justify-end items-center p-6 border-t gap-4">
// // //           <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">Cancel</button>
// // //           <button
// // //             onClick={handleSubmit(onSubmit)}
// // //             disabled={isSubmitting}
// // //             className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition disabled:opacity-50"
// // //           >
// // //             {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
// // //             {isSubmitting ? 'Saving...' : 'Save Changes'}
// // //           </button>
// // //         </div>
// // //       </motion.div>
// // //     </motion.div>
// // //   );
// // // };

// // // // --- Main Editor Component ---
// // // const AdminHeroEditor = () => {
// // //   const [variants, setVariants] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [isSavingOrder, setIsSavingOrder] = useState(false);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [selectedVariant, setSelectedVariant] = useState(null);

// // //   // --- FIX: Get icon names from the imported map ---
// // //   const allIconNames = Object.keys(iconMap);

// // //   // Fetch and subscribe to data
// // //   const loadData = useCallback(async () => {
// // //     setIsLoading(true);
// // //     const data = await getHeroVariantsAdmin();
// // //     setVariants(data);
// // //     setIsLoading(false);
// // //   }, []);

// // //   useEffect(() => {
// // //     loadData();
// // //     const subscription = subscribeToHeroChanges(loadData);
// // //     return () => subscription.unsubscribe();
// // //   }, [loadData]);

// // //   // --- Handlers ---
// // //   const handleReorder = async (newOrder) => {
// // //     setVariants(newOrder); // Update UI immediately
// // //     setIsSavingOrder(true);
// // //     await updateHeroVariantsOrder(newOrder);
// // //     setIsSavingOrder(false);
// // //     toast.success('Hero order updated!');
// // //   };
  
// // //   const handleToggleActive = async (variant) => {
// // //     const toastId = toast.loading(variant.is_active ? 'Deactivating...' : 'Activating...');
// // //     // We just call saveHeroVariant with the *only* change
// // //     // We need the user for the upload logic, but it's not used here
// // //     await saveHeroVariant({ ...variant, is_active: !variant.is_active }, null); 
// // //     toast.dismiss(toastId);
// // //     toast.success('Visibility updated!');
// // //     // Real-time listener will handle the UI update
// // //   };
  
// // //   const handleDelete = async (variant) => {
// // //     if (window.confirm(`Are you sure you want to delete the variant "${variant.title || 'Untitled'}"? This cannot be undone.`)) {
// // //       const toastId = toast.loading('Deleting variant...');
// // //       const { success, error } = await deleteHeroVariant(variant);
// // //       toast.dismiss(toastId);
// // //       if (success) {
// // //         toast.success('Variant deleted.');
// // //       } else {
// // //         toast.error(`Error: ${error}`);
// // //       }
// // //       // Real-time listener will handle the UI update
// // //     }
// // //   };

// // //   const openModalToEdit = (variant) => {
// // //     // Deep copy the variant to prevent mutation of the list state
// // //     setSelectedVariant(JSON.parse(JSON.stringify(variant)));
// // //     setIsModalOpen(true);
// // //   };

// // //   const openModalToCreate = () => {
// // //     setSelectedVariant(null); // 'null' signifies "create mode"
// // //     setIsModalOpen(true);
// // //   };
  
// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       className="space-y-6"
// // //     >
// // //       <Toaster position="bottom-center" />

// // //       {/* Header */}
// // //       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
// // //         <div>
// // //           <Link to="/admin/homepage-config" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-2">
// // //             <ArrowLeft className="w-4 h-4" /> Back to Homepage Manager
// // //           </Link>
// // //           <h1 className="text-3xl font-bold text-gray-900">Edit Hero Section</h1>
// // //         </div>
// // //         <button
// // //           onClick={openModalToCreate}
// // //           className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
// // //         >
// // //           <Plus className="w-5 h-5" /> Create New Variant
// // //         </button>
// // //       </div>

// // //       {/* Editor Content Area */}
// // //       <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
// // //         <h2 className="text-xl font-semibold text-gray-800">Manage Hero Variants</h2>
// // //         <p className="text-gray-500 mt-2 mb-6">
// // //           Drag and drop variants to reorder them. You can have multiple active variants to create a carousel.
// // //         </p>
        
// // //         {isLoading ? (
// // //           <div className="flex items-center justify-center h-48"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
// // //         ) : (
// // //           <Reorder.Group axis="y" values={variants} onReorder={handleReorder} className="space-y-4">
// // //             {variants.map(variant => (
// // //               <Reorder.Item key={variant.id} value={variant} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
// // //                 <GripVertical className="text-gray-400 cursor-grab" />
// // //                 <div className="flex-1">
// // //                   <h3 className="font-semibold text-gray-900">{variant.title || 'Untitled'}</h3>
// // //                   <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${variant.variant_type === 'variant1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
// // //                     {variant.variant_type === 'variant1' ? 'Type 1: Icons' : 'Type 2: Photos'}
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex items-center gap-4">
// // //                   <button onClick={() => handleToggleActive(variant)} title={variant.is_active ? 'Deactivate' : 'Activate'}>
// // //                     {variant.is_active ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
// // //                   </button>
// // //                   <button onClick={() => openModalToEdit(variant)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
// // //                   <button onClick={() => handleDelete(variant)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
// // //                 </div>
// // //               </Reorder.Item>
// // //             ))}
// // //           </Reorder.Group>
// // //         )}
// // //         {isSavingOrder && <p className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Loader2 className="animate-spin" /> Saving new order...</p>}
// // //       </div>
      
// // //       {/* --- Editor Modal --- */}
// // //       <AnimatePresence>
// // //         {isModalOpen && (
// // //           <VariantEditorModal
// // //             variant={selectedVariant}
// // //             onClose={() => setIsModalOpen(false)}
// // //             onSave={loadData} // Refetch data on save
// // //             allIcons={allIconNames}
// // //           />
// // //         )}
// // //       </AnimatePresence>
// // //     </motion.div>
// // //   );
// // // };

// // // export default AdminHeroEditor;



// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Link } from 'react-router-dom';
// // import {
// //   ArrowLeft, Save, Loader2, Plus, Trash2, Eye, EyeOff, GripVertical, Image as ImageIcon, UploadCloud, AlertCircle
// // } from 'lucide-react';
// // import { motion, AnimatePresence, Reorder } from 'framer-motion';
// // import { useForm, useFieldArray, Controller } from 'react-hook-form';
// // import {
// //   getHeroVariantsAdmin,
// //   subscribeToHeroChanges,
// //   updateHeroVariantsOrder,
// //   deleteHeroVariant,
// //   saveHeroVariant,
// //   getStorageUrl, // Import helper from our API
// // } from '../../../api/heroadmin'; 
// // import * as LucideIcons from 'lucide-react'; // Import all icons for the picker
// // import toast, { Toaster } from 'react-hot-toast';
// // import { useAuth } from '../../../context/AuthContext'; // We need the user ID

// // // --- Helper: Icon Component ---
// // // This component renders a Lucide icon by its string name
// // const Icon = ({ name, ...props }) => {
// //   const LucideIcon = LucideIcons[name];
// //   if (!LucideIcon) {
// //     return <AlertCircle {...props} />; // Fallback icon
// //   }
// //   return <LucideIcon {...props} />;
// // };

// // // --- Reusable Form Components ---

// // const FormInput = ({ label, name, register, errors, type, ...rest }) => (
// //   <div className="flex flex-col">
// //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// //     <input 
// //       id={name} 
// //       type={type}
// //       // This is the fix for number inputs
// //       {...register(name, { valueAsNumber: type === 'number' })} 
// //       {...rest} 
// //       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// //     />
// //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
// //   </div>
// // );

// // const FormTextarea = ({ label, name, register, errors, ...rest }) => (
// //   <div className="flex flex-col">
// //     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// //     <textarea 
// //       id={name} 
// //       {...register(name)} 
// //       {...rest} 
// //       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// //       rows="3"
// //     />
// //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
// //   </div>
// // );

// // const IconSelect = ({ label, name, control, errors, allIcons }) => (
// //   <div className="flex flex-col">
// //     <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// //     <Controller
// //       name={name}
// //       control={control}
// //       render={({ field }) => (
// //         <div className="flex items-center gap-2">
// //           {/* Show a preview of the selected icon */}
// //           {field.value && <Icon name={field.value} className="w-6 h-6 flex-shrink-0" />}
// //           <select
// //             {...field}
// //             className={`p-2 border rounded-md w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
// //           >
// //             <option value="">Select an icon</option>
// //             {allIcons.map(iconName => (
// //               <option key={iconName} value={iconName}>{iconName}</option>
// //             ))}
// //           </select>
// //         </div>
// //       )}
// //     />
// //     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
// //   </div>
// // );

// // const ImageUpload = ({ name, control, setValue, watch, errors }) => {
// //   // We watch the file (new upload) and the media_assets (existing)
// //   const file = watch(`${name}.file`);
// //   const mediaAsset = watch(`${name}.media_assets`);
// //   const [preview, setPreview] = useState(null);

// //   useEffect(() => {
// //     // This logic determines what to show in the preview box
// //     if (file) {
// //       // 1. A new file is staged for upload. Show a local preview.
// //       const reader = new FileReader();
// //       reader.onloadend = () => setPreview(reader.result);
// //       reader.readAsDataURL(file);
// //     } else if (mediaAsset?.file_path) {
// //       // 2. An existing image is loaded from the database.
// //       if (mediaAsset.file_path.startsWith('http')) {
// //         // It's already a full URL (or a local preview from a previous selection)
// //         setPreview(mediaAsset.file_path);
// //       } else {
// //         // It's a file_path, so get the public URL from Supabase
// //         setPreview(getStorageUrl(mediaAsset));
// //       }
// //     } else {
// //       // 3. No file, no data. Show nothing.
// //       setPreview(null);
// //     }
// //   }, [file, mediaAsset, name]);

// //   const handleFileChange = (e) => {
// //     const newFile = e.target.files[0];
// //     if (newFile) {
// //       // --- CRITICAL FIX ---
// //       // Check if we're replacing an *existing* image.
// //       const currentMediaId = watch(`${name}.media_id`);
// //       if (currentMediaId) {
// //         // If so, store the ID of the image we're replacing.
// //         // The API will use this to delete the old file from storage.
// //         setValue(`${name}.originalMediaId`, currentMediaId, { shouldDirty: true });
// //       }
// //       // --- END FIX ---
      
// //       // Set the new file in the form state
// //       setValue(`${name}.file`, newFile, { shouldDirty: true });
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col">
// //       <div className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden">
// //         {preview ? (
// //           <img src={preview} alt="Preview" className="w-full h-full object-contain" />
// //         ) : (
// //           <ImageIcon className="w-12 h-12 text-gray-400" />
// //         )}
// //       </div>
// //       <div className="mt-2">
// //         <label htmlFor={`photo-upload-${name}`} className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
// //           <UploadCloud className="w-4 h-4" />
// //           <span>{file ? file.name : 'Change Photo'}</span>
// //         </label>
// //         <input
// //           type="file"
// //           id={`photo-upload-${name}`}
// //           className="hidden"
// //           accept="image/*"
// //           onChange={handleFileChange}
// //         />
// //       </div>
// //     </div>
// //   );
// // };


// // // --- Hero Variant Editor Modal ---
// // const VariantEditorModal = ({ variant, onClose, onSave, allIcons }) => {
// //   const { user } = useAuth(); // Get the authenticated user
// //   const isEditing = !!variant?.id;

// //   // Set up default values for new or existing variants
// //   const defaultValues = {
// //     id: variant?.id || undefined,
// //     variant_type: variant?.variant_type || 'variant1',
// //     title: variant?.title || '',
// //     subtitle: variant?.subtitle || '',
// //     paragraph: variant?.paragraph || '',
// //     is_active: variant?.is_active ?? true, // Default to active for new
// //     order: variant?.order ?? 0,
// //     hero_variant1_icons: variant?.hero_variant1_icons || [],
// //     hero_variant2_photos: variant?.hero_variant2_photos || [],
// //   };

// //   const { register, control, handleSubmit, watch, setValue, formState: { errors, isSubmitting, isDirty } } = useForm({
// //     defaultValues,
// //   });

// //   // Field array for Variant 1 Icons
// //   const { fields: iconFields, append: appendIcon, remove: removeIcon } = useFieldArray({
// //     control,
// //     name: "hero_variant1_icons"
// //   });

// //   // Field array for Variant 2 Photos
// //   const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
// //     control,
// //     name: "hero_variant2_photos"
// //   });

// //   const variantType = watch('variant_type'); // Watch type to conditionally render

// //   // --- Main Save Function ---
// //   const onSubmit = async (data) => {
// //     if (!user) {
// //       toast.error('You must be logged in to save.');
// //       return;
// //     }
// //     const toastId = toast.loading(isEditing ? 'Updating variant...' : 'Creating variant...');
    
// //     // --- FIX: Pass user.id to the API ---
// //     // The saveHeroVariant API is smart enough to handle file uploads,
// //     // data syncing, and file deletions all in one go.

// //     const { success, error } = await saveHeroVariant(data, '01e31b35-ed86-423b-abd5-01e97bbba857'); 
    
// //     toast.dismiss(toastId);
// //     if (success) {
// //       toast.success('Variant saved successfully!');
// //       onSave(); // This will refetch data in the parent
// //       onClose();
// //     } else {
// //       toast.error(`Failed to save: ${error.message}`);
// //     }
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
// //       onClick={onClose} // Close on backdrop click
// //     >
// //       <motion.div
// //         initial={{ y: 50, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         exit={{ y: 50, opacity: 0 }}
// //         className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[90vh] overflow-hidden flex flex-col"
// //         onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
// //       >
// //         <header className="p-6 border-b border-gray-200">
// //           <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Hero Variant' : 'Create New Hero Variant'}</h2>
// //         </header>

// //         {/* Form is split into scrollable content and fixed footer */}
// //         <form onSubmit={handleSubmit(onSubmit)} id="hero-variant-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          
// //           <FormInput label="Title" name="title" register={register} errors={errors} />
// //           <FormInput label="Subtitle" name="subtitle" register={register} errors={errors} />
// //           <FormTextarea label="Paragraph" name="paragraph" register={register} errors={errors} />

// //           {/* Variant Type Selector */}
// //           <div className="flex flex-col">
// //             <label className="mb-2 text-sm font-medium text-gray-700">Variant Type</label>
// //             <Controller
// //               name="variant_type"
// //               control={control}
// //               render={({ field }) => (
// //                 <select {...field} className="p-2 border rounded-md border-gray-300">
// //                   <option value="variant1">Variant 1 (Icons)</option>
// //                   <option value_type="variant2">Variant 2 (Photos)</option>
// //                 </select>
// //               )}
// //             />
// //           </div>

// //           {/* --- Variant 1 Fields --- */}
// //           {variantType === 'variant1' && (
// //             <div className="p-4 border border-blue-200 rounded-md bg-blue-50/50 space-y-4">
// //               <h3 className="font-semibold text-blue-800">Variant 1: Icons</h3>
// //               {iconFields.map((field, index) => (
// //                 <div key={field.id} className="flex items-end gap-2 p-2 border-b">
// //                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
// //                     <IconSelect
// //                       label="Icon"
// //                       name={`hero_variant1_icons.${index}.icon_name`}
// //                       control={control}
// //                       errors={errors}
// //                       allIcons={allIcons}
// //                     />
// //                     <FormInput
// //                       label="Position (JSON)"
// //                       name={`hero_variant1_icons.${index}.position`}
// //                       register={register}
// //                       errors={errors}
// //                       placeholder='{"top": "10%", "left": "5%"}'
// //                     />
// //                   </div>
// //                   <button type="button" onClick={() => removeIcon(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-md">
// //                     <Trash2 className="w-5 h-5" />
// //                   </button>
// //                 </div>
// //               ))}
// //               <button type="button" onClick={() => appendIcon({ icon_name: '', position: '{"top": "10%", "left": "10%"}' })} className="text-sm font-medium text-blue-600 flex items-center gap-1">
// //                 <Plus className="w-4 h-4" /> Add Icon
// //               </button>
// //             </div>
// //           )}

// //           {/* --- Variant 2 Fields --- */}
// //           {variantType === 'variant2' && (
// //             <div className="p-4 border border-purple-200 rounded-md bg-purple-50/50 space-y-4">
// //               <h3 className="font-semibold text-purple-800">Variant 2: Photos</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 {photoFields.map((field, index) => (
// //                   <div key={field.id} className="p-3 border rounded-md bg-white shadow-sm space-y-2">
// //                     <ImageUpload
// //                       name={`hero_variant2_photos.${index}`}
// //                       control={control}
// //                       setValue={setValue}
// //                       watch={watch}
// //                       errors={errors}
// //                     />
// //                     <div className="grid grid-cols-2 gap-2">
// //                       <FormInput
// //                         label="Rotation (°)"
// //                         name={`hero_variant2_photos.${index}.rotation`}
// //                         register={register}
// //                         errors={errors}
// //                         type="number"
// //                         placeholder="-5"
// //                       />
// //                       <FormInput
// //                         label="Delay (s)"
// //                         name={`hero_variant2_photos.${index}.delay`}
// //                         register={register}
// //                         errors={errors}
// //                         type="number"
// //                         step="0.1"
// //                         placeholder="0.2"
// //                       />
// //                     </div>
// //                     <button type="button" onClick={() => removePhoto(index)} className="w-full text-sm font-medium text-red-600 flex items-center justify-center gap-1 p-2 hover:bg-red-50 rounded-md">
// //                       <Trash2 className="w-4 h-4" /> Remove Photo
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //               <button type="button" onClick={() => appendPhoto({ media_id: null, rotation: 0, delay: 0.1, media_assets: null, file: null })} className="text-sm font-medium text-purple-600 flex items-center gap-1">
// //                 <Plus className="w-4 h-4" /> Add Photo
// //               </button>
// //             </div>
// //           )}

// //         </form>

// //         <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
// //           <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             form="hero-variant-form" // Triggers the form's onSubmit
// //             disabled={isSubmitting || !isDirty}
// //             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
// //           >
// //             {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
// //             Save Changes
// //           </button>
// //         </footer>
// //       </motion.div>
// //     </motion.div>
// //   );
// // };


// // // --- Main Admin Page Component ---
// // const AdminHeroEditor = () => {
// //   const { user } = useAuth(); // FIX: Get user
// //   const [variants, setVariants] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedVariant, setSelectedVariant] = useState(null);
// //   const [isSavingOrder, setIsSavingOrder] = useState(false);

// //   // Get all Lucide icon names for the IconSelect picker
// //   const iconNames = Object.keys(LucideIcons).filter(key => key !== 'default' && key !== 'createLucideIcon');

// //   const loadData = useCallback(async () => {
// //     // We don't need to setIsLoading(true) here
// //     // because the subscription will handle updates.
// //     const data = await getHeroVariantsAdmin();
// //     setVariants(data);
// //     setIsLoading(false);
// //   }, []);

// //   // Initial data load
// //   useEffect(() => {
// //     loadData();
// //   }, [loadData]);

// //   // Subscribe to changes in all relevant tables
// //   useEffect(() => {
// //     const channel = subscribeToHeroChanges(loadData); // Re-run loadData on any change
// //     return () => {
// //       if (channel) channel.unsubscribe();
// //     };
// //   }, [loadData]);

// //   const handleToggleActive = async (variant) => {
// //     if (!user) {
// //       toast.error('You must be logged in.');
// //       return;
// //     }
// //     const toastId = toast.loading(variant.is_active ? 'Deactivating...' : 'Activating...');
// //     // --- FIX: Pass user.id to the save function ---
// //     const { success, error } = await saveHeroVariant(
// //       { ...variant, is_active: !variant.is_active }, 
// //       user.id
// //     );
// //     toast.dismiss(toastId);
// //     if (success) {
// //       toast.success('Variant updated!');
// //     } else {
// //       toast.error(`Failed to update: ${error.message}`);
// //     }
// //   };

// //   const handleDelete = async (variant) => {
// //     if (window.confirm('Are you sure you want to delete this variant? This will also delete associated images and cannot be undone.')) {
// //       const toastId = toast.loading('Deleting variant...');
// //       const { success, error } = await deleteHeroVariant(variant);
// //       toast.dismiss(toastId);
// //       if (success) {
// //         toast.success('Variant deleted!');
// //       } else {
// //         toast.error(`Failed to delete: ${error.message}`);
// //       }
// //     }
// //   };

// //   const handleOrderSave = async (newOrderedVariants) => {
// //     setIsSavingOrder(true);
// //     setVariants(newOrderedVariants); // Optimistic update of UI
// //     const { success, error } = await updateHeroVariantsOrder(newOrderedVariants);
// //     if (success) {
// //       toast.success('Order saved!');
// //     } else {
// //       toast.error(`Failed to save order: ${error.message}`);
// //       loadData(); // Revert on failure
// //     }
// //     setIsSavingOrder(false);
// //   };

// //   const openModalToCreate = () => {
// //     setSelectedVariant(null);
// //     setIsModalOpen(true);
// //   };

// //   const openModalToEdit = (variant) => {
// //     setSelectedVariant(variant);
// //     setIsModalOpen(true);
// //   };

// //   return (
// //     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
// //       <Toaster position="top-center" />
// //       <header className="flex items-center justify-between mb-6">
// //         <div className="flex items-center gap-4">
// //           <Link to="/admin" className="text-gray-500 hover:text-gray-800">
// //             <ArrowLeft className="w-6 h-6" />
// //           </Link>
// //           <h1 className="text-3xl font-bold text-gray-900">Hero Editor</h1>
// //         </div>
// //         <button
// //           onClick={openModalToCreate}
// //           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
// //         >
// //           <Plus className="w-4 h-4" /> Create New
// //         </button>
// //       </header>

// //       {/* --- Main Content Area --- */}
// //       <div className="max-w-4xl mx-auto">
// //         <p className="text-sm text-gray-600 mb-4">Drag and drop items to re-order them on the homepage.</p>
// //         {isLoading ? (
// //           <div className="flex justify-center items-center h-64">
// //             <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
// //           </div>
// //         ) : (
// //           <Reorder.Group axis="y" values={variants} onReorder={handleOrderSave}>
// //             {variants.map(variant => (
// //               <Reorder.Item key={variant.id} value={variant} className="mb-4">
// //                 <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
// //                   <div className="flex items-center gap-4">
// //                     <button className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to re-order">
// //                       <GripVertical className="w-5 h-5" />
// //                     </button>
// //                     <div>
// //                       <h3 className="font-semibold text-lg text-gray-800">{variant.title}</h3>
// //                       <p className="text-sm text-gray-500">{variant.subtitle}</p>
// //                     </div>
// //                     <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variant.variant_type === 'variant1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
// //                       {variant.variant_type === 'variant1' ? 'Type 1: Icons' : 'Type 2: Photos'}
// //                     </span>
// //                   </div>
// //                   <div className="flex items-center gap-4">
// //                     <button onClick={() => handleToggleActive(variant)} title={variant.is_active ? 'Deactivate' : 'Activate'}>
// //                       {variant.is_active ? <Eye className="w-5 h-5 text-green-500 hover:text-green-700" /> : <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
// //                     </button>
// //                     <button onClick={() => openModalToEdit(variant)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
// //                     <button onClick={() => handleDelete(variant)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
// //                   </div>
// //                 </div>
// //               </Reorder.Item>
// //             ))}
// //           </Reorder.Group>
// //         )}
// //         {isSavingOrder && <p className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Saving new order...</p>}
// //       </div>
      
// //       {/* --- Editor Modal --- */}
// //       <AnimatePresence>
// //         {isModalOpen && (
// //           <VariantEditorModal
// //             variant={selectedVariant}
// //             onClose={() => setIsModalOpen(false)}
// //             onSave={loadData} // Refetch data on save
// //             allIcons={iconNames} // Pass the generated icon names
// //           />
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default AdminHeroEditor;


// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowLeft, Save, Loader2, Plus, Trash2, Eye, EyeOff, GripVertical, Image as ImageIcon, UploadCloud, AlertCircle
// } from 'lucide-react';
// import { motion, AnimatePresence, Reorder } from 'framer-motion';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import {
//   getHeroVariantsAdmin,
//   subscribeToHeroChanges,
//   updateHeroVariantsOrder,
//   deleteHeroVariant,
//   saveHeroVariant,
//   getStorageUrl, // Assuming this is in your heroadmin.js or a helper
// } from '../../../api/heroadmin'; 
// import * as LucideIcons from 'lucide-react'; // Import all icons for the picker
// import toast, { Toaster } from 'react-hot-toast';
// import { useAuth } from '../../../context/AuthContext'; // We need the user ID

// // --- Helper: Icon Component ---
// // This component renders a Lucide icon by its string name
// const Icon = ({ name, ...props }) => {
//   const LucideIcon = LucideIcons[name];
//   if (!LucideIcon) {
//     return <AlertCircle {...props} />; // Fallback icon
//   }
//   return <LucideIcon {...props} />;
// };

// // --- Reusable Form Components ---

// const FormInput = ({ label, name, register, errors, type, ...rest }) => (
//   <div className="flex flex-col">
//     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
//     <input 
//       id={name} 
//       type={type}
//       // This is the fix for number inputs
//       {...register(name, { valueAsNumber: type === 'number' })} 
//       {...rest} 
//       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
//     />
//     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
//   </div>
// );

// const FormTextarea = ({ label, name, register, errors, ...rest }) => (
//   <div className="flex flex-col">
//     <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
//     <textarea 
//       id={name} 
//       {...register(name)} 
//       {...rest} 
//       className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
//       rows="3"
//     />
//     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
//   </div>
// );

// const IconSelect = ({ label, name, control, errors, allIcons }) => (
//   <div className="flex flex-col">
//     <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <div className="flex items-center gap-2">
//           {/* Show a preview of the selected icon */}
//           {field.value && <Icon name={field.value} className="w-6 h-6 flex-shrink-0" />}
//           <select
//             {...field}
//             className={`p-2 border rounded-md w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
//           >
//             <option value="">Select an icon</option>
//             {allIcons.map(iconName => (
//               <option key={iconName} value={iconName}>{iconName}</option>
//             ))}
//           </select>
//         </div>
//       )}
//     />
//     {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
//   </div>
// );

// const ImageUpload = ({ name, control, setValue, watch, errors }) => {
//   // We watch the file (new upload) and the media_assets (existing)
//   const file = watch(`${name}.file`);
//   const mediaAsset = watch(`${name}.media_assets`);
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     // This logic determines what to show in the preview box
//     if (file) {
//       // 1. A new file is staged for upload. Show a local preview.
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     } else if (mediaAsset?.file_path) {
//       // 2. An existing image is loaded from the database.
//       setPreview(getStorageUrl(mediaAsset));
//     } else {
//       // 3. No file, no data. Show nothing.
//       setPreview(null);
//     }
//   }, [file, mediaAsset, name]);

//   const handleFileChange = (e) => {
//     const newFile = e.target.files[0];
//     if (newFile) {
//       // --- CRITICAL FIX ---
//       // Check if we're replacing an *existing* image.
//       const currentMediaId = watch(`${name}.media_id`);
//       if (currentMediaId) {
//         // If so, store the ID of the image we're replacing.
//         // The API will use this to delete the old file from storage.
//         setValue(`${name}.originalMediaId`, currentMediaId, { shouldDirty: true });
//       }
//       // --- END FIX ---
      
//       // Set the new file in the form state
//       setValue(`${name}.file`, newFile, { shouldDirty: true });
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden">
//         {preview ? (
//           <img src={preview} alt="Preview" className="w-full h-full object-contain" />
//         ) : (
//           <ImageIcon className="w-12 h-12 text-gray-400" />
//         )}
//       </div>
//       <div className="mt-2">
//         <label htmlFor={`photo-upload-${name}`} className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
//           <UploadCloud className="w-4 h-4" />
//           <span>{file ? file.name : 'Change Photo'}</span>
//         </label>
//         <input
//           type="file"
//           id={`photo-upload-${name}`}
//           className="hidden"
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };


// // --- Hero Variant Editor Modal ---
// const VariantEditorModal = ({ variant, onClose, onSave, allIcons }) => {
//   const { user } = useAuth(); // Get the authenticated user
//   const isEditing = !!variant?.id;

//   // Set up default values for new or existing variants
//   const defaultValues = {
//     id: variant?.id || undefined,
//     variant_type: variant?.variant_type || 'variant1',
//     title: variant?.title || '',
//     subtitle: variant?.subtitle || '',
//     paragraph: variant?.paragraph || '',
//     is_active: variant?.is_active ?? true, // Default to active for new
//     order: variant?.order ?? 0,
//     hero_variant1_icons: variant?.hero_variant1_icons || [],
//     hero_variant2_photos: variant?.hero_variant2_photos || [],
//   };

//   const { register, control, handleSubmit, watch, setValue, formState: { errors, isSubmitting, isDirty } } = useForm({
//     defaultValues,
//   });

//   // Field array for Variant 1 Icons
//   const { fields: iconFields, append: appendIcon, remove: removeIcon } = useFieldArray({
//     control,
//     name: "hero_variant1_icons"
//   });

//   // Field array for Variant 2 Photos
//   const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
//     control,
//     name: "hero_variant2_photos"
//   });

//   const variantType = watch('variant_type'); // Watch type to conditionally render

//   // --- Main Save Function ---
//   const onSubmit = async (data) => {
//     if (!user) {
//       toast.error('You must be logged in to save.');
//       return;
//     }
//     const toastId = toast.loading(isEditing ? 'Updating variant...' : 'Creating variant...');
    
//     // --- FIX: Pass user.id to the API ---
//     // The API will now receive the position as a proper object,
//     // e.g., { position: { top: '10%', left: '5%', bottom: '', right: '' } }
//     // Make sure your `saveHeroVariant` function cleans this up (removes empty keys)
//     // before saving to the jsonb column.
//     const { success, error } = await saveHeroVariant(data, user.id); 
    
//     toast.dismiss(toastId);
//     if (success) {
//       toast.success('Variant saved successfully!');
//       onSave(); // This will refetch data in the parent
//       onClose();
//     } else {
//       toast.error(`Failed to save: ${error.message}`);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
//       onClick={onClose} // Close on backdrop click
//     >
//       <motion.div
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//         className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[90vh] overflow-hidden flex flex-col"
//         onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
//       >
//         <header className="p-6 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Hero Variant' : 'Create New Hero Variant'}</h2>
//         </header>

//         {/* Form is split into scrollable content and fixed footer */}
//         <form onSubmit={handleSubmit(onSubmit)} id="hero-variant-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          
//           <FormInput label="Title" name="title" register={register} errors={errors} />
//           <FormInput label="Subtitle" name="subtitle" register={register} errors={errors} />
//           <FormTextarea label="Paragraph" name="paragraph" register={register} errors={errors} />

//           {/* Variant Type Selector */}
//           <div className="flex flex-col">
//             <label className="mb-2 text-sm font-medium text-gray-700">Variant Type</label>
//             <Controller
//               name="variant_type"
//               control={control}
//               render={({ field }) => (
//                 <select {...field} className="p-2 border rounded-md border-gray-300">
//                   <option value="variant1">Variant 1 (Icons)</option>
//                   <option value="variant2">Variant 2 (Photos)</option>
//                 </select>
//               )}
//             />
//           </div>

//           {/* --- Variant 1 Fields --- */}
//           {variantType === 'variant1' && (
//             <div className="p-4 border border-blue-200 rounded-md bg-blue-50/50 space-y-4">
//               <h3 className="font-semibold text-blue-800">Variant 1: Icons</h3>
//               {iconFields.map((field, index) => (
//                 <div key={field.id} className="flex flex-col md:flex-row items-start gap-2 p-2 border-b">
//                   <div className="flex-1 w-full">
//                     <IconSelect
//                       label="Icon"
//                       name={`hero_variant1_icons.${index}.icon_name`}
//                       control={control}
//                       errors={errors}
//                       allIcons={allIcons}
//                     />
//                   </div>
                  
//                   {/* --- FIX: Replaced single JSON input with 4 user-friendly inputs --- */}
//                   <div className="flex-1 w-full">
//                     <label className="mb-2 text-sm font-medium text-gray-700 block">Position</label>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                       <FormInput
//                         label="Top"
//                         name={`hero_variant1_icons.${index}.position.top`}
//                         register={register}
//                         errors={errors}
//                         placeholder="10%"
//                       />
//                       <FormInput
//                         label="Bottom"
//                         name={`hero_variant1_icons.${index}.position.bottom`}
//                         register={register}
//                         errors={errors}
//                         placeholder="auto"
//                       />
//                       <FormInput
//                         label="Left"
//                         name={`hero_variant1_icons.${index}.position.left`}
//                         register={register}
//                         errors={errors}
//                         placeholder="5%"
//                       />
//                       <FormInput
//                         label="Right"
//                         name={`hero_variant1_icons.${index}.position.right`}
//                         register={register}
//                         errors={errors}
//                         placeholder="auto"
//                       />
//                     </div>
//                   </div>
//                   {/* --- END FIX --- */}
                  
//                   <button type="button" onClick={() => removeIcon(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-md mt-0 md:mt-8">
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               ))}
//               <button 
//                 type="button" 
//                 // --- FIX: Append a proper nested object for the new inputs ---
//                 onClick={() => appendIcon({ 
//                   icon_name: '', 
//                   position: { top: '', bottom: '', left: '', right: '' } 
//                 })} 
//                 // --- END FIX ---
//                 className="text-sm font-medium text-blue-600 flex items-center gap-1"
//               >
//                 <Plus className="w-4 h-4" /> Add Icon
//               </button>
//             </div>
//           )}

//           {/* --- Variant 2 Fields --- */}
//           {variantType === 'variant2' && (
//             <div className="p-4 border border-purple-200 rounded-md bg-purple-50/50 space-y-4">
//               <h3 className="font-semibold text-purple-800">Variant 2: Photos</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {photoFields.map((field, index) => (
//                   <div key={field.id} className="p-3 border rounded-md bg-white shadow-sm space-y-2">
//                     <ImageUpload
//                       name={`hero_variant2_photos.${index}`}
//                       control={control}
//                       setValue={setValue}
//                       watch={watch}
//                       errors={errors}
//                     />
//                     <div className="grid grid-cols-2 gap-2">
//                       <FormInput
//                         label="Rotation (°)"
//                         name={`hero_variant2_photos.${index}.rotation`}
//                         register={register}
//                         errors={errors}
//                         type="number"
//                         placeholder="-5"
//                       />
//                       <FormInput
//                         label="Delay (s)"
//                         name={`hero_variant2_photos.${index}.delay`}
//                         register={register}
//                         errors={errors}
//                         type="number"
//                         step="0.1"
//                         placeholder="0.2"
//                       />
//                     </div>
//                     <button type="button" onClick={() => removePhoto(index)} className="w-full text-sm font-medium text-red-600 flex items-center justify-center gap-1 p-2 hover:bg-red-50 rounded-md">
//                       <Trash2 className="w-4 h-4" /> Remove Photo
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <button type="button" onClick={() => appendPhoto({ media_id: null, rotation: 0, delay: 0.1, media_assets: null, file: null })} className="text-sm font-medium text-purple-600 flex items-center gap-1">
//                 <Plus className="w-4 h-4" /> Add Photo
//               </button>
//             </div>
//           )}

//         </form>

//         <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
//           <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
//             Cancel
//           </button>
//           <button
//             type="submit"
//             form="hero-variant-form" // Triggers the form's onSubmit
//             disabled={isSubmitting || !isDirty}
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//             Save Changes
//           </button>
//         </footer>
//       </motion.div>
//     </motion.div>
//   );
// };


// // --- Main Admin Page Component ---
// const AdminHeroEditor = () => {
//   const { user } = useAuth(); // FIX: Get user
//   const [variants, setVariants] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [isSavingOrder, setIsSavingOrder] = useState(false);

//   // Get all Lucide icon names for the IconSelect picker
//   const iconNames = Object.keys(LucideIcons).filter(key => key !== 'default' && key !== 'createLucideIcon' && /^[A-Z]/.test(key));

//   const loadData = useCallback(async () => {
//     // We don't need to setIsLoading(true) here
//     // because the subscription will handle updates.
//     const data = await getHeroVariantsAdmin();
//     setVariants(data);
//     setIsLoading(false);
//   }, []);

//   // Initial data load
//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // Subscribe to changes in all relevant tables
//   useEffect(() => {
//     const channel = subscribeToHeroChanges(loadData); // Re-run loadData on any change
//     return () => {
//       if (channel) channel.unsubscribe();
//     };
//   }, [loadData]);

//   const handleToggleActive = async (variant) => {
//     if (!user) {
//       toast.error('You must be logged in.');
//       return;
//     }
//     const toastId = toast.loading(variant.is_active ? 'Deactivating...' : 'Activating...');
//     // --- FIX: Pass user.id to the save function ---
//     const { success, error } = await saveHeroVariant(
//       { ...variant, is_active: !variant.is_active }, 
//       user.id
//     );
//     toast.dismiss(toastId);
//     if (success) {
//       toast.success('Variant updated!');
//     } else {
//       toast.error(`Failed to update: ${error.message}`);
//     }
//   };

//   const handleDelete = async (variant) => {
//     if (window.confirm('Are you sure you want to delete this variant? This will also delete associated images and cannot be undone.')) {
//       const toastId = toast.loading('Deleting variant...');
//       const { success, error } = await deleteHeroVariant(variant);
//       toast.dismiss(toastId);
//       if (success) {
//         toast.success('Variant deleted!');
//       } else {
//         toast.error(`Failed to delete: ${error.message}`);
//       }
//     }
//   };

//   const handleOrderSave = async (newOrderedVariants) => {
//     setIsSavingOrder(true);
//     setVariants(newOrderedVariants); // Optimistic update of UI
//     const { success, error } = await updateHeroVariantsOrder(newOrderedVariants);
//     if (success) {
//       toast.success('Order saved!');
//     } else {
//       toast.error(`Failed to save order: ${error.message}`);
//       loadData(); // Revert on failure
//     }
//     setIsSavingOrder(false);
//   };

//   const openModalToCreate = () => {
//     setSelectedVariant(null);
//     setIsModalOpen(true);
//   };

//   const openModalToEdit = (variant) => {
//     setSelectedVariant(variant);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
//       <Toaster position="top-center" />
//       <header className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-4">
//           <Link to="/admin" className="text-gray-500 hover:text-gray-800">
//             <ArrowLeft className="w-6 h-6" />
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Hero Editor</h1>
//         </div>
//         <button
//           onClick={openModalToCreate}
//           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
//         >
//           <Plus className="w-4 h-4" /> Create New
//         </button>
//       </header>

//       {/* --- Main Content Area --- */}
//       <div className="max-w-4xl mx-auto">
//         <p className="text-sm text-gray-600 mb-4">Drag and drop items to re-order them on the homepage.</p>
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
//           </div>
//         ) : (
//           <Reorder.Group axis="y" values={variants} onReorder={handleOrderSave}>
//             {variants.map(variant => (
//               <Reorder.Item key={variant.id} value={variant} className="mb-4">
//                 <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <button className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to re-order">
//                       <GripVertical className="w-5 h-5" />
//                     </button>
//                     <div>
//                       <h3 className="font-semibold text-lg text-gray-800">{variant.title}</h3>
//                       <p className="text-sm text-gray-500">{variant.subtitle}</p>
//                     </div>
//                     <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variant.variant_type === 'variant1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
//                       {variant.variant_type === 'variant1' ? 'Type 1: Icons' : 'Type 2: Photos'}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <button onClick={() => handleToggleActive(variant)} title={variant.is_active ? 'Deactivate' : 'Activate'}>
//                       {variant.is_active ? <Eye className="w-5 h-5 text-green-500 hover:text-green-700" /> : <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
//                     </button>
//                     <button onClick={() => openModalToEdit(variant)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
//                     <button onClick={() => handleDelete(variant)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
//                   </div>
//                 </div>
//               </Reorder.Item>
//             ))}
//           </Reorder.Group>
//         )}
//         {isSavingOrder && <p className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Saving new order...</p>}
//       </div>
      
//       {/* --- Editor Modal --- */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <VariantEditorModal
//             variant={selectedVariant}
//             onClose={() => setIsModalOpen(false)}
//             onSave={loadData} // Refetch data on save
//             allIcons={iconNames} // Pass the generated icon names
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminHeroEditor;



import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, Eye, EyeOff, GripVertical, Image as ImageIcon, UploadCloud, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  getHeroVariantsAdmin,
  subscribeToHeroChanges,
  updateHeroVariantsOrder,
  deleteHeroVariant,
  saveHeroVariant,
  getStorageUrl, // Import helper from our API
} from '../../../api/heroadmin'; 
import * as LucideIcons from 'lucide-react'; // Import all icons for the picker
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext'; // We need the user ID

// --- Helper: Icon Component ---
// This component renders a Lucide icon by its string name
const Icon = ({ name, ...props }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return <AlertCircle {...props} />; // Fallback icon
  }
  return <LucideIcon {...props} />;
};

// --- Reusable Form Components ---

const FormInput = ({ label, name, register, errors, type, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <input 
      id={name} 
      type={type}
      // This is the fix for number inputs
      {...register(name, { valueAsNumber: type === 'number' })} 
      {...rest} 
      className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
    />
    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
  </div>
);

const FormTextarea = ({ label, name, register, errors, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <textarea 
      id={name} 
      {...register(name)} 
      {...rest} 
      className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
      rows="3"
    />
    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
  </div>
);

const IconSelect = ({ label, name, control, errors, allIcons }) => (
  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          {/* Show a preview of the selected icon */}
          {field.value && <Icon name={field.value} className="w-6 h-6 flex-shrink-0" />}
          <select
            {...field}
            className={`p-2 border rounded-md w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
          >
            <option value="">Select an icon</option>
            {allIcons.map(iconName => (
              <option key={iconName} value={iconName}>{iconName}</option>
            ))}
          </select>
        </div>
      )}
    />
    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
  </div>
);

const ImageUpload = ({ name, control, setValue, watch, errors }) => {
  // We watch the file (new upload) and the media_assets (existing)
  const file = watch(`${name}.file`);
  const mediaAsset = watch(`${name}.media_assets`);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // This logic determines what to show in the preview box
    if (file) {
      // 1. A new file is staged for upload. Show a local preview.
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (mediaAsset) {
      // 2. An existing image is loaded from the database.
      setPreview(getStorageUrl(mediaAsset));
    } else {
      // 3. No file, no data. Show nothing.
      setPreview(null);
    }
  }, [file, mediaAsset, name]);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      // --- CRITICAL FIX ---
      // Check if we're replacing an *existing* image.
      const currentMediaId = watch(`${name}.media_id`);
      if (currentMediaId) {
        // If so, store the ID of the image we're replacing.
        // The API will use this to delete the old file from storage.
        setValue(`${name}.originalMediaId`, currentMediaId, { shouldDirty: true });
      }
      // --- END FIX ---
      
      // Set the new file in the form state
      setValue(`${name}.file`, newFile, { shouldDirty: true });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-contain" />
        ) : (
          <ImageIcon className="w-12 h-12 text-gray-400" />
        )}
      </div>
      <div className="mt-2">
        <label htmlFor={`photo-upload-${name}`} className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          <span>{file ? file.name : 'Change Photo'}</span>
        </label>
        <input
          type="file"
          id={`photo-upload-${name}`}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};


// --- Hero Variant Editor Modal ---
const VariantEditorModal = ({ variant, onClose, onSave, allIcons }) => {
  const { user } = useAuth(); // Get the authenticated user
  const isEditing = !!variant?.id;

  // Set up default values for new or existing variants
  const defaultValues = {
    id: variant?.id || undefined,
    variant_type: variant?.variant_type || 'variant1',
    title: variant?.title || '',
    subtitle: variant?.subtitle || '',
    paragraph: variant?.paragraph || '',
    is_active: variant?.is_active ?? true, // Default to active for new
    order: variant?.order ?? 0,
    hero_variant1_icons: variant?.hero_variant1_icons || [],
    hero_variant2_photos: variant?.hero_variant2_photos || [],
  };

  const { register, control, handleSubmit, watch, setValue, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues,
  });

  // Field array for Variant 1 Icons
  const { fields: iconFields, append: appendIcon, remove: removeIcon } = useFieldArray({
    control,
    name: "hero_variant1_icons"
  });

  // Field array for Variant 2 Photos
  const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
    control,
    name: "hero_variant2_photos"
  });

  const variantType = watch('variant_type'); // Watch type to conditionally render

  // --- Main Save Function ---
  const onSubmit = async (data) => {
    if (!user) {
      toast.error('You must be logged in to save.');
      return;
    }
    const toastId = toast.loading(isEditing ? 'Updating variant...' : 'Creating variant...');
    
    // --- FIX: Pass user.id to the API ---
    // Our new API is now robust and handles all cases.
    const { success, error } = await saveHeroVariant(data, user.id); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('Variant saved successfully!');
      onSave(); // This will refetch data in the parent
      onClose();
    } else {
      toast.error(`Failed to save: ${error.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
      onClick={onClose} // Close on backdrop click
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        <header className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Hero Variant' : 'Create New Hero Variant'}</h2>
        </header>

        {/* Form is split into scrollable content and fixed footer */}
        <form onSubmit={handleSubmit(onSubmit)} id="hero-variant-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <FormInput label="Title" name="title" register={register} errors={errors} />
          <FormInput label="Subtitle" name="subtitle" register={register} errors={errors} />
          <FormTextarea label="Paragraph" name="paragraph" register={register} errors={errors} />

          {/* Variant Type Selector */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Variant Type</label>
            <Controller
              name="variant_type"
              control={control}
              render={({ field }) => (
                <select {...field} className="p-2 border rounded-md border-gray-300">
                  <option value="variant1">Variant 1 (Icons)</option>
                  <option value="variant2">Variant 2 (Photos)</option>
                </select>
              )}
            />
          </div>

          {/* --- Variant 1 Fields --- */}
          {variantType === 'variant1' && (
            <div className="p-4 border border-blue-200 rounded-md bg-blue-50/50 space-y-4">
              <h3 className="font-semibold text-blue-800">Variant 1: Icons</h3>
              {iconFields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row items-start gap-2 p-2 border-b">
                  <div className="flex-1 w-full">
                    <IconSelect
                      label="Icon"
                      name={`hero_variant1_icons.${index}.icon_name`}
                      control={control}
                      errors={errors}
                      allIcons={allIcons}
                    />
                  </div>
                  
                  {/* --- User-friendly Position inputs --- */}
                  <div className="flex-1 w-full">
                    <label className="mb-2 text-sm font-medium text-gray-700 block">Position</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <FormInput
                        label="Top"
                        name={`hero_variant1_icons.${index}.position.top`}
                        register={register}
                        errors={errors}
                        placeholder="10%"
                      />
                      <FormInput
                        label="Bottom"
                        name={`hero_variant1_icons.${index}.position.bottom`}
                        register={register}
                        errors={errors}
                        placeholder="auto"
                      />
                      <FormInput
                        label="Left"
                        name={`hero_variant1_icons.${index}.position.left`}
                        register={register}
                        errors={errors}
                        placeholder="5%"
                      />
                      <FormInput
                        label="Right"
                        name={`hero_variant1_icons.${index}.position.right`}
                        register={register}
                        errors={errors}
                        placeholder="auto"
                      />
                    </div>
                  </div>
                  
                  <button type="button" onClick={() => removeIcon(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-md mt-0 md:mt-8">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => appendIcon({ 
                  id: undefined, // Be explicit
                  icon_name: '', 
                  position: { top: '', bottom: '', left: '', right: '' } 
                })} 
                className="text-sm font-medium text-blue-600 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Icon
              </button>
            </div>
          )}

          {/* --- Variant 2 Fields --- */}
          {variantType === 'variant2' && (
            <div className="p-4 border border-purple-200 rounded-md bg-purple-50/50 space-y-4">
              <h3 className="font-semibold text-purple-800">Variant 2: Photos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photoFields.map((field, index) => (
                  <div key={field.id} className="p-3 border rounded-md bg-white shadow-sm space-y-2">
                    <ImageUpload
                      name={`hero_variant2_photos.${index}`}
                      control={control}
                      setValue={setValue}
                      watch={watch}
                      errors={errors}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <FormInput
                        label="Rotation (°)"
                        name={`hero_variant2_photos.${index}.rotation`}
                        register={register}
                        errors={errors}
                        type="number"
                        placeholder="-5"
                      />
                      <FormInput
                        label="Delay (s)"
                        name={`hero_variant2_photos.${index}.delay`}
                        register={register}
                        errors={errors}
                        type="number"
                        step="0.1"
                        placeholder="0.2"
                      />
                    </div>
                    <button type="button" onClick={() => removePhoto(index)} className="w-full text-sm font-medium text-red-600 flex items-center justify-center gap-1 p-2 hover:bg-red-50 rounded-md">
                      <Trash2 className="w-4 h-4" /> Remove Photo
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                // --- THIS IS THE SMALL FIX ---
                // Explicitly set id: undefined to prevent react-hook-form from
                // inferring id: null, which caused the database error.
                onClick={() => appendPhoto({ 
                  id: undefined, 
                  media_id: null, 
                  rotation: 0, 
                  delay: 0.1, 
                  media_assets: null, 
                  file: null 
                })} 
                // --- END FIX ---
                className="text-sm font-medium text-purple-600 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Photo
              </button>
            </div>
          )}

        </form>

        <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            form="hero-variant-form" // Triggers the form's onSubmit
            disabled={isSubmitting || !isDirty}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
};


// --- Main Admin Page Component ---
const AdminHeroEditor = () => {
  const { user } = useAuth(); // FIX: Get user
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // Get all Lucide icon names for the IconSelect picker
  const iconNames = Object.keys(LucideIcons).filter(key => key !== 'default' && key !== 'createLucideIcon' && /^[A-Z]/.test(key));

  const loadData = useCallback(async () => {
    // We don't need to setIsLoading(true) here
    // because the subscription will handle updates.
    const data = await getHeroVariantsAdmin();
    setVariants(data);
    setIsLoading(false);
  }, []);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to changes in all relevant tables
  useEffect(() => {
    const channel = subscribeToHeroChanges(loadData); // Re-run loadData on any change
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const handleToggleActive = async (variant) => {
    if (!user) {
      toast.error('You must be logged in.');
      return;
    }
    const toastId = toast.loading(variant.is_active ? 'Deactivating...' : 'Activating...');
    // --- FIX: Pass user.id to the save function ---
    const { success, error } = await saveHeroVariant(
      { ...variant, is_active: !variant.is_active }, 
      user.id
    );
    toast.dismiss(toastId);
    if (success) {
      toast.success('Variant updated!');
    } else {
      toast.error(`Failed to update: ${error.message}`);
    }
  };

  const handleDelete = async (variant) => {
    if (window.confirm('Are you sure you want to delete this variant? This will also delete associated images and cannot be undone.')) {
      const toastId = toast.loading('Deleting variant...');
      const { success, error } = await deleteHeroVariant(variant);
      toast.dismiss(toastId);
      if (success) {
        toast.success('Variant deleted!');
      } else {
        toast.error(`Failed to delete: ${error.message}`);
      }
    }
  };

  const handleOrderSave = async (newOrderedVariants) => {
    setIsSavingOrder(true);
    setVariants(newOrderedVariants); // Optimistic update of UI
    const { success, error } = await updateHeroVariantsOrder(newOrderedVariants);
    if (success) {
      toast.success('Order saved!');
    } else {
      toast.error(`Failed to save order: ${error.message}`);
      loadData(); // Revert on failure
    }
    setIsSavingOrder(false);
  };

  const openModalToCreate = () => {
    setSelectedVariant(null);
    setIsModalOpen(true);
  };

  const openModalToEdit = (variant) => {
    setSelectedVariant(variant);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Hero Editor</h1>
        </div>
        <button
          onClick={openModalToCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Create New
        </button>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Drag and drop items to re-order them on the homepage.</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <Reorder.Group axis="y" values={variants} onReorder={handleOrderSave}>
            {variants.map(variant => (
              <Reorder.Item key={variant.id} value={variant} className="mb-4">
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to re-order">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{variant.title}</h3>
                      <p className="text-sm text-gray-500">{variant.subtitle}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variant.variant_type === 'variant1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {variant.variant_type === 'variant1' ? 'Type 1: Icons' : 'Type 2: Photos'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleToggleActive(variant)} title={variant.is_active ? 'Deactivate' : 'Activate'}>
                      {variant.is_active ? <Eye className="w-5 h-5 text-green-500 hover:text-green-700" /> : <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
                    </button>
                    <button onClick={() => openModalToEdit(variant)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(variant)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
        {isSavingOrder && <p className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Saving new order...</p>}
      </div>
      
      {/* --- Editor Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <VariantEditorModal
            variant={selectedVariant}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
            allIcons={iconNames} // Pass the generated icon names
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHeroEditor;