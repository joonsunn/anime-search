import { useGetAnimeList } from "../api/api";

function Home() {
  const { data } = useGetAnimeList({ page: 1, limit: 24, q: "one" });

  return <>{data && data.data.map((anime) => <div>{anime.title}</div>)}</>;
}

export default Home;
