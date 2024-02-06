<template>
  <div v-if="eventData.length > 0" class="w-full mt-12 flex flex-col gap-3 ">
    <p class="font-sf-bold">I commit to quit :</p>
    <div v-for="(event, index) in eventData" v-if="eventData[0]" :key="index"
      class="px-4 pt-4 shadow-lg rounded-lg bg-white relative">
      <DropDown :event="event" />
      <div class="flex gap-2 items-center mb-2">
        <v-icon
          :name="event?.eventType === 'Money' ? 'gi-take-my-money' : event?.eventType === 'Event' ? 'md-accesstime' : 'io-thumbs-down'"
          :color="event?.eventType === 'Money' ? 'green' : event?.eventType === 'Event' ? '#FE6266' : '#edd2a4'" />
        <p class="text-lg capitalize font-sf-bold">
          {{ event.habit }}
        </p>
      </div>
      <Clock :eventStartDate="event?.date.toString()" />
    </div>
  </div>
  <div v-else class="mt-40 text-center font-sf-bold text-gray-400 text-xl">
    <p>You haven't start any habit</p>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useState } from '../helper';
const Clock = defineAsyncComponent(() => import("../components/Clock.vue"))
const DropDown = defineAsyncComponent(() => import("../components/DropDown.vue"))

const { eventData } = useState(["eventData"]);
</script>
