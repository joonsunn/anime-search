import { Button, Skeleton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetAnimeById } from "../api/api";
import type { Anime } from "../api/types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function AnimeItem() {
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(location?.state?.from?.pathname || -1);
  }

  const { data: anime, isLoading, isPending } = useGetAnimeById(params.id || "1");

  return (
    <Stack sx={{ flexGrow: 1, gap: 2, alignItems: "center" }} className="anime-item-page">
      <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
        {/* <Typography>{defaultTitle?.title}</Typography> */}
      </Stack>
      {isLoading || isPending ? <AnimeItemSkeleton /> : null}
      {anime ? <AnimeItemContent anime={anime} /> : null}
      {/* <AnimeItemSkeleton /> */}
      <Stack flexDirection={"row"} justifyContent={"flex-start"} width="100%">
        <Button onClick={handleBackButtonClick}>
          <ArrowBackIosNewIcon /> <Typography sx={{ marginLeft: 1 }}>Back</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}

export default AnimeItem;

function AnimeItemContent({ anime }: { anime: Anime }) {
  const defaultTitle = anime?.titles.find((title) => title.type === "Default");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack className="anime-item-content">
      <Stack flexDirection={isMobile ? "column" : "row"} gap={2}>
        <Stack sx={{ width: isMobile ? "100%" : "250px", maxWidth: isMobile ? "100%" : "250px", alignItems: "center" }}>
          <img src={anime.images.webp.image_url} />
        </Stack>
        <Stack gap={2}>
          <Typography variant="h5">{defaultTitle?.title}</Typography>
          <Stack>
            <Typography variant="h6">Synopsis:</Typography>
            <Typography>{anime?.synopsis}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function AnimeItemSkeleton() {
  return (
    <Stack sx={{ minWidth: "100%" }}>
      <Skeleton width={"100%"} height={"250px"} variant="rounded" />
      <Stack sx={{ padding: 1 }}>
        <Skeleton width={"100%"} height={"2rem"} variant="text" />
        <Skeleton width={"100%"} height={"2rem"} variant="text" />
      </Stack>
    </Stack>
  );
}
