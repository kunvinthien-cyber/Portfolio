<script setup>
import { ArrowRight, Github } from 'lucide-vue-next'
import Homepage from '@/components/Page/Homepage.vue'
import profileImage from '@/assets/IMG/image.png'

const props = defineProps({
  t: { type: Object, required: true },
})
</script>

<template>
  <div>
    <div class="fixed inset-x-0 top-0 z-50 py-2 sm:py-3">
      <Homepage :t="props.t" />
    </div>

    <section
      id="home"
      class="section-shell hero-section relative grid min-h-[min(760px,100svh)] grid-cols-1 scroll-mt-24 items-center gap-8 pb-12 pt-28 sm:gap-10 sm:pt-32 lg:grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.7fr)] lg:gap-12 lg:py-24"
    >
      <div class="hero-portrait reveal relative isolate order-1 mx-auto w-40 sm:w-48 lg:order-2 lg:w-full lg:max-w-[23rem]">
        <div class="relative z-10 overflow-hidden rounded-[2rem] border border-lime-200/20 bg-slate-900/60 p-2 shadow-2xl shadow-lime-950/20">
          <img
            :src="profileImage"
            :alt="props.t.portraitAlt"
            width="640"
            height="640"
            fetchpriority="high"
            class="aspect-square w-full rounded-[1.55rem] object-cover object-top"
          />
        </div>
        <div class="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-full bg-lime-400/10 blur-2xl"></div>
        <span class="portrait-orbit portrait-orbit-one" aria-hidden="true">
          <i></i>
          <svg class="portrait-pet portrait-pet-dog" viewBox="0 0 128 96" focusable="false">
            <ellipse cx="64" cy="83" rx="39" ry="5" fill="#111827" opacity=".32" />
            <g class="pet-body">
              <g class="pet-tail">
                <path d="M33 43C22 35 18 25 22 17c2-4 6-3 7 1 1 7 6 11 14 14l-4 13z" fill="#9a5b32" />
                <path d="M23 19c1 5 4 9 8 12" fill="none" stroke="#d9a36f" stroke-linecap="round" stroke-width="2" />
              </g>
              <path d="M29 41c5-10 17-15 32-14 8 1 15 5 20 12l11 8-4 20c-12 5-34 5-50 0-9-3-15-11-14-20z" fill="#b97745" />
              <path d="M38 37c8-7 19-9 29-6 9 3 13 10 14 17-11 2-24 1-34-2-7-2-10-5-9-9z" fill="#d99b63" opacity=".85" />
              <path d="M73 35c7-5 14-7 20-4 6 3 8 11 5 18-2 5-7 9-14 10-7-3-13-10-14-17z" fill="#c88752" />
              <path d="M77 35c-1-9 4-14 10-13 6 1 8 8 5 15z" fill="#754329" />
              <path d="M93 47c8-6 17-4 19 2 1 5-5 9-13 8l-8-3z" fill="#e0b07d" />
              <ellipse cx="111" cy="49" rx="3.6" ry="2.7" fill="#38251b" />
              <circle cx="94" cy="39" r="1.8" fill="#241811" />
              <circle cx="94.6" cy="38.4" r=".55" fill="#fff" />
              <path d="M62 62c9-1 19 1 26 5-3 5-8 8-15 8-7-3-11-7-11-13z" fill="#f0dfc6" />
              <g class="pet-legs pet-legs-back" fill="#a6653d">
                <path d="M43 62c-2 7-7 11-7 17 0 3 3 4 6 3l8-12-1-8z" />
                <path d="M53 64c2 6 1 11-3 16-2 3 0 5 4 4l9-11-2-8z" />
              </g>
              <g class="pet-legs pet-legs-front" fill="#b97745">
                <path d="M78 63c-4 7-3 12 1 17 2 3 5 3 7 0l1-16z" />
                <path d="M88 60c3 6 7 10 5 16-1 4 2 5 5 2l5-13-5-7z" />
              </g>
              <path d="M35 80l8-1 2 3c-1 2-8 3-12 1-1-1 0-2 2-3zm18 1 8-1 2 3c-2 2-9 2-12 0-1-1 0-2 2-2zm27-1 8 1 1 3c-2 2-8 1-11-1 0-1 0-2 2-3zm18-1 7-2 3 2c-1 2-7 4-11 2-1-1-1-2 1-2z" fill="#493022" />
              <path d="M30 48c1 5 3 9 7 12M55 34c-2 4-2 8 0 11" fill="none" stroke="#edbd8c" stroke-linecap="round" stroke-width="2" opacity=".8" />
            </g>
          </svg>
        </span>
        <span class="portrait-orbit portrait-orbit-two" aria-hidden="true">
          <i></i>
          <svg class="portrait-pet portrait-pet-cat" viewBox="0 0 128 96" focusable="false">
            <ellipse cx="64" cy="83" rx="38" ry="5" fill="#111827" opacity=".3" />
            <g class="pet-body">
              <g class="pet-tail">
                <path d="M31 47c-10-8-18-18-15-27 2-7 9-9 12-4 2 4-2 8 0 12 2 5 9 9 15 12z" fill="none" stroke="#4b5563" stroke-linecap="round" stroke-width="8" />
                <path d="M18 24c2-4 5-6 8-6" fill="none" stroke="#9ca3af" stroke-linecap="round" stroke-width="2" />
              </g>
              <path d="M30 45c5-9 15-15 29-15 13 0 22 5 29 15l-5 22c-8 5-35 7-48 1-8-4-10-14-5-23z" fill="#626b78" />
              <path d="M40 47c10 4 27 4 40 0l5 17c-13 7-31 7-45 1z" fill="#d7dce1" />
              <path d="M75 37c4-8 5-17 11-22 5 5 8 11 8 18 7-5 14-4 18-1-2 7-1 14-5 20-5 6-15 8-24 5-8-3-12-12-8-20z" fill="#707986" />
              <path d="M82 28c2-5 3-8 5-10l4 12zm18 0 7-1-4 10z" fill="#d99ca0" />
              <path d="M102 48c5-3 11-2 13 2-2 4-7 6-12 4z" fill="#ead9d1" />
              <path d="M109 51l3 1-2 2h-3z" fill="#473941" />
              <circle cx="98" cy="40" r="1.8" fill="#202a30" />
              <circle cx="98.5" cy="39.5" r=".55" fill="#fff" />
              <path d="M39 39l8 3m-7 3 9 2m28-9-7 3m8 3-8 2" fill="none" stroke="#424a55" stroke-linecap="round" stroke-width="2" />
              <g class="pet-legs pet-legs-back" fill="#626b78">
                <path d="M42 63c-3 6-9 10-8 16 1 3 4 3 7 1l9-11-1-6z" />
                <path d="M53 66c1 6-2 10-7 14-2 2-1 5 3 4l12-9v-8z" />
              </g>
              <g class="pet-legs pet-legs-front" fill="#707986">
                <path d="M78 64c-4 6-4 11 0 17 2 3 5 2 7-1l2-15z" />
                <path d="M88 62c3 6 8 9 7 15-1 4 2 5 5 2l4-13-6-6z" />
              </g>
              <path d="M35 80l8-1 2 3c-2 2-8 3-12 1-1-1 0-2 2-3zm17 1 8-1 2 3c-2 2-9 2-12 0-1-1 0-2 2-2zm28-1 8 1 1 3c-2 2-8 1-11-1 0-1 0-2 2-3zm18-1 7-2 3 2c-1 2-7 4-11 2-1-1-1-2 1-2z" fill="#414852" />
              <path d="m94 47 14 2m-17 3 13 3" fill="none" stroke="#e5e7eb" stroke-linecap="round" stroke-width="1.3" />
            </g>
          </svg>
        </span>
      </div>

      <div class="hero-content reveal relative z-10 order-2 mx-auto max-w-5xl text-center lg:order-1 lg:mx-0 lg:text-left">
        <p class="hero-eyebrow mx-auto inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.06] px-4 py-2 font-mono text-[0.68rem] font-semibold tracking-[0.12em] text-lime-300 sm:text-xs lg:mx-0">
          <span class="h-1.5 w-1.5 rounded-full bg-lime-400" aria-hidden="true"></span>
          {{ props.t.heroEyebrow }}
        </p>

        <h1 class="hero-title mt-7 text-balance text-4xl font-bold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-6xl xl:text-7xl">
          {{ props.t.heroTitleLines[0] }}<br class="hidden sm:block" />
          <span>{{ props.t.heroTitleLines[1] }}</span>
        </h1>

        <p class="hero-subtitle mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mx-0">
          {{ props.t.heroSubtitle }}
        </p>

        <div class="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a href="#projects" class="hero-primary group">
            {{ props.t.exploreProjects }}
            <ArrowRight :size="16" aria-hidden="true" class="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://github.com/kunvinthien-cyber"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-secondary"
          >
            <Github :size="17" aria-hidden="true" />
            {{ props.t.githubRepo }}
          </a>
        </div>

        <div class="hero-stats mt-10 inline-flex items-center gap-3 rounded-xl border border-zinc-800/90 bg-zinc-950/55 px-4 py-3 font-mono text-xs text-zinc-300 shadow-xl backdrop-blur-md sm:mt-12">
          <span class="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(132,204,22,0.55)]" aria-hidden="true"></span>
          <span class="text-lime-300">60 FPS</span>
          <span class="text-zinc-600" aria-hidden="true">//</span>
          <span>{{ props.t.fpsReady }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
