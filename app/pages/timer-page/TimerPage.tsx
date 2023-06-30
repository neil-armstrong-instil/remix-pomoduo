import type {FC} from "react";
import {useTimeLeftInMilliseconds} from "~/pages/timer-page/hooks/UseTimeLeftInMilliseconds";
import {useRestartTimer} from "~/pages/timer-page/hooks/UseRestartTimer";
import {Timer} from "~/pages/timer-page/components/Timer";
import {Buttons} from "~/pages/timer-page/components/Buttons";
import {defaultRoomId} from "~/supabase/constants/DefaultRoomId";
import {useOnPause} from "~/pages/timer-page/hooks/UseOnPause";
import {useRoom} from "~/pages/timer-page/hooks/UseRoom";

interface Props {
  roomId?: string;
}

export const TimerPage: FC<Props> = (
  {
    roomId = defaultRoomId
  }
) => {
  const room = useRoom(roomId);
  const waitInMilliseconds = useTimeLeftInMilliseconds(room);
  const onReset = useRestartTimer(room);
  const [isPaused, onPause] = useOnPause(room);

  return (
    <main className="flex justify-center items-center min-h-screen bg-amber-600">
      <div className="flex flex-col justify-center items-center p-2 w-96 bg-opacity-5 bg-white border-transparent rounded">
        {room?.timer_end_time == null && (
          <div className="text-2xl text-center font-mono">
            JOSH HAS RESET ON HIS SILLY APP INSTEAD
          </div>
        )}

        {room?.timer_end_time != null && (
          <>
            <Timer
              waitInMilliseconds={waitInMilliseconds}
              isPaused={isPaused}
            />

            <Buttons
              isPaused={isPaused}
              onPause={onPause}
              onReset={onReset}
            />
          </>
        )}
      </div>
    </main>
  );
};