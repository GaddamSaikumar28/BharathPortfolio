import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches all tools for the admin panel.
 * @returns {Array} - A list of tool objects.
 */
export async function getToolkitAdmin() {
  try {
    const { data, error } = await supabase
      .from('toolkit_tools')
      .select(`*`)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin toolkit:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on the 'toolkit_tools' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToToolkitChanges = (callback) => {
  return onTableChange('toolkit_tools', (payload) => {
    console.log(`Change detected on toolkit_tools`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (Order Only)
 * =================================================================
 */

/**
 * Updates the 'order' field for a list of tools.
 * @param {Array} tools - The array of tool objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateToolkitOrder(tools) {
  try {
    const updates = tools.map((tool, index) => ({
      id: tool.id,
      order: index,
    }));

    const { error } = await supabase.from('toolkit_tools').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating toolkit order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes a tool.
 * @param {object} tool - The tool object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteToolkitTool(tool) {
  try {
    const { error } = await supabase
      .from('toolkit_tools')
      .delete()
      .eq('id', tool.id);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting tool:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single tool (creates or updates).
 * @param {object} toolData - The form data for the tool.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveToolkitTool(toolData) {
  try {
    // Ensure 'color' is saved, even if it's an empty string
    const dataToSave = {
      ...toolData,
      color: toolData.color || null, // Save empty string as null if preferred
    };

    const { error } = await supabase
      .from('toolkit_tools')
      .upsert(dataToSave)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true };

  } catch (error) {
    console.error('Error saving tool:', error.message);
    return { success: false, error };
  }
}