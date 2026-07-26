// ...existing code...
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const slides = [
  {
    emoji: '🖼️',
    title: 'Dashboard Preview',
    subtitle: 'Current admin UI',
    img: new URL('@/assets/IMG/e-com.jpg', import.meta.url).href,
    points: ['Screenshot of the product & cart layout'],
  },
  {
    emoji: '📊',
    title: 'Overview',
    subtitle: 'Key metrics at a glance',
    points: ['Active users, sessions, and retention', 'Realtime charts and status badges'],
  },
  {
    emoji: '👥',
    title: 'User Management',
    subtitle: 'Manage accounts & roles',
    img: new URL('@/assets/IMG/user-management.jpg', import.meta.url).href,
    points: ['Invite, suspend, or delete users', 'Assign roles and permissions'],
  },
  {
    emoji: '⚙️',
    title: 'Settings',
    subtitle: 'Configure system preferences',
    img: new URL('@/assets/IMG/settings.jpg', import.meta.url).href,
    points: ['Feature toggles & integrations', 'Audit logs and change history'],
  },
  {
    emoji: '🔒',
    title: 'Security',
    subtitle: 'Monitor and protect',
    img: new URL('@/assets/IMG/security.jpg', import.meta.url).href,
    points: ['2FA status and SSO settings', 'Recent security events and alerts'],
  },
]

const idx = ref(0)
const length = slides.length
const active = computed(() => slides[idx.value])

const next = () => {
  idx.value = (idx.value + 1) % length
}
const prev = () => {
  idx.value = (idx.value - 1 + length) % length
}
const goTo = (i) => {
  idx.value = i % length
}

let timer = null
const startAutoplay = () => {
  stopAutoplay()
  timer = setInterval(next, 6000)
}
const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const onKey = (e) => {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  stopAutoplay()
  window.removeEventListener('keydown', onKey)
})
</script>
  
<template>
  <section class="slider" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <header class="slider-header">
      <h1>Admin Dashboard</h1>
      <p class="muted">Slide to explore dashboard sections</p>
    </header>

    <div class="viewport">
      <div
        class="track"
        :style="{ transform: `translateX(-${idx * 100}%)` }"
        role="list"
        aria-live="polite"
      >
        <article v-for="(s, i) in slides" :key="i" class="slide" role="listitem">
          <div class="card">
            <!-- added image support -->
            <img v-if="s.img" :src="s.img" :alt="s.title" class="card-image" />
            <div class="card-emoji" aria-hidden="true">{{ s.emoji }}</div>
            <h2 class="card-title">{{ s.title }}</h2>
            <p class="card-sub">{{ s.subtitle }}</p>
            <ul class="card-points">
              <li v-for="(p, j) in s.points" :key="j">{{ p }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>

    <div class="controls">
      <button class="btn" @click="prev" aria-label="Previous slide">◀</button>
      <div class="indicators" role="tablist" aria-label="Slides">
        <button
          v-for="(_, i) in slides"
          :key="i"
          :class="['dot', { active: i === idx }]"
          @click="goTo(i)"
          :aria-selected="i === idx"
          role="tab"
          :aria-label="`Go to ${slides[i].title}`"
        />
      </div>
      <button class="btn" @click="next" aria-label="Next slide">▶</button>
    </div>
  </section>
</template>

<style scoped>
/* ...existing code... */

.card-image {
  width: 100%;
  max-height: 220px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #eee;
}

/* ...existing code... */
</style>
// ...existing code...