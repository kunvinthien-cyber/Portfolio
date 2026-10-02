<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useChat } from '@ai-sdk/vue'
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()
const isKhmer = computed(() => preferences.isKhmer)
const { messages, sendMessage, status, error, clearError } = useChat({
  api: '/api/chat',
})

const input = ref('')
const isOpen = ref(true)
const messageList = ref(null)
const isLoading = computed(() => status.value === 'submitted' || status.value === 'streaming')
const chatErrorMessage = computed(() => {
  const message = error.value?.message ?? ''

  if (/request limit|quota|rate.?limit/i.test(message)) {
    return isKhmer.value
      ? 'ការប្រើប្រាស់ AI ដល់កំណត់បណ្តោះអាសន្នហើយ។ សូមរង់ចាំបន្តិច រួចព្យាយាមម្តងទៀត។'
      : 'The AI request limit has been reached. Please wait and try again later.'
  }

  if (/temporarily busy|high demand|unavailable|503/i.test(message)) {
    return isKhmer.value
      ? 'សេវា AI កំពុងមានអ្នកប្រើច្រើន។ សូមព្យាយាមម្តងទៀតបន្តិចទៀត។'
      : 'The AI service is temporarily busy. Please try again shortly.'
  }

  return isKhmer.value
    ? 'សេវា AI មិនអាចឆ្លើយតបបានទេ (អាចដល់កំណត់ប្រើប្រាស់ ឬកំពុងរវល់)។ សូមរង់ចាំ រួចព្យាយាមម្តងទៀត។'
    : 'The AI service could not respond. It may be busy or at its usage limit; please wait and try again.'
})
const suggestions = computed(() =>
  isKhmer.value
    ? ['តើអ្នកអាចធ្វើអ្វីបានខ្លះ?', 'ប្រាប់ខ្ញុំអំពីជំនាញរបស់អ្នក']
    : ['What can you help me with?', 'Tell me about your skills'],
)

watch([messages, status], async () => {
  await nextTick()
  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight
  }
})

const submitMessage = async (text = input.value) => {
  const message = text.trim()
  if (!message || isLoading.value) return

  input.value = ''
  clearError()
  await sendMessage({ text: message })
}

const clearConversation = () => {
  messages.value = []
  clearError()
}
</script>

