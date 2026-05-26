<script setup>
const experiences = [
  {
    role: 'Frontend Developer',
    company: 'Freelance / Personal Projects',
    period: '2023 - Present',
    type: 'Full-time',
    location: 'Phnom Penh, Cambodia',
    description:
      'Designed and developed multiple responsive web applications using Vue.js and Tailwind CSS. Focused on clean UI, performance optimization, and delivering great user experiences across all devices.',
    tags: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'REST API'],
    icon: 'fa-solid fa-laptop-code',
    color: 'text-cyan-400',
    active: true
  },
  {
    role: 'Backend Developer',
    company: 'Academic & Team Projects',
    period: '2022 - 2023',
    type: 'Part-time',
    location: 'Phnom Penh, Cambodia',
    description:
      'Built RESTful APIs and server-side logic using Node.js and Express.js. Integrated MongoDB databases and managed authentication systems for web applications developed during university coursework.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    icon: 'fa-solid fa-server',
    color: 'text-purple-400',
    active: false
  },
  {
    role: 'Web Development Intern',
    company: 'University Lab Projects',
    period: '2021 - 2022',
    type: 'Internship',
    location: 'Phnom Penh, Cambodia',
    description:
      'Collaborated with peers on web development projects. Gained hands-on experience in HTML, CSS, JavaScript, and version control using Git. Contributed to the front-end of a student management system.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Git'],
    icon: 'fa-solid fa-code',
    color: 'text-green-400',
    active: false
  }
]
</script>

<template>
  <div class="w-full flex justify-center items-center px-4 py-10">
    <div class="w-full max-w-4xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">Experience</h1>
        <div class="w-16 h-1 bg-cyan-400 rounded-full mx-auto mt-2"></div>
        <p class="text-zinc-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
          A timeline of my professional journey, projects, and growth as a developer.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">

        <!-- Vertical line (hidden on mobile) -->
        <div class="hidden sm:block absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-700"></div>

        <div class="flex flex-col gap-8">
          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="relative flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <!-- Timeline dot -->
            <div class="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-600 items-center justify-center z-10">
              <i :class="[exp.icon, exp.color]" class="text-lg"></i>
            </div>

            <!-- Card -->
            <div class="flex-1 bg-zinc-800 rounded-2xl px-5 sm:px-7 py-5 shadow-lg border border-zinc-700 hover:border-cyan-500/40 transition-all duration-300 group">

              <!-- Top Row -->
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <!-- Mobile icon -->
                    <i :class="[exp.icon, exp.color]" class="sm:hidden text-lg"></i>
                    <h2 class="text-white text-lg sm:text-xl font-bold">{{ exp.role }}</h2>
                    <span
                      v-if="exp.active"
                      class="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-medium"
                    >
                      Active
                    </span>
                  </div>
                  <p class="text-cyan-400 font-medium text-sm sm:text-base">{{ exp.company }}</p>
                </div>

                <!-- Period + Type badge -->
                <div class="flex flex-row sm:flex-col items-start sm:items-end gap-2">
                  <span class="text-zinc-400 text-xs sm:text-sm whitespace-nowrap">
                    <i class="fa-regular fa-calendar mr-1"></i>{{ exp.period }}
                  </span>
                  <span class="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full">
                    {{ exp.type }}
                  </span>
                </div>
              </div>

              <!-- Location -->
              <p class="text-zinc-500 text-xs mb-3">
                <i class="fa-solid fa-location-dot mr-1"></i>{{ exp.location }}
              </p>

              <!-- Description -->
              <p class="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
                {{ exp.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in exp.tags"
                  :key="tag"
                  class="text-xs bg-zinc-700 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 text-zinc-300 border border-zinc-600 group-hover:border-cyan-500/30 px-3 py-1 rounded-full transition-all duration-300"
                >
                  {{ tag }}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>