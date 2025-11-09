import { supabase } from '../lib/supabaseClient';

/**
 * Fetches all about page sections for the admin manager.
 */
export const getAboutPageSections = async () => {
  try {
    const { data, error } = await supabase
      .from('about_page_sections')
      .select('*')
      .order('"order"', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching about page sections:', error.message);
    return [];
  }
};

/**
 * Updates the order and visibility of all about page sections.
 * @param {Array} sections - The full array of section objects.
 */
export const updateAboutPageSections = async (sections) => {
  try {
    // We only need to send the id, order, and is_visible fields
    const updates = sections.map((section, index) => ({
      id: section.id,
      "order": index + 1, // Re-calculate order based on array index
      is_visible: section.is_visible
    }));

    // .upsert() will update all matching rows in a single DB call
    const { data, error } = await supabase
      .from('about_page_sections')
      .upsert(updates);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating about page sections:', error.message);
    throw error; // Re-throw to be caught by the UI
  }
};