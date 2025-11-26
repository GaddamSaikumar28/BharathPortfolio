
// import { supabase } from "../lib/supabaseClient";


// // export const fetchProjectCategories = async () => {
// //   const { data, error } = await supabase
// //     .from('project_categories')
// //     .select('name, slug')
// //     .order('name', { ascending: true });

// //   if (error) {
// //     console.error('Error fetching categories:', error);
// //     return [];
// //   }
// //   return data;
// // };

// // /**
// //  * Fetches all project tools. (Existing from previous request)
// //  */
// // export const fetchProjectTools = async () => {
// //   const { data, error } = await supabase
// //     .from('tools')
// //     .select('name, id, icon_name')
// //     .order('name', { ascending: true });

// //   if (error) {
// //     console.error('Error fetching tools:', error);
// //     return [];
// //   }
// //   return data;
// // };

// // // --- NEW API FUNCTION: Fetch Project Tiers ---
// // /**
// //  * Fetches all project tiers (complexity levels).
// //  */
// // export const fetchProjectTiers = async () => {
// //   const { data, error } = await supabase
// //     .from('project_tiers')
// //     .select('id, name, color_hex')
// //     .order('order', { ascending: true });

// //   if (error) {
// //     console.error('Error fetching tiers:', error);
// //     return [];
// //   }
// //   return data;
// // };


// // export const fetchNextProject = async (currentSlug) => {
// //    const { data, error } = await supabase
// //     .from('projects')
// //     .select('title, slug, hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text )')
// //     .neq('slug', currentSlug) // Not the current one
// //     .limit(1); // Just get one

// //    if (error) {
// //      console.error('Error fetching next project:', error);
// //      return null;
// //    }
   
// //    return data[0];
// // };

// // export const fetchProjects = async ({
// //   page = 1,
// //   limit = 20, 
// //   categorySlug = 'all',
// //   searchQuery = '',
// //   toolId = null,
// //   tierId = null, 
// // }) => {
// //   const from = (page - 1) * limit;
// //   const to = from + limit - 1;

// //   let query = supabase
// //     .from('projects')
// //     .select(
// //       `
// //       id,
// //       title,
// //       slug,
// //       description,
// //       hero_media_id,
// //       hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
      
   
// //       project_category_links (
// //         project_categories ( name, slug )
// //       ),
      
// //       tiers:project_tiers ( name, color_hex ),  
// //       tools:project_tool_links ( tools ( id ) ),
      
// //       status,
// //       completion_percentage,
// //       metadata_label,
// //       metadata_value,
// //       publisher_name,
// //       details_1,
// //       details_2
// //     `,
// //       { count: 'exact' }
// //     )
// //     .order('created_at', { ascending: false })
// //     .range(from, to);

// //   // --- Filtering Logic ---
  
// //   // 1. Category Filter (FIXED: The subquery must correctly check the category table slug)
// //   if (categorySlug && categorySlug !== 'all') {
// //     query = query.in(
// //       'id',
// //       supabase
// //         .from('project_category_links')
// //         .select('project_id')
// //         // Using eq() to filter by the slug of the category being linked
// //         .eq('project_categories.slug', categorySlug)
// //     );
// //   }

// //   // 2. Tool Filter
// //   if (toolId !== null) {
// //     query = query.in(
// //       'id',
// //       supabase
// //         .from('project_tool_links')
// //         .select('project_id')
// //         .eq('tool_id', toolId)
// //     );
// //   }

// //   // 3. Tier Filter
// //   if (tierId !== null) {
// //     query = query.eq('tier_id', tierId);
// //   }

// //   // 4. Search Query Filter
// //   if (searchQuery) {
// //     query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
// //   }
  
// //   // --- Execution ---
// //   const { data, error, count } = await query;

// //   console.log('all projects list',data);
// //   if (error) {
// //     console.error('Error fetching projects:', error);
// //     return { data: [], count: 0 };
// //   }
  
