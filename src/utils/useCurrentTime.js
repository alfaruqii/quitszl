import { ref, onBeforeUnmount } from "vue";

export const useCurrentTime = () => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta' // Set the time zone to Western Indonesia Time (WIB)
  };
  const currentTime = ref(new Date().toLocaleString('en-US', options));
  const updateCurrentTime = () => {
    currentTime.value = new Date().toLocaleString('en-US', options);
  };
  const updateTimeInterval = setInterval(updateCurrentTime, 1000);
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
  });
  return {
    currentTime,
  };
};
