export const baseTime = 60 * 60 * 1000
export const milestones = [
  1 * 24 * baseTime, // 1 day
  3 * 24 * baseTime, // 3 days
  7 * 24 * baseTime, // 1 week
  10 * 24 * baseTime, // 10 days
  14 * 24 * baseTime, // 2 week
  30 * 24 * baseTime, // 1 months
  90 * 24 * baseTime, // 3 months
  180 * 24 * baseTime, // 5 months
  365 * 24 * baseTime, // 1 year
  365 * 5 * 24 * baseTime, // 5 year
];

export const calculateElapsedTime = (startTime) => {
  const currentDateTime = new Date();
  const timeDifference = currentDateTime - startTime;

  const days = Math.floor(timeDifference / (24 * baseTime));
  const hours = Math.floor((timeDifference % (24 * baseTime)) / 3600000);
  const minutes = Math.floor((timeDifference % 3600000) / 60000);
  const seconds = Math.floor((timeDifference % 60000) / 1000);

  return formatElapsedTime(days, hours, minutes, seconds);
};

const formatElapsedTime = (days, hours, minutes, seconds) => {
  const formattedTime = [];
  if (days > 0) {
    formattedTime.push(`${days} days`);
  }
  if (hours > 0) {
    formattedTime.push(`${hours} hours`);
  }
  if (minutes > 0) {
    formattedTime.push(`${minutes} minutes`);
  }
  formattedTime.push(`${seconds} seconds`);
  return formattedTime.join(' ');
};
