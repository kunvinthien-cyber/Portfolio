<script setup>
import Homepage from '@/components/Page/Homepage.vue'
import AboutPage from '@/components/Page/AboutPage.vue'
import EducationPage from '@/components/Page/EducationPage.vue'
import SkillsPage from '@/components/Page/SkillsPage.vue'
import ExperiencePage from '@/components/Page/ExperiencePage.vue'
import ProjectPage from '@/components/Page/ProjectPage.vue'
import ContactPage from '@/components/Page/ContactPage.vue'

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'Vue.js',
  'Tailwind CSS',
  'Git',
  'Node.js',
  'Express.js',
  'MongoDB',
]
</script>

<template>
  <div
    class="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-x-hidden"
  >
    <!-- NAVBAR -->
    <div
      class="menu-bar fixed top-0 left-0 w-full z-50 bg-zinc-900 py-2 shadow-md"
    >
      <Homepage class="w-full" />
    </div>

    <!-- BODY -->
    <div class="pt-24 w-full flex flex-col">

      <!-- HERO SECTION -->
      <div
        class="body-page w-full flex flex-col-reverse md:grid md:grid-cols-2 justify-center gap-6 md:gap-10 px-4 md:px-8"
      >
        <!-- LEFT -->
        <div class="left w-full flex flex-col justify-center items-center md:items-start">
          <div class="w-full max-w-lg rounded-3xl text-white px-5 py-4">

            <!-- Badge -->
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-circle text-red-500 text-[10px]"></i>
              <h3 class="text-blue-600 text-[15px] font-bold">
                Available now for work
              </h3>
            </div>

            <!-- Text -->
            <div class="mt-2 flex flex-col gap-2">

              <div class="text-center md:text-left">
                <h1 class="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Hello, I'm Kun Vinthien
                </h1>
                <h1 class="text-white text-lg sm:text-xl">Web Developer</h1>
              </div>

              <p
                class="text-white text-sm sm:text-base lg:text-lg leading-relaxed text-center md:text-left"
              >
                I am a web developer with experience in building responsive and user-friendly
                websites. I have a strong background in HTML, CSS, JavaScript, and Vue.js.
                I am passionate about creating beautiful and functional web applications.
              </p>

              <!-- Buttons -->
              <div class="flex justify-center md:justify-start mt-6 gap-3 flex-wrap">
              <a href="#contact " class="px-5 py-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-600 transition relative z-10">
                  Contact Me
                </a>

                <a
  href="https://github.com/kunvinthien-cyber?tab=overview&from=2026-04-01&to=2026-04-30"
  target="_blank"
  class="relative z-50 px-5 py-2 rounded-3xl bg-red-500 text-white"
>
  GitHub
</a>
              </div>

            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="right w-full flex justify-center items-center">
          <img
            src="@/assets/IMG/image.png"
            class="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] object-cover rounded-full shadow-lg"
          />
        </div>
      </div>

      <!-- SKILLS SCROLL -->
      <div class="w-full flex justify-center mt-12 px-4">
        <div
          class="w-full max-w-6xl bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-800"
        >
          <div class="relative overflow-hidden">
            <div class="flex w-max animate-scroll gap-4">

              <div
                v-for="(skill, index) in skills"
                :key="'a' + index"
                class="px-5 py-3 rounded-2xl bg-gray-800/80 border border-gray-700 hover:bg-blue-600 transition flex-shrink-0"
              >
                <h3 class="text-white font-semibold">
                  {{ skill }}
                </h3>
              </div>

              <div
                v-for="(skill, index) in skills"
                :key="'b' + index"
                class="px-5 py-3 rounded-2xl bg-gray-800/80 border border-gray-700 hover:bg-blue-600 transition flex-shrink-0"
              >
                <h3 class="text-white font-semibold">
                  {{ skill }}
                </h3>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- SECTIONS -->
      <section class="w-full py-16" id="about">
        <AboutPage />
      </section>

      <section class="w-full py-16" id="education">
        <EducationPage />
      </section>

      <section class="w-full py-16" id="skills">
        <SkillsPage />
      </section>

      <section class="w-full py-16" id="experience">
        <ExperiencePage />
      </section>

      <section class="w-full py-16" id="projects">
        <ProjectPage />
      </section>

      <section class="w-full py-16" id="contact">
        <ContactPage />
      </section>

    </div>
  </div>
</template>

<style scoped>
.animate-scroll {
  display: flex;
  width: max-content;
  animation: scroll 18s linear infinite;
  will-change: transform;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

html {
  scroll-behavior: smooth;
}
</style>