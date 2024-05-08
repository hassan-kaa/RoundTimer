import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { addUser } from "../utils/api";
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[A-Za-z0-9!@#$%^&*()-_+=]{8,}$/;
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be longuer than 8 and contain at least 1 uppercase letter, 1 number and 1 special character",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
const SignupPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        addUser(userCredential.user);
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message.split("/")[1].slice(0, -2));
      });
  };

  const googleAuthProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setError("");
      console.log(result);
    } catch (error) {
      const errorMessage = (error as Error).message.split("/")[1].slice(0, -2);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full video-bg">
      <div className="absolute bg-gradient-to-r from-slate-500 to-slate-700 mix-blend-overlay  w-full h-full z-0 "></div>
      <Card className="w-[350px] md:w-1/2 max-w-[600px] z-10">
        <CardHeader className="gap-4">
          <Link to="/" className="flex w-full gap-4 justify-center">
            <div className="flex gap-1">
              <div className="rounded-full w-6 h-6 bg-slate-400"></div>
              <div className="rounded-lg w-6 h-6 bg-black"></div>
            </div>
            <h1 className="text-xl font-bold">RoundMaster</h1>
          </Link>
          <CardTitle>Create an Account</CardTitle>

          <Button
            variant="outline"
            className="flex flex-row-reverse gap-4 items-center justify-center hover:bg-lime-200"
            onClick={GoogleLogin}
          >
            <CardDescription>Register with Google</CardDescription>
            <FaGoogle />
          </Button>
          <CardDescription>Or regsiter with Email and Password</CardDescription>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Retype Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-red-500 text-sm font-bold text-center">
                  {error}
                </p>
              )}
            </CardContent>
            <CardFooter className="grid gap-4">
              <Button type="submit" className="w-full">
                Register
              </Button>

              <h1 className="text-center text-sm font-thin w-full">
                Already have an account ?{" "}
                <Link to="/login" className="font-bold text-slate-500">
                  Log in
                </Link>
              </h1>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;
