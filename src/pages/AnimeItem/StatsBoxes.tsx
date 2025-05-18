import { Stack, Typography } from "@mui/material";
import type { Anime } from "../../api/types";

type StatsBoxesProps = {
  anime: Anime;
};

export function StatsBoxes({ anime }: StatsBoxesProps) {
  return (
    <Stack direction="row" gap={2} className="stats-box" flexWrap={"wrap"}>
      {anime.score ? (
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
            {anime.score}
          </Typography>
          <Typography variant="caption" fontWeight="bold">
            {anime.scored_by?.toLocaleString()} USERS
          </Typography>
        </Stack>
      ) : null}
      {anime.rank ? (
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
            #{anime.rank}
          </Typography>
          <Typography variant="caption" fontWeight="bold">
            RANKED
          </Typography>
        </Stack>
      ) : null}
      {anime.popularity ? (
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
      ) : null}
      {anime.members ? (
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
      ) : null}
    </Stack>
  );
}
