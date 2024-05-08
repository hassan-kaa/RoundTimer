import { useEffect, useState } from "react";
import TimerCard from "./TimerCard";
import { RoundTimerType } from "../App";
import { getTimers } from "../utils/api";

const PrebuitTimers = ({
  selectTimer,
}: {
  selectTimer: (timer: RoundTimerType) => void;
}) => {
  const [timers, setTimers] = useState<RoundTimerType[]>([]);
  const fetchTimers = async () => {
    const timers = await getTimers();
    setTimers(timers);
  };
  const [selectedTimer, setSelectedTimer] = useState(-1);
  const handleSelectTimer = (timerIndex: number) => {
    setSelectedTimer(timerIndex);
    selectTimer(timers[timerIndex]);
  };
  useEffect(() => {
    fetchTimers();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {timers.map((timer, index) => (
        <div
          key={index}
          onClick={() => {
            handleSelectTimer(index);
          }}
        >
          <TimerCard timer={timer} selected={selectedTimer == index} />
        </div>
      ))}
    </div>
  );
};
export default PrebuitTimers;
