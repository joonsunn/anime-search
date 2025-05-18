import {
  Button,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGetAnimeList } from "../api/api";
import { useMemo, useState, type ChangeEvent } from "react";
import { useDebouncedInput } from "../lib/hooks/useDebouncedInput";
import SearchIcon from "@mui/icons-material/Search";
import type { Anime } from "../api/types";
import { useLocation, useNavigate } from "react-router";

const pageSizeOptions = [5, 10, 15, 20, 25].map((option) => ({
  label: option.toString(),
  value: option,
}));

function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedValue = useDebouncedInput<string>(searchText, 300);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const pageSelectorsRange = 3;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, isFetching } = useGetAnimeList({ page, limit: pageSize, q: debouncedValue || undefined });

  function handleGoNextPage() {
    if (data?.pagination.has_next_page) {
      setPage((prevValue) => prevValue + 1);
    }
  }

  function handleGoPrevPage() {
    if (data?.pagination && data?.pagination.current_page > 1) {
      setPage((prevValue) => prevValue - 1);
    }
  }

  function handleGoToFirstPage() {
    setPage(1);
  }
  function handleGoToLastPage() {
    if (data?.pagination) {
      setPage(data?.pagination.last_visible_page);
    }
  }

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
  };

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setSearchText(newValue);
    setPage(1);
  };

  const pageOptions = useMemo(() => {
    if (!data) return [];
    return Array.from(Array(data?.pagination.last_visible_page)).map((_, index) => ({
      value: index + 1,
      label: (index + 1).toString(),
    }));
  }, [data]);

  return (
    <Stack sx={{ flexGrow: 1, gap: 2 }}>
      <TextField
        value={searchText}
        onChange={handleChangeSearchText}
        placeholder="Search for an anime"
        autoComplete={"off"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack className="search-results" sx={{ marginBottom: 3, alignItems: "center" }}>
        <Grid container spacing={1} sx={{ justifyContent: isMobile ? "center" : "flex-start" }}>
          {isLoading || isFetching
            ? Array.from(Array(pageSize)).map((_, index) => <AnimeCardSkeleton key={index} />)
            : null}
          {data && !(isLoading || isFetching) && data.data.length > 0
            ? data.data.map((anime, index) => <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />)
            : null}
        </Grid>
        {data && data.data.length === 0 ? <Typography>No results found for "{debouncedValue}".</Typography> : null}
      </Stack>
      {data && data.data.length !== 0 ? (
        <Stack gap={2}>
          <Stack direction="row" alignItems="center" justifyContent={"flex-end"} className={"pagination-buttons"}>
            {page !== 1 ? <Button onClick={handleGoToFirstPage}>{"|<"}</Button> : null}
            {data?.pagination && data?.pagination.current_page > 1 ? (
              <Button onClick={handleGoPrevPage}>{"<"}</Button>
            ) : null}

            {data?.pagination && pageOptions.length > 0
              ? pageOptions
                  .filter(
                    (option) => option.value < page + pageSelectorsRange && option.value > page - pageSelectorsRange
                  )
                  .map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => setPage(option.value)}
                      variant={option.value === page ? "outlined" : undefined}
                      disabled={option.value === page}
                      sx={{
                        textTransform: "none",
                        display: isMobile ? (option.value === page ? undefined : "none") : undefined,
                      }}
                    >
                      {option.value === page ? (isMobile ? option.label : `Page: ${page}`) : option.label}
                    </Button>
                  ))
              : null}
            <Stack>
              {data?.pagination && data?.pagination.has_next_page ? (
                <Button onClick={handleGoNextPage}>{">"}</Button>
              ) : null}
            </Stack>
            {data?.pagination && data?.pagination.last_visible_page !== page ? (
              <Button onClick={handleGoToLastPage}>{">|"}</Button>
            ) : null}
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent={"flex-end"}>
            <FormControl sx={{ width: "120px" }}>
              <InputLabel>Items per page</InputLabel>
              <Select
                value={pageSize}
                onChange={(event) => handleChangePageSize(Number(event.target.value))}
                label="Items per page"
              >
                {pageSizeOptions.map((option) => (
                  <MenuItem value={option.value} key={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
}

export default Home;

function AnimeCard({ anime }: { anime: Anime }) {
  const { titles } = anime;
  const defaultTitle = titles.find((title) => (title.type = "Default"));
  const imageSrc = anime.images?.webp?.image_url;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid
      width={"225px"}
      onClick={() => {
        navigate(`/${anime.mal_id}`, {
          state: {
            from: location,
          },
        });
      }}
    >
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Stack sx={{ flexGrow: 1, justifyContent: "center" }}>
          <img src={imageSrc} />
        </Stack>
        <Stack padding={1}>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              height: "3rem",
            }}
          >
            {defaultTitle?.title}
          </Typography>
        </Stack>
      </Card>
    </Grid>
  );
}

function AnimeCardSkeleton() {
  return (
    <Stack width={"225px"}>
      <Card sx={{ height: "100%" }}>
        <Stack>
          <Skeleton width={"100%"} height={"250px"} variant="rounded" />
          <Stack sx={{ padding: 1 }}>
            <Skeleton width={"100%"} height={"2rem"} variant="text" />
            <Skeleton width={"100%"} height={"2rem"} variant="text" />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
