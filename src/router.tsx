import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/login";
import { Dashboard } from "./layouts/Dashboard";
import { NonAuth } from "./layouts/NonAuth";
import { Catagories } from "./pages/catagories/Catagories";
import { Root } from "./layouts/Root";

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
            path: "/categories",
            element: <Catagories />,
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
