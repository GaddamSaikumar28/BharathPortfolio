// import { supabase } from './supabase';
import { supabase } from "../lib/supabaseClient";

// Helper to fetch data and handle errors
async function fetchData(tableName, selectQuery = '*') {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(selectQuery)
      .order('order', { ascending: true }); // Default sort by 'order'

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error.message);
    return []; // Return empty array on error
  }
}

// Helper for singleton tables
async function fetchSingleton(tableName, selectQuery = '*') {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(selectQuery)
      .eq('id', 1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching singleton ${tableName}:`, error.message);
    return null;
  }
}

// --- Specific Fetch Functions (Updated) ---

export async function fetchHeroVariants() {
  try {
    const { data, error } = await supabase
      .from('hero_variants')
      .select(
        `
        *,
        hero_variant1_icons (*),
        hero_variant2_photos (
          *,
          media_assets ( file_path, alt_text )
        )
      `
      )
      .eq('is_active', true)
      .order('order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching hero variants:', error.message);
    return [];
  }
}

// Example of other updated fetchers:
export const fetchLogoCloud = () =>
  fetchData('logo_cloud', '*, media_assets ( file_path, alt_text )');
export const fetchServices = () => fetchData('services');
export const fetchFeatureShowcase = () =>
  fetchData(
    'feature_showcase_items',
    '*, media_assets ( file_path, alt_text )'
  );

export async function fetchTeamShowcase() {
  const text = await fetchSingleton('team_showcase');
  const photos = await fetchData(
    'team_showcase_photos',
    '*, media_assets ( file_path, alt_text )'
  );
  return { text, photos };
}

export const fetchParallaxProject = () =>
  fetchSingleton(
    'parallax_project',
    '*, media_id ( file_path, alt_text ), logo_media_id ( file_path, alt_text )'
  );

export const fetchToolkitTools = () => fetchData('toolkit_tools');

export const fetchTestimonials = () =>
  fetchData('testimonials', '*, media_assets ( file_path, alt_text )');

export const fetchBentoItems = () =>
  fetchData('bento_items', '*, media_assets ( file_path, alt_text )');

export const fetchBlogPosts = () =>
  fetchData('blog_posts', '*, media_assets ( file_path, alt_text )');

export const fetchFAQs = () => fetchData('faqs');
export const fetchCallToAction = () => fetchSingleton('call_to_action');
export const fetchGlobalConfig = () => fetchSingleton('global_config');
export async function fetchPhotoMarquee() {
  return fetchData('photo_marquee', '*, media_assets ( file_path, alt_text )');
}

export const fetchPortfolioBanners = () => fetchData('portfolio_banners', '*, media_assets ( file_path, alt_text )');


// --- Real-time Subscription Helper ---
/**
 * Subscribes to changes in a table and calls a callback.
 * @param {string} table - The table name to subscribe to.
 * @param {Function} callback - Function to run when a change occurs.
 * @returns {Object} - The Supabase subscription channel.
 */
export const onTableChange = (table, callback) => {
  const channel = supabase
    .channel(`public:${table}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: table },
      (payload) => {
        console.log(`Change received on ${table}:`, payload);
        callback(payload);
      }
    )
    .subscribe();

  return channel;
};

export const getDynamicHomepageLayout = async () => {
  try {
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('section_key')
      .eq('is_visible', true)
      .order('"order"', { ascending: true });

    if (error) throw error;
    // Return just an array of keys: ['hero', 'logo_cloud', 'services', ...]
    return data.map(s => s.section_key);
  } catch (error) {
    console.error('Error fetching dynamic homepage layout:', error.message);
    return []; // Return empty array on error
  }
};

/**
 * Subscribes to changes on the homepage_sections table.
 * @param {function} callback - Function to run when data changes.
 */
export const subscribeToHomepageLayout = (callback) => {
  // We re-use the onTableChange from supabase.js
  return onTableChange('homepage_sections', callback);
};

