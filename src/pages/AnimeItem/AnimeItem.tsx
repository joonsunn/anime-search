import { Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetAnimeById } from "../../api/api";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AnimeItemContent } from "./AnimeItemContent";
import { AnimeItemSkeleton } from "./AnimeItemSkeleton";

function AnimeItem() {
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(location?.state?.from?.pathname || "/");
  }

  const { data: anime, isLoading, isPending, isError } = useGetAnimeById(params.id || "1");

  const dataLoading = isLoading || isPending;
  const invalidState = isError || !anime;

  return (
    <Stack sx={{ flexGrow: 1, gap: 2, alignItems: "center" }} className="anime-item-page">
      <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} width={"100%"}></Stack>
      {dataLoading ? <AnimeItemSkeleton /> : null}
      {anime ? <AnimeItemContent anime={anime} /> : null}
      {!dataLoading && invalidState ? <Typography>Invalid id</Typography> : null}
      <Stack flexDirection={"row"} justifyContent={"flex-start"} width="100%">
        <Button onClick={handleBackButtonClick}>
          <ArrowBackIosNewIcon /> <Typography sx={{ marginLeft: 1 }}>Back</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}

export default AnimeItem;
