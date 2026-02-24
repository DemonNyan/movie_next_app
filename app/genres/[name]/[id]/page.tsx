import Movies from "../../../components/Movies";
const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
async function fetchMovies(id) {
  //   console.log(id);
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return await res.json();
}

export default async function Home({
  params,
}: {
  params: Promise<{ name: string; id: number }>;
}) {
  const { name, id } = await params;
  const byGenres = await fetchMovies(id);
  const movies = byGenres.results;
  //   console.log(movies);
  return (
    <>
      <h3 className="font-bold border-b mb-4 pb-2">{name}</h3>
      <Movies movies={movies} />
    </>
  );
}
