<script setup>
import { ref } from 'vue'
const activeIndex = ref(0)

const educations = [
  {
    year: '2021 - 2024',
    school: 'Royal University of Phnom Penh',
    degree: 'Bachelor of Science in Computer Science',
    description:
      'Studied software engineering, web development, databases, Linux systems, networking, and programming. Built practical projects and strengthened problem-solving skills.'
  },
  {
    year: '2018 - 2021',
    school: 'High School',
    degree: 'General Education',
    description:
      'Focused on mathematics, science, and technology fundamentals while developing analytical and communication skills.'
  }
]
</script>

<template>
  <div class="w-full flex justify-center items-center px-4 py-10">
    <div class="w-full max-w-4xl mx-auto bg-zinc-800 text-white px-5 sm:px-8 py-6 rounded-3xl shadow-xl">

      <!-- Header -->
      <div class="flex justify-center items-center mb-8">
        <div class="text-center">
          <h1 class="text-white text-3xl sm:text-4xl font-bold">Education</h1>
          <div class="w-40 h-1 bg-cyan-400 rounded-full mx-auto mt-2"></div>
        </div>
      </div>

      <!-- Education List -->
      <div class="space-y-6">
        <div
          v-for="(item, index) in educations"
          :key="index"
          class="flex flex-col sm:grid sm:grid-cols-[160px_1fr] gap-3 sm:gap-6 items-start"
          @click="activeIndex = index"
          @pointermove="activeIndex = index"
        >
          <!-- Year -->
          <div class="cursor-pointer pt-1">
            <h2
              class="text-base sm:text-lg font-bold transition-all duration-500"
              :class="activeIndex === index ? 'text-cyan-400' : 'text-zinc-400'"
            >
              {{ item.year }}
            </h2>
          </div>

          <!-- Content Card -->
          <div
            class="relative w-full px-5 sm:px-8 py-6 rounded-xl border-l-4 border-b-2 transition-all duration-700 cursor-pointer"
            :class="activeIndex === index ? 'active-card' : 'border-white/20'"
          >
            <h2 class="text-lg sm:text-2xl font-bold text-white mb-1">
              {{ item.school }}
            </h2>
            <p class="text-cyan-300 text-sm sm:text-base mb-3">
              {{ item.degree }}
            </p>
            <p class="text-gray-300 text-sm sm:text-base leading-7">
              {{ item.description }}
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.active-card {
  animation: borderFlow 3s linear infinite;
  background: rgba(255, 255, 255, 0.03);
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