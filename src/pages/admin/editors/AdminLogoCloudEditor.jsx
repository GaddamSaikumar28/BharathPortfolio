
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, UploadCloud, X
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import {
  getLogoCloudAdmin,
  subscribeToLogoCloudChanges,
  updateLogoCloudOrder,
  deleteLogo,
  saveLogo,
  getStorageUrl,
} from '../../../api/logocloudadmin'; 
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

// --- 
// --- BUG FIX IS IN THIS COMPONENT ---
// --- 
// --- Reusable ImageUpload Component ---
// We remove the 'name' prop and access fields from the root
const ImageUpload = ({ control, setValue, watch, errors }) => {
  // --- FIX: Watch root-level fields, not nested ones ---
  const file = watch('file');
  const mediaAsset = watch('media_assets');
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
  }, [file, mediaAsset]);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      // --- FIX: Watch and Set root-level fields ---
      const currentMediaId = watch('media_id');
      if (currentMediaId) {
        setValue('originalMediaId', currentMediaId, { shouldDirty: true });
      }
      setValue('file', newFile, { shouldDirty: true });
    }
  };

  const handleRemoveImage = () => {
    // --- FIX: Watch and Set root-level fields ---
    const currentMediaId = watch('media_id');
    if (currentMediaId) {
      // Mark the current image for deletion
      setValue('originalMediaId', currentMediaId, { shouldDirty: true });
    }
    // Clear all image-related fields
    setValue('file', null, { shouldDirty: true });
    setValue('media_id', null, { shouldDirty: true });
    setValue('media_assets', null, { shouldDirty: true });
    setPreview(null);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-700">Logo Image (Optional)</label>
      <div className="w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden relative">
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-contain p-2" />
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
        {/* --- FIX: Removed dynamic 'name' from id/htmlFor --- */}
        <label htmlFor="logo-upload" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          <span>{file ? file.name : 'Upload an image'}</span>
        </label>
        <input
          type="file"
          id="logo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
// --- END BUG FIX ---

// --- Logo Editor Modal ---
const LogoEditorModal = ({ logo, onClose, onSave }) => {
  const { user } = useAuth();
  const isEditing = !!logo?.id;

  // The defaultValues are already correct, with fields at the root
  const defaultValues = {
    id: logo?.id || undefined,
    name: logo?.name || '',
    media_id: logo?.media_id || null,
    media_assets: logo?.media_assets || null,
    order: logo?.order ?? 0,
    file: null,
    originalMediaId: null, // For tracking replacements
  };

  const { register, control, handleSubmit, setValue, watch, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    if (!user) {
      toast.error('You must be logged in to save.');
      return;
    }
    const toastId = toast.loading(isEditing ? 'Updating logo...' : 'Creating logo...');
    
    // This API call now receives the correct data structure:
    // { name: '...', file: File, media_id: null, ... }
    const { success, error } = await saveLogo(data, user.id); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('Logo saved successfully!');
      onSave(); // Refetch data in parent
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
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Logo' : 'Create New Logo'}</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} id="logo-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          <FormInput 
            label="Logo Name" 
            name="name" 
            register={register} 
            errors={errors} 
            placeholder="e.g., Google"
            rules={{ required: "Logo name is required" }}
          />
          {/* --- FIX: Removed the 'name' prop from the call --- */}
          <ImageUpload
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        </form>

        <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            form="logo-form"
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
const AdminLogoCloudEditor = () => {
  const [logos, setLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getLogoCloudAdmin();
    setLogos(data);
    setIsLoading(false);
  }, []);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to changes
  useEffect(() => {
    const channel = subscribeToLogoCloudChanges(loadData); // Re-run loadData on any change
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const handleDelete = async (logo) => {
    if (window.confirm(`Are you sure you want to delete "${logo.name}"? This cannot be undone.`)) {
      const toastId = toast.loading('Deleting logo...');
      const { success, error } = await deleteLogo(logo);
      toast.dismiss(toastId);
      if (success) {
        toast.success('Logo deleted!');
      } else {
        toast.error(`Failed to delete: ${error.message}`);
      }
    }
  };

  const handleOrderSave = async (newOrderedLogos) => {
    setIsSavingOrder(true);
    setLogos(newOrderedLogos); // Optimistic update
    const { success, error } = await updateLogoCloudOrder(newOrderedLogos);
    if (success) {
      toast.success('Order saved!');
    } else {
      toast.error(`Failed to save order: ${error.message}`);
      loadData(); // Revert on failure
    }
    setIsSavingOrder(false);
  };

  const openModalToCreate = () => {
    setSelectedLogo(null);
    setIsModalOpen(true);
  };

  const openModalToEdit = (logo) => {
    setSelectedLogo(logo);
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
          <h1 className="text-3xl font-bold text-gray-900">Logo Cloud Editor</h1>
        </div>
        <button
          onClick={openModalToCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Create New Logo
        </button>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Drag and drop logos to re-order them on the homepage.</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <Reorder.Group axis="y" values={logos} onReorder={handleOrderSave}>
            {logos.map(logo => {
              const logoUrl = getStorageUrl(logo.media_assets);
              return (
                <Reorder.Item key={logo.id} value={logo} className="mb-4">
                  <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to re-order">
                        <GripVertical className="w-5 h-5" />
                      </button>
                      <div className="flex-shrink-0 w-24 h-12 flex items-center justify-center bg-gray-100 rounded-md p-1">
                        {logoUrl ? (
                          <img src={logoUrl} alt={logo.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800">{logo.name}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => openModalToEdit(logo)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => handleDelete(logo)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        )}
        {isSavingOrder && <p className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Saving new order...</p>}
      </div>
      
      {/* --- Editor Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <LogoEditorModal
            logo={selectedLogo}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLogoCloudEditor;