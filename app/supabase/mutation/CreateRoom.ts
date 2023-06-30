import {supabaseClient} from "~/supabase/SupabaseClient";
import {databaseName} from "~/supabase/constants/DatabaseName";
import type {Room} from "~/supabase/types/Room";

const twentyFiveMinutes = 25 * 60 * 1000;

type Create = Pick<Room, "room" | "timer_end_time">

export async function createRoom(roomId: string): Promise<Room> {
  const now = new Date();
  
  const room: Create = {
    room: roomId,
    timer_end_time: new Date(now.getTime() + twentyFiveMinutes)
  }

  const update = await supabaseClient()
    .from(databaseName)
    .insert(room)
    .single<Room>()

  return update.data!;
}