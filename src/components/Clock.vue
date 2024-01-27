<template>
  <div>
    <p>Elapsed Time: {{ elapsedTime }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useState } from "../helper.js"

const { eventData } = useState(["eventData"])
const startTime = new Date(eventData.date);
console.log(startTime)
const elapsedTime = ref('');

onMounted(() => {
  const intervalId = setInterval(() => {
    elapsedTime.value = calculateElapsedTime(startTime);
  }, 1000);

  // Clear the interval when the component is unmounted
  return () => clearInterval(intervalId);
});

const calculateElapsedTime = (startTime) => {
  const currentDateTime = new Date();
  const timeDifference = currentDateTime - startTime;

  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / 3600000);
  const minutes = Math.floor((timeDifference % 3600000) / 60000);
  const seconds = Math.floor((timeDifference % 60000) / 1000);

  return `${pad(days)}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const pad = (value, length = 2) => {
  return (value.toString().length < length) ? pad("0" + value, length) : value;
};

</script>
