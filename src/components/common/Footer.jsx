// // // import React from "react";

// // // export const Footer = () => {
// // //   const links = [
// // //     { 
// // //       title: 'Navigation',
// // //     //   list: ['Home', 'About', 'Portfolio', 'Contact']
// // //     list: ['Home', 'About', 'Portfolio', 'Projects', 'Contact']
// // //     },
// // //     { 
// // //       title: 'Company',
// // //       list: ['Blog', 'Testimonials', 'About Me']
// // //     },
// // //     { 
// // //       title: 'Resources',
// // //       list: ['Style Guide', 'Case Studies', 'My Process']
// // //     },
// // //     { 
// // //       title: 'Legal',
// // //       list: ['Privacy Policy', 'Terms of Service']
// // //     },
// // //   ];

// // //   return (
// // //     <footer className="bg-gray-900 text-gray-400">
// // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
// // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
// // //           <div className="col-span-2 md:col-span-4 lg:col-span-1">
// // //             <h2 className="text-2xl font-bold text-white">Gaddam B. Kumar</h2>
// // //             <p className="mt-2 text-sm">Creative Graphic Designer & Brand Strategist</p>
// // //           </div>
          
// // //           {links.map((section) => (
// // //             <div key={section.title}>
// // //               <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
// // //               <ul className="space-y-3 mt-4">
// // //                 {section.list.map((link) => (
// // //                   <li key={link}>
// // //                     <a href="#" className="hover:text-white transition-colors">{link}</a>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           ))}
// // //         </div>
        
// // //         {/* Bottom Bar */}
// // //         <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
// // //           <p className="text-gray-500 text-sm">
// // //             © {new Date().getFullYear()} Gaddam Bharath Kumar. All rights reserved.
// // //           </p>
// // //           <div className="flex space-x-6 mt-4 md:mt-0">
// // //             {/* <a href="#" className="text-gray-500 hover:text-white"><Twitter /></a>
// // //             <a href="#" className="text-gray-500 hover:text-white"><Instagram /></a>
// // //             <a href="#" className="text-gray-500 hover:text-white"><Linkedin /></a> */}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   );
// // // };


// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { useSiteData } from '../../context/SiteDataContext'; // Adjust path
// // import { Icon } from '../common/IconMap'; // Assuming you have this

// // // --- A new component to render the dynamic logo ---
// // const DynamicLogo = ({ config }) => {
// //   if (!config) return null;

// //   // Priority: 1. Image, 2. SVG, 3. Text
// //   if (config.logo_media_url) {
// //     return (
// //       <img 
// //         src={config.logo_media_url} 
// //         alt={config.logo_text || 'Site Logo'} 
// //         className="h-10 w-auto" // Adjust height
// //       />
// //     );
// //   }
// //   if (config.logo_svg) {
// //     return (
// //       <div 
// //         className="h-10 w-auto text-white" // SVG will inherit text color
// //         dangerouslySetInnerHTML={{ __html: config.logo_svg }} 
// //       />
// //     );
// //   }
// //   if (config.logo_text) {
// //     return (
// //       <span className="text-2xl font-bold text-white">
// //         {config.logo_text}
// //       </span>
// //     );
// //   }
// //   return null;
// // };

// // // --- A component to render internal vs. external links ---
// // const FooterLink = ({ label, url }) => {
// //   const isExternal = url.startsWith('http');
  
// //   if (isExternal) {
// //     return (
// //       <a 
// //         href={url} 
// //         target="_blank" 
// //         rel="noopener noreferrer"
// //         className="hover:text-white transition-colors duration-200"
// //       >
// //         {label}
// //       </a>
// //     );
// //   }
  
// //   return (
// //     <Link 
// //       to={url}
// //       className="hover:text-white transition-colors duration-200"
// //     >
// //       {label}
// //     </Link>
// //   );
// // };

// // export const Footer = () => {
// //   const { footerConfig, socials, loading } = useSiteData();

// //   if (loading || !footerConfig) {
// //     // You can return a simple loader or null
// //     return <footer className="bg-gray-900 h-64"></footer>;
// //   }

// //   const { logo_text, tagline, copyright_text, link_sections } = footerConfig;

// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.5,
// //       },
// //     },
// //   };

// //   return (
// //     <motion.footer 
// //       className="bg-gray-900 text-gray-400"
// //       initial="hidden"
// //       whileInView="visible"
// //       viewport={{ once: true, amount: 0.2 }}
// //       variants={containerVariants}
// //     >
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
// //           {/* --- Branding Section --- */}
// //           <motion.div 
// //             className="col-span-2 md:col-span-4 lg:col-span-1"
// //             variants={itemVariants}
// //           >
// //             <DynamicLogo config={footerConfig} />
// //             {tagline && (
// //               <p className="mt-4 text-sm">{tagline}</p>
// //             )}
// //           </motion.div>
          
