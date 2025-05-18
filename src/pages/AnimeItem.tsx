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
    navigate(location?.state?.from?.pathname || "/");
  }

  const { data: anime, isLoading, isPending, isError } = useGetAnimeById(params.id || "1");

  return (
    <Stack sx={{ flexGrow: 1, gap: 2, alignItems: "center" }} className="anime-item-page">
      <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} width={"100%"}></Stack>
      {isLoading || isPending ? <AnimeItemSkeleton /> : null}
      {anime ? <AnimeItemContent anime={anime} /> : null}
      {!(isLoading || isPending) && (isError || !anime) ? <Typography>Invalid id</Typography> : null}
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
        <Stack
          sx={{
            width: isMobile ? "100%" : "250px",
            maxWidth: isMobile ? "100%" : "250px",
            minWidth: "250px",
            alignItems: "center",
          }}
        >
          <img src={anime.images.webp.image_url} />
        </Stack>
        <Stack gap={2}>
          <Typography variant="h5">{defaultTitle?.title}</Typography>
          <Stack sx={{ marginBottom: isMobile ? 2 : 8 }}>
            <Typography variant="h6">Synopsis:</Typography>
            <Typography>{anime?.synopsis}</Typography>
          </Stack>
          <Stack direction="row" gap={2} className="stats-box" flexWrap={"wrap"}>
            <Stack
              sx={{
                alignItems: "center",
                border: "1px solid navy",
                color: "navy",
                backgroundColor: "powderblue",
                padding: 1,
                borderRadius: 2,
                width: "150px",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {anime.score || "N/A"}
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {anime.scored_by?.toLocaleString()} USERS
              </Typography>
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
                border: "1px solid purple",
                color: "purple",
                backgroundColor: "plum",
                padding: 1,
                borderRadius: 2,
                width: "150px",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                #{anime.rank || "N/A"}
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                RANKED
              </Typography>
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
                border: "1px solid maroon",
                color: "maroon",
                backgroundColor: "lightpink",
                padding: 1,
                borderRadius: 2,
                width: "150px",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                #{anime.popularity}
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                POPULARITY
              </Typography>
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
                border: "1px solid darkgreen",
                color: "darkgreen",
                backgroundColor: "darkseagreen",
                padding: 1,
                borderRadius: 2,
                width: "150px",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {anime.members?.toLocaleString()}
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                MEMBERS
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function AnimeItemSkeleton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack sx={{ minWidth: "100%" }}>
      <Stack flexDirection={isMobile ? "column" : "row"} gap={2} sx={{ width: "100%" }}>
        <Stack
          sx={{
            width: isMobile ? "100%" : "250px",
            maxWidth: isMobile ? "100%" : "250px",
            minWidth: "250px",
            alignItems: "center",
          }}
        >
          <Skeleton width={"100%"} height={"250px"} variant="rounded" />
        </Stack>
        <Stack gap={2} sx={{ width: "100%" }}>
          <Skeleton width={"100%"} height={"2rem"} variant="text" />
          <Stack sx={{ marginBottom: 8 }}>
            <Skeleton width={"100%"} height={"2rem"} variant="text" />
            <Skeleton width={"100%"} height={"2rem"} variant="text" />
          </Stack>
          <Stack direction="row" gap={2}>
            <Stack sx={{ alignItems: "center", border: "1px solid grey", padding: 1, borderRadius: 2, width: "150px" }}>
              <Skeleton width={"100%"} height={"2rem"} variant="text" />
              <Skeleton width={"100%"} height={"1rem"} variant="text" />
            </Stack>
            <Stack sx={{ alignItems: "center", border: "1px solid grey", padding: 1, borderRadius: 2, width: "150px" }}>
              <Skeleton width={"100%"} height={"2rem"} variant="text" />
              <Skeleton width={"100%"} height={"1rem"} variant="text" />
            </Stack>
            <Stack sx={{ alignItems: "center", border: "1px solid grey", padding: 1, borderRadius: 2, width: "150px" }}>
              <Skeleton width={"100%"} height={"2rem"} variant="text" />
              <Skeleton width={"100%"} height={"1rem"} variant="text" />
            </Stack>
            <Stack sx={{ alignItems: "center", border: "1px solid grey", padding: 1, borderRadius: 2, width: "150px" }}>
              <Skeleton width={"100%"} height={"2rem"} variant="text" />
              <Skeleton width={"100%"} height={"1rem"} variant="text" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
