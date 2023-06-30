import {useCallback, useMemo} from "react";
import {updateRoomPausedState} from "~/supabase/mutation/UpdateRoomPauseState";
import type {Room} from "~/supabase/types/Room";

export function useOnPause(room: Room | undefined): [boolean, () => void] {
  const isPaused = useMemo(() => {
    return room?.timer_paused_time != null
  }, [room]);

  const togglePause = useCallback(() => {
    if (!room) return;
    
    updateRoomPausedState(room);
  }, [room]);

  return [
    isPaused,
    togglePause
  ];
}