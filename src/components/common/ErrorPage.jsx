import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let status = error?.status || 404;
  let title = "Page Not Found";
  let message = "Sorry, we couldn’t find the page you’re looking for.";

  if (status !== 404) {
    title = "An error occurred";
    message = error?.statusText || "Something went wrong on our end.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="mt-8 text-6xl font-extrabold text-gray-900 tracking-tighter">
          {status}
        </h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-lg text-gray-600 max-w-md">
          {message}
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
          >
            <Home className="w-5 h-5" />
            Go back home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}