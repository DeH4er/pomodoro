import { setInterval } from 'worker-timers';

export interface TimerData {
  id: string;
  label: string;
  time: number;
}

export const timers: TimerData[] = [
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
];

interface StartTimerProps {
  time: number;
  onTick: (time: number) => void;
  onFinish?: () => void;
}

export function startTimer({ time, onTick, onFinish }: StartTimerProps) {
  const currentTime = { time };

  const tick = () => {
    currentTime.time -= 1000;
    if (currentTime.time <= 0) {
      onFinish?.();
    }

    onTick(currentTime.time);
  };

  tick();

  const intervalRef = setInterval(tick, 1000);
  return intervalRef;
}
