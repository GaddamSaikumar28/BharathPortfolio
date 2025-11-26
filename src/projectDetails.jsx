
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Loader2, Clock, User, Briefcase, ChevronRight, X, Maximize2, Target, TrendingUp, Search, Lightbulb, PenTool, CheckCircle, Package, Layers, Smartphone, AlertTriangle, ShieldCheck, MessageSquare, Aperture, Figma, GitBranch, Zap, Code, Rss, ArrowLeft, ArrowRight, Layout, Award, Globe, Heart, Maximize
} from 'lucide-react';

// =====================================================================
// 1. MOCK DATA & CONFIGURATION
// =====================================================================

// Vibrant Color Palette
const PRIMARY_COLOR_HEX = "#06b6d4"; // Cyan-500
const SECONDARY_COLOR_HEX = "#f97316"; // Orange-500

const MOCK_DATA = {
    slug: "flit-taxi-mobility",
    title: "Flit Taxi: Designing a Driver-Centric Mobility Ecosystem",
    tagline: "A comprehensive UX/UI case study focused on market disruption through transparent operations and enhanced user safety. This project required a blend of deep empathy mapping and robust visual system design to build trust and ensure scalability.",
    role: "Lead UX/UI Designer & Visual Architect",
    timeline: "6 Months (Concept to MVP Launch)",
    client: "Flit Mobility (Series A Startup)",
    status: "Launched (95% Driver Retention)",
    primary_color: PRIMARY_COLOR_HEX,
    secondary_color: SECONDARY_COLOR_HEX,
    
    // NEW: Prominent Hero Image
    hero_image: {
        path: 'https://placehold.co/1920x600/06b6d4/ffffff?text=Main+Project+Interface+Hero+Visual',
        alt: 'Main project interface hero banner'
    },
    
    // NEW: Scattered Banner Images
    banner_images: [
        { 
            path: 'https://placehold.co/1920x400/f97316/ffffff?text=Full-Width+Mobile+App+Mockup', 
            alt: 'Full-Width Mobile App Mockup: Seamless Handoff' 
        },
        { 
            path: 'https://placehold.co/1920x400/06b6d4/ffffff?text=Design+System+Overview', 
            alt: 'Design System Overview: Component Library' 
        },
    ],
    
    goal_body_text: "The urban mobility sector is rife with challenges for both riders and drivers: high commissions for drivers, opaque pricing for riders, and often a lack of trust. Our primary objective was to launch an MVP focusing on reliability and driver satisfaction, measured by a 95% driver retention rate and a 4.8+ average user rating. We aimed to build a sustainable ecosystem where fair practices led to a superior user experience for everyone. The initial phase involved defining the core job-to-be-done for both user groups and ensuring the information architecture supported immediate, critical decision-making.",
    
    tools_used: [
        { name: "Figma", icon: Figma, category: "Design", color: "text-red-500" },
        { name: "Framer Motion", icon: Zap, category: "Prototyping", color: "text-sky-500" },
        { name: "React/JSX", icon: Code, category: "Development", color: "text-blue-600" },
        { name: "Maze", icon: Rss, category: "Testing", color: "text-purple-500" },
        { name: "Git & GitHub", icon: GitBranch, category: "Version Control", color: "text-gray-900" },
        { name: "Sketch", icon: Layout, category: "Design", color: "text-orange-500" },
        { name: "Hotjar", icon: Aperture, category: "Analytics", color: "text-pink-600" },
        { name: "Accessibility Toolkit", icon: Award, category: "Compliance", color: "text-green-600" },
        { name: "VS Code", icon: Code, category: "Development", color: "text-blue-400" },
        { name: "Adobe Illustrator", icon: PenTool, category: "Visuals", color: "text-orange-700" },
        { name: "Miro", icon: Layers, category: "Ideation", color: "text-amber-500" },
        { name: "Jira", icon: Package, category: "Project Mgmt", color: "text-blue-700" },
    ],

    flip_card_principles: [
        { front_title: "Driver-First", back_info: "Guaranteed low commission and a real-time earnings dashboard were built based on extensive driver empathy mapping, directly addressing their primary pain points.", icon: User, bgColor: 'bg-cyan-50', iconColor: PRIMARY_COLOR_HEX },
        { front_title: "Total Transparency", back_info: "Clear, upfront pricing with no hidden fees, coupled with real-time commission calculation, was essential to build trust with a skeptical user base.", icon: ShieldCheck, bgColor: 'bg-orange-50', iconColor: SECONDARY_COLOR_HEX },
        { front_title: "Effortless Flow", back_info: "A 3-tap booking process was achieved by ruthlessly prioritizing critical information and minimizing decision points, drastically reducing time-to-request.", icon: Smartphone, bgColor: 'bg-green-50', iconColor: '#10b981' },
        { front_title: "Visual Scalability", back_info: "A robust, token-based design system was created to ensure easy localization, cross-platform consistency, and rapid feature integration in future sprints.", icon: Layers, bgColor: 'bg-indigo-50', iconColor: '#6366f1' },
    ],

    slider_images: [
        { path: 'https://placehold.co/1000x560/06b6d4/ffffff?text=Intuitive+Rider+Booking', alt: 'Intuitive Rider Booking Flow' },
        { path: 'https://placehold.co/1000x560/f97316/ffffff?text=Driver+Earnings+Dashboard', alt: 'Driver Earnings Dashboard' },
        { path: 'https://placehold.co/1000x560/06b6d4/ffffff?text=Safety+Features+Integration', alt: 'Integrated Safety Features' },
        { path: 'https://placehold.co/1000x560/f97316/ffffff?text=Localized+UI+Example', alt: 'Localized UI Example' },
    ],

    image_text_sections: [
        {
            id: 'design-process',
            image_url: 'https://placehold.co/600x400/22d3ee/ffffff?text=User+Research+Snapshot',
            alt_text: 'Snapshot of user research and empathy maps',
            heading: 'Understanding Our Users: Deep Dive into Research',
            body_text: "Our design journey began with extensive qualitative and quantitative research. We conducted over 20 in-depth interviews with both drivers and potential riders, followed by surveys to validate initial hypotheses. Key insights revealed a strong desire for transparency in earnings for drivers and enhanced safety features for riders. This foundational understanding directly informed our feature prioritization and information architecture.",
            image_left: true,
            bgColor: 'bg-white',
        },
        {
            id: 'design-system',
            image_url: 'https://placehold.co/600x400/fdbf72/854d0e?text=Design+System+Components',
            alt_text: 'Key Design System Components',
            heading: 'The Visual Engine: Building a Scalable Design System',
            body_text: "To ensure consistency and efficiency, we developed a comprehensive token-based design system in Figma. This included defining color palettes, typography scales, spacing units, and a library of reusable, accessible components. This systematic approach drastically sped up the hand-off process and guaranteed visual integrity across all future feature developments.",
            image_left: false,
            bgColor: 'bg-orange-50',
        },
    ],
    
    accessibility_insights: [
        { title: "WCAG AA Compliance", detail: "Ensured all text and interactive elements met or exceeded WCAG 2.1 AA standards for color contrast (minimum 4.5:1).", icon: Award, color: 'text-green-500' },
        { title: "Screen Reader Optimization", detail: "Implemented semantic HTML and ARIA attributes for seamless navigation and auditory feedback for users with visual impairments.", icon: Globe, color: 'text-blue-500' },
        { title: "Large Touch Targets", detail: "Increased minimum size of all tappable elements to 48x48px across all mobile views for improved motor accessibility.", icon: Smartphone, color: 'text-purple-500' },
        { title: "Motion Sensitivity Toggle", detail: "Added a user setting to reduce or disable non-essential decorative animations, adhering to motion accessibility best practices.", icon: Lightbulb, color: 'text-yellow-500' },
    ],

    quote_data: {
        text: "The new Flit Taxi app has revolutionized my daily work. I earn more, and the transparency is a game-changer. The design feels intuitive and reliable.",
        author: "Ahmed S., Flit Taxi Driver",
        role: "Early Adopter & Beta Tester"
    },

    call_to_action: {
        heading: "Explore the Live Demo",
        subheading: "Experience the seamless driver and rider journey firsthand.",
        button_text: "Launch Interactive Prototype",
        button_link: "#" // Placeholder link
    },
    
    key_metrics: [
        { title: "Driver Retention Rate", value: "95.5%", trend: "Up", icon: TrendingUp, color: "text-green-600", description: "Exceeded Q1 target of 95% due to fair commission model." },
        { title: "Avg. Task Completion Time", value: "8.9s", trend: "Down", icon: Clock, color: "text-cyan-600", description: "35% faster than previous industry benchmark." },
        { title: "User Satisfaction (CSAT)", value: "4.8 / 5", trend: "Up", icon: MessageSquare, color: "text-orange-600", description: "Sustained high rating across all major app stores." },
        { title: "Design Consistency Score", value: "98%", trend: "Stable", icon: Layers, color: "text-gray-600", description: "Measured via automated design system audits." },
    ],

    process_steps: [
        { icon: Search, title: "Discovery & Empathy Mapping", detail: "Conducted 15+ interviews with drivers and riders, analyzed competitor flows, and created detailed empathy maps to define core pain points and opportunities. This foundational step ensured a user-centric strategic direction." },
        { icon: Target, title: "Define & Strategy", detail: "Developed HMW (How Might We) statements, established key performance indicators (KPIs), and defined the Minimum Viable Product (MVP) scope focused on driver earnings transparency. A clear information hierarchy was paramount here." },
        { icon: PenTool, title: "Design, Prototype & Visual Identity", detail: "Created low-fidelity wireframes, high-fidelity mockups in Figma, a reusable component library, and defined the brand's visual language (color, type, iconography). Focus was placed on a clean, accessible UI." },
        { icon: CheckCircle, title: "Usability Testing & Iteration", detail: "Executed two rounds of remote usability testing (A/B testing on pricing display) using Maze and implemented data-driven refinements, reducing the time-to-request by 18% and validating the design choices." },
    ],
    
    challenges_solutions: [
        { challenge: "Rebuilding trust due to high competitor commissions and opaque systems.", solution: "Implemented a fixed, transparent 8% commission model with a real-time earnings tracker visible in the driver dashboard, directly addressing the trust deficit.", icon: AlertTriangle, challengeColor: 'border-red-500' },
        { challenge: "Ensuring rider safety in a highly competitive and new market entry.", solution: "Integrated a one-tap SOS feature, real-time trip sharing, and a robust driver verification system into the core application flow, making safety a core feature.", icon: ShieldCheck, challengeColor: 'border-cyan-500' },
        { challenge: "Scalability for new geographic locations and diverse languages.", solution: "Designed all components using a token-based design system optimized for localization and responsive layouts, ensuring minimal rework for future market expansion.", icon: Package, challengeColor: 'border-orange-500' },
    ],
    
    visual_gallery: [
        { alt_text: "Wireframe Flow Diagram", file_path: "https://placehold.co/1200x800/22d3ee/ffffff?text=Wireframe+and+IA+Map" },
        { alt_text: "High-Fidelity Driver Wallet Dashboard", file_path: "https://placehold.co/800x1200/fdbf72/854d0e?text=Driver+Dashboard+Mockup" },
        { alt_text: "Rider Booking Flow Screens", file_path: "https://placehold.co/1200x800/22d3ee/ffffff?text=Rider+Booking+Screens" },
    ],
};

