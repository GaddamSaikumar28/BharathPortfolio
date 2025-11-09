// import { supabase } from './supabase';
import { onTableChange } from './homepage'; // Reuse our real-time helper
import { supabase } from '../lib/supabaseClient';
/**
 * Fetches "at-a-glance" stats for the admin dashboard.
 * Uses `head: true` to only fetch the *count*, not all the data.
 */
export const getAdminDashboardStats = async () => {
  try {
    const [projectsRes, submissionsRes, servicesRes] = await Promise.all([
      // 1. Total projects
      supabase
        .from('projects')
        .select('*', { count: 'exact', head: true }),
      // 2. Unread contact submissions
      supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false),
      // 3. Total services offered
      supabase
        .from('services')
        .select('*', { count: 'exact', head: true }),
    ]);

    if (projectsRes.error) throw projectsRes.error;
    if (submissionsRes.error) throw submissionsRes.error;
    if (servicesRes.error) throw servicesRes.error;

    return {
      totalProjects: projectsRes.count,
      unreadMessages: submissionsRes.count,
      totalServices: servicesRes.count,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error.message);
    return { totalProjects: 0, unreadMessages: 0, totalServices: 0 };
  }
};

/**
 * Fetches the 5 most recent contact submissions.
 */
export const getRecentSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('id, name, email, created_at, is_read')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching recent submissions:', error.message);
    return [];
  }
};

/**
 * Subscribes to real-time changes on contact_submissions.
 */
export const onSubmissionsChange = (callback) => {
  // We reuse the generic helper from homepage.js
  return onTableChange('contact_submissions', callback);
};