import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ReactionTimerPage from "./pages/ReactionTimerPage";
import RoundTimerPage from "./pages/RoundTimerPage";
import RoundTimer from "./components/RoundTimer";
export type RoundTimerType = {
  name: string;
  rounds: number[];
  restDuration: number;
  description?: string;
};
const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="reactionTimer" element={<ReactionTimerPage />} />,
    <Route path="roundTimer" element={<RoundTimerPage />} />,
    <Route path="roundTimer/:id" element={<RoundTimer />} />,
    <Route path="*" element={<ErrorPage />} />,
  ])
);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
