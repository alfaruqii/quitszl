<template>
  <form class="mt-4 w-fit mx-4 sm:mx-auto flex flex-col gap-4 min-h-screen">
    <p>
      Select the type
    </p>
    <div class="flex flex-col gap-4">
      <label class="border p-3 bg-white rounded-lg shadow flex flex-col gap-4" for="money">
        <div class="flex justify-between">
          <div class="flex gap-1.5 items-center">
            <v-icon name="gi-take-my-money" scale="1.4" />
            <label class="font-bold">Money</label>
          </div>
          <input id="money" type="radio" class="" value="Money" v-model="newEvent.eventType">
        </div>
        <p class="text-sm text-gray-600">This addiction or bad habit costs you money. For example: smoking, drinking
          alcohol.</p>
      </label>
      <label class="border p-3 bg-white rounded-lg shadow flex flex-col gap-4" for="time">
        <div class="flex justify-between">
          <div class="flex gap-1.5 items-center">
            <v-icon name="md-accesstime" scale="1" />
            <label class="font-bold">Time</label>
          </div>
          <input id="time" type="radio" class="" value="Time" v-model="newEvent.eventType">
        </div>
        <p class="text-sm text-gray-600">This habit is a waste of precious time. Example: video games, procrastination.
        </p>
      </label>
      <label class="border p-3 bg-white rounded-lg shadow flex flex-col gap-4" for="event">
        <div class="flex justify-between">
          <div class="flex gap-1.5 items-center">
            <v-icon name="io-thumbs-down" scale="1" />
            <label class="font-bold">Event</label>
          </div>
          <input id="event" type="radio" class="" value="Event" v-model="newEvent.eventType">
        </div>
        <p class="text-sm text-gray-600">This habit does not cost money or time. But the event itself is bad for you.
          Example: watching porn, overeating
        </p>
      </label>
    </div>
    <div class="">
      <label for="">
        Habit Name :
      </label>
      <input type="text" class="border-b border-[#FE6367] ml-3 bg-gray-100 outline-none" v-model="newEvent.habit">
    </div>
    <button class="border w-fit px-2 py-1 rounded bg-white" @click.prevent="submitForm" :disabled="isFormValid">
      Complete
    </button>
  </form>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useMutations } from '../helper';
import saveEventToLocalStorage from "../utils/saveToLocalStorage.js"

const newEvent = reactive({
  eventType: "",
  habit: "",
})

const { addEvent } = useMutations(["addEvent"])

const isFormValid = computed(() => {
  return !newEvent.eventType || !newEvent.habit
});

function submitForm() {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta' // Set the time zone to Western Indonesia Time (WIB)
  };
  if (!newEvent.eventType || !newEvent.eventType) {
    alert("Please filling the form");
    return;
  }
  const eventObject = {
    ...newEvent,
    date: new Date().toLocaleString('en-US', options).replace(/\//g, '-').replace(/,/g, ' '),
    id: Date.now()
  };

  // Save to localStorage
  saveEventToLocalStorage(eventObject);

  // Add event to state (if needed)
  addEvent(eventObject);
  clearEvent()
}

function clearEvent() {
  newEvent.eventType = ""
  newEvent.habit = ""
}

</script>
