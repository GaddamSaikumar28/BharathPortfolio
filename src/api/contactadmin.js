import { supabase } from "../lib/supabaseClient"; // Adjust path as needed

/**
 * =================================================================================
 * Admin Submissions Page (The "Inbox")
 * =================================================================================
 */

/**
 * Fetches all contact submissions with joins to get service/budget names.
 * @param {string} filter - 'inbox', 'read', 'archived', or 'all'
 */
export const fetchSubmissions = async (filter = 'inbox') => {
  let query = supabase
    .from('contact_submissions')
    .select(`
      id,
      created_at,
      name,
      email,
      timeline,
      message,
      is_read,
      is_archived,
      service:services ( id, title ),
      budget:contact_budgets ( id, label )
    `)
    .order('created_at', { ascending: false });

  // Apply filters based on status
  if (filter === 'inbox') {
    query = query.eq('is_read', false).eq('is_archived', false);
  } else if (filter === 'read') {
    query = query.eq('is_read', true).eq('is_archived', false);
  } else if (filter === 'archived') {
    query = query.eq('is_archived', true);
  }
  // 'all' applies no filter

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
  return data;
};

/**
 * Sets up a real-time listener for new submissions.
 * @param {function} callback - Function to call when a new submission arrives.
 * @returns {object} - The Supabase subscription channel.
 */
export const listenForSubmissions = (callback) => {
  const channel = supabase
    .channel('contact-submissions-feed')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
      (payload) => {
        // We get the new row, but it's missing the joined data (service/budget names).
        // We could re-fetch it, or just pass the new item and let the client
        // know a new item exists, triggering a full refresh.
        // For simplicity, we'll pass the new payload.
        callback(payload.new);
      }
    )
    .subscribe();

  return channel; // Return channel so the component can unsubscribe on unmount
};

/**
 * Updates the status (read/archived) of a submission.
 * @param {string} id - The UUID of the submission.
 * @param {object} updates - e.g., { is_read: true } or { is_archived: true }
 */
export const updateSubmissionStatus = async (id, updates) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error("Error updating submission:", error);
    throw error;
  }
  return data;
};

/**
 * Permanently deletes a submission.
 * @param {string} id - The UUID of the submission to delete.
 */
export const deleteSubmission = async (id) => {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error deleting submission:", error);
    throw error;
  }
  return { success: true };
};


/**
 * =================================================================================
 * Admin Contact Page Editor
 * =================================================================================
 */

/**
 * Fetches all data needed for the contact page editor.
 */
export const getContactEditorData = async () => {
  try {
    const [configRes, budgetsRes] = await Promise.all([
      supabase.from('contact_page_config').select('*').eq('id', 1).single(),
      supabase.from('contact_budgets').select('*').order('order', { ascending: true })
    ]);

    if (configRes.error) throw configRes.error;
    if (budgetsRes.error) throw budgetsRes.error;
    
    // Ensure animated_title is an array
    const config = configRes.data;
    if (typeof config.title_animated === 'string') {
        config.title_animated = config.title_animated.split(',');
    } else if (!Array.isArray(config.title_animated)) {
        config.title_animated = ['Default'];
    }

    return {
      config: configRes.data,
      budgets: budgetsRes.data,
    };
  } catch (error) {
    console.error("Error fetching contact editor data:", error);
    throw error;
  }
};

/**
 * Saves all data from the contact page editor.
 * @param {object} configData - Data for the 'contact_page_config' table.
 * @param {Array} budgetsData - Array of budget objects for 'contact_budgets'.
 */
export const saveContactEditorData = async (configData, budgetsData) => {
  try {
    // 1. Update the config table
    const { error: configError } = await supabase
      .from('contact_page_config')
      .update(configData)
      .eq('id', 1);
      
    if (configError) throw configError;

    // 2. Upsert (update/insert) budget options
    // Add an 'order' property based on array index
    const orderedBudgets = budgetsData.map((budget, index) => ({
      ...budget,
      order: index,
    }));
    
    const { error: budgetsError } = await supabase
      .from('contact_budgets')
      .upsert(orderedBudgets, { onConflict: 'id' }); // Upsert based on 'id'

    if (budgetsError) throw budgetsError;

    // 3. Prune (delete) any budgets that were removed
    // Get all IDs from the saved data
    const idsToKeep = orderedBudgets.map(b => b.id).filter(Boolean); // Filter out new (null) IDs
    
    if (idsToKeep.length > 0) {
      const { error: pruneError } = await supabase
        .from('contact_budgets')
        .delete()
        .not('id', 'in', `(${idsToKeep.join(',')})`);
        
      if (pruneError) console.error("Error pruning budgets:", pruneError); // Log but don't fail save
    }

    return { success: true };

  } catch (error) {
    console.error("Error saving contact editor data:", error);
    throw error;
  }
};