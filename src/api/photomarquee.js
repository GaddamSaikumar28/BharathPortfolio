import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper
import { v4 as uuidv4 } from 'uuid';

/**
 * =================================================================
 * Storage & Media Asset Helpers
 * (Replicated from your logocloudadmin.js example)
 * =================================================================
 */

const STORAGE_BUCKET = 'media';
const PUBLIC_FOLDER = 'public';

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
    .from(STORAGE_BUCKET)
    .getPublicUrl(mediaAsset.file_path);

  if (!data || !data.publicUrl) {
    console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
    return null;
  }
  return data.publicUrl;
};

/**
 * Uploads a file, creates a media_assets record, and returns the new asset.
 * @param {File} file - The file to upload.
 * @param {string} userId - The auth user ID.
 * @returns {object} - The newly created media_assets object (id, file_path).
 */
async function uploadFileAndCreateAsset(file, userId) {
  if (!file || !userId) throw new Error('File and UserID are required.');

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${PUBLIC_FOLDER}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
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

  const filePaths = assets.map((a) => a.file_path).filter(Boolean);

  if (filePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(filePaths);
    if (storageError) {
      console.error('Error deleting from storage:', storageError);
      // Don't stop; still try to delete from DB
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

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches all marquee photos for the admin panel.
 * @returns {Array} - A list of photo objects.
 */
export async function getPhotoMarqueeAdmin() {
  try {
    const { data, error } = await supabase
      .from('photo_marquee')
      .select(
        `
        *,
        media_assets ( id, file_path, alt_text )
      `
      )
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching marquee photos:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on the photo_marquee table.
 * @param {Function} callback - Function to run when a change occurs.
 * @returns {Object} - The Supabase subscription channel.
 */
export const subscribeToPhotoMarqueeChanges = (callback) => {
  return onTableChange('photo_marquee', callback);
};

/**
 * =================================================================
 * Write (CUD)
 * =================================================================
 */

/**
 * Updates the 'order' for a list of photos in a specific row.
 * @param {Array<object>} photos - The reordered list of photos for ONE row.
 * @param {number} row - The marquee_row (1 or 2) being updated.
 */
export async function updatePhotoMarqueeOrder(photos, row) {
  if (!photos) return;

  const updates = photos.map((photo, index) => ({
    id: photo.id,
    order: index,
    marquee_row: row, // Ensure row is set correctly
  }));

  try {
    const { error } = await supabase
      .from('photo_marquee')
      .upsert(updates);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating marquee order:', error.message);
    return false;
  }
}

/**
 * Saves (inserts or updates) a photo marquee item.
 * Handles file upload and replacement logic.
 * @param {object} itemData - The form data { id, marquee_row, newFile, media_id }.
 * @param {string} userId - The auth user ID.
 * @returns {object} - The saved item.
 */
export async function savePhotoMarqueeItem(itemData, userId) {
  const { id, marquee_row, newFile, media_id } = itemData;
  let newMediaId = media_id; // Keep the existing media_id by default
  let oldMediaIdToDelete = null;

  try {
    // 1. If there's a new file, upload it.
    if (newFile) {
      const newAsset = await uploadFileAndCreateAsset(newFile, userId);
      newMediaId = newAsset.id; // Set the media_id to the new asset
      if (id && media_id) {
        // This is an UPDATE and we are replacing an old file
        oldMediaIdToDelete = media_id;
      }
    }

    // 2. Prepare the data for the photo_marquee table
    const dataToSave = {
      marquee_row: parseInt(marquee_row, 10),
      media_id: newMediaId,
    };

    let savedItem;

    if (id) {
      // UPDATE existing item
      const { data, error } = await supabase
        .from('photo_marquee')
        .update(dataToSave)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      savedItem = data;
    } else {
      // INSERT new item
      const { data, error } = await supabase
        .from('photo_marquee')
        .insert(dataToSave)
        .select()
        .single();
      if (error) throw error;
      savedItem = data;
    }

    // 3. Clean up old media asset if one was replaced
    if (oldMediaIdToDelete) {
      await deleteMediaAssets([oldMediaIdToDelete]);
    }

    return savedItem;
  } catch (error) {
    console.error('Error saving marquee item:', error.message);
    // If upload succeeded but save failed, we should try to delete the orphaned asset
    if (newMediaId && !oldMediaIdToDelete) {
      // This was a new upload that failed to save, clean it up
      await deleteMediaAssets([newMediaId]);
    }
    throw error; // Re-throw for the form to catch
  }
}

/**
 * Deletes a photo marquee item.
 * Also deletes its associated media_asset and storage file.
 * @param {object} item - The item to delete { id, media_assets }.
 */
export async function deletePhotoMarqueeItem(item) {
  if (!item || !item.id) return;

  try {
    // 1. Delete the item from photo_marquee table
    const { error } = await supabase
      .from('photo_marquee')
      .delete()
      .eq('id', item.id);

    if (error) throw error;

    // 2. Delete the associated media asset (if it exists)
    if (item.media_assets?.id) {
      await deleteMediaAssets([item.media_assets.id]);
    }

    return true;
  } catch (error) {
    console.error('Error deleting marquee item:', error.message);
    throw error;
  }
}