// //           {/* --- Dynamic Link Sections --- */}
// //           {link_sections && link_sections.map((section, index) => (
// //             <motion.div key={section.id || index} variants={itemVariants}>
// //               <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
// //               <ul className="space-y-3 mt-4">
// //                 {section.links && section.links.map((link, linkIndex) => (
// //                   <li key={link.id || linkIndex}>
// //                     <FooterLink label={link.label} url={link.url} />
// //                   </li>
// //                 ))}
// //               </ul>
// //             </motion.div>
// //           ))}
// //         </div>
        
// //         {/* --- Bottom Bar --- */}
// //         <motion.div 
// //           className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.5, delay: 0.5 }}
// //         >
// //           <p className="text-gray-500 text-sm text-center md:text-left">
// //             © {new Date().getFullYear()} {copyright_text || 'Your Name'}. All rights reserved.
// //           </p>
          
// //           {/* --- Dynamic Social Icons --- */}
// //           <div className="flex space-x-6 mt-4 md:mt-0">
// //             {socials && socials.map(social => (
// //               <motion.a
// //                 key={social.id}
// //                 href={social.url}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="text-gray-500 hover:text-white"
// //                 whileHover={{ y: -2, scale: 1.1 }}
// //                 title={social.platform}
// //               >
// //                 <Icon name={social.icon_name} className="w-5 h-5" />
// //               </motion.a>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </div>
// //     </motion.footer>
// //   );
// // };


// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // // --- FIX: Adjusted import paths ---
// // import { useSiteData } from '../../context/SiteDataContext'; // Adjust path
// // // import { Icon } from '../common/IconMap'; // Assuming you have this
// // import { Icon } from '../common/IconMap'; // Adjusted import path
// // // --- A new component to render the dynamic logo ---
// // const DynamicLogo = ({ config }) => {
// //   if (!config) return null;

// //   // Priority: 1. Image, 2. SVG, 3. Text
// //   if (config.logo_media_url) {
// //     return (
// //       <img 
// //         src={config.logo_media_url} 
// //         alt={config.logo_text || 'Site Logo'} 
// //         className="h-10 w-auto" // Adjust height
// //       />
// //     );
// //   }
// //   if (config.logo_svg) {
// //     return (
// //       <div 
// //         className="h-10 w-auto text-white" // SVG will inherit text color
// //         dangerouslySetInnerHTML={{ __html: config.logo_svg }} 
// //       />
// //     );
// //   }
// //   if (config.logo_text) {
// //     return (
// //       <span className="text-2xl font-bold text-white">
// //         {config.logo_text}
// //       </span>
// //     );
// //   }
// //   return null;
// // };

// // // --- A component to render internal vs. external links ---
// // const FooterLink = ({ label, url }) => {
// //   // Add a fallback for undefined/null URLs
// //   const targetUrl = url || '#';
// //   const isExternal = targetUrl.startsWith('http');
  
// //   if (isExternal) {
// //     return (
// //       <a 
// //         href={targetUrl} 
// //         target="_blank" 
// //         rel="noopener noreferrer"
// //         className="hover:text-white transition-colors duration-200"
// //       >
// //         {label}
// //       </a>
// //     );
// //   }
  
// //   return (
// //     <Link 
// //       to={targetUrl}
// //       className="hover:text-white transition-colors duration-200"
// //     >
// //       {label}
// //     </Link>
// //   );
// // };

// // export const Footer = () => {
// //   const { footerConfig, socials, loading } = useSiteData();

// //   if (loading || !footerConfig) {
// //     // This placeholder footer should be visible if data is loading or missing
// //     return <footer className="bg-gray-900 h-64"></footer>;
// //   }

// //   const { tagline, copyright_text, link_sections } = footerConfig;

// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.5,
// //       },
// //     },
// //   };

// //   return (
// //     <motion.footer 
// //       className="bg-gray-900 text-gray-400"
// //       initial="hidden"
// //       whileInView="visible"
// //       viewport={{ once: true, amount: 0.2 }}
// //       variants={containerVariants}
// //     >
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
// //           {/* --- Branding Section --- */}
// //           <motion.div 
// //             className="col-span-2 md:col-span-4 lg:col-span-1"
// //             variants={itemVariants}
// //           >
// //             <DynamicLogo config={footerConfig} />
// //             {tagline && (
// //               <p className="mt-4 text-sm">{tagline}</p>
// //             )}
// //           </motion.div>
          
