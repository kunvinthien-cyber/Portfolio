<script setup>
const props = defineProps({ t: { type: Object, required: true } })

const educations = [
  {
    year: '2021 - 2024',
    school: 'Royal University of Phnom Penh',
  },
  {
    year: '2018 - 2021',
    school: 'Kiri Vong High School',
  },
]
</script>

<template>
  <div class="section-shell">
    <div class="mb-8">
      <p class="section-kicker">{{ props.t.educationKicker }}</p>
      <h2 class="section-title mt-2">{{ props.t.educationTitle }}</h2>
    </div>

    <div class="relative space-y-4 sm:space-y-5">
      <div class="absolute bottom-8 left-[5.45rem] top-8 hidden w-px bg-linear-to-b from-cyan-300/60 via-slate-700 to-transparent sm:block"></div>
      <article
        v-for="(item, index) in educations"
        :key="item.year"
        class="relative grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-6"
      >
        <div class="flex items-center gap-3 sm:justify-end sm:gap-0">
          <span class="h-2.5 w-2.5 rounded-full border-2 border-cyan-200 bg-slate-950 sm:absolute sm:left-[5.15rem]"></span>
          <p class="text-sm font-semibold text-cyan-200 sm:pr-8">{{ item.year }}</p>
        </div>
        <div class="surface-card rounded-2xl p-5 sm:p-6">
          <div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <h3 class="text-lg font-semibold leading-snug text-white">{{ item.school }}</h3>
            <i class="fa-solid fa-graduation-cap hidden text-lg text-cyan-200 sm:block" aria-hidden="true"></i>
          </div>
          <p class="mt-1 text-sm font-medium text-sky-200">{{ props.t.educationDegrees[index] }}</p>
          <p class="mt-3 text-sm leading-7 text-slate-400">{{ props.t.educationDescriptions[index] }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
