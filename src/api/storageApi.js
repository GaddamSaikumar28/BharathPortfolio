import { supabase } from "../lib/supabaseClient";

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * @param {string} bucketName - The name of the storage bucket (e.g., 'media').
 * @param {File} file - The file object from an <input>.
 * @param {string} [path] - Optional path/folder within the bucket.
 * @returns {Promise<{publicUrl: string, filePath: string}>} - The public URL and storage path.
 */
export const uploadFile = async (bucketName, file, path = 'public') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error } = await supabase.storage.from(bucketName).upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  // Get public URL
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  if (!data.publicUrl) {
    console.error('Error getting public URL');
    throw new Error('Error getting public URL');
  }

  return { publicUrl: data.publicUrl, filePath: filePath };
};

/**
 * Deletes a file from Supabase Storage.
 * @param {string} bucketName - The name of the storage bucket.
 * @param {string} filePath - The full path to the file in storage.
 * @returns {Promise<boolean>} - True if successful.
 */
export const removeFile = async (bucketName, filePath) => {
  if (!filePath) return true; // Nothing to remove

  const { error } = await supabase.storage.from(bucketName).remove([filePath]);

  if (error) {
    console.error('Error removing file:', error);
    // Don't throw, just log. Maybe the file was already deleted.
    return false;
  }

  return true;
};

/**
 * Updates a file: Uploads the new one and deletes the old one.
 * @param {string} bucketName - The name of the storage bucket.
 *R @param {string | null} oldFilePath - The path of the file to be replaced.
 * @param {File} newFile - The new file to upload.
 * @param {string} [path] - Optional path/folder.
 * @returns {Promise<{publicUrl: string, filePath: string}>} - The new file's URL and path.
 */
export const updateFile = async (
  bucketName,
  oldFilePath,
  newFile,
  path = 'public'
) => {
  // 1. Upload the new file
  const { publicUrl, filePath } = await uploadFile(bucketName, newFile, path);

  // 2. If upload is successful, delete the old file
  if (oldFilePath) {
    await removeFile(bucketName, oldFilePath);
  }

  // 3. Return the new file details
  return { publicUrl, filePath };
};

/**
 * Creates a new record in the media_assets table.
 * @param {string} filePath - The path from storage.
 * @param {string} fileType - The MIME type.
 * @param {string} altText - The alt text.
 * @param {string} [userId] - Optional ID of the uploading user.
 * @returns {Promise<Object>} - The newly created media_asset record.
 */
// export const createMediaAsset = async (filePath, fileType, altText, userId) => {
//   const { data, error } = await supabase
//     .from('media_assets')
//     .insert({
//       file_path: filePath,
//       file_type: fileType,
//       alt_text: altText,
//       uploaded_by: userId || null,
//     })
//     .select()
//     .single();

//   if (error) {
//     console.error('Error creating media asset:', error);
//     throw error;
//   }
//   return data;
// };
export const createMediaAsset = async (filePath, fileType, altText, userId) => {
  const { data, error } = await supabase
    .from('media_assets')
    .insert({
      file_path: filePath,
      file_type: fileType,
      alt_text: altText,
      uploaded_by: userId || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating media asset:', error);
    throw error;
  }
  
  // This now correctly returns the new asset object
  return data;
};