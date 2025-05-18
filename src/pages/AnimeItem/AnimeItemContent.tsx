import { useTheme } from "@mui/material";
import { useMediaQuery, Stack, Typography } from "@mui/material";
import type { Anime } from "../../api/types";
import { StatsBoxes } from "./StatsBoxes";

type AnimeItemContentProps = {
  anime: Anime;
};

export function AnimeItemContent({ anime }: AnimeItemContentProps) {
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
          <StatsBoxes anime={anime} />
        </Stack>
      </Stack>
    </Stack>
  );
}
