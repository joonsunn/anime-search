export const SortOrder = {
  ASC: "asc" as const,
  DESC: "desc" as const,
} as const;

export type SortOrderType = (typeof SortOrder)[keyof typeof SortOrder];

export const OrderBy = {
  MAL_ID: "mal_id" as const,
  TITLE: "title" as const,
  START_DATE: "start_date" as const,
  END_DATE: "end_date" as const,
  EPISODES: "episodes" as const,
  SCORE: "score" as const,
  SCORED_BY: "scored_by" as const,
  POPULARITY: "popularity" as const,
  MEMBERS: "members" as const,
  FAVOURITES: "favorites" as const,
} as const;

export type OrderByType = (typeof OrderBy)[keyof typeof OrderBy];

export type AnimeSearchQuery = {
  q?: string;
  page?: number;
  limit?: number;
  order_by?: OrderByType;
  sort?: SortOrderType;
  sfw?: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
};

export type AnimeResponse<T> = {
  data: T;
};

type MALObject = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: {
    from: string | null;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  };
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  } | null;
  producers: MALObject[];
  licensors: MALObject[];
  studios: MALObject[];
  genres: MALObject[];
  explicit_genres: MALObject[];
  themes: MALObject[];
  demographics: MALObject[];
};
