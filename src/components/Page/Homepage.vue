 <script setup>
 import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
 import { ArrowUpRight, Sparkles } from 'lucide-vue-next'
 import { usePreferencesStore } from '@/stores/preferences'

 const props = defineProps({ t: { type: Object, required: true } })
 const emit = defineEmits(['motion-change'])
 const preferences = usePreferencesStore()
 const githubUrl =
   'https://github.com/kunvinthien-cyber?tab=overview&from=2026-04-01&to=2026-04-30'
 const navItems = [
   { id: 'about', label: 'about' },
   { id:'education', label:'education'},
   { id: 'projects', label: 'caseStudies' },
   { id: 'skills', label: 'stack' },
   { id: 'experience', label: 'experience' },
   { id: 'contact', label: 'contact' },
 ]

 const isOpen = ref(false)
 const activeSection = ref('')
 const hasScrolled = ref(false)
 const isNavHidden = ref(false)
 const headerElement = ref(null)
 const menuToggle = ref(null)
 const mobileNavigation = ref(null)
 let sectionObserver
 let sectionResizeFrame = null
 let scrollFrame = null
 let previousScrollY = 0
 let lastScrollDirection = 0
 let directionDistance = 0

 const closeMenu = (restoreFocus = false) => {
   if (!isOpen.value) return
   isOpen.value = false
   if (restoreFocus) nextTick(() => menuToggle.value?.focus())
 }

 const toggleMenu = () => {
   if (isOpen.value) closeMenu()
   else {
     isOpen.value = true
     isNavHidden.value = false
     nextTick(() => {
       const firstItem = mobileNavigation.value?.querySelector('a[href], button:not([disabled])')
       firstItem?.focus()
     })
   }
 }

 const scrollToSection = (section) => {
   const target = document.getElementById(section)
   if (target) {
     window.history.pushState(null, '', `#${section}`)
     const behavior = preferences.motionEnabled ? 'smooth' : 'auto'
     target.scrollIntoView({ behavior })
   }
   closeMenu()
 }

 const handleMenuKeydown = (event) => {
   if (event.key === 'Escape') {
     closeMenu(true)
     return
   }

   if (event.key !== 'Tab' || !isOpen.value) return

   const focusableItems = Array.from(
     mobileNavigation.value?.querySelectorAll('a[href], button:not([disabled])') || [],
   ).filter((item) => item.getClientRects().length > 0)
   if (!focusableItems.length) return

   const firstItem = focusableItems[0]
   const lastItem = focusableItems[focusableItems.length - 1]
   if (!mobileNavigation.value.contains(document.activeElement)) {
     event.preventDefault()
     if (event.shiftKey) lastItem.focus()
     else firstItem.focus()
   } else if (event.shiftKey && document.activeElement === firstItem) {
     event.preventDefault()
     lastItem.focus()
   } else if (!event.shiftKey && document.activeElement === lastItem) {
     event.preventDefault()
     firstItem.focus()
   }
 }

 const closeOnOutsideClick = (event) => {
   if (isOpen.value && !headerElement.value?.contains(event.target)) closeMenu()
 }

 const updateNavState = () => {
   scrollFrame = null
   const currentScrollY = Math.max(window.scrollY, 0)
   const delta = currentScrollY - previousScrollY
   hasScrolled.value = currentScrollY > 24

   if (currentScrollY < 80) {
     isNavHidden.value = false
     directionDistance = 0
   } else if (delta !== 0) {
     const direction = Math.sign(delta)
     if (direction !== lastScrollDirection) {
       lastScrollDirection = direction
       directionDistance = 0
     }
     directionDistance += Math.abs(delta)

     if (directionDistance >= 12) {
       isNavHidden.value = direction > 0
       directionDistance = 0
     }
   }

   if (isOpen.value || headerElement.value?.contains(document.activeElement)) {
     isNavHidden.value = false
   }
   previousScrollY = currentScrollY
 }

 const scheduleNavStateUpdate = () => {
   if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(updateNavState)
 }

 const setLanguage = (language) => {
   preferences.setLanguage(language)
 }

 const toggleMotion = () => {
   preferences.toggleMotion()
   emit('motion-change')
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
   previousScrollY = window.scrollY
   observeSections()
   window.addEventListener('keydown', handleMenuKeydown)
   document.addEventListener('pointerdown', closeOnOutsideClick)
   window.addEventListener('scroll', scheduleNavStateUpdate, { passive: true })
   window.addEventListener('resize', scheduleSectionObserver, { passive: true })
   updateNavState()
 })

 onBeforeUnmount(() => {
   sectionObserver?.disconnect()
   window.removeEventListener('resize', scheduleSectionObserver)
   if (sectionResizeFrame) window.cancelAnimationFrame(sectionResizeFrame)
   window.removeEventListener('scroll', scheduleNavStateUpdate)
   if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame)
   window.removeEventListener('keydown', handleMenuKeydown)
   document.removeEventListener('pointerdown', closeOnOutsideClick)
 })
 </script>

 <template>
   <div class="w-full max-w-6xl px-3 mx-auto sm:px-6">
     <header
       ref="headerElement"
       :class="{ 'nav-scrolled': hasScrolled, 'nav-hidden': isNavHidden && !isOpen }"
       class="relative flex items-center justify-between gap-3 px-4 border shadow-lg hero-nav min-h-17 rounded-2xl border-zinc-800/80 bg-zinc-950/55 shadow-black/10 backdrop-blur-md sm:gap-4 sm:px-5"
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

       <nav :aria-label="props.t.mainNavigation" class="items-center hidden gap-0.5 xl:gap-1 lg:flex">
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

       <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
         <div class="items-center hidden p-1 text-xs border rounded-full border-white/10 bg-white/3 sm:flex">
           <button
             type="button"
             class="preference-button"
             :class="{ 'preference-button-active': preferences.language === 'en' }"
             :aria-pressed="preferences.language === 'en'"
             :aria-label="`${props.t.language}: English`"
             @click="setLanguage('en')"
           >
             EN
           </button>
           <button
             type="button"
             class="preference-button"
             :class="{ 'preference-button-active': preferences.language === 'kh' }"
             :aria-pressed="preferences.language === 'kh'"
             :aria-label="`${props.t.language}: Khmer`"
             @click="setLanguage('kh')"
           >
             ខ្មែរ
           </button>
         </div>
         <button
           type="button"
           class="theme-toggle motion-toggle inline-flex gap-1.5 px-2"
           :aria-pressed="preferences.motionEnabled"
           :aria-label="preferences.motionEnabled ? props.t.disableAnimations : props.t.enableAnimations"
           :title="preferences.motionEnabled ? props.t.disableAnimations : props.t.enableAnimations"
           @click="toggleMotion"
         >
           <Sparkles :size="16" aria-hidden="true" />
           <span class="text-xs lg:hidden">
             {{ preferences.motionEnabled ? props.t.animationsOn : props.t.animationsOff }}
           </span>
         </button>
         <button
           type="button"
           class="hidden theme-toggle sm:inline-flex"
           :aria-pressed="preferences.theme === 'light'"
           :aria-label="`${props.t.theme}: ${preferences.theme === 'dark' ? 'light' : 'dark'}`"
           @click="preferences.toggleTheme()"
         >
           <i :class="preferences.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" aria-hidden="true"></i>
         </button>
         <a
           :href="githubUrl"
           target="_blank"
           rel="noopener noreferrer"
           class="hidden min-h-10 px-3 text-sm button-secondary xl:px-4 sm:inline-flex"
         >
           <i class="fa-brands fa-github" aria-hidden="true"></i>
           <span>GitHub</span>
         </a>
         <a href="#contact" class="btn-3d hidden hire-button sm:inline-flex" @click.prevent="scrollToSection('contact')">
           {{ props.t.hireMe }}
           <ArrowUpRight :size="14" aria-hidden="true" />
         </a>

         <button
           ref="menuToggle"
           type="button"
           class="flex items-center justify-center w-10 h-10 transition-colors border rounded-full border-white/10 text-slate-200 hover:bg-white/10 lg:hidden"
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
           ref="mobileNavigation"
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
               class="text-xs fa-solid fa-arrow-right"
               aria-hidden="true"
             ></i>
           </a>
           <a
             :href="githubUrl"
             target="_blank"
             rel="noopener noreferrer"
             class="flex items-center gap-2 px-4 py-3 mt-1 text-sm border-t rounded-xl border-white/10 text-slate-300"
           >
             <i class="fa-brands fa-github" aria-hidden="true"></i>
             {{ props.t.viewGitHub }}
           </a>
           <a
             href="#contact"
             class="btn-3d flex w-full mt-2 hire-button"
             @click.prevent="scrollToSection('contact')"
           >
             {{ props.t.hireMe }}
             <ArrowUpRight :size="14" aria-hidden="true" />
           </a>
            <div class="flex items-center p-1 text-xs border rounded-full border-white/10 bg-white/3 sm:hidden">
              <button
                type="button"
                class="preference-button"
                :class="{ 'preference-button-active': preferences.language === 'en' }"
                :aria-pressed="preferences.language === 'en'"
                aria-label="English"
                @click="setLanguage('en')"
              >
                EN
              </button>
              <button
                type="button"
                class="preference-button"
                :class="{ 'preference-button-active': preferences.language === 'kh' }"
                :aria-pressed="preferences.language === 'kh'"
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