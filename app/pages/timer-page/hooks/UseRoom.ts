import type {Room} from "~/supabase/types/Room";
import {useEffect, useState} from "react";
import {onRoomUpdated} from "~/supabase/events/OnRoomUpdated";
import {getExistingRoom} from "~/supabase/query/GetExistingRoom";
import {createRoom} from "~/supabase/mutation/CreateRoom";

export function useRoom(roomId: string): Room | undefined {
  const [roomDetails, setRoomDetails] = useState<Room | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const existingRoom = await getExistingRoom(roomId);
      if (existingRoom) {
        setRoomDetails(existingRoom);
        return;
      }

      const newRoom = await createRoom(roomId);
      setRoomDetails(newRoom);
    })();

    return onRoomUpdated(roomId, (room) => {
      setRoomDetails(room);
    });
  }, [roomId]);

  return roomDetails;
}
