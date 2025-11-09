import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches all timeline items for the admin panel.
 * @returns {Array} - A list of timeline item objects.
 */
export async function getAboutTimelineAdmin() {
  try {
    const { data, error } = await supabase
      .from('about_timeline')
      .select(`*`)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin timeline:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on the 'about_timeline' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToAboutTimelineChanges = (callback) => {
  return onTableChange('about_timeline', (payload) => {
    console.log(`Change detected on about_timeline`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (Order Only)
 * =================================================================
 */

/**
 * Updates the 'order' field for a list of timeline items.
 * @param {Array} items - The array of timeline item objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateAboutTimelineOrder(items) {
  try {
    const updates = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    const { error } = await supabase.from('about_timeline').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating timeline order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes a timeline item.
 * @param {object} item - The timeline item object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteAboutTimelineItem(item) {
  try {
    const { error } = await supabase
      .from('about_timeline')
      .delete()
      .eq('id', item.id);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting timeline item:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single timeline item (creates or updates).
 * @param {object} itemData - The form data for the timeline item.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveAboutTimelineItem(itemData) {
  try {
    const { error } = await supabase
      .from('about_timeline')
      .upsert(itemData)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true };

  } catch (error) {
    console.error('Error saving timeline item:', error.message);
    return { success: false, error };
  }
}