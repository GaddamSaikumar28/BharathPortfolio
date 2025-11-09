// import React from 'react';

// const AdminDashboard = () => {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//       <p className="mt-2 text-gray-600">Welcome to the admin panel. Select a section from the sidebar to get started.</p>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getAdminDashboardStats,
  getRecentSubmissions,
  onSubmissionsChange,
} from '../../api/admin';
import {
  Briefcase,
  Mail,
  Settings,
  ArrowRight,
  Plus,
  Edit,
  BarChart2,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, to }) => (
  <Link to={to} className="group">
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 p-3 rounded-full">
          {React.createElement(icon, { size: 24 })}
        </div>
      </div>
      <p className="text-sm text-blue-600 dark:text-blue-400 mt-4 flex items-center group-hover:underline">
        View all <ArrowRight size={16} className="ml-1" />
      </p>
    </motion.div>
  </Link>
);

// --- Quick Action Component ---
const QuickAction = ({ title, icon, to }) => (
  <Link
    to={to}
    className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1"
  >
    {React.createElement(icon, {
      size: 28,
      className: 'text-blue-600 dark:text-blue-400',
    })}
    <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
      {title}
    </span>
  </Link>
);

// --- Main Dashboard Component ---
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data fetching logic
  const loadData = async () => {
    try {
      const [statsData, submissionsData] = await Promise.all([
        getAdminDashboardStats(),
        getRecentSubmissions(),
      ]);
      setStats(statsData);
      setRecentSubmissions(submissionsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data load
    loadData();

    // Set up real-time listener for new submissions
    // This is the "futuristic" part!
    const submissionsListener = onSubmissionsChange((payload) => {
      console.log('Real-time change detected!', payload);
      // Re-fetch all data to update "unread" count and recent list
      loadData();
    });

    // Unsubscribe on cleanup
    return () => {
      submissionsListener.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="space-y-8"
    >
      <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white"
        variants={fadeInUp}
      >
        Welcome back, Admin!
      </motion.h1>

      {/* --- Stat Cards --- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={stagger}
      >
        <motion.div variants={fadeInUp}>
          <StatCard
            title="Total Projects"
            value={stats?.totalProjects}
            icon={Briefcase}
            to="/admin/projects-config"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <StatCard
            title="Unread Messages"
            value={stats?.unreadMessages}
            icon={Mail}
            to="/admin/submissions"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <StatCard
            title="Total Services"
            value={stats?.totalServices}
            icon={Settings}
            to="/admin/homepage-config" // Link to homepage services editor
          />
        </motion.div>
      </motion.div>

      {/* --- Quick Actions & Recent Activity --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Quick Actions --- */}
        <motion.div className="lg:col-span-1 space-y-6" variants={fadeInUp}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              title="New Project"
              icon={Plus}
              to="/admin/projects-config/new"
            />
            <QuickAction
              title="Edit Homepage"
              icon={Edit}
              to="/admin/homepage-config"
            />
            <QuickAction
              title="View Messages"
              icon={Mail}
              to="/admin/submissions"
            />
            {/* <QuickAction
              title="Site Settings"
              icon={Settings}
              to="/admin/brand-config"
            /> */}
          </div>
        </motion.div>

        {/* --- Recent Activity (Real-time) --- */}
        <motion.div className="lg:col-span-2" variants={fadeInUp}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Submissions
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {recentSubmissions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No new submissions yet.
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentSubmissions.map((sub) => (
                  <li
                    key={sub.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {sub.name}
                        {!sub.is_read && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                            New
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {sub.email}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;