// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {
//     LayoutDashboard, Package, ShoppingCart, Tag, List, Warehouse,
//     Users, UserCog, Megaphone, BarChart2, Settings, LogOut, X,
//     LifeBuoy,Image as Imageicon,Bookmark,Send, 
// } from 'lucide-react';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { Link } from 'lucide-react';
// import { LayoutPanelTop } from 'lucide-react';

// const AdminSidebar = ({ isOpen, setIsOpen }) => {
//     // const { logout } = useAuth(); // Get logout function
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         // logout();
//         navigate('/login'); // Redirect to admin login or main login page
//         setIsOpen(false); // Close sidebar on mobile after logout
//     };
// // ...
//     // Updated nav items based on previous discussion
//     //adjust the icons accordingly
//     const navItems = [
//         { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
//         { path: '/admin/brand-config', label: 'Brand Config', icon: Bookmark },
//         { path: '/admin/homepage-config', label: 'Products', icon: Tag },
//         { path: '/admin/about-config', label: 'Inventory', icon: Warehouse },
//         { path: '/admin/project-config', label: 'Customers', icon: Users },
//         {path: '/admin/contact-config', label: 'Variant Config', icon: Settings },
//     ];

//     const getLinkClassName = ({ isActive }) =>
//         `flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-300 rounded-lg transition-colors duration-150 group ${
//             isActive
//                 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm' // Active state
//                 : 'hover:bg-gray-700 hover:text-white' // Hover state
//         }`;

//     return (
//         <>
//             {/* Mobile Overlay */}
//             <div
//                 onClick={() => setIsOpen(false)}
//                 className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                 aria-hidden="true"
//             />

//             {/* Sidebar */}
//             <aside
//                 className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 h-screen shadow-lg lg:shadow-none`}
//             >
//                 {/* Logo/Header Area */}
//                 <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700/50 flex-shrink-0">
//                      {/* Replace with your actual Logo component or image */}
//                      <Link to="/admin" className="text-xl font-bold text-white hover:opacity-90">
//                         Admin Panel
//                      </Link>
//                     <button
//                         onClick={() => setIsOpen(false)}
//                         className="lg:hidden p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//                         aria-label="Close sidebar"
//                     >
//                         <X size={24} />
//                     </button>
//                 </div>

//                 {/* Navigation Links */}
//                 <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar"> {/* Added custom scrollbar */}
//                     {navItems.map(item => (
//                         <NavLink
//                             key={item.path}
//                             to={item.path}
//                             end={item.end}
//                             className={getLinkClassName}
//                             onClick={() => setIsOpen(false)} // Close on mobile nav click
//                         >
//                             <item.icon size={18} className="mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
//                             <span className="truncate">{item.label}</span>
//                         </NavLink>
//                     ))}
//                 </nav>

//                 {/* Footer Area (Support/Logout) */}
//                 <div className="px-3 py-3 border-t border-gray-700/50 flex-shrink-0 space-y-1.5">
//                      {/* Support Link Example */}
//                      {/* <NavLink
//                          to="/admin/support" // Example path
//                          className={({ isActive }) => getLinkClassName({ isActive })} // Reuse styling
//                          onClick={() => setIsOpen(false)}
//                      >
//                          <LifeBuoy size={18} className="mr-3 flex-shrink-0"/>
//                          Support
//                      </NavLink> */}

//                      {/* Logout Button */}
//                     <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-red-900/50 hover:text-red-300 transition-colors group"
//                     >
//                         <LogOut size={18} className="mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
//                         <span>Logout</span>
//                     </button>
//                 </div>
//             </aside>
//              {/* Add custom scrollbar styles to your global CSS (e.g., index.css) */}
//             {/*
//             .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
//             .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//             .custom-scrollbar::-webkit-scrollbar-thumb { background: #4a5568; border-radius: 10px; } // gray-600
//             .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #718096; } // gray-500
//             .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #4a5568 transparent; } // For Firefox
//             */}
//         </>
//     );
// };

// export default AdminSidebar;


import React, { Fragment } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  LayoutDashboard,
  Palette,
  FileText,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  X,
  Home,
  Contact,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { path } from 'framer-motion/client';

// Sidebar navigation items
const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  // { path: '/admin/brand-config', label: 'Brand Config', icon: Palette },
  {
    path: '/admin/pages',
    label: 'Pages',
    icon: FileText,
    subItems: [
      { path: '/admin/homepage-config', label: 'Homepage', icon: Home },
      { path: '/admin/about-config', label: 'About Page', icon: Info },
      { path: '/admin/contact-config', label: 'Contact Page', icon: Contact },
      { path: '/admin/projects-config', label: 'Projects', icon: Briefcase },
    ],
  },
  // { path: '/admin/projects', label: 'Projects', icon: Briefcase },
  { path: '/admin/submissions', label: 'Submissions', icon: Mail },
  { path: '/admin/header-config', label: 'Header', icon: Settings },
  {path:'/admin/footer-config', label:'Footer', icon:Settings},
  // { path: '/admin/settings', label: 'Settings', icon: Settings },
];

// Reusable NavLink component
const NavItem = ({ item, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClassName = ({ isActive }) =>
    `flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 group ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  if (item.subItems) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white ${
            isOpen ? 'bg-gray-700' : ''
          }`}
        >
          <div className="flex items-center">
            <item.icon size={18} className="mr-3 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </div>
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            <ChevronRight size={16} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-8 space-y-1 mt-1"
            >
              {item.subItems.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  end={subItem.end}
                  className={getLinkClassName}
                  onClick={onClick}
                >
                  <subItem.icon size={16} className="mr-3" />
                  <span className="truncate">{subItem.label}</span>
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.end}
      className={getLinkClassName}
      onClick={onClick}
    >
      <item.icon size={18} className="mr-3 flex-shrink-0" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
};

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to homepage as requested
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo/Header Area */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-700/50 flex-shrink-0">
        <Link
          to="/admin"
          className="text-2xl font-bold text-white hover:opacity-90 flex items-center"
        >
          <Palette size={28} className="mr-2 text-blue-400" />
          CMS
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-1 text-gray-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            onClick={() => setIsOpen(false)}
          />
        ))}
      </nav>

      {/* Footer Area (Logout) */}
      <div className="px-4 py-4 border-t border-gray-700/50 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-900/50 hover:text-red-300 transition-colors group"
        >
          <LogOut size={18} className="mr-3 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay (visible when sidebar is open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 h-screen shadow-lg lg:shadow-none`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default AdminSidebar;