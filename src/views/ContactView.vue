<script setup>
import { computed } from 'vue'
import ContactPage from '@/components/Page/ContactPage.vue'
import { usePreferencesStore } from '@/stores/preferences'
import { translations } from '@/data/translations'

const preferences = usePreferencesStore()
const t = computed(() => translations[preferences.language])
</script>

<template>
  <div class="contact-view">
    <!-- Contact -->
    <section class="container mx-auto px-4 py-5" id="contact">
      <ContactPage :t="t" />
    </section>
  </div>
</template>