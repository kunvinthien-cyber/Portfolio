<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const expanded = ref(null)

const toggle = (index) => {
  expanded.value = expanded.value === index ? null : index
}
const projects = [
  {
    name: 'Personal Portfolio',
    img: new URL('@/assets/IMG/product.jpg', import.meta.url).href,
    skills: ['Vue.js', 'Tailwind CSS'],
    link: 'https://thienweb.vercel.app',
    description:
      'This details my personal portfolio website, built with Vue.js and Tailwind CSS. It showcases my skills, projects, and experience as a web developer. The site features a modern design, smooth animations, and responsive layouts for an optimal user experience.',
  },
  {
    name: 'E-commerce Website',
    img: new URL('@/assets/IMG/e-com.jpg', import.meta.url).href,
    skills: ['Vue.js', 'Laravel', 'Tailwind CSS'],
    link: 'https://smart-khmer-frontend.vercel.app',
    description:
      'This is a responsive e-commerce website built with Vue.js, Laravel, and Tailwind CSS. It features a modern UI design, product catalog, shopping cart, and checkout functionality. but it not ready 100% yet.',
  },
  {
    name: 'POS System',
    img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
    skills: ['Laravel', 'MySQL', 'Tailwind CSS'],
    link: 'https://pos-system-l7b1.onrender.com',
    description:
      'This Project is a Point of Sale (POS) system built with Laravel and MySQL. It allows businesses to manage sales, inventory, and customer data efficiently. The system features a user-friendly interface and robust functionality for seamless operations. but it not to deploy yet.',
    
  },
  {
    name: 'Team Assignment Project',
    img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
    skills: ['Nuxt.js', 'Supabase', 'Tailwind CSS'],
    link: 'https://nuxt-profile-gamma.vercel.app',
    description:
      'This project is a collaborative team assignment built with Nuxt.js and Express.js. It showcases our ability to work together, implement features, and deliver a functional web application.',
  },
]
</script>

<template>
  <div class="w-full flex justify-center px-4 py-14">
    <div
      class="w-full max-w-7xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black rounded-3xl p-6 md:p-10 shadow-2xl"
    >
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-white">Featured Work</h1>
        <p class="text-gray-400 mt-3 text-sm md:text-base">
          Projects I've built using Vue.js, Node.js, and modern web tools
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="group bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
        >
          <!-- Image -->
          <div class="overflow-hidden">
            <img
              :src="project.img"
              :alt="project.name"
              class="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <!-- Content -->
          <div class="p-5">
            <h2 class="text-xl font-bold text-white mb-2">
              {{ project.name }}
            </h2>
            <div class="description grid grid-cols-[70%_auto] items-end gap-2 mb-4">
              <p
                class="text-gray-400 text-sm leading-relaxed transition-all duration-300"
                :class="expanded === index ? '' : 'line-clamp-3'"
              >
                {{ project.description }}
              </p>

              <button @click="toggle(index)" class="text-blue-400 text-[10px] mt-2 hover:underline">
                {{ expanded === index ? 'Show Less' : 'See More...' }}
              </button>
            </div>
            <!-- Skills -->
            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="(skill, i) in project.skills"
                :key="i"
                class="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {{ skill }}
              </span>
            </div>

            <!-- Button -->
            <a
              :href="project.link"
              target="_blank"
              class="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition relative z-10"
            >
              View Project
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* optional extra polish */
</style>
