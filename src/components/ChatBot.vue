<template>
  <div class="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-3 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 scale-100 opacity-100"
      leave-to-class="translate-y-2 scale-95 opacity-0"
    >
      <section
        v-if="isOpen"
        class="mb-4 flex h-[min(640px,calc(100dvh-6rem))] w-[min(390px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.38)] ring-1 ring-black/5 dark:border-white/10 dark:bg-slate-950 dark:ring-white/10"
        aria-label="Portfolio assistant chat"
      >
        <header class="relative shrink-0 overflow-hidden bg-slate-950 px-5 py-5 text-white">
          <div class="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-indigo-500/30 blur-3xl"></div>
          <div class="relative flex items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <div class="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <span class="text-xl" aria-hidden="true">✦</span>
                <span class="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-400"></span>
              </div>
              <div class="min-w-0">
                <h3 class="truncate text-sm font-semibold tracking-wide">Kun's Portfolio Assistant</h3>
                <p class="mt-1 flex items-center gap-1.5 text-xs text-slate-300">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Here to help
                </p>
              </div>
            </div>
            <button
              @click="isOpen = false"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
        </header>

        <div
          ref="messagesContainer"
          class="flex-1 space-y-4 overflow-y-auto bg-slate-50/80 p-4 dark:bg-slate-900/70 sm:p-5"
        >
          <div
            v-if="messages.length === 0"
            class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-800"
          >
            <p class="text-sm font-semibold text-slate-900 dark:text-white">
              👋 Hi, I'm Kun's assistant.
            </p>
            <p class="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Ask me about Kun's background, projects, skills, or contact details.
            </p>
            <div class="mt-4 space-y-2">
              <button
                v-for="question in quickQuestions"
                :key="question"
                @click="sendMessage(question)"
                class="group flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-200"
              >
                <span>{{ question }}</span>
                <span class="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div
            v-for="(message, index) in messages"
            :key="index"
            class="flex"
            :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[88%] whitespace-pre-wrap wrap-break-word rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm"
              :class="
                message.role === 'user'
                  ? 'rounded-br-md bg-indigo-600 text-white'
                  : 'rounded-bl-md border border-slate-200/80 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100'
              "
            >
              {{ message.content }}
            </div>
          </div>

          <div v-if="isLoading" class="flex justify-start">
            <div class="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200/80 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-800">
              <span class="text-xs text-slate-500 dark:text-slate-400">Thinking</span>
              <span class="flex gap-1" aria-label="Loading">
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.2s]"></span>
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.1s]"></span>
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400"></span>
              </span>
            </div>
          </div>
        </div>

        <form
          @submit.prevent="sendMessage()"
          class="shrink-0 border-t border-slate-200/80 bg-white p-3 dark:border-white/10 dark:bg-slate-950 sm:p-4"
        >
          <div class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-white/10 dark:bg-slate-900">
            <input
              v-model="input"
              :disabled="isLoading"
              type="text"
              placeholder="Write a message..."
              maxlength="2000"
              aria-label="Message"
              class="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60 dark:text-white"
            />
            <button
              type="submit"
              :disabled="isLoading || !input.trim()"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-700"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <p class="mt-2 text-center text-[10px] text-slate-400">Answers are based on the information in this portfolio.</p>
        </form>
      </section>
    </Transition>

    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="group relative flex h-14 items-center gap-2.5 rounded-full bg-slate-950 px-4 text-white shadow-[0_12px_32px_-8px_rgba(15,23,42,0.6)] transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-[0_16px_36px_-8px_rgba(79,70,229,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/40"
      aria-label="Open portfolio assistant"
    >
      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition group-hover:rotate-12" aria-hidden="true">✦</span>
      <span class="pr-1 text-sm font-semibold">Ask me</span>
    </button>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const isOpen = ref(false)
const isLoading = ref(false)
const input = ref('')
const messages = ref([])
const messagesContainer = ref(null)

