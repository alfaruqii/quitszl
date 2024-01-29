<template>
  <div v-if="(dataQuote.quote && dataQuote.author)" class="px-4 sm:w-3/6 sm:mx-auto pb-8  min-h-screen">
    <div class="border px-6 py-3 w-fit mx-auto mt-4 rounded-lg bg-white shadow">
      <h1 class="text-xl text-gray-500 mb-2 font-thin">
        Quote of the day
      </h1>
      <p class="font-medium">
        {{ dataQuote.quote }}
      </p>
      <p class="text-xs font-thin text-gray-501 mt-1.5">
        - {{ dataQuote.author }}
      </p>
    </div>
    <div v-if="eventData.length > 0" class="w-full mt-12 flex flex-col gap-3 ">
      <p>I commit to quit :</p>
      <div v-for="(event, index) in eventData" v-if="eventData" :key="index"
        class="px-4 pt-4 border shadow rounded-lg bg-white relative">
        <DropDown :event="event" />
        <div class="flex gap-2 items-center mb-3 ">
          <v-icon class="mb-1"
            :name="event.eventType === 'Money' ? 'gi-take-my-money' : event.eventType === 'Event' ? 'md-accesstime' : 'io-thumbs-down'" />
          <p class="text-lg font-bold capitalize">
            {{ event.habit }}
          </p>
        </div>
        <div>
          <Clock :eventStartDate="event.date" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <p>
      Loading...
    </p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useState } from "../helper.js";
import Clock from "../components/Clock.vue";
import DropDown from '../components/DropDown.vue';

const dataQuote = reactive({ quote: "", author: "" });
const { eventData } = useState(["eventData"]);

onMounted(() => {
  getQuotes();

  // Set up an interval to check for day change every hour
  setInterval(() => {
    const now = new Date();
    const currentDay = now.getDate();

    // Get the last fetched day from localStorage
    const lastFetchDay = parseInt(localStorage.getItem('quoteLastFetchDay')) || 0;

    // If the current day is different from the last fetched day, fetch quotes
    if (currentDay !== lastFetchDay) {
      getQuotes();
    }
  }, 60 * 60 * 1000); // Check every hour
});

function getQuotes() {
  const now = Date.now();
  const lastFetchTimestamp = localStorage.getItem('quoteLastFetch');

  // Fetch quotes only if last fetch timestamp is not set or a day has passed
  if (!lastFetchTimestamp) {
    axios.get("https://api.quotable.io/quotes/random").then((response) => {
      dataQuote.quote = response.data[0].content;
      dataQuote.author = response.data[0].author;

      // Store the current timestamp and day in localStorage
      localStorage.setItem('quoteLastFetch', now);
      localStorage.setItem('quoteLastFetchDay', new Date().getDate());
      localStorage.setItem('cachedQuoteContent', response.data[0].content);
      localStorage.setItem('cachedQuoteAuthor', response.data[0].author);
    });
  } else {
    // Use cached quote from localStorage
    dataQuote.quote = localStorage.getItem('cachedQuoteContent') || '';
    dataQuote.author = localStorage.getItem('cachedQuoteAuthor') || '';
  }
}
</script>