const fetchProjectDetail = async (slug) => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return MOCK_DATA;
};

// =====================================================================
// 2. UTILITIES AND ANIMATION VARIANTS
// =====================================================================

const fadeInView = {
    initial: { opacity: 0, y: 30, filter: 'blur(3px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.2, 0.8, 0.4, 1] } }
};

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const iconMap = {
    Loader2, Clock, User, Briefcase, ChevronRight, X, Maximize2, Target, TrendingUp, Search, Lightbulb, PenTool, CheckCircle, Package, Layers, Smartphone, AlertTriangle, ShieldCheck, MessageSquare, Aperture, Figma, GitBranch, Zap, Code, Rss, ArrowLeft, ArrowRight, Layout, Award, Globe, Heart, Maximize
};


// =====================================================================
// 3. REUSABLE COMPONENTS
// =====================================================================

const InfoPill = ({ icon: Icon, label, value, primaryColor }) => (
    <motion.div 
        className="flex flex-col space-y-1 p-4 bg-white rounded-xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-offset-2"
        style={{ '--tw-ring-color': primaryColor }}
        variants={itemVariants}
    >
        <div className="flex items-center text-gray-500">
            {Icon && <Icon className="w-4 h-4 mr-2" style={{ color: primaryColor }} />}
            <span className="text-xs font-medium uppercase tracking-widest">{label}</span>
        </div>
        <p className="text-xl font-bold text-gray-800 leading-snug">{value || 'N/A'}</p>
    </motion.div>
);

const FlipCard = ({ item }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const Icon = item.icon && iconMap[item.icon.name] || item.icon;

    return (
        <motion.div
            className="perspective-1000 h-80 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)} 
            variants={itemVariants}
        >
            <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Side */}
                <div 
                    className={`absolute inset-0 backface-hidden p-6 rounded-xl shadow-xl border border-gray-200 flex flex-col items-center justify-center ${item.bgColor}`}
                >
                    <Icon className="w-12 h-12 mb-4" style={{ color: item.iconColor }} />
                    <h4 className="text-2xl font-black text-gray-900 text-center">{item.front_title}</h4>
                    <p className="mt-4 text-sm font-medium text-gray-500 uppercase tracking-widest">Hover / Click for Insight</p>
                </div>

                {/* Back Side (Information) */}
                <div 
                    className={`absolute inset-0 backface-hidden p-6 rounded-xl shadow-xl bg-white flex flex-col justify-center transform rotate-y-180 border-t-4`}
                    style={{ borderTopColor: item.iconColor }}
                >
                    <h4 className="text-xl font-bold mb-3" style={{ color: item.iconColor }}>Key Insight</h4>
                    <p className="text-base text-gray-800">{item.back_info}</p>
                    <div className="absolute bottom-4 right-4 text-xs text-gray-400">Tap to flip back</div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ImageWithTextSection = ({ item, primaryColor }) => {
    const { image_url, alt_text, heading, body_text, image_left, bgColor } = item;
    
    const contentOrder = image_left ? "md:flex-row" : "md:flex-row-reverse";

    return (
        <motion.div
            className={`flex flex-col ${contentOrder} items-center gap-12 w-full p-10 rounded-3xl shadow-xl border border-gray-200`}
            style={{ backgroundColor: bgColor }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants} className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-2xl">
                <img 
                    src={image_url} 
                    alt={alt_text} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                />
            </motion.div>
            <div className="w-full md:w-1/2 space-y-6">
                <motion.h4 variants={itemVariants} className="text-sm font-semibold uppercase tracking-widest" style={{ color: primaryColor }}>
                    Design Iteration
                </motion.h4>
                <motion.h3 variants={itemVariants} className="text-3xl font-extrabold text-gray-900 leading-snug">
                    {heading}
                </motion.h3>
                <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
                    {body_text}
                </motion.p>
            </div>
        </motion.div>
    );
};

/**
 * NEW: Component for scattered banner images with parallax
 */
const BannerImage = ({ item, data }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); 

    return (
        <motion.div
            ref={ref}
            className="w-full relative h-[350px] overflow-hidden rounded-3xl shadow-2xl"
            variants={fadeInView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            style={{ border: `8px solid ${data.secondary_color}10` }}
        >
            <motion.img
                src={item.path}
                alt={item.alt}
                style={{ y }}
                className="w-full h-full object-cover"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                <p className="text-3xl font-black text-white text-left p-4 rounded" style={{ backgroundColor: data.secondary_color }}>
                    {item.alt}
                </p>
            </div>
        </motion.div>
    );
};


// =====================================================================
// 4. SECTION COMPONENTS
// =====================================================================

const DetailHero = ({ data }) => {
    const statCards = [
        { label: 'Role', value: data.role, icon: Briefcase },
        { label: 'Timeline', value: data.timeline, icon: Clock },
        { label: 'Client', value: data.client, icon: User },
        { label: 'Status', value: data.status, icon: CheckCircle },
    ];
    
    return (
        <div className="relative pt-24 pb-16 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Text and Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    <span 
                        className="inline-block px-4 py-1 text-sm font-semibold rounded-full mb-4 text-white shadow-lg"
                        style={{ backgroundColor: data.secondary_color }}
                    >
                        {data.role}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-tight mb-6 max-w-5xl">
                        {data.title}
                    </h1>
                    <p className="text-xl text-gray-700 max-w-4xl pl-4 mb-16" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                        {data.tagline}
                    </p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl"
                    initial="initial"
                    animate="animate"
                    variants={staggerChildren}
                >
                    {statCards.map((stat, index) => (
                        <InfoPill key={index} label={stat.label} value={stat.value} icon={stat.icon} primaryColor={data.primary_color} />
                    ))}
                </motion.div>
            </div>
            
            {/* Hero Image Section - Full Width */}
            <motion.div 
                className="w-full h-[500px] overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
                <img
                    src={data.hero_image.path}
                    alt={data.hero_image.alt}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                />
            </motion.div>
        </div>
    );
};

const GoalSection = ({ section, data }) => (
    <motion.div
        className="w-full space-y-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
    >
        <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                {section.heading}
            </h2>
            <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                {section.subheading}
            </h3>
        </motion.div>

        <motion.p 
            variants={fadeInView}
            className="text-lg text-gray-700 leading-relaxed p-8 rounded-xl shadow-2xl border border-gray-100"
            style={{ backgroundColor: data.primary_color + '1a' }}
        >
            {data.goal_body_text}
        </motion.p>
    </motion.div>
);

const FlipCardGrid = ({ section, data }) => {
    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.flip_card_principles.map((item, index) => (
                    <FlipCard key={index} item={item} />
                ))}
            </div>
        </motion.div>
    );
};

