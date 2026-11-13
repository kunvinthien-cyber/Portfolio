<!-- App.vue -->
<script setup>
import { RouterView } from 'vue-router'
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()
</script>

<template>
  <div
    class="app-shell flex min-h-screen w-full flex-col items-center overflow-x-clip"
    :class="{ 'motion-enabled': preferences.motionEnabled }"
  >
    <RouterView v-slot="{ Component }">
      <Transition name="route" mode="out-in" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>