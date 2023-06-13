import type {FC} from "react";
import {useEffect, useMemo, useState} from "react";

interface Props {
  waitInMilliseconds: number;
  isPaused: boolean;
}

export const Timer: FC<Props> = (
  {
    waitInMilliseconds,
    isPaused
  }
) => {
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(Math.floor(waitInMilliseconds / 1000));

  useEffect(() => {
    setTimeLeftInSeconds(Math.floor(waitInMilliseconds / 1000));
  }, [waitInMilliseconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPaused || timeLeftInSeconds === -1) return;

      setTimeLeftInSeconds((timeLeftInSeconds) => {
        if (timeLeftInSeconds === 0) {
          return -1;
        }

        return timeLeftInSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, [isPaused, timeLeftInSeconds, waitInMilliseconds]);

  const timerText = useMemo(() => {
    if (timeLeftInSeconds === -1) return "Done!";

    return `${Math.floor(timeLeftInSeconds / 60)}:${formatSeconds(timeLeftInSeconds % 60)}`
  }, [timeLeftInSeconds]);

  return (
    <div className="flex justify-center items-center text-8xl">
      {timerText}
    </div>
  );
};

function formatSeconds(seconds: number): string {
  if (seconds >= 10) return seconds.toString();
  return `0${seconds}`;
}