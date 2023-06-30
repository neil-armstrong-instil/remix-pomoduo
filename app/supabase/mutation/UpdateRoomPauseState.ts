import {supabaseClient} from "~/supabase/SupabaseClient";
import {databaseName} from "~/supabase/constants/DatabaseName";
import type {Room} from "~/supabase/types/Room";

type TriggerPause = Pick<Room, "timer_paused_time">
type TriggerUnpause = Pick<Room, "timer_end_time" | "timer_paused_time">

export async function updateRoomPausedState(room: Room): Promise<void> {
  await supabaseClient()
    .from(databaseName)
    .update(buildUpdatePayload(room))
    .eq("room", room.room);
}

function buildUpdatePayload(room: Room): TriggerPause | TriggerUnpause {
  const now = new Date();

  if (room.timer_paused_time == null) {
    return {
      timer_paused_time: now
    };
  }

  return {
    timer_paused_time: null,
    timer_end_time: new Date(now.getTime() + (new Date(room.timer_end_time).getTime() - new Date(room.timer_paused_time).getTime()))
  }
}