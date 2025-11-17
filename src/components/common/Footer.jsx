// // import React from "react";

// // export const Footer = () => {
// //   const links = [
// //     { 
// //       title: 'Navigation',
// //     //   list: ['Home', 'About', 'Portfolio', 'Contact']
// //     list: ['Home', 'About', 'Portfolio', 'Projects', 'Contact']
// //     },
// //     { 
// //       title: 'Company',
// //       list: ['Blog', 'Testimonials', 'About Me']
// //     },
// //     { 
// //       title: 'Resources',
// //       list: ['Style Guide', 'Case Studies', 'My Process']
// //     },
// //     { 
// //       title: 'Legal',
// //       list: ['Privacy Policy', 'Terms of Service']
// //     },
// //   ];

// //   return (
// //     <footer className="bg-gray-900 text-gray-400">
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
// //           <div className="col-span-2 md:col-span-4 lg:col-span-1">
// //             <h2 className="text-2xl font-bold text-white">Gaddam B. Kumar</h2>
// //             <p className="mt-2 text-sm">Creative Graphic Designer & Brand Strategist</p>
// //           </div>
          
// //           {links.map((section) => (
// //             <div key={section.title}>
// //               <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
// //               <ul className="space-y-3 mt-4">
// //                 {section.list.map((link) => (
// //                   <li key={link}>
// //                     <a href="#" className="hover:text-white transition-colors">{link}</a>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
        
// //         {/* Bottom Bar */}
// //         <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
// //           <p className="text-gray-500 text-sm">
// //             © {new Date().getFullYear()} Gaddam Bharath Kumar. All rights reserved.
// //           </p>
// //           <div className="flex space-x-6 mt-4 md:mt-0">
// //             {/* <a href="#" className="text-gray-500 hover:text-white"><Twitter /></a>
// //             <a href="#" className="text-gray-500 hover:text-white"><Instagram /></a>
// //             <a href="#" className="text-gray-500 hover:text-white"><Linkedin /></a> */}
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useSiteData } from '../../context/SiteDataContext'; // Adjust path
// import { Icon } from '../common/IconMap'; // Assuming you have this

// // --- A new component to render the dynamic logo ---
// const DynamicLogo = ({ config }) => {
//   if (!config) return null;

//   // Priority: 1. Image, 2. SVG, 3. Text
//   if (config.logo_media_url) {
//     return (
//       <img 
//         src={config.logo_media_url} 
//         alt={config.logo_text || 'Site Logo'} 
//         className="h-10 w-auto" // Adjust height
//       />
//     );
//   }
//   if (config.logo_svg) {
//     return (
//       <div 
//         className="h-10 w-auto text-white" // SVG will inherit text color
//         dangerouslySetInnerHTML={{ __html: config.logo_svg }} 
//       />
//     );
//   }
//   if (config.logo_text) {
//     return (
//       <span className="text-2xl font-bold text-white">
//         {config.logo_text}
//       </span>
//     );
//   }
//   return null;
// };

// // --- A component to render internal vs. external links ---
// const FooterLink = ({ label, url }) => {
//   const isExternal = url.startsWith('http');
  
//   if (isExternal) {
//     return (
//       <a 
//         href={url} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="hover:text-white transition-colors duration-200"
//       >
//         {label}
//       </a>
//     );
//   }
  
//   return (
//     <Link 
//       to={url}
//       className="hover:text-white transition-colors duration-200"
//     >
//       {label}
//     </Link>
//   );
// };

// export const Footer = () => {
//   const { footerConfig, socials, loading } = useSiteData();

//   if (loading || !footerConfig) {
//     // You can return a simple loader or null
//     return <footer className="bg-gray-900 h-64"></footer>;
//   }

//   const { logo_text, tagline, copyright_text, link_sections } = footerConfig;

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <motion.footer 
//       className="bg-gray-900 text-gray-400"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.2 }}
//       variants={containerVariants}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
//           {/* --- Branding Section --- */}
//           <motion.div 
//             className="col-span-2 md:col-span-4 lg:col-span-1"
//             variants={itemVariants}
//           >
//             <DynamicLogo config={footerConfig} />
//             {tagline && (
//               <p className="mt-4 text-sm">{tagline}</p>
//             )}
//           </motion.div>
          
