// // // // // // // // // // // import { supabase } from './supabase';
// // // // // // // // // // import { supabase } from '../lib/supabaseClient';
// // // // // // // // // // // import { uploadFile, removeFile } from './storage'; // Import your storage functions
// // // // // // // // // // // import { onTableChange } from './homepage'; // Import your real-time helper
// // // // // // // // // // import { uploadFile, removeFile } from './storageApi'; // Import your storage functions
// // // // // // // // // // import { onTableChange } from './homepage'; // Import your real-time helper
// // // // // // // // // // /**
// // // // // // // // // //  * Fetches ALL hero variants for the admin panel (both active and inactive).
// // // // // // // // // //  * This is different from the public 'fetchHeroVariants' which only gets active ones.
// // // // // // // // // //  */
// // // // // // // // // // export const getHeroVariantsAdmin = async () => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { data, error } = await supabase
// // // // // // // // // //       .from('hero_variants')
// // // // // // // // // //       .select(`
// // // // // // // // // //         *,
// // // // // // // // // //         hero_variant1_icons (*),
// // // // // // // // // //         hero_variant2_photos (
// // // // // // // // // //           *,
// // // // // // // // // //           media_assets ( id, file_path, alt_text )
// // // // // // // // // //         )
// // // // // // // // // //       `)
// // // // // // // // // //       .order('"order"', { ascending: true });

// // // // // // // // // //     if (error) throw error;
// // // // // // // // // //     return data;
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Error fetching admin hero variants:', error.message);
// // // // // // // // // //     return [];
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // /**
// // // // // // // // // //  * Subscribes to all changes in the hero-related tables for real-time admin updates.
// // // // // // // // // //  */
// // // // // // // // // // export const subscribeToHeroChanges = (callback) => {
// // // // // // // // // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos'];
// // // // // // // // // //   const channels = tables.map(table =>
// // // // // // // // // //     onTableChange(table, callback)
// // // // // // // // // //   );
  
// // // // // // // // // //   return {
// // // // // // // // // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // // // // // // // // //   };
// // // // // // // // // // };

// // // // // // // // // // /**
// // // // // // // // // //  * Updates the display order for all hero variants.
// // // // // // // // // //  * This is used for drag-and-drop reordering.
// // // // // // // // // //  * @param {Array} variants - An array of {id, order} objects.
// // // // // // // // // //  */
// // // // // // // // // // export const updateHeroVariantsOrder = async (variants) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const updates = variants.map((variant, index) => ({
// // // // // // // // // //       id: variant.id,
// // // // // // // // // //       '"order"': index + 1,
// // // // // // // // // //     }));

// // // // // // // // // //     const { data, error } = await supabase
// // // // // // // // // //       .from('hero_variants')
// // // // // // // // // //       .upsert(updates);

// // // // // // // // // //     if (error) throw error;
// // // // // // // // // //     return data;
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Error updating hero variants order:', error.message);
// // // // // // // // // //     return null;
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // /**
// // // // // // // // // //  * Deletes a hero variant and all its associated data.
// // // // // // // // // //  * This includes nested icons, photos, media assets, and storage files.
// // // // // // // // // //  * @param {Object} variant - The full variant object to be deleted.
// // // // // // // // // //  */
// // // // // // // // // // export const deleteHeroVariant = async (variant) => {
// // // // // // // // // //   try {
// // // // // // // // // //     // 1. If it's a 'variant2', we need to delete its photos from storage.
// // // // // // // // // //     if (variant.variant_type === 'variant2' && variant.hero_variant2_photos.length > 0) {
// // // // // // // // // //       const mediaAssets = variant.hero_variant2_photos
// // // // // // // // // //         .map(p => p.media_assets)
// // // // // // // // // //         .filter(Boolean); // Filter out any nulls

// // // // // // // // // //       // 1a. Delete files from Supabase Storage
// // // // // // // // // //       const filePaths = mediaAssets.map(m => m.file_path);
// // // // // // // // // //       if (filePaths.length > 0) {
// // // // // // // // // //         await removeFile(filePaths); // Assumes removeFile can take an array
// // // // // // // // // //       }
      
// // // // // // // // // //       // 1b. Delete media_assets rows (this will cascade to hero_variant2_photos)
// // // // // // // // // //       const mediaIds = mediaAssets.map(m => m.id);
// // // // // // // // // //       if (mediaIds.length > 0) {
// // // // // // // // // //         const { error: mediaError } = await supabase
// // // // // // // // // //           .from('media_assets')
// // // // // // // // // //           .delete()
// // // // // // // // // //           .in('id', mediaIds);
// // // // // // // // // //         if (mediaError) throw new Error(`Failed to delete media assets: ${mediaError.message}`);
// // // // // // // // // //       }
// // // // // // // // // //     }
    
// // // // // // // // // //     // 2. Delete the main hero_variant row.
// // // // // // // // // //     // 'ON DELETE CASCADE' in your SQL schema will handle deleting
// // // // // // // // // //     // 'hero_variant1_icons' and 'hero_variant2_photos' rows.
// // // // // // // // // //     const { error: variantError } = await supabase
// // // // // // // // // //       .from('hero_variants')
// // // // // // // // // //       .delete()
// // // // // // // // // //       .eq('id', variant.id);

// // // // // // // // // //     if (variantError) throw variantError;

// // // // // // // // // //     return { success: true };
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Error deleting hero variant:', error.message);
// // // // // // // // // //     return { success: false, error: error.message };
// // // // // // // // // //   }
// // // // // // // // // // };


// // // // // // // // // // /**
// // // // // // // // // //  * Saves a single hero variant (creates or updates).
// // // // // // // // // //  * This is a complex transactional function.
// // // // // // // // // //  * @param {Object} formData - The data from react-hook-form.
// // // // // // // // // //  */
// // // // // // // // // // export const saveHeroVariant = async (formData) => {
// // // // // // // // // //   const { id, title, subtitle, paragraph, variant_type, is_active, hero_variant1_icons, hero_variant2_photos, ...rest } = formData;
  
// // // // // // // // // //   try {
// // // // // // // // // //     // --- Step 1: Handle File Uploads for 'variant2' ---
// // // // // // // // // //     // This is the most complex part. We must handle new files vs. existing files.
// // // // // // // // // //     let processedPhotos = [];
// // // // // // // // // //     if (variant_type === 'variant2') {
// // // // // // // // // //       processedPhotos = await Promise.all(
// // // // // // // // // //         hero_variant2_photos.map(async (photo) => {
// // // // // // // // // //           // Case 1: New file to upload
// // // // // // // // // //           if (photo.file) {
// // // // // // // // // //             // 1a. Upload the new file
// // // // // // // // // //             const newFilePath = await uploadFile(photo.file, 'hero-photos');
            
// // // // // // // // // //             // 1b. Create the media_assets entry
// // // // // // // // // //             const { data: mediaAsset, error: mediaError } = await supabase
// // // // // // // // // //               .from('media_assets')
// // // // // // // // // //               .insert({
// // // // // // // // // //                 file_path: newFilePath,
// // // // // // // // // //                 file_type: photo.file.type,
// // // // // // // // // //                 alt_text: title, // Use variant title as alt text
// // // // // // // // // //               })
// // // // // // // // // //               .select()
// // // // // // // // // //               .single();
// // // // // // // // // //             if (mediaError) throw mediaError;

// // // // // // // // // //             // 1c. If this was an *update* (it has a photo.id), delete the OLD file
// // // // // // // // // //             if (photo.id && photo.originalMediaId) {
// // // // // // // // // //               const { data: oldAsset } = await supabase
// // // // // // // // // //                 .from('media_assets')
// // // // // // // // // //                 .select('file_path')
// // // // // // // // // //                 .eq('id', photo.originalMediaId)
// // // // // // // // // //                 .single();
// // // // // // // // // //               if (oldAsset) {
// // // // // // // // // //                 await removeFile(oldAsset.file_path);
// // // // // // // // // //                 // Delete the old media_asset row
// // // // // // // // // //                 await supabase.from('media_assets').delete().eq('id', photo.originalMediaId);
// // // // // // // // // //               }
// // // // // // // // // //             }

// // // // // // // // // //             return {
// // // // // // // // // //               // If it's an existing photo row, keep its ID
// // // // // // // // // //               id: photo.id ? photo.id : undefined,
// // // // // // // // // //               media_id: mediaAsset.id,
// // // // // // // // // //               rotation: photo.rotation,
// // // // // // // // // //               delay: photo.delay,
// // // // // // // // // //             };
// // // // // // // // // //           }
          
// // // // // // // // // //           // Case 2: Existing photo, no changes
// // // // // // // // // //           return {
// // // // // // // // // //             id: photo.id,
// // // // // // // // // //             media_id: photo.media_id,
// // // // // // // // // //             rotation: photo.rotation,
// // // // // // // // // //             delay: photo.delay,
// // // // // // // // // //           };
// // // // // // // // // //         })
// // // // // // // // // //       );
// // // // // // // // // //     }
    
// // // // // // // // // //     // --- Step 2: Upsert the main hero_variant ---
// // // // // // // // // //     const variantData = {
// // // // // // // // // //       id: id || undefined, // Use ID if it exists (update), or undefined (create)
// // // // // // // // // //       title,
// // // // // // // // // //       subtitle,
// // // // // // // // // //       paragraph,
// // // // // // // // // //       variant_type,
// // // // // // // // // //       is_active,
// // // // // // // // // //       '"order"': formData['"order"'] || 0, // Preserve order
// // // // // // // // // //     };

// // // // // // // // // //     const { data: savedVariant, error: variantError } = await supabase
// // // // // // // // // //       .from('hero_variants')
// // // // // // // // // //       .upsert(variantData)
// // // // // // // // // //       .select()
// // // // // // // // // //       .single();

// // // // // // // // // //     if (variantError) throw variantError;

// // // // // // // // // //     // --- Step 3: Sync nested icons or photos ---
    
// // // // // // // // // //     if (variant_type === 'variant1') {
// // // // // // // // // //       // Sync icons (delete all existing, then add new ones)
// // // // // // // // // //       // This is simpler than diffing.
      
// // // // // // // // // //       // 3a. Delete all old icons for this variant
// // // // // // // // // //       await supabase.from('hero_variant1_icons').delete().eq('hero_variant_id', savedVariant.id);

// // // // // // // // // //       // 3b. Insert all current icons
// // // // // // // // // //       if (hero_variant1_icons && hero_variant1_icons.length > 0) {
// // // // // // // // // //         const iconData = hero_variant1_icons.map(icon => ({
// // // // // // // // // //           hero_variant_id: savedVariant.id,
// // // // // // // // // //           icon_name: icon.icon_name,
// // // // // // // // // //           position: icon.position,
// // // // // // // // // //         }));
// // // // // // // // // //         const { error: iconError } = await supabase.from('hero_variant1_icons').insert(iconData);
// // // // // // // // // //         if (iconError) throw iconError;
// // // // // // // // // //       }
// // // // // // // // // //     }
    
// // // // // // // // // //     if (variant_type === 'variant2') {
// // // // // // // // // //       // Sync photos (more complex: handle creates, updates, deletes)
      
// // // // // // // // // //       // 3a. Get IDs of photos we just processed
// // // // // // // // // //       const currentPhotoIds = processedPhotos.map(p => p.id).filter(Boolean);
      
// // // // // // // // // //       // 3b. Delete any photos that are no longer in the list
// // // // // // // // // //       // First, find photos to delete
// // // // // // // // // //       const { data: existingPhotos } = await supabase
// // // // // // // // // //         .from('hero_variant2_photos')
// // // // // // // // // //         .select('id, media_assets(id, file_path)')
// // // // // // // // // //         .eq('hero_variant_id', savedVariant.id);

// // // // // // // // // //       const photosToDelete = existingPhotos.filter(p => !currentPhotoIds.includes(p.id));
      
// // // // // // // // // //       if (photosToDelete.length > 0) {
// // // // // // // // // //         // Delete files from storage
// // // // // // // // // //         const filesToDelete = photosToDelete.map(p => p.media_assets.file_path).filter(Boolean);
// // // // // // // // // //         if (filesToDelete.length > 0) await removeFile(filesToDelete);
        
// // // // // // // // // //         // Delete media_assets rows
// // // // // // // // // //         const mediaIdsToDelete = photosToDelete.map(p => p.media_assets.id).filter(Boolean);
// // // // // // // // // //         if (mediaIdsToDelete.length > 0) await supabase.from('media_assets').delete().in('id', mediaIdsToDelete);
        
// // // // // // // // // //         // Deleting media_assets should cascade delete hero_variant2_photos
// // // // // // // // // //         // but we can be safe and delete them explicitly
// // // // // // // // // //         const photoIdsToDelete = photosToDelete.map(p => p.id);
// // // // // // // // // //         await supabase.from('hero_variant2_photos').delete().in('id', photoIdsToDelete);
// // // // // // // // // //       }

// // // // // // // // // //       // 3c. Upsert the current list of photos
// // // // // // // // // //       const photoData = processedPhotos.map(photo => ({
// // // // // // // // // //         id: photo.id, // Will be undefined for new photos
// // // // // // // // // //         hero_variant_id: savedVariant.id,
// // // // // // // // // //         media_id: photo.media_id,
// // // // // // // // // //         rotation: photo.rotation,
// // // // // // // // // //         delay: photo.delay,
// // // // // // // // // //       }));
      
// // // // // // // // // //       const { error: photoError } = await supabase.from('hero_variant2_photos').upsert(photoData);
// // // // // // // // // //       if (photoError) throw photoError;
// // // // // // // // // //     }
    
// // // // // // // // // //     return { success: true, data: savedVariant };
    
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Error saving hero variant:', error.message);
// // // // // // // // // //     return { success: false, error: error.message };
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // import { supabase } from '../lib/supabaseClient';
// // // // // // // // // // import { supabase } from './supabase';
// // // // // // // // // // // Import your storage functions. We need removeFile from storage.js,
// // // // // // // // // // but uploadFile and createMediaAsset are handled in AdminHeroEditor.
// // // // // // // // // // import { removeFile } from './storage';
// // // // // // // // // import { onTableChange } from './homepage'; // Import your real-time helper
// // // // // // // // // import { removeFile } from './storageApi'; // Import your storage functions
// // // // // // // // // import { uploadFile } from './storageApi'; // Import your storage functions
// // // // // // // // // /**
// // // // // // // // //  * Fetches ALL hero variants for the admin panel (both active and inactive).
// // // // // // // // //  * This is different from the public 'fetchHeroVariants' which only gets active ones.
// // // // // // // // //  */
// // // // // // // // // export const getHeroVariantsAdmin = async () => {
// // // // // // // // //   try {
// // // // // // // // //     const { data, error } = await supabase
// // // // // // // // //       .from('hero_variants')
// // // // // // // // //       .select(`
// // // // // // // // //         *,
// // // // // // // // //         hero_variant1_icons (*),
// // // // // // // // //         hero_variant2_photos (
// // // // // // // // //           *,
// // // // // // // // //           media_assets ( id, file_path, alt_text )
// // // // // // // // //         )
// // // // // // // // //       `)
// // // // // // // // //       .order('order', { ascending: true }); // --- FIX: Removed quotes from "order"

// // // // // // // // //     if (error) throw error;
// // // // // // // // //     return data;
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Error fetching admin hero variants:', error.message);
// // // // // // // // //     return [];
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // /**
// // // // // // // // //  * Subscribes to all changes in the hero-related tables for real-time admin updates.
// // // // // // // // //  */
// // // // // // // // // export const subscribeToHeroChanges = (callback) => {
// // // // // // // // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
// // // // // // // // //   const channels = tables.map(table =>
// // // // // // // // //     onTableChange(table, callback)
// // // // // // // // //   );
  
// // // // // // // // //   return {
// // // // // // // // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // // // // // // // //   };
// // // // // // // // // };

// // // // // // // // // /**
// // // // // // // // //  * Updates the display order for all hero variants.
// // // // // // // // //  * This is used for drag-and-drop reordering.
// // // // // // // // //  * @param {Array} variants - An array of {id, order} objects.
// // // // // // // // //  */
// // // // // // // // // export const updateHeroVariantsOrder = async (variants) => {
// // // // // // // // //   try {
// // // // // // // // //     const updates = variants.map((variant, index) => ({
// // // // // // // // //       id: variant.id,
// // // // // // // // //       order: index + 1, // --- FIX: Removed quotes from "order"
// // // // // // // // //     }));

// // // // // // // // //     const { data, error } = await supabase
// // // // // // // // //       .from('hero_variants')
// // // // // // // // //       .upsert(updates);

