import React from 'react';
import { motion } from 'framer-motion';
import { fetchLogoCloud } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';

const LogoCloud = () => {
  const { data: logos, loading } = useHomepageData(fetchLogoCloud, 'logo_cloud', { additionalTables: ['media_assets'] });

  if (loading || !logos || logos.length === 0) {
    return <div className="py-12 bg-white" />; // Render empty space
  }

  // Duplicate logos for seamless scroll
  const allLogos = [...logos, ...logos];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold text-gray-500 mb-6">
          Collaborated with brands
        </p>
        <div className="relative w-full overflow-hidden mask-gradient">
          <motion.div
            className="flex"
            animate={{ x: '-100%' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {allLogos.map((logo, index) => {
              const logoUrl = getStorageUrl(logo.media_assets);
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 mx-6 flex items-center justify-center"
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={logo.name}
                      className="h-10 object-contain"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-500">
                      {logo.name}
                    </span>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;