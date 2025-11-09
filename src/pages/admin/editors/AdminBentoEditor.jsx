// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, Save } from 'lucide-react';
// import { motion } from 'framer-motion';

// const AdminBentoEditor = () => (
//   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//     <div className="flex justify-between items-center">
//       <div>
//         <Link to="/admin/homepage-config" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-2">
//           <ArrowLeft className="w-4 h-4" /> Back to Homepage Manager
//         </Link>
//         <h1 className="text-3xl font-bold text-gray-900">Edit Bento Grid</h1>
//       </div>
//       <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700">
//         <Save className="w-5 h-5" /> Save Changes
//       </button>
//     </div>
//     <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
//       <h2 className="text-xl font-semibold text-gray-800">Bento Grid Editor</h2>
//       <p className="text-gray-500 mt-2">This is where you will edit the "Latest Work" bento grid items from the `bento_items` table.</p>
//     </div>
//   </motion.div>
// );
// export default AdminBentoEditor;




import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, UploadCloud, X
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import {
  getBentoAdmin,
  subscribeToBentoChanges,
  updateBentoOrder,
  deleteBentoItem,
  saveBentoItem,
  getStorageUrl,
} from '../../../api/bentoadmin'; 
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

// --- New: Grid Span Selector ---
const GridSpanSelect = ({ label, name, control, errors }) => {
  const options = [
    { label: '1x1 (Default)', value: 'col-span-1 row-span-1' },
    { label: '2x1 (Wide)', value: 'col-span-2 row-span-1' },
    { label: '1x2 (Tall)', value: 'col-span-1 row-span-2' },
    { label: '2x2 (Large)', value: 'col-span-2 row-span-2' },
    { label: '3x1 (Extra Wide)', value: 'col-span-3 row-span-1' },
    { label: '3x2 (Large Tall)', value: 'col-span-3 row-span-2' },
    { label: '4x1 (Full Width)', value: 'col-span-4 row-span-1' },
    { label: '4x2 (Full Width Large)', value: 'col-span-4 row-span-2' },
  ];

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={`p-2 border rounded-md w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500 outline-none`}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
      />
      {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
    </div>
  );
};

// --- Reusable ImageUpload Component ---
const ImageUpload = ({ control, setValue, watch, errors }) => {
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
      const currentMediaId = watch('media_id');
      if (currentMediaId) {
        setValue('originalMediaId', currentMediaId, { shouldDirty: true });
      }
      setValue('file', newFile, { shouldDirty: true });
    }
  };

  const handleRemoveImage = () => {
    const currentMediaId = watch('media_id');
    if (currentMediaId) {
      setValue('originalMediaId', currentMediaId, { shouldDirty: true });
    }
    setValue('file', null, { shouldDirty: true });
    setValue('media_id', null, { shouldDirty: true });
    setValue('media_assets', null, { shouldDirty: true });
    setPreview(null);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-700">Background Image (Optional)</label>
      <div className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden relative">
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
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
        <label htmlFor="item-upload" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          <span>{file ? file.name : 'Upload an image'}</span>
        </label>
        <input
          type="file"
          id="item-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

// --- Item Editor Modal ---
const BentoItemEditorModal = ({ item, onClose, onSave }) => {
  const { user } = useAuth();
  const isEditing = !!item?.id;

  const defaultValues = {
    id: item?.id || undefined,
    title: item?.title || '',
    description: item?.description || '',
    grid_span: item?.grid_span || 'col-span-1 row-span-1',
    media_id: item?.media_id || null,
    media_assets: item?.media_assets || null,
    order: item?.order ?? 0,
    file: null,
    originalMediaId: null,
  };

  const { register, control, handleSubmit, setValue, watch, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    if (!user) {
      toast.error('You must be logged in to save.');
      return;
    }
    const toastId = toast.loading(isEditing ? 'Updating item...' : 'Creating item...');
    
    const { success, error } = await saveBentoItem(data, user.id); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('Bento item saved!');
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
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Bento Item' : 'Create New Bento Item'}</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} id="bento-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          <FormInput 
            label="Title" 
            name="title" 
            register={register} 
            errors={errors} 
            placeholder="e.g., SaaS Branding"
            rules={{ required: "Title is required" }}
          />

          <FormTextarea
            label="Description"
            name="description"
            register={register}
            errors={errors}
            placeholder="A short summary of this item..."
          />

          <GridSpanSelect
            label="Grid Size"
            name="grid_span"
            control={control}
            errors={errors}
          />

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
            form="bento-form"
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
const AdminBentoEditor = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getBentoAdmin();
    setItems(data);
    setIsLoading(false);
  }, []);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to changes
  useEffect(() => {
    const channel = subscribeToBentoChanges(loadData); // Re-run loadData on any change
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      const toastId = toast.loading('Deleting item...');
      const { success, error } = await deleteBentoItem(item);
      toast.dismiss(toastId);
      if (success) {
        toast.success('Item deleted!');
      } else {
        toast.error(`Failed to delete: ${error.message}`);
      }
    }
  };

  const handleOrderSave = async (newOrder) => {
    setIsSavingOrder(true);
    setItems(newOrder); // Optimistic update
    const { success, error } = await updateBentoOrder(newOrder);
    if (success) {
      toast.success('Order saved!');
    } else {
      toast.error(`Failed to save order: ${error.message}`);
      loadData(); // Revert on failure
    }
    setIsSavingOrder(false);
  };

  const openModalToCreate = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const openModalToEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/homepage-config" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Bento Grid Editor</h1>
        </div>
        <button
          onClick={openModalToCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Create New Bento Item
        </button>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Drag and drop items to re-order them on the homepage.</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <Reorder.Group axis="y" values={items} onReorder={handleOrderSave}>
            {items.map(item => {
              const imageUrl = getStorageUrl(item.media_assets);
              return (
                <Reorder.Item key={item.id} value={item} className="mb-4">
                  <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <button className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to re-order">
                        <GripVertical className="w-5 h-5" />
                      </button>
                      <div className="flex-shrink-0 w-20 h-16 flex items-center justify-center bg-gray-100 rounded-md p-1 overflow-hidden">
                        {imageUrl ? (
                          <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-semibold text-lg text-gray-800 truncate">{item.title}</h3>
                        <p className="text-sm text-gray-500 truncate" title={item.description}>{item.description}</p>
                      </div>
                      <span className="flex-shrink-0 ml-4 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                        {item.grid_span || '1x1'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <button onClick={() => openModalToEdit(item)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => handleDelete(item)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
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
          <BentoItemEditorModal
            item={selectedItem}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBentoEditor;