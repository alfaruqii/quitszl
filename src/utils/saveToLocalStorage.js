function getEventsFromLocalStorage() {
  const events = localStorage.getItem('eventData');
  return events ? JSON.parse(events) : [];
}

export default function saveEventToLocalStorage(event) {
  const events = getEventsFromLocalStorage();
  events.push(event);
  localStorage.setItem('eventData', JSON.stringify(events));
}

