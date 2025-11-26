







// // import { supabase } from "../lib/supabaseClient";

// // /**
// //  * =================================================================================
// //  * Helper Functions
// //  * =================================================================================
// //  */

// // // Helper to generate a URL-safe slug from a title
// // const slugify = (text) => {
// //   return text
// //     .toString()
// //     .toLowerCase()
// //     .trim()
// //     .replace(/\s+/g, '-')     // Replace spaces with -
// //     .replace(/[^\w-]+/g, '')  // Remove all non-word chars
// //     .replace(/--+/g, '-')     // Replace multiple - with single -
// // };

// // // Helper to check for slug uniqueness and append a number if needed
// // const getUniqueSlug = async (title) => {
// //   let slug = slugify(title);
// //   let isUnique = false;
// //   let counter = 1;

// //   while (!isUnique) {
// //     const { data, error } = await supabase
// //       .from('projects')
// //       .select('slug')
// //       .eq('slug', slug)
// //       .single();

// //     if (error && error.code === 'PGRST116') {
// //       // PGRST116: "The result contains 0 rows" - means the slug is unique
// //       isUnique = true;
// //     } else {
// //       // Slug exists, append number and check again
// //       slug = `${slugify(title)}-${counter}`;
// //       counter++;
// //     }
// //   }
// //   return slug;
// // };

// // // Helper to get public URL from Supabase Storage
// // export const getStorageUrl = (filePath) => {
// //   if (!filePath) return null;
// //   const { data } = supabase.storage.from('media').getPublicUrl(filePath);
// //   return data.publicUrl;
// // };

// // /**
// //  * =================================================================================
// //  * Media (Storage) Functions
// //  * =================================================================================
// //  */

// // /**
// //  * Uploads a file to Supabase Storage.
// //  * @param {File} file - The file to upload.
// //  * @returns {Promise<{ file_path: string, media_asset_id: string }>} - The storage path and the new media_assets ID.
// //  */
// // export const uploadMedia = async (file) => {
// //   if (!file) throw new Error("No file provided");

// //   const fileExt = file.name.split('.').pop();
// //   const fileName = `${crypto.randomUUID()}.${fileExt}`;
// //   const filePath = `public/${fileName}`;

// //   // 1. Upload to Supabase Storage
// //   const { error: uploadError } = await supabase.storage
// //     .from('media')
// //     .upload(filePath, file);

// //   if (uploadError) {
// //     console.error('Storage upload error:', uploadError);
// //     throw uploadError;
// //   }

// //   // 2. Insert into media_assets table
// //   const { data: mediaAsset, error: insertError } = await supabase
// //     .from('media_assets')
// //     .insert({
// //       file_path: filePath,
// //       file_type: file.type,
// //       alt_text: file.name,
// //     })
// //     .select('id, file_path')
// //     .single();

// //   if (insertError) {
// //     console.error('Media assets insert error:', insertError);
// //     // Try to delete the orphaned file from storage
// //     await supabase.storage.from('media').remove([filePath]);
// //     throw insertError;
// //   }

// //   return {
// //     file_path: mediaAsset.file_path,
// //     media_asset_id: mediaAsset.id,
// //   };
// // };

// // /**
// //  * Deletes media from Supabase Storage and the media_assets table.
// //  * @param {string} media_asset_id - The ID of the media asset to delete.
// //  */
// // export const deleteMedia = async (media_asset_id) => {
// //   // 1. Get file_path from media_assets
// //   const { data: mediaAsset, error: getError } = await supabase
// //     .from('media_assets')
// //     .select('file_path')
// //     .eq('id', media_asset_id)
// //     .single();

// //   if (getError || !mediaAsset) {
// //     console.error('Error finding media asset:', getError);
// //     throw new Error('Media asset not found.');
// //   }

// //   const { file_path } = mediaAsset;

// //   // 2. Delete from media_assets table (must be first due to FKs)
// //   // Note: This will fail if the media is still linked to a project.
// //   // We must first set the project's media_id to NULL before calling this.
// //   const { error: dbError } = await supabase
// //     .from('media_assets')
// //     .delete()
// //     .eq('id', media_asset_id);

