
import { supabase } from "../lib/supabaseClient";
/**
 * Fetches all project categories.
 */
export const fetchProjectCategories = async () => {
  const { data, error } = await supabase
    .from('project_categories')
    .select('name, slug')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
};

/**
 * Fetches projects with server-side filtering, search, and pagination.
 */
export const fetchProjects = async ({
  page = 1,
  limit = 9,
  categorySlug = 'all',
  searchQuery = '',
}) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('projects')
    .select(
      `
      id,
      title,
      slug,
      description,
      hero_media_id,
      hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
      project_category_links!inner (
        project_categories!inner ( name, slug )
      )
    `,
      { count: 'exact' } // Request the total count for pagination
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  // Apply search filter
  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  // Apply category filter
  // This requires a join filter
  if (categorySlug && categorySlug !== 'all') {
    // This will now work because of the "!inner" join in the select
    query = query.eq('project_category_links.project_categories.slug', categorySlug);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    return { data: [], count: 0 };
  }
  
  // Supabase returns a nested structure for joins, let's simplify it
  const processedData = data.map(project => ({
    ...project,
    // This line safely handles projects with no categories
    category: project.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
    heroImage: project.hero_media?.file_path || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(' ','+')}`,
    heroAlt: project.hero_media?.alt_text || project.title,
  }));

  return { data: processedData, count: count || 0 };
};

/**
 * Fetches all details for a single project by its slug.
 */
export const fetchProjectDetail = async (slug) => {
// ... (this function is correct from your file) ...
  const { data, error } = await supabase
    .from('projects')
    .select(
      `
      *,
      hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
      detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( file_path, alt_text ),
      tools:project_tool_links ( tools ( name, icon_name ) ),
      categories:project_category_links ( project_categories ( name, slug ) ),
      content:project_content_blocks ( "type", "order", content ),
      gallery:project_gallery (
        "order",
        media:media_assets ( file_path, alt_text )
      )
    `
    )
    .eq('slug', slug)
    .order('order', { referencedTable: 'project_content_blocks', ascending: true })
    .order('order', { referencedTable: 'project_gallery', ascending: true })
    .single();

  // This block handles the 'PGRST116' (0 rows) error
  if (error) {
    if (error.code === 'PGRST116') {
      // PGRST116: "The result contains 0 rows"
      console.warn(`Project not found for slug: ${slug}`);
      return null; // Return null to show "Not Found" page
    }
    // For other errors, still throw
    console.error('Error fetching project detail:', error);
    throw error;
  }
  
  // Clean up the nested data
// ... (rest of file is correct) ...
  return data;
};

/**
 * Fetches the next project in the list (simplified for now).
 */
// ... (rest of file is correct) ...
export const fetchNextProject = async (currentSlug) => {
   const { data, error } = await supabase
    .from('projects')
    .select('title, slug, hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text )')
    .neq('slug', currentSlug) // Not the current one
    .limit(1); // Just get one

   if (error) {
     console.error('Error fetching next project:', error);
     return null;
   }
   
   return data[0];
};