// // // // import { supabase } from '../lib/supabaseClient';
// // // // import { onTableChange } from './homepage'; // Reusing our subscription helper

// // // // /**
// // // //  * =================================================================
// // // //  * Storage/Media Helpers (Corrected)
// // // //  * =================================================================
// // // //  */

// // // // export const getStorageUrl = (mediaAsset) => {
// // // //   if (!mediaAsset?.file_path) return null;
// // // //   if (mediaAsset.file_path.startsWith('http')) {
// // // //     return mediaAsset.file_path;
// // // //   }
// // // //   const { data } = supabase.storage
// // // //     .from('media') // Use the 'media' bucket
// // // //     .getPublicUrl('public/' + mediaAsset.file_path);

// // // //   if (!data || !data.publicUrl) {
// // // //     console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
// // // //     return null;
// // // //   }
// // // //   return data.publicUrl;
// // // // };

// // // // async function uploadMediaAsset(file, userId) {
// // // //   const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
// // // //   const fileName = `${Date.now()}-${cleanFileName}`;
// // // //   const filePath = `${fileName}`; // Store ONLY the filename

// // // //   const { error: uploadError } = await supabase.storage
// // // //     .from('media')
// // // //     .upload('public/' + filePath, file); // Upload TO the 'public/' folder
    
// // // //   if (uploadError) throw uploadError;

// // // //   const { data, error: insertError } = await supabase
// // // //     .from('media_assets')
// // // //     .insert({
// // // //       file_path: filePath, // Stores just 'filename.png'
// // // //       file_type: file.type,
// // // //       alt_text: file.name,
// // // //       uploaded_by: userId,
// // // //     })
// // // //     .select('id, file_path, alt_text') // Return full object
// // // //     .single();
    
// // // //   if (insertError) throw insertError;
// // // //   return data;
// // // // }

// // // // async function deleteMediaAssets(mediaIds) {
// // // //   if (!mediaIds || mediaIds.length === 0) return;
  
// // // //   const { data: assets, error: selectError } = await supabase
// // // //     .from('media_assets')
// // // //     .select('id, file_path')
// // // //     .in('id', mediaIds);
    
// // // //   if (selectError) {
// // // //     console.error('Error selecting media assets for deletion:', selectError);
// // // //     return;
// // // //   }

// // // //   // Get filepaths, which are just filenames
// // // //   const filePaths = assets.map(a => 'public/' + a.file_path).filter(Boolean);

// // // //   if (filePaths.length > 0) {
// // // //     const { error: storageError } = await supabase.storage
// // // //       .from('media') // Use the 'media' bucket
// // // //       .remove(filePaths); // Pass full paths: ['public/file1.png', 'public/file2.png']
// // // //     if (storageError) {
// // // //       console.error('Error deleting from storage:', storageError);
// // // //     }
// // // //   }
  
// // // //   // Finally, delete the database records
// // // //   const { error: dbError } = await supabase
// // // //     .from('media_assets')
// // // //     .delete()
// // // //     .in('id', mediaIds);
    
// // // //   if (dbError) {
// // // //     console.error('Error deleting from media_assets table:', dbError);
// // // //   }
// // // // }

// // // // /**
// // // //  * =================================================================
// // // //  * Read Functions
// // // //  * =================================================================
// // // //  */

// // // // /**
// // // //  * Fetches all projects for the main admin list. (Lightweight)
// // // //  */
// // // // export async function getProjectAdminDashboard(searchQuery = '') {
// // // //   let query = supabase
// // // //     .from('projects')
// // // //     .select(`
// // // //       id,
// // // //       title,
// // // //       slug,
// // // //       created_at,
// // // //       media_assets ( file_path, alt_text )
// // // //     `)
// // // //     .order('created_at', { ascending: false });

// // // //   if (searchQuery) {
// // // //     query = query.ilike('title', `%${searchQuery}%`);
// // // //   }

// // // //   const { data, error } = await query;
// // // //   if (error) {
// // // //     console.error('Error fetching admin projects:', error);
// // // //     return [];
// // // //   }
// // // //   return data;
// // // // }

// // // // /**
// // // //  * Fetches all data needed for the project editor page.
// // // //  * This includes the project itself AND the lookup tables (tools, categories).
// // // //  */
// // // // export async function getEditorData(slug) {
// // // //   try {
// // // //     const [projectData, allTools, allCategories] = await Promise.all([
// // // //       getProjectForEditor(slug),
// // // //       supabase.from('tools').select('*').order('name'),
// // // //       supabase.from('project_categories').select('*').order('name')
// // // //     ]);

// // // //     return {
// // // //       project: projectData.data,
// // // //       allTools: allTools.data,
// // // //       allCategories: allCategories.data,
// // // //       error: projectData.error || allTools.error || allCategories.error
// // // //     };
// // // //   } catch (error) {
// // // //     console.error('Error loading editor data:', error);
// // // //     return { error };
// // // //   }
// // // // }

// // // // /**
// // // //  * Fetches a single project and all its related data for the editor.
// // // //  */
// // // // export async function getProjectForEditor(slug) {
// // // //   if (!slug || slug === 'new') {
// // // //     // Return a default structure for a new project
// // // //     return { 
// // // //       data: {
// // // //         title: '',
// // // //         slug: '',
// // // //         description: '',
// // // //         hero_media_id: null,
// // // //         detail_hero_media_id: null,
// // // //         video_url: '',
// // // //         client: '',
// // // //         role: '',
// // // //         timeline: '',
// // // //         tools: [],
// // // //         categories: [],
// // // //         content: [],
// // // //         gallery: []
// // // //       } 
// // // //     };
// // // //   }
  
// // // //   const { data, error } = await supabase
// // // //     .from('projects')
// // // //     .select(`
// // // //       *,
// // // //       hero_media:media_assets!projects_hero_media_id_fkey ( * ),
// // // //       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( * ),
// // // //       tools:project_tool_links ( tools ( * ) ),
// // // //       categories:project_category_links ( project_categories ( * ) ),
// // // //       content:project_content_blocks ( *, media:media_assets(*) ),
// // // //       gallery:project_gallery ( *, media:media_assets(*) )
// // // //     `)
// // // //     .eq('slug', slug)
// // // //     .order('order', { referencedTable: 'project_content_blocks', ascending: true })
// // // //     .order('order', { referencedTable: 'project_gallery', ascending: true })
// // // //     .single();

// // // //   if (error) {
// // // //     console.error('Error fetching project for editor:', error);
// // // //     return { error };
// // // //   }

// // // //   // Clean up the nested data to be form-friendly
// // // //   const cleanedData = {
// // // //     ...data,
// // // //     tools: data.tools.map(t => t.tools),
// // // //     categories: data.categories.map(c => c.project_categories),
// // // //     // Ensure 'content' and 'gallery' media objects are nested correctly
// // // //     content: data.content.map(c => ({...c, media_assets: c.media, media: undefined})),
// // // //     gallery: data.gallery.map(g => ({...g, media_assets: g.media, media: undefined})),
// // // //   };

// // // //   return { data: cleanedData };
// // // // }

// // // // /**
// // // //  * =================================================================
// // // //  * Write Functions (Create / Update / Delete)
// // // //  * =================================================================
// // // //  */

// // // // /**
// // // //  * Deletes a project and ALL its related data and assets.
// // // //  */
// // // // export async function deleteProject(projectId) {
// // // //   try {
// // // //     // 1. Get all media IDs associated with this project
// // // //     const { data: project } = await getProjectForEditor(projectId); // Use slug or id
// // // //     if (!project) throw new Error('Project not found');

// // // //     const mediaIdsToDelete = [
// // // //       project.hero_media_id,
// // // //       project.detail_hero_media_id
// // // //     ].filter(Boolean);
    
// // // //     project.content.forEach(block => {
// // // //       if (block.type === 'image' && block.content?.media_id) {
// // // //         mediaIdsToDelete.push(block.content.media_id);
// // // //       }
// // // //     });
// // // //     project.gallery.forEach(item => {
// // // //       if (item.media_id) mediaIdsToDelete.push(item.media_id);
// // // //     });

// // // //     // 2. Delete all junction/child table rows
// // // //     // These can run in parallel
// // // //     await Promise.all([
// // // //       supabase.from('project_tool_links').delete().eq('project_id', projectId),
// // // //       supabase.from('project_category_links').delete().eq('project_id', projectId),
// // // //       supabase.from('project_content_blocks').delete().eq('project_id', projectId),
// // // //       supabase.from('project_gallery').delete().eq('project_id', projectId),
// // // //     ]);
    
// // // //     // 3. Delete the main project row
// // // //     await supabase.from('projects').delete().eq('id', projectId);

// // // //     // 4. Clean up all media assets
// // // //     await deleteMediaAssets(mediaIdsToDelete);

// // // //     return { success: true };

// // // //   } catch (error) {
// // // //     console.error('Error deleting project:', error);
// // // //     return { success: false, error };
// // // //   }
// // // // }

// // // // /**
// // // //  * Saves a project. This is a complex "transaction" that:
// // // //  * 1. Uploads/Replaces main images.
// // // //  * 2. Upserts the main `projects` row.
// // // //  * 3. Syncs all related tables (tools, categories, content, gallery).
// // // //  * 4. Cleans up orphaned media assets.
// // // //  */
// // // // export async function saveProject(projectData, userId) {
// // // //   let mediaIdsToDelete = [];
  
// // // //   try {
// // // //     // --- 1. Separate main data from relations ---
// // // //     const {
// // // //       tools,
// // // //       categories,
// // // //       content,
// // // //       gallery,
// // // //       file_hero, // new file from react-hook-form
// // // //       original_hero_media_id, // stored on file change
// // // //       file_detail_hero,
// // // //       original_detail_hero_media_id,
// // // //       ...mainData
// // // //     } = projectData;

