// Define base time units in milliseconds
export const HOUR_MS = 60 * 60 * 1000; // 1 hour
export const DAY_MS = 24 * HOUR_MS; // 1 day

// Simplified milestones using the DAY_MS constant
export const milestones = [
  1 * DAY_MS, // 1 day
  3 * DAY_MS, // 3 days
  7 * DAY_MS, // 1 week
  10 * DAY_MS, // 10 days
  14 * DAY_MS, // 2 weeks
  30 * DAY_MS, // 1 month
  90 * DAY_MS, // 3 months
  180 * DAY_MS, // 6 months, corrected from 5 to match the comment
  365 * DAY_MS, // 1 year
  365 * 5 * DAY_MS, // 5 years
];

export const calculateElapsedTime = (startTime) => {
  const timeDifference = new Date() - startTime;

  const days = Math.floor(timeDifference / DAY_MS);
  const hours = Math.floor((timeDifference % DAY_MS) / HOUR_MS);
  const minutes = Math.floor((timeDifference % HOUR_MS) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  return formatElapsedTime(days, hours, minutes, seconds);
};

const formatElapsedTime = (days, hours, minutes, seconds) => {
  const formattedTime = [];
  if (days > 0) {
    formattedTime.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0) {
    formattedTime.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    formattedTime.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }
  formattedTime.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  return formattedTime.join(' ');
};
