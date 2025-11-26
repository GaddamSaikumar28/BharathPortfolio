import { supabase } from '../lib/supabaseClient';

// Fetch items joined with media_assets to get the file_path
export const fetchIphoneShowcaseItems = async () => {
  const { data, error } = await supabase
    .from('iphone_showcase_items')
    .select(`
      *,
      media_assets (
        id,
        file_path,
        alt_text
      )
    `)
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching iPhone showcase items:', error);
    return [];
  }

  return data;
};