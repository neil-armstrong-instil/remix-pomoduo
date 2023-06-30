import {useMemo} from "react";
import type {Room} from "~/supabase/types/Room";

export function useTimeLeftInMilliseconds(room: Room | undefined): number {
  return useMemo(() => {
    if (!room) return 0;

    if (room.timer_paused_time) {
      const numberOfMilliseconds = new Date(room.timer_end_time).getTime() - new Date(room.timer_paused_time).getTime();
      return Math.max(numberOfMilliseconds, 0);
    }

    const numberOfMilliseconds = new Date(room.timer_end_time).getTime() - new Date().getTime();
    return Math.max(numberOfMilliseconds, 0);
  }, [room]);
}
