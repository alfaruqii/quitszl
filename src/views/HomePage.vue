<template>
  <div v-if="(dataQuote.quote && dataQuote.author)" class="px-4 sm:w-3/6 sm:mx-auto pb-8  min-h-screen">
    <div class="border px-6 py-3 w-fit mx-auto mt-4 rounded-lg bg-white shadow">
      <h1 class="text-xl text-gray-500 mb-2">
        Quote of the day
      </h1>
      <p>
        {{ dataQuote.quote }}
      </p>
      <p class="text-xs text-gray-501 mt-1.5">
        - {{ dataQuote.author }}
      </p>
    </div>
    <div v-if="eventData.length > 0" class="w-full mt-12 flex flex-col gap-3 ">
      <p>I commit to quit :</p>
      <div v-for="(event, index) in eventData" v-if="eventData" :key="index"
        class="px-4 pt-4 border shadow rounded-lg bg-white relative">
        <div class="absolute top-2 right-2">
          🗑️
        </div>
        <p class="text-lg font-bold mb-3 capitalize">
          {{ event.habit }}
        </p>
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
import { useState, useMutations } from "../helper.js"
import Clock from "../components/Clock.vue"

const dataQuote = reactive({ quote: "", author: "" })
const { eventData } = useState(["eventData"])
const { deleteEvent } = useMutations(["deleteEvent"])

onMounted(() => {
  getQuotes();
});

function removeEvent(eventId) {
  deleteEvent(eventId)
}

function getQuotes() {
  const lastFetchTimestamp = localStorage.getItem('quoteLastFetch');
  const now = Date.now();

  // If last fetch timestamp is not set or a day has passed
  if (!lastFetchTimestamp || now - lastFetchTimestamp > 24 * 60 * 60 * 1000) {
    axios.get("https://api.quotable.io/quotes/random").then((response) => {
      dataQuote.quote = response.data[0].content;
      dataQuote.author = response.data[0].author;

      // Store the current timestamp in localStorage
      localStorage.setItem('quoteLastFetch', now);
      localStorage.setItem('cachedQuoteContent', response.data[0].content);
      localStorage.setItem('cachedQuoteAuthor', response.data[0].author);
    });
  } else {
    // Use cached quote from localStorage
    dataQuote.quote = localStorage.getItem('cachedQuoteContent') || '';
    dataQuote.author = localStorage.getItem('cachedQuoteAuthor') || '';
  }
}
getQuotes()
</script>