// //           {/* --- Dynamic Link Sections --- */}
// //           {link_sections && link_sections.map((section, index) => (
// //             <motion.div key={section.id || index} variants={itemVariants}>
// //               <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
// //               <ul className="space-y-3 mt-4">
// //                 {section.links && section.links.map((link, linkIndex) => (
// //                   <li key={link.id || linkIndex}>
// //                     <FooterLink label={link.label} url={link.url} />
// //                   </li>
// //                 ))}
// //               </ul>
// //             </motion.div>
// //           ))}
// //         </div>
        
// //         {/* --- Bottom Bar --- */}
// //         <motion.div 
// //           className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.5, delay: 0.5 }}
// //         >
// //           <p className="text-gray-500 text-sm text-center md:text-left">
// //             © {new Date().getFullYear()} {copyright_text || 'Your Name'}. All rights reserved.
// //           </p>
          
// //           {/* --- Dynamic Social Icons --- */}
// //           <div className="flex space-x-6 mt-4 md:mt-0">
// //             {socials && socials.map(social => (
// //               <motion.a
// //                 key={social.id}
// //                 href={social.url}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="text-gray-500 hover:text-white"
// //                 whileHover={{ y: -2, scale: 1.1 }}
// //                 title={social.platform}
// //               >
// //                 {/* Ensure your IconMap component can handle 'social.icon_name' */}
// //                 <Icon name={social.icon_name} className="w-5 h-5" />
// //               </motion.a>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </div>
// //     </motion.footer>
// //   );
// // };
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useSiteData } from '../../context/SiteDataContext';
// import { Icon } from '../common/IconMap';

// // --- Dynamic Logo Component (Unchanged) ---
// const DynamicLogo = ({ config }) => {
//   if (!config) return null;
//   if (config.logo_media_url) {
//     return <img src={config.logo_media_url} alt={config.logo_text || 'Site Logo'} className="h-12 w-auto" />;
//   }
//   if (config.logo_svg) {
//     return <div className="h-10 w-auto text-white" dangerouslySetInnerHTML={{ __html: config.logo_svg }} />;
//   }
//   if (config.logo_text) {
//     return <span className="text-2xl font-bold text-white tracking-tight">{config.logo_text}</span>;
//   }
//   return null;
// };

// // --- Footer Link Component (Unchanged) ---
// const FooterLink = ({ label, url }) => {
//   const targetUrl = url || '#';
//   const isExternal = targetUrl.startsWith('http');
  
//   const classes = "text-gray-400 hover:text-white transition-colors duration-200 text-sm py-1 block";

//   if (isExternal) {
//     return <a href={targetUrl} target="_blank" rel="noopener noreferrer" className={classes}>{label}</a>;
//   }
//   return <Link to={targetUrl} className={classes}>{label}</Link>;
// };

// export const Footer = () => {
//   const { footerConfig, socials, loading } = useSiteData();

//   if (loading || !footerConfig) {
//     return <footer className="bg-[#0b0c10] h-64 animate-pulse"></footer>;
//   }

//   const { tagline, copyright_text, link_sections } = footerConfig;

//   return (
//     <footer className="bg-[#0b0c10] border-t border-gray-800">
//       <div className="container mx-auto px-6 lg:px-12 pt-16 pb-8">
        
//         {/* --- Top Section: Flexbox Layout (Adapts to content size) --- */}
//         <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          
//           {/* LEFT: Branding & Tagline */}
//           <div className="lg:w-1/3">
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="flex flex-col items-start"
//             >
//               <div className="mb-6">
//                  <DynamicLogo config={footerConfig} />
//               </div>
              
//               {tagline && (
//                 <p className="text-gray-400 text-base leading-relaxed max-w-sm">
//                   {tagline}
//                 </p>
//               )}
//             </motion.div>
//           </div>

//           {/* RIGHT: Dynamic Link Sections */}
//           {/* This flex container allows multiple link columns to sit next to each other, 
//               or a single column to align neatly to the right/center */}
//           <div className="flex flex-wrap gap-10 lg:gap-24 lg:w-2/3 lg:justify-end">
//             {link_sections && link_sections.map((section, index) => (
//               <motion.div 
//                 key={section.id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="min-w-[140px]"
//               >
//                 <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
//                   {section.title}
//                 </h3>
//                 <ul className="space-y-3">
//                   {section.links && section.links.map((link, linkIndex) => (
//                     <li key={link.id || linkIndex}>
//                       <FooterLink label={link.label} url={link.url} />
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* --- Bottom Section: Divider, Copyright & Socials --- */}
//         <motion.div 
//           className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           {/* Copyright */}
//           <p className="text-gray-500 text-sm order-2 md:order-1">
//             © {new Date().getFullYear()} {copyright_text || 'All rights reserved'}.
//           </p>
          
