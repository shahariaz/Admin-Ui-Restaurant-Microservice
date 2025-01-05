import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/login";
import { Dashboard } from "./layouts/Dashboard";
import { NonAuth } from "./layouts/NonAuth";

import { Root } from "./layouts/Root";
import { Users } from "./pages/users/Users";
import { Products } from "./pages/Products/Products";
import { Resturent } from "./pages/restaurant/Restaurant";
import { Promos } from "./pages/promos/Promos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/restaurant",
            element: <Resturent />,
          },
          {
            path: "/promos",
            element: <Promos />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
