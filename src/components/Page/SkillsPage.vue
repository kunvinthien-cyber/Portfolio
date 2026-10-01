<script setup>
const props = defineProps({ t: { type: Object, required: true } })

const groups = [
  {
    name: 'Frontend',
    skills: [
      {
        name: 'HTML',
        icon: 'fa-brands fa-html5',
        color: 'text-orange-300',
      },
      {
        name: 'CSS',
        icon: 'fa-brands fa-css3-alt',
        color: 'text-blue-300',
      },
      {
        name: 'JavaScript',
        icon: 'fa-brands fa-js',
        color: 'text-yellow-300',
      },
      {
        name: 'Vue.js',
        icon: 'fa-brands fa-vuejs',
        color: 'text-emerald-300',
      },
      {
        name: 'Tailwind CSS',
        icon: 'fa-solid fa-wind',
        color: 'text-cyan-200',
      },
    ],
  },
  {
    name: 'Backend & data',
    skills: [
      {
        name: 'php',
        icon: 'fa-brands fa-php',
        color: 'text-violet-300',
      },
      {
        name: 'Laravel',
        icon: 'fa-brands fa-laravel',
        color: 'text-rose-300',
      },
      {
        name: 'MySQL',
        icon: 'fa-solid fa-database',
        color: 'text-sky-200',
      },
    ],
  },
  {
    name: 'Tools & workflow',
    skills: [
      {
        name: 'Git',
        icon: 'fa-brands fa-git-alt',
        color: 'text-orange-300',
      },
    ],
  },
]
</script>

<template>
  <div class="section-shell">
    <div class="mb-8 max-w-xl">
      <p class="section-kicker">{{ props.t.skillsKicker }}</p>
      <h2 class="section-title mt-2">{{ props.t.skillsTitle }}</h2>
      <p class="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
        {{ props.t.skillsIntro }}
      </p>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <section
        v-for="(group, groupIndex) in groups"
        :key="group.name"
        class="surface-card rounded-2xl p-5 sm:p-6"
        :aria-label="`${props.t.skillGroups[groupIndex].name} ${props.t.skillsTitle}`"
      >
        <div class="mb-5 border-b border-white/10 pb-4">
          <h3 class="text-lg font-semibold text-white">{{ props.t.skillGroups[groupIndex].name }}</h3>
          <p class="mt-1 text-xs text-slate-500">{{ props.t.skillGroups[groupIndex].summary }}</p>
        </div>
        <ul class="space-y-2.5">
          <li
            v-for="skill in group.skills"
            :key="skill.name"
            class="skill-item group rounded-xl border border-transparent px-3 py-3 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.035]"
            :style="{ '--skill-delay': `${group.skills.indexOf(skill) * 55}ms` }"
          >
            <div class="flex items-center gap-3">
              <i :class="[skill.icon, skill.color]" class="w-5 text-center text-lg" aria-hidden="true"></i>
              <h4 class="text-sm font-semibold text-slate-100">{{ skill.name }}</h4>
            </div>
            <p class="mt-2 pl-8 text-xs leading-5 text-slate-400">{{ props.t.skillDescriptions[skill.name] }}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
