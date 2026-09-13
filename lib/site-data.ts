// Put your resume PDF in the `public/` folder (e.g. public/resume.pdf) so it can be served by Next.js.
// Replace this path or place the file at public/resume.pdf.
export const resumeUrl = '/resume.pdf';

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'DSA', href: '#dsa' },
  { label: 'Contact', href: '#contact' }
];

export const floatingBadges = ['Java', 'Spring Boot', 'Docker', 'MySQL', 'REST APIs'];

export const aboutPoints = [
  'Backend developer building reliable products with Java and Spring Boot.',
  'Strong in scalable APIs, authentication, and database design.',
  'Passionate about DSA, system design, and performance-focused engineering.'
];

export const educationTimeline = [
  {
    period: '2023-2027',
    title: 'Technocrats Institute of Technology',
    subtitle: 'B.Tech CSE (AI) · Bhopal, Madhya Pradesh'
  },
  {
    period: '2021 — 2022',
    title: 'Ravindra Higher Secondary School',
    subtitle: 'Class XII · Science Stream'
  },
  {
    period: '2019 — 2020',
    title: 'Ravindra Higher Secondary School',
    subtitle: 'Class X · Secondary Education'
  }
];

export const skills = [
  {
    title: 'Programming',
    items: ['Java', 'JavaScript', 'C++']
  },
  {
    title: 'Backend',
    items: ['Spring Boot', 'Spring Security', 'REST APIs', 'WebSocket', 'Hibernate', 'Spring Data JPA']
  },
  {
    title: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'MongoDB']
  },
  {
    title: 'DevOps & Cloud',
    items: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions', 'CI/CD', 'Vercel', 'DigitalOcean']
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code']
  }
];

export const projects = [
  {
    name: 'Code Engine',
    description:
      'A full-stack coding platform with multi-language execution, Docker-isolated runtime, and real-time output visualization.',
    highlights: [
      'Multi-language code execution platform',
      'Docker isolated runtime environments',
      'Spring Boot backend services',
      'React frontend with live output streaming'
    ],
    tags: ['Java', 'Spring Boot', 'React', 'Docker'],
    accent: 'from-indigo-500/30 via-cyan-400/10 to-fuchsia-500/10',
    url: 'https://github.com/pranshu029/CodeEngineBackend'
  },
  {
    name: 'Connecto Backend',
    description:
      'A backend for community-driven interactions, user profiles, and connection-based features built with scalable Spring Boot services.',
    highlights: [
      'Secure user authentication and profile APIs',
      'Connection and social interaction flows',
      'MySQL-backed data modeling and persistence',
      'Clean REST architecture for a growing product'
    ],
    tags: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    accent: 'from-emerald-500/30 via-teal-400/10 to-cyan-500/10',
    url: 'https://github.com/pranshu029/connectoBackend'
  },
  {
    name: 'Qora Backend',
    description:
      'A scalable backend architecture with JWT authentication, role-based access control, and resilient exception handling.',
    highlights: [
      'JWT authentication and secure authorization',
      'Role-based access control design',
      'MySQL persistence with JPA/Hibernate',
      'REST APIs with global exception handling'
    ],
    tags: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    accent: 'from-cyan-400/25 via-slate-400/10 to-violet-500/10',
    url: 'https://github.com/pranshu029/QuoraBackend'
  },
  {
    name: 'OTP Verification',
    description:
      'A secure OTP verification flow using Gmail SMTP, JavaMailSender, and a lightweight frontend for email-based authentication.',
    highlights: [
      'OTP generation, expiry, and one-time use logic',
      'Gmail SMTP email delivery with JavaMailSender',
      'REST APIs for verify and resend flows',
      'Simple HTML/CSS/JS client for demo usage'
    ],
    tags: ['Java', 'Spring Boot', 'SMTP', 'REST APIs'],
    accent: 'from-amber-500/25 via-orange-400/10 to-pink-500/10',
    url: 'https://github.com/pranshu029/otp-verification-project'
  }
];

export const dsaPlatforms = [
  { name: 'LeetCode', subtitle: 'Arrays · Trees · DP · Graphs', tone: 'from-amber-400/30 to-orange-500/10' },
  { name: 'GeeksforGeeks', subtitle: 'Algorithms · Data Structures · Coding', tone: 'from-emerald-400/25 to-green-500/10' },
  { name: 'CodeChef', subtitle: 'Contests · Challenges · Practice', tone: 'from-violet-400/25 to-indigo-500/10' }
];

export const achievements = [
  {
    title: 'DSA',
    description: 'Strong grasp of arrays, trees, graphs, dynamic programming, and greedy patterns.',
    span: 2
  },
  {
    title: 'OOPs',
    description: 'SOLID principles, design patterns, and clean object-oriented architecture.',
    span: 1
  },
  {
    title: 'DBMS',
    description: 'Schema design, normalization, indexing, and query optimization.',
    span: 1
  },
  {
    title: 'Backend Development',
    description: 'Designing secure services, service boundaries, and maintainable backend flows.',
    span: 1
  },
  {
    title: 'REST APIs',
    description: 'Versioned APIs, status codes, validation, error handling, and documentation.',
    span: 1
  },
  {
    title: 'System Design',
    description: 'Scalability, caching, load balancing, and resilient distributed architectures.',
    span: 2
  }
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/pranshu029', handle: '@pranshu029' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranshu-dwivedi-4275593ab?utm_source=share_via&utm_content=profile&utm_medium=member_android', handle: 'Pranshu Dwivedi' },
  { label: 'Email', href: 'mailto:pranshud2005@gmail.com', handle: 'pranshud2005@gmail.com' }
];