const FeaturedSlider = ({ section, data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = data.slider_images || [];

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);

    // Simple variant for motion.div wrapper
    const sliderVariants = {
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        side: {
            zIndex: 0,
            opacity: 0.5,
            scale: 0.9,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="relative overflow-hidden w-full h-[600px] rounded-3xl shadow-2xl bg-gray-900">
                <div className="flex items-center justify-center w-full h-full relative">
                    {[prevIndex, currentIndex, nextIndex].map((index, i) => {
                        const image = images[index];
                        const position = i === 0 ? 'left' : i === 1 ? 'center' : 'right';
                        
                        return (
                            <motion.img
                                key={index}
                                src={image.path}
                                alt={image.alt}
                                variants={sliderVariants}
                                animate={position === 'center' ? 'center' : 'side'}
                                initial={false}
                                className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-all duration-500 ${position === 'center' ? 'z-10 w-3/4' : 'opacity-30 w-full z-0'}`}
                                style={{
                                    transform: position === 'left' ? 'translateX(-50%) scale(0.9)' : position === 'right' ? 'translateX(50%) scale(0.9)' : 'translateX(0) scale(1)',
                                }}
                            />
                        );
                    })}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 text-white rounded-full z-20 backdrop-blur-sm transition-all shadow-lg"
                    style={{ backgroundColor: data.secondary_color + '99'}}
                    aria-label="Previous Slide"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 text-white rounded-full z-20 backdrop-blur-sm transition-all shadow-lg"
                    style={{ backgroundColor: data.secondary_color + '99'}}
                    aria-label="Next Slide"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'scale-125' : 'bg-white/50 hover:bg-white/80'
                            }`}
                            style={{ backgroundColor: index === currentIndex ? data.primary_color : undefined }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ProcessTimeline = ({ section, data }) => {
    const steps = data.process_steps || [];

    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="relative border-l-4 border-gray-200 ml-4 md:ml-12">
                {steps.map((step, index) => {
                    const Icon = iconMap[step.icon.name] || step.icon;
                    
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="mb-10 ml-6 md:ml-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200 relative transform transition-transform duration-500 hover:scale-[1.01]"
                        >
                            {/* Timeline circle marker */}
                            <div className="absolute -left-10 md:-left-12 top-0 mt-6 h-8 w-8 rounded-full flex items-center justify-center border-4 border-gray-50 shadow-md" style={{ backgroundColor: data.primary_color }}>
                                <Icon className="w-4 h-4 text-white" />
                            </div>

                            <h4 className="text-2xl font-bold text-gray-900 mb-2">{`${index + 1}. ${step.title}`}</h4>
                            <p className="text-base text-gray-600">{step.detail}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const ImageWithTextSections = ({ section, data }) => {
    return (
        <div className="space-y-16">
            <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerChildren}
            >
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </motion.h2>
                <motion.h3 variants={itemVariants} className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </motion.h3>
            </motion.div>
            
            {data.image_text_sections.map((item, index) => (
                <ImageWithTextSection key={item.id} item={item} primaryColor={data.primary_color} />
            ))}
        </div>
    );
};

const AccessibilitySection = ({ section, data }) => {
    const insights = data.accessibility_insights || [];
    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 rounded-2xl shadow-2xl border border-gray-100" style={{ background: `linear-gradient(135deg, ${data.primary_color}0d, ${data.secondary_color}0d)` }}>
                {insights.map((item, index) => {
                    const Icon = iconMap[item.icon.name] || Award;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="p-6 bg-white rounded-xl shadow-lg border-l-4 transition-all duration-300 hover:ring-2 hover:ring-offset-2"
                            style={{ borderLeftColor: item.color, '--tw-ring-color': item.color }}
                        >
                            <div className="flex items-start mb-3">
                                <Icon className={`w-8 h-8 mr-4 ${item.color}`} />
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                                </div>
                            </div>
                            <p className="text-base text-gray-600">{item.detail}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const ChallengeSolutionGrid = ({ section, data }) => {
    const items = data.challenges_solutions || [];

    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {items.map((item, index) => {
                    const Icon = iconMap[item.icon.name] || AlertTriangle;
                    return (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="p-8 bg-white rounded-xl shadow-xl border-t-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform"
                            style={{ borderTopColor: item.challengeColor ? item.challengeColor.split('-')[1] : data.secondary_color }}
                        >
                            <div className="flex items-center mb-4">
                                <Icon className="w-8 h-8 mr-3" style={{ color: item.challengeColor ? item.challengeColor.split('-')[1] : data.secondary_color }} />
                                <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Challenge {index + 1}</h4>
                            </div>
                            <p className="text-base text-gray-600 mb-4 italic">"{item.challenge}"</p>
                            
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <h5 className="text-sm font-bold uppercase mb-2" style={{ color: data.primary_color }}>Solution</h5>
                                <p className="text-base text-gray-800">{item.solution}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const QuoteSection = ({ data }) => {
    const { text, author, role } = data.quote_data;

    return (
        <motion.div
            className="w-full py-16 px-8 rounded-3xl shadow-xl text-center border-t-8"
            style={{ backgroundColor: data.secondary_color + '1a', borderTopColor: data.secondary_color }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInView}
        >
            <MessageSquare className="w-12 h-12 mx-auto mb-6" style={{ color: data.secondary_color }} />
            <p className="text-3xl md:text-4xl font-serif italic text-gray-800 leading-snug max-w-4xl mx-auto mb-8">
                "{text}"
            </p>
            <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{author}</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest">{role}</p>
            </div>
        </motion.div>
    );
};

const MetricDashboard = ({ section, data }) => {
    const metrics = data.key_metrics || [];

    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl border border-gray-200 shadow-xl" style={{ backgroundColor: data.secondary_color + '10' }}>
                {metrics.map((metric, index) => {
                    const Icon = iconMap[metric.icon.name] || metric.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="p-6 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:ring-4"
                            style={{ borderLeft: `4px solid ${metric.color.split('-')[1] ? metric.color.split('-')[1] : data.primary_color}` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-sm font-semibold uppercase tracking-widest ${metric.color}`}>{metric.title}</span>
                                <Icon className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-5xl font-black text-gray-900 mb-2">{metric.value}</p>
                            <p className="text-sm text-gray-500">{metric.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const VisualGallery = ({ section, data, openModal }) => {
    const gallery = data.visual_gallery || [];

    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gallery.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className={`group relative rounded-xl overflow-hidden shadow-2xl border-4 border-white aspect-video cursor-pointer transition-shadow duration-300 ${index === 1 ? 'md:col-span-1 md:aspect-[4/5]' : 'md:col-span-1'}`}
                        onClick={() => openModal(item.file_path, item.alt_text)}
                    >
                        <img 
                            src={item.file_path} 
                            alt={item.alt_text} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const ToolsUsedSection = ({ section, data }) => {
    const tools = data.tools_used || [];

    return (
        <motion.div
            className="w-full space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight pl-4 mb-4" style={{ borderLeft: `4px solid ${data.primary_color}` }}>
                    {section.heading}
                </h2>
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    {section.subheading}
                </h3>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 p-8 rounded-xl shadow-lg border border-gray-200" style={{ backgroundColor: data.secondary_color + '10' }}>
                {tools.map((tool, index) => {
                    const Icon = iconMap[tool.icon.name] || tool.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex flex-col items-center p-4 rounded-lg bg-white border border-gray-100 transition-all duration-300 hover:shadow-md hover:ring-2 ring-offset-2"
                            style={{ '--tw-ring-color': tool.color }}
                        >
                            <Icon className={`w-8 h-8 mb-2 ${tool.color}`} />
                            <p className="text-sm font-bold text-gray-800">{tool.name}</p>
                            <p className="text-xs text-gray-400">{tool.category}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const CallToActionSection = ({ data }) => {
    const { heading, subheading, button_text, button_link } = data.call_to_action;

    return (
        <motion.div
            className="w-full p-16 text-center text-white rounded-3xl shadow-2xl"
            style={{ background: `linear-gradient(45deg, ${data.primary_color}, ${data.secondary_color})` }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInView}
        >
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                {heading}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                {subheading}
            </p>
            <a 
                href={button_link} 
                className="mt-6 inline-flex items-center px-12 py-4 bg-white text-gray-900 font-bold rounded-full text-xl shadow-2xl shadow-black/30 transition-all duration-300 hover:bg-gray-100 transform hover:scale-[1.05]"
                target="_blank"
                rel="noopener noreferrer"
            >
                {button_text} <ChevronRight className="w-6 h-6 ml-2" />
            </a>
        </motion.div>
    );
};


// =====================================================================
// 5. MAIN RENDERER AND APPLICATION COMPONENT
// =====================================================================

const SectionRenderer = ({ section, openModal, data }) => {
    switch (section.layout_type) {
        case 'goal_section':
            return <GoalSection section={section} data={data} />;
        case 'flip_card_principles':
            return <FlipCardGrid section={section} data={data} />;
        case 'featured_slider':
            return <FeaturedSlider section={section} data={data} />;
        case 'process_overview':
            return <ProcessTimeline section={section} data={data} />;
        case 'image_text_detail':
            return <ImageWithTextSections section={section} data={data} />;
        case 'accessibility_features':
            return <AccessibilitySection section={section} data={data} />;
        case 'challenges_solutions':
            return <ChallengeSolutionGrid section={section} data={data} />;
        case 'quote_section':
            return <QuoteSection data={data} />;
        case 'key_metrics_block':
            return <MetricDashboard section={section} data={data} />;
        case 'visual_gallery':
            return <VisualGallery section={section} data={data} openModal={openModal} />;
        case 'tools_used':
            return <ToolsUsedSection section={section} data={data} />;
        case 'call_to_action':
            return <CallToActionSection data={data} />;
        case 'scattered_banner':
            return <BannerImage item={section.data} data={data} />;
        default:
            return null;
    }
};

const ProjectDetail = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ isOpen: false, imageUrl: '', title: '' });
    const projectSlug = "flit-taxi-mobility";

    useEffect(() => {
        const loadProject = async () => {
            setLoading(true);
            try {
                const data = await fetchProjectDetail(projectSlug);
               
                // Define core sections
                const coreSections = [
                    { id: 'sec-1', order: 1, heading: 'Defining the Core Problem', subheading: 'Project Goals & Key Objectives', layout_type: 'goal_section' },
                    { id: 'sec-principles', order: 2, heading: 'Core Design Principles', subheading: 'The Four Pillars of the Project', layout_type: 'flip_card_principles' },
                    { id: 'sec-slider', order: 3, heading: 'Featured Screens & Flows', subheading: 'High-Impact Visual Highlights', layout_type: 'featured_slider' }, 
                    { id: 'sec-process', order: 4, heading: 'The UX Process', subheading: 'From Discovery to Validation', layout_type: 'process_overview' },
                    { id: 'sec-detail', order: 5, heading: 'Detailed Design Breakdown', subheading: 'Research, Wireframing, and Visuals', layout_type: 'image_text_detail' },
                    { id: 'sec-accessibility', order: 6, heading: 'Advanced UX Features & Compliance', subheading: 'Designing for Accessibility and Inclusivity (A11Y)', layout_type: 'accessibility_features' },
                    { id: 'sec-challenges', order: 7, heading: 'Addressing Core Obstacles', subheading: 'Problem/Solution Framework', layout_type: 'challenges_solutions' },
                    { id: 'sec-quote', order: 8, heading: 'User Feedback', subheading: 'Testimonials and Impact', layout_type: 'quote_section' },
                    { id: 'sec-metrics', order: 9, heading: 'Tangible Impact & Results', subheading: 'Key Performance Indicators (KPIs)', layout_type: 'key_metrics_block' },
                    { id: 'sec-visuals', order: 10, heading: 'High-Fidelity Visuals', subheading: 'Mockups and Diagrams', layout_type: 'visual_gallery' },
                    { id: 'sec-tools', order: 11, heading: 'Technology & Toolkit', subheading: 'Software and Frameworks Used (Extended)', layout_type: 'tools_used' }, 
                    { id: 'sec-cta', order: 12, heading: 'Next Steps', subheading: 'See it live or connect', layout_type: 'call_to_action' },
                ];

                // Logic to scatter banners
                const finalSections = [];
                let bannerIndex = 0;
                
                coreSections.forEach((section, index) => {
                    finalSections.push(section);
                    
                    // Insert banners after certain sections for visual breaks
                    if (index === 1 && bannerIndex < data.banner_images.length) {
                        finalSections.push({
                            id: `banner-${bannerIndex}`, 
                            order: section.order + 0.5, 
                            layout_type: 'scattered_banner',
                            data: data.banner_images[bannerIndex] 
                        });
                        bannerIndex++;
                    }
                    if (index === 6 && bannerIndex < data.banner_images.length) {
                         finalSections.push({
                            id: `banner-${bannerIndex}`, 
                            order: section.order + 0.5, 
                            layout_type: 'scattered_banner',
                            data: data.banner_images[bannerIndex] 
                        });
                        bannerIndex++;
                    }
                });
                
                setProject({
                    ...data,
                    sections: finalSections.sort((a, b) => a.order - b.order)
                });
            } catch (error) {
                console.error("Failed to fetch project details:", error);
                setProject(null);
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [projectSlug]);

    const openModal = useCallback((imageUrl, title) => {
        setModal({ isOpen: true, imageUrl, title });
    }, []);

    const closeModal = useCallback(() => {
        setModal({ isOpen: false, imageUrl: '', title: '' });
    }, []);

    if (loading || !project) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
                <span className="ml-3 text-lg font-medium text-gray-600">Loading professional case study...</span>
            </div>
        );
    }

    return (
        // Main wrapper set to white background
        <div className="font-sans bg-white min-h-screen text-gray-900">
            
            {/* Image Zoom Modal */}
            <AnimatePresence>
                {modal.isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-2xl p-4 relative"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-900 bg-white/70 hover:bg-white rounded-full p-2 transition z-10 shadow-md border border-gray-200"
                                onClick={closeModal}
                                aria-label="Close Image Viewer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <img 
                                src={modal.imageUrl} 
                                alt={modal.title} 
                                className="object-contain w-full h-full max-h-[85vh] rounded-lg"
                            />
                            <div className="text-center mt-2">
                                <p className="text-lg font-semibold text-gray-800">{modal.title}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <DetailHero data={project} />

            {/* Project Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-36">
                {project.sections.map(section => (
                    <SectionRenderer 
                        key={section.id} 
                        section={section} 
                        data={project} 
                        openModal={openModal} 
                    />
                ))}
            </div>

            {/* Footer / Call to Action */}
            <motion.div 
                className="p-20 mt-24 text-center text-white"
                style={{ background: `linear-gradient(90deg, ${project.primary_color}, ${project.secondary_color})` }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-xl font-semibold mb-4 text-white/80 uppercase tracking-widest">Connect with the Designer</h3>
                <p className="text-5xl font-black leading-tight mb-8">Ready to discuss this case study further?</p>
                <a 
                    href="#" 
                    className="mt-6 inline-flex items-center px-10 py-4 bg-white text-gray-900 font-bold rounded-full text-xl shadow-2xl shadow-black/30 transition-all duration-300 hover:bg-gray-100 transform hover:scale-[1.05]"
                >
                    View My Resume/Contact <ChevronRight className="w-6 h-6 ml-2" />
                </a>
            </motion.div>
        </div>
    );
};

export default ProjectDetail;