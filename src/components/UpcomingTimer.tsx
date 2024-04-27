import { formatTime } from "../utils/timers";

const UpcomingTimer = ({
  time,
  color,
  roundNumber,
}: {
  time: number;
  color: string;
  roundNumber: number;
}) => {
  return (
    <div
      className={`w-full flex flex-col gap-2 items-center justify-center rounded-lg p-8 transition-all duration-300 ease-in-out ${color}`}
    >
      <h1 className="text-xl ">
        {roundNumber == -1
          ? "Rest"
          : roundNumber == -2
          ? "Finish"
          : `Round ${roundNumber}`}
      </h1>
      <h1 className="text-3xl font-bold">
        {roundNumber == -2 ? "" : formatTime(time)}
      </h1>
    </div>
  );
};
export default UpcomingTimer;
