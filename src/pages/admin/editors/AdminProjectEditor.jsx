
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast, { Toaster } from 'react-hot-toast';
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon,
  X, Layers, Layout, PieChart, FileText, CheckCircle, Upload, Palette, Target, Hammer, Search, Zap,
  Quote, MessageSquare, Accessibility
} from 'lucide-react';
import { 
  getReferenceData, getEditorData, saveProject, uploadMedia, getStorageUrl, createTool, createCategory 
} from '../../../api/projectsadmin';

// --- UI Components ---

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
      active 
        ? 'border-gray-900 text-gray-900 bg-white shadow-sm ring-1 ring-gray-200 border-b-transparent' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`}
  >
    <Icon className="w-4 h-4" /> {label}
  </button>
);

const FormSection = ({ title, children, className = "", icon: Icon }) => (
  <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
    {title && (
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
    )}
    <div className="space-y-6">{children}</div>
  </div>
);

const Input = ({ label, register, name, error, type = "text", placeholder, className = "", ...rest }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
    <input
      type={type}
      {...register(name)}
      placeholder={placeholder}
      {...rest}
      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all ${
        error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
      } ${className}`}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
  </div>
);

const Textarea = ({ label, register, name, rows = 3, placeholder }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
    <textarea
      {...register(name)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none resize-y min-h-[80px]"
    />
  </div>
);

// --- Custom Components ---

const ColorPicker = ({ label, register, name, watch }) => {
  const color = watch(name);
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
          style={{ backgroundColor: color || '#ffffff' }}
        />
        <div className="relative flex-1">
          <input
            type="text"
            {...register(name)}
            placeholder="#000000"
            className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 outline-none uppercase font-mono text-sm"
          />
          <input
            type="color"
            {...register(name)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const MultiSelectWithCreate = ({ label, options, value = [], onChange, onCreate, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(search.toLowerCase()) && 
    !value.includes(opt.id.toString())
  );
  const selectedItems = options.filter(opt => value.includes(opt.id.toString()));

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="border border-gray-300 rounded-lg bg-white p-2 min-h-[46px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-gray-900 transition-all">
        {selectedItems.map(item => (
          <span key={item.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
            {item.name}
            <button type="button" onClick={() => onChange(value.filter(id => id !== item.id.toString()))} className="ml-1.5 hover:text-red-500 focus:outline-none"><X className="w-3 h-3" /></button>
          </span>
        ))}
        <input 
          type="text"
          className="flex-1 min-w-[120px] outline-none text-sm py-1 bg-transparent"
          placeholder={selectedItems.length === 0 ? placeholder : ""}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <div className="relative">
          <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => { onChange([...value, opt.id.toString()]); setSearch(""); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between group"
                >
                  <span>{opt.name}</span>
                  {opt.icon_name && <span className="text-xs text-gray-400 font-mono group-hover:text-gray-500">{opt.icon_name}</span>}
                </button>
              ))
            ) : (
              <div className="p-2">
                {search.length > 0 && (
                  <button type="button" onClick={() => { onCreate(search); setSearch(""); setIsOpen(false); }} className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create "{search}"
                  </button>
                )}
                {search.length === 0 && <p className="text-gray-400 text-sm text-center py-2">Start typing to search...</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CreateModal = ({ isOpen, onClose, onSave, title, fields }) => {
  if (!isOpen) return null;
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave(Object.fromEntries(formData.entries()));
  };
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          {fields.map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input name={f.name} type="text" required placeholder={f.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none" />
              {f.hint && <p className="text-xs text-gray-500 mt-1">{f.hint}</p>}
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black font-medium">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MediaUploader = ({ onUpload, currentMedia, label, multiple = false, onRemove }) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        const asset = await uploadMedia(file);
        onUpload(asset); 
      }
      toast.success('Uploaded successfully');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-4">
        {currentMedia && (Array.isArray(currentMedia) ? currentMedia : [currentMedia]).map((media, idx) => (
          media?.file_path && (
            <div key={media.id || idx} className="relative group w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all">
              <img src={getStorageUrl(media.file_path)} alt="preview" className="w-full h-full object-cover" />
              <button type="button" onClick={() => onRemove(media.id)} className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <X className="w-3 h-3" />
              </button>
            </div>
          )
        ))}
        {(!currentMedia || multiple || Array.isArray(currentMedia)) && (
          <label className="w-32 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50/50">
            {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <Upload className="w-6 h-6 text-gray-400" />}
            <span className="text-xs text-gray-500 mt-2 font-medium">Upload</span>
            <input type="file" className="hidden" onChange={handleFile} multiple={multiple} accept="image/*,video/*" />
          </label>
        )}
      </div>
    </div>
  );
};

// --- Main Editor Component ---

const AdminProjectEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = !slug || slug === 'new';
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [modalType, setModalType] = useState(null); 
  const [refs, setRefs] = useState({ categories: [], tools: [], tiers: [], testimonials: [] });

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      status: 'Completed',
      completion_percentage: 100,
      metadata_value: 0,
      banner_media_ids: [],
      slider_media_ids: [],
      project_sections: [],
      project_stats: [],
      flip_cards: [],
      process_steps: [],
      challenges_solutions: [],
      accessibility_data: [],
      category_ids: [],
      tool_ids: [],
      primary_color: '#000000',
      secondary_color: '#ffffff',
      banner_previews: [],
      slider_previews: [],
      visual_gallery_previews: [],
      project_gallery: [], // Note: API handles converting this to `project_gallery` table inserts
      quote_data: { quote: '', author: '', role: '' },
      call_to_action_data: { button_text: 'View Live', link: '' }
    }
  });

  const watchBannerPreviews = watch('banner_previews');
  const watchSliderPreviews = watch('slider_previews');
  const watchGalleryPreviews = watch('visual_gallery_previews');
  const watchHero = watch('hero_media');
  const watchDetailHero = watch('detail_hero_media');

  // --- Dynamic Field Arrays ---
  const { fields: sectionFields, append: addSection, remove: removeSection, move: moveSection } = useFieldArray({ control, name: "project_sections" });
  const { fields: statFields, append: addStat, remove: removeStat } = useFieldArray({ control, name: "project_stats" });
  const { fields: cardFields, append: addCard, remove: removeCard } = useFieldArray({ control, name: "flip_cards" });
  const { fields: processFields, append: addProcess, remove: removeProcess } = useFieldArray({ control, name: "process_steps" });
  const { fields: challengeFields, append: addChallenge, remove: removeChallenge } = useFieldArray({ control, name: "challenges_solutions" });
  const { fields: accessFields, append: addAccess, remove: removeAccess } = useFieldArray({ control, name: "accessibility_data" });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const refData = await getReferenceData();
        setRefs(refData);
        if (!isNew) {
          const projectData = await getEditorData(slug);
          // Map gallery relation to previews if needed
          const galleryPreviews = projectData.project_gallery?.map(g => g.media_assets) || [];
          
          reset({
            ...projectData,
            visual_gallery_previews: galleryPreviews,
            // Ensure Quote/CTA objects exist
            quote_data: projectData.quote_data || { quote: '', author: '', role: '' },
            call_to_action_data: projectData.call_to_action_data || { button_text: '', link: '' }
          });
        }
      } catch (error) {
        toast.error('Error loading data');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [slug, isNew, reset]);

  // --- Creation Handlers ---
  const handleCreateTool = async (data) => {
    try {
      const newTool = await createTool(data.name, data.icon_name);
      setRefs(prev => ({ ...prev, tools: [...prev.tools, newTool].sort((a,b) => a.name.localeCompare(b.name)) }));
      const currentTools = watch('tool_ids') || [];
      setValue('tool_ids', [...currentTools, newTool.id.toString()]);
      toast.success(`Tool created!`);
      setModalType(null);
    } catch (err) { toast.error('Failed to create tool'); }
  };

  const handleCreateCategory = async (data) => {
    try {
      const newCat = await createCategory(data.name);
      setRefs(prev => ({ ...prev, categories: [...prev.categories, newCat].sort((a,b) => a.name.localeCompare(b.name)) }));
      const currentCats = watch('category_ids') || [];
      setValue('category_ids', [...currentCats, newCat.id.toString()]);
      toast.success(`Category created!`);
      setModalType(null);
    } catch (err) { toast.error('Failed to create category'); }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // Destructure visual_gallery_previews so it doesn't get passed to the API
      const { visual_gallery_previews, ...restData } = data;

      // Map visual_gallery_previews back to structure needed for saving
      const galleryPayload = (visual_gallery_previews || []).map(media => ({ media: media }));
      
      const payload = {
        ...restData,
        project_gallery: galleryPayload 
      };

      const result = await saveProject(payload, isNew, slug);
      toast.success('Project saved successfully!');
      if (isNew) navigate(`/admin/projects-config/${result.slug}`);
    } catch (error) {
      toast.error('Failed to save project');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
        <Toaster position="top-right" />
        <CreateModal isOpen={modalType === 'tool'} onClose={() => setModalType(null)} onSave={handleCreateTool} title="Create New Tool" fields={[{ name: 'name', label: 'Tool Name', placeholder: 'e.g. React Native' }, { name: 'icon_name', label: 'Icon Name', placeholder: 'e.g. Zap' }]} />
        <CreateModal isOpen={modalType === 'category'} onClose={() => setModalType(null)} onSave={handleCreateCategory} title="Create New Category" fields={[{ name: 'name', label: 'Category Name', placeholder: 'e.g. Mobile' }]} />

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/projects-config" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Project' : 'Edit Project'}</h1>
                <p className="text-xs text-gray-500 font-mono">{watch('slug') || 'untitled'}</p>
              </div>
            </div>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all transform active:scale-95 font-medium">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2 scrollbar-hide">
            <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Layout} label="General" />
            <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={ImageIcon} label="Media" />
            <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Blocks" />
            <TabButton active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} icon={Layers} label="Page Sections" />
            <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={PieChart} label="Statistics" />
          </div>

          {/* --- TAB: GENERAL --- */}
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <FormSection title="Core Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Project Title" name="title" register={register} error={errors.title} placeholder="e.g. E-Commerce Platform" />
                    <Input label="Slug" name="slug" register={register} placeholder="Auto-generated" />
                  </div>
                  <Textarea label="Short Description" name="description" register={register} placeholder="Brief overview..." />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Client" name="client" register={register} placeholder="e.g. Acme Corp" />
                    <Input label="Role" name="role" register={register} placeholder="e.g. Lead Designer" />
                  </div>
                </FormSection>

                <FormSection title="Extended Details">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Input label="Timeline" name="timeline" register={register} placeholder="e.g. 3 Months" />
                    <Input label="Publisher" name="publisher_name" register={register} placeholder="e.g. Behance" />
                    <Input label="Meta Label" name="metadata_label" register={register} placeholder="e.g. Views" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Input label="Meta Value" name="metadata_value" type="number" register={register} />
                    <ColorPicker label="Primary Color" name="primary_color" register={register} watch={watch} />
                    <ColorPicker label="Secondary Color" name="secondary_color" register={register} watch={watch} />
                  </div>
                  <Input label="Tagline" name="tagline" register={register} placeholder="A catchy phrase for the header..." />
                </FormSection>
              </div>

              <div className="space-y-8">
                <FormSection title="Classification">
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Status</label>
                    <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Concept">Concept</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tier</label>
                    <select {...register('tier_id')} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
                      <option value="">Select Tier...</option>
                      {refs.tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <Input label="Completion %" name="completion_percentage" type="number" register={register} />
                </FormSection>
                <FormSection title="Relations">
                  <div className="space-y-6">
                    <Controller control={control} name="category_ids" render={({ field: { value, onChange } }) => (
                      <MultiSelectWithCreate label="Categories" options={refs.categories} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('category'); }} />
                    )} />
                    <Controller control={control} name="tool_ids" render={({ field: { value, onChange } }) => (
                      <MultiSelectWithCreate label="Tools Used" options={refs.tools} value={value} onChange={onChange} onCreate={(name) => { setPendingCreateValue(name); setModalType('tool'); }} />
                    )} />
                  </div>
                </FormSection>
              </div>
            </div>
          )}

          {/* --- TAB: MEDIA --- */}
          {activeTab === 'media' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FormSection title="Hero Assets" icon={ImageIcon}>
                <MediaUploader label="Card Thumbnail (Main Image)" currentMedia={watchHero} onRemove={() => setValue('hero_media_id', null) || setValue('hero_media', null)} onUpload={(asset) => { setValue('hero_media_id', asset.id); setValue('hero_media', asset); }} />
                <div className="border-t pt-6">
                  <MediaUploader label="Detail Page Header (Large)" currentMedia={watchDetailHero} onRemove={() => setValue('detail_hero_media_id', null) || setValue('detail_hero_media', null)} onUpload={(asset) => { setValue('detail_hero_media_id', asset.id); setValue('detail_hero_media', asset); }} />
                </div>
                <Input label="Video URL" name="video_url" register={register} placeholder="https://youtube..." />
              </FormSection>

              <FormSection title="Galleries" icon={Layout}>
                <MediaUploader 
                  label="Grid Images (Banner IDs)" multiple currentMedia={watchBannerPreviews} 
                  onRemove={(id) => {
                    setValue('banner_media_ids', (watch('banner_media_ids') || []).filter(x => x !== id));
                    setValue('banner_previews', (watch('banner_previews') || []).filter(x => x.id !== id));
                  }} 
                  onUpload={(asset) => {
                    setValue('banner_media_ids', [...(watch('banner_media_ids') || []), asset.id]);
                    setValue('banner_previews', [...(watch('banner_previews') || []), asset]);
                  }} 
                />
                <div className="border-t pt-6">
                  <MediaUploader 
                    label="Carousel Slider (Slider IDs)" multiple currentMedia={watchSliderPreviews} 
                    onRemove={(id) => {
                      setValue('slider_media_ids', (watch('slider_media_ids') || []).filter(x => x !== id));
                      setValue('slider_previews', (watch('slider_previews') || []).filter(x => x.id !== id));
                    }} 
                    onUpload={(asset) => {
                      setValue('slider_media_ids', [...(watch('slider_media_ids') || []), asset.id]);
                      setValue('slider_previews', [...(watch('slider_previews') || []), asset]);
                    }} 
                  />
                </div>
                <div className="border-t pt-6">
                   <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Gallery (Project Gallery Relation)</h4>
                   <MediaUploader 
                     label="" multiple currentMedia={watchGalleryPreviews}
                     onRemove={(id) => {
                       setValue('visual_gallery_previews', (watch('visual_gallery_previews') || []).filter(x => x.id !== id));
                     }}
                     onUpload={(asset) => {
                       setValue('visual_gallery_previews', [...(watch('visual_gallery_previews') || []), asset]);
                     }}
                   />
                </div>
              </FormSection>
            </div>
          )}

          {/* --- TAB: CONTENT BLOCKS --- */}
          {activeTab === 'content' && (
             <div className="space-y-8 max-w-5xl mx-auto">
               
               {/* 1. Process Steps */}
               <FormSection title="Process Steps" icon={Layers}>
                 {processFields.map((field, index) => (
                   <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <span className="font-bold text-gray-300 text-xl mt-1">#{index + 1}</span>
                     <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <Input label="Title" name={`process_steps.${index}.title`} register={register} placeholder="e.g. Discovery" />
                           <Input label="Icon" name={`process_steps.${index}.icon`} register={register} placeholder="e.g. Search" />
                        </div>
                        <Textarea label="Detail" name={`process_steps.${index}.detail`} register={register} placeholder="Description of this phase..." rows={3} />
                     </div>
                     <button type="button" onClick={() => removeProcess(index)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
                 <button type="button" onClick={() => addProcess({ title: '', detail: '', icon: 'Zap', step_number: processFields.length + 1 })} className="text-sm text-blue-600 font-medium">+ Add Step</button>
               </FormSection>

               {/* 2. Challenges & Solutions */}
               <FormSection title="Challenges & Solutions" icon={Target}>
                 {challengeFields.map((field, index) => (
                   <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
                     <div className="mt-2"><Hammer className="w-5 h-5 text-gray-400" /></div>
                     <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Challenge" name={`challenges_solutions.${index}.challenge`} register={register} placeholder="Problem..." />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Icon" name={`challenges_solutions.${index}.icon`} register={register} placeholder="e.g. Zap" />
                                <Input label="Border Class" name={`challenges_solutions.${index}.challengeColor`} register={register} placeholder="e.g. border-red-500" />
                            </div>
                        </div>
                        <Textarea label="Solution" name={`challenges_solutions.${index}.solution`} register={register} placeholder="How we solved it..." rows={3} />
                     </div>
                     <button type="button" onClick={() => removeChallenge(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
                 <button type="button" onClick={() => addChallenge({ challenge: '', solution: '', icon: 'Zap', challengeColor: 'border-gray-200' })} className="text-sm text-blue-600 font-medium">+ Add Challenge</button>
               </FormSection>

               {/* 3. Flip Cards */}
               <FormSection title="Design Principles (Flip Cards)" icon={CheckCircle}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   {cardFields.map((field, index) => (
                     <div key={field.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative group">
                       <button type="button" onClick={() => removeCard(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                       <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                             <Input label="Front Title" name={`flip_cards.${index}.front_title`} register={register} />
                             <Input label="Icon Name" name={`flip_cards.${index}.icon`} register={register} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <Input label="Bg Class" name={`flip_cards.${index}.bgColor`} register={register} placeholder="bg-white" />
                              <ColorPicker label="Icon Color" name={`flip_cards.${index}.iconColor`} register={register} watch={watch} />
                          </div>
                          <Textarea label="Back Info" name={`flip_cards.${index}.back_info`} register={register} rows={2} />
                       </div>
                     </div>
                   ))}
                 </div>
                 <button type="button" onClick={() => addCard({ front_title: '', back_info: '', icon: 'Zap', bgColor: 'bg-white', iconColor: '#000000' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Card</button>
               </FormSection>

               {/* 4. Accessibility Data */}
               <FormSection title="Accessibility Insights" icon={Accessibility}>
                 <div className="space-y-3">
                   {accessFields.map((field, index) => (
                     <div key={field.id} className="flex gap-3">
                       <div className="flex-1">
                          <Input name={`accessibility_data.${index}.text`} register={register} placeholder="e.g. High contrast ratios used..." />
                       </div>
                       <button type="button" onClick={() => removeAccess(index)} className="text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                     </div>
                   ))}
                 </div>
                 <button type="button" onClick={() => addAccess({ text: '' })} className="mt-4 text-sm text-blue-600 font-medium">+ Add Insight</button>
               </FormSection>

               {/* 5. Quote & CTA */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <FormSection title="Testimonial Quote" icon={Quote}>
                    <Textarea label="Quote" name="quote_data.quote" register={register} placeholder="The best team ever..." />
                    <Input label="Author" name="quote_data.author" register={register} />
                    <Input label="Role" name="quote_data.role" register={register} />
                 </FormSection>

                 <FormSection title="Call To Action" icon={MessageSquare}>
                    <Input label="Button Text" name="call_to_action_data.button_text" register={register} placeholder="View Live" />
                    <Input label="Link URL" name="call_to_action_data.link" register={register} />
                 </FormSection>
               </div>
             </div>
           )}

          {/* --- TAB: SECTIONS --- */}
          {activeTab === 'sections' && (
            <div className="space-y-6 max-w-5xl mx-auto">
               <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="text-lg font-bold text-blue-900">Dynamic Page Sections</h3>
                    <p className="text-sm text-blue-700 mt-1">Rich text and image sections stacking vertically.</p>
                  </div>
                  <button type="button" onClick={() => addSection({ heading: '', body_text: '', layout_type: 'image_left', media_asset_ids: [], resolved_media: [] })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Section</button>
               </div>
               
               <div className="space-y-6">
                {sectionFields.map((field, index) => (
                  <div key={field.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Section {index + 1}</span>
                        <button type="button" onClick={() => removeSection(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Input label="Heading" name={`project_sections.${index}.heading`} register={register} placeholder="Section title..." />
                          <Textarea label="Body" name={`project_sections.${index}.body_text`} register={register} rows={5} placeholder="Content..." />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Layout</label>
                              <select {...register(`project_sections.${index}.layout_type`)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none">
                                <option value="image_left">Image Left</option>
                                <option value="image_right">Image Right</option>
                                <option value="full_width">Full Width</option>
                                <option value="split_side_by_side">Split</option>
                              </select>
                            </div>
                            <Input label="Bg Color" name={`project_sections.${index}.bg_color`} register={register} placeholder="bg-white" />
                          </div>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                          <Controller
                            control={control}
                            name={`project_sections.${index}.resolved_media`}
                            render={({ field: { value, onChange } }) => (
                              <MediaUploader label="Images" multiple currentMedia={value} onRemove={(id) => {
                                  const newMedia = (value || []).filter(m => m.id !== id);
                                  onChange(newMedia);
                                  setValue(`project_sections.${index}.media_asset_ids`, (watch(`project_sections.${index}.media_asset_ids`) || []).filter(x => x !== id));
                                }}
                                onUpload={(asset) => {
                                  onChange([...(value || []), asset]);
                                  setValue(`project_sections.${index}.media_asset_ids`, [...(watch(`project_sections.${index}.media_asset_ids`) || []), asset.id]);
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                  </div>
                ))}
               </div>
            </div>
          )}

           {/* --- TAB: STATS --- */}
           {activeTab === 'stats' && (
             <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-gray-900">Key Statistics</h3>
                   <button type="button" onClick={() => addStat({ title: '', value: '' })} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Stat</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                   {statFields.map((field, index) => (
                     <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
                        <button type="button" onClick={() => removeStat(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                        <div className="space-y-3">
                           <Input label="Title" name={`project_stats.${index}.title`} register={register} />
                           <Input label="Value" name={`project_stats.${index}.value`} register={register} />
                           <Input label="Trend" name={`project_stats.${index}.trend`} register={register} />
                           <Input label="Icon" name={`project_stats.${index}.icon_name`} register={register} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

        </div>
      </form>
    </DndProvider>
  );
};

export default AdminProjectEditor;