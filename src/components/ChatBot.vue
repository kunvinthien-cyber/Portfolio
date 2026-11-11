<script setup>
import { nextTick, ref } from 'vue'
import { usePreferencesStore } from '@/stores/preferences'

const props = defineProps({ t: { type: Object, required: true } })
const preferences = usePreferencesStore()
const isOpen = ref(false)
const isLoading = ref(false)
const input = ref('')
const messages = ref([])
const errorMessage = ref('')
const messagesContainer = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const clearConversation = () => {
  if (isLoading.value) return
  messages.value = []
  input.value = ''
  errorMessage.value = ''
}

const sendMessage = async (suggestion = '') => {
  const message = (suggestion || input.value).trim()
  if (!message || isLoading.value || message.length > 2000) return

  const history = messages.value.slice(-10).map(({ role, content }) => ({ role, content }))
  messages.value.push({ role: 'user', content: message })
  input.value = ''
  errorMessage.value = ''
  isLoading.value = true
  await scrollToBottom()

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history,
        language: preferences.language,
      }),
      signal: controller.signal,
    })
    const result = await response.json().catch(() => null)

    if (!response.ok) {
      errorMessage.value =
        response.status === 429 ? props.t.assistantRateLimitError : props.t.assistantError
      return
    }

    if (typeof result?.reply !== 'string' || !result.reply.trim()) {
      errorMessage.value = props.t.assistantError
      return
    }

    messages.value.push({ role: 'assistant', content: result.reply.trim() })
    if (messages.value.length > 20) messages.value.splice(0, messages.value.length - 20)
  } catch {
    errorMessage.value = props.t.assistantError
  } finally {
    window.clearTimeout(timeoutId)
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<template>
  <div
    class="chatbot fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7"
    :data-theme="preferences.theme"
    :lang="preferences.isKhmer ? 'km' : 'en'"
  >
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
        class="chat-panel mb-4 flex h-[min(640px,calc(100dvh-6rem))] w-[min(390px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border shadow-2xl ring-1 ring-black/5"
        :class="
          preferences.theme === 'dark'
            ? 'border-white/10 bg-slate-950 ring-white/10'
            : 'border-slate-200 bg-white ring-slate-900/5'
        "
        :aria-label="props.t.assistantPanelLabel"
      >
        <header class="shrink-0 bg-slate-950 px-4 py-4 text-white sm:px-5">
          <div class="flex items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <div
                class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15"
              >
                <span class="text-lg" aria-hidden="true">✦</span>
                <span
                  class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400"
                ></span>
              </div>
              <div class="min-w-0">
                <h2 class="truncate text-sm font-semibold tracking-wide">
                  {{ props.t.assistantName }}
                </h2>
                <p class="mt-1 text-xs text-slate-300">{{ props.t.assistantStatus }}</p>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-1">
              <button
                v-if="messages.length"
                type="button"
                class="rounded-lg px-2 py-2 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-50"
                :aria-label="props.t.clearConversation"
                :title="props.t.clearConversation"
                :disabled="isLoading"
                @click="clearConversation"
              >
                {{ props.t.clearConversation }}
              </button>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                :aria-label="props.t.closeAssistant"
                @click="isOpen = false"
              >
                ×
              </button>
            </div>
          </div>
        </header>

        <div
          ref="messagesContainer"
          class="chat-messages flex-1 space-y-4 overflow-y-auto p-4 sm:p-5"
          :class="preferences.theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'"
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          :aria-busy="isLoading"
        >
          <div
            v-if="messages.length === 0"
            class="rounded-2xl border p-4 shadow-sm"
            :class="
              preferences.theme === 'dark'
                ? 'border-white/10 bg-slate-800'
                : 'border-slate-200 bg-white'
            "
          >
            <p
              class="text-sm font-semibold"
              :class="preferences.theme === 'dark' ? 'text-white' : 'text-slate-900'"
            >
              {{ props.t.assistantGreeting }}
            </p>
            <p
              class="mt-1.5 text-xs leading-relaxed"
              :class="preferences.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'"
            >
              {{ props.t.assistantIntro }}
            </p>
            <div class="mt-4 space-y-2">
              <button
                v-for="question in props.t.assistantQuestions"
                :key="question"
                type="button"
                :disabled="isLoading"
                class="group flex min-h-10 w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-60"
                :class="
                  preferences.theme === 'dark'
                    ? 'border-white/10 bg-slate-900 text-slate-200 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800'
                "
                @click="sendMessage(question)"
              >
                <span>{{ question }}</span>
                <span
                  class="text-slate-400 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                  >→</span
                >
              </button>
            </div>
          </div>

          <div
            v-for="(message, index) in messages"
            :key="`${index}-${message.role}`"
            class="flex"
            :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <p
              class="max-w-[88%] whitespace-pre-wrap wrap-break-word rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm"
              :class="
                message.role === 'user'
                  ? 'rounded-br-md bg-cyan-700 text-white'
                  : preferences.theme === 'dark'
                    ? 'rounded-bl-md border border-white/10 bg-slate-800 text-slate-100'
                    : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
              "
            >
              {{ message.content }}
            </p>
          </div>

          <p
            v-if="errorMessage"
            role="alert"
            class="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs leading-relaxed"
            :class="preferences.theme === 'dark' ? 'text-rose-300' : 'text-rose-600'"
          >
            {{ errorMessage }}
          </p>

          <div v-if="isLoading" class="flex justify-start">
            <div
              class="flex items-center gap-2 rounded-2xl rounded-bl-md border px-4 py-3 shadow-sm"
              :class="
                preferences.theme === 'dark'
                  ? 'border-white/10 bg-slate-800'
                  : 'border-slate-200 bg-white'
              "
            >
              <span
                class="text-xs"
                :class="preferences.theme === 'dark' ? 'text-slate-300' : 'text-slate-600'"
              >
                {{ props.t.assistantThinking }}
              </span>
              <span class="flex gap-1" :aria-label="props.t.assistantLoading">
                <span
                  class="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 motion-reduce:animate-none [animation-delay:-0.2s]"
                ></span>
                <span
                  class="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 motion-reduce:animate-none [animation-delay:-0.1s]"
                ></span>
                <span
                  class="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 motion-reduce:animate-none"
                ></span>
              </span>
            </div>
          </div>
        </div>

        <form
          class="shrink-0 border-t p-3 sm:p-4"
          :class="
            preferences.theme === 'dark'
              ? 'border-white/10 bg-slate-950'
              : 'border-slate-200 bg-white'
          "
          @submit.prevent="sendMessage()"
        >
          <div
            class="flex items-center gap-2 rounded-2xl border p-1.5 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/10"
            :class="
              preferences.theme === 'dark'
                ? 'border-white/10 bg-slate-900'
                : 'border-slate-200 bg-slate-50'
            "
          >
            <input
              v-model="input"
              :disabled="isLoading"
              type="text"
              :placeholder="props.t.assistantPlaceholder"
              :aria-label="props.t.assistantInputLabel"
              maxlength="2000"
              autocomplete="off"
              class="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 disabled:opacity-60"
              :class="preferences.theme === 'dark' ? 'text-white' : 'text-slate-900'"
            />
            <button
              type="submit"
              :disabled="isLoading || !input.trim()"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-700 text-white shadow-sm transition hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              :aria-label="props.t.assistantSend"
            >
              <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5" aria-hidden="true">
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <p
            class="mt-2 text-center text-[10px]"
            :class="preferences.theme === 'dark' ? 'text-slate-500' : 'text-slate-500'"
          >
            {{ props.t.assistantDisclosure }}
          </p>
        </form>
      </section>
    </Transition>

    <button
      v-if="!isOpen"
      type="button"
      class="group flex h-14 items-center gap-2.5 rounded-full bg-slate-950 px-4 text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/40"
      :aria-label="props.t.openAssistant"
      @click="isOpen = true"
    >
      <span
        class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg"
        aria-hidden="true"
        >✦</span
      >
      <span class="pr-1 text-sm font-semibold">{{ props.t.askAssistant }}</span>
    </button>
  </div>
</template>
