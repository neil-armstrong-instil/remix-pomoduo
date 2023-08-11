import type {FC} from "react";
import {useMemo} from "react";
import {useTimeLeftInMilliseconds} from "~/pages/timer-page/hooks/UseTimeLeftInMilliseconds";
import {Timer} from "~/pages/timer-page/layouts/Timer";
import {ActiveButtons} from "~/pages/timer-page/layouts/ActiveButtons";
import {defaultRoomId} from "~/supabase/constants/DefaultRoomId";
import {useOnPause} from "~/pages/timer-page/hooks/UseOnPause";
import {useRoom} from "~/pages/timer-page/hooks/UseRoom";
import {InactiveButtons} from "~/pages/timer-page/layouts/InactiveButtons";
import "./TimerPage.css";

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
  const [isPaused] = useOnPause(room);

  const isActive = useMemo(() => {
    if (room?.timer_end_time == null) return false;

    return !isPaused;
  }, [isPaused, room?.timer_end_time]);

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center">
        {room?.timer_end_time != null && (
          <Timer
            waitInMilliseconds={waitInMilliseconds}
            isPaused={isPaused}
          />
        )}

        {isActive && (
          <ActiveButtons
            room={room}
          />
        )}

        {!isActive && (
          <InactiveButtons
            room={room}
          />
        )}
      </div>
    </main>
  );
};