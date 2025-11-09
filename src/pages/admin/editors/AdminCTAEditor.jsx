// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, Save } from 'lucide-react';
// import { motion } from 'framer-motion';

// const AdminCTAEditor = () => (
//   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//     <div className="flex justify-between items-center">
//       <div>
//         <Link to="/admin/homepage-config" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-2">
//           <ArrowLeft className="w-4 h-4" /> Back to Homepage Manager
//         </Link>
//         <h1 className="text-3xl font-bold text-gray-900">Edit Call to Action</h1>
//       </div>
//       <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700">
//         <Save className="w-5 h-5" /> Save Changes
//       </button>
//     </div>
//     <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
//       <h2 className="text-xl font-semibold text-gray-800">Call to Action Editor</h2>
//       <p className="text-gray-500 mt-2">This is where you will edit the title and subtitle for the final Call to Action section from the `call_to_action` table.</p>
//     </div>
//   </motion.div>
// );
// export default AdminCTAEditor;




import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  getCtaAdmin,
  subscribeToCtaChanges,
  saveCta,
} from '../../../api/ctaadmin'; 
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
      rows="3"
    />
    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
  </div>
);


// --- Main Admin Page Component ---
const AdminCTAEditor = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: {
      id: 1,
      title: '',
      subtitle: '',
    },
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const data = await getCtaAdmin();
    if (data) {
      reset(data); // Populate the form with loaded data
    }
    setIsLoading(false);
  }, [reset]);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to changes
  useEffect(() => {
    const channel = subscribeToCtaChanges(loadData); // Re-run loadData on any change
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const onSubmit = async (data) => {
    const toastId = toast.loading('Updating CTA...');
    const { success, error } = await saveCta(data); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('CTA saved successfully!');
      reset(data); // Reset form dirty state with new data
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
          <h1 className="text-3xl font-bold text-gray-900">Call To Action Editor</h1>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-3xl mx-auto">
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
                  placeholder="e.g., Let's build something amazing together."
                  rules={{ required: "Title is required" }}
                />

                <FormTextarea
                  label="Subtitle"
                  name="subtitle"
                  register={register}
                  errors={errors}
                  placeholder="A short, inviting subtitle..."
                  rules={{ required: "Subtitle is required" }}
                />
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

export default AdminCTAEditor;