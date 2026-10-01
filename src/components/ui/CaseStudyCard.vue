<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { ArrowUpRight, Code2 } from 'lucide-vue-next'

defineProps({
  number: { type: [String, Number], default: '01' },
  title: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  metrics: {
    type: Array,
    default: () => [],
  },
  technologies: {
    type: Array,
    default: () => ['Laravel', 'Vue.js', 'Tailwind', 'Redis', 'MySQL'],
  },
  caseStudyHref: { type: String, default: '' },
  sourceCodeHref: { type: String, default: '' },
})

const card = ref(null)
const idPrefix = useId()
const tiltTransform = ref('perspective(1000px) rotateX(0deg) rotateY(0deg)')
let reducedMotion
let pointerFrame = null
let pendingPointer = null

function prefersReducedMotion() {
  return reducedMotion?.matches ?? false
}

function updateTilt() {
  pointerFrame = null
  if (prefersReducedMotion() || !pendingPointer || !card.value) return

  const bounds = card.value.getBoundingClientRect()
  const x = ((pendingPointer.clientX - bounds.left) / bounds.width) * 2 - 1
  const y = ((pendingPointer.clientY - bounds.top) / bounds.height) * 2 - 1
  const maxTilt = 4

  tiltTransform.value = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`
  pendingPointer = null
}

function handlePointerMove(event) {
  if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
  pendingPointer = event
  if (pointerFrame === null) pointerFrame = window.requestAnimationFrame(updateTilt)
}

function resetTilt() {
  pendingPointer = null
  if (pointerFrame !== null) {
    window.cancelAnimationFrame(pointerFrame)
    pointerFrame = null
  }
  tiltTransform.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
}

function handleMotionPreferenceChange() {
  if (prefersReducedMotion()) resetTilt()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.addEventListener('change', handleMotionPreferenceChange)
})

onBeforeUnmount(() => {
  resetTilt()
  reducedMotion?.removeEventListener('change', handleMotionPreferenceChange)
})
</script>

<template>
  <article
    ref="card"
    class="case-study-card group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-xl shadow-black/10 backdrop-blur-md sm:p-8"
    :style="{ transform: tiltTransform }"
    @pointermove="handlePointerMove"
    @pointerleave="resetTilt"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-lime-400/5.5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden="true"
    ></div>

    <header>
      <p class="font-mono text-[0.68rem] font-semibold tracking-[0.14em] text-lime-300">
        CASE STUDY {{ String(number).padStart(2, '0') }}
      </p>
      <h2 class="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
        {{ title }}
      </h2>
    </header>

    <div class="mt-6 grid gap-5 text-sm leading-7 text-zinc-300 sm:grid-cols-2 sm:gap-8">
      <section :aria-labelledby="`${idPrefix}-problem-heading`">
        <h3 :id="`${idPrefix}-problem-heading`" class="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Problem
        </h3>
        <p class="mt-2">{{ problem }}</p>
      </section>
      <section :aria-labelledby="`${idPrefix}-solution-heading`">
        <h3 :id="`${idPrefix}-solution-heading`" class="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Technical solution
        </h3>
        <p class="mt-2">{{ solution }}</p>
      </section>
    </div>

    <section v-if="metrics.length" class="case-metrics mt-7 rounded-xl border border-zinc-800/80 bg-zinc-950/45 p-4 sm:p-5" aria-label="System metrics">
      <ul class="grid gap-4 sm:grid-cols-2">
        <li v-for="(metric, index) in metrics" :key="`${metric.label}-${index}`">
          <p class="font-mono text-lg font-semibold text-lime-300">{{ metric.value }}</p>
          <p class="mt-1 text-xs leading-5 text-zinc-400">{{ metric.label }}</p>
        </li>
      </ul>
    </section>

    <ul class="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
      <li
        v-for="technology in technologies"
        :key="technology"
        class="rounded-full border border-zinc-700/80 bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-300"
      >
        {{ technology }}
      </li>
    </ul>

    <footer v-if="caseStudyHref || sourceCodeHref" class="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-zinc-800/80 pt-5">
      <a
        v-if="caseStudyHref"
        :href="caseStudyHref"
        class="case-study-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-lime-300 transition-colors hover:text-lime-200 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-lime-400"
      >
        Read Case Study
        <ArrowUpRight :size="16" aria-hidden="true" />
      </a>
      <a
        v-if="sourceCodeHref"
        :href="sourceCodeHref"
        target="_blank"
        rel="noopener noreferrer"
        class="case-study-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-lime-400"
      >
        <Code2 :size="16" aria-hidden="true" />
        Source Code
        <ArrowUpRight :size="14" aria-hidden="true" />
      </a>
    </footer>
  </article>
</template>

<style scoped>
.case-study-card {
  transform-style: preserve-3d;
  transition:
    transform 180ms ease-out,
    border-color 180ms ease,
    box-shadow 180ms ease;
  will-change: transform;
}

.case-study-card:hover {
  border-color: rgb(132 204 22 / 28%);
  box-shadow: 0 20px 55px rgb(0 0 0 / 22%);
}

.case-metrics {
  background: rgb(9 9 11 / 45%);
}

.case-study-link {
  text-decoration: none;
}

@media (prefers-reduced-motion: reduce) {
  .case-study-card {
    transform: none !important;
    transition: none;
    will-change: auto;
  }
}
</style>
