import { supabase } from '../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_BUCKET = 'media';

/**
 * =================================================================
 * Shared Media Helpers (Self-contained for robustness)
 * =================================================================
 */

// Helper to get public URL
export const getStorageUrl = (mediaAsset) => {
  if (!mediaAsset?.file_path) return null;
  if (mediaAsset.file_path.startsWith('http')) return mediaAsset.file_path;
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(mediaAsset.file_path);
  return data?.publicUrl || null;
};

// Upload file & create media_assets record
async function uploadFileAndCreateAsset(file, userId) {
  const fileExt = file.name.split('.').pop();
  const filePath = `iphone-showcase/${uuidv4()}.${fileExt}`;

  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file);
  if (uploadError) throw uploadError;

  // 2. Insert into media_assets
  const { data: assetData, error: assetError } = await supabase
    .from('media_assets')
    .insert({
      file_path: filePath,
      file_type: file.type,
      alt_text: file.name, // Default alt text
      uploaded_by: userId,
    })
    .select()
    .single();

  if (assetError) {
    // Cleanup storage if DB insert fails
    await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
    throw assetError;
  }

  return assetData;
}

// Delete media assets & storage files
async function deleteMediaAssets(mediaIds) {
  if (!mediaIds || mediaIds.length === 0) return;

  // 1. Get file paths
  const { data: assets } = await supabase
    .from('media_assets')
    .select('file_path')
    .in('id', mediaIds);

  if (assets && assets.length > 0) {
    const filePaths = assets.map((a) => a.file_path);
    // 2. Remove from Storage
    await supabase.storage.from(STORAGE_BUCKET).remove(filePaths);
  }

  // 3. Delete from DB
  await supabase.from('media_assets').delete().in('id', mediaIds);
}

/**
 * =================================================================
 * iPhone Showcase Logic
 * =================================================================
 */

// Fetch all items
export const fetchIphoneShowcaseItems = async () => {
  const { data, error } = await supabase
    .from('iphone_showcase_items')
    .select(`
      *,
      media_assets ( id, file_path, alt_text )
    `)
    .order('order', { ascending: true });

  if (error) throw error;
  return data;
};

// Save (Create or Update) Item
export const saveIphoneShowcaseItem = async (itemData, file) => {
  const { id, title, description, order, currentMediaId } = itemData;
  const user = (await supabase.auth.getUser()).data.user;

  let newMediaId = currentMediaId;
  let oldMediaIdToDelete = null;

  try {
    // 1. Handle File Upload if a new file is provided
    if (file) {
      const asset = await uploadFileAndCreateAsset(file, user?.id);
      newMediaId = asset.id;
      // If we are replacing an image, mark the old one for deletion
      if (currentMediaId) {
        oldMediaIdToDelete = currentMediaId;
      }
    }

    // 2. Prepare Payload
    const payload = {
      title,
      description,
      order: parseInt(order || 0),
      media_id: newMediaId,
    };

    let savedItem;

    if (id) {
      // UPDATE existing
      const { data, error } = await supabase
        .from('iphone_showcase_items')
        .update(payload)
        .eq('id', id)
        .select(`*, media_assets(*)`)
        .single();
      if (error) throw error;
      savedItem = data;
    } else {
      // INSERT new
      const { data, error } = await supabase
        .from('iphone_showcase_items')
        .insert(payload)
        .select(`*, media_assets(*)`)
        .single();
      if (error) throw error;
      savedItem = data;
    }

    // 3. Cleanup old media if replacement happened
    if (oldMediaIdToDelete) {
      await deleteMediaAssets([oldMediaIdToDelete]);
    }

    return savedItem;

  } catch (error) {
    console.error('Error in saveIphoneShowcaseItem:', error);
    // If we uploaded a new file but failed to save the record, clean up the orphan
    if (file && newMediaId && newMediaId !== currentMediaId) {
      await deleteMediaAssets([newMediaId]);
    }
    throw error;
  }
};

// Delete Item
export const deleteIphoneShowcaseItem = async (id, mediaId) => {
  // 1. Delete the row
  const { error } = await supabase
    .from('iphone_showcase_items')
    .delete()
    .eq('id', id);

  if (error) throw error;

  // 2. Delete the associated media
  if (mediaId) {
    await deleteMediaAssets([mediaId]);
  }
};

// Reorder Items
export const reorderIphoneShowcaseItems = async (items) => {
  // items should be [{ id: 1, order: 1 }, { id: 2, order: 2 }...]
  const updates = items.map((item) => 
    supabase
      .from('iphone_showcase_items')
      .update({ order: item.order })
      .eq('id', item.id)
  );
  await Promise.all(updates);
};