// // // //     // --- 2. Process Main Image Uploads ---
// // // //     if (file_hero) {
// // // //       const newMedia = await uploadMediaAsset(file_hero, userId);
// // // //       mainData.hero_media_id = newMedia.id;
// // // //       if (original_hero_media_id) mediaIdsToDelete.push(original_hero_media_id);
// // // //     }
// // // //     if (file_detail_hero) {
// // // //       const newMedia = await uploadMediaAsset(file_detail_hero, userId);
// // // //       mainData.detail_hero_media_id = newMedia.id;
// // // //       if (original_detail_hero_media_id) mediaIdsToDelete.push(original_detail_hero_media_id);
// // // //     }
    
// // // //     // --- 3. Upsert main `projects` row ---
// // // //     // Clean up joined data before save
// // // //     delete mainData.hero_media;
// // // //     delete mainData.detail_hero_media;
    
// // // //     const { data: savedProject, error: projectError } = await supabase
// // // //       .from('projects')
// // // //       .upsert(mainData)
// // // //       .select('id')
// // // //       .single();
      
// // // //     if (projectError) throw projectError;
// // // //     const projectId = savedProject.id;
    
// // // //     // --- 4. Sync all related tables in parallel ---
// // // //     const [contentDeleteIds, galleryDeleteIds] = await Promise.all([
// // // //       syncTools(projectId, tools || []),
// // // //       syncCategories(projectId, categories || []),
// // // //       syncContentBlocks(projectId, content || [], userId),
// // // //       syncGallery(projectId, gallery || [], userId),
// // // //     ]);
    
// // // //     // --- 5. Consolidate and delete all orphaned media ---
// // // //     mediaIdsToDelete.push(...(contentDeleteIds || []));
// // // //     mediaIdsToDelete.push(...(galleryDeleteIds || []));
    
// // // //     if (mediaIdsToDelete.length > 0) {
// // // //       // Remove duplicates
// // // //       await deleteMediaAssets([...new Set(mediaIdsToDelete)]);
// // // //     }

// // // //     return { success: true, data: savedProject };
    
// // // //   } catch (error) {
// // // //     console.error('Error saving project:', error);
// // // //     return { success: false, error };
// // // //   }
// // // // }

// // // // /**
// // // //  * =================================================================
// // // //  * Sync Helpers for `saveProject`
// // // //  * =================================================================
// // // //  */

// // // // // --- Syncs many-to-many `project_tool_links` ---
// // // // async function syncTools(projectId, tools) {
// // // //   // 1. Delete all existing links for this project
// // // //   await supabase.from('project_tool_links').delete().eq('project_id', projectId);
  
// // // //   // 2. Insert new links
// // // //   if (tools.length > 0) {
// // // //     const links = tools.map(tool => ({
// // // //       project_id: projectId,
// // // //       tool_id: tool.id
// // // //     }));
// // // //     const { error } = await supabase.from('project_tool_links').insert(links);
// // // //     if (error) throw error;
// // // //   }
// // // // }

// // // // // --- Syncs many-to-many `project_category_links` ---
// // // // async function syncCategories(projectId, categories) {
// // // //   // 1. Delete all existing links
// // // //   await supabase.from('project_category_links').delete().eq('project_id', projectId);
  
// // // //   // 2. Insert new links
// // // //   if (categories.length > 0) {
// // // //     const links = categories.map(cat => ({
// // // //       project_id: projectId,
// // // //       category_id: cat.id
// // // //     }));
// // // //     const { error } = await supabase.from('project_category_links').insert(links);
// // // //     if (error) throw error;
// // // //   }
// // // // }

// // // // // --- Syncs one-to-many `project_content_blocks` ---
// // // // async function syncContentBlocks(projectId, blocks, userId) {
// // // //   let mediaIdsToDelete = [];
// // // //   let processedBlocks = [];

// // // //   // 1. Upload new files and prepare data
// // // //   for (const [index, block] of blocks.entries()) {
// // // //     let blockContent = block.content;
    
// // // //     // Check for new file upload within a block
// // // //     if (block.type === 'image' && block.file) {
// // // //       const newMedia = await uploadMediaAsset(block.file, userId);
// // // //       blockContent = { ...blockContent, media_id: newMedia.id, media_assets: newMedia };
// // // //       if (block.originalMediaId) {
// // // //         mediaIdsToDelete.push(block.originalMediaId);
// // // //       }
// // // //     }
    
// // // //     processedBlocks.push({
// // // //       id: block.id || undefined, // undefined for new blocks
// // // //       project_id: projectId,
// // // //       type: block.type,
// // // //       order: index,
// // // //       content: blockContent, // This is the JSONB field
// // // //     });
// // // //   }
  
// // // //   // 2. Upsert all blocks
// // // //   const { data: savedBlocks, error } = await supabase
// // // //     .from('project_content_blocks')
// // // //     .upsert(processedBlocks)
// // // //     .select('id');
    
// // // //   if (error) throw error;

// // // //   // 3. Delete orphaned blocks
// // // //   const savedIds = savedBlocks.map(b => b.id);
// // // //   const deleteQuery = supabase
// // // //     .from('project_content_blocks')
// // // //     .delete()
// // // //     .eq('project_id', projectId);
    
// // // //   if (savedIds.length > 0) {
// // // //     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
// // // //   }
  
// // // //   await deleteQuery;
  
// // // //   return mediaIdsToDelete;
// // // // }

// // // // // --- Syncs one-to-many `project_gallery` ---
// // // // async function syncGallery(projectId, gallery, userId) {
// // // //   let mediaIdsToDelete = [];
// // // //   let processedItems = [];

// // // //   // 1. Upload new files and prepare data
// // // //   for (const [index, item] of gallery.entries()) {
// // // //     let media_id = item.media_id;
    
// // // //     if (item.file) {
// // // //       const newMedia = await uploadMediaAsset(item.file, userId);
// // // //       media_id = newMedia.id;
// // // //       if (item.originalMediaId) {
// // // //         mediaIdsToDelete.push(item.originalMediaId);
// // // //       }
// // // //     }
    
// // // //     processedItems.push({
// // // //       id: item.id || undefined,
// // // //       project_id: projectId,
// // // //       media_id: media_id,
// // // //       order: index,
// // // //     });
// // // //   }

// // // //   // 2. Upsert all gallery items
// // // //   const { data: savedItems, error } = await supabase
// // // //     .from('project_gallery')
// // // //     .upsert(processedItems)
// // // //     .select('id');
    
// // // //   if (error) throw error;

// // // //   // 3. Delete orphaned items
// // // //   const savedIds = savedItems.map(i => i.id);
// // // //   const deleteQuery = supabase
// // // //     .from('project_gallery')
// // // //     .delete()
// // // //     .eq('project_id', projectId);
    
// // // //   if (savedIds.length > 0) {
// // // //     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
// // // //   }
  
// // // //   await deleteQuery;
  
// // // //   return mediaIdsToDelete;
// // // // }






// // // import { supabase } from '../lib/supabaseClient';
// // // import { onTableChange } from './homepage'; // Reusing our subscription helper

// // // /**
// // //  * =================================================================
// // //  * Storage/Media Helpers (Corrected)
// // //  * =================================================================
// // //  */

// // // /**
// // //  * Gets the public URL for a media asset.
// // //  * @param {object} mediaAsset - The media_assets object (must have file_path)
// // //  * @returns {string|null} - The public URL or null.
// // //  */
// // // export const getStorageUrl = (mediaAsset) => {
// // //   if (!mediaAsset?.file_path) return null;
// // //   // Handle if it's already a full URL (like a placeholder)
// // //   if (mediaAsset.file_path.startsWith('http')) {
// // //     return mediaAsset.file_path;
// // //   }
// // //   // Build the URL, adding the 'public/' prefix to the filename
// // //   const { data } = supabase.storage
// // //     .from('media') // Use the 'media' bucket
// // //     .getPublicUrl('public/' + mediaAsset.file_path);

// // //   if (!data || !data.publicUrl) {
// // //     console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
// // //     return null;
// // //   }
// // //   return data.publicUrl;
// // // };

// // // /**
// // //  * Uploads a file, creates a media_assets record, and returns the new object.
// // //  * @param {File} file - The file to upload.
// // //  * @param {string} userId - The ID of the authenticated user.
// // //  * @returns {object} - The new media_assets object.
// // //  */
// // // async function uploadMediaAsset(file, userId) {
// // //   const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
// // //   const fileName = `${Date.now()}-${cleanFileName}`;
// // //   const filePath = `${fileName}`; // Store ONLY the filename in the DB

// // //   // Upload TO the 'public/' folder
// // //   const { error: uploadError } = await supabase.storage
// // //     .from('media')
// // //     .upload('public/' + filePath, file); 
    
// // //   if (uploadError) throw uploadError;

// // //   // Create the database record, storing only the filename
// // //   const { data, error: insertError } = await supabase
// // //     .from('media_assets')
// // //     .insert({
// // //       file_path: filePath, // Stores just 'filename.png'
// // //       file_type: file.type,
// // //       alt_text: file.name,
// // //       uploaded_by: userId,
// // //     })
// // //     .select('id, file_path, alt_text') // Return the full new object
// // //     .single();
    
// // //   if (insertError) throw insertError;
// // //   return data; // Returns { id, file_path, alt_text }
// // // }

// // // /**
// // //  * Deletes media assets from both storage and the database.
// // //  * @param {Array<string>} mediaIds - An array of media_asset UUIDs to delete.
// // //  */
// // // async function deleteMediaAssets(mediaIds) {
// // //   if (!mediaIds || mediaIds.length === 0) return;
  
// // //   // 1. Get the file_paths (filenames) from the database
// // //   const { data: assets, error: selectError } = await supabase
// // //     .from('media_assets')
// // //     .select('id, file_path')
// // //     .in('id', mediaIds);
    
