import type {V2_MetaFunction} from "@remix-run/node";
import {TimerPage} from "~/pages/timer-page/TimerPage";

export const meta: V2_MetaFunction = () => [
  {title: "Pomoduo - Remix example"}
];

export default function Index() {
  return (
    <TimerPage/>
  )
}
