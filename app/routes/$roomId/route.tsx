import {TimerPage} from "~/pages/timer-page/TimerPage";
import {roomIdLoader} from "~/routes/$roomId/server/loader/RoomIdLoader";
import {useLoaderData} from "@remix-run/react";

export const loader = roomIdLoader;

export default function WithRoomId() {
  const roomId = useLoaderData<typeof roomIdLoader>();

  return (
    <TimerPage roomId={roomId}/>
  )
}