//           {/* --- Dynamic Link Sections --- */}
//           {link_sections && link_sections.map((section, index) => (
//             <motion.div key={section.id || index} variants={itemVariants}>
//               <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
//               <ul className="space-y-3 mt-4">
//                 {section.links && section.links.map((link, linkIndex) => (
//                   <li key={link.id || linkIndex}>
//                     <FooterLink label={link.label} url={link.url} />
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
        
//         {/* --- Bottom Bar --- */}
//         <motion.div 
//           className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <p className="text-gray-500 text-sm text-center md:text-left">
//             © {new Date().getFullYear()} {copyright_text || 'Your Name'}. All rights reserved.
//           </p>
          
//           {/* --- Dynamic Social Icons --- */}
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             {socials && socials.map(social => (
//               <motion.a
//                 key={social.id}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-500 hover:text-white"
//                 whileHover={{ y: -2, scale: 1.1 }}
//                 title={social.platform}
//               >
//                 <Icon name={social.icon_name} className="w-5 h-5" />
//               </motion.a>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </motion.footer>
//   );
// };


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// --- FIX: Adjusted import paths ---
import { useSiteData } from '../../context/SiteDataContext'; // Adjust path
// import { Icon } from '../common/IconMap'; // Assuming you have this
import { Icon } from '../common/IconMap'; // Adjusted import path
// --- A new component to render the dynamic logo ---
const DynamicLogo = ({ config }) => {
  if (!config) return null;

  // Priority: 1. Image, 2. SVG, 3. Text
  if (config.logo_media_url) {
    return (
      <img 
        src={config.logo_media_url} 
        alt={config.logo_text || 'Site Logo'} 
        className="h-10 w-auto" // Adjust height
      />
    );
  }
  if (config.logo_svg) {
    return (
      <div 
        className="h-10 w-auto text-white" // SVG will inherit text color
        dangerouslySetInnerHTML={{ __html: config.logo_svg }} 
      />
    );
  }
  if (config.logo_text) {
    return (
      <span className="text-2xl font-bold text-white">
        {config.logo_text}
      </span>
    );
  }
  return null;
};

// --- A component to render internal vs. external links ---
const FooterLink = ({ label, url }) => {
  // Add a fallback for undefined/null URLs
  const targetUrl = url || '#';
  const isExternal = targetUrl.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={targetUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        {label}
      </a>
    );
  }
  
  return (
    <Link 
      to={targetUrl}
      className="hover:text-white transition-colors duration-200"
    >
      {label}
    </Link>
  );
};

export const Footer = () => {
  const { footerConfig, socials, loading } = useSiteData();

  if (loading || !footerConfig) {
    // This placeholder footer should be visible if data is loading or missing
    return <footer className="bg-gray-900 h-64"></footer>;
  }

  const { tagline, copyright_text, link_sections } = footerConfig;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.footer 
      className="bg-gray-900 text-gray-400"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* --- Branding Section --- */}
          <motion.div 
            className="col-span-2 md:col-span-4 lg:col-span-1"
            variants={itemVariants}
          >
            <DynamicLogo config={footerConfig} />
            {tagline && (
              <p className="mt-4 text-sm">{tagline}</p>
            )}
          </motion.div>
          
          {/* --- Dynamic Link Sections --- */}
          {link_sections && link_sections.map((section, index) => (
            <motion.div key={section.id || index} variants={itemVariants}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3 mt-4">
                {section.links && section.links.map((link, linkIndex) => (
                  <li key={link.id || linkIndex}>
                    <FooterLink label={link.label} url={link.url} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* --- Bottom Bar --- */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {copyright_text || 'Your Name'}. All rights reserved.
          </p>
          
          {/* --- Dynamic Social Icons --- */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socials && socials.map(social => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white"
                whileHover={{ y: -2, scale: 1.1 }}
                title={social.platform}
              >
                {/* Ensure your IconMap component can handle 'social.icon_name' */}
                <Icon name={social.icon_name} className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};