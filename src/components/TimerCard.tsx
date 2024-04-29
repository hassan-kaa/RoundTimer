import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoundTimerType } from "../App";
import { FaCheckCircle } from "react-icons/fa";
const TimerCard = ({
  timer,
  selected,
}: {
  timer: RoundTimerType;
  selected: boolean;
}) => {
  return (
    <Card
      className={` ${
        selected ? " bg-lime-200 " : ""
      } cursor-pointer transition duration-200 ease-in-out h-full`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center w-full">
          {timer.name}
          {selected && <FaCheckCircle size={20} />}
        </CardTitle>
        <CardDescription>{timer.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
export default TimerCard;