// // //   if (selectError) {
// // //     console.error('Error selecting media assets for deletion:', selectError);
// // //     return;
// // //   }

// // //   // 2. Create the full storage paths by prepending 'public/'
// // //   const filePaths = assets.map(a => 'public/' + a.file_path).filter(Boolean);

// // //   // 3. Delete files from Storage
// // //   if (filePaths.length > 0) {
// // //     const { error: storageError } = await supabase.storage
// // //       .from('media') // Use the 'media' bucket
// // //       .remove(filePaths); // Pass full paths: ['public/file1.png', 'public/file2.png']
// // //     if (storageError) {
// // //       console.error('Error deleting from storage:', storageError);
// // //     }
// // //   }
  
// // //   // 4. Finally, delete the database records
// // //   const { error: dbError } = await supabase
// // //     .from('media_assets')
// // //     .delete()
// // //     .in('id', mediaIds);
    
// // //   if (dbError) {
// // //     console.error('Error deleting from media_assets table:', dbError);
// // //   }
// // // }

// // // /**
// // //  * =================================================================
// // //  * Read Functions
// // //  * =================================================================
// // //  */

// // // /**
// // //  * Fetches all projects for the main admin list. (Lightweight)
// // //  */
// // // export async function getProjectAdminDashboard(searchQuery = '') {
// // //   let query = supabase
// // //     .from('projects')
// // //     .select(`
// // //       id,
// // //       title,
// // //       slug,
// // //       created_at,
// // //       media_assets:projects_hero_media_id_fkey ( file_path, alt_text )
// // //     `)
// // //     .order('created_at', { ascending: false });

// // //   if (searchQuery) {
// // //     query = query.ilike('title', `%${searchQuery}%`);
// // //   }

// // //   const { data, error } = await query;
// // //   if (error) {
// // //     console.error('Error fetching admin projects:', error);
// // //     return [];
// // //   }
// // //   return data;
// // // }

// // // /**
// // //  * Fetches all data needed for the project editor page.
// // //  * This includes the project itself AND the lookup tables (tools, categories).
// // //  */
// // // export async function getEditorData(slug) {
// // //   try {
// // //     const [projectData, allTools, allCategories] = await Promise.all([
// // //       getProjectForEditor(slug),
// // //       supabase.from('tools').select('*').order('name'),
// // //       supabase.from('project_categories').select('*').order('name')
// // //     ]);

// // //     return {
// // //       project: projectData.data,
// // //       allTools: allTools.data,
// // //       allCategories: allCategories.data,
// // //       error: projectData.error || allTools.error || allCategories.error
// // //     };
// // //   } catch (error) {
// // //     console.error('Error loading editor data:', error);
// // //     return { error };
// // //   }
// // // }

// // // /**
// // //  * Fetches a single project and all its related data for the editor.
// // //  */
// // // export async function getProjectForEditor(slug) {
// // //   if (!slug || slug === 'new') {
// // //     // Return a default structure for a new project
// // //     return { 
// // //       data: {
// // //         title: '',
// // //         slug: '',
// // //         description: '',
// // //         hero_media_id: null,
// // //         detail_hero_media_id: null,
// // //         video_url: '',
// // //         client: '',
// // //         role: '',
// // //         timeline: '',
// // //         tools: [],
// // //         categories: [],
// // //         content: [],
// // //         gallery: []
// // //       } 
// // //     };
// // //   }
  
// // //   // This query is designed to match the frontend components
// // //   const { data, error } = await supabase
// // //     .from('projects')
// // //     .select(`
// // //       *,
// // //       hero_media:media_assets!projects_hero_media_id_fkey ( * ),
// // //       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( * ),
// // //       tools:project_tool_links ( tools ( * ) ),
// // //       categories:project_category_links ( project_categories ( * ) ),
// // //       content:project_content_blocks ( * ),
// // //       gallery:project_gallery ( *, media_assets ( * ) )
// // //     `)
// // //     .eq('slug', slug)
// // //     .order('order', { referencedTable: 'project_content_blocks', ascending: true })
// // //     .order('order', { referencedTable: 'project_gallery', ascending: true })
// // //     .single();

// // //   if (error) {
// // //     console.error('Error fetching project for editor:', error);
// // //     return { error };
// // //   }

// // //   // Clean up the nested data to be form-friendly
// // //   const cleanedData = {
// // //     ...data,
// // //     tools: data.tools.map(t => t.tools), // Un-nest tools
// // //     categories: data.categories.map(c => c.project_categories), // Un-nest categories
// // //     gallery: data.gallery.map(g => ({...g, media_assets: g.media_assets})),
// // //     // For content, parse the JSONB and join media_assets
// // //     content: await Promise.all(data.content.map(async (block) => {
// // //       if (block.type === 'image' && block.content?.media_id) {
// // //         // This is an "image" block, its content is {"media_id": "uuid", "caption": "..."}
// // //         // We need to fetch the full media_asset object for the form
// // //         const { data: mediaAsset } = await supabase
// // //           .from('media_assets')
// // //           .select('*')
// // //           .eq('id', block.content.media_id)
// // //           .single();
        
// // //         return {
// // //           ...block,
// // //           // Re-nest the data to be form-friendly
// // //           content: {
// // //             ...block.content,
// // //             media_assets: mediaAsset // Add the full object for the ImageUpload component
// // //           }
// // //         };
// // //       }
// // //       return block; // Return 'text' or 'palette' blocks as-is
// // //     }))
// // //   };

// // //   return { data: cleanedData };
// // // }

// // // /**
// // //  * =================================================================
// // //  * Write Functions (Create / Update / Delete)
// // //  * =================================================================
// // //  */

// // // /**
// // //  * Deletes a project and ALL its related data and assets.
// // //  */
// // // export async function deleteProject(projectId) {
// // //   try {
// // //     // 1. Get all media IDs associated with this project
// // //     const { data: project, error: getError } = await supabase
// // //       .from('projects')
// // //       .select(`
// // //         hero_media_id,
// // //         detail_hero_media_id,
// // //         content:project_content_blocks ( content ),
// // //         gallery:project_gallery ( media_id )
// // //       `)
// // //       .eq('id', projectId)
// // //       .single();

// // //     if (getError) throw getError;
// // //     if (!project) throw new Error('Project not found');

// // //     const mediaIdsToDelete = [
// // //       project.hero_media_id,
// // //       project.detail_hero_media_id
// // //     ].filter(Boolean);
    
// // //     project.content.forEach(block => {
// // //       if (block.content?.media_id) { // Check if 'image' block and has media_id
// // //         mediaIdsToDelete.push(block.content.media_id);
// // //       }
// // //     });
// // //     project.gallery.forEach(item => {
// // //       if (item.media_id) mediaIdsToDelete.push(item.media_id);
// // //     });

// // //     // 2. Delete all junction/child table rows
// // //     // These can run in parallel
// // //     await Promise.all([
// // //       supabase.from('project_tool_links').delete().eq('project_id', projectId),
// // //       supabase.from('project_category_links').delete().eq('project_id', projectId),
// // //       supabase.from('project_content_blocks').delete().eq('project_id', projectId),
// // //       supabase.from('project_gallery').delete().eq('project_id', projectId),
// // //     ]);
    
// // //     // 3. Delete the main project row (must happen AFTER children)
// // //     await supabase.from('projects').delete().eq('id', projectId);

// // //     // 4. Clean up all media assets (pass unique IDs)
// // //     await deleteMediaAssets([...new Set(mediaIdsToDelete)]);

// // //     return { success: true };

// // //   } catch (error) {
// // //     console.error('Error deleting project:', error);
// // //     return { success: false, error };
// // //   }
// // // }


// // // /**
// // //  * Saves a project. This is a complex "transaction" that:
// // //  * 1. Uploads/Replaces main images.
// // //  * 2. Upserts the main `projects` row.
// // //  * 3. Syncs all related tables (tools, categories, content, gallery).
// // //  * 4. Cleans up orphaned media assets.
// // //  */
// // // export async function saveProject(projectData, userId) {
// // //   let mediaIdsToDelete = [];
  
// // //   try {
// // //     // --- 1. Separate main data from relations ---
// // //     const {
// // //       tools,
// // //       categories,
// // //       content,
// // //       gallery,
// // //       file_hero, // new file from react-hook-form
// // //       original_hero_media_id, // stored on file change
// // //       file_detail_hero,
// // //       original_detail_hero_media_id,
// // //       ...mainData
// // //     } = projectData;

// // //     // --- 2. Process Main Image Uploads ---
// // //     if (file_hero) {
// // //       const newMedia = await uploadMediaAsset(file_hero, userId);
// // //       mainData.hero_media_id = newMedia.id;
// // //       if (original_hero_media_id) mediaIdsToDelete.push(original_hero_media_id);
// // //     }
// // //     if (file_detail_hero) {
// // //       const newMedia = await uploadMediaAsset(file_detail_hero, userId);
// // //       mainData.detail_hero_media_id = newMedia.id;
// // //       if (original_detail_hero_media_id) mediaIdsToDelete.push(original_detail_hero_media_id);
// // //     }
    
// // //     // --- 3. Upsert main `projects` row ---
// // //     // Clean up joined data before save
// // //     delete mainData.hero_media;
// // //     delete mainData.detail_hero_media;
    
// // //     const { data: savedProject, error: projectError } = await supabase
// // //       .from('projects')
// // //       .upsert(mainData)
// // //       .select('id, slug') // Return slug in case it was auto-generated or changed
// // //       .single();
      
// // //     if (projectError) throw projectError;
// // //     const projectId = savedProject.id;
    
// // //     // --- 4. Sync all related tables in parallel ---
// // //     const [contentDeleteIds, galleryDeleteIds] = await Promise.all([
// // //       syncTools(projectId, tools || []),
// // //       syncCategories(projectId, categories || []),
// // //       syncContentBlocks(projectId, content || [], userId),
// // //       syncGallery(projectId, gallery || [], userId),
// // //     ]);
    
