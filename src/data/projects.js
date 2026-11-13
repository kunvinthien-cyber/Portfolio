import khMaketPreview from '@/assets/IMG/khmaket-preview.png'
import posPreview from '@/assets/IMG/image copy.png'
import portfolioPreview from '@/assets/IMG/portfolio-preview.png'

export const projects = [
  {
    name: 'KhMaket',
    preview: khMaketPreview,
    visual: 'commerce',
    icon: 'fa-bag-shopping',
    skills: ['Vue.js', 'Laravel', 'MySQL', 'Tailwind CSS'],
    link: 'https://khmaket.vercel.app',
    repo: 'https://github.com/kunvinthien-cyber/smart-khmer-frontend',
    description:
      'KhMaket is a responsive e-commerce website focused on a clean storefront, product browsing, and product presentation using Vue.js and Laravel.',
  },
  {
    name: 'Khmer POS System',
    preview: posPreview,
    visual: 'pos',
    icon: 'fa-cash-register',
    skills: ['Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
    link: 'https://pos-system-l7b1.onrender.com',
    repo: 'https://github.com/kunvinthien-cyber/POS-SYSTEM',
    status: 'In progress',
    description:
      'Khmer POS System helps a business manage sales, inventory, and customer records in a simple and practical way using Laravel and MySQL.',
  },
  {
    name: 'ChillStudy Cambodia',
    preview: null,
    visual: 'study',
    icon: 'fa-book-open',
    skills: ['Vue.js', 'Tailwind CSS'],
    link: 'https://chill-study-cam-pro.vercel.app',
    repo: 'https://github.com/kunvinthien-cyber/ChillStudyCam_Pro',
    status: 'Coming soon',
    description:
      'ChillStudy Cambodia is a study-focused platform designed to support learning resources and a simple collaborative user experience for students.',
  },
  {
    name: 'Personal Portfolio',
    preview: portfolioPreview,
    visual: 'portfolio',
    icon: 'fa-laptop-code',
    skills: ['Vue.js', 'Tailwind CSS', 'Vite'],
    link: 'https://thienweb.vercel.app',
    repo: 'https://github.com/kunvinthien-cyber/Portfolio',
    description:
      'This personal portfolio presents my profile, skills, and projects in a modern, professional layout focused on clarity and usability.',
  },
]
