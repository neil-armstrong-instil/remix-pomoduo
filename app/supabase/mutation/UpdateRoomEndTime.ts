import {supabaseClient} from "~/supabase/SupabaseClient";
import {databaseName} from "~/supabase/constants/DatabaseName";
import type {Room} from "~/supabase/types/Room";

type Update = Pick<Room, "updated_at" | "timer_end_time" | "timer_paused_time">

export async function updateRoomEndTime(room: Room, newEndTime: Date): Promise<void> {
  const now = new Date();

  await supabaseClient()
    .from(databaseName)
    .update({
      updated_at: now,
      timer_paused_time: now,
      timer_end_time: newEndTime
    } as Update)
    .eq("room", room.room);
}