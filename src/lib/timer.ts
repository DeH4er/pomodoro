import { setInterval } from 'worker-timers';
import type { ArrayElement } from './ArrayElement';

export type TimerData = ArrayElement<typeof timers>;

export const timers = [
  {
    id: 'work',
    label: 'Work',
    time: 25 * 60 * 1000,
  },
  {
    id: 'short-break',
    label: 'Short Break',
    time: 5 * 60 * 1000,
  },
  {
    id: 'long-break',
    label: 'Long Break',
    time: 15 * 60 * 1000,
  },
] as const;

interface StartTimerProps {
  time: number;
  onTick: (time: number) => void;
  onFinish?: () => void;
}

export function startTimer({ time, onTick, onFinish }: StartTimerProps) {
  const currentTime = { time };

  const tick = () => {
    currentTime.time -= 1000;
    onTick(currentTime.time);

    if (currentTime.time <= 0) {
      onFinish?.();
    }
  };

  const intervalRef = setInterval(tick, 1000);
  return intervalRef;
}
