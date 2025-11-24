import { supabase } from "../lib/supabaseClient"; // Assuming you have this client setup

/**
 * Fetches all unique blog tags.
 */
export const fetchBlogTags = async () => {
  const { data, error } = await supabase
    .from('blog_tags')
    .select('name, slug')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
  return data;
};

/**
 * Fetches a list of blog posts with pagination and filtering by tag.
 */
export const fetchBlogPosts = async ({
  page = 1,
  limit = 9,
  tagSlug = 'all',
}) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('blog_posts')
    .select(
      `
      id,
      title,
      category,
      read_time,
      order,
      media:media_assets!blog_posts_media_id_fkey ( file_path, alt_text ),
      tags:blog_post_tag_links!inner (
        blog_tags!inner ( name, slug )
      )
    `,
      { count: 'exact' } // Request the total count for pagination
    )
    .order('order', { ascending: true })
    .range(from, to);

  // Apply tag filter
  if (tagSlug !== 'all') {
    // Inner join to filter by posts that are linked to the specific tag slug
    query = query.eq('tags.blog_tags.slug', tagSlug);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], count: 0 };
  }
  
  // Clean up the nested tag data
  const cleanedData = data.map(post => ({
      ...post,
      tags: post.tags.map(link => link.tags),
  }));

  return { posts: cleanedData, count };
};

/**
 * Fetches a single blog post detail, including all content blocks.
 */
export const fetchBlogPostDetail = async (postId) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      `
      *,
      media:media_assets!blog_posts_media_id_fkey ( file_path, alt_text ),
      content:blog_content_blocks ( type, "order", content )
    `
    )
    .eq('id', postId)
    .order('order', { referencedTable: 'blog_content_blocks', ascending: true })
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.warn(`Blog post not found for ID: ${postId}`);
      return null;
    }
    console.error('Error fetching blog post detail:', error);
    throw error;
  }
  
  return data;
};