// =============================================================================
// src/data/mockData.ts
// =============================================================================

// ---------------------------------------------------------------------------
// GLOBAL  (header + footer)
// ---------------------------------------------------------------------------
export const globalMock = {
  header: {
    id: 1,
    logoText: { id: 1, url: "/", text: "Mite Tal", isExternal: false },
    cta: { id: 2, url: "/contact", text: "Get in Touch", isExternal: false },
    navbar: [
      { id: 1, url: "/", text: "Home", isExternal: false },
      { id: 2, url: "/about", text: "About", isExternal: false },
      { id: 3, url: "/projects", text: "Projects", isExternal: false },
      { id: 4, url: "/contact", text: "Contact", isExternal: false },
    ],
  },
  footer: {
    id: 1,
    brandGuideLine:
      "We craft immersive learning experiences through AR, WebGL, and animated storytelling — making education joyful, visual, and unforgettable.",
    titleForContact: "Start a Project",
    descriptionForContact:
      "Whether you're planning your next big learning project or just curious about what we do — we'd love to hear from you.",
    logoText: { id: 1, url: "/", text: "Mite Tal", isExternal: false },
    cta: { id: 2, url: "/contact", text: "Get in Touch", isExternal: false },
    chatBot: {
      id: 3,
      url: "https://wa.me/your-number",
      text: "Chat on WhatsApp",
      isExternal: true,
    },
    contact: [
      {
        id: 1,
        road: "",
        building: "",
        country: "",
        email: {
          id: 10,
          url: "mailto:hello@mitetal.com",
          text: "hello@mitetal.com",
          isExternal: false,
        },
        phone: {
          id: 11,
          url: "",
          text: "",
          isExternal: false,
        },
      },
    ],
    socialMedia: [
      { id: 1, url: "https://www.youtube.com/@MiteTalContents", text: "Youtube", isExternal: true },
      { id: 2, url: "https://www.linkedin.com/company/mite-tal/", text: "Linkedin", isExternal: true },
      { id: 3, url: "https://www.facebook.com/profile.php?id=61574413950212", text: "Facebook", isExternal: true },
    ],
    regulations: [],
    navbar: [
      { id: 1, url: "/", text: "Home", isExternal: false },
      { id: 2, url: "/about", text: "About", isExternal: false },
      { id: 3, url: "/projects", text: "Projects", isExternal: false },
      { id: 4, url: "/contact", text: "Contact", isExternal: false },
    ],
  },
};

