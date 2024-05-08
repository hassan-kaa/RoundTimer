import { useEffect, useState, Fragment } from "react";
import signalSound from "../assets/signal.mp3";
import MainTimer from "./MainTimer";
import UpcomingTimer from "./UpcomingTimer";
import ToolBox from "./ToolBox";
import { formatTime } from "../utils/timers";
import { Navigate, useLocation } from "react-router-dom";
function RoundTimer() {
  const location = useLocation();
  if (location.state == null) return <Navigate to="/roundTimer" />;
  const { roundTimer, primaryColor, secondaryColor } = location.state;
  const roundColor = primaryColor
    ? `${primaryColor}`
    : "bg-gradient-to-r from-blue-500 to-indigo-500";
  const restColor = secondaryColor
    ? `${secondaryColor}`
    : "bg-gradient-to-r from-red-500 to-pink-500";

  const allRounds: { time: number; color: string; roundNumber?: number }[] = [];
  roundTimer.rounds.map((round: number, index: number) => {
    if (index == roundTimer.rounds.length - 1) {
      allRounds.push({
        time: round,
        color: roundColor,
        roundNumber: index + 1,
      });
    } else {
      allRounds.push({
        time: round,
        color: roundColor,
        roundNumber: index + 1,
      });
      if (roundTimer.restDuration)
        allRounds.push({ time: roundTimer.restDuration, color: restColor });
    }
  });
  const totalTime: number = allRounds.reduce((acc, curr) => acc + curr.time, 0);
  const [globalTime, setGlobalTime] = useState(0);
  const totalSets = allRounds.length;
  const [currentSet, setCurrentSet] = useState(0);
  const [time, setTime] = useState(roundTimer.rounds[0]);
  const [currentColor, setCurrentColor] = useState(roundColor);
  const [rounds, setRounds] =
    useState<{ time: number; color: string; roundNumber?: number }[]>(
      allRounds
    );
  const [intervalId, setIntervalId] = useState(-1);
  const signal = new Audio(signalSound);
  const start = () => {
    const interval = window.setInterval(() => {
      setTime((prev: number) => prev - 1);
    }, 1000);
    setIntervalId(interval);
  };
  const pause = () => {
    clearInterval(intervalId);
  };
  const restart = () => {
    setTime(roundTimer.rounds[0]);
    setRounds(allRounds);
    setCurrentColor(roundColor);
    clearInterval(intervalId);
  };

  const next = () => {
    if (rounds.length) setCurrentColor(rounds[0].color);

    if (rounds.length) {
      setTime(rounds[0].time);
      start();
    }
  };

  useEffect(() => {
    if (time == 0) {
      clearInterval(intervalId);
      setRounds((prev) => prev.slice(1));
    }
    if (time == 1 && signal) signal.play();
    if (rounds.length == allRounds.length && time == allRounds[0].time)
      setGlobalTime(0);
    else if (time != 0) setGlobalTime((prev) => prev + 1);
    if (globalTime == totalTime - 1) {
      setGlobalTime(totalTime);
    }
  }, [time]);

  useEffect(() => {
    if (time == 0) {
      next();
    }
    if (rounds.length == allRounds.length) setCurrentSet(0);
    else setCurrentSet((prev) => prev + 1);
  }, [rounds]);

  return (
    <div
      className={`${currentColor} text-white h-[100vh]  flex-col flex items-center transition-all duration-300 ease-in-out`}
    >
      <div className="flex  w-full  flex-col gap-8 items-center justify-start py-8 h-full">
        {rounds.length > 0 ? (
          <MainTimer
            time={time}
            color={rounds[0].color}
            roundNumber={rounds[0].roundNumber ? rounds[0].roundNumber : -1}
          />
        ) : (
          <h1 className="text-[5em] md:text-[8em] text-center font-bold ">
            Timer <br /> Finished{" "}
          </h1>
        )}

        <div className="text-2xl font-bold max-w-[700px] grid w-full px-4 grid-cols-3 justify-items-center items-center gap-y-2 ">
          <p className="text-lg font-thin">Timer</p>
          <p className="text-lg font-thin">Interval</p>
          <p className="text-lg font-thin">Total Duration</p>
          <h1>{roundTimer.name}</h1>
          <h1>
            {currentSet}/{totalSets}
          </h1>

          {totalTime > 60 ? (
            <h2 className=" text-[1rem] md:text-2xl">
              {formatTime(globalTime)}/{formatTime(totalTime)}
            </h2>
          ) : (
            <h1>
              {globalTime}/{totalTime}
            </h1>
          )}
        </div>

        <ToolBox
          start={start}
          restart={restart}
          stop={pause}
          end={rounds.length == 0}
        />

        <div className="px-4 py-8 md:px-8 w-full md:w-4/5 justify-start items-center flex gap-8 flex-col overflow-y-scroll h-full ">
          {rounds.length > 0 &&
            rounds.map((round, index) => {
              if (index == 0 && rounds.length == 1) {
                return (
                  <UpcomingTimer
                    key={index}
                    time={0}
                    color={restColor}
                    roundNumber={-2}
                  />
                );
              } else if (index == 0) {
                return "";
              } else if (index == rounds.length - 1 && rounds.length > 1) {
                return (
                  <Fragment key={index}>
                    <UpcomingTimer
                      time={round.time}
                      color={round.color}
                      roundNumber={round.roundNumber ? round.roundNumber : -1}
                    />
                    <UpcomingTimer
                      time={0}
                      color={restColor}
                      roundNumber={-2}
                    />
                  </Fragment>
                );
              } else {
                return (
                  <UpcomingTimer
                    key={index}
                    time={round.time}
                    color={round.color}
                    roundNumber={round.roundNumber ? round.roundNumber : -1}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default RoundTimer;
