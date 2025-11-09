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
 * Fetches all bento items for the admin panel.
 * @returns {Array} - A list of bento item objects.
 */
export async function getBentoAdmin() {
  try {
    const { data, error } = await supabase
      .from('bento_items')
      .select(`
        *,
        media_assets ( id, file_path, alt_text )
      `)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin bento items:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on bento_items and media_assets tables.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToBentoChanges = (callback) => {
  const tables = ['bento_items', 'media_assets'];
  
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
 * Updates the 'order' field for a list of bento items.
 * @param {Array} items - The array of bento item objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateBentoOrder(items) {
  try {
    const updates = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    const { error } = await supabase.from('bento_items').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating bento order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes a bento item and its associated media asset (if any).
 * @param {object} item - The bento item object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteBentoItem(item) {
  try {
    // 1. Delete the bento_items row
    const { error: deleteError } = await supabase
      .from('bento_items')
      .delete()
      .eq('id', item.id);
      
    if (deleteError) throw deleteError;

    // 2. If it had a media_id, delete the associated asset
    if (item.media_id) {
      await deleteMediaAssets([item.media_id]);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting bento item:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single bento item (creates or updates).
 * Handles file uploads and replacements.
 * @param {object} itemData - The form data for the item.
 * @param {string} userId - The ID of the authenticated user.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveBentoItem(itemData, userId) {
  if (!userId) {
    return { success: false, error: { message: 'User not authenticated.' }};
  }

  try {
    // 1. Process any file uploads
    const { itemToSave, mediaIdsToDelete } = await processBentoUpload(itemData, userId);

    // 2. Upsert the bento_items record
    // We remove media_assets, file, and originalMediaId as they are not columns
    const { media_assets, file, originalMediaId, ...dbData } = itemToSave;
    
    const { data, error } = await supabase
      .from('bento_items')
      .upsert(dbData)
      .select()
      .single();

    if (error) throw error;

    // 3. Clean up any replaced/deleted assets
    if (mediaIdsToDelete.length > 0) {
      await deleteMediaAssets(mediaIdsToDelete);
    }
    
    return { success: true, data };

  } catch (error) {
    console.error('Error saving bento item:', error.message);
    return { success: false, error };
  }
}


/**
 * =================================================================
 * Helper Functions (Reused from previous APIs)
 * =================================================================
 */

/**
 * Handles uploading a new background image file if one is present.
 * @param {object} itemData - The form data.
 * @param {string} userId - The user ID.
 * @returns {object} - { itemToSave, mediaIdsToDelete }
 */
async function processBentoUpload(itemData, userId) {
  let itemToSave = { ...itemData };
  const mediaIdsToDelete = [];
  
  // Case 1: A new file was uploaded
  if (itemData.file) {
    const newMediaAsset = await uploadMediaAsset(itemData.file, userId);
    
    // Set the new media_id for saving
    itemToSave.media_id = newMediaAsset.id;
    
    // If this upload replaced an existing image, mark old one for deletion
    if (itemData.originalMediaId) {
      mediaIdsToDelete.push(itemData.originalMediaId);
    }
  }
  
  // Case 2: The "Remove Image" button was clicked
  if (itemData.media_id === null && itemData.originalMediaId) {
    mediaIdsToDelete.push(itemData.originalMediaId);
  }

  return { itemToSave, mediaIdsToDelete };
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