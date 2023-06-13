import type {Room} from "~/supabase/types/Room";
import {supabaseClient} from "~/supabase/SupabaseClient";
import {databaseName} from "~/supabase/constants/DatabaseName";

export function getExistingRoom(roomId: string): Promise<Room | undefined> {
  return new Promise((resolve, reject) => {
    try {
      supabaseClient()
        .from(databaseName)
        .select()
        .eq("room", roomId)
        .then((result) => {
          resolve(result.data?.[0] as Room | undefined);
        });
    } catch (error) {
      reject(error);
    }
  });
}