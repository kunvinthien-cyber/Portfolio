import posPreview from '@/assets/IMG/shoping.jpg'

export const projects = [
  {
    name: 'Personal Portfolio',
    preview: null,
    visual: 'portfolio',
    icon: 'fa-laptop-code',
    skills: ['Vue.js', 'Tailwind CSS'],
    link: 'https://thienweb.vercel.app',
    description:
      'This details my personal portfolio website, built with Vue.js and Tailwind CSS. It showcases my skills, projects, and experience as a web developer. The site features a modern design, smooth animations, and responsive layouts for an optimal user experience.',
  },
  {
    name: 'E-commerce Website',
    preview: null,
    visual: 'commerce',
    icon: 'fa-bag-shopping',
    skills: ['Vue.js', 'Laravel', 'Tailwind CSS'],
    link: 'https://smart-khmer-frontend.vercel.app',
    status: 'In progress',
    description:
      'This is a responsive e-commerce website built with Vue.js, Laravel, and Tailwind CSS. It features a modern UI design, product catalog, shopping cart, and checkout functionality. but it not ready 100% yet.',
  },
  {
    name: 'POS System',
    preview: posPreview,
    visual: 'pos',
    icon: 'fa-cash-register',
    skills: ['Laravel', 'MySQL', 'Tailwind CSS'],
    link: 'https://pos-system-l7b1.onrender.com',
    status: 'In progress',
    description:
      'This Project is a Point of Sale (POS) system built with Laravel and MySQL. It allows businesses to manage sales, inventory, and customer data efficiently. The system features a user-friendly interface and robust functionality for seamless operations. but it not to deploy yet.',
  },
  {
    name: 'Team Assignment Project',
    preview: null,
    visual: 'team',
    icon: 'fa-people-group',
    skills: ['Nuxt.js', 'Supabase', 'Tailwind CSS'],
    link: 'https://nuxt-profile-gamma.vercel.app',
    description:
      'This project is a collaborative team assignment built with Nuxt.js and Express.js. It showcases our ability to work together, implement features, and deliver a functional web application.',
  },
  {
    name: 'ChillStudy (Coming Soon)',
    preview: null,
    visual: 'study',
    icon: 'fa-book-open',
    skills: ['Nuxt.js', 'Supabase', 'Tailwind CSS'],
    link: 'https://nuxt-profile-gamma.vercel.app',
    status: 'Coming soon',
    description:
      'This project is a collaborative team assignment built with Nuxt.js and Express.js. It showcases our ability to work together, implement features, and deliver a functional web application.',
  },
]
