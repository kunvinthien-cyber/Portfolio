<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ProjectArtwork from '@/components/Page/ProjectArtwork.vue'
import { projects } from '@/data/projects.js'

const props = defineProps({ t: { type: Object, required: true } })
const expanded = ref(null)
const cardStyles = ref({})
const desktopStack = ref(false)
const projectTrack = ref(null)
const activeProjectIndex = ref(0)
const projectScrollProgress = ref(0)
let pointerFrame = null
let stackFrame = null
let pendingPointer = null
const tiltResetTimers = new Map()

const toggle = (index) => {
  expanded.value = expanded.value === index ? null : index
}

const clearTiltResetTimer = (index) => {
  const timer = tiltResetTimers.get(index)
  if (timer !== undefined) {
    window.clearTimeout(timer)
    tiltResetTimers.delete(index)
  }
}

const resetCardTilt = (index, delay = 120) => {
  clearTiltResetTimer(index)
  if (delay > 0) {
    tiltResetTimers.set(
      index,
      window.setTimeout(() => resetCardTilt(index, 0), delay),
    )
    return
  }

  if (pointerFrame !== null && pendingPointer?.index === index) {
    window.cancelAnimationFrame(pointerFrame)
    pointerFrame = null
    pendingPointer = null
  }
  delete cardStyles.value[index]
}

const resetAllCardTilts = (delay = 120) => {
  Object.keys(cardStyles.value).forEach((index) => resetCardTilt(index, delay))
}

const updateCardTilt = () => {
  pointerFrame = null
  if (!pendingPointer) return

  const { index, x, y, width, height } = pendingPointer
  const normalizedX = (x / width) * 2 - 1
  const normalizedY = (y / height) * 2 - 1
  const maxTilt = 7

  cardStyles.value[index] = {
    '--card-rotate-x': `${-normalizedY * maxTilt}deg`,
    '--card-rotate-y': `${normalizedX * maxTilt}deg`,
    '--card-glare-x': `${normalizedX * 50 + 50}%`,
    '--card-glare-y': `${normalizedY * 50 + 50}%`,
  }
  pendingPointer = null
}

const updateDesktopStack = () => {
  desktopStack.value = window.matchMedia('(min-width: 1100px)').matches
}

const updateStackDepth = () => {
  stackFrame = null
  const track = projectTrack.value
  if (!track || !desktopStack.value) return

  const cards = [...track.querySelectorAll('.project-carousel-card')]
  const viewportHeight = window.innerHeight
  const trackTop = track.getBoundingClientRect().top + window.scrollY
  const trackStyles = window.getComputedStyle(track)
  const trackPaddingTop = Number.parseFloat(trackStyles.paddingTop) || 0
  const rowGap = Number.parseFloat(trackStyles.rowGap) || 0
  let stackedHeight = 0

  const progress = cards.map((card, index) => {
    const stickyTop = 88 + index * 24
    const travelDistance = Math.max(viewportHeight - stickyTop, 1)
    const naturalTop = trackTop + trackPaddingTop + stackedHeight + rowGap * index
    const cardTop = naturalTop - window.scrollY
    stackedHeight += card.offsetHeight
    return Math.max(0, Math.min(1, (viewportHeight - cardTop) / travelDistance))
  })

  let activeIndex = 0
  let overallProgress = 0
  progress.forEach((value, index) => {
    if (value >= 0.5) activeIndex = index
    if (value > 0) overallProgress = Math.max(overallProgress, (index + value) / cards.length)
  })

  activeProjectIndex.value = activeIndex
  projectScrollProgress.value = overallProgress

  cards.forEach((card, index) => {
    const nextCardProgress = progress[index + 1] || 0
    card.style.setProperty('--stack-scale', `${1 - nextCardProgress * 0.065}`)
    card.style.setProperty('--stack-depth-y', `${-nextCardProgress * 14}px`)
    card.style.setProperty('--stack-depth-rotate', `${-nextCardProgress * 2}deg`)
  })
}

const scheduleStackDepthUpdate = () => {
  if (stackFrame === null) stackFrame = window.requestAnimationFrame(updateStackDepth)
}

const handleWindowResize = () => {
  resetAllCardTilts(0)
  updateDesktopStack()
  scheduleStackDepthUpdate()
}

const handleWindowScroll = () => {
  resetAllCardTilts()
  scheduleStackDepthUpdate()
}

const handleCardPointerMove = (event, index) => {
  if (event.pointerType !== 'mouse') return
  clearTiltResetTimer(index)
  if (event.target instanceof Element && event.target.closest('a, button')) {
    resetCardTilt(index)
    return
  }

  const bounds = event.currentTarget.getBoundingClientRect()
  if (!bounds.width || !bounds.height) return

  pendingPointer = {
    index,
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
    width: bounds.width,
    height: bounds.height,
  }
  if (pointerFrame === null) pointerFrame = window.requestAnimationFrame(updateCardTilt)
}

const projectDescription = (project, index) =>
  props.t.projectDescriptions[index] || project.description
const projectStatus = (status) => props.t.projectStatuses[status] || status

