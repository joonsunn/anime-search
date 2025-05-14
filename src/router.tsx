import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import BaseLayout from "./layouts/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export { router };
