// import { supabase } from '../lib/supabaseClient';
// import { onTableChange } from './homepage'; // Reusing our subscription helper

// /**
//  * =================================================================
//  * Public URL Helper
//  * =================================================================
//  */
// export const getStorageUrl = (mediaAsset) => {
//   if (!mediaAsset?.file_path) return null;
//   if (mediaAsset.file_path.startsWith('http')) {
//     return mediaAsset.file_path;
//   }
//   const { data } = supabase.storage
//     .from('media') // Use the 'media' bucket
//     .getPublicUrl(mediaAsset.file_path);

//   if (!data || !data.publicUrl) {
//     console.warn(`Could not get public URL for: ${mediaAsset.file_path}`);
//     return null;
//   }
//   return data.publicUrl;
// };

// /**
//  * =================================================================
//  * Read & Subscribe
//  * =================================================================
//  */

// /**
//  * Fetches the single about_hero row.
//  * @returns {object} - The about_hero object.
//  */
// export async function getAboutHeroAdmin() {
//   try {
//     const { data, error } = await supabase
//       .from('about_hero')
//       .select(`
//         *,
//         media_assets ( id, file_path, alt_text )
//       `)
//       .eq('id', 1) // This is a singleton table
//       .single();

//     if (error) throw error;
//     return data;
//   } catch (error) {
//      if (error.code === 'PGRST116') { // "single()" row not found
//       return { id: 1, title: '', subtitle: '', description: '', media_id: null };
//     }
//     console.error('Error fetching About Hero:', error.message);
//     return null;
//   }
// }

// /**
//  * Fetches all about_hero_stats for the admin panel.
//  * @returns {Array} - A list of stat objects.
//  */
// export async function getAboutHeroStatsAdmin() {
//   try {
//     const { data, error } = await supabase
//       .from('about_hero_stats')
//       .select(`*`)
//       .order('order');

//     if (error) throw error;
//     return data;
//   } catch (error) {
//     console.error('Error fetching admin stats:', error.message);
//     return [];
//   }
// }

// /**
//  * Subscribes to changes on all relevant tables.
//  * @param {function} callback - The function to call on any change.
//  * @returns {object} - The subscription channel.
//  */
// export const subscribeToAboutHeroChanges = (callback) => {
//   const tables = ['about_hero', 'about_hero_stats', 'media_assets'];
  
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
//  * Update: `about_hero` (Singleton)
//  * =================================================================
//  */

// /**
//  * Saves the about_hero data.
//  * @param {object} formData - The form data for the hero.
//  * @param {string} userId - The ID of the authenticated user.
//  * @returns {object} - { success: true, data } or { success: false, error }
//  */
// export async function saveAboutHero(formData, userId) {
//   if (!userId) {
//     return { success: false, error: { message: 'User not authenticated.' }};
//   }

//   try {
//     let dbData = { ...formData };
//     const mediaIdsToDelete = [];

//     // --- Handle Main Image Upload ---
//     if (dbData.file) {
//       const newMedia = await uploadMediaAsset(dbData.file, userId);
//       dbData.media_id = newMedia.id; // Set new media_id
//       if (dbData.original_media_id) {
//         mediaIdsToDelete.push(dbData.original_media_id);
//       }
//     } else if (dbData.media_id === null && dbData.original_media_id) {
//       // Handle removal
//       mediaIdsToDelete.push(dbData.original_media_id);
//     }

//     // --- Clean up helper fields before upsert ---
//     delete dbData.file;
//     delete dbData.original_media_id;
//     delete dbData.media_assets; // Remove joined data
    
//     // --- Upsert the about_hero record ---
//     const { data, error } = await supabase
//       .from('about_hero')
//       .upsert(dbData) // This will update the row with id=1
//       .select()
//       .single();

//     if (error) throw error;

//     // --- Clean up any replaced/deleted assets ---
//     if (mediaIdsToDelete.length > 0) {
//       await deleteMediaAssets(mediaIdsToDelete);
//     }
    
//     return { success: true, data };

//   } catch (error) {
//     console.error('Error saving about hero:', error.message);
//     return { success: false, error };
//   }
// }

// /**
//  * =================================================================
//  * CRUD: `about_hero_stats` (List)
//  * =================================================================
//  */

// /**
//  * Saves a single stat (creates or updates).
//  * @param {object} statData - The form data for the stat.
//  * @returns {object} - { success: true } or { success: false, error }
//  */
// export async function saveAboutHeroStat(statData) {
//   try {
//     const { error } = await supabase
//       .from('about_hero_stats')
//       .upsert(statData)
//       .select()
//       .single();

//     if (error) throw error;
//     return { success: true };
//   } catch (error) {
//     console.error('Error saving stat:', error.message);
//     return { success: false, error };
//   }
// }

// /**
//  * Deletes a stat.
//  * @param {object} stat - The stat object to delete.
//  * @returns {object} - { success: true } or { success: false, error }
//  */
// export async function deleteAboutHeroStat(stat) {
//   try {
//     const { error } = await supabase
//       .from('about_hero_stats')
//       .delete()
//       .eq('id', stat.id);
      
//     if (error) throw error;
//     return { success: true };
//   } catch (error) {
//     console.error('Error deleting stat:', error.message);
//     return { success: false, error };
//   }
// }

