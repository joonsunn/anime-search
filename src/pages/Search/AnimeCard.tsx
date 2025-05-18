import { Grid, Card, Stack, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import type { Anime } from "../../api/types";

type AnimeCardProps = {
  anime: Anime;
};

export function AnimeCard({ anime }: AnimeCardProps) {
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
