
// import { supabase } from "../lib/supabaseClient";
// /**
//  * Fetches all project categories.
//  */
// export const fetchProjectCategories = async () => {
//   const { data, error } = await supabase
//     .from('project_categories')
//     .select('name, slug')
//     .order('name', { ascending: true });

//   if (error) {
//     console.error('Error fetching categories:', error);
//     return [];
//   }
//   return data;
// };

// /**
//  * Fetches projects with server-side filtering, search, and pagination.
//  */
// export const fetchProjects = async ({
//   page = 1,
//   limit = 9,
//   categorySlug = 'all',
//   searchQuery = '',
// }) => {
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   let query = supabase
//     .from('projects')
//     .select(
//       `
//       id,
//       title,
//       slug,
//       description,
//       hero_media_id,
//       hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
//       project_category_links!inner (
//         project_categories!inner ( name, slug )
//       )
//     `,
//       { count: 'exact' } // Request the total count for pagination
//     )
//     .order('created_at', { ascending: false })
//     .range(from, to);

//   // Apply search filter
//   if (searchQuery) {
//     query = query.ilike('title', `%${searchQuery}%`);
//   }

//   // Apply category filter
//   // This requires a join filter
//   if (categorySlug && categorySlug !== 'all') {
//     // This will now work because of the "!inner" join in the select
//     query = query.eq('project_category_links.project_categories.slug', categorySlug);
//   }

//   const { data, error, count } = await query;

//   if (error) {
//     console.error('Error fetching projects:', error);
//     return { data: [], count: 0 };
//   }
  
//   // Supabase returns a nested structure for joins, let's simplify it
//   const processedData = data.map(project => ({
//     ...project,
//     // This line safely handles projects with no categories
//     category: project.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
//     heroImage: project.hero_media?.file_path || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(' ','+')}`,
//     heroAlt: project.hero_media?.alt_text || project.title,
//   }));

//   return { data: processedData, count: count || 0 };
// };

// /**
//  * Fetches all details for a single project by its slug.
//  */
// export const fetchProjectDetail = async (slug) => {
// // ... (this function is correct from your file) ...
//   const { data, error } = await supabase
//     .from('projects')
//     .select(
//       `
//       *,
//       hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
//       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( file_path, alt_text ),
//       tools:project_tool_links ( tools ( name, icon_name ) ),
//       categories:project_category_links ( project_categories ( name, slug ) ),
//       content:project_content_blocks ( "type", "order", content ),
//       gallery:project_gallery (
//         "order",
//         media:media_assets ( file_path, alt_text )
//       )
//     `
//     )
//     .eq('slug', slug)
//     .order('order', { referencedTable: 'project_content_blocks', ascending: true })
//     .order('order', { referencedTable: 'project_gallery', ascending: true })
//     .single();

//   // This block handles the 'PGRST116' (0 rows) error
//   if (error) {
//     if (error.code === 'PGRST116') {
//       // PGRST116: "The result contains 0 rows"
//       console.warn(`Project not found for slug: ${slug}`);
//       return null; // Return null to show "Not Found" page
//     }
//     // For other errors, still throw
//     console.error('Error fetching project detail:', error);
//     throw error;
//   }
  
//   // Clean up the nested data
// // ... (rest of file is correct) ...
//   return data;
// };

// /**
//  * Fetches the next project in the list (simplified for now).
//  */
// // ... (rest of file is correct) ...
// export const fetchNextProject = async (currentSlug) => {
//    const { data, error } = await supabase
//     .from('projects')
//     .select('title, slug, hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text )')
//     .neq('slug', currentSlug) // Not the current one
//     .limit(1); // Just get one

//    if (error) {
//      console.error('Error fetching next project:', error);
//      return null;
//    }
   
//    return data[0];
// };

import { supabase } from "../lib/supabaseClient";

/**
 * Fetches all project categories. (Existing)
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
 * Fetches all project tools. (Existing from previous request)
 */
export const fetchProjectTools = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('name, id, icon_name')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
  return data;
};

// --- NEW API FUNCTION: Fetch Project Tiers ---
/**
 * Fetches all project tiers (complexity levels).
 */
export const fetchProjectTiers = async () => {
  const { data, error } = await supabase
    .from('project_tiers')
    .select('id, name, color_hex')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching tiers:', error);
    return [];
  }
  return data;
};

/**
 * Fetches projects with server-side filtering, search, and pagination.
 */
// export const fetchProjects = async ({
//   page = 1,
//   limit = 9,
//   categorySlug = 'all',
//   searchQuery = '',
//   toolId = null,
//   tierId = null, // <<< NEW FILTER PARAMETER
// }) => {
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   let query = supabase
//     .from('projects')
//     .select(
//       `
//       id,
//       title,
//       slug,
//       description,
//       hero_media_id,
//       hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
//       project_category_links!inner (
//         project_categories!inner ( name, slug )
//       ),
//       tiers:project_tiers ( name, color_hex ),  
//       tools:project_tool_links ( tools ( id ) ) 
//     `,
//       { count: 'exact' } // Request the total count for pagination
//     )
//     .order('created_at', { ascending: false })
//     .range(from, to);

