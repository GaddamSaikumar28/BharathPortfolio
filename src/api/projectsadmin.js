
import { supabase } from "../lib/supabaseClient";

// --- Helpers ---

// Generate URL-safe slug
const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const getUniqueSlug = async (title, currentId = null) => {
  let slug = slugify(title);
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    let query = supabase.from('projects').select('id').eq('slug', slug);
    
    // If editing, exclude current project from check
    if (currentId) {
      query = query.neq('id', currentId);
    }

    const { data } = await query;
    
    if (!data || data.length === 0) {
      isUnique = true;
    } else {
      slug = `${slugify(title)}-${counter}`;
      counter++;
    }
  }
  return slug;
};

// Helper to get public URL
export const getStorageUrl = (filePath) => {
  if (!filePath) return null;
  // If it's already a full URL (legacy), return it
  if (filePath.startsWith('http')) return filePath;
  const { data } = supabase.storage.from('media').getPublicUrl(filePath);
  return data.publicUrl;
};

// --- Fetching Reference Data ---

export const getReferenceData = async () => {
  const [categories, tools, tiers] = await Promise.all([
    supabase.from('project_categories').select('id, name').order('name'),
    supabase.from('tools').select('id, name, icon_name').order('name'),
    supabase.from('project_tiers').select('id, name').order('order')
  ]);

  return {
    categories: categories.data || [],
    tools: tools.data || [],
    tiers: tiers.data || []
  };
};

// --- Create New References (Tools/Categories) ---

