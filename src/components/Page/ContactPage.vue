<script setup>
 import { ref } from 'vue'
import emailjs from '@emailjs/browser'
const form = ref({ name: '', email: '', message: '' })
const loading = ref(false)
const sendMessage = async () => {
  try { loading.value = true
  await emailjs.send( 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID',
  { name: form.value.name, email: form.value.email, message: form.value.message, },
  'YOUR_PUBLIC_KEY' )
  alert('✅ Message sent successfully!') 
  form.value = { name: '', email: '', message: '' } } catch (error) { console.error(error) 
  alert('❌ Failed to send message') } finally { loading.value = false } }
</script>
<template>
  <section
    class="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
  >
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>

    <!-- Main Card -->
    <div
      class="relative z-10 w-full max-w-6xl backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl"
    >
      <div class="grid lg:grid-cols-2 gap-10">
        <!-- LEFT -->
        <div>
          <h1 class="text-3xl md:text-5xl font-bold text-white leading-tight">
            Let's Build Something Amazing 🚀
          </h1>

          <p class="text-gray-300 mt-5 leading-relaxed text-sm md:text-base">
            I'm open to collaborations, freelance work, and tech discussions. Feel free to contact
            me anytime.
          </p>

          <!-- CONTACT INFO -->
          <div class="mt-8 space-y-4 text-sm md:text-base">
            <div class="flex items-center gap-3 text-white hover:translate-x-2 transition">
              <i class="fa-solid fa-envelope text-blue-400"></i>
              <span>kunvinthien@gmail.com</span>
            </div>

            <div class="flex items-center gap-3 text-white hover:translate-x-2 transition">
              <i class="fa-solid fa-phone text-blue-400"></i>
              <span>+855 XX XXX XXX</span>
            </div>

            <div class="flex items-center gap-3 text-white hover:translate-x-2 transition">
              <i class="fa-solid fa-location-dot text-blue-400"></i>
              <span>Phnom Penh, Cambodia</span>
            </div>
          </div>

          <!-- SOCIAL -->
          <div class="flex gap-3 mt-8 flex-wrap">
            <a class="social-btn"><i class="fa-brands fa-github"></i></a>
            <a class="social-btn"><i class="fa-brands fa-linkedin"></i></a>
            <a class="social-btn"><i class="fa-brands fa-facebook"></i></a>
            <a class="social-btn"><i class="fa-brands fa-instagram"></i></a>
          </div>
        </div>

        <!-- RIGHT -->
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">Send Message ✉️</h2>

          <form class="space-y-4" @submit.prevent="sendMessage">
            <input v-model="form.name" type="text" placeholder="Your Name" class="input" />

            <input v-model="form.email" type="email" placeholder="Your Email" class="input" />

            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Your Message"
              class="input"
            ></textarea>

            <button class="btn" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
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
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  transition: 0.3s;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 15px rgba(59,130,246,0.4);
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

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(59,130,246,0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  color: white;
  transition: 0.3s;
}

.social-btn:hover {
  background: #3b82f6;
  transform: translateY(-5px);
}

@keyframes float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}
</style>