onMounted(() => {
  updateDesktopStack()
  scheduleStackDepthUpdate()
  window.addEventListener('scroll', handleWindowScroll, { passive: true })
  window.addEventListener('resize', handleWindowResize, { passive: true })
})

onBeforeUnmount(() => {
  if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame)
  if (stackFrame !== null) window.cancelAnimationFrame(stackFrame)
  tiltResetTimers.forEach((timer) => window.clearTimeout(timer))
  tiltResetTimers.clear()
  window.removeEventListener('scroll', handleWindowScroll)
  window.removeEventListener('resize', handleWindowResize)
})
</script>

<template>
  <div class="section-shell">
    <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="section-kicker">{{ props.t.selectedWork }}</p>
        <h2 class="section-title mt-2">{{ props.t.featuredWork }}</h2>
      </div>
        <div class="project-heading-aside">
          <p class="max-w-md text-sm leading-6 text-slate-400 sm:text-right">
            {{ props.t.projectsIntro }}
          </p>
          <div
            v-if="desktopStack"
            class="project-progress"
            role="progressbar"
            :aria-label="props.t.featuredWork"
            :aria-valuemin="0"
            :aria-valuemax="100"
            :aria-valuenow="Math.round(projectScrollProgress * 100)"
            :aria-valuetext="`${props.t.projectLabel} ${String(activeProjectIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`"
          >
            <span class="project-progress-current">
              {{ String(activeProjectIndex + 1).padStart(2, '0') }}
            </span>
            <span class="project-progress-track" aria-hidden="true">
              <span :style="{ transform: `scaleX(${projectScrollProgress})` }"></span>
            </span>
            <span class="project-progress-total">
              / {{ String(projects.length).padStart(2, '0') }}
            </span>
          </div>
        </div>
    </div>

    <p class="carousel-hint mb-3 flex items-center justify-end gap-2 text-xs text-slate-500 sm:hidden">
      <span aria-hidden="true">&lt; &gt;</span>
      {{ props.t.carouselHint }}
    </p>

    <div
      ref="projectTrack"
      class="project-carousel mobile-card-track grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
      role="region"
      :aria-label="props.t.featuredWork"
      tabindex="0"
    >
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        :style="[cardStyles[index], { '--stack-index': index, '--stack-layer': index + 1 }]"
        :class="{
          'is-tilted': Boolean(cardStyles[index]),
          'is-stack-positioned': desktopStack,
        }"
        class="reveal project-card project-3d-card project-carousel-card group glass-panel-3d overflow-hidden rounded-2xl"
        @pointermove="handleCardPointerMove($event, index)"
        @pointerleave="resetCardTilt(index)"
      >
        <div class="project-card-glare" aria-hidden="true"></div>
        <div class="project-card-art h-48 overflow-hidden border-b border-white/10 sm:h-52">
          <ProjectArtwork
            :project="project"
            :index="index"
            :t="props.t"
            compact
            class="project-artwork-preview transition-transform duration-300"
          />
        </div>

        <div class="project-card-content flex min-w-0 flex-col p-5 sm:p-6">
          <p class="mb-2 font-mono text-xs font-semibold tracking-[0.12em] text-cyan-200">
            {{ props.t.projectLabel }} {{ String(index + 1).padStart(2, '0') }}
          </p>
          <h3 class="text-lg font-semibold leading-snug text-white sm:text-xl">
            {{ project.name }}
          </h3>
          <p
            v-if="project.status"
            class="mt-2 w-fit rounded-full border border-amber-200/15 bg-amber-200/6 px-2.5 py-1 text-xs font-medium text-amber-100"
          >
            {{ projectStatus(project.status) }}
          </p>
          <div class="mt-3">
            <p
              :id="`project-description-${index}`"
              :class="expanded === index ? '' : 'line-clamp-3'"
              class="text-sm leading-6 text-slate-400"
            >
              {{ projectDescription(project, index) }}
            </p>
            <button
              type="button"
              :aria-expanded="expanded === index"
              :aria-controls="`project-description-${index}`"
              class="mt-1 inline-flex min-h-11 items-center rounded px-1 text-left text-xs font-semibold text-cyan-200 hover:text-white"
              @click="toggle(index)"
            >
              {{ expanded === index ? props.t.showLess : props.t.readMore }}
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="skill in project.skills"
              :key="skill"
              class="project-tech-chip rounded-full border border-cyan-100/10 bg-cyan-100/4.5 px-3 py-1 text-xs font-medium text-cyan-100/90"
            >
              {{ skill }}
            </span>
          </div>

          <div class="mt-5 flex flex-wrap items-center gap-2">
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-3d inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-200/40 hover:bg-cyan-200/10 hover:text-cyan-100"
            >
              {{ props.t.openProject }}
              <i
                class="project-external-arrow fa-solid fa-arrow-up-right-from-square text-xs"
                aria-hidden="true"
              ></i>
            </a>
            <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-3d inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-200/30 hover:bg-cyan-200/10 hover:text-cyan-100"
            >
              {{ props.t.sourceCode }}
              <i class="fa-brands fa-github text-xs" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
