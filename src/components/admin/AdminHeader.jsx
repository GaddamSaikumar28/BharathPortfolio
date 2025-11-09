// import React from 'react';
// import { Menu, Bell, UserCircle, ChevronDown } from 'lucide-react'; // Added icons
// // import { useAuth } from '../../context/AuthContext'; // To get user info

// const AdminHeader = ({ onMenuClick }) => {
//     // const { user } = useAuth(); // Get current admin user details

//     // Safely get admin name, default to "Admin"
//     // const adminName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Admin' : 'Admin';

//     return (
//         <header className="sticky top-0 z-30 bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-200">
//             {/* Left side: Hamburger Menu (Mobile/Tablet) */}
//             <button
//                 onClick={onMenuClick}
//                 className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//                 aria-label="Open sidebar"
//             >
//                 <Menu size={24} />
//             </button>

//             {/* Spacer to push right content */}
//             <div className="flex-grow lg:hidden"></div> {/* Hidden on large screens */}

//              {/* Right side: Notifications, User Menu */}
//             <div className="flex items-center space-x-4">
//                 {/* Notification Icon (Placeholder) */}
//                  <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
//                      <span className="sr-only">View notifications</span>
//                      <Bell size={20} />
//                      {/* Optional: Notification badge */}
//                      {/* <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span> */}
//                  </button>

//                 {/* User Dropdown (Placeholder) */}
//                 <div className="relative">
//                     <button className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
//                          {/* Placeholder Avatar */}
//                          <UserCircle size={24} className="text-gray-400" />
//                          {/* <span className="hidden sm:inline font-medium">{adminName}</span> */}
//                          <ChevronDown size={16} className="text-gray-400"/>
//                     </button>
//                     {/* Dropdown Menu (hidden, needs state and logic) */}
//                     {/* <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden">
//                         <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
//                         <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
//                         <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
//                     </div> */}
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default AdminHeader;


import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Search,
  Sun,
  Moon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Note: Dark mode toggle is for UI only; it needs a ThemeProvider
// in your main app to function.
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <Sun size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <Moon size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md"
      >
        <User size={20} className="text-gray-400" />
        <span className="hidden sm:inline font-medium">
          {user?.email || 'Admin'}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black dark:ring-gray-700 ring-opacity-5"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              My Profile
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut size={16} className="inline mr-2" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminHeader = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
      {/* Left side: Hamburger Menu (Mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Global Search (Futuristic UI) */}
      <div className="hidden lg:block">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search anything..."
            className="w-64 lg:w-96 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side: Actions & User Menu */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <DarkModeToggle />
        <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <span className="sr-only">View notifications</span>
          <Bell size={20} />
          {/* Notification badge */}
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-gray-800"></span>
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

        <UserMenu />
      </div>
    </header>
  );
};

export default AdminHeader;