// //   if (dbError) {
// //     console.error('Error deleting media asset from table:', dbError);
// //     throw dbError;
// //   }

// //   // 3. Delete from Storage
// //   const { error: storageError } = await supabase.storage
// //     .from('media')
// //     .remove([file_path]);

// //   if (storageError) {
// //     console.error('Error deleting file from storage:', storageError);
// //     // The DB record is gone, but the file is orphaned. Log this.
// //   }

// //   return { success: true };
// // };


// // /**
// //  * =================================================================================
// //  * Admin Project List Page (AdminProjects.jsx)
// //  * =================================================================================
// //  */

// // /**
// //  * Fetches projects for the admin dashboard.
// //  * @param {string} searchQuery - Optional search term.
// //  */
// // export const getProjectAdminDashboard = async (searchQuery = '') => {
// //   let query = supabase
// //     .from('projects')
// //     .select(`
// //       id,
// //       slug,
// //       title,
// //       created_at,
// //       hero_media:media_assets!projects_hero_media_id_fkey ( file_path )
// //     `)
// //     .order('created_at', { ascending: false });

// //   if (searchQuery) {
// //     query = query.ilike('title', `%${searchQuery}%`);
// //   }

// //   const { data, error } = await query;

// //   if (error) {
// //     console.error("Error fetching projects for admin:", error);
// //     return [];
// //   }

// //   // Flatten the hero_media path
// //   return data.map(p => ({
// //     ...p,
// //     hero_media_path: p.hero_media?.file_path || null
// //   }));
// // };

// // /**
// //  * Deletes a project and all its associated data.
// //  * This is a complex transaction-like operation.
// //  * @param {string} projectId - The UUID of the project to delete.
// //  */
// // export const deleteProject = async (projectId) => {
// //   try {
// //     // We must delete in the correct order to avoid foreign key violations.
// //     // 1. Delete links from join tables
// //     await supabase.from('project_category_links').delete().eq('project_id', projectId);
// //     await supabase.from('project_tool_links').delete().eq('project_id', projectId);

// //     // 2. Delete content blocks
// //     await supabase.from('project_content_blocks').delete().eq('project_id', projectId);
    
// //     // 3. Delete gallery items
// //     // We also need to delete the media from storage, but media_assets
// //     // might be shared. For now, just delete the link.
// //     // A more advanced system would check for media orphans.
// //     await supabase.from('project_gallery').delete().eq('project_id', projectId);

// //     // 4. Finally, delete the main project row
// //     const { error: projectDeleteError } = await supabase
// //       .from('projects')
// //       .delete()
// //       .eq('id', projectId);

// //     if (projectDeleteError) {
// //       console.error("Error deleting main project row:", projectDeleteError);
// //       throw projectDeleteError;
// //     }

// //     return { success: true };

// //   } catch (error) {
// //     console.error("Full delete operation failed:", error);
// //     return { success: false, error: error.message };
// //   }
// // };


// // /**
// //  * =================================================================================
// //  * Admin Project Editor Page (AdminProjectEditor.jsx)
// //  * =================================================================================
// //  */

// // /**
// //  * Fetches all data needed for the project editor.
// //  * @param {string} slug - The slug of the project to edit, or 'new'.
// //  */
// // export const getEditorData = async (slug) => {
// //   // 1. Get all available categories for dropdowns
// //   const { data: allCategories, error: catError } = await supabase
// //     .from('project_categories')
// //     .select('id, name');

// //   // 2. Get all available tools for dropdowns
// //   const { data: allTools, error: toolError } = await supabase
// //     .from('tools')
// //     .select('id, name');

// //   if (catError || toolError) {
// //     throw new Error("Failed to load categories or tools.");
// //   }

// //   // 3. If it's a new project, return early with just the dropdown data
// //   if (slug === 'new') {
// //     return {
// //       project: null,
// //       allCategories,
// //       allTools,
// //     };
// //   }

