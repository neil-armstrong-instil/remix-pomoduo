import type {ChangeEventHandler, FC} from "react";
import {useCallback, useState} from "react";
import {useRestartTimer} from "~/pages/timer-page/hooks/UseRestartTimer";
import {useOnPause} from "~/pages/timer-page/hooks/UseOnPause";
import type {Room} from "~/supabase/types/Room";

interface Props {
  room: Room | undefined;
}

export const InactiveButtons: FC<Props> = (
  {
    room
  }
) => {
  const [newTimerInMinutes, setNewTimerInMinutes] = useState(25);

  const onTimerChanged: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    const asNumber = Number(event.target.value);
    if (Number.isNaN(asNumber)) return;

    setNewTimerInMinutes(asNumber);
  }, []);

  const [, onResume] = useOnPause(room);
  const onReset = useRestartTimer(room);

  return (
    <div className="flex justify-center items-center">
      <button
        className="flex justify-center items-center bg-white border-transparent rounded w-20 h-10 m-1"
        onClick={onResume}
      >
        Resume
      </button>

      <div className="flex flex-col justify-center items-center">
        <input
          id="timerInMinutes"
          className="rounded w-14 h-5 p-2"
          type="number"
          step={1}
          value={newTimerInMinutes}
          onChange={onTimerChanged}
        />

        <label className="block text-xs w-14 text-center mt-1" htmlFor="timerInMinutes">
          Minutes
        </label>
      </div>

      <button
        className="flex justify-center items-center bg-white border-transparent rounded w-20 h-10 m-1"
        onClick={() => onReset(newTimerInMinutes)}
      >
        Restart
      </button>
    </div>
  );
};