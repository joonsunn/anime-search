import { Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";

export function AnimeItemSkeleton() {
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