// //   // 4. If editing, fetch the specific project and all its relations
// //   const { data: project, error: projectError } = await supabase
// //     .from('projects')
// //     .select(`
// //       *,
// //       hero_media:media_assets!projects_hero_media_id_fkey ( id, file_path ),
// //       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( id, file_path ),
// //       categories:project_categories ( id, name ),
// //       tools:tools ( id, name ),
// //       content:project_content_blocks ( * ),
// //       gallery:project_gallery (
// //         id,
// //         order,
// //         media:media_assets ( id, file_path )
// //       )
// //     `)
// //     .eq('slug', slug)
// //     .order('order', { referencedTable: 'project_content_blocks', ascending: true })
// //     .order('order', { referencedTable: 'project_gallery', ascending: true })
// //     .single();
    
// //   if (projectError) {
// //     if (projectError.code === 'PGRST116') throw new Error('Project not found');
// //     console.error("Error fetching project for editor:", projectError);
// //     throw projectError;
// //   }

// //   // 5. Clean and return all data
// //   return {
// //     project: {
// //       ...project,
// //       // Flatten media objects for react-hook-form
// //       hero_media_id: project.hero_media?.id || null,
// //       hero_media_path: project.hero_media?.file_path || null,
// //       detail_hero_media_id: project.detail_hero_media?.id || null,
// //       detail_hero_media_path: project.detail_hero_media?.file_path || null,
// //     },
// //     allCategories,
// //     allTools,
// //   };
// // };

// // /**
// //  * Saves (Creates or Updates) a project.
// //  * @param {object} formData - The complete form data from react-hook-form.
// //  * @param {string | null} existingProjectId - The ID of the project if updating, or null if creating.
// //  */
// // export const saveProject = async (formData, existingProjectId) => {
// //   const isCreating = !existingProjectId;
  
// //   // 1. Prepare main project data (from `projects` table)
// //   // We must separate the main data from the relational data.
// //   const {
// //     categories,
// //     tools,
// //     content,
// //     gallery,
// //     slug,
// //     hero_media_path,
// //     detail_hero_media_path,
// //     ...mainProjectData
// //   } = formData;

// //   let projectId = existingProjectId;
// //   let projectSlug = slug;

// //   try {
// //     // --- Step 2: Create or Update the main 'projects' row ---
// //     if (isCreating) {
// //       // Generate a unique slug for a new project
// //       projectSlug = await getUniqueSlug(mainProjectData.title);
      
// //       const { data: newProject, error } = await supabase
// //         .from('projects')
// //         .insert({
// //           ...mainProjectData,
// //           slug: projectSlug, // Use the unique slug
// //         })
// //         .select('id')
// //         .single();
        
// //     //   if (_) {
// //     //       console.error('Error inserting project', _);
// //     //       throw _;
// //     //   }
// //       projectId = newProject.id;

// //     } else {
// //       // Update existing project
// //       const { error } = await supabase
// //         .from('projects')
// //         .update({
// //           ...mainProjectData,
// //           slug: projectSlug, // Allow slug update
// //         })
// //         .eq('id', projectId);
        
// //     //   if (_) {
// //     //       console.error('Error updating project', _);
// //     //       throw _;
// //     //   }
// //     }

// //     // --- Step 3: Update Join Tables (Categories & Tools) ---
// //     // Easiest way is to delete all and re-insert.
    
// //     // Categories
// //     await supabase.from('project_category_links').delete().eq('project_id', projectId);
// //     if (categories && categories.length > 0) {
// //       const categoryLinks = categories.map(cat => ({
// //         project_id: projectId,
// //         category_id: cat.id,
// //       }));
// //       await supabase.from('project_category_links').insert(categoryLinks);
// //     }
    
// //     // Tools
// //     await supabase.from('project_tool_links').delete().eq('project_id', projectId);
// //     if (tools && tools.length > 0) {
// //       const toolLinks = tools.map(tool => ({
// //         project_id: projectId,
// //         tool_id: tool.id,
// //       }));
// //       await supabase.from('project_tool_links').insert(toolLinks);
// //     }

// //     // --- Step 4: Update Content Blocks ---
// //     // Delete all and re-insert to handle order, deletion, and creation.
// //     await supabase.from('project_content_blocks').delete().eq('project_id', projectId);
// //     if (content && content.length > 0) {
// //       const contentBlocks = content.map((block, index) => ({
// //         project_id: projectId,
// //         type: block.type,
// //         order: index,
// //         content: block.content, // The `content` field is already a JSONB object
// //       }));
// //       await supabase.from('project_content_blocks').insert(contentBlocks);
// //     }
    
