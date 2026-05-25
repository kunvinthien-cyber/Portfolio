<script setup>
  const projects =[
    {
      name: 'E-commerce Website',
      img: new URL('@/assets/IMG/e-com.jpg', import.meta.url).href,
      skills: ['Vue.js', 'Node.js', 'MongoDB'],
      link: 'https://nuxt-profile-gamma.vercel.app',
      description: 'A responsive e-commerce website built with Vue.js, Node.js, and MongoDB. It features user authentication, product management, and a shopping cart functionality.',
    },
    {
      name: 'Personal Portfolio',
      img: new URL('@/assets/IMG/product.jpg', import.meta.url).href,
      skills: ['Vue.js', 'Tailwind CSS'],
      link: 'https://github.com/robertoferreira/personal-portfolio',
      description: 'A personal portfolio website showcasing my web development projects and skills. Built with Vue.js and Tailwind CSS, it features a clean and modern design.',
    },
    {
      name: 'Blog Platform',
      img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
      skills: ['Vue.js', 'Express.js'],
      link: 'https://github.com/robertoferreira/blog-platform',
      description: 'A blog platform built with Vue.js and Express.js. It allows users to create and manage their own blogs, with features such as user authentication and comment sections.',
    },
    {
      name: 'Blog Platform',
      img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
      skills: ['Vue.js', 'Express.js'],
      link: 'https://github.com/robertoferreira/blog-platform',
      description: 'A blog platform built with Vue.js and Express.js. It allows users to create and manage their own blogs, with features such as user authentication and comment sections.',
    },
    {
      name: 'Blog Platform',
      img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
      skills: ['Vue.js', 'Express.js'],
      link: 'https://github.com/robertoferreira/blog-platform',
      description: 'A blog platform built with Vue.js and Express.js. It allows users to create and manage their own blogs, with features such as user authentication and comment sections.',
    },
    {
      name: 'Blog Platform',
      img: new URL('@/assets/IMG/shoping.jpg', import.meta.url).href,
      skills: ['Vue.js', 'Express.js'],
      link: 'https://github.com/robertoferreira/blog-platform',
      description: 'A blog platform built with Vue.js and Express.js. It allows users to create and manage their own blogs, with features such as user authentication and comment sections.',
    },
  ]
</script>
<template>
    <div class="project-page w-screen flex justify-center items-center mt-10">
        <div class="project-contener w-[80%]  mx-auto bg-zinc-600 text-white px-5 py-5 rounded-3xl">
            <h1 class="text-white text-2xl font-bold mb-4">Featured Work</h1>
            <div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="(project, index) in projects"
                    :key="index"
                    class="project-card bg-zinc-700 text-white p-4 rounded-3xl hover:bg-zinc-500 transition duration-300 ease-in-out hover:scale-105 "
                >
                    <img
                        :src="project.img"
                        :alt="project.name"
                        class="w-full h-60 object-cover rounded-3xl mb-4"
                    />
                    <h2 class="text-white text-xl font-bold mb-2">{{ project.name }}</h2>
                    <p class="text-gray-300 mb-4">{{ project.description }}</p>
                    <div class="skills flex flex-wrap gap-2 mb-4">
                        <span
                            v-for="(skill, index) in project.skills"
                            :key="index"
                            class="bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
                        >
                            {{ skill }}
                        </span>
                    </div>
                    <a
                        :href="project.link"
                        target="_blank"
                        class="text-blue-400 hover:text-blue-300 underline"
                    >
                        View Project
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>