// // //     // --- 5. Consolidate and delete all orphaned media ---
// // //     mediaIdsToDelete.push(...(contentDeleteIds || []));
// // //     mediaIdsToDelete.push(...(galleryDeleteIds || []));
    
// // //     if (mediaIdsToDelete.length > 0) {
// // //       // Remove duplicates
// // //       await deleteMediaAssets([...new Set(mediaIdsToDelete)]);
// // //     }

// // //     return { success: true, data: savedProject };
    
// // //   } catch (error) {
// // //     console.error('Error saving project:', error);
// // //     return { success: false, error };
// // //   }
// // // }

// // // /**
// // //  * =================================================================
// // //  * Sync Helpers for `saveProject`
// // //  * =================================================================
// // //  */

// // // // --- Syncs many-to-many `project_tool_links` ---
// // // async function syncTools(projectId, tools) {
// // //   // 1. Delete all existing links for this project
// // //   await supabase.from('project_tool_links').delete().eq('project_id', projectId);
  
// // //   // 2. Insert new links
// // //   if (tools.length > 0) {
// // //     const links = tools.map(tool => ({
// // //       project_id: projectId,
// // //       tool_id: tool.id
// // //     }));
// // //     const { error } = await supabase.from('project_tool_links').insert(links);
// // //     if (error) throw error;
// // //   }
// // // }

// // // // --- Syncs many-to-many `project_category_links` ---
// // // async function syncCategories(projectId, categories) {
// // //   // 1. Delete all existing links
// // //   await supabase.from('project_category_links').delete().eq('project_id', projectId);
  
// // //   // 2. Insert new links
// // //   if (categories.length > 0) {
// // //     const links = categories.map(cat => ({
// // //       project_id: projectId,
// // //       category_id: cat.id
// // //     }));
// // //     const { error } = await supabase.from('project_category_links').insert(links);
// // //     if (error) throw error;
// // //   }
// // // }

// // // // --- Syncs one-to-many `project_content_blocks` ---
// // // async function syncContentBlocks(projectId, blocks, userId) {
// // //   let mediaIdsToDelete = [];
// // //   let processedBlocks = [];

// // //   // 1. Upload new files and prepare data
// // //   for (const [index, block] of blocks.entries()) {
// // //     let blockContent = { ...block.content }; // Copy the content JSONB
    
// // //     // Check for new file upload within a block
// // //     if (block.type === 'image' && block.file) {
// // //       const newMedia = await uploadMediaAsset(block.file, userId);
// // //       // Store just the media_id in the JSONB
// // //       blockContent.media_id = newMedia.id; 
// // //       if (block.originalMediaId) {
// // //         mediaIdsToDelete.push(block.originalMediaId);
// // //       }
// // //     }
    
// // //     // Clean up fields that are not part of the 'content' JSONB
// // //     delete blockContent.file;
// // //     delete blockContent.originalMediaId;
// // //     delete blockContent.media_assets; // This is joined data, not for saving

// // //     processedBlocks.push({
// // //       id: block.id || undefined, // undefined for new blocks
// // //       project_id: projectId,
// // //       type: block.type,
// // //       order: index,
// // //       content: blockContent, // This is the JSONB field
// // //     });
// // //   }
  
// // //   // 2. Upsert all blocks
// // //   const { data: savedBlocks, error } = await supabase
// // //     .from('project_content_blocks')
// // //     .upsert(processedBlocks)
// // //     .select('id');
    
// // //   if (error) throw error;

// // //   // 3. Delete orphaned blocks
// // //   const savedIds = savedBlocks.map(b => b.id).filter(Boolean);
// // //   const deleteQuery = supabase
// // //     .from('project_content_blocks')
// // //     .delete()
// // //     .eq('project_id', projectId);
    
// // //   if (savedIds.length > 0) {
// // //     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
// // //   }
  
// // //   await deleteQuery;
  
// // //   return mediaIdsToDelete;
// // // }

// // // // --- Syncs one-to-many `project_gallery` ---
// // // async function syncGallery(projectId, gallery, userId) {
// // //   let mediaIdsToDelete = [];
// // //   let processedItems = [];

// // //   // 1. Upload new files and prepare data
// // //   for (const [index, item] of gallery.entries()) {
// // //     let media_id = item.media_id;
    
// // //     if (item.file) {
// // //       const newMedia = await uploadMediaAsset(item.file, userId);
// // //       media_id = newMedia.id;
// // //       if (item.originalMediaId) {
// // //         mediaIdsToDelete.push(item.originalMediaId);
// // //       }
// // //     }
    
// // //     processedItems.push({
// // //       id: item.id || undefined,
// // //       project_id: projectId,
// // //       media_id: media_id,
// // //       order: index,
// // //     });
// // //   }

// // //   // 2. Upsert all gallery items
// // //   const { data: savedItems, error } = await supabase
// // //     .from('project_gallery')
// // //     .upsert(processedItems)
// // //     .select('id');
    
// // //   if (error) throw error;

// // //   // 3. Delete orphaned items
// // //   const savedIds = savedItems.map(i => i.id).filter(Boolean);
// // //   const deleteQuery = supabase
// // //     .from('project_gallery')
// // //     .delete()
// // //     .eq('project_id', projectId);
    
// // //   if (savedIds.length > 0) {
// // //     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
// // //   }
  
// // //   await deleteQuery;
  
// // //   return mediaIdsToDelete;
// // // }


// // import { supabase } from '../lib/supabaseClient';
// // import { onTableChange } from './homepage'; // Reusing our subscription helper

// // /**
// //  * =================================================================
// //  * Storage/Media Helpers (Corrected)
// //  * =================================================================
// //  */

// // /**
// //  * Gets the public URL for a media asset.
// //  * @param {object} mediaAsset - The media_assets object (must have file_path)
// //  * @returns {string|null} - The public URL or null.
// //  */
// // export const getStorageUrl = (mediaAsset) => {
// //   if (!mediaAsset?.file_path) return null;
// //   // Handle if it's already a full URL (like a placeholder)
// //   if (mediaAsset.file_path.startsWith('http')) {
// //     return mediaAsset.file_path;
// //   }
// //   // Build the URL, adding the 'public/' prefix to the filename
// //   const { data } = supabase.storage
// //     .from('media') // Use the 'media' bucket
// //     .getPublicUrl('public/' + mediaAsset.file_path);

// //   if (!data || !data.publicUrl) {
// //     console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
// //     return null;
// //   }
// //   return data.publicUrl;
// // };

// // /**
// //  * Uploads a file, creates a media_assets record, and returns the new object.
// //  * @param {File} file - The file to upload.
// //  * @param {string} userId - The ID of the authenticated user.
// //  * @returns {object} - The new media_assets object.
// //  */
// // async function uploadMediaAsset(file, userId) {
// //   const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
// //   const fileName = `${Date.now()}-${cleanFileName}`;
// //   const filePath = `${fileName}`; // Store ONLY the filename in the DB

// //   // Upload TO the 'public/' folder
// //   const { error: uploadError } = await supabase.storage
// //     .from('media')
// //     .upload('public/' + filePath, file); 
    
// //   if (uploadError) throw uploadError;

// //   // Create the database record, storing only the filename
// //   const { data, error: insertError } = await supabase
// //     .from('media_assets')
// //     .insert({
// //       file_path: filePath, // Stores just 'filename.png'
// //       file_type: file.type,
// //       alt_text: file.name,
// //       uploaded_by: userId,
// //     })
// //     .select('id, file_path, alt_text') // Return the full new object
// //     .single();
    
// //   if (insertError) throw insertError;
// //   return data; // Returns { id, file_path, alt_text }
// // }

// // /**
// //  * Deletes media assets from both storage and the database.
// //  * @param {Array<string>} mediaIds - An array of media_asset UUIDs to delete.
// //  */
// // async function deleteMediaAssets(mediaIds) {
// //   if (!mediaIds || mediaIds.length === 0) return;
  
// //   // 1. Get the file_paths (filenames) from the database
// //   const { data: assets, error: selectError } = await supabase
// //     .from('media_assets')
// //     .select('id, file_path')
// //     .in('id', mediaIds);
    
// //   if (selectError) {
// //     console.error('Error selecting media assets for deletion:', selectError);
// //     return;
// //   }

// //   // 2. Create the full storage paths by prepending 'public/'
// //   const filePaths = assets.map(a => 'public/' + a.file_path).filter(Boolean);

// //   // 3. Delete files from Storage
// //   if (filePaths.length > 0) {
// //     const { error: storageError } = await supabase.storage
// //       .from('media') // Use the 'media' bucket
// //       .remove(filePaths); // Pass full paths: ['public/file1.png', 'public/file2.png']
// //     if (storageError) {
// //       console.error('Error deleting from storage:', storageError);
// //     }
// //   }
  
// //   // 4. Finally, delete the database records
// //   const { error: dbError } = await supabase
// //     .from('media_assets')
// //     .delete()
// //     .in('id', mediaIds);
    
// //   if (dbError) {
// //     console.error('Error deleting from media_assets table:', dbError);
// //   }
// // }

// // /**
// //  * =================================================================
// //  * Read Functions
// //  * =================================================================
// //  */

// // /**
// //  * Fetches all projects for the main admin list. (Lightweight)
// //  */
// // export async function getProjectAdminDashboard(searchQuery = '') {
// //   // ---
// //   // --- THIS IS THE FIX ---
// //   // ---
// //   // We must specify *which* foreign key to use for `media_assets`.
// //   // For the list page, we want the `hero_media_id`.
// //   const selectQuery = `
// //     id,
// //     title,
// //     slug,
// //     created_at,
// //     media_assets:media_assets!projects_hero_media_id_fkey ( file_path, alt_text )
// //   `;
// //   // --- END FIX ---