// //     // --- Step 5: Update Gallery ---
// //     // Delete all and re-insert.
// //     await supabase.from('project_gallery').delete().eq('project_id', projectId);
// //     if (gallery && gallery.length > 0) {
// //       const galleryItems = gallery.map((item, index) => ({
// //         project_id: projectId,
// //         media_id: item.media.id, // We store the media object in the form
// //         order: index,
// //       }));
// //       await supabase.from('project_gallery').insert(galleryItems);
// //     }

// //     return { success: true, projectSlug: projectSlug };

// //   } catch (error) {
// //     console.error("Full save operation failed:", error);
// //     return { success: false, error: error.message };
// //   }
// // };

// import { supabase } from "../lib/supabaseClient";

// // --- Helpers ---

// // Generate URL-safe slug
// const slugify = (text) => {
//   if (!text) return '';
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, '-')
//     .replace(/[^\w-]+/g, '')
//     .replace(/--+/g, '-');
// };

// const getUniqueSlug = async (title, currentId = null) => {
//   let slug = slugify(title);
//   let isUnique = false;
//   let counter = 1;

//   while (!isUnique) {
//     let query = supabase.from('projects').select('id').eq('slug', slug);
    
//     // If editing, exclude current project from check
//     if (currentId) {
//       query = query.neq('id', currentId);
//     }

//     const { data } = await query;
    
//     if (!data || data.length === 0) {
//       isUnique = true;
//     } else {
//       slug = `${slugify(title)}-${counter}`;
//       counter++;
//     }
//   }
//   return slug;
// };

// // Helper to get public URL
// export const getStorageUrl = (filePath) => {
//   if (!filePath) return null;
//   // If it's already a full URL (legacy), return it
//   if (filePath.startsWith('http')) return filePath;
//   const { data } = supabase.storage.from('media').getPublicUrl(filePath);
//   return data.publicUrl;
// };

// // --- Fetching Reference Data ---

// export const getReferenceData = async () => {
//   const [categories, tools, tiers, testimonials] = await Promise.all([
//     supabase.from('project_categories').select('id, name').order('name'),
//     supabase.from('tools').select('id, name, icon_name').order('name'),
//     supabase.from('project_tiers').select('id, name').order('order'),
//     supabase.from('testimonials').select('id, name, quote').order('id')
//   ]);

//   return {
//     categories: categories.data || [],
//     tools: tools.data || [],
//     tiers: tiers.data || [],
//     testimonials: testimonials.data || []
//   };
// };

// // --- Dashboard List ---

// export const getProjectAdminDashboard = async (search = '') => {
//   let query = supabase
//     .from('projects')
//     .select(`
//       id, title, slug, status, completion_percentage,
//       hero_media:media_assets!projects_hero_media_id_fkey(file_path),
//       project_tiers(name, color_hex)
//     `)
//     .order('created_at', { ascending: false });

//   if (search) {
//     query = query.ilike('title', `%${search}%`);
//   }

//   const { data, error } = await query;
//   if (error) throw error;
//   return data;
// };

// // --- Editor: Fetch Single Project ---

// export const getEditorData = async (slug) => {
//   // 1. Fetch Main Project Data with direct relations
//   const { data: project, error } = await supabase
//     .from('projects')
//     .select(`
//       *,
//       hero_media:media_assets!projects_hero_media_id_fkey(id, file_path, alt_text),
//       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey(id, file_path, alt_text)
//     `)
//     .eq('slug', slug)
//     .single();

//   if (error) throw error;

//   // 2. Fetch Linked Junction Data
//   const { data: catLinks } = await supabase.from('project_category_links').select('category_id').eq('project_id', project.id);
//   const { data: toolLinks } = await supabase.from('project_tool_links').select('tool_id').eq('project_id', project.id);
  
