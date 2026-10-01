<script setup>
defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
  t: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <div
    v-if="project.preview"
    class="project-artwork project-artwork-real relative flex h-full min-h-44 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-3 sm:p-5"
  >
    <img
      :src="project.preview"
      :alt="`${project.name} — ${t.projectPreview}`"
      loading="lazy"
      class="project-real-preview max-h-full max-w-full rounded-lg object-contain shadow-2xl"
    />
    <span class="project-preview-label absolute left-3 top-3 rounded-full border border-white/15 bg-slate-950/85 px-3 py-1 text-[0.65rem] font-semibold text-slate-100 backdrop-blur">
      {{ t.projectPreview }}
    </span>
  </div>

  <div
    v-else
    role="img"
    :aria-label="t.abstractDescription.replace('{project}', project.name)"
    :class="['project-artwork', `artwork-${project.visual}`, { 'project-artwork-compact': compact }]"
  >
    <div class="artwork-glow" aria-hidden="true"></div>

    <template v-if="project.visual === 'commerce'">
      <div class="art-window commerce-window" aria-hidden="true">
        <div class="art-window-bar"><i></i><i></i><i></i><span>{{ t.storefrontConcept }}</span></div>
        <div class="commerce-layout">
          <div class="commerce-product">
            <span class="commerce-product-art"><i class="fa-solid fa-box"></i></span>
            <span class="art-line art-line-wide"></span>
            <span class="art-line art-line-short"></span>
          </div>
          <div class="commerce-product commerce-product-offset">
            <span class="commerce-product-art commerce-product-art-alt"><i class="fa-solid fa-tag"></i></span>
            <span class="art-line art-line-wide"></span>
            <span class="art-line art-line-short"></span>
          </div>
          <div class="commerce-cart"><i class="fa-solid fa-cart-shopping"></i></div>
        </div>
      </div>
      <span class="art-caption">{{ t.abstractVisual }}</span>
    </template>

    <template v-else-if="project.visual === 'pos'">
      <div class="art-terminal" aria-hidden="true">
        <div class="terminal-top"><i></i><i></i><i></i><span>{{ t.pointOfSale }}</span></div>
        <div class="terminal-content">
          <span class="terminal-prompt">&gt; {{ t.manageSalesInventory }}</span>
          <span class="terminal-code"><b>product</b> <em>→</em> {{ t.cart }}</span>
          <span class="terminal-code"><b>{{ t.sales }}</b> <em>→</em> {{ t.receipt }}</span>
          <span class="terminal-cursor"></span>
        </div>
        <div class="terminal-database"><i class="fa-solid fa-database"></i><span>MySQL</span></div>
      </div>
      <span class="art-caption">{{ t.abstractVisual }}</span>
    </template>

    <template v-else-if="project.visual === 'team'">
      <div class="team-board" aria-hidden="true">
        <div class="team-board-top"><span>Nuxt.js</span><span>Supabase</span></div>
        <div class="team-flow">
          <span class="team-node"><i class="fa-solid fa-code"></i></span>
          <span class="team-connector"></span>
          <span class="team-node team-node-accent"><i class="fa-solid fa-users"></i></span>
          <span class="team-connector"></span>
          <span class="team-node"><i class="fa-solid fa-layer-group"></i></span>
        </div>
        <div class="team-lines"><i></i><i></i><i></i></div>
      </div>
      <span class="art-caption">{{ t.abstractVisual }}</span>
    </template>

    <template v-else-if="project.visual === 'study'">
      <div class="study-stack" aria-hidden="true">
        <div class="study-book study-book-back"></div>
        <div class="study-book study-book-front">
          <span class="study-mark"><i class="fa-solid fa-book-open"></i></span>
          <span class="study-lines"><i></i><i></i><i></i></span>
          <span class="study-tabs"><i></i><i></i><i></i></span>
        </div>
        <span class="study-orbit study-orbit-one"></span>
        <span class="study-orbit study-orbit-two"></span>
      </div>
      <span class="art-caption">{{ t.abstractVisual }}</span>
    </template>

    <template v-else>
      <div class="portfolio-window" aria-hidden="true">
        <div class="portfolio-window-bar"><i></i><i></i><i></i><span>Vue · Tailwind CSS</span></div>
        <div class="portfolio-window-content">
          <div class="portfolio-monogram">&lt;<b>/</b>&gt;</div>
          <div class="portfolio-copy">
            <span class="art-line art-line-short"></span>
            <span class="portfolio-headline">{{ t.personalPortfolio }}</span>
            <span class="art-line art-line-wide"></span>
          </div>
          <div class="portfolio-side-rail"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
      <span class="art-caption">{{ t.abstractVisual }}</span>
    </template>

    <span class="art-project-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
  </div>
</template>
