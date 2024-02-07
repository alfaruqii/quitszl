<template>
  <div class="antialiased font-sf tracking-wide">
    <Navbar />
    <router-view v-slot="{ Component, route }">
      <transition :enter-active-class="route?.meta?.enterClass" :leave-active-class="route?.meta?.leaveClass"
        mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import 'animate.css';
</script>

<style>
* {
  letter-spacing: 0.015cm;
}
</style>
