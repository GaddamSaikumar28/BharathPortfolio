// RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
export const RootLayout = () => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Header />
      <main>
        {/* <Outlet /> is the placeholder for your page content */}
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};