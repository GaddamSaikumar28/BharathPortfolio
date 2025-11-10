import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  UploadCloud,
  X,
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
// --- FIX: Corrected relative paths to go up three levels ---
// import {
//   getPortfolioBannersAdmin,
//   subscribeToPortfolioBannerChanges,
//   updatePortfolioBannerOrder,
//   deletePortfolioBanner,
//   savePortfolioBanner,
//   getStorageUrl,
// } from '../../../api/admin/portfoliobanner';
import {
  getPortfolioBannersAdmin,
  subscribeToPortfolioBannerChanges,
  updatePortfolioBannerOrder,
  deletePortfolioBanner,
  savePortfolioBanner,
} from '../../../api/portfoliobanner';
import { getStorageUrl } from '../../../hooks/useHomepageData';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
// --- End of FIX ---

// --- Reusable FormInput ---
const FormInput = ({ label, name, register, errors, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      {...register(name)}
      {...rest}
      className={`p-2 border rounded-md ${
        errors[name] ? 'border-red-500' : 'border-gray-300'
      } focus:ring-blue-500 focus:border-blue-500 outline-none`}
    />
    {errors[name] && (
      <span className="text-red-500 text-sm mt-1">
        {errors[name].message || 'This field is required'}
      </span>
    )}
  </div>
);

// --- Reusable FormTextarea ---
const FormTextarea = ({ label, name, register, errors, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={name}
      rows={3}
      {...register(name)}
      {...rest}
      className={`p-2 border rounded-md ${
        errors[name] ? 'border-red-500' : 'border-gray-300'
      } focus:ring-blue-500 focus:border-blue-500 outline-none`}
    />
    {errors[name] && (
      <span className="text-red-500 text-sm mt-1">
        {errors[name].message || 'This field is required'}
      </span>
    )}
  </div>
);


// --- Reusable FileInput ---
const FileInput = ({ name, control, errors, currentImage = null }) => {
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      field.onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearFile = (field) => {
    field.onChange(null);
    setPreview(currentImage); // Revert to original image or null
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Background Image
          </label>
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 text-center relative">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-full object-contain rounded-md"
                />
                <button
                  type="button"
                  onClick={() => clearFile(field)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">
                  Drag & drop or click to upload
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, field)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>
          {errors[name] && (
            <span className="text-red-500 text-sm mt-1">
              {errors[name].message || 'This field is required'}
            </span>
          )}
        </div>
      )}
    />
  );
};

// --- Editor Modal ---
const PortfolioBannerEditorModal = ({ banner, onClose, onSave }) => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const isEdit = !!banner?.id;
  const currentImageUrl = banner?.media_assets ? getStorageUrl(banner.media_assets) : null;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      button_text: 'View Case Study',
      link_href: '#',
      newFile: null,
    },
  });

  useEffect(() => {
    if (isEdit) {
      reset({
        title: banner.title,
        description: banner.description,
        button_text: banner.button_text,
        link_href: banner.link_href,
        newFile: null,
      });
    } else {
      reset({
        title: '',
        description: '',
        button_text: 'View Case Study',
        link_href: '#',
        newFile: null,
      });
    }
  }, [banner, isEdit, reset]);

  const onSubmit = async (data) => {
    if (!data.newFile && !isEdit) {
      toast.error('A background image is required for new banners.');
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading(isEdit ? 'Updating banner...' : 'Adding banner...');

    const itemData = {
      id: isEdit ? banner.id : null,
      ...data,
      media_id: isEdit ? banner.media_assets?.id : null, // Pass existing media_id
    };

    try {
      await savePortfolioBanner(itemData, user.id);
      toast.success('Banner saved!', { id: toastId });
      onSave(); // Trigger refetch
      onClose();
    } catch (error) {
      console.error('Failed to save banner:', error);
      toast.error(error.message || 'Failed to save banner.', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit Banner' : 'Add New Banner'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </header>

          <main className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <FormInput
              label="Title"
              name="title"
              register={register}
              errors={errors}
              rules={{ required: 'Title is required' }}
            />
            <FormTextarea
              label="Description"
              name="description"
              register={register}
              errors={errors}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Button Text"
                name="button_text"
                register={register}
                errors={errors}
              />
              <FormInput
                label="Button Link (URL or Path)"
                name="link_href"
                register={register}
                errors={errors}
              />
            </div>
            <FileInput
              name="newFile"
              control={control}
              errors={errors}
              currentImage={currentImageUrl}
            />
          </main>

          <footer className="p-6 bg-gray-50 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSaving ? 'Saving...' : 'Save Banner'}
            </button>
          </footer>
        </form>
      </motion.div>
    </motion.div>
  );
};

// --- Main Editor Page ---
const AdminPortfolioBannerEditor = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const data = await getPortfolioBannersAdmin();
      setBanners(data);
    } catch (error) {
      toast.error('Failed to load banners.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const subscription = subscribeToPortfolioBannerChanges((payload) => {
      console.log('Change detected:', payload);
      loadData(); // Refetch on any change
    });
    return () => subscription.unsubscribe();
  }, [loadData]);

  const handleReorder = async (newOrder) => {
    setBanners(newOrder); // Optimistic update
    setIsSavingOrder(true);
    const success = await updatePortfolioBannerOrder(newOrder);
    if (success) {
      toast.success('Banner order updated!');
    } else {
      toast.error('Failed to update order.');
      await loadData(); // Revert
    }
    setIsSavingOrder(false);
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this banner? This is permanent.'))
      return;

    const toastId = toast.loading('Deleting banner...');
    try {
      await deletePortfolioBanner(item);
      toast.success('Banner deleted!', { id: toastId });
      loadData(); // Refetch
    } catch (error) {
      toast.error(error.message || 'Failed to delete banner.', { id: toastId });
    }
  };

  const openModalToEdit = (item) => {
    setSelectedBanner(item);
    setIsModalOpen(true);
  };

  const openModalToCreate = () => {
    setSelectedBanner(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Toaster position="bottom-right" />
      <header className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="p-2 rounded-full text-gray-600 bg-white hover:bg-gray-200"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Portfolio Banners Editor
          </h1>
        </div>
        <button
          onClick={openModalToCreate}
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Add New Banner
        </button>
      </header>

      {isLoading ? (
        <div className="flex justify-center mt-16">
          <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">No banners found</h3>
          <p className="text-gray-500 mt-2">
            Click "Add New Banner" to get started.
          </p>
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={banners}
          onReorder={handleReorder}
          className="space-y-3"
        >
          {banners.map((item) => {
            const bannerUrl = item.media_assets ? getStorageUrl(item.media_assets) : null;
            return (
              <Reorder.Item
                key={item.id}
                value={item}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="cursor-grab text-gray-400"
                    whileTap={{ cursor: 'grabbing' }}
                  >
                    <GripVertical size={20} />
                  </motion.div>
                  <div className="w-24 h-16 bg-gray-100 rounded-md p-1 flex items-center justify-center">
                    {bannerUrl ? (
                      <img
                        src={bannerUrl}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => openModalToEdit(item)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      )}
      {isSavingOrder && (
        <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
          <Loader2 className="animate-spin w-4 h-4" /> Saving new order...
        </p>
      )}

      {/* --- Editor Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <PortfolioBannerEditorModal
            banner={selectedBanner}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPortfolioBannerEditor;