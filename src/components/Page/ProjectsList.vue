<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ProjectArtwork from '@/components/Page/ProjectArtwork.vue'
import { projects } from '@/data/projects.js'

const props = defineProps({ t: { type: Object, required: true } })
const projectRoot = ref(null)
const expanded = ref(null)
const activeProject = ref(0)
const intersectingScenes = new Map()
let sceneObserver
const toggle = (index) => {
  expanded.value = expanded.value === index ? null : index
}
const projectDescription = (project, index) =>
  props.t.projectDescriptions[index] || project.description
const projectStatus = (status) => props.t.projectStatuses[status] || status

onMounted(() => {
  if (!projectRoot.value || !('IntersectionObserver' in window)) return

  sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index)
        if (entry.isIntersecting) {
          const sceneCenter = (entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2
          intersectingScenes.set(index, Math.abs(sceneCenter - window.innerHeight / 2))
        } else {
          intersectingScenes.delete(index)
        }
      })

      const closestScene = [...intersectingScenes.entries()].sort((a, b) => a[1] - b[1])[0]
      if (closestScene) activeProject.value = closestScene[0]
    },
    {
      rootMargin: '-35% 0px -35% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  )

  projectRoot.value.querySelectorAll('.story-scene').forEach((scene) => sceneObserver.observe(scene))
})

onBeforeUnmount(() => {
  sceneObserver?.disconnect()
  intersectingScenes.clear()
})
</script>

<template>
  <div ref="projectRoot" class="section-shell">
    <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="section-kicker">{{ props.t.selectedWork }}</p>
        <h2 class="section-title mt-2">{{ props.t.featuredWork }}</h2>
      </div>
      <p class="max-w-md text-sm leading-6 text-slate-400 sm:text-right">
        {{ props.t.projectsIntro }}
      </p>
    </div>

    <div id="case-studies" class="scroll-mt-28">
    <div class="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div class="sticky top-28 flex h-128 flex-col justify-center">
        <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/30 p-3 shadow-2xl">
          <Transition name="project-visual" mode="out-in">
            <div
              :key="activeProject"
              :class="`project-stage-${projects[activeProject].visual}`"
              class="project-visual-frame relative aspect-4/3 overflow-hidden rounded-2xl"
            >
              <ProjectArtwork
                :project="projects[activeProject]"
                :index="activeProject"
                :t="props.t"
                class="story-image"
              />
              <div class="absolute inset-x-5 bottom-5 flex items-center justify-between">
                <span class="rounded-full border border-white/15 bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-cyan-100 backdrop-blur">
                  {{ props.t.projectLabel }} {{ String(activeProject + 1).padStart(2, '0') }}
                </span>
                <span v-if="projects[activeProject].status" class="rounded-full bg-slate-950/75 px-3 py-1.5 text-xs text-amber-100 backdrop-blur">
                  {{ projectStatus(projects[activeProject].status) }}
                </span>
              </div>
            </div>
          </Transition>
        </div>
        <div class="mt-5 flex items-center justify-between">
          <ol class="flex gap-2" :aria-label="props.t.projectProgress">
            <li v-for="(_, index) in projects" :key="index" :aria-current="index === activeProject ? 'step' : undefined">
              <span
                :class="['block h-1 rounded-full transition-all duration-300', index === activeProject ? 'w-10 bg-cyan-300' : 'w-4 bg-slate-700']"
              ></span>
            </li>
          </ol>
          <span class="font-mono text-xs tabular-nums text-slate-400" aria-live="polite">
            {{ String(activeProject + 1).padStart(2, '0') }}
            <span class="text-slate-600">/</span>
            {{ String(projects.length).padStart(2, '0') }}
          </span>
        </div>
      </div>

      <div class="relative space-y-4 py-4">
        <div class="story-line"></div>
        <article
          v-for="(project, index) in projects"
          :key="`story-${project.name}`"
          :data-index="index"
          :aria-current="activeProject === index ? 'step' : undefined"
          :class="{ 'is-active': activeProject === index }"
          class="story-scene relative min-h-100 pl-8"
        >
          <span class="story-dot"></span>
          <p class="story-kicker section-kicker">{{ props.t.projectLabel }} {{ String(index + 1).padStart(2, '0') }}</p>
          <h3 class="story-title mt-3 text-3xl font-bold tracking-[-0.04em] text-white">{{ project.name }}</h3>
          <p class="story-description mt-5 max-w-xl text-base leading-8 text-slate-300">{{ projectDescription(project, index) }}</p>
          <p v-if="project.status" class="story-status mt-3 w-fit rounded-full border border-amber-200/15 bg-amber-200/6 px-2.5 py-1 text-xs font-medium text-amber-100">
            {{ projectStatus(project.status) }}
          </p>
          <p class="story-stack-label mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{{ props.t.technologies }}</p>
          <div class="story-tech mt-2 flex flex-wrap gap-2">
            <span v-for="skill in project.skills" :key="skill" class="project-tech-chip rounded-full border border-cyan-100/10 bg-cyan-100/4.5 px-3 py-1 text-xs font-medium text-cyan-100/90">{{ skill }}</span>
          </div>
          <a :href="project.link" target="_blank" rel="noopener noreferrer" class="story-action button-secondary group mt-7">
            {{ props.t.openProject }}
            <i class="fa-solid fa-arrow-up-right-from-square text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true"></i>
          </a>
        </article>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        class="group surface-card overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:shadow-xl hover:shadow-cyan-950/15"
      >
        <div class="h-48 overflow-hidden border-b border-white/10 sm:h-52">
          <ProjectArtwork :project="project" :index="index" :t="props.t" compact class="transition-transform duration-300 group-hover:scale-[1.015]" />
        </div>

        <div class="flex min-w-0 flex-col p-5 sm:p-6">
          <p class="mb-2 font-mono text-xs font-semibold tracking-[0.12em] text-cyan-200">{{ props.t.projectLabel }} {{ String(index + 1).padStart(2, '0') }}</p>
          <h3 class="text-lg font-semibold leading-snug text-white sm:text-xl">{{ project.name }}</h3>
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

          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-200/40 hover:bg-cyan-200/10 hover:text-cyan-100"
          >
            {{ props.t.openProject }}
            <i class="fa-solid fa-arrow-up-right-from-square text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true"></i>
          </a>
        </div>
      </article>
    </div>
    </div>
  </div>
</template>
