import type {FC} from "react";

interface Props {
  isPaused: boolean;
  onPause: () => void;
  onReset: () => void;
}

export const Buttons: FC<Props> = (
  {
    isPaused,
    onPause,
    onReset
  }
) => (
  <div className="flex justify-center items-center">
    <button
      className="flex justify-center items-center bg-white border-transparent rounded w-20 h-10 m-1"
      onClick={onPause}
    >
      {isPaused ? "Resume" : "Pause"}
    </button>

    <button
      className="flex justify-center items-center bg-white border-transparent rounded w-20 h-10 m-1"
      onClick={onReset}
    >
      Restart
    </button>
  </div>
)