<template>
  <div class="fixed z-50 chat-widget bottom-4 right-4 sm:bottom-6 sm:right-6">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="scale-95 translate-y-3 opacity-0"
      enter-to-class="scale-100 translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="scale-100 translate-y-0 opacity-100"
      leave-to-class="scale-95 translate-y-3 opacity-0"
    >
      <section
        v-if="isOpen"
        class="flex h-[min(39rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/95 shadow-[0_24px_90px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/4 backdrop-blur-2xl"
        :aria-label="isKhmer ? 'ជជែកជាមួយ Vinthien' : 'Chat with Vinthien'"
      >
        <header class="relative flex items-center gap-3 px-4 py-4 overflow-hidden border-b isolate shrink-0 border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-cyan-950/70">
          <div class="absolute w-40 h-40 rounded-full pointer-events-none -right-10 -top-20 -z-10 bg-cyan-400/15 blur-3xl"></div>
          <div class="relative grid w-12 h-12 text-sm font-black tracking-wide shadow-lg shrink-0 place-items-center rounded-2xl bg-linear-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-cyan-950/40">
            KV
            <span class="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-slate-900 bg-emerald-400"></span>
          </div>

          <div class="flex-1 min-w-0">
            <h2 class="text-sm font-bold text-white truncate">
              {{ isKhmer ? 'ជជែកជាមួយ Vinthien' : 'Chat with Vinthien' }}
            </h2>
            <p class="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              {{ isKhmer ? 'នៅទីនេះដើម្បីជួយអ្នក' : 'Here to help you' }}
            </p>
          </div>

          <div class="flex items-center gap-1">
            <button
              v-if="messages.length"
              type="button"
              class="grid transition h-9 w-9 place-items-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
              :aria-label="isKhmer ? 'សម្អាតការសន្ទនា' : 'Clear conversation'"
              :title="isKhmer ? 'សម្អាតការសន្ទនា' : 'Clear conversation'"
              @click="clearConversation"
            >
              <svg viewBox="0 0 24 24" class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" />
              </svg>
            </button>
            <button
              type="button"
              class="grid transition h-9 w-9 place-items-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
              :aria-label="isKhmer ? 'បង្រួមការជជែក' : 'Minimize chat'"
              @click="isOpen = false"
            >
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path stroke-linecap="round" d="M5 12h14" />
              </svg>
            </button>
          </div>
        </header>

        <div ref="messageList" class="flex-1 min-h-0 px-4 py-5 overflow-y-auto chat-scroll sm:px-5">
          <div v-if="!messages.length" class="flex flex-col justify-center min-h-full">
            <div class="grid w-12 h-12 mb-5 border place-items-center rounded-2xl border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
              <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h8M8 14h5m-1 7-4-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l-4 4Z" />
              </svg>
            </div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
              {{ isKhmer ? 'សួស្តី 👋' : 'Hello there 👋' }}
            </p>
            <h3 class="mt-2 text-xl font-bold leading-snug text-white">
              {{ isKhmer ? 'តើខ្ញុំអាចជួយអ្វីអ្នកបាន?' : 'How can I help you?' }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-slate-400">
              {{ isKhmer ? 'សួរខ្ញុំអំពីគម្រោង ជំនាញ ឬបទពិសោធន៍របស់ខ្ញុំ។' : 'Ask me about my projects, skills, or experience.' }}
            </p>

            <div class="flex flex-col gap-2 mt-6">
              <button
                v-for="suggestion in suggestions"
                :key="suggestion"
                type="button"
                class="group flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/3.5 px-3.5 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-cyan-300/7 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
                @click="submitMessage(suggestion)"
              >
                <span>{{ suggestion }}</span>
                <svg viewBox="0 0 20 20" class="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-200" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 10h12m-5-5 5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>

          <div v-else class="space-y-5">
            <div
              v-for="(message, index) in messages"
              :key="message.id ?? `message-${index}`"
              class="flex gap-2.5"
              :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                v-if="message.role !== 'user'"
                class="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-linear-to-br from-cyan-300 to-blue-500 text-[9px] font-black text-slate-950"
                aria-hidden="true"
              >
                KV
              </div>
              <div
                class="max-w-[85%] whitespace-pre-wrap wrap-break-word rounded-2xl px-3.5 py-2.5 text-sm leading-6"
                :class="message.role === 'user'
                  ? 'rounded-br-md bg-linear-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-950/30'
                  : 'rounded-bl-md border border-white/7 bg-white/5.5 text-slate-200'"
              >
                {{ message.parts?.filter((part) => part.type === 'text').map((part) => part.text).join('') }}
              </div>
            </div>

            <div v-if="isLoading" class="flex items-center gap-2.5 text-xs text-slate-400" aria-live="polite">
              <span class="grid h-7 w-7 place-items-center rounded-xl bg-white/6 text-[9px] font-black text-cyan-200">KV</span>
              <span class="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/7 bg-white/5.5 px-3.5 py-3">
                <span class="chat-dot"></span>
                <span class="chat-dot chat-dot-delay-1"></span>
                <span class="chat-dot chat-dot-delay-2"></span>
                <span class="sr-only">{{ isKhmer ? 'កំពុងឆ្លើយតប' : 'Thinking' }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="shrink-0 border-t border-white/8 bg-slate-950/70 p-3.5 sm:p-4">
          <p v-if="error" role="alert" class="px-3 py-2 mb-2 text-xs leading-5 border rounded-xl border-rose-400/15 bg-rose-400/7 text-rose-200">
            {{ chatErrorMessage }}
          </p>

          <form class="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/4.5 p-1.5 transition focus-within:border-cyan-300/40 focus-within:ring-2 focus-within:ring-cyan-300/10" @submit.prevent="submitMessage()">
            <label class="sr-only" for="portfolio-chat-input">
              {{ isKhmer ? 'សរសេរសាររបស់អ្នក' : 'Write your message' }}
            </label>
            <input
              id="portfolio-chat-input"
              v-model="input"
              :disabled="isLoading"
              :placeholder="isKhmer ? 'សរសេរសាររបស់អ្នក...' : 'Write a message...'"
              autocomplete="off"
              class="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-60"
            />
            <button
              type="submit"
              :disabled="isLoading || !input.trim()"
              class="grid w-10 h-10 transition shadow-md shrink-0 place-items-center rounded-xl bg-linear-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-cyan-950/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
              :aria-label="isKhmer ? 'ផ្ញើសារ' : 'Send message'"
            >
              <svg v-if="!isLoading" viewBox="0 0 24 24" class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5 12 14-7-4 14-3-6-7-1Zm7 1 7-8" />
              </svg>
              <span v-else class="w-4 h-4 border-2 rounded-full animate-spin border-slate-950/25 border-t-slate-950" aria-hidden="true"></span>
            </button>
          </form>
          <p class="mt-2.5 text-center text-[10px] tracking-wide text-slate-600">
            {{ isKhmer ? 'ជំនួយការ AI · Powered by Gemini' : 'AI assistant · Powered by Gemini' }}
          </p>
        </div>
      </section>
    </Transition>

    <button
      v-if="!isOpen"
      type="button"
      class="relative grid transition duration-200 shadow-xl group h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-cyan-950/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/50 focus-visible:outline-2 focus-visible:outline-cyan-200 focus-visible:outline-offset-4"
      :aria-label="isKhmer ? 'បើកការជជែក' : 'Open chat'"
      @click="isOpen = true"
    >
      <svg viewBox="0 0 24 24" class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h8M8 14h5m-1 7-4-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l-4 4Z" />
      </svg>
      <span class="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-[3px] border-slate-950 bg-emerald-400"></span>
    </button>
  </div>
</template>

<style scoped>
.chat-scroll {
  scrollbar-color: rgb(100 116 139 / 35%) transparent;
  scrollbar-width: thin;
}

.chat-scroll::-webkit-scrollbar {
  width: 5px;
}

.chat-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgb(100 116 139 / 35%);
}

.chat-dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #67e8f9;
  animation: chat-bounce 1s infinite ease-in-out;
}

.chat-dot-delay-1 {
  animation-delay: 120ms;
}

.chat-dot-delay-2 {
  animation-delay: 240ms;
}

@keyframes chat-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }

  30% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chat-dot {
    animation: none;
  }
}
</style>