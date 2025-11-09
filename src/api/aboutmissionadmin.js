import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches the single about_mission row.
 * @returns {object} - The Mission object.
 */
export async function getAboutMissionAdmin() {
  try {
    const { data, error } = await supabase
      .from('about_mission')
      .select(`*`)
      .eq('id', 1) // This is a singleton table
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    if (error.code === 'PGRST116') { // "single()" row not found
      return { id: 1, title: '', description: '' };
    }
    console.error('Error fetching About Mission:', error.message);
    return null;
  }
}

/**
 * Subscribes to changes on the 'about_mission' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToAboutMissionChanges = (callback) => {
  return onTableChange('about_mission', (payload) => {
    console.log(`Change detected on about_mission`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves the About Mission data.
 * @param {object} missionData - The form data for the mission.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveAboutMission(missionData) {
  try {
    const dataToSave = {
      ...missionData,
      id: 1, // Ensure we are always updating the correct row
    };

    const { data, error } = await supabase
      .from('about_mission')
      .upsert(dataToSave)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };

  } catch (error) {
    console.error('Error saving About Mission:', error.message);
    return { success: false, error };
  }
}