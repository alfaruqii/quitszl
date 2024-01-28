<template>
  <div
    class="flex justify-between sm:justify-around p-4 border-b shadow-sm sticky top-0 bg-[#FE6367] text-gray-100 z-50 items-center">
    <div class="font-bold text-xl text-white">
      <router-link to="/" class="flex items-center">
        <v-icon name="gi-breaking-chain" scale="2" />
        QuitSzel
      </router-link>
    </div>
    <div class="cursor-pointer">
      <router-link to="/quit" active-class="text-white">
        Break a habit
      </router-link>
    </div>
  </div>
</template>
