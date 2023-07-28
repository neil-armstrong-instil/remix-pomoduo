import type {FC} from "react";
import {useOnPause} from "~/pages/timer-page/hooks/UseOnPause";
import type {Room} from "~/supabase/types/Room";

interface Props {
  room: Room | undefined;
}

export const ActiveButtons: FC<Props> = (
  {
    room
  }
) => {
  const [, onPause] = useOnPause(room);

  return (
    <div className="flex justify-center items-center">
      <button
        className="flex justify-center items-center bg-white border-transparent rounded w-20 h-10 m-1"
        onClick={onPause}
      >
        Pause
      </button>
    </div>
  )
}