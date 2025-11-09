import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Public URL Helper
 * =================================================================
 */
export const getStorageUrl = (mediaAsset) => {
  if (!mediaAsset?.file_path) return null;
  if (mediaAsset.file_path.startsWith('http')) {
    return mediaAsset.file_path;
  }
  const { data } = supabase.storage
    .from('media') // Use the 'media' bucket
    .getPublicUrl(mediaAsset.file_path);

  if (!data || !data.publicUrl) {
    console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
    return null;
  }
  return data.publicUrl;
};

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches the single parallax project row.
 * @returns {object} - The parallax project object.
 */
export async function getParallaxProjectAdmin() {
  try {
    const { data, error } = await supabase
      .from('parallax_project')
      .select(`
        *,
        media_id (*),
        logo_media_id (*)
      `)
      .eq('id', 1) // This is a singleton table
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching parallax project:', error.message);
    return null;
  }
}

/**
 * Subscribes to changes on parallax_project and media_assets tables.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToParallaxChanges = (callback) => {
  const tables = ['parallax_project', 'media_assets'];
  
  const channels = tables.map(table => 
    onTableChange(table, (payload) => {
      console.log(`Change detected on ${table}`, payload);
      callback();
    })
  );

  return {
    unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
  };
};

/**
 * =================================================================
 * Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves the parallax project data.
 * Handles two separate file uploads.
 * @param {object} formData - The form data for the item.
 * @param {string} userId - The ID of the authenticated user.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveParallaxProject(formData, userId) {
  if (!userId) {
    return { success: false, error: { message: 'User not authenticated.' }};
  }

  try {
    let dbData = { ...formData }; // Copy form data
    const mediaIdsToDelete = [];

    // --- 1. Handle Main Image Upload ---
    if (dbData.file_main) {
      const newMedia = await uploadMediaAsset(dbData.file_main, userId);
      dbData.media_id = newMedia.id; // Set new media_id
      if (dbData.original_media_id) {
        mediaIdsToDelete.push(dbData.original_media_id);
      }
    } else if (dbData.media_id === null && dbData.original_media_id) {
      // Handle removal
      mediaIdsToDelete.push(dbData.original_media_id);
    }

    // --- 2. Handle Logo Image Upload ---
    if (dbData.file_logo) {
      const newLogoMedia = await uploadMediaAsset(dbData.file_logo, userId);
      dbData.logo_media_id = newLogoMedia.id; // Set new logo_media_id
      if (dbData.original_logo_media_id) {
        mediaIdsToDelete.push(dbData.original_logo_media_id);
      }
    } else if (dbData.logo_media_id === null && dbData.original_logo_media_id) {
      // Handle removal
      mediaIdsToDelete.push(dbData.original_logo_media_id);
    }

    // --- 3. Clean up helper fields before upsert ---
    delete dbData.file_main;
    delete dbData.file_logo;
    delete dbData.original_media_id;
    delete dbData.original_logo_media_id;
    delete dbData['media_id(*)']; // Remove joined data
    delete dbData['logo_media_id(*)']; // Remove joined data
    
    // --- 4. Upsert the parallax_project record ---
    const { data, error } = await supabase
      .from('parallax_project')
      .upsert(dbData) // This will update the row with id=1
      .select()
      .single();

    if (error) throw error;

    // --- 5. Clean up any replaced/deleted assets ---
    if (mediaIdsToDelete.length > 0) {
      await deleteMediaAssets(mediaIdsToDelete);
    }
    
    return { success: true, data };

  } catch (error) {
    console.error('Error saving parallax project:', error.message);
    return { success: false, error };
  }
}


/**
 * =================================================================
 * Helper Functions (Reused)
 * =================================================================
 */

/**
 * Uploads a file to the 'media' bucket and creates a media_assets record.
 * @param {File} file - The file to upload.
 * @param {string} userId - The user ID.
 * @returns {object} - The new media_assets record.
 */
async function uploadMediaAsset(file, userId) {
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
  const fileName = `${Date.now()}-${cleanFileName}`;
  const filePath = `public/${fileName}`; // Save to public folder in 'media' bucket

  const { error: uploadError } = await supabase.storage
    .from('media') // Use the 'media' bucket
    .upload(filePath, file);
    
  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase
    .from('media_assets')
    .insert({
      file_path: filePath,
      file_type: file.type,
      alt_text: file.name,
      uploaded_by: userId,
    })
    .select('id, file_path')
    .single();
    
  if (insertError) throw insertError;
  return data;
}

/**
 * Deletes files from storage and records from media_assets table.
 * @param {Array<string>} mediaIds - An array of media_asset UUIDs to delete.
 */
async function deleteMediaAssets(mediaIds) {
  if (!mediaIds || mediaIds.length === 0) return;
  
  const { data: assets, error: selectError } = await supabase
    .from('media_assets')
    .select('id, file_path')
    .in('id', mediaIds);
    
  if (selectError) {
    console.error('Error selecting media assets for deletion:', selectError);
    return;
  }

  const filePaths = assets.map(a => a.file_path).filter(Boolean);

  if (filePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from('media') // Use the 'media' bucket
      .remove(filePaths);
    if (storageError) {
      console.error('Error deleting from storage:', storageError);
    }
  }
  
  const { error: dbError } = await supabase
    .from('media_assets')
    .delete()
    .in('id', mediaIds);
    
  if (dbError) {
    console.error('Error deleting from media_assets table:', dbError);
  }
}