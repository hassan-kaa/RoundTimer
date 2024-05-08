import Navbar from "../components/Navbar";
import { LineChart, Line } from "recharts";
import { getTimers } from "../utils/api";
import { useEffect, useState } from "react";
import { RoundTimerType } from "../App";
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
  { name: "Page C", uv: 200, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 278, pv: 2400, amt: 2400 },
  { name: "Page E", uv: 189, pv: 2400, amt: 2400 },
  { name: "Page F", uv: 239, pv: 2400, amt: 2400 },
  { name: "Page G", uv: 349, pv: 2400, amt: 2400 },
];

const Profile = () => {
  const [timers, setTimers] = useState<RoundTimerType[]>([]);
  const fetchTimers = async () => {
    const timers = await getTimers();
    setTimers(timers);
  };
  useEffect(() => {
    fetchTimers();
  }, []);
  return (
    <div>
      <Navbar />
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
      {timers &&
        timers.map((timer, index) => (
          <div key={index}>
            <h1>{timer.name}</h1>
            <p>{timer.description}</p>
          </div>
        ))}
    </div>
  );
};
export default Profile;