// // // // // // // // //     if (error) throw error;
// // // // // // // // //     return data;
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Error updating hero variants order:', error.message);
// // // // // // // // //     return null;
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // /**
// // // // // // // // //  * Deletes a hero variant and all its associated data.
// // // // // // // // //  * This includes nested icons, photos, media assets, and storage files.
// // // // // // // // //  * @param {Object} variant - The full variant object to be deleted.
// // // // // // // // //  */
// // // // // // // // // export const deleteHeroVariant = async (variant) => {
// // // // // // // // //   try {
// // // // // // // // //     // 1. If it's a 'variant2', we need to delete its photos from storage.
// // // // // // // // //     if (variant.variant_type === 'variant2' && variant.hero_variant2_photos.length > 0) {
// // // // // // // // //       const mediaAssets = variant.hero_variant2_photos
// // // // // // // // //         .map(p => p.media_assets)
// // // // // // // // //         .filter(Boolean); // Filter out any nulls

// // // // // // // // //       // 1a. Delete files from Supabase Storage
// // // // // // // // //       const filePaths = mediaAssets.map(m => m.file_path);
// // // // // // // // //       if (filePaths.length > 0) {
// // // // // // // // //         // We use the bucket 'media' as defined in your setup
// // // // // // // // //         // Assuming removeFile can handle an array of paths
// // // // // // // // //         await removeFile('media', filePaths); 
// // // // // // // // //       }
      
// // // // // // // // //       // 1b. Delete media_assets rows
// // // // // // // // //       const mediaIds = mediaAssets.map(m => m.id);
// // // // // // // // //       if (mediaIds.length > 0) {
// // // // // // // // //         const { error: mediaError } = await supabase
// // // // // // // // //           .from('media_assets')
// // // // // // // // //           .delete()
// // // // // // // // //           .in('id', mediaIds);
// // // // // // // // //         if (mediaError) throw new Error(`Failed to delete media assets: ${mediaError.message}`);
// // // // // // // // //       }
// // // // // // // // //     }
    
// // // // // // // // //     // 2. Delete the main hero_variant row.
// // // // // // // // //     // 'ON DELETE CASCADE' in your SQL schema will handle deleting
// // // // // // // // //     // 'hero_variant1_icons' and 'hero_variant2_photos' rows.
// // // // // // // // //     const { error: variantError } = await supabase
// // // // // // // // //       .from('hero_variants')
// // // // // // // // //       .delete()
// // // // // // // // //       .eq('id', variant.id);

// // // // // // // // //     if (variantError) throw variantError;

// // // // // // // // //     return { success: true };
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Error deleting hero variant:', error.message);
// // // // // // // // //     return { success: false, error: error.message };
// // // // // // // // //   }
// // // // // // // // // };


// // // // // // // // // /**
// // // // // // // // //  * Saves a single hero variant (creates or updates).
// // // // // // // // //  * This is a complex transactional function.
// // // // // // // // //  * @param {Object} formData - The data from react-hook-form.
// // // // // // // // //  * @param {string} userId - The ID of the logged-in admin.
// // // // // // // // //  */
// // // // // // // // // export const saveHeroVariant = async (formData, userId) => {
// // // // // // // // //   // Destructure all fields, including the 'order' field
// // // // // // // // //   const { id, title, subtitle, paragraph, variant_type, is_active, order, hero_variant1_icons, hero_variant2_photos } = formData;
  
// // // // // // // // //   try {
// // // // // // // // //     // --- Step 1: Handle File Uploads for 'variant2' ---
// // // // // // // // //     let processedPhotos = [];
// // // // // // // // //     if (variant_type === 'variant2') {
// // // // // // // // //       processedPhotos = await Promise.all(
// // // // // // // // //         hero_variant2_photos.map(async (photo) => {
          
// // // // // // // // //           // Case 1: New file to upload (photo.file is a File object)
// // // // // // // // //           if (photo.file) {
// // // // // // // // //             // 1a. Upload the new file
// // // // // // // // //             // Assuming 'uploadFile' is from your storage.js and returns { filePath }
// // // // // // // // //             const { filePath } = await uploadFile('media', photo.file, 'hero-photos');
            
// // // // // // // // //             // 1b. Create the media_assets entry
// // // // // // // // //             const { data: mediaAsset, error: mediaError } = await supabase
// // // // // // // // //               .from('media_assets')
// // // // // // // // //               .insert({
// // // // // // // // //                 file_path: filePath,
// // // // // // // // //                 file_type: photo.file.type,
// // // // // // // // //                 alt_text: title, // Use variant title as alt text
// // // // // // // // //                 uploaded_by: userId,
// // // // // // // // //               })
// // // // // // // // //               .select()
// // // // // // // // //               .single();
// // // // // // // // //             if (mediaError) throw mediaError;

// // // // // // // // //             // 1c. If this was an *update* (it has photo.originalMediaId), delete the OLD file
// // // // // // // // //             if (photo.originalMediaId) {
// // // // // // // // //               const { data: oldAsset } = await supabase
// // // // // // // // //                 .from('media_assets')
// // // // // // // // //                 .select('file_path')
// // // // // // // // //                 .eq('id', photo.originalMediaId)
// // // // // // // // //                 .single();
// // // // // // // // //               if (oldAsset) {
// // // // // // // // //                 await removeFile('media', oldAsset.file_path);
// // // // // // // // //                 // Delete the old media_asset row
// // // // // // // // //                 await supabase.from('media_assets').delete().eq('id', photo.originalMediaId);
// // // // // // // // //               }
// // // // // // // // //             }

// // // // // // // // //             return {
// // // // // // // // //               id: photo.id ? photo.id : undefined, // Keep existing row ID if it's an update
// // // // // // // // //               media_id: mediaAsset.id,
// // // // // // // // //               rotation: photo.rotation,
// // // // // // // // //               delay: photo.delay,
// // // // // // // // //             };
// // // // // // // // //           }
          
// // // // // // // // //           // Case 2: Existing photo, no changes to the file
// // // // // // // // //           // We just pass its data through.
// // // // // // // // //           return {
// // // // // // // // //             id: photo.id,
// // // // // // // // //             media_id: photo.media_id,
// // // // // // // // //             rotation: photo.rotation,
// // // // // // // // //             delay: photo.delay,
// // // // // // // // //           };
// // // // // // // // //         })
// // // // // // // // //       );
// // // // // // // // //     }
    
// // // // // // // // //     // --- Step 2: Upsert the main hero_variant ---
// // // // // // // // //     const variantData = {
// // // // // // // // //       id: id || undefined, // Use ID if it exists (update), or undefined (create)
// // // // // // // // //       title,
// // // // // // // // //       subtitle,
// // // // // // // // //       paragraph,
// // // // // // // // //       variant_type,
// // // // // // // // //       is_active,
// // // // // // // // //       order: order || 0, // --- FIX: Removed quotes and ensure it's a number
// // // // // // // // //     };

// // // // // // // // //     const { data: savedVariant, error: variantError } = await supabase
// // // // // // // // //       .from('hero_variants')
// // // // // // // // //       .upsert(variantData)
// // // // // // // // //       .select()
// // // // // // // // //       .single();

// // // // // // // // //     if (variantError) throw variantError;

// // // // // // // // //     // --- Step 3: Sync nested icons or photos ---
    
// // // // // // // // //     if (variant_type === 'variant1') {
// // // // // // // // //       // Sync icons (simple: delete all existing, then add new ones)
      
// // // // // // // // //       // 3a. Delete all old icons for this variant
// // // // // // // // //       await supabase.from('hero_variant1_icons').delete().eq('hero_variant_id', savedVariant.id);

// // // // // // // // //       // 3b. Insert all current icons
// // // // // // // // //       if (hero_variant1_icons && hero_variant1_icons.length > 0) {
// // // // // // // // //         const iconData = hero_variant1_icons.map(icon => {
// // // // // // // // //           // --- FIX for [object Object] ---
// // // // // // // // //           // Ensure position is a valid JSON object before inserting
// // // // // // // // //           let pos = {};
// // // // // // // // //           if (typeof icon.position === 'string') {
// // // // // // // // //             try {
// // // // // // // // //               pos = JSON.parse(icon.position);
// // // // // // // // //             } catch (e) {
// // // // // // // // //               console.warn('Invalid JSON for position, using default.', icon.position);
// // // // // // // // //             }
// // // // // // // // //           } else if (typeof icon.position === 'object' && icon.position !== null) {
// // // // // // // // //             pos = icon.position;
// // // // // // // // //           }

// // // // // // // // //           return {
// // // // // // // // //             hero_variant_id: savedVariant.id,
// // // // // // // // //             icon_name: icon.icon_name,
// // // // // // // // //             position: pos, // Send the valid JSON object
// // // // // // // // //           };
// // // // // // // // //         });
// // // // // // // // //         const { error: iconError } = await supabase.from('hero_variant1_icons').insert(iconData);
// // // // // // // // //         if (iconError) throw iconError;
// // // // // // // // //       }
// // // // // // // // //     }
    
// // // // // // // // //     if (variant_type === 'variant2') {
// // // // // // // // //       // Sync photos (complex: handle creates, updates, deletes)
      
// // // // // // // // //       // 3a. Get IDs of photos we just processed
// // // // // // // // //       const currentPhotoIds = processedPhotos.map(p => p.id).filter(Boolean);
      
// // // // // // // // //       // 3b. Find any photos in the DB that are *not* in our current form
// // // // // // // // //       const { data: existingPhotos } = await supabase
// // // // // // // // //         .from('hero_variant2_photos')
// // // // // // // // //         .select('id, media_assets(id, file_path)')
// // // // // // // // //         .eq('hero_variant_id', savedVariant.id);

// // // // // // // // //       const photosToDelete = existingPhotos.filter(p => !currentPhotoIds.includes(p.id));
      
// // // // // // // // //       if (photosToDelete.length > 0) {
// // // // // // // // //         // Delete files from storage
// // // // // // // // //         const filesToDelete = photosToDelete.map(p => p.media_assets?.file_path).filter(Boolean);
// // // // // // // // //         if (filesToDelete.length > 0) await removeFile('media', filesToDelete.join(','));
        
// // // // // // // // //         // Delete media_assets rows
// // // // // // // // //         const mediaIdsToDelete = photosToDelete.map(p => p.media_assets?.id).filter(Boolean);
// // // // // // // // //         if (mediaIdsToDelete.length > 0) await supabase.from('media_assets').delete().in('id', mediaIdsToDelete);
        
// // // // // // // // //         // Delete the hero_variant2_photos rows
// // // // // // // // //         const photoIdsToDelete = photosToDelete.map(p => p.id);
// // // // // // // // //         await supabase.from('hero_variant2_photos').delete().in('id', photoIdsToDelete);
// // // // // // // // //       }

// // // // // // // // //       // 3c. Upsert the current list of photos
// // // // // // // // //       const photoData = processedPhotos.map(photo => ({
// // // // // // // // //         id: photo.id, // Will be undefined for new photos
// // // // // // // // //         hero_variant_id: savedVariant.id,
// // // // // // // // //         media_id: photo.media_id,
// // // // // // // // //         rotation: photo.rotation,
// // // // // // // // //         delay: photo.delay,
// // // // // // // // //       }));
      
// // // // // // // // //       const { error: photoError } = await supabase.from('hero_variant2_photos').upsert(photoData);
// // // // // // // // //       if (photoError) throw photoError;
// // // // // // // // //     }
    
// // // // // // // // //     return { success: true, data: savedVariant };
    
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Error saving hero variant:', error.message);
// // // // // // // // //     return { success: false, error: error.message };
// // // // // // // // //   }
// // // // // // // // // };




// // // // // // // // import { supabase } from '../lib/supabaseClient';
// // // // // // // // // import { supabase } from './supabase';
// // // // // // // // // Import your storage functions. We need removeFile from storage.js,
// // // // // // // // // and we'll use the uploadFile and createMediaAsset functions.
// // // // // // // // import { uploadFile, removeFile, createMediaAsset } from './storageApi';
// // // // // // // // import { onTableChange } from './homepage'; // Import your real-time helper

// // // // // // // // /**
// // // // // // // //  * Fetches ALL hero variants for the admin panel (both active and inactive).
// // // // // // // //  * This is different from the public 'fetchHeroVariants' which only gets active ones.
// // // // // // // //  */
// // // // // // // // export const getHeroVariantsAdmin = async () => {
// // // // // // // //   try {
// // // // // // // //     const { data, error } = await supabase
// // // // // // // //       .from('hero_variants')
// // // // // // // //       .select(`
// // // // // // // //         *,
// // // // // // // //         hero_variant1_icons (*),
// // // // // // // //         hero_variant2_photos (
// // // // // // // //           *,
// // // // // // // //           media_assets ( id, file_path, alt_text )
// // // // // // // //         )
// // // // // // // //       `)
// // // // // // // //       .order('order', { ascending: true }); // --- FIX: Removed quotes from "order"

// // // // // // // //     if (error) throw error;
// // // // // // // //     return data;
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Error fetching admin hero variants:', error.message);
// // // // // // // //     return [];
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // /**
// // // // // // // //  * Subscribes to all changes in the hero-related tables for real-time admin updates.
// // // // // // // //  */
// // // // // // // // export const subscribeToHeroChanges = (callback) => {
// // // // // // // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
// // // // // // // //   const channels = tables.map(table =>
// // // // // // // //     onTableChange(table, callback)
// // // // // // // //   );
  
// // // // // // // //   return {
// // // // // // // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // // // // // // //   };
// // // // // // // // };

// // // // // // // // /**
// // // // // // // //  * Updates the display order for all hero variants.
// // // // // // // //  * This is used for drag-and-drop reordering.
// // // // // // // //  * @param {Array} variants - An array of {id, order} objects.
// // // // // // // //  */
// // // // // // // // export const updateHeroVariantsOrder = async (variants) => {
// // // // // // // //   try {
// // // // // // // //     const updates = variants.map((variant, index) => ({
// // // // // // // //       id: variant.id,
// // // // // // // //       order: index + 1, // --- FIX: Removed quotes from "order"
// // // // // // // //     }));

// // // // // // // //     const { data, error } = await supabase
// // // // // // // //       .from('hero_variants')
// // // // // // // //       .upsert(updates);

// // // // // // // //     if (error) throw error;
// // // // // // // //     return data;
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Error updating hero variants order:', error.message);
// // // // // // // //     return null;
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // /**
// // // // // // // //  * Deletes a hero variant and all its associated data.
// // // // // // // //  * This includes nested icons, photos, media assets, and storage files.
// // // // // // // //  * @param {Object} variant - The full variant object to be deleted.
// // // // // // // //  */
// // // // // // // // export const deleteHeroVariant = async (variant) => {
// // // // // // // //   try {
// // // // // // // //     // 1. If it's a 'variant2', we need to delete its photos from storage.
// // // // // // // //     if (variant.variant_type === 'variant2' && variant.hero_variant2_photos.length > 0) {
// // // // // // // //       const mediaAssets = variant.hero_variant2_photos
// // // // // // // //         .map(p => p.media_assets)
// // // // // // // //         .filter(Boolean); // Filter out any nulls

// // // // // // // //       // 1a. Delete files from Supabase Storage
// // // // // // // //       const filePaths = mediaAssets.map(m => m.file_path).filter(Boolean);
// // // // // // // //       if (filePaths.length > 0) {
// // // // // // // //         // Use 'media' bucket. Assumes removeFile can handle an array.
// // // // // // // //         await removeFile('media', filePaths); 
// // // // // // // //       }
      
// // // // // // // //       // 1b. Delete media_assets rows
// // // // // // // //       const mediaIds = mediaAssets.map(m => m.id);
// // // // // // // //       if (mediaIds.length > 0) {
// // // // // // // //          // First, delete the linking rows from 'hero_variant2_photos'
// // // // // // // //         await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIds);
        
// // // // // // // //         // Then, delete the 'media_assets' rows
// // // // // // // //         const { error: mediaError } = await supabase
// // // // // // // //           .from('media_assets')
// // // // // // // //           .delete()
// // // // // // // //           .in('id', mediaIds);
// // // // // // // //         if (mediaError) throw new Error(`Failed to delete media assets: ${mediaError.message}`);
// // // // // // // //       }
// // // // // // // //     }
    
// // // // // // // //     // 2. Delete the main hero_variant row.
// // // // // // // //     // 'ON DELETE CASCADE' in your SQL schema will handle deleting
// // // // // // // //     // 'hero_variant1_icons' rows.
// // // // // // // //     const { error: variantError } = await supabase
// // // // // // // //       .from('hero_variants')
// // // // // // // //       .delete()
// // // // // // // //       .eq('id', variant.id);

// // // // // // // //     if (variantError) throw variantError;

// // // // // // // //     return { success: true };
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Error deleting hero variant:', error.message);
// // // // // // // //     return { success: false, error: error.message };
// // // // // // // //   }
// // // // // // // // };


