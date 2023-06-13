import {supabaseClient} from "~/supabase/SupabaseClient";
import {databaseName} from "~/supabase/constants/DatabaseName";
import type {Room} from "~/supabase/types/Room";
import {getExistingRoom} from "~/supabase/query/GetExistingRoom";

type Update = Pick<Room, "updated_at" | "paused" | "timer_end_time">

export async function updateRoomPausedState(roomId: string, newPauseState: boolean): Promise<void> {
  const now = new Date();
  const newEndTime = await calculateNewEndTime(roomId, now);
  if (!newEndTime) return;

  await supabaseClient()
    .from(databaseName)
    .update({
      updated_at: now,
      timer_end_time: newEndTime,
      paused: newPauseState
    } as Update)
    .eq("room", roomId);
}

async function calculateNewEndTime(roomId: string, now: Date): Promise<Date | undefined> {
  const room = await getExistingRoom(roomId);
  if (!room) return undefined;
  if (!room.paused) return new Date(room.timer_end_time);

  const timeRemaining = new Date(room.timer_end_time).getTime() - new Date(room.updated_at).getTime();
  return new Date(now.getTime() + timeRemaining);
}