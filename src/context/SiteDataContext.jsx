// SiteDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { getSiteData, saveSiteData } from './dataService';
// import { getSiteData, saveSiteData } from './utils/dataService';
const SiteDataContext = createContext();
import { getSiteData, saveSiteData } from '../utils/dataService';
/**
 * This custom hook is what all your components will use
 * to read and write data.
 */
export const useSiteData = () => useContext(SiteDataContext);

/**
 * This Provider component wraps your entire app.
 * It holds the master data state and provides the functions
 * to update it.
 */
export const SiteDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial app load, get data from localStorage
  useEffect(() => {
    const initialData = getSiteData();
    setData(initialData);
    setLoading(false);
  }, []);

  /**
   * A single function to update the database.
   * It updates React state AND saves to localStorage.
   */
  const updateData = (newData) => {
    setData(newData);
    saveSiteData(newData);
  };

  if (loading) {
    return <div>Loading Portfolio Data...</div>; // Or a loading spinner
  }

  return (
    <SiteDataContext.Provider value={{ data, updateData }}>
      {children}
    </SiteDataContext.Provider>
  );
};