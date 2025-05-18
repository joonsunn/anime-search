import { Stack, Card, Skeleton } from "@mui/material";

export function AnimeCardSkeleton() {
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
