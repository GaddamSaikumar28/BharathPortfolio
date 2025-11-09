import { supabase } from '../lib/supabaseClient';
import { onTableChange } from './homepage'; // Reusing our subscription helper

/**
 * =================================================================
 * Read & Subscribe
 * =================================================================
 */

/**
 * Fetches all services for the admin panel.
 * @returns {Array} - A list of service objects.
 */
export async function getServicesAdmin() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`*`)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin services:', error.message);
    return [];
  }
}

/**
 * Subscribes to changes on the 'services' table.
 * @param {function} callback - The function to call on any change.
 * @returns {object} - The subscription channel.
 */
export const subscribeToServicesChanges = (callback) => {
  // Only need to watch one table this time
  return onTableChange('services', (payload) => {
    console.log(`Change detected on services`, payload);
    callback();
  });
};

/**
 * =================================================================
 * Update (Order Only)
 * =================================================================
 */

/**
 * Updates the 'order' field for a list of services.
 * @param {Array} services - The array of service objects in their new order.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function updateServicesOrder(services) {
  try {
    const updates = services.map((service, index) => ({
      id: service.id,
      order: index,
    }));

    const { error } = await supabase.from('services').upsert(updates);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating services order:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Delete
 * =================================================================
 */

/**
 * Deletes a service.
 * @param {object} service - The service object to delete.
 * @returns {object} - { success: true } or { success: false, error }
 */
export async function deleteService(service) {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', service.id);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error.message);
    return { success: false, error };
  }
}

/**
 * =================================================================
 * Create / Update (The "Save" Function)
 * =================================================================
 */

/**
 * Saves a single service (creates or updates).
 * @param {object} serviceData - The form data for the service.
 * @returns {object} - { success: true, data } or { success: false, error }
 */
export async function saveService(serviceData) {
  try {
    const { error } = await supabase
      .from('services')
      .upsert(serviceData)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true };

  } catch (error) {
    console.error('Error saving service:', error.message);
    return { success: false, error };
  }
}