import { useState } from "react";
import { auth } from "../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
const ForgotPassword = () => {
  const { user } = useAuthContext();
  if (user) return <Navigate to="/" />;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const sendResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Check your email to reset your password");
    } catch (error) {
      console.log(error);
      const errorMessage = (error as Error).message.split("/")[1].slice(0, -2);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  w-full video-bg">
      <div className="absolute bg-gradient-to-r from-slate-500 to-slate-700 mix-blend-overlay  w-full h-full z-0 "></div>
      <Card className="w-[350px] md:w-1/2 max-w-[600px] z-10 ">
        <CardHeader className="gap-4">
          <Link to="/" className="flex w-full gap-4 justify-center">
            <div className="flex gap-1">
              <div className="rounded-full w-6 h-6 bg-slate-400"></div>
              <div className="rounded-lg w-6 h-6 bg-black"></div>
            </div>
            <h1 className="text-xl font-bold">RoundMaster</h1>
          </Link>
          <CardTitle>Reset password</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <h1 className="text-red-500 font-bold text-sm text-center">
              {error}
            </h1>
          )}
          {success && (
            <h1 className="text-green-500 font-bold text-sm text-center">
              {success}
            </h1>
          )}
        </CardContent>
        <CardFooter className="grid gap-4 ">
          <Button
            type="submit"
            disabled={success !== ""}
            onClick={sendResetEmail}
            className="w-full"
          >
            Send Email to reset Password
          </Button>
          <h1 className="text-center text-sm font-thin w-full">
            Don't have an account ?{" "}
            <Link to="/signup" className="font-bold text-slate-500">
              Sign Up
            </Link>
          </h1>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ForgotPassword;
