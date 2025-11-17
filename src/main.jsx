
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css';
// import { SiteDataProvider } from './context/SiteDataContext';
// import App from './App';
// import Projects from './pages/Projects';
// import ProjectDetail from './pages/ProjectDetail';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import AdminLayout from './components/layout/AdminLayout';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import { RootLayout } from './components/layout/RootLayout';
// import { AuthProvider } from './context/AuthContext';
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />, // Public Header + Outlet
//     children: [
//       { path: '/', element: <App /> },
//       { path: '/projects', element: <Projects /> },
//       // { path: '/projects/:projectId', element: <ProjectDetail /> },
//       { path: '/projects/:slug', element: <ProjectDetail /> },
//       { path: '/about', element: <About /> },
//       { path: '/contact', element: <Contact /> },
//     ],
//   },
//   {
//     path: '/admin',
//     element: <AdminLayout />, // Admin Sidebar + Admin Header + Outlet
//     children: [
//       { index: true, element: <AdminDashboard /> },
//       // { path: 'brand-config', element: <AdminBrandConfig /> },
//       // { path: 'homepage-config', element: <AdminHomepage /> },
//       // { path: 'about-config', element: <AdminAbout /> },
//       // { path: 'project-config', element: <AdminProjects /> },
//       // { path: 'project-config/new', element: <AdminProjectEditor /> },
//       // { path: 'project-config/edit/:projectId', element: <AdminProjectEditor /> },
//       // { path: 'contact-config', element: <AdminContactEditor /> }
//     ]
//   }
// ]);


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//     <SiteDataProvider>
//       <RouterProvider router={router} />
//     </SiteDataProvider>
//     </AuthProvider>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// --- Providers ---
import { AuthProvider } from './context/AuthContext';
import { SiteDataProvider } from './context/SiteDataContext';

// --- Public Layout & Pages ---
import { RootLayout } from './components/layout/RootLayout';
import App from './App';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// --- Admin Layout & Pages ---
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute'; // Import security
import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminBrandConfig from './pages/admin/AdminBrandConfig';
import AdminHomepage from './pages/admin/AdminHomepage'; // The new manager hub
// import AdminAbout from './pages/admin/AdminAbout';
// import AdminProjects from './pages/admin/AdminProjects';
// import AdminProjectEditor from './pages/admin/AdminProjectEditor';
// import AdminContactEditor from './pages/admin/AdminContactEditor';