const KNOWLEDGE_BASE = {
  about: {
    keywords: ['about', 'background', 'who is kun', 'who are you', 'developer', 'career', 'experience', 'education', 'location', 'phnom penh'],
    answer:
      "Kun Vinthien is a web developer based in Phnom Penh, Cambodia. He holds a Bachelor's degree in Computer Science and enjoys building responsive, user-friendly web experiences. His portfolio highlights personal, academic, and collaborative development work, and he is open to new opportunities.",
  },
  projects: {
    keywords: ['project', 'projects', 'portfolio', 'ecommerce', 'e-commerce', 'online store', 'pos', 'point of sale', 'chillstudy', 'chill study', 'team assignment', 'work', 'built'],
    answer:
      'Kun’s portfolio features several projects:\n\n• Personal Portfolio — a responsive Vue.js and Tailwind CSS site presenting his work.\n• E-commerce Website — a Vue.js, Laravel, and Tailwind CSS storefront; it is still in progress.\n• POS System — a Laravel, MySQL, and Tailwind CSS project for sales and inventory; it is still in progress.\n• Team Assignment Project — a collaborative Nuxt.js, Express.js, and Supabase project.\n• ChillStudy — a Nuxt.js and Supabase project marked as coming soon.\n\nYou can explore the project cards on this page for more details and links.',
  },
  skills: {
    keywords: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'stack', 'frontend', 'front end', 'backend', 'back end', 'vue', 'javascript', 'html', 'css', 'tailwind', 'php', 'laravel', 'mysql', 'git', 'github', 'tools'],
    answer:
      'Kun’s toolkit covers frontend development with HTML, CSS, JavaScript, Vue.js, and Tailwind CSS; backend and data work with PHP, Laravel, and MySQL; and collaboration tools including Git, GitHub, and VS Code. His projects also include Nuxt.js, Supabase, and Express.js.',
  },
  contact: {
    keywords: ['contact', 'email', 'reach', 'hire', 'opportunity', 'opportunities', 'collaborate', 'linkedin', 'github profile', 'get in touch'],
    answer:
      'Kun is open to opportunities, freelance work, and collaboration. You can reach him at kunvinthien@gmail.com, or use the contact form on this page. His GitHub profile is github.com/kunvinthien-cyber.',
  },
}

const FALLBACK_RESPONSE =
  "I can help with questions about Kun’s background, projects, skills, and contact details. Try asking about one of those topics, or use the contact form for anything else."

const quickQuestions = [
  'What skills does Kun have?',
  'Tell me about his projects.',
  'What kind of developer is Kun?',
  'How can I contact Kun?',
]

const normalizeText = (value) =>
  value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const editDistance = (left, right) => {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index)

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = row[0]
    row[0] = leftIndex

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const previous = row[rightIndex]
      row[rightIndex] = Math.min(
        row[rightIndex] + 1,
        row[rightIndex - 1] + 1,
        diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      )
      diagonal = previous
    }
  }

  return row[right.length]
}

const keywordMatchScore = (query, keyword) => {
  const normalizedKeyword = normalizeText(keyword)
  if (query.includes(normalizedKeyword)) return 2

  const keywordWords = normalizedKeyword.split(' ')
  const queryWords = query.split(' ')
  let matches = 0

  for (const keywordWord of keywordWords) {
    const found = queryWords.some((queryWord) => {
      if (queryWord === keywordWord) return true
      if (Math.min(queryWord.length, keywordWord.length) < 4) return false

      const distance = editDistance(queryWord, keywordWord)
      return distance <= 1 && distance / Math.max(queryWord.length, keywordWord.length) <= 0.25
    })

    if (!found) return 0
    matches += 1
  }

  return matches ? 1 + matches / keywordWords.length : 0
}

const findAnswer = (message) => {
  const query = normalizeText(message)
  let bestMatch = null
  let bestScore = 0

  for (const entry of Object.values(KNOWLEDGE_BASE)) {
    const score = Math.max(...entry.keywords.map((keyword) => keywordMatchScore(query, keyword)))
    if (score > bestScore) {
      bestMatch = entry
      bestScore = score
    }
  }

  return bestMatch?.answer || FALLBACK_RESPONSE
}

const scrollToBottom = async () => {
  await nextTick()

  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async (quickMessage = null) => {
  const message = (quickMessage || input.value).trim()
  if (!message || isLoading.value) return

  messages.value.push({ role: 'user', content: message })
  input.value = ''
  isLoading.value = true
  await scrollToBottom()

  // A brief local delay keeps the existing typing indicator and chat rhythm.
  await new Promise((resolve) => setTimeout(resolve, 450))
  messages.value.push({ role: 'assistant', content: findAnswer(message) })
  isLoading.value = false
  await scrollToBottom()
}
</script>
