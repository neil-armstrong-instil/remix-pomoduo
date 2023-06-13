import {updateRoomEndTime} from "~/supabase/mutation/UpdateRoomEndTime";
import {useCallback} from "react";
import type {Room} from "~/supabase/types/Room";

const twentyFiveMinutes = 25 * 60 * 1000;

export function useRestartTimer(room: Room | undefined): () => void {
  return useCallback(() => {
    if (!room) return;

    updateRoomEndTime(room.room, new Date(new Date().getTime() + twentyFiveMinutes + 1000))
  }, [room]);
}