import { useState } from "react";

const ReactionTimerPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [reactionColor, setReactionColor] = useState("bg-red-500");
  const handleStart = () => {
    setTime(0);
    setIsRunning(true);
    setTimeout(() => {
      setTime(Date.now());
      setReactionColor("bg-green-500");
    }, Math.random() * 3000 + 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setReactionTimes((prev) => [...prev, Date.now() - time]);
    setReactionColor("bg-red-500");
  };

  return (
    <div>
      <h1>Reaction Timer</h1>
      <button
        className="bg-black p-4 text-white rounded-2xl"
        onClick={isRunning ? handleStop : handleStart}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <p className={`${reactionColor} p-8  `}>
        {time ? "Wait for green" : "Wait for red"}
      </p>
      <ul className="bg-slate-500 p-8">
        {reactionTimes.map((time, index) => (
          <li key={index}>{time}ms</li>
        ))}
      </ul>
    </div>
  );
};
export default ReactionTimerPage;
