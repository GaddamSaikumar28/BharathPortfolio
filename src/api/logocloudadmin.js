

import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Public URL Helper
 * =================================================================
 */

/**
 * Gets the public URL for a media asset.
 * @param {object} mediaAsset - The media_assets object (must have file_path)
 * @returns {string|null} - The public URL or null.
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
 * Fetches all logos for the admin panel.
 * @returns {Array} - A list of logo objects.
 */
export async function getLogoCloudAdmin() {
  try {
    const { data, error } = await supabase
      .from('logo_cloud')
      .select(`
        *,
        media_assets ( id, file_path, alt_text )
      `)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin logo cloud:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on logo_cloud and media_assets tables.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToLogoCloudChanges = (callback) => {
  const tables = ['logo_cloud', 'media_assets'];
  
  const channels = tables.map(table => 
    onTableChange(table, (payload) => {
      console.log(`Change detected on ${table}`, payload);
      callback(); // Call the same callback for any change
    })
  );

  return {
    unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
  };
};

/**
 * =================================================================
 * Update (Order Only)
 * =================================================================
 */

/**
 * Updates the 'order' field for a list of logos.
 * @param {Array} logos - The array of logo objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateLogoCloudOrder(logos) {
  try {
    const updates = logos.map((logo, index) => ({
      id: logo.id,
      order: index,
    }));

    const { error } = await supabase.from('logo_cloud').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating logo order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes a logo and its associated media asset (if any).
 * @param {object} logo - The logo object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteLogo(logo) {
  try {
    // 1. Delete the logo_cloud row
    const { error: deleteError } = await supabase
      .from('logo_cloud')
      .delete()
      .eq('id', logo.id);
      
    if (deleteError) throw deleteError;

    // 2. If it had a media_id, delete the associated asset
    if (logo.media_id) {
      await deleteMediaAssets([logo.media_id]);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting logo:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single logo (creates or updates).
 * Handles file uploads and replacements.
 * @param {object} logoData - The form data for the logo.
 * @param {string} userId - The ID of the authenticated user.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveLogo(logoData, userId) {
  if (!userId) {
    return { success: false, error: { message: 'User not authenticated.' }};
  }

  try {
    // 1. Process any file uploads
    const { logoToSave, mediaIdsToDelete } = await processLogoUpload(logoData, userId);

    // 2. Upsert the logo_cloud record
    // ---
    // --- BUG FIX #2 IS HERE ---
    // ---
    // We remove media_assets, file, AND originalMediaId as they are not columns
    const { media_assets, file, originalMediaId, ...dbData } = logoToSave;
    
    const { data, error } = await supabase
      .from('logo_cloud')
      .upsert(dbData) // dbData now only contains fields that exist in the table
      .select()
      .single();

    if (error) throw error;

    // 3. Clean up any replaced/deleted assets
    if (mediaIdsToDelete.length > 0) {
      await deleteMediaAssets(mediaIdsToDelete);
    }
    
    return { success: true, data };

  } catch (error) {
    console.error('Error saving logo:', error.message);
    return { success: false, error };
  }
}


/**
 * =================================================================
 * Helper Functions (Copied from heroadmin.js, verified)
 * =================================================================
 */

/**
 * Handles uploading a new logo file if one is present.
 * @param {object} logoData - The form data.
 * @param {string} userId - The user ID.
 * @returns {object} - { logoToSave, mediaIdsToDelete }
 */
async function processLogoUpload(logoData, userId) {
  let logoToSave = { ...logoData };
  const mediaIdsToDelete = [];
  
  // Case 1: A new file was uploaded
  if (logoData.file) {
    // ---
    // --- BUG FIX #1 IS HERE ---
    // ---
    // uploadMediaAsset returns the data object directly, not wrapped in a 'data' key
    const newMediaAsset = await uploadMediaAsset(logoData.file, userId);
    // --- END FIX ---
    
    // This line will now work, as newMediaAsset is { id: '...', ... }
    logoToSave.media_id = newMediaAsset.id;
    
    // If this upload replaced an existing image, mark old one for deletion
    if (logoData.originalMediaId) {
      mediaIdsToDelete.push(logoData.originalMediaId);
    }
  }
  
  // Case 2: The "Remove Image" button was clicked
  // `media_id` is set to null, and `originalMediaId` has the ID of the file to delete.
  if (logoData.media_id === null && logoData.originalMediaId) {
    mediaIdsToDelete.push(logoData.originalMediaId);
  }

  return { logoToSave, mediaIdsToDelete };
}

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
  return data; // This returns the object { id: '...', file_path: '...' }
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