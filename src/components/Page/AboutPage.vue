<script setup></script>

<template>
  <div class="about-page w-full flex justify-center items-center mt-15  px-4 py-10">
    <div class="about-contener w-full max-w-5xl mx-auto bg-zinc-800 text-white  px-5 sm:px-8 py-8 rounded-3xl shadow-xl">

      <!-- Section Header -->
      <div class="mb-6">
        <h1 class="text-white text-3xl sm:text-4xl font-bold mb-1">About Me</h1>
        <div class="w-16 h-1 bg-blue-500 rounded-full"></div>
      </div>

      <!-- Introduction -->
      <p class="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
        Hello! I'm <span class="text-white font-semibold">KUN VINTHIEN</span>, a passionate web developer
        with a love for creating dynamic, responsive, and user-friendly websites. With a strong foundation
        in <span class="text-blue-400 font-medium">HTML</span>,
        <span class="text-blue-400 font-medium">CSS</span>,
        <span class="text-blue-400 font-medium">JavaScript</span>, and
        <span class="text-blue-400 font-medium">Vue.js</span>, I enjoy turning ideas into clean,
        functional digital experiences. Whether it's a sleek landing page or a full-scale web application,
        I bring creativity and precision to every project I work on.
      </p>

      <!-- More Detail -->
      <p class="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
        Over the years, I've had the opportunity to work on a variety of projects — from building
        interactive front-end interfaces to integrating RESTful APIs and managing back-end logic.
        I take pride in writing clean, maintainable code and always strive to follow best practices
        in performance, accessibility, and scalability. I'm constantly learning and keeping up with
        the latest trends in the web development world to deliver modern and efficient solutions.
      </p>

      <!-- Passion & Hobbies -->
      <p class="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
        In my free time, I enjoy exploring new frameworks and tools, contributing to open-source
        projects, and collaborating with fellow developers to build innovative solutions. I'm driven
        by curiosity, motivated by challenges, and excited to keep growing in this ever-evolving
        field of technology.
      </p>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        
        <div class="bg-zinc-700 rounded-2xl px-5 py-4 flex items-start gap-3">
          <i class="fa-solid fa-map-marker-alt text-blue-400 mt-1 text-lg"></i>
          <div>
            <p class="text-zinc-400 text-xs uppercase tracking-wide mb-1">Location</p>
            <p class="text-white text-sm font-medium">Phnom Penh, Cambodia</p>
          </div>
        </div>

        <div class="bg-zinc-700 rounded-2xl px-5 py-4 flex items-start gap-3">
          <i class="fa-solid fa-briefcase text-blue-400 mt-1 text-lg"></i>
          <div>
            <p class="text-zinc-400 text-xs uppercase tracking-wide mb-1">Role</p>
            <p class="text-white text-sm font-medium">Frontend Web Developer</p>
          </div>
        </div>

        <div class="bg-zinc-700 rounded-2xl px-5 py-4 flex items-start gap-3">
          <i class="fa-solid fa-graduation-cap text-blue-400 mt-1 text-lg"></i>
          <div>
            <p class="text-zinc-400 text-xs uppercase tracking-wide mb-1">Education</p>
            <p class="text-white text-sm font-medium">Bachelor's in Computer Science</p>
          </div>
        </div>

        <div class="bg-zinc-700 rounded-2xl px-5 py-4 flex items-start gap-3">
          <i class="fa-solid fa-code text-blue-400 mt-1 text-lg"></i>
          <div>
            <p class="text-zinc-400 text-xs uppercase tracking-wide mb-1">Experience</p>
            <p class="text-white text-sm font-medium">2+ Years of Development</p>
          </div>
        </div>

        <div class="bg-zinc-700 rounded-2xl px-5 py-4 flex items-start gap-3">
          <i class="fa-solid fa-language text-blue-400 mt-1 text-lg"></i>
          <div>
            <p class="text-zinc-400 text-xs uppercase tracking-wide mb-1">Languages</p>
            <p class="text-white text-sm font-medium">Khmer (Native), English</p>
          </div>
        </div>

        <div class="bg-zinc-700 rounded-2xl px-5 py-4 flex items-start gap-3">
          <i class="fa-solid fa-circle-check text-blue-400 mt-1 text-lg"></i>
          <div>
            <p class="text-zinc-400 text-xs uppercase tracking-wide mb-1">Availability</p>
            <p class="text-green-400 text-sm font-medium">Open to Opportunities</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>