// // // // // // // // /**
// // // // // // // //  * Saves a single hero variant (creates or updates).
// // // // // // // //  * This is a complex transactional function.
// // // // // // // //  * @param {Object} formData - The data from react-hook-form.
// // // // // // // //  * @param {string} userId - The ID of the logged-in admin.
// // // // // // // //  */
// // // // // // // // export const saveHeroVariant = async (formData, userId) => {
// // // // // // // //   // Destructure all fields, including the 'order' field
// // // // // // // //   const { id, title, subtitle, paragraph, variant_type, is_active, order, hero_variant1_icons, hero_variant2_photos } = formData;
  
// // // // // // // //   try {
// // // // // // // //     // --- Step 1: Handle File Uploads for 'variant2' ---
// // // // // // // //     let processedPhotos = [];
// // // // // // // //     if (variant_type === 'variant2') {
// // // // // // // //       processedPhotos = await Promise.all(
// // // // // // // //         (hero_variant2_photos || []).map(async (photo) => {
          
// // // // // // // //           // Case 1: New file to upload (photo.file is a File object)
// // // // // // // //           if (photo.file) {
// // // // // // // //             // 1a. Upload the new file
// // // // // // // //             const { filePath } = await uploadFile('media', photo.file, 'hero-photos');
            
// // // // // // // //             // 1b. Create the media_assets entry
// // // // // // // //             const { data: mediaAsset, error: mediaError } = await createMediaAsset(
// // // // // // // //               filePath,
// // // // // // // //               photo.file.type,
// // // // // // // //               title, // Use variant title as alt text
// // // // // // // //               userId
// // // // // // // //             );
// // // // // // // //             if (mediaError) throw mediaError;

// // // // // // // //             // 1c. If this was an *update* (it has photo.originalMediaId), delete the OLD file
// // // // // // // //             if (photo.originalMediaId) {
// // // // // // // //               const { data: oldAsset } = await supabase
// // // // // // // //                 .from('media_assets')
// // // // // // // //                 .select('file_path')
// // // // // // // //                 .eq('id', photo.originalMediaId)
// // // // // // // //                 .single();
// // // // // // // //               if (oldAsset) {
// // // // // // // //                 await removeFile('media', oldAsset.file_path);
// // // // // // // //                 // Delete the old media_asset row
// // // // // // // //                 await supabase.from('media_assets').delete().eq('id', photo.originalMediaId);
// // // // // // // //               }
// // // // // // // //             }

// // // // // // // //             return {
// // // // // // // //               id: photo.id || undefined, // Keep existing row ID if it's an update
// // // // // // // //               media_id: mediaAsset.id, // --- FIX: This is the NEW asset ID
// // // // // // // //               rotation: photo.rotation,
// // // // // // // //               delay: photo.delay,
// // // // // // // //             };
// // // // // // // //           }
          
// // // // // // // //           // Case 2: Existing photo, no changes to the file
// // // // // // // //           // We just pass its data through.
// // // // // // // //           return {
// // // // // // // //             id: photo.id,
// // // // // // // //             media_id: photo.media_id, // This is the EXISTING asset ID
// // // // // // // //             rotation: photo.rotation,
// // // // // // // //             delay: photo.delay,
// // // // // // // //           };
// // // // // // // //         })
// // // // // // // //       );
// // // // // // // //     }
    
// // // // // // // //     // --- Step 2: Upsert the main hero_variant ---
// // // // // // // //     const variantData = {
// // // // // // // //       id: id || undefined, // Use ID if it exists (update), or undefined (create)
// // // // // // // //       title,
// // // // // // // //       subtitle,
// // // // // // // //       paragraph,
// // // // // // // //       variant_type,
// // // // // // // //       is_active,
// // // // // // // //       order: order || 0, // --- FIX: Removed quotes
// // // // // // // //     };

// // // // // // // //     const { data: savedVariant, error: variantError } = await supabase
// // // // // // // //       .from('hero_variants')
// // // // // // // //       .upsert(variantData)
// // // // // // // //       .select()
// // // // // // // //       .single();

// // // // // // // //     if (variantError) throw variantError;

// // // // // // // //     // --- Step 3: Sync nested icons or photos ---
    
// // // // // // // //     if (variant_type === 'variant1') {
// // // // // // // //       // Sync icons (simple: delete all existing, then add new ones)
      
// // // // // // // //       // 3a. Delete all old icons for this variant
// // // // // // // //       await supabase.from('hero_variant1_icons').delete().eq('hero_variant_id', savedVariant.id);

// // // // // // // //       // 3b. Insert all current icons
// // // // // // // //       if (hero_variant1_icons && hero_variant1_icons.length > 0) {
// // // // // // // //         const iconData = hero_variant1_icons.map(icon => {
// // // // // // // //           // --- FIX for [object Object] ---
// // // // // // // //           // Ensure position is a valid JSON object before inserting
// // // // // // // //           let pos = {};
// // // // // // // //           if (typeof icon.position === 'string') {
// // // // // // // //             try {
// // // // // // // //               pos = JSON.parse(icon.position);
// // // // // // // //             } catch (e) { /* ignore invalid json */ }
// // // // // // // //           } else if (typeof icon.position === 'object' && icon.position !== null) {
// // // // // // // //             pos = icon.position;
// // // // // // // //           }

// // // // // // // //           return {
// // // // // // // //             hero_variant_id: savedVariant.id,
// // // // // // // //             icon_name: icon.icon_name,
// // // // // // // //             position: pos, // Send the valid JSON object
// // // // // // // //           };
// // // // // // // //         });
// // // // // // // //         const { error: iconError } = await supabase.from('hero_variant1_icons').insert(iconData);
// // // // // // // //         if (iconError) throw iconError;
// // // // // // // //       }
// // // // // // // //     }
    
// // // // // // // //     if (variant_type === 'variant2') {
// // // // // // // //       // Sync photos (complex: handle creates, updates, deletes)
      
// // // // // // // //       // 3a. Get IDs of photos we just processed
// // // // // // // //       const currentPhotoIds = processedPhotos.map(p => p.id).filter(Boolean);
      
// // // // // // // //       // 3b. Find any photos in the DB that are *not* in our current form
// // // // // // // //       const { data: existingPhotos } = await supabase
// // // // // // // //         .from('hero_variant2_photos')
// // // // // // // //         .select('id, media_assets(id, file_path)')
// // // // // // // //         .eq('hero_variant_id', savedVariant.id);

// // // // // // // //       const photosToDelete = existingPhotos.filter(p => !currentPhotoIds.includes(p.id));
      
// // // // // // // //       if (photosToDelete.length > 0) {
// // // // // // // //         // Delete files from storage
// // // // // // // //         const filesToDelete = photosToDelete.map(p => p.media_assets?.file_path).filter(Boolean);
// // // // // // // //         if (filesToDelete.length > 0) await removeFile('media', filesToDelete);
        
// // // // // // // //         // Delete media_assets rows
// // // // // // // //         const mediaIdsToDelete = photosToDelete.map(p => p.media_assets?.id).filter(Boolean);
// // // // // // // //         if (mediaIdsToDelete.length > 0) {
// // // // // // // //           // Explicitly delete photo links before asset
// // // // // // // //           await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIdsToDelete);
// // // // // // // //           await supabase.from('media_assets').delete().in('id', mediaIdsToDelete);
// // // // // // // //         }
// // // // // // // //       }

// // // // // // // //       // 3c. Upsert the current list of photos
// // // // // // // //       const photoData = processedPhotos.map(photo => ({
// // // // // // // //         id: photo.id || undefined, // --- FIX: Use undefined for new rows
// // // // // // // //         hero_variant_id: savedVariant.id,
// // // // // // // //         media_id: photo.media_id, // --- FIX: This ID is now guaranteed to be non-null
// // // // // // // //         rotation: photo.rotation,
// // // // // // // //         delay: photo.delay,
// // // // // // // //       }));
      
// // // // // // // //       if(photoData.length > 0) {
// // // // // // // //         const { error: photoError } = await supabase.from('hero_variant2_photos').upsert(photoData);
// // // // // // // //         if (photoError) throw photoError;
// // // // // // // //       }
// // // // // // // //     }
    
// // // // // // // //     return { success: true, data: savedVariant };
    
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Error saving hero variant:', error.message);
// // // // // // // //     return { success: false, error: error.message };
// // // // // // // //   }
// // // // // // // // };


// // // // // // // import { supabase } from '../lib/supabaseClient';
// // // // // // // // Import your storage functions. We need removeFile from storage.js,
// // // // // // // // and we'll use the uploadFile and createMediaAsset functions.
// // // // // // // import { uploadFile, removeFile, createMediaAsset } from './storageApi';
// // // // // // // import { onTableChange } from './homepage'; // Import your real-time helper

// // // // // // // /**
// // // // // // //  * Fetches ALL hero variants for the admin panel (both active and inactive).
// // // // // // //  * This is different from the public 'fetchHeroVariants' which only gets active ones.
// // // // // // //  */
// // // // // // // export const getHeroVariantsAdmin = async () => {
// // // // // // //   try {
// // // // // // //     const { data, error } = await supabase
// // // // // // //       .from('hero_variants')
// // // // // // //       .select(`
// // // // // // //         *,
// // // // // // //         hero_variant1_icons (*),
// // // // // // //         hero_variant2_photos (
// // // // // // //           *,
// // // // // // //           media_assets ( id, file_path, alt_text )
// // // // // // //         )
// // // // // // //       `)
// // // // // // //       .order('order', { ascending: true }); // --- FIX: Removed quotes from "order"

// // // // // // //     if (error) throw error;
// // // // // // //     return data;
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error fetching admin hero variants:', error.message);
// // // // // // //     return [];
// // // // // // //   }
// // // // // // // };

// // // // // // // /**
// // // // // // //  * Subscribes to all changes in the hero-related tables for real-time admin updates.
// // // // // // //  */
// // // // // // // export const subscribeToHeroChanges = (callback) => {
// // // // // // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
// // // // // // //   const channels = tables.map(table =>
// // // // // // //     onTableChange(table, callback)
// // // // // // //   );
  
// // // // // // //   return {
// // // // // // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // // // // // //   };
// // // // // // // };

// // // // // // // /**
// // // // // // //  * Updates the display order for all hero variants.
// // // // // // //  * This is used for drag-and-drop reordering.
// // // // // // //  * @param {Array} variants - An array of {id, order} objects.
// // // // // // //  */
// // // // // // // export const updateHeroVariantsOrder = async (variants) => {
// // // // // // //   try {
// // // // // // //     const updates = variants.map((variant, index) => ({
// // // // // // //       id: variant.id,
// // // // // // //       order: index + 1, // --- FIX: Removed quotes from "order"
// // // // // // //     }));

// // // // // // //     const { data, error } = await supabase
// // // // // // //       .from('hero_variants')
// // // // // // //       .upsert(updates);

// // // // // // //     if (error) throw error;
// // // // // // //     return data;
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error updating hero variants order:', error.message);
// // // // // // //     return null;
// // // // // // //   }
// // // // // // // };

// // // // // // // /**
// // // // // // //  * Deletes a hero variant and all its associated data.
// // // // // // //  * This includes nested icons, photos, media assets, and storage files.
// // // // // // //  * @param {Object} variant - The full variant object to be deleted.
// // // // // // //  */
// // // // // // // export const deleteHeroVariant = async (variant) => {
// // // // // // //   try {
// // // // // // //     // 1. If it's a 'variant2', we need to delete its photos from storage.
// // // // // // //     if (variant.variant_type === 'variant2' && variant.hero_variant2_photos.length > 0) {
// // // // // // //       const mediaAssets = variant.hero_variant2_photos
// // // // // // //         .map(p => p.media_assets)
// // // // // // //         .filter(Boolean); // Filter out any nulls

// // // // // // //       // 1a. Delete files from Supabase Storage
// // // // // // //       const filePaths = mediaAssets.map(m => m.file_path).filter(Boolean);
// // // // // // //       if (filePaths.length > 0) {
// // // // // // //         // Use 'media' bucket. Assumes removeFile can handle an array.
// // // // // // //         await removeFile('media', filePaths); 
// // // // // // //       }
      
// // // // // // //       // 1b. Delete media_assets rows
// // // // // // //       const mediaIds = mediaAssets.map(m => m.id);
// // // // // // //       if (mediaIds.length > 0) {
// // // // // // //          // First, delete the linking rows from 'hero_variant2_photos'
// // // // // // //         await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIds);
        
// // // // // // //         // Then, delete the 'media_assets' rows
// // // // // // //         const { error: mediaError } = await supabase
// // // // // // //           .from('media_assets')
// // // // // // //           .delete()
// // // // // // //           .in('id', mediaIds);
// // // // // // //         if (mediaError) throw new Error(`Failed to delete media assets: ${mediaError.message}`);
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     // 2. Delete the main hero_variant row.
// // // // // // //     // 'ON DELETE CASCADE' in your SQL schema will handle deleting
// // // // // // //     // 'hero_variant1_icons' rows.
// // // // // // //     const { error: variantError } = await supabase
// // // // // // //       .from('hero_variants')
// // // // // // //       .delete()
// // // // // // //       .eq('id', variant.id);

// // // // // // //     if (variantError) throw variantError;

// // // // // // //     return { success: true };
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error deleting hero variant:', error.message);
// // // // // // //     return { success: false, error: error.message };
// // // // // // //   }
// // // // // // // };


// // // // // // // /**
// // // // // // //  * Saves a single hero variant (creates or updates).
// // // // // // //  * This is a complex transactional function.
// // // // // // //  * @param {Object} formData - The data from react-hook-form.
// // // // // // //  * @param {string} userId - The ID of the logged-in admin.
// // // // // // //  */
// // // // // // // export const saveHeroVariant = async (formData, userId) => {
// // // // // // //   // Destructure all fields, including the 'order' field
// // // // // // //   const { id, title, subtitle, paragraph, variant_type, is_active, order, hero_variant1_icons, hero_variant2_photos } = formData;
  
// // // // // // //   try {
// // // // // // //     // --- Step 1: Handle File Uploads for 'variant2' ---
// // // // // // //     let processedPhotos = [];
// // // // // // //     if (variant_type === 'variant2') {
// // // // // // //       processedPhotos = await Promise.all(
// // // // // // //         (hero_variant2_photos || []).map(async (photo) => {
          
// // // // // // //           // Case 1: New file to upload (photo.file is a File object)
// // // // // // //           if (photo.file) {
// // // // // // //             // 1a. Upload the new file
// // // // // // //             const { filePath } = await uploadFile('media', photo.file, 'hero-photos');
            
// // // // // // //             // 1b. Create the media_assets entry
// // // // // // //             const { data: mediaAsset, error: mediaError } = await createMediaAsset(
// // // // // // //               filePath,
// // // // // // //               photo.file.type,
// // // // // // //               title, // Use variant title as alt text
// // // // // // //               userId
// // // // // // //             );
// // // // // // //             if (mediaError) throw mediaError;

// // // // // // //             // 1c. If this was an *update* (it has photo.originalMediaId), delete the OLD file
// // // // // // //             if (photo.originalMediaId) {
// // // // // // //               const { data: oldAsset } = await supabase
// // // // // // //                 .from('media_assets')
// // // // // // //                 .select('file_path')
// // // // // // //                 .eq('id', photo.originalMediaId)
// // // // // // //                 .single();
// // // // // // //               if (oldAsset) {
// // // // // // //                 await removeFile('media', oldAsset.file_path);
// // // // // // //                 // Delete the old media_asset row
// // // // // // //                 await supabase.from('media_assets').delete().eq('id', photo.originalMediaId);
// // // // // // //               }
// // // // // // //             }

// // // // // // //             console.log('in the media error file');
// // // // // // //             console.log(mediaAsset);
// // // // // // //             return {
// // // // // // //               // --- FIX: Only include 'id' if it's a number (db id) ---
// // // // // // //               // react-hook-form IDs are strings, so this will be undefined for new items
// // // // // // //               id: isNaN(parseInt(photo.id)) ? undefined : photo.id,
// // // // // // //               media_id: mediaAsset.id, 
// // // // // // //               rotation: photo.rotation,
// // // // // // //               delay: photo.delay,
// // // // // // //             };
// // // // // // //           }
          
// // // // // // //           // Case 2: Existing photo, no changes to the file
// // // // // // //           // We just pass its data through.
// // // // // // //           return {
// // // // // // //             id: photo.id,
// // // // // // //             media_id: photo.media_id, // This is the EXISTING asset ID
// // // // // // //             rotation: photo.rotation,
// // // // // // //             delay: photo.delay,
// // // // // // //           };
// // // // // // //         })
// // // // // // //       );
// // // // // // //     }
    
