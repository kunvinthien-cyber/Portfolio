<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import HeroSection from '@/components/Page/HeroSection.vue'
import AboutPage from '@/components/Page/AboutPage.vue'
import EducationPage from '@/components/Page/EducationPage.vue'
import SkillsPage from '@/components/Page/SkillsPage.vue'
import ExperiencePage from '@/components/Page/ExperiencePage.vue'
import ProjectsList from '@/components/Page/ProjectsList.vue'
import ContactPage from '@/components/Page/ContactPage.vue'
import HeroCanvas from '@/components/3d/HeroCanvas.vue'
import ChatBot from '@/components/ChatBot.vue'
import { usePreferencesStore } from '@/stores/preferences'
import { translations } from '@/data/translations'

const portfolio = ref(null)
const preferences = usePreferencesStore()
const t = computed(() => translations[preferences.language])
const scrollProgress = ref(0)
const revealReady = ref(false)
const featuredSkills = ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Vue.js', 'Laravel', 'MySQL', 'Git']
let revealObserver
let motionPreference
let scrollFrame = null

const updateScrollState = () => {
  scrollFrame = null
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
}

const requestScrollState = () => {
  if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(updateScrollState)
}

const setupRevealObserver = () => {
  revealObserver?.disconnect()
  revealObserver = undefined
  if (!portfolio.value) return

  const sections = portfolio.value.querySelectorAll('.reveal')
  if (!preferences.motionEnabled || !('IntersectionObserver' in window)) {
    revealReady.value = false
    sections.forEach((section) => section.classList.remove('is-visible'))
    return
  }

  sections.forEach((section) => section.classList.remove('is-visible'))
  revealReady.value = true
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting)
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  )

  sections.forEach((section) => revealObserver.observe(section))
}

const handleMotionPreferenceChange = (event) => {
  preferences.syncMotionPreference(event.matches)
  setupRevealObserver()
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', handleMotionPreferenceChange)
  setupRevealObserver()
  updateScrollState()
  window.addEventListener('scroll', requestScrollState, { passive: true })
  window.addEventListener('resize', requestScrollState, { passive: true })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  motionPreference?.removeEventListener('change', handleMotionPreferenceChange)
  window.removeEventListener('scroll', requestScrollState)
  window.removeEventListener('resize', requestScrollState)
  if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <div
    ref="portfolio"
    class="portfolio min-h-screen w-full"
    :data-theme="preferences.theme"
    :lang="preferences.isKhmer ? 'km' : 'en'"
    :class="{
      'font-khmer': preferences.isKhmer,
      'motion-enabled': preferences.motionEnabled,
      'reveal-ready': revealReady,
    }"
  >
    <HeroCanvas />
    <div class="scroll-progress" aria-hidden="true" :style="{ transform: `scaleX(${scrollProgress})` }"></div>
    <main class="w-full">
      <HeroSection :t="t" @motion-change="setupRevealObserver" />

      <div class="skills-marquee" aria-hidden="true">
        <div class="skills-marquee-viewport">
          <div class="skills-marquee-track">
            <ul class="skills-marquee-set">
              <li v-for="skill in featuredSkills" :key="skill" class="skills-marquee-item">
                {{ skill }}
              </li>
            </ul>
            <ul class="skills-marquee-set" aria-hidden="true">
              <li v-for="skill in featuredSkills" :key="skill" class="skills-marquee-item">
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section id="about" class="reveal w-full scroll-mt-24 py-10 sm:py-14">
        <AboutPage :t="t" />
      </section>
      <section id="education" class="reveal w-full scroll-mt-24 py-6 sm:py-10">
        <EducationPage :t="t" />
      </section>
      <section id="skills" class="reveal w-full scroll-mt-24 py-6 sm:py-10">
        <SkillsPage :t="t" />
      </section>
      <section id="experience" class="reveal w-full scroll-mt-24 py-6 sm:py-10">
        <ExperiencePage :t="t" />
      </section>
      <section id="projects" class="reveal w-full scroll-mt-24 py-6 sm:py-10">
        <ProjectsList :t="t" />
      </section>
      <section id="contact" class="reveal w-full scroll-mt-24 py-6 sm:py-10">
        <ContactPage :t="t" />
      </section>
    </main>

    <div id="chatbot">
      <ChatBot :t="t" />
    </div>

    <footer class="site-footer mt-10 border-t border-white/10 bg-slate-950/50">
      <div class="section-shell flex flex-col gap-4 py-7 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="font-semibold tracking-wide text-white">KUN VINTHIEN</p>
          <p class="mt-1 text-xs text-slate-400">{{ t.footerRole }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-400">
          <a
            href="https://github.com/kunvinthien-cyber"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-cyan-200"
          >GitHub</a>
          <a href="#contact" class="transition-colors hover:text-cyan-200">{{ t.contact }}</a>
          <span class="text-xs text-slate-400">© {{ new Date().getFullYear() }} Kun Vinthien. {{ t.footerRights }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>
