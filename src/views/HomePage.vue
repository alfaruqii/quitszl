<template>
  <div v-if="(dataQuote.quote && dataQuote.author)" class="mx-6 sm:w-3/6 sm:mx-auto ">
    <div class="border px-6 py-3 w-fit mx-auto mt-4 rounded-lg bg-white shadow">
      <h1 class="text-xl text-gray-500 mb-2">
        Quote of the day
      </h1>
      <p>
        {{ dataQuote.quote }}
      </p>
      <p class="text-xs text-gray-500 mt-1.5">
        - {{ dataQuote.author }}
      </p>
    </div>
    <div v-if="eventData.length > 0" class="w-fit mt-12 flex flex-col gap-3 ">
      <p>I commit to quit :</p>
      <div v-for="(event, index) in eventData" v-if="eventData" :key="index"
        class="p-4 border shadow rounded-lg bg-white">
        <p class="text-lg font-bold mb-3">
          {{ event.habit }}
        </p>
        <div>
          <p class="text-xs text-gray-500">Abstinence Time</p>
          <Clock />
        </div>
        <p>
          {{ event.eventType }}
        </p>
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
import { reactive } from 'vue';
import { useState } from "../helper.js"
import Clock from "../components/Clock.vue"

const dataQuote = reactive({ quote: "", author: "" })
const { eventData } = useState(["eventData"])
const testerEvent = useState(["eventData"])
console.log("testerEvent : ", testerEvent)

function getQuotes() {
  axios.get("https://api.quotable.io/quotes/random").then((response) => {
    dataQuote.quote = response.data[0].content
    dataQuote.author = response.data[0].author
  })
}
getQuotes()
</script>
