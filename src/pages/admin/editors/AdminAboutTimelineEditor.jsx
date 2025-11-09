import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  getAboutTimelineAdmin,
  subscribeToAboutTimelineChanges,
  updateAboutTimelineOrder,
  deleteAboutTimelineItem,
  saveAboutTimelineItem,
} from '../../../api/abouttimelineadmin'; 
import toast, { Toaster } from 'react-hot-toast';

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
      rows="4"
    />
    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
  </div>
);

// --- Timeline Item Editor Modal ---
const TimelineEditorModal = ({ item, onClose, onSave }) => {
  const isEditing = !!item?.id;

  const defaultValues = {
    id: item?.id || undefined,
    year: item?.year || '',
    title: item?.title || '',
    description: item?.description || '',
    order: item?.order ?? 0,
  };

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading(isEditing ? 'Updating item...' : 'Creating item...');
    
    const { success, error } = await saveAboutTimelineItem(data); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('Timeline item saved!');
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
        className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Timeline Item' : 'Create New Timeline Item'}</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} id="timeline-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          <FormInput 
            label="Year" 
            name="year" 
            register={register} 
            errors={errors} 
            placeholder="e.g., 2023"
            rules={{ required: "Year is required" }}
          />

          <FormInput 
            label="Title" 
            name="title" 
            register={register} 
            errors={errors} 
            placeholder="e.g., Graduated University"
            rules={{ required: "Title is required" }}
          />

          <FormTextarea
            label="Description"
            name="description"
            register={register}
            errors={errors}
            placeholder="A short description of this event..."
          />
        </form>

        <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            form="timeline-form"
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
const AdminAboutTimelineEditor = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getAboutTimelineAdmin();
    setItems(data);
    setIsLoading(false);
  }, []);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to changes
  useEffect(() => {
    const channel = subscribeToAboutTimelineChanges(loadData); // Re-run loadData on any change
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      const toastId = toast.loading('Deleting item...');
      const { success, error } = await deleteAboutTimelineItem(item);
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
    const { success, error } = await updateAboutTimelineOrder(newOrder);
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
          <Link to="/admin/about-config" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">About Timeline Editor</h1>
        </div>
        <button
          onClick={openModalToCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Create New Item
        </button>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Drag and drop items to re-order them. This controls the horizontal timeline.</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <Reorder.Group axis="y" values={items} onReorder={handleOrderSave}>
            {items.map(item => (
              <Reorder.Item key={item.id} value={item} className="mb-4">
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <button className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to re-order">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    <span className="flex-shrink-0 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {item.year}
                    </span>
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-lg text-gray-800 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500 truncate" title={item.description}>{item.description || 'No description'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <button onClick={() => openModalToEdit(item)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(item)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
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
          <TimelineEditorModal
            item={selectedItem}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAboutTimelineEditor;