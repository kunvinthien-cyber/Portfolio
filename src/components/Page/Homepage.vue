 <script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const scrollToSection = (section) => {
  const el = document.getElementById(section)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  isOpen.value = false
}
</script>

<template>
  <div class="home-page w-screen flex justify-center px-2">
    <div class="home-contener w-full max-w-7xl bg-black text-white
                px-4 py-3 flex items-center justify-between
                rounded-3xl mt-2 relative">

      <!-- Logo / Name -->
      <div class="name-web">
        <section id="home">
          <h1 class="text-white text-xl font-bold sm:text-xl lg:text-2xl">KUN VINTHIEN</h1>
        </section>
      </div>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex items-center">
        <ul class="flex items-center gap-4 lg:gap-6 text-sm lg:text-base">
          <li><a href="#about"      @click.prevent="scrollToSection('about')"      class="hover:text-amber-400 transition-colors">About</a></li>
          <li><a href="#education"  @click.prevent="scrollToSection('education')"  class="hover:text-amber-400 transition-colors">Education</a></li>
          <li><a href="#skills"     @click.prevent="scrollToSection('skills')"     class="hover:text-amber-400 transition-colors">Skills</a></li>
          <li><a href="#experience" @click.prevent="scrollToSection('experience')" class="hover:text-amber-400 transition-colors">Experience</a></li>
          <li><a href="#projects"   @click.prevent="scrollToSection('projects')"   class="hover:text-amber-400 transition-colors">Projects</a></li>
          <li><a href="#contact"    @click.prevent="scrollToSection('contact')"    class="hover:text-amber-400 transition-colors">Contact</a></li>
        </ul>
      </nav>

      <!-- Desktop GitHub Button -->
      <div class="hidden md:block btn-view-github shake">
        <a href="https://github.com/robertoferreira/ecommerce-frontend"
           target="_blank"
           class="text-white px-4 py-2 rounded-3xl bg-amber-500 hover:bg-amber-600 transition-colors text-sm lg:text-base inline-block">
          View GitHub
        </a>
      </div>

      <!-- Mobile: Hamburger + GitHub -->
      <div class="flex md:hidden items-center gap-3">
        <div class="shake">
          <a href="https://github.com/robertoferreira/ecommerce-frontend"
             target="_blank"
             class="text-white px-3 py-1.5 rounded-3xl bg-amber-500 hover:bg-amber-600 transition-colors text-xs inline-block">
            GitHub
          </a>
        </div>

        <!-- Hamburger Button -->
        <button @click="toggleMenu"
                class="flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
                aria-label="Toggle menu">
          <span :class="['block w-6 h-0.5 bg-white transition-all duration-300',
                         isOpen ? 'rotate-45 translate-y-2' : '']"></span>
          <span :class="['block w-6 h-0.5 bg-white transition-all duration-300',
                         isOpen ? 'opacity-0' : '']"></span>
          <span :class="['block w-6 h-0.5 bg-white transition-all duration-300',
                         isOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div v-if="isOpen"
         class="md:hidden fixed top-16 left-2 right-2 bg-black rounded-2xl z-50 shadow-xl overflow-hidden">
      <ul class="flex flex-col py-2">
        <li v-for="item in [
              { id: 'about',      label: 'About' },
              { id: 'education',  label: 'Education' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills',     label: 'Skills' },
              { id: 'projects',   label: 'Projects' },
              { id: 'connect',    label: 'Contact' }
            ]"
            :key="item.id">
          <a :href="'#' + item.id"
             @click.prevent="scrollToSection(item.id)"
             class="block px-6 py-3 text-white hover:bg-amber-500 hover:text-white transition-colors text-sm font-medium">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.shake {
  animation: shake 3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
 </style> 