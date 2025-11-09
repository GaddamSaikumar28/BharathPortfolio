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
 * Fetches all blog posts for the admin panel.
 * @returns {Array} - A list of blog post objects.
 */
export async function getBlogAdmin() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        media_assets ( id, file_path, alt_text )
      `)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin blog posts:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on blog_posts and media_assets tables.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToBlogChanges = (callback) => {
  const tables = ['blog_posts', 'media_assets'];
  
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
 * Updates the 'order' field for a list of blog posts.
 * @param {Array} posts - The array of post objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateBlogOrder(posts) {
  try {
    const updates = posts.map((post, index) => ({
      id: post.id,
      order: index,
    }));

    const { error } = await supabase.from('blog_posts').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating blog post order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes a blog post and its associated media asset (if any).
 * @param {object} post - The post object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteBlogPost(post) {
  try {
    // 1. Delete the blog_posts row
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', post.id);
      
    if (deleteError) throw deleteError;

    // 2. If it had a media_id, delete the associated asset
    if (post.media_id) {
      await deleteMediaAssets([post.media_id]);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog post:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single blog post (creates or updates).
 * Handles file uploads and replacements.
 * @param {object} postData - The form data for the post.
 * @param {string} userId - The ID of the authenticated user.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveBlogPost(postData, userId) {
  if (!userId) {
    return { success: false, error: { message: 'User not authenticated.' }};
  }

  try {
    // 1. Process any file uploads
    const { postToSave, mediaIdsToDelete } = await processBlogUpload(postData, userId);

    // 2. Upsert the blog_posts record
    // We remove media_assets, file, and originalMediaId as they are not columns
    const { media_assets, file, originalMediaId, ...dbData } = postToSave;
    
    const { data, error } = await supabase
      .from('blog_posts')
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
    console.error('Error saving blog post:', error.message);
    return { success: false, error };
  }
}


/**
 * =================================================================
 * Helper Functions (Reused from previous APIs)
 * =================================================================
 */

/**
 * Handles uploading a new cover image file if one is present.
 * @param {object} postData - The form data.
 * @param {string} userId - The user ID.
 * @returns {object} - { postToSave, mediaIdsToDelete }
 */
async function processBlogUpload(postData, userId) {
  let postToSave = { ...postData };
  const mediaIdsToDelete = [];
  
  // Case 1: A new file was uploaded
  if (postData.file) {
    const newMediaAsset = await uploadMediaAsset(postData.file, userId);
    
    // Set the new media_id for saving
    postToSave.media_id = newMediaAsset.id;
    
    // If this upload replaced an existing image, mark old one for deletion
    if (postData.originalMediaId) {
      mediaIdsToDelete.push(postData.originalMediaId);
    }
  }
  
  // Case 2: The "Remove Image" button was clicked
  if (postData.media_id === null && postData.originalMediaId) {
    mediaIdsToDelete.push(postData.originalMediaId);
  }

  return { postToSave, mediaIdsToDelete };
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