// //   // Simplify the nested structure and include new fields
// //   const processedData = data.map(project => ({
// //     ...project,
// //     category: project.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
// //     heroImage: project.hero_media?.file_path || `https://placehold.co/800x800/EEE/333?text=${project.title.replace(/ /g,'+')}`,
// //     heroAlt: project.hero_media?.alt_text || project.title,
// //     tierName: project.tiers?.name || 'Standard',
// //     tierColor: project.tiers?.color_hex || '#aaaaaa',
// //   }));

// //   return { data: processedData, count: count || 0 };
// // };
// // export const fetchProjectBySlug = async (slug) => {
// //     try {
// //         // 1. Fetch Main Project Data & Direct Relations
// //         const { data: project, error } = await supabase
// //             .from('projects')
// //             .select(`
// //                 *,
// //                 hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
// //                 project_tool_links ( tools ( id, name, icon_name ) ),
// //                 project_stats ( title, value, trend, icon_name, color, description, order ),
// //                 project_sections ( id, heading, body_text, media_asset_ids, layout_type, bg_color, order ),
// //                 project_content_blocks ( block_type, content, order ),
// //                 project_gallery ( order, media_assets ( file_path, alt_text ) )
// //             `)
// //             .eq('slug', slug)
// //             .single();

// //         if (error) throw error;
// //         if (!project) return null;

// //         // 2. Aggregate all Media IDs to fetch URLs in one batch
// //         //    (Banners, Sliders, and Images inside Sections are stored as UUID arrays)
// //         const bannerIds = project.banner_media_ids || [];
// //         const sliderIds = project.slider_media_ids || [];
// //         const sectionImageIds = project.project_sections?.flatMap(s => s.media_asset_ids || []) || [];
        
// //         // Combine distinct IDs
// //         const allMediaIds = [...new Set([...bannerIds, ...sliderIds, ...sectionImageIds])];

// //         let mediaMap = {};
// //         if (allMediaIds.length > 0) {
// //             const { data: mediaFiles } = await supabase
// //                 .from('media_assets')
// //                 .select('id, file_path, alt_text')
// //                 .in('id', allMediaIds);
            
// //             // Create a lookup map: ID -> { path, alt }
// //             mediaFiles?.forEach(file => {
// //                 mediaMap[file.id] = { path: file.file_path, alt: file.alt_text };
// //             });
// //         }

// //         // 3. Helper to resolve an array of IDs to Media Objects
// //         const resolveMedia = (ids) => ids?.map(id => mediaMap[id]).filter(Boolean) || [];

// //         // 4. Construct the final object matching the UI's expected structure
// //         const formattedProject = {
// //             ...project,
// //             // Main Fields
// //             hero_image: project.hero_media ? { path: project.hero_media.file_path, alt: project.hero_media.alt_text } : null,
// //             tools_used: project.project_tool_links?.map(link => link.tools) || [],
// //             key_metrics: project.project_stats?.sort((a,b) => a.order - b.order) || [],
            
// //             // Resolve Media Arrays
// //             banner_images: resolveMedia(bannerIds),
// //             slider_images: resolveMedia(sliderIds),
            
// //             // Resolve Sections & inject their images
// //             image_text_sections: project.project_sections?.sort((a,b) => a.order - b.order).map(section => ({
// //                 ...section,
// //                 images: resolveMedia(section.media_asset_ids)
// //             })) || [],

// //             // Content Blocks (Parsed from JSONB)
// //             flip_card_principles: project.project_content_blocks.find(b => b.block_type === 'flip_cards')?.content || [],
// //             process_steps: project.project_content_blocks.find(b => b.block_type === 'process')?.content || [],
// //             challenges_solutions: project.project_content_blocks.find(b => b.block_type === 'challenges')?.content || [],

// //             // Visual Gallery (Relation was joined directly)
// //             visual_gallery: project.project_gallery?.sort((a,b) => a.order - b.order).map(g => ({
// //                 file_path: g.media_assets?.file_path,
// //                 alt_text: g.media_assets?.alt_text
// //             })) || [],
            
