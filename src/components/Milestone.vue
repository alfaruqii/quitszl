<template>
  <div class="flex justify-center items-center flex-col relative">
    <div v-html="svgCircle" class="relative text-center" :style="svgStyle"></div>
    <p class="absolute -top-5 transition duration-200">{{ progressPercentage }}%</p>
    <p class="absolute bottom-0">{{ milestoneDays }} days</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import { baseTime, milestones } from "../utils/elapsedTime"

const { eventStartDate } = defineProps(["eventStartDate"]);

const startTime = new Date(eventStartDate);
const progressPercentage = ref(0);
const milestoneDays = ref(0);
const svgStyle = ref({});

watchEffect(() => {
  const smallSize = window.innerWidth < 768; // Example breakpoint for mobile
  svgStyle.value = {
    width: smallSize ? '150px' : '200px', // Adjust size for mobile
    height: smallSize ? '75px' : '100px'
  };
});

const svgCircle = computed(() => {
  const screenWidth = window.innerWidth
  const radius = screenWidth < 768 ? 50 : 70; // Choose appropriate values for smaller and larger screens
  const circumference = 2 * Math.PI * radius;
  const divider = screenWidth < 768 ? 70 : 100 // Smaller divider for mobile
  const strokeVal = (circumference / 2 / divider) * progressPercentage.value;
  const dashArray = `${strokeVal} ${circumference}`;

  return `<svg width="100%" height="100%" viewBox="0 0 200 100">
            <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="#ddd" stroke-width="20"/>
            <path style="transition: stroke-dasharray 2s ease-out;" d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="#4ade80" stroke-width="20" stroke-dasharray="${dashArray}" stroke-linecap="round"/>
          </svg>`;
});

const calculateMilestoneProgress = () => {
  const now = new Date();
  const elapsed = now - startTime;
  let currentMilestone = 0;
  let nextMilestone = milestones[0];

  for (let i = 0; i < milestones.length; i++) {
    if (elapsed < milestones[i]) {
      nextMilestone = milestones[i];
      currentMilestone = i === 0 ? 0 : milestones[i - 1];
      milestoneDays.value = nextMilestone / (24 * baseTime);
      break;
    }
  }

  const progress = nextMilestone !== currentMilestone ? ((elapsed - currentMilestone) / (nextMilestone - currentMilestone)) * 100 : 0;
  progressPercentage.value = Math.min(progress, 100).toFixed(2); // Round to 2 decimal places
};

onMounted(() => {
  const intervalId = setInterval(() => {
    calculateMilestoneProgress();
  }, 1000);

  return () => clearInterval(intervalId);
});

</script>
