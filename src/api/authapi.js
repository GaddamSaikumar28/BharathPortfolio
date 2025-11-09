import { supabase } from '../lib/supabaseClient'; // Adjust path as needed

/**
 * Signs up a new user.
 * The database trigger (SQL_Trigger.sql) will handle profile creation.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} Supabase signup response
 */
export const signup = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  
  if (error) throw error;
  return data;
};

/**
 * Logs in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} Supabase login response
 */
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw error;
  return data;
};

/**
 * Logs out the current user.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};