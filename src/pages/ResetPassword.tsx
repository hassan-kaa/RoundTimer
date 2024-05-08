import { confirmPasswordReset } from "firebase/auth";
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

import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[A-Za-z0-9!@#$%^&*()-_+=]{8,}$/;
const formSchema = z
  .object({
    password: z.string().regex(passwordRegex, { message: "Invalid Password" }),
    passwordConfirm: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirm;
    },
    {
      message: "Passwords must match!",
      path: ["passwordConfirm"],
    }
  );
const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get("oobCode");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordConfirm: "",
      password: "",
    },
  });
  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      oobCode &&
        confirmPasswordReset(auth, oobCode, values.passwordConfirm).then(() => {
          navigate("/login");
        });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
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
              </CardContent>
              <CardFooter className="grid gap-4 ">
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </CardFooter>
            </form>
          </Form>
          {error && (
            <CardDescription className="text-red-500">{error}</CardDescription>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
