<script setup>
import { ref } from 'vue'
const activeIndex = ref(0)
      const skills = [
            {
                name: 'HTML',
                icon: 'fa-brands fa-html5',
                rating: 100,
                description: 'Proficient in HTML5, creating semantic and accessible web structures with a focus on responsive design and cross-browser compatibility.'
            },
            {
                name: 'CSS',
                icon: 'fa-brands fa-css3-alt',
                rating: 80,
                description: 'Skilled in CSS3, creating visually appealing and responsive designs with a focus on modern styling techniques and browser compatibility.'
            },
            {
                name: 'JavaScript',
                icon: 'fa-brands fa-js',
                rating: 80,
                description: 'Skilled in JavaScript, building interactive and dynamic web applications with a focus on modern ES6+ features and best practices.'
            },
            {
                name: 'Vue.js',
                icon: 'fa-brands fa-vuejs',
                rating: 90,
                description: 'Proficient in Vue.js, creating maintainable and scalable single-page applications with a focus on component-based architecture.'
            },
            {
                name: 'Tailwind CSS',
                icon: 'fa-solid fa-wind',
                rating: 80,
                description: 'Experienced in Tailwind CSS, creating responsive and maintainable UI components with a focus on utility-first styling.'
            },
            {
                name: 'Git',
                icon: 'fa-brands fa-git-alt',
                rating: 100,
                description: 'Proficient in Git, managing version control and collaborating effectively with team members.'
            },
            {
                name: 'Node.js',
                icon: 'fa-brands fa-node-js',
                rating: 80,
                description: 'Skilled in Node.js, building server-side applications and APIs with a focus on performance and scalability.'
            },
            {
                name: 'Express.js',
                icon: 'fa-solid fa-server',
                rating: 80,
                description: 'Proficient in Express.js, creating robust and scalable web applications and APIs'
            },
            {
                name: 'MongoDB',
                icon: 'fa-solid fa-database',
                rating: 90,
                description: 'Proficient in MongoDB, designing and implementing NoSQL database solutions with a focus on performance and scalability.'
            },
      ]
</script>
<template>
    <div class="skill-page w-screen flex justify-center items-center">
        <div class="skill-container w-[80%] mx-auto flex flex-col justify-center items-center bg-zinc-600 text-white ps-8 py-5 rounded-3xl">
            <h1 class="text-white text-2xl font-bold mb-4">Skills</h1>
            <div class="skills-list flex flex-wrap gap-4">
                <div v-for="(skill, index) in skills" :key="index" 
                @pointermove="activeIndex = index"
                class="skill-card flex flex-col justify-around italic bg-zinc-700 p-7 rounded-lg w-full md:w-[48%] lg:w-[30%]"
                 :class="
          activeIndex === index
            ? 'active-card'
            : 'border-white/30'
        ">
                    
                <div class="skill-header flex items-center gap-2 mb-2">
                        <i :class="skill.icon" class="text-2xl"></i>
                        <h2 class="text-xl font-bold">{{ skill.name }}</h2>
                    </div>
                    <p class="text-gray-300 mb-2">{{ skill.description }}</p>
                    <div class="skill-rating h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div class="skill-rating-fill h-full bg-cyan-400 rounded-full" :style="{ width: skill.rating + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

.skill-card {
  border-left-color: rgba(255,255,255,0.2);
  border-bottom-color: rgba(255,255,255,0.2);
}

/* Hover Effect */
.group:hover .skill-card {
  animation: borderFlow 6s linear infinite;
}

/* Click Active Effect */
.active-card {
  animation: borderFlow 3s linear infinite;
  background: rgba(255,255,255,0.03);
}

@keyframes borderFlow {
  0% {
    border-left-color: #06b6d4;
    border-bottom-color: #06b6d4;
    box-shadow: 0 0 10px #06b6d4;
  }

  33% {
    border-left-color: #8b5cf6;
    border-bottom-color: #8b5cf6;
    box-shadow: 0 0 15px #8b5cf6;
  }

  66% {
    border-left-color: #ec4899;
    border-bottom-color: #ec4899;
    box-shadow: 0 0 15px #ec4899;
  }

  100% {
    border-left-color: #06b6d4;
    border-bottom-color: #06b6d4;
    box-shadow: 0 0 10px #06b6d4;
  }
}
</style>