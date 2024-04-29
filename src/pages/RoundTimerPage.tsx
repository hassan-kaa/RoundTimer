import { RoundTimerType } from "../App";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PrebuitTimers from "../components/PrebuiltTimers";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(14, { message: "name must be at most 14 characters." }),
  nbRounds: z.coerce
    .number()
    .min(1, { message: "you must have at least 1 round." }),
  restDuration: z.coerce
    .number()
    .min(0, { message: "rest duration must be positive." }),
  roundDuration: z.coerce
    .number()
    .min(1, { message: "round duration must be longer than 5 seconds." }),
});

const timerThemes = [
  {
    primaryColor: "bg-gradient-to-r from-cyan-200 to-blue-500",
    secondaryColor: "bg-red-500",
  },
  {
    primaryColor: "bg-gradient-to-r from-indigo-500 to-violet-500",
    secondaryColor: "bg-gradient-to-r from-amber-200 to-yellow-500",
  },
  {
    primaryColor: "bg-gradient-to-r from-blue-400 to-emerald-400",
    secondaryColor: "bg-gradient-to-r from-red-500 to-orange-500",
  },
  {
    primaryColor: "bg-gradient-to-r from-violet-600 to-purple-600",
    secondaryColor: "bg-gradient-to-r from-fuchsia-500 to-pink-500",
  },
  {
    primaryColor: "bg-gradient-to-r from-teal-400 to-lime-400",
    secondaryColor: "bg-gradient-to-r from-blue-800 to-indigo-900",
  },
];

const RoundTimerPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nbRounds: 1,
      roundDuration: 60,
      restDuration: 10,
    },
  });
  const [selectedTheme, setSelectedTheme] = useState(0);
  function handleSelectTheme(index: number) {
    setSelectedTheme(index);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTimer: RoundTimerType = createCustomTimer(values);
    navigate(`/roundTimer/${newTimer.name}`, {
      state: { roundTimer: newTimer, ...timerThemes[selectedTheme] },
    });
  }
  const [selectedTimer, setSelectedTimer] = useState<RoundTimerType | null>(
    null
  );

  const createCustomTimer = (data: {
    nbRounds: number;
    roundDuration: number;
    restDuration: number;
    name?: string;
  }): RoundTimerType => {
    const rounds = Array(data.nbRounds).fill(data.roundDuration);
    const roundTimer = {
      name: data.name ?? "Custom Timer",
      rounds: rounds,
      restDuration: data.restDuration,
      description: `${data.nbRounds} rounds of ${data.roundDuration}s work, ${data.restDuration}s rest`,
    };
    return roundTimer;
  };
  useEffect(() => {
    if (selectedTimer) {
      form.setValue("name", selectedTimer.name);
      form.setValue("nbRounds", selectedTimer.rounds.length);
      form.setValue("roundDuration", selectedTimer.rounds[0]);
      form.setValue("restDuration", selectedTimer.restDuration);
    }
  }, [selectedTimer]);
  return (
    <>
      <Navbar />
      <div className="p-8 w-full m-auto flex flex-col items-center justify-center gap-8">
        <PrebuitTimers selectTimer={setSelectedTimer} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[700px] w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Tabata" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nbRounds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many rounds ?</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roundDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Round Duration</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="60" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="restDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rest Duration</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Timer Theme</FormLabel>
              <div className="flex gap-4 items-center">
                {timerThemes.map((theme, index) => (
                  <div
                    onClick={() => {
                      handleSelectTheme(index);
                    }}
                    key={index}
                    className={`${
                      selectedTheme == index ? "border-2 border-black" : ""
                    } w-12 h-12 cursor-pointer rounded-xl flex items-center justify-center ${
                      theme.primaryColor
                    } hover:scale-110 trasition ease-in-out duration-200 `}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg ${theme.secondaryColor}`}
                    >
                      {selectedTheme == index && "✔"}
                    </div>
                  </div>
                ))}
              </div>
            </FormItem>
            <Button className="w-full" type="submit">
              Start Timer
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
export default RoundTimerPage;
