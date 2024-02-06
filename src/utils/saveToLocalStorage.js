export function getEventsFromLocalStorage() {
  const events = JSON.parse(localStorage.getItem('eventData')) || [];
  return events;
}

export function updateEventData(events) {
  localStorage.setItem('eventData', JSON.stringify(events));
}

export function saveEventToLocalStorage(event) {
  const events = getEventsFromLocalStorage();
  events.push(event);
  updateEventData(events)
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, data)
}
