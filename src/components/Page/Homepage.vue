<script setup>
import MenuPage from '@/components/Layout/MenuPage.vue'
</script>

<template>
  <!-- top bar -->
  <div class="home-page  w-screen flex justify-center ">
    <div class="home-contener w-[60%] mx-auto bg-black text-white px-2 py-2 flex justify-center items-center rounded-3xl mt-2 gap-10">
      <div class="name-web">
        <h1 class="text-white text-2xl font-bold"><router-view>KUN VINTHIEN</router-view></h1>
      </div>
      <MenuPage />
      <div class="btn-view-github shake">
        <button class="text-white px-4 py-2 rounded-3xl bg-amber-500 hover:bg-amber-600 translate-5s hover:scale-100"><a href="https://github.com/robertoferreira/ecommerce-frontend" target="_blank"> View GitHub</a></button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .shake {
  animation: shake  3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  animation-iteration-count: infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>