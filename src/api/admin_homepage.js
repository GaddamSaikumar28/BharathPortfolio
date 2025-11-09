// import { supabase } from './supabase';
import { supabase } from '../lib/supabaseClient';
/**
 * Fetches all homepage sections for the admin manager.
 */
export const getHomepageSections = async () => {
  try {
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .order('"order"', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching homepage sections:', error.message);
    return [];
  }
};

/**
 * Updates the order and visibility of all homepage sections.
 * This is an advanced function that takes the full array from the DND list.
 * @param {Array} sections - The full array of section objects.
 * e.g., [{ id: 1, order: 1, is_visible: true }, { id: 2, order: 2, is_visible: false }]
 */
export const updateHomepageSections = async (sections) => {
  try {
    // We only need to send the id, order, and is_visible fields
    const updates = sections.map((section, index) => ({
      id: section.id,
      "order": index + 1, // Re-calculate order based on array index
      is_visible: section.is_visible
    }));

    // .upsert() will update all matching rows in a single DB call
    const { data, error } = await supabase
      .from('homepage_sections')
      .upsert(updates);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating homepage sections:', error.message);
    return null;
  }
};