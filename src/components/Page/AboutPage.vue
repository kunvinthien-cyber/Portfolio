<script setup>
const props = defineProps({ t: { type: Object, required: true } })

const details = [
  {
    icon: 'fa-location-dot',
    href: 'https://www.google.com/maps/@11.549371,104.884611,16z?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D',
  },
  { icon: 'fa-briefcase' },
  { icon: 'fa-graduation-cap' },
  { icon: 'fa-code' },
  { icon: 'fa-language' },
  { icon: 'fa-circle-check', available: true },
]
</script>

<template>
  <div class="section-shell">
    <div class="mb-8 max-w-2xl">
      <p class="section-kicker">{{ props.t.aboutKicker }}</p>
      <h2 class="section-title mt-2">{{ props.t.aboutTitle }}</h2>
      <div class="mt-4 h-1 w-12 rounded-full bg-cyan-300"></div>
    </div>

    <div class="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
      <div class="surface-card rounded-3xl p-6 sm:p-8">
        <p
          v-for="(paragraph, index) in props.t.aboutParagraphs"
          :key="index"
          :class="index ? 'mt-5' : ''"
          class="leading-8 text-slate-300"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <article
          v-for="(detail, index) in details"
          :key="index"
          class="surface-card flex items-center gap-4 rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
            <i :class="['fa-solid', detail.icon]" aria-hidden="true"></i>
          </span>
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {{ props.t.aboutDetails[index].label }}
            </p>
            <a
              v-if="detail.href"
              :href="detail.href"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-0.5 block text-sm font-medium text-slate-100 transition-colors hover:text-cyan-100"
            >
              {{ props.t.aboutDetails[index].value }}
            </a>
            <p
              v-else
              :class="detail.available ? 'text-emerald-300' : 'text-slate-100'"
              class="mt-0.5 text-sm font-medium"
            >
              {{ props.t.aboutDetails[index].value }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