// //   let query = supabase
// //     .from('projects')
// //     .select(selectQuery) // Use the fixed query
// //     .order('created_at', { ascending: false });

// //   if (searchQuery) {
// //     query = query.ilike('title', `%${searchQuery}%`);
// //   }

// //   const { data, error } = await query;
// //   if (error) {
// //     console.error('Error fetching admin projects:', error);
// //     return [];
// //   }
// //   return data;
// // }

// // /**
// //  * Fetches all data needed for the project editor page.
// //  * This includes the project itself AND the lookup tables (tools, categories).
// //  */
// // export async function getEditorData(slug) {
// //   try {
// //     const [projectData, allTools, allCategories] = await Promise.all([
// //       getProjectForEditor(slug),
// //       supabase.from('tools').select('*').order('name'),
// //       supabase.from('project_categories').select('*').order('name')
// //     ]);

// //     return {
// //       project: projectData.data,
// //       allTools: allTools.data,
// //       allCategories: allCategories.data,
// //       error: projectData.error || allTools.error || allCategories.error
// //     };
// //   } catch (error) {
// //     console.error('Error loading editor data:', error);
// //     return { error };
// //   }
// // }

// // /**
// //  * Fetches a single project and all its related data for the editor.
// //  */
// // export async function getProjectForEditor(slug) {
// //   if (!slug || slug === 'new') {
// //     // Return a default structure for a new project
// //     return { 
// //       data: {
// //         title: '',
// //         slug: '',
// //         description: '',
// //         hero_media_id: null,
// //         detail_hero_media_id: null,
// //         video_url: '',
// //         client: '',
// //         role: '',
// //         timeline: '',
// //         tools: [],
// //         categories: [],
// //         content: [],
// //         gallery: []
// //       } 
// //     };
// //   }
  
// //   // This query is designed to match the frontend components
// //   const { data, error } = await supabase
// //     .from('projects')
// //     .select(`
// //       *,
// //       hero_media:media_assets!projects_hero_media_id_fkey ( * ),
// //       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( * ),
// //       tools:project_tool_links ( tools ( * ) ),
// //       categories:project_category_links ( project_categories ( * ) ),
// //       content:project_content_blocks ( * ),
// //       gallery:project_gallery ( *, media_assets ( * ) )
// //     `)
// //     .eq('slug', slug)
// //     .order('order', { referencedTable: 'project_content_blocks', ascending: true })
// //     .order('order', { referencedTable: 'project_gallery', ascending: true })
// //     .single();

// //   if (error) {
// //     console.error('Error fetching project for editor:', error);
// //     return { error };
// //   }

// //   // Clean up the nested data to be form-friendly
// //   const cleanedData = {
// //     ...data,
// //     tools: data.tools.map(t => t.tools), // Un-nest tools
// //     categories: data.categories.map(c => c.project_categories), // Un-nest categories
// //     gallery: data.gallery.map(g => ({...g, media_assets: g.media_assets})),
// //     // For content, parse the JSONB and join media_assets
// //     content: await Promise.all(data.content.map(async (block) => {
// //       if (block.type === 'image' && block.content?.media_id) {
// //         // This is an "image" block, its content is {"media_id": "uuid", "caption": "..."}
// //         // We need to fetch the full media_asset object for the form
// //         const { data: mediaAsset } = await supabase
// //           .from('media_assets')
// //           .select('*')
// //           .eq('id', block.content.media_id)
// //           .single();
        
// //         return {
// //           ...block,
// //           // Re-nest the data to be form-friendly
// //           content: {
// //             ...block.content,
// //             media_assets: mediaAsset // Add the full object for the ImageUpload component
// //           }
// //         };
// //       }
// //       return block; // Return 'text' or 'palette' blocks as-is
// //     }))
// //   };

// //   return { data: cleanedData };
// // }

// // /**
// //  * =================================================================
// //  * Write Functions (Create / Update / Delete)
// //  * =================================================================
// //  */

// // /**
// //  * Deletes a project and ALL its related data and assets.
// //  */
// // export async function deleteProject(projectId) {
// //   try {
// //     // 1. Get all media IDs associated with this project
// //     const { data: project, error: getError } = await supabase
// //       .from('projects')
// //       .select(`
// //         hero_media_id,
// //         detail_hero_media_id,
// //         content:project_content_blocks ( content ),
// //         gallery:project_gallery ( media_id )
// //       `)
// //       .eq('id', projectId)
// //       .single();

// //     if (getError) throw getError;
// //     if (!project) throw new Error('Project not found');

// //     const mediaIdsToDelete = [
// //       project.hero_media_id,
// //       project.detail_hero_media_id
// //     ].filter(Boolean);
    
// //     project.content.forEach(block => {
// //       if (block.content?.media_id) { // Check if 'image' block and has media_id
// //         mediaIdsToDelete.push(block.content.media_id);
// //       }
// //     });
// //     project.gallery.forEach(item => {
// //       if (item.media_id) mediaIdsToDelete.push(item.media_id);
// //     });

// //     // 2. Delete all junction/child table rows
// //     // These can run in parallel
// //     await Promise.all([
// //       supabase.from('project_tool_links').delete().eq('project_id', projectId),
// //       supabase.from('project_category_links').delete().eq('project_id', projectId),
// //       supabase.from('project_content_blocks').delete().eq('project_id', projectId),
// //       supabase.from('project_gallery').delete().eq('project_id', projectId),
// //     ]);
    
// //     // 3. Delete the main project row (must happen AFTER children)
// //     await supabase.from('projects').delete().eq('id', projectId);

// //     // 4. Clean up all media assets (pass unique IDs)
// //     await deleteMediaAssets([...new Set(mediaIdsToDelete)]);

// //     return { success: true };

// //   } catch (error) {
// //     console.error('Error deleting project:', error);
// //     return { success: false, error };
// //   }
// // }


// // /**
// //  * Saves a project. This is a complex "transaction" that:
// //  * 1. Uploads/Replaces main images.
// //  * 2. Upserts the main `projects` row.
// //  * 3. Syncs all related tables (tools, categories, content, gallery).
// //  * 4. Cleans up orphaned media assets.
// //  */
// // export async function saveProject(projectData, userId) {
// //   let mediaIdsToDelete = [];
  
// //   try {
// //     // --- 1. Separate main data from relations ---
// //     const {
// //       tools,
// //       categories,
// //       content,
// //       gallery,
// //       file_hero, // new file from react-hook-form
// //       original_hero_media_id, // stored on file change
// //       file_detail_hero,
// //       original_detail_hero_media_id,
// //       ...mainData
// //     } = projectData;

// //     // --- 2. Process Main Image Uploads ---
// //     if (file_hero) {
// //       const newMedia = await uploadMediaAsset(file_hero, userId);
// //       mainData.hero_media_id = newMedia.id;
// //       if (original_hero_media_id) mediaIdsToDelete.push(original_hero_media_id);
// //     }
// //     if (file_detail_hero) {
// //       const newMedia = await uploadMediaAsset(file_detail_hero, userId);
// //       mainData.detail_hero_media_id = newMedia.id;
// //       if (original_detail_hero_media_id) mediaIdsToDelete.push(original_detail_hero_media_id);
// //     }
    
// //     // --- 3. Upsert main `projects` row ---
// //     // Clean up joined data before save
// //     delete mainData.hero_media;
// //     delete mainData.detail_hero_media;
    
// //     const { data: savedProject, error: projectError } = await supabase
// //       .from('projects')
// //       .upsert(mainData)
// //       .select('id, slug') // Return slug in case it was auto-generated or changed
// //       .single();
      
// //     if (projectError) throw projectError;
// //     const projectId = savedProject.id;
    
// //     // --- 4. Sync all related tables in parallel ---
// //     const [contentDeleteIds, galleryDeleteIds] = await Promise.all([
// //       syncTools(projectId, tools || []),
// //       syncCategories(projectId, categories || []),
// //       syncContentBlocks(projectId, content || [], userId),
// //       syncGallery(projectId, gallery || [], userId),
// //     ]);
    
// //     // --- 5. Consolidate and delete all orphaned media ---
// //     mediaIdsToDelete.push(...(contentDeleteIds || []));
// //     mediaIdsToDelete.push(...(galleryDeleteIds || []));
    
// //     if (mediaIdsToDelete.length > 0) {
// //       // Remove duplicates
// //       await deleteMediaAssets([...new Set(mediaIdsToDelete)]);
// //     }

// //     return { success: true, data: savedProject };
    
// //   } catch (error) {
// //     console.error('Error saving project:', error);
// //     return { success: false, error };
// //   }
// // }

// // /**
// //  * =================================================================
// //  * Sync Helpers for `saveProject`
// //  * =================================================================
// //  */

// // // --- Syncs many-to-many `project_tool_links` ---
// // async function syncTools(projectId, tools) {
// //   // 1. Delete all existing links for this project
// //   await supabase.from('project_tool_links').delete().eq('project_id', projectId);
  
// //   // 2. Insert new links
// //   if (tools.length > 0) {
// //     const links = tools.map(tool => ({
// //       project_id: projectId,
// //       tool_id: tool.id
// //     }));
// //     const { error } = await supabase.from('project_tool_links').insert(links);
// //     if (error) throw error;
// //   }
// // }

// // // --- Syncs many-to-many `project_category_links` ---
// // async function syncCategories(projectId, categories) {
// //   // 1. Delete all existing links
// //   await supabase.from('project_category_links').delete().eq('project_id', projectId);
  
// //   // 2. Insert new links
// //   if (categories.length > 0) {
// //     const links = categories.map(cat => ({
// //       project_id: projectId,
// //       category_id: cat.id
// //     }));
// //     const { error } = await supabase.from('project_category_links').insert(links);
// //     if (error) throw error;
// //   }
// // }

// // // --- Syncs one-to-many `project_content_blocks` ---
// // async function syncContentBlocks(projectId, blocks, userId) {
// //   let mediaIdsToDelete = [];
// //   let processedBlocks = [];

