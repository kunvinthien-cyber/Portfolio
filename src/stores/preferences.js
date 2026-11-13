import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem('portfolio-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const getInitialMotionEnabled = () => {
  if (typeof window === 'undefined') return true
  const saved = window.localStorage.getItem('portfolio-motion')
  if (saved === 'on') return true
  if (saved === 'off') return false
  return true
}

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref(getInitialTheme())
  const motionEnabled = ref(getInitialMotionEnabled())
  const hasMotionOverride = ref(
    typeof window !== 'undefined' &&
      ['on', 'off'].includes(window.localStorage.getItem('portfolio-motion')),
  )
  const language = ref(
    typeof window !== 'undefined' && window.localStorage.getItem('portfolio-language') === 'kh'
      ? 'kh'
      : 'en',
  )

  const isKhmer = computed(() => language.value === 'kh')

  function setTheme(value) {
    theme.value = value
    window.localStorage.setItem('portfolio-theme', value)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  function toggleMotion() {
    motionEnabled.value = !motionEnabled.value
    hasMotionOverride.value = true
    window.localStorage.setItem('portfolio-motion', motionEnabled.value ? 'on' : 'off')
  }

  function syncMotionPreference(prefersReducedMotion) {
    if (!hasMotionOverride.value) motionEnabled.value = !prefersReducedMotion
  }

  function setLanguage(value) {
    language.value = value
    window.localStorage.setItem('portfolio-language', value)
  }

  return {
    theme,
    motionEnabled,
    language,
    isKhmer,
    setTheme,
    toggleTheme,
    toggleMotion,
    syncMotionPreference,
    setLanguage,
  }
})
