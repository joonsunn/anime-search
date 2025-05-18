import { Grid, IconButton, InputAdornment, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetAnimeList } from "../../api/api";
import { useRef, useState } from "react";
import { usePagination } from "../../lib/hooks/usePagination";
import DebouncedTextInput, { type DebouncedTextInputRef } from "../../components/DebouncedTextInput";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { PaginationButtons } from "../../components/PaginationButtons";
import { AnimeCard } from "./AnimeCard";
import { AnimeCardSkeleton } from "./AnimeSkeleton";

function Search() {
  const [searchText, setSearchText] = useState<string>("");

  const { page, setPage, pageSize, setPageSize } = usePagination({ initialPage: 1, initialPageSize: 10 });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, isFetching } = useGetAnimeList({ page, limit: pageSize, q: searchText || undefined });

  const dataLoading = isLoading || isFetching;
  const noResults = data && data.data.length === 0;
  const hasResults = data && data.data.length !== 0;

  const searchRef = useRef<DebouncedTextInputRef>(null);

  function handleClearSearch() {
    searchRef.current?.reset();
  }

  return (
    <Stack sx={{ flexGrow: 1, gap: 2, width: "100%" }}>
      <DebouncedTextInput
        inputRef={searchRef}
        value={searchText}
        setValue={setSearchText}
        placeholder="Search for an anime"
        autoComplete={"off"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {searchText ? (
                  <Tooltip title="Clear search">
                    <IconButton onClick={handleClearSearch}>
                      <ClearIcon color="error" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <SearchIcon />
                )}
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack className="search-results" sx={{ marginBottom: 3, alignItems: "center" }}>
        <Grid container spacing={1} sx={{ justifyContent: isMobile ? "center" : "flex-start" }}>
          {dataLoading ? Array.from(Array(pageSize)).map((_, index) => <AnimeCardSkeleton key={index} />) : null}
          {hasResults && !dataLoading
            ? data.data.map((anime, index) => <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />)
            : null}
        </Grid>
        {noResults ? <Typography>No results found for "{searchText}".</Typography> : null}
      </Stack>
      {hasResults ? (
        <PaginationButtons data={data} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
      ) : null}
    </Stack>
  );
}

export default Search;
