import React from 'react';
import { motion } from 'framer-motion';
import { fetchBlogPosts } from '../../api/homepage';
import { useHomepageData, getStorageUrl } from '../../hooks/useHomepageData';
import { Icon } from '../common/IconMap';
import AnimateOnScroll from '../common/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

const Blog = () => {
  const { data: posts, loading } = useHomepageData(
    fetchBlogPosts, 
    'blog_posts', 
    { additionalTables: ['media_assets'] }
  );

  if (loading || !posts) {
    return <section className="py-24 bg-white"><Loader2 className="animate-spin" /></section>;
  }

  const gridVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            From the Blog
          </h2>
        </AnimateOnScroll>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
        >
          {posts.map((post) => {
            const imageUrl = getStorageUrl(post.media_assets);
            return (
              <motion.a
                key={post.id}
                href="#" // Link to actual blog post
                className="group block bg-white rounded-2xl shadow-lg overflow-hidden"
                variants={cardVariants}
                whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={post.media_assets?.alt_text || post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    {post.category}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.read_time}</span>
                    <span className="flex items-center group-hover:text-blue-600">
                      Read more <Icon name="ArrowRight" size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;