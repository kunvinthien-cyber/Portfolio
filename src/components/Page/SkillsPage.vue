<script setup>
import { ref } from 'vue'
const activeIndex = ref(0)

const skills = [
  {
    name: 'HTML',
    icon: 'fa-brands fa-html5',
    color: 'text-orange-400',
    rating: 100,
    description: 'Proficient in HTML5, creating semantic and accessible web structures with a focus on responsive design and cross-browser compatibility.'
  },
  {
    name: 'CSS',
    icon: 'fa-brands fa-css3-alt',
    color: 'text-blue-400',
    rating: 80,
    description: 'Skilled in CSS3, creating visually appealing and responsive designs with a focus on modern styling techniques and browser compatibility.'
  },
  {
    name: 'JavaScript',
    icon: 'fa-brands fa-js',
    color: 'text-yellow-400',
    rating: 80,
    description: 'Skilled in JavaScript, building interactive and dynamic web applications with a focus on modern ES6+ features and best practices.'
  },
  {
    name: 'Vue.js',
    icon: 'fa-brands fa-vuejs',
    color: 'text-green-400',
    rating: 90,
    description: 'Proficient in Vue.js, creating maintainable and scalable single-page applications with a focus on component-based architecture.'
  },
  {
    name: 'Tailwind CSS',
    icon: 'fa-solid fa-wind',
    color: 'text-cyan-400',
    rating: 80,
    description: 'Experienced in Tailwind CSS, creating responsive and maintainable UI components with a focus on utility-first styling.'
  },
  {
    name: 'Git',
    icon: 'fa-brands fa-git-alt',
    color: 'text-red-400',
    rating: 100,
    description: 'Proficient in Git, managing version control and collaborating effectively with team members.'
  },
  {
    name: 'Node.js',
    icon: 'fa-brands fa-node-js',
    color: 'text-green-500',
    rating: 80,
    description: 'Skilled in Node.js, building server-side applications and APIs with a focus on performance and scalability.'
  },
  {
    name: 'Express.js',
    icon: 'fa-solid fa-server',
    color: 'text-zinc-300',
    rating: 80,
    description: 'Proficient in Express.js, creating robust and scalable web applications and APIs.'
  },
  {
    name: 'MongoDB',
    icon: 'fa-solid fa-database',
    color: 'text-green-400',
    rating: 90,
    description: 'Proficient in MongoDB, designing and implementing NoSQL database solutions with a focus on performance and scalability.'
  },
]
</script>

<template>
  <div class="w-full flex justify-center items-center px-4 py-10">
    <div class="w-full max-w-6xl mx-auto bg-zinc-800 text-white px-5 sm:px-8 py-8 rounded-3xl shadow-xl">

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">Skills</h1>
        <div class="w-16 h-1 bg-cyan-400 rounded-full mx-auto mt-2"></div>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          @pointermove="activeIndex = index"
          class="skill-card flex flex-col gap-3 bg-zinc-700 p-5 sm:p-6 rounded-2xl border-l-4 border-b-2 transition-all duration-300 cursor-default"
          :class="activeIndex === index ? 'active-card' : 'border-white/10'"
        >
          <!-- Icon + Name -->
          <div class="flex items-center gap-3">
            <i :class="[skill.icon, skill.color]" class="text-2xl sm:text-3xl"></i>
            <h2 class="text-lg sm:text-xl font-bold text-white">{{ skill.name }}</h2>
          </div>

          <!-- Description -->
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed flex-1">
            {{ skill.description }}
          </p>

          <!-- Progress Bar -->
          <div>
            <div class="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Proficiency</span>
              <span>{{ skill.rating }}%</span>
            </div>
            <div class="h-2 bg-zinc-600 rounded-full overflow-hidden">
              <div
                class="h-full bg-cyan-400 rounded-full transition-all duration-700"
                :style="{ width: skill.rating + '%' }"
              ></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.active-card {
  animation: borderFlow 3s linear infinite;
  background: rgba(255, 255, 255, 0.05);
}

@keyframes borderFlow {
  0% {
    border-left-color: #06b6d4;
    border-bottom-color: #06b6d4;
    box-shadow: 0 0 10px #06b6d4;
  }
  33% {
    border-left-color: #8b5cf6;
    border-bottom-color: #8b5cf6;
    box-shadow: 0 0 15px #8b5cf6;
  }
  66% {
    border-left-color: #ec4899;
    border-bottom-color: #ec4899;
    box-shadow: 0 0 15px #ec4899;
  }
  100% {
    border-left-color: #06b6d4;
    border-bottom-color: #06b6d4;
    box-shadow: 0 0 10px #06b6d4;
  }
}
</style>