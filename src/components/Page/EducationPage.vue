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
  <div class="about-page w-screen flex justify-center items-center">
    <div class="about-contener w-[80%] mx-auto bg-zinc-600 text-white px-5 py-5 rounded-3xl">
      <div class="head-text flex justify-center items-center mb-4">
        <h1 class="text-white text-2xl font-bold items-center mb-4">Education</h1>
      </div>
      <div class="space-y-8">
    <div
      v-for="(item, index) in educations"
      :key="index"
      class="grid grid-cols-[200px_auto] gap-4 items-center"
    >
      <!-- Year -->
      <div
        class="cursor-pointer"
        @click="activeIndex = index"
        @pointermove="activeIndex = index"
      >
        <h2
          class="text-lg font-bold transition-all duration-500"
          
          :class="
            activeIndex === index
              ? 'text-cyan-400'
              : 'text-white'
          "
        >
          {{ item.year }}
        </h2>
      </div>

      <!-- Content -->
      <div
        class="relative px-8 py-8 rounded-xl border-l-4 border-b-2 transition-all duration-700"
        :class="
          activeIndex === index
            ? 'active-card'
            : 'border-white/30'
        "
      >
        <h2 class="text-2xl font-bold text-white mb-2">
          {{ item.school }}
        </h2>

        <p class="text-cyan-300 mb-3">
          {{ item.degree }}
        </p>

        <p class="text-gray-300 leading-7">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<style scoped>
.education-card {
  border-left-color: rgba(255,255,255,0.2);
  border-bottom-color: rgba(255,255,255,0.2);
}

/* Hover Effect */
.group:hover .education-card {
  animation: borderFlow 3s linear infinite;
}

/* Click Active Effect */
.active-card {
  animation: borderFlow 3s linear infinite;
  background: rgba(255,255,255,0.03);
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