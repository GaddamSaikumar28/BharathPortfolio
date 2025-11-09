
// import React, { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom'; // Added Navigate
// import AdminSidebar from '../admin/AdminSidebar';
// import AdminHeader from '../admin/AdminHeader';
// // import { useAuth } from '../../context/AuthContext'; // Import useAuth

// const AdminLayout = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
//     return (
//         // flex-col ensures header is above main content if screen gets very narrow
//         <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
//             {/* Sidebar */}
//             <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//             {/* Main Content Area */}
//             <div className="flex-1 flex flex-col overflow-hidden"> {/* Prevent content overflow issues */}
//                 {/* Header */}
//                 <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

//                 {/* Page Content */}
//                 <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50"> {/* Added bg-gray-50 */}
//                     {/* Outlet renders the specific admin page component */}
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from '../admin/AdminHeader';

/**
 * This is the main layout for the entire admin section.
 * It combines the Sidebar, Header, and the main content area (Outlet).
 * It also manages the mobile sidebar's open/closed state.
 */
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar (handles its own mobile/desktop visibility) */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content (Scrollable) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {/* Outlet renders the specific admin page (Dashboard, Editor, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;