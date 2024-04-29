import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex md:hidden justify-between items-center p-4 ">
        <div className="flex w-1/4 gap-4 items-center">
          <div className="flex gap-1">
            <div className="rounded-full w-6 h-6 bg-slate-400"></div>
            <div className="rounded-lg w-6 h-6 bg-black"></div>
          </div>
          <h1 className="text-xl font-bold">RoundMaster</h1>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-xl">
          <BiMenu size={32} />
        </button>
      </div>
      <div className="hidden md:flex bg-white px-8 py-8 items-center justify-between">
        <Link to="/" className="flex w-1/3 gap-4 items-center">
          <div className="flex gap-1">
            <div className="rounded-full w-6 h-6 bg-slate-400"></div>
            <div className="rounded-lg w-6 h-6 bg-black"></div>
          </div>
          <h1 className="text-2xl font-bold">RoundMaster</h1>
        </Link>
        <div className="xl:w-1/2 w-2/3 text-sm lg:text-lg  flex justify-between items-center">
          <Link to="/roundTimer" className="  text-black hover:text-slate-800">
            Round Timer
          </Link>
          <Link
            to="/reactionTimer"
            className="  text-black hover:text-slate-800 active:text-blue-600"
          >
            Reaction Timer
          </Link>
          <Link to="/roundTimer" className="  text-black hover:text-slate-800">
            Premium Features
          </Link>
          <Link
            to="/roundTimer"
            className=" bg-white px-4 py-2 rounded-xl border-2 border-black  text-black hover:bg-lime-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
