// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, Save } from 'lucide-react';
// import { motion } from 'framer-motion';

// const AdminFAQEditor = () => (
//   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//     <div className="flex justify-between items-center">
//       <div>
//         <Link to="/admin/homepage-config" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-2">
//           <ArrowLeft className="w-4 h-4" /> Back to Homepage Manager
//         </Link>
//         <h1 className="text-3xl font-bold text-gray-900">Edit FAQ Section</h1>
//       </div>
//       <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700">
//         <Save className="w-5 h-5" /> Save Changes
//       </button>
//     </div>
//     <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
//       <h2 className="text-xl font-semibold text-gray-800">FAQ Editor</h2>
//       <p className="text-gray-500 mt-2">This is where you will add a form to create, edit, reorder, and delete FAQs from the `faqs` table.</p>
//     </div>
//   </motion.div>
// );
// export default AdminFAQEditor;




import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  getFaqsAdmin,
  subscribeToFaqChanges,
  updateFaqOrder,
  deleteFaq,
  saveFaq,
} from '../../../api/faqadmin'; 
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
      rows="5"
    />
    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message || 'This field is required'}</span>}
  </div>
);

// --- FAQ Editor Modal ---
const FaqEditorModal = ({ faq, onClose, onSave }) => {
  const isEditing = !!faq?.id;

  const defaultValues = {
    id: faq?.id || undefined,
    question: faq?.question || '',
    answer: faq?.answer || '',
    order: faq?.order ?? 0,
  };

  const { register, control, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading(isEditing ? 'Updating FAQ...' : 'Creating FAQ...');
    
    const { success, error } = await saveFaq(data); 
    
    toast.dismiss(toastId);
    if (success) {
      toast.success('FAQ saved successfully!');
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
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit FAQ' : 'Create New FAQ'}</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} id="faq-form" className="flex-1 overflow-y-auto p-6 space-y-6">
          <FormInput 
            label="Question" 
            name="question" 
            register={register} 
            errors={errors} 
            placeholder="e.g., What is your design process?"
            rules={{ required: "Question is required" }}
          />

          <FormTextarea
            label="Answer"
            name="answer"
            register={register}
            errors={errors}
            placeholder="A clear and concise answer..."
            rules={{ required: "Answer is required" }}
          />
        </form>

        <footer className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            form="faq-form"
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
const AdminFAQEditor = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [openFaq, setOpenFaq] = useState(null); // For accordion preview

  const loadData = useCallback(async () => {
    const data = await getFaqsAdmin();
    setFaqs(data);
    setIsLoading(false);
  }, []);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to changes
  useEffect(() => {
    const channel = subscribeToFaqChanges(loadData); // Re-run loadData on any change
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [loadData]);

  const handleDelete = async (faq) => {
    if (window.confirm(`Are you sure you want to delete this question: "${faq.question}"?`)) {
      const toastId = toast.loading('Deleting FAQ...');
      const { success, error } = await deleteFaq(faq);
      toast.dismiss(toastId);
      if (success) {
        toast.success('FAQ deleted!');
      } else {
        toast.error(`Failed to delete: ${error.message}`);
      }
    }
  };

  const handleOrderSave = async (newOrder) => {
    setIsSavingOrder(true);
    setFaqs(newOrder); // Optimistic update
    const { success, error } = await updateFaqOrder(newOrder);
    if (success) {
      toast.success('Order saved!');
    } else {
      toast.error(`Failed to save order: ${error.message}`);
      loadData(); // Revert on failure
    }
    setIsSavingOrder(false);
  };

  const openModalToCreate = () => {
    setSelectedFaq(null);
    setIsModalOpen(true);
  };

  const openModalToEdit = (faq) => {
    setSelectedFaq(faq);
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
          <h1 className="text-3xl font-bold text-gray-900">FAQ Editor</h1>
        </div>
        <button
          onClick={openModalToCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Create New FAQ
        </button>
      </header>

      {/* --- Main Content Area --- */}
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Drag and drop questions to re-order them on the homepage.</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <Reorder.Group axis="y" values={faqs} onReorder={handleOrderSave}>
            {faqs.map(faq => (
              <Reorder.Item key={faq.id} value={faq} className="mb-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <button className="cursor-grab text-gray-400 hover:text-gray-600 flex-shrink-0" title="Drag to re-order">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-gray-800 truncate">{faq.question}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className="text-sm font-medium text-gray-500 hover:text-gray-800" title="Preview answer">
                      <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                    </button>
                    <button onClick={() => openModalToEdit(faq)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(faq)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
                {/* Accordion Content */}
                <AnimatePresence>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 pt-2 text-gray-600 border-t border-gray-100">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
        {isSavingOrder && <p className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Saving new order...</p>}
      </div>
      
      {/* --- Editor Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <FaqEditorModal
            faq={selectedFaq}
            onClose={() => setIsModalOpen(false)}
            onSave={loadData} // Refetch data on save
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminFAQEditor;