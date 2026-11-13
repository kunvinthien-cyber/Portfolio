<script setup>
import { ArrowRight, Download, Mail } from 'lucide-vue-next'
import Homepage from '@/components/Page/Homepage.vue'
import profileImage from '@/assets/IMG/image.png'

const props = defineProps({
  t: { type: Object, required: true },
})
const emit = defineEmits(['motion-change'])
</script>

<template>
  <div>
    <div class="fixed inset-x-0 top-0 z-50 py-2 sm:py-3">
      <Homepage :t="props.t" @motion-change="emit('motion-change')" />
    </div>

    <section
      id="home"
      class="section-shell hero-section relative grid min-h-[min(760px,100svh)] grid-cols-1 scroll-mt-24 items-center gap-8 pb-12 pt-28 sm:gap-10 sm:pt-32 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)] lg:gap-12 lg:py-24"
    >
      <div class="hero-content reveal relative z-10 order-2 mx-auto max-w-5xl text-center lg:order-1 lg:mx-0 lg:text-left">
        <p class="hero-eyebrow mx-auto inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/6 px-4 py-2 font-mono text-[0.68rem] font-semibold tracking-[0.12em] text-lime-300 sm:text-xs lg:mx-0">
          <span class="h-1.5 w-1.5 rounded-full bg-lime-400" aria-hidden="true"></span>
          {{ props.t.heroEyebrow }}
        </p>

        <h1 class="hero-name mt-7 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl xl:text-5xl">
          {{ props.t.fullName }}
        </h1>

        <h2 class="hero-title mt-4 text-balance text-3xl font-semibold leading-[1.16] tracking-[-0.045em] sm:text-5xl xl:text-6xl">
          {{ props.t.heroTitleLines[0] }}<br class="hidden sm:block" />
          <span>{{ props.t.heroTitleLines[1] }}</span>
        </h2>

        <p class="hero-subtitle mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mx-0">
          {{ props.t.heroSubtitle }}
        </p>

        <div class="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a href="#projects" class="hero-primary btn-3d group">
            {{ props.t.exploreProjects }}
            <ArrowRight :size="16" aria-hidden="true" class="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" class="hero-secondary">
            <Mail :size="17" aria-hidden="true" />
            {{ props.t.contactMe }}
          </a>
          <a href="/Vinthien-CV.pdf" download class="hero-secondary">
            <Download :size="17" aria-hidden="true" />
            {{ props.t.downloadCv }}
          </a>
        </div>

        <div class="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-slate-400 lg:justify-start">
          <span>{{ props.t.basedIn }}</span>
          <span class="text-slate-600" aria-hidden="true">·</span>
          <span class="inline-flex items-center gap-2 text-lime-300">
            <span class="h-1.5 w-1.5 rounded-full bg-lime-400" aria-hidden="true"></span>
            {{ props.t.aboutAvailability }}
          </span>
        </div>
      </div>

      <div class="hero-portrait reveal relative isolate order-1 mx-auto w-40 sm:w-48 lg:order-2 lg:w-full lg:max-w-[20rem]">
        <div class="relative z-10 overflow-hidden rounded-4xl border border-sky-200/20 bg-slate-900/70 p-2 shadow-2xl shadow-blue-950/40">
          <img
            :src="profileImage"
            :alt="props.t.portraitAlt"
            width="640"
            height="640"
            fetchpriority="high"
            class="aspect-square w-full rounded-[1.55rem] object-cover object-top"
          />
        </div>
        <div class="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl"></div>
      </div>
    </section>

  </div>
</template>
