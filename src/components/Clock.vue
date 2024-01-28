<template>
  <div class="flex flex-col sm:flex-row justify-between gap-10">
    <div>
      <p class="text-xs text-gray-500">Elapsed Time: </p>
      <p class="text-sm sm:text-md">{{ elapsedTime }}</p>
    </div>
    <Milestone :eventStartDate="props.eventStartDate" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { calculateElapsedTime } from "../utils/elapsedTime.js"
import Milestone from "./Milestone.vue"

const props = defineProps({
  eventStartDate: String
});
const elapsedTime = ref('');

const startTime = new Date(props.eventStartDate);

onMounted(() => {
  const intervalId = setInterval(() => {
    elapsedTime.value = calculateElapsedTime(startTime);
  }, 1000);

  return () => clearInterval(intervalId);
});

</script>
