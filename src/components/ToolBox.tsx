import {
  IoPlay,
  IoPause,
  IoClose,
  IoLockClosedOutline,
  IoLockOpenOutline,
} from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import { useState } from "react";

const ToolBox = ({
  start,
  restart,
  stop,
  end,
}: {
  restart: () => void;
  start: () => void;
  stop: () => void;
  end: boolean;
}) => {
  const [locked, setLocked] = useState(false);
  const [started, setStarted] = useState(false);
  const handlePlay = () => {
    if (started) {
      stop();
    } else {
      start();
    }
    setStarted((prev) => !prev);
  };
  const handleLock = () => {
    setLocked(!locked);
  };

  return (
    <div className="w-3/4 max-w-[700px] flex bg-slate-800 px-4 md:px-8  py-4 rounded-full items-center justify-between ">
      <button
        disabled={locked || end}
        onClick={handlePlay}
        className="rounded-full p-1  md:p-2 hover:bg-slate-50/30 disabled:opacity-50"
      >
        {!end && started ? (
          <IoPause className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
        ) : (
          <IoPlay className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
        )}
      </button>
      <button
        onClick={handleLock}
        className="rounded-full p-1 md:p-2 hover:bg-slate-50/30"
      >
        {locked ? (
          <IoLockClosedOutline className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
        ) : (
          <IoLockOpenOutline className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
        )}
      </button>
      <button
        onClick={() => {
          restart();
          setStarted(false);
        }}
        disabled={locked}
        className="rounded-full p-1 md:p-2 hover:bg-slate-50/30 disabled:opacity-50 "
      >
        <MdOutlineReplay className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
      </button>
      <button className="rounded-full p-1 md:p-2 hover:bg-slate-50/30">
        <IoClose className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
      </button>
    </div>
  );
};
export default ToolBox;