//           {/* Social Icons */}
//           <div className="flex space-x-5 order-1 md:order-2">
//             {socials && socials.map((social, i) => (
//               <motion.a
//                 key={social.id || i}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 title={social.platform}
//               >
//                 <Icon name={social.icon_name} className="w-5 h-5" />
//               </motion.a>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// };
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/SiteDataContext';
import { Icon } from '../common/IconMap'; // Assuming this provides your social icons

// --- Dynamic Logo Component (Slightly enhanced) ---
const DynamicLogo = ({ config }) => {
  if (!config) return null;

  if (config.logo_media_url) {
    return (
      <img
        src={config.logo_media_url}
        alt={config.logo_text || 'Site Logo'}
        className="h-12 w-auto filter drop-shadow-lg" // Added drop-shadow
      />
    );
  }
  if (config.logo_svg) {
    return (
      <div
        className="h-12 w-auto text-white filter drop-shadow-lg" // Added drop-shadow
        dangerouslySetInnerHTML={{ __html: config.logo_svg }}
      />
    );
  }
  if (config.logo_text) {
    return (
      <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
        {config.logo_text}
      </span>
    );
  }
  return null;
};

// --- Footer Link Component (Enhanced with hover effects) ---
const FooterLink = ({ label, url }) => {
  const targetUrl = url || '#';
  const isExternal = targetUrl.startsWith('http');

  const linkClasses = "text-gray-400 hover:text-indigo-400 transition-all duration-300 relative group overflow-hidden text-base block py-1";

  const content = (
    <>
      <span className="relative z-10">{label}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </>
  );

  if (isExternal) {
    return (
      <a href={targetUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {content}
      </a>
    );
  }
  return (
    <Link to={targetUrl} className={linkClasses}>
      {content}
    </Link>
  );
};

export const Footer = () => {
  const { footerConfig, socials, loading } = useSiteData();

  if (loading || !footerConfig) {
    return (
      <footer className="bg-gradient-to-br from-gray-950 to-gray-800 h-64 animate-pulse"></footer>
    );
  }

  const { tagline, copyright_text, link_sections } = footerConfig;

  // Framer Motion Variants for staggered animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1], // Custom bouncy ease
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-950 to-gray-800 text-gray-400 overflow-hidden relative" // Darker gradient background
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Background Gradient Shapes (Subtle Animation) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob top-10 left-10"
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob bottom-20 right-20 delay-1000"
          initial={{ scale: 1.2, rotate: 0 }}
          animate={{ scale: [1.2, 0.9, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10"> {/* Increased padding */}
        
        {/* --- Top Section: Branding & Links --- */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20 lg:mb-24">
          
          {/* LEFT: Branding & Tagline */}
          <motion.div
            className="lg:w-1/3 max-w-lg" // Added max-w for better text control
            variants={sectionVariants}
          >
            <div className="mb-8"> {/* Increased bottom margin for logo */}
              <DynamicLogo config={footerConfig} />
            </div>
            
            {tagline && (
              <p className="text-gray-300 text-lg leading-relaxed"> {/* Larger, lighter text */}
                {tagline}
              </p>
            )}
          </motion.div>

          {/* RIGHT: Dynamic Link Sections */}
          <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-28 lg:w-2/3 lg:justify-end">
            {link_sections && link_sections.map((section, index) => (
              <motion.div
                key={section.id || index}
                variants={sectionVariants}
                style={{ originX: 0.5 }} // For slight rotation effect
                whileHover={{ rotateX: 3, transition: { duration: 0.2 } }}
                className="min-w-[160px]" // Slightly wider min-width
              >
                <h3 className="text-base font-bold text-white uppercase tracking-widest mb-7 border-b border-indigo-600 pb-2"> {/* Highlighted header */}
                  {section.title}
                </h3>
                <ul className="space-y-4"> {/* Increased space between links */}
                  {section.links && section.links.map((link, linkIndex) => (
                    <li key={link.id || linkIndex}>
                      <FooterLink label={link.label} url={link.url} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Bottom Section: Copyright & Socials --- */}
        <motion.div
          className="pt-10 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-8"
          variants={sectionVariants}
        >
          {/* Copyright */}
          <p className="text-gray-500 text-sm order-2 md:order-1 font-light">
            © {new Date().getFullYear()} {copyright_text || 'All rights reserved'}.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 order-1 md:order-2"> {/* Tighter spacing for icons */}
            {socials && socials.map((social, i) => (
              <motion.a
                key={social.id || i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400 transition-colors p-3 rounded-full bg-gray-800 hover:bg-gray-700 shadow-md"
                whileHover={{ y: -5, scale: 1.1, boxShadow: "0 8px 15px rgba(0,0,0,0.4)" }} // Lift and shadow on hover
                whileTap={{ scale: 0.95 }}
                title={social.platform}
              >
                <Icon name={social.icon_name} className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};