// ---------------------------------------------------------------------------
// HOME PAGE  (dynamic zone blocks)
// ---------------------------------------------------------------------------
export const homeMock = {
  blocks: [
    // ── Section 1: Hero ───────────────────────────────────────────────────
    {
      __component: "layout.hero-section",
      id: 1,
      heading: "Where Curiosity Meets Creativity",
      subHeading:
        "We build immersive learning experiences using AR, animation, and storytelling — to make education joyful, visual, and unforgettable.",
      image: {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
        alternativeText: "Immersive learning experience",
      },
      cta: {
        id: 1,
        url: "/contact",
        text: "Let's Work Together",
        isExternal: false,
      },
    },

    // ── Section 2: About Short ────────────────────────────────────────────
    {
      __component: "layout.about-short",
      id: 2,
      heading: "What We Do",
      subHeading: "Education through creativity and emerging tech",
      description:
        "Mite Tal is a creative company dedicated to transforming education through visual storytelling and emerging technology. From animated videos to interactive AR/WebGL modules, we craft learning experiences that engage, empower, and inspire learners of all ages.\n\nWhether you're an NGO, school, startup, or curious viewer on YouTube — we're here to make learning joyful, scalable, and impactful.",
      image: {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        alternativeText: "Mite Tal team at work",
      },
      features: [
        {
          id: 1,
          title: "Augmented Reality (AR)",
          description:
            "Interactive AR experiences for science, health, and life skills — used in classrooms, exhibits, and printed materials.",
        },
        {
          id: 2,
          title: "WebGL Learning Modules",
          description:
            "Browser-based interactive simulations ideal for low-bandwidth or no-install environments.",
        },
        {
          id: 3,
          title: "Animated Educational Videos",
          description:
            "Explainers, storytelling videos, and edtech content — from script to voiceover to animation.",
        },
        {
          id: 4,
          title: "YouTube Channels",
          description:
            "Fun, fast-paced, bite-sized videos designed to entertain while educating.",
        },
      ],
      cta: {
        id: 1,
        url: "/about",
        text: "Learn More About Us",
        isExternal: false,
      },
    },

    // ── Section 3: Services ───────────────────────────────────────────────
    {
      __component: "layout.service-data",
      id: 3,
      heading: "Our Services",
      subHeading: "End-to-end immersive learning solutions",
      services: [
        {
          id: 1,
          title: "Augmented Reality (AR) Learning Tools",
          description:
            "We design marker-based and markerless AR experiences for science, health, and life skills.",
          icon: "Layers",
          features: [
            { feature: "Interactive AR for science, health & life skills" },
            { feature: "Used in classrooms, exhibits, and printed materials" },
            { feature: "iOS, Android & WebAR compatible" },
            { feature: "Curriculum-aligned content" },
          ],
        },
        {
          id: 2,
          title: "WebGL-based Learning Modules",
          description:
            "Browser-based interactive simulations and visualisations — no app download required.",
          icon: "Globe",
          features: [
            { feature: "Browser-based interactive simulations" },
            { feature: "Ideal for low-bandwidth or no-install environments" },
            { feature: "Gamified, responsive, easy to embed in LMS or websites" },
            { feature: "Works on any modern browser" },
          ],
        },
        {
          id: 3,
          title: "Animated Educational Videos",
          description:
            "From script to voiceover to animation — explainers and edtech content for NGOs, schools, and e-learning platforms.",
          icon: "Play",
          features: [
            { feature: "Explainers, storytelling & edtech content" },
            { feature: "Used by NGOs, schools, and e-learning platforms" },
            { feature: "From script to voiceover to animation" },
            { feature: "2D & 3D motion graphics" },
          ],
        },
        {
          id: 4,
          title: "YouTube Educational Channels",
          description:
            "Fun, fast-paced, bite-sized videos designed to entertain while educating — full channel strategy to production.",
          icon: "Youtube",
          features: [
            { feature: "Fun, fast-paced, bite-sized videos" },
            { feature: "Designed to entertain while educating" },
            { feature: "Full channel strategy & production" },
            { feature: "SEO-optimised thumbnails & titles" },
          ],
        },
      ],
    },

    // ── Section 4: Get in Touch CTA ───────────────────────────────────────
    // Uses the `layout.testimonial` block — testimonials & ups are empty so
    // only the marketing CTA at the bottom renders.
    {
      __component: "layout.testimonial",
      id: 4,
      heading: "",
      subHeading: "",
      description: "",
      testimonials: [],   // no client testimonials yet
      ups: [],            // no stats yet
      marketing: {
        id: 1,
        title: "Let's Create Something Together",
        description:
          "Whether you're planning your next big learning project or just curious about what we do — we'd love to hear from you. Let's create something joyful and impactful together.",
        cta: {
          id: 1,
          url: "/contact",
          text: "Get in Touch",
          isExternal: false,
        },
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// ABOUT PAGE  (dynamic zone blocks)
// ---------------------------------------------------------------------------
export const aboutMock = {
  blocks: [
    {
      __component: "layout.hero-about",
      id: 1,
      title: "About Us",
      subtitle: "Sparking Curiosity. Crafting Learning. Changing the World.",
      heading: "Blending Education, Animation & Emerging Tech",
      cta: {
        id: 1,
        url: "/contact",
        text: "Work With Us",
        isExternal: false,
      },
    },
    {
      __component: "layout.mission",
      id: 2,
      title: "Who We Are",
      heading: "Make Learning Joyful, Visual & Unforgettable",
      description:
        "Mite Tal is a creative company blending education, animation, and emerging tech to spark curiosity and bring learning to life. We craft immersive learning experiences through Augmented Reality (AR), WebGL, and animated storytelling — serving both institutional partners and global audiences on YouTube.",
      vision:
        "From classrooms to smartphones, our goal is simple: make learning joyful, visual, and unforgettable.",
      image: {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        alternativeText: "Mite Tal team",
      },
    },
    {
      __component: "components.about-company",
      id: 3,
      title: "Our Story",
      aboutCompany: [
        {
          id: 1,
          description:
            "Mite Tal is a creative company blending education, animation, and emerging tech to spark curiosity and bring learning to life.",
        },
        {
          id: 2,
          description:
            "We craft immersive learning experiences through Augmented Reality (AR), WebGL, and animated storytelling — serving both institutional partners and global audiences on YouTube.",
        },
        {
          id: 3,
          description:
            "From classrooms to smartphones, our goal is simple: make learning joyful, visual, and unforgettable.",
        },
      ],
    },
    {
      __component: "layout.service-data",
      id: 4,
      heading: "What We Do",
      subHeading: "End-to-end immersive learning solutions",
      services: [
        {
          id: 1,
          title: "Augmented Reality (AR) Learning Tools",
          description:
            "Interactive AR experiences for science, health, and life skills — used in classrooms, exhibits, and printed materials.",
          icon: "Layers",
          features: [
            { feature: "Interactive AR for science, health & life skills" },
            { feature: "Used in classrooms, exhibits & printed materials" },
            { feature: "iOS, Android & WebAR compatible" },
          ],
        },
        {
          id: 2,
          title: "WebGL-based Learning Modules",
          description:
            "Browser-based interactive simulations and visualisations, ideal for low-bandwidth or no-install environments.",
          icon: "Globe",
          features: [
            { feature: "Browser-based interactive simulations" },
            { feature: "Ideal for low-bandwidth environments" },
            { feature: "Gamified, responsive, easy to embed in LMS" },
          ],
        },
        {
          id: 3,
          title: "Animated Educational Videos",
          description:
            "Explainers, storytelling videos, and edtech content — from script to voiceover to animation.",
          icon: "Play",
          features: [
            { feature: "Explainers, storytelling & edtech content" },
            { feature: "Used by NGOs, schools & e-learning platforms" },
            { feature: "From script to voiceover to animation" },
          ],
        },
        {
          id: 4,
          title: "YouTube Educational Channels",
          description:
            "Fun, fast-paced, bite-sized videos designed to entertain while educating.",
          icon: "Youtube",
          features: [
            { feature: "Fun, fast-paced, bite-sized videos" },
            { feature: "Designed to entertain while educating" },
            { feature: "Full channel strategy & production" },
          ],
        },
      ],
    },
    {
      __component: "layout.values",
      id: 5,
      heading: "Our Core Values",
      subHeading: "The principles that guide everything we create",
      coreValues: [
        {
          id: 1,
          title: "Innovation",
          description:
            "We constantly explore new ways to make learning interactive and impactful.",
          icon: "Lightbulb",
        },
        {
          id: 2,
          title: "Creativity",
          description:
            "Our work thrives on imaginative solutions and bold design.",
          icon: "Palette",
        },
        {
          id: 3,
          title: "Joy",
          description:
            "We believe learning should be a delightful and inspiring experience.",
          icon: "Smile",
        },
        {
          id: 4,
          title: "Integrity",
          description:
            "We maintain high standards of quality and transparency in all we do.",
          icon: "ShieldCheck",
        },
        {
          id: 5,
          title: "Collaboration",
          description:
            "We value teamwork and partnerships that enhance our creative vision.",
          icon: "Users",
        },
      ],
    },
    {
      __component: "components.marketing",
      id: 6,
      title: "Ready to Build Something Extraordinary?",
      description:
        "Whether you're planning your next big learning project or just curious about what we do — we'd love to hear from you. Let's create something joyful and impactful together.",
      cta: {
        id: 1,
        url: "/contact",
        text: "Let's Talk",
        isExternal: false,
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// PROJECTS LIST PAGE
// No projects yet — empty array renders the empty state component
// ---------------------------------------------------------------------------
export const projectsListMock: any[] = [];

// ---------------------------------------------------------------------------
// ARTICLES  (used by ProjectShowcase on the home page)
// No featured projects yet — empty array renders nothing
// ---------------------------------------------------------------------------
export const articlesMock: any[] = [];

// ---------------------------------------------------------------------------
// PROJECT DETAILS  (keyed by documentId)
// ---------------------------------------------------------------------------
export const projectDetailsMock: Record<string, any> = {};

// ---------------------------------------------------------------------------
// CONTACT PAGE  (dynamic zone blocks)
// ---------------------------------------------------------------------------
export const contactMock = {
  blocks: [
    {
      __component: "components.contact-hero",
      id: 1,
      title: "Get in Touch",
      heading: "Let's Create Something Together",
      subHeading: "Tell us about your project",
      description:
        "Whether you're planning your next big learning project or just curious about what we do — we'd love to hear from you. Let's create something joyful and impactful together.",
    },
    {
      __component: "layout.contact-method",
      id: 2,
      title: "Ways to Reach Us",
      description: "Choose the channel that works best for you.",
      contactMethods: [
        {
          id: 1,
          title: "Email Us",
          description: "For project enquiries and proposals",
          icon: "Mail",
          type: "email",
          color: "blue",
          action: {
            id: 1,
            url: "mailto:hello@mitetal.com",
            text: "hello@mitetal.com",
            isExternal: true,
          },
        },
        {
          id: 2,
          title: "WhatsApp",
          description: "Quick questions and project updates",
          icon: "MessageCircle",
          type: "whatsapp",
          color: "emerald",
          action: {
            id: 2,
            url: "https://wa.me/your-number",
            text: "Start a Chat",
            isExternal: true,
          },
        },
      ],
    },
    {
      __component: "components.contact-info",
      id: 3,
      email: "hello@mitetal.com",
      phone: "",
      address: "",
      hours: "",
      socialMedia: [
        { id: 1, url: "https://www.youtube.com/@MiteTalContents", text: "Youtube", isExternal: true },
        { id: 2, url: "https://www.linkedin.com/company/mite-tal/", text: "Linkedin", isExternal: true },
        { id: 3, url: "https://www.facebook.com/profile.php?id=61574413950212", text: "Facebook", isExternal: true },
      ],
      feature: [
        { id: 1, feature: "Free initial consultation" },
        { id: 2, feature: "Response within 24 hours" },
      ],
    },
    {
      __component: "layout.contact-form",
      id: 4,
      heading: "Send Us a Message",
      subHeading:
        "Whether you're planning your next big learning project or just curious about what we do — we'd love to hear from you.",
      projectType: [
        { id: 1, option: "Augmented Reality (AR)" },
        { id: 2, option: "WebGL Learning Module" },
        { id: 3, option: "Animated Educational Video" },
        { id: 4, option: "YouTube Channel" },
        { id: 5, option: "Other" },
      ],
      budgetRange: [
        { id: 1, option: "Under $5,000" },
        { id: 2, option: "$5,000 – $15,000" },
        { id: 3, option: "$15,000 – $50,000" },
        { id: 4, option: "$50,000+" },
        { id: 5, option: "Not sure yet" },
      ],
      timeLine: [
        { id: 1, option: "Less than 1 month" },
        { id: 2, option: "1 – 3 months" },
        { id: 3, option: "3 – 6 months" },
        { id: 4, option: "6+ months" },
        { id: 5, option: "Flexible" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// GUIDE PAGE
// ---------------------------------------------------------------------------
export const guideMock = {
  blocks: [
    {
      contentBlocks: [
        {
          id: "guide-1",
          type: "rich-content",
          content: {
            text: "# Getting Started with Mite Tal\n\nThis guide walks you through what we do and how to start a project with us.\n\n## What We Build\n\n| Service | Best For |\n|---|---|\n| AR Learning Tools | Classrooms, exhibits, printed materials |\n| WebGL Modules | Low-bandwidth, no-install environments |\n| Animated Videos | NGOs, schools, YouTube audiences |\n| YouTube Channels | Bite-sized, broad educational content |\n\n## How to Get Started\n\n1. **Reach out** — Send us a message at hello@mitetal.com or use the contact form.\n2. **Discovery call** — We'll learn about your goals, audience, and timeline.\n3. **Proposal** — We'll send a scope and quote tailored to your project.\n4. **Build** — We design, produce, and deliver your experience.\n\n## Ready to Start?\n\nContact our team for a free consultation.",
          },
        },
      ],
    },
  ],
};