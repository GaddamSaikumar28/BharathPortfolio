// // // Header.jsx
// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { Link, useLocation } from 'react-router-dom';
// // import { Shield } from 'lucide-react';
// // export const Header = () => {
// //   // We don't need the scroll-based animation for this example
// //   // but you can add it back later.
  
// //   const location = useLocation();
// //   const activePath = location.pathname;

// //   const navLinks = [
// //     { name: 'Home', path: '/' },
// //     { name: 'About', path: '/about' },
// //     // { name: 'Portfolio', path: '/portfolio' },
// //     { name: 'Projects', path: '/projects' },
// //     { name: 'Contact', path: '/contact' },
// //   ];

// //   return (
// //     <motion.header
// //       className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md"
// //     >
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-16">
// //           <div className="flex-shrink-0">
// //             <Link to="/" className="text-2xl font-bold text-gray-900">
// //               Gaddam B. Kumar
// //             </Link>
// //           </div>
// //           <nav className="hidden md:flex md:space-x-8">
// //             {navLinks.map((link) => (
// //               <Link
// //                 key={link.name}
// //                 to={link.path}
// //                 className={`
// //                   ${activePath === link.path 
// //                     ? 'text-blue-600 font-semibold' 
// //                     : 'text-gray-600 hover:text-gray-900'}
// //                 `}
// //               >
// //                 {link.name}
// //               </Link>
// //             ))}
// //           </nav>
// //           <div className="flex items-center">
// //             <motion.a
// //               href="#"
// //               className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg"
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               Contact Me
// //             </motion.a>
// //           </div>
// //           <Link to="/admin" className="hidden sm:flex items-center justify-center text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded-full border border-blue-200" title="Admin Panel">
// //                             <Shield size={18}/> <span className="sr-only">Admin Panel</span>
// //           </Link>
// //         </div>
// //       </div>
// //     </motion.header>
// //   );
// // };



// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Shield, LogOut, LogIn, UserPlus, X, Menu, Loader2 } from 'lucide-react';
// // --- FIX: Adjusted import path ---
// import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
// import toast from 'react-hot-toast';

// export const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const activePath = location.pathname;

//   const { user, isAdmin, loading, logout } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   // Base navigation links
//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Projects', path: '/projects' },
//   ];

//   // Conditionally add Admin link
//   if (isAdmin) {
//     navLinks.push({ name: 'Admin', path: '/admin' });
//   }

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/'); // Redirect to home after logout
//     } catch (error) {
//       toast.error(error.message || 'Failed to log out');
//     } finally {
//       setIsLoggingOut(false);
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const MobileMenu = () => (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -50 }}
//       className="absolute top-0 left-0 right-0 h-screen bg-white shadow-lg md:hidden z-40"
//     >
//       <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 border-b">
//         <Link to="/" className="text-2xl font-bold text-gray-900">
//           Gaddam B. Kumar
//         </Link>
//         <button onClick={() => setIsMobileMenuOpen(false)}>
//           <X className="w-6 h-6" />
//         </button>
//       </div>
//       <nav className="flex flex-col space-y-4 p-4">
//         {navLinks.map((link) => (
//           <Link
//             key={link.name}
//             to={link.path}
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={`text-lg ${
//               activePath === link.path
//                 ? 'text-blue-600 font-semibold'
//                 : 'text-gray-600 hover:text-gray-900'
//             } ${
//               link.name === 'Admin'
//                 ? 'flex items-center gap-2 text-blue-600'
//                 : ''
//             }`}
//           >
//             {link.name === 'Admin' && <Shield className="w-5 h-5" />}
//             {link.name}
//           </Link>
//         ))}
//         <Link
//           to="/contact"
//           onClick={() => setIsMobileMenuOpen(false)}
//           className="text-lg text-gray-600 hover:text-gray-900"
//         >
//           Contact
//         </Link>
//         <hr className="my-4" />
//         {user ? (
//           <button
//             onClick={handleLogout}
//             disabled={isLoggingOut}
//             className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-red-600 bg-red-50"
//           >
//             {isLoggingOut ? (
//               <Loader2 className="w-5 h-5 animate-spin" />
//             ) : (
//               <>
//                 <LogOut className="w-5 h-5" /> Logout
//               </>
//             )}
//           </button>
//         ) : (
//           <div className="space-y-3">
//             <Link
//               to="/login"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//             >
//               <LogIn className="w-5 h-5" /> Login
//             </Link>
//             <Link
//               to="/signup"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
//             >
//               <UserPlus className="w-5 h-5" /> Sign Up
//             </Link>
//           </div>
//         )}
//       </nav>
//     </motion.div>
//   );

