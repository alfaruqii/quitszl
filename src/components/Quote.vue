<template>
  <div class="px-6 py-3 w-fit mx-auto mt-4 rounded-lg shadow-lg bg-[#FE6367] text-white"
    v-if="(dataQuote.quote && dataQuote.author)">
    <h1 class="text-xl mb-2 font-sf-bold">
      Quote of the day
    </h1>
    <p class="font-medium">
      {{ dataQuote.quote }}
    </p>
    <p class="text-xs font-thin text-gray-501 mt-1.5">
      - {{ dataQuote.author }}
    </p>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <p>
      Loading...
    </p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useStorage } from '@vueuse/core';
import { setLocalStorage } from "../utils/saveToLocalStorage"
import { onMounted, reactive } from 'vue';
import { baseTime } from "../utils/elapsedTime"

const dataQuote = reactive({ quote: "", author: "" });
onMounted(() => {
  getQuotes();

  // Set up an interval to check for day change every hour
  setInterval(() => {
    const now = new Date();
    const currentDay = now.getDate();

    // Get the last fetched day from localStorage
    const lastFetchDay = parseInt(useStorage('quoteLastFetch').value) || 0;

    // If the current day is different from the last fetched day, fetch quotes
    if (currentDay !== lastFetchDay) {
      getQuotes();
    }
  }, baseTime); // Check every hour
});

function getQuotes() {
  const now = Date.now();
  const lastFetchTimestamp = useStorage('quoteLastFetch').value;

  // Fetch quotes only if last fetch timestamp is not set or a day has passed
  if (!lastFetchTimestamp) {
    axios.get("https://api.quotable.io/quotes/random").then((response) => {
      dataQuote.quote = response.data[0].content;
      dataQuote.author = response.data[0].author;

      // Store the current timestamp and day in localStorage
      setLocalStorage('quoteLastFetch', now);
      setLocalStorage('quoteLastFetchDay', new Date().getDate());
      setLocalStorage('cachedQuoteContent', response.data[0].content);
      setLocalStorage('cachedQuoteAuthor', response.data[0].author);
    });
  } else {
    // Use cached quote from localStorage
    dataQuote.quote = useStorage('cachedQuoteContent').value || '';
    dataQuote.author = useStorage('cachedQuoteAuthor').value || '';
  }
}

</script>
