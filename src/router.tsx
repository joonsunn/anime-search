import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import BaseLayout from "./layouts/BaseLayout";
import AnimeItem from "./pages/AnimeItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        // path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: ":id",
        element: <AnimeItem />,
      },
    ],
  },
]);

export { router };