// // // // // // //     // --- Step 2: Upsert the main hero_variant ---
// // // // // // //     const variantData = {
// // // // // // //       id: id || undefined, // Use ID if it exists (update), or undefined (create)
// // // // // // //       title,
// // // // // // //       subtitle,
// // // // // // //       paragraph,
// // // // // // //       variant_type,
// // // // // // //       is_active,
// // // // // // //       order: order || 0, // --- FIX: Removed quotes
// // // // // // //     };

// // // // // // //     const { data: savedVariant, error: variantError } = await supabase
// // // // // // //       .from('hero_variants')
// // // // // // //       .upsert(variantData)
// // // // // // //       .select()
// // // // // // //       .single();

// // // // // // //     if (variantError) throw variantError;

// // // // // // //     // --- Step 3: Sync nested icons or photos ---
    
// // // // // // //     if (variant_type === 'variant1') {
// // // // // // //       // Sync icons (simple: delete all existing, then add new ones)
      
// // // // // // //       // 3a. Delete all old icons for this variant
// // // // // // //       await supabase.from('hero_variant1_icons').delete().eq('hero_variant_id', savedVariant.id);

// // // // // // //       // 3b. Insert all current icons
// // // // // // //       if (hero_variant1_icons && hero_variant1_icons.length > 0) {
// // // // // // //         const iconData = hero_variant1_icons.map(icon => {
// // // // // // //           // --- FIX for [object Object] ---
// // // // // // //           // Ensure position is a valid JSON object before inserting
// // // // // // //           let pos = {};
// // // // // // //           if (typeof icon.position === 'string') {
// // // // // // //             try {
// // // // // // //               pos = JSON.parse(icon.position);
// // // // // // //             } catch (e) { /* ignore invalid json */ }
// // // // // // //           } else if (typeof icon.position === 'object' && icon.position !== null) {
// // // // // // //             pos = icon.position;
// // // // // // //           }