export const createCategory = async (name) => {
  const slug = slugify(name);
  const { data, error } = await supabase
    .from('project_categories')
    .insert({ name, slug })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const createTool = async (name, iconName) => {
  const { data, error } = await supabase
    .from('tools')
    .insert({ name, icon_name: iconName })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// --- Dashboard List ---

export const getProjectAdminDashboard = async (search = '') => {
  let query = supabase
    .from('projects')
    .select(`
      id, title, slug, status, completion_percentage,
      hero_media:media_assets!projects_hero_media_id_fkey(file_path),
      project_tiers(name, color_hex)
    `)
    .order('created_at', { ascending: false });

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// --- Editor: Fetch Single Project ---

export const getEditorData = async (slug) => {
  // 1. Fetch Main Project Data with direct relations
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      hero_media:media_assets!projects_hero_media_id_fkey(id, file_path, alt_text),
      detail_hero_media:media_assets!projects_detail_hero_media_id_fkey(id, file_path, alt_text)
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;

  // 2. Fetch Linked Junction Data
  const { data: catLinks } = await supabase.from('project_category_links').select('category_id').eq('project_id', project.id);
  const { data: toolLinks } = await supabase.from('project_tool_links').select('tool_id').eq('project_id', project.id);
  
  // 3. Fetch Related Tables (1-to-many)
  const { data: sections } = await supabase.from('project_sections').select('*').eq('project_id', project.id).order('order');
  const { data: stats } = await supabase.from('project_stats').select('*').eq('project_id', project.id).order('order');
  const { data: contentBlocks } = await supabase.from('project_content_blocks').select('*').eq('project_id', project.id).order('order');

  // 4. Resolve Array Media IDs for UI Preview
  const fetchMediaDetails = async (ids) => {
    if (!ids || ids.length === 0) return [];
    const { data } = await supabase.from('media_assets').select('id, file_path').in('id', ids);
    // Return sorted by the order of IDs in the array
    return ids.map(id => data.find(m => m.id === id)).filter(Boolean);
  };

  const bannerImages = await fetchMediaDetails(project.banner_media_ids);
  const sliderImages = await fetchMediaDetails(project.slider_media_ids);

  // Format Sections media
  const formattedSections = await Promise.all(sections.map(async (sec) => ({
    ...sec,
    resolved_media: await fetchMediaDetails(sec.media_asset_ids || [])
  })));

  return {
    ...project,
    category_ids: catLinks.map(c => c.category_id.toString()),
    tool_ids: toolLinks.map(t => t.tool_id.toString()),
    project_sections: formattedSections,
    project_stats: stats,
    // Parse content blocks for specific UI sections
    flip_cards: contentBlocks.find(b => b.block_type === 'flip_cards')?.content || [],
    process_steps: contentBlocks.find(b => b.block_type === 'process')?.content || [],
    challenges_solutions: contentBlocks.find(b => b.block_type === 'challenges')?.content || [],
    // Media Previews
    banner_previews: bannerImages,
    slider_previews: sliderImages
  };
};

// --- Core Actions: Upload & Delete Media ---

export const uploadMedia = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
  if (uploadError) throw uploadError;

  // 2. Insert into media_assets table
  const { data: asset, error: dbError } = await supabase
    .from('media_assets')
    .insert({
      file_path: filePath,
      file_type: file.type,
      alt_text: file.name.split('.')[0], // Default alt text
    })
    .select()
    .single();

  if (dbError) throw dbError;

  return asset; // Returns { id, file_path, ... }
};

export const deleteProject = async (id, slug) => {
  // 1. Array of all child tables that reference 'projects'
  // We must clean these up first to avoid Foreign Key Constraint errors
  const childTables = [
    'project_category_links',
    'project_tool_links',
    'project_sections',
    'project_stats',
    'project_content_blocks',
    'project_gallery',           // Included based on your schema
    'project_media_highlights',  // The specific table causing your current error
    'project_case_study_modules', // Included based on your schema
    'project_related_links'      // Included based on your schema
  ];

  try {
    // 2. Delete all related records in parallel
    // We use Promise.all to make this fast
    const deletePromises = childTables.map(table => 
      supabase.from(table).delete().eq('project_id', id)
    );
    
    await Promise.all(deletePromises);

    // 3. Finally, delete the Main Project
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// export const deleteProject = async (id, slug) => {
//   const { error } = await supabase.from('projects').delete().eq('id', id);
//   if (error) throw error;
//   return true;
// };

// --- SAVE PROJECT (The Heavy Lifter) ---

export const saveProject = async (formData, isNew = false, originalSlug = null) => {
  const {
    // Extracted relations/arrays that go into other tables
    category_ids,
    tool_ids,
    project_sections,
    project_stats,
    project_gallery,
    flip_cards,
    process_steps,
    challenges_solutions,
    banner_previews, // UI only, ignore
    slider_previews, // UI only, ignore
    hero_media, // UI only, ignore
    detail_hero_media, // UI only, ignore
    resolved_media, // UI only, ignore
    // Everything else goes to 'projects'
    ...projectData
  } = formData;

  // 1. Handle Slug
  let finalSlug = projectData.slug;
  if (!finalSlug || (isNew && !finalSlug)) {
    finalSlug = await getUniqueSlug(projectData.title, projectData.id);
  } else if (originalSlug && finalSlug !== originalSlug) {
    finalSlug = await getUniqueSlug(finalSlug, projectData.id);
  }

  // 2. Prepare Main Project Payload
  const mainPayload = {
    ...projectData,
    slug: finalSlug,
    // Ensure numeric fields are numbers
    completion_percentage: parseInt(projectData.completion_percentage) || 0,
    tier_id: parseInt(projectData.tier_id) || null,
    client_testimonial_id: parseInt(projectData.client_testimonial_id) || null,
    metadata_value: parseInt(projectData.metadata_value) || 0,
    // JSONB defaults
    accessibility_data: projectData.accessibility_data || [],
    quote_data: projectData.quote_data || {},
    call_to_action_data: projectData.call_to_action_data || {},
  };

  let projectId;

  if (isNew) {
    const { data, error } = await supabase.from('projects').insert(mainPayload).select('id').single();
    if (error) throw error;
    projectId = data.id;
  } else {
    const { data, error } = await supabase.from('projects').update(mainPayload).eq('id', projectData.id).select('id').single();
    if (error) throw error;
    projectId = data.id;
  }

  // 3. Handle Junction Tables (Categories & Tools)
  
  if (category_ids) {
    await supabase.from('project_category_links').delete().eq('project_id', projectId);
    if (category_ids.length > 0) {
      const inserts = category_ids.map(cid => ({ project_id: projectId, category_id: parseInt(cid) }));
      await supabase.from('project_category_links').insert(inserts);
    }
  }

  if (tool_ids) {
    await supabase.from('project_tool_links').delete().eq('project_id', projectId);
    if (tool_ids.length > 0) {
      const inserts = tool_ids.map(tid => ({ project_id: projectId, tool_id: parseInt(tid) }));
      await supabase.from('project_tool_links').insert(inserts);
    }
  }

  // 4. Handle Project Sections
  await supabase.from('project_sections').delete().eq('project_id', projectId);
  if (project_sections && project_sections.length > 0) {
    const sectionInserts = project_sections.map((sec, idx) => ({
      project_id: projectId,
      heading: sec.heading,
      body_text: sec.body_text,
      layout_type: sec.layout_type,
      bg_color: sec.bg_color,
      order: idx,
      media_asset_ids: sec.media_asset_ids || []
    }));
    await supabase.from('project_sections').insert(sectionInserts);
  }

  // 5. Handle Project Stats
  await supabase.from('project_stats').delete().eq('project_id', projectId);
  if (project_stats && project_stats.length > 0) {
    const statInserts = project_stats.map((stat, idx) => ({
      project_id: projectId,
      title: stat.title,
      value: stat.value,
      trend: stat.trend,
      icon_name: stat.icon_name,
      description: stat.description,
      order: idx
    }));
    await supabase.from('project_stats').insert(statInserts);
  }

  // 6. Handle Content Blocks
  await supabase.from('project_content_blocks').delete().eq('project_id', projectId);
  const blocksToInsert = [];
  
  if (flip_cards && flip_cards.length > 0) {
    blocksToInsert.push({ project_id: projectId, block_type: 'flip_cards', order: 0, content: flip_cards });
  }
  if (process_steps && process_steps.length > 0) {
    blocksToInsert.push({ project_id: projectId, block_type: 'process', order: 1, content: process_steps });
  }
  if (challenges_solutions && challenges_solutions.length > 0) {
    blocksToInsert.push({ project_id: projectId, block_type: 'challenges', order: 2, content: challenges_solutions });
  }

  if (blocksToInsert.length > 0) {
    await supabase.from('project_content_blocks').insert(blocksToInsert);
  }

  return { success: true, slug: finalSlug };
};