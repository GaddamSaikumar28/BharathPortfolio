// // // SiteDataContext.js
// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // // import { getSiteData, saveSiteData } from './dataService';
// // // import { getSiteData, saveSiteData } from './utils/dataService';
// // const SiteDataContext = createContext();
// // import { getSiteData, saveSiteData } from '../utils/dataService';
// // /**
// //  * This custom hook is what all your components will use
// //  * to read and write data.
// //  */
// // export const useSiteData = () => useContext(SiteDataContext);

// // /**
// //  * This Provider component wraps your entire app.
// //  * It holds the master data state and provides the functions
// //  * to update it.
// //  */
// // export const SiteDataProvider = ({ children }) => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // On initial app load, get data from localStorage
// //   useEffect(() => {
// //     const initialData = getSiteData();
// //     setData(initialData);
// //     setLoading(false);
// //   }, []);

// //   /**
// //    * A single function to update the database.
// //    * It updates React state AND saves to localStorage.
// //    */
// //   const updateData = (newData) => {
// //     setData(newData);
// //     saveSiteData(newData);
// //   };

// //   if (loading) {
// //     return <div>Loading Portfolio Data...</div>; // Or a loading spinner
// //   }

// //   return (
// //     <SiteDataContext.Provider value={{ data, updateData }}>
// //       {children}
// //     </SiteDataContext.Provider>
// //   );
// // };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../lib/supabaseClient'; // Adjust path as needed

// const SiteDataContext = createContext();

// export const SiteDataProvider = ({ children }) => {
//   const [headerConfig, setHeaderConfig] = useState(null);
//   const [socials, setSocials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSiteData = async () => {
//       try {
//         // We can fetch all site-wide public data in parallel
//         const [headerRes, socialsRes] = await Promise.all([
//           supabase
//             .from('header_config')
//             .select(`
//               logo_text,
//               logo_svg,
//               cta_text,
//               cta_url,
//               logo_media:media_assets!header_config_logo_media_id_fkey ( file_path )
//             `)
//             .eq('id', 1)
//             .single(),
//           supabase
//             .from('social_links')
//             .select('*')
//             .order('order')
//         ]);

//         if (headerRes.error) throw headerRes.error;
//         if (socialsRes.error) throw socialsRes.error;
        
//         // Flatten the logo path
//         if (headerRes.data) {
//           setHeaderConfig({
//             ...headerRes.data,
//             logo_media_url: headerRes.data.logo_media?.file_path 
//               ? getStorageUrl(headerRes.data.logo_media.file_path) 
//               : null,
//           });
//         }
        
//         setSocials(socialsRes.data);

//       } catch (error) {
//         console.error("Error fetching site data:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSiteData();
//   }, []);

//   // Helper function to get storage URL
//   const getStorageUrl = (filePath) => {
//     if (!filePath) return null;
//     const { data } = supabase.storage.from('media').getPublicUrl(filePath);
//     return data.publicUrl;
//   };

//   return (
//     <SiteDataContext.Provider value={{ headerConfig, socials, loading }}>
//       {children}
//     </SiteDataContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useSiteData = () => {
//   const context = useContext(SiteDataContext);
//   if (context === undefined) {
//     throw new Error('useSiteData must be used within a SiteDataProvider');
//   }
//   return context;
// };



import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Adjust path as needed

const SiteDataContext = createContext();

export const SiteDataProvider = ({ children }) => {
  const [headerConfig, setHeaderConfig] = useState(null);
  const [footerConfig, setFooterConfig] = useState(null);
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get storage URL
  const getStorageUrl = (filePath) => {
    if (!filePath) return null;
    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    return data.publicUrl;
  };

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        // Fetch all site-wide public data in parallel
        const [headerRes, footerRes, socialsRes] = await Promise.all([
          supabase
            .from('header_config')
            .select(`
              logo_text,
              logo_svg,
              cta_text,
              cta_url,
              logo_media:media_assets!header_config_logo_media_id_fkey ( file_path )
            `)
            .eq('id', 1)
            .single(),
          supabase // <-- NEW: Fetch footer config
            .from('footer_config')
            .select(`
              logo_text,
              logo_svg,
              tagline,
              copyright_text,
              link_sections,
              logo_media:media_assets!footer_config_logo_media_id_fkey ( file_path )
            `)
            .eq('id', 1)
            .single(),
          supabase
            .from('social_links')
            .select('*')
            .order('order')
        ]);

        if (headerRes.error) throw headerRes.error;
        if (footerRes.error) throw footerRes.error; // <-- NEW
        if (socialsRes.error) throw socialsRes.error;
        
        // --- Process Header Data ---
        if (headerRes.data) {
          setHeaderConfig({
            ...headerRes.data,
            logo_media_url: headerRes.data.logo_media?.file_path 
              ? getStorageUrl(headerRes.data.logo_media.file_path) 
              : null,
          });
        }
        
        // --- Process Footer Data --- (NEW)
        if (footerRes.data) {
          setFooterConfig({
            ...footerRes.data,
            logo_media_url: footerRes.data.logo_media?.file_path 
              ? getStorageUrl(footerRes.data.logo_media.file_path) 
              : null,
          });
        }
        
        setSocials(socialsRes.data);

      } catch (error) {
        console.error("Error fetching site data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteData();
  }, []);

  return (
    <SiteDataContext.Provider value={{ headerConfig, footerConfig, socials, loading }}>
      {!loading && children}
    </SiteDataContext.Provider>
  );
};

// Custom hook to use the context
export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};