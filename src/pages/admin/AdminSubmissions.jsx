import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Inbox, Mail, Archive, Trash2, Loader2, RefreshCw, X, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchSubmissions,
  listenForSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from '../../api/contactadmin'; // Adjust path as needed
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../../lib/supabaseClient'; // Ensure supabase client is imported
// Helper to format dates
const formatTimestamp = (ts) => {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

// --- Main Submissions Component ---
const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('inbox'); // 'inbox', 'read', 'archived', 'all'
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // --- Data Loading ---
  const loadSubmissions = useCallback(async (currentFilter) => {
    setIsLoading(true);
    try {
      const data = await fetchSubmissions(currentFilter);
      setSubmissions(data);
    } catch (error) {
      toast.error('Failed to load submissions.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Initial Load & Filter Change ---
  useEffect(() => {
    loadSubmissions(filter);
    setSelected(null); // Clear selection when filter changes
  }, [filter, loadSubmissions]);

  // --- Real-time Listener ---
  useEffect(() => {
    // Listen for new submissions
    const channel = listenForSubmissions((newSubmission) => {
      // Show a toast
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="p-4 bg-white rounded-lg shadow-lg flex items-center gap-3"
          >
            <span className="p-2 bg-blue-100 text-blue-600 rounded-full">
              <Mail className="w-5 h-5" />
            </span>
            <div className="mr-4">
              <div className="font-medium">New Submission</div>
              <div className="text-sm text-gray-500">From {newSubmission.name}</div>
            </div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setFilter('inbox'); // Go to inbox
              }}
              className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50"
            >
              View
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ),
        { position: 'top-right', duration: 5000 }
      );
      
      // If we are in the 'inbox' view, refresh the list
      if (filter === 'inbox') {
        loadSubmissions('inbox');
      }
    });

    // Unsubscribe on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [filter, loadSubmissions]);

  // --- Handle Selecting a Submission ---
  const handleSelect = (submission) => {
    setSelected(submission);
    // If it's unread, mark it as read
    if (!submission.is_read) {
      setIsUpdating(true);
      updateSubmissionStatus(submission.id, { is_read: true })
        .then((updatedSubmission) => {
          // Update the submission in the main list
          setSubmissions(subs => subs.map(s => s.id === updatedSubmission.id ? updatedSubmission : s));
        })
        .catch(() => toast.error('Failed to mark as read.'))
        .finally(() => setIsUpdating(false));
    }
  };

  // --- Handle Actions ---
  const handleAction = async (action, id) => {
    setIsUpdating(true);
    const toastId = toast.loading('Updating...');
    
    try {
      let updatedSubmission;
      if (action === 'archive') {
        updatedSubmission = await updateSubmissionStatus(id, { is_archived: true, is_read: true });
        toast.success('Submission archived.', { id: toastId });
      } else if (action === 'unarchive') {
        updatedSubmission = await updateSubmissionStatus(id, { is_archived: false });
        toast.success('Submission unarchived.', { id: toastId });
      } else if (action === 'delete') {
        await deleteSubmission(id);
        toast.success('Submission deleted.', { id: toastId });
      }

      // Remove the item from the list and close detail view
      if (action === 'delete' || action === 'archive') {
        setSubmissions(subs => subs.filter(s => s.id !== id));
        setSelected(null);
      } else if (updatedSubmission) {
        // Update item in the list
        setSubmissions(subs => subs.map(s => s.id === id ? updatedSubmission : s));
        setSelected(updatedSubmission); // Update detail view
      }

    } catch (err) {
      toast.error('Action failed. Please try again.', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const FilterButton = ({ f, label, icon: Icon }) => (
    <button
      onClick={() => setFilter(f)}
      className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-4 py-2 text-sm font-medium rounded-md ${
        filter === f
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const DetailRow = ({ label, value, isLink = false }) => (
    <div className="py-3 border-b border-gray-100">
      <dt className="text-xs font-medium text-gray-500 uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">
        {isLink ? (
          <a href={value} className="text-blue-600 hover:underline">{value.replace('mailto:', '')}</a>
        ) : (
          value || <span className="italic text-gray-400">Not provided</span>
        )}
      </dd>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-200">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
        </div>
        <button
          onClick={() => loadSubmissions(filter)}
          disabled={isLoading}
          className="p-2 text-gray-500 rounded-lg hover:bg-gray-200 hover:text-gray-700 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
        </button>
      </div>
      
      {/* --- Filter Tabs --- */}
      <div className="flex sm:gap-2 mb-4 p-1 bg-gray-100 sm:bg-transparent rounded-lg">
        <FilterButton f="inbox" label="Inbox" icon={Inbox} />
        <FilterButton f="read" label="Read" icon={Mail} />
        <FilterButton f="archived" label="Archived" icon={Archive} />
        <FilterButton f="all" label="All" icon={Inbox} />
      </div>

      {/* --- Main Content (List + Detail) --- */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex h-[calc(100vh-200px)]">
        
        {/* --- List Pane --- */}
        <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 overflow-y-auto ${selected && 'hidden md:block'}`}>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          )}
          {!isLoading && submissions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <Inbox className="w-12 h-12 text-gray-300" />
              <p className="mt-2 font-medium text-gray-500">No submissions here</p>
              <p className="text-sm text-gray-400">This folder is empty.</p>
            </div>
          )}
          {!isLoading && submissions.length > 0 && (
            <ul>
              {submissions.map(sub => (
                <li key={sub.id}>
                  <button
                    onClick={() => handleSelect(sub)}
                    className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${selected?.id === sub.id ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{sub.name}</span>
                      {!sub.is_read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{sub.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatTimestamp(sub.created_at)}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* --- Detail Pane --- */}
        <div className={`w-full md:w-2/3 lg:w-3/4 overflow-y-auto ${!selected && 'hidden md:block'}`}>
          {!selected && (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <Mail className="w-16 h-16 text-gray-300" />
              <p className="mt-2 font-medium text-gray-500">Select a submission</p>
              <p className="text-sm text-gray-400">Choose a submission from the list to view details.</p>
            </div>
          )}
          {selected && (
            <div>
              {/* Actions Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg hover:bg-gray-200 md:hidden"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div className="flex gap-2">
                  {selected.is_archived ? (
                    <button
                      onClick={() => handleAction('unarchive', selected.id)}
                      disabled={isUpdating}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Archive className="w-4 h-4" /> Move to Inbox
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction('archive', selected.id)}
                      disabled={isUpdating}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Archive className="w-4 h-4" /> Archive
                    </button>
                  )}
                  <button
                    onClick={() => handleAction('delete', selected.id)}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Details Body */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted on {formatTimestamp(selected.created_at)}
                </p>
                
                <dl className="mt-6">
                  <DetailRow label="Email" value={`mailto:${selected.email}`} isLink />
                  <DetailRow label="Service Interested In" value={selected.service?.title} />
                  <DetailRow label="Budget" value={selected.budget?.label} />
                  <DetailRow label="Timeline" value={selected.timeline} />
                  <DetailRow label="Message" />
                  <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                    {selected.message}
                  </dd>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;