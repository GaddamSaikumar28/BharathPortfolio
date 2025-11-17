import { supabase } from '../lib/supabaseClient'; // Adjust path
import { uploadMedia, getStorageUrl } from './projectsadmin'; // Re-using functions

/**
 * Fetches all data needed for the footer editor.
 * It joins the media_assets table to get the logo's file_path.
 */
export const getFooterEditorData = async () => {
  const { data, error } = await supabase
    .from('footer_config')
    .select(`
      *,
      logo_media:media_assets!footer_config_logo_media_id_fkey (
        id,
        file_path
      )
    `)
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching footer data:', error);
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
 * Saves the footer configuration.
 * @param {object} formData - The data from react-hook-form.
 */
export const saveFooterConfig = async (formData) => {
  // We only want to save fields that exist in the table
  const { 
    logo_media_id, 
    logo_svg, 
    logo_text, 
    tagline, 
    copyright_text, 
    link_sections 
  } = formData;

  const updates = {
    id: 1, // Always updating row 1
    logo_media_id,
    logo_svg: logo_svg || null,
    logo_text: logo_text || null,
    tagline,
    copyright_text,
    link_sections, // Pass the JSONB object directly
  };

  const { data, error } = await supabase
    .from('footer_config')
    .upsert(updates) // .upsert() is perfect for this singleton table
    .select()
    .single();

  if (error) {
    console.error('Error saving footer config:', error);
    throw error;
  }
  return data;
};

// We also re-export these helpers for the editor page
export { uploadMedia, getStorageUrl };