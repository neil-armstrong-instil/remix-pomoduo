import type {ChangeEventHandler, FC} from "react";
import {useCallback, useState} from "react";
import {useRestartTimer} from "~/pages/timer-page/hooks/UseRestartTimer";
import {useOnPause} from "~/pages/timer-page/hooks/UseOnPause";
import type {Room} from "~/supabase/types/Room";
import {Button} from "~/pages/timer-page/components/Button";
import {Input} from "~/pages/timer-page/components/Input";

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

    if (asNumber > 99) {
      setNewTimerInMinutes(99);
    } else if (asNumber < 0) {
      setNewTimerInMinutes(0);
    } else {
      setNewTimerInMinutes(asNumber);
    }
  }, []);

  const [, onResume] = useOnPause(room);
  const onReset = useRestartTimer(room);

  return (
    <div className="flex justify-between items-center p-2 w-96 bg-opacity-30 bg-white border-transparent rounded-b">
      <div className="flex justify-start items-center space-x-4">
        <Button onClick={onResume}>
          Resume
        </Button>
      </div>

      <div className="flex justify-start items-center space-x-1">
        <div className="flex flex-col justify-center items-center">
          <Input
            type="number"
            pattern="\d+"
            step={1}
            value={newTimerInMinutes}
            onChange={onTimerChanged}
          />
        </div>

        <Button onClick={() => onReset(newTimerInMinutes)}>
          Restart
        </Button>
      </div>
    </div>
  );
};