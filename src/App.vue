<template>
  <div class="antialiased font-sf tracking-wide">
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
* {
  letter-spacing: 0.015cm;
}
</style>
