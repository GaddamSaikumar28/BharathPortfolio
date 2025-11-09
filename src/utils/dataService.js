// dataService.js

// This is your entire website's content, extracted into one object.
// We will load this on the first visit.
const DEFAULT_DATA = {
  globalConfig: {
    siteName: "Gaddam B. Kumar",
    ctaButtonText: "Contact Me",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
    fontConfig: {
      baseFontSize: "16px",
      headingFont: "'Satoshi', sans-serif", // Example font
      bodyFont: "'Inter', sans-serif",      // Example font
    },
  },
  homepage: {
    heroV1: {
      title: "Gaddam Bharath Kumar",
      subtitle: "Creative Graphic Designer",
      description: "Transforming ideas into stunning visuals. Specializing in branding, UI/UX, and motion graphics that captivate and convert.",
      ctaText: "View My Work"
    },
    heroV2: {
      title: "Design That Speaks Volumes",
      description: "Explore a collection of projects that showcase passion, creativity, and a keen eye for detail.",
      ctaText: "See Full Portfolio",
      images: [
        'https://placehold.co/400x400/93C5FD/1E3A8A?text=Design+1',
        'https://placehold.co/400x400/A5B4FC/312E81?text=Design+2',
        'https://placehold.co/400x400/FDBA74/7C2D12?text=Design+3',
        'https://placehold.co/400x400/BEF264/365314?text=Design+4',
        'https://placehold.co/400x400/F9A8D4/831843?text=Design+5',
        'https://placehold.co/400x400/6EE7B7/064E3B?text=Design+6',
      ]
    },
    logoCloud: {
      title: "Brands I've Collaborated With",
      logos: ["Google", "Slack", "Jira", "Trello", "Asana", "Figma", "Microsoft"]
    },
    services: {
      preTitle: "My Design Services",
      title: "A Versatile Skill Set",
      description: "I offer a comprehensive suite of design services to cover all your creative needs...",
      items: [
        { icon: "Palette", title: "Brand Identity", description: "From logos to complete brand guidelines..." },
        { icon: "LayoutGrid", title: "UI/UX Design", description: "Crafting intuitive and beautiful user interfaces..." },
        { icon: "Zap", title: "Motion Graphics", description: "Engaging 2D and 3D animations for ads..." },
        { icon: "Package", title: "Packaging Design", description: "Creating memorable and effective packaging..." },
      ]
    },
    featuredProject: {
      preTitle: "Featured Project",
      title: "Rebrand for 'Aura' Wellness",
      description: "A deep dive into the process of rebranding a modern wellness app...",
      steps: [
        { title: "1. The Challenge", description: "Aura, a wellness startup, had a brand identity that felt dated...", image: "https://placehold.co/600x600/E0F2FE/0C4A6E?text=Challenge" },
        { title: "2. The Strategy", description: "We focused on a clean, organic, and uplifting visual language...", image: "https://placehold.co/600x600/D1FAE5/064E3B?text=Strategy" },
        { title: "3. The Visuals", description: "A new logo, custom typography, and a nature-inspired color palette...", image: "https://placehold.co/600x600/FEF3C7/78350F?text=Visuals" },
        { title: "4. The Result", description: "The rebrand led to a 40% increase in user engagement...", image: "https://placehold.co/600x600/E5E0FF/312E81?text=Result" },
      ]
    },
    toolkit: {
      preTitle: "My Creative Toolkit",
      title: "Proficient in Industry-Standard Software",
      description: "I use the best tools for the job, ensuring high-quality results...",
      tools: [
        { name: "Figma", icon: "DraftingCompass", color: "text-pink-500" },
        { name: "Adobe Illustrator", icon: "PenTool", color: "text-orange-500" },
        { name: "Adobe Photoshop", icon: "Camera", color: "text-blue-500" },
        { name: "Adobe After Effects", icon: "Clapperboard", color: "text-purple-500" },
        { name: "Cinema 4D", icon: "Box", color: "text-gray-500" },
        { name: "Spline", icon: "View", color: "text-blue-300" },
      ]
    },
    testimonials: {
      title: "What My Clients Say",
      description: "Building strong, lasting partnerships is at the heart of my work.",
      items: [
        { quote: "Bharath's creativity and attention to detail are unmatched...", name: "Alice Chen", role: "Marketing Director, Aura", avatar: "https://placehold.co/100x100/E0F2FE/0C4A6E?text=AC" },
        { quote: "Working with Bharath was a dream. He's a great communicator...", name: "David Lee", role: "Founder, Nexa", avatar: "https://placehold.co/100x100/E5E7EB/1F2937?text=DL" },
        { quote: "The new UI/UX design has significantly improved our user engagement...", name: "Sophia Rodriguez", role: "Product Manager, TechCo", avatar: "https://placehold.co/100x100/F3E8FF/581C87?text=SR" },
      ]
    },
    // ... (I've omitted BentoShowcase, Pricing, FAQ etc. for brevity, but you'd add them here)
    finalCta: {
      title: "Ready to Start Your Project?",
      description: "Let's collaborate and create something amazing. Get in touch for a free consultation.",
      ctaText: "Let's Talk"
    }
  },
  aboutPage: {
    hero: {
      preTitle: "Gaddam Bharath Kumar",
      title: "Designer, Thinker, Problem Solver.",
      description: "I am a multi-disciplinary graphic designer with a passion for building beautiful, functional, and user-centric experiences...",
      imageUrl: "https://placehold.co/600x600/DBEAFE/1E40AF?text=G.B.K."
    },
    coreValues: {
      title: "My Core Values",
      items: [
        { icon: "Lightbulb", title: "Creativity", desc: "Pushing boundaries to deliver unique and original solutions." },
        { icon: "Check", title: "Precision", desc: "Pixel-perfect attention to detail in every single project." },
        { icon: "Heart", title: "Empathy", desc: "Designing for people first, understanding user needs and emotions." },
        { icon: "TrendingUp", title: "Impact", desc: "Creating design that not only looks good but achieves business goals." },
      ]
    },
    journey: {
      title: "My Journey",
      items: [
        { year: '2018', title: 'Started My Design Journey', desc: 'Began exploring graphic design...' },
        { year: '2020', title: 'B.Sc. in Design', desc: 'Graduated from [Your University Name]...' },
        { year: '2021', title: 'First Agency Role', desc: 'Joined a fast-paced agency...' },
        { year: '2023', title: 'Went Freelance', desc: 'Started my freelance career...' },
        { year: 'Present', title: 'Always Learning', desc: 'Exploring 3D motion and AR filters...' },
      ]
    },
    // ... (SkillsBento, PageCTA)
  },
  contactPage: {
    title: "Let's build something",
    kineticWords: ["Together", "Awesome", "Big", "New"],
    description: "Have a project in mind? Let's talk. I'm always open to discussing new ideas...",
    socialsTitle: "Or reach out directly",
    socialItems: [
      { icon: "Mail", label: 'bharath.gaddam@email.com', href: 'mailto:bharath.gaddam@email.com' },
      { icon: "Linkedin", label: 'LinkedIn Profile', href: '#' },
      { icon: "Instagram", label: 'Instagram', href: '#' },
      { icon: "Twitter", label: 'Twitter', href: '#' },
    ]
  },
  // This is the entire 'database' for your projects
  allProjects: [
    {
      id: 'zenith-motion',
      title: 'Zenith',
      category: 'Motion Graphics',
      heroImage: 'https://placehold.co/1200x800/1F2937/9CA3AF?text=Zenith',
      videoUrl: 'https://cdn.dribbble.com/users/325163/screenshots/15671763/media/1a6368d3a7b5a8e2f81640c6c6077309.mp4',
      description: 'Zenith required a high-energy animated brand identity. The goal was to capture "limitless potential" in a 5-second logo ident...',
      details: 'Using Cinema 4D and After Effects, we developed a particle system that forms the logo from a chaotic swirl of light...',
      role: 'Lead Motion Designer',
      tools: 'After Effects, Cinema 4D, Redshift, Figma', // Use comma-separated for easier editing
      timeline: '4 Weeks',
      keyFeatures: 'Generative Art Style, Fluid Particle Simulation, Sound-Synched Motion', // Use comma-separated
      resultsStat: '+60%',
      resultsLabel: 'Brand Recall',
      colors: '#0F172A, #1E3A8A, #93C5FD, #FFFFFF', // Use comma-separated
      fontPrimary: 'Satoshi Bold',
      fontSecondary: 'Inter Regular',
      fullWidthVideoUrl: 'https://cdn.dribbble.com/users/325163/screenshots/15671763/media/1a6368d3a7b5a8e2f81640c6c6077309.mp4',
      gallery: [ // Use newline-separated for textarea
        'https://placehold.co/800x600/1F2937/9CA3AF?text=Zenith+Styleframe+1',
        'https://placehold.co/800x600/1F2937/9CA3AF?text=Zenith+Styleframe+2'
      ].join('\n'),
      printGallery: [
        'https://placehold.co/800x1100/1F2937/9CA3AF?text=Zenith+Poster',
        'https://placehold.co/1200x600/1F2937/9CA3AF?text=Zenith+Banner'
      ].join('\n'),
    },
    // ... (All other 11 projects would go here in the same format)
  ]
};

const DB_KEY = 'gaddambk_portfolio_data';

// --- API ---

/**
 * Gets the entire website data object from localStorage.
 * If it's the first visit, it initializes localStorage with DEFAULT_DATA.
 */
export const getSiteData = () => {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // First time load: save default data and return it
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  } catch (error) {
    console.error("Error getting data from localStorage", error);
    return DEFAULT_DATA;
  }
};

/**
 * Saves the entire website data object to localStorage.
 * @param {object} newData The complete new data object
 */
export const saveSiteData = (newData) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(newData));
    return true;
  } catch (error) {
    console.error("Error saving data to localStorage", error);
    return false;
  }
};