

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from 'framer-motion';
// These imports are assumed to be correct paths in your project
import { fetchPhotoMarquee } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

/**
 * Individual Photo Item
 * Applies the "tossed photo" effect and hover animation.
 *
 * --- OPTIMIZATIONS ---
 * 1.  Added `willChange: 'transform'` to hint to the browser to use hardware
 * acceleration for this element's animations (rotate, scale).
 * 2.  Added explicit `width` and `height` to the <img> tag. This is crucial
 * for preventing Cumulative Layout Shift (CLS) as images load.
 * The height `h-64` is 256px. Assuming a 3:4 portrait aspect ratio,
 * the width would be (256 / 4) * 3 = 192px. Adjust if your aspect ratios differ.
 * 3.  Added `fetchpriority="low"` to the <img> tag. This tells the browser
 * that these images are not critical (like a logo or hero image),
 * so it can prioritize other content first, improving perceived page load speed.
 * 4.  Added comments about caching and image optimization.
 */
const PhotoItem = ({ photo }) => {
  const imageUrl = getStorageUrl(photo.media_assets);
  // Give each photo a unique, random rotation
  const [rotate] = useState(() => Math.random() * 8 - 4); // -4 to +4 degrees

  if (!imageUrl) {
    return null; // Don't render if there's no image
  }

  /*
   * PERFORMANCE NOTE 1: IMAGE OPTIMIZATION (Slow Loading)
   * The `imageUrl` should ideally point to an image that is resized
   * to be close to its display size (e.g., ~256px tall).
   * Loading large, multi-megabyte images here is the most likely
   * cause of "slow loading." Check if your `getStorageUrl` function
   * or your backend (e.g., Firebase Storage, Cloudinary) supports
   * on-the-fly image resizing queries (e.g., .../image.jpg?w=200&h=300).
   *
   * PERFORMANCE NOTE 2: ASSET CACHING (Cache Level Issues)
   * For the *images themselves*, your storage server (S3, Firebase, etc.)
   * should set a strong `Cache-Control` header (e.g.,
   * `Cache-Control: public, max-age=31536000, immutable`).
   * This tells the browser to cache the image for a long time,
   * so it doesn't have to re-download it on every visit.
   */

  return (
    <motion.div
      className="flex-shrink-0 h-64 p-3" // h-64 is the height constraint
      style={{
        rotate: `${rotate}deg`,
        willChange: 'transform', // Optimization: Hint for hardware acceleration
      }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <img
        src={imageUrl}
        alt={photo.media_assets?.alt_text || 'Photo marquee item'}
        className="h-full w-auto object-cover rounded-lg shadow-xl bg-gray-200"
        loading="lazy"
        // Optimization: Specify dimensions to prevent layout shift
        width="192" // Calculated: (256px height / 4) * 3 = 192px. Adjust as needed.
        height="256" // h-64 = 16rem = 256px
        // Optimization: Tell browser this is not a high-priority image
        fetchpriority="low"
        onError={(e) => {
          e.target.src = 'https://placehold.co/192x256/eee/ccc?text=Image';
        }}
      />
    </motion.div>
  );
};

/**
 * The Marquee Row
 * This component uses physics-based animation for the loop.
 *
 * --- OPTIMIZATIONS ---
 * 1.  Removed `perspective: '1000px'` from the wrapper.
 * 2.  Removed `rotateX: 5` from the `motion.div`. 3D transforms
 * are a primary cause of animation jank on mobile devices.
 * A flat, 2D animation will be significantly smoother.
 * 3.  Added `willChange: 'transform'` to the `motion.div` to promote
 * it to its own compositor layer for smoother translation.
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
    // Ensure delta is not excessively large (e.g., on tab-out)
    const normalizedDelta = Math.min(delta, 100); // Max delta of 100ms
    let moveBy = targetVelocity.get() * (normalizedDelta / 1000); // pixels per second

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
      // Optimization: Removed `perspective: '1000px'`.
      // 3D transforms are expensive, especially on mobile.
    >
      <motion.div
        className="flex"
        style={{
          x,
          // Optimization: Removed `rotateX: 5`. This is a major
          // source of animation jank on mobile GPUs.
          willChange: 'transform', // Optimization: Hint for hardware acceleration
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
  /*
   * PERFORMANCE NOTE 3: DATA CACHING (Cache Level Issues)
   * Your `useHomepageData` hook is responsible for fetching and
   * caching the *photo data* (the array of photo objects).
   * The key `'photo_marquee'` suggests it's already using a cache.
   * If this data is still loading slowly on subsequent visits,
   * you should check the implementation of `useHomepageData`.
   * If it's custom, ensure it stores the data (e.g., in React Context,
   * React Query, SWR, or even localStorage) with a reasonable
   * "stale time" so it doesn't re-fetch on every single page load.
   */
  const { data: photos, loading } = useHomepageData(
    fetchPhotoMarquee,
    'photo_marquee',
    { additionalTables: ['media_assets'] }
  );

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 flex justify-center items-center min-h-[300px]">
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
          <MarqueeRow photos={row1} baseVelocity={-6} /> // Moves left
        )}
        {row2.length > 0 && (
          <div className="mt-8">
            <MarqueeRow photos={row2} baseVelocity={6} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoMarquee;