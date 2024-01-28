<template>
  <div class="flex justify-around p-4 border-b shadow-sm sticky top-0 bg-[#FE6367] text-gray-200 z-50">
    <div class="font-bold text-xl text-white">
      <router-link to="/">
        QuitSzel
      </router-link>
    </div>
    <div class="cursor-pointer">
      <router-link to="/quit" active-class="text-white">
        Quit Something
      </router-link>
    </div>
  </div>
</template>
