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

// --- Specific Fetch Functions for About Page ---

export const fetchAboutHero = () =>
  fetchSingleton('about_hero', '*, media_assets(file_path, alt_text)');

export const fetchAboutHeroStats = () => fetchData('about_hero_stats');
export const fetchAboutMission = () => fetchSingleton('about_mission');
export const fetchAboutServices = () => fetchData('about_services');
export const fetchAboutValues = () => fetchData('about_values');
export const fetchAboutTimeline = () => fetchData('about_timeline');
export const fetchAboutCTA = () => fetchSingleton('about_cta');