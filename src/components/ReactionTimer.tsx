import { useLocation } from "react-router-dom";
import ToolBox from "./ToolBox";
import { useEffect, useState } from "react";
import { formatTime } from "../utils/timers";
import signalAudio from "../assets/signal.mp3";
import whistleSignal from "../assets/whistle.mp3";
const ReactionTimer = () => {
  const location = useLocation();
  const { timer, primaryColor, secondaryColor } = location.state;
  const [bgColor, setbgColor] = useState(primaryColor);
  const [intervalId, setIntervalId] = useState(-1);
  const [reactionInterval, setreactionInterval] = useState<NodeJS.Timeout>();
  const [time, setTime] = useState(timer.duration);
  const signal = new Audio(signalAudio);
  const whistle = new Audio(whistleSignal);
  const intensityLevel =
    timer.intensity == "easy" ? 15 : timer.intensity == "medium" ? 10 : 5;
  const randomSignal = () => {
    const randomTime = Math.floor(Math.random() * 5) + intensityLevel;
    console.log(intensityLevel, randomTime);
    let currentColor = bgColor;
    const interval = setInterval(() => {
      whistle.play();
      if (currentColor == primaryColor) {
        currentColor = secondaryColor;
        setbgColor(secondaryColor);
      } else {
        currentColor = primaryColor;
        setbgColor(primaryColor);
      }
    }, randomTime * 1000);
    setreactionInterval(interval);
  };
  const start = () => {
    const interval = window.setInterval(() => {
      setTime((prev: number) => prev - 1);
    }, 1000);
    randomSignal();
    setIntervalId(interval);
  };
  const stop = () => {
    clearInterval(intervalId);
    clearInterval(reactionInterval);
  };
  const restart = () => {
    setTime(timer.duration);
    clearInterval(intervalId);
    clearInterval(reactionInterval);
  };
  useEffect(() => {
    if (time == 0) {
      clearInterval(intervalId);
      clearInterval(reactionInterval);
    }
    if (time == 1) {
      signal.play();
    }
  }, [time]);

  return (
    <div
      className={`${bgColor} w-full h-screen flex items-center justify-center gap-10 font-bold text-white flex-col transition duration-300 ease-in-out`}
    >
      <h1 className="text-xl font-thin italic text-center w-2/3 mix-blend-exclusion">
        React as fast as you can when you hear the whistle !
      </h1>
      <h1 className="font-bold text-white text-[6rem] md:text-[8rem] text-center">
        {formatTime(time)}
      </h1>
      <ToolBox start={start} stop={stop} restart={restart} end={time == 0} />
    </div>
  );
};
export default ReactionTimer;
