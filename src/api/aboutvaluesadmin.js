import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches all values for the admin panel.
 * @returns {Array} - A list of value objects.
 */
export async function getAboutValuesAdmin() {
  try {
    const { data, error } = await supabase
      .from('about_values')
      .select(`*`)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin values:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on the 'about_values' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToAboutValuesChanges = (callback) => {
  return onTableChange('about_values', (payload) => {
    console.log(`Change detected on about_values`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (Order Only)
 * =================================================================
 */

/**
 * Updates the 'order' field for a list of values.
 * @param {Array} values - The array of value objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateAboutValuesOrder(values) {
  try {
    const updates = values.map((value, index) => ({
      id: value.id,
      order: index,
    }));

    const { error } = await supabase.from('about_values').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating values order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes a value.
 * @param {object} value - The value object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteAboutValue(value) {
  try {
    const { error } = await supabase
      .from('about_values')
      .delete()
      .eq('id', value.id);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting value:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single value (creates or updates).
 * @param {object} valueData - The form data for the value.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveAboutValue(valueData) {
  try {
    const { error } = await supabase
      .from('about_values')
      .upsert(valueData)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true };

  } catch (error) {
    console.error('Error saving value:', error.message);
    return { success: false, error };
  }
}