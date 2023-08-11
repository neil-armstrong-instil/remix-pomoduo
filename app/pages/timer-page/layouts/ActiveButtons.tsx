import type {FC} from "react";
import {useOnPause} from "~/pages/timer-page/hooks/UseOnPause";
import type {Room} from "~/supabase/types/Room";
import {Button} from "~/pages/timer-page/components/Button";

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
    <div className="flex justify-start items-center p-2 w-96 bg-opacity-30 bg-white border-transparent rounded-b">
      <Button
        onClick={onPause}
      >
        Pause
      </Button>
    </div>
  )
}