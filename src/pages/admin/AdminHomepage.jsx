import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { getHomepageSections, updateHomepageSections } from '../../api/admin_homepage';
import { Icon } from '../../components/common/IconMap';
import { Loader2, Save, Eye, EyeOff, GripVertical, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // For notifications

// --- Reusable Toggle Switch ---
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

// --- Reusable Section Item for DND List ---
const SectionItem = ({ section, onToggleVisibility }) => {
  return (
    <Reorder.Item
      value={section}
      id={section.section_key}
      className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center gap-4"
    >
      {/* Drag Handle */}
      <GripVertical className="text-gray-400 cursor-grab" />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{section.title}</h3>
        <p className="text-sm text-gray-500">{section.description}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Visibility Toggle */}
        <div className="flex items-center gap-2">
          {section.is_visible ? (
            <Eye className="w-5 h-5 text-green-500" />
          ) : (
            <EyeOff className="w-5 h-5 text-gray-400" />
          )}
          <ToggleSwitch
            enabled={section.is_visible}
            onChange={onToggleVisibility}
          />
        </div>

        {/* Edit Button */}
        <Link
          to={section.edit_path}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
        >
          <Settings className="w-4 h-4" />
          Edit Content
        </Link>
      </div>
    </Reorder.Item>
  );
};

// --- Main Admin Homepage Manager ---
const AdminHomepage = () => {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const loadSections = async () => {
      setIsLoading(true);
      const data = await getHomepageSections();
      setSections(data);
      setIsLoading(false);
    };
    loadSections();
  }, []);

  // Handler for saving the new order and visibility
  const handleSave = async () => {
    setIsSaving(true);
    toast.loading('Saving changes...');
    
    await updateHomepageSections(sections);
    
    toast.dismiss();
    toast.success('Homepage layout updated!');
    setIsSaving(false);
  };

  // Handler for toggling visibility for a specific item
  const handleToggleVisibility = (id) => {
    setSections(currentSections =>
      currentSections.map(s => 
        s.id === id ? { ...s, is_visible: !s.is_visible } : s
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Toaster position="bottom-center" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Homepage Manager</h1>
          <p className="mt-1 text-lg text-gray-600">
            Drag and drop sections to reorder your homepage.
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
              onToggleVisibility={() => handleToggleVisibility(section.id)}
            />
          ))}
        </Reorder.Group>
      </div>
    </motion.div>
  );
};

export default AdminHomepage;