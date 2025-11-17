import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  ArrowLeft, Save, Loader2, Image as ImageIcon, UploadCloud, X
} from 'lucide-react';
import {
  getHeaderEditorData,
  saveHeaderConfig,
  uploadMedia,
  getStorageUrl,
} from '../../../api/headeradmin'; // Adjust path
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
    {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
  </div>
);

// --- Reusable Media Uploader ---
const MediaUploader = ({ label, mediaPath, onUpload, onClear }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
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

  const onFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  return (
    <div>
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        {!imageUrl ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onFileDrop}
            className={`flex justify-center px-6 pt-5 pb-6 border-2 ${dragOver ? 'border-blue-500' : 'border-gray-300'} border-dashed rounded-md`}
          >
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
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, or SVG up to 10MB</p>
            </div>
          </div>
        ) : (
          <div className="relative">
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

// --- Main Editor Component ---
const AdminHeaderEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm();
  
  const watchedMediaPath = watch('logo_media_path');

  // --- Load Data ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHeaderEditorData();
        reset(data);
      } catch (error) {
        toast.error('Error loading header data.');
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
      await saveHeaderConfig(formData);
      toast.success('Header configuration saved!', { id: toastId });
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
              Edit Header
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
        
        {/* --- Logo Configuration --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Logo</h2>
          <p className="text-sm text-gray-500 mb-4">
            You can use an uploaded image, raw SVG code, or plain text.
            The priority is: <strong>Image  SVG  Text</strong>.
          </p>
          <div className="space-y-4">
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

            <div className="flex flex-col">
              <label htmlFor="logo_svg" className="mb-2 text-sm font-medium text-gray-700">Logo SVG Code (Optional)</label>
              <textarea
                id="logo_svg"
                rows="4"
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
          </div>
        </div>

        {/* --- Call to Action Button --- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Call to Action (CTA) Button</h2>
          <div className="space-y-4">
            <FormInput
              label="CTA Button Text"
              name="cta_text"
              register={register}
              error={errors.cta_text}
              placeholder="Contact Me"
            />
            <FormInput
              label="CTA Button URL"
              name="cta_url"
              register={register}
              error={errors.cta_url}
              placeholder="/contact"
            />
          </div>
        </div>

      </div>
    </form>
  );
};

export default AdminHeaderEditor;