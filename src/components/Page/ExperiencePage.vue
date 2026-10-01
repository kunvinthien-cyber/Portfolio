<script setup>
const props = defineProps({ t: { type: Object, required: true } })

const experiences = [
  {
    period: '2023 - Present',
    tags: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'REST API'],
    icon: 'fa-laptop-code',
    active: true,
  },
  {
    period: '2022 - 2023',
    tags: ['PHP', 'MySQL', 'Laravel', 'CRUD API'],
    icon: 'fa-server',
    active: false,
  },
  {
    period: '2021 - 2022',
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Git'],
    icon: 'fa-code',
    active: false,
  },
]
</script>

<template>
  <div class="section-shell">
    <div class="mb-8 max-w-xl">
      <p class="section-kicker">{{ props.t.experienceKicker }}</p>
      <h2 class="section-title mt-2">{{ props.t.experienceTitle }}</h2>
      <p class="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
        {{ props.t.experienceIntro }}
      </p>
    </div>

    <div class="relative space-y-4 sm:space-y-5">
      <div class="absolute bottom-8 left-5 top-8 hidden w-px bg-slate-700 sm:block"></div>
      <article
        v-for="(exp, index) in experiences"
        :key="exp.period"
        class="timeline-item relative grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-5"
      >
        <div class="z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-cyan-200/30 bg-slate-900 text-cyan-200 sm:flex">
          <i :class="['fa-solid', exp.icon]" aria-hidden="true"></i>
        </div>
        <div class="surface-card rounded-2xl p-5 sm:p-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <i :class="['fa-solid', exp.icon]" class="text-cyan-200 sm:hidden" aria-hidden="true"></i>
                <h3 class="text-lg font-semibold text-white sm:text-xl">{{ props.t.experienceRoles[index] }}</h3>
                <span
                  v-if="exp.active"
                  class="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-0.5 text-[0.68rem] font-semibold text-emerald-200"
                >
                  {{ props.t.active }}
                </span>
              </div>
              <p class="mt-1 font-medium text-cyan-200">{{ props.t.experienceCompanies[index] }}</p>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:justify-end">
              <span class="rounded-full border border-white/10 bg-white/3 px-3 py-1">
                {{ exp.period.replace('Present', props.t.present) }}
              </span>
              <span class="rounded-full border border-white/10 px-3 py-1">{{ props.t.experienceTypes[index] }}</span>
            </div>
          </div>
          <p class="mt-3 text-xs text-slate-500">
            <i class="fa-solid fa-location-dot mr-1.5" aria-hidden="true"></i>{{ props.t.phnomPenh }}
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-300">{{ props.t.experienceDescriptions[index] }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in exp.tags"
              :key="tag"
              class="rounded-full border border-cyan-200/10 bg-cyan-200/4.5 px-3 py-1 text-xs font-medium text-slate-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