//   // 3. Fetch Related Tables (1-to-many)
//   const { data: sections } = await supabase.from('project_sections').select('*').eq('project_id', project.id).order('order');
//   const { data: stats } = await supabase.from('project_stats').select('*').eq('project_id', project.id).order('order');
//   const { data: gallery } = await supabase.from('project_gallery').select('*, media_assets(*)').eq('project_id', project.id).order('order');
//   const { data: contentBlocks } = await supabase.from('project_content_blocks').select('*').eq('project_id', project.id).order('order');

//   // 4. Resolve Array Media IDs for UI Preview
//   // Helper to fetch media details for an array of UUIDs
//   const fetchMediaDetails = async (ids) => {
//     if (!ids || ids.length === 0) return [];
//     const { data } = await supabase.from('media_assets').select('id, file_path').in('id', ids);
//     return ids.map(id => data.find(m => m.id === id)).filter(Boolean); // Map to preserve order if possible, or just return data
//   };

//   const bannerImages = await fetchMediaDetails(project.banner_media_ids);
//   const sliderImages = await fetchMediaDetails(project.slider_media_ids);

//   // Format Sections media
//   const formattedSections = await Promise.all(sections.map(async (sec) => ({
//     ...sec,
//     resolved_media: await fetchMediaDetails(sec.media_asset_ids || [])
//   })));

//   return {
//     ...project,
//     category_ids: catLinks.map(c => c.category_id.toString()),
//     tool_ids: toolLinks.map(t => t.tool_id.toString()),
//     project_sections: formattedSections,
//     project_stats: stats,
//     project_gallery: gallery,
//     // Parse content blocks for specific UI sections
//     flip_cards: contentBlocks.find(b => b.block_type === 'flip_cards')?.content || [],
//     process_steps: contentBlocks.find(b => b.block_type === 'process')?.content || [],
//     challenges_solutions: contentBlocks.find(b => b.block_type === 'challenges')?.content || [],
//     // Media Previews
//     banner_previews: bannerImages,
//     slider_previews: sliderImages
//   };
// };

// // --- Core Actions: Upload & Delete Media ---

// export const uploadMedia = async (file) => {
//   const fileExt = file.name.split('.').pop();
//   const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
//   const filePath = `projects/${fileName}`;

//   // 1. Upload to Storage
//   const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
//   if (uploadError) throw uploadError;

//   // 2. Insert into media_assets table
//   const { data: asset, error: dbError } = await supabase
//     .from('media_assets')
//     .insert({
//       file_path: filePath,
//       file_type: file.type,
//       alt_text: file.name.split('.')[0], // Default alt text
//     })
//     .select()
//     .single();

//   if (dbError) throw dbError;

//   return asset; // Returns { id, file_path, ... }
// };

// export const deleteProject = async (id, slug) => {
//   // Database constraints (ON DELETE CASCADE) should handle relations, 
//   // but explicitly deleting simplifies debugging if constraints aren't perfect.
//   const { error } = await supabase.from('projects').delete().eq('id', id);
//   if (error) throw error;
//   return true;
// };

// // --- SAVE PROJECT (The Heavy Lifter) ---

// export const saveProject = async (formData, isNew = false, originalSlug = null) => {
//   const {
//     // Extracted relations/arrays that go into other tables
//     category_ids,
//     tool_ids,
//     project_sections,
//     project_stats,
//     project_gallery,
//     flip_cards,
//     process_steps,
//     challenges_solutions,
//     banner_previews, // UI only, ignore
//     slider_previews, // UI only, ignore
//     hero_media, // UI only, ignore
//     detail_hero_media, // UI only, ignore
//     // Everything else goes to 'projects'
//     ...projectData
//   } = formData;

//   // 1. Handle Slug
//   let finalSlug = projectData.slug;
//   if (!finalSlug || (isNew && !finalSlug)) {
//     finalSlug = await getUniqueSlug(projectData.title, projectData.id);
//   } else if (originalSlug && finalSlug !== originalSlug) {
//     finalSlug = await getUniqueSlug(finalSlug, projectData.id);
//   }

