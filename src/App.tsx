import { createBrowserRouter } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Socials from "./Pages/Socials";
import Admin from "./Pages/admin";
import { PrivateRoute } from "./routes/Private";
import { ErrorPage } from "./Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/social",
    element: (
      <PrivateRoute>
        <Socials />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export { router };