// //   // 1. Upload new files and prepare data
// //   for (const [index, block] of blocks.entries()) {
// //     let blockContent = { ...block.content }; // Copy the content JSONB
    
// //     // Check for new file upload within a block
// //     if (block.type === 'image' && block.file) {
// //       const newMedia = await uploadMediaAsset(block.file, userId);
// //       // Store just the media_id in the JSONB
// //       blockContent.media_id = newMedia.id; 
// //       if (block.originalMediaId) {
// //         mediaIdsToDelete.push(block.originalMediaId);
// //       }
// //     }
    
// //     // Clean up fields that are not part of the 'content' JSONB
// //     delete blockContent.file;
// //     delete blockContent.originalMediaId;
// //     delete blockContent.media_assets; // This is joined data, not for saving

// //     processedBlocks.push({
// //       id: block.id || undefined, // undefined for new blocks
// //       project_id: projectId,
// //       type: block.type,
// //       order: index,
// //       content: blockContent, // This is the JSONB field
// //     });
// //   }
  
// //   // 2. Upsert all blocks
// //   const { data: savedBlocks, error } = await supabase
// //     .from('project_content_blocks')
// //     .upsert(processedBlocks)
// //     .select('id');
    
// //   if (error) throw error;

// //   // 3. Delete orphaned blocks
// //   const savedIds = savedBlocks.map(b => b.id).filter(Boolean);
// //   const deleteQuery = supabase
// //     .from('project_content_blocks')
// //     .delete()
// //     .eq('project_id', projectId);
    
// //   if (savedIds.length > 0) {
// //     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
// //   }
  
// //   await deleteQuery;
  
// //   return mediaIdsToDelete;
// // }

// // // --- Syncs one-to-many `project_gallery` ---
// // async function syncGallery(projectId, gallery, userId) {
// //   let mediaIdsToDelete = [];
// //   let processedItems = [];

// //   // 1. Upload new files and prepare data
// //   for (const [index, item] of gallery.entries()) {
// //     let media_id = item.media_id;
    
// //     if (item.file) {
// //       const newMedia = await uploadMediaAsset(item.file, userId);
// //       media_id = newMedia.id;
// //       if (item.originalMediaId) {
// //         mediaIdsToDelete.push(item.originalMediaId);
// //       }
// //     }
    
// //     processedItems.push({
// //       id: item.id || undefined,
// //       project_id: projectId,
// //       media_id: media_id,
// //       order: index,
// //     });
// //   }

// //   // 2. Upsert all gallery items
// //   const { data: savedItems, error } = await supabase
// //     .from('project_gallery')
// //     .upsert(processedItems)
// //     .select('id');
    
// //   if (error) throw error;

// //   // 3. Delete orphaned items
// //   const savedIds = savedItems.map(i => i.id).filter(Boolean);
// //   const deleteQuery = supabase
// //     .from('project_gallery')
// //     .delete()
// //     .eq('project_id', projectId);
    
// //   if (savedIds.length > 0) {
// //     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
// //   }
  
// //   await deleteQuery;
  
// //   return mediaIdsToDelete;
// // }












// import { supabase } from '../lib/supabaseClient';
// import { onTableChange } from './homepage'; // Reusing our subscription helper

// /**
//  * =================================================================
//  * Storage/Media Helpers (Corrected)
//  * =================================================================
//  */

// /**
//  * Gets the public URL for a media asset.
//  * @param {object} mediaAsset - The media_assets object (must have file_path)
//  * @returns {string|null} - The public URL or null.
//  */
// export const getStorageUrl = (mediaAsset) => {
//   if (!mediaAsset?.file_path) return null;
//   // Handle if it's already a full URL (like a placeholder)
//   if (mediaAsset.file_path.startsWith('http')) {
//     return mediaAsset.file_path;
//   }
//   // Build the URL, adding the 'public/' prefix to the filename
//   const { data } = supabase.storage
//     .from('media') // Use the 'media' bucket
//     .getPublicUrl('public/' + mediaAsset.file_path);

//   if (!data || !data.publicUrl) {
//     console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
//     return null;
//   }
//   return data.publicUrl;
// };

// /**
//  * Uploads a file, creates a media_assets record, and returns the new object.
//  * @param {File} file - The file to upload.
//  * @param {string} userId - The ID of the authenticated user.
//  * @returns {object} - The new media_assets object.
//  */
// async function uploadMediaAsset(file, userId) {
//   const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
//   const fileName = `${Date.now()}-${cleanFileName}`;
//   const filePath = `${fileName}`; // Store ONLY the filename in the DB

//   // Upload TO the 'public/' folder
//   const { error: uploadError } = await supabase.storage
//     .from('media')
//     .upload('public/' + filePath, file); 
    
//   if (uploadError) throw uploadError;

//   // Create the database record, storing only the filename
//   const { data, error: insertError } = await supabase
//     .from('media_assets')
//     .insert({
//       file_path: filePath, // Stores just 'filename.png'
//       file_type: file.type,
//       alt_text: file.name,
//       uploaded_by: userId,
//     })
//     .select('id, file_path, alt_text') // Return the full new object
//     .single();
    
//   if (insertError) throw insertError;
//   return data; // Returns { id, file_path, alt_text }
// }

// /**
//  * Deletes media assets from both storage and the database.
//  * @param {Array<string>} mediaIds - An array of media_asset UUIDs to delete.
//  */
// async function deleteMediaAssets(mediaIds) {
//   if (!mediaIds || mediaIds.length === 0) return;
  
//   // 1. Get the file_paths (filenames) from the database
//   const { data: assets, error: selectError } = await supabase
//     .from('media_assets')
//     .select('id, file_path')
//     .in('id', mediaIds);
    
//   if (selectError) {
//     console.error('Error selecting media assets for deletion:', selectError);
//     return;
//   }

//   // 2. Create the full storage paths by prepending 'public/'
//   const filePaths = assets.map(a => 'public/' + a.file_path).filter(Boolean);

//   // 3. Delete files from Storage
//   if (filePaths.length > 0) {
//     const { error: storageError } = await supabase.storage
//       .from('media') // Use the 'media' bucket
//       .remove(filePaths); // Pass full paths: ['public/file1.png', 'public/file2.png']
//     if (storageError) {
//       console.error('Error deleting from storage:', storageError);
//     }
//   }
  
//   // 4. Finally, delete the database records
//   const { error: dbError } = await supabase
//     .from('media_assets')
//     .delete()
//     .in('id', mediaIds);
    
//   if (dbError) {
//     console.error('Error deleting from media_assets table:', dbError);
//   }
// }

// /**
//  * =================================================================
//  * Read Functions
//  * =================================================================
//  */

// /**
//  * Fetches all projects for the main admin list. (Lightweight)
//  */
// export async function getProjectAdminDashboard(searchQuery = '') {
//   // ---
//   // --- THIS IS THE FIX ---
//   // ---
//   // We must specify *which* foreign key to use for `media_assets`.
//   // For the list page, we want the `hero_media_id`.
//   const selectQuery = `
//     id,
//     title,
//     slug,
//     created_at,
//     media_assets:media_assets!projects_hero_media_id_fkey ( file_path, alt_text )
//   `;
//   // --- END FIX ---

//   let query = supabase
//     .from('projects')
//     .select(selectQuery) // Use the fixed query
//     .order('created_at', { ascending: false });

//   if (searchQuery) {
//     query = query.ilike('title', `%${searchQuery}%`);
//   }

//   const { data, error } = await query;
//   if (error) {
//     console.error('Error fetching admin projects:', error);
//     return [];
//   }
//   return data;
// }

// /**
//  * Fetches all data needed for the project editor page.
//  * This includes the project itself AND the lookup tables (tools, categories).
//  */
// export async function getEditorData(slug) {
//   try {
//     const [projectData, allTools, allCategories] = await Promise.all([
//       getProjectForEditor(slug),
//       supabase.from('tools').select('*').order('name'),
//       supabase.from('project_categories').select('*').order('name')
//     ]);

//     return {
//       project: projectData.data,
//       allTools: allTools.data,
//       allCategories: allCategories.data,
//       error: projectData.error || allTools.error || allCategories.error
//     };
//   } catch (error) {
//     console.error('Error loading editor data:', error);
//     return { error };
//   }
// }

// /**
//  * Fetches a single project and all its related data for the editor.
//  */
// export async function getProjectForEditor(slug) {
//   if (!slug || slug === 'new') {
//     // Return a default structure for a new project
//     return { 
//       data: {
//         title: '',
//         slug: '',
//         description: '',
//         hero_media_id: null,
//         detail_hero_media_id: null,
//         video_url: '',
//         client: '',
//         role: '',
//         timeline: '',
//         tools: [],
//         categories: [],
//         content: [],
//         gallery: []
//       } 
//     };
//   }
  
//   // This query is designed to match the frontend components
//   const { data, error } = await supabase
//     .from('projects')
//     .select(`
//       *,
//       hero_media:media_assets!projects_hero_media_id_fkey ( * ),
//       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( * ),
//       tools:project_tool_links ( tools ( * ) ),
//       categories:project_category_links ( project_categories ( * ) ),
//       content:project_content_blocks ( * ),
//       gallery:project_gallery ( *, media_assets ( * ) )
//     `)
//     .eq('slug', slug)
//     .order('order', { referencedTable: 'project_content_blocks', ascending: true })
//     .order('order', { referencedTable: 'project_gallery', ascending: true })
//     .single();

//   if (error) {
//     console.error('Error fetching project for editor:', error);
//     return { error };
//   }