//   // 2. Prepare Main Project Payload
//   const mainPayload = {
//     ...projectData,
//     slug: finalSlug,
//     // Ensure numeric fields are numbers
//     completion_percentage: parseInt(projectData.completion_percentage) || 0,
//     tier_id: parseInt(projectData.tier_id) || null,
//     client_testimonial_id: parseInt(projectData.client_testimonial_id) || null,
//     metadata_value: parseInt(projectData.metadata_value) || 0,
//     // JSONB defaults
//     accessibility_data: projectData.accessibility_data || [],
//     quote_data: projectData.quote_data || {},
//     call_to_action_data: projectData.call_to_action_data || {},
//   };

//   let projectId;

//   if (isNew) {
//     const { data, error } = await supabase.from('projects').insert(mainPayload).select('id').single();
//     if (error) throw error;
//     projectId = data.id;
//   } else {
//     const { data, error } = await supabase.from('projects').update(mainPayload).eq('id', projectData.id).select('id').single();
//     if (error) throw error;
//     projectId = data.id;
//   }

//   // 3. Handle Junction Tables (Categories & Tools)
//   // Strategy: Delete all for this project, then re-insert selected.
  
//   if (category_ids) {
//     await supabase.from('project_category_links').delete().eq('project_id', projectId);
//     if (category_ids.length > 0) {
//       const inserts = category_ids.map(cid => ({ project_id: projectId, category_id: parseInt(cid) }));
//       await supabase.from('project_category_links').insert(inserts);
//     }
//   }

//   if (tool_ids) {
//     await supabase.from('project_tool_links').delete().eq('project_id', projectId);
//     if (tool_ids.length > 0) {
//       const inserts = tool_ids.map(tid => ({ project_id: projectId, tool_id: parseInt(tid) }));
//       await supabase.from('project_tool_links').insert(inserts);
//     }
//   }

//   // 4. Handle Project Sections
//   // Strategy: Delete all, re-insert (easiest for maintaining Order).
//   await supabase.from('project_sections').delete().eq('project_id', projectId);
//   if (project_sections && project_sections.length > 0) {
//     const sectionInserts = project_sections.map((sec, idx) => ({
//       project_id: projectId,
//       heading: sec.heading,
//       body_text: sec.body_text,
//       layout_type: sec.layout_type,
//       bg_color: sec.bg_color,
//       order: idx,
//       media_asset_ids: sec.media_asset_ids || [] // Ensure it's an array of UUIDs
//     }));
//     await supabase.from('project_sections').insert(sectionInserts);
//   }

//   // 5. Handle Project Stats
//   await supabase.from('project_stats').delete().eq('project_id', projectId);
//   if (project_stats && project_stats.length > 0) {
//     const statInserts = project_stats.map((stat, idx) => ({
//       project_id: projectId,
//       title: stat.title,
//       value: stat.value,
//       trend: stat.trend,
//       icon_name: stat.icon_name,
//       description: stat.description,
//       order: idx
//     }));
//     await supabase.from('project_stats').insert(statInserts);
//   }

//   // 6. Handle Content Blocks (Flip Cards, Process, Challenges)
//   // We construct the project_content_blocks rows based on the specific editor fields
//   await supabase.from('project_content_blocks').delete().eq('project_id', projectId);
//   const blocksToInsert = [];
  
//   if (flip_cards && flip_cards.length > 0) {
//     blocksToInsert.push({ project_id: projectId, block_type: 'flip_cards', order: 0, content: flip_cards });
//   }
//   if (process_steps && process_steps.length > 0) {
//     blocksToInsert.push({ project_id: projectId, block_type: 'process', order: 1, content: process_steps });
//   }
//   if (challenges_solutions && challenges_solutions.length > 0) {
//     blocksToInsert.push({ project_id: projectId, block_type: 'challenges', order: 2, content: challenges_solutions });
//   }

//   if (blocksToInsert.length > 0) {
//     await supabase.from('project_content_blocks').insert(blocksToInsert);
//   }

//   // 7. Handle Gallery (Optional, if you have a separate gallery UI)
//   if (project_gallery && project_gallery.length > 0) {
//     // Note: This assumes project_gallery comes in with media_ids
//     // If the UI is complex, you might skip this for now or implement similar to sections
//   }

//   return { success: true, slug: finalSlug };
// };
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
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
  return true;
};

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