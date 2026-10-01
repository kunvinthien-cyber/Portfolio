<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const props = defineProps({ t: { type: Object, required: true } })
const form = ref({ name: '', email: '', message: '' })
const loading = ref(false)
const statusType = ref('')

const sendMessage = async () => {
  loading.value = true
  statusType.value = ''

  try {
    await emailjs.send(
      'service_gmail',
      'template_jih4lg4',
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message,
      },
      'P62YqtvuJ9SaFayVf',
    )
    statusType.value = 'success'
    form.value = { name: '', email: '', message: '' }
  } catch (err) {
    statusType.value = 'error'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="section-shell">
    <div
      class="contact-panel relative isolate overflow-hidden rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10"
    >
      <div class="pointer-events-none absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <p class="section-kicker">{{ props.t.contactKicker }}</p>
          <h2 class="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
            {{ props.t.contactTitle }}
          </h2>
          <p class="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
            {{ props.t.contactIntro }}
          </p>

          <div class="mt-7 space-y-4 text-sm">
            <a
              href="mailto:kunvinthien@gmail.com"
              class="group flex w-fit items-center gap-3 text-slate-200 transition-colors hover:text-cyan-100"
            >
              <i class="fa-solid fa-envelope w-5 text-center text-cyan-200" aria-hidden="true"></i>
              <span>kunvinthien@gmail.com</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true"></i>
            </a>
            <a
              href="tel:+855979104171"
              class="group flex w-fit items-center gap-3 text-slate-200 transition-colors hover:text-cyan-100"
            >
              <i class="fa-solid fa-phone w-5 text-center text-cyan-200" aria-hidden="true"></i>
              <span>+855 979104171</span>
            </a>
            <div class="flex items-center gap-3 text-slate-300">
              <i class="fa-solid fa-location-dot w-5 text-center text-cyan-200" aria-hidden="true"></i>
              <span>{{ props.t.contactLocation }}</span>
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <a
              href="https://github.com/kunvinthien-cyber"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn"
              aria-label="GitHub"
            >
              <i class="fa-brands fa-github" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/kun-vinthien-7b3b3b1b2/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn"
              aria-label="LinkedIn"
            >
              <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.facebook.com/thean.vin.58"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn"
              aria-label="Facebook"
            >
              <i class="fa-brands fa-facebook" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.instagram.com/thean.vin"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn"
              aria-label="Instagram"
            >
              <i class="fa-brands fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-white">{{ props.t.sendMessage }}</h3>
          <p class="mt-1 text-sm text-slate-400">{{ props.t.contactResponse }}</p>

          <form class="mt-5 space-y-4" @submit.prevent="sendMessage">
            <div>
              <label for="contact-name" class="mb-1.5 block text-sm font-medium text-slate-300">{{ props.t.contactName }}</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                :placeholder="props.t.contactNamePlaceholder"
                required
                class="contact-input"
              />
            </div>
            <div>
              <label for="contact-email" class="mb-1.5 block text-sm font-medium text-slate-300">{{ props.t.contactEmailLabel }}</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                :placeholder="props.t.contactEmailPlaceholder"
                required
                class="contact-input"
              />
            </div>
            <div>
              <label for="contact-message" class="mb-1.5 block text-sm font-medium text-slate-300">{{ props.t.yourMessage }}</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="5"
                :placeholder="props.t.contactMessagePlaceholder"
                required
                class="contact-input resize-y"
              ></textarea>
            </div>
            <button
              class="button-primary w-full"
              :disabled="loading"
              type="submit"
            >
              <span>{{ loading ? props.t.sending : props.t.sendMessage }}</span>
              <i v-if="!loading" class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              <i v-else class="fa-solid fa-spinner animate-spin motion-reduce:animate-none" aria-hidden="true"></i>
            </button>
            <p
              v-if="statusType"
              role="status"
              aria-live="polite"
              class="text-center text-sm"
              :class="statusType === 'success' ? 'text-emerald-300' : 'text-rose-300'"
            >
              {{ statusType === 'success' ? props.t.messageSent : props.t.messageError }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-input {
  width: 100%;
  min-height: 2.9rem;
  border: 1px solid rgb(148 163 184 / 22%);
  border-radius: 0.85rem;
  padding: 0.75rem 0.9rem;
  color: #f1f5f9;
  background: rgb(2 6 23 / 45%);
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

.contact-input::placeholder {
  color: #64748b;
}

.contact-input:hover {
  border-color: rgb(148 163 184 / 40%);
}

.contact-input:focus {
  border-color: rgb(103 232 249 / 70%);
  outline: none;
  box-shadow: 0 0 0 3px rgb(34 211 238 / 12%);
  background: rgb(2 6 23 / 65%);
}

.contact-input:focus-visible {
  outline: none;
}

.social-btn {
  display: flex;
  width: 2.8rem;
  height: 2.8rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(148 163 184 / 20%);
  border-radius: 999px;
  color: #cbd5e1;
  background: rgb(255 255 255 / 4%);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    background-color 180ms ease;
}

.social-btn:hover {
  transform: translateY(-2px);
  border-color: rgb(103 232 249 / 40%);
  color: #a5f3fc;
  background: rgb(34 211 238 / 8%);
}

</style>
