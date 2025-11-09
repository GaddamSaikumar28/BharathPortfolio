import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import {
  getAboutValuesAdmin,
  subscribeToAboutValuesChanges,
  updateAboutValuesOrder,
  deleteAboutValue,
  saveAboutValue,
} from '../../../api/aboutvaluesadmin'; 
import toast, { Toaster } from 'react-hot-toast';
import * as LucideIcons from 'lucide-react'; // Import all icons for the picker

// --- Helper: Icon Component ---
const Icon = ({ name, ...props }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return <AlertCircle {...props} />; // Fallback icon
  }
  return <LucideIcon {...props} />;
};

// --- Reusable Form Components ---
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
      rules={{ required: "An icon is required" }}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          {field.value && <Icon name={field.value} className="w-6 h-6 flex-shrink-0 text-blue-600" />}
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

// --- Value Editor Modal ---
const ValueEditorModal = ({ value, onClose, onSave, allIcons }) => {
  const isEditing = !!value?.id;

  const defaultValues = {
    id: value?.id || undefined,
    icon_name: value?.icon_name || '',
    title: value?.title || '',
    description: value?.description || '',
    order: value?.order ?? 0,
  };

  const { register, control, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading(isEditing ? 'Updating value...' : 'Creating value...');
    
    const { success, error } = await saveAboutValue(data); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('Value saved successfully!');
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
          <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Value' : 'Create New Value'}</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} id="value-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          <IconSelect
            label="Icon"
            name="icon_name"
            control={control}
            errors={errors}
            allIcons={allIcons}
          />

          <FormInput 
            label="Title" 
            name="title" 
            register={register} 
            errors={errors} 
            placeholder="e.g., Transparency"
            rules={{ required: "Title is required" }}
          />

          <FormTextarea
            label="Description"
            name="description"
            register={register}
            errors={errors}
            placeholder="A short summary of this value..."
          />
        </form>

        <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            form="value-form"
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
const AdminAboutValuesEditor = () => {
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const iconNames = Object.keys(LucideIcons).filter(key => key !== 'default' && key !== 'createLucideIcon' && /^[A-Z]/.test(key));

  const loadData = useCallback(async () => {
    const data = await getAboutValuesAdmin();
    setValues(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const channel = subscribeToAboutValuesChanges(loadData); 
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const handleDelete = async (value) => {
    if (window.confirm(`Are you sure you want to delete "${value.title}"?`)) {
      const toastId = toast.loading('Deleting value...');
      const { success, error } = await deleteAboutValue(value);
      toast.dismiss(toastId);
      if (success) {
        toast.success('Value deleted!');
      } else {
        toast.error(`Failed to delete: ${error.message}`);
      }
    }
  };

  const handleOrderSave = async (newOrder) => {
    setIsSavingOrder(true);
    setValues(newOrder); // Optimistic update
    const { success, error } = await updateAboutValuesOrder(newOrder);
    if (success) {
      toast.success('Order saved!');
    } else {
      toast.error(`Failed to save order: ${error.message}`);
      loadData(); // Revert on failure
    }
    setIsSavingOrder(false);
  };

  const openModalToCreate = () => {
    setSelectedValue(null);
    setIsModalOpen(true);
  };

  const openModalToEdit = (value) => {
    setSelectedValue(value);
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
          <h1 className="text-3xl font-bold text-gray-900">Core Values Editor</h1>
        </div>
        <button
          onClick={openModalToCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Create New Value
        </button>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Drag and drop values to re-order them.</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <Reorder.Group axis="y" values={values} onReorder={handleOrderSave}>
            {values.map(value => (
              <Reorder.Item key={value.id} value={value} className="mb-4">
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <button className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to re-order">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={value.icon_name} size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-lg text-gray-800 truncate">{value.title}</h3>
                      <p className="text-sm text-gray-500 truncate" title={value.description}>{value.description || 'No description'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <button onClick={() => openModalToEdit(value)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(value)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
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
          <ValueEditorModal
            value={selectedValue}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
            allIcons={iconNames}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAboutValuesEditor;