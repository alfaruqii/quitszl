import { createStore } from 'vuex'
import { getEventsFromLocalStorage, updateEventData } from '../utils/saveToLocalStorage';

const store = createStore({
  state() {
    return {
      eventData: getEventsFromLocalStorage()
    }
  },
  mutations: {
    addEvent(state, newevent) {
      state.eventData = [...state.eventData, newevent];
      updateEventData(state.eventData)
    },
    deleteEvent(state, eventId) {
      state.eventData = state.eventData.filter(event => event.id !== eventId);
      updateEventData(state.eventData)
    },
    editEventName(state, { eventId, newName }) {
      state.eventData = state.eventData.map((event) => {
        return event.id === eventId
          ? { ...event, habit: newName }
          : event;
      });
      updateEventData(state.eventData)
    },
  },
  actions: {
    initializeEvents({ state, commit }) {
      const events = getEventsFromLocalStorage()
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
