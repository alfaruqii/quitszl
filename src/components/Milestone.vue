<template>
  <div class="flex justify-center items-center flex-col relative">
    <div v-html="svgCircle" class="relative text-center" :style="svgStyle"></div>
    <p class="absolute -top-5 transition duration-200">{{ progressPercentage }}%</p>
    <p class="absolute bottom-0">{{ milestoneDays }} days</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';

const props = defineProps({
  eventStartDate: String
});

const startTime = new Date(props.eventStartDate);
const progressPercentage = ref(0);
const milestoneDays = ref(0);
const svgStyle = ref({});

const milestones = [
  1 * 24 * 60 * 60 * 1000, // 1 day
  3 * 24 * 60 * 60 * 1000, // 3 days
  7 * 24 * 60 * 60 * 1000, // 1 week
  10 * 24 * 60 * 60 * 1000, // 10 days
  14 * 24 * 60 * 60 * 1000, // 2 week
  30 * 24 * 60 * 60 * 1000, // 1 months
  90 * 24 * 60 * 60 * 1000, // 3 months
  180 * 24 * 60 * 60 * 1000, // 5 months
  365 * 24 * 60 * 60 * 1000, // 1 year
  365 * 5 * 24 * 60 * 60 * 1000, // 5 year
];

watchEffect(() => {
  const smallSize = window.innerWidth < 768; // Example breakpoint for mobile
  svgStyle.value = {
    width: smallSize ? '150px' : '200px', // Adjust size for mobile
    height: smallSize ? '75px' : '100px'
  };
});

const svgCircle = computed(() => {
  // Adjust the radius based on screen size
  const radius = window.innerWidth < 768 ? 50 : 70; // Smaller radius for mobile
  const circumference = 2 * Math.PI * radius;
  const strokeVal = (circumference / 2 / 100) * progressPercentage.value;
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
      milestoneDays.value = nextMilestone / (24 * 60 * 60 * 1000);
      break;
    }
  }

  const progress = ((elapsed - currentMilestone) / (nextMilestone - currentMilestone)) * 100;
  progressPercentage.value = Math.min(progress, 100).toFixed(2); // Round to 2 decimal places
};


onMounted(() => {
  const intervalId = setInterval(() => {
    calculateMilestoneProgress();
  }, 1000);

  return () => clearInterval(intervalId);
});


</script>
