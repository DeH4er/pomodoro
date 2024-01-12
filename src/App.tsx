import { useEffect, useRef, useState } from 'react';
import timerBell from '/audio/TimerBell.mp3';
import { timers, TimerData, startTimer } from './lib/timer';
import Tab from './components/Tab';
import formatMilliseconds from './lib/formatMilliseconds';

function App() {
  const [selectedTimer, setSelectedTimer] = useState(timers[0]);
  const [currentTime, setCurrentTime] = useState(timers[0].time);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | undefined>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const onTimerChange = (timer: TimerData) => {
    stop();
    setSelectedTimer(timer);
    setCurrentTime(timer.time);
  };

  const stop = () => {
    setIsPlaying(false);
    setCurrentTime(selectedTimer.time);
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const start = () => {
    if (isPlaying) {
      stop();
    }

    setIsPlaying(true);

    timerRef.current = startTimer({
      time: selectedTimer.time,
      onTick: (time) => {
        setCurrentTime(time);
      },
      onFinish: () => {
        if (!audioRef.current?.paused) {
          audioRef.current?.pause();
        }
        audioRef.current?.play();
        stop();
      },
    });
  };

  const onToggle = () => {
    if (!isPlaying) {
      start();
    } else {
      stop();
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = 0.5;
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md bg-gray-900 text-white rounded-xl px-16 py-6 flex flex-col items-center shadow-sm">
        <div className="flex justify-center">
          {timers.map((timer) => (
            <Tab
              key={timer.id}
              isSelected={selectedTimer.id === timer.id}
              onClick={() => onTimerChange(timer)}
            >
              {timer.label}
            </Tab>
          ))}
        </div>

        <div className="mt-4 text-[6rem] text-center font-bold">
          {formatMilliseconds(currentTime)}
        </div>

        <button
          className="bg-white text-black text-3xl rounded-md py-2 px-4 my-4 min-w-[140px]"
          onClick={onToggle}
          disabled={currentTime === 0}
        >
          {isPlaying || currentTime === 0 ? 'STOP' : 'START'}
        </button>
        <audio src={timerBell} ref={audioRef} />
      </div>
    </main>
  );
}

export default App;