//   // Clean up the nested data to be form-friendly
//   const cleanedData = {
//     ...data,
//     tools: data.tools.map(t => t.tools), // Un-nest tools
//     categories: data.categories.map(c => c.project_categories), // Un-nest categories
//     gallery: data.gallery.map(g => ({...g, media_assets: g.media_assets})),
//     // For content, parse the JSONB and join media_assets
//     content: await Promise.all(data.content.map(async (block) => {
//       if (block.type === 'image' && block.content?.media_id) {
//         // This is an "image" block, its content is {"media_id": "uuid", "caption": "..."}
//         // We need to fetch the full media_asset object for the form
//         const { data: mediaAsset } = await supabase
//           .from('media_assets')
//           .select('*')
//           .eq('id', block.content.media_id)
//           .single();
        
//         return {
//           ...block,
//           // Re-nest the data to be form-friendly
//           content: {
//             ...block.content,
//             media_assets: mediaAsset // Add the full object for the ImageUpload component
//           }
//         };
//       }
//       return block; // Return 'text' or 'palette' blocks as-is
//     }))
//   };

//   return { data: cleanedData };
// }

// /**
//  * =================================================================
//  * Write Functions (Create / Update / Delete)
//  * =================================================================
//  */

// /**
//  * Deletes a project and ALL its related data and assets.
//  */
// export async function deleteProject(projectId) {
//   try {
//     // 1. Get all media IDs associated with this project
//     const { data: project, error: getError } = await supabase
//       .from('projects')
//       .select(`
//         hero_media_id,
//         detail_hero_media_id,
//         content:project_content_blocks ( content ),
//         gallery:project_gallery ( media_id )
//       `)
//       .eq('id', projectId)
//       .single();

//     if (getError) throw getError;
//     if (!project) throw new Error('Project not found');

//     const mediaIdsToDelete = [
//       project.hero_media_id,
//       project.detail_hero_media_id
//     ].filter(Boolean);
    
//     project.content.forEach(block => {
//       if (block.content?.media_id) { // Check if 'image' block and has media_id
//         mediaIdsToDelete.push(block.content.media_id);
//       }
//     });
//     project.gallery.forEach(item => {
//       if (item.media_id) mediaIdsToDelete.push(item.media_id);
//     });

//     // 2. Delete all junction/child table rows
//     // These can run in parallel
//     await Promise.all([
//       supabase.from('project_tool_links').delete().eq('project_id', projectId),
//       supabase.from('project_category_links').delete().eq('project_id', projectId),
//       supabase.from('project_content_blocks').delete().eq('project_id', projectId),
//       supabase.from('project_gallery').delete().eq('project_id', projectId),
//     ]);
    
//     // 3. Delete the main project row (must happen AFTER children)
//     await supabase.from('projects').delete().eq('id', projectId);

//     // 4. Clean up all media assets (pass unique IDs)
//     await deleteMediaAssets([...new Set(mediaIdsToDelete)]);

//     return { success: true };

//   } catch (error) {
//     console.error('Error deleting project:', error);
//     return { success: false, error };
//   }
// }


// /**
//  * Saves a project. This is a complex "transaction" that:
//  * 1. Uploads/Replaces main images.
//  * 2. Upserts the main `projects` row.
//  * 3. Syncs all related tables (tools, categories, content, gallery).
//  * 4. Cleans up orphaned media assets.
//  */
// export async function saveProject(projectData, userId) {
//   let mediaIdsToDelete = [];
  
//   try {
//     // --- 1. Separate main data from relations ---
//     const {
//       tools,
//       categories,
//       content,
//       gallery,
//       file_hero, // new file from react-hook-form
//       original_hero_media_id, // stored on file change
//       file_detail_hero,
//       original_detail_hero_media_id,
//       ...mainData
//     } = projectData;

//     // --- 2. Process Main Image Uploads ---
//     if (file_hero) {
//       const newMedia = await uploadMediaAsset(file_hero, userId);
//       mainData.hero_media_id = newMedia.id;
//       if (original_hero_media_id) mediaIdsToDelete.push(original_hero_media_id);
//     }
//     if (file_detail_hero) {
//       const newMedia = await uploadMediaAsset(file_detail_hero, userId);
//       mainData.detail_hero_media_id = newMedia.id;
//       if (original_detail_hero_media_id) mediaIdsToDelete.push(original_detail_hero_media_id);
//     }
    
//     // --- 3. Upsert main `projects` row ---
//     // Clean up joined data before save
//     delete mainData.hero_media;
//     delete mainData.detail_hero_media;
    
//     const { data: savedProject, error: projectError } = await supabase
//       .from('projects')
//       .upsert(mainData)
//       .select('id, slug') // Return slug in case it was auto-generated or changed
//       .single();
      
//     if (projectError) throw projectError;
//     const projectId = savedProject.id;
    
//     // --- 4. Sync all related tables in parallel ---
//     const [contentDeleteIds, galleryDeleteIds] = await Promise.all([
//       syncTools(projectId, tools || []),
//       syncCategories(projectId, categories || []),
//       syncContentBlocks(projectId, content || [], userId),
//       syncGallery(projectId, gallery || [], userId),
//     ]);
    
//     // --- 5. Consolidate and delete all orphaned media ---
//     mediaIdsToDelete.push(...(contentDeleteIds || []));
//     mediaIdsToDelete.push(...(galleryDeleteIds || []));
    
//     if (mediaIdsToDelete.length > 0) {
//       // Remove duplicates
//       await deleteMediaAssets([...new Set(mediaIdsToDelete)]);
//     }

//     return { success: true, data: savedProject };
    
//   } catch (error) {
//     console.error('Error saving project:', error);
//     return { success: false, error };
//   }
// }

// /**
//  * =================================================================
//  * Sync Helpers for `saveProject`
//  * =================================================================
//  */

// // --- Syncs many-to-many `project_tool_links` ---
// async function syncTools(projectId, tools) {
//   // 1. Delete all existing links for this project
//   await supabase.from('project_tool_links').delete().eq('project_id', projectId);
  
//   // 2. Insert new links
//   if (tools.length > 0) {
//     const links = tools.map(tool => ({
//       project_id: projectId,
//       tool_id: tool.id
//     }));
//     const { error } = await supabase.from('project_tool_links').insert(links);
//     if (error) throw error;
//   }
// }

// // --- Syncs many-to-many `project_category_links` ---
// async function syncCategories(projectId, categories) {
//   // 1. Delete all existing links
//   await supabase.from('project_category_links').delete().eq('project_id', projectId);
  
//   // 2. Insert new links
//   if (categories.length > 0) {
//     const links = categories.map(cat => ({
//       project_id: projectId,
//       category_id: cat.id
//     }));
//     const { error } = await supabase.from('project_category_links').insert(links);
//     if (error) throw error;
//   }
// }

// // --- Syncs one-to-many `project_content_blocks` ---
// async function syncContentBlocks(projectId, blocks, userId) {
//   let mediaIdsToDelete = [];
//   let processedBlocks = [];

//   // 1. Upload new files and prepare data
//   for (const [index, block] of blocks.entries()) {
//     let blockContent = { ...block.content }; // Copy the content JSONB
    
//     // Check for new file upload within a block
//     if (block.type === 'image' && block.file) {
//       const newMedia = await uploadMediaAsset(block.file, userId);
//       // Store just the media_id in the JSONB
//       blockContent.media_id = newMedia.id; 
//       if (block.originalMediaId) {
//         mediaIdsToDelete.push(block.originalMediaId);
//       }
//     }
    
//     // Clean up fields that are not part of the 'content' JSONB
//     delete blockContent.file;
//     delete blockContent.originalMediaId;
//     delete blockContent.media_assets; // This is joined data, not for saving

//     processedBlocks.push({
//       id: block.id || undefined, // undefined for new blocks
//       project_id: projectId,
//       type: block.type,
//       order: index,
//       content: blockContent, // This is the JSONB field
//     });
//   }
  
//   // 2. Upsert all blocks
//   const { data: savedBlocks, error } = await supabase
//     .from('project_content_blocks')
//     .upsert(processedBlocks)
//     .select('id');
    
//   if (error) throw error;

//   // 3. Delete orphaned blocks
//   const savedIds = savedBlocks.map(b => b.id).filter(Boolean);
//   const deleteQuery = supabase
//     .from('project_content_blocks')
//     .delete()
//     .eq('project_id', projectId);
    
//   if (savedIds.length > 0) {
//     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
//   }
  
//   await deleteQuery;
  
//   return mediaIdsToDelete;
// }

// // --- Syncs one-to-many `project_gallery` ---
// async function syncGallery(projectId, gallery, userId) {
//   let mediaIdsToDelete = [];
//   let processedItems = [];

//   // 1. Upload new files and prepare data
//   for (const [index, item] of gallery.entries()) {
//     let media_id = item.media_id;
    
//     if (item.file) {
//       const newMedia = await uploadMediaAsset(item.file, userId);
//       media_id = newMedia.id;
//       if (item.originalMediaId) {
//         mediaIdsToDelete.push(item.originalMediaId);
//       }
//     }
    
//     processedItems.push({
//       id: item.id || undefined,
//       project_id: projectId,
//       media_id: media_id,
//       order: index,
//     });
//   }

//   // 2. Upsert all gallery items
//   const { data: savedItems, error } = await supabase
//     .from('project_gallery')
//     .upsert(processedItems)
//     .select('id');
    
//   if (error) throw error;

//   // 3. Delete orphaned items
//   const savedIds = savedItems.map(i => i.id).filter(Boolean);
//   const deleteQuery = supabase
//     .from('project_gallery')
//     .delete()
//     .eq('project_id', projectId);
    
//   if (savedIds.length > 0) {
//     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
//   }
  
//   await deleteQuery;
  
//   return mediaIdsToDelete;
// }















import { supabase } from "../lib/supabaseClient";

/**
 * =================================================================================
 * Helper Functions
 * =================================================================================
 */

// Helper to generate a URL-safe slug from a title
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
};

