import { createStore } from 'vuex';
import { getEventsFromLocalStorage, updateEventData } from '../utils/saveToLocalStorage';

// Helper function to update local storage
function saveEventsToLocalStorage(events) {
  updateEventData(events);
}

const store = createStore({
  state() {
    return {
      eventData: getEventsFromLocalStorage()
    }
  },
  mutations: {
    addEvent(state, newEvent) {
      state.eventData.push(newEvent); // Directly modify the state for better performance
      saveEventsToLocalStorage(state.eventData);
    },
    deleteEvent(state, eventId) {
      const index = state.eventData.findIndex(event => event.id === eventId);
      if (index !== -1) {
        state.eventData.splice(index, 1); // Directly modify the state for better performance
        saveEventsToLocalStorage(state.eventData);
      }
    },
    editEventName(state, { eventId, newName }) {
      const event = state.eventData.find(event => event.id === eventId);
      if (event) {
        event.habit = newName; // Directly modify the state for better performance
        saveEventsToLocalStorage(state.eventData);
      }
    },
  },
  actions: {
    initializeEvents({ state, commit }) {
      const events = getEventsFromLocalStorage();
      // Create a map or set for quick lookup of existing event IDs in state
      const existingEventIds = new Set(state.eventData.map(event => event.id));

      events.forEach(event => {
        // Only commit if the event is not already in the state
        if (!existingEventIds.has(event.id)) {
          commit('addEvent', event);
        }
      });
    },
  }
  // Remove getter if it's only returning the state as is
})

export default store;
