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
  ArrowRightLeft,
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import {
  getPhotoMarqueeAdmin,
  subscribeToPhotoMarqueeChanges,
  updatePhotoMarqueeOrder,
  deletePhotoMarqueeItem,
  savePhotoMarqueeItem,
  getStorageUrl,
} from '../../../api/photomarquee';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

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
    // setPreview(currentImage); // Revert to original image or null
    setPreview(null);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <div className="flex flex-col">
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

// --- Reusable SelectInput ---
const SelectInput = ({ label, name, control, errors, children }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          id={name}
          {...field}
          className={`p-2 border rounded-md ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          } focus:ring-blue-500 focus:border-blue-500 outline-none`}
        >
          {children}
        </select>
      )}
    />
    {errors[name] && (
      <span className="text-red-500 text-sm mt-1">
        {errors[name].message || 'This field is required'}
      </span>
    )}
  </div>
);

// --- Editor Modal ---
const PhotoMarqueeEditorModal = ({ item, onClose, onSave, defaultRow = 1 }) => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const isEdit = !!item?.id;
  const currentImageUrl = item?.media_assets ? getStorageUrl(item.media_assets) : null;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      marquee_row: isEdit ? item.marquee_row : defaultRow,
      newFile: null,
    },
  });

  useEffect(() => {
    reset({
      marquee_row: isEdit ? item.marquee_row : defaultRow,
      newFile: null,
    });
  }, [item, isEdit, defaultRow, reset]);

  const onSubmit = async (data) => {
    if (!data.newFile && !isEdit) {
      toast.error('A new image is required.');
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading(isEdit ? 'Updating photo...' : 'Adding photo...');

    const itemData = {
      id: isEdit ? item.id : null,
      marquee_row: data.marquee_row,
      newFile: data.newFile,
      media_id: isEdit ? item.media_assets?.id : null, // Pass existing media_id for replacement logic
    };

    try {
      await savePhotoMarqueeItem(itemData, user.id);
      toast.success('Photo saved!', { id: toastId });
      onSave(); // Trigger refetch
      onClose();
    } catch (error) {
      console.error('Failed to save photo:', error);
      toast.error(error.message || 'Failed to save photo.', { id: toastId });
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
        className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit Photo' : 'Add New Photo'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </header>

          <main className="p-6 space-y-6">
            <FileInput
              name="newFile"
              control={control}
              errors={errors}
              currentImage={currentImageUrl}
            />
            <SelectInput
              label="Marquee Row"
              name="marquee_row"
              control={control}
              errors={errors}
            >
              <option value="1">Row 1 (Moves Left)</option>
              <option value="2">Row 2 (Moves Right)</option>
            </SelectInput>
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
              {isSaving ? 'Saving...' : 'Save Photo'}
            </button>
          </footer>
        </form>
      </motion.div>
    </motion.div>
  );
};

// --- Main Editor Page ---
const AdminPhotoMarqueeEditor = () => {
  const [photos, setPhotos] = useState([]);
  const [row1Photos, setRow1Photos] = useState([]);
  const [row2Photos, setRow2Photos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [defaultRow, setDefaultRow] = useState(1);

  // Split photos into two rows
  const updateRows = (allPhotos) => {
    setRow1Photos(
      allPhotos.filter((p) => p.marquee_row === 1).sort((a, b) => a.order - b.order)
    );
    setRow2Photos(
      allPhotos.filter((p) => p.marquee_row === 2).sort((a, b) => a.order - b.order)
    );
  };

  const loadData = useCallback(async () => {
    try {
      const data = await getPhotoMarqueeAdmin();
      setPhotos(data);
      updateRows(data);
    } catch (error) {
      toast.error('Failed to load photos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const subscription = subscribeToPhotoMarqueeChanges((payload) => {
      console.log('Change detected:', payload);
      loadData(); // Refetch on any change
    });
    return () => subscription.unsubscribe();
  }, [loadData]);

  const handleReorder = async (newOrder, row) => {
    // Update state optimistically
    if (row === 1) {
      setRow1Photos(newOrder);
    } else {
      setRow2Photos(newOrder);
    }

    setIsSavingOrder(true);
    const success = await updatePhotoMarqueeOrder(newOrder, row);
    if (success) {
      toast.success(`Row ${row} order updated!`);
      // Refetch to ensure data consistency
      await loadData();
    } else {
      toast.error('Failed to update order.');
      // Revert optimistic update (or just refetch)
      await loadData();
    }
    setIsSavingOrder(false);
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this photo? This is permanent.'))
      return;

    const toastId = toast.loading('Deleting photo...');
    try {
      await deletePhotoMarqueeItem(item);
      toast.success('Photo deleted!', { id: toastId });
      loadData(); // Refetch
    } catch (error) {
      toast.error(error.message || 'Failed to delete photo.', { id: toastId });
    }
  };

  const openModalToEdit = (item) => {
    setSelectedPhoto(item);
    setIsModalOpen(true);
  };

  const openModalToCreate = (row) => {
    setSelectedPhoto(null);
    setDefaultRow(row);
    setIsModalOpen(true);
  };

  const MarqueeRowEditor = ({ title, photos, row, onReorder }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={() => openModalToCreate(row)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Add Photo to Row {row}
        </button>
      </div>
      {photos.length === 0 ? (
        <p className="text-gray-500">No photos in this row. Add one to get started!</p>
      ) : (
        <Reorder.Group
          axis="y"
          values={photos}
          onReorder={(newOrder) => onReorder(newOrder, row)}
          className="space-y-3"
        >
          {photos.map((item) => {
            const photoUrl = item.media_assets ? getStorageUrl(item.media_assets) : null;
            return (
              <Reorder.Item
                key={item.id}
                value={item}
                className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="cursor-grab text-gray-400"
                    whileTap={{ cursor: 'grabbing' }}
                  >
                    <GripVertical size={20} />
                  </motion.div>
                  <div className="w-16 h-12 bg-gray-100 rounded-md p-1 flex items-center justify-center">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Photo"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Photo ID: {item.id}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => openModalToEdit(item)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Change Row / Image
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
    </div>
  );

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
            Photo Marquee Editor
          </h1>
        </div>
        {isSavingOrder && (
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" /> Saving new order...
          </p>
        )}
      </header>

      {isLoading ? (
        <div className="flex justify-center mt-16">
          <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
        </div>
      ) : (
        <div className="space-y-8">
          <MarqueeRowEditor
            title="Row 1 (Moves Left)"
            photos={row1Photos}
            row={1}
            onReorder={handleReorder}
          />
          <MarqueeRowEditor
            title="Row 2 (Moves Right)"
            photos={row2Photos}
            row={2}
            onReorder={handleReorder}
          />
        </div>
      )}

      {/* --- Editor Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <PhotoMarqueeEditorModal
            item={selectedPhoto}
            defaultRow={defaultRow}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPhotoMarqueeEditor;