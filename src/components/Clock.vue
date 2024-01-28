<template>
  <div class="flex flex-col sm:flex-row justify-between gap-10">
    <div>
      <p class="text-xs text-gray-500">Abstinence Time</p>
      <p class="text-sm sm:text-md">Elapsed Time: {{ elapsedTime }}</p>
    </div>
    <div class="flex justify-center items-center flex-col relative">
      <div v-html="svgCircle" class="relative text-center" :style="svgStyle"></div>
      <p class="absolute -top-5 transition duration-200">{{ progressPercentage }}%</p>
      <p class="absolute bottom-0">{{ milestoneDays }} days</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, computed, watchEffect } from 'vue';

const props = defineProps({
  eventStartDate: String
});
const elapsedTime = ref('');

const startTime = new Date(props.eventStartDate);
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
  // Adjust the radius based on screen size
  const radius = window.innerWidth < 768 ? 50 : 70; // Smaller radius for mobile
  const circumference = 2 * Math.PI * radius;
  const strokeVal = (circumference / 100) * progressPercentage.value;
  const dashArray = `${strokeVal} ${circumference}`;

  return `<svg width="100%" height="100%" viewBox="0 0 200 100">
            <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="#ddd" stroke-width="20"/>
            <path style="transition: stroke-dasharray 2s ease-out;" d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="#4ade80" stroke-width="20" stroke-dasharray="${dashArray}" stroke-linecap="round"/>
          </svg>`;
});

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
    elapsedTime.value = calculateElapsedTime(startTime);
    calculateMilestoneProgress();
  }, 1000);

  return () => clearInterval(intervalId);
});

const calculateElapsedTime = (startTime) => {
  const currentDateTime = new Date();
  const timeDifference = currentDateTime - startTime;

  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / 3600000);
  const minutes = Math.floor((timeDifference % 3600000) / 60000);
  const seconds = Math.floor((timeDifference % 60000) / 1000);

  return formatElapsedTime(days, hours, minutes, seconds);
};

const formatElapsedTime = (days, hours, minutes, seconds) => {
  const formattedTime = [];

  if (days > 0) {
    formattedTime.push(`${days} days`);
  }

  if (hours > 0) {
    formattedTime.push(`${hours} hours`);
  }

  if (minutes > 0) {
    formattedTime.push(`${minutes} minutes`);
  }

  formattedTime.push(`${seconds} seconds`);

  return formattedTime.join(' ');
};
</script>
