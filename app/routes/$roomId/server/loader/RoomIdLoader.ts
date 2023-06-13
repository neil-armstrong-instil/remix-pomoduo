import type {LoaderFunction} from "@remix-run/node";
import invariant from "tiny-invariant";

export const roomIdLoader: LoaderFunction = async ({params, request}) => {
  invariant(params.roomId, "room id not found");

  return params.roomId;
};