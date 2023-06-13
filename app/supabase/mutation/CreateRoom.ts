import {supabaseClient} from "~/supabase/SupabaseClient";
import {databaseName} from "~/supabase/constants/DatabaseName";
import type {Room} from "~/supabase/types/Room";

const twentyFiveMinutes = 25 * 60 * 1000;

export async function createRoom(roomId: string): Promise<Room> {
  const now = new Date();
  
  const room: Room = {
    room: roomId,
    created_at: now,
    updated_at: now,
    timer_end_time: new Date(new Date().getTime() + twentyFiveMinutes),
    paused: false
  }

  await supabaseClient()
    .from(databaseName)
    .insert(room);

  return room;
}