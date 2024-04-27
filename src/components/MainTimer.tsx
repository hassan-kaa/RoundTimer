import { formatTime } from "../utils/timers";

const MainTimer = ({
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
      className={`w-4/5 flex flex-col items-center justify-center rounded-lg px-8 transition-all duration-300 ease-in-out ${color}`}
    >
      <h1 className="text-2xl font-bold">
        {roundNumber != -1 ? `Round ${roundNumber}` : "Rest"}
      </h1>
      <h1 className="text-[6em] md:text-[8em] font-bold">{formatTime(time)}</h1>
    </div>
  );
};
export default MainTimer;
