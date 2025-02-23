import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
      <div className="flex w-full justify-center items-center flex-col min-h-screen">
        <h1 className="font-bold text-8xl mb-6.5">404</h1>
      <h2 className="font-bold text-4xl mb-4">Page not founded</h2>
      <p className="italic text-1xl mb-4">You are on a page that not exist</p>

      <Link className="bg-gray-50/20 py-1 px-4 rounded-2xl" to="/">
        Back to home page
      </Link>
    </div>
  );
}
