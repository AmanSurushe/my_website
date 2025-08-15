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
  location: "Asia/Kolkata", // Nagpur, Maharashtra, India
  languages: ["English", "Hindi", "Marathi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
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
  headline: <>Building scalable solutions with Node.js & React</>,
  featured: {
    display: false,
    title: <>Recent project: <strong className="ml-4">WhatsApp Campaign System</strong></>,
    href: "/work/whatsapp-campaign-system",
  },
  subline: (
    <>
      I'm Aman, a Full-Stack Software Engineer with nearly 3 years of experience crafting robust 
      <br /> backend systems and intuitive frontend experiences. I specialize in high-performance solutions.
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
        Aman is a Nagpur-based Software Engineer with nearly 3 years of hands-on experience crafting robust and scalable solutions. 
        He specializes in building high-performance backend systems with Node.js and creating intuitive frontend experiences with React.js. 
        His expertise extends to real-time communication technologies like Asterisk, and he has a proven track record of developing and 
        managing large-scale systems that handle over 1.2 billion messages.
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
          <>
            Supported high-performance voice campaigns and managed daily WhatsApp campaigns 
            processing 20 lakh messages/day, handling 120+ crore messages to date.
          </>,
          <>
            Developed scalable CRM middleware and integrated real-time monitoring using 
            Prometheus and Grafana for performance tracking.
          </>,
        ],
        images: [],
      },
      {
        company: "St. Vincent Pallotti College of Engineering & Technology",
        timeframe: "Nov 2022 - Dec 2023",
        role: "Software Developer",
        achievements: [
          <>
            Streamlined gate pass generation and tracking through barcode-based systems,
            improving campus security and operational efficiency.
          </>,
          <>
            Developed applications like Remuneration and Barcode Gate Pass Systems,
            automating internal processes for better campus management.
          </>,
        ],
        images: [],
      },
      {
        company: "Oxybills Services India Pvt Ltd",
        timeframe: "May 2022 - Aug 2022",
        role: "Backend Developer Intern",
        achievements: [
          <>
            Developed backend services using MVC Architecture and Redis, enhancing system 
            integration and data processing for improved data flow and system efficiency.
          </>,
          <>
            Optimized database performance using Prometheus and ensured smooth third-party 
            system integration, leading to faster data retrieval and reduced downtime.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Node.js & Backend Development",
        description: <>Building robust backend systems with Node.js, TypeScript, Redis, and database optimization for high-performance applications.</>,
        images: [],
      },
      {
        title: "React.js & Frontend Development",
        description: <>Creating intuitive and responsive user interfaces with React.js, ensuring seamless integration with backend systems.</>,
        images: [],
      },
      {
        title: "Real-time Communication & Asterisk",
        description: <>Expertise in voice solutions using Asterisk, SIP, PRI integration, and real-time monitoring systems with Prometheus and Grafana.</>,
        images: [],
      },
      {
        title: "Database & DevOps",
        description: <>Managing MySQL and MongoDB databases, implementing Redis caching, and Git-based deployment workflows for scalable systems.</>,
        images: [],
      },
    ],
  },
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

export { person, social, newsletter, home, about, blog, work, gallery, repositories, contact };
