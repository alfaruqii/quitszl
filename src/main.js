import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import router from './Routes'
import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      eventData: []
    }
  },
  mutations: {
    addEvent(state, newevent) {
      state.eventData = [...state.eventData, newevent]
    }
  },
  actions: {
    addNewEvent({ commit }) {
      commit('addEvent')
    }
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
