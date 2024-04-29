import { useState } from "react";
import TimerCard from "./TimerCard";
import { RoundTimerType } from "../App";

const timers = [
  {
    name: "Tabata",
    rounds: [20, 20, 20, 20, 20, 20, 20, 20],
    restDuration: 10,
    description: "8 rounds of 20s work, 10s rest",
  },
  {
    name: "EMOM",
    rounds: [60, 60, 60, 60, 60],
    restDuration: 0,
    description: "Every Minute On the Minute",
  },
  {
    name: "AMRAP",
    rounds: [600],
    restDuration: 0,
    description: "As Many Rounds As Possible in 10min",
  },
  {
    name: "HIIT",
    rounds: [60, 60, 60, 60, 60],
    restDuration: 30,
    description: "continuous 60s high intensity, 30s low intensity",
  },
];

const PrebuitTimers = ({
  selectTimer,
}: {
  selectTimer: (timer: RoundTimerType) => void;
}) => {
  const [selectedTimer, setSelectedTimer] = useState(-1);
  const handleSelectTimer = (timerIndex: number) => {
    setSelectedTimer(timerIndex);
    selectTimer(timers[timerIndex]);
  };
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
