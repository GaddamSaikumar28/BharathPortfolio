import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  getAboutPageSections, 
  updateAboutPageSections 
} from '../../api/admin_aboutpage'; // <-- 1. IMPORT new API
import { Icon } from '../../components/common/IconMap';
import { Loader2, Save, Eye, EyeOff, GripVertical, Settings, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

// --- Reusable Toggle Switch (Copied from AdminHomepage.jsx) ---
const ToggleSwitch = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
};

// --- Reusable Section Item for DND List (Copied from AdminHomepage.jsx) ---
const SectionItem = ({ section, onToggleVisibility }) => {
  return (
    <Reorder.Item
      value={section}
      id={section.id}
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <button className="cursor-grab text-gray-400 hover:text-gray-600">
          <GripVertical className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
          <p className="text-sm text-gray-500">{section.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ToggleSwitch
          enabled={section.is_visible}
          onChange={onToggleVisibility}
        />
        <Link
          to={section.edit_path}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50"
        >
          <Settings className="w-4 h-4" />
          Edit
        </Link>
      </div>
    </Reorder.Item>
  );
};

// --- Main AdminAboutPage Component ---
const AdminAboutPage = () => {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const loadSections = async () => {
      setIsLoading(true);
      const data = await getAboutPageSections(); // <-- 2. USE new API
      setSections(data);
      setIsLoading(false);
    };
    loadSections();
  }, []);

  // Handle saving the new order and visibility
  const handleSave = async () => {
    setIsSaving(true);
    toast.promise(
      updateAboutPageSections(sections), // <-- 3. USE new API
      {
        loading: 'Saving layout...',
        success: 'Layout saved successfully!',
        error: 'Failed to save layout.',
      }
    );
    setIsSaving(false);
  };

  // Handle toggling visibility
  const handleToggle = (id) => {
    setSections(currentSections =>
      currentSections.map(s =>
        s.id === id ? { ...s, is_visible: !s.is_visible } : s
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8"
    >
      <Toaster position="bottom-center" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          {/* 4. UPDATE Text */}
          <Link to="/admin" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">About Page Manager</h1>
          <p className="mt-1 text-lg text-gray-600">
            Drag and drop sections to reorder your about page.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSaving ? 'Saving...' : 'Save Layout'}
        </button>
      </div>

      {/* Drag-and-Drop List */}
      <div className="max-w-4xl mx-auto">
        <Reorder.Group
          axis="y"
          values={sections}
          onReorder={setSections}
          className="space-y-4"
        >
          {sections.map(section => (
            <SectionItem
              key={section.id}
              section={section}
              onToggleVisibility={() => handleToggle(section.id)}
            />
          ))}
        </Reorder.Group>
      </div>
    </motion.div>
  );
};

export default AdminAboutPage;