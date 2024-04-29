//import clock from "../assets/clock.jpg";
import { Link } from "react-router-dom";
import crossfit1 from "../assets/crossfit1.jpg";
import crossfit2 from "../assets/crossfit2.jpg";
import boxing from "../assets/boxing.jpg";
import CardStack from "../components/CardStack";
import Navbar from "../components/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col gap-4 p-4 items-center justify-between selection:text-red-500">
        <h1 className=" text-black  font-bold text-center text-[2.8rem] leading-[3rem] md:text-[6rem] md:leading-[6rem] xl:text-[8rem] xl:leading-[9rem]">
          Timers{" "}
          <span className="bg-gradient-to-l from-lime-300 to-black text-transparent bg-clip-text selection:text-red-500">
            perfection
          </span>{" "}
          <br /> for your trainings.
        </h1>
        <p className="text-center text-lg">
          Whether you choose efficiency or intensity, we have the perfect timer
          for you. <br /> with a variety of options to choose from, you can
          customize your training experience.
        </p>
        <div className="flex w-full md:w-3/5  gap-4 md:gap-8 justify-center items-center ">
          <Link
            to="/roundTimer"
            className="bg-slate-200 w-1/2 max-w-[250px] text-center text-sm md:text-lg text-black p-4 rounded-lg hover:bg-slate-300 "
          >
            Round Timer
          </Link>
          <Link
            to="/reactionTimer"
            className="bg-black w-1/2 max-w-[250px] text-center text-sm md:text-lg text-white p-4 rounded-lg hover:bg-slate-800 "
          >
            Reaction Timer
          </Link>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5  md:px-16 p-8 gap-4 md:gap-x-8 ">
        <div className="h-[35vh]">
          <img
            src={boxing}
            alt="clock"
            className=" object-cover h-full w-full rounded-[32px]"
          />
        </div>
        <CardStack />
        <div className="h-[35vh]">
          <img
            src={crossfit1}
            alt="clock"
            className=" object-cover h-full w-full rounded-[32px]"
          />
        </div>

        <div className="w-full grid grid-cols-2 min-h-52 ">
          <div className="flex flex-col items-center justify-center text-center col-span-2 bg-black text-white rounded-[32px] w-full h-full">
            <h1 className="font-bold text-3xl">720</h1>
            <p>Users</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center text-black  bg-gray-200 rounded-[32px]  ">
            <h1 className=" font-bold text-3xl">+20</h1>
            <p>Timers</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center  text-black  bg-lime-200 rounded-[32px]  ">
            <h1 className="font-bold text-3xl">5</h1>
            <p>Rating</p>
          </div>
        </div>
        <div className="h-[35vh]">
          <img
            src={crossfit2}
            alt="clock"
            className=" object-cover h-full w-full rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
