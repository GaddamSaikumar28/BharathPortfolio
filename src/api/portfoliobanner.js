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
 * Fetches all portfolio banners for the admin panel.
 * @returns {Array} - A list of banner objects.
 */
export async function getPortfolioBannersAdmin() {
  try {
    const { data, error } = await supabase
      .from('portfolio_banners')
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
    console.error('Error fetching portfolio banners:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on the portfolio_banners table.
 * @param {Function} callback - Function to run when a change occurs.
 * @returns {Object} - The Supabase subscription channel.
 */
export const subscribeToPortfolioBannerChanges = (callback) => {
  return onTableChange('portfolio_banners', callback);
};

/**
 * =================================================================
 * Write (CUD)
 * =================================================================
 */

/**
 * Updates the 'order' for a list of portfolio banners.
 * @param {Array<object>} banners - The reordered list of banners.
 */
export async function updatePortfolioBannerOrder(banners) {
  if (!banners) return;

  const updates = banners.map((banner, index) => ({
    id: banner.id,
    order: index,
  }));

  try {
    const { error } = await supabase
      .from('portfolio_banners')
      .upsert(updates);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating banner order:', error.message);
    return false;
  }
}

/**
 * Saves (inserts or updates) a portfolio banner item.
 * Handles file upload and replacement logic.
 * @param {object} itemData - The form data { id, title, description, ... newFile, media_id }.
 * @param {string} userId - The auth user ID.
 * @returns {object} - The saved item.
 */
export async function savePortfolioBanner(itemData, userId) {
  const {
    id,
    title,
    description,
    button_text,
    link_href,
    newFile,
    media_id,
  } = itemData;
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

    // 2. Prepare the data for the portfolio_banners table
    const dataToSave = {
      title,
      description,
      button_text,
      link_href,
      media_id: newMediaId,
    };

    let savedItem;

    if (id) {
      // UPDATE existing item
      const { data, error } = await supabase
        .from('portfolio_banners')
        .update(dataToSave)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      savedItem = data;
    } else {
      // INSERT new item
      // Get max order
      const { data: maxOrderData, error: maxOrderError } = await supabase
        .from('portfolio_banners')
        .select('order')
        .order('order', { ascending: false })
        .limit(1)
        .single();
      
      if (maxOrderError && maxOrderError.code !== 'PGRST116') { // Ignore "no rows" error
          throw maxOrderError;
      }

      dataToSave.order = (maxOrderData?.order || 0) + 1;

      const { data, error } = await supabase
        .from('portfolio_banners')
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
    console.error('Error saving banner:', error.message);
    // If upload succeeded but save failed, we should try to delete the orphaned asset
    if (newMediaId && !oldMediaIdToDelete) {
      // This was a new upload that failed to save, clean it up
      await deleteMediaAssets([newMediaId]);
    }
    throw error; // Re-throw for the form to catch
  }
}

/**
 * Deletes a portfolio banner item.
 * Also deletes its associated media_asset and storage file.
 * @param {object} item - The item to delete { id, media_assets }.
 */
export async function deletePortfolioBanner(item) {
  if (!item || !item.id) return;

  try {
    // 1. Delete the item from portfolio_banners table
    const { error } = await supabase
      .from('portfolio_banners')
      .delete()
      .eq('id', item.id);

    if (error) throw error;

    // 2. Delete the associated media asset (if it exists)
    if (item.media_assets?.id) {
      await deleteMediaAssets([item.media_assets.id]);
    }

    return true;
  } catch (error) {
    console.error('Error deleting banner:', error.message);
    throw error;
  }
}