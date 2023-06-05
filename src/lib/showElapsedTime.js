export default function showElapsedTime(startTime) {
  const endTime = new Date();
  console.log(endTime);
  const elapsedTimeInSeconds = (endTime - startTime) / 1000;
  const elapsedTimeInMinutes = elapsedTimeInSeconds / 60;
  console.log('time elapsed:', elapsedTimeInMinutes.toFixed(2), 'min');
}
