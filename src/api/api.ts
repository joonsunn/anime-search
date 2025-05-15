import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type AnimeSearchQuery, type PaginatedResponse, type Anime, SortOrder, OrderBy } from "./types";

const fetchAnimeList = async (query?: AnimeSearchQuery): Promise<PaginatedResponse<Anime>> => {
  const response = await axios.get("https://api.jikan.moe/v4/anime", {
    params: {
      ...query,
      sort: SortOrder.ASC,
      order_by: OrderBy.TITLE,
    } as AnimeSearchQuery,
  });
  return response.data;
};

export const useGetAnimeList = (query?: AnimeSearchQuery) => {
  return useQuery({
    queryKey: ["anime", "list", query],
    queryFn: () => fetchAnimeList(query),
  });
};
