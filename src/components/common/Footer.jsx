import React from "react";

export const Footer = () => {
  const links = [
    { 
      title: 'Navigation',
    //   list: ['Home', 'About', 'Portfolio', 'Contact']
    list: ['Home', 'About', 'Portfolio', 'Projects', 'Contact']
    },
    { 
      title: 'Company',
      list: ['Blog', 'Testimonials', 'About Me']
    },
    { 
      title: 'Resources',
      list: ['Style Guide', 'Case Studies', 'My Process']
    },
    { 
      title: 'Legal',
      list: ['Privacy Policy', 'Terms of Service']
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white">Gaddam B. Kumar</h2>
            <p className="mt-2 text-sm">Creative Graphic Designer & Brand Strategist</p>
          </div>
          
          {links.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3 mt-4">
                {section.list.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Gaddam Bharath Kumar. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* <a href="#" className="text-gray-500 hover:text-white"><Twitter /></a>
            <a href="#" className="text-gray-500 hover:text-white"><Instagram /></a>
            <a href="#" className="text-gray-500 hover:text-white"><Linkedin /></a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};