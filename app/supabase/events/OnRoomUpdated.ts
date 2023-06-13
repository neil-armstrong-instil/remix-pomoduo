import type {Room} from "~/supabase/types/Room";
import {supabaseClient} from "~/supabase/SupabaseClient";

type Callback = (room: Room | undefined) => void;
type Unsubscribe = () => void;

export function onRoomUpdated(roomId: string, onUpdate: Callback): Unsubscribe {
  supabaseClient()
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        filter: `room.eq=${roomId}`
      },
      result => {
        onUpdate(result?.new as Room | undefined);
      }
    )
    .subscribe();

  return () => {
    supabaseClient()
      .channel("schema-db-changes")
      .unsubscribe();
  }
}
