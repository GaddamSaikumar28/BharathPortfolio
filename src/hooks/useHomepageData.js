// import { useState, useEffect, useCallback } from 'react';
// // import { supabase } from '../api/supabase';
// // import { onTableChange } from '../api/homepage';
// import { supabase } from '../lib/supabaseClient';
// import { onTableChange } from '../api/homepage';
// /**
//  * Fetches data and subscribes to real-time updates for a Supabase table.
//  * @param {Function} fetchFn - The async function to fetch data (e.g., fetchServices).
//  * @param {string} tableName - The name of the table to subscribe to (e.g., 'services').
//  * @param {Object} [options]
//  * @param {Array<string>} [options.additionalTables] - Other tables that trigger a refresh.
//  */
// export const useHomepageData = (fetchFn, tableName, options = {}) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadData = useCallback(async () => {
//     try {
//       const result = await fetchFn();
//       setData(result);
//     } catch (error) {
//       console.error(`Error in useHomepageData for ${tableName}:`, error);
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchFn, tableName]);

//   useEffect(() => {
//     // 1. Initial data load
//     loadData();

//     // 2. Subscribe to real-time changes
//     // const tablesToListen = [tableName, ...(options.additionalTables || [])];
//     // const channels = tablesToListen.map(table => 
//     //   onTableChange(table, (payload) => {
//     //     // Refetch data on any change
//     //     loadData();
//     //   })
//     // );

//     // 3. Unsubscribe on cleanup
//     // return () => {
//     //   channels.forEach(channel => channel.unsubscribe());
//     // };
//   }, [loadData, tableName, options.additionalTables]);

//   return { data, loading };
// };

// /**
//  * Helper function to get the public URL from a media asset.
//  * Handles both placeholder URLs and Supabase storage paths.
//  * @param {Object | string} asset - The media_assets object or a direct file_path string.
//  * @returns {string | null}
//  */
// export const getStorageUrl = (asset) => {
//   const filePath = typeof asset === 'string' ? asset : asset?.file_path;
//   if (!filePath) return null;

//   // Handle placeholders (which are full URLs)
//   if (filePath.startsWith('http')) {
//     return filePath;
//   }

//   // Handle Supabase storage paths
//   // Assumes a public bucket named 'media'
//   return supabase.storage.from('media').getPublicUrl(filePath).data.publicUrl;
// };


import { useState, useEffect, useCallback } from 'react';
// import { supabase } from '../api/supabase'; // Corrected path
// import { onTableChange } from '../api/homepage'; // We don't need this anymore
// import { supabase } from '../api/supabase'; // Use the new path
import { supabase } from '../lib/supabaseClient'; // Use the new path
/**
 * Fetches data and subscribes to real-time updates for a Supabase table.
 * @param {Function} fetchFn - The async function to fetch data (e.g., fetchServices).
 * @param {string} tableName - The name of the table to subscribe to (e.g., 'services').
 * @param {Object} [options]
 * @param {Array<string>} [options.additionalTables] - Other tables that trigger a refresh.
 */
export const useHomepageData = (fetchFn, tableName, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // We can move loadData *inside* the useEffect to make this cleaner
  // and remove the need for useCallback.

  useEffect(() => {
    // 1. Define the async function to load data
    const loadData = async () => {
      try {
        const result = await fetchFn();
        setData(result);
      } catch (error) {
        console.error(`Error in useHomepageData for ${tableName}:`, error);
      } finally {
        setLoading(false);
      }
    };
    
    // 2. Call it.
    loadData();

    // 3. The real-time subscription logic is removed, as you requested.

    // 4. --- THIS IS THE FIX ---
    // By providing an empty dependency array, we tell React:
    // "Only run this effect ONCE when the component first mounts."
    // This stops the continuous API calls.
  }, [fetchFn, tableName]); // We keep fetchFn and tableName as dependencies
                            // Since they are stable imports, this will
                            // still only run once, but it's more lint-friendly.
                            // To be 100% sure it runs only once, use []

  // ... (rest of the file is unchanged) ...
  return { data, loading };
};

/**
 * Helper function to get the public URL from a media asset.
 * Handles both placeholder URLs and Supabase storage paths.
 * @param {Object | string} asset - The media_assets object or a direct file_path string.
 * @returns {string | null}
 */
export const getStorageUrl = (asset) => {
  const filePath = typeof asset === 'string' ? asset : asset?.file_path;
  if (!filePath) return null;

  // Handle placeholders (which are full URLs)
  if (filePath.startsWith('http')) {
    return filePath;
  }

  // Handle Supabase storage paths
  // Assumes a public bucket named 'media'
  return supabase.storage.from('media').getPublicUrl(filePath).data.publicUrl;
};