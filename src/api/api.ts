import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type AnimeSearchQuery = {
  q?: string;
  page?: number;
  limit?: number;
};

const fetchAnimeList = async (query?: AnimeSearchQuery) => {
  const response = await axios.get("https://api.jikan.moe/v4/anime", { params: query });
  return response.data;
};

export const useGetAnimeList = (query?: AnimeSearchQuery) => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchAnimeList(query),
  });
};
