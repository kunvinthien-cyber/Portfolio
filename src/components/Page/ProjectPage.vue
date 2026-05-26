<script setup>
import { ref } from 'vue'
const expanded = ref(null)

const toggle = (index) => {
  expanded.value = expanded.value === index ? null : index
}
const projects = [
   {
    name: 'E-commerce Website',
    img: new URL('@/assets/IMG/e-com.jpg', import.meta.url).href,
    skills: ['Vue.js', 'Node.js', 'MongoDB'],
    link: 'https://nuxt-profile-gamma.vercel.app',
    description:
      'A responsive e-commerce website built with Vue.js, Node.js, and MongoDB. It features authentication, product management, shopping cart, payment system, admin dashboard and modern UI design.'
  },
  {
    name: 'Personal Portfolio',
    img: new URL('@/assets/IMG/product.jpg', import.meta.url).href,
    skills: ['Vue.js', 'Tailwind CSS'],
    link: 'https://github.com/robertoferreira/personal-portfolio',
     description:
      'A responsive e-commerce website built with Vue.js, Node.js, and MongoDB. It features authentication, product management, shopping cart, payment system, admin dashboard and modern UI design.'
  },
  {
    name: 'Blog Platform',
    img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
    skills: ['Vue.js', 'Express.js'],
    link: 'https://github.com/robertoferreira/blog-platform',
    description:
      'A responsive e-commerce website built with Vue.js, Node.js, and MongoDB. It features authentication, product management, shopping cart, payment system, admin dashboard and modern UI design.'
  },
  {
    name: 'Blog Platform 2',
    img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
    skills: ['Vue.js', 'Express.js'],
    link: 'https://github.com/robertoferreira/blog-platform',
    description:
      'A responsive e-commerce website built with Vue.js, Node.js, and MongoDB. It features authentication, product management, shopping cart, payment system, admin dashboard and modern UI design.'
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
        <h1 class="text-3xl md:text-4xl font-bold text-white">
          Featured Work
        </h1>
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
<div class="description grid grid-cols-[70%_auto] items-end gap-2 mb-4 ">
            <p
  class="text-gray-400 text-sm leading-relaxed transition-all duration-300"
  :class="expanded === index ? '' : 'line-clamp-3'"
>
  {{ project.description }}
</p>

<button
  @click="toggle(index)"
  class="text-blue-400 text-[10px] mt-2 hover:underline"
>
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
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
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