// //             // JSONB Columns (Direct mapping)
// //             accessibility_insights: project.accessibility_data || [],
// //             quote_data: project.quote_data || null,
// //             call_to_action: project.call_to_action_data || null,
// //         };

// //         return formattedProject;

// //     } catch (error) {
// //         console.error("Error fetching project detail:", error);
// //         return null;
// //     }
// // };


// export const getStorageUrl = (filePath) => {
//   if (!filePath) return null;
//   // If it's already a full URL (legacy or external), return it
//   if (filePath.startsWith('http')) return filePath;
  
//   const { data } = supabase.storage.from('media').getPublicUrl(filePath);
//   return data.publicUrl;
// };

// /**
//  * =================================================================================
//  * Fetching Functions
//  * =================================================================================
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

// export const fetchProjectTools = async () => {
//   const { data, error } = await supabase
//     .from('tools')
//     .select('name, id, icon_name')
//     .order('name', { ascending: true });

//   if (error) {
//     console.error('Error fetching tools:', error);
//     return [];
//   }
//   return data;
// };

// export const fetchProjectTiers = async () => {
//   const { data, error } = await supabase
//     .from('project_tiers')
//     .select('id, name, color_hex')
//     .order('order', { ascending: true });

//   if (error) {
//     console.error('Error fetching tiers:', error);
//     return [];
//   }
//   return data;
// };
// export const fetchProjects = async ({
//   page = 1,
//   limit = 20, 
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
      
   
//       project_category_links (
//         project_categories ( name, slug )
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

//   // --- Filtering Logic ---
  
//   // 1. Category Filter (FIXED: The subquery must correctly check the category table slug)
//   if (categorySlug && categorySlug !== 'all') {
//     query = query.in(
//       'id',
//       supabase
//         .from('project_category_links')
//         .select('project_id')
//         // Using eq() to filter by the slug of the category being linked
//         .eq('project_categories.slug', categorySlug)
//     );
//   }

//   // 2. Tool Filter
//   if (toolId !== null) {
//     query = query.in(
//       'id',
//       supabase
//         .from('project_tool_links')
//         .select('project_id')
//         .eq('tool_id', toolId)
//     );
//   }

//   // 3. Tier Filter
//   if (tierId !== null) {
//     query = query.eq('tier_id', tierId);
//   }

//   // 4. Search Query Filter
//   if (searchQuery) {
//     query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
//   }
  
//   // --- Execution ---
//   const { data, error, count } = await query;

//   console.log('all projects list',data);
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
// // export const fetchProjects = async () => {
// //     try {
// //         const { data, error } = await supabase
// //             .from('projects')
// //             .select(`
// //                 id, 
// //                 title, 
// //                 slug, 
// //                 status, 
// //                 completion_percentage,
// //                 hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
// //                 project_tiers ( name, color_hex ),
// //                 project_category_links ( project_categories ( name, slug ) ),
// //                 project_tool_links ( tools ( name, icon_name ) )
// //             `)
// //             .order('created_at', { ascending: false });

// //         if (error) throw error;

// //         // Map to a cleaner structure for the grid
// //         return data.map(p => ({
// //             ...p,
// //             hero_image: p.hero_media ? getStorageUrl(p.hero_media.file_path) : null,
// //             category: p.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
// //             category_slug: p.project_category_links?.[0]?.project_categories?.slug || '',
// //             tier: p.project_tiers || null,
// //             tools: p.project_tool_links?.map(l => l.tools) || []
// //         }));

// //     } catch (err) {
// //         console.error("Error fetching projects:", err);
// //         return [];
// //     }
// // };

// export const fetchNextProject = async (currentSlug) => {
//    const { data, error } = await supabase
//     .from('projects')
//     .select('title, slug, hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text )')
//     .neq('slug', currentSlug)
//     .limit(1)
//     .maybeSingle();
    
//     if(data) {
//         return {
//             ...data,
//             hero_image: data.hero_media ? getStorageUrl(data.hero_media.file_path) : null
//         }
//     }
//     return null;
// };

