import { supabase } from '../lib/supabaseClient'; // Adjust path
import { uploadMedia, getStorageUrl } from './projectsadmin'; // Re-using functions

/**
 * Fetches all data needed for the header editor.
 * It joins the media_assets table to get the logo's file_path.
 */
export const getHeaderEditorData = async () => {
  const { data, error } = await supabase
    .from('header_config')
    .select(`
      *,
      logo_media:media_assets!header_config_logo_media_id_fkey (
        id,
        file_path
      )
    `)
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching header data:', error);
    throw error;
  }
  
  // Flatten the data for react-hook-form
  return {
    ...data,
    logo_media_id: data.logo_media?.id || null,
    logo_media_path: data.logo_media?.file_path || null,
  };
};

/**
 * Saves the header configuration.
 * @param {object} formData - The data from react-hook-form.
 */
export const saveHeaderConfig = async (formData) => {
  const { 
    logo_media_id, 
    logo_svg, 
    logo_text, 
    cta_text, 
    cta_url 
  } = formData;

  const updates = {
    id: 1, // Always updating row 1
    logo_media_id,
    logo_svg: logo_svg || null, // Ensure empty string becomes null
    logo_text: logo_text || null,
    cta_text,
    cta_url,
  };

  const { data, error } = await supabase
    .from('header_config')
    .upsert(updates) // .upsert() is perfect for this singleton table
    .select()
    .single();

  if (error) {
    console.error('Error saving header config:', error);
    throw error;
  }
  return data;
};

// We also re-export these helpers for the editor page
export { uploadMedia, getStorageUrl };