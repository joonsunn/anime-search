import { useGetAnimeList } from "../api/api";

function Home() {
  const { data } = useGetAnimeList({ page: 1, limit: 12 });

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Home;
