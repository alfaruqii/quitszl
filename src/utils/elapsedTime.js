export const calculateElapsedTime = (startTime) => {
  const currentDateTime = new Date();
  const timeDifference = currentDateTime - startTime;

  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / 3600000);
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
