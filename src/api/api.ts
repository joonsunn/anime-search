import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  type AnimeSearchQuery,
  type PaginatedResponse,
  type Anime,
  SortOrder,
  OrderBy,
  type AnimeResponse,
} from "./types";

const fetchAnimeList = async (query?: AnimeSearchQuery): Promise<PaginatedResponse<Anime>> => {
  const response = await axios.get("https://api.jikan.moe/v4/anime", {
    params: {
      ...query,
      sort: SortOrder.ASC,
      order_by: OrderBy.TITLE,
      sfw: true,
    } as AnimeSearchQuery,
  });
  return response.data;
};

export const useGetAnimeList = (query?: AnimeSearchQuery) => {
  return useQuery({
    queryKey: ["anime", "list", query],
    queryFn: () => fetchAnimeList(query),
    placeholderData: keepPreviousData,
  });
};

const fetchAnimeById = async (id: string): Promise<AnimeResponse<Anime>> => {
  const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
  return response.data;
};

const useGetAnimeByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["anime", "id", id],
    queryFn: () => fetchAnimeById(id),
    placeholderData: keepPreviousData,
    enabled: !!id,
    retry: 1,
  });
};

export const useGetAnimeById = (id: string) => {
  const { data, isLoading, isPending, refetch, isError, error } = useGetAnimeByIdQuery(id);

  return { data: data?.data, isLoading, isPending, refetch, isError, error };
};