//   // Apply search filter
//   if (searchQuery) {
//     query = query.ilike('title', `%${searchQuery}%`);
//   }

//   // Apply category filter
//   if (categorySlug && categorySlug !== 'all') {
//     query = query.eq('project_category_links.project_categories.slug', categorySlug);
//   }

//   // Apply Tool filter
//   if (toolId) {
//     query = query.eq('project_tool_links.tools.id', toolId);
//   }

//   // <<< Apply NEW Tier filter
//   if (tierId) {
//     query = query.eq('tier_id', tierId);
//   }

//   const { data, error, count } = await query;

//   if (error) {
//     console.error('Error fetching projects:', error);
//     return { data: [], count: 0 };
//   }
  
//   // Simplify the nested structure
//   const processedData = data.map(project => ({
//     ...project,
//     category: project.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
//     heroImage: project.hero_media?.file_path || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(' ','+')}`,
//     heroAlt: project.hero_media?.alt_text || project.title,
//     // Extract Tier Data
//     tierName: project.tiers?.name || 'Standard',
//     tierColor: project.tiers?.color_hex || '#aaaaaa',
//   }));

//   return { data: processedData, count: count || 0 };
// };

// ... (fetchProjectDetail and fetchNextProject functions remain the same)
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

// export const fetchProjectDetail = async (slug) => {
// // // ... (this function is correct from your file) ...
// const { data, error } = await supabase
//     .from('projects')
//     .select(
//       `
//       *,
//       hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
//       detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( file_path, alt_text ),
//       tools:project_tool_links ( tools ( name, icon_name ) ),
//       categories:project_category_links ( project_categories ( name, slug ) ),
//       content:project_content_blocks ( "type", "order", content ),
//       gallery:project_gallery (
//         "order",
//         media:media_assets ( file_path, alt_text )
//       )
//     `
//     )
//     .eq('slug', slug)
//     .order('order', { referencedTable: 'project_content_blocks', ascending: true })
//     .order('order', { referencedTable: 'project_gallery', ascending: true })
//     .single();

//   // This block handles the 'PGRST116' (0 rows) error
//   if (error) {
//     if (error.code === 'PGRST116') {
//       // PGRST116: "The result contains 0 rows"
//       console.warn(`Project not found for slug: ${slug}`);
//       return null; // Return null to show "Not Found" page
//     }
//     // For other errors, still throw
//     console.error('Error fetching project detail:', error);
//     throw error;
//   }
  
//   // Clean up the nested data
// // ... (rest of file is correct) ...
//   return data;
// };

export const fetchProjects = async ({
  page = 1,
  limit = 20, 
  categorySlug = 'all',
  searchQuery = '',
  toolId = null,
  tierId = null, 
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
      
   
      project_category_links (
        project_categories ( name, slug )
      ),
      
      tiers:project_tiers ( name, color_hex ),  
      tools:project_tool_links ( tools ( id ) ),
      
      status,
      completion_percentage,
      metadata_label,
      metadata_value,
      publisher_name,
      details_1,
      details_2
    `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  // --- Filtering Logic ---
  
  // 1. Category Filter (FIXED: The subquery must correctly check the category table slug)
  if (categorySlug && categorySlug !== 'all') {
    query = query.in(
      'id',
      supabase
        .from('project_category_links')
        .select('project_id')
        // Using eq() to filter by the slug of the category being linked
        .eq('project_categories.slug', categorySlug)
    );
  }

  // 2. Tool Filter
  if (toolId !== null) {
    query = query.in(
      'id',
      supabase
        .from('project_tool_links')
        .select('project_id')
        .eq('tool_id', toolId)
    );
  }

  // 3. Tier Filter
  if (tierId !== null) {
    query = query.eq('tier_id', tierId);
  }

  // 4. Search Query Filter
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  // --- Execution ---
  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    return { data: [], count: 0 };
  }
  
  // Simplify the nested structure and include new fields
  const processedData = data.map(project => ({
    ...project,
    category: project.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
    heroImage: project.hero_media?.file_path || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(/ /g,'+')}`,
    heroAlt: project.hero_media?.alt_text || project.title,
    tierName: project.tiers?.name || 'Standard',
    tierColor: project.tiers?.color_hex || '#aaaaaa',
  }));

  return { data: processedData, count: count || 0 };
};
export const fetchProjectDetail = async (slug) => {
  const { data, error } = await supabase
    .from('projects')
    .select(
      `
      *,
      tiers:project_tiers ( name, color_hex ),
      hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
      detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( file_path, alt_text ),
      
   
      tools:project_tool_links ( tools ( name, icon_name ) ),
      categories:project_category_links ( project_categories ( name, slug ) ),
      
   
      project_case_study_modules ( 
        module_type, "order", title, content 
      ),
      
     
      gallery:project_gallery (
        "order",
        media:media_assets ( file_path, alt_text )
      ),
      
    
      highlights:project_media_highlights (
        "order", context, caption, media:media_assets ( file_path, alt_text )
      ),
      
      
      project_related_links ( id, label, url, icon_name, "order" )
    `
    )
    .eq('slug', slug)
    .order('order', { referencedTable: 'project_case_study_modules', ascending: true })
    .order('order', { referencedTable: 'project_gallery', ascending: true })
    .single();

  if (error) {
    // ... error handling block remains the same ...
    return null;
  }
  
  // Note: Data flattening logic can be applied here if needed.
  return data;
};