// // --- MAIN DETAIL FETCH ---

// export const fetchProjectBySlug = async (slug) => {
//     try {
//         // 1. Fetch Main Project Data & Direct Relations
//         const { data: project, error } = await supabase
//             .from('projects')
//             .select(`
//                 *,
//                 hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
//                 detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( file_path, alt_text ),
//                 project_tool_links ( tools ( id, name, icon_name ) ),
//                 project_stats ( title, value, trend, icon_name, color, description, order ),
//                 project_sections ( id, heading, body_text, media_asset_ids, layout_type, bg_color, order ),
//                 project_content_blocks ( block_type, content, order ),
//                 project_gallery ( order, media_assets ( file_path, alt_text ) )
//             `)
//             .eq('slug', slug)
//             .single();

//         if (error) throw error;
//         if (!project) return null;

//         // 2. Aggregate all Media IDs to fetch URLs in one batch
//         const bannerIds = project.banner_media_ids || [];
//         const sliderIds = project.slider_media_ids || [];
//         const sectionImageIds = project.project_sections?.flatMap(s => s.media_asset_ids || []) || [];
        
//         // Combine distinct IDs
//         const allMediaIds = [...new Set([...bannerIds, ...sliderIds, ...sectionImageIds])];

//         let mediaMap = {};
//         if (allMediaIds.length > 0) {
//             const { data: mediaFiles } = await supabase
//                 .from('media_assets')
//                 .select('id, file_path, alt_text')
//                 .in('id', allMediaIds);
            
//             // Create a lookup map: ID -> { path, alt }
//             mediaFiles?.forEach(file => {
//                 // FIX: Use getStorageUrl to convert raw path to full public URL
//                 mediaMap[file.id] = { 
//                     path: getStorageUrl(file.file_path), 
//                     alt: file.alt_text 
//                 };
//             });
//         }

//         // 3. Helper to resolve an array of IDs to Media Objects
//         const resolveMedia = (ids) => ids?.map(id => mediaMap[id]).filter(Boolean) || [];

//         // 4. Construct the final object matching the UI's expected structure
//         const formattedProject = {
//             ...project,
//             // Main Fields - FIX: Use getStorageUrl
//             hero_image: project.hero_media ? { 
//                 path: getStorageUrl(project.hero_media.file_path), 
//                 alt: project.hero_media.alt_text 
//             } : null,
//             detail_hero_image: project.detail_hero_media ? {
//                 path: getStorageUrl(project.detail_hero_media.file_path),
//                 alt: project.detail_hero_media.alt_text
//             } : (project.hero_media ? { // Fallback to regular hero if detail hero missing
//                 path: getStorageUrl(project.hero_media.file_path),
//                 alt: project.hero_media.alt_text
//             } : null),

//             tools_used: project.project_tool_links?.map(link => link.tools) || [],
//             key_metrics: project.project_stats?.sort((a,b) => a.order - b.order) || [],
            
//             // Resolve Media Arrays
//             banner_images: resolveMedia(bannerIds),
//             slider_images: resolveMedia(sliderIds),
            
//             // Resolve Sections & inject their images
//             image_text_sections: project.project_sections?.sort((a,b) => a.order - b.order).map(section => ({
//                 ...section,
//                 images: resolveMedia(section.media_asset_ids)
//             })) || [],

//             // Content Blocks (Parsed from JSONB)
//             flip_card_principles: project.project_content_blocks.find(b => b.block_type === 'flip_cards')?.content || [],
//             process_steps: project.project_content_blocks.find(b => b.block_type === 'process')?.content || [],
//             challenges_solutions: project.project_content_blocks.find(b => b.block_type === 'challenges')?.content || [],

//             // Visual Gallery (Relation was joined directly)
//             visual_gallery: project.project_gallery?.sort((a,b) => a.order - b.order).map(g => ({
//                 // FIX: Use getStorageUrl
//                 file_path: getStorageUrl(g.media_assets?.file_path),
//                 alt_text: g.media_assets?.alt_text
//             })) || [],
            
