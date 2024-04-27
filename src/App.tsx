import RoundTimer from "./components/RoundTimer";
export type RoundTimerType = {
  name: string;
  rounds: number[];
  restDuration: number;
  description?: string;
};
function App() {
  const tabata = {
    name: "EMOM",
    rounds: [8, 8, 8, 8, 8, 8, 8],
    restDuration: 4,
    description: "4 rounds of 5s work, 5s rest",
  };
  return (
    <div>
      <RoundTimer
        roundTimer={tabata}
        primaryColor="bg-gradient-to-r from-blue-400 to-blue-700"
        secondaryColor="bg-gradient-to-r from-rose-500 to-red-500"
      />
    </div>
  );
}

export default App;