// export const fetchProjectDetail = async (slug) => {
//     const { data, error } = await supabase
//         .from('projects')
//         .select(
//             `
//             *,
//             hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
//             detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( file_path, alt_text ),
//             tiers:project_tiers ( name, color_hex ),
            
//             tools:project_tool_links ( tools ( name, icon_name ) ),
//             categories:project_category_links ( project_categories ( name, slug ) ),
            
//             testimonial:testimonials!projects_client_testimonial_id_fkey ( 
//                 quote, 
//                 name, 
//                 role, 
//                 media:media_assets ( file_path ) 
//             ),
            
//             highlights:project_media_highlights ( 
//                 "order", 
//                 context, 
//                 caption, 
//                 media:media_assets ( file_path, alt_text ) 
//             ),
            
//             modules:project_case_study_modules ( 
//                 "order", 
//                 module_type, 
//                 title, 
//                 content 
//             ),
            
//             links:project_related_links ( 
//                 "order", 
//                 label, 
//                 url, 
//                 icon_name 
//             )
//         `
//         )
//         .eq('slug', slug)
//         // Ensure sub-sections are ordered correctly
//         .order('order', { referencedTable: 'project_case_study_modules', ascending: true })
//         .order('order', { referencedTable: 'project_media_highlights', ascending: true })
//         .order('order', { referencedTable: 'project_related_links', ascending: true })
//         .single();

//     // Handle 'PGRST116' (0 rows) or other fetch errors
//     if (error) {
//         if (error.code === 'PGRST116') {
//             console.warn(`Project not found for slug: ${slug}`);
//             return null;
//         }
//         console.error('Error fetching project detail:', error);
//         throw error;
//     }

//     if (!data) return null;

//     // Post-processing to flatten the testimonial and highlight media structures
//     const processedData = {
//         ...data,
//         // Simplify testimonial structure
//         testimonial: data.testimonial ? {
//             quote: data.testimonial.quote,
//             name: data.testimonial.name,
//             role: data.testimonial.role,
//             // Access the file path from the nested media asset
//             mediaPath: data.testimonial.media?.file_path || null, 
//         } : null,
        
//         // Enhance highlights by promoting media path/alt text
//         highlights: data.highlights.map(h => ({
//             ...h,
//             mediaPath: h.media?.file_path || null,
//             mediaAlt: h.media?.alt_text || h.caption,
//         })),

//         // Add simplified category/tool lists
//         categoryNames: data.categories.map(c => c.project_categories.name),
//         toolNames: data.tools.map(t => t.tools.name),
//     };
    
//     // Clean up unnecessary nested object keys before returning
//     delete processedData.media; 
//     delete processedData.tools;
//     delete processedData.categories;

//     return processedData;
// };

// export const fetchProjects = async ({
//   page = 1,
//   limit = 20, // Increased limit for continuous scroll
//   categorySlug = 'all',
//   searchQuery = '',
//   toolId = null,
//   tierId = null, 
// }) => {
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   let query = supabase
//     .from('projects')
//     .select(
//       `
//       id,
//       title,
//       slug,
//       description,
//       hero_media_id,
//       hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
//       project_category_links!inner (
//         project_categories!inner ( name, slug )
//       ),
//       tiers:project_tiers ( name, color_hex ),  
//       tools:project_tool_links ( tools ( id ) ),
//       status,
//       completion_percentage,
//       metadata_label,
//       metadata_value,
//       publisher_name,
//       details_1,
//       details_2
//     `,
//       { count: 'exact' }
//     )
//     .order('created_at', { ascending: false })
//     .range(from, to);

//   // ... (Filtering logic for search, category, toolId, tierId remains the same) ...

//   const { data, error, count } = await query;

//   console.log(data);
//   if (error) {
//     console.error('Error fetching projects:', error);
//     return { data: [], count: 0 };
//   }
  
//   // Simplify the nested structure and include new fields
//   const processedData = data.map(project => ({
//     ...project,
//     category: project.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
//     heroImage: project.hero_media?.file_path || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(/ /g,'+')}`,
//     heroAlt: project.hero_media?.alt_text || project.title,
//     tierName: project.tiers?.name || 'Standard',
//     tierColor: project.tiers?.color_hex || '#aaaaaa',
//   }));

//   return { data: processedData, count: count || 0 };
// };