//   return (
//     <motion.header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="text-2xl font-bold text-gray-900">
//               Gaddam B. Kumar
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex md:space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`text-sm font-medium ${
//                   activePath === link.path
//                     ? 'text-blue-600'
//                     : 'text-gray-600 hover:text-gray-900'
//                 } ${
//                   link.name === 'Admin'
//                     ? 'flex items-center gap-1 text-blue-600 hover:text-blue-800'
//                     : ''
//                 }`}
//               >
//                 {link.name === 'Admin' && (
//                   <Shield className="w-4 h-4" />
//                 )}
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Auth & CTA Buttons (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             {loading ? (
//               <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
//             ) : user ? (
//               <>
//                 <Link
//                   to="/contact"
//                   className="text-gray-600 hover:text-gray-900 text-sm font-medium"
//                 >
//                   Contact
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                   className="flex items-center justify-center text-red-600 hover:text-red-800 p-1 text-sm font-medium"
//                 >
//                   {isLoggingOut ? (
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                   ) : (
//                     <LogOut className="w-5 h-5" />
//                   )}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-600 hover:text-gray-900 text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="text-gray-600 hover:text-gray-900 text-sm font-medium"
//                 >
//                   Sign Up
//                 </Link>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link
//                     to="/contact"
//                     className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg"
//                   >
//                     Contact Me
//                   </Link>
//                 </motion.div>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="text-gray-700 hover:text-gray-900"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Component */}
//       <AnimatePresence>
//         {isMobileMenuOpen && <MobileMenu />}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default Header;


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Shield, LogOut, LogIn, UserPlus, X, Menu, Loader2 } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext'; // Adjust path
// import { useSiteData } from '../../context/SiteDataContext'; // Adjust path
// import toast from 'react-hot-toast';

// // --- A new component to render the dynamic logo ---
// const DynamicLogo = ({ config }) => {
//   if (!config) {
//     return (
//       <span className="text-2xl font-bold text-gray-900">Site Logo</span>
//     );
//   }

//   // Priority: 1. Image, 2. SVG, 3. Text
//   if (config.logo_media_url) {
//     return (
//       <img 
//         src={config.logo_media_url} 
//         alt={config.logo_text || 'Site Logo'} 
//         className="h-10 w-auto" // Adjust height as needed
//       />
//     );
//   }

//   if (config.logo_svg) {
//     // Render SVG from text.
//     // This is safe because we trust the admin setting the SVG.
//     return (
//       <div 
//         className="h-10 w-auto" // Adjust sizing
//         dangerouslySetInnerHTML={{ __html: config.logo_svg }} 
//       />
//     );
//   }

//   if (config.logo_text) {
//     return (
//       <span className="text-2xl font-bold text-gray-900">
//         {config.logo_text}
//       </span>
//     );
//   }

//   // Final fallback
//   return (
//     <span className="text-2xl font-bold text-gray-900">Site Logo</span>
//   );
// };


// export const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const activePath = location.pathname;

//   // --- Get data from our contexts ---
//   const { user, isAdmin, loading: authLoading, logout } = useAuth();
//   const { headerConfig, loading: siteLoading } = useSiteData();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   // Combine loading states
//   const loading = authLoading || siteLoading;

//   // Base navigation links
//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Projects', path: '/projects' },
//   ];

//   // Conditionally add Admin link
//   if (isAdmin) {
//     navLinks.push({ name: 'Admin', path: '/admin' });
//   }

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/'); // Redirect to home after logout
//     } catch (error) {
//       toast.error(error.message || 'Failed to log out');
//     } finally {
//       setIsLoggingOut(false);
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const MobileMenu = () => (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -50 }}
//       className="absolute top-0 left-0 right-0 h-screen bg-white shadow-lg md:hidden z-40"
//     >
//       <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 border-b">
//         <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
//           <DynamicLogo config={headerConfig} />
//         </Link>
//         <button onClick={() => setIsMobileMenuOpen(false)}>
//           <X className="w-6 h-6" />
//         </button>
//       </div>
//       <nav className="flex flex-col space-y-4 p-4">
//         {navLinks.map((link) => (
//           <Link
//             key={link.name}
//             to={link.path}
//             onClick={() => setIsMobileMenuOpen(false)}
//             className={`text-lg ${
//               activePath === link.path
//                 ? 'text-blue-600 font-semibold'
//                 : 'text-gray-600 hover:text-gray-900'
//             } ${
//               link.name === 'Admin'
//                 ? 'flex items-center gap-2 text-blue-600'
//                 : ''
//             }`}
//           >
//             {link.name === 'Admin' && <Shield className="w-5 h-5" />}
//             {link.name}
//           </Link>
//         ))}
//         {/* Dynamic CTA Link (if not logged in) */}
//         {!user && (
//           <Link
//             to={headerConfig?.cta_url || '/contact'}
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="text-lg text-gray-600 hover:text-gray-900"
//           >
//             {headerConfig?.cta_text || 'Contact'}
//           </Link>
//         )}
//         <hr className="my-4" />
//         {user ? (
//           <button
//             onClick={handleLogout}
//             disabled={isLoggingOut}
//             className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-red-600 bg-red-50"
//           >
//             {isLoggingOut ? (
//               <Loader2 className="w-5 h-5 animate-spin" />
//             ) : (
//               <>
//                 <LogOut className="w-5 h-5" /> Logout
//               </>
//             )}
//           </button>
//         ) : (
//           <div className="space-y-3">
//             <Link
//               to="/login"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//             >
//               <LogIn className="w-5 h-5" /> Login
//             </Link>
//             <Link
//               to="/signup"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
//             >
//               <UserPlus className="w-5 h-5" /> Sign Up
//             </Link>
//           </div>
//         )}
//       </nav>
//     </motion.div>
//   );

//   return (
//     <motion.header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/">
//               <DynamicLogo config={headerConfig} />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex md:space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`text-sm font-medium ${
//                   activePath === link.path
//                     ? 'text-blue-600'
//                     : 'text-gray-600 hover:text-gray-900'
//                 } ${
//                   link.name === 'Admin'
//                     ? 'flex items-center gap-1 text-blue-600 hover:text-blue-800'
//                     : ''
//                 }`}
//               >
//                 {link.name === 'Admin' && (
//                   <Shield className="w-4 h-4" />
//                 )}
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Auth & CTA Buttons (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             {loading ? (
//               <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
//             ) : user ? (
//               <>
//                 <Link
//                   to={headerConfig?.cta_url || '/contact'}
//                   className="text-gray-600 hover:text-gray-900 text-sm font-medium"
//                 >
//                   {headerConfig?.cta_text || 'Contact'}
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                   className="flex items-center justify-center text-red-600 hover:text-red-800 p-1 text-sm font-medium"
//                 >
//                   {isLoggingOut ? (
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                   ) : (
//                     <LogOut className="w-5 h-5" />
//                   )}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-600 hover:text-gray-900 text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="text-gray-600 hover:text-gray-900 text-sm font-medium"
//                 >
//                   Sign Up
//                 </Link>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link
//                     to={headerConfig?.cta_url || '/contact'}
//                     className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg"
//                   >
//                     {headerConfig?.cta_text || 'Contact Me'}
//                   </Link>
//                 </motion.div>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="text-gray-700 hover:text-gray-900"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Component */}
//       <AnimatePresence>
//         {isMobileMenuOpen && <MobileMenu />}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LogOut, LogIn, UserPlus, X, Menu, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; 
import { useSiteData } from '../../context/SiteDataContext'; 
import toast from 'react-hot-toast';

// --- Dynamic Logo Component (Unchanged) ---
const DynamicLogo = ({ config }) => {
  if (!config) {
    return <span className="text-2xl font-bold text-gray-900">Site Logo</span>;
  }
  if (config.logo_media_url) {
    return <img src={config.logo_media_url} alt={config.logo_text || 'Site Logo'} className="h-10 w-auto" />;
  }
  if (config.logo_svg) {
    return <div className="h-10 w-auto" dangerouslySetInnerHTML={{ __html: config.logo_svg }} />;
  }
  if (config.logo_text) {
    return <span className="text-2xl font-bold text-gray-900">{config.logo_text}</span>;
  }
  return <span className="text-2xl font-bold text-gray-900">Site Logo</span>;
};

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const { user, isAdmin, loading: authLoading, logout } = useAuth();
  const { headerConfig, loading: siteLoading } = useSiteData();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const loading = authLoading || siteLoading;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to log out');
    } finally {
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
    }
  };

  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="absolute top-0 left-0 right-0 h-screen bg-white shadow-lg md:hidden z-40"
    >
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 border-b">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <DynamicLogo config={headerConfig} />
        </Link>
        <button onClick={() => setIsMobileMenuOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex flex-col space-y-4 p-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-lg ${
              activePath === link.path
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            } ${
              link.name === 'Admin'
                ? 'flex items-center gap-2 text-blue-600'
                : ''
            }`}
          >
            {link.name === 'Admin' && <Shield className="w-5 h-5" />}
            {link.name}
          </Link>
        ))}
        {!user && (
          <Link
            to={headerConfig?.cta_url || '/contact'}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg text-gray-600 hover:text-gray-900"
          >
            {headerConfig?.cta_text || 'Contact'}
          </Link>
        )}
        <hr className="my-4" />
        {user ? (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-red-600 bg-red-50"
          >
            {isLoggingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogOut className="w-5 h-5" /> Logout</>}
          </button>
        ) : (
          <div className="space-y-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <LogIn className="w-5 h-5" /> Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              <UserPlus className="w-5 h-5" /> Sign Up
            </Link>
          </div>
        )}
      </nav>
    </motion.div>
  );

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Changed wrapper to enforce symmetry */}
        <div className="flex items-center h-16 w-full">
          
          {/* 1. LEFT SECTION (Logo) - Uses flex-1 to push center content */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex-shrink-0">
              <DynamicLogo config={headerConfig} />
            </Link>
          </div>

          {/* 2. CENTER SECTION (Navigation) - Absolutely centered visually */}
          <nav className="hidden md:flex justify-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  activePath === link.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                } ${
                  link.name === 'Admin'
                    ? 'flex items-center gap-1 text-blue-600 hover:text-blue-800'
                    : ''
                }`}
              >
                {link.name === 'Admin' && (
                  <Shield className="w-4 h-4" />
                )}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. RIGHT SECTION (Auth/CTA + Mobile Toggle) - Uses flex-1 to balance Left Section */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              ) : user ? (
                <>
                  <Link
                    to={headerConfig?.cta_url || '/contact'}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                  >
                    {headerConfig?.cta_text || 'Contact'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center text-red-600 hover:text-red-800 p-1 text-sm font-medium"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <LogOut className="w-5 h-5" />
                    )}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/signup" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                    Sign Up
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={headerConfig?.cta_url || '/contact'}
                      className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg"
                    >
                      {headerConfig?.cta_text || 'Contact Me'}
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button (Visible only on mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-700 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;