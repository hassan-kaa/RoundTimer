import { Link } from "react-router-dom";

export default function ErrorPage() {
  //const error = useRouteError();
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center text-center">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* <p>{error && error.error.message}</p> */}
      <Link
        to="/"
        className="p-4 bg-black text-white hover:bg-slate-800 rounded-lg font-bold"
      >
        Go back
      </Link>
    </div>
  );
}