// Helper to check for slug uniqueness and append a number if needed
const getUniqueSlug = async (title) => {
  let slug = slugify(title);
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const { data, error } = await supabase
      .from('projects')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (error && error.code === 'PGRST116') {
      // PGRST116: "The result contains 0 rows" - means the slug is unique
      isUnique = true;
    } else {
      // Slug exists, append number and check again
      slug = `${slugify(title)}-${counter}`;
      counter++;
    }
  }
  return slug;
};

// Helper to get public URL from Supabase Storage
export const getStorageUrl = (filePath) => {
  if (!filePath) return null;
  const { data } = supabase.storage.from('media').getPublicUrl(filePath);
  return data.publicUrl;
};

/**
 * =================================================================================
 * Media (Storage) Functions
 * =================================================================================
 */

/**
 * Uploads a file to Supabase Storage.
 * @param {File} file - The file to upload.
 * @returns {Promise<{ file_path: string, media_asset_id: string }>} - The storage path and the new media_assets ID.
 */
export const uploadMedia = async (file) => {
  if (!file) throw new Error("No file provided");

  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `public/${fileName}`;

  // 1. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw uploadError;
  }

  // 2. Insert into media_assets table
  const { data: mediaAsset, error: insertError } = await supabase
    .from('media_assets')
    .insert({
      file_path: filePath,
      file_type: file.type,
      alt_text: file.name,
    })
    .select('id, file_path')
    .single();

  if (insertError) {
    console.error('Media assets insert error:', insertError);
    // Try to delete the orphaned file from storage
    await supabase.storage.from('media').remove([filePath]);
    throw insertError;
  }

  return {
    file_path: mediaAsset.file_path,
    media_asset_id: mediaAsset.id,
  };
};

/**
 * Deletes media from Supabase Storage and the media_assets table.
 * @param {string} media_asset_id - The ID of the media asset to delete.
 */
export const deleteMedia = async (media_asset_id) => {
  // 1. Get file_path from media_assets
  const { data: mediaAsset, error: getError } = await supabase
    .from('media_assets')
    .select('file_path')
    .eq('id', media_asset_id)
    .single();

  if (getError || !mediaAsset) {
    console.error('Error finding media asset:', getError);
    throw new Error('Media asset not found.');
  }

  const { file_path } = mediaAsset;

  // 2. Delete from media_assets table (must be first due to FKs)
  // Note: This will fail if the media is still linked to a project.
  // We must first set the project's media_id to NULL before calling this.
  const { error: dbError } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', media_asset_id);

  if (dbError) {
    console.error('Error deleting media asset from table:', dbError);
    throw dbError;
  }

  // 3. Delete from Storage
  const { error: storageError } = await supabase.storage
    .from('media')
    .remove([file_path]);

  if (storageError) {
    console.error('Error deleting file from storage:', storageError);
    // The DB record is gone, but the file is orphaned. Log this.
  }

  return { success: true };
};


/**
 * =================================================================================
 * Admin Project List Page (AdminProjects.jsx)
 * =================================================================================
 */

/**
 * Fetches projects for the admin dashboard.
 * @param {string} searchQuery - Optional search term.
 */
export const getProjectAdminDashboard = async (searchQuery = '') => {
  let query = supabase
    .from('projects')
    .select(`
      id,
      slug,
      title,
      created_at,
      hero_media:media_assets!projects_hero_media_id_fkey ( file_path )
    `)
    .order('created_at', { ascending: false });

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching projects for admin:", error);
    return [];
  }

  // Flatten the hero_media path
  return data.map(p => ({
    ...p,
    hero_media_path: p.hero_media?.file_path || null
  }));
};

/**
 * Deletes a project and all its associated data.
 * This is a complex transaction-like operation.
 * @param {string} projectId - The UUID of the project to delete.
 */
export const deleteProject = async (projectId) => {
  try {
    // We must delete in the correct order to avoid foreign key violations.
    // 1. Delete links from join tables
    await supabase.from('project_category_links').delete().eq('project_id', projectId);
    await supabase.from('project_tool_links').delete().eq('project_id', projectId);

    // 2. Delete content blocks
    await supabase.from('project_content_blocks').delete().eq('project_id', projectId);
    
    // 3. Delete gallery items
    // We also need to delete the media from storage, but media_assets
    // might be shared. For now, just delete the link.
    // A more advanced system would check for media orphans.
    await supabase.from('project_gallery').delete().eq('project_id', projectId);

    // 4. Finally, delete the main project row
    const { error: projectDeleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (projectDeleteError) {
      console.error("Error deleting main project row:", projectDeleteError);
      throw projectDeleteError;
    }

    return { success: true };

  } catch (error) {
    console.error("Full delete operation failed:", error);
    return { success: false, error: error.message };
  }
};


/**
 * =================================================================================
 * Admin Project Editor Page (AdminProjectEditor.jsx)
 * =================================================================================
 */

/**
 * Fetches all data needed for the project editor.
 * @param {string} slug - The slug of the project to edit, or 'new'.
 */
export const getEditorData = async (slug) => {
  // 1. Get all available categories for dropdowns
  const { data: allCategories, error: catError } = await supabase
    .from('project_categories')
    .select('id, name');

  // 2. Get all available tools for dropdowns
  const { data: allTools, error: toolError } = await supabase
    .from('tools')
    .select('id, name');

  if (catError || toolError) {
    throw new Error("Failed to load categories or tools.");
  }

  // 3. If it's a new project, return early with just the dropdown data
  if (slug === 'new') {
    return {
      project: null,
      allCategories,
      allTools,
    };
  }

  // 4. If editing, fetch the specific project and all its relations
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select(`
      *,
      hero_media:media_assets!projects_hero_media_id_fkey ( id, file_path ),
      detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( id, file_path ),
      categories:project_categories ( id, name ),
      tools:tools ( id, name ),
      content:project_content_blocks ( * ),
      gallery:project_gallery (
        id,
        order,
        media:media_assets ( id, file_path )
      )
    `)
    .eq('slug', slug)
    .order('order', { referencedTable: 'project_content_blocks', ascending: true })
    .order('order', { referencedTable: 'project_gallery', ascending: true })
    .single();
    
  if (projectError) {
    if (projectError.code === 'PGRST116') throw new Error('Project not found');
    console.error("Error fetching project for editor:", projectError);
    throw projectError;
  }

  // 5. Clean and return all data
  return {
    project: {
      ...project,
      // Flatten media objects for react-hook-form
      hero_media_id: project.hero_media?.id || null,
      hero_media_path: project.hero_media?.file_path || null,
      detail_hero_media_id: project.detail_hero_media?.id || null,
      detail_hero_media_path: project.detail_hero_media?.file_path || null,
    },
    allCategories,
    allTools,
  };
};

/**
 * Saves (Creates or Updates) a project.
 * @param {object} formData - The complete form data from react-hook-form.
 * @param {string | null} existingProjectId - The ID of the project if updating, or null if creating.
 */
export const saveProject = async (formData, existingProjectId) => {
  const isCreating = !existingProjectId;
  
  // 1. Prepare main project data (from `projects` table)
  // We must separate the main data from the relational data.
  const {
    categories,
    tools,
    content,
    gallery,
    slug,
    hero_media_path,
    detail_hero_media_path,
    ...mainProjectData
  } = formData;

  let projectId = existingProjectId;
  let projectSlug = slug;

  try {
    // --- Step 2: Create or Update the main 'projects' row ---
    if (isCreating) {
      // Generate a unique slug for a new project
      projectSlug = await getUniqueSlug(mainProjectData.title);
      
      const { data: newProject, error } = await supabase
        .from('projects')
        .insert({
          ...mainProjectData,
          slug: projectSlug, // Use the unique slug
        })
        .select('id')
        .single();
        
    //   if (_) {
    //       console.error('Error inserting project', _);
    //       throw _;
    //   }
      projectId = newProject.id;

    } else {
      // Update existing project
      const { error } = await supabase
        .from('projects')
        .update({
          ...mainProjectData,
          slug: projectSlug, // Allow slug update
        })
        .eq('id', projectId);
        
    //   if (_) {
    //       console.error('Error updating project', _);
    //       throw _;
    //   }
    }

    // --- Step 3: Update Join Tables (Categories & Tools) ---
    // Easiest way is to delete all and re-insert.
    
    // Categories
    await supabase.from('project_category_links').delete().eq('project_id', projectId);
    if (categories && categories.length > 0) {
      const categoryLinks = categories.map(cat => ({
        project_id: projectId,
        category_id: cat.id,
      }));
      await supabase.from('project_category_links').insert(categoryLinks);
    }
    
    // Tools
    await supabase.from('project_tool_links').delete().eq('project_id', projectId);
    if (tools && tools.length > 0) {
      const toolLinks = tools.map(tool => ({
        project_id: projectId,
        tool_id: tool.id,
      }));
      await supabase.from('project_tool_links').insert(toolLinks);
    }

    // --- Step 4: Update Content Blocks ---
    // Delete all and re-insert to handle order, deletion, and creation.
    await supabase.from('project_content_blocks').delete().eq('project_id', projectId);
    if (content && content.length > 0) {
      const contentBlocks = content.map((block, index) => ({
        project_id: projectId,
        type: block.type,
        order: index,
        content: block.content, // The `content` field is already a JSONB object
      }));
      await supabase.from('project_content_blocks').insert(contentBlocks);
    }
    
    // --- Step 5: Update Gallery ---
    // Delete all and re-insert.
    await supabase.from('project_gallery').delete().eq('project_id', projectId);
    if (gallery && gallery.length > 0) {
      const galleryItems = gallery.map((item, index) => ({
        project_id: projectId,
        media_id: item.media.id, // We store the media object in the form
        order: index,
      }));
      await supabase.from('project_gallery').insert(galleryItems);
    }

    return { success: true, projectSlug: projectSlug };

  } catch (error) {
    console.error("Full save operation failed:", error);
    return { success: false, error: error.message };
  }
};