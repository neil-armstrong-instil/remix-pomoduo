import {supabaseClient} from "~/supabase/SupabaseClient";
import {databaseName} from "~/supabase/constants/DatabaseName";
import type {Room} from "~/supabase/types/Room";

type Update = Pick<Room, "updated_at" | "timer_end_time">

export async function updateRoomEndTime(roomId: string, newEndTime: Date): Promise<void> {
  await supabaseClient()
    .from(databaseName)
    .update({
      updated_at: new Date(),
      timer_end_time: newEndTime
    } as Update)
    .eq("room", roomId);
}