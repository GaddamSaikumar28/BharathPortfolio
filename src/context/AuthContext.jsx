// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../lib/supabaseClient';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [session, setSession] = useState(null);
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 1. Get the initial session
//     const getSession = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();
//         setSession(session);
//         setUser(session?.user ?? null);
//       } catch (error) {
//         console.error('Error getting session:', error);
//       }
//     };
//     getSession();

//     // 2. Set up a listener for auth state changes
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setSession(session);
//         setUser(session?.user ?? null);
//       }
//     );

//     return () => {
//       authListener?.subscription.unsubscribe();
//     };
//   }, []);

//   // 3. Fetch user profile when user state changes
//   useEffect(() => {
//     if (user) {
//       const fetchProfile = async () => {
//         try {
//           setLoading(true);
//           const { data, error, status } = await supabase
//             .from('profiles')
//             .select(`role`)
//             .eq('id', user.id)
//             .single();

//           if (error && status !== 406) {
//             throw error;
//           }

//           if (data) {
//             setProfile(data);
//           }
//         } catch (error) {
//           console.error('Error fetching profile:', error.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProfile();
//     } else {
//       setProfile(null);
//       setLoading(false);
//     }
//   }, [user]);

//   // 4. Expose auth methods
//   const value = {
//     session,
//     user : {id: '01e31b35-ed86-423b-abd5-01e97bbba857'},
//     profile,
//     loading,
//     // Per your request: isAdmin is true if profile role is 'admin' OR for testing
//     //isAdmin: (profile?.role === 'admin' || true), 
//     isAdmin :true,
//     login: (email, password) => supabase.auth.signInWithPassword({ email, password }),
//     signup: (email, password) => supabase.auth.signUp({ email, password }),
//     logout: () => supabase.auth.signOut(),
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Adjust path as needed
// import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../api/auth'; // Adjust path
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../api/authapi'; // Adjust path
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Set up session listener
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false); // Initial load is done
    };
    getSession();

    // Listen for auth state changes (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          setProfile(null); // Clear profile on logout
        }
        // Set loading to false when auth state is resolved
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // 2. Fetch profile when user state changes
  useEffect(() => {
    if (user) {
      setLoading(true); // Set loading while fetching profile
      const fetchProfile = async () => {
        try {
          const { data, error, status } = await supabase
            .from('profiles')
            .select(`role`)
            .eq('id', user.id)
            .single();

          if (error && status !== 406) {
            throw error;
          }

          if (data) {
            setProfile(data);
          }
        } catch (error) {
          console.error('Error fetching profile:', error.message);
        } finally {
          setLoading(false); // Profile fetch is done
        }
      };
      fetchProfile();
    } else {
      // No user, so no profile and not loading
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  // 3. Expose auth methods and state
  const value = {
    session,
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin', // The REAL admin check
    login: apiLogin,   // Pass the API function
    signup: apiSignup, // Pass the API function
    logout: apiLogout, // Pass the API function
  };

  // Don't render children until the initial session load is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};