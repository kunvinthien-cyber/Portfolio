<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import HeroSection from '@/components/Page/HeroSection.vue'
import AboutPage from '@/components/Page/AboutPage.vue'
import EducationPage from '@/components/Page/EducationPage.vue'
import SkillsPage from '@/components/Page/SkillsPage.vue'
import ExperiencePage from '@/components/Page/ExperiencePage.vue'
import ProjectPage from '@/components/Page/ProjectPage.vue'
import ContactPage from '@/components/Page/ContactPage.vue'
import HeroCanvas from '@/components/3d/HeroCanvas.vue'
import { usePreferencesStore } from '@/stores/preferences'
import { translations } from '@/data/translations'

const portfolio = ref(null)
const preferences = usePreferencesStore()
const t = computed(() => translations[preferences.language])
const scrollProgress = ref(0)
let revealObserver
let scrollFrame = null

const updateScrollState = () => {
  scrollFrame = null
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
}

const requestScrollState = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState)
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (portfolio.value && 'IntersectionObserver' in window && !reducedMotion) {
    portfolio.value.classList.add('reveal-ready')
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.04, rootMargin: '0px 0px -48px 0px' },
    )

    portfolio.value.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section))
  }
  updateScrollState()
  window.addEventListener('scroll', requestScrollState, { passive: true })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  window.removeEventListener('scroll', requestScrollState)
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <div
    ref="portfolio"
    class="portfolio min-h-screen w-full overflow-x-clip"
    :data-theme="preferences.theme"
    :lang="preferences.language"
    :class="{ 'font-khmer': preferences.isKhmer }"
  >
    <HeroCanvas />
    <div class="scroll-progress" aria-hidden="true" :style="{ transform: `scaleX(${scrollProgress})` }"></div>
    <main class="w-full">
      <HeroSection :t="t" />

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
        <ProjectPage :t="t" />
      </section>
      <section id="contact" class="reveal w-full scroll-mt-24 py-6 sm:py-10">
        <ContactPage :t="t" />
      </section>
    </main>

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