// --- NEW: Homepage Section Editors ---
import AdminHeroEditor from './pages/admin/editors/AdminHeroEditor';
import AdminLogoCloudEditor from './pages/admin/editors/AdminLogoCloudEditor';
import AdminServicesEditor from './pages/admin/editors/AdminServicesEditor';
import AdminFeatureShowcaseEditor from './pages/admin/editors/AdminFeatureShowcaseEditor';
import AdminParallaxEditor from './pages/admin/editors/AdminParallaxEditor';
import AdminToolkitEditor from './pages/admin/editors/AdminToolkitEditor';
import AdminTestimonialsEditor from './pages/admin/editors/AdminTestimonialsEditor';
import AdminBentoEditor from './pages/admin/editors/AdminBentoEditor';
import AdminBlogEditor from './pages/admin/editors/AdminBlogEditor';
import AdminFAQEditor from './pages/admin/editors/AdminFAQEditor';
import AdminCTAEditor from './pages/admin/editors/AdminCTAEditor';
import AdminAboutPage from './pages/admin/AdminAboutPage';
import AdminAboutCTAEditor from './pages/admin/editors/AdminAboutCTAEditor';
import AdminAboutHeroEditor from './pages/admin/editors/AdminAboutHeroEditor';
import AdminAboutTimelineEditor from './pages/admin/editors/AdminAboutTimelineEditor';
import AdminAboutMissionEditor from './pages/admin/editors/AdminAboutMissionEditor';
import AdminAboutValuesEditor from './pages/admin/editors/AdminAboutValuesEditor';
import AdminAboutServicesEditor from './pages/admin/editors/AdminAboutServicesEditor';  
import AdminProjects from './pages/admin/AdminProjects';
import AdminProjectEditor from './pages/admin/editors/AdminProjectEditor';
import AdminContactEditor from './pages/admin/editors/AdminContactEditor';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import Login from './components/common/Login';
import SignUp from './components/common/SignUp';
import ErrorPage from './components/common/ErrorPage';
import AdminPhotoMarqueeEditor from './pages/admin/editors/AdminPhotoMarqueeEditor';
import AdminPortfolioBannerEditor from './pages/admin/editors/AdminPortfolioBannerEditor';
import AdminHeaderEditor from './pages/admin/editors/AdminHeaderEditor';
import AdminFooterEditor from './pages/admin/editors/AdminFooterEditor';
const router = createBrowserRouter([
  {
    // --- Public Routes ---
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <App /> },
      { path: '/about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: 'contact', element: <Contact /> },
      { path:'login', element:<Login />},
      {path:'signup', element:<SignUp />},
    ],
  },
  {
    // --- Admin Routes ---
    path: '/admin',
    element: <ProtectedRoute />, // 1. Checks for Auth & Admin Role
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminLayout />, // 2. If allowed, shows the Admin Layout
        children: [
          // 3. Renders all pages inside the layout
          { index: true, element: <AdminDashboard /> },
          // { path: 'brand-config', element: <AdminBrandConfig /> },
          
          // --- Homepage Config Routes ---
          { path: 'homepage-config', element: <AdminHomepage /> },
          { path: 'homepage-config/hero', element: <AdminHeroEditor /> },
          { path: 'homepage-config/logo-cloud', element: <AdminLogoCloudEditor /> },
          { path: 'homepage-config/photo-marquee', element: <AdminPhotoMarqueeEditor />},  
          { path: 'homepage-config/services', element: <AdminServicesEditor /> },
          { path: 'homepage-config/portfolio-banner' , element:<AdminPortfolioBannerEditor />},
          { path: 'homepage-config/feature-showcase', element: <AdminFeatureShowcaseEditor /> },
          { path: 'homepage-config/parallax-project', element: <AdminParallaxEditor /> },
          { path: 'homepage-config/toolkit', element: <AdminToolkitEditor /> },
          { path: 'homepage-config/testimonials', element: <AdminTestimonialsEditor /> },
          { path: 'homepage-config/bento-showcase', element: <AdminBentoEditor /> },
          { path: 'homepage-config/blog', element: <AdminBlogEditor /> },
          { path: 'homepage-config/faq', element: <AdminFAQEditor /> },
          { path: 'homepage-config/call-to-action', element: <AdminCTAEditor /> },
          
          // --- Other Admin Routes ---
          { path: 'about-config', element: <AdminAboutPage /> },
          { path: 'about-config/cta', element: <AdminAboutCTAEditor /> },
          { path: 'about-config/hero', element: <AdminAboutHeroEditor /> },
          
          { path: 'about-config/timeline', element: <AdminAboutTimelineEditor  />},
          {path:'about-config/mission' , element:<AdminAboutMissionEditor />},
          {path:'about-config/services' , element:<AdminAboutServicesEditor />},
          {path:'about-config/values' , element:<AdminAboutValuesEditor />},
          { path: 'projects-config', element: <AdminProjects /> },
          {path:'projects-config/:slug' , element:<AdminProjectEditor />},
          {path:'contact-config' , element:<AdminContactEditor />},
          {path:'submissions' , element: <AdminSubmissions />},
          {path:'header-config' , element:<AdminHeaderEditor />},
          {path:'footer-config' , element:<AdminFooterEditor />},
          // { path: 'projects-config/new', element: <AdminProjectEditor /> },
          // { path: 'projects-config/edit/:id', element: <AdminProjectEditor /> },
          // { path: 'contact-config', element: <AdminContactEditor /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProvider>
      <SiteDataProvider>
        <RouterProvider router={router} />
      </SiteDataProvider>
    </AuthProvider>
  // </React.StrictMode>
);