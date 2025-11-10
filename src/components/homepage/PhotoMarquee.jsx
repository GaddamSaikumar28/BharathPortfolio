import React, { useState, useEffect,useRef} from 'react';
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from 'framer-motion';
import { fetchPhotoMarquee } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

/**
 * Individual Photo Item
 * Applies the "tossed photo" effect and hover animation.
 */
const PhotoItem = ({ photo }) => {
  const imageUrl = getStorageUrl(photo.media_assets);
  // Give each photo a unique, random rotation
  const [rotate] = useState(() => Math.random() * 8 - 4); // -4 to +4 degrees

  if (!imageUrl) {
    return null; // Don't render if there's no image
  }

  return (
    <motion.div
      className="flex-shrink-0 h-64 p-3" // h-64 is the height constraint
      style={{ rotate: `${rotate}deg` }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <img
        src={imageUrl}
        alt={photo.media_assets?.alt_text || 'Photo marquee item'}
        className="h-full w-auto object-cover rounded-lg shadow-xl bg-gray-200"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://placehold.co/400x600/eee/ccc?text=Image';
        }}
      />
    </motion.div>
  );
};

/**
 * The Marquee Row
 * This component uses physics-based animation for the loop.
 */
const MarqueeRow = ({ photos, baseVelocity = -2 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Spring-based velocity. This will smoothly transition between speeds.
  const targetVelocity = useSpring(baseVelocity, {
    stiffness: 400,
    damping: 50,
  });

  // Update spring target velocity on hover
  useEffect(() => {
    targetVelocity.set(isHovered ? baseVelocity * 0.1 : baseVelocity); // Slows to 10% speed on hover
  }, [isHovered, baseVelocity, targetVelocity]);

  // The raw x position, updated by useAnimationFrame
  const baseX = useMotionValue(0);

  // We use useAnimationFrame to update the x position
  // based on the target velocity every frame.
  useAnimationFrame((t, delta) => {
    // Calculate movement based on velocity and time delta
    let moveBy = targetVelocity.get() * (delta / 1000); // pixels per second

    // Use wrap to loop the value from -100% to 0%
    // This creates the seamless looping effect.
    baseX.set(wrap(-100, 0, baseX.get() + moveBy));
  });

  // Create a percentage-based transform for x
  const x = useTransform(baseX, (v) => `${v}%`);

  // Duplicate the photos for a seamless loop
  const allPhotos = [...photos, ...photos];

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // This creates the cool 3D perspective effect
        perspective: '1000px',
      }}
    >
      <motion.div
        className="flex"
        style={{
          x,
          rotateX: 5, // Tilts the whole row in 3D
        }}
      >
        {allPhotos.map((photo, i) => (
          <PhotoItem photo={photo} key={`${photo.id}-${i}`} />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Main PhotoMarquee Component
 * Fetches data and renders the two rows.
 */
const PhotoMarquee = () => {
  const { data: photos, loading } = useHomepageData(
    fetchPhotoMarquee,
    'photo_marquee',
    { additionalTables: ['media_assets'] }
  );

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </section>
    );
  }

  if (!photos || photos.length < 4) {
    // Don't render if not enough photos
    return null;
  }

  // Split photos into two rows
  const row1 = photos.filter((p) => p.marquee_row === 1);
  const row2 = photos.filter((p) => p.marquee_row === 2);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Our Work in Motion
        </h2>
      </AnimateOnScroll>

      {/* Fades the edges of the marquees */}
      <div className="relative w-full max-w-7xl mx-auto mask-gradient-horizontal py-8">
        {row1.length > 0 && (
          <MarqueeRow photos={row1} baseVelocity={-2} /> // Moves left
        )}
        {row2.length > 0 && (
          <div className="mt-8">
            <MarqueeRow photos={row2} baseVelocity={2} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoMarquee;