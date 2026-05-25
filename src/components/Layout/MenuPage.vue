<script setup>
const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="menu-bar">
    <div class="items-menu">
        <ul class="flex justify-center items-center gap-4">
            <li><a href="#about" @click="scrollToSection('about')">About</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>
  </div>
</template>  
<style scoped>
.menu-bar .items-menu ul li a{
    color: white;
    font-size: 15px;
    font-weight: 500;
    transition: all 1s ease;
    text-decoration: none;

}
.menu-bar .items-menu ul li a:hover{
    color: #f1c40f;
    text-decoration: underline;

}
</style>