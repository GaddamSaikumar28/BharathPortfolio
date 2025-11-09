import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches the single call_to_action row.
 * @returns {object} - The CTA object.
 */
export async function getCtaAdmin() {
  try {
    const { data, error } = await supabase
      .from('call_to_action')
      .select(`*`)
      .eq('id', 1) // This is a singleton table
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    // If it's the first run and the row doesn't exist, Supabase might throw an error.
    // We'll return a default object so the form isn't empty.
    if (error.code === 'PGRST116') { // "single()" row not found
      return { id: 1, title: '', subtitle: '' };
    }
    console.error('Error fetching CTA:', error.message);
    return null;
  }
}

/**
 * Subscribes to changes on the 'call_to_action' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToCtaChanges = (callback) => {
  return onTableChange('call_to_action', (payload) => {
    console.log(`Change detected on call_to_action`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves the CTA data.
 * @param {object} ctaData - The form data for the CTA.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveCta(ctaData) {
  try {
    const dataToSave = {
      ...ctaData,
      id: 1, // Ensure we are always updating the correct row
    };

    const { data, error } = await supabase
      .from('call_to_action')
      .upsert(dataToSave)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };

  } catch (error) {
    console.error('Error saving CTA:', error.message);
    return { success: false, error };
  }
}