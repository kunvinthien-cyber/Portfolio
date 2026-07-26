<script setup>
import { reactive, ref } from 'vue'

const TELEGRAM_BOT_TOKEN = (import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '').trim()
const TELEGRAM_CHAT_ID = (import.meta.env.VITE_TELEGRAM_CHAT_ID || '').trim()
const TELEGRAM_API_BASE_URL = (import.meta.env.VITE_TELEGRAM_API_BASE_URL || '/telegram').trim()
const TELEGRAM_BOT_ID = TELEGRAM_BOT_TOKEN.split(':')[0] || ''

const loading = ref(false)
const status = ref('')
const form = reactive({ name: '', email: '', message: '' })

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function validateTelegramConfig() {
  const usingPlaceholder =
    TELEGRAM_BOT_TOKEN === '123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ' ||
    TELEGRAM_CHAT_ID === '987654321'

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || usingPlaceholder) {
    throw new Error(
      'Telegram is not configured. Add your real VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in frontend/.env.',
    )
  }

  if (!TELEGRAM_BOT_TOKEN.includes(':') || !/^[0-9]+$/.test(TELEGRAM_BOT_ID)) {
    throw new Error('Telegram bot token must use BOT_ID:TOKEN format.')
  }

  if (TELEGRAM_CHAT_ID === TELEGRAM_BOT_ID) {
    throw new Error('Telegram chat ID must be your user/group chat ID, not the bot ID.')
  }
}

async function sendTelegram() {
  validateTelegramConfig()

  const text = `
<b>New Contact Message</b>

<b>Name:</b> ${escapeHtml(form.name)}
<b>Email:</b> ${escapeHtml(form.email)}
<b>Message:</b>
${escapeHtml(form.message)}
  `.trim()

  const response = await fetch(`${TELEGRAM_API_BASE_URL}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  })

  const body = await response.json().catch(() => null)

  if (!response.ok || body?.ok === false) {
    throw new Error(body?.description || `Telegram request failed with status ${response.status}.`)
  }
}

async function sendMessage() {
  status.value = ''

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    status.value = 'Please fill in all fields.'
    return
  }

  loading.value = true

  try {
    await sendTelegram()
    status.value = 'Message sent successfully.'
    Object.assign(form, { name: '', email: '', message: '' })
  } catch (error) {
    console.error('Telegram message failed:', error)
    status.value = error instanceof Error ? error.message : 'Message failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>

    <div
      class="relative z-10 w-full max-w-6xl backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl"
    >
      <div class="grid lg:grid-cols-2 gap-10">
        <div>
          <h1 class="text-3xl md:text-5xl font-bold text-white leading-tight">
            Let's Build Something Amazing
          </h1>

          <p class="text-gray-300 mt-5 leading-relaxed text-sm md:text-base">
            I'm open to collaborations, freelance work, and tech discussions. Feel free to contact
            me anytime.
          </p>

          <div class="mt-8 space-y-4 text-sm md:text-base">
            <div class="flex items-center gap-3 text-white hover:translate-x-2 transition">
              <i class="fa-solid fa-envelope text-blue-400"></i>
              <span>kunvinthien@gmail.com</span>
            </div>

            <div class="flex items-center gap-3 text-white hover:translate-x-2 transition">
              <i class="fa-solid fa-phone text-blue-400"></i>
              <span>+855 979104171</span>
            </div>

            <div class="flex items-center gap-3 text-white hover:translate-x-2 transition">
              <i class="fa-solid fa-location-dot text-blue-400"></i>
              <span>Phnom Penh, Cambodia</span>
            </div>
          </div>

          <div class="flex gap-3 mt-8 flex-wrap">
            <a href="https://github.com/kunvinthien-cyber" class="social-btn" aria-label="GitHub">
              <i class="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/kun-vinthien-7b3b3b1b2/"
              class="social-btn"
              aria-label="LinkedIn"
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://www.facebook.com/thean.vin.58" class="social-btn" aria-label="Facebook">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/kunvinthien/" class="social-btn" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">Send Message</h2>

          <form class="space-y-4" @submit.prevent="sendMessage">
            <input v-model="form.name" type="text" placeholder="Your Name" class="input" required />
            <input v-model="form.email" type="email" placeholder="Your Email" class="input" required />
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Your Message"
              class="input"
              required
            ></textarea>

            <button class="btn" :disabled="loading" type="submit">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>

            <p v-if="status" class="status-message" aria-live="polite">
              {{ status }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.circle {
  position: absolute;
  border-radius: 9999px;
  filter: blur(110px);
  animation: float 10s ease-in-out infinite;
}

.circle1 {
  width: 300px;
  height: 300px;
  background: #3b82f6;
  top: 10%;
  left: 5%;
}

.circle2 {
  width: 250px;
  height: 250px;
  background: #8b5cf6;
  bottom: 10%;
  right: 10%;
}

.circle3 {
  width: 200px;
  height: 200px;
  background: #06b6d4;
  top: 50%;
  left: 40%;
}

.input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  transition: 0.3s;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.65);
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
  transform: scale(1.02);
}

.btn {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white;
  font-weight: 600;
  transition: 0.3s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status-message {
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 12px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  transition: 0.3s;
}

.social-btn:hover {
  background: #3b82f6;
  transform: translateY(-5px);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-30px);
  }
}
</style>
