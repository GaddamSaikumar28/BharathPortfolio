import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches the single call_to_action row for the About Page.
 * @returns {object} - The About CTA object.
 */
export async function getAboutCtaAdmin() {
  try {
    const { data, error } = await supabase
      .from('about_cta')
      .select(`*`)
      .eq('id', 1) // This is a singleton table
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    // If it's the first run and the row doesn't exist, Supabase might throw an error.
    // We'll return a default object so the form isn't empty.
    if (error.code === 'PGRST116') { // "single()" row not found
      return { id: 1, title: '', description: '', button_text: '' };
    }
    console.error('Error fetching About CTA:', error.message);
    return null;
  }
}

/**
 * Subscribes to changes on the 'about_cta' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToAboutCtaChanges = (callback) => {
  return onTableChange('about_cta', (payload) => {
    console.log(`Change detected on about_cta`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves the About CTA data.
 * @param {object} ctaData - The form data for the CTA.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveAboutCta(ctaData) {
  try {
    const dataToSave = {
      ...ctaData,
      id: 1, // Ensure we are always updating the correct row
    };

    const { data, error } = await supabase
      .from('about_cta')
      .upsert(dataToSave)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };

  } catch (error) {
    console.error('Error saving About CTA:', error.message);
    return { success: false, error };
  }
}