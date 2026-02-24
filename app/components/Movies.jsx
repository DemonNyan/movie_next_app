import Link from "next/link";
export default function Movies({ movies }) {
  const poster = "http://image.tmdb.org/t/p/w342";
  //   console.log(movies);
  return (
    <>
      <div className="flex flex-wrap flex-row gap-4">
        {movies &&
          movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="w-[200px] text-center flex flex-col"
              >
                {movie.poster_path ? (
                  <Link href={`/movie/${movie.id}`}>
                    <img
                      src={poster + movie.poster_path}
                      className="w-full hover:scale-105 transition-all"
                    />
                  </Link>
                ) : (
                  <div className="h-[300px]"></div>
                )}
                <div>
                  <h4 className="mt-2">{movie.title}</h4>
                  <span className="text-sm text-gray-500">
                    {movie.release_date
                      ? movie.release_date.split("-")[0]
                      : "N/A"}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
