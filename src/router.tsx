import { createBrowserRouter } from "react-router";
import Search from "./pages/Search/Search";
import BaseLayout from "./layouts/BaseLayout";
import AnimeItem from "./pages/AnimeItem/AnimeItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Search />,
      },
      {
        path: ":id",
        element: <AnimeItem />,
      },
    ],
  },
]);

export { router };
