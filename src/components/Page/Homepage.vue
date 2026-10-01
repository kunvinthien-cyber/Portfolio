 <script setup>
 import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
 import { ArrowUpRight } from 'lucide-vue-next'
 import { usePreferencesStore } from '@/stores/preferences'

 const props = defineProps({ t: { type: Object, required: true } })
 const preferences = usePreferencesStore()
 const githubUrl =
   'https://github.com/kunvinthien-cyber?tab=overview&from=2026-04-01&to=2026-04-30'
 const navItems = [
   { id: 'projects', label: 'projects' },
   { id: 'case-studies', label: 'caseStudies' },
   { id: 'skills', label: 'stack' },
   { id: 'experience', label: 'experience' },
   { id: 'contact', label: 'contact' },
 ]

 const isOpen = ref(false)
 const activeSection = ref('')
 const hasScrolled = ref(false)
 const headerElement = ref(null)
 const menuToggle = ref(null)
 let sectionObserver
 let sectionResizeFrame = null

 const closeMenu = (restoreFocus = false) => {
   if (!isOpen.value) return
   isOpen.value = false
   if (restoreFocus) nextTick(() => menuToggle.value?.focus())
 }

 const toggleMenu = () => {
   if (isOpen.value) closeMenu()
   else isOpen.value = true
 }

 const scrollToSection = (section) => {
   const target = document.getElementById(section)
   if (target) {
     window.history.pushState(null, '', `#${section}`)
     target.scrollIntoView({ behavior: 'smooth' })
   }
   closeMenu()
 }

 const closeOnEscape = (event) => {
   if (event.key === 'Escape') closeMenu(true)
 }

 const closeOnOutsideClick = (event) => {
   if (isOpen.value && !headerElement.value?.contains(event.target)) closeMenu()
 }

 const updateNavState = () => {
   hasScrolled.value = window.scrollY > 24
 }

 const setLanguage = (language) => {
   preferences.setLanguage(language)
 }

 const observeSections = () => {
   sectionObserver?.disconnect()
   if (!('IntersectionObserver' in window)) return

   const viewportHeight = window.innerHeight
   const bandHeight = Math.max(24, Math.round(viewportHeight * 0.04))
   const topMargin = Math.round(viewportHeight * 0.36)
   const bottomMargin = Math.max(0, viewportHeight - topMargin - bandHeight)

   // Compute vertical margins from height; percentage margins are based on viewport width.
   sectionObserver = new IntersectionObserver(
     (entries) => {
       const entering = entries
         .filter((entry) => entry.isIntersecting)
         .sort((a, b) => b.intersectionRect.height - a.intersectionRect.height)[0]

       if (entering) activeSection.value = entering.target.id
       else if (entries.some((entry) => entry.target.id === activeSection.value)) activeSection.value = ''
     },
     {
       rootMargin: `-${topMargin}px 0px -${bottomMargin}px 0px`,
       threshold: 0,
     },
   )

   navItems.forEach(({ id }) => {
     const section = document.getElementById(id)
     if (section) sectionObserver.observe(section)
   })
 }

 const scheduleSectionObserver = () => {
   if (sectionResizeFrame) window.cancelAnimationFrame(sectionResizeFrame)
   sectionResizeFrame = window.requestAnimationFrame(() => {
     sectionResizeFrame = null
     observeSections()
   })
 }

 onMounted(() => {
   observeSections()
   window.addEventListener('keydown', closeOnEscape)
   document.addEventListener('pointerdown', closeOnOutsideClick)
   window.addEventListener('scroll', updateNavState, { passive: true })
   window.addEventListener('resize', scheduleSectionObserver, { passive: true })
   updateNavState()
 })

 onBeforeUnmount(() => {
   sectionObserver?.disconnect()
   window.removeEventListener('resize', scheduleSectionObserver)
   if (sectionResizeFrame) window.cancelAnimationFrame(sectionResizeFrame)
   window.removeEventListener('keydown', closeOnEscape)
   document.removeEventListener('pointerdown', closeOnOutsideClick)
   window.removeEventListener('scroll', updateNavState)
 })
 </script>

 <template>
   <div class="mx-auto w-full max-w-6xl px-3 sm:px-6">
     <header
       ref="headerElement"
       :class="{ 'nav-scrolled': hasScrolled }"
       class="hero-nav relative flex min-h-[4.25rem] items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/55 px-4 shadow-lg shadow-black/10 backdrop-blur-md sm:px-5"
     >
       <a
         href="#home"
         class="shrink-0 text-sm font-bold tracking-[0.13em] text-white sm:text-base"
         @click.prevent="scrollToSection('home')"
       >
         <span class="brand-mark">
           KV<span class="text-lime-400">.</span>DEV
           <span class="brand-online" :aria-label="props.t.online"></span>
         </span>
       </a>

       <nav :aria-label="props.t.mainNavigation" class="hidden items-center gap-1 lg:flex">
         <a
           v-for="item in navItems"
           :key="item.id"
           :href="`#${item.id}`"
           :aria-current="activeSection === item.id ? 'location' : undefined"
           :class="[
             'rounded-full px-3 py-2 text-sm transition-colors duration-200',
             activeSection === item.id
               ? 'bg-white/10 text-cyan-200'
               : 'text-slate-400 hover:text-white',
           ]"
           @click.prevent="scrollToSection(item.id)"
         >
           {{ props.t[item.label] }}
         </a>
       </nav>

       <div class="flex items-center gap-2">
         <div class="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs sm:flex">
           <button
             type="button"
             class="preference-button"
             :class="{ 'preference-button-active': preferences.language === 'en' }"
             :aria-label="`${props.t.language}: English`"
             @click="setLanguage('en')"
           >
             EN
           </button>
           <button
             type="button"
             class="preference-button"
             :class="{ 'preference-button-active': preferences.language === 'kh' }"
             :aria-label="`${props.t.language}: Khmer`"
             @click="setLanguage('kh')"
           >
             ខ្មែរ
           </button>
         </div>
         <button
           type="button"
           class="theme-toggle hidden sm:inline-flex"
           :aria-label="`${props.t.theme}: ${preferences.theme === 'dark' ? 'light' : 'dark'}`"
           @click="preferences.toggleTheme()"
         >
           <i :class="preferences.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" aria-hidden="true"></i>
         </button>
         <a
           :href="githubUrl"
           target="_blank"
           rel="noopener noreferrer"
           class="button-secondary hidden min-h-10 px-4 text-sm sm:inline-flex"
         >
           <i class="fa-brands fa-github" aria-hidden="true"></i>
           <span>GitHub</span>
         </a>
         <a href="#contact" class="hire-button hidden sm:inline-flex" @click.prevent="scrollToSection('contact')">
           {{ props.t.hireMe }}
           <ArrowUpRight :size="14" aria-hidden="true" />
         </a>

         <button
           ref="menuToggle"
           type="button"
           class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition-colors hover:bg-white/10 lg:hidden"
           :aria-expanded="isOpen"
           aria-controls="mobile-navigation"
           :aria-label="isOpen ? props.t.closeMenu : props.t.openMenu"
           @click="toggleMenu"
         >
           <span class="sr-only">{{ isOpen ? props.t.closeMenu : props.t.openMenu }}</span>
           <i :class="isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" aria-hidden="true"></i>
         </button>
       </div>

       <Transition
         enter-active-class="transition duration-200 ease-out"
         enter-from-class="-translate-y-2 opacity-0"
         enter-to-class="translate-y-0 opacity-100"
         leave-active-class="transition duration-150 ease-in"
         leave-from-class="translate-y-0 opacity-100"
         leave-to-class="-translate-y-2 opacity-0"
       >
         <nav
           v-if="isOpen"
           id="mobile-navigation"
           :aria-label="props.t.mobileNavigation"
           class="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
         >
           <a
             v-for="item in navItems"
             :key="item.id"
             :href="`#${item.id}`"
             :aria-current="activeSection === item.id ? 'location' : undefined"
             :class="[
               'flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors',
               activeSection === item.id
                 ? 'bg-cyan-300/10 text-cyan-200'
                 : 'text-slate-300 hover:bg-white/5 hover:text-white',
             ]"
             @click.prevent="scrollToSection(item.id)"
           >
             {{ props.t[item.label] }}
             <i
               v-if="activeSection === item.id"
               class="fa-solid fa-arrow-right text-xs"
               aria-hidden="true"
             ></i>
           </a>
           <a
             :href="githubUrl"
             target="_blank"
             rel="noopener noreferrer"
             class="mt-1 flex items-center gap-2 rounded-xl border-t border-white/10 px-4 py-3 text-sm text-slate-300"
           >
             <i class="fa-brands fa-github" aria-hidden="true"></i>
             {{ props.t.viewGitHub }}
           </a>
           <a
             href="#contact"
             class="hire-button mt-2 flex w-full"
             @click.prevent="scrollToSection('contact')"
           >
             {{ props.t.hireMe }}
             <ArrowUpRight :size="14" aria-hidden="true" />
           </a>
            <div class="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs sm:hidden">
              <button
                type="button"
                class="preference-button"
                :class="{ 'preference-button-active': preferences.language === 'en' }"
                aria-label="English"
                @click="setLanguage('en')"
              >
                EN
              </button>
              <button
                type="button"
                class="preference-button"
                :class="{ 'preference-button-active': preferences.language === 'kh' }"
                aria-label="Khmer"
                @click="setLanguage('kh')"
              >
                ខ្មែរ
              </button>
            </div>
            <button
              type="button"
              class="theme-toggle sm:hidden"
              :aria-label="`${props.t.theme}: ${preferences.theme === 'dark' ? 'light' : 'dark'}`"
              @click="preferences.toggleTheme()"
            >
              <i :class="preferences.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" aria-hidden="true"></i>
            </button>
         </nav>
       </Transition>
     </header>
   </div>
 </template>