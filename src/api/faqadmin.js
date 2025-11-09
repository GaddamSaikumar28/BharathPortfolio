import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches all FAQs for the admin panel.
 * @returns {Array} - A list of FAQ objects.
 */
export async function getFaqsAdmin() {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select(`*`)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin FAQs:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on the 'faqs' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToFaqChanges = (callback) => {
  return onTableChange('faqs', (payload) => {
    console.log(`Change detected on faqs`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (Order Only)
 * =================================================================
 */

/**
 * Updates the 'order' field for a list of FAQs.
 * @param {Array} faqs - The array of FAQ objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateFaqOrder(faqs) {
  try {
    const updates = faqs.map((faq, index) => ({
      id: faq.id,
      order: index,
    }));

    const { error } = await supabase.from('faqs').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating FAQ order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes an FAQ.
 * @param {object} faq - The FAQ object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteFaq(faq) {
  try {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', faq.id);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting FAQ:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single FAQ (creates or updates).
 * @param {object} faqData - The form data for the FAQ.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveFaq(faqData) {
  try {
    const { error } = await supabase
      .from('faqs')
      .upsert(faqData)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true };

  } catch (error) {
    console.error('Error saving FAQ:', error.message);
    return { success: false, error };
  }
}