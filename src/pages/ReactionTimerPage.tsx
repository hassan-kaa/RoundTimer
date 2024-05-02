import { useState } from "react";
import Navbar from "../components/Navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { timerThemes } from "./RoundTimerPage";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters." })
    .max(14, { message: "name must be at most 14 characters." }),
  intensity: z.enum(["easy", "medium", "high"]),
  duration: z.coerce
    .number()
    .min(1, { message: "Timer duration must be longer than 10 seconds." }),
});

const ReactionTimerPage = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      intensity: "easy",
      duration: 60,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    navigate(`/reactionTimer/${values.name}`, {
      state: { timer: values, ...timerThemes[selectedTheme] },
    });
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center flex-col gap-8 p-8  ">
        <Accordion type="single" collapsible className="w-full max-w-[700px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Reaction Timer?</AccordionTrigger>
            <AccordionContent>
              Reaction Timer is a simple timer that helps you improve your
              reaction time. It is a great tool for athletes, gamers, and anyone
              looking to improve their reflexes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How it works?</AccordionTrigger>
            <AccordionContent>
              The timer will start counting down from the specified duration.
              And randomly according to the intensity, a frequent sound will
              play, and the background color will change. Your goal is to react
              as quickly as possible when you hear the sound.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Form {...form}>
          <form
            className="w-full max-w-[700px] gap-8 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Name your timer"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="intensity">Intensity</FormLabel>
              <FormField
                control={form.control}
                name="intensity"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Easy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormMessage>
                {form.formState.errors.intensity?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="duration">Timer Duration</FormLabel>
              <FormControl>
                <Input
                  id="duration"
                  {...form.register("duration")}
                  type="number"
                  placeholder="Timer duration in seconds"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.duration?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Timer Theme</FormLabel>
              <div className="flex gap-4 items-center">
                {timerThemes.map((theme, index) => (
                  <div
                    onClick={() => {
                      setSelectedTheme(index);
                    }}
                    key={index}
                    className={`${
                      selectedTheme == index ? "border-2 border-black" : ""
                    } w-12 h-12 cursor-pointer rounded-xl flex items-center justify-center ${
                      theme.primaryColor
                    } hover:scale-110 trasition ease-in-out duration-200 `}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${theme.secondaryColor}`}
                    >
                      {selectedTheme == index && <FaCheckCircle size={16} />}
                    </div>
                  </div>
                ))}
              </div>
            </FormItem>
            <Button type="submit">Create Timer</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ReactionTimerPage;
