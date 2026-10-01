import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem('portfolio-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref(getInitialTheme())
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

  function setLanguage(value) {
    language.value = value
    window.localStorage.setItem('portfolio-language', value)
  }

  return { theme, language, isKhmer, setTheme, toggleTheme, setLanguage }
})
