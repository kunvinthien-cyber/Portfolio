<script setup>
import Homepage from '@/components/Page/Homepage.vue'
import AboutPage from '@/components/Page/AboutPage.vue'
import EducationPage from '@/components/Page/EducationPage.vue'
import SkillsPage from '@/components/Page/SkillsPage.vue'
import ExperiencePage from '@/components/Page/ExperiencePage.vue'
import ProjectPage from '@/components/Page/ProjectPage.vue'
import ConnectPage from '@/components/Page/ConnectPage.vue'
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
  <div class="all bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
  <!-- top bar -->
  <div class="menu-bar fixed top-0 left-0 w-screen z-50 bg-zinc-900 py-2">
    <Homepage />
  </div>

  <!-- body page -->
  <div class="body-page w-screen grid grid-cols-2 justify-center mt-22 gap-10">
    <div class="left w-full flex flex-col justify-center items-center mx-5">
      <div class="left-contener mx-auto bg-black-300 rounded-3xl text-white px-5 py-4">
        <div class="avable flex items-center gap-2">
          <i class="fa-solid fa-circle text-red-500 text-[10px]"></i>
          <h3 class="text-blue-600 text-[15px] font-bold">Avable now for work</h3>
        </div>
        <div class="descrip mt-2 flex flex-col gap-2">
          <div class="des-head">
            <h1 class="text-white text-2xl font-bold">Hello, I'm Kun Vinthien</h1>
            <h1 class="text-white text-lg">Web Developer</h1>
          </div>
          <div class="des-body">
            <p class="text-white text-lg">
              I am a web developer with experience in building responsive and user-friendly
              websites. I have a strong background in HTML, CSS, JavaScript, and Vue.js. I am
              passionate about creating beautiful and functional web applications that provide a
              great user experience.
            </p>
          </div>
        </div>
      </div>
      <div class="btn flex mt-6 gap-2">
        <button class="text-white px-4 py-2 rounded-3xl bg-blue-500 hover:bg-blue-600">
          Contact Me
        </button>
        <button class="text-white px-4 py-2 rounded-3xl bg-red-400 hover:bg-red-600 ml-4">
          <a href="https://github.com/robertoferreira/ecommerce-frontend" target="_blank">
            View GitHub</a
          >
        </button>
      </div>
    </div>
    <div class="right w-full flex flex-col justify-center items-center mx-5">
      <div class="img">
        <img
          src="@/assets/IMG/image.png"
          alt="avable"
          class="w-[400px] h-[400px] object-cover rounded-full"
        />
      </div>
    </div>
  </div>
  <!-- menu of skill -->
  <div class="menu-skill w-screen flex justify-center items-center mt-15">
    <div class="menu-skill-contener w-[80%] mx-auto bg-zinc-300 text-white px-5 py-2 rounded-3xl">
      <!-- <div class="overflow-hidden w-full">
  <div class="skill-slider flex gap-4 whitespace-nowrap">
    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">HTML</h3>
    </div>
    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">CSS</h3>
    </div>
    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">JavaScript</h3>
    </div>
    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">Vue.js</h3>
    </div>
    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">Git</h3>
    </div>

    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">HTML</h3>
    </div>
    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">CSS</h3>
    </div>
    <div class="skill-item bg-gray-800 px-4 py-2 rounded-3xl">
      <h3 class="text-white text-lg font-bold">JavaScript</h3>
    </div>
  </div>
</div> -->
      <div class="relative overflow-hidden py-4">
        <div class="flex w-max animate-scroll gap-4">
          <!-- First Set -->
          <div
            v-for="(skill, index) in skills"
            :key="'first-' + index"
            class="bg-gray-800 px-4 py-2 rounded-3xl flex-shrink-0"
          >
            <h3 class="text-white font-bold">
              {{ skill }}
            </h3>
          </div>

          <!-- Duplicate Set -->
          <div
            v-for="(skill, index) in skills"
            :key="'second-' + index"
            class="bg-gray-800 px-4 py-2 rounded-3xl flex-shrink-0"
          >
            <h3 class="text-white font-bold">
              {{ skill }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- About Me -->
  <section class="container mx-auto px-4 py-16" id="about">
    <AboutPage />
  </section>
  <!-- Education -->
  <section class="container mx-auto px-4 py-5" id="education">
    <EducationPage />
  </section>
  <!-- Skills -->
  <section class="container mx-auto px-4 py-5" id="skills">
    <SkillsPage />
  </section>
  <!-- Experience -->
  <section class="container mx-auto px-4 py-5" id="experience">
    <ExperiencePage />
  </section>
  <!-- Project -->
  <section class="container mx-auto px-4 py-5" id="project">
    <ProjectPage />
  </section>
  <!-- Connect -->
  <section class="container mx-auto px-4 py-5" id="connect">
    <ConnectPage />
  </section>
  </div>
</template>
<style scoped>
.animate-scroll {
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