// /**
//  * Updates the 'order' field for a list of stats.
//  * @param {Array} stats - The array of stat objects in their new order.
//  * @returns {object} - { success: true } or { success: false, error }
//  */
// export async function updateAboutHeroStatsOrder(stats) {
//   try {
//     const updates = stats.map((stat, index) => ({
//       id: stat.id,
//       order: index,
//     }));

//     const { error } = await supabase.from('about_hero_stats').upsert(updates);
//     if (error) throw error;
//     return { success: true };
//   } catch (error) {
//     console.error('Error updating stats order:', error.message);
//     return { success: false, error };
//   }
// }


// /**
//  * =================================================================
//  * Helper Functions (Reused)
//  * =================================================================
//  */
// async function uploadMediaAsset(file, userId) {
//   const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
//   const fileName = `${Date.now()}-${cleanFileName}`;
//   const filePath = `public/${fileName}`;

//   const { error: uploadError } = await supabase.storage
//     .from('media')
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
//   return data;
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

//   const filePaths = assets.map(a => a.file_path).filter(Boolean);

//   if (filePaths.length > 0) {
//     const { error: storageError } = await supabase.storage
//       .from('media')
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
    // --- FIX: Add 'public/' prefix to the stored filename ---
    .getPublicUrl('public/' + mediaAsset.file_path);

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
 * Fetches the single about_hero row.
 * @returns {object} - The about_hero object.
 */
export async function getAboutHeroAdmin() {
  try {
    const { data, error } = await supabase
      .from('about_hero')
      .select(`
        *,
        media_assets ( id, file_path, alt_text )
      `)
      .eq('id', 1) // This is a singleton table
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
     if (error.code === 'PGRST116') { // "single()" row not found
      return { id: 1, title: '', subtitle: '', description: '', media_id: null };
    }
    console.error('Error fetching About Hero:', error.message);
    return null;
  }
}

/**
 * Fetches all about_hero_stats for the admin panel.
 * @returns {Array} - A list of stat objects.
 */
export async function getAboutHeroStatsAdmin() {
  try {
    const { data, error } = await supabase
      .from('about_hero_stats')
      .select(`*`)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin stats:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on all relevant tables.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToAboutHeroChanges = (callback) => {
  const tables = ['about_hero', 'about_hero_stats', 'media_assets'];
  
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
 * Update: `about_hero` (Singleton)
 * =================================================================
 */

/**
 * Saves the about_hero data.
 * @param {object} formData - The form data for the hero.
 * @param {string} userId - The ID of the authenticated user.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveAboutHero(formData, userId) {
  if (!userId) {
    return { success: false, error: { message: 'User not authenticated.' }};
  }

  try {
    let dbData = { ...formData };
    const mediaIdsToDelete = [];

    // --- Handle Main Image Upload ---
    if (dbData.file) {
      const newMedia = await uploadMediaAsset(dbData.file, userId);
      dbData.media_id = newMedia.id; // Set new media_id
      if (dbData.original_media_id) {
        mediaIdsToDelete.push(dbData.original_media_id);
      }
    } else if (dbData.media_id === null && dbData.original_media_id) {
      // Handle removal
      mediaIdsToDelete.push(dbData.original_media_id);
    }

    // --- Clean up helper fields before upsert ---
    delete dbData.file;
    delete dbData.original_media_id;
    delete dbData.media_assets; // Remove joined data
    
    // --- Upsert the about_hero record ---
    const { data, error } = await supabase
      .from('about_hero')
      .upsert(dbData) // This will update the row with id=1
      .select()
      .single();

    if (error) throw error;

    // --- Clean up any replaced/deleted assets ---
    if (mediaIdsToDelete.length > 0) {
      await deleteMediaAssets(mediaIdsToDelete);
    }
    
    return { success: true, data };

  } catch (error) {
    console.error('Error saving about hero:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * CRUD: `about_hero_stats` (List)
 * =================================================================
 */

/**
 * Saves a single stat (creates or updates).
 * @param {object} statData - The form data for the stat.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function saveAboutHeroStat(statData) {
  try {
    const { error } = await supabase
      .from('about_hero_stats')
      .upsert(statData)
      .select()
      .single();

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error saving stat:', error.message);
    return { success: false, error };
  }
}

/**
 * Deletes a stat.
 * @param {object} stat - The stat object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteAboutHeroStat(stat) {
  try {
    const { error } = await supabase
      .from('about_hero_stats')
      .delete()
      .eq('id', stat.id);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting stat:', error.message);
    return { success: false, error };
  }
}

/**
 * Updates the 'order' field for a list of stats.
 * @param {Array} stats - The array of stat objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateAboutHeroStatsOrder(stats) {
  try {
    const updates = stats.map((stat, index) => ({
      id: stat.id,
      order: index,
    }));

    const { error } = await supabase.from('about_hero_stats').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating stats order:', error.message);
    return { success: false, error };
  }
}


/**
 * =================================================================
 * Helper Functions (Reused)
 * =================================================================
 */
async function uploadMediaAsset(file, userId) {
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
  const fileName = `${Date.now()}-${cleanFileName}`;
  // --- FIX: Store ONLY the filename in the DB ---
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('media')
    // --- FIX: Upload TO the 'public/' folder ---
    .upload('public/' + filePath, file);
    
  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase
    .from('media_assets')
    .insert({
      file_path: filePath, // This now correctly stores just 'filename.png'
      file_type: file.type,
      alt_text: file.name,
      uploaded_by: userId,
    })
    .select('id, file_path')
    .single();
    
  if (insertError) throw insertError;
  return data;
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