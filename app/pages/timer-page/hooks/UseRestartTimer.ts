import {updateRoomEndTime} from "~/supabase/mutation/UpdateRoomEndTime";
import {useCallback} from "react";
import type {Room} from "~/supabase/types/Room";

export function useRestartTimer(room: Room | undefined): (newTimerInMinutes: number) => void {
  return useCallback((newTimerInMinutes = 25) => {
    if (!room) return;

    const asMilliseconds = newTimerInMinutes * 60 * 1000;
    updateRoomEndTime(room, new Date(new Date().getTime() + asMilliseconds))
  }, [room]);
}