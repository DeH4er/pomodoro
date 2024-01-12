export default function formatMilliseconds(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secondsLeft
    .toString()
    .padStart(2, '0')}`;
}
