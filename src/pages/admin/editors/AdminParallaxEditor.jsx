// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, Save } from 'lucide-react';
// import { motion } from 'framer-motion';

// const AdminParallaxEditor = () => (
//   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//     <div className="flex justify-between items-center">
//       <div>
//         <Link to="/admin/homepage-config" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-2">
//           <ArrowLeft className="w-4 h-4" /> Back to Homepage Manager
//         </Link>
//         <h1 className="text-3xl font-bold text-gray-900">Edit Parallax Project</h1>
//       </div>
//       <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700">
//         <Save className="w-5 h-5" /> Save Changes
//       </button>
//     </div>
//     <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
//       <h2 className="text-xl font-semibold text-gray-800">Parallax Project Editor</h2>
//       <p className="text-gray-500 mt-2">This is where you will edit the single "Employee Data" parallax card from the `parallax_project` table.</p>
//     </div>
//   </motion.div>
// );
// export default AdminParallaxEditor;




import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Image as ImageIcon, UploadCloud, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  getParallaxProjectAdmin,
  subscribeToParallaxChanges,
  saveParallaxProject,
  getStorageUrl,
} from '../../../api/parallaxadmin'; 
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

// --- Reusable FormInput ---
const FormInput = ({ label, name, register, errors, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <input 
      id={name} 
      {...register(name)} 
      {...rest} 
      className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
    />
    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
  </div>
);

// --- Reusable FormTextarea ---
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

// --- Reusable ImageUpload Component ---
// This version is parameterized to work with different form field names
const ImageUpload = ({ label, fieldNames, control, setValue, watch, errors, aspect = 'aspect-video', objectFit = 'object-cover' }) => {
  const file = watch(fieldNames.file);
  const mediaAsset = watch(fieldNames.media_assets); // e.g., 'media_id' or 'logo_media_id'
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (mediaAsset) {
      setPreview(getStorageUrl(mediaAsset));
    } else {
      setPreview(null);
    }
  }, [file, mediaAsset, fieldNames.media_assets]);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const currentMediaId = watch(fieldNames.media_id);
      if (currentMediaId) {
        setValue(fieldNames.originalMediaId, currentMediaId, { shouldDirty: true });
      }
      setValue(fieldNames.file, newFile, { shouldDirty: true });
    }
  };

  const handleRemoveImage = () => {
    const currentMediaId = watch(fieldNames.media_id);
    if (currentMediaId) {
      setValue(fieldNames.originalMediaId, currentMediaId, { shouldDirty: true });
    }
    setValue(fieldNames.file, null, { shouldDirty: true });
    setValue(fieldNames.media_id, null, { shouldDirty: true });
    setValue(fieldNames.media_assets, null, { shouldDirty: true });
    setPreview(null);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className={`w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden relative ${aspect}`}>
        {preview ? (
          <>
            <img src={preview} alt="Preview" className={`w-full h-full ${objectFit}`} />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <ImageIcon className="w-10 h-10 text-gray-400" />
        )}
      </div>
      <div className="mt-2">
        <label htmlFor={fieldNames.file} className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          <span>{file ? file.name : 'Upload an image'}</span>
        </label>
        <input
          type="file"
          id={fieldNames.file}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};


// --- Main Admin Page Component ---
const AdminParallaxEditor = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Define default values for the form
  const defaultValues = {
    id: 1, // This is always 1
    title: '',
    description: '',
    media_id: null,
    'media_id(*)': null, // For holding the joined data
    file_main: null,
    original_media_id: null,
    logo_media_id: null,
    'logo_media_id(*)': null, // For holding the joined data
    file_logo: null,
    original_logo_media_id: null,
  };

  const { register, control, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues,
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const data = await getParallaxProjectAdmin();
    if (data) {
      // Transform data to match form structure
      const formData = {
        ...defaultValues,
        ...data,
        media_assets: data.media_id, // `media_id` is the joined object
        logo_media_assets: data.logo_media_id, // `logo_media_id` is the joined object
        media_id: data.media_id?.id || null, // Set the actual ID
        logo_media_id: data.logo_media_id?.id || null, // Set the actual ID
      };
      reset(formData); // Populate the form with loaded data
    }
    setIsLoading(false);
  }, [reset]);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to changes
  useEffect(() => {
    const channel = subscribeToParallaxChanges(loadData); // Re-run loadData on any change
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error('You must be logged in to save.');
      return;
    }
    
    // We need to rename the joined data so it doesn't conflict
    // Supabase asset join `media_id(*)` becomes `media_id` in the data
    // We rename it to `media_assets` in `loadData`
    const dataToSave = {
      ...data,
      media_assets: undefined, // This is not a column
      logo_media_assets: undefined, // This is not a column
    };

    const toastId = toast.loading('Updating project...');
    const { success, error } = await saveParallaxProject(dataToSave, user.id); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('Project saved successfully!');
      loadData(); // Reload data to reset dirty state
    } else {
      toast.error(`Failed to save: ${error.message}`);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/homepage-config" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Parallax Project Editor</h1>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 space-y-6">
                <FormInput 
                  label="Title" 
                  name="title" 
                  register={register} 
                  errors={errors} 
                  placeholder="e.g., Project Showcase: E-commerce"
                />

                <FormTextarea
                  label="Description"
                  name="description"
                  register={register}
                  errors={errors}
                  placeholder="A short summary of this project..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Image Uploader */}
                  <ImageUpload
                    label="Main Project Image"
                    fieldNames={{
                      file: 'file_main',
                      media_id: 'media_id',
                      media_assets: 'media_assets',
                      originalMediaId: 'original_media_id'
                    }}
                    control={control}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    aspect="aspect-video"
                    objectFit="object-cover"
                  />

                  {/* Logo Image Uploader */}
                  <ImageUpload
                    label="Project Logo"
                    fieldNames={{
                      file: 'file_logo',
                      media_id: 'logo_media_id',
                      media_assets: 'logo_media_assets',
                      originalMediaId: 'original_logo_media_id'
                    }}
                    control={control}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    aspect="aspect-square"
                    objectFit="object-contain"
                  />
                </div>
              </div>

              <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </footer>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminParallaxEditor;