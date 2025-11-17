import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  ArrowLeft, Save, Loader2, Image as ImageIcon, X, Plus, Trash2, GripVertical
} from 'lucide-react';
import {
  getFooterEditorData,
  saveFooterConfig,
  uploadMedia,
  getStorageUrl,
} from '../../../api/footeradmin'; // Adjust path
import toast, { Toaster } from 'react-hot-toast';
import { motion, Reorder } from 'framer-motion';

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
    {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
  </div>
);

// --- Reusable Media Uploader (Copied from Header Editor) ---
const MediaUploader = ({ label, mediaPath, onUpload, onClear }) => {
  const [isUploading, setIsUploading] = useState(false);
  const imageUrl = mediaPath ? getStorageUrl(mediaPath) : null;

  const handleFileChange = async (file) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const { media_asset_id, file_path } = await uploadMedia(file);
      onUpload(media_asset_id, file_path);
      toast.success('Logo uploaded!');
    } catch (error) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        {!imageUrl ? (
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {isUploading ? (
                <Loader2 className="w-12 h-12 mx-auto text-gray-400 animate-spin" />
              ) : (
                <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="logo-upload"
                  className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="logo-upload"
                    type="file"
                    className="sr-only"
                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, or SVG</p>
            </div>
          </div>
        ) : (
          <div className="relative w-32">
            <img src={imageUrl} alt="Logo preview" className="h-20 w-auto p-2 border rounded-md" />
            <button
              type="button"
              onClick={onClear}
              className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Single Link Column Editor ---
const LinkColumnEditor = ({ colIndex, control, register, removeColumn }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `link_sections.${colIndex}.links`,
  });

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex justify-between items-center mb-3">
        <input
          {...register(`link_sections.${colIndex}.title`)}
          className="p-2 border border-gray-300 rounded-md font-semibold text-lg"
          placeholder="Column Title (e.g., Navigation)"
        />
        <button
          type="button"
          onClick={() => removeColumn(colIndex)}
          className="p-2 text-red-500 hover:bg-red-100 rounded-md"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <Reorder.Group axis="y" values={fields} onReorder={move}>
          {fields.map((field, index) => (
            <Reorder.Item key={field.id} value={field} className="flex items-center gap-2 p-2 bg-white rounded border">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <input
                {...register(`link_sections.${colIndex}.links.${index}.label`)}
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Link Label (e.g., Home)"
              />
              <input
                {...register(`link_sections.${colIndex}.links.${index}.url`)}
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                placeholder="URL (e.g., / or https://...)"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
      <button
        type="button"
        onClick={() => append({ id: crypto.randomUUID(), label: '', url: '' })}
        className="flex items-center gap-1 px-3 py-1 mt-3 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
      >
        <Plus className="w-4 h-4" /> Add Link
      </button>
    </div>
  );
};

// --- Main Editor Component ---
const AdminFooterEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm();
  
  const watchedMediaPath = watch('logo_media_path');
  
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "link_sections"
  });

  // --- Load Data ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getFooterEditorData();
        reset(data);
      } catch (error) {
        toast.error('Error loading footer data.');
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

    try {
      await saveFooterConfig(formData);
      toast.success('Footer configuration saved!', { id: toastId });
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
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              Edit Footer
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
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* --- Branding Configuration --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Branding</h2>
          <p className="text-sm text-gray-500 mb-4">
            Set your footer's logo and tagline. Priority is: <strong>Image {'>'} SVG {'>'} Text</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MediaUploader
              label="Logo Image"
              mediaPath={watchedMediaPath}
              onUpload={(id, path) => {
                setValue('logo_media_id', id);
                setValue('logo_media_path', path);
              }}
              onClear={() => {
                setValue('logo_media_id', null);
                setValue('logo_media_path', null);
              }}
            />
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="logo_svg" className="mb-2 text-sm font-medium text-gray-700">Logo SVG Code (Optional)</label>
                <textarea
                  id="logo_svg"
                  rows="3"
                  {...register('logo_svg')}
                  className="p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                  placeholder="<svg>...</svg>"
                />
              </div>
              
              <FormInput
                label="Logo Text (Fallback)"
                name="logo_text"
                register={register}
                error={errors.logo_text}
                placeholder="Gaddam B. Kumar"
              />

              <FormInput
                label="Tagline"
                name="tagline"
                register={register}
                error={errors.tagline}
                placeholder="Creative Graphic Designer & Brand Strategist"
              />
            </div>
          </div>
        </div>

        {/* --- Link Columns --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Link Columns</h2>
          <p className="text-sm text-gray-500 mb-4">Drag columns to re-order them. Drag links within columns to re-order them.</p>

          <div className="space-y-4">
            <Reorder.Group axis="y" values={fields} onReorder={move}>
              {fields.map((field, index) => (
                <Reorder.Item key={field.id} value={field} className="relative">
                  <div className="absolute top-5 left-2">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  </div>
                  <div className="ml-8">
                    <LinkColumnEditor 
                      colIndex={index}
                      control={control}
                      register={register}
                      removeColumn={remove}
                    />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            
            <button
              type="button"
              onClick={() => append({ id: crypto.randomUUID(), title: '', links: [] })}
              className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <Plus className="w-4 h-4" /> Add Column
            </button>
          </div>
        </div>
        
        {/* --- Copyright Section --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Copyright Text</h2>
          <FormInput
            label="Text (e.g., Gaddam Bharath Kumar. The year is added automatically.)"
            name="copyright_text"
            register={register}
            error={errors.copyright_text}
            placeholder="Gaddam Bharath Kumar"
          />
        </div>

      </div>
    </form>
  );
};

export default AdminFooterEditor;