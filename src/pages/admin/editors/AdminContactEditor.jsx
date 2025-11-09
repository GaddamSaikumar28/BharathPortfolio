import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, X
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  getContactEditorData,
  saveContactEditorData,
} from '../../../api/contactadmin'; // Adjust path as needed
import toast, { Toaster } from 'react-hot-toast';

// --- Reusable Form Input ---
const FormInput = ({ label, name, register, error, ...rest }) => (
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

// --- Main Editor Component ---
const AdminContactEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      config: {
        title_static: '',
        reach_out_title: '',
      },
      title_animated: [], // Separate field array for animated titles
      budgets: [],
    },
  });

  // Field array for animated titles
  const { 
    fields: animatedTitleFields, 
    append: appendTitle, 
    remove: removeTitle 
  } = useFieldArray({
    control,
    name: "title_animated",
  });

  // Field array for budgets
  const { 
    fields: budgetFields, 
    append: appendBudget, 
    remove: removeBudget, 
    move: moveBudget 
  } = useFieldArray({
    control,
    name: "budgets",
  });

  // --- Load Data ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const { config, budgets } = await getContactEditorData();
        reset({
          config: {
            title_static: config.title_static,
            reach_out_title: config.reach_out_title,
          },
          // Map to shape expected by useFieldArray
          title_animated: config.title_animated.map(val => ({ value: val })),
          budgets: budgets,
        });
      } catch (error) {
        toast.error('Error loading page data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [reset]);

  // --- Save Data ---
  const onSubmit = async (formData) => {
    setIsSaving(true);
    const toastId = toast.loading('Saving changes...');

    // Re-shape data for the API
    const configData = {
      ...formData.config,
      title_animated: formData.title_animated.map(item => item.value), // Flatten array
    };
    
    const budgetsData = formData.budgets;

    try {
      await saveContactEditorData(configData, budgetsData);
      toast.success('Changes saved!', { id: toastId });
    } catch (error) {
      toast.error('Failed to save changes.', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
      <Toaster position="top-right" />
      
      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              Edit Contact Page
            </h1>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* --- Main Editor Layout --- */}
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* --- Kinetic Header Section --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Kinetic Header</h2>
          <div className="space-y-4">
            <FormInput
              label="Static Text (e.g., 'Let's build something')"
              name="config.title_static"
              register={register}
              error={errors.config?.title_static}
            />
            
            <label className="block text-sm font-medium text-gray-700">Animated Words</label>
            <div className="space-y-2">
              {animatedTitleFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input
                    {...register(`title_animated.${index}.value`)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Together"
                  />
                  <button
                    type="button"
                    onClick={() => removeTitle(index)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendTitle({ value: '' })}
                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
              >
                <Plus className="w-4 h-4" /> Add Word
              </button>
            </div>
          </div>
        </div>
        
        {/* --- Reach Out Title Section --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Reach Out Title</h2>
          <FormInput
            label="Title (e.g., 'Or reach out directly')"
            name="config.reach_out_title"
            register={register}
            error={errors.config?.reach_out_title}
          />
        </div>

        {/* --- Budget Options Section --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Options</h2>
          <p className="text-sm text-gray-500 mb-4">Drag to re-order. The `value` is what's stored in the database, `label` is what the user sees.</p>
          <div className="space-y-3">
            <Reorder.Group axis="y" values={budgetFields} onReorder={moveBudget}>
              {budgetFields.map((field, index) => (
                <Reorder.Item key={field.id} value={field} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  <input
                    {...register(`budgets.${index}.label`)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Label (e.g., $1k - $5k)"
                  />
                  <input
                    {...register(`budgets.${index}.value`)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Value (e.g., 1k-5k)"
                  />
                  <button
                    type="button"
                    onClick={() => removeBudget(index)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {/* Hidden field to store the ID */}
                  <input type="hidden" {...register(`budgets.${index}.id`)} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
            
            <button
              type="button"
              onClick={() => appendBudget({ id: null, label: '', value: '' })} // 'id: null' signifies a new item
              className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <Plus className="w-4 h-4" /> Add Budget Option
            </button>
          </div>
        </div>

      </div>
    </form>
  );
};

export default AdminContactEditor;