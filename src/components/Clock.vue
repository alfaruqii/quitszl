<template>
  <div class="flex flex-col sm:flex-row justify-between gap-10">
    <div>
      <p class="text-xs text-gray-500">Elapsed Time: </p>
      <p class="text-sm sm:text-md">{{ elapsedTime }}</p>
    </div>
    <Milestone :eventStartDate="startTime.toString()" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { calculateElapsedTime } from "../utils/elapsedTime.js"
const Milestone = defineAsyncComponent(() => import("./Milestone.vue"))

const props = defineProps(["eventStartDate"]);
const elapsedTime = ref('');

const startTime = new Date(props.eventStartDate);

onMounted(() => {
  const intervalId = setInterval(() => {
    elapsedTime.value = calculateElapsedTime(startTime);
  }, 1000);

  return () => clearInterval(intervalId);
});

</script>
