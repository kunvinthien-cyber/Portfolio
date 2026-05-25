<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)

const sendMessage = async () => {
  try {
    loading.value = true

    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      },
      'YOUR_PUBLIC_KEY'
    )

    alert('✅ Message sent successfully!')

    form.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (error) {
    console.error(error)
    alert('❌ Failed to send message')
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <section
    class="min-h-screen flex items-center justify-center px-5 py-20  overflow-hidden"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>

    <div
      class="relative z-10 w-full max-w-7xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl"
    >
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left Side -->
        <div class="animate-fadeIn">
          <h1
            class="text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Let's Build Something Amazing 
          </h1>

          <p class="text-gray-300 mt-6 leading-relaxed">
            I'm always excited to connect with developers, recruiters,
            startups, and technology enthusiasts. Whether you have a project,
            collaboration opportunity, or just want to chat about web
            development, feel free to reach out.
          </p>

          <!-- Contact Info -->
          <div class="mt-8 space-y-4">

            <div class="contact-item">
              <i class="fa-solid fa-envelope"></i>
              <span>kunvinthien@gmail.com</span>
            </div>

            <div class="contact-item">
              <i class="fa-solid fa-phone"></i>
              <span>+855 XX XXX XXX</span>
            </div>

            <div class="contact-item">
              <i class="fa-solid fa-location-dot"></i>
              <span>Phnom Penh, Cambodia</span>
            </div>

          </div>

          <!-- Social -->
          <div class="flex gap-4 mt-8 flex-wrap">
            <a href="#" class="social-btn">
              <i class="fa-brands fa-github"></i>
            </a>

            <a href="#" class="social-btn">
              <i class="fa-brands fa-linkedin"></i>
            </a>

            <a href="#" class="social-btn">
              <i class="fa-brands fa-facebook"></i>
            </a>

            <a href="#" class="social-btn">
              <i class="fa-brands fa-instagram"></i>
            </a>

            <a href="#" class="social-btn">
              <i class="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>

        <!-- Right Side -->
        <div class="animate-slideUp">
          <h2 class="text-3xl font-bold text-white mb-6">
            Send Message <i class="fa-solid fa-star text-amber-300"></i>
          </h2>

          <form class="space-y-5"  @submit.prevent="sendMessage">

            <input
             v-model="form.name"
              type="text"
              placeholder="Your Name"
              class="input-style"
            />

            <input
            v-model="form.email"
              type="email"
              placeholder="Your Email"
              class="input-style"
            />

            <textarea
            v-model="form.message"
              rows="6"
              placeholder="Your Message"
              class="input-style resize-none"
            ></textarea>

            <button class="btn-send"  :disabled="loading">
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
  filter: blur(100px);
  animation: float 8s ease-in-out infinite;
}

.circle1 {
  width: 300px;
  height: 300px;
  background: #2563eb;
  top: 10%;
  left: 5%;
}

.circle2 {
  width: 250px;
  height: 250px;
  background: #9333ea;
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

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  transition: 0.3s;
}

.contact-item i {
  color: #60a5fa;
  font-size: 22px;
}

.contact-item:hover {
  transform: translateX(8px);
}

.social-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  color: white;
  font-size: 22px;
  transition: 0.4s;
  border: 1px solid rgba(255,255,255,0.1);
}

.social-btn:hover {
  background: #3b82f6;
  transform: translateY(-8px) scale(1.1);
}

.input-style {
  width: 100%;
  padding: 15px 20px;
  border-radius: 18px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  transition: 0.3s;
}

.input-style:focus {
  outline: none;
  border-color: #3b82f6;
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(59,130,246,.4);
}

.btn-send {
  width: 100%;
  padding: 15px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    #2563eb,
    #7c3aed
  );
  color: white;
  font-weight: 600;
  transition: .4s;
}

.btn-send:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(59,130,246,.4);
}

.animate-fadeIn {
  animation: fadeIn 1s ease;
}

.animate-slideUp {
  animation: slideUp 1s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
}
</style>