// // // // // // //           return {
// // // // // // //             hero_variant_id: savedVariant.id,
// // // // // // //             icon_name: icon.icon_name,
// // // // // // //             position: pos, // Send the valid JSON object
// // // // // // //           };
// // // // // // //         });
// // // // // // //         const { error: iconError } = await supabase.from('hero_variant1_icons').insert(iconData);
// // // // // // //         if (iconError) throw iconError;
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     if (variant_type === 'variant2') {
// // // // // // //       // Sync photos (complex: handle creates, updates, deletes)
      
// // // // // // //       // 3a. Get IDs of photos we just processed
// // // // // // //       const currentPhotoIds = processedPhotos.map(p => p.id).filter(Boolean);
      
// // // // // // //       // 3b. Find any photos in the DB that are *not* in our current form
// // // // // // //       const { data: existingPhotos } = await supabase
// // // // // // //         .from('hero_variant2_photos')
// // // // // // //         .select('id, media_assets(id, file_path)')
// // // // // // //         .eq('hero_variant_id', savedVariant.id);

// // // // // // //       const photosToDelete = existingPhotos.filter(p => !currentPhotoIds.includes(p.id));
      
// // // // // // //       if (photosToDelete.length > 0) {
// // // // // // //         // Delete files from storage
// // // // // // //         const filesToDelete = photosToDelete.map(p => p.media_assets?.file_path).filter(Boolean);
// // // // // // //         if (filesToDelete.length > 0) await removeFile('media', filesToDelete);
        
// // // // // // //         // Delete media_assets rows
// // // // // // //         const mediaIdsToDelete = photosToDelete.map(p => p.media_assets?.id).filter(Boolean);
// // // // // // //         if (mediaIdsToDelete.length > 0) {
// // // // // // //           // Explicitly delete photo links before asset
// // // // // // //           await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIdsToDelete);
// // // // // // //           await supabase.from('media_assets').delete().in('id', mediaIdsToDelete);
// // // // // // //         }
// // // // // // //       }

// // // // // // //       // 3c. Upsert the current list of photos
// // // // // // //       // --- FIX for "id" constraint violation ---
// // // // // // //       const photoData = processedPhotos.map(photo => {
// // // // // // //         const row = {
// // // // // // //           hero_variant_id: savedVariant.id,
// // // // // // //           media_id: photo.media_id, // This ID is now guaranteed to be non-null
// // // // // // //           rotation: photo.rotation,
// // // // // // //           delay: photo.delay,
// // // // // // //         };
        
// // // // // // //         // Only add the 'id' field if it's an UPDATE (id already exists and is a number)
// // // // // // //         if (photo.id) {
// // // // // // //           row.id = photo.id;
// // // // // // //         }
        
// // // // // // //         return row; // For new rows, 'id' will be undefined, so Supabase auto-generates it.
// // // // // // //       });
      
// // // // // // //       if(photoData.length > 0) {
// // // // // // //         // Use 'id' as the conflict resolution column
// // // // // // //         const { error: photoError } = await supabase
// // // // // // //           .from('hero_variant2_photos')
// // // // // // //           .upsert(photoData); // No onConflict needed if ID is primary key
          
// // // // // // //         if (photoError) throw photoError;
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     return { success: true, data: savedVariant };
    
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error saving hero variant:', error.message);
// // // // // // //     return { success: false, error: error.message };
// // // // // // //   }
// // // // // // // };


// // // // // // import { supabase } from '../lib/supabaseClient';
// // // // // // // Import your storage functions. We need removeFile from storage.js,
// // // // // // // and we'll use the uploadFile and createMediaAsset functions.
// // // // // // import { uploadFile, removeFile, createMediaAsset } from './storageApi';
// // // // // // import { onTableChange } from './homepage'; // Import your real-time helper

// // // // // // /**
// // // // // //  * Fetches ALL hero variants for the admin panel (both active and inactive).
// // // // // //  * This is different from the public 'fetchHeroVariants' which only gets active ones.
// // // // // //  */
// // // // // // export const getHeroVariantsAdmin = async () => {
// // // // // //   try {
// // // // // //     const { data, error } = await supabase
// // // // // //       .from('hero_variants')
// // // // // //       .select(`
// // // // // //         *,
// // // // // //         hero_variant1_icons (*),
// // // // // //         hero_variant2_photos (
// // // // // //           *,
// // // // // //           media_assets ( id, file_path, alt_text )
// // // // // //         )
// // // // // //       `)
// // // // // //       .order('order', { ascending: true }); // --- FIX: Removed quotes from "order"

// // // // // //     if (error) throw error;
// // // // // //     return data;
// // // // // //   } catch (error) {
// // // // // //     console.error('Error fetching admin hero variants:', error.message);
// // // // // //     return [];
// // // // // //   }
// // // // // // };

// // // // // // /**
// // // // // //  * Subscribes to all changes in the hero-related tables for real-time admin updates.
// // // // // //  */
// // // // // // export const subscribeToHeroChanges = (callback) => {
// // // // // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
// // // // // //   const channels = tables.map(table =>
// // // // // //     onTableChange(table, callback)
// // // // // //   );
  
// // // // // //   return {
// // // // // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // // // // //   };
// // // // // // };

// // // // // // /**
// // // // // //  * Updates the display order for all hero variants.
// // // // // //  * This is used for drag-and-drop reordering.
// // // // // //  * @param {Array} variants - An array of {id, order} objects.
// // // // // //  */
// // // // // // export const updateHeroVariantsOrder = async (variants) => {
// // // // // //   try {
// // // // // //     const updates = variants.map((variant, index) => ({
// // // // // //       id: variant.id,
// // // // // //       order: index + 1, // --- FIX: Removed quotes from "order"
// // // // // //     }));

// // // // // //     const { data, error } = await supabase
// // // // // //       .from('hero_variants')
// // // // // //       .upsert(updates);

// // // // // //     if (error) throw error;
// // // // // //     return data;
// // // // // //   } catch (error) {
// // // // // //     console.error('Error updating hero variants order:', error.message);
// // // // // //     return null;
// // // // // //   }
// // // // // // };

// // // // // // /**
// // // // // //  * Deletes a hero variant and all its associated data.
// // // // // //  * This includes nested icons, photos, media assets, and storage files.
// // // // // //  * @param {Object} variant - The full variant object to be deleted.
// // // // // //  */
// // // // // // export const deleteHeroVariant = async (variant) => {
// // // // // //   try {
// // // // // //     // 1. If it's a 'variant2', we need to delete its photos from storage.
// // // // // //     if (variant.variant_type === 'variant2' && variant.hero_variant2_photos.length > 0) {
// // // // // //       const mediaAssets = variant.hero_variant2_photos
// // // // // //         .map(p => p.media_assets)
// // // // // //         .filter(Boolean); // Filter out any nulls

// // // // // //       // 1a. Delete files from Supabase Storage
// // // // // //       const filePaths = mediaAssets.map(m => m.file_path).filter(Boolean);
// // // // // //       if (filePaths.length > 0) {
// // // // // //         // Use 'media' bucket. Assumes removeFile can handle an array.
// // // // // //         await removeFile('media', filePaths); 
// // // // // //       }
      
// // // // // //       // 1b. Delete media_assets rows
// // // // // //       const mediaIds = mediaAssets.map(m => m.id);
// // // // // //       if (mediaIds.length > 0) {
// // // // // //          // First, delete the linking rows from 'hero_variant2_photos'
// // // // // //         await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIds);
        
// // // // // //         // Then, delete the 'media_assets' rows
// // // // // //         const { error: mediaError } = await supabase
// // // // // //           .from('media_assets')
// // // // // //           .delete()
// // // // // //           .in('id', mediaIds);
// // // // // //         if (mediaError) throw new Error(`Failed to delete media assets: ${mediaError.message}`);
// // // // // //       }
// // // // // //     }
    
// // // // // //     // 2. Delete the main hero_variant row.
// // // // // //     // 'ON DELETE CASCADE' in your SQL schema will handle deleting
// // // // // //     // 'hero_variant1_icons' rows.
// // // // // //     const { error: variantError } = await supabase
// // // // // //       .from('hero_variants')
// // // // // //       .delete()
// // // // // //       .eq('id', variant.id);

// // // // // //     if (variantError) throw variantError;

// // // // // //     return { success: true };
// // // // // //   } catch (error) {
// // // // // //     console.error('Error deleting hero variant:', error.message);
// // // // // //     return { success: false, error: error.message };
// // // // // //   }
// // // // // // };


// // // // // // /**
// // // // // //  * Saves a single hero variant (creates or updates).
// // // // // //  * This is a complex transactional function.
// // // // // //  * @param {Object} formData - The data from react-hook-form.
// // // // // //  * @param {string} userId - The ID of the logged-in admin.
// // // // // //  */
// // // // // // export const saveHeroVariant = async (formData, userId) => {
// // // // // //   // Destructure all fields, including the 'order' field
// // // // // //   const { id, title, subtitle, paragraph, variant_type, is_active, order, hero_variant1_icons, hero_variant2_photos } = formData;
  
// // // // // //   try {
// // // // // //     // --- Step 1: Handle File Uploads for 'variant2' ---
// // // // // //     let processedPhotos = [];
// // // // // //     if (variant_type === 'variant2') {
// // // // // //       processedPhotos = await Promise.all(
// // // // // //         (hero_variant2_photos || []).map(async (photo) => {
          
// // // // // //           // Case 1: New file to upload (photo.file is a File object)
// // // // // //           if (photo.file) {
// // // // // //             // 1a. Upload the new file
// // // // // //             const { filePath } = await uploadFile('media', photo.file, 'hero-photos');
            
// // // // // //             // 1b. Create the media_assets entry
// // // // // //             // --- CRITICAL FIX HERE ---
// // // // // //             // createMediaAsset returns the 'data' object directly, not { data, error }
// // // // // //             const mediaAsset = await createMediaAsset(
// // // // // //               filePath,
// // // // // //               photo.file.type,
// // // // // //               title, // Use variant title as alt text
// // // // // //               userId
// // // // // //             );
// // // // // //             // This is your error: 'mediaAsset' was undefined. It will now be the media object.
// // // // // //             if (!mediaAsset) throw new Error("Media asset creation failed");

// // // // // //             // 1c. If this was an *update* (it has photo.originalMediaId), delete the OLD file
// // // // // //             if (photo.originalMediaId) {
// // // // // //               const { data: oldAsset } = await supabase
// // // // // //                 .from('media_assets')
// // // // // //                 .select('file_path')
// // // // // //                 .eq('id', photo.originalMediaId)
// // // // // //                 .single();
// // // // // //               if (oldAsset) {
// // // // // //                 await removeFile('media', oldAsset.file_path);
// // // // // //                 // Delete the old media_asset row
// // // // // //                 await supabase.from('media_assets').delete().eq('id', photo.originalMediaId);
// // // // // //               }
// // // // // //             }
            
// // // // // //             console.log('in the media error file');
// // // // // //             console.log(mediaAsset); // This will no longer be undefined
// // // // // //             return {
// // // // // //               // react-hook-form IDs are strings, so this will be undefined for new items
// // // // // //               id: isNaN(parseInt(photo.id)) ? undefined : photo.id,
// // // // // //               media_id: mediaAsset.id, // --- This will now work ---
// // // // // //               rotation: photo.rotation,
// // // // // //               delay: photo.delay,
// // // // // //             };
// // // // // //           }
          
// // // // // //           // Case 2: Existing photo, no changes to the file
// // // // // //           // We just pass its data through.
// // // // // //           return {
// // // // // //             id: photo.id,
// // // // // //             media_id: photo.media_id, // This is the EXISTING asset ID
// // // // // //             rotation: photo.rotation,
// // // // // //             delay: photo.delay,
// // // // // //           };
// // // // // //         })
// // // // // //       );
// // // // // //     }
    
// // // // // //     // --- Step 2: Upsert the main hero_variant ---
// // // // // //     const variantData = {
// // // // // //       id: id || undefined, // Use ID if it exists (update), or undefined (create)
// // // // // //       title,
// // // // // //       subtitle,
// // // // // //       paragraph,
// // // // // //       variant_type,
// // // // // //       is_active,
// // // // // //       order: order || 0, // --- FIX: Removed quotes
// // // // // //     };

// // // // // //     const { data: savedVariant, error: variantError } = await supabase
// // // // // //       .from('hero_variants')
// // // // // //       .upsert(variantData)
// // // // // //       .select()
// // // // // //       .single();

// // // // // //     if (variantError) throw variantError;

// // // // // //     // --- Step 3: Sync nested icons or photos ---
    
// // // // // //     if (variant_type === 'variant1') {
// // // // // //       // Sync icons (simple: delete all existing, then add new ones)
      
// // // // // //       // 3a. Delete all old icons for this variant
// // // // // //       await supabase.from('hero_variant1_icons').delete().eq('hero_variant_id', savedVariant.id);

// // // // // //       // 3b. Insert all current icons
// // // // // //       if (hero_variant1_icons && hero_variant1_icons.length > 0) {
// // // // // //         const iconData = hero_variant1_icons.map(icon => {
// // // // // //           // --- FIX for [object Object] ---
// // // // // //           // Ensure position is a valid JSON object before inserting
// // // // // //           let pos = {};
// // // // // //           if (typeof icon.position === 'string') {
// // // // // //             try {
// // // // // //               pos = JSON.parse(icon.position);
// // // // // //             } catch (e) { /* ignore invalid json */ }
// // // // // //           } else if (typeof icon.position === 'object' && icon.position !== null) {
// // // // // //             pos = icon.position;
// // // // // //           }

// // // // // //           return {
// // // // // //             hero_variant_id: savedVariant.id,
// // // // // //             icon_name: icon.icon_name,
// // // // // //             position: pos, // Send the valid JSON object
// // // // // //           };
// // // // // //         });
// // // // // //         const { error: iconError } = await supabase.from('hero_variant1_icons').insert(iconData);
// // // // // //         if (iconError) throw iconError;
// // // // // //       }
// // // // // //     }
    
// // // // // //     if (variant_type === 'variant2') {
// // // // // //       // Sync photos (complex: handle creates, updates, deletes)
      
// // // // // //       // 3a. Get IDs of photos we just processed
// // // // // //       const currentPhotoIds = processedPhotos.map(p => p.id).filter(Boolean);
      
// // // // // //       // 3b. Find any photos in the DB that are *not* in our current form
// // // // // //       const { data: existingPhotos } = await supabase
// // // // // //         .from('hero_variant2_photos')
// // // // // //         .select('id, media_assets(id, file_path)')
// // // // // //         .eq('hero_variant_id', savedVariant.id);

// // // // // //       const photosToDelete = existingPhotos.filter(p => !currentPhotoIds.includes(p.id));
      
// // // // // //       if (photosToDelete.length > 0) {
// // // // // //         // Delete files from storage
// // // // // //         const filesToDelete = photosToDelete.map(p => p.media_assets?.file_path).filter(Boolean);
// // // // // //         if (filesToDelete.length > 0) await removeFile('media', filesToDelete);
        
// // // // // //         // Delete media_assets rows
// // // // // //         const mediaIdsToDelete = photosToDelete.map(p => p.media_assets?.id).filter(Boolean);
// // // // // //         if (mediaIdsToDelete.length > 0) {
// // // // // //           // Explicitly delete photo links before asset
// // // // // //           await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIdsToDelete);
// // // // // //           await supabase.from('media_assets').delete().in('id', mediaIdsToDelete);
// // // // // //         }
// // // // // //       }

// // // // // //       // 3c. Upsert the current list of photos
// // // // // //       // --- FIX for "id" constraint violation ---
// // // // // //       console.log('getting id constraints for these inserts');
// // // // // //       console.log(processedPhotos);

// // // // // //       const photoData = processedPhotos.map(photo => {
// // // // // //         const row = {
// // // // // //           hero_variant_id: savedVariant.id,
// // // // // //           media_id: photo.media_id, // This ID is now guaranteed to be non-null
// // // // // //           rotation: photo.rotation,
// // // // // //           delay: photo.delay,
// // // // // //         };
        
// // // // // //         // Only add the 'id' field if it's an UPDATE (id already exists and is a number)
// // // // // //         if (photo.id) {
// // // // // //           row.id = photo.id;
// // // // // //         }
        
// // // // // //         return row; // For new rows, 'id' will be undefined, so Supabase auto-generates it.
// // // // // //       });
      
// // // // // //       if(photoData.length > 0) {
// // // // // //         // Use 'id' as the conflict resolution column
// // // // // //         const { error: photoError } = await supabase
// // // // // //           .from('hero_variant2_photos')
// // // // // //           .upsert(photoData, { onConflict: 'id' });
          
// // // // // //         if (photoError) throw photoError;
// // // // // //       }
// // // // // //     }
    
// // // // // //     return { success: true, data: savedVariant };
    
// // // // // //   } catch (error) {
// // // // // //     console.error('Error saving hero variant:', error.message);
// // // // // //     return { success: false, error: error.message };
// // // // // //   }
// // // // // // };

// // // // // import { supabase } from '../lib/supabaseClient';
// // // // // // Import your storage functions. We need all of these.
// // // // // import { uploadFile, removeFile, createMediaAsset } from './storageApi';
// // // // // import { onTableChange } from './homepage'; // Import your real-time helper

// // // // // /**
// // // // //  * Fetches ALL hero variants for the admin panel (both active and inactive).
// // // // //  */
// // // // // export const getHeroVariantsAdmin = async () => {
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('hero_variants')
// // // // //       .select(`
// // // // //         *,
// // // // //         hero_variant1_icons (*),
// // // // //         hero_variant2_photos (
// // // // //           *,
// // // // //           media_assets ( id, file_path, alt_text )
// // // // //         )
// // // // //       `)
// // // // //       .order('order', { ascending: true }); // --- FIX: Removed quotes from "order"

// // // // //     if (error) throw error;
// // // // //     return data;
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching admin hero variants:', error.message);
// // // // //     return [];
// // // // //   }
// // // // // };

// // // // // /**
// // // // //  * Subscribes to all changes in the hero-related tables for real-time admin updates.
// // // // //  */
// // // // // export const subscribeToHeroChanges = (callback) => {
// // // // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
// // // // //   const channels = tables.map(table =>
// // // // //     onTableChange(table, callback)
// // // // //   );
  
// // // // //   return {
// // // // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // // // //   };
// // // // // };

// // // // // /**
// // // // //  * Updates the display order for all hero variants.
// // // // //  */
// // // // // export const updateHeroVariantsOrder = async (variants) => {
// // // // //   try {
// // // // //     const updates = variants.map((variant, index) => ({
// // // // //       id: variant.id,
// // // // //       order: index + 1, // --- FIX: Removed quotes from "order"
// // // // //     }));

// // // // //     const { data, error } = await supabase
// // // // //       .from('hero_variants')
// // // // //       .upsert(updates);

// // // // //     if (error) throw error;
// // // // //     return data;
// // // // //   } catch (error) {
// // // // //     console.error('Error updating hero variants order:', error.message);
// // // // //     return null;
// // // // //   }
// // // // // };

// // // // // /**
// // // // //  * Deletes a hero variant and all its associated data.
// // // // //  */
// // // // // export const deleteHeroVariant = async (variant) => {
// // // // //   try {
// // // // //     // 1. If it's a 'variant2', delete its photos
// // // // //     if (variant.variant_type === 'variant2' && variant.hero_variant2_photos.length > 0) {
// // // // //       const mediaAssets = variant.hero_variant2_photos
// // // // //         .map(p => p.media_assets)
// // // // //         .filter(Boolean);

// // // // //       // 1a. Delete files from Storage
// // // // //       const filePaths = mediaAssets.map(m => m.file_path).filter(Boolean);
// // // // //       if (filePaths.length > 0) {
// // // // //         await removeFile('media', filePaths); 
// // // // //       }
      
// // // // //       // 1b. Delete media_assets rows
// // // // //       const mediaIds = mediaAssets.map(m => m.id);
// // // // //       if (mediaIds.length > 0) {
// // // // //         // First, delete the linking rows from 'hero_variant2_photos'
// // // // //         await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIds);
        
// // // // //         // Then, delete the 'media_assets' rows
// // // // //         const { error: mediaError } = await supabase
// // // // //           .from('media_assets')
// // // // //           .delete()
// // // // //           .in('id', mediaIds);
// // // // //         if (mediaError) throw new Error(`Failed to delete media assets: ${mediaError.message}`);
// // // // //       }
// // // // //     }
    
// // // // //     // 2. Delete the main hero_variant row
// // // // //     // CASCADE will handle 'hero_variant1_icons'
// // // // //     const { error: variantError } = await supabase
// // // // //       .from('hero_variants')
// // // // //       .delete()
// // // // //       .eq('id', variant.id);

// // // // //     if (variantError) throw variantError;

// // // // //     return { success: true };
// // // // //   } catch (error) {
// // // // //     console.error('Error deleting hero variant:', error.message);
// // // // //     return { success: false, error: error.message };
// // // // //   }
// // // // // };


// // // // // /**
// // // // //  * Saves a single hero variant (creates or updates).
// // // // //  */
// // // // // export const saveHeroVariant = async (formData, userId) => {
// // // // //   const { id, title, subtitle, paragraph, variant_type, is_active, order, hero_variant1_icons, hero_variant2_photos } = formData;
  
// // // // //   try {
// // // // //     // --- Step 1: Handle File Uploads for 'variant2' ---
// // // // //     let processedPhotos = [];
// // // // //     if (variant_type === 'variant2') {
// // // // //       processedPhotos = await Promise.all(
// // // // //         (hero_variant2_photos || []).map(async (photo) => {
          
// // // // //           // Case 1: New file to upload (photo.file is a File object)
// // // // //           if (photo.file) {
// // // // //             // 1a. Upload the new file
// // // // //             const { filePath } = await uploadFile('media', photo.file, 'hero-photos');
            
// // // // //             // 1b. Create the media_assets entry
// // // // //             // --- CRITICAL FIX 1: 'mediaAsset' is the direct result ---
// // // // //             const mediaAsset = await createMediaAsset(
// // // // //               filePath,
// // // // //               photo.file.type,
// // // // //               title, // Use variant title as alt text
// // // // //               userId
// // // // //             );
// // // // //             if (!mediaAsset) throw new Error("Media asset creation failed");

// // // // //             // 1c. If this was an *update* (it has photo.originalMediaId), delete the OLD file
// // // // //             if (photo.originalMediaId) {
// // // // //               const { data: oldAsset } = await supabase
// // // // //                 .from('media_assets')
// // // // //                 .select('file_path')
// // // // //                 .eq('id', photo.originalMediaId)
// // // // //                 .single();
// // // // //               if (oldAsset) {
// // // // //                 await removeFile('media', oldAsset.file_path);
// // // // //                 await supabase.from('media_assets').delete().eq('id', photo.originalMediaId);
// // // // //               }
// // // // //             }
            
// // // // //             return {
// // // // //               // --- CRITICAL FIX 2: Check if photo.id is a *number* ---
// // // // //               // A new field's ID from useFieldArray is a string, which we want to ignore.
// // // // //               id: (typeof photo.id === 'number') ? photo.id : undefined,
// // // // //               media_id: mediaAsset.id, // This will now work
// // // // //               rotation: photo.rotation,
// // // // //               delay: photo.delay,
// // // // //             };
// // // // //           }
          
// // // // //           // Case 2: Existing photo, no changes to the file
// // // // //           return {
// // // // //             id: photo.id,
// // // // //             media_id: photo.media_id,
// // // // //             rotation: photo.rotation,
// // // // //             delay: photo.delay,
// // // // //           };
// // // // //         })
// // // // //       );
// // // // //     }
    
// // // // //     // --- Step 2: Upsert the main hero_variant ---
// // // // //     const variantData = {
// // // // //       id: id || undefined, 
// // // // //       title,
// // // // //       subtitle,
// // // // //       paragraph,
// // // // //       variant_type,
// // // // //       is_active,
// // // // //       order: order || 0, // --- FIX: Removed quotes
// // // // //     };

// // // // //     const { data: savedVariant, error: variantError } = await supabase
// // // // //       .from('hero_variants')
// // // // //       .upsert(variantData)
// // // // //       .select()
// // // // //       .single();

// // // // //     if (variantError) throw variantError;

// // // // //     // --- Step 3: Sync nested icons or photos ---
    
// // // // //     if (variant_type === 'variant1') {
// // // // //       // Sync icons (simple: delete all existing, then add new ones)
// // // // //       await supabase.from('hero_variant1_icons').delete().eq('hero_variant_id', savedVariant.id);
// // // // //       if (hero_variant1_icons && hero_variant1_icons.length > 0) {
// // // // //         const iconData = hero_variant1_icons.map(icon => {
// // // // //           let pos = {};
// // // // //           if (typeof icon.position === 'string') {
// // // // //             try { pos = JSON.parse(icon.position); } catch (e) { /* ignore */ }
// // // // //           } else if (typeof icon.position === 'object' && icon.position !== null) {
// // // // //             pos = icon.position;
// // // // //           }
// // // // //           return {
// // // // //             hero_variant_id: savedVariant.id,
// // // // //             icon_name: icon.icon_name,
// // // // //             position: pos,
// // // // //           };
// // // // //         });
// // // // //         const { error: iconError } = await supabase.from('hero_variant1_icons').insert(iconData);
// // // // //         if (iconError) throw iconError;
// // // // //       }
// // // // //     }
    
// // // // //     if (variant_type === 'variant2') {
// // // // //       // Sync photos (complex: handle creates, updates, deletes)
// // // // //       const currentPhotoIds = processedPhotos.map(p => p.id).filter(Boolean);
// // // // //       const { data: existingPhotos } = await supabase
// // // // //         .from('hero_variant2_photos')
// // // // //         .select('id, media_assets(id, file_path)')
// // // // //         .eq('hero_variant_id', savedVariant.id);

// // // // //       const photosToDelete = existingPhotos.filter(p => !currentPhotoIds.includes(p.id));
      
// // // // //       if (photosToDelete.length > 0) {
// // // // //         const filesToDelete = photosToDelete.map(p => p.media_assets?.file_path).filter(Boolean);
// // // // //         if (filesToDelete.length > 0) await removeFile('media', filesToDelete);
        
// // // // //         const mediaIdsToDelete = photosToDelete.map(p => p.media_assets?.id).filter(Boolean);
// // // // //         if (mediaIdsToDelete.length > 0) {
// // // // //           await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIdsToDelete);
// // // // //           await supabase.from('media_assets').delete().in('id', mediaIdsToDelete);
// // // // //         }
// // // // //       }

// // // // //       // 3c. Upsert the current list of photos
// // // // //       const photoData = processedPhotos.map(photo => {
// // // // //         const row = {
// // // // //           hero_variant_id: savedVariant.id,
// // // // //           media_id: photo.media_id,
// // // // //           rotation: photo.rotation,
// // // // //           delay: photo.delay,
// // // // //         };
        
// // // // //         // --- CRITICAL FIX 3: Only add 'id' if it's a *number* ---
// // // // //         if (typeof photo.id === 'number' && photo.id > 0) {
// // // // //           row.id = photo.id;
// // // // //         }
        
// // // // //         // If 'id' is undefined or a string, we omit it.
// // // // //         // Supabase will correctly auto-generate a new ID.
// // // // //         return row;
// // // // //       });
      
// // // // //       if(photoData.length > 0) {
// // // // //         const { error: photoError } = await supabase
// // // // //           .from('hero_variant2_photos')
// // // // //           .upsert(photoData); // Upsert will now work
          
// // // // //         if (photoError) throw photoError;
// // // // //       }
// // // // //     }
    
// // // // //     return { success: true, data: savedVariant };
    
// // // // //   } catch (error) {
// // // // //     console.error('Error saving hero variant:', error.message);
// // // // //     return { success: false, error: error.message };
// // // // //   }
// // // // // };





// // // // import { supabase } from '../lib/supabaseClient';
// // // // // Import your storage functions. We need all of these.
// // // // import { uploadFile, removeFile, createMediaAsset } from './storageApi';
// // // // import { onTableChange } from './homepage'; // Import your real-time helper

// // // // /**
// // // //  * Fetches ALL hero variants for the admin panel (both active and inactive).
// // // //  */
// // // // export const getHeroVariantsAdmin = async () => {
// // // //   try {
// // // //     const { data, error } = await supabase
// // // //       .from('hero_variants')
// // // //       .select(`
// // // //         *,
// // // //         hero_variant1_icons (*),
// // // //         hero_variant2_photos (
// // // //           *,
// // // //           media_assets ( id, file_path, alt_text )
// // // //         )
// // // //       `)
// // // //       .order('order', { ascending: true }); // --- FIX: Removed quotes from "order"

// // // //     if (error) throw error;
// // // //     return data;
// // // //   } catch (error) {
// // // //     console.error('Error fetching admin hero variants:', error.message);
// // // //     return [];
// // // //   }
// // // // };

// // // // /**
// // // //  * Subscribes to all changes in the hero-related tables for real-time admin updates.
// // // //  */
// // // // export const subscribeToHeroChanges = (callback) => {
// // // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
// // // //   const channels = tables.map(table =>
// // // //     onTableChange(table, callback)
// // // //   );
  
// // // //   return {
// // // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // // //   };
// // // // };

// // // // /**
// // // //  * Updates the display order for all hero variants.
// // // //  */
// // // // export const updateHeroVariantsOrder = async (variants) => {
// // // //   try {
// // // //     const updates = variants.map((variant, index) => ({
// // // //       id: variant.id,
// // // //       order: index + 1, // --- FIX: Removed quotes from "order"
// // // //     }));

// // // //     const { data, error } = await supabase
// // // //       .from('hero_variants')
// // // //       .upsert(updates);

// // // //     if (error) throw error;
// // // //     return data;
// // // //   } catch (error) {
// // // //     console.error('Error updating hero variants order:', error.message);
// // // //     return null;
// // // //   }
// // // // };

// // // // /**
// // // //  * Deletes a hero variant and all its associated data.
// // // //  */
// // // // export const deleteHeroVariant = async (variant) => {
// // // //   try {
// // // //     // 1. If it's a 'variant2', delete its photos
// // // //     if (variant.variant_type === 'variant2' && variant.hero_variant2_photos.length > 0) {
// // // //       const mediaAssets = variant.hero_variant2_photos
// // // //         .map(p => p.media_assets)
// // // //         .filter(Boolean);

// // // //       // 1a. Delete files from Storage
// // // //       const filePaths = mediaAssets.map(m => m.file_path).filter(Boolean);
// // // //       if (filePaths.length > 0) {
// // // //         await removeFile('media', filePaths); 
// // // //       }
      
// // // //       // 1b. Delete media_assets rows
// // // //       const mediaIds = mediaAssets.map(m => m.id);
// // // //       if (mediaIds.length > 0) {
// // // //         // First, delete the linking rows from 'hero_variant2_photos'
// // // //         await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIds);
        
// // // //         // Then, delete the 'media_assets' rows
// // // //         const { error: mediaError } = await supabase
// // // //           .from('media_assets')
// // // //           .delete()
// // // //           .in('id', mediaIds);
// // // //         if (mediaError) throw new Error(`Failed to delete media assets: ${mediaError.message}`);
// // // //       }
// // // //     }
    
// // // //     // 2. Delete the main hero_variant row
// // // //     // CASCADE will handle 'hero_variant1_icons'
// // // //     const { error: variantError } = await supabase
// // // //       .from('hero_variants')
// // // //       .delete()
// // // //       .eq('id', variant.id);

// // // //     if (variantError) throw variantError;

// // // //     return { success: true };
// // // //   } catch (error) {
// // // //     console.error('Error deleting hero variant:', error.message);
// // // //     return { success: false, error: error.message };
// // // //   }
// // // // };


// // // // /**
// // // //  * Saves a single hero variant (creates or updates).
// // // //  */
// // // // export const saveHeroVariant = async (formData, userId) => {
// // // //   const { id, title, subtitle, paragraph, variant_type, is_active, order, hero_variant1_icons, hero_variant2_photos } = formData;
  
// // // //   try {
// // // //     // --- Step 1: Handle File Uploads for 'variant2' ---
// // // //     let processedPhotos = [];
// // // //     if (variant_type === 'variant2') {
// // // //       processedPhotos = await Promise.all(
// // // //         (hero_variant2_photos || []).map(async (photo) => {
          
// // // //           // Case 1: New file to upload (photo.file is a File object)
// // // //           if (photo.file) {
// // // //             // 1a. Upload the new file
// // // //             const { filePath } = await uploadFile('media', photo.file, 'hero-photos');
            
// // // //             // 1b. Create the media_assets entry
// // // //             // --- CRITICAL FIX 1: 'mediaAsset' is the direct result ---
// // // //             const mediaAsset = await createMediaAsset(
// // // //               filePath,
// // // //               photo.file.type,
// // // //               title, // Use variant title as alt text
// // // //               userId
// // // //             );
// // // //             if (!mediaAsset) throw new Error("Media asset creation failed");

// // // //             // 1c. If this was an *update* (it has photo.originalMediaId), delete the OLD file
// // // //             if (photo.originalMediaId) {
// // // //               const { data: oldAsset } = await supabase
// // // //                 .from('media_assets')
// // // //                 .select('file_path')
// // // //                 .eq('id', photo.originalMediaId)
// // // //                 .single();
// // // //               if (oldAsset) {
// // // //                 await removeFile('media', oldAsset.file_path);
// // // //                 await supabase.from('media_assets').delete().eq('id', photo.originalMediaId);
// // // //               }
// // // //             }
            
// // // //             return {
// // // //               // --- CRITICAL FIX 2: Check if photo.id is a *number* ---
// // // //               // A new field's ID from useFieldArray is a string, which we want to ignore.
// // // //               id: (typeof photo.id === 'number') ? photo.id : undefined,
// // // //               media_id: mediaAsset.id, // This will now work
// // // //               rotation: photo.rotation,
// // // //               delay: photo.delay,
// // // //             };
// // // //           }
          
// // // //           // Case 2: Existing photo, no changes to the file
// // // //           return {
// // // //             id: photo.id,
// // // //             media_id: photo.media_id,
// // // //             rotation: photo.rotation,
// // // //             delay: photo.delay,
// // // //           };
// // // //         })
// // // //       );
// // // //     }
    
// // // //     // --- Step 2: Upsert the main hero_variant ---
// // // //     const variantData = {
// // // //       id: id || undefined, 
// // // //       title,
// // // //       subtitle,
// // // //       paragraph,
// // // //       variant_type,
// // // //       is_active,
// // // //       order: order || 0, // --- FIX: Removed quotes
// // // //     };

// // // //     const { data: savedVariant, error: variantError } = await supabase
// // // //       .from('hero_variants')
// // // //       .upsert(variantData)
// // // //       .select()
// // // //       .single();

// // // //     if (variantError) throw variantError;

// // // //     // --- Step 3: Sync nested icons or photos ---
    
// // // //     if (variant_type === 'variant1') {
// // // //       // Sync icons (simple: delete all existing, then add new ones)
// // // //       await supabase.from('hero_variant1_icons').delete().eq('hero_variant_id', savedVariant.id);
// // // //       if (hero_variant1_icons && hero_variant1_icons.length > 0) {
// // // //         const iconData = hero_variant1_icons.map(icon => {
// // // //           let pos = {};
// // // //           if (typeof icon.position === 'string') {
// // // //             try { pos = JSON.parse(icon.position); } catch (e) { /* ignore */ }
// // // //           } else if (typeof icon.position === 'object' && icon.position !== null) {
// // // //             pos = icon.position;
// // // //           }
// // // //           return {
// // // //             hero_variant_id: savedVariant.id,
// // // //             icon_name: icon.icon_name,
// // // //             position: pos,
// // // //           };
// // // //         });
// // // //         const { error: iconError } = await supabase.from('hero_variant1_icons').insert(iconData);
// // // //         if (iconError) throw iconError;
// // // //       }
// // // //     }
    
// // // //     if (variant_type === 'variant2') {
// // // //       // Sync photos (complex: handle creates, updates, deletes)
// // // //       const currentPhotoIds = processedPhotos.map(p => p.id).filter(Boolean);
// // // //       const { data: existingPhotos } = await supabase
// // // //         .from('hero_variant2_photos')
// // // //         .select('id, media_assets(id, file_path)')
// // // //         .eq('hero_variant_id', savedVariant.id);

// // // //       const photosToDelete = existingPhotos.filter(p => !currentPhotoIds.includes(p.id));
      
// // // //       if (photosToDelete.length > 0) {
// // // //         const filesToDelete = photosToDelete.map(p => p.media_assets?.file_path).filter(Boolean);
// // // //         if (filesToDelete.length > 0) await removeFile('media', filesToDelete);
        
// // // //         const mediaIdsToDelete = photosToDelete.map(p => p.media_assets?.id).filter(Boolean);
// // // //         if (mediaIdsToDelete.length > 0) {
// // // //           await supabase.from('hero_variant2_photos').delete().in('media_id', mediaIdsToDelete);
// // // //           await supabase.from('media_assets').delete().in('id', mediaIdsToDelete);
// // // //         }
// // // //       }

// // // //       // 3c. Upsert the current list of photos
// // // //       const photoData = processedPhotos.map(photo => {
// // // //         const row = {
// // // //           hero_variant_id: savedVariant.id,
// // // //           media_id: photo.media_id,
// // // //           rotation: photo.rotation,
// // // //           delay: photo.delay,
// // // //         };
        
// // // //         // --- CRITICAL FIX 3: Only add 'id' if it's a *number* ---
// // // //         if (typeof photo.id === 'number' && photo.id > 0) {
// // // //           row.id = photo.id;
// // // //         }
        
// // // //         // If 'id' is undefined or a string, we omit it.
// // // //         // Supabase will correctly auto-generate a new ID.
// // // //         return row;
// // // //       });
      
// // // //       if(photoData.length > 0) {
// // // //         const { error: photoError } = await supabase
// // // //           .from('hero_variant2_photos')
// // // //           .upsert(photoData); // Upsert will now work
          
// // // //         if (photoError) throw photoError;
// // // //       }
// // // //     }
    
// // // //     return { success: true, data: savedVariant };
    
// // // //   } catch (error) {
// // // //     console.error('Error saving hero variant:', error.message);
// // // //     return { success: false, error: error.message };
// // // //   }
// // // // };






// // // import { supabase } from '../lib/supabaseClient';
// // // import { onTableChange } from './homepage'; // Reuse the subscription helper

// // // /**
// // //  * =================================================================
// // //  * Public URL Helper
// // //  * =================================================================
// // //  */

// // // // Simple helper to get the public URL for a file path.
// // // export const getStorageUrl = (mediaAsset) => {
// // //   if (!mediaAsset?.file_path) return null;
// // //   const { data } = supabase.storage
// // //     .from('media_assets') // Assumes your bucket name is 'media_assets'
// // //     .getPublicUrl(mediaAsset.file_path);
// // //   return data.publicUrl;
// // // };

// // // /**
// // //  * =================================================================
// // //  * Read & Subscribe
// // //  * =================================================================
// // //  */

// // // // Fetches ALL variants for the admin panel (active and inactive)
// // // export async function getHeroVariantsAdmin() {
// // //   try {
// // //     const { data, error } = await supabase
// // //       .from('hero_variants')
// // //       .select(`
// // //         *,
// // //         hero_variant1_icons (*),
// // //         hero_variant2_photos (
// // //           *,
// // //           media_assets ( id, file_path, alt_text )
// // //         )
// // //       `)
// // //       .order('order'); // Order by 'order' for the Reorder component

// // //     if (error) throw error;
// // //     return data;
// // //   } catch (error) {
// // //     console.error('Error fetching admin hero variants:', error.message);
// // //     return [];
// // //   }
// // // }

// // // // Subscribes to all changes. We can just re-export the one from homepage.js
// // // export const subscribeToHeroChanges = (callback) => {
// // //   // Listen to all 4 tables that make up the hero
// // //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
  
// // //   const channels = tables.map(table => 
// // //     onTableChange(table, (payload) => {
// // //       console.log(`Change detected on ${table}`, payload);
// // //       callback(); // Call the same callback for any change
// // //     })
// // //   );

// // //   // Return a custom unsubscribe function
// // //   return {
// // //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// // //   };
// // // };

// // // /**
// // //  * =================================================================
// // //  * Update (Order Only)
// // //  * =================================================================
// // //  */

// // // // Updates the 'order' field for a list of variants
// // // export async function updateHeroVariantsOrder(variants) {
// // //   try {
// // //     const updates = variants.map((variant, index) => ({
// // //       id: variant.id,
// // //       order: index,
// // //     }));

// // //     const { error } = await supabase.from('hero_variants').upsert(updates);
// // //     if (error) throw error;
// // //     return { success: true };
// // //   } catch (error) {
// // //     console.error('Error updating hero order:', error.message);
// // //     return { success: false, error };
// // //   }
// // // }

// // // /**
// // //  * =================================================================
// // //  * Delete
// // //  * =================================================================
// // //  */

// // // // Deletes a hero variant and all its related children and assets
// // // export async function deleteHeroVariant(variant) {
// // //   try {
// // //     // 1. Get all media_ids from hero_variant2_photos before deleting
// // //     const { data: photos } = await supabase
// // //       .from('hero_variant2_photos')
// // //       .select('id, media_id')
// // //       .eq('hero_variant_id', variant.id);

// // //     // 2. Delete child rows (icons and photos)
// // //     // We can do this in parallel
// // //     await Promise.all([
// // //       supabase
// // //         .from('hero_variant1_icons')
// // //         .delete()
// // //         .eq('hero_variant_id', variant.id),
// // //       supabase
// // //         .from('hero_variant2_photos')
// // //         .delete()
// // //         .eq('hero_variant_id', variant.id),
// // //     ]);
    
// // //     // 3. Delete the main hero_variant row
// // //     const { error: variantError } = await supabase
// // //       .from('hero_variants')
// // //       .delete()
// // //       .eq('id', variant.id);
// // //     if (variantError) throw variantError;
    
// // //     // 4. Clean up storage (after db records are gone)
// // //     if (photos && photos.length > 0) {
// // //       const mediaIds = photos.map(p => p.media_id).filter(Boolean);
// // //       await deleteMediaAssets(mediaIds);
// // //     }
    
// // //     return { success: true };
// // //   } catch (error) {
// // //     console.error('Error deleting variant:', error.message);
// // //     return { success: false, error };
// // //   }
// // // }

// // // /**
// // //  * =================================================================
// // //  * Create / Update (The "Save" Function)
// // //  * =================================================================
// // //  */

// // // // This is the core function for saving.
// // // // It handles create, update, file uploads, and file deletions.
// // // export async function saveHeroVariant(formData, userId) {
// // //   if (!userId) {
// // //     return { success: false, error: { message: 'User not authenticated.' }};
// // //   }

// // //   try {
// // //     // --- 1. Separate main data and nested data ---
// // //     const { 
// // //       hero_variant1_icons: icons, 
// // //       hero_variant2_photos: photos, 
// // //       ...mainData 
// // //     } = formData;

// // //     // --- 2. Process File Uploads (if any) ---
// // //     // This is the most complex part. We must upload new files
// // //     // BEFORE we save the 'hero_variant2_photos' records.
// // //     const processedPhotos = await processPhotoUploads(photos, userId);

// // //     // --- 3. Save the Main hero_variants Record ---
// // //     // `upsert` handles both create (if id is null) and update (if id exists).
// // //     const { data: variantData, error: variantError } = await supabase
// // //       .from('hero_variants')
// // //       .upsert({ ...mainData })
// // //       .select()
// // //       .single();
      
// // //     if (variantError) throw variantError;
// // //     const heroVariantId = variantData.id;

// // //     // --- 4. Process Nested Icon & Photo Records ---
// // //     // Now that we have the main variant ID, we can link the children.
// // //     const [iconError, photoError] = await Promise.all([
// // //       syncNestedIcons(heroVariantId, icons),
// // //       syncNestedPhotos(heroVariantId, processedPhotos.photosToSave),
// // //     ]);
    
// // //     if (iconError) throw iconError;
// // //     if (photoError) throw photoError;
    
// // //     // --- 5. Clean up deleted assets (if any) ---
// // //     // This runs *after* everything else is successful.
// // //     if (processedPhotos.mediaIdsToDelete.length > 0) {
// // //       await deleteMediaAssets(processedPhotos.mediaIdsToDelete);
// // //     }
    
// // //     return { success: true, data: variantData };

// // //   } catch (error) {
// // //     console.error('Error saving hero variant:', error.message);
// // //     return { success: false, error };
// // //   }
// // // }

// // // /**
// // //  * =================================================================
// // //  * Helper Functions for 'saveHeroVariant'
// // //  * =================================================================
// // //  */

// // // /**
// // //  * Handles uploading new files, preparing data for the database,
// // //  * and collecting old media_ids for deletion.
// // //  */
// // // async function processPhotoUploads(photos, userId) {
// // //   const photosToSave = [];
// // //   const mediaIdsToDelete = [];
  
// // //   for (const photo of photos) {
// // //     // Case 1: A new file was uploaded.
// // //     if (photo.file) {
// // //       const { data: newMediaAsset, error } = await uploadMediaAsset(photo.file, userId);
// // //       if (error) throw error;
      
// // //       // Prep for saving to 'hero_variant2_photos' table
// // //       photosToSave.push({
// // //         ...photo,
// // //         media_id: newMediaAsset.id,
// // //         // Remove client-side fields
// // //         file: undefined,
// // //         originalMediaId: undefined,
// // //         media_assets: undefined, 
// // //       });

// // //       // If this upload replaced an *existing* image, mark the old one for deletion.
// // //       if (photo.originalMediaId) {
// // //         mediaIdsToDelete.push(photo.originalMediaId);
// // //       }
// // //     } 
// // //     // Case 2: An existing photo was removed from the array (in the UI).
// // //     // The `syncNestedPhotos` function will handle this, but if the `originalMediaId`
// // //     // is present on an item *without* a file, it's just being kept.
// // //     else if (photo.media_id) {
// // //       // Just re-save the existing data.
// // //       photosToSave.push({
// // //         ...photo,
// // //         // Remove client-side fields
// // //         file: undefined,
// // //         originalMediaId: undefined,
// // //         media_assets: undefined,
// // //       });
// // //     }
// // //     // Case 3: A newly-added photo item was removed before saving (no media_id, no file).
// // //     // We just ignore it, and it won't be in `photosToSave`.
// // //   }
  
// // //   return { photosToSave, mediaIdsToDelete };
// // // }

// // // /**
// // //  * Uploads a file to Supabase Storage AND creates a record in the 'media_assets' table.
// // //  */
// // // async function uploadMediaAsset(file, userId) {
// // //   const fileExt = file.name.split('.').pop();
// // //   const filePath = `${userId}/${Date.now()}.${fileExt}`;

// // //   // 1. Upload to Storage
// // //   const { error: uploadError } = await supabase.storage
// // //     .from('media_assets') // Bucket name
// // //     .upload(filePath, file);
    
// // //   if (uploadError) throw uploadError;

// // //   // 2. Create record in 'media_assets' table
// // //   const { data, error: insertError } = await supabase
// // //     .from('media_assets')
// // //     .insert({
// // //       file_path: filePath,
// // //       file_type: file.type,
// // //       alt_text: file.name, // A reasonable default
// // //       uploaded_by: userId,
// // //     })
// // //     .select('id, file_path') // Return the new ID and path
// // //     .single();
    
// // //   if (insertError) throw insertError;
// // //   return { data, error: null };
// // // }

// // // /**
// // //  * Deletes one or more media assets from Storage and the 'media_assets' table.
// // //  */
// // // async function deleteMediaAssets(mediaIds) {
// // //   if (!mediaIds || mediaIds.length === 0) return;
  
// // //   // 1. Get file paths from the media_assets table
// // //   const { data: assets, error: selectError } = await supabase
// // //     .from('media_assets')
// // //     .select('id, file_path')
// // //     .in('id', mediaIds);
    
// // //   if (selectError) {
// // //     console.error('Error selecting media assets for deletion:', selectError);
// // //     return; // Don't block the main flow
// // //   }

// // //   const filePaths = assets.map(a => a.file_path);

// // //   // 2. Delete files from Storage
// // //   if (filePaths.length > 0) {
// // //     const { error: storageError } = await supabase.storage
// // //       .from('media_assets')
// // //       .remove(filePaths);
// // //     if (storageError) {
// // //       console.error('Error deleting from storage:', storageError);
// // //     }
// // //   }
  
// // //   // 3. Delete records from 'media_assets' table
// // //   // This will cascade-delete the 'hero_variant2_photos' rows if configured,
// // //   // but we do it manually to be safe.
// // //   const { error: dbError } = await supabase
// // //     .from('media_assets')
// // //     .delete()
// // //     .in('id', mediaIds);
    
// // //   if (dbError) {
// // //     console.error('Error deleting from media_assets table:', dbError);
// // //   }
// // // }

// // // /**
// // //  * Compares the list of icons from the form with the database.
// // //  * Upserts new/changed icons, and deletes any that were removed.
// // //  */
// // // async function syncNestedIcons(heroVariantId, icons) {
// // //   // 1. Parse JSON string back into an object for 'position'
// // //   const iconsToSave = icons.map(icon => ({
// // //     id: icon.id || undefined, // Use undefined for new items
// // //     hero_variant_id: heroVariantId,
// // //     icon_name: icon.icon_name,
// // //     // Safely parse the JSON string
// // //     position: (typeof icon.position === 'string') 
// // //                 ? JSON.parse(icon.position) 
// // //                 : icon.position,
// // //   }));
  
// // //   // 2. Upsert all icons from the form
// // //   const { error: upsertError } = await supabase
// // //     .from('hero_variant1_icons')
// // //     .upsert(iconsToSave);

// // //   if (upsertError) return upsertError;
  
// // //   // 3. Delete any icons that are no longer in the list
// // //   const newIds = iconsToSave.map(i => i.id).filter(Boolean);
// // //   const { error: deleteError } = await supabase
// // //     .from('hero_variant1_icons')
// // //     .delete()
// // //     .eq('hero_variant_id', heroVariantId) // Only for this variant
// // //     .not('id', 'in', `(${newIds.join(',')})`); // Don't delete the ones we just saved
    
// // //   return deleteError;
// // // }

// // // /**
// // //  * Syncs 'hero_variant2_photos' similarly to the icons.
// // //  */
// // // async function syncNestedPhotos(heroVariantId, photos) {
// // //   // 1. Prep data for upsert
// // //   const photosToSave = photos.map(photo => ({
// // //     id: photo.id || undefined,
// // //     hero_variant_id: heroVariantId,
// // //     media_id: photo.media_id,
// // //     rotation: photo.rotation,
// // //     delay: photo.delay,
// // //   }));
  
// // //   // 2. Upsert all photos
// // //   const { error: upsertError } = await supabase
// // //     .from('hero_variant2_photos')
// // //     .upsert(photosToSave);
    
// // //   if (upsertError) return upsertError;

// // //   // 3. Delete any photos no longer in the list
// // //   const newIds = photosToSave.map(p => p.id).filter(Boolean);
// // //   const { error: deleteError } = await supabase
// // //     .from('hero_variant2_photos')
// // //     .delete()
// // //     .eq('hero_variant_id', heroVariantId)
// // //     .not('id', 'in', `(${newIds.join(',')})`);

// // //   return deleteError;
// // // }




// // import { supabase } from '../lib/supabaseClient';
// // import { onTableChange } from './homepage'; // Reuse the subscription helper

// // /**
// //  * =================================================================
// //  * Public URL Helper
// //  * =================================================================
// //  */
// // export const getStorageUrl = (mediaAsset) => {
// //   if (!mediaAsset?.file_path) return null;
// //   // Handle if it's already a full URL (e.g., from a local file preview)
// //   if (mediaAsset.file_path.startsWith('http')) {
// //     return mediaAsset.file_path;
// //   }
// //   const { data } = supabase.storage
// //     .from('media_assets') // Assumes your bucket name is 'media_assets'
// //     .getPublicUrl(mediaAsset.file_path);
// //   return data.publicUrl;
// // };

// // /**
// //  * =================================================================
// //  * Read & Subscribe
// //  * =================================================================
// //  */
// // export async function getHeroVariantsAdmin() {
// //   try {
// //     const { data, error } = await supabase
// //       .from('hero_variants')
// //       .select(`
// //         *,
// //         hero_variant1_icons (*),
// //         hero_variant2_photos (
// //           *,
// //           media_assets ( id, file_path, alt_text )
// //         )
// //       `)
// //       .order('order');

// //     if (error) throw error;
// //     return data;
// //   } catch (error) {
// //     console.error('Error fetching admin hero variants:', error.message);
// //     return [];
// //   }
// // }

// // export const subscribeToHeroChanges = (callback) => {
// //   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
  
// //   const channels = tables.map(table => 
// //     onTableChange(table, (payload) => {
// //       console.log(`Change detected on ${table}`, payload);
// //       callback(); 
// //     })
// //   );

// //   return {
// //     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
// //   };
// // };

// // /**
// //  * =================================================================
// //  * Update (Order Only)
// //  * =================================================================
// //  */
// // export async function updateHeroVariantsOrder(variants) {
// //   try {
// //     const updates = variants.map((variant, index) => ({
// //       id: variant.id,
// //       order: index,
// //     }));

// //     const { error } = await supabase.from('hero_variants').upsert(updates);
// //     if (error) throw error;
// //     return { success: true };
// //   } catch (error) {
// //     console.error('Error updating hero order:', error.message);
// //     return { success: false, error };
// //   }
// // }

// // /**
// //  * =================================================================
// //  * Delete
// //  * =================================================================
// //  */
// // export async function deleteHeroVariant(variant) {
// //   try {
// //     const { data: photos } = await supabase
// //       .from('hero_variant2_photos')
// //       .select('id, media_id')
// //       .eq('hero_variant_id', variant.id);

// //     await Promise.all([
// //       supabase
// //         .from('hero_variant1_icons')
// //         .delete()
// //         .eq('hero_variant_id', variant.id),
// //       supabase
// //         .from('hero_variant2_photos')
// //         .delete()
// //         .eq('hero_variant_id', variant.id),
// //     ]);
    
// //     const { error: variantError } = await supabase
// //       .from('hero_variants')
// //       .delete()
// //       .eq('id', variant.id);
// //     if (variantError) throw variantError;
    
// //     if (photos && photos.length > 0) {
// //       const mediaIds = photos.map(p => p.media_id).filter(Boolean);
// //       await deleteMediaAssets(mediaIds);
// //     }
    
// //     return { success: true };
// //   } catch (error) {
// //     console.error('Error deleting variant:', error.message);
// //     return { success: false, error };
// //   }
// // }

// // /**
// //  * =================================================================
// //  * Create / Update (The "Save" Function)
// //  * =================================================================
// //  */
// // export async function saveHeroVariant(formData, userId) {
// //   if (!userId) {
// //     return { success: false, error: { message: 'User not authenticated.' }};
// //   }

// //   try {
// //     const { 
// //       hero_variant1_icons: icons, 
// //       hero_variant2_photos: photos, 
// //       ...mainData 
// //     } = formData;

// //     const processedPhotos = await processPhotoUploads(photos, userId);

// //     const { data: variantData, error: variantError } = await supabase
// //       .from('hero_variants')
// //       .upsert({ ...mainData })
// //       .select()
// //       .single();
      
// //     if (variantError) throw variantError;
// //     const heroVariantId = variantData.id;

// //     // --- 4. Process Nested Icon & Photo Records ---
// //     const [iconError, photoError] = await Promise.all([
// //       syncNestedIcons(heroVariantId, icons),
// //       syncNestedPhotos(heroVariantId, processedPhotos.photosToSave),
// //     ]);
    
// //     if (iconError) throw iconError;
// //     if (photoError) throw photoError;
    
// //     if (processedPhotos.mediaIdsToDelete.length > 0) {
// //       await deleteMediaAssets(processedPhotos.mediaIdsToDelete);
// //     }
    
// //     return { success: true, data: variantData };

// //   } catch (error) {
// //     console.error('Error saving hero variant:', error.message);
// //     return { success: false, error };
// //   }
// // }

// // /**
// //  * =================================================================
// //  * Helper Functions for 'saveHeroVariant'
// //  * =================================================================
// //  */
// // async function processPhotoUploads(photos, userId) {
// //   const photosToSave = [];
// //   const mediaIdsToDelete = [];
  
// //   for (const photo of photos) {
// //     if (photo.file) {
// //       const { data: newMediaAsset, error } = await uploadMediaAsset(photo.file, userId);
// //       if (error) throw error;
      
// //       photosToSave.push({
// //         ...photo,
// //         media_id: newMediaAsset.id,
// //         file: undefined,
// //         originalMediaId: undefined,
// //         media_assets: undefined, 
// //       });

// //       if (photo.originalMediaId) {
// //         mediaIdsToDelete.push(photo.originalMediaId);
// //       }
// //     } 
// //     else if (photo.media_id) {
// //       photosToSave.push({
// //         ...photo,
// //         file: undefined,
// //         originalMediaId: undefined,
// //         media_assets: undefined,
// //       });
// //     }
// //   }
  
// //   return { photosToSave, mediaIdsToDelete };
// // }

// // async function uploadMediaAsset(file, userId) {
// //   const fileExt = file.name.split('.').pop();
// //   const filePath = `${userId}/${Date.now()}.${fileExt}`;

// //   const { error: uploadError } = await supabase.storage
// //     .from('media_assets') // Bucket name
// //     .upload(filePath, file);
    
// //   if (uploadError) throw uploadError;

// //   const { data, error: insertError } = await supabase
// //     .from('media_assets')
// //     .insert({
// //       file_path: filePath,
// //       file_type: file.type,
// //       alt_text: file.name,
// //       uploaded_by: userId,
// //     })
// //     .select('id, file_path')
// //     .single();
    
// //   if (insertError) throw insertError;
// //   return { data, error: null };
// // }

// // async function deleteMediaAssets(mediaIds) {
// //   if (!mediaIds || mediaIds.length === 0) return;
  
// //   const { data: assets, error: selectError } = await supabase
// //     .from('media_assets')
// //     .select('id, file_path')
// //     .in('id', mediaIds);
    
// //   if (selectError) {
// //     console.error('Error selecting media assets for deletion:', selectError);
// //     return;
// //   }

// //   const filePaths = assets.map(a => a.file_path);

// //   if (filePaths.length > 0) {
// //     const { error: storageError } = await supabase.storage
// //       .from('media_assets')
// //       .remove(filePaths);
// //     if (storageError) {
// //       console.error('Error deleting from storage:', storageError);
// //     }
// //   }
  
// //   const { error: dbError } = await supabase
// //     .from('media_assets')
// //     .delete()
// //     .in('id', mediaIds);
    
// //   if (dbError) {
// //     console.error('Error deleting from media_assets table:', dbError);
// //   }
// // }

// // /**
// //  * === THE BUG FIX IS HERE (Icons) ===
// //  */
// // async function syncNestedIcons(heroVariantId, icons) {
// //   // 1. Prep data for upsert
// //   const iconsToSave = icons.map(icon => {
// //     // Clean up the position object, removing empty keys (like { top: '10', bottom: '' })
// //     const cleanPosition = {};
// //     if (icon.position) {
// //       Object.keys(icon.position).forEach(key => {
// //         if (icon.position[key]) { // Only add keys that have a value
// //           cleanPosition[key] = icon.position[key];
// //         }
// //       });
// //     }

// //     return {
// //       // --- FIX: Change (null or 0) to undefined. ---
// //       // This tells upsert to use the default sequence for new items.
// //       id: icon.id ? icon.id : undefined, 
// //       hero_variant_id: heroVariantId,
// //       icon_name: icon.icon_name,
// //       position: cleanPosition,
// //     };
// //   });
  
// //   // 2. Upsert all icons
// //   // --- FIX: Added .select('id') ---
// //   // This returns the IDs of ALL saved items, *including the new ones*.
// //   const { data: upsertedData, error: upsertError } = await supabase
// //     .from('hero_variant1_icons')
// //     .upsert(iconsToSave)
// //     .select('id');
    
// //   if (upsertError) return upsertError;
  
// //   // 3. Delete any icons that are no longer in the list
// //   // --- FIX: Use the IDs returned from the upsert ---
// //   const savedIds = upsertedData.map(i => i.id).filter(Boolean);
// //   if (savedIds.length === 0) return; // Nothing to save, so don't delete everything
  
// //   const { error: deleteError } = await supabase
// //     .from('hero_variant1_icons')
// //     .delete()
// //     .eq('hero_variant_id', heroVariantId) // Only for this variant
// //     .not('id', 'in', `(${savedIds.join(',')})`); // Don't delete the ones we just saved
    
// //   return deleteError;
// // }

// // /**
// //  * === THE BUG FIX IS HERE (Photos) ===
// //  */
// // async function syncNestedPhotos(heroVariantId, photos) {
// //   // 1. Prep data for upsert
// //   const photosToSave = photos.map(photo => ({
// //     // --- FIX: Change (null or 0) to undefined. ---
// //     // This tells upsert to use the default sequence for new items.
// //     id: photo.id ? photo.id : undefined,
// //     hero_variant_id: heroVariantId,
// //     media_id: photo.media_id,
// //     rotation: photo.rotation,
// //     delay: photo.delay,
// //   }));
  
// //   // 2. Upsert all photos
// //   // --- FIX: Added .select('id') ---
// //   // This returns the IDs of ALL saved items, *including the new ones*.
// //   const { data: upsertedData, error: upsertError } = await supabase
// //     .from('hero_variant2_photos')
// //     .upsert(photosToSave)
// //     .select('id');
    
// //   if (upsertError) return upsertError;

// //   // 3. Delete any photos no longer in the list
// //   // --- FIX: Use the IDs returned from the upsert ---
// //   const savedIds = upsertedData.map(p => p.id).filter(Boolean);
// //   if (savedIds.length === 0) return; // Nothing to save, so don't delete everything
  
// //   const { error: deleteError } = await supabase
// //     .from('hero_variant2_photos')
// //     .delete()
// //     .eq('hero_variant_id', heroVariantId)
// //     .not('id', 'in', `(${savedIds.join(',')})`);

// //   return deleteError;
// // }




// import { supabase } from '../lib/supabaseClient';
// import { onTableChange } from './homepage'; // Reuse the subscription helper

// /**
//  * =================================================================
//  * Public URL Helper
//  * =================================================================
//  */
// export const getStorageUrl = (mediaAsset) => {
//   if (!mediaAsset?.file_path) return null;
//   // Handle if it's already a full URL (e.g., from a local file preview)
//   if (mediaAsset.file_path.startsWith('http')) {
//     return mediaAsset.file_path;
//   }
//   const { data } = supabase.storage
//     .from('media_assets') // Assumes your bucket name is 'media_assets'
//     .getPublicUrl(mediaAsset.file_path);
//   return data.publicUrl;
// };

// /**
//  * =================================================================
//  * Read & Subscribe (Unchanged)
//  * =================================================================
//  */
// export async function getHeroVariantsAdmin() {
//   try {
//     const { data, error } = await supabase
//       .from('hero_variants')
//       .select(`
//         *,
//         hero_variant1_icons (*),
//         hero_variant2_photos (
//           *,
//           media_assets ( id, file_path, alt_text )
//         )
//       `)
//       .order('order');

//     if (error) throw error;
//     return data;
//   } catch (error) {
//     console.error('Error fetching admin hero variants:', error.message);
//     return [];
//   }
// }

// export const subscribeToHeroChanges = (callback) => {
//   const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
  
//   const channels = tables.map(table => 
//     onTableChange(table, (payload) => {
//       console.log(`Change detected on ${table}`, payload);
//       callback(); 
//     })
//   );

//   return {
//     unsubscribe: () => channels.forEach(channel => channel.unsubscribe())
//   };
// };

// /**
//  * =================================================================
//  * Update (Order Only) (Unchanged)
//  * =================================================================
//  */
// export async function updateHeroVariantsOrder(variants) {
//   try {
//     const updates = variants.map((variant, index) => ({
//       id: variant.id,
//       order: index,
//     }));

//     const { error } = await supabase.from('hero_variants').upsert(updates);
//     if (error) throw error;
//     return { success: true };
//   } catch (error) {
//     console.error('Error updating hero order:', error.message);
//     return { success: false, error };
//   }
// }

// /**
//  * =================================================================
//  * Delete (Unchanged)
//  * =================================================================
//  */
// export async function deleteHeroVariant(variant) {
//   try {
//     const { data: photos } = await supabase
//       .from('hero_variant2_photos')
//       .select('id, media_id')
//       .eq('hero_variant_id', variant.id);

//     await Promise.all([
//       supabase
//         .from('hero_variant1_icons')
//         .delete()
//         .eq('hero_variant_id', variant.id),
//       supabase
//         .from('hero_variant2_photos')
//         .delete()
//         .eq('hero_variant_id', variant.id),
//     ]);
    
//     const { error: variantError } = await supabase
//       .from('hero_variants')
//       .delete()
//       .eq('id', variant.id);
//     if (variantError) throw variantError;
    
//     if (photos && photos.length > 0) {
//       const mediaIds = photos.map(p => p.media_id).filter(Boolean);
//       await deleteMediaAssets(mediaIds);
//     }
    
//     return { success: true };
//   } catch (error) {
//     console.error('Error deleting variant:', error.message);
//     return { success: false, error };
//   }
// }

// /**
//  * =================================================================
//  * Create / Update (The "Save" Function) (Unchanged)
//  * =================================================================
//  */
// export async function saveHeroVariant(formData, userId) {
//   if (!userId) {
//     return { success: false, error: { message: 'User not authenticated.' }};
//   }

//   try {
//     const { 
//       hero_variant1_icons: icons, 
//       hero_variant2_photos: photos, 
//       ...mainData 
//     } = formData;

//     const processedPhotos = await processPhotoUploads(photos, userId);

//     const { data: variantData, error: variantError } = await supabase
//       .from('hero_variants')
//       .upsert({ ...mainData })
//       .select()
//       .single();
      
//     if (variantError) throw variantError;
//     const heroVariantId = variantData.id;

//     // --- 4. Process Nested Icon & Photo Records ---
//     // These functions now contain the bug fix
//     const [iconError, photoError] = await Promise.all([
//       syncNestedIcons(heroVariantId, icons),
//       syncNestedPhotos(heroVariantId, processedPhotos.photosToSave),
//     ]);
    
//     if (iconError) throw iconError;
//     if (photoError) throw photoError;
    
//     if (processedPhotos.mediaIdsToDelete.length > 0) {
//       await deleteMediaAssets(processedPhotos.mediaIdsToDelete);
//     }
    
//     return { success: true, data: variantData };

//   } catch (error) {
//     console.error('Error saving hero variant:', error.message);
//     return { success: false, error };
//   }
// }

// /**
//  * =================================================================
//  * Helper Functions for 'saveHeroVariant' (Unchanged)
//  * =================================================================
//  */
// async function processPhotoUploads(photos, userId) {
//   const photosToSave = [];
//   const mediaIdsToDelete = [];
  
//   // Guard against null 'photos'
//   if (!photos) {
//     return { photosToSave: [], mediaIdsToDelete: [] };
//   }

//   for (const photo of photos) {
//     if (photo.file) {
//       const { data: newMediaAsset, error } = await uploadMediaAsset(photo.file, userId);
//       if (error) throw error;
      
//       photosToSave.push({
//         ...photo,
//         media_id: newMediaAsset.id,
//         file: undefined,
//         originalMediaId: undefined,
//         media_assets: undefined, 
//       });

//       if (photo.originalMediaId) {
//         mediaIdsToDelete.push(photo.originalMediaId);
//       }
//     } 
//     else if (photo.media_id) {
//       photosToSave.push({
//         ...photo,
//         file: undefined,
//         originalMediaId: undefined,
//         media_assets: undefined,
//       });
//     }
//   }
  
//   return { photosToSave, mediaIdsToDelete };
// }

// async function uploadMediaAsset(file, userId) {
//   const fileExt = file.name.split('.').pop();
//   const filePath = `${userId}/${Date.now()}.${fileExt}`;

//   const { error: uploadError } = await supabase.storage
//     .from('media_assets') // Bucket name
//     .upload(filePath, file);
    
//   if (uploadError) throw uploadError;

//   const { data, error: insertError } = await supabase
//     .from('media_assets')
//     .insert({
//       file_path: filePath,
//       file_type: file.type,
//       alt_text: file.name,
//       uploaded_by: userId,
//     })
//     .select('id, file_path')
//     .single();
    
//   if (insertError) throw insertError;
//   return { data, error: null };
// }

// async function deleteMediaAssets(mediaIds) {
//   if (!mediaIds || mediaIds.length === 0) return;
  
//   const { data: assets, error: selectError } = await supabase
//     .from('media_assets')
//     .select('id, file_path')
//     .in('id', mediaIds);
    
//   if (selectError) {
//     console.error('Error selecting media assets for deletion:', selectError);
//     return;
//   }

//   const filePaths = assets.map(a => a.file_path);

//   if (filePaths.length > 0) {
//     const { error: storageError } = await supabase.storage
//       .from('media_assets')
//       .remove(filePaths);
//     if (storageError) {
//       console.error('Error deleting from storage:', storageError);
//     }
//   }
  
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
//  * === BUG FIX AREA (ICONS) ===
//  * This function now splits new and existing items.
//  * =================================================================
//  */
// async function syncNestedIcons(heroVariantId, icons) {
//   const iconsToSave = (icons || []).map(icon => {
//     // Clean up the position object, removing empty keys
//     const cleanPosition = {};
//     if (icon.position) {
//       Object.keys(icon.position).forEach(key => {
//         if (icon.position[key]) { 
//           cleanPosition[key] = icon.position[key];
//         }
//       });
//     }

//     return {
//       id: icon.id ? icon.id : undefined, 
//       hero_variant_id: heroVariantId,
//       icon_name: icon.icon_name,
//       position: cleanPosition,
//     };
//   });

//   // --- FIX: Split into new and existing ---
//   const newIcons = iconsToSave
//     .filter(icon => !icon.id)
//     .map(({ id, ...rest }) => rest); // Remove 'id: undefined'

//   const existingIcons = iconsToSave.filter(icon => icon.id);
  
//   // --- Run operations in parallel ---
//   const [insertResult, upsertResult] = await Promise.all([
//     supabase.from('hero_variant1_icons').insert(newIcons).select('id'),
//     supabase.from('hero_variant1_icons').upsert(existingIcons).select('id')
//   ]);
  
//   if (insertResult.error) return insertResult.error;
//   if (upsertResult.error) return upsertResult.error;
  
//   // --- Combine results for deletion ---
//   const savedIds = [
//     ...(insertResult.data || []).map(i => i.id),
//     ...(upsertResult.data || []).map(i => i.id)
//   ].filter(Boolean);

//   // --- Delete orphans ---
//   const deleteQuery = supabase
//     .from('hero_variant1_icons')
//     .delete()
//     .eq('hero_variant_id', heroVariantId);
    
//   if (savedIds.length > 0) {
//     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
//   }
    
//   const { error: deleteError } = await deleteQuery;
//   return deleteError;
// }

// /**
//  * =================================================================
//  * === BUG FIX AREA (PHOTOS) ===
//  * This function now splits new and existing items.
//  * =================================================================
//  */
// async function syncNestedPhotos(heroVariantId, photos) {
//   const photosToSave = (photos || []).map(photo => ({
//     id: photo.id ? photo.id : undefined,
//     hero_variant_id: heroVariantId,
//     media_id: photo.media_id,
//     rotation: photo.rotation,
//     delay: photo.delay,
//   }));
  
//   // --- FIX: Split into new and existing ---
//   const newPhotos = photosToSave
//     .filter(p => !p.id)
//     .map(({ id, ...rest }) => rest); // Remove 'id: undefined'

//   const existingPhotos = photosToSave.filter(p => p.id);

//   // --- Run operations in parallel ---
//   const [insertResult, upsertResult] = await Promise.all([
//     supabase.from('hero_variant2_photos').insert(newPhotos).select('id'),
//     supabase.from('hero_variant2_photos').upsert(existingPhotos).select('id')
//   ]);

//   if (insertResult.error) return insertResult.error;
//   if (upsertResult.error) return upsertResult.error;

//   // --- Combine results for deletion ---
//   const savedIds = [
//     ...(insertResult.data || []).map(p => p.id),
//     ...(upsertResult.data || []).map(p => p.id)
//   ].filter(Boolean);

//   // --- Delete orphans ---
//   const deleteQuery = supabase
//     .from('hero_variant2_photos')
//     .delete()
//     .eq('hero_variant_id', heroVariantId);
    
//   if (savedIds.length > 0) {
//     deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
//   }

//   const { error: deleteError } = await deleteQuery;
//   return deleteError;
// }




import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; 

// --- UNCHANGED FUNCTIONS (getStorageUrl, getHeroVariantsAdmin, etc.) ---

export const getStorageUrl = (mediaAsset) => {
  if (!mediaAsset?.file_path) return null;
  if (mediaAsset.file_path.startsWith('http')) {
    return mediaAsset.file_path;
  }
  const { data } = supabase.storage
    .from('media')
    .getPublicUrl(mediaAsset.file_path);
  
  // --- ADDED SAFETY CHECK ---
  // This prevents a 'TypeError' if the file doesn't exist
  if (!data || !data.publicUrl) {
    console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
    return null;
  }
  return data.publicUrl;
};

export async function getHeroVariantsAdmin() {
  try {
    const { data, error } = await supabase
      .from('hero_variants')
      .select(`
        *,
        hero_variant1_icons (*),
        hero_variant2_photos (
          *,
          media_assets ( id, file_path, alt_text )
        )
      `)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin hero variants:', error.message);
    return [];
  }
}

export const subscribeToHeroChanges = (callback) => {
  const tables = ['hero_variants', 'hero_variant1_icons', 'hero_variant2_photos', 'media_assets'];
  
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

export async function updateHeroVariantsOrder(variants) {
  try {
    const updates = variants.map((variant, index) => ({
      id: variant.id,
      order: index,
    }));

    const { error } = await supabase.from('hero_variants').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating hero order:', error.message);
    return { success: false, error };
  }
}

export async function deleteHeroVariant(variant) {
  try {
    const { data: photos } = await supabase
      .from('hero_variant2_photos')
      .select('id, media_id')
      .eq('hero_variant_id', variant.id);

    await Promise.all([
      supabase
        .from('hero_variant1_icons')
        .delete()
        .eq('hero_variant_id', variant.id),
      supabase
        .from('hero_variant2_photos')
        .delete()
        .eq('hero_variant_id', variant.id),
    ]);
    
    const { error: variantError } = await supabase
      .from('hero_variants')
      .delete()
      .eq('id', variant.id);
    if (variantError) throw variantError;
    
    if (photos && photos.length > 0) {
      const mediaIds = photos.map(p => p.media_id).filter(Boolean);
      await deleteMediaAssets(mediaIds);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting variant:', error.message);
    return { success: false, error };
  }
}

export async function saveHeroVariant(formData, userId) {
  if (!userId) {
    return { success: false, error: { message: 'User not authenticated.' }};
  }

  try {
    const { 
      hero_variant1_icons: icons, 
      hero_variant2_photos: photos, 
      ...mainData 
    } = formData;

    // --- Pass userId to processPhotoUploads for 'uploaded_by' field ---
    const processedPhotos = await processPhotoUploads(photos, userId);

    const { data: variantData, error: variantError } = await supabase
      .from('hero_variants')
      .upsert({ ...mainData })
      .select()
      .single();
      
    if (variantError) throw variantError;
    const heroVariantId = variantData.id;

    const [iconError, photoError] = await Promise.all([
      syncNestedIcons(heroVariantId, icons),
      syncNestedPhotos(heroVariantId, processedPhotos.photosToSave),
    ]);
    
    if (iconError) throw iconError;
    if (photoError) throw photoError;
    
    if (processedPhotos.mediaIdsToDelete.length > 0) {
      await deleteMediaAssets(processedPhotos.mediaIdsToDelete);
    }
    
    return { success: true, data: variantData };

  } catch (error) {
    console.error('Error saving hero variant:', error.message);
    return { success: false, error };
  }
}

async function processPhotoUploads(photos, userId) {
  const photosToSave = [];
  const mediaIdsToDelete = [];
  
  if (!photos) {
    return { photosToSave: [], mediaIdsToDelete: [] };
  }

  for (const photo of photos) {
    if (photo.file) {
      // --- Pass userId for 'uploaded_by' ---
      const { data: newMediaAsset, error } = await uploadMediaAsset(photo.file, userId);
      if (error) throw error;
      
      photosToSave.push({
        ...photo,
        media_id: newMediaAsset.id,
        file: undefined,
        originalMediaId: undefined,
        media_assets: undefined, 
      });

      if (photo.originalMediaId) {
        mediaIdsToDelete.push(photo.originalMediaId);
      }
    } 
    else if (photo.media_id) {
      photosToSave.push({
        ...photo,
        file: undefined,
        originalMediaId: undefined,
        media_assets: undefined,
      });
    }
  }
  
  return { photosToSave, mediaIdsToDelete };
}

// 
// --- 
// --- THIS IS THE FIXED FUNCTION ---
// --- 
//
/**
 * Uploads a file to a PUBLIC folder and creates a record in the 'media_assets' table.
 */
async function uploadMediaAsset(file, userId) {
  // Sanitize file name to prevent errors
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
  const fileExt = cleanFileName.split('.').pop();
  const fileName = `${Date.now()}-${cleanFileName}`;

  // --- FIX: Save to a 'public' folder, not a user-specific one ---
  // This ensures all hero images are publicly accessible
  const filePath = `public/${fileName}`;

  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from('media') // Bucket name
    .upload(filePath, file);
    
  if (uploadError) throw uploadError;

  // 2. Create record in 'media_assets' table
  const { data, error: insertError } = await supabase
    .from('media_assets')
    .insert({
      file_path: filePath, // This will be 'public/12345-image.png'
      file_type: file.type,
      alt_text: file.name,
      uploaded_by: userId, // Still track who uploaded it
    })
    .select('id, file_path') // Return the new ID and path
    .single();
    
  if (insertError) throw insertError;
  return { data, error: null };
}

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
      .from('media')
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

// --- UNCHANGED ROBUST SYNC FUNCTIONS ---

async function syncNestedIcons(heroVariantId, icons) {
  const iconsToSave = (icons || []).map(icon => {
    const cleanPosition = {};
    if (icon.position) {
      Object.keys(icon.position).forEach(key => {
        if (icon.position[key]) { 
          cleanPosition[key] = icon.position[key];
        }
      });
    }

    return {
      id: icon.id ? icon.id : undefined, 
      hero_variant_id: heroVariantId,
      icon_name: icon.icon_name,
      position: cleanPosition,
    };
  });

  const newIcons = iconsToSave
    .filter(icon => !icon.id)
    .map(({ id, ...rest }) => rest); 

  const existingIcons = iconsToSave.filter(icon => icon.id);
  
  const [insertResult, upsertResult] = await Promise.all([
    supabase.from('hero_variant1_icons').insert(newIcons).select('id'),
    supabase.from('hero_variant1_icons').upsert(existingIcons).select('id')
  ]);
  
  if (insertResult.error) return insertResult.error;
  if (upsertResult.error) return upsertResult.error;
  
  const savedIds = [
    ...(insertResult.data || []).map(i => i.id),
    ...(upsertResult.data || []).map(i => i.id)
  ].filter(Boolean);

  const deleteQuery = supabase
    .from('hero_variant1_icons')
    .delete()
    .eq('hero_variant_id', heroVariantId);
    
  if (savedIds.length > 0) {
    deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
  }
    
  const { error: deleteError } = await deleteQuery;
  return deleteError;
}

async function syncNestedPhotos(heroVariantId, photos) {
  const photosToSave = (photos || []).map(photo => ({
    id: photo.id ? photo.id : undefined,
    hero_variant_id: heroVariantId,
    media_id: photo.media_id,
    rotation: photo.rotation,
    delay: photo.delay,
  }));
  
  const newPhotos = photosToSave
    .filter(p => !p.id)
    .map(({ id, ...rest }) => rest); 

  const existingPhotos = photosToSave.filter(p => p.id);

  const [insertResult, upsertResult] = await Promise.all([
    supabase.from('hero_variant2_photos').insert(newPhotos).select('id'),
    supabase.from('hero_variant2_photos').upsert(existingPhotos).select('id')
  ]);

  if (insertResult.error) return insertResult.error;
  if (upsertResult.error) return upsertResult.error;

  const savedIds = [
    ...(insertResult.data || []).map(p => p.id),
    ...(upsertResult.data || []).map(p => p.id)
  ].filter(Boolean);

  const deleteQuery = supabase
    .from('hero_variant2_photos')
    .delete()
    .eq('hero_variant_id', heroVariantId);
    
  if (savedIds.length > 0) {
    deleteQuery.not('id', 'in', `(${savedIds.join(',')})`);
  }

  const { error: deleteError } = await deleteQuery;
  return deleteError;
}