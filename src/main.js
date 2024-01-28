import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import router from './Routes'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      eventData: JSON.parse(localStorage.getItem('eventData')) || [] // Initialize state from localStorage
    }
  },
  mutations: {
    addEvent(state, newevent) {
      state.eventData = [...state.eventData, newevent];
      localStorage.setItem('eventData', JSON.stringify(state.eventData)); // Update localStorage
    },
    deleteEvent(state, eventId) {
      state.eventData = state.eventData.filter(event => event.id !== eventId);
      localStorage.setItem('eventData', JSON.stringify(state.eventData)); // Update localStorage
    }
  },
  actions: {
    initializeEvents({ state, commit }) {
      const events = JSON.parse(localStorage.getItem('eventData')) || [];
      events.forEach(event => {
        // Only commit if the event is not already in the state
        if (!state.eventData.some(e => e.id === event.id)) {
          commit('addEvent', event);
        }
      });
    },
  },
  getters: {
    getNewEvent: state => {
      return state.eventData
    }
  },
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

// Call initializeEvents action when the app starts
store.dispatch('initializeEvents');