//             // JSONB Columns (Direct mapping)
//             accessibility_insights: project.accessibility_data || [],
//             quote_data: project.quote_data || null,
//             call_to_action: project.call_to_action_data || null,
//         };

//         return formattedProject;

//     } catch (error) {
//         console.error("Error fetching project detail:", error);
//         return null;
//     }
// };
import { supabase } from "../lib/supabaseClient";

/**
 * =================================================================================
 * Helper Functions
 * =================================================================================
 */

// Helper to get public URL from Supabase Storage
export const getStorageUrl = (filePath) => {
  if (!filePath) return null;
  // If it's already a full URL (legacy or external), return it
  if (filePath.startsWith('http')) return filePath;
  
  const { data } = supabase.storage.from('media').getPublicUrl(filePath);
  return data.publicUrl;
};

/**
 * =================================================================================
 * Fetching Functions
 * =================================================================================
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

export const fetchProjects = async ({
  page = 1,
  limit = 12,
  categorySlug = 'all',
  searchQuery = '',
  toolId = null,
  tierId = null,
} = {}) => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('projects')
      .select(`
          id, 
          title, 
          slug, 
          description,
          status, 
          completion_percentage,
          created_at,
          hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
          project_tiers ( id, name, color_hex ),
          project_category_links ( project_categories ( name, slug ) ),
          project_tool_links ( tools ( id, name, icon_name ) )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

    // --- Filtering Logic ---

    // 1. Category Filter
    if (categorySlug && categorySlug !== 'all') {
      // We fetch the project IDs that belong to this category first
      const { data: catData } = await supabase
        .from('project_category_links')
        .select('project_id, project_categories!inner(slug)')
        .eq('project_categories.slug', categorySlug);

      const ids = catData?.map(link => link.project_id) || [];
      
      // If no projects match the category, return empty immediately
      if (ids.length === 0) return { data: [], count: 0 };
      
      query = query.in('id', ids);
    }

    // 2. Tool Filter
    if (toolId) {
      const { data: toolData } = await supabase
        .from('project_tool_links')
        .select('project_id')
        .eq('tool_id', toolId);

      const ids = toolData?.map(link => link.project_id) || [];
      
      if (ids.length === 0) return { data: [], count: 0 };

      query = query.in('id', ids);
    }

    // 3. Tier Filter
    if (tierId) {
      query = query.eq('tier_id', tierId);
    }

    // 4. Search Query Filter
    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    // --- Execution with Pagination ---
    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }

    // --- Processing & URL Resolution ---
    const processedData = data.map(project => ({
        ...project,
        // FIX: Use getStorageUrl helper
        hero_image: project.hero_media ? getStorageUrl(project.hero_media.file_path) : null,
        hero_alt: project.hero_media?.alt_text || project.title,
        
        // Flatten Relations
        category: project.project_category_links?.[0]?.project_categories?.name || 'Uncategorized',
        category_slug: project.project_category_links?.[0]?.project_categories?.slug || '',
        tier: project.project_tiers || null,
        tools: project.project_tool_links?.map(l => l.tools) || []
    }));

    return { data: processedData, count: count || 0 };

  } catch (err) {
    console.error("Error in fetchProjects:", err);
    return { data: [], count: 0 };
  }
};

export const fetchNextProject = async (currentSlug) => {
   const { data, error } = await supabase
    .from('projects')
    .select('title, slug, hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text )')
    .neq('slug', currentSlug)
    .limit(1)
    .maybeSingle();
    
    if(data) {
        return {
            ...data,
            hero_image: data.hero_media ? getStorageUrl(data.hero_media.file_path) : null
        }
    }
    return null;
};

// --- MAIN DETAIL FETCH ---

export const fetchProjectBySlug = async (slug) => {
    try {
        // 1. Fetch Main Project Data & Direct Relations
        const { data: project, error } = await supabase
            .from('projects')
            .select(`
                *,
                hero_media:media_assets!projects_hero_media_id_fkey ( file_path, alt_text ),
                detail_hero_media:media_assets!projects_detail_hero_media_id_fkey ( file_path, alt_text ),
                project_tool_links ( tools ( id, name, icon_name ) ),
                project_stats ( title, value, trend, icon_name, color, description, order ),
                project_sections ( id, heading, body_text, media_asset_ids, layout_type, bg_color, order ),
                project_content_blocks ( block_type, content, order ),
                project_gallery ( order, media_assets ( file_path, alt_text ) )
            `)
            .eq('slug', slug)
            .single();

        if (error) throw error;
        if (!project) return null;

        // 2. Aggregate all Media IDs to fetch URLs in one batch
        const bannerIds = project.banner_media_ids || [];
        const sliderIds = project.slider_media_ids || [];
        const sectionImageIds = project.project_sections?.flatMap(s => s.media_asset_ids || []) || [];
        
        // Combine distinct IDs
        const allMediaIds = [...new Set([...bannerIds, ...sliderIds, ...sectionImageIds])];

        let mediaMap = {};
        if (allMediaIds.length > 0) {
            const { data: mediaFiles } = await supabase
                .from('media_assets')
                .select('id, file_path, alt_text')
                .in('id', allMediaIds);
            
            // Create a lookup map: ID -> { path, alt }
            mediaFiles?.forEach(file => {
                // FIX: Use getStorageUrl to convert raw path to full public URL
                mediaMap[file.id] = { 
                    path: getStorageUrl(file.file_path), 
                    alt: file.alt_text 
                };
            });
        }

        // 3. Helper to resolve an array of IDs to Media Objects
        const resolveMedia = (ids) => ids?.map(id => mediaMap[id]).filter(Boolean) || [];

        // 4. Construct the final object matching the UI's expected structure
        const formattedProject = {
            ...project,
            // Main Fields - FIX: Use getStorageUrl
            hero_image: project.hero_media ? { 
                path: getStorageUrl(project.hero_media.file_path), 
                alt: project.hero_media.alt_text 
            } : null,
            detail_hero_image: project.detail_hero_media ? {
                path: getStorageUrl(project.detail_hero_media.file_path),
                alt: project.detail_hero_media.alt_text
            } : (project.hero_media ? { // Fallback to regular hero if detail hero missing
                path: getStorageUrl(project.hero_media.file_path),
                alt: project.hero_media.alt_text
            } : null),

            tools_used: project.project_tool_links?.map(link => link.tools) || [],
            key_metrics: project.project_stats?.sort((a,b) => a.order - b.order) || [],
            
            // Resolve Media Arrays
            banner_images: resolveMedia(bannerIds),
            slider_images: resolveMedia(sliderIds),
            
            // Resolve Sections & inject their images
            image_text_sections: project.project_sections?.sort((a,b) => a.order - b.order).map(section => ({
                ...section,
                images: resolveMedia(section.media_asset_ids)
            })) || [],

            // Content Blocks (Parsed from JSONB)
            flip_card_principles: project.project_content_blocks.find(b => b.block_type === 'flip_cards')?.content || [],
            process_steps: project.project_content_blocks.find(b => b.block_type === 'process')?.content || [],
            challenges_solutions: project.project_content_blocks.find(b => b.block_type === 'challenges')?.content || [],

            // Visual Gallery (Relation was joined directly)
            visual_gallery: project.project_gallery?.sort((a,b) => a.order - b.order).map(g => ({
                // FIX: Use getStorageUrl
                file_path: getStorageUrl(g.media_assets?.file_path),
                alt_text: g.media_assets?.alt_text
            })) || [],
            
            // JSONB Columns (Direct mapping)
            accessibility_insights: project.accessibility_data || [],
            quote_data: project.quote_data || null,
            call_to_action: project.call_to_action_data || null,
        };

        return formattedProject;

    } catch (error) {
        console.error("Error fetching project detail:", error);
        return null;
    }
};