import { BiMenu } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "../utils/firebase";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex md:hidden justify-between items-center p-4 ">
        <Link to="/" className="flex w-1/4 gap-4 items-center">
          <div className="flex gap-1">
            <div className="rounded-full w-6 h-6 bg-slate-400"></div>
            <div className="rounded-lg w-6 h-6 bg-black"></div>
          </div>
          <h1 className="text-xl font-bold">RoundMaster</h1>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <BiMenu size={32} />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56 mr-4 flex flex-col gap-2  p-4">
            {user && (
              <>
                <DropdownMenuItem>
                  <Link
                    to={`/profile/${user.uid}`}
                    className="flex items-center w-full justify-between gap-2"
                  >
                    Profile
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile photo"
                        className="rounded-full w-8 h-8"
                      />
                    ) : (
                      <FaUser size={24} />
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem>
              <Link to="/roundTimer">Round Timer</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/reactionTimer">Reaction Timer</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/">Premium Features</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user && (
              <DropdownMenuItem>
                <Button onClick={handleLogout}>Logout</Button>
              </DropdownMenuItem>
            )}
            {!user && (
              <DropdownMenuItem className="w-full flex gap-2">
                <Link
                  to="/signup"
                  className=" bg-white px-4 py-2 rounded-xl border-2 border-black  text-black hover:bg-lime-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="  px-4 py-2 rounded-xl border-2 text-white bg-black hover:bg-slate-700"
                >
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
            className="  text-black hover:text-slate-800"
          >
            Reaction Timer
          </Link>
          <Link
            to="/reactionTimer"
            className="  text-black hover:text-slate-800"
          >
            Features
          </Link>

          <div className="flex gap-2">
            {!user ? (
              <>
                <Link
                  to="/signup"
                  className=" bg-white px-4 py-2 rounded-xl border-2 border-black  text-black hover:bg-lime-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="  px-4 py-2 rounded-xl border-2 text-white bg-black hover:bg-slate-700"
                >
                  Login
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile photo"
                      className="rounded-full w-8 h-8"
                    />
                  ) : (
                    <FaUser size={32} />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56 mr-4 flex flex-col gap-2  p-4">
                  <Link to={`/profile/${user.uid}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Button onClick={handleLogout}>Logout</Button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
