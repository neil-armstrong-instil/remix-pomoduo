import {useCallback, useEffect, useState} from "react";
import {updateRoomPausedState} from "~/supabase/mutation/UpdateRoomPauseState";
import type {Room} from "~/supabase/types/Room";

export function useOnPause(room: Room | undefined): [boolean, () => void] {
  const [isPaused, setPaused] = useState(room?.paused ?? true);

  useEffect(() => {
    if (room) setPaused(room.paused);
  }, [room]);

  const togglePause = useCallback(() => {
    if (!room) return;
    
    updateRoomPausedState(room.room, !isPaused);
  }, [isPaused, room]);

  return [
    isPaused,
    togglePause
  ];
}