import { supabase } from "../lib/supabaseClient";
/**
 * Fetches all dynamic content needed for the contact page.
 * This is an advanced pattern that fetches multiple tables in parallel.
 */
export const fetchContactPageContent = async () => {
  try {
    // We use Promise.all to fetch everything at once
    const [configRes, servicesRes, budgetsRes, socialsRes] = await Promise.all([
      // 1. Fetch page config
      supabase.from('contact_page_config').select('*').eq('id', 1).single(),
      // 2. Fetch services (re-using from homepage)
      supabase.from('services').select('id, title').order('order'),
      // 3. Fetch budget options
      supabase.from('contact_budgets').select('*').order('order'),
      // 4. Fetch social links
      supabase.from('social_links').select('*').order('order'),
    ]);

    if (configRes.error) throw configRes.error;
    if (servicesRes.error) throw servicesRes.error;
    if (budgetsRes.error) throw budgetsRes.error;
    if (socialsRes.error) throw socialsRes.error;

    return {
      config: configRes.data,
      services: servicesRes.data,
      budgets: budgetsRes.data,
      socials: socialsRes.data,
    };
  } catch (error) {
    console.error('Error fetching contact page content:', error.message);
    return {
      config: null,
      services: [],
      budgets: [],
      socials: [],
    };
  }
};

/**
 * Submits the contact form data to the 'contact_submissions' table.
 * @param {Object} formData - The data from the form.
 * e.g., { name, email, service_id, budget_id, timeline, message }
 */
export const submitContactForm = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          service_id: formData.service_id || null, // Handle 'not-selected'
          budget_id: formData.budget_id || null, // Handle 'not-selected'
          timeline: formData.timeline,
          message: formData.message,
        },
      ]);

    if (error) throw error;
    
    // We don't need to return data, just success
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    return { success: false, error: error.message };
  }
};