import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Loader2, 
  ImageIcon, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { 
  fetchIphoneShowcaseItems, 
  saveIphoneShowcaseItem, 
  deleteIphoneShowcaseItem, 
  reorderIphoneShowcaseItems, 
  getStorageUrl 
} from '../../../api/iphoneShowcaseAdmin';

export default function IphoneShowcaseAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    order: 0,
    currentMediaId: null
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchIphoneShowcaseItems();
      setItems(data || []);
    } catch (err) {
      console.error('Failed to load items', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      title: item.title || '',
      description: item.description || '',
      order: item.order || 0,
      currentMediaId: item.media_id
    });
    setPreviewUrl(getStorageUrl(item.media_assets));
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setFormData({
      id: null,
      title: '',
      description: '',
      order: items.length + 1,
      currentMediaId: null
    });
    setPreviewUrl(null);
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await saveIphoneShowcaseItem(formData, selectedFile);
      setIsEditing(false);
      loadItems(); // Refresh list
    } catch (err) {
      alert('Error saving item: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, mediaId) => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) return;
    try {
      await deleteIphoneShowcaseItem(id, mediaId);
      loadItems();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleMove = async (index, direction) => {
    const newItems = [...items];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    } else {
      return;
    }

    // Update local state immediately for responsiveness
    setItems(newItems);

    // Prepare updates for DB (reassign orders based on new index)
    const updates = newItems.map((item, idx) => ({
      id: item.id,
      order: idx + 1
    }));

    try {
      await reorderIphoneShowcaseItems(updates);
    } catch (err) {
      console.error('Failed to reorder', err);
      loadItems(); // Revert on error
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">iPhone Showcase</h1>
          <p className="text-gray-500 text-sm">Manage the screens displayed on the homepage slider.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} /> Add Screen
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">{formData.id ? 'Edit Screen' : 'New Screen'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Area */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Screen Image</label>
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-64 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: 1179 x 2556px (iPhone Screenshot).<br/>
                    Supported formats: PNG, JPG, WEBP.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. Dashboard UI"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                <input 
                  type="number" 
                  value={formData.order}
                  onChange={e => setFormData({...formData, order: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Short description of this screen..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />}
                {formData.id ? 'Save Changes' : 'Create Screen'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-6 hover:shadow-md transition-shadow"
            >
              {/* Order Controls */}
              <div className="flex flex-col gap-1 text-gray-400">
                <button 
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-30"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === items.length - 1}
                  className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-30"
                >
                  <ArrowDown size={16} />
                </button>
              </div>

              {/* Thumbnail */}
              <div className="w-12 h-24 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-100">
                {getStorageUrl(item.media_assets) ? (
                  <img src={getStorageUrl(item.media_assets)} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={16}/></div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">#{item.order}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(item)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id, item.media_id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No screens added yet. Click "Add Screen" to start.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}