import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string(),
});
const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const googleAuthProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      navigate(`/profile/${result.user?.uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setError("");
      navigate(`/profile/${result.user?.uid}`);
    } catch (error) {
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
          <CardTitle>Login to your Account</CardTitle>

          <Button
            variant="outline"
            className="flex justify-center items-center gap-4 hover:bg-lime-200"
            onClick={GoogleLogin}
          >
            <FaGoogle />
            <CardDescription>Sign In using Google</CardDescription>
          </Button>
          <CardDescription>Or login with Email and Password</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                to={"/forgotPassword"}
                className="underline text-xs text-blue-500"
              >
                Forgot Password ?
              </Link>
              {error && (
                <h1 className="text-red-500 font-bold text-sm text-center">
                  {error}
                </h1>
              )}
            </CardContent>
            <CardFooter className="grid gap-4 ">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <h1 className="text-center text-sm font-thin w-full">
                Don't have an account ?{" "}
                <Link to="/signup" className="font-bold text-slate-500">
                  Sign Up
                </Link>
              </h1>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
