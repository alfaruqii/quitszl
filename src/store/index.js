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
    },
    editEventName(state, { eventId, newName }) {
      state.eventData = state.eventData.map((event) => {
        return event.id === eventId
          ? { ...event, habit: newName }
          : event;
      });

      localStorage.setItem('eventData', JSON.stringify(state.eventData));
    },
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

export default store;
