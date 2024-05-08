import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ReactionTimerPage from "./pages/ReactionTimerPage";
import RoundTimerPage from "./pages/RoundTimerPage";
import RoundTimer from "./components/RoundTimer";
import ReactionTimer from "./components/ReactionTimer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./pages/ProtectedRoute";
export type RoundTimerType = {
  name: string;
  rounds: number[];
  restDuration: number;
  description?: string;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },

  {
    path: "reactionTimer",
    element: <ReactionTimerPage />,
  },
  { path: "reactionTimer/:name", element: <ReactionTimer /> },
  {
    path: "roundTimer",
    element: <RoundTimerPage />,
  },
  { path: "roundTimer/:name", element: <RoundTimer /> },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "profile/:id",
    element: <ProtectedRoute element={<Profile />} />,
  },
  {
    path: "forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "resetPassword",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
