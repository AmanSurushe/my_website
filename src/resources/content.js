/* 
===============================================================================
                        CONTENT CONFIGURATION GUIDE
===============================================================================

🎯 RECRUITER-FRIENDLY CONTENT TIPS:
- Use quantifiable achievements (numbers, percentages, metrics)
- Start bullet points with strong action verbs
- Include business impact and scale of projects
- Highlight technologies and methodologies used
- Show progression and learning over time

📊 KEY METRICS TO UPDATE REGULARLY:
- Message processing volumes
- System uptime percentages
- Performance improvements
- User base served
- Cost savings achieved

🔧 HOW TO UPDATE CONTENT:

1. WORK EXPERIENCE:
   - Update achievements with new projects and metrics
   - Add new positions by copying the existing structure
   - Focus on business impact, not just technical details

2. TECHNICAL SKILLS:
   - Add new technologies as you learn them
   - Update proficiency levels and project experience
   - Include latest frameworks and tools

3. ACHIEVEMENTS:
   - Update metrics as your projects grow
   - Add new significant accomplishments
   - Keep the most impressive 4-5 highlights

4. EDUCATION:
   - Education section updated with correct MCA/BCA details
   - Add new certifications to Professional Certifications section
   - Include relevant courses or training

⚡ QUICK UPDATE CHECKLIST:
□ Update job timeframes and current role (lines 103-165)
□ Add latest project metrics and achievements  
□ Include new technologies and skills learned (lines 185-226)
□ Update contact information and links (lines 11-29)
□ Review and improve achievement descriptions (lines 228-253)
□ Add any new certifications or education

===============================================================================
*/

import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Aman",
  lastName: "Surushe",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "aamansurushe@gmail.com",
  location: "Nagpur, Maharashtra, India", // Asia/Kolkata timezone
  languages: ["English", "Hindi", "Marathi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/AmanSurushe",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/aman-surushe/",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/aman_surushe",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building scalable enterprise solutions</>,
  featured: {
    display: false,
    title: <>Recent project: <strong className="ml-4">WhatsApp Campaign System</strong></>,
    href: "/work/whatsapp-campaign-system",
  },
  subline: (
    <>
      Software Engineer from Nagpur specializing in enterprise-grade systems and scalable microservices.
      <br /> Expert in building high-performance communication platforms and automation solutions.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction", 
    description: (
      <>
        Full-Stack Software Engineer with <strong>3+ years</strong> specializing in scalable enterprise systems. 
        Expert in Node.js microservices, React.js applications, and high-performance communication platforms. 
        Built and maintained systems processing <strong>1.2+ billion messages</strong> with 99.9% uptime.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Pinnacle Teleservices Pvt Ltd",
        timeframe: "Dec 2023 - Present",
        role: "Software Developer",
        achievements: [
          <>Engineered WhatsApp Connector processing <strong>2 million messages daily</strong> with 99.9% uptime, serving 1.2+ billion messages total.</>,
          <>Built scalable microservices architecture supporting WhatsApp communication channels and CRM integrations.</>,
          <>Integrated Prometheus and Grafana monitoring stack, reducing system downtime by <strong>40%</strong> and improving observability.</>,
          <>Optimized Asterisk-based voice systems for concurrent call handling, achieving <strong>95%+ connection rates</strong>.</>,
        ],
        images: [],
      },
      {
        company: "St. Vincent Pallotti College of Engineering & Technology",
        timeframe: "Nov 2022 - Dec 2023",
        role: "Software Developer",
        achievements: [
          <>Built comprehensive gate pass system with barcode scanning for <strong>5000+ students</strong>, reducing manual processing time by <strong>80%</strong>.</>,
          <>Developed automated faculty payroll system, streamlining remuneration processing by <strong>65%</strong> and eliminating manual calculations.</>,
          <>Created administrative workflow automation tools, saving <strong>15+ hours weekly</strong> across multiple departments.</>,
        ],
        images: [],
      },
      {
        company: "Oxybills Services India Pvt Ltd",
        timeframe: "May 2022 - Aug 2022",
        role: "Backend Developer Intern",
        achievements: [
          <>Implemented Redis caching layer and MVC architecture, improving API response times by <strong>50%</strong> for high-traffic endpoints.</>,
          <>Built robust third-party API integrations with comprehensive error handling, achieving <strong>99.5% success rate</strong> in data synchronization.</>,
          <>Optimized MySQL database queries and indexing strategies, reducing query execution time by <strong>30%</strong>.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Shri Ramdeobaba College of Engineering and Management, Nagpur",
        description: <>Master of Computer Applications (MCA) • 2020 - 2022</>,
      },
      {
        name: "Sant Gadge Baba Amravati University",
        description: <>Bachelor of Computer Applications (BCA) • 2016 - 2019</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical Expertise",
    skills: [], // Array<{ title: string, description: React.ReactNode, images: any[] }>
  },
  achievements: {
    display: true,
    title: "Key Achievements",
    highlights: [
      {
        title: "High-Scale Systems",
        metric: "1.2B+ Messages Processed",
        description: "Maintained communication systems serving millions of users with 99.9% uptime"
      },
      {
        title: "Performance Optimization",
        metric: "60% Efficiency Improvement", 
        description: "Delivered consistent performance improvements reducing processing times and costs"
      },
      {
        title: "Process Automation",
        metric: "80% Manual Work Reduction",
        description: "Built automation tools saving hundreds of hours weekly across organizations"
      },
      {
        title: "Enterprise Applications",
        metric: "10+ Production Systems",
        description: "Full-stack development of applications serving thousands of users"
      }
    ]
  }
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const repositories = {
  path: "/repositories",
  label: "Repositories",
  title: `GitHub Repositories – ${person.name}`,
  description: `Explore ${person.name}'s open source projects and GitHub repositories`,
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Get in touch with ${person.name}`,
};

const testimonials = {
  path: "/testimonials",
  label: "Testimonials", 
  title: `Testimonials – ${person.name}`,
  description: `Client testimonials and recommendations for ${person.name}`,
};

const demos = {
  path: "/demos",
  label: "Demos",
  title: `Interactive Demos – ${person.name}`,
  description: `Interactive project demonstrations and live previews by ${person.name}`,
};

export { person, social, newsletter, home, about, blog, work, gallery, repositories, contact, testimonials, demos };
